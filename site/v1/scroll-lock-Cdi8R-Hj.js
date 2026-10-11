/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, Z = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), oe = /* @__PURE__ */ new WeakMap();
class me {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.i;
    const t = this.t;
    if (Z && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = oe.get(t)), e === void 0 && ((this.i = e = new CSSStyleSheet()).replaceSync(this.cssText), r && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const _e = (o) => new me(typeof o == "string" ? o : o + "", void 0, Q), Ee = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce(((r, n, i) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + o[i + 1]), o[0]);
  return new me(t, o, Q);
}, Te = (o, e) => {
  if (Z) o.adoptedStyleSheets = e.map(((t) => t instanceof CSSStyleSheet ? t : t.styleSheet));
  else for (const t of e) {
    const r = document.createElement("style"), n = M.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = t.cssText, o.appendChild(r);
  }
}, ne = Z ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return _e(t);
})(o) : o, { is: ze, defineProperty: Ce, getOwnPropertyDescriptor: Pe, getOwnPropertyNames: Ue, getOwnPropertySymbols: Oe, getPrototypeOf: Ie } = Object, b = globalThis, ie = b.trustedTypes, Ne = ie ? ie.emptyScript : "", j = b.reactiveElementPolyfillSupport, T = (o, e) => o, F = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Ne : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, be = (o, e) => !ze(o, e), se = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class A extends HTMLElement {
  static addInitializer(e) {
    this.o(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this.u && [...this.u.keys()];
  }
  static createProperty(e, t = se) {
    if (t.state && (t.attribute = !1), this.o(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, t);
      n !== void 0 && Ce(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: n, set: i } = Pe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: n, set(s) {
      const l = n == null ? void 0 : n.call(this);
      i == null || i.call(this, s), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? se;
  }
  static o() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = Ie(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this.o(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, r = [...Ue(t), ...Oe(t)];
      for (const n of r) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, n] of t) this.elementProperties.set(r, n);
    }
    this.u = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const n = this.p(t, r);
      n !== void 0 && this.u.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) t.unshift(ne(n));
    } else e !== void 0 && t.push(ne(e));
    return t;
  }
  static p(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this.v = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Te(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this.P) == null || e.forEach(((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this.P) == null || e.forEach(((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    }));
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  C(e, t) {
    var i;
    const r = this.constructor.elementProperties.get(e), n = this.constructor.p(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const s = (((i = r.converter) == null ? void 0 : i.toAttribute) !== void 0 ? r.converter : F).toAttribute(t, r.type);
      this.m = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this.m = null;
    }
  }
  _$AK(e, t) {
    var i, s;
    const r = this.constructor, n = r.u.get(e);
    if (n !== void 0 && this.m !== n) {
      const l = r.getPropertyOptions(n), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((i = l.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? l.converter : F;
      this.m = n;
      const h = a.fromAttribute(t, l.type);
      this[n] = h ?? ((s = this.T) == null ? void 0 : s.get(n)) ?? h, this.m = null;
    }
  }
  requestUpdate(e, t, r) {
    var n;
    if (e !== void 0) {
      const i = this.constructor, s = this[e];
      if (r ?? (r = i.getPropertyOptions(e)), !((r.hasChanged ?? be)(s, t) || r.useDefault && r.reflect && s === ((n = this.T) == null ? void 0 : n.get(e)) && !this.hasAttribute(i.p(e, r)))) return;
      this.M(e, t, r);
    }
    this.isUpdatePending === !1 && (this.S = this.k());
  }
  M(e, t, { useDefault: r, reflect: n, wrapped: i }, s) {
    r && !(this.T ?? (this.T = /* @__PURE__ */ new Map())).has(e) && (this.T.set(e, s ?? t ?? this[e]), i !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), n === !0 && this.m !== e && (this.A ?? (this.A = /* @__PURE__ */ new Set())).add(e));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.v) {
        for (const [i, s] of this.v) this[i] = s;
        this.v = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, s] of n) {
        const { wrapped: l } = s, a = this[i];
        l !== !0 || this._$AL.has(i) || a === void 0 || this.M(i, void 0, s, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this.P) == null || r.forEach(((n) => {
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
    (t = this.P) == null || t.forEach(((r) => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[T("elementProperties")] = /* @__PURE__ */ new Map(), A[T("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: A }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, W = z.trustedTypes, ae = W ? W.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ve = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + m, Re = `<${ye}>`, w = document, U = () => w.createComment(""), O = (o) => o === null || typeof o != "object" && typeof o != "function", ee = Array.isArray, Me = (o) => ee(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, de = />/g, v = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, he = /"/g, xe = /^(?:script|style|textarea|title)$/i, De = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), Xe = De(1), k = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), y = w.createTreeWalker(w, 129);
function we(o, e) {
  if (!ee(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ae !== void 0 ? ae.createHTML(e) : e;
}
const Le = (o, e) => {
  const t = o.length - 1, r = [];
  let n, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = S;
  for (let l = 0; l < t; l++) {
    const a = o[l];
    let h, p, d = -1, u = 0;
    for (; u < a.length && (s.lastIndex = u, p = s.exec(a), p !== null); ) u = s.lastIndex, s === S ? p[1] === "!--" ? s = le : p[1] !== void 0 ? s = de : p[2] !== void 0 ? (xe.test(p[2]) && (n = RegExp("</" + p[2], "g")), s = v) : p[3] !== void 0 && (s = v) : s === v ? p[0] === ">" ? (s = n ?? S, d = -1) : p[1] === void 0 ? d = -2 : (d = s.lastIndex - p[2].length, h = p[1], s = p[3] === void 0 ? v : p[3] === '"' ? he : ce) : s === he || s === ce ? s = v : s === le || s === de ? s = S : (s = v, n = void 0);
    const g = s === v && o[l + 1].startsWith("/>") ? " " : "";
    i += s === S ? a + Re : d >= 0 ? (r.push(h), a.slice(0, d) + ve + a.slice(d) + m + g) : a + m + (d === -2 ? l : g);
  }
  return [we(o, i + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class I {
  constructor({ strings: e, _$litType$: t }, r) {
    let n;
    this.parts = [];
    let i = 0, s = 0;
    const l = e.length - 1, a = this.parts, [h, p] = Le(e, t);
    if (this.el = I.createElement(h, r), y.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = y.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ve)) {
          const u = p[s++], g = n.getAttribute(d).split(m), R = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: i, name: R[2], strings: g, ctor: R[1] === "." ? We : R[1] === "?" ? Be : R[1] === "@" ? je : B }), n.removeAttribute(d);
        } else d.startsWith(m) && (a.push({ type: 6, index: i }), n.removeAttribute(d));
        if (xe.test(n.tagName)) {
          const d = n.textContent.split(m), u = d.length - 1;
          if (u > 0) {
            n.textContent = W ? W.emptyScript : "";
            for (let g = 0; g < u; g++) n.append(d[g], U()), y.nextNode(), a.push({ type: 2, index: ++i });
            n.append(d[u], U());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ye) a.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(m, d + 1)) !== -1; ) a.push({ type: 7, index: i }), d += m.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const r = w.createElement("template");
    return r.innerHTML = e, r;
  }
}
function $(o, e, t = o, r) {
  var s, l;
  if (e === k) return e;
  let n = r !== void 0 ? (s = t.N) == null ? void 0 : s[r] : t.O;
  const i = O(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== i && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), i === void 0 ? n = void 0 : (n = new i(o), n._$AT(o, t, r)), r !== void 0 ? (t.N ?? (t.N = []))[r] = n : t.O = n), n !== void 0 && (e = $(o, n._$AS(o, e.values), n, r)), e;
}
class He {
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
    const { el: { content: t }, parts: r } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? w).importNode(t, !0);
    y.currentNode = n;
    let i = y.nextNode(), s = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let h;
        a.type === 2 ? h = new N(i, i.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(i, a.name, a.strings, this, e) : a.type === 6 && (h = new Ve(i, this, e)), this._$AV.push(h), a = r[++l];
      }
      s !== (a == null ? void 0 : a.index) && (i = y.nextNode(), s++);
    }
    return y.currentNode = w, n;
  }
  V(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class N {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this.D;
  }
  constructor(e, t, r, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = n, this.D = (n == null ? void 0 : n.isConnected) ?? !0;
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
    e = $(this, e, t), O(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== k && this.L(e) : e._$litType$ !== void 0 ? this.j(e) : e.nodeType !== void 0 ? this.I(e) : Me(e) ? this.H(e) : this.L(e);
  }
  B(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  I(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.B(e));
  }
  L(e) {
    this._$AH !== f && O(this._$AH) ? this._$AA.nextSibling.data = e : this.I(w.createTextNode(e)), this._$AH = e;
  }
  j(e) {
    var i;
    const { values: t, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = I.createElement(we(r.h, r.h[0]), this.options)), r);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === n) this._$AH.V(t);
    else {
      const s = new He(n, this), l = s.R(this.options);
      s.V(t), this.I(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = pe.get(e.strings);
    return t === void 0 && pe.set(e.strings, t = new I(e)), t;
  }
  H(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, n = 0;
    for (const i of e) n === t.length ? t.push(r = new N(this.B(U()), this.B(U()), this, this.options)) : r = t[n], r._$AI(i), n++;
    n < t.length && (this._$AR(r && r._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this.D = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, n, i) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(e, t = this, r, n) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) e = $(this, e, t, 0), s = !O(e) || e !== this._$AH && e !== k, s && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = i[0], a = 0; a < i.length - 1; a++) h = $(this, l[r + a], t, a), h === k && (h = this._$AH[a]), s || (s = !O(h) || h !== this._$AH[a]), h === f ? e = f : e !== f && (e += (h ?? "") + i[a + 1]), this._$AH[a] = h;
    }
    s && !n && this.W(e);
  }
  W(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class We extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Be extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class je extends B {
  constructor(e, t, r, n, i) {
    super(e, t, r, n, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = $(this, e, t, 0) ?? f) === k) return;
    const r = this._$AH, n = e === f && r !== f || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, i = e !== f && (r === f || n);
    n && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ve {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $(this, e);
  }
}
const Y = z.litHtmlPolyfillSupport;
Y == null || Y(I, N), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.1");
const Ye = (o, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = n = new N(e.insertBefore(U(), i), i, void 0, t ?? {});
  }
  return n._$AI(o), n;
}, x = globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class D extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.rt = Ye(t, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var ge;
D._$litElement$ = !0, D.finalized = !0, (ge = x.litElementHydrateSupport) == null || ge.call(x, { LitElement: D });
const K = x.litElementPolyfillSupport;
K == null || K({ LitElement: D });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.1");
const te = "twerenbold_error_log", re = "twerenbold_error_log_sent", Ke = 100, Ae = 24, c = {
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
let G = null, fe = 0, L = 0, J = null;
const C = () => {
  if (typeof localStorage > "u") return [];
  try {
    const o = localStorage.getItem(te);
    if (!o) return [];
    const e = JSON.parse(o), t = Date.now() - Ae * 60 * 60 * 1e3;
    return e.filter((r) => r.timestamp > t);
  } catch {
    return [];
  }
}, Ge = (o) => {
  if (!(typeof localStorage > "u"))
    try {
      const e = C();
      e.push(o);
      const t = e.slice(-Ke);
      localStorage.setItem(te, JSON.stringify(t));
    } catch {
    }
}, Je = () => {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.removeItem(te), localStorage.removeItem(re);
    } catch {
    }
}, ke = () => {
  if (typeof localStorage > "u") return /* @__PURE__ */ new Set();
  try {
    const o = localStorage.getItem(re);
    return o ? new Set(JSON.parse(o)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}, $e = (o) => {
  if (!(typeof localStorage > "u"))
    try {
      const e = ke();
      o.forEach((n) => e.add(n));
      const t = Date.now() - Ae * 60 * 60 * 1e3, r = [...e].filter((n) => n > t);
      localStorage.setItem(re, JSON.stringify(r));
    } catch {
    }
}, H = () => {
  const o = C(), e = ke();
  return o.filter((t) => !e.has(t.timestamp));
}, Se = async (o) => {
  if (!c.enabled || !c.url || o.length === 0)
    return !1;
  try {
    const e = {
      source: "twerenbold-spa",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      hostname: typeof window < "u" ? window.location.hostname : "unknown",
      userAgent: typeof navigator < "u" ? navigator.userAgent : "unknown",
      logCount: o.length,
      logs: o.map((r) => ({
        ...r,
        // Ensure no sensitive data is sent unless it's a critical error where user context is needed
        // but still filter out potentially huge response bodies if not needed
        responseData: void 0
      }))
    }, t = await fetch(c.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    return t.ok ? (L = 0, !0) : (console.warn(`⚠️ Webhook response error: ${t.status}`), !1);
  } catch (e) {
    return console.warn("⚠️ Webhook send failed:", e.message), !1;
  }
}, Fe = async () => {
  if (!c.enabled || !c.url)
    return;
  const o = Date.now();
  if (o - fe < c.minIntervalMs)
    return;
  const e = H();
  if (e.length === 0)
    return;
  const t = e.slice(0, c.batchSize);
  await Se(t) ? (fe = o, $e(t.map((n) => n.timestamp)), e.length > c.batchSize && X(c.minIntervalMs)) : (L++, L <= c.maxRetries ? X(c.retryDelayMs) : (console.warn("⚠️ Webhook max retries reached, will retry on next error"), L = 0));
}, X = (o) => {
  J && clearTimeout(J), J = setTimeout(() => {
    Fe();
  }, o);
}, ue = () => {
  c.enabled && X(5e3);
}, E = {
  /**
   * Set the current user context for logging
   * @param {Object} user - User object (should contain uid/email)
   */
  setContextUser(o) {
    G = o ? {
      uid: o.uid || o.id || o.localAccountId,
      email: o.email || o.username
    } : null;
  },
  /**
   * Log only in development (INFO level)
   * @param {...any} args - Arguments to log
   */
  dev(...o) {
  },
  /**
   * Log only in development (DEBUG level)
   * @param {...any} args - Arguments to log
   */
  debug(...o) {
  },
  /**
   * Always log warnings (safe for production)
   * @param {...any} args - Arguments to log
   */
  warn(...o) {
    console.warn(...o);
  },
  /**
   * Always log errors (safe for production)
   * @param {...any} args - Arguments to log
   */
  error(...o) {
    console.error(...o);
  },
  /**
   * Always log info (use sparingly in production)
   * @param {...any} args - Arguments to log
   */
  info(...o) {
    [...o];
  },
  /**
   * Log sensitive data only in development
   * Sanitizes data in production
   * @param {string} message - Log message
   * @param {any} sensitiveData - Sensitive data to log
   */
  sensitive(o, e) {
  },
  /**
   * Log user data only in development
   * @param {string} message - Log message
   * @param {Object} userData - User data object
   */
  userData(o, e) {
  },
  /**
   * Log authentication events (safe version)
   * @param {string} event - Event name
   * @param {Object} details - Event details
   */
  auth(o, e = {}) {
    const t = {
      // Only log non-sensitive fields in production
      isAuthenticated: e.isAuthenticated,
      hasUser: !!e.user,
      hasToken: !!e.token
    };
    `${o}`;
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
  apiError(o, e, t = {}) {
    const { method: r = "GET", message: n = "", responseData: i = null, context: s = "" } = t, l = {
      timestamp: Date.now(),
      date: (/* @__PURE__ */ new Date()).toISOString(),
      statusCode: o,
      url: e == null ? void 0 : e.replace(/\?.*$/, ""),
      // Remove query params for privacy
      method: r,
      message: n,
      context: s,
      hasResponseData: !!i,
      userAgent: typeof navigator < "u" ? navigator.userAgent : "unknown",
      // Include response data only in dev mode
      responseData: void 0
    };
    o >= 500 && G && (l.userContext = G, i && (l.responseData = i)), Ge(l), ue();
    const a = o >= 500 ? "🔥" : o >= 400 ? "⚠️" : "📡", h = o >= 500 ? "error" : "warn", p = `${a} API Error ${o}: ${r} ${e}`;
    return console[h](p, n ? `- ${n}` : ""), l;
  },
  /**
   * Get all stored API error logs
   * @returns {Array} - Array of error log entries
   */
  getApiErrorLogs() {
    return C();
  },
  /**
   * Clear all stored API error logs
   */
  clearApiErrorLogs() {
    Je();
  },
  /**
   * Export API error logs as JSON string (for bug reports)
   * @returns {string} - JSON string of error logs
   */
  exportApiErrorLogs() {
    const o = C();
    return JSON.stringify(o, null, 2);
  },
  /**
   * Get summary of recent API errors
   * @returns {Object} - Summary with counts by status code
   */
  getApiErrorSummary() {
    const o = C(), e = {
      total: o.length,
      byStatusCode: {},
      last24Hours: 0,
      lastError: o.length > 0 ? o[o.length - 1] : null
    }, t = Date.now() - 1440 * 60 * 1e3;
    return o.forEach((r) => {
      e.byStatusCode[r.statusCode] = (e.byStatusCode[r.statusCode] || 0) + 1, r.timestamp > t && e.last24Hours++;
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
  configureWebhook(o = {}) {
    o.url !== void 0 && (c.url = o.url), o.enabled !== void 0 && (c.enabled = o.enabled), o.batchSize !== void 0 && (c.batchSize = o.batchSize), o.minIntervalMs !== void 0 && (c.minIntervalMs = o.minIntervalMs), c.enabled && c.url && ue();
  },
  /**
   * Get current webhook configuration (without URL for security)
   * @returns {Object} - Current webhook config
   */
  getWebhookConfig() {
    return {
      enabled: c.enabled,
      hasUrl: !!c.url,
      batchSize: c.batchSize,
      minIntervalMs: c.minIntervalMs,
      unsentCount: H().length
    };
  },
  /**
   * Manually trigger webhook send (for testing or manual flush)
   * @returns {Promise<boolean>} - Success status
   */
  async flushToWebhook() {
    if (!c.enabled || !c.url)
      return console.warn('⚠️ Webhook not configured. Use logger.configureWebhook({ url: "...", enabled: true })'), !1;
    const o = H();
    if (o.length === 0)
      return !0;
    `${o.length}`;
    const e = await Se(o);
    return e && $e(o.map((t) => t.timestamp)), e;
  },
  /**
   * Get count of unsent logs
   * @returns {number} - Number of logs not yet sent to webhook
   */
  getUnsentLogCount() {
    return H().length;
  }
}, qe = (o) => {
  const e = `[${o}]`;
  o.split("").reduce((r, n) => r + n.charCodeAt(0), 0);
  const t = (r, ...n) => {
    ["warn", "error"].includes(r) && console[r](e, ...n);
  };
  return {
    dev: (...r) => t("log", ...r),
    debug: (...r) => t("debug", ...r),
    warn: (...r) => t("warn", ...r),
    error: (...r) => t("error", ...r),
    info: (...r) => t("info", ...r),
    sensitive: (r, n) => E.sensitive(`${e} ${r}`, n),
    userData: (r, n) => E.userData(`${e} ${r}`, n),
    auth: (r, n) => E.auth(`${e} ${r}`, n),
    apiError: (r, n, i = {}) => E.apiError(r, n, { ...i, context: o })
  };
};
typeof window < "u" && E.configureWebhook({
  url: "https://cloud.activepieces.com/api/v1/webhooks/dKBwB8i4rsrVNSKIBtsyJ",
  enabled: !0
});
const _ = Ee`
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
    font-weight: var(--account-card-title-font-weight, 700);
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
    font-weight: var(--account-form-label-font-weight, 600);
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
      font-weight: var(--btn-font-weight, 600);
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
      font-weight: var(--account-nav-font-weight, 500);
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
function Ze(o = ".twerenbold-account-embed-root") {
  let e = "";
  if (typeof _ == "object" && _.cssText)
    e = _.cssText;
  else if (typeof _ == "string")
    e = _;
  else
    return "";
  return e.replace(/:host\s*\{/g, `${o} {`).replace(/:host\(/g, `${o}(`).replace(/\n\s*(\.[a-zA-Z_-][\w-]*)/g, `
  ${o} $1`).replace(/\n\s*(h[1-6]|p|a|button|input|select|textarea|form|label|span|div)(\s*[,{])/g, `
  ${o} $1$2`).replace(/\n\s*body\s*\./g, `
  ${o}.`).replace(/@media([^{]+)\{/g, (r, n) => `@media${n}{`).replace(/@keyframes\s+/g, "@keyframes ");
}
let P = 0, q = 0;
function Qe() {
  P === 0 && (q = window.scrollY, document.body.style.position = "fixed", document.body.style.top = `-${q}px`, document.body.style.left = "0", document.body.style.right = "0", document.body.style.overflow = "hidden"), P++;
}
function et() {
  P = Math.max(0, P - 1), P === 0 && (document.body.style.position = "", document.body.style.top = "", document.body.style.left = "", document.body.style.right = "", document.body.style.overflow = "", window.scrollTo(0, q));
}
export {
  f as G,
  E as a,
  qe as c,
  D as f,
  Ze as g,
  Qe as l,
  Xe as q,
  Ee as r,
  _ as s,
  et as u
};
