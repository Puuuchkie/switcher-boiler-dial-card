import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

const SCHEMA = [
  { name: "entity", selector: { entity: { domain: ["switch"] } } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
  { name: "time_left", selector: { entity: { domain: ["sensor"] } } },
  { name: "power_sensor", selector: { entity: { domain: ["sensor"] } } },
  {
    name: "timer_limit",
    selector: { number: { min: 15, max: 150, step: 15, mode: "slider" } },
  },
];

const fireEvent = (node: HTMLElement, type: string, detail: unknown) => {
  node.dispatchEvent(
    new CustomEvent(type, { bubbles: true, cancelable: false, composed: true, detail }),
  );
};

export class SwitcherBoilerCardCircularEditor extends LitElement {
  @state() _config: LovelaceCardConfig = {} as LovelaceCardConfig;
  private hass!: HomeAssistant;

  setConfig(config: LovelaceCardConfig) {
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _computeLabel = (schema: { name: string }) => {
    switch (schema.name) {
      case "time_left":
        return "Time Left Sensor (Optional)";
      case "power_sensor":
        return "Power Consumption Sensor (Optional)";
      case "timer_limit":
        return "Timer Limit in Minutes (Optional)";
      default:
        return `${this.hass.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`,
        )} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    }
  };

  private _valueChanged = (ev: CustomEvent) =>
    fireEvent(this, "config-changed", { config: ev.detail.value });
}
