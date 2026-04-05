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

console.groupCollapsed(`%c SWITCHER-BOILER-CARD %c v${version}`, "color: white; background: #F54436; font-weight: bold", "color: #F54436; font-weight: bold"),
console.log("Readme:", "https://github.com/Puuuchkie/switcher-boiler-dial-card"),
console.groupEnd();

customElements.define("switcher-boiler-card", SwitcherBoilerCard);
customElements.define("switcher-boiler-card-circular", SwitcherBoilerCardCircular);
customElements.define("switcher-boiler-card-editor", SwitcherBoilerCardEditor);
customElements.define("switcher-boiler-card-circular-editor", SwitcherBoilerCardCircularEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "switcher-boiler-card",
    name: "Switcher Boiler Dial Card",
    description: "Custom Switcher Boiler Switch card for Home Assistant",
    preview: true,
    documentationURL: "https://github.com/Puuuchkie/switcher-boiler-dial-card",
    configurable: true,
});
window.customCards.push({
    type: "switcher-boiler-card-circular",
    name: "Switcher Boiler Dial Card (Circular Timer)",
    description: "Switcher Boiler card with a draggable circular timer dial",
    preview: true,
    documentationURL: "https://github.com/Puuuchkie/switcher-boiler-dial-card",
    configurable: true,
});
