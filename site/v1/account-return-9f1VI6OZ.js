import { A as T, p as v, U as $ } from "./ProtocolUtils-h5d79O2w.js";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function O(t) {
  return `See https://aka.ms/msal.js.errors#${t} for details`;
}
class y extends T {
  constructor(e, n) {
    super(e, O(e), n), Object.setPrototypeOf(this, y.prototype), this.name = "BrowserAuthError";
  }
}
function d(t, e) {
  return new y(t, e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const D = "no_state_in_hash", H = "unable_to_parse_state", C = "invalid_base64_string", F = "timed_out", B = "empty_response";
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
      throw d(C);
  }
  const n = atob(e);
  return Uint8Array.from(n, (r) => r.codePointAt(0) || 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function x() {
  const t = window.location.hash, e = window.location.search;
  let n = !1, r = !1, o = "", a;
  if (t && t.length > 1) {
    const i = t.charAt(0) === "#" ? t.substring(1) : t, c = new URLSearchParams(i);
    c.has("state") && (n = !0, o = i, a = c);
  }
  if (e && e.length > 1) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, c = new URLSearchParams(i);
    c.has("state") && (r = !0, o = i, a = c);
  }
  if (n && r) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, c = t.charAt(0) === "#" ? t.substring(1) : t;
    o = `${i}${c}`, a = new URLSearchParams(o);
  }
  if (!o || !a)
    throw d(B);
  const s = a.get("state");
  if (!s)
    throw d(D);
  const { libraryState: h } = v(K, s), { id: l, meta: u } = h;
  if (!l || !u)
    throw d(H, "missing_library_state");
  return {
    params: a,
    payload: o,
    urlHash: t,
    urlQuery: e,
    hasResponseInHash: n,
    hasResponseInQuery: r,
    libraryState: {
      id: l,
      meta: u
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
  navigateInternal(e, n) {
    return R.defaultNavigateWindow(e, n);
  }
  /**
   * Navigates to other pages outside the web application i.e. the Identity Provider
   * @param url
   * @param options
   */
  navigateExternal(e, n) {
    return R.defaultNavigateWindow(e, n);
  }
  /**
   * Default navigation implementation invoked by the internal and external functions
   * @param url
   * @param options
   */
  static defaultNavigateWindow(e, n) {
    return n.noHistory ? window.location.replace(e) : window.location.assign(e), new Promise((r, o) => {
      setTimeout(() => {
        o(d(F, "failed_to_redirect"));
      }, n.timeout);
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
  const { payload: n, urlHash: r, urlQuery: o, hasResponseInHash: a, hasResponseInQuery: s, libraryState: h } = e, { id: l, meta: u } = h;
  if (u.interactionType === b.Redirect) {
    const c = new R(), _ = {
      apiId: M.handleRedirectPromise,
      noHistory: !0,
      timeout: Q
    };
    let L = "";
    const E = `${P}.${I.INTERACTION_STATUS_KEY}}`;
    try {
      const { clientId: S } = JSON.parse(window.sessionStorage.getItem(E) || "");
      if (S) {
        const N = `${P}.${S}.${I.ORIGIN_URI}`;
        L = window.sessionStorage.getItem(N) || "";
      }
    } catch {
    }
    let p = "";
    a && s ? p = `${o}${r}` : a ? p = r : p = o;
    const A = `${L || J()}${p}`;
    await c.navigateInternal(A, _);
    return;
  }
  if (typeof window.history.replaceState == "function") {
    let c = `${window.location.origin}${window.location.pathname}`;
    !a && r && (c += r), !s && o && (c += o), window.history.replaceState(null, "", c);
  }
  const i = new BroadcastChannel(l);
  i.postMessage({
    v: 1,
    payload: n
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
    const n = new URL(t, e), r = new URL(e).origin;
    return n.username || n.password || n.protocol !== "https:" && !(n.protocol === "http:" && n.origin === r && ["localhost", "127.0.0.1"].includes(n.hostname)) || n.origin !== r && (!W.has(n.hostname) || n.port) ? null : n.href;
  } catch {
    return null;
  }
}
function m(t, e) {
  try {
    const n = JSON.parse(t.getItem(e));
    if (n && Number.isFinite(n.created) && Date.now() >= n.created && Date.now() - n.created < j) return n;
    t.removeItem(e);
  } catch {
  }
  return null;
}
function Z(t = window) {
  try {
    const e = new URL(t.location.href);
    if (!e.searchParams.has("logoutReturnUrl")) return;
    const n = f(e.searchParams.get("logoutReturnUrl"), t.location.href);
    t.sessionStorage.removeItem(g), n && t.sessionStorage.setItem(g, JSON.stringify({ url: n, created: Date.now() })), e.searchParams.delete("logoutReturnUrl"), t.history.replaceState(t.history.state, "", e.href);
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
  const n = f(t, e.location.href);
  if (!n) return t;
  try {
    const r = new URL(e.location.href);
    r.searchParams.delete("kkLogout");
    const o = e.crypto.randomUUID(), a = { url: r.href, account: n, nonce: o, phase: "left", created: Date.now() };
    e.sessionStorage.setItem(k, JSON.stringify(a)), r.searchParams.set("kkLogout", o);
    const s = new URL(n);
    return s.searchParams.set("logoutReturnUrl", r.href), s.href;
  } catch {
    return t;
  }
}
function te(t = window, e) {
  const n = m(t.sessionStorage, g), r = f(n == null ? void 0 : n.url, t.location.href);
  if (!r) return !1;
  const o = new URL(r), a = w({ location: o });
  if (!a || new URL(a).origin !== t.location.origin || !o.searchParams.get("kkLogout")) return !1;
  const s = t.crypto.randomUUID(), h = new URL(o);
  h.searchParams.delete("kkLogout");
  const l = typeof e == "string" && e.length <= 4096 ? e : void 0;
  return t.sessionStorage.setItem(U, JSON.stringify({ nonce: s, url: h.href, created: Date.now(), logoutHint: l })), o.searchParams.set("kkLogoutFrontend", s), t.location.replace(o.href), !0;
}
function ne(t = window, e = () => {
}) {
  try {
    const n = new URL(t.location.href), r = n.searchParams.get("kkLogoutComplete"), o = n.searchParams.get("bookingLogout") === "true";
    if (!r && !o) return !1;
    if (n.searchParams.delete("kkLogoutComplete"), n.searchParams.delete("bookingLogout"), t.history.replaceState(t.history.state, "", n.href), r) {
      const l = m(t.sessionStorage, U);
      if (!l || l.nonce !== r) return !1;
      const u = f(l.url, n.href);
      return !u || new URL(w({ location: new URL(u) })).origin !== n.origin ? !1 : (t.sessionStorage.removeItem(U), t.sessionStorage.setItem(g, JSON.stringify({ url: u, created: Date.now() })), e(typeof l.logoutHint == "string" && l.logoutHint.length <= 4096 ? l.logoutHint : void 0), !0);
    }
    const a = m(t.sessionStorage, g), s = f(a == null ? void 0 : a.url, n.href);
    if (!s || !new URL(s).searchParams.get("kkLogout")) return !1;
    const h = new URL(t.document.referrer);
    return h.origin === new URL(s).origin && new URL(w({ location: h })).origin === n.origin;
  } catch {
    return !1;
  }
}
function oe(t = window) {
  const e = w(t);
  if (!e) return null;
  const n = new URL(V(e, t));
  return n.searchParams.has("logoutReturnUrl") ? (n.searchParams.set("bookingLogout", "true"), n.href) : null;
}
function re(t, e = window, n = () => {
}, r = !1) {
  const o = m(e.sessionStorage, k);
  if (!o) return !1;
  const a = f(o.url, e.location.href);
  if (!a || new URL(a).origin !== e.location.origin) return !1;
  const s = new URL(e.location.href), h = (u) => {
    const i = w(e);
    if (!i || !u.frontendNonce) return !1;
    const c = new URL(i);
    return c.searchParams.set("kkLogoutComplete", u.frontendNonce), e.sessionStorage.removeItem(k), n(), e.location.replace(c.href), !0;
  };
  if (o.phase === "left" && s.searchParams.get("kkLogout") === o.nonce && (t || r)) {
    const u = s.searchParams.get("kkLogoutFrontend");
    if (!u || !/^[a-zA-Z0-9-]{16,80}$/.test(u)) return !1;
    s.searchParams.delete("kkLogout"), s.searchParams.delete("kkLogoutFrontend"), e.history.replaceState(e.history.state, "", s.href);
    const i = { ...o, frontendNonce: u, phase: "server" };
    if (r) return h(i);
    try {
      e.sessionStorage.setItem(k, JSON.stringify(i));
    } catch {
      return !1;
    }
    return n(), t.click(), !0;
  }
  const l = /\/callback\.aspx$/i.test(s.pathname) && !/[?#&](code|error|id_token)=/.test(s.search + s.hash);
  return o.phase === "server" && (r || l) ? h(o) : !1;
}
function se(t = window) {
  const e = new URL(t.location.href), n = /* @__PURE__ */ new Set([
    "twerenbold.ch",
    "www.twerenbold.ch",
    "staging.twerenbold.ch",
    "dev.twerenbold.ch",
    "imbach.ch",
    "www.imbach.ch",
    "staging.imbach.ch",
    "dev.imbach.ch"
  ]);
  return e.protocol !== "https:" || e.port || !n.has(e.hostname) || e.pathname === "/kundenkonto" || e.pathname === "/kundenkonto/" ? null : new URL("/kundenkonto", e.origin).href;
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
  oe as h,
  re as r,
  f as s,
  ne as t
};
