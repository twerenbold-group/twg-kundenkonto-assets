/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, Q = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ne = /* @__PURE__ */ new WeakMap();
class be {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.i;
    const t = this.t;
    if (Q && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = ne.get(t)), e === void 0 && ((this.i = e = new CSSStyleSheet()).replaceSync(this.cssText), o && ne.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const Ee = (r) => new be(typeof r == "string" ? r : r + "", void 0, ee), Ce = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce(((o, n, i) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[i + 1]), r[0]);
  return new be(t, r, ee);
}, Te = (r, e) => {
  if (Q) r.adoptedStyleSheets = e.map(((t) => t instanceof CSSStyleSheet ? t : t.styleSheet));
  else for (const t of e) {
    const o = document.createElement("style"), n = D.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = t.cssText, r.appendChild(o);
  }
}, ie = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Ee(t);
})(r) : r, { is: ze, defineProperty: Ue, getOwnPropertyDescriptor: Oe, getOwnPropertyNames: Ie, getOwnPropertySymbols: Pe, getPrototypeOf: Ne } = Object, y = globalThis, se = y.trustedTypes, Le = se ? se.emptyScript : "", Y = y.reactiveElementPolyfillSupport, z = (r, e) => r, X = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Le : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ve = (r, e) => !ze(r, e), ae = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: ve };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class S extends HTMLElement {
  static addInitializer(e) {
    this.o(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this.u && [...this.u.keys()];
  }
  static createProperty(e, t = ae) {
    if (t.state && (t.attribute = !1), this.o(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), n = this.getPropertyDescriptor(e, o, t);
      n !== void 0 && Ue(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: n, set: i } = Oe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: n, set(s) {
      const c = n == null ? void 0 : n.call(this);
      i == null || i.call(this, s), this.requestUpdate(e, c, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ae;
  }
  static o() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const e = Ne(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this.o(), this.hasOwnProperty(z("properties"))) {
      const t = this.properties, o = [...Ie(t), ...Pe(t)];
      for (const n of o) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, n] of t) this.elementProperties.set(o, n);
    }
    this.u = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const n = this.p(t, o);
      n !== void 0 && this.u.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const n of o) t.unshift(ie(n));
    } else e !== void 0 && t.push(ie(e));
    return t;
  }
  static p(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this.v = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.m = null, this._();
  }
  _() {
    var e;
    this.S = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this.$(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((t) => t(this)));
  }
  addController(e) {
    var t;
    (this.P ?? (this.P = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this.P) == null || t.delete(e);
  }
  $() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this.v = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Te(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this.P) == null || e.forEach(((t) => {
      var o;
      return (o = t.hostConnected) == null ? void 0 : o.call(t);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this.P) == null || e.forEach(((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    }));
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  C(e, t) {
    var i;
    const o = this.constructor.elementProperties.get(e), n = this.constructor.p(e, o);
    if (n !== void 0 && o.reflect === !0) {
      const s = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : X).toAttribute(t, o.type);
      this.m = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this.m = null;
    }
  }
  _$AK(e, t) {
    var i, s;
    const o = this.constructor, n = o.u.get(e);
    if (n !== void 0 && this.m !== n) {
      const c = o.getPropertyOptions(n), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((i = c.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? c.converter : X;
      this.m = n;
      const l = a.fromAttribute(t, c.type);
      this[n] = l ?? ((s = this.T) == null ? void 0 : s.get(n)) ?? l, this.m = null;
    }
  }
  requestUpdate(e, t, o) {
    var n;
    if (e !== void 0) {
      const i = this.constructor, s = this[e];
      if (o ?? (o = i.getPropertyOptions(e)), !((o.hasChanged ?? ve)(s, t) || o.useDefault && o.reflect && s === ((n = this.T) == null ? void 0 : n.get(e)) && !this.hasAttribute(i.p(e, o)))) return;
      this.M(e, t, o);
    }
    this.isUpdatePending === !1 && (this.S = this.k());
  }
  M(e, t, { useDefault: o, reflect: n, wrapped: i }, s) {
    o && !(this.T ?? (this.T = /* @__PURE__ */ new Map())).has(e) && (this.T.set(e, s ?? t ?? this[e]), i !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), n === !0 && this.m !== e && (this.A ?? (this.A = /* @__PURE__ */ new Set())).add(e));
  }
  async k() {
    this.isUpdatePending = !0;
    try {
      await this.S;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.v) {
        for (const [i, s] of this.v) this[i] = s;
        this.v = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, s] of n) {
        const { wrapped: c } = s, a = this[i];
        c !== !0 || this._$AL.has(i) || a === void 0 || this.M(i, void 0, s, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this.P) == null || o.forEach(((n) => {
        var i;
        return (i = n.hostUpdate) == null ? void 0 : i.call(n);
      })), this.update(t)) : this.U();
    } catch (n) {
      throw e = !1, this.U(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this.P) == null || t.forEach(((o) => {
      var n;
      return (n = o.hostUpdated) == null ? void 0 : n.call(o);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  U() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.S;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this.A && (this.A = this.A.forEach(((t) => this.C(t, this[t])))), this.U();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[z("elementProperties")] = /* @__PURE__ */ new Map(), S[z("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: S }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, j = U.trustedTypes, le = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ye = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + v, Me = `<${xe}>`, A = document, P = () => A.createComment(""), N = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, Re = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", K = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, de = />/g, x = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, pe = /"/g, we = /^(?:script|style|textarea|title)$/i, De = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), qe = De(1), $ = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function ke(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const He = (r, e) => {
  const t = r.length - 1, o = [];
  let n, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = E;
  for (let c = 0; c < t; c++) {
    const a = r[c];
    let l, p, h = -1, m = 0;
    for (; m < a.length && (s.lastIndex = m, p = s.exec(a), p !== null); ) m = s.lastIndex, s === E ? p[1] === "!--" ? s = ce : p[1] !== void 0 ? s = de : p[2] !== void 0 ? (we.test(p[2]) && (n = RegExp("</" + p[2], "g")), s = x) : p[3] !== void 0 && (s = x) : s === x ? p[0] === ">" ? (s = n ?? E, h = -1) : p[1] === void 0 ? h = -2 : (h = s.lastIndex - p[2].length, l = p[1], s = p[3] === void 0 ? x : p[3] === '"' ? pe : he) : s === pe || s === he ? s = x : s === ce || s === de ? s = E : (s = x, n = void 0);
    const b = s === x && r[c + 1].startsWith("/>") ? " " : "";
    i += s === E ? a + Me : h >= 0 ? (o.push(l), a.slice(0, h) + ye + a.slice(h) + v + b) : a + v + (h === -2 ? c : b);
  }
  return [ke(r, i + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class L {
  constructor({ strings: e, _$litType$: t }, o) {
    let n;
    this.parts = [];
    let i = 0, s = 0;
    const c = e.length - 1, a = this.parts, [l, p] = He(e, t);
    if (this.el = L.createElement(l, o), w.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = w.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(ye)) {
          const m = p[s++], b = n.getAttribute(h).split(v), R = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: i, name: R[2], strings: b, ctor: R[1] === "." ? Be : R[1] === "?" ? je : R[1] === "@" ? Ve : V }), n.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: i }), n.removeAttribute(h));
        if (we.test(n.tagName)) {
          const h = n.textContent.split(v), m = h.length - 1;
          if (m > 0) {
            n.textContent = j ? j.emptyScript : "";
            for (let b = 0; b < m; b++) n.append(h[b], P()), w.nextNode(), a.push({ type: 2, index: ++i });
            n.append(h[m], P());
          }
        }
      } else if (n.nodeType === 8) if (n.data === xe) a.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: i }), h += v.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const o = A.createElement("template");
    return o.innerHTML = e, o;
  }
}
function _(r, e, t = r, o) {
  var s, c;
  if (e === $) return e;
  let n = o !== void 0 ? (s = t.N) == null ? void 0 : s[o] : t.O;
  const i = N(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== i && ((c = n == null ? void 0 : n._$AO) == null || c.call(n, !1), i === void 0 ? n = void 0 : (n = new i(r), n._$AT(r, t, o)), o !== void 0 ? (t.N ?? (t.N = []))[o] = n : t.O = n), n !== void 0 && (e = _(r, n._$AS(r, e.values), n, o)), e;
}
class We {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  R(e) {
    const { el: { content: t }, parts: o } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? A).importNode(t, !0);
    w.currentNode = n;
    let i = w.nextNode(), s = 0, c = 0, a = o[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let l;
        a.type === 2 ? l = new M(i, i.nextSibling, this, e) : a.type === 1 ? l = new a.ctor(i, a.name, a.strings, this, e) : a.type === 6 && (l = new Ye(i, this, e)), this._$AV.push(l), a = o[++c];
      }
      s !== (a == null ? void 0 : a.index) && (i = w.nextNode(), s++);
    }
    return w.currentNode = A, n;
  }
  V(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class M {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this.D;
  }
  constructor(e, t, o, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = n, this.D = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = _(this, e, t), N(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== $ && this.L(e) : e._$litType$ !== void 0 ? this.j(e) : e.nodeType !== void 0 ? this.I(e) : Re(e) ? this.H(e) : this.L(e);
  }
  B(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  I(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.B(e));
  }
  L(e) {
    this._$AH !== f && N(this._$AH) ? this._$AA.nextSibling.data = e : this.I(A.createTextNode(e)), this._$AH = e;
  }
  j(e) {
    var i;
    const { values: t, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = L.createElement(ke(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === n) this._$AH.V(t);
    else {
      const s = new We(n, this), c = s.R(this.options);
      s.V(t), this.I(c), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new L(e)), t;
  }
  H(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, n = 0;
    for (const i of e) n === t.length ? t.push(o = new M(this.B(P()), this.B(P()), this, this.options)) : o = t[n], o._$AI(i), n++;
    n < t.length && (this._$AR(o && o._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this.D = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, n, i) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = f;
  }
  _$AI(e, t = this, o, n) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) e = _(this, e, t, 0), s = !N(e) || e !== this._$AH && e !== $, s && (this._$AH = e);
    else {
      const c = e;
      let a, l;
      for (e = i[0], a = 0; a < i.length - 1; a++) l = _(this, c[o + a], t, a), l === $ && (l = this._$AH[a]), s || (s = !N(l) || l !== this._$AH[a]), l === f ? e = f : e !== f && (e += (l ?? "") + i[a + 1]), this._$AH[a] = l;
    }
    s && !n && this.W(e);
  }
  W(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Be extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class je extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Ve extends V {
  constructor(e, t, o, n, i) {
    super(e, t, o, n, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = _(this, e, t, 0) ?? f) === $) return;
    const o = this._$AH, n = e === f && o !== f || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== f && (o === f || n);
    n && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ye {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    _(this, e);
  }
}
const G = U.litHtmlPolyfillSupport;
G == null || G(L, M), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.1");
const Ke = (r, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = o._$litPart$;
  if (n === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = n = new M(e.insertBefore(P(), i), i, void 0, t ?? {});
  }
  return n._$AI(r), n;
}, k = globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class H extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.rt = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.rt = Ke(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this.rt) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.rt) == null || e.setConnected(!1);
  }
  render() {
    return $;
  }
}
var me;
H._$litElement$ = !0, H.finalized = !0, (me = k.litElementHydrateSupport) == null || me.call(k, { LitElement: H });
const J = k.litElementPolyfillSupport;
J == null || J({ LitElement: H });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.1");
const re = "twerenbold_error_log", oe = "twerenbold_error_log_sent", Ge = 100, Ae = 24, d = {
  // n8n Webhook URL - configure this with your actual endpoint
  url: "https://cloud.activepieces.com/api/v1/webhooks/dKBwB8i4rsrVNSKIBtsyJ",
  // Set via logger.configureWebhook() or directly here
  enabled: !0,
  batchSize: 10,
  // Send in batches of 10
  minIntervalMs: 6e4,
  // Minimum 1 minute between sends
  retryDelayMs: 3e4,
  // Retry after 30 seconds on failure
  maxRetries: 3
};
let C = null, ge = 0, W = 0, F = null;
const u = () => {
  var r;
  if (typeof window > "u") return !1;
  try {
    return typeof process < "u" && ((r = process.env) == null ? void 0 : r.NODE_ENV) === "development" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.includes(".local") || location.hostname.includes("staging.") || location.port !== "";
  } catch {
    return !1;
  }
}, O = () => {
  if (typeof localStorage > "u") return [];
  try {
    const r = localStorage.getItem(re);
    if (!r) return [];
    const e = JSON.parse(r), t = Date.now() - Ae * 60 * 60 * 1e3;
    return e.filter((o) => o.timestamp > t);
  } catch {
    return [];
  }
}, Je = (r) => {
  if (!(typeof localStorage > "u"))
    try {
      const e = O();
      e.push(r);
      const t = e.slice(-Ge);
      localStorage.setItem(re, JSON.stringify(t));
    } catch {
    }
}, Fe = () => {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.removeItem(re), localStorage.removeItem(oe);
    } catch {
    }
}, Se = () => {
  if (typeof localStorage > "u") return /* @__PURE__ */ new Set();
  try {
    const r = localStorage.getItem(oe);
    return r ? new Set(JSON.parse(r)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}, $e = (r) => {
  if (!(typeof localStorage > "u"))
    try {
      const e = Se();
      r.forEach((n) => e.add(n));
      const t = Date.now() - Ae * 60 * 60 * 1e3, o = [...e].filter((n) => n > t);
      localStorage.setItem(oe, JSON.stringify(o));
    } catch {
    }
}, B = () => {
  const r = O(), e = Se();
  return r.filter((t) => !e.has(t.timestamp));
}, _e = async (r) => {
  if (!d.enabled || !d.url || r.length === 0)
    return !1;
  try {
    const e = {
      source: "twerenbold-spa",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      hostname: typeof window < "u" ? window.location.hostname : "unknown",
      userAgent: typeof navigator < "u" ? navigator.userAgent : "unknown",
      logCount: r.length,
      logs: r.map((o) => ({
        ...o,
        // Ensure no sensitive data is sent unless it's a critical error where user context is needed
        // but still filter out potentially huge response bodies if not needed
        responseData: void 0
      }))
    }, t = await fetch(d.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return t.ok ? (W = 0, !0) : (console.warn(`⚠️ Webhook response error: ${t.status}`), !1);
  } catch (e) {
    return console.warn("⚠️ Webhook send failed:", e.message), !1;
  }
}, Xe = async () => {
  if (!d.enabled || !d.url)
    return;
  const r = Date.now();
  if (r - ge < d.minIntervalMs)
    return;
  const e = B();
  if (e.length === 0)
    return;
  const t = e.slice(0, d.batchSize);
  await _e(t) ? (ge = r, $e(t.map((n) => n.timestamp)), e.length > d.batchSize && q(d.minIntervalMs)) : (W++, W <= d.maxRetries ? q(d.retryDelayMs) : (console.warn("⚠️ Webhook max retries reached, will retry on next error"), W = 0));
}, q = (r) => {
  F && clearTimeout(F), F = setTimeout(() => {
    Xe();
  }, r);
}, ue = () => {
  d.enabled && q(5e3);
}, g = {
  /**
   * Set the current user context for logging
   * @param {Object} user - User object (should contain uid/email)
   */
  setContextUser(r) {
    C = r ? {
      uid: r.uid || r.id || r.localAccountId,
      email: r.email || r.username
    } : null, u() && console.log("👤 Logger context updated:", C);
  },
  /**
   * Log only in development (INFO level)
   * @param {...any} args - Arguments to log
   */
  dev(...r) {
    u() && console.log(...r);
  },
  /**
   * Log only in development (DEBUG level)
   * @param {...any} args - Arguments to log
   */
  debug(...r) {
    u() && console.debug(...r);
  },
  /**
   * Always log warnings (safe for production)
   * @param {...any} args - Arguments to log
   */
  warn(...r) {
    console.warn(...r);
  },
  /**
   * Always log errors (safe for production)
   * @param {...any} args - Arguments to log
   */
  error(...r) {
    console.error(...r);
  },
  /**
   * Always log info (use sparingly in production)
   * @param {...any} args - Arguments to log
   */
  info(...r) {
    console.info(...r);
  },
  /**
   * Log sensitive data only in development
   * Sanitizes data in production
   * @param {string} message - Log message
   * @param {any} sensitiveData - Sensitive data to log
   */
  sensitive(r, e) {
    u() ? console.log(r, e) : console.log(r, "[REDACTED]");
  },
  /**
   * Log user data only in development
   * @param {string} message - Log message
   * @param {Object} userData - User data object
   */
  userData(r, e) {
    u() ? console.log(r, {
      hasData: !!e,
      keys: e ? Object.keys(e) : []
    }) : console.log(r, "[User data logged in dev mode only]");
  },
  /**
   * Log authentication events (safe version)
   * @param {string} event - Event name
   * @param {Object} details - Event details
   */
  auth(r, e = {}) {
    const t = u() ? e : {
      // Only log non-sensitive fields in production
      isAuthenticated: e.isAuthenticated,
      hasUser: !!e.user,
      hasToken: !!e.token
    };
    console.log(`🔐 ${r}`, t);
  },
  // ============================================================================
  // API ERROR LOGGING (always persisted for debugging)
  // ============================================================================
  /**
   * Log API error with persistence for debugging
   * Use this for HTTP errors (401, 402, 403, 500, etc.)
   * @param {number} statusCode - HTTP status code
   * @param {string} url - Request URL
   * @param {Object} options - Additional options
   * @param {string} options.method - HTTP method
   * @param {string} options.message - Error message
   * @param {Object} options.responseData - Response body data
   * @param {string} options.context - Additional context (e.g., component name)
   */
  apiError(r, e, t = {}) {
    const { method: o = "GET", message: n = "", responseData: i = null, context: s = "" } = t, c = {
      timestamp: Date.now(),
      date: (/* @__PURE__ */ new Date()).toISOString(),
      statusCode: r,
      url: e == null ? void 0 : e.replace(/\?.*$/, ""),
      // Remove query params for privacy
      method: o,
      message: n,
      context: s,
      hasResponseData: !!i,
      userAgent: typeof navigator < "u" ? navigator.userAgent : "unknown",
      // Include response data only in dev mode
      responseData: u() ? i : void 0
    };
    r >= 500 && C && (c.userContext = C, i && (c.responseData = i)), Je(c), ue();
    const a = r >= 500 ? "🔥" : r >= 400 ? "⚠️" : "📡", l = r >= 500 ? "error" : "warn", p = `${a} API Error ${r}: ${o} ${e}`;
    return u() ? console[l](p, { statusCode: r, method: o, url: e, message: n, responseData: i, context: s, user: C }) : console[l](p, n ? `- ${n}` : ""), c;
  },
  /**
   * Get all stored API error logs
   * @returns {Array} - Array of error log entries
   */
  getApiErrorLogs() {
    return O();
  },
  /**
   * Clear all stored API error logs
   */
  clearApiErrorLogs() {
    Fe(), console.log("🗑️ API error logs cleared");
  },
  /**
   * Export API error logs as JSON string (for bug reports)
   * @returns {string} - JSON string of error logs
   */
  exportApiErrorLogs() {
    const r = O();
    return JSON.stringify(r, null, 2);
  },
  /**
   * Get summary of recent API errors
   * @returns {Object} - Summary with counts by status code
   */
  getApiErrorSummary() {
    const r = O(), e = {
      total: r.length,
      byStatusCode: {},
      last24Hours: 0,
      lastError: r.length > 0 ? r[r.length - 1] : null
    }, t = Date.now() - 1440 * 60 * 1e3;
    return r.forEach((o) => {
      e.byStatusCode[o.statusCode] = (e.byStatusCode[o.statusCode] || 0) + 1, o.timestamp > t && e.last24Hours++;
    }), e;
  },
  // ============================================================================
  // WEBHOOK CONFIGURATION & CONTROL
  // ============================================================================
  /**
   * Configure webhook for error reporting
   * @param {Object} config - Webhook configuration
   * @param {string} config.url - n8n webhook URL
   * @param {boolean} config.enabled - Enable/disable webhook
   * @param {number} config.batchSize - Number of logs per batch (default: 10)
   * @param {number} config.minIntervalMs - Minimum time between sends in ms (default: 60000)
   */
  configureWebhook(r = {}) {
    r.url !== void 0 && (d.url = r.url), r.enabled !== void 0 && (d.enabled = r.enabled), r.batchSize !== void 0 && (d.batchSize = r.batchSize), r.minIntervalMs !== void 0 && (d.minIntervalMs = r.minIntervalMs), u() && console.log("📡 Webhook configured:", {
      url: d.url ? "***configured***" : "not set",
      enabled: d.enabled,
      batchSize: d.batchSize,
      minIntervalMs: d.minIntervalMs
    }), d.enabled && d.url && ue();
  },
  /**
   * Get current webhook configuration (without URL for security)
   * @returns {Object} - Current webhook config
   */
  getWebhookConfig() {
    return {
      enabled: d.enabled,
      hasUrl: !!d.url,
      batchSize: d.batchSize,
      minIntervalMs: d.minIntervalMs,
      unsentCount: B().length
    };
  },
  /**
   * Manually trigger webhook send (for testing or manual flush)
   * @returns {Promise<boolean>} - Success status
   */
  async flushToWebhook() {
    if (!d.enabled || !d.url)
      return console.warn('⚠️ Webhook not configured. Use logger.configureWebhook({ url: "...", enabled: true })'), !1;
    const r = B();
    if (r.length === 0)
      return console.log("✅ No unsent logs to flush"), !0;
    console.log(`📤 Flushing ${r.length} logs to webhook...`);
    const e = await _e(r);
    return e && ($e(r.map((t) => t.timestamp)), console.log("✅ Logs flushed successfully")), e;
  },
  /**
   * Get count of unsent logs
   * @returns {number} - Number of logs not yet sent to webhook
   */
  getUnsentLogCount() {
    return B().length;
  }
}, Ze = (r) => {
  const e = `[${r}]`, t = r.split("").reduce((a, l) => a + l.charCodeAt(0), 0), o = [
    "#009553",
    // Twerenbold Green
    "#0070c9",
    // Blue
    "#d73e0f",
    // Red/Orange
    "#8e44ad",
    // Purple
    "#2c3e50",
    // Dark Blue/Grey
    "#e67e22",
    // Orange
    "#16a085",
    // Teal
    "#c0392b",
    // Deep Red
    "#2980b9",
    // Bright Blue
    "#f1c40f",
    // Yellow
    "#27ae60",
    // Emerald
    "#7f8c8d",
    // Grey
    "#d35400",
    // Pumpkin
    "#8e44ad",
    // Wisteria
    "#bdc3c7",
    // Silver
    "#e84393",
    // Pink
    "#00cec9",
    // Cyan
    "#6c5ce7",
    // Indigo
    "#fdcb6e",
    // Mustard
    "#b2bec3",
    // Light Grey
    "#2d3436"
    // Dark
  ], i = `color: white; background-color: ${o[t % o.length]}; border-radius: 3px; padding: 0 4px; font-weight: bold;`, s = "color: inherit; font-weight: normal;", c = (a, ...l) => {
    u() ? typeof l[0] == "string" ? console[a](`%c${r}%c ${l[0]}`, i, s, ...l.slice(1)) : console[a](`%c${r}`, i, ...l) : console[a](e, ...l);
  };
  return {
    dev: (...a) => c("log", ...a),
    debug: (...a) => c("debug", ...a),
    warn: (...a) => c("warn", ...a),
    error: (...a) => c("error", ...a),
    info: (...a) => c("info", ...a),
    sensitive: (a, l) => g.sensitive(`${e} ${a}`, l),
    userData: (a, l) => g.userData(`${e} ${a}`, l),
    auth: (a, l) => g.auth(`${e} ${a}`, l),
    apiError: (a, l, p = {}) => g.apiError(a, l, { ...p, context: r })
  };
};
typeof window < "u" && u() && (window.__twrLogger = {
  getLogs: () => g.getApiErrorLogs(),
  clearLogs: () => g.clearApiErrorLogs(),
  exportLogs: () => g.exportApiErrorLogs(),
  getSummary: () => g.getApiErrorSummary(),
  // Webhook helpers
  configureWebhook: (r) => g.configureWebhook(r),
  getWebhookConfig: () => g.getWebhookConfig(),
  flushToWebhook: () => g.flushToWebhook(),
  getUnsentCount: () => g.getUnsentLogCount()
});
typeof window < "u" && g.configureWebhook({
  url: "https://cloud.activepieces.com/api/v1/webhooks/dKBwB8i4rsrVNSKIBtsyJ",
  enabled: !0
});
const T = Ce`
  /* ===============================================================================
     SHARED STYLES - Zentrales Design-System
     Alle gemeinsamen UI-Komponenten für Shadow DOM Sicherheit
     =============================================================================== */

  /* ============================================================================
     BUTTONS
     ============================================================================ */

  :host{
    font-size: var(--font-size-base, 1rem);
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: var(--btn-padding-y) var(--btn-padding-x);
    border: 1px solid transparent;
    border-radius: var(--btn-border-radius, 999px);
    font-weight: var(--btn-font-weight, var(--font-weight-semibold));
    text-transform: var(--btn-text-transform, none);
    letter-spacing: var(--btn-letter-spacing, normal);
    text-decoration: none;
    cursor: pointer;
    transition: var(--btn-transition);
    font-size: var(--btn-font-size);
    text-align: center;
    font-family: var(--font-family-base, sans-serif);
    /* min-height: 44px; */ /* Accessibility */
    white-space: nowrap;
    min-width: fit-content;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: var(--btn-primary-background-color, var(--primary-color, #009553));
    color: var(--btn-primary-color, #fff);
    border-color: var(--btn-primary-border-color, var(--primary-color, #009553));
  }

  .btn-primary:hover:not(:disabled) {
    color: var(--btn-primary-hover-color, #fff);
    background: var(--btn-primary-hover-background-color, var(--primary-color-dark, #007a44));
    border-color: var(--btn-primary-hover-border-color, var(--primary-color-dark, #007a44));
    transform: translateY(-1px);
    box-shadow: var(--box-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .btn-secondary {
    background: var(--bg-color, #ffffff);
    color: var(--primary-color, #009553);
    border-color: var(--primary-color, #009553);
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--btn-secondary-hover-background-color, var(--secondary-color-dark, #007a44));
    border-color: var(--btn-secondary-hover-border-color, var(--secondary-color-dark, #007a44));
    color: var(--btn-secondary-hover-color, #fff);
    transform: translateY(-1px);
    box-shadow: var(--box-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .btn-ghost {
    background: transparent;
    color: var(--primary-color, #009553);
    border-color: transparent;
  }

  .btn-ghost:hover:not(:disabled) {
    background: var(--primary-color-light, rgba(0, 149, 83, 0.1));
  }

  .btn-tertiary {
    background: var(--bg-secondary, #f9fafb);
    color: var(--text-color, #111827);
    border-color: var(--border-color, #e5e7eb);
  }

  .btn-tertiary:hover:not(:disabled) {
    background: var(--bg-color, #ffffff);
    transform: translateY(-1px);
    box-shadow: var(--twerenbold-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
    color: var(--primary-color, #009553);
  }



  .btn-danger {
    background: var(--error-color, #ef4444);
    color: white;
    border-color: var(--error-color, #ef4444);
  }

  .btn-danger:hover:not(:disabled) {
    background: #dc2626;
    border-color: #dc2626;
  }

  .btn-secondary.btn-danger {
    background: var(--bg-color, #ffffff);
    color: var(--error-color, #ef4444);
    border-color: var(--border-color, #ef4444);
  }

  /* Button Sizes */
  .btn-sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-height: 36px;
  }

  .btn-lg {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    min-height: 52px;
  }

  .provider-link{
//   display: flex;
  flex-direction: column;
  // invert order
  flex-direction: column-reverse !important;
  
  span{
  font-weight: 600;}
  }

  /* ============================================================================
     CARDS
     ============================================================================ */

  .card {
    background: var(--bg-color, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--border-radius, 8px);
    padding: var(--card-padding, 1.5rem);
    box-shadow: var(--box-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
    transition: var(--transition);
  }

  .card:hover {
    box-shadow: var(--box-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1));
  }

  .card-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-light, #f3f4f6);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--title-color, #111827);
    margin: 0 0 0.5rem 0;
  }

  .card-subtitle {
    font-size: 1rem;
    color: var(--subtitle-color, #6b7280);
    margin: 0;
  }

  .card-content {
    color: var(--text-secondary, #6b7280);
    line-height: 1.6;
  }

  .card-actions {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-light, #f3f4f6);
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--headline-color, #111827);
    font-family: var(--font-family-headings, sans-serif);
    font-weight: var(--font-weight-headings, 700);
  }


  .page-title{
    margin-bottom: 0px;
    margin-top:0px;
  }
  .page-subtitle{
    font-size: 1.125rem;
    color: var(--subtitle-color, --text-secondary);
    margin: 0px;
  }
  /* ============================================================================
     FORMS
     ============================================================================ */

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    // gap: 0.5rem;
    // margin-bottom: 1rem;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group.span-2 {
    grid-column: span 2;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-color, #111827);
    margin-bottom: 0.5rem;
  }

  .form-input {
    // width: 100%;
    padding: var(--input-padding, 0.75rem);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--border-radius, 8px);
    font-size: var(--font-size-base, 1rem);
    font-family: var(--font-family-base, sans-serif);
    transition: var(--transition);
    background: var(--input-bg, #ffffff);
    color: var(--text-color, #111827);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color, #009553);
    box-shadow: 0 0 0 3px var(--primary-color-light, rgba(0, 149, 83, 0.1));
  }

  .form-input:disabled {
    background: var(--bg-secondary, #f9fafb);
    color: var(--text-muted, #9ca3af);
    cursor: not-allowed;
  }

  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }

  .form-select {
    width: 100%;
    padding: 0.75rem;
    padding-right: 2.5rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--border-radius, 8px);
    font-size: 1rem;
    font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    transition: all 0.2s ease-in-out;
    background: var(--bg-color, #ffffff);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    appearance: none;
    color: var(--text-color, #111827);
  }

  .form-error {
    color: var(--error-color, #ef4444);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .form-help,
  .field-help {
    color: var(--text-muted, #9ca3af);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 2rem;
    border-top: 1px solid var(--border-light, #f3f4f6);
    margin-top: 2rem;
    gap: 0.75rem;
  }


  .client-unsupported-overlay {
        position: absolute;
    top: 0;
    background: #fff;
    bottom: 0;
    padding: var(--spacing-2xl, 40px);
  }

.auth-help{
  display:none;
}

/* Select-Placeholder-Styling: das Select-Element selbst grau färben */
select:has(> option:not([value]):checked),
select:has(> option[value=""]:checked) {
    color: #757575;
}

/* Options im Dropdown normal färben */
select option {
    color: var(--text-color, #111827);
}
select option:not([value]),
select option[value=""] {
    color: #757575;
}
  /* ============================================================================
     LAYOUT
     ============================================================================ */

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    /* padding: 0 1rem; */
  }

  .grid {
    display: grid;
    gap: 1rem;
  }

  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .gap-6 { gap: 1.5rem; }


/*   ============================================================================
      SIDEBAR NAVIGATION
   ============================================================================ */

.mobile-nav-toggle {
      display: none;
      position: sticky;
      top: var(--theme-mobile-nav-toggle-position-top, 0);
      z-index: 1200;
      padding: 0.75rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(15, 118, 110, 0.15);
      background: rgba(255, 255, 255, 0.95);
      box-shadow: var(--box-shadow-lg, 0 10px 25px -10px rgba(17, 24, 39, 0.25));
      color: var(--primary-color, #009553);
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      align-self: flex-start;
      margin: 0.75rem 0 0 0.75rem;
    }

    .mobile-nav-toggle:focus-visible {
      outline: 2px solid var(--primary-color, #009553);
      outline-offset: 3px;
    }

    .mobile-nav-toggle:hover {
      transform: translateY(-1px);
      box-shadow: var(--box-shadow-lg, 0 20px 45px -20px rgba(17, 24, 39, 0.35));
    }

    .mobile-nav-toggle__icon {
      position: relative;
      width: 20px;
      height: 14px;
      display: inline-flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .mobile-nav-toggle__icon span {
      display: block;
      width: 100%;
      height: 2px;
      background: currentColor;
      border-radius: 999px;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(2) {
      opacity: 0;
    }

    .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }

    /* When sidebar is open, toggle becomes fixed so it stays above the overlay */
    .sidebar-open .mobile-nav-toggle {
      position: fixed;
      top: var(--theme-mobile-nav-toggle-position-top, 1rem);
      left: var(--theme-mobile-nav-toggle-position-left, 1rem);
      margin: 0;
    }

    .sidebar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(4px);
      z-index: 1100;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .sidebar-backdrop.visible {
      display: block;
      opacity: 1;
    }

    body.sidebar-open {
      overflow: hidden;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .sidebar {
      width: 320px;
      background: #fff;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-height: 100vh;
      position: sticky;
      top: 0;
    }



    .sidebar.is-open .sidebar-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      visibility: hidden;
    }

    @media (max-width: 900px) {

    }
    .nav-link p{
          margin: 0;
      color: #111827;

    }

    .nav-link.active p{
    color: #fff;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      color: #111827;
      background: none;
      border: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      width: 100%;
      text-align: left;
    }



   .nav-link.active {
     // background: var(--theme-primary, #f0fdf4);
      color: #fff;
    } 
    /* .nav-link:hover {
      background: #f9fafb;
    } */
    .nav-icon {
      width: 24px;
      height: 24px;
      color: var(--theme-primary, #f0fdf4);
    }

     .nav-link.active .nav-icon {
       color: #fff;
    }

    .nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(90deg, var(--primary-color, #009553), var(--primary-color-dark, #007a44));
    background: var(--primary-color, #009553);
    transition: width 0.3s 
cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
}

.nav-link.active::before {
    width: 100%;
}

.nav-link {
    position: relative;
    transition: all 0.3s 
cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.nav-link:not(.active):hover {
    background: rgba(0, 149, 83, 0.05);
    transform: translateX(2px);
}

    .main-content {
      flex: 1;
    }

    .rounded-2xl{
        border-radius: var(--border-radius-xl, 0px) !important;
      }

    @media (max-width: 900px) {
      app-state-provider {
        flex-direction: column;
      }

      .mobile-nav-toggle {
        display: inline-flex;
      }

     .sidebar .mobile-nav-toggle {
        display: none;
      }

      .main-content {
        padding: 1rem 1.25rem 2.5rem;
        min-height: auto;
      }

      .sidebar {
        position: fixed;
        inset: 0 auto 0 0;
        height: 100vh;
        width: min(85vw, 320px);
        transform: translateX(-105%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.35);
        z-index: 1150;
        padding: 2rem 1.5rem 3rem;
        overflow-y: auto;
      }

      .sidebar.is-open {
        transform: translateX(0);
      }

      .sidebar-title {
        margin-top: 3rem;
      }

      .nav-link {
        font-size: 1rem;
        padding: 0.85rem 0.5rem;
      }

  
    }


  /* ============================================================================
     TYPOGRAPHY
     ============================================================================ */

  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .text-base { font-size: 1rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-3xl { font-size: 1.875rem; }

  .font-normal { font-weight: 400; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }

  .text-primary { color: var(--primary-color, #009553); }
  .text-secondary { color: var(--text-secondary, #6b7280); }
  .text-muted { color: var(--text-muted, #9ca3af); }
  .text-error { color: var(--error-color, #ef4444); }
  .text-success { color: var(--success-color, #10b981); }

  /* ============================================================================
     UTILITIES
     ============================================================================ */


.trips-page, .main-content {
  position: relative;
}

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: var(--text-secondary, #6b7280);
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border-color, #e5e7eb);
    border-top: 2px solid var(--primary-color, #009553);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    // center spinner
    margin: 0 auto 1rem auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-message {
    padding: 1rem;
    background: var(--error-bg, rgba(239, 68, 68, 0.1));
    border: 1px solid var(--error-color, #ef4444);
    border-radius: var(--border-radius, 8px);
    color: var(--error-color, #ef4444);
    margin-bottom: 1rem;
  }

  .success-message {
    padding: 1rem;
    background: var(--success-bg, rgba(16, 185, 129, 0.1));
    border: 1px solid var(--success-color, #10b981);
    border-radius: var(--border-radius, 8px);
    color: var(--success-color, #10b981);
    margin-bottom: 1rem;
  }


  .trip-code{
      text-transform: lowercase;
      color: var(--text-secondary);
       color: var(--text-muted);
       font-weight: normal;
  }

    .trip-code-label{
      font-weight: normal;
      text-transform: none;
      color: var(--text-muted);
  }



  /* ============================================================================
     RESPONSIVE DESIGN
     ============================================================================ */

  @media (max-width: 768px) {
    .card {
      padding: 1rem;
    }

    .card-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      width: -webkit-fill-available;
    }

    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-group.span-2 {
      grid-column: span 1;
    }

    .form-actions {
      flex-direction: column;
    }
  }

  /* ============================================================================
      SKELETON LOADER
      ============================================================================ */


  .skeleton-loader {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .skeleton-header {
      height: 2rem;
      background: #e5e7eb;
            background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);

      border-radius: 0.5rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: var(--border-radius, 8px);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skeleton-card .skeleton-title {
      height: 1.5rem;
      background: #e5e7eb;
            background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);

      border-radius: 0.375rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      width: 60%;
    }

    .skeleton-card .skeleton-text {
      height: 1rem;
      background: #e5e7eb;
            background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);

      border-radius: 0.25rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-card .skeleton-text.short {
      width: 40%;
    }

    .skeleton-card .skeleton-text.medium {
      width: 70%;
    }

    .skeleton-card .skeleton-text.long {
      width: 90%;
    }

    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skeleton-list-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: var(--border-radius, 8px);
    }

    .skeleton-list-item .skeleton-avatar {
      width: 3rem;
      height: 3rem;
      background: #e5e7eb;
            background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);

      border-radius: 50%;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-list-item .skeleton-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .skeleton-list-item .skeleton-content .skeleton-text {
      height: 1rem;
      background: #e5e7eb;
            background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);

      border-radius: 0.25rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-list-item .skeleton-content .skeleton-text.title {
      width: 50%;
      height: 1.25rem;
    }

    .skeleton-list-item .skeleton-content .skeleton-text.subtitle {
      width: 30%;
    }

/* ================================================================================
    VIEW TRANSITIONS API - Page Transitions
       =============================================================================== */

      /* Enable View Transitions for navigation */
      @view-transition {
        navigation: auto;
      }
`;
function Qe(r = ".twerenbold-account-embed-root") {
  let e = "";
  if (typeof T == "object" && T.cssText)
    e = T.cssText;
  else if (typeof T == "string")
    e = T;
  else
    return "";
  return e.replace(/:host\s*\{/g, `${r} {`).replace(/:host\(/g, `${r}(`).replace(/\n\s*(\.[a-zA-Z_-][\w-]*)/g, `
  ${r} $1`).replace(/\n\s*(h[1-6]|p|a|button|input|select|textarea|form|label|span|div)(\s*[,{])/g, `
  ${r} $1$2`).replace(/\n\s*body\s*\./g, `
  ${r}.`).replace(/@media([^{]+)\{/g, (o, n) => `@media${n}{`).replace(/@keyframes\s+/g, "@keyframes ");
}
let I = 0, Z = 0;
function et() {
  I === 0 && (Z = window.scrollY, document.body.style.position = "fixed", document.body.style.top = `-${Z}px`, document.body.style.left = "0", document.body.style.right = "0", document.body.style.overflow = "hidden"), I++;
}
function tt() {
  I = Math.max(0, I - 1), I === 0 && (document.body.style.position = "", document.body.style.top = "", document.body.style.left = "", document.body.style.right = "", document.body.style.overflow = "", window.scrollTo(0, Z));
}
export {
  f as G,
  g as a,
  Ze as c,
  H as f,
  Qe as g,
  et as l,
  qe as q,
  Ce as r,
  T as s,
  tt as u
};
