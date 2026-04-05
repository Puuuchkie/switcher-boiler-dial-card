import { html, svg, LitElement, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import circularStyles from "./card-circular.styles";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

// ── SVG geometry ─────────────────────────────────────────────────────────────
const CX = 120;
const CY = 120;
const R = 95;

// Full 360° circle: starts at 12 o'clock (top), goes clockwise.
// No gap — every position on the ring is usable.
const ARC_START_DEG = 0;     // clock angle where 0 min sits (top / 12 o'clock)
const ARC_SPAN_DEG  = 360;   // full circle
const ARC_ROTATE    = -90;   // rotate SVG stroke so it starts at top, not right

const FULL_CIRC = 2 * Math.PI * R;  // ≈ 596.90
const TRACK_LEN = FULL_CIRC;        // full circle — no gap
const GAP_LEN   = 0;

const MIN_PER_ROTATION = 60;    // full arc = 60 min  →  top-to-bottom = 30 min
const DEFAULT_LIMIT_MIN = 150;

// Convert "minutes along the arc" to a clock angle (degrees)
function minutesToClockAngle(minutes: number, maxMin: number): number {
  return ARC_START_DEG + (minutes / maxMin) * ARC_SPAN_DEG;
}

// SVG x,y for the handle at a given clock angle
function clockAngleToXY(clockDeg: number): { x: number; y: number } {
  const rad = (clockDeg - 90) * (Math.PI / 180);
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

// Raw "clock" angle of a pointer event (0° = top, clockwise), 0–360
function rawClockAngle(x: number, y: number): number {
  let a = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (a < 0) a += 360;
  if (a >= 360) a -= 360;
  return a;
}

// Map a raw clock angle to 0–ARC_SPAN_DEG (degrees along the arc from its start)
// Returns null when the pointer is clearly in the dead-zone gap
function clockAngleToArcDeg(clockDeg: number): number | null {
  let rel = clockDeg - ARC_START_DEG;
  if (rel < 0) rel += 360;
  // rel is now 0–360 where 0 = arc start (225°), going clockwise
  if (rel <= ARC_SPAN_DEG) return rel;          // on the arc
  // In the gap — snap toward nearest end
  const distToEnd   = rel - ARC_SPAN_DEG;       // distance past the end
  const distToStart = 360 - rel;                 // distance before the start
  return distToEnd <= distToStart ? ARC_SPAN_DEG : 0;
}

export class SwitcherBoilerCardCircular extends LitElement {
  @state() private _arcDeg    = 0;     // degrees along the 270° arc (0–max)
  @state() private _dragging  = false;

  private _lastArcDeg    = 0;   // previous arc position for multi-lap delta
  private _lastRawAngle  = 0;   // previous raw clock angle for delta calc
  private _dragStarted   = false;
  private _prevEntityState = "";

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LovelaceCardConfig;

  static styles = circularStyles;

  static getConfigElement() {
    return document.createElement("switcher-boiler-dial-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:switcher-boiler-dial-card",
      name: "Boiler",
      entity: "",
      icon: "",
      time_left: "",
      power_sensor: "",
      timer_limit: 90,
    };
  }

  setConfig(config: LovelaceCardConfig) {
    if (!config.entity) throw new Error("You need to define an entity");
    this.config = config;
    this._arcDeg = 0;
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (!changedProperties.has("hass") || !this.config?.entity) return;
    const currentState = this.hass?.states?.[this.config.entity]?.state ?? "";
    if (this._prevEntityState === "on" && currentState !== "on") {
      this._arcDeg = 0;
    }
    this._prevEntityState = currentState;
  }

  // ── Derived values ────────────────────────────────────────────────────────

  private get _maxArcDeg(): number {
    const limit = this.config?.timer_limit;
    const limitMin = limit != null && limit !== "" ? Number(limit) : DEFAULT_LIMIT_MIN;
    // Each full 270° arc = MIN_PER_ROTATION minutes; allow multiple laps
    return (limitMin / MIN_PER_ROTATION) * ARC_SPAN_DEG;
  }

  private get _timerMinutes(): number {
    return Math.round((this._arcDeg / ARC_SPAN_DEG) * MIN_PER_ROTATION);
  }

  private get _timerDisplay(): string {
    const m = this._timerMinutes;
    if (m < 60) return String(m);
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${h}:${min.toString().padStart(2, "0")}`;
  }

  private get _timerUnit(): string {
    return this._timerMinutes >= 60 ? "hr" : "min";
  }

  // ── Drag handlers ─────────────────────────────────────────────────────────

  private _rawAngleFromPointer(e: PointerEvent): number {
    const svgEl = this.shadowRoot?.querySelector(".timer-svg") as SVGSVGElement | null;
    if (!svgEl) return 0;
    const rect = svgEl.getBoundingClientRect();
    const scale = 240 / rect.width;
    return rawClockAngle(
      (e.clientX - rect.left) * scale - CX,
      (e.clientY - rect.top)  * scale - CY,
    );
  }

  private _onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this._dragging   = true;
    this._dragStarted = false;
    this._lastRawAngle = this._rawAngleFromPointer(e);
    this._lastArcDeg  = this._arcDeg;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._dragging) return;
    e.preventDefault();

    const cur = this._rawAngleFromPointer(e);

    // Delta in raw clock-angle space handles the 0°/360° wrap correctly
    let delta = cur - this._lastRawAngle;
    if (delta >  180) delta -= 360;
    if (delta < -180) delta += 360;

    let newArc = this._arcDeg + delta;
    newArc = Math.max(0, Math.min(this._maxArcDeg, newArc));

    this._arcDeg       = newArc;
    this._lastRawAngle = cur;
    this._dragStarted  = true;
  }

  private _onPointerUp(_e: PointerEvent): void {
    if (this._dragging && this._dragStarted && this._timerMinutes > 0) {
      this.hass.callService("switcher_kis", "turn_on_with_timer", {
        entity_id: this.config.entity,
        timer_minutes: String(this._timerMinutes),
      });
    }
    this._dragging    = false;
    this._dragStarted = false;
  }

  // ── Service calls ─────────────────────────────────────────────────────────

  private _toggleBoiler(e: MouseEvent): void {
    e.stopPropagation();
    this.hass.callService("homeassistant", "toggle", { entity_id: this.config.entity });
  }

  private _showMoreInfo(e: Event): void {
    e.stopPropagation();
    const entityId = this.config.entity;
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true, cancelable: true, composed: true,
        detail: { entityId },
      }),
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const entityState = this.hass?.states?.[this.config.entity];
    if (!entityState) return;

    const friendlyName = entityState.attributes?.friendly_name || "Boiler";
    const displayName  = this.config.name || friendlyName;
    const isOn         = entityState.state === "on";

    // Compact single-line state (shown inside the dial)
    let stateText = isOn
      ? (this.hass.localize("component.switch.entity_component._.state.on")  || "on")
      : (this.hass.localize("component.switch.entity_component._.state.off") || "off");

    if (isOn && this.config.time_left && this.hass.states[this.config.time_left]) {
      stateText = this.hass.states[this.config.time_left].state;
    }

    let powerText = "";
    if (this.config.power_sensor && this.hass.states[this.config.power_sensor]) {
      const ps   = this.hass.states[this.config.power_sensor];
      const unit = ps.attributes?.unit_of_measurement || "";
      powerText  = `${ps.state}${unit}`;
    }

    // ── Arc / handle geometry ────────────────────────────────────────────────
    // Current position within one arc lap (0–270°)
    const lapDeg     = this._arcDeg % ARC_SPAN_DEG;
    const fullLaps   = Math.floor(this._arcDeg / ARC_SPAN_DEG);

    // Active arc: how much of the 270° track to fill
    const activeFraction = lapDeg / ARC_SPAN_DEG;
    const activeDash     = lapDeg === 0 && fullLaps > 0
      ? TRACK_LEN                          // full arc when exactly on a lap boundary
      : TRACK_LEN * activeFraction;
    const showArc = this._arcDeg > 0;

    // Handle position: map current arc-degrees back to a clock angle
    const handleClockAngle = minutesToClockAngle(
      this._timerMinutes % MIN_PER_ROTATION,
      MIN_PER_ROTATION,
    );
    const knob      = clockAngleToXY(handleClockAngle);
    const knobR     = this._dragging ? 13 : 11;

    // Tick marks at 0, 15, 30, 45 min (first-lap arc positions only)
    const TICK_MIN = [0, 15, 30, 45];

    return html`
      <ha-card class="card">

        <!-- ── Circular dial ────────────────────────────────────────────── -->
        <div class="timer-wrapper">
          <svg class="timer-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="ks" x="-80%" y="-80%" width="260%" height="260%">
                <feDropShadow dx="0" dy="1" stdDeviation="2.5"
                  flood-color="#000" flood-opacity="0.2" />
              </filter>
            </defs>

            <!-- ── Track (full gray circle) ──────────────────────────── -->
            <circle cx="${CX}" cy="${CY}" r="${R}"
              fill="none"
              stroke="rgba(128,128,128,0.18)"
              stroke-width="13"
            />

            <!-- Completed-lap ring (muted full circle) -->
            ${fullLaps > 0 ? svg`
              <circle cx="${CX}" cy="${CY}" r="${R}"
                fill="none"
                stroke="rgba(245,68,54,0.2)"
                stroke-width="13"
              />` : ""}

            <!-- Active arc (red, starts at 12 o'clock, goes clockwise) -->
            ${showArc ? svg`
              <circle cx="${CX}" cy="${CY}" r="${R}"
                fill="none"
                stroke="#F54436"
                stroke-width="13"
                stroke-linecap="round"
                stroke-dasharray="${activeDash} ${FULL_CIRC - activeDash}"
                transform="rotate(${ARC_ROTATE}, ${CX}, ${CY})"
              />` : ""}

            <!-- Tick dots at 0 / 15 / 30 / 45 min (cardinal positions) -->
            ${TICK_MIN.map((min) => {
              const ca = minutesToClockAngle(min, MIN_PER_ROTATION);
              const p  = clockAngleToXY(ca);
              return svg`
                <circle cx="${p.x}" cy="${p.y}" r="2.5"
                  fill="rgba(128,128,128,0.45)" />`;
            })}

            <!-- ── Inner content (name · timer · state) ──────────────── -->
            <!-- Name (tap for more-info) -->
            <text x="${CX}" y="82"
              text-anchor="middle" dominant-baseline="middle"
              class="inner-name"
              @click="${this._showMoreInfo}"
            >${displayName}</text>

            <!-- Timer value -->
            <text x="${CX}" y="118"
              text-anchor="middle" dominant-baseline="middle"
              class="center-value"
            >${this._timerDisplay}</text>

            <!-- Unit -->
            <text x="${CX}" y="144"
              text-anchor="middle" dominant-baseline="middle"
              class="center-unit"
            >${this._timerUnit}</text>

            <!-- State -->
            <text x="${CX}" y="161"
              text-anchor="middle" dominant-baseline="middle"
              class="inner-state"
            >${stateText}</text>

            <!-- Power sensor (optional) -->
            ${powerText ? svg`
              <text x="${CX}" y="177"
                text-anchor="middle" dominant-baseline="middle"
                class="inner-power"
              >${powerText}</text>` : ""}

            <!-- ── Handle ─────────────────────────────────────────────── -->
            <!-- Visual dot (no pointer events) -->
            <circle cx="${knob.x}" cy="${knob.y}" r="${knobR}"
              fill="white"
              stroke="#F54436"
              stroke-width="2.5"
              filter="url(#ks)"
              style="pointer-events:none"
            />
            <!-- Large transparent hit area (~44 px touch target) -->
            <circle cx="${knob.x}" cy="${knob.y}" r="22"
              fill="transparent"
              class="timer-handle ${this._dragging ? "dragging" : ""}"
              @pointerdown="${this._onPointerDown}"
              @pointermove="${this._onPointerMove}"
              @pointerup="${this._onPointerUp}"
            />
          </svg>
        </div>

        <!-- ── Power button ──────────────────────────────────────────── -->
        <div class="bottom-controls">
          <button
            class="btn power-btn ${isOn ? "on" : "off"}"
            @click="${this._toggleBoiler}"
          >
            <ha-icon icon="mdi:power" class="btn-icon"></ha-icon>
            <span>${isOn ? "Turn Off" : "Turn On"}</span>
          </button>
        </div>

      </ha-card>
    `;
  }

  getCardSize() { return 3; }

  getLayoutOptions() {
    return {
      grid_rows: 3,
      grid_columns: 2,
      grid_min_rows: 2,
      grid_max_rows: 6,
      grid_min_columns: 2,
      grid_max_columns: 4,
    };
  }
}
