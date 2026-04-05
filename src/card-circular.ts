import { html, svg, LitElement, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import circularStyles from "./card-circular.styles";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

// ── SVG geometry ─────────────────────────────────────────────────────────────
const CX = 120;
const CY = 120;
const R = 85;
const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 534.07
const MIN_PER_ROTATION = 60;   // 1 full rotation = 60 min → top→bottom = 30 min
const DEFAULT_LIMIT_MIN = 150; // default max when timer_limit not set

// Raw "clock" angle (0° = top, clockwise), in degrees 0–360
function rawAngle(x: number, y: number): number {
  let a = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (a < 0) a += 360;
  if (a >= 360) a -= 360;
  return a;
}

// SVG coordinates of the knob for a given cumulative angle
function knobPos(totalAngle: number): { x: number; y: number } {
  const a = (totalAngle % 360 - 90) * (Math.PI / 180);
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

export class SwitcherBoilerCardCircular extends LitElement {
  // Only state that drives re-renders
  @state() private _totalAngle = 0;  // cumulative degrees; 360° = 60 min
  @state() private _dragging = false;

  // Drag bookkeeping — no re-render needed
  private _lastRawAngle = 0;
  private _dragStarted = false;
  private _prevEntityState = "";

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LovelaceCardConfig;

  static styles = circularStyles;

  static getConfigElement() {
    return document.createElement("switcher-boiler-card-circular-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:switcher-boiler-card-circular",
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
    this._totalAngle = 0;
  }

  // Reset dial when the device turns off (manual or auto)
  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (!changedProperties.has("hass") || !this.config?.entity) return;

    const entityState = this.hass?.states?.[this.config.entity];
    const currentState = entityState?.state ?? "";

    if (this._prevEntityState === "on" && currentState !== "on") {
      this._totalAngle = 0;
    }
    this._prevEntityState = currentState;
  }

  // ── Derived values ────────────────────────────────────────────────────────

  private get _timerMinutes(): number {
    return Math.round((this._totalAngle / 360) * MIN_PER_ROTATION);
  }

  private get _partialAngle(): number {
    return this._totalAngle % 360;
  }

  private get _fullRotations(): number {
    return Math.floor(this._totalAngle / 360);
  }

  private get _maxAngle(): number {
    const limit = this.config?.timer_limit;
    const limitMin = limit != null && limit !== "" ? Number(limit) : DEFAULT_LIMIT_MIN;
    return (limitMin / MIN_PER_ROTATION) * 360;
  }

  // "30" when < 60 min, "1:30" when >= 60 min
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
    const scale = 240 / rect.width; // viewBox is 240×240
    return rawAngle(
      (e.clientX - rect.left) * scale - CX,
      (e.clientY - rect.top) * scale - CY,
    );
  }

  private _onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this._dragging = true;
    this._dragStarted = false;
    this._lastRawAngle = this._rawAngleFromPointer(e);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._dragging) return;
    e.preventDefault();

    const cur = this._rawAngleFromPointer(e);

    // Short-circuit delta to handle the 0°/360° wraparound correctly
    let delta = cur - this._lastRawAngle;
    if (delta > 180) delta -= 360;   // wrapped past 0° going counter-clockwise
    if (delta < -180) delta += 360;  // wrapped past 0° going clockwise

    let newTotal = this._totalAngle + delta;
    newTotal = Math.max(0, Math.min(this._maxAngle, newTotal));

    this._totalAngle = newTotal;
    this._lastRawAngle = cur;
    this._dragStarted = true;
  }

  // Auto-start the boiler when the user releases the knob (if time > 0)
  private _onPointerUp(_e: PointerEvent): void {
    if (this._dragging && this._dragStarted && this._timerMinutes > 0) {
      this.hass.callService("switcher_kis", "turn_on_with_timer", {
        entity_id: this.config.entity,
        timer_minutes: String(this._timerMinutes),
      });
    }
    this._dragging = false;
    this._dragStarted = false;
  }

  // ── Service calls ─────────────────────────────────────────────────────────

  private _toggleBoiler(e: MouseEvent): void {
    e.stopPropagation();
    this.hass.callService("homeassistant", "toggle", { entity_id: this.config.entity });
  }

  private _showMoreInfo(e: Event, entityId: string): void {
    e.stopPropagation();
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const entityState = this.hass?.states?.[this.config.entity];
    if (!entityState) return;

    const friendlyName = entityState.attributes?.friendly_name || "Boiler";
    const displayName = this.config.name || friendlyName;
    const isOn = entityState.state === "on";
    const displayIcon = this.config.icon || entityState.attributes?.icon || "mdi:waves";

    // Secondary status line
    let displayState = isOn
      ? (this.hass.localize("component.switch.entity_component._.state.on") || "on")
      : (this.hass.localize("component.switch.entity_component._.state.off") || "off");

    if (isOn && this.config.time_left && this.hass.states[this.config.time_left]) {
      displayState = this.hass.states[this.config.time_left].state;
    }

    if (this.config.power_sensor && this.hass.states[this.config.power_sensor]) {
      const ps = this.hass.states[this.config.power_sensor];
      const unit = ps.attributes?.unit_of_measurement || "";
      displayState += ` • ${ps.state}${unit}`;
    }

    // ── Arc geometry ────────────────────────────────────────────────────────
    const partialAngle = this._partialAngle;
    const fullRotations = this._fullRotations;

    // When totalAngle is exactly a multiple of 360°, show a full circle (not invisible)
    const effectiveAngle = partialAngle === 0 && fullRotations > 0 ? 360 : partialAngle;
    const dashOffset = CIRCUMFERENCE * (1 - effectiveAngle / 360);
    const showArc = this._totalAngle > 0;

    const knob = knobPos(this._totalAngle);
    const knobR = this._dragging ? 16 : 13;

    // Tick mark positions (0, 15, 30, 45 min)
    const TICKS = [0, 15, 30, 45];
    const LABELS = [
      { min: 15, text: "15" },
      { min: 30, text: "30" },
      { min: 45, text: "45" },
    ];
    const LABEL_R = R + 22;

    return html`
      <ha-card class="card">
        <!-- ── Header ─────────────────────────────────────────────────── -->
        <div
          class="card-header"
          @click="${(e: MouseEvent) => this._showMoreInfo(e, this.config.entity)}"
        >
          <div class="icon-container ${isOn ? "on" : "off"}">
            <ha-icon icon="${displayIcon}" class="icon ${isOn ? "on" : "off"}"></ha-icon>
          </div>
          <div class="header-label">
            <span class="primary">${displayName}</span>
            <span class="secondary">${displayState}</span>
          </div>
        </div>

        <!-- ── Circular timer dial ────────────────────────────────────── -->
        <div class="timer-wrapper">
          <svg
            class="timer-svg"
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="knob-shadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="1" stdDeviation="3"
                  flood-color="#000" flood-opacity="0.2" />
              </filter>
            </defs>

            <!-- Tick marks at 0 / 15 / 30 / 45 min -->
            ${TICKS.map((min) => {
              const a = ((min / MIN_PER_ROTATION) * 360 - 90) * (Math.PI / 180);
              return svg`
                <line
                  x1="${CX + (R - 8) * Math.cos(a)}"
                  y1="${CY + (R - 8) * Math.sin(a)}"
                  x2="${CX + (R + 8) * Math.cos(a)}"
                  y2="${CY + (R + 8) * Math.sin(a)}"
                  stroke="rgba(128,128,128,0.35)"
                  stroke-width="2"
                  stroke-linecap="round"
                />`;
            })}

            <!-- Background track -->
            <circle
              cx="${CX}" cy="${CY}" r="${R}"
              fill="none"
              stroke="rgba(128,128,128,0.15)"
              stroke-width="12"
              stroke-linecap="round"
            />

            <!-- Completed-rotation ring: muted full circle when ≥1 full lap -->
            ${fullRotations > 0 ? svg`
              <circle
                cx="${CX}" cy="${CY}" r="${R}"
                fill="none"
                stroke="rgba(245,68,54,0.22)"
                stroke-width="12"
              />` : ""}

            <!-- Active arc (from top, clockwise to current position) -->
            ${showArc ? svg`
              <circle
                cx="${CX}" cy="${CY}" r="${R}"
                fill="none"
                stroke="#F54436"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${CIRCUMFERENCE}"
                stroke-dashoffset="${dashOffset}"
                transform="rotate(-90, ${CX}, ${CY})"
              />` : ""}

            <!-- Minute labels at 15 / 30 / 45 -->
            ${LABELS.map(({ min, text }) => {
              const a = ((min / MIN_PER_ROTATION) * 360 - 90) * (Math.PI / 180);
              return svg`
                <text
                  x="${CX + LABEL_R * Math.cos(a)}"
                  y="${CY + LABEL_R * Math.sin(a)}"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class="tick-label"
                >${text}</text>`;
            })}

            <!-- Center: timer value -->
            <text
              x="${CX}" y="${CY - 10}"
              text-anchor="middle"
              dominant-baseline="middle"
              class="center-value"
            >${this._timerDisplay}</text>
            <text
              x="${CX}" y="${CY + 20}"
              text-anchor="middle"
              dominant-baseline="middle"
              class="center-unit"
            >${this._timerUnit}</text>

            <!-- Draggable knob -->
            <circle
              cx="${knob.x}" cy="${knob.y}" r="${knobR}"
              fill="white"
              stroke="#F54436"
              stroke-width="3"
              filter="url(#knob-shadow)"
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

  getCardSize() {
    return 4;
  }

  getLayoutOptions() {
    return {
      grid_rows: 3,
      grid_columns: 2,
      grid_min_rows: 3,
      grid_max_rows: 3,
      grid_min_columns: 2,
      grid_max_columns: 2,
    };
  }
}
