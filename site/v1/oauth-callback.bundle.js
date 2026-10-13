import { A as U, p as E, U as T } from "./ProtocolUtils-h5d79O2w.js";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function $(t) {
  return `See https://aka.ms/msal.js.errors#${t} for details`;
}
class m extends U {
  constructor(e, n) {
    super(e, $(e), n), Object.setPrototypeOf(this, m.prototype), this.name = "BrowserAuthError";
  }
}
function l(t, e) {
  return new m(t, e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const v = "no_state_in_hash", P = "unable_to_parse_state", C = "invalid_base64_string", H = "timed_out", N = "empty_response";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function O(t) {
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
      throw l(C);
  }
  const n = atob(e);
  return Uint8Array.from(n, (r) => r.codePointAt(0) || 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function D() {
  const t = window.location.hash, e = window.location.search;
  let n = !1, r = !1, a = "", s;
  if (t && t.length > 1) {
    const i = t.charAt(0) === "#" ? t.substring(1) : t, o = new URLSearchParams(i);
    o.has("state") && (n = !0, a = i, s = o);
  }
  if (e && e.length > 1) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, o = new URLSearchParams(i);
    o.has("state") && (r = !0, a = i, s = o);
  }
  if (n && r) {
    const i = e.charAt(0) === "?" ? e.substring(1) : e, o = t.charAt(0) === "#" ? t.substring(1) : t;
    a = `${i}${o}`, s = new URLSearchParams(a);
  }
  if (!a || !s)
    throw l(N);
  const c = s.get("state");
  if (!c)
    throw l(v);
  const { libraryState: p } = E(O, c), { id: u, meta: h } = p;
  if (!u || !h)
    throw l(P, "missing_library_state");
  return {
    params: s,
    payload: a,
    urlHash: t,
    urlQuery: e,
    hasResponseInHash: n,
    hasResponseInQuery: r,
    libraryState: {
      id: u,
      meta: h
    }
  };
}
function M() {
  const e = new T(window.location.href).getUrlComponents();
  return `${e.Protocol}//${e.HostNameAndPort}/`;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const R = {
  ORIGIN_URI: "request.origin",
  URL_HASH: "urlHash",
  REQUEST_PARAMS: "request.params",
  VERIFIER: "code.verifier",
  INTERACTION_STATUS_KEY: "interaction.status",
  NATIVE_REQUEST: "request.native"
}, Q = {
  handleRedirectPromise: 865
};
var g;
(function(t) {
  t.Redirect = "redirect", t.Popup = "popup", t.Silent = "silent", t.None = "none";
})(g || (g = {}));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const k = 3e4;
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class w {
  /**
   * Navigates to other pages within the same web application
   * @param url
   * @param options
   */
  navigateInternal(e, n) {
    return w.defaultNavigateWindow(e, n);
  }
  /**
   * Navigates to other pages outside the web application i.e. the Identity Provider
   * @param url
   * @param options
   */
  navigateExternal(e, n) {
    return w.defaultNavigateWindow(e, n);
  }
  /**
   * Default navigation implementation invoked by the internal and external functions
   * @param url
   * @param options
   */
  static defaultNavigateWindow(e, n) {
    return n.noHistory ? window.location.replace(e) : window.location.assign(e), new Promise((r, a) => {
      setTimeout(() => {
        a(l(H, "failed_to_redirect"));
      }, n.timeout);
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const S = "msal";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function F(t) {
  let e;
  try {
    e = D();
  } catch (o) {
    throw typeof window.history.replaceState == "function" && window.history.replaceState(null, "", `${window.location.origin}${window.location.pathname}`), o;
  }
  const { payload: n, urlHash: r, urlQuery: a, hasResponseInHash: s, hasResponseInQuery: c, libraryState: p } = e, { id: u, meta: h } = p;
  if (h.interactionType === g.Redirect) {
    const o = new w(), I = {
      apiId: Q.handleRedirectPromise,
      noHistory: !0,
      timeout: k
    };
    let y = "";
    const A = `${S}.${R.INTERACTION_STATUS_KEY}}`;
    try {
      const { clientId: f } = JSON.parse(window.sessionStorage.getItem(A) || "");
      if (f) {
        const b = `${S}.${f}.${R.ORIGIN_URI}`;
        y = window.sessionStorage.getItem(b) || "";
      }
    } catch {
    }
    let d = "";
    s && c ? d = `${a}${r}` : s ? d = r : d = a;
    const _ = `${y || M()}${d}`;
    await o.navigateInternal(_, I);
    return;
  }
  if (typeof window.history.replaceState == "function") {
    let o = `${window.location.origin}${window.location.pathname}`;
    !s && r && (o += r), !c && a && (o += a), window.history.replaceState(null, "", o);
  }
  const i = new BroadcastChannel(u);
  i.postMessage({
    v: 1,
    payload: n
  }), i.close();
  try {
    window.close();
  } catch {
  }
}
F().catch(() => {
  console.error("[OAuthCallback] Authentication response could not be forwarded.");
});
