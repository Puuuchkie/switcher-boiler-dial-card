import { html, svg, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import circularStyles from "./card-circular.styles";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

// SVG geometry constants (viewBox 0 0 240 240)
const CX = 120;
const CY = 120;
const R = 85;
const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 534.07
const MAX_MINUTES = 60; // one full rotation = 60 min, so top→bottom = 30 min
const LABEL_RADIUS = R + 22; // labels just outside the track

function toAngleRad(minutes: number): number {
  // 0 min = top (−90°), clockwise; returns radians
  return ((minutes / MAX_MINUTES) * 360 - 90) * (Math.PI / 180);
}

function handlePos(minutes: number): { x: number; y: number } {
  const a = toAngleRad(minutes);
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

function labelPos(minutes: number): { x: number; y: number } {
  const a = toAngleRad(minutes);
  return { x: CX + LABEL_RADIUS * Math.cos(a), y: CY + LABEL_RADIUS * Math.sin(a) };
}

export class SwitcherBoilerCardCircular extends LitElement {
  @state() private _timerMinutes: number = 30;
  @state() private _dragging: boolean = false;

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: LovelaceCardConfig;

  static styles = circularStyles;

  constructor() {
    super();
    this._timerMinutes = 30;
  }

  static getConfigElement() {
    return document.createElement("switcher-boiler-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:switcher-boiler-card-circular",
      name: "Boiler",
      entity: "",
      icon: "",
      time_left: "",
    };
  }

  setConfig(config: LovelaceCardConfig) {
    if (!config.entity) throw new Error("You need to define an entity");
    this.config = config;
    // Default timer from first configured timer_value, capped to MAX_MINUTES
    if (config.timer_values?.length > 0) {
      const v = Math.min(MAX_MINUTES, Number(config.timer_values[0]));
      this._timerMinutes = v > 0 ? v : 30;
    } else {
      this._timerMinutes = 30;
    }
  }

  // ── Drag handlers ────────────────────────────────────────────────────────

  private _onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this._dragging = true;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._dragging) return;
    e.preventDefault();

    const svgEl = this.shadowRoot?.querySelector(".timer-svg") as SVGSVGElement | null;
    if (!svgEl) return;

    const rect = svgEl.getBoundingClientRect();
    const scale = 240 / rect.width; // viewBox is 240×240

    // Pointer position relative to SVG center
    const x = (e.clientX - rect.left) * scale - CX;
    const y = (e.clientY - rect.top) * scale - CY;

    // atan2 → convert to "clock" angle (0° = top, clockwise positive)
    let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    if (angle >= 360) angle -= 360;

    const minutes = Math.max(1, Math.min(MAX_MINUTES, Math.round((angle / 360) * MAX_MINUTES)));
    this._timerMinutes = minutes;
  }

  private _onPointerUp(_e: PointerEvent): void {
    this._dragging = false;
  }

  // ── Service calls ────────────────────────────────────────────────────────

  private _toggleBoiler(e: MouseEvent): void {
    e.stopPropagation();
    this.hass.callService("homeassistant", "toggle", { entity_id: this.config.entity });
  }

  private _turnOnWithTimer(e: MouseEvent): void {
    e.stopPropagation();
    this.hass.callService("switcher_kis", "turn_on_with_timer", {
      entity_id: this.config.entity,
      timer_minutes: String(this._timerMinutes),
    });
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
      })
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────

  render() {
    const entityState = this.hass?.states?.[this.config.entity];
    if (!entityState) return;

    const friendlyName = entityState.attributes?.friendly_name || "Boiler";
    const displayName = this.config.name || friendlyName;
    const isOn = entityState.state === "on";
    const displayIcon = this.config.icon || entityState.attributes?.icon || "mdi:waves";

    let displayState = "";
    if (isOn) {
      const timeLeftEntity = this.config.time_left && this.hass.states[this.config.time_left];
      if (timeLeftEntity) {
        displayState = timeLeftEntity.state;
      } else {
        displayState =
          this.hass.localize("component.switch.entity_component._.state.on") || "on";
      }
    } else {
      displayState =
        this.hass.localize("component.switch.entity_component._.state.off") || "off";
    }

    // Arc geometry
    const dashOffset = CIRCUMFERENCE * (1 - this._timerMinutes / MAX_MINUTES);
    const knob = handlePos(this._timerMinutes);
    const knobR = this._dragging ? 16 : 13; // grow on drag

    // Tick mark positions (inner/outer of the track)
    const TICK_MINUTES = [0, 15, 30, 45];
    const tickInnerR = R - 8;
    const tickOuterR = R + 8;

    // Labels at cardinal positions (skip 0 since handle rests there at 60-min full circle)
    const LABEL_MARKS = [
      { min: 15, text: "15" },
      { min: 30, text: "30" },
      { min: 45, text: "45" },
    ];

    return html`
      <ha-card class="card">
        <!-- Header: icon + name + state -->
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

        <!-- Circular timer dial -->
        <div class="timer-wrapper">
          <svg
            class="timer-svg"
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="knob-shadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.22" />
              </filter>
            </defs>

            <!-- Tick marks at 0 / 15 / 30 / 45 min -->
            ${TICK_MINUTES.map((min) => {
              const a = toAngleRad(min);
              const ix = CX + tickInnerR * Math.cos(a);
              const iy = CY + tickInnerR * Math.sin(a);
              const ox = CX + tickOuterR * Math.cos(a);
              const oy = CY + tickOuterR * Math.sin(a);
              return svg`
                <line
                  x1="${ix}" y1="${iy}"
                  x2="${ox}" y2="${oy}"
                  stroke="rgba(128,128,128,0.35)"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              `;
            })}

            <!-- Background track -->
            <circle
              cx="${CX}" cy="${CY}" r="${R}"
              fill="none"
              stroke="rgba(128,128,128,0.15)"
              stroke-width="12"
              stroke-linecap="round"
            />

            <!-- Active arc (starts at top, grows clockwise) -->
            <circle
              cx="${CX}" cy="${CY}" r="${R}"
              fill="none"
              stroke="#F54436"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="${CIRCUMFERENCE}"
              stroke-dashoffset="${dashOffset}"
              transform="rotate(-90, ${CX}, ${CY})"
            />

            <!-- Minute labels at 15 / 30 / 45 -->
            ${LABEL_MARKS.map(({ min, text }) => {
              const p = labelPos(min);
              return svg`
                <text
                  x="${p.x}" y="${p.y}"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class="tick-label"
                >${text}</text>
              `;
            })}

            <!-- Center: current timer value -->
            <text
              x="${CX}" y="${CY - 10}"
              text-anchor="middle"
              dominant-baseline="middle"
              class="center-value"
            >${this._timerMinutes}</text>
            <text
              x="${CX}" y="${CY + 20}"
              text-anchor="middle"
              dominant-baseline="middle"
              class="center-unit"
            >min</text>

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

        <!-- Bottom controls -->
        <div class="bottom-controls">
          <button
            class="btn power-btn ${isOn ? "on" : "off"}"
            @click="${this._toggleBoiler}"
          >
            <ha-icon icon="mdi:power" class="btn-icon"></ha-icon>
          </button>
          <button class="btn timer-btn" @click="${this._turnOnWithTimer}">
            <ha-icon icon="mdi:timer-outline" class="btn-icon"></ha-icon>
            <span>Start ${this._timerMinutes} min</span>
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
