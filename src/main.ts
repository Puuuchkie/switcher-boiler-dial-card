import { SwitcherBoilerCard } from "./card";
import { SwitcherBoilerCardCircular } from "./card-circular";
import { SwitcherBoilerCardEditor } from "./editor";
import { SwitcherBoilerCardCircularEditor } from "./editor-circular";
import { version } from "../package.json"

declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

console.groupCollapsed(`%c SWITCHER-BOILER-DIAL-CARD %c v${version}`, "color: white; background: #F54436; font-weight: bold", "color: #F54436; font-weight: bold"),
console.log("Readme:", "https://github.com/Puuuchkie/switcher-boiler-dial-card"),
console.groupEnd();

customElements.define("switcher-boiler-dial-card", SwitcherBoilerCardCircular);
customElements.define("switcher-boiler-dial-card-editor", SwitcherBoilerCardCircularEditor);
customElements.define("switcher-boiler-tile-card", SwitcherBoilerCard);
customElements.define("switcher-boiler-tile-card-editor", SwitcherBoilerCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "switcher-boiler-dial-card",
    name: "Switcher Boiler Dial Card",
    description: "Switcher Boiler card with a draggable circular timer dial",
    preview: true,
    documentationURL: "https://github.com/Puuuchkie/switcher-boiler-dial-card",
    configurable: true,
});
window.customCards.push({
    type: "switcher-boiler-tile-card",
    name: "Switcher Boiler Tile Card",
    description: "Switcher Boiler tile card with preset timer buttons",
    preview: true,
    documentationURL: "https://github.com/Puuuchkie/switcher-boiler-dial-card",
    configurable: true,
});
