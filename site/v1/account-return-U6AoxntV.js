import { A as T, p as v, U as $ } from "./ProtocolUtils-h5d79O2w.js";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function O(t) {
  return `See https://aka.ms/msal.js.errors#${t} for details`;
}
class L extends T {
  constructor(e, r) {
    super(e, O(e), r), Object.setPrototypeOf(this, L.prototype), this.name = "BrowserAuthError";
  }
}
function d(t, e) {
  return new L(t, e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const D = "no_state_in_hash", C = "unable_to_parse_state", H = "invalid_base64_string", F = "timed_out", B = "empty_response";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function K(t) {
  return new TextDecoder().decode(q(t));
}
function q(t) {
  let e = t.replace(/-/g, "+").replace(/_/g, "/");
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
      break;
    default:
      throw d(H);
  }
  const r = atob(e);
  return Uint8Array.from(r, (n) => n.codePointAt(0) || 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function x() {
  const t = window.location.hash, e = window.location.search;
  let r = !1, n = !1, o = "", a;
  if (t && t.length > 1) {
    const i = t.charAt(0) === "#" ? t.substring(1) : t, c = new URLSearchParams(i);
    c.has("state") && (r = !0, o = i, a = c);
  }
  if (e && e.length > 1) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, c = new URLSearchParams(i);
    c.has("state") && (n = !0, o = i, a = c);
  }
  if (r && n) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, c = t.charAt(0) === "#" ? t.substring(1) : t;
    o = `${i}${c}`, a = new URLSearchParams(o);
  }
  if (!o || !a)
    throw d(B);
  const s = a.get("state");
  if (!s)
    throw d(D);
  const { libraryState: u } = v(K, s), { id: h, meta: l } = u;
  if (!h || !l)
    throw d(C, "missing_library_state");
  return {
    params: a,
    payload: o,
    urlHash: t,
    urlQuery: e,
    hasResponseInHash: r,
    hasResponseInQuery: n,
    libraryState: {
      id: h,
      meta: l
    }
  };
}
function J() {
  const e = new $(window.location.href).getUrlComponents();
  return `${e.Protocol}//${e.HostNameAndPort}/`;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const I = {
  ORIGIN_URI: "request.origin",
  URL_HASH: "urlHash",
  REQUEST_PARAMS: "request.params",
  VERIFIER: "code.verifier",
  INTERACTION_STATUS_KEY: "interaction.status",
  NATIVE_REQUEST: "request.native"
}, M = {
  handleRedirectPromise: 865
};
var b;
(function(t) {
  t.Redirect = "redirect", t.Popup = "popup", t.Silent = "silent", t.None = "none";
})(b || (b = {}));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Q = 3e4;
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class R {
  /**
   * Navigates to other pages within the same web application
   * @param url
   * @param options
   */
  navigateInternal(e, r) {
    return R.defaultNavigateWindow(e, r);
  }
  /**
   * Navigates to other pages outside the web application i.e. the Identity Provider
   * @param url
   * @param options
   */
  navigateExternal(e, r) {
    return R.defaultNavigateWindow(e, r);
  }
  /**
   * Default navigation implementation invoked by the internal and external functions
   * @param url
   * @param options
   */
  static defaultNavigateWindow(e, r) {
    return r.noHistory ? window.location.replace(e) : window.location.assign(e), new Promise((n, o) => {
      setTimeout(() => {
        o(d(F, "failed_to_redirect"));
      }, r.timeout);
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const P = "msal";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function z(t) {
  let e;
  try {
    e = x();
  } catch (c) {
    throw typeof window.history.replaceState == "function" && window.history.replaceState(null, "", `${window.location.origin}${window.location.pathname}`), c;
  }
  const { payload: r, urlHash: n, urlQuery: o, hasResponseInHash: a, hasResponseInQuery: s, libraryState: u } = e, { id: h, meta: l } = u;
  if (l.interactionType === b.Redirect) {
    const c = new R(), _ = {
      apiId: M.handleRedirectPromise,
      noHistory: !0,
      timeout: Q
    };
    let y = "";
    const E = `${P}.${I.INTERACTION_STATUS_KEY}}`;
    try {
      const { clientId: S } = JSON.parse(window.sessionStorage.getItem(E) || "");
      if (S) {
        const N = `${P}.${S}.${I.ORIGIN_URI}`;
        y = window.sessionStorage.getItem(N) || "";
      }
    } catch {
    }
    let p = "";
    a && s ? p = `${o}${n}` : a ? p = n : p = o;
    const A = `${y || J()}${p}`;
    await c.navigateInternal(A, _);
    return;
  }
  if (typeof window.history.replaceState == "function") {
    let c = `${window.location.origin}${window.location.pathname}`;
    !a && n && (c += n), !s && o && (c += o), window.history.replaceState(null, "", c);
  }
  const i = new BroadcastChannel(h);
  i.postMessage({
    v: 1,
    payload: r
  }), i.close();
  try {
    window.close();
  } catch {
  }
}
const Y = ["twerenbold.ch", "imbach.ch", "excellence.ch", "mittelthurgau.ch", "voegele-reisen.ch"], G = ["", "www.", "dev.", "staging.", "reisemarkt."], W = /* @__PURE__ */ new Set([
  ...Y.flatMap((t) => G.map((e) => e + t)),
  // Explicit staging booking origins (no wildcard subdomain acceptance).
  "staging.reisemarkt.twerenbold.ch",
  "staging.reisemarkt.imbach.ch",
  // Existing booking destinations in security-config.js.
  "ibe.voegele-reisen.ch",
  "voegelereisen-ibe.stg.tripbuilder.app",
  "excellence-reisen.ch",
  "www.excellence-reisen.ch"
]), g = "twerenbold:logout-return", k = "twerenbold:booking-logout", U = "twerenbold:frontend-logout", j = 7200 * 1e3;
function f(t, e = window.location.href) {
  try {
    if (typeof t != "string" || !t || t.length > 8192) return null;
    const r = new URL(t, e), n = new URL(e).origin;
    return r.username || r.password || r.protocol !== "https:" && !(r.protocol === "http:" && r.origin === n && ["localhost", "127.0.0.1"].includes(r.hostname)) || r.origin !== n && (!W.has(r.hostname) || r.port) ? null : r.href;
  } catch {
    return null;
  }
}
function m(t, e) {
  try {
    const r = JSON.parse(t.getItem(e));
    if (r && Number.isFinite(r.created) && Date.now() >= r.created && Date.now() - r.created < j) return r;
    t.removeItem(e);
  } catch {
  }
  return null;
}
function Z(t = window) {
  try {
    const e = new URL(t.location.href);
    if (!e.searchParams.has("logoutReturnUrl")) return;
    const r = f(e.searchParams.get("logoutReturnUrl"), t.location.href);
    t.sessionStorage.removeItem(g), r && t.sessionStorage.setItem(g, JSON.stringify({ url: r, created: Date.now() })), e.searchParams.delete("logoutReturnUrl"), t.history.replaceState(t.history.state, "", e.href);
  } catch {
  }
}
function ee(t = window) {
  const e = m(t.sessionStorage, g);
  try {
    t.sessionStorage.removeItem(g);
  } catch {
    return null;
  }
  return f(e == null ? void 0 : e.url, t.location.href);
}
function V(t, e = window) {
  const r = f(t, e.location.href);
  if (!r) return t;
  try {
    const n = new URL(e.location.href);
    n.searchParams.delete("kkLogout");
    const o = e.crypto.randomUUID(), a = { url: n.href, account: r, nonce: o, phase: "left", created: Date.now() };
    e.sessionStorage.setItem(k, JSON.stringify(a)), n.searchParams.set("kkLogout", o);
    const s = new URL(r);
    return s.searchParams.set("logoutReturnUrl", n.href), s.href;
  } catch {
    return t;
  }
}
function te(t = window) {
  const e = m(t.sessionStorage, g), r = f(e == null ? void 0 : e.url, t.location.href);
  if (!r) return !1;
  const n = new URL(r), o = w({ location: n });
  if (!o || new URL(o).origin !== t.location.origin || !n.searchParams.get("kkLogout")) return !1;
  const a = t.crypto.randomUUID(), s = new URL(n);
  return s.searchParams.delete("kkLogout"), t.sessionStorage.setItem(U, JSON.stringify({ nonce: a, url: s.href, created: Date.now() })), n.searchParams.set("kkLogoutFrontend", a), t.location.replace(n.href), !0;
}
function re(t = window) {
  try {
    const e = new URL(t.location.href), r = e.searchParams.get("kkLogoutComplete"), n = e.searchParams.get("bookingLogout") === "true";
    if (!r && !n) return !1;
    if (e.searchParams.delete("kkLogoutComplete"), e.searchParams.delete("bookingLogout"), t.history.replaceState(t.history.state, "", e.href), r) {
      const u = m(t.sessionStorage, U);
      if (!u || u.nonce !== r) return !1;
      const h = f(u.url, e.href);
      return !h || new URL(w({ location: new URL(h) })).origin !== e.origin ? !1 : (t.sessionStorage.removeItem(U), t.sessionStorage.setItem(g, JSON.stringify({ url: h, created: Date.now() })), !0);
    }
    const o = m(t.sessionStorage, g), a = f(o == null ? void 0 : o.url, e.href);
    if (!a || !new URL(a).searchParams.get("kkLogout")) return !1;
    const s = new URL(t.document.referrer);
    return s.origin === new URL(a).origin && new URL(w({ location: s })).origin === e.origin;
  } catch {
    return !1;
  }
}
function ne(t = window) {
  const e = w(t);
  if (!e) return null;
  const r = new URL(V(e, t));
  return r.searchParams.has("logoutReturnUrl") ? (r.searchParams.set("bookingLogout", "true"), r.href) : null;
}
function oe(t, e = window, r = () => {
}, n = !1) {
  const o = m(e.sessionStorage, k);
  if (!o) return !1;
  const a = f(o.url, e.location.href);
  if (!a || new URL(a).origin !== e.location.origin) return !1;
  const s = new URL(e.location.href), u = (l) => {
    const i = w(e);
    if (!i || !l.frontendNonce) return !1;
    const c = new URL(i);
    return c.searchParams.set("kkLogoutComplete", l.frontendNonce), e.sessionStorage.removeItem(k), r(), e.location.replace(c.href), !0;
  };
  if (o.phase === "left" && s.searchParams.get("kkLogout") === o.nonce && (t || n)) {
    const l = s.searchParams.get("kkLogoutFrontend");
    if (!l || !/^[a-zA-Z0-9-]{16,80}$/.test(l)) return !1;
    s.searchParams.delete("kkLogout"), s.searchParams.delete("kkLogoutFrontend"), e.history.replaceState(e.history.state, "", s.href);
    const i = { ...o, frontendNonce: l, phase: "server" };
    if (n) return u(i);
    try {
      e.sessionStorage.setItem(k, JSON.stringify(i));
    } catch {
      return !1;
    }
    return r(), t.click(), !0;
  }
  const h = /\/callback\.aspx$/i.test(s.pathname) && !/[?#&](code|error|id_token)=/.test(s.search + s.hash);
  return o.phase === "server" && (n || h) ? u(o) : !1;
}
function se(t = window) {
  const e = new URL(t.location.href), r = /* @__PURE__ */ new Set([
    "twerenbold.ch",
    "www.twerenbold.ch",
    "staging.twerenbold.ch",
    "dev.twerenbold.ch",
    "imbach.ch",
    "www.imbach.ch",
    "staging.imbach.ch",
    "dev.imbach.ch"
  ]);
  return e.protocol !== "https:" || e.port || !r.has(e.hostname) || e.pathname === "/kundenkonto" || e.pathname === "/kundenkonto/" ? null : new URL("/kundenkonto", e.origin).href;
}
function w(t = window) {
  return {
    "https://staging.reisemarkt.twerenbold.ch": "https://staging.twerenbold.ch/kundenkonto",
    "https://reisemarkt.twerenbold.ch": "https://www.twerenbold.ch/kundenkonto",
    "https://staging.reisemarkt.imbach.ch": "https://staging.imbach.ch/kundenkonto",
    "https://reisemarkt.imbach.ch": "https://www.imbach.ch/kundenkonto"
  }[new URL(t.location.href).origin] || null;
}
export {
  Z as a,
  z as b,
  ee as c,
  se as d,
  te as e,
  w as f,
  V as g,
  ne as h,
  oe as r,
  f as s,
  re as t
};
