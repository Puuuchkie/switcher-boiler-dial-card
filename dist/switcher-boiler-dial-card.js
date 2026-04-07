function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",_=f.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const n=s?.call(this);o.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,_?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,O=document,T=()=>O.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=j(1),F=j(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===z?"!--"===l[1]?r=D:void 0!==l[1]?r=H:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=o??z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?N:'"'===l[3]?I:L):r===I||r===L?r=N:r===D||r===H?r=z:(r=N,o=void 0);const d=r===N&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+P:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=X(t,e);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[n++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?st:"@"===r[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=J.nextNode(),n++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}let tt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,o=0;for(const n of e)o===i.length?i.push(s=new t(this.O(T()),this.O(T()),this,this.options)):s=i[o],s._$AI(n),o++;o<i.length&&(this._$AR(s&&s._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=G(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),n||=!M(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Z,tt),(x.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let at=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};at._$litElement$=!0,at.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:at});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:at}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=ct,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ut(t){return dt({...t,state:!0,attribute:!1})}var pt=r`

  ha-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: background-color 0.2s ease;
    height: 100%;
  }

  .container {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%
  }

  .content {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 9px;
      padding-bottom: 10px;
      padding-left: 9px;
      padding-right: 9px;
      flex: 1;
      box-sizing: border-box;
      //pointer-events: none;
      max-width: 100%;
      overflow: hidden;      
  }

  .controls {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 8px 11px 11px 11px;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
  }

  .buttons-group {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
  }

  .button {
    height: var(--feature-height, 42px);
    cursor: pointer;
    transition: background-color 180ms ease-in-out;
    text-align: center;
    flex: 1;
    -webkit-flex: 1;
    border: none;
    border-radius: var(--control-button-border-radius, 10px);
    //pointer-events: none;
    color: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .button .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 1000ms ease-out;
      background-color: currentColor; /* Matches the text color or icon color */
      opacity: 0.08;
      pointer-events: none; /* Prevent interference with button click events */
  }

  @keyframes ripple-animation {
      to {
          transform: scale(30); /* Scale the ripple */
          opacity: 0; /* Fade out */
      }
  }

  .button.power.off {
    background-color: var(--grey-color);
  }

  .button.power.on {
    background-color: #F54436;
  }

  .combined-buttons {
    display: inline-flex;
    flex: 2;
    -webkit-flex: 2;
    gap: 0px;
    border-radius: var(--feature-border-radius, 12px);
    //overflow: hidden;
  }

  .button.dark-theme {
    background-color: rgba(70,70,70,0.2);
  }

  .button.light-theme {
    background-color: rgba(189,189,189,0.2);
  }

  .button.dark-theme:hover {
    background-color: rgba(70,70,70,0.3);
  }

  .button.light-theme:hover {
    background-color: rgba(189,189,189,0.3);
  }

  .combined-buttons .button {
    flex: 1;
    -webkit-flex: 1;
    border-radius: 0;
    background: none;
    display: inline-flex;
    overflow: hidden;
  }

  .combined-buttons .button:first-child {
    border-radius: var(--feature-border-radius, 12px) 0 0 var(--feature-border-radius, 12px);
  }

  .combined-buttons .button:last-child {
    border-radius: 0 var(--feature-border-radius, 12px) var(--feature-border-radius, 12px) 0;
  }

  .button_icon {
    --mdc-icon-size: 20px;
    font-size: 12px;
  }

  .button_icon.power {
    color: rgb(255,255,255);
  }

  .icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
    flex: none;
    margin-right: 10px;
    margin-inline-start: initial;
    margin-inline-end: 10px;
    direction: var(--direction);
    transition: transform 180ms ease-in-out;
  }

  .icon-container.on {
    background-color: rgba(245, 68, 54, 0.2); /* Light red for "on" state */
  }

  .icon-container.off {
    background-color: rgba(158, 158, 158, 0.2); /* Light gray for "off" state */
  }

  .icon-container.cold {
    background-color: rgba(33, 150, 243, 0.2); /* Light blue for low temp */
  }

  .icon-container.warm {
    background-color: rgba(255, 111, 34, 0.2); /* Light orange for mid temp */
  }

  .icon-container.hot {
    background-color: rgba(245, 68, 54, 0.2); /* Light red for high temp */
  }  

  .icon {
    font-size: 24px;
    transition: color 0.3s;
    --mdc-icon-size: 24px;
    line-height: 0px;
  }

  .icon.on {
    color: #F54436; /* Red for "on" state */
  }

  .icon.off {
    color: var(--state-light-off-color, var(--state-light-inactive-color, var(--state-inactive-color)));
  }

  .icon-sensor {
    border-radius: 50%;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    //font-size: 15px;
    font-weight: 500;
    letter-spacing: -1px;
    line-height: 36px;
    //padding-top: 2px;
    text-align: center;
  }

  .icon-sensor.on {
    color: #F54436; /* Red for "on" state */
  }

  .icon-sensor.off {
    color: var(--primary-text-color);
  }

  .icon-sensor.cold {
    color: rgb(33, 150, 243); /* Blue for low temp */
  }

  .icon-sensor.warm {
    color: rgb(255, 111, 34); /* Orange for mid temp */
  }

  .icon-sensor.hot {
    color: rgb(245, 68, 54); /* Red for high temp */
  }    

  .icon-sensor.resolution-0 {
    font-size: 18px;
  }
  .icon-sensor.resolution-1 {
    font-size: 15px;
  }
  .icon-sensor.resolution-2 {
    font-size: 12px;
  }  

  .label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 12px;
    font-size: 14px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;    
  }

  .primary {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .1px;
    color: var(--primary-text-color); 
  }

  .secondary {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: .4px;
    color: var(--primary-text-color);
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    max-width: 100%;
  }

`;class ft extends at{constructor(){super(),this.timerValue="15"}static getConfigElement(){return document.createElement("switcher-boiler-tile-card-editor")}static getStubConfig(){return{type:"custom:switcher-boiler-tile-card",name:"Boiler",entity:"",icon:"",time_left:"",sensor_1:"",sensor_2:"",icon_sensor:"",color_thresholds:!1,cold_threshold:20,hot_threshold:50,temp_resolution:1}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t,this.timerValue=this.config.timer_values?this.config.timer_values[0]:"15";const e=this.config.cold_threshold;if(this.config.hot_threshold<=e)throw new Error("Cold Threshold must be lower then Hot Threshold");let i=this.config.temp_resolution;if(null!=i&&null!=i&&""!=i&&(i=Number(i),isNaN(i)||![0,1,2].includes(i)))throw new Error("Temperature Resolution must be a number and only 0, 1, or 2")}render(){var t,e,i,s,o,n;const{name:r,icon:a,entity:l}=this.config,c=!0===this.config.color_thresholds,h=this.config.cold_threshold||20,d=this.config.hot_threshold||50,u=null!==(t=this.config.temp_resolution)&&void 0!==t?t:1,p=null===(i=null===(e=this.hass)||void 0===e?void 0:e.states)||void 0===i?void 0:i[l];if(!p)return;const f=(null===(s=null==p?void 0:p.attributes)||void 0===s?void 0:s.friendly_name)||"Unknown Entity",g=r||f,m=(null==p?void 0:p.state)||"Unavailable",_=a||(null===(o=null==p?void 0:p.attributes)||void 0===o?void 0:o.icon)||"mdi:waves",b="on"===m,v=parseFloat(null===(n=this.hass.states[this.config.icon_sensor])||void 0===n?void 0:n.state),y=this.config.icon_sensor&&this.hass.states[this.config.icon_sensor]&&!isNaN(v);let $="icon-container",w="icon-sensor";c&&y?v<=h?($+=" cold",w+=" cold"):v>h&&v<=d?($+=" warm",w+=" warm"):($+=" hot",w+=" hot"):b?($+=" on",w+=" on"):($+=" off",w+=" off"),w+=0===u?" resolution-0":2===u?" resolution-2":" resolution-1";const x=b?"icon on":"icon off";let A="";b?(!this.config.time_left||this.config.sensor_1||this.config.sensor_2||(A=this.hass.states[this.config.time_left].state),this.config.time_left&&!this.config.sensor_1&&this.config.sensor_2&&(A=this.hass.states[this.config.time_left].state+" • "+this.hass.states[this.config.sensor_2].state+this.hass.states[this.config.sensor_2].attributes.unit_of_measurement),this.config.time_left&&this.config.sensor_1&&!this.config.sensor_2&&(A=this.hass.states[this.config.time_left].state+" • "+this.hass.states[this.config.sensor_1].state+this.hass.states[this.config.sensor_1].attributes.unit_of_measurement),this.config.time_left&&this.config.sensor_1&&this.config.sensor_2&&(A=this.hass.states[this.config.time_left].state+" • "+this.hass.states[this.config.sensor_1].state+this.hass.states[this.config.sensor_1].attributes.unit_of_measurement+" • "+this.hass.states[this.config.sensor_2].state+this.hass.states[this.config.sensor_2].attributes.unit_of_measurement),!this.config.time_left&&this.config.sensor_1&&this.config.sensor_2&&(A=this.hass.states[this.config.sensor_1].state+this.hass.states[this.config.sensor_1].attributes.unit_of_measurement+" • "+this.hass.states[this.config.sensor_2].state+this.hass.states[this.config.sensor_2].attributes.unit_of_measurement),this.config.time_left||this.config.sensor_1||!this.config.sensor_2||(A=this.hass.states[this.config.sensor_2].state+this.hass.states[this.config.sensor_2].attributes.unit_of_measurement),this.config.time_left||!this.config.sensor_1||this.config.sensor_2||(A=this.hass.states[this.config.sensor_1].state+this.hass.states[this.config.sensor_1].attributes.unit_of_measurement),this.config.time_left||this.config.sensor_1||this.config.sensor_2||(A=this.hass.localize("component.switch.entity_component._.state.on")||"on")):this.config.sensor_2?(A=this.hass.localize("component.switch.entity_component._.state.off")||"off",A+=" • "+this.hass.states[this.config.sensor_2].state,A+=this.hass.states[this.config.sensor_2].attributes.unit_of_measurement):A=this.hass.localize("component.switch.entity_component._.state.off")||"off";const S=b?"button power on":"button power off",E=this.isDarkTheme()?"button dark-theme":"button light-theme";return V`
      <ha-card class="card" id="card">
        <div class="container">
          <div
            class="content"
            @click="${t=>this._showMoreInfo(t,this.config.entity)}"
          >
            <div class="${$}" id="icon-container">
              ${y?this.renderIconSensor(w,v,u):this.renderIcon(x,_)}
            </div>
            <div class="label">
              <span class="primary" id="name">${g}</span>
              <span class="secondary" id="state">${A}</span>
            </div>
          </div>
          <div class="controls">
            <div class="buttons-group">
              <button
                class="${S}"
                @click="${this._toggleBoiler}"
              >
                <ha-icon icon="mdi:power" class="button_icon power"></ha-icon>
              </button>
              <button
                class="${E} timer"
                @click=${this._turnOnBoilerWithTimer}
              >
                <ha-icon
                  icon="mdi:timer-outline"
                  class="button_icon timer"
                ></ha-icon>
              </button>
              <button
                class="${E} timer_time"
                @click=${this._cycleTimerValue}
              >
                ${this.timerValue}
              </button>
            </div>
          </div>
        </div>
      </ha-card>
    `}renderIconSensor(t,e,i){let s;return s=0===i?Math.round(e).toString():e.toFixed(i),V`
      <span
        class="${t}"
        @click="${t=>this._showMoreInfo(t,this.config.icon_sensor)}"
      >
        ${s}°
      </span>
    `}renderIcon(t,e){return V`
      <ha-icon icon="${e}" class="${t}" id="icon"></ha-icon>
    `}_toggleBoiler(t){t.stopPropagation(),t.preventDefault();const e=this.config.entity;this.hass.callService("homeassistant","toggle",{entity_id:e}),this._rippleEffect(t)}_turnOnBoilerWithTimer(t){t.stopPropagation(),t.preventDefault();const e=this.config.entity;this.hass.callService("switcher_kis","turn_on_with_timer",{entity_id:e,timer_minutes:this.timerValue}),this._rippleEffect(t)}_cycleTimerValue(t){t.stopPropagation(),t.preventDefault();const e=[...new Set((this.config.timer_values||["15","30","45","60"]).map(Number).filter((t=>t>=1&&t<=150)).sort(((t,e)=>t-e)).map(String))],i=e.indexOf(this.timerValue);this.timerValue=-1===i?e[0]:e[(i+1)%e.length],this._rippleEffect(t)}_rippleEffect(t){const e=t.currentTarget;if(!e)return;const i=document.createElement("span");i.classList.add("ripple");const s=e.getBoundingClientRect(),o=Math.max(s.width,s.height),n=t.clientX-s.left-o/2,r=t.clientY-s.top-o/2;i.style.width=i.style.height=`${o}px`,i.style.left=`${n}px`,i.style.top=`${r}px`,e.appendChild(i),setTimeout((()=>i.remove()),1e3)}_showMoreInfo(t,e){if(t.stopPropagation(),t.preventDefault(),!e)return;const i=new CustomEvent("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(i)}isDarkTheme(){var t;return null!==(t=this.hass.themes.darkMode)&&void 0!==t&&t}getCardSize(){return 3}getLayoutOptions(){return{grid_rows:2,grid_columns:2,grid_min_rows:2,grid_max_rows:2,grid_min_columns:2,grid_max_columns:4}}}ft.styles=pt,t([ut()],ft.prototype,"timerValue",void 0),t([dt({attribute:!1})],ft.prototype,"hass",void 0),t([dt({attribute:!1})],ft.prototype,"config",void 0);var gt=r`
  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Dial wrapper ──────────────────────────────────────────────────────── */

  .timer-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px 4px 8px;
    container-type: inline-size;
  }

  .timer-svg {
    /*
     * Scale to the card's width, capped at 280 px.
     * aspect-ratio keeps it square regardless of parent height,
     * so the dial is always visible in vertical stacks, grids, etc.
     */
    width:  min(100cqw, 280px);
    aspect-ratio: 1 / 1;
    display: block;
    touch-action: none;
  }

  /* ── SVG text inside the dial ──────────────────────────────────────────── */

  .inner-name {
    font-size: 14px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: all;
    cursor: pointer;
  }

  .center-value {
    font-size: 42px;
    fill: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    pointer-events: none;
  }

  .center-value--sm {
    font-size: 28px;
  }

  .center-unit {
    font-size: 13px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .inner-state {
    font-size: 12px;
    fill: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .inner-power {
    font-size: 11px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  /* ── Drag handle ───────────────────────────────────────────────────────── */

  .timer-handle {
    cursor: grab;
    touch-action: none;
  }

  .timer-handle.dragging {
    cursor: grabbing;
  }

  /* ── Power button ──────────────────────────────────────────────────────── */

  .bottom-controls {
    display: flex;
    padding: 0 8px 8px 8px;
    flex-shrink: 0;
  }

  .btn {
    height: 36px;
    border: none;
    border-radius: var(--control-button-border-radius, 10px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 180ms ease-in-out;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }

  .btn-icon {
    --mdc-icon-size: 18px;
    line-height: 0;
  }

  .power-btn {
    flex: 1;
  }

  .power-btn.on {
    background-color: #F54436;
    color: #ffffff;
  }

  .power-btn.on .btn-icon { color: #ffffff; }

  .power-btn.on:hover  { background-color: #d43020; }

  .power-btn.off {
    background-color: rgba(158, 158, 158, 0.2);
    color: var(--primary-text-color);
  }

  .power-btn.off .btn-icon { color: var(--primary-text-color); }

  .power-btn.off:hover { background-color: rgba(158, 158, 158, 0.3); }
`;const mt=120,_t=120,bt=95,vt=360,yt=2*Math.PI*bt,$t=yt;function wt(t,e){return 0+t/e*vt}function xt(t){const e=(t-90)*(Math.PI/180);return{x:mt+bt*Math.cos(e),y:_t+bt*Math.sin(e)}}class At extends at{constructor(){super(...arguments),this._arcDeg=0,this._dragging=!1,this._lastArcDeg=0,this._lastRawAngle=0,this._dragStarted=!1,this._prevEntityState=""}static getConfigElement(){return document.createElement("switcher-boiler-dial-card-editor")}static getStubConfig(){return{type:"custom:switcher-boiler-dial-card",name:"Boiler",entity:"",icon:"",time_left:"",power_sensor:"",timer_limit:90}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t,this._arcDeg=0}updated(t){var e,i,s,o,n;if(super.updated(t),!t.has("hass")||!(null===(e=this.config)||void 0===e?void 0:e.entity))return;const r=null!==(n=null===(o=null===(s=null===(i=this.hass)||void 0===i?void 0:i.states)||void 0===s?void 0:s[this.config.entity])||void 0===o?void 0:o.state)&&void 0!==n?n:"";"on"===this._prevEntityState&&"on"!==r&&(this._arcDeg=0),this._prevEntityState=r}get _maxArcDeg(){var t;const e=null===(t=this.config)||void 0===t?void 0:t.timer_limit;return(null!=e&&""!==e?Number(e):150)/60*vt}get _timerMinutes(){return Math.round(this._arcDeg/vt*60)}get _timerDisplay(){const t=this._timerMinutes;if(t<60)return String(t);return`${Math.floor(t/60)}:${(t%60).toString().padStart(2,"0")}`}get _timerUnit(){return this._timerMinutes>=60?"hr":"min"}_rawAngleFromPointer(t){var e;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".timer-svg");if(!i)return 0;const s=i.getBoundingClientRect(),o=240/s.width;return function(t,e){let i=180*Math.atan2(e,t)/Math.PI+90;return i<0&&(i+=360),i>=360&&(i-=360),i}((t.clientX-s.left)*o-mt,(t.clientY-s.top)*o-_t)}_onPointerDown(t){t.preventDefault(),t.stopPropagation(),this._dragging=!0,this._dragStarted=!1,this._lastRawAngle=this._rawAngleFromPointer(t),this._lastArcDeg=this._arcDeg,t.currentTarget.setPointerCapture(t.pointerId)}_onPointerMove(t){if(!this._dragging)return;t.preventDefault();const e=this._rawAngleFromPointer(t);let i=e-this._lastRawAngle;i>180&&(i-=360),i<-180&&(i+=360);let s=this._arcDeg+i;s=Math.max(0,Math.min(this._maxArcDeg,s)),this._arcDeg=s,this._lastRawAngle=e,this._dragStarted=!0}_onPointerUp(t){this._dragging&&this._dragStarted&&this._timerMinutes>0&&this.hass.callService("switcher_kis","turn_on_with_timer",{entity_id:this.config.entity,timer_minutes:String(this._timerMinutes)}),this._dragging=!1,this._dragStarted=!1}_toggleBoiler(t){t.stopPropagation(),this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity})}_showMoreInfo(t){t.stopPropagation();const e=this.config.entity;e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,cancelable:!0,composed:!0,detail:{entityId:e}}))}render(){var t,e,i,s,o,n;const r=null===(e=null===(t=this.hass)||void 0===t?void 0:t.states)||void 0===e?void 0:e[this.config.entity];if(!r)return;const a=(null===(i=r.attributes)||void 0===i?void 0:i.friendly_name)||"Boiler",l=this.config.name||a,c="on"===r.state,h=this.config.time_left&&null!==(o=null===(s=this.hass.states[this.config.time_left])||void 0===s?void 0:s.state)&&void 0!==o?o:null,d=c&&!this._dragging&&null!==h&&"unavailable"!==h&&"unknown"!==h&&"00:00:00"!==h,u=h?h.replace(/^0(\d:)/,"$1"):"",p=d?u:this._timerDisplay;let f="";if(this.config.power_sensor&&this.hass.states[this.config.power_sensor]){const t=this.hass.states[this.config.power_sensor],e=(null===(n=t.attributes)||void 0===n?void 0:n.unit_of_measurement)||"";f=`${t.state}${e}`}const g=c?this.hass.localize("component.switch.entity_component._.state.on")||"on":this.hass.localize("component.switch.entity_component._.state.off")||"off",m=f?`${g} · ${f}`:g,_=this._arcDeg%vt,b=Math.floor(this._arcDeg/vt),v=0===_&&b>0?$t:$t*(_/vt),y=this._arcDeg>0,$=xt(wt(this._timerMinutes%60,60)),w=this._dragging?13:11;return V`
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
            <circle cx="${mt}" cy="${_t}" r="${bt}"
              fill="none"
              stroke="rgba(128,128,128,0.18)"
              stroke-width="13"
            />

            <!-- Completed-lap ring (muted full circle) -->
            ${b>0?F`
              <circle cx="${mt}" cy="${_t}" r="${bt}"
                fill="none"
                stroke="rgba(245,68,54,0.2)"
                stroke-width="13"
              />`:""}

            <!-- Active arc (red, starts at 12 o'clock, goes clockwise) -->
            ${y?F`
              <circle cx="${mt}" cy="${_t}" r="${bt}"
                fill="none"
                stroke="#F54436"
                stroke-width="13"
                stroke-linecap="round"
                stroke-dasharray="${v} ${yt-v}"
                transform="rotate(${-90}, ${mt}, ${_t})"
              />`:""}

            <!-- Tick dots at 0 / 15 / 30 / 45 min (cardinal positions) -->
            ${[0,15,30,45].map((t=>{const e=xt(wt(t,60));return F`
                <circle cx="${e.x}" cy="${e.y}" r="2.5"
                  fill="rgba(128,128,128,0.45)" />`}))}

            <!-- ── Inner content: fixed rows, nothing ever disappears ─── -->
            <!-- Row 1: name -->
            <text x="${mt}" y="82"
              text-anchor="middle" dominant-baseline="middle"
              class="inner-name"
              @click="${this._showMoreInfo}"
            >${l}</text>

            <!-- Row 2: big number — countdown or set minutes -->
            <text x="${mt}" y="122"
              text-anchor="middle" dominant-baseline="middle"
              class="center-value"
              style="${d?"font-size:26px":""}"
            >${p}</text>

            <!-- Row 3: state + power combined, e.g. "on · 2.4kW" -->
            <text x="${mt}" y="158"
              text-anchor="middle" dominant-baseline="middle"
              class="inner-state"
            >${m}</text>

            <!-- ── Handle ─────────────────────────────────────────────── -->
            <!-- Visual dot (no pointer events) -->
            <circle cx="${$.x}" cy="${$.y}" r="${w}"
              fill="white"
              stroke="#F54436"
              stroke-width="2.5"
              filter="url(#ks)"
              style="pointer-events:none"
            />
            <!-- Large transparent hit area (~44 px touch target) -->
            <circle cx="${$.x}" cy="${$.y}" r="22"
              fill="transparent"
              class="timer-handle ${this._dragging?"dragging":""}"
              @pointerdown="${this._onPointerDown}"
              @pointermove="${this._onPointerMove}"
              @pointerup="${this._onPointerUp}"
            />
          </svg>
        </div>

        <!-- ── Power button ──────────────────────────────────────────── -->
        <div class="bottom-controls">
          <button
            class="btn power-btn ${c?"on":"off"}"
            @click="${this._toggleBoiler}"
          >
            <ha-icon icon="mdi:power" class="btn-icon"></ha-icon>
            <span>${c?"Turn Off":"Turn On"}</span>
          </button>
        </div>

      </ha-card>
    `}getCardSize(){return 3}getLayoutOptions(){return{grid_rows:3,grid_columns:2,grid_min_rows:2,grid_max_rows:6,grid_min_columns:2,grid_max_columns:4}}}At.styles=gt,t([ut()],At.prototype,"_arcDeg",void 0),t([ut()],At.prototype,"_dragging",void 0),t([dt({attribute:!1})],At.prototype,"hass",void 0),t([dt({attribute:!1})],At.prototype,"config",void 0);var St=r`

  .card-config {
    /* Cancels overlapping Margins for HAForm + Card Config options */
    overflow: auto;
  }
  ha-switch {
    padding: 16px 6px;
  }
  .side-by-side {
    display: flex;
    align-items: flex-end;
  }
  .side-by-side > * {
    flex: 1;
    padding-right: 8px;
  }
  .side-by-side > *:last-child {
    flex: 1;
    padding-right: 0;
  }
  .suffix {
    margin: 0 8px;
  }
  hui-action-editor,
  ha-select,
  ha-textfield,
  ha-icon-picker {
    margin-top: 8px;
    display: block;
  }
  .timer-values {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin-top: 16px;
  }
  .timer-values label {
    display: flex;
    align-items: center;
  }
  .timer-values input {
    margin-right: 8px;
  }
  .timer-values-label {
    margin-top: 24px;
    margin-bottom: 8px;
    margin-right: 6px;
    margin-left: 6px;
  }

`;const Et=[{name:"entity",selector:{entity:{domain:["switch"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"time_left",selector:{entity:{domain:["sensor"]}}},{name:"sensor_1",selector:{entity:{domain:["sensor"]}}},{name:"sensor_2",selector:{entity:{domain:["sensor"]}}},{name:"icon_sensor",selector:{entity:{domain:["sensor"]}}},{name:"color_thresholds",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"cold_threshold",selector:{number:{min:10,max:80,step:1,mode:"slider"}}},{name:"hot_threshold",selector:{number:{min:10,max:80,step:1,mode:"slider"}}}]},{name:"temp_resolution",selector:{number:{min:0,max:2,step:1,mode:"slider"}}},{name:"timer_values",selector:{}}];class Ct extends at{constructor(){super(...arguments),this._config={},this._valueChanged=t=>((t,e,i,s={})=>{const o=new CustomEvent(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed,detail:i});return t.dispatchEvent(o),o})(this,"config-changed",{config:t.detail.value}),this._computeLabelCallback=t=>{const{name:e}=t;switch(e){case"time_left":return"Time Left Sensor (Optional)";case"sensor_1":return"Sensor 1 - On state (Optional)";case"sensor_2":return"Sensor 2 - On and Off state (Optional)";case"icon_sensor":return"Icon Sensor (Optional)";case"color_thresholds":return"Color Thresholds (Optional)";case"cold_threshold":return"Cold Threshold";case"hot_threshold":return"Hot Threshold";case"temp_resolution":return"Temperature Resolution (Optional)";default:return`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${e}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`}}}setConfig(t){this._config=Object.assign(Object.assign({},t),{timer_values:[...new Set((t.timer_values||["15","30","45","60"]).map(Number).filter((t=>t>=1&&t<=150)).sort(((t,e)=>t-e)).map(String))]})}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Et.filter((t=>"temp_resolution"===t.name||"color_thresholds"===t.name?!!this._config.icon_sensor:"grid"===t.type&&Array.isArray(t.schema)&&t.schema.some((t=>"cold_threshold"===t.name))&&t.schema.some((t=>"hot_threshold"===t.name))?!!this._config.icon_sensor&&!!this._config.color_thresholds:"timer_values"!==t.name))}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderTimerValues()}
    `:V``}_renderTimerValues(){const t=this._config.timer_values||[];return V`
      <div class="timer-values-label">Timer Values (Minutes) (Optional)</div>
      <div class="timer-values">
        ${[{value:"15",label:"15"},{value:"30",label:"30"},{value:"45",label:"45"},{value:"60",label:"60"},{value:"75",label:"75"},{value:"90",label:"90"},{value:"105",label:"105"},{value:"120",label:"120"},{value:"135",label:"135"},{value:"150",label:"150"}].map((e=>V`
            <label>
              <input
                type="checkbox"
                value="${e.value}"
                ?checked=${t.includes(e.value)}
                @change=${this._onTimerValueChanged}
              />
              ${e.label}
            </label>
          `))}
      </div>
    `}_onTimerValueChanged(t){var e;const i=t.target,s=null==i?void 0:i.value,o=null!==(e=null==i?void 0:i.checked)&&void 0!==e&&e,n=this._config.timer_values||[],r=o?[...n,s]:n.filter((t=>t!==s)),a=r.filter((t=>void 0!==t)).sort(((t,e)=>parseInt(t)-parseInt(e)));this._valueChanged(new CustomEvent("value-changed",{detail:{value:Object.assign(Object.assign({},this._config),{timer_values:a})}}))}}Ct.styles=St,t([ut()],Ct.prototype,"_config",void 0);const kt=[{name:"entity",selector:{entity:{domain:["switch"]}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"time_left",selector:{entity:{domain:["sensor"]}}},{name:"power_sensor",selector:{entity:{domain:["sensor"]}}},{name:"timer_limit",selector:{number:{min:15,max:150,step:15,mode:"slider"}}}];class Pt extends at{constructor(){super(...arguments),this._config={},this._computeLabel=t=>{switch(t.name){case"time_left":return"Time Left Sensor (Optional)";case"power_sensor":return"Power Consumption Sensor (Optional)";case"timer_limit":return"Timer Limit in Minutes (Optional)";default:return`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`}},this._valueChanged=t=>{return e=this,i="config-changed",s={config:t.detail.value},void e.dispatchEvent(new CustomEvent(i,{bubbles:!0,cancelable:!1,composed:!0,detail:s}));var e,i,s}}setConfig(t){this._config=t}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${kt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:V``}}t([ut()],Pt.prototype,"_config",void 0);console.groupCollapsed("%c SWITCHER-BOILER-DIAL-CARD %c v1.0.0","color: white; background: #F54436; font-weight: bold","color: #F54436; font-weight: bold"),console.log("Readme:","https://github.com/Puuuchkie/switcher-boiler-dial-card"),console.groupEnd(),customElements.define("switcher-boiler-dial-card",At),customElements.define("switcher-boiler-dial-card-editor",Pt),customElements.define("switcher-boiler-tile-card",ft),customElements.define("switcher-boiler-tile-card-editor",Ct),window.customCards=window.customCards||[],window.customCards.push({type:"switcher-boiler-dial-card",name:"Switcher Boiler Dial Card",description:"Switcher Boiler card with a draggable circular timer dial",preview:!0,documentationURL:"https://github.com/Puuuchkie/switcher-boiler-dial-card",configurable:!0}),window.customCards.push({type:"switcher-boiler-tile-card",name:"Switcher Boiler Tile Card",description:"Switcher Boiler tile card with preset timer buttons",preview:!0,documentationURL:"https://github.com/Puuuchkie/switcher-boiler-dial-card",configurable:!0});
