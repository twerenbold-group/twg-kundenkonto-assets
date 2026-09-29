/* esm.sh - @lit/context@1.1.0 */
var a=class extends Event{constructor(t,s,o){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.callback=s,this.subscribe=o??!1}};function p(r){return r}var h=class{constructor(t,s,o,e){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,n)),this.unsubscribe=n},this.host=t,s.context!==void 0){let i=s;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=s,this.callback=o,this.subscribe=e??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new a(this.context,this.t,this.subscribe))}};var d=class{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,s=!1){let o=s||!Object.is(t,this.o);this.o=t,o&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[s,{disposer:o}]of this.subscriptions)s(this.o,o)},t!==void 0&&(this.value=t)}addCallback(t,s,o){if(!o)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:s});let{disposer:e}=this.subscriptions.get(t);t(this.value,e)}clearCallbacks(){this.subscriptions.clear()}};var l=class extends Event{constructor(t){super("context-provider",{bubbles:!0,composed:!0}),this.context=t}},u=class extends d{constructor(t,s,o){super(s.context!==void 0?s.initialValue:o),this.onContextRequest=e=>{let i=e.composedPath()[0];e.context===this.context&&i!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,i,e.subscribe))},this.onProviderRequest=e=>{let i=e.composedPath()[0];if(e.context!==this.context||i===this.host)return;let n=new Set;for(let[c,{consumerHost:b}]of this.subscriptions)n.has(c)||(n.add(c),b.dispatchEvent(new a(this.context,c,!0)));e.stopPropagation()},this.host=t,s.context!==void 0?this.context=s.context:this.context=s,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new l(this.context))}};var x=class{constructor(){this.pendingContextRequests=new Map,this.onContextProvider=t=>{let s=this.pendingContextRequests.get(t.context);if(s===void 0)return;this.pendingContextRequests.delete(t.context);let{requests:o}=s;for(let{elementRef:e,callbackRef:i}of o){let n=e.deref(),c=i.deref();n===void 0||c===void 0||n.dispatchEvent(new a(t.context,c,!0))}},this.onContextRequest=t=>{if(t.subscribe!==!0)return;let s=t.composedPath()[0],o=t.callback,e=this.pendingContextRequests.get(t.context);e===void 0&&this.pendingContextRequests.set(t.context,e={callbacks:new WeakMap,requests:[]});let i=e.callbacks.get(s);i===void 0&&e.callbacks.set(s,i=new WeakSet),i.has(o)||(i.add(o),e.requests.push({elementRef:new WeakRef(s),callbackRef:new WeakRef(o)}))}}attach(t){t.addEventListener("context-request",this.onContextRequest),t.addEventListener("context-provider",this.onContextProvider)}detach(t){t.removeEventListener("context-request",this.onContextRequest),t.removeEventListener("context-provider",this.onContextProvider)}};function v({context:r}){return(t,s)=>{let o=new WeakMap;if(typeof s=="object")return s.addInitializer((function(){o.set(this,new u(this,{context:r}))})),{get(){return t.get.call(this)},set(e){return o.get(this)?.setValue(e),t.set.call(this,e)},init(e){return o.get(this)?.setValue(e),e}};{t.constructor.addInitializer((n=>{o.set(n,new u(n,{context:r}))}));let e=Object.getOwnPropertyDescriptor(t,s),i;if(e===void 0){let n=new WeakMap;i={get:function(){return n.get(this)},set:function(c){o.get(this).setValue(c),n.set(this,c)},configurable:!0,enumerable:!0}}else{let n=e.set;i={...e,set:function(c){o.get(this).setValue(c),n?.call(this,c)}}}return void Object.defineProperty(t,s,i)}}}function f({context:r,subscribe:t}){return(s,o)=>{typeof o=="object"?o.addInitializer((function(){new h(this,{context:r,callback:e=>{this[o.name]=e},subscribe:t})})):s.constructor.addInitializer((e=>{new h(e,{context:r,callback:i=>{e[o]=i},subscribe:t})}))}}export{h as ContextConsumer,a as ContextEvent,u as ContextProvider,x as ContextRoot,f as consume,p as createContext,v as provide};
/*! Bundled license information:

@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/context/lib/decorators/provide.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/context/lib/decorators/consume.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=context.bundle.mjs.map