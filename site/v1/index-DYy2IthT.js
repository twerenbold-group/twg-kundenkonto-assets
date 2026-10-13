import { S as fe, c as R, e as Pa, O as Ue, a as fo, b as mi, d as p, f as Na, g as Ma, h as yi, C as Ot, i as po, j as Ua, X as xa, k as E, l as mo, H as K, R as sn, m as Da, n as T, o as Dn, t as yo, q as La, U as b, r as Ha, s as Ka, u as Co, v as Ln, w as wo, x as Io, y as Fa, z as Ba, B as za, A as v, D as H, T as Bt, E as ja, F as er, G as Hn, I as To, J as Ga, K as Ao, L as Eo, M as ko, N as vo, P as Va, Q as $a, V as st, W as Ja, Y as Wa, Z as Qa, _ as Ya, $ as Xa, a0 as So, p as Et, a1 as bo, a2 as qa, a3 as Za, a4 as ec, a5 as tc, a6 as nc, a7 as Ci, a8 as Ve, a9 as wi, aa as Ii, ab as rc, ac as _o, ad as Ti, ae as ic, af as oc, ag as ae, ah as sc, ai as ac, aj as cc, ak as Rn, al as hc, am as lc, an as dc, ao as uc, ap as gc, aq as Ai, ar as be, as as fc, at as pc, au as mc, av as Qe, aw as yc, ax as Cc, ay as wc, az as tr, aA as Ro, aB as Ic, aC as Oo, aD as Tc, aE as Ac, aF as xe, aG as Le, aH as Ei, aI as Kn, aJ as Ec, aK as kc, aL as V, aM as ki, aN as vc, aO as $e, aP as vi, aQ as Si, aR as Sc, aS as bc, aT as _c, aU as Rc, aV as Oc, aW as Po, aX as Pc, aY as bi, aZ as Nc, a_ as Ye, a$ as Mc, b0 as Uc, b1 as xc, b2 as Fn, b3 as _i, b4 as nr, b5 as rr, b6 as Dc, b7 as Lc, b8 as Hc, b9 as Kc, ba as No, bb as Bn, bc as at, bd as Ri, be as Fc, bf as Bc } from "./ProtocolUtils-h5d79O2w.js";
import { bg as Dg, bh as Lg, bi as Hg } from "./ProtocolUtils-h5d79O2w.js";
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Fe = "client_id", Mo = "redirect_uri", zc = "response_type", jc = "response_mode", Gc = "grant_type", Vc = "claims", $c = "scope", Jc = "refresh_token", Wc = "state", Qc = "nonce", Yc = "prompt", Xc = "code", qc = "code_challenge", Zc = "code_challenge_method", eh = "code_verifier", th = "client-request-id", nh = "x-client-SKU", rh = "x-client-VER", ih = "x-client-OS", oh = "x-client-CPU", sh = "x-client-current-telemetry", ah = "x-client-last-telemetry", ch = "x-ms-lib-capability", hh = "x-app-name", lh = "x-app-ver", dh = "post_logout_redirect_uri", uh = "id_token_hint", gh = "client_secret", fh = "client_assertion", ph = "client_assertion_type", Uo = "token_type", xo = "req_cnf", Oi = "return_spa_code", mh = "nativebroker", yh = "logout_hint", Ch = "sid", wh = "login_hint", Ih = "domain_hint", Th = "x-client-xtra-sku", zt = "brk_client_id", jt = "brk_redirect_uri", zn = "instance_aware", Ah = "ear_jwk", Eh = "ear_jwe_crypto";
/*! @azure/msal-common v16.0.2 2026-01-17 */
class x {
  constructor(e) {
    const t = e ? fe.trimArrayEntries([...e]) : [], n = t ? fe.removeEmptyStringsFromArray(t) : [];
    if (!n || !n.length)
      throw R(Pa);
    this.scopes = /* @__PURE__ */ new Set(), n.forEach((r) => this.scopes.add(r));
  }
  /**
   * Factory method to create ScopeSet from space-delimited string
   * @param inputScopeString
   * @param appClientId
   * @param scopesRequired
   */
  static fromString(e) {
    const n = (e || "").split(" ");
    return new x(n);
  }
  /**
   * Creates the set of scopes to search for in cache lookups
   * @param inputScopeString
   * @returns
   */
  static createSearchScopes(e) {
    const t = e && e.length > 0 ? e : [...Ue], n = new x(t);
    return n.containsOnlyOIDCScopes() ? n.removeScope(fo) : n.removeOIDCScopes(), n;
  }
  /**
   * Check if a given scope is present in this set of scopes.
   * @param scope
   */
  containsScope(e) {
    const t = this.printScopesLowerCase().split(" "), n = new x(t);
    return e ? n.scopes.has(e.toLowerCase()) : !1;
  }
  /**
   * Check if a set of scopes is present in this set of scopes.
   * @param scopeSet
   */
  containsScopeSet(e) {
    return !e || e.scopes.size <= 0 ? !1 : this.scopes.size >= e.scopes.size && e.asArray().every((t) => this.containsScope(t));
  }
  /**
   * Check if set of scopes contains only the defaults
   */
  containsOnlyOIDCScopes() {
    let e = 0;
    return mi.forEach((t) => {
      this.containsScope(t) && (e += 1);
    }), this.scopes.size === e;
  }
  /**
   * Appends single scope if passed
   * @param newScope
   */
  appendScope(e) {
    e && this.scopes.add(e.trim());
  }
  /**
   * Appends multiple scopes if passed
   * @param newScopes
   */
  appendScopes(e) {
    try {
      e.forEach((t) => this.appendScope(t));
    } catch {
      throw p(Na);
    }
  }
  /**
   * Removes element from set of scopes.
   * @param scope
   */
  removeScope(e) {
    if (!e)
      throw p(Ma);
    this.scopes.delete(e.trim());
  }
  /**
   * Removes default scopes from set of scopes
   * Primarily used to prevent cache misses if the default scopes are not returned from the server
   */
  removeOIDCScopes() {
    mi.forEach((e) => {
      this.scopes.delete(e);
    });
  }
  /**
   * Combines an array of scopes with the current set of scopes.
   * @param otherScopes
   */
  unionScopeSets(e) {
    if (!e)
      throw p(yi);
    const t = /* @__PURE__ */ new Set();
    return e.scopes.forEach((n) => t.add(n.toLowerCase())), this.scopes.forEach((n) => t.add(n.toLowerCase())), t;
  }
  /**
   * Check if scopes intersect between this set and another.
   * @param otherScopes
   */
  intersectingScopeSets(e) {
    if (!e)
      throw p(yi);
    e.containsOnlyOIDCScopes() || e.removeOIDCScopes();
    const t = this.unionScopeSets(e), n = e.getScopeCount(), r = this.getScopeCount();
    return t.size < r + n;
  }
  /**
   * Returns size of set of scopes.
   */
  getScopeCount() {
    return this.scopes.size;
  }
  /**
   * Returns the scopes as an array of string values
   */
  asArray() {
    const e = [];
    return this.scopes.forEach((t) => e.push(t)), e;
  }
  /**
   * Prints scopes into a space-delimited string
   */
  printScopes() {
    return this.scopes ? this.asArray().join(" ") : "";
  }
  /**
   * Prints scopes into a space-delimited lower-case string (used for caching)
   */
  printScopesLowerCase() {
    return this.printScopes().toLowerCase();
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function an(i, e, t) {
  if (!e)
    return;
  const n = i.get(Fe);
  n && i.has(zt) && (t == null || t.addFields({
    embeddedClientId: n,
    embeddedRedirectUri: i.get(Mo)
  }, e));
}
function ir(i, e) {
  i.set(zc, e);
}
function kh(i, e) {
  i.set(jc, e || sn.QUERY);
}
function vh(i) {
  i.set(mh, "1");
}
function or(i, e, t = !0, n = Ue) {
  t && !n.includes("openid") && !e.includes("openid") && n.push("openid");
  const r = t ? [...e || [], ...n] : e || [], o = new x(r);
  i.set($c, o.printScopes());
}
function sr(i, e) {
  i.set(Fe, e);
}
function ar(i, e) {
  i.set(Mo, e);
}
function Sh(i, e) {
  i.set(dh, e);
}
function bh(i, e) {
  i.set(uh, e);
}
function _h(i, e) {
  i.set(Ih, e);
}
function Pt(i, e) {
  i.set(wh, e);
}
function Gt(i, e) {
  i.set(K.CCS_HEADER, `UPN:${e}`);
}
function lt(i, e) {
  i.set(K.CCS_HEADER, `Oid:${e.uid}@${e.utid}`);
}
function Pi(i, e) {
  i.set(Ch, e);
}
function cr(i, e, t) {
  const n = fr(e, t);
  try {
    JSON.parse(n);
  } catch {
    throw R(mo);
  }
  i.set(Vc, n);
}
function hr(i, e) {
  i.set(th, e);
}
function lr(i, e) {
  i.set(nh, e.sku), i.set(rh, e.version), e.os && i.set(ih, e.os), e.cpu && i.set(oh, e.cpu);
}
function dr(i, e) {
  e != null && e.appName && i.set(hh, e.appName), e != null && e.appVersion && i.set(lh, e.appVersion);
}
function Rh(i, e) {
  i.set(Yc, e);
}
function Do(i, e) {
  e && i.set(Wc, e);
}
function Oh(i, e) {
  i.set(Qc, e);
}
function ur(i, e, t) {
  if (e && t)
    i.set(qc, e), i.set(Zc, t);
  else
    throw R(po);
}
function Ph(i, e) {
  i.set(Xc, e);
}
function Nh(i, e) {
  i.set(Jc, e);
}
function Mh(i, e) {
  i.set(eh, e);
}
function Lo(i, e) {
  i.set(gh, e);
}
function Ho(i, e) {
  e && i.set(fh, e);
}
function Ko(i, e) {
  e && i.set(ph, e);
}
function Fo(i, e) {
  i.set(Gc, e);
}
function gr(i) {
  i.set(Ua, "1");
}
function Bo(i) {
  i.has(zn) || i.set(zn, "true");
}
function pe(i, e) {
  Object.entries(e).forEach(([t, n]) => {
    !i.has(t) && n && i.set(t, n);
  });
}
function fr(i, e) {
  let t;
  if (!i)
    t = {};
  else
    try {
      t = JSON.parse(i);
    } catch {
      throw R(mo);
    }
  return e && e.length > 0 && (t.hasOwnProperty(Ot.ACCESS_TOKEN) || (t[Ot.ACCESS_TOKEN] = {}), t[Ot.ACCESS_TOKEN][Ot.XMS_CC] = {
    values: e
  }), JSON.stringify(t);
}
function pr(i, e) {
  e && (i.set(Uo, E.POP), i.set(xo, e));
}
function zo(i, e) {
  e && (i.set(Uo, E.SSH), i.set(xo, e));
}
function jo(i, e) {
  i.set(sh, e.generateCurrentRequestHeaderValue()), i.set(ah, e.generateLastRequestHeaderValue());
}
function Go(i) {
  i.set(ch, xa);
}
function Uh(i, e) {
  i.set(yh, e);
}
function cn(i, e, t) {
  i.has(zt) || i.set(zt, e), i.has(jt) || i.set(jt, t);
}
function xh(i, e) {
  i.set(Ah, encodeURIComponent(e)), i.set(Eh, "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Ni(i) {
  if (!i)
    return i;
  let e = i.toLowerCase();
  return fe.endsWith(e, "?") ? e = e.slice(0, -1) : fe.endsWith(e, "?/") && (e = e.slice(0, -2)), fe.endsWith(e, "/") || (e += "/"), e;
}
function Vo(i) {
  return i.startsWith("#/") ? i.substring(2) : i.startsWith("#") || i.startsWith("?") ? i.substring(1) : i;
}
function Vt(i) {
  if (!i || i.indexOf("=") < 0)
    return null;
  try {
    const e = Vo(i), t = Object.fromEntries(new URLSearchParams(e));
    if (t.code || t.ear_jwe || t.error || t.error_description || t.state)
      return t;
  } catch {
    throw p(Da);
  }
  return null;
}
function ft(i) {
  const e = new Array();
  return i.forEach((t, n) => {
    e.push(`${n}=${encodeURIComponent(t)}`);
  }), e.join("&");
}
function Mi(i) {
  if (!i)
    return i;
  const e = i.split("#")[0];
  try {
    const t = new URL(e), n = t.origin + t.pathname + t.search;
    return Ni(n);
  } catch {
    return Ni(e);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const pt = {
  createNewGuid: () => {
    throw p(T);
  },
  base64Decode: () => {
    throw p(T);
  },
  base64Encode: () => {
    throw p(T);
  },
  base64UrlEncode: () => {
    throw p(T);
  },
  encodeKid: () => {
    throw p(T);
  },
  async getPublicKeyThumbprint() {
    throw p(T);
  },
  async removeTokenBindingKey() {
    throw p(T);
  },
  async clearKeystore() {
    throw p(T);
  },
  async signJwt() {
    throw p(T);
  },
  async hashString() {
    throw p(T);
  }
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
var _;
(function(i) {
  i[i.Error = 0] = "Error", i[i.Warning = 1] = "Warning", i[i.Info = 2] = "Info", i[i.Verbose = 3] = "Verbose", i[i.Trace = 4] = "Trace";
})(_ || (_ = {}));
const Dh = 50, Lh = 500, we = /* @__PURE__ */ new Map();
function Hh(i, e) {
  we.delete(i), we.set(i, e);
}
function Kh(i, e) {
  const t = Date.now();
  let n = we.get(i);
  if (n)
    Hh(i, n);
  else if (n = { logs: [], firstEventTime: t }, we.set(i, n), we.size > Dh) {
    const r = we.keys().next().value;
    r && we.delete(r);
  }
  n.logs.push({
    ...e,
    milliseconds: t - n.firstEventTime
  }), n.logs.length > Lh && n.logs.shift();
}
function Fh(i) {
  const e = [];
  for (const t of ["", i]) {
    const n = we.get(t);
    e.push(...(n == null ? void 0 : n.logs) ?? []), we.delete(t);
  }
  return e;
}
function Bh(i) {
  if (i.length !== 6)
    return !1;
  for (let e = 0; e < i.length; e++) {
    const t = i[e];
    if (!(t >= "a" && t <= "z" || t >= "A" && t <= "Z" || t >= "0" && t <= "9"))
      return !1;
  }
  return !0;
}
class Q {
  constructor(e, t, n) {
    this.level = _.Info;
    const r = () => {
    }, o = e || Q.createDefaultLoggerOptions();
    this.localCallback = o.loggerCallback || r, this.piiLoggingEnabled = o.piiLoggingEnabled || !1, this.level = typeof o.logLevel == "number" ? o.logLevel : _.Info, this.packageName = t || "", this.packageVersion = n || "";
  }
  static createDefaultLoggerOptions() {
    return {
      loggerCallback: () => {
      },
      piiLoggingEnabled: !1,
      logLevel: _.Info
    };
  }
  /**
   * Create new Logger with existing configurations.
   */
  clone(e, t) {
    return new Q({
      loggerCallback: this.localCallback,
      piiLoggingEnabled: this.piiLoggingEnabled,
      logLevel: this.level
    }, e, t);
  }
  /**
   * Log message with required options.
   */
  logMessage(e, t) {
    const n = t.correlationId;
    if (Bh(e)) {
      const c = {
        hash: e,
        level: t.logLevel,
        containsPii: t.containsPii || !1,
        milliseconds: 0
        // Will be calculated in addLogToCache
      };
      Kh(n, c);
    }
    if (t.logLevel > this.level || !this.piiLoggingEnabled && t.containsPii)
      return;
    const a = `${`[${(/* @__PURE__ */ new Date()).toUTCString()}] : [${n}]`} : ${this.packageName}@${this.packageVersion} : ${_[t.logLevel]} - ${e}`;
    this.executeCallback(t.logLevel, a, t.containsPii || !1);
  }
  /**
   * Execute callback with message.
   */
  executeCallback(e, t, n) {
    this.localCallback && this.localCallback(e, t, n);
  }
  /**
   * Logs error messages.
   */
  error(e, t) {
    this.logMessage(e, {
      logLevel: _.Error,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs error messages with PII.
   */
  errorPii(e, t) {
    this.logMessage(e, {
      logLevel: _.Error,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs warning messages.
   */
  warning(e, t) {
    this.logMessage(e, {
      logLevel: _.Warning,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs warning messages with PII.
   */
  warningPii(e, t) {
    this.logMessage(e, {
      logLevel: _.Warning,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs info messages.
   */
  info(e, t) {
    this.logMessage(e, {
      logLevel: _.Info,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs info messages with PII.
   */
  infoPii(e, t) {
    this.logMessage(e, {
      logLevel: _.Info,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs verbose messages.
   */
  verbose(e, t) {
    this.logMessage(e, {
      logLevel: _.Verbose,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs verbose messages with PII.
   */
  verbosePii(e, t) {
    this.logMessage(e, {
      logLevel: _.Verbose,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs trace messages.
   */
  trace(e, t) {
    this.logMessage(e, {
      logLevel: _.Trace,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs trace messages with PII.
   */
  tracePii(e, t) {
    this.logMessage(e, {
      logLevel: _.Trace,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Returns whether PII Logging is enabled or not.
   */
  isPiiLoggingEnabled() {
    return this.piiLoggingEnabled || !1;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const hn = "@azure/msal-common", kt = "16.0.2";
/*! @azure/msal-common v16.0.2 2026-01-17 */
const mr = {
  // AzureCloudInstance is not specified.
  None: "none",
  // Microsoft Azure public cloud
  AzurePublic: "https://login.microsoftonline.com",
  // Microsoft PPE
  AzurePpe: "https://login.windows-ppe.net",
  // Microsoft Chinese national/regional cloud
  AzureChina: "https://login.chinacloudapi.cn",
  // Microsoft German national/regional cloud ("Black Forest")
  AzureGermany: "https://login.microsoftonline.de",
  // US Government cloud
  AzureUsGovernment: "https://login.microsoftonline.us"
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Ui(i, e) {
  return !!i && !!e && i === e.split(".")[1];
}
function vt(i, e, t, n) {
  if (n) {
    const { oid: r, sub: o, tid: s, name: a, tfp: c, acr: h, preferred_username: l, upn: d, login_hint: g } = n, f = s || c || h || "";
    return {
      tenantId: f,
      localAccountId: r || o || "",
      name: a,
      username: l || d || "",
      loginHint: g,
      isHomeTenant: Ui(f, i)
    };
  } else
    return {
      tenantId: t,
      localAccountId: e,
      username: "",
      isHomeTenant: Ui(t, i)
    };
}
function yr(i, e, t, n) {
  let r = i;
  if (e) {
    const { isHomeTenant: o, ...s } = e;
    r = { ...i, ...s };
  }
  if (t) {
    const { isHomeTenant: o, ...s } = vt(i.homeAccountId, i.localAccountId, i.tenantId, t);
    return r = {
      ...r,
      ...s,
      idTokenClaims: t,
      idToken: n
    }, r;
  }
  return r;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function re(i, e) {
  const t = zh(i);
  try {
    const n = e(t);
    return JSON.parse(n);
  } catch {
    throw p(yo);
  }
}
function de(i) {
  if (!i.signin_state)
    return !1;
  const e = ["kmsi", "dvc_dmjd"];
  return i.signin_state.some((t) => e.includes(t.trim().toLowerCase()));
}
function zh(i) {
  if (!i)
    throw p(Dn);
  const t = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(i);
  if (!t || t.length < 4)
    throw p(yo);
  return t[2];
}
function $o(i, e) {
  if (e === 0 || Date.now() - 3e5 > i + e)
    throw p(La);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const jh = [
  { host: "login.microsoftonline.com" },
  {
    host: "login.chinacloudapi.cn",
    issuerHost: "login.partner.microsoftonline.cn"
    // Issuer differs
  },
  { host: "login.microsoftonline.us" },
  { host: "login.sovcloud-identity.fr" },
  { host: "login.sovcloud-identity.de" },
  { host: "login.sovcloud-identity.sg" }
];
function Gh(i, e) {
  return {
    token_endpoint: `https://${i}/{tenantid}/oauth2/v2.0/token`,
    jwks_uri: `https://${i}/{tenantid}/discovery/v2.0/keys`,
    issuer: `https://${e}/{tenantid}/v2.0`,
    authorization_endpoint: `https://${i}/{tenantid}/oauth2/v2.0/authorize`,
    end_session_endpoint: `https://${i}/{tenantid}/oauth2/v2.0/logout`
  };
}
const Vh = jh.reduce((i, { host: e, issuerHost: t }) => (i[e] = Gh(e, t || e), i), {}), Jo = {
  endpointMetadata: Vh,
  instanceDiscoveryMetadata: {
    metadata: [
      {
        preferred_network: "login.microsoftonline.com",
        preferred_cache: "login.windows.net",
        aliases: [
          "login.microsoftonline.com",
          "login.windows.net",
          "login.microsoft.com",
          "sts.windows.net"
        ]
      },
      {
        preferred_network: "login.partner.microsoftonline.cn",
        preferred_cache: "login.partner.microsoftonline.cn",
        aliases: [
          "login.partner.microsoftonline.cn",
          "login.chinacloudapi.cn"
        ]
      },
      {
        preferred_network: "login.microsoftonline.de",
        preferred_cache: "login.microsoftonline.de",
        aliases: ["login.microsoftonline.de"]
      },
      {
        preferred_network: "login.microsoftonline.us",
        preferred_cache: "login.microsoftonline.us",
        aliases: [
          "login.microsoftonline.us",
          "login.usgovcloudapi.net"
        ]
      },
      {
        preferred_network: "login-us.microsoftonline.com",
        preferred_cache: "login-us.microsoftonline.com",
        aliases: ["login-us.microsoftonline.com"]
      }
    ]
  }
}, xi = Jo.endpointMetadata, Cr = Jo.instanceDiscoveryMetadata, Wo = /* @__PURE__ */ new Set();
Cr.metadata.forEach((i) => {
  i.aliases.forEach((e) => {
    Wo.add(e);
  });
});
function $h(i, e, t) {
  var o;
  let n;
  const r = i.canonicalAuthority;
  if (r) {
    const s = new b(r).getUrlComponents().HostNameAndPort;
    n = Di(e, t, s, (o = i.cloudDiscoveryMetadata) == null ? void 0 : o.metadata) || Di(e, t, s, Cr.metadata) || i.knownAuthorities;
  }
  return n || [];
}
function Di(i, e, t, n, r) {
  if (i.trace("1bmquz", e), t && n) {
    const o = $t(n, t);
    if (o)
      return i.trace("1fotbt", e), o.aliases;
    i.trace("14avvj", e);
  }
  return null;
}
function Jh(i) {
  return $t(Cr.metadata, i);
}
function $t(i, e) {
  for (let t = 0; t < i.length; t++) {
    const n = i[t];
    if (n.aliases.includes(e))
      return n;
  }
  return null;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const jn = "cache_quota_exceeded", Wh = "cache_error_unknown";
/*! @azure/msal-common v16.0.2 2026-01-17 */
class He extends Error {
  constructor(e, t) {
    const n = t || Ha(e);
    super(n), Object.setPrototypeOf(this, He.prototype), this.name = "CacheError", this.errorCode = e, this.errorMessage = n;
  }
}
function Gn(i) {
  return i instanceof Error ? i.name === "QuotaExceededError" || i.name === "NS_ERROR_DOM_QUOTA_REACHED" || i.message.includes("exceeded the quota") ? new He(jn) : new He(i.name, i.message) : new He(Wh);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Jt(i, e) {
  if (!i)
    throw p(Ka);
  try {
    const t = e(i);
    return JSON.parse(t);
  } catch {
    throw p(Co);
  }
}
function Xe(i) {
  if (!i)
    throw p(Co);
  const e = i.split(Ln, 2);
  return {
    uid: e[0],
    utid: e.length < 2 ? "" : e[1]
  };
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const he = {
  Default: 0,
  Adfs: 1,
  Dsts: 2,
  Ciam: 3
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function wr(i) {
  return i && (i.tid || i.tfp || i.acr) || null;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const J = {
  /**
   * Auth Code + PKCE with Entra ID (formerly AAD) specific optimizations and features
   */
  AAD: "AAD",
  /**
   * Auth Code + PKCE without Entra ID specific optimizations and features. For use only with non-Microsoft owned authorities.
   * Support is limited for this mode.
   */
  OIDC: "OIDC",
  /**
   * Encrypted Authorize Response (EAR) with Entra ID specific optimizations and features
   */
  EAR: "EAR"
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function me(i) {
  return {
    homeAccountId: i.homeAccountId,
    environment: i.environment,
    tenantId: i.realm,
    username: i.username,
    localAccountId: i.localAccountId,
    loginHint: i.loginHint,
    name: i.name,
    nativeAccountId: i.nativeAccountId,
    authorityType: i.authorityType,
    // Deserialize tenant profiles array into a Map
    tenantProfiles: new Map((i.tenantProfiles || []).map((e) => [e.tenantId, e])),
    dataBoundary: i.dataBoundary
  };
}
function Qh(i, e, t) {
  var w, I, A, P, S, N, ee;
  let n;
  e.authorityType === he.Adfs ? n = Fa : e.protocolMode === J.OIDC ? n = wo : n = Ba;
  let r, o;
  i.clientInfo && t && (r = Jt(i.clientInfo, t), r.xms_tdbr && (o = r.xms_tdbr === "EU" ? "EU" : "None"));
  const s = i.environment || e && e.getPreferredCache();
  if (!s)
    throw p(Io);
  const a = ((w = i.idTokenClaims) == null ? void 0 : w.preferred_username) || ((I = i.idTokenClaims) == null ? void 0 : I.upn), c = (A = i.idTokenClaims) != null && A.emails ? i.idTokenClaims.emails[0] : null, h = a || c || "", l = (P = i.idTokenClaims) == null ? void 0 : P.login_hint, d = (r == null ? void 0 : r.utid) || wr(i.idTokenClaims) || "", g = (r == null ? void 0 : r.uid) || ((S = i.idTokenClaims) == null ? void 0 : S.oid) || ((N = i.idTokenClaims) == null ? void 0 : N.sub) || "";
  let f;
  return i.tenantProfiles ? f = i.tenantProfiles : f = [vt(i.homeAccountId, g, d, i.idTokenClaims)], {
    homeAccountId: i.homeAccountId,
    environment: s,
    realm: d,
    localAccountId: g,
    username: h,
    authorityType: n,
    loginHint: l,
    clientInfo: i.clientInfo,
    name: ((ee = i.idTokenClaims) == null ? void 0 : ee.name) || "",
    lastModificationTime: void 0,
    lastModificationApp: void 0,
    cloudGraphHostName: i.cloudGraphHostName,
    msGraphHost: i.msGraphHost,
    nativeAccountId: i.nativeAccountId,
    tenantProfiles: f,
    dataBoundary: o
  };
}
function Ir(i, e, t) {
  var n;
  return {
    authorityType: i.authorityType || wo,
    homeAccountId: i.homeAccountId,
    localAccountId: i.localAccountId,
    nativeAccountId: i.nativeAccountId,
    realm: i.tenantId,
    environment: i.environment,
    username: i.username,
    loginHint: i.loginHint,
    name: i.name,
    cloudGraphHostName: e,
    msGraphHost: t,
    tenantProfiles: Array.from(((n = i.tenantProfiles) == null ? void 0 : n.values()) || []),
    dataBoundary: i.dataBoundary
  };
}
function Tr(i, e, t, n, r, o) {
  if (!(e === he.Adfs || e === he.Dsts)) {
    if (i)
      try {
        const s = Jt(i, n.base64Decode);
        if (s.uid && s.utid)
          return `${s.uid}.${s.utid}`;
      } catch {
      }
    t.warning("1ub6wv", r);
  }
  return (o == null ? void 0 : o.sub) || "";
}
function Yh(i) {
  return i ? i.hasOwnProperty("homeAccountId") && i.hasOwnProperty("environment") && i.hasOwnProperty("realm") && i.hasOwnProperty("localAccountId") && i.hasOwnProperty("username") && i.hasOwnProperty("authorityType") : !1;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Vn {
  constructor(e, t, n, r, o) {
    this.clientId = e, this.cryptoImpl = t, this.commonLogger = n.clone(hn, kt), this.staticAuthorityOptions = o, this.performanceClient = r;
  }
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(e = {}, t) {
    return this.buildTenantProfiles(this.getAccountsFilteredBy(e, t), t, e);
  }
  /**
   * Gets first tenanted AccountInfo object found based on provided filters
   */
  getAccountInfoFilteredBy(e, t) {
    const n = this.getAllAccounts(e, t);
    return n.length > 1 ? n.sort((o) => o.idTokenClaims ? -1 : 1)[0] : n.length === 1 ? n[0] : null;
  }
  /**
   * Returns a single matching
   * @param accountFilter
   * @returns
   */
  getBaseAccountInfo(e, t) {
    const n = this.getAccountsFilteredBy(e, t);
    return n.length > 0 ? me(n[0]) : null;
  }
  /**
   * Matches filtered account entities with cached ID tokens that match the tenant profile-specific account filters
   * and builds the account info objects from the matching ID token's claims
   * @param cachedAccounts
   * @param accountFilter
   * @returns Array of AccountInfo objects that match account and tenant profile filters
   */
  buildTenantProfiles(e, t, n) {
    return e.flatMap((r) => this.getTenantProfilesFromAccountEntity(r, t, n == null ? void 0 : n.tenantId, n));
  }
  getTenantedAccountInfoByFilter(e, t, n, r, o) {
    let s = null, a;
    if (o && !this.tenantProfileMatchesFilter(n, o))
      return null;
    const c = this.getIdToken(e, r, t, n.tenantId);
    return c && (a = re(c.secret, this.cryptoImpl.base64Decode), !this.idTokenClaimsMatchTenantProfileFilter(a, o)) ? null : (s = yr(e, n, a, c == null ? void 0 : c.secret), s);
  }
  getTenantProfilesFromAccountEntity(e, t, n, r) {
    const o = me(e);
    let s = o.tenantProfiles || /* @__PURE__ */ new Map();
    const a = this.getTokenKeys();
    if (n) {
      const h = s.get(n);
      if (h)
        s = /* @__PURE__ */ new Map([
          [n, h]
        ]);
      else
        return [];
    }
    const c = [];
    return s.forEach((h) => {
      const l = this.getTenantedAccountInfoByFilter(o, a, h, t, r);
      l && c.push(l);
    }), c;
  }
  tenantProfileMatchesFilter(e, t) {
    return !(t.localAccountId && !this.matchLocalAccountIdFromTenantProfile(e, t.localAccountId) || t.name && e.name !== t.name || t.isHomeTenant !== void 0 && e.isHomeTenant !== t.isHomeTenant);
  }
  idTokenClaimsMatchTenantProfileFilter(e, t) {
    return !(t && (t.localAccountId && !this.matchLocalAccountIdFromTokenClaims(e, t.localAccountId) || t.loginHint && !this.matchLoginHintFromTokenClaims(e, t.loginHint) || t.username && !this.matchUsername(e.preferred_username, t.username) || t.name && !this.matchName(e, t.name) || t.sid && !this.matchSid(e, t.sid)));
  }
  /**
   * saves a cache record
   * @param cacheRecord {CacheRecord}
   * @param storeInCache {?StoreInCache}
   * @param correlationId {?string} correlation id
   */
  async saveCacheRecord(e, t, n, r) {
    var o;
    if (!e)
      throw p(za);
    try {
      e.account && await this.setAccount(e.account, t, n), e.idToken && (r == null ? void 0 : r.idToken) !== !1 && await this.setIdTokenCredential(e.idToken, t, n), e.accessToken && (r == null ? void 0 : r.accessToken) !== !1 && await this.saveAccessToken(e.accessToken, t, n), e.refreshToken && (r == null ? void 0 : r.refreshToken) !== !1 && await this.setRefreshTokenCredential(e.refreshToken, t, n), e.appMetadata && this.setAppMetadata(e.appMetadata, t);
    } catch (s) {
      throw (o = this.commonLogger) == null || o.error("0j476p", t), s instanceof v ? s : Gn(s);
    }
  }
  /**
   * saves access token credential
   * @param credential
   */
  async saveAccessToken(e, t, n) {
    const r = {
      clientId: e.clientId,
      credentialType: e.credentialType,
      environment: e.environment,
      homeAccountId: e.homeAccountId,
      realm: e.realm,
      tokenType: e.tokenType
    }, o = this.getTokenKeys(), s = x.fromString(e.target);
    o.accessToken.forEach((a) => {
      if (!this.accessTokenKeyMatchesFilter(a, r, !1))
        return;
      const c = this.getAccessTokenCredential(a, t);
      c && this.credentialMatchesFilter(c, r, t) && x.fromString(c.target).intersectingScopeSets(s) && this.removeAccessToken(a, t);
    }), await this.setAccessTokenCredential(e, t, n);
  }
  /**
   * Retrieve account entities matching all provided tenant-agnostic filters; if no filter is set, get all account entities in the cache
   * Not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
   * @param accountFilter - An object containing Account properties to filter by
   */
  getAccountsFilteredBy(e, t) {
    const n = this.getAccountKeys(), r = [];
    return n.forEach((o) => {
      var h;
      const s = this.getAccount(o, t);
      if (!s || e.homeAccountId && !this.matchHomeAccountId(s, e.homeAccountId) || e.username && !this.matchUsername(s.username, e.username) || e.environment && !this.matchEnvironment(s, e.environment, t) || e.realm && !this.matchRealm(s, e.realm) || e.nativeAccountId && !this.matchNativeAccountId(s, e.nativeAccountId) || e.authorityType && !this.matchAuthorityType(s, e.authorityType))
        return;
      const a = {
        localAccountId: e == null ? void 0 : e.localAccountId,
        name: e == null ? void 0 : e.name
      }, c = (h = s.tenantProfiles) == null ? void 0 : h.filter((l) => this.tenantProfileMatchesFilter(l, a));
      c && c.length === 0 || r.push(s);
    }), r;
  }
  /**
   * Returns whether or not the given credential entity matches the filter
   * @param entity
   * @param filter
   * @param correlationId
   * @returns
   */
  credentialMatchesFilter(e, t, n) {
    return !(t.clientId && !this.matchClientId(e, t.clientId) || t.userAssertionHash && !this.matchUserAssertionHash(e, t.userAssertionHash) || typeof t.homeAccountId == "string" && !this.matchHomeAccountId(e, t.homeAccountId) || t.environment && !this.matchEnvironment(e, t.environment, n) || t.realm && !this.matchRealm(e, t.realm) || t.credentialType && !this.matchCredentialType(e, t.credentialType) || t.familyId && !this.matchFamilyId(e, t.familyId) || t.target && !this.matchTarget(e, t.target) || e.credentialType === H.ACCESS_TOKEN_WITH_AUTH_SCHEME && (t.tokenType && !this.matchTokenType(e, t.tokenType) || t.tokenType === E.SSH && t.keyId && !this.matchKeyId(e, t.keyId)));
  }
  /**
   * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
   * @param filter
   * @param correlationId
   */
  getAppMetadataFilteredBy(e, t) {
    const n = this.getKeys(), r = {};
    return n.forEach((o) => {
      if (!this.isAppMetadata(o))
        return;
      const s = this.getAppMetadata(o, t);
      s && (e.environment && !this.matchEnvironment(s, e.environment, t) || e.clientId && !this.matchClientId(s, e.clientId) || (r[o] = s));
    }), r;
  }
  /**
   * retrieve authorityMetadata that contains a matching alias
   * @param host
   * @param correlationId
   */
  getAuthorityMetadataByAlias(e, t) {
    const n = this.getAuthorityMetadataKeys();
    let r = null;
    return n.forEach((o) => {
      if (!this.isAuthorityMetadata(o) || o.indexOf(this.clientId) === -1)
        return;
      const s = this.getAuthorityMetadata(o, t);
      s && s.aliases.indexOf(e) !== -1 && (r = s);
    }), r;
  }
  /**
   * Removes all accounts and related tokens from cache.
   */
  removeAllAccounts(e) {
    this.getAllAccounts({}, e).forEach((n) => {
      this.removeAccount(n, e);
    });
  }
  /**
   * Removes the account and related tokens for a given account key
   * @param account
   */
  removeAccount(e, t) {
    this.removeAccountContext(e, t);
    const n = this.getAccountKeys(), r = (o) => o.includes(e.homeAccountId) && o.includes(e.environment);
    n.filter(r).forEach((o) => {
      this.removeItem(o, t), this.performanceClient.incrementFields({ accountsRemoved: 1 }, t);
    });
  }
  /**
   * Removes credentials associated with the provided account
   * @param account
   */
  removeAccountContext(e, t) {
    const n = this.getTokenKeys(), r = (o) => o.includes(e.homeAccountId) && o.includes(e.environment);
    n.idToken.filter(r).forEach((o) => {
      this.removeIdToken(o, t);
    }), n.accessToken.filter(r).forEach((o) => {
      this.removeAccessToken(o, t);
    }), n.refreshToken.filter(r).forEach((o) => {
      this.removeRefreshToken(o, t);
    });
  }
  /**
   * returns a boolean if the given credential is removed
   * @param key
   * @param correlationId
   */
  removeAccessToken(e, t) {
    const n = this.getAccessTokenCredential(e, t);
    if (n && (this.removeItem(e, t), this.performanceClient.incrementFields({ accessTokensRemoved: 1 }, t), n.credentialType.toLowerCase() === H.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase() && n.tokenType === E.POP)) {
      const o = n.keyId;
      o && this.cryptoImpl.removeTokenBindingKey(o, t).catch(() => {
        var s;
        this.commonLogger.error("0cx291", t), (s = this.performanceClient) == null || s.incrementFields({ removeTokenBindingKeyFailure: 1 }, t);
      });
    }
  }
  /**
   * Removes all app metadata objects from cache.
   */
  removeAppMetadata(e) {
    return this.getKeys().forEach((n) => {
      this.isAppMetadata(n) && this.removeItem(n, e);
    }), !0;
  }
  /**
   * Retrieve IdTokenEntity from cache
   * @param account {AccountInfo}
   * @param tokenKeys {?TokenKeys}
   * @param targetRealm {?string}
   * @param performanceClient {?IPerformanceClient}
   * @param correlationId {?string}
   */
  getIdToken(e, t, n, r) {
    this.commonLogger.trace("1drz22", t);
    const o = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: H.ID_TOKEN,
      clientId: this.clientId,
      realm: r
    }, s = this.getIdTokensByFilter(o, t, n), a = s.size;
    if (a < 1)
      return this.commonLogger.info("1atvtd", t), null;
    if (a > 1) {
      let c = s;
      if (!r) {
        const h = /* @__PURE__ */ new Map();
        s.forEach((d, g) => {
          d.realm === e.tenantId && h.set(g, d);
        });
        const l = h.size;
        if (l < 1)
          return this.commonLogger.info("0ooalx", t), s.values().next().value;
        if (l === 1)
          return this.commonLogger.info("1eq2vc", t), h.values().next().value;
        c = h;
      }
      return this.commonLogger.info("1ws328", t), c.forEach((h, l) => {
        this.removeIdToken(l, t);
      }), this.performanceClient.addFields({ multiMatchedID: s.size }, t), null;
    }
    return this.commonLogger.info("1sm769", t), s.values().next().value;
  }
  /**
   * Gets all idTokens matching the given filter
   * @param filter
   * @returns
   */
  getIdTokensByFilter(e, t, n) {
    const r = n && n.idToken || this.getTokenKeys().idToken, o = /* @__PURE__ */ new Map();
    return r.forEach((s) => {
      if (!this.idTokenKeyMatchesFilter(s, {
        clientId: this.clientId,
        ...e
      }))
        return;
      const a = this.getIdTokenCredential(s, t);
      a && this.credentialMatchesFilter(a, e, t) && o.set(s, a);
    }), o;
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @returns
   */
  idTokenKeyMatchesFilter(e, t) {
    const n = e.toLowerCase();
    return !(t.clientId && n.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && n.indexOf(t.homeAccountId.toLowerCase()) === -1);
  }
  /**
   * Removes idToken from the cache
   * @param key
   */
  removeIdToken(e, t) {
    this.removeItem(e, t);
  }
  /**
   * Removes refresh token from the cache
   * @param key
   */
  removeRefreshToken(e, t) {
    this.removeItem(e, t);
  }
  /**
   * Retrieve AccessTokenEntity from cache
   * @param account {AccountInfo}
   * @param request {BaseAuthRequest}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   */
  getAccessToken(e, t, n, r) {
    const o = t.correlationId;
    this.commonLogger.trace("1t7hz1", o);
    const s = x.createSearchScopes(t.scopes), a = t.authenticationScheme || E.BEARER, c = a && a.toLowerCase() !== E.BEARER.toLowerCase() ? H.ACCESS_TOKEN_WITH_AUTH_SCHEME : H.ACCESS_TOKEN, h = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: c,
      clientId: this.clientId,
      realm: r || e.tenantId,
      target: s,
      tokenType: a,
      keyId: t.sshKid
    }, l = n && n.accessToken || this.getTokenKeys().accessToken, d = [];
    l.forEach((f) => {
      if (this.accessTokenKeyMatchesFilter(f, h, !0)) {
        const w = this.getAccessTokenCredential(f, o);
        w && this.credentialMatchesFilter(w, h, o) && d.push(w);
      }
    });
    const g = d.length;
    return g < 1 ? (this.commonLogger.info("1nckna", o), null) : g > 1 ? (this.commonLogger.info("1wkfwp", o), d.forEach((f) => {
      this.removeAccessToken(this.generateCredentialKey(f), o);
    }), this.performanceClient.addFields({ multiMatchedAT: d.length }, o), null) : (this.commonLogger.info("06yt98", o), d[0]);
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @param keyMustContainAllScopes
   * @returns
   */
  accessTokenKeyMatchesFilter(e, t, n) {
    const r = e.toLowerCase();
    if (t.clientId && r.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && r.indexOf(t.homeAccountId.toLowerCase()) === -1 || t.realm && r.indexOf(t.realm.toLowerCase()) === -1)
      return !1;
    if (t.target) {
      const o = t.target.asArray();
      for (let s = 0; s < o.length; s++) {
        if (n && !r.includes(o[s].toLowerCase()))
          return !1;
        if (!n && r.includes(o[s].toLowerCase()))
          return !0;
      }
    }
    return !0;
  }
  /**
   * Gets all access tokens matching the filter
   * @param filter
   * @returns
   */
  getAccessTokensByFilter(e, t) {
    const n = this.getTokenKeys(), r = [];
    return n.accessToken.forEach((o) => {
      if (!this.accessTokenKeyMatchesFilter(o, e, !0))
        return;
      const s = this.getAccessTokenCredential(o, t);
      s && this.credentialMatchesFilter(s, e, t) && r.push(s);
    }), r;
  }
  /**
   * Helper to retrieve the appropriate refresh token from cache
   * @param account {AccountInfo}
   * @param familyRT {boolean}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   * @param correlationId {?string}
   */
  getRefreshToken(e, t, n, r) {
    this.commonLogger.trace("0x53vi", n);
    const o = t ? Bt : void 0, s = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: H.REFRESH_TOKEN,
      clientId: this.clientId,
      familyId: o
    }, a = r && r.refreshToken || this.getTokenKeys().refreshToken, c = [];
    a.forEach((l) => {
      if (this.refreshTokenKeyMatchesFilter(l, s)) {
        const d = this.getRefreshTokenCredential(l, n);
        d && this.credentialMatchesFilter(d, s, n) && c.push(d);
      }
    });
    const h = c.length;
    return h < 1 ? (this.commonLogger.info("0dlw11", n), null) : (h > 1 && this.performanceClient.addFields({ multiMatchedRT: h }, n), this.commonLogger.info("0wcnep", n), c[0]);
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   */
  refreshTokenKeyMatchesFilter(e, t) {
    const n = e.toLowerCase();
    return !(t.familyId && n.indexOf(t.familyId.toLowerCase()) === -1 || !t.familyId && t.clientId && n.indexOf(t.clientId.toLowerCase()) === -1 || t.homeAccountId && n.indexOf(t.homeAccountId.toLowerCase()) === -1);
  }
  /**
   * Retrieve AppMetadataEntity from cache
   */
  readAppMetadataFromCache(e, t) {
    const n = {
      environment: e,
      clientId: this.clientId
    }, r = this.getAppMetadataFilteredBy(n, t), o = Object.keys(r).map((a) => r[a]), s = o.length;
    if (s < 1)
      return null;
    if (s > 1)
      throw p(ja);
    return o[0];
  }
  /**
   * Return the family_id value associated  with FOCI
   * @param environment
   * @param clientId
   */
  isAppMetadataFOCI(e, t) {
    const n = this.readAppMetadataFromCache(e, t);
    return !!(n && n.familyId === Bt);
  }
  /**
   * helper to match account ids
   * @param value
   * @param homeAccountId
   */
  matchHomeAccountId(e, t) {
    return typeof e.homeAccountId == "string" && t === e.homeAccountId;
  }
  /**
   * helper to match account ids
   * @param entity
   * @param localAccountId
   * @returns
   */
  matchLocalAccountIdFromTokenClaims(e, t) {
    const n = e.oid || e.sub;
    return t === n;
  }
  matchLocalAccountIdFromTenantProfile(e, t) {
    return e.localAccountId === t;
  }
  /**
   * helper to match names
   * @param entity
   * @param name
   * @returns true if the downcased name properties are present and match in the filter and the entity
   */
  matchName(e, t) {
    var n;
    return t.toLowerCase() === ((n = e.name) == null ? void 0 : n.toLowerCase());
  }
  /**
   * helper to match usernames
   * @param entity
   * @param username
   * @returns
   */
  matchUsername(e, t) {
    return !!(e && typeof e == "string" && (t == null ? void 0 : t.toLowerCase()) === e.toLowerCase());
  }
  /**
   * helper to match assertion
   * @param value
   * @param oboAssertion
   */
  matchUserAssertionHash(e, t) {
    return !!(e.userAssertionHash && t === e.userAssertionHash);
  }
  /**
   * helper to match environment
   * @param value
   * @param environment
   */
  matchEnvironment(e, t, n) {
    if (this.staticAuthorityOptions) {
      const o = $h(this.staticAuthorityOptions, this.commonLogger, n);
      if (o.includes(t) && o.includes(e.environment))
        return !0;
    }
    const r = this.getAuthorityMetadataByAlias(t, n);
    return !!(r && r.aliases.indexOf(e.environment) > -1);
  }
  /**
   * helper to match credential type
   * @param entity
   * @param credentialType
   */
  matchCredentialType(e, t) {
    return e.credentialType && t.toLowerCase() === e.credentialType.toLowerCase();
  }
  /**
   * helper to match client ids
   * @param entity
   * @param clientId
   */
  matchClientId(e, t) {
    return !!(e.clientId && t === e.clientId);
  }
  /**
   * helper to match family ids
   * @param entity
   * @param familyId
   */
  matchFamilyId(e, t) {
    return !!(e.familyId && t === e.familyId);
  }
  /**
   * helper to match realm
   * @param entity
   * @param realm
   */
  matchRealm(e, t) {
    var n;
    return ((n = e.realm) == null ? void 0 : n.toLowerCase()) === t.toLowerCase();
  }
  /**
   * helper to match nativeAccountId
   * @param entity
   * @param nativeAccountId
   * @returns boolean indicating the match result
   */
  matchNativeAccountId(e, t) {
    return !!(e.nativeAccountId && t === e.nativeAccountId);
  }
  /**
   * helper to match loginHint which can be either:
   * 1. login_hint ID token claim
   * 2. username in cached account object
   * 3. upn in ID token claims
   * @param entity
   * @param loginHint
   * @returns
   */
  matchLoginHintFromTokenClaims(e, t) {
    return e.login_hint === t || e.preferred_username === t || e.upn === t;
  }
  /**
   * Helper to match sid
   * @param entity
   * @param sid
   * @returns true if the sid claim is present and matches the filter
   */
  matchSid(e, t) {
    return e.sid === t;
  }
  matchAuthorityType(e, t) {
    return !!(e.authorityType && t.toLowerCase() === e.authorityType.toLowerCase());
  }
  /**
   * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
   * @param entity
   * @param target
   */
  matchTarget(e, t) {
    return e.credentialType !== H.ACCESS_TOKEN && e.credentialType !== H.ACCESS_TOKEN_WITH_AUTH_SCHEME || !e.target ? !1 : x.fromString(e.target).containsScopeSet(t);
  }
  /**
   * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
   * @param entity
   * @param tokenType
   */
  matchTokenType(e, t) {
    return !!(e.tokenType && e.tokenType === t);
  }
  /**
   * Returns true if the credential's keyId matches the one in the request, false otherwise
   * @param entity
   * @param keyId
   */
  matchKeyId(e, t) {
    return !!(e.keyId && e.keyId === t);
  }
  /**
   * returns if a given cache entity is of the type appmetadata
   * @param key
   */
  isAppMetadata(e) {
    return e.indexOf(er) !== -1;
  }
  /**
   * returns if a given cache entity is of the type authoritymetadata
   * @param key
   */
  isAuthorityMetadata(e) {
    return e.indexOf(Hn) !== -1;
  }
  /**
   * returns cache key used for cloud instance metadata
   */
  generateAuthorityMetadataCacheKey(e) {
    return `${Hn}-${this.clientId}-${e}`;
  }
  /**
   * Helper to convert serialized data to object
   * @param obj
   * @param json
   */
  static toObject(e, t) {
    for (const n in t)
      e[n] = t[n];
    return e;
  }
}
class Xh extends Vn {
  async setAccount() {
    throw p(T);
  }
  getAccount() {
    throw p(T);
  }
  async setIdTokenCredential() {
    throw p(T);
  }
  getIdTokenCredential() {
    throw p(T);
  }
  async setAccessTokenCredential() {
    throw p(T);
  }
  getAccessTokenCredential() {
    throw p(T);
  }
  async setRefreshTokenCredential() {
    throw p(T);
  }
  getRefreshTokenCredential() {
    throw p(T);
  }
  setAppMetadata() {
    throw p(T);
  }
  getAppMetadata() {
    throw p(T);
  }
  setServerTelemetry() {
    throw p(T);
  }
  getServerTelemetry() {
    throw p(T);
  }
  setAuthorityMetadata() {
    throw p(T);
  }
  getAuthorityMetadata() {
    throw p(T);
  }
  getAuthorityMetadataKeys() {
    throw p(T);
  }
  setThrottlingCache() {
    throw p(T);
  }
  getThrottlingCache() {
    throw p(T);
  }
  removeItem() {
    throw p(T);
  }
  getKeys() {
    throw p(T);
  }
  getAccountKeys() {
    throw p(T);
  }
  getTokenKeys() {
    throw p(T);
  }
  generateCredentialKey() {
    throw p(T);
  }
  generateAccountKey() {
    throw p(T);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const $n = {
  InProgress: 1,
  Completed: 2
}, qh = /* @__PURE__ */ new Set([
  "accessTokenSize",
  "durationMs",
  "idTokenSize",
  "matsSilentStatus",
  "matsHttpStatus",
  "refreshTokenSize",
  "startTimeMs",
  "status",
  "multiMatchedAT",
  "multiMatchedID",
  "multiMatchedRT",
  "unencryptedCacheCount",
  "encryptedCacheExpiredCount",
  "oldAccountCount",
  "oldAccessCount",
  "oldIdCount",
  "oldRefreshCount",
  "currAccountCount",
  "currAccessCount",
  "currIdCount",
  "currRefreshCount",
  "expiredCacheRemovedCount",
  "upgradedCacheCount"
]);
/*! @azure/msal-common v16.0.2 2026-01-17 */
class St {
  generateId() {
    return "callback-id";
  }
  startMeasurement(e, t) {
    return {
      end: () => null,
      discard: () => {
      },
      add: () => {
      },
      increment: () => {
      },
      event: {
        eventId: this.generateId(),
        status: $n.InProgress,
        authority: "",
        libraryName: "",
        libraryVersion: "",
        clientId: "",
        name: e,
        startTimeMs: Date.now(),
        correlationId: t || ""
      }
    };
  }
  endMeasurement() {
    return null;
  }
  discardMeasurements() {
  }
  removePerformanceCallback() {
    return !0;
  }
  addPerformanceCallback() {
    return "";
  }
  emitEvents() {
  }
  addFields() {
  }
  incrementFields() {
  }
  cacheEventByCorrelationId() {
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Qo = {
  tokenRenewalOffsetSeconds: To,
  preventCorsPreflight: !1
}, Zh = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: !1,
  logLevel: _.Info,
  correlationId: ""
}, el = {
  async sendGetRequestAsync() {
    throw p(T);
  },
  async sendPostRequestAsync() {
    throw p(T);
  }
}, tl = {
  sku: Ga,
  version: kt,
  cpu: "",
  os: ""
}, nl = {
  clientSecret: "",
  clientAssertion: void 0
}, rl = {
  azureCloudInstance: mr.None,
  tenant: `${Ao}`
}, il = {
  application: {
    appName: "",
    appVersion: ""
  }
};
function Ar({ authOptions: i, systemOptions: e, loggerOptions: t, storageInterface: n, networkInterface: r, cryptoInterface: o, clientCredentials: s, libraryInfo: a, telemetry: c, serverTelemetryManager: h, persistencePlugin: l, serializableCache: d }) {
  const g = {
    ...Zh,
    ...t
  };
  return {
    authOptions: ol(i),
    systemOptions: { ...Qo, ...e },
    loggerOptions: g,
    storageInterface: n || new Xh(i.clientId, pt, new Q(g), new St()),
    networkInterface: r || el,
    cryptoInterface: o || pt,
    clientCredentials: s || nl,
    libraryInfo: { ...tl, ...a },
    telemetry: { ...il, ...c },
    serverTelemetryManager: h || null,
    persistencePlugin: l || null,
    serializableCache: d || null
  };
}
function ol(i) {
  return {
    clientCapabilities: [],
    azureCloudOptions: rl,
    instanceAware: !1,
    ...i
  };
}
function Yo(i) {
  return i.authOptions.authority.options.protocolMode === J.OIDC;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Ee extends v {
  constructor(e, t, n, r, o) {
    super(e, t, n), this.name = "ServerError", this.errorNo = r, this.status = o, Object.setPrototypeOf(this, Ee.prototype);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Wt = "no_tokens_found", Xo = "native_account_unavailable", Er = "refresh_token_expired", kr = "ux_not_allowed", qo = "interaction_required", Zo = "consent_required", es = "login_required", ln = "bad_token", fg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badToken: ln,
  consentRequired: Zo,
  interactionRequired: qo,
  loginRequired: es,
  nativeAccountUnavailable: Xo,
  noTokensFound: Wt,
  refreshTokenExpired: Er,
  uxNotAllowed: kr
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Li = [
  qo,
  Zo,
  es,
  ln,
  kr
], sl = [
  "message_only",
  "additional_action",
  "basic_action",
  "user_password_expired",
  "consent_required",
  "bad_token",
  "ux_not_allowed"
];
class Z extends v {
  constructor(e, t, n, r, o, s, a, c) {
    super(e, t, n), Object.setPrototypeOf(this, Z.prototype), this.timestamp = r || "", this.traceId = o || "", this.correlationId = s || "", this.claims = a || "", this.name = "InteractionRequiredAuthError", this.errorNo = c;
  }
}
function ts(i, e, t) {
  const n = !!i && Li.indexOf(i) > -1, r = !!t && sl.indexOf(t) > -1, o = !!e && Li.some((s) => e.indexOf(s) > -1);
  return n || o || r;
}
function Qt(i, e) {
  return new Z(i, e);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function $() {
  return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function Hi(i) {
  return i.getTime() / 1e3;
}
function Te(i) {
  return i ? new Date(Number(i) * 1e3) : /* @__PURE__ */ new Date();
}
function mt(i, e) {
  const t = Number(i) || 0;
  return $() + e > t;
}
function Ki(i, e) {
  const t = Number(i) + e * 24 * 60 * 60 * 1e3;
  return Date.now() > t;
}
function ns(i) {
  return Number(i) > $();
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const al = "networkClientSendPostRequestAsync", cl = "refreshTokenClientExecutePostToTokenEndpoint", hl = "authorizationCodeClientExecutePostToTokenEndpoint", ll = "refreshTokenClientExecuteTokenRequest", dl = "refreshTokenClientAcquireToken", On = "refreshTokenClientAcquireTokenWithCachedRefreshToken", ul = "refreshTokenClientCreateTokenRequestBody", gl = "silentFlowClientGenerateResultFromCacheRecord", vr = "getAuthCodeUrl", rs = "handleCodeResponseFromServer", fl = "authClientExecuteTokenRequest", pl = "authClientCreateTokenRequestBody", ml = "updateTokenEndpointAuthority", bt = "popTokenGenerateCnf", Sr = "handleServerTokenResponse", yl = "authorityResolveEndpointsAsync", Cl = "authorityGetCloudDiscoveryMetadataFromNetwork", wl = "authorityUpdateCloudDiscoveryMetadata", Il = "authorityGetEndpointMetadataFromNetwork", Tl = "authorityUpdateEndpointMetadata", Fi = "authorityUpdateMetadataWithRegionalInformation", Al = "regionDiscoveryDetectRegion", Bi = "regionDiscoveryGetRegionFromIMDS", El = "regionDiscoveryGetCurrentVersion", kl = "cacheManagerGetRefreshToken", vl = "setUserData";
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ie = (i, e, t, n, r) => (...o) => {
  t.trace("1plfzx", r);
  const s = n.startMeasurement(e, r);
  if (r) {
    const a = e + "CallCount";
    n.incrementFields({ [a]: 1 }, r);
  }
  try {
    const a = i(...o);
    return s.end({
      success: !0
    }), t.trace("1g8n6a", r), a;
  } catch (a) {
    t.trace("0cfd8i", r);
    try {
      t.trace(JSON.stringify(a), r);
    } catch {
      t.trace("00dty7", r);
    }
    throw s.end({
      success: !1
    }, a), a;
  }
}, u = (i, e, t, n, r) => (...o) => {
  t.trace("1plfzx", r);
  const s = n.startMeasurement(e, r);
  if (r) {
    const a = e + "CallCount";
    n.incrementFields({ [a]: 1 }, r);
  }
  return i(...o).then((a) => (t.trace("1g8n6a", r), s.end({
    success: !0
  }), a)).catch((a) => {
    t.trace("0cfd8i", r);
    try {
      t.trace(JSON.stringify(a), r);
    } catch {
      t.trace("00dty7", r);
    }
    throw s.end({
      success: !1
    }, a), a;
  });
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Sl = {
  SW: "sw"
};
class Be {
  constructor(e, t) {
    this.cryptoUtils = e, this.performanceClient = t;
  }
  /**
   * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
   * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
   * @param request
   * @returns
   */
  async generateCnf(e, t) {
    const n = await u(this.generateKid.bind(this), bt, t, this.performanceClient, e.correlationId)(e), r = this.cryptoUtils.base64UrlEncode(JSON.stringify(n));
    return {
      kid: n.kid,
      reqCnfString: r
    };
  }
  /**
   * Generates key_id for a SHR token request
   * @param request
   * @returns
   */
  async generateKid(e) {
    return {
      kid: await this.cryptoUtils.getPublicKeyThumbprint(e),
      xms_ksl: Sl.SW
    };
  }
  /**
   * Signs the POP access_token with the local generated key-pair
   * @param accessToken
   * @param request
   * @returns
   */
  async signPopToken(e, t, n) {
    return this.signPayload(e, t, n);
  }
  /**
   * Utility function to generate the signed JWT for an access_token
   * @param payload
   * @param kid
   * @param request
   * @param claims
   * @returns
   */
  async signPayload(e, t, n, r) {
    const { resourceRequestMethod: o, resourceRequestUri: s, shrClaims: a, shrNonce: c, shrOptions: h } = n, l = s ? new b(s) : void 0, d = l == null ? void 0 : l.getUrlComponents();
    return this.cryptoUtils.signJwt({
      at: e,
      ts: $(),
      m: o == null ? void 0 : o.toUpperCase(),
      u: d == null ? void 0 : d.HostNameAndPort,
      nonce: c || this.cryptoUtils.createNewGuid(),
      p: d == null ? void 0 : d.AbsolutePath,
      q: d != null && d.QueryString ? [[], d.QueryString] : void 0,
      client_claims: a || void 0,
      ...r
    }, t, h, n.correlationId);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class bl {
  constructor(e, t) {
    this.cache = e, this.hasChanged = t;
  }
  /**
   * boolean which indicates the changes in cache
   */
  get cacheHasChanged() {
    return this.hasChanged;
  }
  /**
   * function to retrieve the token cache
   */
  get tokenCache() {
    return this.cache;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function dn(i, e, t, n, r) {
  return {
    credentialType: H.ID_TOKEN,
    homeAccountId: i,
    environment: e,
    clientId: n,
    secret: t,
    realm: r,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
}
function un(i, e, t, n, r, o, s, a, c, h, l, d, g) {
  var w, I;
  const f = {
    homeAccountId: i,
    credentialType: H.ACCESS_TOKEN,
    secret: t,
    cachedAt: $().toString(),
    expiresOn: s.toString(),
    extendedExpiresOn: a.toString(),
    environment: e,
    clientId: n,
    realm: r,
    target: o,
    tokenType: l || E.BEARER,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
  if (d && (f.userAssertionHash = d), h && (f.refreshOn = h.toString()), ((w = f.tokenType) == null ? void 0 : w.toLowerCase()) !== E.BEARER.toLowerCase())
    switch (f.credentialType = H.ACCESS_TOKEN_WITH_AUTH_SCHEME, f.tokenType) {
      case E.POP:
        const A = re(t, c);
        if (!((I = A == null ? void 0 : A.cnf) != null && I.kid))
          throw p(Va);
        f.keyId = A.cnf.kid;
        break;
      case E.SSH:
        f.keyId = g;
    }
  return f;
}
function is(i, e, t, n, r, o, s) {
  const a = {
    credentialType: H.REFRESH_TOKEN,
    homeAccountId: i,
    environment: e,
    clientId: n,
    secret: t,
    lastUpdatedAt: Date.now().toString()
  };
  return o && (a.userAssertionHash = o), r && (a.familyId = r), s && (a.expiresOn = s.toString()), a;
}
function gn(i) {
  return i.hasOwnProperty("homeAccountId") && i.hasOwnProperty("environment") && i.hasOwnProperty("credentialType") && i.hasOwnProperty("clientId") && i.hasOwnProperty("secret");
}
function zi(i) {
  return i ? gn(i) && i.hasOwnProperty("realm") && i.hasOwnProperty("target") && (i.credentialType === H.ACCESS_TOKEN || i.credentialType === H.ACCESS_TOKEN_WITH_AUTH_SCHEME) : !1;
}
function _l(i) {
  return i ? gn(i) && i.hasOwnProperty("realm") && i.credentialType === H.ID_TOKEN : !1;
}
function ji(i) {
  return i ? gn(i) && i.credentialType === H.REFRESH_TOKEN : !1;
}
function Rl(i, e) {
  const t = i.indexOf(ko) === 0;
  let n = !0;
  return e && (n = e.hasOwnProperty("failedRequests") && e.hasOwnProperty("errors") && e.hasOwnProperty("cacheHits")), t && n;
}
function Ol(i, e) {
  let t = !1;
  i && (t = i.indexOf(vo) === 0);
  let n = !0;
  return e && (n = e.hasOwnProperty("throttleTime")), t && n;
}
function Pl({ environment: i, clientId: e }) {
  return [
    er,
    i,
    e
  ].join(Eo).toLowerCase();
}
function Nl(i, e) {
  return e ? i.indexOf(er) === 0 && e.hasOwnProperty("clientId") && e.hasOwnProperty("environment") : !1;
}
function Ml(i, e) {
  return e ? i.indexOf(Hn) === 0 && e.hasOwnProperty("aliases") && e.hasOwnProperty("preferred_cache") && e.hasOwnProperty("preferred_network") && e.hasOwnProperty("canonical_authority") && e.hasOwnProperty("authorization_endpoint") && e.hasOwnProperty("token_endpoint") && e.hasOwnProperty("issuer") && e.hasOwnProperty("aliasesFromNetwork") && e.hasOwnProperty("endpointsFromNetwork") && e.hasOwnProperty("expiresAt") && e.hasOwnProperty("jwks_uri") : !1;
}
function Gi() {
  return $() + $a;
}
function Nt(i, e, t) {
  i.authorization_endpoint = e.authorization_endpoint, i.token_endpoint = e.token_endpoint, i.end_session_endpoint = e.end_session_endpoint, i.issuer = e.issuer, i.endpointsFromNetwork = t, i.jwks_uri = e.jwks_uri;
}
function Pn(i, e, t) {
  i.aliases = e.aliases, i.preferred_cache = e.preferred_cache, i.preferred_network = e.preferred_network, i.aliasesFromNetwork = t;
}
function Vi(i) {
  return i.expiresAt <= $();
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class ze {
  constructor(e, t, n, r, o, s, a) {
    this.clientId = e, this.cacheStorage = t, this.cryptoObj = n, this.logger = r, this.performanceClient = o, this.serializableCache = s, this.persistencePlugin = a;
  }
  /**
   * Function which validates server authorization token response.
   * @param serverResponse
   * @param correlationId
   * @param refreshAccessToken
   */
  validateTokenResponse(e, t, n) {
    var r;
    if (e.error || e.error_description || e.suberror) {
      const o = `Error(s): ${e.error_codes || st} - Timestamp: ${e.timestamp || st} - Description: ${e.error_description || st} - Correlation ID: ${e.correlation_id || st} - Trace ID: ${e.trace_id || st}`, s = (r = e.error_codes) != null && r.length ? e.error_codes[0] : void 0, a = new Ee(e.error, o, e.suberror, s, e.status);
      if (n && e.status && e.status >= Ja && e.status <= Wa) {
        this.logger.warning("16ks7j", t);
        return;
      } else if (n && e.status && e.status >= Qa && e.status <= Ya) {
        this.logger.warning("0g61x3", t);
        return;
      }
      throw ts(e.error, e.error_description, e.suberror) ? new Z(e.error, e.error_description, e.suberror, e.timestamp || "", e.trace_id || "", e.correlation_id || "", e.claims || "", s) : a;
    }
  }
  /**
   * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
   * @param serverTokenResponse
   * @param authority
   */
  async handleServerTokenResponse(e, t, n, r, o, s, a, c, h) {
    let l;
    if (e.id_token) {
      if (l = re(e.id_token || "", this.cryptoObj.base64Decode), o && o.nonce && l.nonce !== o.nonce)
        throw p(Xa);
      if (r.maxAge || r.maxAge === 0) {
        const w = l.auth_time;
        if (!w)
          throw p(So);
        $o(w, r.maxAge);
      }
    }
    this.homeAccountIdentifier = Tr(e.client_info || "", t.authorityType, this.logger, this.cryptoObj, r.correlationId, l);
    let d;
    o && o.state && (d = Et(this.cryptoObj.base64Decode, o.state)), e.key_id = e.key_id || r.sshKid || void 0;
    const g = this.generateCacheRecord(e, t, n, r, l, s, o);
    let f;
    try {
      if (this.persistencePlugin && this.serializableCache && (this.logger.verbose("0jbz5k", r.correlationId), f = new bl(this.serializableCache, !0), await this.persistencePlugin.beforeCacheAccess(f)), a && !c && g.account) {
        const w = this.cacheStorage.generateAccountKey(me(g.account));
        if (!this.cacheStorage.getAccount(w, r.correlationId))
          return this.logger.warning("1gmt66", r.correlationId), await ze.generateAuthenticationResult(this.cryptoObj, t, g, !1, r, this.performanceClient, l, d, void 0, h);
      }
      await this.cacheStorage.saveCacheRecord(g, r.correlationId, de(l || {}), r.storeInCache);
    } finally {
      this.persistencePlugin && this.serializableCache && f && (this.logger.verbose("1bh17u", r.correlationId), await this.persistencePlugin.afterCacheAccess(f));
    }
    return ze.generateAuthenticationResult(this.cryptoObj, t, g, !1, r, this.performanceClient, l, d, e, h);
  }
  /**
   * Generates CacheRecord
   * @param serverTokenResponse
   * @param idTokenObj
   * @param authority
   */
  generateCacheRecord(e, t, n, r, o, s, a) {
    var I;
    const c = t.getPreferredCache();
    if (!c)
      throw p(Io);
    const h = wr(o);
    let l, d;
    e.id_token && o && (l = dn(this.homeAccountIdentifier, c, e.id_token, this.clientId, h || ""), d = br(
      this.cacheStorage,
      t,
      this.homeAccountIdentifier,
      this.cryptoObj.base64Decode,
      r.correlationId,
      o,
      e.client_info,
      c,
      h,
      a,
      void 0,
      // nativeAccountId
      this.logger
    ));
    let g = null;
    if (e.access_token) {
      const A = e.scope ? x.fromString(e.scope) : new x(r.scopes || []), P = (typeof e.expires_in == "string" ? parseInt(e.expires_in, 10) : e.expires_in) || 0, S = (typeof e.ext_expires_in == "string" ? parseInt(e.ext_expires_in, 10) : e.ext_expires_in) || 0, N = (typeof e.refresh_in == "string" ? parseInt(e.refresh_in, 10) : e.refresh_in) || void 0, ee = n + P, ke = ee + S, ve = N && N > 0 ? n + N : void 0;
      g = un(this.homeAccountIdentifier, c, e.access_token, this.clientId, h || t.tenant || "", A.printScopes(), ee, ke, this.cryptoObj.base64Decode, ve, e.token_type, s, e.key_id);
    }
    let f = null;
    if (e.refresh_token) {
      let A;
      if (e.refresh_token_expires_in) {
        const P = typeof e.refresh_token_expires_in == "string" ? parseInt(e.refresh_token_expires_in, 10) : e.refresh_token_expires_in;
        A = n + P, (I = this.performanceClient) == null || I.addFields({ ntwkRtExpiresOnSeconds: A }, r.correlationId);
      }
      f = is(this.homeAccountIdentifier, c, e.refresh_token, this.clientId, e.foci, s, A);
    }
    let w = null;
    return e.foci && (w = {
      clientId: this.clientId,
      environment: c,
      familyId: e.foci
    }), {
      account: d,
      idToken: l,
      accessToken: g,
      refreshToken: f,
      appMetadata: w
    };
  }
  /**
   * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
   *
   * Optionally takes a state string that is set as-is in the response.
   *
   * @param cacheRecord
   * @param idTokenObj
   * @param fromTokenCache
   * @param stateString
   */
  static async generateAuthenticationResult(e, t, n, r, o, s, a, c, h, l) {
    var ee, ke, ve, gi, fi;
    let d = "", g = [], f = null, w, I, A = "";
    if (n.accessToken) {
      if (n.accessToken.tokenType === E.POP && !o.popKid) {
        const Ra = new Be(e, s), { secret: Oa, keyId: pi } = n.accessToken;
        if (!pi)
          throw p(bo);
        d = await Ra.signPopToken(Oa, pi, o);
      } else
        d = n.accessToken.secret;
      g = x.fromString(n.accessToken.target).asArray(), f = Te(n.accessToken.expiresOn), w = Te(n.accessToken.extendedExpiresOn), n.accessToken.refreshOn && (I = Te(n.accessToken.refreshOn));
    }
    n.appMetadata && (A = n.appMetadata.familyId === Bt ? Bt : "");
    const P = (a == null ? void 0 : a.oid) || (a == null ? void 0 : a.sub) || "", S = (a == null ? void 0 : a.tid) || "";
    h != null && h.spa_accountid && n.account && (n.account.nativeAccountId = h == null ? void 0 : h.spa_accountid);
    const N = n.account ? yr(
      me(n.account),
      void 0,
      // tenantProfile optional
      a,
      (ee = n.idToken) == null ? void 0 : ee.secret
    ) : null;
    return {
      authority: t.canonicalAuthority,
      uniqueId: P,
      tenantId: S,
      scopes: g,
      account: N,
      idToken: ((ke = n == null ? void 0 : n.idToken) == null ? void 0 : ke.secret) || "",
      idTokenClaims: a || {},
      accessToken: d,
      fromCache: r,
      expiresOn: f,
      extExpiresOn: w,
      refreshOn: I,
      correlationId: o.correlationId,
      requestId: l || "",
      familyId: A,
      tokenType: ((ve = n.accessToken) == null ? void 0 : ve.tokenType) || "",
      state: c ? c.userRequestState : "",
      cloudGraphHostName: ((gi = n.account) == null ? void 0 : gi.cloudGraphHostName) || "",
      msGraphHost: ((fi = n.account) == null ? void 0 : fi.msGraphHost) || "",
      code: h == null ? void 0 : h.spa_code,
      fromPlatformBroker: !1
    };
  }
}
function br(i, e, t, n, r, o, s, a, c, h, l, d) {
  d == null || d.verbose("09jz0t", r);
  const f = i.getAccountKeys().find((S) => S.startsWith(t));
  let w = null;
  f && (w = i.getAccount(f, r));
  const I = w || Qh({
    homeAccountId: t,
    idTokenClaims: o,
    clientInfo: s,
    environment: a,
    cloudGraphHostName: h == null ? void 0 : h.cloud_graph_host_name,
    msGraphHost: h == null ? void 0 : h.msgraph_host,
    nativeAccountId: l
  }, e, n), A = I.tenantProfiles || [], P = c || I.realm;
  if (P && !A.find((S) => S.tenantId === P)) {
    const S = vt(t, I.localAccountId, P, o);
    A.push(S);
  }
  return I.tenantProfiles = A, I;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const le = {
  HOME_ACCOUNT_ID: "home_account_id",
  UPN: "UPN"
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
async function os(i, e, t) {
  return typeof i == "string" ? i : i({
    clientId: e,
    tokenEndpoint: t
  });
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function fn(i, e, t) {
  var n;
  return {
    clientId: i,
    authority: e.authority,
    scopes: e.scopes,
    homeAccountIdentifier: t,
    claims: e.claims,
    authenticationScheme: e.authenticationScheme,
    resourceRequestMethod: e.resourceRequestMethod,
    resourceRequestUri: e.resourceRequestUri,
    shrClaims: e.shrClaims,
    sshKid: e.sshKid,
    embeddedClientId: e.embeddedClientId || ((n = e.extraParameters) == null ? void 0 : n.clientId)
  };
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class ue {
  /**
   * Prepares a RequestThumbprint to be stored as a key.
   * @param thumbprint
   */
  static generateThrottlingStorageKey(e) {
    return `${vo}.${JSON.stringify(e)}`;
  }
  /**
   * Performs necessary throttling checks before a network request.
   * @param cacheManager
   * @param thumbprint
   */
  static preProcess(e, t, n) {
    var s;
    const r = ue.generateThrottlingStorageKey(t), o = e.getThrottlingCache(r, n);
    if (o) {
      if (o.throttleTime < Date.now()) {
        e.removeItem(r, n);
        return;
      }
      throw new Ee(((s = o.errorCodes) == null ? void 0 : s.join(" ")) || "", o.errorMessage, o.subError);
    }
  }
  /**
   * Performs necessary throttling checks after a network request.
   * @param cacheManager
   * @param thumbprint
   * @param response
   */
  static postProcess(e, t, n, r) {
    if (ue.checkResponseStatus(n) || ue.checkResponseForRetryAfter(n)) {
      const o = {
        throttleTime: ue.calculateThrottleTime(parseInt(n.headers[K.RETRY_AFTER])),
        error: n.body.error,
        errorCodes: n.body.error_codes,
        errorMessage: n.body.error_description,
        subError: n.body.suberror
      };
      e.setThrottlingCache(ue.generateThrottlingStorageKey(t), o, r);
    }
  }
  /**
   * Checks a NetworkResponse object's status codes against 429 or 5xx
   * @param response
   */
  static checkResponseStatus(e) {
    return e.status === 429 || e.status >= 500 && e.status < 600;
  }
  /**
   * Checks a NetworkResponse object's RetryAfter header
   * @param response
   */
  static checkResponseForRetryAfter(e) {
    return e.headers ? e.headers.hasOwnProperty(K.RETRY_AFTER) && (e.status < 200 || e.status >= 300) : !1;
  }
  /**
   * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
   * @param throttleTime
   */
  static calculateThrottleTime(e) {
    const t = e <= 0 ? 0 : e, n = Date.now() / 1e3;
    return Math.floor(Math.min(n + (t || qa), n + Za) * 1e3);
  }
  static removeThrottle(e, t, n, r) {
    const o = fn(t, n, r), s = this.generateThrottlingStorageKey(o);
    e.removeItem(s, n.correlationId);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class pn extends v {
  constructor(e, t, n) {
    super(e.errorCode, e.errorMessage, e.subError), Object.setPrototypeOf(this, pn.prototype), this.name = "NetworkError", this.error = e, this.httpStatus = t, this.responseHeaders = n;
  }
}
function ht(i, e, t, n) {
  return i.errorMessage = `${i.errorMessage}, additionalErrorInfo: error.name:${n == null ? void 0 : n.name}, error.message:${n == null ? void 0 : n.message}`, new pn(i, e, t);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function ss(i, e, t) {
  const n = {};
  if (n[K.CONTENT_TYPE] = ec, !e && t)
    switch (t.type) {
      case le.HOME_ACCOUNT_ID:
        try {
          const r = Xe(t.credential);
          n[K.CCS_HEADER] = `Oid:${r.uid}@${r.utid}`;
        } catch {
          i.verbose("1qhtee", "");
        }
        break;
      case le.UPN:
        n[K.CCS_HEADER] = `UPN: ${t.credential}`;
        break;
    }
  return n;
}
function as(i, e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return i.embeddedClientId && cn(r, e, t), i.extraQueryParameters && pe(r, i.extraQueryParameters), hr(r, i.correlationId), an(r, i.correlationId, n), ft(r);
}
async function cs(i, e, t, n, r, o, s, a, c, h) {
  const l = await Ul(n, i, { body: e, headers: t }, r, o, s, a, c);
  return h && l.status < 500 && l.status !== 429 && h.clearTelemetryCache(), l;
}
async function Ul(i, e, t, n, r, o, s, a) {
  var h;
  ue.preProcess(r, i, n);
  let c;
  try {
    c = await u(o.sendPostRequestAsync.bind(o), al, s, a, n)(e, t);
    const l = c.headers || {};
    a == null || a.addFields({
      refreshTokenSize: ((h = c.body.refresh_token) == null ? void 0 : h.length) || 0,
      httpVerToken: l[K.X_MS_HTTP_VERSION] || "",
      requestId: l[K.X_MS_REQUEST_ID] || ""
    }, n);
  } catch (l) {
    if (l instanceof pn) {
      const d = l.responseHeaders;
      throw d && (a == null || a.addFields({
        httpVerToken: d[K.X_MS_HTTP_VERSION] || "",
        requestId: d[K.X_MS_REQUEST_ID] || "",
        contentTypeHeader: d[K.CONTENT_TYPE] || void 0,
        contentLengthHeader: d[K.CONTENT_LENGTH] || void 0,
        httpStatus: l.httpStatus
      }, n)), l.error;
    }
    throw l instanceof v ? l : p(tc);
  }
  return ue.postProcess(r, i, c, n), c;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function xl(i) {
  return i.hasOwnProperty("authorization_endpoint") && i.hasOwnProperty("token_endpoint") && i.hasOwnProperty("issuer") && i.hasOwnProperty("jwks_uri");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Dl(i) {
  return i.hasOwnProperty("tenant_discovery_endpoint") && i.hasOwnProperty("metadata");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Ll(i) {
  return i.hasOwnProperty("error") && i.hasOwnProperty("error_description");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class mn {
  constructor(e, t, n, r) {
    this.networkInterface = e, this.logger = t, this.performanceClient = n, this.correlationId = r;
  }
  /**
   * Detect the region from the application's environment.
   *
   * @returns Promise<string | null>
   */
  async detectRegion(e, t) {
    let n = e;
    if (n)
      t.region_source = Ve.ENVIRONMENT_VARIABLE;
    else {
      const r = mn.IMDS_OPTIONS;
      try {
        const o = await u(this.getRegionFromIMDS.bind(this), Bi, this.logger, this.performanceClient, this.correlationId)(nc, r);
        if (o.status === Ci && (n = o.body, t.region_source = Ve.IMDS), o.status === wi) {
          const s = await u(this.getCurrentVersion.bind(this), El, this.logger, this.performanceClient, this.correlationId)(r);
          if (!s)
            return t.region_source = Ve.FAILED_AUTO_DETECTION, null;
          const a = await u(this.getRegionFromIMDS.bind(this), Bi, this.logger, this.performanceClient, this.correlationId)(s, r);
          a.status === Ci && (n = a.body, t.region_source = Ve.IMDS);
        }
      } catch {
        return t.region_source = Ve.FAILED_AUTO_DETECTION, null;
      }
    }
    return n || (t.region_source = Ve.FAILED_AUTO_DETECTION), n || null;
  }
  /**
   * Make the call to the IMDS endpoint
   *
   * @param imdsEndpointUrl
   * @returns Promise<NetworkResponse<string>>
   */
  async getRegionFromIMDS(e, t) {
    return this.networkInterface.sendGetRequestAsync(`${Ii}?api-version=${e}&format=text`, t, rc);
  }
  /**
   * Get the most recent version of the IMDS endpoint available
   *
   * @returns Promise<string | null>
   */
  async getCurrentVersion(e) {
    try {
      const t = await this.networkInterface.sendGetRequestAsync(`${Ii}?format=json`, e);
      return t.status === wi && t.body && t.body["newest-versions"] && t.body["newest-versions"].length > 0 ? t.body["newest-versions"][0] : null;
    } catch {
      return null;
    }
  }
}
mn.IMDS_OPTIONS = {
  headers: {
    Metadata: "true"
  }
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
class z {
  constructor(e, t, n, r, o, s, a, c) {
    this.canonicalAuthority = e, this._canonicalAuthority.validateAsUri(), this.networkInterface = t, this.cacheManager = n, this.authorityOptions = r, this.regionDiscoveryMetadata = {
      region_used: void 0,
      region_source: void 0,
      region_outcome: void 0
    }, this.logger = o, this.performanceClient = a, this.correlationId = s, this.managedIdentity = c || !1, this.regionDiscovery = new mn(t, this.logger, this.performanceClient, this.correlationId);
  }
  /**
   * Get {@link AuthorityType}
   * @param authorityUri {@link IUri}
   * @private
   */
  getAuthorityType(e) {
    if (e.HostNameAndPort.endsWith(Ti))
      return he.Ciam;
    const t = e.PathSegments;
    if (t.length)
      switch (t[0].toLowerCase()) {
        case oc:
          return he.Adfs;
        case ic:
          return he.Dsts;
      }
    return he.Default;
  }
  // See above for AuthorityType
  get authorityType() {
    return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
  }
  /**
   * ProtocolMode enum representing the way endpoints are constructed.
   */
  get protocolMode() {
    return this.authorityOptions.protocolMode;
  }
  /**
   * Returns authorityOptions which can be used to reinstantiate a new authority instance
   */
  get options() {
    return this.authorityOptions;
  }
  /**
   * A URL that is the authority set by the developer
   */
  get canonicalAuthority() {
    return this._canonicalAuthority.urlString;
  }
  /**
   * Sets canonical authority.
   */
  set canonicalAuthority(e) {
    this._canonicalAuthority = new b(e), this._canonicalAuthority.validateAsUri(), this._canonicalAuthorityUrlComponents = null;
  }
  /**
   * Get authority components.
   */
  get canonicalAuthorityUrlComponents() {
    return this._canonicalAuthorityUrlComponents || (this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents()), this._canonicalAuthorityUrlComponents;
  }
  /**
   * Get hostname and port i.e. login.microsoftonline.com
   */
  get hostnameAndPort() {
    return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
  }
  /**
   * Get tenant for authority.
   */
  get tenant() {
    return this.canonicalAuthorityUrlComponents.PathSegments[0];
  }
  /**
   * OAuth /authorize endpoint for requests
   */
  get authorizationEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.authorization_endpoint);
    throw p(be);
  }
  /**
   * OAuth /token endpoint for requests
   */
  get tokenEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint);
    throw p(be);
  }
  get deviceCodeEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
    throw p(be);
  }
  /**
   * OAuth logout endpoint for requests
   */
  get endSessionEndpoint() {
    if (this.discoveryComplete()) {
      if (!this.metadata.end_session_endpoint)
        throw p(fc);
      return this.replacePath(this.metadata.end_session_endpoint);
    } else
      throw p(be);
  }
  /**
   * OAuth issuer for requests
   */
  get selfSignedJwtAudience() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.issuer);
    throw p(be);
  }
  /**
   * Jwks_uri for token signing keys
   */
  get jwksUri() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.jwks_uri);
    throw p(be);
  }
  /**
   * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
   * @param authorityUri {@link IUri}
   * @private
   */
  canReplaceTenant(e) {
    return e.PathSegments.length === 1 && !z.reservedTenantDomains.has(e.PathSegments[0]) && this.getAuthorityType(e) === he.Default && this.protocolMode !== J.OIDC;
  }
  /**
   * Replaces tenant in url path with current tenant. Defaults to common.
   * @param urlString
   */
  replaceTenant(e) {
    return e.replace(/{tenant}|{tenantid}/g, this.tenant);
  }
  /**
   * Replaces path such as tenant or policy with the current tenant or policy.
   * @param urlString
   */
  replacePath(e) {
    let t = e;
    const r = new b(this.metadata.canonical_authority).getUrlComponents(), o = r.PathSegments;
    return this.canonicalAuthorityUrlComponents.PathSegments.forEach((a, c) => {
      let h = o[c];
      if (c === 0 && this.canReplaceTenant(r)) {
        const l = new b(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
        h !== l && (this.logger.verbose("1q3g2x", this.correlationId), h = l);
      }
      a !== h && (t = t.replace(`/${h}/`, `/${a}/`));
    }), this.replaceTenant(t);
  }
  /**
   * The default open id configuration endpoint for any canonical authority.
   */
  get defaultOpenIdConfigurationEndpoint() {
    const e = this.hostnameAndPort;
    return this.canonicalAuthority.endsWith("v2.0/") || this.authorityType === he.Adfs || this.protocolMode === J.OIDC && !this.isAliasOfKnownMicrosoftAuthority(e) ? `${this.canonicalAuthority}.well-known/openid-configuration` : `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
  }
  /**
   * Boolean that returns whether or not tenant discovery has been completed.
   */
  discoveryComplete() {
    return !!this.metadata;
  }
  /**
   * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
   * and the /authorize, /token and logout endpoints.
   */
  async resolveEndpointsAsync() {
    var r;
    const e = this.getCurrentMetadataEntity(), t = await u(this.updateCloudDiscoveryMetadata.bind(this), wl, this.logger, this.performanceClient, this.correlationId)(e);
    this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, e.preferred_network);
    const n = await u(this.updateEndpointMetadata.bind(this), Tl, this.logger, this.performanceClient, this.correlationId)(e);
    this.updateCachedMetadata(e, t, {
      source: n
    }), (r = this.performanceClient) == null || r.addFields({
      cloudDiscoverySource: t,
      authorityEndpointSource: n
    }, this.correlationId);
  }
  /**
   * Returns metadata entity from cache if it exists, otherwiser returns a new metadata entity built
   * from the configured canonical authority
   * @returns
   */
  getCurrentMetadataEntity() {
    let e = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort, this.correlationId);
    return e || (e = {
      aliases: [],
      preferred_cache: this.hostnameAndPort,
      preferred_network: this.hostnameAndPort,
      canonical_authority: this.canonicalAuthority,
      authorization_endpoint: "",
      token_endpoint: "",
      end_session_endpoint: "",
      issuer: "",
      aliasesFromNetwork: !1,
      endpointsFromNetwork: !1,
      expiresAt: Gi(),
      jwks_uri: ""
    }), e;
  }
  /**
   * Updates cached metadata based on metadata source and sets the instance's metadata
   * property to the same value
   * @param metadataEntity
   * @param cloudDiscoverySource
   * @param endpointMetadataResult
   */
  updateCachedMetadata(e, t, n) {
    t !== ae.CACHE && (n == null ? void 0 : n.source) !== ae.CACHE && (e.expiresAt = Gi(), e.canonical_authority = this.canonicalAuthority);
    const r = this.cacheManager.generateAuthorityMetadataCacheKey(e.preferred_cache, this.correlationId);
    this.cacheManager.setAuthorityMetadata(r, e, this.correlationId), this.metadata = e;
  }
  /**
   * Update AuthorityMetadataEntity with new endpoints and return where the information came from
   * @param metadataEntity
   */
  async updateEndpointMetadata(e) {
    var r, o;
    const t = this.updateEndpointMetadataFromLocalSources(e);
    if (t) {
      if (t.source === ae.HARDCODED_VALUES && (r = this.authorityOptions.azureRegionConfiguration) != null && r.azureRegion && t.metadata) {
        const s = await u(this.updateMetadataWithRegionalInformation.bind(this), Fi, this.logger, this.performanceClient, this.correlationId)(t.metadata);
        Nt(e, s, !1), e.canonical_authority = this.canonicalAuthority;
      }
      return t.source;
    }
    let n = await u(this.getEndpointMetadataFromNetwork.bind(this), Il, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return (o = this.authorityOptions.azureRegionConfiguration) != null && o.azureRegion && (n = await u(this.updateMetadataWithRegionalInformation.bind(this), Fi, this.logger, this.performanceClient, this.correlationId)(n)), Nt(e, n, !0), ae.NETWORK;
    throw p(sc, this.defaultOpenIdConfigurationEndpoint);
  }
  /**
   * Updates endpoint metadata from local sources and returns where the information was retrieved from and the metadata config
   * response if the source is hardcoded metadata
   * @param metadataEntity
   * @returns
   */
  updateEndpointMetadataFromLocalSources(e) {
    this.logger.verbose("1fi0kc", this.correlationId);
    const t = this.getEndpointMetadataFromConfig();
    if (t)
      return this.logger.verbose("06t0uj", this.correlationId), Nt(e, t, !1), {
        source: ae.CONFIG
      };
    this.logger.verbose("151k0p", this.correlationId);
    const n = this.getEndpointMetadataFromHardcodedValues();
    if (n)
      return Nt(e, n, !1), {
        source: ae.HARDCODED_VALUES,
        metadata: n
      };
    this.logger.verbose("1imop5", this.correlationId);
    const r = Vi(e);
    return this.isAuthoritySameType(e) && e.endpointsFromNetwork && !r ? (this.logger.verbose("16uq31", ""), { source: ae.CACHE }) : (r && this.logger.verbose("0uoibc", ""), null);
  }
  /**
   * Compares the number of url components after the domain to determine if the cached
   * authority metadata can be used for the requested authority. Protects against same domain different
   * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
   * @param metadataEntity
   */
  isAuthoritySameType(e) {
    return new b(e.canonical_authority).getUrlComponents().PathSegments.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
  }
  /**
   * Parse authorityMetadata config option
   */
  getEndpointMetadataFromConfig() {
    if (this.authorityOptions.authorityMetadata)
      try {
        return JSON.parse(this.authorityOptions.authorityMetadata);
      } catch {
        throw R(ac);
      }
    return null;
  }
  /**
   * Gets OAuth endpoints from the given OpenID configuration endpoint.
   *
   * @param hasHardcodedMetadata boolean
   */
  async getEndpointMetadataFromNetwork() {
    const e = {}, t = this.defaultOpenIdConfigurationEndpoint;
    this.logger.verbose("1y65x6", this.correlationId);
    try {
      const n = await this.networkInterface.sendGetRequestAsync(t, e);
      return xl(n.body) ? n.body : (this.logger.verbose("1koyv8", this.correlationId), null);
    } catch {
      return this.logger.verbose("0a9wik", this.correlationId), null;
    }
  }
  /**
   * Get OAuth endpoints for common authorities.
   */
  getEndpointMetadataFromHardcodedValues() {
    return this.hostnameAndPort in xi ? xi[this.hostnameAndPort] : null;
  }
  /**
   * Update the retrieved metadata with regional information.
   * User selected Azure region will be used if configured.
   */
  async updateMetadataWithRegionalInformation(e) {
    var n, r;
    const t = (n = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : n.azureRegion;
    if (t) {
      if (t !== cc)
        return this.regionDiscoveryMetadata.region_outcome = Rn.CONFIGURED_NO_AUTO_DETECTION, this.regionDiscoveryMetadata.region_used = t, z.replaceWithRegionalInformation(e, t);
      const o = await u(this.regionDiscovery.detectRegion.bind(this.regionDiscovery), Al, this.logger, this.performanceClient, this.correlationId)((r = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : r.environmentRegion, this.regionDiscoveryMetadata);
      if (o)
        return this.regionDiscoveryMetadata.region_outcome = Rn.AUTO_DETECTION_REQUESTED_SUCCESSFUL, this.regionDiscoveryMetadata.region_used = o, z.replaceWithRegionalInformation(e, o);
      this.regionDiscoveryMetadata.region_outcome = Rn.AUTO_DETECTION_REQUESTED_FAILED;
    }
    return e;
  }
  /**
   * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
   * and returns where the information was retrieved from
   * @param metadataEntity
   * @returns AuthorityMetadataSource
   */
  async updateCloudDiscoveryMetadata(e) {
    const t = this.updateCloudDiscoveryMetadataFromLocalSources(e);
    if (t)
      return t;
    const n = await u(this.getCloudDiscoveryMetadataFromNetwork.bind(this), Cl, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return Pn(e, n, !0), ae.NETWORK;
    throw R(hc);
  }
  updateCloudDiscoveryMetadataFromLocalSources(e) {
    this.logger.verbose("0jhlgt", this.correlationId), this.logger.verbosePii("1fy7uz", this.correlationId), this.logger.verbosePii("08zabj", this.correlationId), this.logger.verbosePii("1o1kv3", this.correlationId);
    const t = this.getCloudDiscoveryMetadataFromConfig();
    if (t)
      return this.logger.verbose("1nakio", this.correlationId), Pn(e, t, !1), ae.CONFIG;
    this.logger.verbose("1x74aj", this.correlationId);
    const n = Jh(this.hostnameAndPort);
    if (n)
      return this.logger.verbose("0by47c", this.correlationId), Pn(e, n, !1), ae.HARDCODED_VALUES;
    this.logger.verbose("0r2fzy", this.correlationId);
    const r = Vi(e);
    return this.isAuthoritySameType(e) && e.aliasesFromNetwork && !r ? (this.logger.verbose("1uffgh", ""), ae.CACHE) : (r && this.logger.verbose("0uoibc", ""), null);
  }
  /**
   * Parse cloudDiscoveryMetadata config or check knownAuthorities
   */
  getCloudDiscoveryMetadataFromConfig() {
    if (this.authorityType === he.Ciam)
      return this.logger.verbose("04y84h", this.correlationId), z.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    if (this.authorityOptions.cloudDiscoveryMetadata) {
      this.logger.verbose("0gszr3", this.correlationId);
      try {
        this.logger.verbose("1iifkx", this.correlationId);
        const e = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata), t = $t(e.metadata, this.hostnameAndPort);
        if (this.logger.verbose("0q67e3", ""), t)
          return this.logger.verbose("0hzfao", this.correlationId), t;
        this.logger.verbose("1ajz3u", this.correlationId);
      } catch {
        throw this.logger.verbose("1wq5tu", this.correlationId), R(_o);
      }
    }
    return this.isInKnownAuthorities() ? (this.logger.verbose("0mt9al", this.correlationId), z.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort)) : null;
  }
  /**
   * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
   *
   * @param hasHardcodedMetadata boolean
   */
  async getCloudDiscoveryMetadataFromNetwork() {
    const e = `${lc}${this.canonicalAuthority}oauth2/v2.0/authorize`, t = {};
    let n = null;
    try {
      const r = await this.networkInterface.sendGetRequestAsync(e, t);
      let o, s;
      if (Dl(r.body))
        o = r.body, s = o.metadata, this.logger.verbosePii("1vglyt", this.correlationId);
      else if (Ll(r.body)) {
        if (this.logger.warning("062uto", this.correlationId), o = r.body, o.error === dc)
          return this.logger.error("1x90tm", this.correlationId), null;
        this.logger.warning("0wchdm", this.correlationId), this.logger.warning("1s5mpv", this.correlationId), this.logger.warning("1yhqpw", this.correlationId), s = [];
      } else
        return this.logger.error("0768g0", this.correlationId), null;
      this.logger.verbose("1lrobr", this.correlationId), n = $t(s, this.hostnameAndPort);
    } catch (r) {
      return r instanceof v ? this.logger.error("0vwhc7", this.correlationId) : this.logger.error("0s2z41", this.correlationId), null;
    }
    return n || (this.logger.warning("0jp28q", this.correlationId), this.logger.verbose("130sd8", this.correlationId), n = z.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort)), n;
  }
  /**
   * Helper function to determine if this host is included in the knownAuthorities config option
   */
  isInKnownAuthorities() {
    return this.authorityOptions.knownAuthorities.filter((t) => t && b.getDomainFromUrl(t).toLowerCase() === this.hostnameAndPort).length > 0;
  }
  /**
   * helper function to populate the authority based on azureCloudOptions
   * @param authorityString
   * @param azureCloudOptions
   */
  static generateAuthority(e, t) {
    let n;
    if (t && t.azureCloudInstance !== mr.None) {
      const r = t.tenant ? t.tenant : Ao;
      n = `${t.azureCloudInstance}/${r}/`;
    }
    return n || e;
  }
  /**
   * Creates cloud discovery metadata object from a given host
   * @param host
   */
  static createCloudDiscoveryMetadataFromHost(e) {
    return {
      preferred_network: e,
      preferred_cache: e,
      aliases: [e]
    };
  }
  /**
   * helper function to generate environment from authority object
   */
  getPreferredCache() {
    if (this.managedIdentity)
      return uc;
    if (this.discoveryComplete())
      return this.metadata.preferred_cache;
    throw p(be);
  }
  /**
   * Returns whether or not the provided host is an alias of this authority instance
   * @param host
   */
  isAlias(e) {
    return this.metadata.aliases.indexOf(e) > -1;
  }
  /**
   * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
   * @param host
   */
  isAliasOfKnownMicrosoftAuthority(e) {
    return Wo.has(e);
  }
  /**
   * Checks whether the provided host is that of a public cloud authority
   *
   * @param authority string
   * @returns bool
   */
  static isPublicCloudAuthority(e) {
    return gc.indexOf(e) >= 0;
  }
  /**
   * Rebuild the authority string with the region
   *
   * @param host string
   * @param region string
   */
  static buildRegionalAuthorityString(e, t, n) {
    const r = new b(e);
    r.validateAsUri();
    const o = r.getUrlComponents();
    let s = `${t}.${o.HostNameAndPort}`;
    this.isPublicCloudAuthority(o.HostNameAndPort) && (s = `${t}.${pc}`);
    const a = b.constructAuthorityUriFromObject({
      ...r.getUrlComponents(),
      HostNameAndPort: s
    }).urlString;
    return n ? `${a}?${n}` : a;
  }
  /**
   * Replace the endpoints in the metadata object with their regional equivalents.
   *
   * @param metadata OpenIdConfigResponse
   * @param azureRegion string
   */
  static replaceWithRegionalInformation(e, t) {
    const n = { ...e };
    return n.authorization_endpoint = z.buildRegionalAuthorityString(n.authorization_endpoint, t), n.token_endpoint = z.buildRegionalAuthorityString(n.token_endpoint, t), n.end_session_endpoint && (n.end_session_endpoint = z.buildRegionalAuthorityString(n.end_session_endpoint, t)), n;
  }
  /**
   * Transform CIAM_AUTHORIY as per the below rules:
   * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
   *
   * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
   * `ciamlogin.com` can also change in the future and we should accommodate the same
   *
   * @param authority
   */
  static transformCIAMAuthority(e) {
    let t = e;
    const r = new b(e).getUrlComponents();
    if (r.PathSegments.length === 0 && r.HostNameAndPort.endsWith(Ti)) {
      const o = r.HostNameAndPort.split(".")[0];
      t = `${t}${o}${mc}`;
    }
    return t;
  }
}
z.reservedTenantDomains = /* @__PURE__ */ new Set([
  "{tenant}",
  "{tenantid}",
  Qe.COMMON,
  Qe.CONSUMERS,
  Qe.ORGANIZATIONS
]);
function Hl(i) {
  var r;
  const n = (r = new b(i).getUrlComponents().PathSegments.slice(-1)[0]) == null ? void 0 : r.toLowerCase();
  switch (n) {
    case Qe.COMMON:
    case Qe.ORGANIZATIONS:
    case Qe.CONSUMERS:
      return;
    default:
      return n;
  }
}
function hs(i) {
  return i.endsWith(Ai) ? i : `${i}${Ai}`;
}
function _r(i) {
  const e = i.cloudDiscoveryMetadata;
  let t;
  if (e)
    try {
      t = JSON.parse(e);
    } catch {
      throw R(_o);
    }
  return {
    canonicalAuthority: i.authority ? hs(i.authority) : void 0,
    knownAuthorities: i.knownAuthorities,
    cloudDiscoveryMetadata: t
  };
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
async function ls(i, e, t, n, r, o, s) {
  const a = z.transformCIAMAuthority(hs(i)), c = new z(a, e, t, n, r, o, s);
  try {
    return await u(c.resolveEndpointsAsync.bind(c), yl, r, s, o)(), c;
  } catch {
    throw p(be);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class ds {
  constructor(e, t) {
    var n;
    this.includeRedirectUri = !0, this.config = Ar(e), this.logger = new Q(this.config.loggerOptions, hn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t, this.oidcDefaultScopes = (n = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : n.defaultScopes;
  }
  /**
   * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
   * authorization_code_grant
   * @param request
   */
  async acquireToken(e, t) {
    var a;
    if (!e.code)
      throw p(yc);
    t && t.cloud_instance_host_name && await u(this.updateTokenEndpointAuthority.bind(this), ml, this.logger, this.performanceClient, e.correlationId)(t.cloud_instance_host_name, e.correlationId);
    const n = $(), r = await u(this.executeTokenRequest.bind(this), fl, this.logger, this.performanceClient, e.correlationId)(this.authority, e, this.serverTelemetryManager), o = (a = r.headers) == null ? void 0 : a[K.X_MS_REQUEST_ID], s = new ze(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    return s.validateTokenResponse(r.body, e.correlationId), u(s.handleServerTokenResponse.bind(s), Sr, this.logger, this.performanceClient, e.correlationId)(r.body, this.authority, n, e, t, void 0, void 0, void 0, o);
  }
  /**
   * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param authorityUri
   */
  getLogoutUri(e) {
    if (!e)
      throw R(Cc);
    const t = this.createLogoutUrlQueryString(e);
    return b.appendQueryString(this.authority.endSessionEndpoint, t);
  }
  /**
   * Executes POST request to token endpoint
   * @param authority
   * @param request
   */
  async executeTokenRequest(e, t, n) {
    const r = as(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient), o = b.appendQueryString(e.tokenEndpoint, r), s = await u(this.createTokenRequestBody.bind(this), pl, this.logger, this.performanceClient, t.correlationId)(t);
    let a;
    if (t.clientInfo)
      try {
        const l = Jt(t.clientInfo, this.cryptoUtils.base64Decode);
        a = {
          credential: `${l.uid}${Ln}${l.utid}`,
          type: le.HOME_ACCOUNT_ID
        };
      } catch {
        this.logger.verbose("0wznt3", t.correlationId);
      }
    const c = ss(this.logger, this.config.systemOptions.preventCorsPreflight, a || t.ccsCredential), h = fn(this.config.authOptions.clientId, t);
    return u(cs, hl, this.logger, this.performanceClient, t.correlationId)(o, s, c, h, t.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, n);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request
   */
  async createTokenRequestBody(e) {
    var r;
    const t = /* @__PURE__ */ new Map();
    if (sr(t, e.embeddedClientId || ((r = e.extraParameters) == null ? void 0 : r[Fe]) || this.config.authOptions.clientId), this.includeRedirectUri)
      ar(t, e.redirectUri);
    else if (!e.redirectUri)
      throw R(wc);
    if (or(t, e.scopes, !0, this.oidcDefaultScopes), Ph(t, e.code), lr(t, this.config.libraryInfo), dr(t, this.config.telemetry.application), Go(t), this.serverTelemetryManager && !Yo(this.config) && jo(t, this.serverTelemetryManager), e.codeVerifier && Mh(t, e.codeVerifier), this.config.clientCredentials.clientSecret && Lo(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const o = this.config.clientCredentials.clientAssertion;
      Ho(t, await os(o.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Ko(t, o.assertionType);
    }
    if (Fo(t, Ro.AUTHORIZATION_CODE_GRANT), gr(t), e.authenticationScheme === E.POP) {
      const o = new Be(this.cryptoUtils, this.performanceClient);
      let s;
      e.popKid ? s = this.cryptoUtils.encodeKid(e.popKid) : s = (await u(o.generateCnf.bind(o), bt, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, pr(t, s);
    } else if (e.authenticationScheme === E.SSH)
      if (e.sshJwk)
        zo(t, e.sshJwk);
      else
        throw R(tr);
    (!fe.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && cr(t, e.claims, this.config.authOptions.clientCapabilities);
    let n;
    if (e.clientInfo)
      try {
        const o = Jt(e.clientInfo, this.cryptoUtils.base64Decode);
        n = {
          credential: `${o.uid}${Ln}${o.utid}`,
          type: le.HOME_ACCOUNT_ID
        };
      } catch {
        this.logger.verbose("0wznt3", e.correlationId);
      }
    else
      n = e.ccsCredential;
    if (this.config.systemOptions.preventCorsPreflight && n)
      switch (n.type) {
        case le.HOME_ACCOUNT_ID:
          try {
            const o = Xe(n.credential);
            lt(t, o);
          } catch {
            this.logger.verbose("1qhtee", e.correlationId);
          }
          break;
        case le.UPN:
          Gt(t, n.credential);
          break;
      }
    return e.embeddedClientId && cn(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.extraParameters && pe(t, e.extraParameters), e.enableSpaAuthorizationCode && (!e.extraParameters || !e.extraParameters[Oi]) && pe(t, {
      [Oi]: "1"
    }), an(t, e.correlationId, this.performanceClient), ft(t);
  }
  /**
   * This API validates the `EndSessionRequest` and creates a URL
   * @param request
   */
  createLogoutUrlQueryString(e) {
    const t = /* @__PURE__ */ new Map();
    return e.postLogoutRedirectUri && Sh(t, e.postLogoutRedirectUri), e.correlationId && hr(t, e.correlationId), e.idTokenHint && bh(t, e.idTokenHint), e.state && Do(t, e.state), e.logoutHint && Uh(t, e.logoutHint), e.extraQueryParameters && pe(t, e.extraQueryParameters), this.config.authOptions.instanceAware && Bo(t), ft(t);
  }
  /**
   * Updates the authority to the cloud instance provided in the authorization response
   * @param cloudInstanceHostName - cloud instance host name from authorization code payload
   * @param correlationId - request correlation id
   */
  async updateTokenEndpointAuthority(e, t) {
    const n = `https://${e}/${this.authority.tenant}/`, r = await ls(n, this.networkClient, this.cacheManager, this.authority.options, this.logger, t, this.performanceClient);
    this.authority = r;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Kl = 300;
class Fl {
  constructor(e, t) {
    this.config = Ar(e), this.logger = new Q(this.config.loggerOptions, hn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t;
  }
  async acquireToken(e) {
    var s;
    const t = $(), n = await u(this.executeTokenRequest.bind(this), ll, this.logger, this.performanceClient, e.correlationId)(e, this.authority), r = (s = n.headers) == null ? void 0 : s[K.X_MS_REQUEST_ID], o = new ze(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    return o.validateTokenResponse(n.body, e.correlationId), u(o.handleServerTokenResponse.bind(o), Sr, this.logger, this.performanceClient, e.correlationId)(n.body, this.authority, t, e, void 0, void 0, !0, e.forceCache, r);
  }
  /**
   * Gets cached refresh token and attaches to request, then calls acquireToken API
   * @param request
   */
  async acquireTokenByRefreshToken(e) {
    if (!e)
      throw R(Ic);
    if (!e.account)
      throw p(Oo);
    if (this.cacheManager.isAppMetadataFOCI(e.account.environment, e.correlationId))
      try {
        return await u(this.acquireTokenWithCachedRefreshToken.bind(this), On, this.logger, this.performanceClient, e.correlationId)(e, !0);
      } catch (n) {
        const r = n instanceof Z && n.errorCode === Wt, o = n instanceof Ee && n.errorCode === Tc && n.subError === Ac;
        if (r || o)
          return u(this.acquireTokenWithCachedRefreshToken.bind(this), On, this.logger, this.performanceClient, e.correlationId)(e, !1);
        throw n;
      }
    return u(this.acquireTokenWithCachedRefreshToken.bind(this), On, this.logger, this.performanceClient, e.correlationId)(e, !1);
  }
  /**
   * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
   * @param request
   */
  async acquireTokenWithCachedRefreshToken(e, t) {
    var o;
    const n = ie(this.cacheManager.getRefreshToken.bind(this.cacheManager), kl, this.logger, this.performanceClient, e.correlationId)(e.account, t, e.correlationId, void 0);
    if (!n)
      throw Qt(Wt);
    if (n.expiresOn) {
      const s = e.refreshTokenExpirationOffsetSeconds || Kl;
      if ((o = this.performanceClient) == null || o.addFields({
        cacheRtExpiresOnSeconds: Number(n.expiresOn),
        rtOffsetSeconds: s
      }, e.correlationId), mt(n.expiresOn, s))
        throw Qt(Er);
    }
    const r = {
      ...e,
      refreshToken: n.secret,
      authenticationScheme: e.authenticationScheme || E.BEARER,
      ccsCredential: {
        credential: e.account.homeAccountId,
        type: le.HOME_ACCOUNT_ID
      }
    };
    try {
      return await u(this.acquireToken.bind(this), dl, this.logger, this.performanceClient, e.correlationId)(r);
    } catch (s) {
      if (s instanceof Z && s.subError === ln) {
        this.logger.verbose("1pg3ap", e.correlationId);
        const a = this.cacheManager.generateCredentialKey(n);
        this.cacheManager.removeRefreshToken(a, e.correlationId);
      }
      throw s;
    }
  }
  /**
   * Constructs the network message and makes a NW call to the underlying secure token service
   * @param request
   * @param authority
   */
  async executeTokenRequest(e, t) {
    const n = as(e, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient), r = b.appendQueryString(t.tokenEndpoint, n), o = await u(this.createTokenRequestBody.bind(this), ul, this.logger, this.performanceClient, e.correlationId)(e), s = ss(this.logger, this.config.systemOptions.preventCorsPreflight, e.ccsCredential), a = fn(this.config.authOptions.clientId, e);
    return u(cs, cl, this.logger, this.performanceClient, e.correlationId)(r, o, s, a, e.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, this.serverTelemetryManager);
  }
  /**
   * Helper function to create the token request body
   * @param request
   */
  async createTokenRequestBody(e) {
    var n, r;
    const t = /* @__PURE__ */ new Map();
    if (sr(t, e.embeddedClientId || ((n = e.extraParameters) == null ? void 0 : n[Fe]) || this.config.authOptions.clientId), e.redirectUri && ar(t, e.redirectUri), or(t, e.scopes, !0, (r = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : r.defaultScopes), Fo(t, Ro.REFRESH_TOKEN_GRANT), gr(t), lr(t, this.config.libraryInfo), dr(t, this.config.telemetry.application), Go(t), this.serverTelemetryManager && !Yo(this.config) && jo(t, this.serverTelemetryManager), Nh(t, e.refreshToken), this.config.clientCredentials.clientSecret && Lo(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const o = this.config.clientCredentials.clientAssertion;
      Ho(t, await os(o.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Ko(t, o.assertionType);
    }
    if (e.authenticationScheme === E.POP) {
      const o = new Be(this.cryptoUtils, this.performanceClient);
      let s;
      e.popKid ? s = this.cryptoUtils.encodeKid(e.popKid) : s = (await u(o.generateCnf.bind(o), bt, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, pr(t, s);
    } else if (e.authenticationScheme === E.SSH)
      if (e.sshJwk)
        zo(t, e.sshJwk);
      else
        throw R(tr);
    if ((!fe.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && cr(t, e.claims, this.config.authOptions.clientCapabilities), this.config.systemOptions.preventCorsPreflight && e.ccsCredential)
      switch (e.ccsCredential.type) {
        case le.HOME_ACCOUNT_ID:
          try {
            const o = Xe(e.ccsCredential.credential);
            lt(t, o);
          } catch {
            this.logger.verbose("1qhtee", e.correlationId);
          }
          break;
        case le.UPN:
          Gt(t, e.ccsCredential.credential);
          break;
      }
    return e.embeddedClientId && cn(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.extraParameters && pe(t, {
      ...e.extraParameters
    }), an(t, e.correlationId, this.performanceClient), ft(t);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Bl {
  constructor(e, t) {
    this.config = Ar(e), this.logger = new Q(this.config.loggerOptions, hn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t;
  }
  /**
   * Retrieves token from cache or throws an error if it must be refreshed.
   * @param request
   */
  async acquireCachedToken(e) {
    let t = xe.NOT_APPLICABLE;
    if (e.forceRefresh || !fe.isEmptyObj(e.claims))
      throw this.setCacheOutcome(xe.FORCE_REFRESH_OR_CLAIMS, e.correlationId), p(Le);
    if (!e.account)
      throw p(Oo);
    const n = e.account.tenantId || Hl(e.authority), r = this.cacheManager.getTokenKeys(), o = this.cacheManager.getAccessToken(e.account, e, r, n);
    if (o) {
      if (ns(o.cachedAt) || mt(o.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds))
        throw this.setCacheOutcome(xe.CACHED_ACCESS_TOKEN_EXPIRED, e.correlationId), p(Le);
      o.refreshOn && mt(o.refreshOn, 0) && (t = xe.PROACTIVELY_REFRESHED);
    } else throw this.setCacheOutcome(xe.NO_CACHED_ACCESS_TOKEN, e.correlationId), p(Le);
    const s = e.authority || this.authority.getPreferredCache(), a = {
      account: this.cacheManager.getAccount(this.cacheManager.generateAccountKey(e.account), e.correlationId),
      accessToken: o,
      idToken: this.cacheManager.getIdToken(e.account, e.correlationId, r, n),
      refreshToken: null,
      appMetadata: this.cacheManager.readAppMetadataFromCache(s, e.correlationId)
    };
    return this.setCacheOutcome(t, e.correlationId), this.config.serverTelemetryManager && this.config.serverTelemetryManager.incrementCacheHits(), [
      await u(this.generateResultFromCacheRecord.bind(this), gl, this.logger, this.performanceClient, e.correlationId)(a, e),
      t
    ];
  }
  setCacheOutcome(e, t) {
    var n, r;
    (n = this.serverTelemetryManager) == null || n.setCacheOutcome(e), (r = this.performanceClient) == null || r.addFields({
      cacheOutcome: e
    }, t), e !== xe.NOT_APPLICABLE && this.logger.info("09ingz", t);
  }
  /**
   * Helper function to build response object from the CacheRecord
   * @param cacheRecord
   */
  async generateResultFromCacheRecord(e, t) {
    let n;
    if (e.idToken && (n = re(e.idToken.secret, this.config.cryptoInterface.base64Decode)), t.maxAge || t.maxAge === 0) {
      const r = n == null ? void 0 : n.auth_time;
      if (!r)
        throw p(So);
      $o(r, t.maxAge);
    }
    return ze.generateAuthenticationResult(this.cryptoUtils, this.authority, e, !0, t, this.performanceClient, n);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const zl = {
  sendGetRequestAsync: () => Promise.reject(p(T)),
  sendPostRequestAsync: () => Promise.reject(p(T))
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function jl(i, e, t, n) {
  var a, c;
  const r = e.correlationId, o = /* @__PURE__ */ new Map();
  sr(o, e.embeddedClientId || ((a = e.extraQueryParameters) == null ? void 0 : a[Fe]) || i.clientId);
  const s = [
    ...e.scopes || [],
    ...e.extraScopesToConsent || []
  ];
  if (or(o, s, !0, (c = i.authority.options.OIDCOptions) == null ? void 0 : c.defaultScopes), ar(o, e.redirectUri), hr(o, r), kh(o, e.responseMode), gr(o), e.prompt && (Rh(o, e.prompt), n == null || n.addFields({ prompt: e.prompt }, r)), e.domainHint && (_h(o, e.domainHint), n == null || n.addFields({ domainHintFromRequest: !0 }, r)), e.prompt !== V.SELECT_ACCOUNT)
    if (e.sid && e.prompt === V.NONE)
      t.verbose("1tvqyx", e.correlationId), Pi(o, e.sid), n == null || n.addFields({ sidFromRequest: !0 }, r);
    else if (e.account) {
      const h = $l(e.account);
      let l = Jl(e.account);
      if (l && e.domainHint && (t.warning("0wkg3v", e.correlationId), l = null), l) {
        t.verbose("1eyfsw", e.correlationId), Pt(o, l), n == null || n.addFields({ loginHintFromClaim: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          lt(o, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      } else if (h && e.prompt === V.NONE) {
        t.verbose("1rmd8s", e.correlationId), Pi(o, h), n == null || n.addFields({ sidFromClaim: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          lt(o, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      } else if (e.loginHint)
        t.verbose("0y3007", e.correlationId), Pt(o, e.loginHint), Gt(o, e.loginHint), n == null || n.addFields({ loginHintFromRequest: !0 }, r);
      else if (e.account.username) {
        t.verbose("02f507", e.correlationId), Pt(o, e.account.username), n == null || n.addFields({ loginHintFromUpn: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          lt(o, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      }
    } else e.loginHint && (t.verbose("0g01ey", e.correlationId), Pt(o, e.loginHint), Gt(o, e.loginHint), n == null || n.addFields({ loginHintFromRequest: !0 }, r));
  else
    t.verbose("169k9v", e.correlationId);
  return e.nonce && Oh(o, e.nonce), e.state && Do(o, e.state), (e.claims || i.clientCapabilities && i.clientCapabilities.length > 0) && cr(o, e.claims, i.clientCapabilities), e.embeddedClientId && cn(o, i.clientId, i.redirectUri), i.instanceAware && (!e.extraQueryParameters || !Object.keys(e.extraQueryParameters).includes(zn)) && Bo(o), o;
}
function Rr(i, e) {
  const t = ft(e);
  return b.appendQueryString(i.authorizationEndpoint, t);
}
function Gl(i, e) {
  if (us(i, e), !i.code)
    throw p(kc);
  return i;
}
function us(i, e) {
  if (!i.state || !e)
    throw i.state ? p(Ei, "Cached State") : p(Ei, "Server State");
  let t, n;
  try {
    t = decodeURIComponent(i.state);
  } catch {
    throw p(Kn, i.state);
  }
  try {
    n = decodeURIComponent(e);
  } catch {
    throw p(Kn, i.state);
  }
  if (t !== n)
    throw p(Ec);
  if (i.error || i.error_description || i.suberror) {
    const r = Vl(i);
    throw ts(i.error, i.error_description, i.suberror) ? new Z(i.error || "", i.error_description, i.suberror, i.timestamp || "", i.trace_id || "", i.correlation_id || "", i.claims || "", r) : new Ee(i.error || "", i.error_description, i.suberror, r);
  }
}
function Vl(i) {
  var n, r;
  const e = "code=", t = (n = i.error_uri) == null ? void 0 : n.lastIndexOf(e);
  return t && t >= 0 ? (r = i.error_uri) == null ? void 0 : r.substring(t + e.length) : void 0;
}
function $l(i) {
  var e;
  return ((e = i.idTokenClaims) == null ? void 0 : e.sid) || null;
}
function Jl(i) {
  var e;
  return i.loginHint || ((e = i.idTokenClaims) == null ? void 0 : e.login_hint) || null;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class pg {
  constructor(e) {
    this.headers = e;
  }
  /**
   * This method parses the SHR nonce value out of either the Authentication-Info or WWW-Authenticate authentication headers.
   * @returns
   */
  getShrNonce() {
    const e = this.headers[K.AuthenticationInfo];
    if (e) {
      const n = this.parseChallenges(e);
      if (n.nextnonce)
        return n.nextnonce;
      throw R(ki);
    }
    const t = this.headers[K.WWWAuthenticate];
    if (t) {
      const n = this.parseChallenges(t);
      if (n.nonce)
        return n.nonce;
      throw R(ki);
    }
    throw R(vc);
  }
  /**
   * Parses an HTTP header's challenge set into a key/value map.
   * @param header
   * @returns
   */
  parseChallenges(e) {
    const t = e.indexOf(" "), n = e.substr(t + 1).split(","), r = {};
    return n.forEach((o) => {
      const [s, a] = o.split("=");
      r[s] = unescape(a.replace(/['"]+/g, ""));
    }), r;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Yt = "unexpected_error", Wl = "post_request_failed", mg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  postRequestFailed: Wl,
  unexpectedError: Yt
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const $i = ",", gs = "|";
function Ql(i) {
  const { skus: e, libraryName: t, libraryVersion: n, extensionName: r, extensionVersion: o } = i, s = /* @__PURE__ */ new Map([
    [0, [t, n]],
    [2, [r, o]]
  ]);
  let a = [];
  if (e != null && e.length) {
    if (a = e.split($i), a.length < 4)
      return e;
  } else
    a = Array.from({ length: 4 }, () => gs);
  return s.forEach((c, h) => {
    var l, d;
    c.length === 2 && ((l = c[0]) != null && l.length) && ((d = c[1]) != null && d.length) && Yl({
      skuArr: a,
      index: h,
      skuName: c[0],
      skuVersion: c[1]
    });
  }), a.join($i);
}
function Yl(i) {
  const { skuArr: e, index: t, skuName: n, skuVersion: r } = i;
  t >= e.length || (e[t] = [n, r].join(gs));
}
class yt {
  constructor(e, t) {
    this.cacheOutcome = xe.NOT_APPLICABLE, this.cacheManager = t, this.apiId = e.apiId, this.correlationId = e.correlationId, this.wrapperSKU = e.wrapperSKU || "", this.wrapperVer = e.wrapperVer || "", this.telemetryCacheKey = ko + Eo + e.clientId;
  }
  /**
   * API to add MSER Telemetry to request
   */
  generateCurrentRequestHeaderValue() {
    const e = `${this.apiId}${$e}${this.cacheOutcome}`, t = [this.wrapperSKU, this.wrapperVer], n = this.getNativeBrokerErrorCode();
    n != null && n.length && t.push(`broker_error=${n}`);
    const r = t.join($e), o = this.getRegionDiscoveryFields(), s = [
      e,
      o
    ].join($e);
    return [
      vi,
      s,
      r
    ].join(Si);
  }
  /**
   * API to add MSER Telemetry for the last failed request
   */
  generateLastRequestHeaderValue() {
    const e = this.getLastRequests(), t = yt.maxErrorsToSend(e), n = e.failedRequests.slice(0, 2 * t).join($e), r = e.errors.slice(0, t).join($e), o = e.errors.length, s = t < o ? Rc : Oc, a = [o, s].join($e);
    return [
      vi,
      e.cacheHits,
      n,
      r,
      a
    ].join(Si);
  }
  /**
   * API to cache token failures for MSER data capture
   * @param error
   */
  cacheFailedRequest(e) {
    const t = this.getLastRequests();
    t.errors.length >= Sc && (t.failedRequests.shift(), t.failedRequests.shift(), t.errors.shift()), t.failedRequests.push(this.apiId, this.correlationId), e instanceof Error && e && e.toString() ? e instanceof v ? e.subError ? t.errors.push(e.subError) : e.errorCode ? t.errors.push(e.errorCode) : t.errors.push(e.toString()) : t.errors.push(e.toString()) : t.errors.push(bc), this.cacheManager.setServerTelemetry(this.telemetryCacheKey, t, this.correlationId);
  }
  /**
   * Update server telemetry cache entry by incrementing cache hit counter
   */
  incrementCacheHits() {
    const e = this.getLastRequests();
    return e.cacheHits += 1, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, e, this.correlationId), e.cacheHits;
  }
  /**
   * Get the server telemetry entity from cache or initialize a new one
   */
  getLastRequests() {
    const e = {
      failedRequests: [],
      errors: [],
      cacheHits: 0
    };
    return this.cacheManager.getServerTelemetry(this.telemetryCacheKey, this.correlationId) || e;
  }
  /**
   * Remove server telemetry cache entry
   */
  clearTelemetryCache() {
    const e = this.getLastRequests(), t = yt.maxErrorsToSend(e), n = e.errors.length;
    if (t === n)
      this.cacheManager.removeItem(this.telemetryCacheKey, this.correlationId);
    else {
      const r = {
        failedRequests: e.failedRequests.slice(t * 2),
        errors: e.errors.slice(t),
        cacheHits: 0
      };
      this.cacheManager.setServerTelemetry(this.telemetryCacheKey, r, this.correlationId);
    }
  }
  /**
   * Returns the maximum number of errors that can be flushed to the server in the next network request
   * @param serverTelemetryEntity
   */
  static maxErrorsToSend(e) {
    let t, n = 0, r = 0;
    const o = e.errors.length;
    for (t = 0; t < o; t++) {
      const s = e.failedRequests[2 * t] || "", a = e.failedRequests[2 * t + 1] || "", c = e.errors[t] || "";
      if (r += s.toString().length + a.toString().length + c.length + 3, r < _c)
        n += 1;
      else
        break;
    }
    return n;
  }
  /**
   * Get the region discovery fields
   *
   * @returns string
   */
  getRegionDiscoveryFields() {
    const e = [];
    return e.push(this.regionUsed || ""), e.push(this.regionSource || ""), e.push(this.regionOutcome || ""), e.join(",");
  }
  /**
   * Update the region discovery metadata
   *
   * @param regionDiscoveryMetadata
   * @returns void
   */
  updateRegionDiscoveryMetadata(e) {
    this.regionUsed = e.region_used, this.regionSource = e.region_source, this.regionOutcome = e.region_outcome;
  }
  /**
   * Set cache outcome
   */
  setCacheOutcome(e) {
    this.cacheOutcome = e;
  }
  setNativeBrokerErrorCode(e) {
    const t = this.getLastRequests();
    t.nativeBrokerErrorCode = e, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, t, this.correlationId);
  }
  getNativeBrokerErrorCode() {
    return this.getLastRequests().nativeBrokerErrorCode;
  }
  clearNativeBrokerErrorCode() {
    const e = this.getLastRequests();
    delete e.nativeBrokerErrorCode, this.cacheManager.setServerTelemetry(this.telemetryCacheKey, e, this.correlationId);
  }
  static makeExtraSkuString(e) {
    return Ql(e);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Or extends v {
  constructor(e, t) {
    super(e, t), this.name = "JoseHeaderError", Object.setPrototypeOf(this, Or.prototype);
  }
}
function Ji(i) {
  return new Or(i);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Xl = "missing_kid_error", ql = "missing_alg_error";
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Pr {
  constructor(e) {
    this.typ = e.typ, this.alg = e.alg, this.kid = e.kid;
  }
  /**
   * Builds SignedHttpRequest formatted JOSE Header from the
   * JOSE Header options provided or previously set on the object and returns
   * the stringified header object.
   * Throws if keyId or algorithm aren't provided since they are required for Access Token Binding.
   * @param shrHeaderOptions
   * @returns
   */
  static getShrHeaderString(e) {
    if (!e.kid)
      throw Ji(Xl);
    if (!e.alg)
      throw Ji(ql);
    const t = new Pr({
      // Access Token PoP headers must have type pop, but the type header can be overriden for special cases
      typ: e.typ || Po.Pop,
      kid: e.kid,
      alg: e.alg
    });
    return JSON.stringify(t);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Zl(i, e) {
  e && e.push({
    name: i.name
  });
}
function ed(i, e, t) {
  if (!(e != null && e.length))
    return;
  const n = (g) => g.length ? g[g.length - 1] : void 0, r = i.name, o = n(e);
  if ((o == null ? void 0 : o.name) !== r)
    return;
  const s = e == null ? void 0 : e.pop();
  if (!s)
    return;
  const a = t instanceof v ? t.errorCode : t instanceof Error ? t.name : void 0, c = t instanceof v ? t.subError : void 0;
  a && s.childErr !== a && (s.err = a, c && (s.subErr = c)), delete s.name, delete s.childErr;
  const h = {
    ...s,
    dur: i.durationMs
  };
  i.success || (h.fail = 1);
  const l = n(e);
  if (!l)
    return { [r]: h };
  a && (l.childErr = a);
  let d;
  if (!l[r])
    d = r;
  else {
    const g = Object.keys(l).filter((f) => f.startsWith(r)).length;
    d = `${r}_${g + 1}`;
  }
  return l[d] = h, l;
}
function td(i, e, t, n = 5) {
  var r, o;
  if (i instanceof Error) {
    if (i instanceof v) {
      t.errorCode = i.errorCode, t.subErrorCode = i.subError, (i instanceof Ee || i instanceof Z) && (t.serverErrorNo = i.errorNo);
      return;
    } else if (i instanceof He) {
      t.errorCode = i.errorCode;
      return;
    } else if ((r = t.errorStack) != null && r.length) {
      e.trace("0lmqrh", t.correlationId);
      return;
    } else if (!((o = i.stack) != null && o.length)) {
      e.trace("1cnpwa", t.correlationId);
      return;
    }
  } else {
    e.trace("0gcyox", t.correlationId);
    return;
  }
  i.stack && (t.errorStack = nd(i.stack, n)), t.errorName = i.name;
}
function nd(i, e) {
  if (e < 0)
    return [];
  const t = i.split(`
`) || [], n = [], r = t[0];
  r.startsWith("TypeError: Cannot read property") || r.startsWith("TypeError: Cannot read properties of") || r.startsWith("TypeError: Cannot set property") || r.startsWith("TypeError: Cannot set properties of") || r.endsWith("is not a function") ? n.push(Nn(r)) : (r.startsWith("SyntaxError") || r.startsWith("TypeError")) && n.push(Nn(
    // Example: SyntaxError: Unexpected token 'e', "test" is not valid JSON -> SyntaxError: Unexpected token <redacted>, <redacted> is not valid JSON
    r.replace(/['].*[']|["].*["]/g, "<redacted>")
  ));
  for (let o = 1; o < t.length && !(n.length >= e); o++) {
    const s = t[o];
    n.push(Nn(s));
  }
  return n;
}
function Nn(i) {
  const e = i.lastIndexOf(" ") + 1;
  if (e < 1)
    return i;
  const t = i.substring(e);
  let n = t.lastIndexOf("/");
  return n = n < 0 ? t.lastIndexOf("\\") : n, n >= 0 ? (i.substring(0, e) + "(" + t.substring(n + 1) + (t.charAt(t.length - 1) === ")" ? "" : ")")).trimStart() : i.trimStart();
}
function rd(i) {
  const e = i == null ? void 0 : i.idTokenClaims;
  if (e != null && e.tfp || e != null && e.acr)
    return "B2C";
  if (e != null && e.tid) {
    if ((e == null ? void 0 : e.tid) === "9188040d-6c67-4c5b-b112-36a304b66dad")
      return "MSA";
  } else return;
  return "AAD";
}
class id {
  /**
   * Creates an instance of PerformanceClient,
   * an abstract class containing core performance telemetry logic.
   *
   * @constructor
   * @param {string} clientId Client ID of the application
   * @param {string} authority Authority used by the application
   * @param {Logger} logger Logger used by the application
   * @param {string} libraryName Name of the library
   * @param {string} libraryVersion Version of the library
   * @param {ApplicationTelemetry} applicationTelemetry application name and version
   * @param {Set<String>} intFields integer fields to be truncated
   */
  constructor(e, t, n, r, o, s, a) {
    this.authority = t, this.libraryName = r, this.libraryVersion = o, this.applicationTelemetry = s, this.clientId = e, this.logger = n, this.callbacks = /* @__PURE__ */ new Map(), this.eventsByCorrelationId = /* @__PURE__ */ new Map(), this.eventStack = /* @__PURE__ */ new Map(), this.intFields = a || /* @__PURE__ */ new Set();
    for (const c of qh)
      this.intFields.add(c);
  }
  /**
   * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
   *
   * @param {PerformanceEvents} measureName
   * @param {?string} [correlationId]
   * @returns {InProgressPerformanceEvent}
   */
  startMeasurement(e, t) {
    var o, s;
    const n = t || this.generateId(), r = {
      eventId: this.generateId(),
      status: $n.InProgress,
      authority: this.authority,
      libraryName: this.libraryName,
      libraryVersion: this.libraryVersion,
      clientId: this.clientId,
      name: e,
      startTimeMs: Date.now(),
      correlationId: n,
      appName: (o = this.applicationTelemetry) == null ? void 0 : o.appName,
      appVersion: (s = this.applicationTelemetry) == null ? void 0 : s.appVersion
    };
    return this.cacheEventByCorrelationId(r), Zl(r, this.eventStack.get(n)), {
      end: (a, c, h) => this.endMeasurement({
        // Initial set of event properties
        ...r,
        // Properties set when event ends
        ...a
      }, c, h),
      discard: () => this.discardMeasurements(r.correlationId),
      add: (a) => this.addFields(a, r.correlationId),
      increment: (a) => this.incrementFields(a, r.correlationId),
      event: r
    };
  }
  /**
   * Stops measuring the performance for an operation. Should only be called directly by PerformanceClient classes,
   * as consumers should instead use the function returned by startMeasurement.
   * Adds a new field named as "[event name]DurationMs" for sub-measurements, completes and emits an event
   * otherwise.
   *
   * @param {PerformanceEvent} event
   * @param {unknown} error
   * @param {AccountInfo?} account
   * @returns {(PerformanceEvent | null)}
   */
  endMeasurement(e, t, n) {
    var d, g;
    const r = this.eventsByCorrelationId.get(e.correlationId);
    if (!r)
      return this.logger.trace("0k9ti8", e.correlationId), null;
    const o = e.eventId === r.eventId;
    e.durationMs = Math.round(e.durationMs || this.getDurationMs(e.startTimeMs));
    const s = JSON.stringify(ed(e, this.eventStack.get(r.correlationId), t));
    if (o ? this.discardMeasurements(r.correlationId) : (d = r.incompleteSubMeasurements) == null || d.delete(e.eventId), t && td(t, this.logger, r), !o)
      return r[e.name + "DurationMs"] = Math.floor(e.durationMs), { ...r };
    o && !t && (r.errorCode || r.subErrorCode) && (this.logger.trace("1fm1tm", e.correlationId), r.errorCode = void 0, r.subErrorCode = void 0);
    let a = { ...r, ...e }, c = 0;
    (g = a.incompleteSubMeasurements) == null || g.forEach((f) => {
      this.logger.trace("0nxk52", a.correlationId), c++;
    }), a.incompleteSubMeasurements = void 0;
    const l = Fh(e.correlationId).map((f) => `${f.milliseconds},${f.hash}`).join(";");
    return a = {
      ...a,
      status: $n.Completed,
      incompleteSubsCount: c,
      context: s,
      logs: l
    }, n && (a.accountType = rd(n), a.dataBoundary = n.dataBoundary), this.truncateIntegralFields(a), this.emitEvents([a], e.correlationId), a;
  }
  /**
   * Saves extra information to be emitted when the measurements are flushed
   * @param fields
   * @param correlationId
   */
  addFields(e, t) {
    const n = this.eventsByCorrelationId.get(t);
    n ? this.eventsByCorrelationId.set(t, {
      ...n,
      ...e
    }) : this.logger.trace("0thl6s", t);
  }
  /**
   * Increment counters to be emitted when the measurements are flushed
   * @param fields {string[]}
   * @param correlationId {string} correlation identifier
   */
  incrementFields(e, t) {
    const n = this.eventsByCorrelationId.get(t);
    if (n)
      for (const r in e) {
        if (!n.hasOwnProperty(r))
          n[r] = 0;
        else if (isNaN(Number(n[r])))
          return;
        n[r] += e[r];
      }
    else
      this.logger.trace("0thl6s", t);
  }
  /**
   * Upserts event into event cache.
   * First key is the correlation id, second key is the event id.
   * Allows for events to be grouped by correlation id,
   * and to easily allow for properties on them to be updated.
   *
   * @private
   * @param {PerformanceEvent} event
   */
  cacheEventByCorrelationId(e) {
    const t = this.eventsByCorrelationId.get(e.correlationId);
    t ? (t.incompleteSubMeasurements = t.incompleteSubMeasurements || /* @__PURE__ */ new Map(), t.incompleteSubMeasurements.set(e.eventId, {
      name: e.name,
      startTimeMs: e.startTimeMs
    })) : (this.eventsByCorrelationId.set(e.correlationId, { ...e }), this.eventStack.set(e.correlationId, []));
  }
  /**
   * Removes measurements and aux data for a given correlation id.
   *
   * @param {string} correlationId
   */
  discardMeasurements(e) {
    this.eventsByCorrelationId.delete(e), this.eventStack.delete(e);
  }
  /**
   * Registers a callback function to receive performance events.
   *
   * @param {PerformanceCallbackFunction} callback
   * @returns {string}
   */
  addPerformanceCallback(e) {
    for (const [n, r] of this.callbacks)
      if (r.toString() === e.toString())
        return this.logger.warning("1eap5p", ""), n;
    const t = this.generateId();
    return this.callbacks.set(t, e), this.logger.verbose("0c9ujz", ""), t;
  }
  /**
   * Removes a callback registered with addPerformanceCallback.
   *
   * @param {string} callbackId
   * @returns {boolean}
   */
  removePerformanceCallback(e) {
    const t = this.callbacks.delete(e);
    return t ? this.logger.verbose("0253if", "") : this.logger.verbose("0iqk07", ""), t;
  }
  /**
   * Emits events to all registered callbacks.
   *
   * @param {PerformanceEvent[]} events
   * @param {?string} [correlationId]
   */
  emitEvents(e, t) {
    this.logger.verbose("11jb1y", t), this.callbacks.forEach((n, r) => {
      this.logger.trace("0p2pjl", t), n.apply(null, [e]);
    });
  }
  /**
   * Enforce truncation of integral fields in performance event.
   * @param {PerformanceEvent} event performance event to update.
   */
  truncateIntegralFields(e) {
    this.intFields.forEach((t) => {
      t in e && typeof e[t] == "number" && (e[t] = Math.floor(e[t]));
    });
  }
  /**
   * Returns event duration in milliseconds
   * @param startTimeMs {number}
   * @returns {number}
   */
  getDurationMs(e) {
    const t = Date.now() - e;
    return t < 0 ? t : 0;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function yn(i) {
  return `See https://aka.ms/msal.js.errors#${i} for details`;
}
class _t extends v {
  constructor(e, t) {
    super(e, yn(e), t), Object.setPrototypeOf(this, _t.prototype), this.name = "BrowserAuthError";
  }
}
function m(i, e) {
  return new _t(i, e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const X = {
  /**
   * Invalid grant error code
   */
  INVALID_GRANT_ERROR: "invalid_grant",
  /**
   * Default popup window width
   */
  POPUP_WIDTH: 483,
  /**
   * Default popup window height
   */
  POPUP_HEIGHT: 600,
  /**
   * Name of the popup window starts with
   */
  POPUP_NAME_PREFIX: "msal",
  /**
   * Msal-browser SKU
   */
  MSAL_SKU: "msal.js.browser"
}, ne = {
  CHANNEL_ID: "53ee284d-920a-4b59-9d30-a60315b26836",
  PREFERRED_EXTENSION_ID: "ppnbnpeolgkicgegkbkbjmhlideopiji",
  MATS_TELEMETRY: "MATS",
  MICROSOFT_ENTRA_BROKERID: "MicrosoftEntra",
  DOM_API_NAME: "DOM API",
  PLATFORM_DOM_APIS: "get-token-and-sign-out",
  PLATFORM_DOM_PROVIDER: "PlatformAuthDOMHandler",
  PLATFORM_EXTENSION_PROVIDER: "PlatformAuthExtensionHandler"
}, ct = {
  HandshakeRequest: "Handshake",
  HandshakeResponse: "HandshakeResponse",
  GetToken: "GetToken",
  Response: "Response"
}, q = {
  LocalStorage: "localStorage",
  SessionStorage: "sessionStorage",
  MemoryStorage: "memoryStorage"
}, Wi = {
  GET: "GET",
  POST: "POST"
}, Re = {
  SIGNIN: "signin",
  SIGNOUT: "signout"
}, M = {
  ORIGIN_URI: "request.origin",
  URL_HASH: "urlHash",
  REQUEST_PARAMS: "request.params",
  VERIFIER: "code.verifier",
  INTERACTION_STATUS_KEY: "interaction.status",
  NATIVE_REQUEST: "request.native"
}, Mt = {
  WRAPPER_SKU: "wrapper.sku",
  WRAPPER_VER: "wrapper.version"
}, k = {
  acquireTokenRedirect: 861,
  acquireTokenPopup: 862,
  ssoSilent: 863,
  acquireTokenSilent_authCode: 864,
  handleRedirectPromise: 865,
  acquireTokenByCode: 866,
  acquireTokenSilent_silentFlow: 61,
  logout: 961,
  logoutPopup: 962
};
var C;
(function(i) {
  i.Redirect = "redirect", i.Popup = "popup", i.Silent = "silent", i.None = "none";
})(C || (C = {}));
const ye = {
  /**
   * Initial status before interaction occurs
   */
  Startup: "startup",
  /**
   * Status set when logout call occuring
   */
  Logout: "logout",
  /**
   * Status set for acquireToken calls
   */
  AcquireToken: "acquireToken",
  /**
   * Status set when handleRedirect in progress
   */
  HandleRedirect: "handleRedirect",
  /**
   * Status set when interaction is complete
   */
  None: "none"
}, Jn = {
  scopes: Ue
}, fs = "jwk", yg = {
  React: "@azure/msal-react",
  Angular: "@azure/msal-angular"
}, Wn = "msal.db", od = 1, sd = `${Wn}.keys`, U = {
  /*
   * acquireTokenSilent will attempt to retrieve an access token from the cache. If the access token is expired
   * or cannot be found the refresh token will be used to acquire a new one. Finally, if the refresh token
   * is expired acquireTokenSilent will attempt to acquire new access and refresh tokens.
   */
  Default: 0,
  /*
   * acquireTokenSilent will only look for access tokens in the cache. It will not attempt to renew access or
   * refresh tokens.
   */
  AccessToken: 1,
  /*
   * acquireTokenSilent will attempt to retrieve an access token from the cache. If the access token is expired or
   * cannot be found, the refresh token will be used to acquire a new one. If the refresh token is expired, it
   * will not be renewed and acquireTokenSilent will fail.
   */
  AccessTokenAndRefreshToken: 2,
  /*
   * acquireTokenSilent will not attempt to retrieve access tokens from the cache and will instead attempt to
   * exchange the cached refresh token for a new access token. If the refresh token is expired, it will not be
   * renewed and acquireTokenSilent will fail.
   */
  RefreshToken: 3,
  /*
   * acquireTokenSilent will not look in the cache for the access token. It will go directly to network with the
   * cached refresh token. If the refresh token is expired an attempt will be made to renew it. This is equivalent to
   * setting "forceRefresh: true".
   */
  RefreshTokenAndNetwork: 4,
  /*
   * acquireTokenSilent will attempt to renew both access and refresh tokens. It will not look in the cache. This will
   * always fail if 3rd party cookies are blocked by the browser.
   */
  Skip: 5
}, ad = [
  U.Default,
  U.Skip,
  U.RefreshTokenAndNetwork
];
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Ut(i) {
  return encodeURIComponent(Ct(i).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"));
}
function Me(i) {
  return ps(i).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Ct(i) {
  return ps(new TextEncoder().encode(i));
}
function ps(i) {
  const e = Array.from(i, (t) => String.fromCodePoint(t)).join("");
  return btoa(e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Nr = "pkce_not_created", Mr = "ear_jwk_empty", ms = "ear_jwe_empty", Qn = "crypto_nonexistent", Cn = "empty_navigate_uri", ys = "hash_empty_error", wn = "no_state_in_hash", Cs = "hash_does_not_contain_known_properties", Ur = "unable_to_parse_state", ws = "state_interaction_type_mismatch", Is = "interaction_in_progress", Ts = "interaction_in_progress_cancelled", As = "popup_window_error", Es = "empty_window_error", Xt = "user_cancelled", ks = "redirect_bridge_empty_response", vs = "redirect_in_iframe", Ss = "block_iframe_reload", bs = "block_nested_popups", cd = "iframe_closed_prematurely", In = "silent_logout_unsupported", _s = "no_account_error", hd = "silent_prompt_value_error", Rs = "no_token_request_cache_error", Os = "unable_to_parse_token_request_cache_error", ld = "auth_request_not_set_error", dd = "invalid_cache_type", xr = "non_browser_environment", Je = "database_not_open", qt = "no_network_connectivity", Ps = "post_request_failed", Ns = "get_request_failed", Yn = "failed_to_parse_response", Ms = "unable_to_load_token", Dr = "crypto_key_not_found", Us = "auth_code_required", xs = "auth_code_or_nativeAccountId_required", Ds = "spa_code_and_nativeAccountId_present", Lr = "database_unavailable", Ls = "unable_to_acquire_token_from_native_platform", Hs = "native_handshake_timeout", Ks = "native_extension_not_installed", Hr = "native_connection_not_established", dt = "uninitialized_public_client_application", Fs = "native_prompt_not_supported", Bs = "invalid_base64_string", zs = "invalid_pop_token_request", js = "failed_to_build_headers", Gs = "failed_to_parse_headers", Dt = "failed_to_decrypt_ear_response", wt = "timed_out", Vs = "empty_response", Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authCodeOrNativeAccountIdRequired: xs,
  authCodeRequired: Us,
  authRequestNotSetError: ld,
  blockIframeReload: Ss,
  blockNestedPopups: bs,
  cryptoKeyNotFound: Dr,
  cryptoNonExistent: Qn,
  databaseNotOpen: Je,
  databaseUnavailable: Lr,
  earJweEmpty: ms,
  earJwkEmpty: Mr,
  emptyNavigateUri: Cn,
  emptyResponse: Vs,
  emptyWindowError: Es,
  failedToBuildHeaders: js,
  failedToDecryptEarResponse: Dt,
  failedToParseHeaders: Gs,
  failedToParseResponse: Yn,
  getRequestFailed: Ns,
  hashDoesNotContainKnownProperties: Cs,
  hashEmptyError: ys,
  iframeClosedPrematurely: cd,
  interactionInProgress: Is,
  interactionInProgressCancelled: Ts,
  invalidBase64String: Bs,
  invalidCacheType: dd,
  invalidPopTokenRequest: zs,
  nativeConnectionNotEstablished: Hr,
  nativeExtensionNotInstalled: Ks,
  nativeHandshakeTimeout: Hs,
  nativePromptNotSupported: Fs,
  noAccountError: _s,
  noNetworkConnectivity: qt,
  noStateInHash: wn,
  noTokenRequestCacheError: Rs,
  nonBrowserEnvironment: xr,
  pkceNotCreated: Nr,
  popupWindowError: As,
  postRequestFailed: Ps,
  redirectBridgeEmptyResponse: ks,
  redirectInIframe: vs,
  silentLogoutUnsupported: In,
  silentPromptValueError: hd,
  spaCodeAndNativeAccountIdPresent: Ds,
  stateInteractionTypeMismatch: ws,
  timedOut: wt,
  unableToAcquireTokenFromNativePlatform: Ls,
  unableToLoadToken: Ms,
  unableToParseState: Ur,
  unableToParseTokenRequestCacheError: Os,
  uninitializedPublicClientApplication: dt,
  userCancelled: Xt
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function j(i) {
  return new TextDecoder().decode(Pe(i));
}
function Pe(i) {
  let e = i.replace(/-/g, "+").replace(/_/g, "/");
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
      throw m(Bs);
  }
  const t = atob(e);
  return Uint8Array.from(t, (n) => n.codePointAt(0) || 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const ud = "RSASSA-PKCS1-v1_5", it = "AES-GCM", $s = "HKDF", Kr = "SHA-256", gd = 2048, fd = new Uint8Array([1, 0, 1]), Qi = "0123456789abcdef", Yi = new Uint32Array(1), Fr = "raw", Js = "encrypt", Br = "decrypt", pd = "deriveKey", md = "crypto_subtle_undefined", zr = {
  name: ud,
  hash: Kr,
  modulusLength: gd,
  publicExponent: fd
};
function yd(i) {
  if (!window)
    throw m(xr);
  if (!window.crypto)
    throw m(Qn);
  if (!i && !window.crypto.subtle)
    throw m(Qn, md);
}
async function Ws(i) {
  const t = new TextEncoder().encode(i);
  return window.crypto.subtle.digest(Kr, t);
}
function Cd(i) {
  return window.crypto.getRandomValues(i);
}
function Mn() {
  return window.crypto.getRandomValues(Yi), Yi[0];
}
function O() {
  const i = Date.now(), e = Mn() * 1024 + (Mn() & 1023), t = new Uint8Array(16), n = Math.trunc(e / 2 ** 30), r = e & 2 ** 30 - 1, o = Mn();
  t[0] = i / 2 ** 40, t[1] = i / 2 ** 32, t[2] = i / 2 ** 24, t[3] = i / 2 ** 16, t[4] = i / 2 ** 8, t[5] = i, t[6] = 112 | n >>> 8, t[7] = n, t[8] = 128 | r >>> 24, t[9] = r >>> 16, t[10] = r >>> 8, t[11] = r, t[12] = o >>> 24, t[13] = o >>> 16, t[14] = o >>> 8, t[15] = o;
  let s = "";
  for (let a = 0; a < t.length; a++)
    s += Qi.charAt(t[a] >>> 4), s += Qi.charAt(t[a] & 15), (a === 3 || a === 5 || a === 7 || a === 9) && (s += "-");
  return s;
}
async function wd(i, e) {
  return window.crypto.subtle.generateKey(zr, i, e);
}
async function Un(i) {
  return window.crypto.subtle.exportKey(fs, i);
}
async function Id(i, e, t) {
  return window.crypto.subtle.importKey(fs, i, zr, e, t);
}
async function Td(i, e) {
  return window.crypto.subtle.sign(zr, i, e);
}
async function jr() {
  const i = await Qs(), t = {
    alg: "dir",
    kty: "oct",
    k: Me(new Uint8Array(i))
  };
  return Ct(JSON.stringify(t));
}
async function Ad(i) {
  const e = j(i), n = JSON.parse(e).k, r = Pe(n);
  return window.crypto.subtle.importKey(Fr, r, it, !1, [
    Br
  ]);
}
async function Ed(i, e) {
  const t = e.split(".");
  if (t.length !== 5)
    throw m(Dt, "jwe_length");
  const n = await Ad(i).catch(() => {
    throw m(Dt, "import_key");
  });
  try {
    const r = new TextEncoder().encode(t[0]), o = Pe(t[2]), s = Pe(t[3]), a = Pe(t[4]), c = a.byteLength * 8, h = new Uint8Array(s.length + a.length);
    h.set(s), h.set(a, s.length);
    const l = await window.crypto.subtle.decrypt({
      name: it,
      iv: o,
      tagLength: c,
      additionalData: r
    }, n, h);
    return new TextDecoder().decode(l);
  } catch {
    throw m(Dt, "decrypt");
  }
}
async function Qs() {
  const i = await window.crypto.subtle.generateKey({
    name: it,
    length: 256
  }, !0, [Js, Br]);
  return window.crypto.subtle.exportKey(Fr, i);
}
async function Xi(i) {
  return window.crypto.subtle.importKey(Fr, i, $s, !1, [
    pd
  ]);
}
async function Ys(i, e, t) {
  return window.crypto.subtle.deriveKey({
    name: $s,
    salt: e,
    hash: Kr,
    info: new TextEncoder().encode(t)
  }, i, { name: it, length: 256 }, !1, [Js, Br]);
}
async function kd(i, e, t) {
  const n = new TextEncoder().encode(e), r = window.crypto.getRandomValues(new Uint8Array(16)), o = await Ys(i, r, t), s = await window.crypto.subtle.encrypt({
    name: it,
    iv: new Uint8Array(12)
    // New key is derived for every encrypt so we don't need a new nonce
  }, o, n);
  return {
    data: Me(new Uint8Array(s)),
    nonce: Me(r)
  };
}
async function qi(i, e, t, n) {
  const r = Pe(n), o = await Ys(i, Pe(e), t), s = await window.crypto.subtle.decrypt({
    name: it,
    iv: new Uint8Array(12)
    // New key is derived for every encrypt so we don't need a new nonce
  }, o, r);
  return new TextDecoder().decode(s);
}
async function vd(i) {
  const e = await Ws(i), t = new Uint8Array(e);
  return Me(t);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Gr extends v {
  constructor(e, t) {
    super(e, t), this.name = "BrowserConfigurationAuthError", Object.setPrototypeOf(this, Gr.prototype);
  }
}
function D(i) {
  return new Gr(i, yn(i));
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Vr = "storage_not_supported", F = "stubbed_public_client_application_called", Xs = "in_mem_redirect_unavailable", wg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  inMemRedirectUnavailable: Xs,
  storageNotSupported: Vr,
  stubbedPublicClientApplicationCalled: F
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function qs() {
  const i = window.location.hash, e = window.location.search;
  let t = !1, n = !1, r = "", o;
  if (i && i.length > 1) {
    const l = i.charAt(0) === "#" ? i.substring(1) : i, d = new URLSearchParams(l);
    d.has("state") && (t = !0, r = l, o = d);
  }
  if (e && e.length > 1) {
    const l = e.charAt(0) === "?" ? e.substring(1) : e, d = new URLSearchParams(l);
    d.has("state") && (n = !0, r = l, o = d);
  }
  if (t && n) {
    const l = e.charAt(0) === "?" ? e.substring(1) : e, d = i.charAt(0) === "#" ? i.substring(1) : i;
    r = `${l}${d}`, o = new URLSearchParams(r);
  }
  if (!r || !o)
    throw m(Vs);
  const s = o.get("state");
  if (!s)
    throw m(wn);
  const { libraryState: a } = Et(j, s), { id: c, meta: h } = a;
  if (!c || !h)
    throw m(Ur, "missing_library_state");
  return {
    params: o,
    payload: r,
    urlHash: i,
    urlQuery: e,
    hasResponseInHash: t,
    hasResponseInQuery: n,
    libraryState: {
      id: c,
      meta: h
    }
  };
}
function $r(i) {
  i.location.hash = "", typeof i.history.replaceState == "function" && i.history.replaceState(null, "", `${i.location.origin}${i.location.pathname}${i.location.search}`);
}
function Zs(i) {
  const e = i.split("#");
  e.shift(), window.location.hash = e.length > 0 ? e.join("#") : "";
}
function Rt() {
  return window.parent !== window;
}
function ea() {
  if (Rt())
    return !1;
  try {
    const { libraryState: i } = qs(), { meta: e } = i;
    return e.interactionType === C.Popup;
  } catch {
    return !1;
  }
}
let Oe = null;
function ta(i, e) {
  Oe && (i.verbose("18y01k", e), clearTimeout(Oe.timeoutId), Oe.channel.close(), Oe.reject(m(Ts)), Oe = null);
}
async function De(i, e, t, n) {
  return new Promise((r, o) => {
    e.verbose("1rf6em", n.correlationId);
    const { libraryState: s } = Et(t.base64Decode, n.state || ""), a = new BroadcastChannel(s.id);
    let c;
    const h = window.setTimeout(() => {
      Oe = null, a.close(), o(m(wt, "redirect_bridge_timeout"));
    }, i);
    Oe = {
      timeoutId: h,
      channel: a,
      reject: o
    }, a.onmessage = (l) => {
      c = l.data.payload, Oe = null, clearTimeout(h), a.close(), c ? r(c) : o(m(ks));
    };
  });
}
function Ie() {
  return typeof window < "u" && window.location ? window.location.href.split("?")[0].split("#")[0] : "";
}
function na() {
  const e = new b(window.location.href).getUrlComponents();
  return `${e.Protocol}//${e.HostNameAndPort}/`;
}
function ra() {
  if (Vt(window.location.hash) && Rt())
    throw m(Ss);
}
function ia(i) {
  if (Rt() && !i)
    throw m(vs);
}
function oa() {
  if (ea())
    throw m(bs);
}
function Tn() {
  if (typeof window > "u")
    throw m(xr);
}
function Jr(i) {
  if (!i)
    throw m(dt);
}
function An(i) {
  Tn(), ra(), oa(), Jr(i);
}
function Xn(i, e) {
  if (An(i), ia(e.system.allowRedirectInIframe), e.cache.cacheLocation === q.MemoryStorage)
    throw D(Xs);
}
function Wr(i) {
  const e = document.createElement("link");
  e.rel = "preconnect", e.href = new URL(i).origin, e.crossOrigin = "anonymous", document.head.appendChild(e), window.setTimeout(() => {
    try {
      document.head.removeChild(e);
    } catch {
    }
  }, 1e4);
}
function Zt() {
  return O();
}
const Sd = fr, Ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClientCapabilitiesToClaims: Sd,
  blockAPICallsBeforeInitialize: Jr,
  blockAcquireTokenInPopups: oa,
  blockNonBrowserEnvironment: Tn,
  blockRedirectInIframe: ia,
  blockReloadInHiddenIframes: ra,
  cancelPendingBridgeResponse: ta,
  clearHash: $r,
  createGuid: Zt,
  getCurrentUri: Ie,
  getHomepage: na,
  invoke: ie,
  invokeAsync: u,
  isInIframe: Rt,
  isInPopup: ea,
  parseAuthResponseFromUrl: qs,
  preconnect: Wr,
  preflightCheck: An,
  redirectPreflightCheck: Xn,
  replaceHash: Zs,
  waitForBridgeResponse: De
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const bd = "acquireTokenFromCache", _d = "acquireTokenByRefreshToken", Rd = "acquireTokenSilentAsync", Od = "cryptoOptsGetPublicKeyThumbprint", Pd = "cryptoOptsSignJwt", Nd = "silentCacheClientAcquireToken", Md = "silentIframeClientAcquireToken", Ud = "awaitConcurrentIframe", xd = "silentRefreshClientAcquireToken", Ke = "standardInteractionClientGetDiscoveredAuthority", sa = "nativeInteractionClientAcquireToken", Dd = "refreshTokenClientAcquireTokenByRefreshToken", Zi = "acquireTokenBySilentIframe", Qr = "initializeBaseRequest", Ld = "initializeSilentRequest", Hd = "initializeCache", eo = "silentIframeClientTokenHelper", xn = "silentHandlerInitiateAuthRequest", en = "silentHandlerMonitorIframeForHash", Kd = "silentHandlerLoadFrameSync", Ne = "standardInteractionClientCreateAuthCodeClient", En = "standardInteractionClientGetClientConfiguration", kn = "standardInteractionClientInitializeAuthorizationRequest", Fd = "silentFlowClientAcquireCachedToken", Bd = "getStandardParams", zd = "handleCodeResponse", Yr = "handleResponseEar", aa = "handleResponsePlatformBroker", qe = "handleResponseCode", jd = "authClientAcquireToken", ut = "deserializeResponse", Gd = "authorityFactoryCreateDiscoveredInstance", Vd = "acquireTokenByCodeAsync", $d = "handleRedirectPromise", Jd = "handleNativeRedirectPromise", Wd = "nativeMessageHandlerHandshake", Qd = "importExistingCache", je = "generatePkceCodes", Yd = "generateCodeVerifier", Xd = "generateCodeChallengeFromVerifier", qd = "sha256Digest", Zd = "getRandomValues", to = "generateHKDF", eu = "generateBaseKey", tu = "base64Decode", nu = "urlEncodeArr", ru = "encrypt", no = "decrypt", Xr = "generateEarKey", iu = "decryptEarResponse", ou = "loadAccount", su = "loadIdToken", au = "loadAccessToken", cu = "loadRefreshToken";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class hu {
  constructor() {
    this.dbName = Wn, this.version = od, this.tableName = sd, this.dbOpen = !1;
  }
  /**
   * Opens IndexedDB instance.
   */
  async open() {
    return new Promise((e, t) => {
      const n = window.indexedDB.open(this.dbName, this.version);
      n.addEventListener("upgradeneeded", (r) => {
        r.target.result.createObjectStore(this.tableName);
      }), n.addEventListener("success", (r) => {
        const o = r;
        this.db = o.target.result, this.dbOpen = !0, e();
      }), n.addEventListener("error", () => t(m(Lr)));
    });
  }
  /**
   * Closes the connection to IndexedDB database when all pending transactions
   * complete.
   */
  closeConnection() {
    const e = this.db;
    e && this.dbOpen && (e.close(), this.dbOpen = !1);
  }
  /**
   * Opens database if it's not already open
   */
  async validateDbIsOpen() {
    if (!this.dbOpen)
      return this.open();
  }
  /**
   * Retrieves item from IndexedDB instance.
   * @param key
   */
  async getItem(e) {
    return await this.validateDbIsOpen(), new Promise((t, n) => {
      if (!this.db)
        return n(m(Je));
      const s = this.db.transaction([this.tableName], "readonly").objectStore(this.tableName).get(e);
      s.addEventListener("success", (a) => {
        const c = a;
        this.closeConnection(), t(c.target.result);
      }), s.addEventListener("error", (a) => {
        this.closeConnection(), n(a);
      });
    });
  }
  /**
   * Adds item to IndexedDB under given key
   * @param key
   * @param payload
   */
  async setItem(e, t) {
    return await this.validateDbIsOpen(), new Promise((n, r) => {
      if (!this.db)
        return r(m(Je));
      const a = this.db.transaction([this.tableName], "readwrite").objectStore(this.tableName).put(t, e);
      a.addEventListener("success", () => {
        this.closeConnection(), n();
      }), a.addEventListener("error", (c) => {
        this.closeConnection(), r(c);
      });
    });
  }
  /**
   * Removes item from IndexedDB under given key
   * @param key
   */
  async removeItem(e) {
    return await this.validateDbIsOpen(), new Promise((t, n) => {
      if (!this.db)
        return n(m(Je));
      const s = this.db.transaction([this.tableName], "readwrite").objectStore(this.tableName).delete(e);
      s.addEventListener("success", () => {
        this.closeConnection(), t();
      }), s.addEventListener("error", (a) => {
        this.closeConnection(), n(a);
      });
    });
  }
  /**
   * Get all the keys from the storage object as an iterable array of strings.
   */
  async getKeys() {
    return await this.validateDbIsOpen(), new Promise((e, t) => {
      if (!this.db)
        return t(m(Je));
      const o = this.db.transaction([this.tableName], "readonly").objectStore(this.tableName).getAllKeys();
      o.addEventListener("success", (s) => {
        const a = s;
        this.closeConnection(), e(a.target.result);
      }), o.addEventListener("error", (s) => {
        this.closeConnection(), t(s);
      });
    });
  }
  /**
   *
   * Checks whether there is an object under the search key in the object store
   */
  async containsKey(e) {
    return await this.validateDbIsOpen(), new Promise((t, n) => {
      if (!this.db)
        return n(m(Je));
      const s = this.db.transaction([this.tableName], "readonly").objectStore(this.tableName).count(e);
      s.addEventListener("success", (a) => {
        const c = a;
        this.closeConnection(), t(c.target.result === 1);
      }), s.addEventListener("error", (a) => {
        this.closeConnection(), n(a);
      });
    });
  }
  /**
   * Deletes the MSAL database. The database is deleted rather than cleared to make it possible
   * for client applications to downgrade to a previous MSAL version without worrying about forward compatibility issues
   * with IndexedDB database versions.
   */
  async deleteDatabase() {
    return this.db && this.dbOpen && this.closeConnection(), new Promise((e, t) => {
      const n = window.indexedDB.deleteDatabase(Wn), r = setTimeout(() => t(!1), 200);
      n.addEventListener("success", () => (clearTimeout(r), e(!0))), n.addEventListener("blocked", () => (clearTimeout(r), e(!0))), n.addEventListener("error", () => (clearTimeout(r), t(!1)));
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class vn {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  async initialize() {
  }
  getItem(e) {
    return this.cache.get(e) || null;
  }
  getUserData(e) {
    return this.getItem(e);
  }
  setItem(e, t) {
    this.cache.set(e, t);
  }
  async setUserData(e, t) {
    this.setItem(e, t);
  }
  removeItem(e) {
    this.cache.delete(e);
  }
  getKeys() {
    const e = [];
    return this.cache.forEach((t, n) => {
      e.push(n);
    }), e;
  }
  containsKey(e) {
    return this.cache.has(e);
  }
  clear() {
    this.cache.clear();
  }
  decryptData() {
    return Promise.resolve(null);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class lu {
  constructor(e) {
    this.inMemoryCache = new vn(), this.indexedDBCache = new hu(), this.logger = e;
  }
  handleDatabaseAccessError(e, t) {
    if (e instanceof _t && e.errorCode === Lr)
      this.logger.error("1wx7zz", t);
    else
      throw e;
  }
  /**
   * Get the item matching the given key. Tries in-memory cache first, then in the asynchronous
   * storage object if item isn't found in-memory.
   * @param key
   * @param correlationId
   */
  async getItem(e, t) {
    const n = this.inMemoryCache.getItem(e);
    if (!n)
      try {
        return this.logger.verbose("0naxpl", t), await this.indexedDBCache.getItem(e);
      } catch (r) {
        this.handleDatabaseAccessError(r, t);
      }
    return n;
  }
  /**
   * Sets the item in the in-memory cache and then tries to set it in the asynchronous
   * storage object with the given key.
   * @param key
   * @param value
   * @param correlationId
   */
  async setItem(e, t, n) {
    this.inMemoryCache.setItem(e, t);
    try {
      await this.indexedDBCache.setItem(e, t);
    } catch (r) {
      this.handleDatabaseAccessError(r, n);
    }
  }
  /**
   * Removes the item matching the key from the in-memory cache, then tries to remove it from the asynchronous storage object.
   * @param key
   * @param correlationId
   */
  async removeItem(e, t) {
    this.inMemoryCache.removeItem(e);
    try {
      await this.indexedDBCache.removeItem(e);
    } catch (n) {
      this.handleDatabaseAccessError(n, t);
    }
  }
  /**
   * Get all the keys from the in-memory cache as an iterable array of strings. If no keys are found, query the keys in the
   * asynchronous storage object.
   * @param correlationId
   */
  async getKeys(e) {
    const t = this.inMemoryCache.getKeys();
    if (t.length === 0)
      try {
        return this.logger.verbose("1iqrbq", e), await this.indexedDBCache.getKeys();
      } catch (n) {
        this.handleDatabaseAccessError(n, e);
      }
    return t;
  }
  /**
   * Returns true or false if the given key is present in the cache.
   * @param key
   * @param correlationId
   */
  async containsKey(e, t) {
    const n = this.inMemoryCache.containsKey(e);
    if (!n)
      try {
        return this.logger.verbose("03zl2j", t), await this.indexedDBCache.containsKey(e);
      } catch (r) {
        this.handleDatabaseAccessError(r, t);
      }
    return n;
  }
  /**
   * Clears in-memory Map
   * @param correlationId
   */
  clearInMemory(e) {
    this.logger.verbose("03r21p", e), this.inMemoryCache.clear(), this.logger.verbose("0uksk1", e);
  }
  /**
   * Tries to delete the IndexedDB database
   * @param correlationId
   * @returns
   */
  async clearPersistent(e) {
    try {
      this.logger.verbose("0rdqut", e);
      const t = await this.indexedDBCache.deleteDatabase();
      return t && this.logger.verbose("149ouc", e), t;
    } catch (t) {
      return this.handleDatabaseAccessError(t, e), !1;
    }
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class oe {
  constructor(e, t, n) {
    this.logger = e, yd(n ?? !1), this.cache = new lu(this.logger), this.performanceClient = t;
  }
  /**
   * Creates a new random GUID - used to populate state and nonce.
   * @returns string (GUID)
   */
  createNewGuid() {
    return O();
  }
  /**
   * Encodes input string to base64.
   * @param input
   */
  base64Encode(e) {
    return Ct(e);
  }
  /**
   * Decodes input string from base64.
   * @param input
   */
  base64Decode(e) {
    return j(e);
  }
  /**
   * Encodes input string to base64 URL safe string.
   * @param input
   */
  base64UrlEncode(e) {
    return Ut(e);
  }
  /**
   * Stringifies and base64Url encodes input public key
   * @param inputKid
   * @returns Base64Url encoded public key
   */
  encodeKid(e) {
    return this.base64UrlEncode(JSON.stringify({ kid: e }));
  }
  /**
   * Generates a keypair, stores it and returns a thumbprint
   * @param request
   */
  async getPublicKeyThumbprint(e) {
    var l;
    const t = (l = this.performanceClient) == null ? void 0 : l.startMeasurement(Od, e.correlationId), n = await wd(oe.EXTRACTABLE, oe.POP_KEY_USAGES), r = await Un(n.publicKey), o = {
      e: r.e,
      kty: r.kty,
      n: r.n
    }, s = ro(o), a = await this.hashString(s), c = await Un(n.privateKey), h = await Id(c, !1, ["sign"]);
    return await this.cache.setItem(a, {
      privateKey: h,
      publicKey: n.publicKey,
      requestMethod: e.resourceRequestMethod,
      requestUri: e.resourceRequestUri
    }, e.correlationId), t && t.end({
      success: !0
    }), a;
  }
  /**
   * Removes cryptographic keypair from key store matching the keyId passed in
   * @param kid
   * @param correlationId
   */
  async removeTokenBindingKey(e, t) {
    if (await this.cache.removeItem(e, t), await this.cache.containsKey(e, t))
      throw p(Pc);
  }
  /**
   * Removes all cryptographic keys from IndexedDB storage
   * @param correlationId
   */
  async clearKeystore(e) {
    this.cache.clearInMemory(e);
    try {
      return await this.cache.clearPersistent(e), !0;
    } catch (t) {
      return t instanceof Error ? this.logger.error("1owpn8", e) : this.logger.error("0yrmwo", e), !1;
    }
  }
  /**
   * Signs the given object as a jwt payload with private key retrieved by given kid.
   * @param payload
   * @param kid
   */
  async signJwt(e, t, n, r) {
    var N;
    const o = (N = this.performanceClient) == null ? void 0 : N.startMeasurement(Pd, r), s = await this.cache.getItem(t, r || "");
    if (!s)
      throw m(Dr);
    const a = await Un(s.publicKey), c = ro(a), h = Ut(JSON.stringify({ kid: t })), l = Pr.getShrHeaderString({
      ...n == null ? void 0 : n.header,
      alg: a.alg,
      kid: h
    }), d = Ut(l);
    e.cnf = {
      jwk: JSON.parse(c)
    };
    const g = Ut(JSON.stringify(e)), f = `${d}.${g}`, I = new TextEncoder().encode(f), A = await Td(s.privateKey, I), P = Me(new Uint8Array(A)), S = `${f}.${P}`;
    return o && o.end({
      success: !0
    }), S;
  }
  /**
   * Returns the SHA-256 hash of an input string
   * @param plainText
   */
  async hashString(e) {
    return vd(e);
  }
}
oe.POP_KEY_USAGES = ["sign", "verify"];
oe.EXTRACTABLE = !0;
function ro(i) {
  return JSON.stringify(i, Object.keys(i).sort());
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const qr = "acquireTokenSilent", ca = "acquireTokenByCode", Zr = "acquireTokenPopup", ha = "acquireTokenPreRedirect", Lt = "acquireTokenRedirect", ei = "ssoSilent", la = "initializeClientApplication", da = "localStorageUpdated", ua = "loadExternalTokens", Tg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AcquireTokenByCode: ca,
  AcquireTokenPopup: Zr,
  AcquireTokenPreRedirect: ha,
  AcquireTokenRedirect: Lt,
  AcquireTokenSilent: qr,
  InitializeClientApplication: la,
  LoadExternalTokens: ua,
  LocalStorageUpdated: da,
  SsoSilent: ei
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const L = "msal", Sn = "browser", io = "|", B = 2, Ht = 2, du = `${L}.${Sn}.log.level`, uu = `${L}.${Sn}.log.pii`, gu = `${L}.${Sn}.performance.enabled`, fu = `${L}.${Sn}.platform.auth.dom`, oo = `${L}.version`, so = "account.keys", ao = "token.keys";
function Ze(i = Ht) {
  return i < 1 ? `${L}.${so}` : `${L}.${i}.${so}`;
}
function et(i, e = B) {
  return e < 1 ? `${L}.${ao}.${i}` : `${L}.${e}.${ao}.${i}`;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const pu = 1440 * 60 * 1e3, qn = {
  Lax: "Lax",
  None: "None"
};
class ga {
  initialize() {
    return Promise.resolve();
  }
  getItem(e) {
    const t = `${encodeURIComponent(e)}`, n = document.cookie.split(";");
    for (let r = 0; r < n.length; r++) {
      const o = n[r], [s, ...a] = decodeURIComponent(o).trim().split("="), c = a.join("=");
      if (s === t)
        return c;
    }
    return "";
  }
  getUserData() {
    throw p(T);
  }
  setItem(e, t, n, r = !0, o = qn.Lax) {
    let s = `${encodeURIComponent(e)}=${encodeURIComponent(t)};path=/;SameSite=${o};`;
    if (n) {
      const a = mu(n);
      s += `expires=${a};`;
    }
    (r || o === qn.None) && (s += "Secure;"), document.cookie = s;
  }
  async setUserData() {
    return Promise.reject(p(T));
  }
  removeItem(e) {
    this.setItem(e, "", -1);
  }
  getKeys() {
    const e = document.cookie.split(";"), t = [];
    return e.forEach((n) => {
      const r = decodeURIComponent(n).trim().split("=");
      t.push(r[0]);
    }), t;
  }
  containsKey(e) {
    return this.getKeys().includes(e);
  }
  decryptData() {
    return Promise.resolve(null);
  }
}
function mu(i) {
  const e = /* @__PURE__ */ new Date();
  return new Date(e.getTime() + i * pu).toUTCString();
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function _e(i, e) {
  const t = i.getItem(Ze(e));
  return t ? JSON.parse(t) : [];
}
function ce(i, e, t) {
  const n = e.getItem(et(i, t));
  if (n) {
    const r = JSON.parse(n);
    if (r && r.hasOwnProperty("idToken") && r.hasOwnProperty("accessToken") && r.hasOwnProperty("refreshToken"))
      return r;
  }
  return {
    idToken: [],
    accessToken: [],
    refreshToken: []
  };
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Kt(i) {
  return i.hasOwnProperty("id") && i.hasOwnProperty("nonce") && i.hasOwnProperty("data");
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const co = "msal.cache.encryption", yu = "msal.broadcast.cache";
class Cu {
  constructor(e, t, n) {
    if (!window.localStorage)
      throw D(Vr);
    this.memoryStorage = new vn(), this.initialized = !1, this.clientId = e, this.logger = t, this.performanceClient = n, this.broadcast = new BroadcastChannel(yu);
  }
  async initialize(e) {
    const t = new ga(), n = t.getItem(co);
    let r = { key: "", id: "" };
    if (n)
      try {
        r = JSON.parse(n);
      } catch {
      }
    if (r.key && r.id) {
      const o = ie(Pe, tu, this.logger, this.performanceClient, e)(r.key);
      this.encryptionCookie = {
        id: r.id,
        key: await u(Xi, to, this.logger, this.performanceClient, e)(o)
      };
    } else {
      const o = O(), s = await u(Qs, eu, this.logger, this.performanceClient, e)(), a = ie(Me, nu, this.logger, this.performanceClient, e)(new Uint8Array(s));
      this.encryptionCookie = {
        id: o,
        key: await u(Xi, to, this.logger, this.performanceClient, e)(s)
      };
      const c = {
        id: o,
        key: a
      };
      t.setItem(
        co,
        JSON.stringify(c),
        0,
        // Expiration - 0 means cookie will be cleared at the end of the browser session
        !0,
        // Secure flag
        qn.None
        // SameSite must be None to support iframed apps
      );
    }
    await u(this.importExistingCache.bind(this), Qd, this.logger, this.performanceClient, e)(e), this.broadcast.addEventListener("message", (o) => {
      this.updateCache(o, e);
    }), this.initialized = !0;
  }
  getItem(e) {
    return window.localStorage.getItem(e);
  }
  getUserData(e) {
    if (!this.initialized)
      throw m(dt);
    return this.memoryStorage.getItem(e);
  }
  async decryptData(e, t, n) {
    if (!this.initialized || !this.encryptionCookie)
      throw m(dt);
    if (t.id !== this.encryptionCookie.id)
      return this.performanceClient.incrementFields({ encryptedCacheExpiredCount: 1 }, n), null;
    const r = await u(qi, no, this.logger, this.performanceClient, n)(this.encryptionCookie.key, t.nonce, this.getContext(e), t.data);
    if (!r)
      return null;
    try {
      return {
        ...JSON.parse(r),
        lastUpdatedAt: t.lastUpdatedAt
      };
    } catch {
      return this.performanceClient.incrementFields({ encryptedCacheCorruptionCount: 1 }, n), null;
    }
  }
  setItem(e, t) {
    window.localStorage.setItem(e, t);
  }
  async setUserData(e, t, n, r, o) {
    if (!this.initialized || !this.encryptionCookie)
      throw m(dt);
    if (o)
      this.setItem(e, t);
    else {
      const { data: s, nonce: a } = await u(kd, ru, this.logger, this.performanceClient, n)(this.encryptionCookie.key, t, this.getContext(e)), c = {
        id: this.encryptionCookie.id,
        nonce: a,
        data: s,
        lastUpdatedAt: r
      };
      this.setItem(e, JSON.stringify(c));
    }
    this.memoryStorage.setItem(e, t), this.broadcast.postMessage({
      key: e,
      value: t,
      context: this.getContext(e)
    });
  }
  removeItem(e) {
    this.memoryStorage.containsKey(e) && (this.memoryStorage.removeItem(e), this.broadcast.postMessage({
      key: e,
      value: null,
      context: this.getContext(e)
    })), window.localStorage.removeItem(e);
  }
  getKeys() {
    return Object.keys(window.localStorage);
  }
  containsKey(e) {
    return window.localStorage.hasOwnProperty(e);
  }
  /**
   * Removes all known MSAL keys from the cache
   */
  clear() {
    this.memoryStorage.clear(), _e(this).forEach((n) => this.removeItem(n));
    const t = ce(this.clientId, this);
    t.idToken.forEach((n) => this.removeItem(n)), t.accessToken.forEach((n) => this.removeItem(n)), t.refreshToken.forEach((n) => this.removeItem(n)), this.getKeys().forEach((n) => {
      (n.startsWith(L) || n.indexOf(this.clientId) !== -1) && this.removeItem(n);
    });
  }
  /**
   * Helper to decrypt all known MSAL keys in localStorage and save them to inMemory storage
   * @returns
   */
  async importExistingCache(e) {
    if (!this.encryptionCookie)
      return;
    let t = _e(this);
    t = await this.importArray(t, e), t.length ? this.setItem(Ze(), JSON.stringify(t)) : this.removeItem(Ze());
    const n = ce(this.clientId, this);
    n.idToken = await this.importArray(n.idToken, e), n.accessToken = await this.importArray(n.accessToken, e), n.refreshToken = await this.importArray(n.refreshToken, e), n.idToken.length || n.accessToken.length || n.refreshToken.length ? this.setItem(et(this.clientId), JSON.stringify(n)) : this.removeItem(et(this.clientId));
  }
  /**
   * Helper to decrypt and save cache entries
   * @param key
   * @returns
   */
  async getItemFromEncryptedCache(e, t) {
    if (!this.encryptionCookie)
      return null;
    const n = this.getItem(e);
    if (!n)
      return null;
    let r;
    try {
      r = JSON.parse(n);
    } catch {
      return null;
    }
    return Kt(r) ? r.id !== this.encryptionCookie.id ? (this.performanceClient.incrementFields({ encryptedCacheExpiredCount: 1 }, t), null) : (this.performanceClient.incrementFields({ encryptedCacheCount: 1 }, t), u(qi, no, this.logger, this.performanceClient, t)(this.encryptionCookie.key, r.nonce, this.getContext(e), r.data)) : (this.performanceClient.incrementFields({ unencryptedCacheCount: 1 }, t), n);
  }
  /**
   * Helper to decrypt and save an array of cache keys
   * @param arr
   * @returns Array of keys successfully imported
   */
  async importArray(e, t) {
    const n = [], r = [];
    return e.forEach((o) => {
      const s = this.getItemFromEncryptedCache(o, t).then((a) => {
        a ? (this.memoryStorage.setItem(o, a), n.push(o)) : this.removeItem(o);
      });
      r.push(s);
    }), await Promise.all(r), n;
  }
  /**
   * Gets encryption context for a given cache entry. This is clientId for app specific entries, empty string for shared entries
   * @param key
   * @returns
   */
  getContext(e) {
    let t = "";
    return e.includes(this.clientId) && (t = this.clientId), t;
  }
  updateCache(e, t) {
    this.logger.trace("17cxcm", t);
    const n = this.performanceClient.startMeasurement(da);
    n.add({ isBackground: !0 });
    const { key: r, value: o, context: s } = e.data;
    if (!r) {
      this.logger.error("0e10qr", t), n.end({ success: !1, errorCode: "noKey" });
      return;
    }
    if (s && s !== this.clientId) {
      this.logger.trace("04rtdy", t), n.end({
        success: !1,
        errorCode: "contextMismatch"
      });
      return;
    }
    o ? (this.memoryStorage.setItem(r, o), this.logger.verbose("1vzsgt", t)) : (this.memoryStorage.removeItem(r), this.logger.verbose("04ypih", t)), n.end({ success: !0 });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class wu {
  constructor() {
    if (!window.sessionStorage)
      throw D(Vr);
  }
  async initialize() {
  }
  getItem(e) {
    return window.sessionStorage.getItem(e);
  }
  getUserData(e) {
    return this.getItem(e);
  }
  setItem(e, t) {
    window.sessionStorage.setItem(e, t);
  }
  async setUserData(e, t) {
    this.setItem(e, t);
  }
  removeItem(e) {
    window.sessionStorage.removeItem(e);
  }
  getKeys() {
    return Object.keys(window.sessionStorage);
  }
  containsKey(e) {
    return window.sessionStorage.hasOwnProperty(e);
  }
  decryptData() {
    return Promise.resolve(null);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const y = {
  INITIALIZE_START: "msal:initializeStart",
  INITIALIZE_END: "msal:initializeEnd",
  ACTIVE_ACCOUNT_CHANGED: "msal:activeAccountChanged",
  LOGIN_SUCCESS: "msal:loginSuccess",
  ACQUIRE_TOKEN_START: "msal:acquireTokenStart",
  BROKERED_REQUEST_START: "msal:brokeredRequestStart",
  ACQUIRE_TOKEN_SUCCESS: "msal:acquireTokenSuccess",
  BROKERED_REQUEST_SUCCESS: "msal:brokeredRequestSuccess",
  ACQUIRE_TOKEN_FAILURE: "msal:acquireTokenFailure",
  BROKERED_REQUEST_FAILURE: "msal:brokeredRequestFailure",
  ACQUIRE_TOKEN_NETWORK_START: "msal:acquireTokenFromNetworkStart",
  HANDLE_REDIRECT_START: "msal:handleRedirectStart",
  HANDLE_REDIRECT_END: "msal:handleRedirectEnd",
  POPUP_OPENED: "msal:popupOpened",
  LOGOUT_START: "msal:logoutStart",
  LOGOUT_SUCCESS: "msal:logoutSuccess",
  LOGOUT_FAILURE: "msal:logoutFailure",
  LOGOUT_END: "msal:logoutEnd",
  RESTORE_FROM_BFCACHE: "msal:restoreFromBFCache",
  BROKER_CONNECTION_ESTABLISHED: "msal:brokerConnectionEstablished"
};
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const It = "@azure/msal-browser", se = "5.0.2";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Se(i, e) {
  const t = i.indexOf(e);
  t > -1 && i.splice(t, 1);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Tt extends Vn {
  constructor(e, t, n, r, o, s, a) {
    super(e, n, r, o, a), this.cacheConfig = t, this.logger = r, this.internalStorage = new vn(), this.browserStorage = ho(e, t.cacheLocation, r, o), this.temporaryCacheStorage = ho(e, q.SessionStorage, r, o), this.cookieStorage = new ga(), this.eventHandler = s;
  }
  async initialize(e) {
    this.performanceClient.addFields({
      cacheLocation: this.cacheConfig.cacheLocation,
      cacheRetentionDays: this.cacheConfig.cacheRetentionDays
    }, e), await this.browserStorage.initialize(e), await this.migrateExistingCache(e), this.trackVersionChanges(e);
  }
  /**
   * Migrates any existing cache data from previous versions of MSAL.js into the current cache structure.
   */
  async migrateExistingCache(e) {
    let t = _e(this.browserStorage), n = ce(this.clientId, this.browserStorage);
    this.performanceClient.addFields({
      preMigrateAcntCount: t.length,
      preMigrateATCount: n.accessToken.length,
      preMigrateITCount: n.idToken.length,
      preMigrateRTCount: n.refreshToken.length
    }, e);
    for (let o = 0; o < Ht; o++) {
      const s = o;
      await this.removeStaleAccounts(o, s, e);
    }
    for (let o = 0; o < B; o++) {
      const s = o;
      await this.migrateIdTokens(o, s, e);
    }
    const r = this.getKMSIValues();
    for (let o = 0; o < B; o++)
      await this.migrateAccessTokens(o, r, e), await this.migrateRefreshTokens(o, r, e);
    t = _e(this.browserStorage), n = ce(this.clientId, this.browserStorage), this.performanceClient.addFields({
      postMigrateAcntCount: t.length,
      postMigrateATCount: n.accessToken.length,
      postMigrateITCount: n.idToken.length,
      postMigrateRTCount: n.refreshToken.length
    }, e);
  }
  /**
   * Parses entry, adds lastUpdatedAt if it doesn't exist, removes entry if expired or invalid
   * @param key
   * @param correlationId
   * @returns
   */
  async updateOldEntry(e, t) {
    const n = this.browserStorage.getItem(e), r = this.validateAndParseJson(n || "");
    if (!r)
      return this.browserStorage.removeItem(e), null;
    if (!r.lastUpdatedAt)
      r.lastUpdatedAt = Date.now().toString(), this.setItem(e, JSON.stringify(r), t);
    else if (Ki(r.lastUpdatedAt, this.cacheConfig.cacheRetentionDays))
      return this.browserStorage.removeItem(e), this.performanceClient.incrementFields({ expiredCacheRemovedCount: 1 }, t), null;
    const o = Kt(r) ? await this.browserStorage.decryptData(e, r, t) : r;
    return !o || !gn(o) ? (this.performanceClient.incrementFields({ invalidCacheCount: 1 }, t), null) : (zi(o) || ji(o)) && o.expiresOn && mt(o.expiresOn, To) ? (this.browserStorage.removeItem(e), this.performanceClient.incrementFields({ expiredCacheRemovedCount: 1 }, t), null) : o;
  }
  /**
   * Remove accounts from the cache for older schema versions if they have not been updated in the last cacheRetentionDays
   * @param accountSchema
   * @param credentialSchema
   * @param correlationId
   * @returns
   */
  async removeStaleAccounts(e, t, n) {
    const r = _e(this.browserStorage, e);
    if (r.length !== 0) {
      for (const o of [...r]) {
        this.performanceClient.incrementFields({ oldAcntCount: 1 }, n);
        const s = this.browserStorage.getItem(o), a = this.validateAndParseJson(s || "");
        if (!a) {
          Se(r, o);
          continue;
        }
        if (a.lastUpdatedAt)
          Ki(a.lastUpdatedAt, this.cacheConfig.cacheRetentionDays) && (await this.removeAccountOldSchema(o, a, t, n), Se(r, o));
        else {
          a.lastUpdatedAt = Date.now().toString(), this.setItem(o, JSON.stringify(a), n);
          continue;
        }
      }
      this.setAccountKeys(r, n, e);
    }
  }
  /**
   * Remove the given account and all associated tokens from the cache
   * @param accountKey
   * @param rawObject
   * @param credentialSchema
   * @param correlationId
   */
  async removeAccountOldSchema(e, t, n, r) {
    const o = Kt(t) ? await this.browserStorage.decryptData(e, t, r) : t, s = o == null ? void 0 : o.homeAccountId;
    if (s) {
      const a = this.getTokenKeys(n);
      [...a.idToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), Se(a.idToken, c);
      }), [...a.accessToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), Se(a.accessToken, c);
      }), [...a.refreshToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), Se(a.refreshToken, c);
      }), this.setTokenKeys(a, r, n);
    }
    this.performanceClient.incrementFields({ expiredAcntRemovedCount: 1 }, r), this.browserStorage.removeItem(e);
  }
  /**
   * Gets key value pair mapping homeAccountId to KMSI value
   * @returns
   */
  getKMSIValues() {
    const e = {}, t = this.getTokenKeys().idToken;
    for (const n of t) {
      const r = this.browserStorage.getUserData(n);
      if (r) {
        const o = JSON.parse(r), s = re(o.secret, j);
        s && (e[o.homeAccountId] = de(s));
      }
    }
    return e;
  }
  /**
   * Migrates id tokens from the old schema to the new schema, also migrates associated account object if it doesn't already exist in the new schema
   * @param credentialSchema
   * @param accountSchema
   * @param correlationId
   * @returns
   */
  async migrateIdTokens(e, t, n) {
    const r = ce(this.clientId, this.browserStorage, e);
    if (r.idToken.length === 0)
      return;
    const o = ce(this.clientId, this.browserStorage, B), s = _e(this.browserStorage), a = _e(this.browserStorage, t);
    for (const c of [...r.idToken]) {
      this.performanceClient.incrementFields({ oldITCount: 1 }, n);
      const h = await this.updateOldEntry(c, n);
      if (!h) {
        Se(r.idToken, c);
        continue;
      }
      const l = s.find((S) => S.includes(h.homeAccountId)), d = a.find((S) => S.includes(h.homeAccountId));
      let g = null;
      if (l)
        g = this.getAccount(l, n);
      else if (d) {
        const S = this.browserStorage.getItem(d), N = this.validateAndParseJson(S || "");
        g = N && Kt(N) ? await this.browserStorage.decryptData(d, N, n) : N;
      }
      if (!g) {
        this.performanceClient.incrementFields({ skipITMigrateCount: 1 }, n);
        continue;
      }
      const f = re(h.secret, j), w = this.generateCredentialKey(h), I = this.getIdTokenCredential(w, n), A = Object.keys(f).includes("signin_state"), P = I && Object.keys(re(I.secret, j) || {}).includes("signin_state");
      if (!I || h.lastUpdatedAt > I.lastUpdatedAt && (A || !P)) {
        const S = g.tenantProfiles || [], N = wr(f) || g.realm;
        if (N && !S.find((ve) => ve.tenantId === N)) {
          const ve = vt(g.homeAccountId, g.localAccountId, N, f);
          S.push(ve);
        }
        g.tenantProfiles = S;
        const ee = this.generateAccountKey(me(g)), ke = de(f);
        await this.setUserData(ee, JSON.stringify(g), n, g.lastUpdatedAt, ke), s.includes(ee) || s.push(ee), await this.setUserData(w, JSON.stringify(h), n, h.lastUpdatedAt, ke), this.performanceClient.incrementFields({ migratedITCount: 1 }, n), o.idToken.push(w);
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(o, n), this.setAccountKeys(s, n);
  }
  /**
   * Migrates access tokens from old cache schema to current schema
   * @param credentialSchema
   * @param kmsiMap
   * @param correlationId
   * @returns
   */
  async migrateAccessTokens(e, t, n) {
    const r = ce(this.clientId, this.browserStorage, e);
    if (r.accessToken.length === 0)
      return;
    const o = ce(this.clientId, this.browserStorage, B);
    for (const s of [...r.accessToken]) {
      this.performanceClient.incrementFields({ oldATCount: 1 }, n);
      const a = await this.updateOldEntry(s, n);
      if (!a) {
        Se(r.accessToken, s);
        continue;
      }
      if (!(a.homeAccountId in t)) {
        this.performanceClient.incrementFields({ skipATMigrateCount: 1 }, n);
        continue;
      }
      const c = this.generateCredentialKey(a), h = t[a.homeAccountId];
      if (!o.accessToken.includes(c))
        await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedATCount: 1 }, n), o.accessToken.push(c);
      else {
        const l = this.getAccessTokenCredential(c, n);
        (!l || a.lastUpdatedAt > l.lastUpdatedAt) && (await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedATCount: 1 }, n));
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(o, n);
  }
  /**
   * Migrates refresh tokens from old cache schema to current schema
   * @param credentialSchema
   * @param kmsiMap
   * @param correlationId
   * @returns
   */
  async migrateRefreshTokens(e, t, n) {
    const r = ce(this.clientId, this.browserStorage, e);
    if (r.refreshToken.length === 0)
      return;
    const o = ce(this.clientId, this.browserStorage, B);
    for (const s of [
      ...r.refreshToken
    ]) {
      this.performanceClient.incrementFields({ oldRTCount: 1 }, n);
      const a = await this.updateOldEntry(s, n);
      if (!a) {
        Se(r.refreshToken, s);
        continue;
      }
      if (!(a.homeAccountId in t)) {
        this.performanceClient.incrementFields({ skipRTMigrateCount: 1 }, n);
        continue;
      }
      const c = this.generateCredentialKey(a), h = t[a.homeAccountId];
      if (!o.refreshToken.includes(c))
        await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedRTCount: 1 }, n), o.refreshToken.push(c);
      else {
        const l = this.getRefreshTokenCredential(c, n);
        (!l || a.lastUpdatedAt > l.lastUpdatedAt) && (await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedRTCount: 1 }, n));
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(o, n);
  }
  /**
   * Tracks upgrades and downgrades for telemetry and debugging purposes
   */
  trackVersionChanges(e) {
    const t = this.browserStorage.getItem(oo);
    t && (this.logger.info("1wuc87", e), this.performanceClient.addFields({ previousLibraryVersion: t }, e)), t !== se && this.setItem(oo, se, e);
  }
  /**
   * Parses passed value as JSON object, JSON.parse() will throw an error.
   * @param input
   */
  validateAndParseJson(e) {
    if (!e)
      return null;
    try {
      const t = JSON.parse(e);
      return t && typeof t == "object" ? t : null;
    } catch {
      return null;
    }
  }
  /**
   * Helper to setItem in browser storage, with cleanup in case of quota errors
   * @param key
   * @param value
   */
  setItem(e, t, n) {
    const r = new Array(B + 1).fill(0), o = [], s = 20;
    for (let a = 0; a <= s; a++)
      try {
        if (this.browserStorage.setItem(e, t), a > 0)
          for (let c = 0; c <= B; c++) {
            const h = r.slice(0, c).reduce((d, g) => d + g, 0);
            if (h >= a)
              break;
            const l = a > h + r[c] ? h + r[c] : a;
            a > h && r[c] > 0 && this.removeAccessTokenKeys(o.slice(h, l), n, c);
          }
        break;
      } catch (c) {
        const h = Gn(c);
        if (h.errorCode === jn && a < s) {
          if (!o.length)
            for (let l = 0; l <= B; l++)
              if (e === et(this.clientId, l)) {
                const d = JSON.parse(t).accessToken;
                o.push(...d), r[l] = d.length;
              } else {
                const d = this.getTokenKeys(l).accessToken;
                o.push(...d), r[l] = d.length;
              }
          if (o.length <= a)
            throw h;
          this.removeAccessToken(
            o[a],
            n,
            !1
            // Don't save token keys yet, do it at the end
          );
        } else
          throw h;
      }
  }
  /**
   * Helper to setUserData in browser storage, with cleanup in case of quota errors
   * @param key
   * @param value
   * @param correlationId
   */
  async setUserData(e, t, n, r, o) {
    const s = new Array(B + 1).fill(0), a = [], c = 20;
    for (let h = 0; h <= c; h++)
      try {
        if (await u(this.browserStorage.setUserData.bind(this.browserStorage), vl, this.logger, this.performanceClient, n)(e, t, n, r, o), h > 0)
          for (let l = 0; l <= B; l++) {
            const d = s.slice(0, l).reduce((f, w) => f + w, 0);
            if (d >= h)
              break;
            const g = h > d + s[l] ? d + s[l] : h;
            h > d && s[l] > 0 && this.removeAccessTokenKeys(a.slice(d, g), n, l);
          }
        break;
      } catch (l) {
        const d = Gn(l);
        if (d.errorCode === jn && h < c) {
          if (!a.length)
            for (let g = 0; g <= B; g++) {
              const f = this.getTokenKeys(g).accessToken;
              a.push(...f), s[g] = f.length;
            }
          if (a.length <= h)
            throw d;
          this.removeAccessToken(
            a[h],
            n,
            !1
            // Don't save token keys yet, do it at the end
          );
        } else
          throw d;
      }
  }
  /**
   * Reads account from cache, deserializes it into an account entity and returns it.
   * If account is not found from the key, returns null and removes key from map.
   * @param accountKey
   * @returns
   */
  getAccount(e, t) {
    this.logger.trace("1lfvm6", t);
    const n = this.browserStorage.getUserData(e);
    if (!n)
      return this.removeAccountKeyFromMap(e, t), null;
    const r = this.validateAndParseJson(n);
    return !r || !Yh(r) ? null : Vn.toObject({}, r);
  }
  /**
   * set account entity in the platform cache
   * @param account
   */
  async setAccount(e, t, n) {
    this.logger.trace("1bz3wr", t);
    const r = this.generateAccountKey(me(e)), o = Date.now().toString();
    e.lastUpdatedAt = o, await this.setUserData(r, JSON.stringify(e), t, o, n), this.addAccountKeyToMap(r, t), this.performanceClient.addFields({ kmsi: n }, t);
  }
  setAccountKeys(e, t, n = Ht) {
    e.length === 0 ? this.removeItem(Ze(n)) : this.setItem(Ze(n), JSON.stringify(e), t);
  }
  /**
   * Returns the array of account keys currently cached
   * @returns
   */
  getAccountKeys() {
    return _e(this.browserStorage);
  }
  /**
   * Add a new account to the key map
   * @param key
   */
  addAccountKeyToMap(e, t) {
    this.logger.trace("0rb85k", t), this.logger.tracePii("1l9bdo", t);
    const n = this.getAccountKeys();
    return n.indexOf(e) === -1 ? (n.push(e), this.setItem(Ze(), JSON.stringify(n), t), this.logger.verbose("0xia39", t), !0) : (this.logger.verbose("0161kk", t), !1);
  }
  /**
   * Remove an account from the key map
   * @param key
   */
  removeAccountKeyFromMap(e, t) {
    this.logger.trace("1jpigu", t), this.logger.tracePii("1xzspl", t);
    const n = this.getAccountKeys(), r = n.indexOf(e);
    r > -1 ? (n.splice(r, 1), this.setAccountKeys(n, t)) : this.logger.trace("1dytu2", t);
  }
  /**
   * Extends inherited removeAccount function to include removal of the account key from the map
   * @param key
   */
  removeAccount(e, t) {
    const n = this.getActiveAccount(t);
    (n == null ? void 0 : n.homeAccountId) === e.homeAccountId && (n == null ? void 0 : n.environment) === e.environment && this.setActiveAccount(null, t), super.removeAccount(e, t), this.removeAccountKeyFromMap(this.generateAccountKey(e), t), this.browserStorage.getKeys().forEach((r) => {
      r.includes(e.homeAccountId) && r.includes(e.environment) && this.browserStorage.removeItem(r);
    });
  }
  /**
   * Removes given idToken from the cache and from the key map
   * @param key
   */
  removeIdToken(e, t) {
    super.removeIdToken(e, t);
    const n = this.getTokenKeys(), r = n.idToken.indexOf(e);
    r > -1 && (this.logger.info("05udv9", t), n.idToken.splice(r, 1), this.setTokenKeys(n, t));
  }
  /**
   * Removes given accessToken from the cache and from the key map
   * @param key
   */
  removeAccessToken(e, t, n = !0) {
    super.removeAccessToken(e, t), n && this.removeAccessTokenKeys([e], t);
  }
  /**
   * Remove access token key from the key map
   * @param key
   * @param correlationId
   * @param tokenKeys
   */
  removeAccessTokenKeys(e, t, n = B) {
    this.logger.trace("17o18n", t);
    const r = this.getTokenKeys(n);
    let o = 0;
    if (e.forEach((s) => {
      const a = r.accessToken.indexOf(s);
      a > -1 && (r.accessToken.splice(a, 1), o++);
    }), o > 0) {
      this.logger.info("15i5d5", t), this.setTokenKeys(r, t, n);
      return;
    }
  }
  /**
   * Removes given refreshToken from the cache and from the key map
   * @param key
   */
  removeRefreshToken(e, t) {
    super.removeRefreshToken(e, t);
    const n = this.getTokenKeys(), r = n.refreshToken.indexOf(e);
    r > -1 && (this.logger.info("1f4fq3", t), n.refreshToken.splice(r, 1), this.setTokenKeys(n, t));
  }
  /**
   * Gets the keys for the cached tokens associated with this clientId
   * @returns
   */
  getTokenKeys(e = B) {
    return ce(this.clientId, this.browserStorage, e);
  }
  /**
   * Sets the token keys in the cache
   * @param tokenKeys
   * @param correlationId
   * @returns
   */
  setTokenKeys(e, t, n = B) {
    if (e.idToken.length === 0 && e.accessToken.length === 0 && e.refreshToken.length === 0) {
      this.removeItem(et(this.clientId, n));
      return;
    } else
      this.setItem(et(this.clientId, n), JSON.stringify(e), t);
  }
  /**
   * generates idToken entity from a string
   * @param idTokenKey
   */
  getIdTokenCredential(e, t) {
    const n = this.browserStorage.getUserData(e);
    if (!n)
      return this.logger.trace("1jukz6", t), this.removeIdToken(e, t), null;
    const r = this.validateAndParseJson(n);
    return !r || !_l(r) ? (this.logger.trace("1jukz6", t), null) : (this.logger.trace("01ju66", t), r);
  }
  /**
   * set IdToken credential to the platform cache
   * @param idToken
   */
  async setIdTokenCredential(e, t, n) {
    this.logger.trace("13hjll", t);
    const r = this.generateCredentialKey(e), o = Date.now().toString();
    e.lastUpdatedAt = o, await this.setUserData(r, JSON.stringify(e), t, o, n);
    const s = this.getTokenKeys();
    s.idToken.indexOf(r) === -1 && (this.logger.info("07jy92", t), s.idToken.push(r), this.setTokenKeys(s, t));
  }
  /**
   * generates accessToken entity from a string
   * @param key
   */
  getAccessTokenCredential(e, t) {
    const n = this.browserStorage.getUserData(e);
    if (!n)
      return this.logger.trace("0bqvx8", t), this.removeAccessTokenKeys([e], t), null;
    const r = this.validateAndParseJson(n);
    return !r || !zi(r) ? (this.logger.trace("0bqvx8", t), null) : (this.logger.trace("1o81rl", t), r);
  }
  /**
   * set accessToken credential to the platform cache
   * @param accessToken
   */
  async setAccessTokenCredential(e, t, n) {
    this.logger.trace("1pondb", t);
    const r = this.generateCredentialKey(e), o = Date.now().toString();
    e.lastUpdatedAt = o, await this.setUserData(r, JSON.stringify(e), t, o, n);
    const s = this.getTokenKeys(), a = s.accessToken.indexOf(r);
    a !== -1 && s.accessToken.splice(a, 1), this.logger.trace("1onhey", t), s.accessToken.push(r), this.setTokenKeys(s, t);
  }
  /**
   * generates refreshToken entity from a string
   * @param refreshTokenKey
   */
  getRefreshTokenCredential(e, t) {
    const n = this.browserStorage.getUserData(e);
    if (!n)
      return this.logger.trace("0jlizt", t), this.removeRefreshToken(e, t), null;
    const r = this.validateAndParseJson(n);
    return !r || !ji(r) ? (this.logger.trace("0jlizt", t), null) : (this.logger.trace("0nokxi", t), r);
  }
  /**
   * set refreshToken credential to the platform cache
   * @param refreshToken
   */
  async setRefreshTokenCredential(e, t, n) {
    this.logger.trace("0tcg8d", t);
    const r = this.generateCredentialKey(e), o = Date.now().toString();
    e.lastUpdatedAt = o, await this.setUserData(r, JSON.stringify(e), t, o, n);
    const s = this.getTokenKeys();
    s.refreshToken.indexOf(r) === -1 && (this.logger.info("0eckjs", t), s.refreshToken.push(r), this.setTokenKeys(s, t));
  }
  /**
   * fetch appMetadata entity from the platform cache
   * @param appMetadataKey
   * @param correlationId
   */
  getAppMetadata(e, t) {
    const n = this.browserStorage.getItem(e);
    if (!n)
      return this.logger.trace("1q101h", t), null;
    const r = this.validateAndParseJson(n);
    return !r || !Nl(e, r) ? (this.logger.trace("1q101h", t), null) : (this.logger.trace("19pvg2", t), r);
  }
  /**
   * set appMetadata entity to the platform cache
   * @param appMetadata
   * @param correlationId
   */
  setAppMetadata(e, t) {
    this.logger.trace("0cyma6", t);
    const n = Pl(e);
    this.setItem(n, JSON.stringify(e), t);
  }
  /**
   * fetch server telemetry entity from the platform cache
   * @param serverTelemetryKey
   * @param correlationId
   */
  getServerTelemetry(e, t) {
    const n = this.browserStorage.getItem(e);
    if (!n)
      return this.logger.trace("0jk19c", t), null;
    const r = this.validateAndParseJson(n);
    return !r || !Rl(e, r) ? (this.logger.trace("0jk19c", t), null) : (this.logger.trace("12jguk", t), r);
  }
  /**
   * set server telemetry entity to the platform cache
   * @param serverTelemetryKey
   * @param serverTelemetry
   */
  setServerTelemetry(e, t, n) {
    this.logger.trace("1poh61", n), this.setItem(e, JSON.stringify(t), n);
  }
  /**
   *
   */
  getAuthorityMetadata(e, t) {
    const n = this.internalStorage.getItem(e);
    if (!n)
      return this.logger.trace("1r39oe", t), null;
    const r = this.validateAndParseJson(n);
    return r && Ml(e, r) ? (this.logger.trace("1ohvk3", t), r) : null;
  }
  /**
   *
   */
  getAuthorityMetadataKeys() {
    return this.internalStorage.getKeys().filter((t) => this.isAuthorityMetadata(t));
  }
  /**
   * Sets wrapper metadata in memory
   * @param wrapperSKU
   * @param wrapperVersion
   */
  setWrapperMetadata(e, t) {
    this.internalStorage.setItem(Mt.WRAPPER_SKU, e), this.internalStorage.setItem(Mt.WRAPPER_VER, t);
  }
  /**
   * Returns wrapper metadata from in-memory storage
   */
  getWrapperMetadata() {
    const e = this.internalStorage.getItem(Mt.WRAPPER_SKU) || "", t = this.internalStorage.getItem(Mt.WRAPPER_VER) || "";
    return [e, t];
  }
  /**
   *
   * @param key
   * @param entity
   * @param correlationId
   */
  setAuthorityMetadata(e, t, n) {
    this.logger.trace("07w8n2", n), this.internalStorage.setItem(e, JSON.stringify(t));
  }
  /**
   * Gets the active account
   */
  getActiveAccount(e) {
    const t = this.generateCacheKey(bi.ACTIVE_ACCOUNT_FILTERS), n = this.browserStorage.getItem(t);
    if (!n)
      return this.logger.trace("08gw0e", e), null;
    const r = this.validateAndParseJson(n);
    return r ? (this.logger.trace("1t3ch7", e), this.getAccountInfoFilteredBy({
      homeAccountId: r.homeAccountId,
      localAccountId: r.localAccountId,
      tenantId: r.tenantId
    }, e)) : (this.logger.trace("0me1up", e), null);
  }
  /**
   * Sets the active account's localAccountId in cache
   * @param account
   */
  setActiveAccount(e, t) {
    const n = this.generateCacheKey(bi.ACTIVE_ACCOUNT_FILTERS);
    if (e) {
      this.logger.verbose("0rsj80", t);
      const r = {
        homeAccountId: e.homeAccountId,
        localAccountId: e.localAccountId,
        tenantId: e.tenantId
      };
      this.setItem(n, JSON.stringify(r), t);
    } else
      this.logger.verbose("1bp5z5", t), this.browserStorage.removeItem(n);
    this.eventHandler.emitEvent(y.ACTIVE_ACCOUNT_CHANGED);
  }
  /**
   * fetch throttling entity from the platform cache
   * @param throttlingCacheKey
   * @param correlationId
   */
  getThrottlingCache(e, t) {
    const n = this.browserStorage.getItem(e);
    if (!n)
      return this.logger.trace("1h4wa6", t), null;
    const r = this.validateAndParseJson(n);
    return !r || !Ol(e, r) ? (this.logger.trace("1h4wa6", t), null) : (this.logger.trace("0of6n8", t), r);
  }
  /**
   * set throttling entity to the platform cache
   * @param throttlingCacheKey
   * @param throttlingCache
   */
  setThrottlingCache(e, t, n) {
    this.logger.trace("0wfgh6", n), this.setItem(e, JSON.stringify(t), n);
  }
  /**
   * Gets cache item with given key.
   * @param cacheKey
   * @param correlationId
   * @param generateKey
   */
  getTemporaryCache(e, t, n) {
    const r = n ? this.generateCacheKey(e) : e, o = this.temporaryCacheStorage.getItem(r);
    if (!o) {
      if (this.cacheConfig.cacheLocation === q.LocalStorage) {
        const s = this.browserStorage.getItem(r);
        if (s)
          return this.logger.trace("1yt61y", t), s;
      }
      return this.logger.trace("1qhy81", t), null;
    }
    return o;
  }
  /**
   * Sets the cache item with the key and value given.
   * @param key
   * @param value
   */
  setTemporaryCache(e, t, n) {
    const r = n ? this.generateCacheKey(e) : e;
    this.temporaryCacheStorage.setItem(r, t);
  }
  /**
   * Removes the cache item with the given key.
   * @param key
   */
  removeItem(e) {
    this.browserStorage.removeItem(e);
  }
  /**
   * Removes the temporary cache item with the given key.
   * @param key
   */
  removeTemporaryItem(e) {
    this.temporaryCacheStorage.removeItem(e);
  }
  /**
   * Gets all keys in window.
   */
  getKeys() {
    return this.browserStorage.getKeys();
  }
  /**
   * Clears all cache entries created by MSAL.
   */
  clear(e) {
    this.removeAllAccounts(e), this.removeAppMetadata(e), this.temporaryCacheStorage.getKeys().forEach((t) => {
      (t.indexOf(L) !== -1 || t.indexOf(this.clientId) !== -1) && this.removeTemporaryItem(t);
    }), this.browserStorage.getKeys().forEach((t) => {
      (t.indexOf(L) !== -1 || t.indexOf(this.clientId) !== -1) && this.browserStorage.removeItem(t);
    }), this.internalStorage.clear();
  }
  /**
   * Prepend msal.<client-id> to each key
   * @param key
   * @param addInstanceId
   */
  generateCacheKey(e) {
    return fe.startsWith(e, L) ? e : `${L}.${this.clientId}.${e}`;
  }
  /**
   * Cache Key: msal.<schema_version>-<home_account_id>-<environment>-<credential_type>-<client_id or familyId>-<realm>-<scopes>-<claims hash>-<scheme>
   * IdToken Example: uid.utid-login.microsoftonline.com-idtoken-app_client_id-contoso.com
   * AccessToken Example: uid.utid-login.microsoftonline.com-accesstoken-app_client_id-contoso.com-scope1 scope2--pop
   * RefreshToken Example: uid.utid-login.microsoftonline.com-refreshtoken-1-contoso.com
   * @param credentialEntity
   * @returns
   */
  generateCredentialKey(e) {
    const t = e.credentialType === H.REFRESH_TOKEN && e.familyId || e.clientId, n = e.tokenType && e.tokenType.toLowerCase() !== E.BEARER.toLowerCase() ? e.tokenType.toLowerCase() : "";
    return [
      `${L}.${B}`,
      e.homeAccountId,
      e.environment,
      e.credentialType,
      t,
      e.realm || "",
      e.target || "",
      n
    ].join(io).toLowerCase();
  }
  /**
   * Cache Key: msal.<schema_version>.<home_account_id>.<environment>.<tenant_id>
   * @param account
   * @returns
   */
  generateAccountKey(e) {
    const t = e.homeAccountId.split(".")[1];
    return [
      `${L}.${Ht}`,
      e.homeAccountId,
      e.environment,
      t || e.tenantId || ""
    ].join(io).toLowerCase();
  }
  /**
   * Reset all temporary cache items
   * @param correlationId
   */
  resetRequestCache(e) {
    this.logger.trace("0h0ynu", e), this.removeTemporaryItem(this.generateCacheKey(M.REQUEST_PARAMS)), this.removeTemporaryItem(this.generateCacheKey(M.VERIFIER)), this.removeTemporaryItem(this.generateCacheKey(M.ORIGIN_URI)), this.removeTemporaryItem(this.generateCacheKey(M.URL_HASH)), this.removeTemporaryItem(this.generateCacheKey(M.NATIVE_REQUEST)), this.setInteractionInProgress(!1, void 0);
  }
  cacheAuthorizeRequest(e, t, n) {
    this.logger.trace("1tzef5", t);
    const r = Ct(JSON.stringify(e));
    if (this.setTemporaryCache(M.REQUEST_PARAMS, r, !0), n) {
      const o = Ct(n);
      this.setTemporaryCache(M.VERIFIER, o, !0);
    }
  }
  /**
   * Gets the token exchange parameters from the cache. Throws an error if nothing is found.
   * @param correlationId
   */
  getCachedRequest(e) {
    this.logger.trace("0uen20", e);
    const t = this.getTemporaryCache(M.REQUEST_PARAMS, e, !0);
    if (!t)
      throw m(Rs);
    const n = this.getTemporaryCache(M.VERIFIER, e, !0);
    let r, o = "";
    try {
      r = JSON.parse(j(t)), n && (o = j(n));
    } catch {
      throw this.logger.errorPii("0ewsey", e), this.logger.error("0tvdic", e), m(Os);
    }
    return [r, o];
  }
  /**
   * Gets cached native request for redirect flows
   * @param correlationId
   */
  getCachedNativeRequest() {
    this.logger.trace("1yxcdm", "");
    const e = this.getTemporaryCache(M.NATIVE_REQUEST, "", !0);
    if (!e)
      return this.logger.trace("0mnxd4", ""), null;
    const t = this.validateAndParseJson(e);
    return t || (this.logger.error("0rrkip", ""), null);
  }
  isInteractionInProgress(e) {
    var n;
    const t = (n = this.getInteractionInProgress()) == null ? void 0 : n.clientId;
    return e ? t === this.clientId : !!t;
  }
  getInteractionInProgress() {
    const e = `${L}.${M.INTERACTION_STATUS_KEY}`, t = this.getTemporaryCache(e, "", !1);
    try {
      return t ? JSON.parse(t) : null;
    } catch {
      return this.logger.error("0jjyys", ""), this.removeTemporaryItem(e), this.resetRequestCache(""), $r(window), null;
    }
  }
  setInteractionInProgress(e, t = Re.SIGNIN, n = !1, r = "") {
    var s;
    const o = `${L}.${M.INTERACTION_STATUS_KEY}`;
    if (e) {
      if (this.getInteractionInProgress())
        if (n)
          this.logger.warning("1pmscr", r), ta(this.logger, r), this.removeTemporaryItem(o);
        else
          throw m(Is);
      this.setTemporaryCache(o, JSON.stringify({ clientId: this.clientId, type: t }), !1);
    } else !e && ((s = this.getInteractionInProgress()) == null ? void 0 : s.clientId) === this.clientId && this.removeTemporaryItem(o);
  }
  /**
   * Builds credential entities from AuthenticationResult object and saves the resulting credentials to the cache
   * @param result
   * @param request
   */
  async hydrateCache(e, t) {
    var s, a, c;
    const n = dn((s = e.account) == null ? void 0 : s.homeAccountId, (a = e.account) == null ? void 0 : a.environment, e.idToken, this.clientId, e.tenantId), r = un(
      (c = e.account) == null ? void 0 : c.homeAccountId,
      e.account.environment,
      e.accessToken,
      this.clientId,
      e.tenantId,
      e.scopes.join(" "),
      // Access token expiresOn stored in seconds, converting from AuthenticationResult expiresOn stored as Date
      e.expiresOn ? Hi(e.expiresOn) : 0,
      e.extExpiresOn ? Hi(e.extExpiresOn) : 0,
      j,
      void 0,
      // refreshOn
      e.tokenType,
      void 0,
      // userAssertionHash
      t.sshKid
    ), o = {
      idToken: n,
      accessToken: r
    };
    return this.saveCacheRecord(o, e.correlationId, de(re(e.idToken, j)));
  }
  /**
   * saves a cache record
   * @param cacheRecord {CacheRecord}
   * @param storeInCache {?StoreInCache}
   * @param correlationId {?string} correlation id
   */
  async saveCacheRecord(e, t, n, r) {
    try {
      await super.saveCacheRecord(e, t, n, r);
    } catch (o) {
      if (o instanceof He && this.performanceClient && t)
        try {
          const s = this.getTokenKeys();
          this.performanceClient.addFields({
            cacheRtCount: s.refreshToken.length,
            cacheIdCount: s.idToken.length,
            cacheAtCount: s.accessToken.length
          }, t);
        } catch {
        }
      throw o;
    }
  }
}
function ho(i, e, t, n) {
  try {
    switch (e) {
      case q.LocalStorage:
        return new Cu(i, t, n);
      case q.SessionStorage:
        return new wu();
      case q.MemoryStorage:
      default:
        break;
    }
  } catch (r) {
    t.error(r, "");
  }
  return new vn();
}
const fa = (i, e, t, n) => {
  const r = {
    cacheLocation: q.MemoryStorage,
    cacheRetentionDays: 5
  };
  return new Tt(i, r, pt, e, t, n);
};
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function pa(i, e, t, n, r) {
  return i.verbose("1yd030", n), t ? e.getAllAccounts(r, n) : [];
}
function Zn(i, e, t, n) {
  if (e.trace("0u7b90", n), Object.keys(i).length === 0)
    return e.warning("1kz0cu", n), null;
  const r = t.getAccountInfoFilteredBy(i, n);
  return r ? (e.verbose("0btgll", n), r) : (e.verbose("0ltaj5", n), null);
}
function ma(i, e, t) {
  e.setActiveAccount(i, t);
}
function ya(i, e) {
  return i.getActiveAccount(e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Iu = "msal.broadcast.event";
class ti {
  constructor(e) {
    this.eventCallbacks = /* @__PURE__ */ new Map(), this.logger = e || new Q({}), typeof BroadcastChannel < "u" && (this.broadcastChannel = new BroadcastChannel(Iu)), this.invokeCrossTabCallbacks = this.invokeCrossTabCallbacks.bind(this);
  }
  /**
   * Adds event callbacks to array
   * @param callback - callback to be invoked when an event is raised
   * @param eventTypes - list of events that this callback will be invoked for, if not provided callback will be invoked for all events
   * @param callbackId - Identifier for the callback, used to locate and remove the callback when no longer required
   */
  addEventCallback(e, t, n) {
    if (typeof window < "u") {
      const r = n || Zt();
      return this.eventCallbacks.has(r) ? (this.logger.error("1578i0", ""), null) : (this.eventCallbacks.set(r, [e, t || []]), this.logger.verbose("1cnec4", ""), r);
    }
    return null;
  }
  /**
   * Removes callback with provided id from callback array
   * @param callbackId
   */
  removeEventCallback(e) {
    this.eventCallbacks.delete(e), this.logger.verbose("12zotd", "");
  }
  /**
   * Emits events by calling callback with event message
   * @param eventType
   * @param interactionType
   * @param payload
   * @param error
   */
  emitEvent(e, t, n, r) {
    var s;
    const o = {
      eventType: e,
      interactionType: t || null,
      payload: n || null,
      error: r || null,
      timestamp: Date.now()
    };
    switch (e) {
      case y.LOGIN_SUCCESS:
      case y.LOGOUT_SUCCESS:
      case y.ACTIVE_ACCOUNT_CHANGED:
        (s = this.broadcastChannel) == null || s.postMessage(o);
    }
    this.invokeCallbacks(o);
  }
  /**
   * Invoke registered callbacks
   * @param message
   */
  invokeCallbacks(e) {
    this.eventCallbacks.forEach(([t, n], r) => {
      (n.length === 0 || n.includes(e.eventType)) && (this.logger.verbose("15jpwk", ""), t.apply(null, [e]));
    });
  }
  /**
   * Wrapper around invokeCallbacks to handle broadcast events received from other tabs/instances
   * @param event
   */
  invokeCrossTabCallbacks(e) {
    const t = e.data;
    this.invokeCallbacks(t);
  }
  /**
   * Listen for events broadcasted from other tabs/instances
   */
  subscribeCrossTab() {
    var e;
    (e = this.broadcastChannel) == null || e.addEventListener("message", this.invokeCrossTabCallbacks);
  }
  /**
   * Unsubscribe from broadcast events
   */
  unsubscribeCrossTab() {
    var e;
    (e = this.broadcastChannel) == null || e.removeEventListener("message", this.invokeCrossTabCallbacks);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Ca {
  constructor(e, t, n, r, o, s, a, c, h) {
    this.config = e, this.browserStorage = t, this.browserCrypto = n, this.networkClient = this.config.system.networkClient, this.eventHandler = o, this.navigationClient = s, this.platformAuthProvider = h, this.correlationId = c, this.logger = r.clone(X.MSAL_SKU, se), this.performanceClient = a;
  }
}
function tn(i, e, t, n) {
  t.verbose("0bd1la", n);
  const r = i || e || "";
  return b.getAbsoluteUrl(r, Ie());
}
function W(i, e, t, n, r, o) {
  r.verbose("1p12tq", t);
  const s = {
    clientId: e,
    correlationId: t,
    apiId: i,
    forceRefresh: !1,
    wrapperSKU: n.getWrapperMetadata()[0],
    wrapperVer: n.getWrapperMetadata()[1]
  };
  return new yt(s, n);
}
async function Ae(i, e, t, n, r, o, s, a, c) {
  const h = a && a.hasOwnProperty("instance_aware") ? a.instance_aware : void 0, l = {
    protocolMode: i.system.protocolMode,
    OIDCOptions: i.auth.OIDCOptions,
    knownAuthorities: i.auth.knownAuthorities,
    cloudDiscoveryMetadata: i.auth.cloudDiscoveryMetadata,
    authorityMetadata: i.auth.authorityMetadata
  }, d = o || i.auth.authority, g = h != null && h.length ? h === "true" : i.auth.instanceAware, f = c && g ? i.auth.authority.replace(b.getDomainFromUrl(d), c.environment) : d, w = z.generateAuthority(f, s || i.auth.azureCloudOptions), I = await u(ls, Gd, r, t, e)(w, i.system.networkClient, n, l, r, e, t);
  if (c && !I.isAlias(c.environment))
    throw R(Nc);
  return I;
}
async function ni(i, e, t, n, r) {
  if (r)
    try {
      i.removeAccount(r, n), t.verbose("0s4z6h", n);
    } catch {
      t.error("0mgg1d", n);
    }
  else
    try {
      t.verbose("0zj631", n), i.clear(n), await e.clearKeystore(n);
    } catch {
      t.error("12ih0c", n);
    }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function ri(i, e, t, n, r) {
  const o = i.authority || e.auth.authority, s = [...i && i.scopes || []], a = {
    ...i,
    correlationId: i.correlationId,
    authority: o,
    scopes: s
  };
  if (!a.authenticationScheme)
    a.authenticationScheme = E.BEARER, n.verbose("1l4fwv", r);
  else {
    if (a.authenticationScheme === E.SSH) {
      if (!i.sshJwk)
        throw R(tr);
      if (!i.sshKid)
        throw R(Uc);
    }
    n.verbose("1ecmns", r);
  }
  return a;
}
async function Tu(i, e, t, n, r) {
  const o = await u(ri, Qr, r, n, i.correlationId)(i, t, n, r, i.correlationId);
  return {
    ...i,
    ...o,
    account: e,
    forceRefresh: i.forceRefresh || !1
  };
}
function wa(i, e) {
  let t;
  const n = i.httpMethod;
  if (e === J.EAR) {
    if (n && n !== Ye.POST)
      throw R(Mc);
    t = Ye.POST;
  } else
    t = n || Ye.GET;
  return t;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ot extends Ca {
  /**
   * Initializer for the logout request.
   * @param logoutRequest
   */
  initializeLogoutRequest(e) {
    this.logger.verbose("0546u4", this.correlationId);
    const t = {
      correlationId: this.correlationId,
      ...e
    };
    if (e)
      if (e.logoutHint)
        this.logger.verbose("12k4l4", this.correlationId);
      else if (e.account) {
        const n = this.getLogoutHintFromIdTokenClaims(e.account);
        n && (this.logger.verbose("0st5di", this.correlationId), t.logoutHint = n);
      } else
        this.logger.verbose("0pdtc3", this.correlationId);
    else
      this.logger.verbose("07ndze", this.correlationId);
    return !e || e.postLogoutRedirectUri !== null ? e && e.postLogoutRedirectUri ? (this.logger.verbose("1vamm6", t.correlationId), t.postLogoutRedirectUri = b.getAbsoluteUrl(e.postLogoutRedirectUri, Ie())) : this.config.auth.postLogoutRedirectUri === null ? this.logger.verbose("15m5g7", t.correlationId) : this.config.auth.postLogoutRedirectUri ? (this.logger.verbose("1f4xlz", t.correlationId), t.postLogoutRedirectUri = b.getAbsoluteUrl(this.config.auth.postLogoutRedirectUri, Ie())) : (this.logger.verbose("17s5rf", t.correlationId), t.postLogoutRedirectUri = b.getAbsoluteUrl(Ie(), Ie())) : this.logger.verbose("0ljv63", t.correlationId), t;
  }
  /**
   * Parses login_hint ID Token Claim out of AccountInfo object to be used as
   * logout_hint in end session request.
   * @param account
   */
  getLogoutHintFromIdTokenClaims(e) {
    const t = e.idTokenClaims;
    if (t) {
      if (t.login_hint)
        return t.login_hint;
      this.logger.verbose("0mvp54", this.correlationId);
    } else
      this.logger.verbose("1e7bdp", this.correlationId);
    return null;
  }
  /**
   * Creates an Authorization Code Client with the given authority, or the default authority.
   * @param params {
   *         serverTelemetryManager: ServerTelemetryManager;
   *         authorityUrl?: string;
   *         requestAzureCloudOptions?: AzureCloudOptions;
   *         requestExtraQueryParameters?: StringDict;
   *         account?: AccountInfo;
   *        }
   */
  async createAuthCodeClient(e) {
    const t = await u(this.getClientConfiguration.bind(this), En, this.logger, this.performanceClient, this.correlationId)(e);
    return new ds(t, this.performanceClient);
  }
  /**
   * Creates a Client Configuration object with the given request authority, or the default authority.
   * @param params {
   *         serverTelemetryManager: ServerTelemetryManager;
   *         requestAuthority?: string;
   *         requestAzureCloudOptions?: AzureCloudOptions;
   *         requestExtraQueryParameters?: boolean;
   *         account?: AccountInfo;
   *        }
   */
  async getClientConfiguration(e) {
    const { serverTelemetryManager: t, requestAuthority: n, requestAzureCloudOptions: r, requestExtraQueryParameters: o, account: s } = e, a = e.authority || await u(Ae, Ke, this.logger, this.performanceClient, this.correlationId)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, o, s), c = this.config.system.loggerOptions;
    return {
      authOptions: {
        clientId: this.config.auth.clientId,
        authority: a,
        clientCapabilities: this.config.auth.clientCapabilities,
        redirectUri: this.config.auth.redirectUri
      },
      systemOptions: {
        tokenRenewalOffsetSeconds: this.config.system.tokenRenewalOffsetSeconds,
        preventCorsPreflight: !0
      },
      loggerOptions: {
        loggerCallback: c.loggerCallback,
        piiLoggingEnabled: c.piiLoggingEnabled,
        logLevel: c.logLevel,
        correlationId: this.correlationId
      },
      cryptoInterface: this.browserCrypto,
      networkInterface: this.networkClient,
      storageInterface: this.browserStorage,
      serverTelemetryManager: t,
      libraryInfo: {
        sku: X.MSAL_SKU,
        version: se,
        cpu: "",
        os: ""
      },
      telemetry: this.config.telemetry
    };
  }
}
async function bn(i, e, t, n, r, o, s, a) {
  const c = tn(i.redirectUri, t.auth.redirectUri, o, a), h = {
    interactionType: e
  }, l = xc(n, i && i.state || "", h), g = {
    ...await u(ri, Qr, o, s, a)({ ...i, correlationId: a }, t, s, o, a),
    redirectUri: c,
    state: l,
    nonce: i.nonce || O(),
    responseMode: t.auth.OIDCOptions.responseMode
  }, f = {
    ...g,
    httpMethod: wa(g, t.system.protocolMode)
  };
  if (i.loginHint || i.sid)
    return f;
  const w = i.account || r.getActiveAccount(a);
  return w && (o.verbose("1eqlb3", a), o.verbosePii("0tf99t", a), f.account = w), f;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Au(i, e) {
  if (!e)
    return null;
  try {
    return Et(i.base64Decode, e).libraryState.meta;
  } catch {
    throw p(Kn);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function gt(i, e, t, n) {
  const r = Vt(i);
  if (!r)
    throw Vo(i) ? (t.error("13pl0s", n), t.errorPii("1097vx", n), m(Cs)) : (t.error("18h0l1", n), m(ys));
  return r;
}
function Eu(i, e, t) {
  if (!i.state)
    throw m(wn);
  const n = Au(e, i.state);
  if (!n)
    throw m(Ur);
  if (n.interactionType !== t)
    throw m(ws);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Ia {
  constructor(e, t, n, r, o) {
    this.authModule = e, this.browserStorage = t, this.authCodeRequest = n, this.logger = r, this.performanceClient = o;
  }
  /**
   * Function to handle response parameters from hash.
   * @param locationHash
   */
  async handleCodeResponse(e, t) {
    let n;
    try {
      n = Gl(e, t.state);
    } catch (r) {
      throw r instanceof Ee && r.subError === Xt ? m(Xt) : r;
    }
    return u(this.handleCodeResponseFromServer.bind(this), rs, this.logger, this.performanceClient, t.correlationId)(n, t);
  }
  /**
   * Process auth code response from AAD
   * @param authCodeResponse
   * @param request
   * @param validateNonce
   * @returns
   */
  async handleCodeResponseFromServer(e, t, n = !0) {
    if (this.logger.trace("0mf2hb", t.correlationId), this.authCodeRequest.code = e.code, n && (e.nonce = t.nonce || void 0), e.state = t.state, e.client_info)
      this.authCodeRequest.clientInfo = e.client_info;
    else {
      const o = this.createCcsCredentials(t);
      o && (this.authCodeRequest.ccsCredential = o);
    }
    return await u(this.authModule.acquireToken.bind(this.authModule), jd, this.logger, this.performanceClient, t.correlationId)(this.authCodeRequest, e);
  }
  /**
   * Build ccs creds if available
   */
  createCcsCredentials(e) {
    return e.account ? {
      credential: e.account.homeAccountId,
      type: le.HOME_ACCOUNT_ID
    } : e.loginHint ? {
      credential: e.loginHint,
      type: le.UPN
    } : null;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const ku = "ContentError", vu = "PageException", Su = "user_switch", bu = "unsupported_method";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const _u = "USER_INTERACTION_REQUIRED", Ru = "USER_CANCEL", Ou = "NO_NETWORK", Pu = "PERSISTENT_ERROR", Nu = "DISABLED", Mu = "ACCOUNT_UNAVAILABLE", Uu = "UX_NOT_ALLOWED";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const xu = -2147186943;
class ge extends v {
  constructor(e, t, n) {
    super(e, t || yn(e)), Object.setPrototypeOf(this, ge.prototype), this.name = "NativeAuthError", this.ext = n;
  }
}
function We(i) {
  if (i.ext && i.ext.status && (i.ext.status === Pu || i.ext.status === Nu) || i.ext && i.ext.error && i.ext.error === xu)
    return !0;
  switch (i.errorCode) {
    case ku:
    case vu:
      return !0;
    default:
      return !1;
  }
}
function nn(i, e, t) {
  if (t && t.status)
    switch (t.status) {
      case Mu:
        return Qt(Xo, yn(i));
      case _u:
        return new Z(i, e);
      case Ru:
        return m(Xt);
      case Ou:
        return m(qt);
      case Uu:
        return Qt(kr);
    }
  return new ge(i, e, t);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Ta extends ot {
  /**
   * Returns unexpired tokens from the cache, if available
   * @param silentRequest
   */
  async acquireToken(e) {
    const t = W(k.acquireTokenSilent_silentFlow, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), n = await u(this.getClientConfiguration.bind(this), En, this.logger, this.performanceClient, this.correlationId)({
      serverTelemetryManager: t,
      requestAuthority: e.authority,
      requestAzureCloudOptions: e.azureCloudOptions,
      account: e.account
    }), r = new Bl(n, this.performanceClient);
    this.logger.verbose("0wa871", this.correlationId);
    try {
      const s = (await u(r.acquireCachedToken.bind(r), Fd, this.logger, this.performanceClient, e.correlationId)(e))[0];
      return this.performanceClient.addFields({
        fromCache: !0
      }, e.correlationId), s;
    } catch (o) {
      throw o instanceof _t && o.errorCode === Dr && this.logger.verbose("06wena", this.correlationId), o;
    }
  }
  /**
   * API to silenty clear the browser cache.
   * @param logoutRequest
   */
  logout(e) {
    this.logger.verbose("1rkurh", this.correlationId);
    const t = this.initializeLogoutRequest(e);
    return ni(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, t.account);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Ft extends Ca {
  constructor(e, t, n, r, o, s, a, c, h, l, d, g) {
    super(e, t, n, r, o, s, c, g, h), this.apiId = a, this.accountId = l, this.platformAuthProvider = h, this.nativeStorageManager = d, this.silentCacheClient = new Ta(e, this.nativeStorageManager, n, r, o, s, c, g, h);
    const f = this.platformAuthProvider.getExtensionName();
    this.skus = yt.makeExtraSkuString({
      libraryName: X.MSAL_SKU,
      libraryVersion: se,
      extensionName: f,
      extensionVersion: this.platformAuthProvider.getExtensionVersion()
    });
  }
  /**
   * Adds SKUs to request extra query parameters
   * @param request {PlatformAuthRequest}
   * @private
   */
  addRequestSKUs(e) {
    e.extraParameters = {
      ...e.extraParameters,
      [Th]: this.skus
    };
  }
  /**
   * Acquire token from native platform via browser extension
   * @param request
   */
  async acquireToken(e, t) {
    this.logger.trace("03qeos", this.correlationId);
    const n = this.performanceClient.startMeasurement(sa, e.correlationId), r = $(), o = W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      const s = await this.initializeNativeRequest(e);
      try {
        const c = await this.acquireTokensFromCache(this.accountId, s);
        return n.end({
          success: !0,
          isNativeBroker: !1,
          fromCache: !0
        }), c;
      } catch (c) {
        if (t === U.AccessToken)
          throw this.logger.info("0eitbc", this.correlationId), c;
        this.logger.info("0957j1", this.correlationId);
      }
      const a = await this.platformAuthProvider.sendMessage(s);
      return await this.handleNativeResponse(a, s, r).then((c) => (n.end({
        success: !0,
        isNativeBroker: !0,
        requestId: c.requestId
      }), o.clearNativeBrokerErrorCode(), c)).catch((c) => {
        throw n.end({
          success: !1,
          errorCode: c.errorCode,
          subErrorCode: c.subError,
          isNativeBroker: !0
        }), c;
      });
    } catch (s) {
      throw s instanceof ge && o.setNativeBrokerErrorCode(s.errorCode), s;
    }
  }
  /**
   * Creates silent flow request
   * @param request
   * @param cachedAccount
   * @returns CommonSilentFlowRequest
   */
  createSilentCacheRequest(e, t) {
    return {
      authority: e.authority,
      correlationId: this.correlationId,
      scopes: x.fromString(e.scope).asArray(),
      account: t,
      forceRefresh: !1
    };
  }
  /**
   * Fetches the tokens from the cache if un-expired
   * @param nativeAccountId
   * @param request
   * @returns authenticationResult
   */
  async acquireTokensFromCache(e, t) {
    if (!e)
      throw this.logger.warning("1ndf3e", this.correlationId), p(Fn);
    const n = this.browserStorage.getBaseAccountInfo({
      nativeAccountId: e
    }, t.correlationId);
    if (!n)
      throw p(Fn);
    try {
      const r = this.createSilentCacheRequest(t, n), o = await this.silentCacheClient.acquireToken(r), s = {
        ...n,
        idTokenClaims: o == null ? void 0 : o.idTokenClaims,
        idToken: o == null ? void 0 : o.idToken
      };
      return {
        ...o,
        account: s
      };
    } catch (r) {
      throw r;
    }
  }
  /**
   * Acquires a token from native platform then redirects to the redirectUri instead of returning the response
   * @param {RedirectRequest} request
   * @param {InProgressPerformanceEvent} rootMeasurement
   * @param {HandleRedirectPromiseOptions} options
   */
  async acquireTokenRedirect(e, t, n) {
    this.logger.trace("0luikq", this.correlationId);
    const r = await this.initializeNativeRequest(e), o = (n == null ? void 0 : n.navigateToLoginRequestUrl) ?? !0;
    try {
      await this.platformAuthProvider.sendMessage(r);
    } catch (c) {
      if (c instanceof ge && (W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger).setNativeBrokerErrorCode(c.errorCode), We(c)))
        throw c;
    }
    this.browserStorage.setTemporaryCache(M.NATIVE_REQUEST, JSON.stringify(r), !0);
    const s = {
      apiId: k.acquireTokenRedirect,
      timeout: this.config.system.redirectNavigationTimeout,
      noHistory: !1
    }, a = o ? window.location.href : tn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId);
    t.end({ success: !0 }), await this.navigationClient.navigateExternal(a, s);
  }
  /**
   * If the previous page called native platform for a token using redirect APIs, send the same request again and return the response
   * @param performanceClient {IPerformanceClient?}
   * @param correlationId {string?} correlation identifier
   */
  async handleRedirectPromise(e, t) {
    if (this.logger.trace("1c5lhw", this.correlationId), !this.browserStorage.isInteractionInProgress(!0))
      return this.logger.info("0le6uv", this.correlationId), null;
    const n = this.browserStorage.getCachedNativeRequest();
    if (!n)
      return this.logger.verbose("0a6zjb", this.correlationId), e && t && (e == null || e.addFields({ errorCode: "no_cached_request" }, t)), null;
    const { prompt: r, ...o } = n;
    r && this.logger.verbose("0ac34v", this.correlationId), this.browserStorage.removeItem(this.browserStorage.generateCacheKey(M.NATIVE_REQUEST));
    const s = $();
    try {
      this.logger.verbose("003x5a", this.correlationId);
      const a = await this.platformAuthProvider.sendMessage(o), c = await this.handleNativeResponse(a, o, s);
      return W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger).clearNativeBrokerErrorCode(), c;
    } catch (a) {
      throw a;
    }
  }
  /**
   * Logout from native platform via browser extension
   * @param request
   */
  logout() {
    return this.logger.trace("0u2sjm", this.correlationId), Promise.reject("Logout not implemented yet");
  }
  /**
   * Transform response from native platform into AuthenticationResult object which will be returned to the end user
   * @param response
   * @param request
   * @param reqTimestamp
   */
  async handleNativeResponse(e, t, n) {
    var l, d;
    this.logger.trace("1bojln", this.correlationId);
    const r = re(e.id_token, j), o = this.createHomeAccountIdentifier(e, r), s = (l = this.browserStorage.getAccountInfoFilteredBy({
      nativeAccountId: t.accountId
    }, this.correlationId)) == null ? void 0 : l.homeAccountId;
    if ((d = t.extraParameters) != null && d.child_client_id && e.account.id !== t.accountId)
      this.logger.info("1ub1in", this.correlationId);
    else if (o !== s && e.account.id !== t.accountId)
      throw nn(Su);
    const a = await Ae(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, t.authority), c = br(
      this.browserStorage,
      a,
      o,
      j,
      this.correlationId,
      r,
      e.client_info,
      void 0,
      // environment
      r.tid,
      void 0,
      // auth code payload
      e.account.id
    );
    e.expires_in = Number(e.expires_in);
    const h = await this.generateAuthenticationResult(e, t, r, c, a.canonicalAuthority, n);
    return await this.cacheAccount(c, de(r)), await this.cacheNativeTokens(e, t, o, r, e.access_token, h.tenantId, n), h;
  }
  /**
   * creates an homeAccountIdentifier for the account
   * @param response
   * @param idTokenObj
   * @returns
   */
  createHomeAccountIdentifier(e, t) {
    return Tr(e.client_info || "", he.Default, this.logger, this.browserCrypto, this.correlationId, t);
  }
  /**
   * Helper to generate scopes
   * @param response
   * @param request
   * @returns
   */
  generateScopes(e, t) {
    return t ? x.fromString(t) : x.fromString(e);
  }
  /**
   * If PoP token is requesred, records the PoP token if returned from the WAM, else generates one in the browser
   * @param request
   * @param response
   */
  async generatePopAccessToken(e, t) {
    if (t.tokenType === E.POP && t.signPopToken) {
      if (e.shr)
        return this.logger.trace("0coqhu", this.correlationId), e.shr;
      const n = new Be(this.browserCrypto, this.performanceClient), r = {
        resourceRequestMethod: t.resourceRequestMethod,
        resourceRequestUri: t.resourceRequestUri,
        shrClaims: t.shrClaims,
        shrNonce: t.shrNonce,
        correlationId: this.correlationId
      };
      if (!t.keyId)
        throw p(bo);
      return n.signPopToken(e.access_token, t.keyId, r);
    } else
      return e.access_token;
  }
  /**
   * Generates authentication result
   * @param response
   * @param request
   * @param idTokenObj
   * @param accountEntity
   * @param authority
   * @param reqTimestamp
   * @returns
   */
  async generateAuthenticationResult(e, t, n, r, o, s) {
    const a = this.addTelemetryFromNativeResponse(e.properties.MATS), c = this.generateScopes(t.scope, e.scope), h = e.account.properties || {}, l = h.UID || n.oid || n.sub || "", d = h.TenantId || n.tid || "", g = yr(
      me(r),
      void 0,
      // tenantProfile optional
      n,
      e.id_token
    );
    g.nativeAccountId !== e.account.id && (g.nativeAccountId = e.account.id);
    const f = await this.generatePopAccessToken(e, t), w = t.tokenType === E.POP ? E.POP : E.BEARER;
    return {
      authority: o,
      uniqueId: l,
      tenantId: d,
      scopes: c.asArray(),
      account: g,
      idToken: e.id_token,
      idTokenClaims: n,
      accessToken: f,
      fromCache: a ? this.isResponseFromCache(a) : !1,
      // Request timestamp and NativeResponse expires_in are in seconds, converting to Date for AuthenticationResult
      expiresOn: Te(s + e.expires_in),
      tokenType: w,
      correlationId: this.correlationId,
      state: e.state,
      fromPlatformBroker: !0
    };
  }
  /**
   * cache the account entity in browser storage
   * @param accountEntity
   */
  async cacheAccount(e, t) {
    await this.browserStorage.setAccount(e, this.correlationId, t), this.browserStorage.removeAccountContext(me(e), this.correlationId);
  }
  /**
   * Stores the access_token and id_token in inmemory storage
   * @param response
   * @param request
   * @param homeAccountIdentifier
   * @param idTokenObj
   * @param responseAccessToken
   * @param tenantId
   * @param reqTimestamp
   */
  cacheNativeTokens(e, t, n, r, o, s, a) {
    const c = dn(n, t.authority, e.id_token || "", t.clientId, r.tid || ""), h = t.tokenType === E.POP ? _i : (typeof e.expires_in == "string" ? parseInt(e.expires_in, 10) : e.expires_in) || 0, l = a + h, d = this.generateScopes(e.scope, t.scope), g = un(n, t.authority, o, t.clientId, r.tid || s, d.printScopes(), l, 0, j, void 0, t.tokenType, void 0, t.keyId), f = {
      idToken: c,
      accessToken: g
    };
    return this.nativeStorageManager.saveCacheRecord(f, this.correlationId, de(r), t.storeInCache);
  }
  getExpiresInValue(e, t) {
    return e === E.POP ? _i : (typeof t == "string" ? parseInt(t, 10) : t) || 0;
  }
  addTelemetryFromNativeResponse(e) {
    const t = this.getMATSFromResponse(e);
    return t ? (this.performanceClient.addFields({
      extensionId: this.platformAuthProvider.getExtensionId(),
      extensionVersion: this.platformAuthProvider.getExtensionVersion(),
      matsBrokerVersion: t.broker_version,
      matsAccountJoinOnStart: t.account_join_on_start,
      matsAccountJoinOnEnd: t.account_join_on_end,
      matsDeviceJoin: t.device_join,
      matsPromptBehavior: t.prompt_behavior,
      matsApiErrorCode: t.api_error_code,
      matsUiVisible: t.ui_visible,
      matsSilentCode: t.silent_code,
      matsSilentBiSubCode: t.silent_bi_sub_code,
      matsSilentMessage: t.silent_message,
      matsSilentStatus: t.silent_status,
      matsHttpStatus: t.http_status,
      matsHttpEventCount: t.http_event_count
    }, this.correlationId), t) : null;
  }
  /**
   * Gets MATS telemetry from native response
   * @param response
   * @returns
   */
  getMATSFromResponse(e) {
    if (e)
      try {
        return JSON.parse(e);
      } catch {
        this.logger.error("0b3l57", this.correlationId);
      }
    return null;
  }
  /**
   * Returns whether or not response came from native cache
   * @param response
   * @returns
   */
  isResponseFromCache(e) {
    return typeof e.is_cached > "u" ? (this.logger.verbose("1okqev", this.correlationId), !1) : !!e.is_cached;
  }
  /**
   * Translates developer provided request object into NativeRequest object
   * @param request
   */
  async initializeNativeRequest(e) {
    this.logger.trace("04j6wj", this.correlationId);
    const t = await this.getCanonicalAuthority(e), { scopes: n, ...r } = e, o = new x(n || []);
    o.appendScopes(Ue);
    const s = {
      ...r,
      accountId: this.accountId,
      clientId: this.config.auth.clientId,
      authority: t.urlString,
      scope: o.printScopes(),
      redirectUri: tn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId),
      prompt: this.getPrompt(e.prompt),
      correlationId: this.correlationId,
      tokenType: e.authenticationScheme,
      windowTitleSubstring: document.title,
      extraParameters: {
        ...e.extraParameters
      },
      extendedExpiryToken: !1,
      keyId: e.popKid
    };
    if (s.signPopToken && e.popKid)
      throw m(zs);
    if (this.handleExtraBrokerParams(s), s.extraParameters = s.extraParameters || {}, s.extraParameters.telemetry = ne.MATS_TELEMETRY, e.authenticationScheme === E.POP) {
      const a = {
        resourceRequestUri: e.resourceRequestUri,
        resourceRequestMethod: e.resourceRequestMethod,
        shrClaims: e.shrClaims,
        shrNonce: e.shrNonce,
        correlationId: this.correlationId
      }, c = new Be(this.browserCrypto, this.performanceClient);
      let h;
      if (s.keyId)
        h = this.browserCrypto.base64UrlEncode(JSON.stringify({ kid: s.keyId })), s.signPopToken = !1;
      else {
        const l = await u(c.generateCnf.bind(c), bt, this.logger, this.performanceClient, this.correlationId)(a, this.logger);
        h = l.reqCnfString, s.keyId = l.kid, s.signPopToken = !0;
      }
      s.reqCnf = h;
    }
    return this.addRequestSKUs(s), s;
  }
  async getCanonicalAuthority(e) {
    const t = e.authority || this.config.auth.authority, { azureCloudOptions: n, account: r } = e;
    r && await Ae(
      this.config,
      this.correlationId,
      this.performanceClient,
      this.browserStorage,
      this.logger,
      t,
      n,
      void 0,
      // requestExtraQueryParameters
      r
    );
    const o = new b(t);
    return o.validateAsUri(), o;
  }
  getPrompt(e) {
    switch (this.apiId) {
      case k.ssoSilent:
      case k.acquireTokenSilent_silentFlow:
        return this.logger.trace("1hiwaz", this.correlationId), V.NONE;
    }
    if (!e) {
      this.logger.trace("1qlu04", this.correlationId);
      return;
    }
    switch (e) {
      case V.NONE:
      case V.CONSENT:
      case V.LOGIN:
        return this.logger.trace("1ynje4", this.correlationId), e;
      default:
        throw this.logger.trace("0nkr6q", this.correlationId), m(Fs);
    }
  }
  /**
   * Handles extra broker request parameters
   * @param request {PlatformAuthRequest}
   * @private
   */
  handleExtraBrokerParams(e) {
    var o;
    const t = e.extraParameters && e.extraParameters.hasOwnProperty(zt) && e.extraParameters.hasOwnProperty(jt) && e.extraParameters.hasOwnProperty(Fe);
    if (!e.embeddedClientId && !t)
      return;
    let n = "";
    const r = e.redirectUri;
    e.embeddedClientId ? (e.redirectUri = this.config.auth.redirectUri, n = e.embeddedClientId) : e.extraParameters && (e.redirectUri = e.extraParameters[jt], n = e.extraParameters[Fe]), e.extraParameters = {
      child_client_id: n,
      child_redirect_uri: r
    }, (o = this.performanceClient) == null || o.addFields({
      embeddedClientId: n,
      embeddedRedirectUri: r
    }, e.correlationId);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function ii(i, e, t, n, r) {
  const o = jl({ ...i.auth, authority: e }, t, n, r);
  if (lr(o, {
    sku: X.MSAL_SKU,
    version: se,
    os: "",
    cpu: ""
  }), i.system.protocolMode !== J.OIDC && dr(o, i.telemetry.application), t.platformBroker && (vh(o), t.authenticationScheme === E.POP)) {
    const s = new oe(n, r), a = new Be(s, r);
    let c;
    t.popKid ? c = s.encodeKid(t.popKid) : c = (await u(a.generateCnf.bind(a), bt, n, r, t.correlationId)(t, n)).reqCnfString, pr(o, c);
  }
  return an(o, t.correlationId, r), o;
}
async function oi(i, e, t, n, r) {
  if (!t.codeChallenge)
    throw R(po);
  const o = await u(ii, Bd, n, r, t.correlationId)(i, e, t, n, r);
  return ir(o, rr.CODE), ur(o, t.codeChallenge, nr), pe(o, {
    ...t.extraQueryParameters,
    ...t.extraParameters
  }), Rr(e, o);
}
async function si(i, e, t, n, r, o) {
  if (!n.earJwk)
    throw m(Mr);
  const s = await ii(e, t, n, r, o);
  ir(s, rr.IDTOKEN_TOKEN_REFRESHTOKEN), xh(s, n.earJwk), ur(s, n.codeChallenge, nr), pe(s, {
    ...n.extraParameters
  });
  const a = /* @__PURE__ */ new Map();
  pe(a, n.extraQueryParameters || {});
  const c = Rr(t, a);
  return Aa(i, c, s);
}
async function ai(i, e, t, n, r, o) {
  const s = await ii(e, t, n, r, o);
  ir(s, rr.CODE), ur(s, n.codeChallenge, n.codeChallengeMethod || nr), pe(s, {
    ...n.extraParameters
  });
  const a = /* @__PURE__ */ new Map();
  pe(a, n.extraQueryParameters || {});
  const c = Rr(t, a);
  return Aa(i, c, s);
}
function Aa(i, e, t) {
  const n = i.createElement("form");
  return n.method = "post", n.action = e, t.forEach((r, o) => {
    const s = i.createElement("input");
    s.hidden = !0, s.name = o, s.value = r, n.appendChild(s);
  }), i.body.appendChild(n), n;
}
async function Ea(i, e, t, n, r, o, s, a, c, h) {
  if (a.verbose("11qcow", i.correlationId), !h)
    throw m(Hr);
  const l = new oe(a, c), d = new Ft(n, r, l, a, s, n.system.navigationClient, t, c, h, e, o, i.correlationId), { userRequestState: g } = Et(l.base64Decode, i.state);
  return u(d.acquireToken.bind(d), sa, a, c, i.correlationId)({
    ...i,
    state: g,
    prompt: void 0
    // Server should handle the prompt, ideally native broker can do this part silently
  });
}
async function tt(i, e, t, n, r, o, s, a, c, h, l, d) {
  if (ue.removeThrottle(s, r.auth.clientId, i), e.accountId)
    return u(Ea, aa, h, l, i.correlationId)(i, e.accountId, n, r, s, a, c, h, l, d);
  const g = {
    ...i,
    code: e.code || "",
    codeVerifier: t
  }, f = new Ia(o, s, g, h, l);
  return await u(f.handleCodeResponse.bind(f), zd, h, l, i.correlationId)(e, i);
}
async function ci(i, e, t, n, r, o, s, a, c, h, l) {
  if (ue.removeThrottle(o, n.auth.clientId, i), us(e, i.state), !e.ear_jwe)
    throw m(ms);
  if (!i.earJwk)
    throw m(Mr);
  const d = JSON.parse(await u(Ed, iu, c, h, i.correlationId)(i.earJwk, e.ear_jwe));
  if (d.accountId)
    return u(Ea, aa, c, h, i.correlationId)(i, d.accountId, t, n, o, s, a, c, h, l);
  const g = new ze(n.auth.clientId, o, new oe(c, h), c, h, null, null);
  g.validateTokenResponse(d, i.correlationId);
  const f = {
    code: "",
    state: i.state,
    nonce: i.nonce,
    client_info: d.client_info,
    cloud_graph_host_name: d.cloud_graph_host_name,
    cloud_instance_host_name: d.cloud_instance_host_name,
    cloud_instance_name: d.cloud_instance_name,
    msgraph_host: d.msgraph_host
  };
  return await u(g.handleServerTokenResponse.bind(g), Sr, c, h, i.correlationId)(d, r, $(), i, f, void 0, void 0, void 0, void 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Du = 32;
async function Ge(i, e, t) {
  const n = ie(Lu, Yd, e, i, t)(i, e, t), r = await u(Hu, Xd, e, i, t)(n, i, e, t);
  return {
    verifier: n,
    challenge: r
  };
}
function Lu(i, e, t) {
  try {
    const n = new Uint8Array(Du);
    return ie(Cd, Zd, e, i, t)(n), Me(n);
  } catch {
    throw m(Nr);
  }
}
async function Hu(i, e, t, n) {
  try {
    const r = await u(Ws, qd, t, e, n)(i);
    return Me(new Uint8Array(r));
  } catch {
    throw m(Nr);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class rn {
  /**
   * Navigates to other pages within the same web application
   * @param url
   * @param options
   */
  navigateInternal(e, t) {
    return rn.defaultNavigateWindow(e, t);
  }
  /**
   * Navigates to other pages outside the web application i.e. the Identity Provider
   * @param url
   * @param options
   */
  navigateExternal(e, t) {
    return rn.defaultNavigateWindow(e, t);
  }
  /**
   * Default navigation implementation invoked by the internal and external functions
   * @param url
   * @param options
   */
  static defaultNavigateWindow(e, t) {
    return t.noHistory ? window.location.replace(e) : window.location.assign(e), new Promise((n, r) => {
      setTimeout(() => {
        r(m(wt, "failed_to_redirect"));
      }, t.timeout);
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Ku {
  /**
   * Fetch Client for REST endpoints - Get request
   * @param url
   * @param headers
   * @param body
   */
  async sendGetRequestAsync(e, t) {
    let n, r = {}, o = 0;
    const s = lo(t);
    try {
      n = await fetch(e, {
        method: Wi.GET,
        headers: s
      });
    } catch (a) {
      throw ht(m(window.navigator.onLine ? Ns : qt), void 0, void 0, a);
    }
    r = uo(n.headers);
    try {
      return o = n.status, {
        headers: r,
        body: await n.json(),
        status: o
      };
    } catch (a) {
      throw ht(m(Yn), o, r, a);
    }
  }
  /**
   * Fetch Client for REST endpoints - Post request
   * @param url
   * @param headers
   * @param body
   */
  async sendPostRequestAsync(e, t) {
    const n = t && t.body || "", r = lo(t);
    let o, s = 0, a = {};
    try {
      o = await fetch(e, {
        method: Wi.POST,
        headers: r,
        body: n
      });
    } catch (c) {
      throw ht(m(window.navigator.onLine ? Ps : qt), void 0, void 0, c);
    }
    a = uo(o.headers);
    try {
      return s = o.status, {
        headers: a,
        body: await o.json(),
        status: s
      };
    } catch (c) {
      throw ht(m(Yn), s, a, c);
    }
  }
}
function lo(i) {
  try {
    const e = new Headers();
    if (!(i && i.headers))
      return e;
    const t = i.headers;
    return Object.entries(t).forEach(([n, r]) => {
      e.append(n, r);
    }), e;
  } catch (e) {
    throw ht(m(js), void 0, void 0, e);
  }
}
function uo(i) {
  try {
    const e = {};
    return i.forEach((t, n) => {
      e[n] = t;
    }), e;
  } catch {
    throw m(Gs);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Fu = 6e4, Bu = 1e4, zu = 3e4, ka = 2e3;
function va({ auth: i, cache: e, system: t, telemetry: n }, r) {
  const o = {
    clientId: "",
    authority: `${No}`,
    knownAuthorities: [],
    cloudDiscoveryMetadata: "",
    authorityMetadata: "",
    redirectUri: typeof window < "u" && window.location ? window.location.href.split("?")[0].split("#")[0] : "",
    postLogoutRedirectUri: "",
    clientCapabilities: [],
    OIDCOptions: {
      responseMode: sn.FRAGMENT,
      defaultScopes: [
        Hc,
        Kc,
        fo
      ]
    },
    azureCloudOptions: {
      azureCloudInstance: mr.None,
      tenant: ""
    },
    instanceAware: !1
  }, s = {
    cacheLocation: q.SessionStorage,
    cacheRetentionDays: 5
  }, a = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loggerCallback: () => {
    },
    logLevel: _.Info,
    piiLoggingEnabled: !1
  }, h = {
    ...{
      ...Qo,
      loggerOptions: a,
      networkClient: r ? new Ku() : zl,
      navigationClient: new rn(),
      popupBridgeTimeout: (t == null ? void 0 : t.popupBridgeTimeout) || Fu,
      iframeBridgeTimeout: (t == null ? void 0 : t.iframeBridgeTimeout) || Bu,
      redirectNavigationTimeout: zu,
      allowRedirectInIframe: !1,
      navigatePopups: !0,
      allowPlatformBroker: !1,
      nativeBrokerHandshakeTimeout: (t == null ? void 0 : t.nativeBrokerHandshakeTimeout) || ka,
      protocolMode: J.AAD
    },
    ...t,
    loggerOptions: (t == null ? void 0 : t.loggerOptions) || a
  }, l = {
    application: {
      appName: "",
      appVersion: ""
    },
    client: new St()
  };
  if ((t == null ? void 0 : t.protocolMode) !== J.OIDC && (i != null && i.OIDCOptions) && new Q(h.loggerOptions).warning(JSON.stringify(R(Dc)), ""), t != null && t.protocolMode && t.protocolMode === J.OIDC && (h != null && h.allowPlatformBroker))
    throw R(Lc);
  return {
    auth: {
      ...o,
      ...i,
      OIDCOptions: {
        ...o.OIDCOptions,
        ...i == null ? void 0 : i.OIDCOptions
      }
    },
    cache: { ...s, ...e },
    system: h,
    telemetry: { ...l, ...n }
  };
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class on {
  constructor(e, t, n, r) {
    this.logger = e, this.handshakeTimeoutMs = t, this.extensionId = r, this.resolvers = /* @__PURE__ */ new Map(), this.handshakeResolvers = /* @__PURE__ */ new Map(), this.messageChannel = new MessageChannel(), this.windowListener = this.onWindowMessage.bind(this), this.performanceClient = n, this.handshakeEvent = n.startMeasurement(Wd), this.platformAuthType = ne.PLATFORM_EXTENSION_PROVIDER;
  }
  /**
   * Sends a given message to the extension and resolves with the extension response
   * @param request
   */
  async sendMessage(e) {
    this.logger.trace("0on4p2", e.correlationId);
    const t = {
      method: ct.GetToken,
      request: e
    }, n = {
      channel: ne.CHANNEL_ID,
      extensionId: this.extensionId,
      responseId: O(),
      body: t
    };
    this.logger.trace("1qadfi", e.correlationId), this.logger.tracePii("1xm533", e.correlationId), this.messageChannel.port1.postMessage(n);
    const r = await new Promise((s, a) => {
      this.resolvers.set(n.responseId, { resolve: s, reject: a });
    });
    return this.validatePlatformBrokerResponse(r);
  }
  /**
   * Returns an instance of the MessageHandler that has successfully established a connection with an extension
   * @param {Logger} logger
   * @param {number} handshakeTimeoutMs
   * @param {IPerformanceClient} performanceClient
   * @param {ICrypto} crypto
   */
  static async createProvider(e, t, n, r) {
    e.trace("15zfnw", r);
    try {
      const o = new on(e, t, n, ne.PREFERRED_EXTENSION_ID);
      return await o.sendHandshakeRequest(r), o;
    } catch {
      const s = new on(e, t, n);
      return await s.sendHandshakeRequest(r), s;
    }
  }
  /**
   * Send handshake request helper.
   */
  async sendHandshakeRequest(e) {
    this.logger.trace("1dpg9o", e), window.addEventListener("message", this.windowListener, !1);
    const t = {
      channel: ne.CHANNEL_ID,
      extensionId: this.extensionId,
      responseId: O(),
      body: {
        method: ct.HandshakeRequest
      }
    };
    return this.handshakeEvent.add({
      extensionId: this.extensionId,
      extensionHandshakeTimeoutMs: this.handshakeTimeoutMs
    }), this.messageChannel.port1.onmessage = (n) => {
      this.onChannelMessage(n);
    }, window.postMessage(t, window.origin, [this.messageChannel.port2]), new Promise((n, r) => {
      this.handshakeResolvers.set(t.responseId, { resolve: n, reject: r }), this.timeoutId = window.setTimeout(() => {
        window.removeEventListener("message", this.windowListener, !1), this.messageChannel.port1.close(), this.messageChannel.port2.close(), this.handshakeEvent.end({
          extensionHandshakeTimedOut: !0,
          success: !1
        }), r(m(Hs)), this.handshakeResolvers.delete(t.responseId);
      }, this.handshakeTimeoutMs);
    });
  }
  /**
   * Invoked when a message is posted to the window. If a handshake request is received it means the extension is not installed.
   * @param event
   */
  onWindowMessage(e) {
    const t = Zt();
    if (this.logger.trace("0jpn5u", t), e.source !== window)
      return;
    const n = e.data;
    if (!(!n.channel || n.channel !== ne.CHANNEL_ID) && !(n.extensionId && n.extensionId !== this.extensionId) && n.body.method === ct.HandshakeRequest) {
      const r = this.handshakeResolvers.get(n.responseId);
      if (!r) {
        this.logger.trace("07buhm", t);
        return;
      }
      this.logger.verbose(n.extensionId ? "0xrkug" : "No extension installed", t), clearTimeout(this.timeoutId), this.messageChannel.port1.close(), this.messageChannel.port2.close(), window.removeEventListener("message", this.windowListener, !1), this.handshakeEvent.end({
        success: !1,
        extensionInstalled: !1
      }), r.reject(m(Ks));
    }
  }
  /**
   * Invoked when a message is received from the extension on the MessageChannel port
   * @param event
   */
  onChannelMessage(e) {
    const t = Zt();
    this.logger.trace("1py8yf", t);
    const n = e.data, r = this.resolvers.get(n.responseId), o = this.handshakeResolvers.get(n.responseId);
    try {
      const s = n.body.method;
      if (s === ct.Response) {
        if (!r)
          return;
        const a = n.body.response;
        if (this.logger.trace("19hpgm", t), this.logger.tracePii("179a24", t), a.status !== "Success")
          r.reject(nn(a.code, a.description, a.ext));
        else if (a.result)
          a.result.code && a.result.description ? r.reject(nn(a.result.code, a.result.description, a.result.ext)) : r.resolve(a.result);
        else
          throw Bn(Yt, "Event does not contain result.");
        this.resolvers.delete(n.responseId);
      } else if (s === ct.HandshakeResponse) {
        if (!o) {
          this.logger.trace("082qnt", t);
          return;
        }
        clearTimeout(this.timeoutId), window.removeEventListener("message", this.windowListener, !1), this.extensionId = n.extensionId, this.extensionVersion = n.body.version, this.logger.verbose("0yf5ib", t), this.handshakeEvent.end({
          extensionInstalled: !0,
          success: !0
        }), o.resolve(), this.handshakeResolvers.delete(n.responseId);
      }
    } catch (s) {
      this.logger.error("0xf978", t), this.logger.errorPii("04i99o", t), this.logger.errorPii("0xdvsy", t), r ? r.reject(s) : o && o.reject(s);
    }
  }
  /**
   * Validates native platform response before processing
   * @param response
   */
  validatePlatformBrokerResponse(e) {
    if (e.hasOwnProperty("access_token") && e.hasOwnProperty("id_token") && e.hasOwnProperty("client_info") && e.hasOwnProperty("account") && e.hasOwnProperty("scope") && e.hasOwnProperty("expires_in"))
      return e;
    throw Bn(Yt, "Response missing expected properties.");
  }
  /**
   * Returns the Id for the browser extension this handler is communicating with
   * @returns
   */
  getExtensionId() {
    return this.extensionId;
  }
  /**
   * Returns the version for the browser extension this handler is communicating with
   * @returns
   */
  getExtensionVersion() {
    return this.extensionVersion;
  }
  getExtensionName() {
    var e;
    return this.getExtensionId() === ne.PREFERRED_EXTENSION_ID ? "chrome" : (e = this.getExtensionId()) != null && e.length ? "unknown" : void 0;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class hi {
  constructor(e, t, n) {
    this.logger = e, this.performanceClient = t, this.correlationId = n, this.platformAuthType = ne.PLATFORM_DOM_PROVIDER;
  }
  static async createProvider(e, t, n) {
    var r;
    if (e.trace("12mj4a", n), (r = window.navigator) != null && r.platformAuthentication) {
      const o = (
        // @ts-ignore
        await window.navigator.platformAuthentication.getSupportedContracts(ne.MICROSOFT_ENTRA_BROKERID)
      );
      if (o != null && o.includes(ne.PLATFORM_DOM_APIS))
        return e.trace("1h5q1r", n), new hi(e, t, n);
    }
  }
  /**
   * Returns the Id for the broker extension this handler is communicating with
   * @returns
   */
  getExtensionId() {
    return ne.MICROSOFT_ENTRA_BROKERID;
  }
  getExtensionVersion() {
    return "";
  }
  getExtensionName() {
    return ne.DOM_API_NAME;
  }
  /**
   * Send token request to platform broker via browser DOM API
   * @param request
   * @returns
   */
  async sendMessage(e) {
    this.logger.trace("02bcil", e.correlationId);
    try {
      const t = this.initializePlatformDOMRequest(e), n = (
        // @ts-ignore
        await window.navigator.platformAuthentication.executeGetToken(t)
      );
      return this.validatePlatformBrokerResponse(n, e.correlationId);
    } catch (t) {
      throw this.logger.error("11im7g", e.correlationId), t;
    }
  }
  initializePlatformDOMRequest(e) {
    this.logger.trace("15d6yv", e.correlationId);
    const { accountId: t, clientId: n, authority: r, scope: o, redirectUri: s, correlationId: a, state: c, storeInCache: h, embeddedClientId: l, extraParameters: d, ...g } = e, f = this.getDOMExtraParams(g);
    return {
      accountId: t,
      brokerId: this.getExtensionId(),
      authority: r,
      clientId: n,
      correlationId: a || this.correlationId,
      extraParameters: { ...d, ...f },
      isSecurityTokenService: !1,
      redirectUri: s,
      scope: o,
      state: c,
      storeInCache: h,
      embeddedClientId: l
    };
  }
  validatePlatformBrokerResponse(e, t) {
    if (e.hasOwnProperty("isSuccess")) {
      if (e.hasOwnProperty("accessToken") && e.hasOwnProperty("idToken") && e.hasOwnProperty("clientInfo") && e.hasOwnProperty("account") && e.hasOwnProperty("scopes") && e.hasOwnProperty("expiresIn"))
        return this.logger.trace("0h4vei", t), this.convertToPlatformBrokerResponse(e, t);
      if (e.hasOwnProperty("error")) {
        const n = e;
        if (n.isSuccess === !1 && n.error && n.error.code)
          throw this.logger.trace("0g92vm", t), nn(n.error.code, n.error.description, {
            error: parseInt(n.error.errorCode),
            protocol_error: n.error.protocolError,
            status: n.error.status,
            properties: n.error.properties
          });
      }
    }
    throw Bn(Yt, "Response missing expected properties.");
  }
  convertToPlatformBrokerResponse(e, t) {
    return this.logger.trace("14913t", t), {
      access_token: e.accessToken,
      id_token: e.idToken,
      client_info: e.clientInfo,
      account: e.account,
      expires_in: e.expiresIn,
      scope: e.scopes,
      state: e.state || "",
      properties: e.properties || {},
      extendedLifetimeToken: e.extendedLifetimeToken ?? !1,
      shr: e.proofOfPossessionPayload
    };
  }
  getDOMExtraParams(e) {
    return {
      ...Object.entries(e).reduce((r, [o, s]) => (r[o] = String(s), r), {})
    };
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function Ag(i, e, t) {
  const n = new Q(i || {}, It, se), r = t || "";
  n.trace("07660b", r);
  const o = e || new St();
  return typeof window > "u" ? (n.trace("082ed3", r), !1) : !!await Sa(n, o, r);
}
async function Sa(i, e, t, n) {
  i.trace("134j0v", t);
  const r = ju();
  i.trace("04c81g", t);
  let o;
  try {
    r && (o = await hi.createProvider(i, e, t)), o || (i.trace("0l3na8", t), o = await on.createProvider(i, n || ka, e, t));
  } catch (s) {
    i.trace("0icbd7", s);
  }
  return o;
}
function ju() {
  let i;
  try {
    return i = window[q.SessionStorage], (i == null ? void 0 : i.getItem(fu)) === "true";
  } catch {
    return !1;
  }
}
function At(i, e, t, n, r) {
  if (e.trace("0uko3r", t), !i.system.allowPlatformBroker)
    return e.trace("04hozs", t), !1;
  if (!n)
    return e.trace("0kvv1r", t), !1;
  if (r)
    switch (r) {
      case E.BEARER:
      case E.POP:
        return e.trace("18tev1", t), !0;
      default:
        return e.trace("1dd2nh", t), !1;
    }
  return !0;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Gu extends ot {
  constructor(e, t, n, r, o, s, a, c, h, l) {
    super(e, t, n, r, o, s, a, h, l), this.nativeStorage = c, this.eventHandler = o;
  }
  /**
   * Acquires tokens by opening a popup window to the /authorize endpoint of the authority
   * @param request
   * @param pkceCodes
   */
  acquireToken(e, t) {
    let n;
    try {
      if (n = {
        popupName: this.generatePopupName(e.scopes || Ue, e.authority || this.config.auth.authority),
        popupWindowAttributes: e.popupWindowAttributes || {},
        popupWindowParent: e.popupWindowParent ?? window
      }, this.performanceClient.addFields({ isAsyncPopup: !this.config.system.navigatePopups }, this.correlationId), this.config.system.navigatePopups) {
        const o = {
          ...e,
          httpMethod: wa(e, this.config.system.protocolMode)
        };
        return this.logger.verbose("1f9ok3", this.correlationId), n.popup = this.openSizedPopup("about:blank", n), this.acquireTokenPopupAsync(o, n, t);
      } else
        return this.logger.verbose("162h4u", this.correlationId), this.acquireTokenPopupAsync(e, n, t);
    } catch (r) {
      return Promise.reject(r);
    }
  }
  /**
   * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
   * @param logoutRequest
   */
  logout(e) {
    try {
      this.logger.verbose("068rup", this.correlationId);
      const t = this.initializeLogoutRequest(e), n = {
        popupName: this.generateLogoutPopupName(t),
        popupWindowAttributes: (e == null ? void 0 : e.popupWindowAttributes) || {},
        popupWindowParent: (e == null ? void 0 : e.popupWindowParent) ?? window
      }, r = e && e.authority, o = e && e.mainWindowRedirectUri;
      return this.config.system.navigatePopups ? (this.logger.verbose("1a28da", this.correlationId), n.popup = this.openSizedPopup("about:blank", n), this.logoutPopupAsync(t, n, r, o)) : (this.logger.verbose("1phd8u", this.correlationId), this.logoutPopupAsync(t, n, r, o));
    } catch (t) {
      return Promise.reject(t);
    }
  }
  /**
   * Helper which obtains an access_token for your API via opening a popup window in the user's browser
   * @param request
   * @param popupParams
   * @param pkceCodes
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  async acquireTokenPopupAsync(e, t, n) {
    this.logger.verbose("1g77pg", this.correlationId);
    const r = await u(bn, kn, this.logger, this.performanceClient, this.correlationId)(e, C.Popup, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    t.popup && Wr(r.authority);
    const o = At(this.config, this.logger, this.correlationId, this.platformAuthProvider, e.authenticationScheme);
    return r.platformBroker = o, this.config.system.protocolMode === J.EAR ? this.executeEarFlow(r, t, n) : this.executeCodeFlow(r, t, n);
  }
  /**
   * Executes auth code + PKCE flow
   * @param request
   * @param popupParams
   * @param pkceCodes
   * @returns
   */
  async executeCodeFlow(e, t, n) {
    var c;
    const r = e.correlationId, o = W(k.acquireTokenPopup, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), s = n || await u(Ge, je, this.logger, this.performanceClient, r)(this.performanceClient, this.logger, r), a = {
      ...e,
      codeChallenge: s.challenge
    };
    try {
      const h = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, r)({
        serverTelemetryManager: o,
        requestAuthority: a.authority,
        requestAzureCloudOptions: a.azureCloudOptions,
        requestExtraQueryParameters: a.extraQueryParameters,
        account: a.account
      });
      if (a.httpMethod === Ye.POST)
        return await this.executeCodeFlowWithPost(a, t, h, s.verifier);
      {
        const l = await u(oi, vr, this.logger, this.performanceClient, r)(this.config, h.authority, a, this.logger, this.performanceClient), d = this.initiateAuthRequest(l, t);
        this.eventHandler.emitEvent(y.POPUP_OPENED, C.Popup, { popupWindow: d }, null);
        const g = await De(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e), f = ie(gt, ut, this.logger, this.performanceClient, this.correlationId)(g, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
        return await u(tt, qe, this.logger, this.performanceClient, r)(e, f, s.verifier, k.acquireTokenPopup, this.config, h, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
      }
    } catch (h) {
      throw (c = t.popup) == null || c.close(), h instanceof v && (h.setCorrelationId(this.correlationId), o.cacheFailedRequest(h)), h;
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e, t, n) {
    const { correlationId: r, authority: o, azureCloudOptions: s, extraQueryParameters: a, account: c } = e, h = await u(Ae, Ke, this.logger, this.performanceClient, r)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, o, s, a, c), l = await u(jr, Xr, this.logger, this.performanceClient, r)(), d = n || await u(Ge, je, this.logger, this.performanceClient, r)(this.performanceClient, this.logger, r), g = {
      ...e,
      earJwk: l,
      codeChallenge: d.challenge
    }, f = t.popup || this.openPopup("about:blank", t);
    (await si(f.document, this.config, h, g, this.logger, this.performanceClient)).submit();
    const I = await u(De, en, this.logger, this.performanceClient, r)(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, g), A = ie(gt, ut, this.logger, this.performanceClient, this.correlationId)(I, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
    if (!A.ear_jwe && A.code) {
      const P = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, r)({
        serverTelemetryManager: W(k.acquireTokenPopup, this.config.auth.clientId, r, this.browserStorage, this.logger),
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account,
        authority: h
      });
      return u(tt, qe, this.logger, this.performanceClient, r)(g, A, d.verifier, k.acquireTokenPopup, this.config, P, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    } else
      return u(ci, Yr, this.logger, this.performanceClient, r)(g, A, k.acquireTokenPopup, this.config, h, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  async executeCodeFlowWithPost(e, t, n, r) {
    const o = e.correlationId, s = await u(Ae, Ke, this.logger, this.performanceClient, o)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger), a = t.popup || this.openPopup("about:blank", t);
    (await ai(a.document, this.config, s, e, this.logger, this.performanceClient)).submit();
    const h = await u(De, en, this.logger, this.performanceClient, o)(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e), l = ie(gt, ut, this.logger, this.performanceClient, this.correlationId)(h, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
    return u(tt, qe, this.logger, this.performanceClient, o)(e, l, r, k.acquireTokenPopup, this.config, n, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  /**
   *
   * @param validRequest
   * @param popupName
   * @param requestAuthority
   * @param popup
   * @param mainWindowRedirectUri
   * @param popupWindowAttributes
   */
  async logoutPopupAsync(e, t, n, r) {
    var s, a, c;
    this.logger.verbose("0b7yrk", this.correlationId), this.eventHandler.emitEvent(y.LOGOUT_START, C.Popup, e);
    const o = W(k.logoutPopup, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      await ni(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, e.account);
      const h = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, this.correlationId)({
        serverTelemetryManager: o,
        requestAuthority: n,
        account: e.account || void 0
      });
      try {
        h.authority.endSessionEndpoint;
      } catch {
        if ((s = e.account) != null && s.homeAccountId && e.postLogoutRedirectUri && h.authority.protocolMode === J.OIDC) {
          if (this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Popup, e), r) {
            const g = {
              apiId: k.logoutPopup,
              timeout: this.config.system.redirectNavigationTimeout,
              noHistory: !1
            }, f = b.getAbsoluteUrl(r, Ie());
            await this.navigationClient.navigateInternal(f, g);
          }
          (a = t.popup) == null || a.close();
          return;
        }
      }
      const l = h.getLogoutUri(e);
      this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Popup, e);
      const d = this.openPopup(l, t);
      if (this.eventHandler.emitEvent(y.POPUP_OPENED, C.Popup, { popupWindow: d }, null), await De(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e).catch(() => {
      }), r) {
        const g = {
          apiId: k.logoutPopup,
          timeout: this.config.system.redirectNavigationTimeout,
          noHistory: !1
        }, f = b.getAbsoluteUrl(r, Ie());
        this.logger.verbose("0qcur2", this.correlationId), this.logger.verbosePii("0oj7lk", this.correlationId), await this.navigationClient.navigateInternal(f, g);
      } else
        this.logger.verbose("03zgcf", this.correlationId);
    } catch (h) {
      throw (c = t.popup) == null || c.close(), h instanceof v && (h.setCorrelationId(this.correlationId), o.cacheFailedRequest(h)), this.eventHandler.emitEvent(y.LOGOUT_FAILURE, C.Popup, null, h), this.eventHandler.emitEvent(y.LOGOUT_END, C.Popup), h;
    }
    this.eventHandler.emitEvent(y.LOGOUT_END, C.Popup);
  }
  /**
   * Opens a popup window with given request Url.
   * @param requestUrl
   */
  initiateAuthRequest(e, t) {
    if (e)
      return this.logger.infoPii("1kcr9k", this.correlationId), this.openPopup(e, t);
    throw this.logger.error("1l7hyp", this.correlationId), m(Cn);
  }
  /**
   * @hidden
   *
   * Configures popup window for login.
   *
   * @param urlNavigate
   * @param title
   * @param popUpWidth
   * @param popUpHeight
   * @param popupWindowAttributes
   * @ignore
   * @hidden
   */
  openPopup(e, t) {
    try {
      let n;
      if (t.popup ? (n = t.popup, this.logger.verbosePii("0cgeo7", this.correlationId), n.location.assign(e)) : typeof t.popup > "u" && (this.logger.verbosePii("0c2awd", this.correlationId), n = this.openSizedPopup(e, t)), !n)
        throw m(Es);
      return n.focus && n.focus(), this.currentWindow = n, n;
    } catch {
      throw this.logger.error("0dxfb9", this.correlationId), m(As);
    }
  }
  /**
   * Helper function to set popup window dimensions and position
   * @param urlNavigate
   * @param popupName
   * @param popupWindowAttributes
   * @returns
   */
  openSizedPopup(e, { popupName: t, popupWindowAttributes: n, popupWindowParent: r }) {
    var f, w, I, A;
    const o = r.screenLeft ? r.screenLeft : r.screenX, s = r.screenTop ? r.screenTop : r.screenY, a = r.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = r.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let h = (f = n.popupSize) == null ? void 0 : f.width, l = (w = n.popupSize) == null ? void 0 : w.height, d = (I = n.popupPosition) == null ? void 0 : I.top, g = (A = n.popupPosition) == null ? void 0 : A.left;
    return (!h || h < 0 || h > a) && (this.logger.verbose("08vfmo", this.correlationId), h = X.POPUP_WIDTH), (!l || l < 0 || l > c) && (this.logger.verbose("09cxa0", this.correlationId), l = X.POPUP_HEIGHT), (!d || d < 0 || d > c) && (this.logger.verbose("1qh4wo", this.correlationId), d = Math.max(0, c / 2 - X.POPUP_HEIGHT / 2 + s)), (!g || g < 0 || g > a) && (this.logger.verbose("1sz3en", this.correlationId), g = Math.max(0, a / 2 - X.POPUP_WIDTH / 2 + o)), r.open(e, t, `width=${h}, height=${l}, top=${d}, left=${g}, scrollbars=yes`);
  }
  /**
   * Generates the name for the popup based on the client id and request
   * @param clientId
   * @param request
   */
  generatePopupName(e, t) {
    return `${X.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${e.join("-")}.${t}.${this.correlationId}`;
  }
  /**
   * Generates the name for the popup based on the client id and request for logouts
   * @param clientId
   * @param request
   */
  generateLogoutPopupName(e) {
    const t = e.account && e.account.homeAccountId;
    return `${X.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${t}.${this.correlationId}`;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Vu() {
  if (typeof window > "u" || typeof window.performance > "u" || typeof window.performance.getEntriesByType != "function")
    return;
  const i = window.performance.getEntriesByType("navigation"), e = i.length ? i[0] : void 0;
  return e == null ? void 0 : e.type;
}
class $u extends ot {
  constructor(e, t, n, r, o, s, a, c, h, l) {
    super(e, t, n, r, o, s, a, h, l), this.nativeStorage = c;
  }
  /**
   * Redirects the page to the /authorize endpoint of the IDP
   * @param request
   */
  async acquireToken(e) {
    const t = await u(bn, kn, this.logger, this.performanceClient, this.correlationId)(e, C.Redirect, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    t.platformBroker = At(this.config, this.logger, this.correlationId, this.platformAuthProvider, e.authenticationScheme);
    const n = (o) => {
      o.persisted && (this.logger.verbose("0udvtt", this.correlationId), this.browserStorage.resetRequestCache(this.correlationId), this.eventHandler.emitEvent(y.RESTORE_FROM_BFCACHE, C.Redirect));
    }, r = this.getRedirectStartPage(e.redirectStartPage);
    this.logger.verbosePii("0zao0a", this.correlationId), this.browserStorage.setTemporaryCache(M.ORIGIN_URI, r, !0), window.addEventListener("pageshow", n);
    try {
      this.config.system.protocolMode === J.EAR ? await this.executeEarFlow(t) : await this.executeCodeFlow(t);
    } catch (o) {
      throw o instanceof v && o.setCorrelationId(this.correlationId), window.removeEventListener("pageshow", n), o;
    }
  }
  /**
   * Executes auth code + PKCE flow
   * @param request
   * @returns
   */
  async executeCodeFlow(e) {
    const t = e.correlationId, n = W(k.acquireTokenRedirect, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), r = await u(Ge, je, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), o = {
      ...e,
      codeChallenge: r.challenge
    };
    this.browserStorage.cacheAuthorizeRequest(o, this.correlationId, r.verifier);
    try {
      if (o.httpMethod === Ye.POST)
        return await this.executeCodeFlowWithPost(o);
      {
        const s = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, this.correlationId)({
          serverTelemetryManager: n,
          requestAuthority: o.authority,
          requestAzureCloudOptions: o.azureCloudOptions,
          requestExtraQueryParameters: o.extraQueryParameters,
          account: o.account
        }), a = await u(oi, vr, this.logger, this.performanceClient, e.correlationId)(this.config, s.authority, o, this.logger, this.performanceClient);
        return await this.initiateAuthRequest(a);
      }
    } catch (s) {
      throw s instanceof v && (s.setCorrelationId(this.correlationId), n.cacheFailedRequest(s)), s;
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e) {
    const { correlationId: t, authority: n, azureCloudOptions: r, extraQueryParameters: o, account: s } = e, a = await u(Ae, Ke, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, o, s), c = await u(jr, Xr, this.logger, this.performanceClient, t)(), h = await u(Ge, je, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), l = {
      ...e,
      earJwk: c,
      codeChallenge: h.challenge
    };
    return this.browserStorage.cacheAuthorizeRequest(l, this.correlationId, h.verifier), (await si(document, this.config, a, l, this.logger, this.performanceClient)).submit(), new Promise((g, f) => {
      setTimeout(() => {
        f(m(wt, "failed_to_redirect"));
      }, this.config.system.redirectNavigationTimeout);
    });
  }
  /**
   * Executes classic Authorization Code flow with a POST request.
   * @param request
   */
  async executeCodeFlowWithPost(e) {
    const t = e.correlationId, n = await u(Ae, Ke, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger);
    return this.browserStorage.cacheAuthorizeRequest(e, this.correlationId), (await ai(document, this.config, n, e, this.logger, this.performanceClient)).submit(), new Promise((o, s) => {
      setTimeout(() => {
        s(m(wt, "failed_to_redirect"));
      }, this.config.system.redirectNavigationTimeout);
    });
  }
  /**
   * Checks if navigateToLoginRequestUrl is set, and:
   * - if true, performs logic to cache and navigate
   * - if false, handles hash string and parses response
   * @param hash {string} url hash
   * @param parentMeasurement {InProgressPerformanceEvent} parent measurement
   * @param request {CommonAuthorizationUrlRequest} request object
   * @param pkceVerifier {string} PKCE verifier
   * @param options {HandleRedirectPromiseOptions} options for handling redirect promise
   */
  async handleRedirectPromise(e, t, n, r) {
    const o = W(k.handleRedirectPromise, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), s = (r == null ? void 0 : r.navigateToLoginRequestUrl) ?? !0;
    try {
      const [a, c] = this.getRedirectResponse((r == null ? void 0 : r.hash) || "");
      if (!a)
        return this.logger.info("1qmv0q", this.correlationId), this.browserStorage.resetRequestCache(this.correlationId), Vu() !== "back_forward" ? n.event.errorCode = "no_server_response" : this.logger.verbose("1eqegq", this.correlationId), null;
      const h = this.browserStorage.getTemporaryCache(M.ORIGIN_URI, this.correlationId, !0) || "", l = Mi(h), d = Mi(window.location.href);
      if (l === d && s)
        return this.logger.verbose("11yred", this.correlationId), h.indexOf("#") > -1 && Zs(h), await this.handleResponse(a, e, t, o);
      if (s) {
        if (!Rt() || this.config.system.allowRedirectInIframe) {
          this.browserStorage.setTemporaryCache(M.URL_HASH, c, !0);
          const g = {
            apiId: k.handleRedirectPromise,
            timeout: this.config.system.redirectNavigationTimeout,
            noHistory: !0
          };
          let f = !0;
          if (!h || h === "null") {
            const w = na();
            this.browserStorage.setTemporaryCache(M.ORIGIN_URI, w, !0), this.logger.warning("1dutq1", this.correlationId), f = await this.navigationClient.navigateInternal(w, g);
          } else
            this.logger.verbose("08jpy1", this.correlationId), f = await this.navigationClient.navigateInternal(h, g);
          if (!f)
            return await this.handleResponse(a, e, t, o);
        }
      } else return this.logger.verbose("0v4sdv", this.correlationId), await this.handleResponse(a, e, t, o);
      return null;
    } catch (a) {
      throw a instanceof v && (a.setCorrelationId(this.correlationId), o.cacheFailedRequest(a)), a;
    }
  }
  /**
   * Gets the response hash for a redirect request
   * Returns null if interactionType in the state value is not "redirect" or the hash does not contain known properties
   * @param hash
   */
  getRedirectResponse(e) {
    this.logger.verbose("1c5i8m", this.correlationId);
    let t = e;
    t || (this.config.auth.OIDCOptions.responseMode === sn.QUERY ? t = window.location.search : t = window.location.hash);
    let n = Vt(t);
    if (n) {
      try {
        Eu(n, this.browserCrypto, C.Redirect);
      } catch (o) {
        return o instanceof v && this.logger.error("0bkq6p", this.correlationId), [null, ""];
      }
      return $r(window), this.logger.verbose("00uvho", this.correlationId), [n, t];
    }
    const r = this.browserStorage.getTemporaryCache(M.URL_HASH, this.correlationId, !0);
    return this.browserStorage.removeItem(this.browserStorage.generateCacheKey(M.URL_HASH)), r && (n = Vt(r), n) ? (this.logger.verbose("001671", this.correlationId), [n, r]) : [null, ""];
  }
  /**
   * Checks if hash exists and handles in window.
   * @param hash
   * @param state
   */
  async handleResponse(e, t, n, r) {
    if (!e.state)
      throw m(wn);
    const { authority: s, azureCloudOptions: a, extraQueryParameters: c, account: h } = t;
    if (e.ear_jwe) {
      const d = await u(Ae, Ke, this.logger, this.performanceClient, t.correlationId)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, s, a, c, h);
      return u(ci, Yr, this.logger, this.performanceClient, t.correlationId)(t, e, k.acquireTokenRedirect, this.config, d, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    }
    const l = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, this.correlationId)({ serverTelemetryManager: r, requestAuthority: t.authority });
    return u(tt, qe, this.logger, this.performanceClient, t.correlationId)(t, e, n, k.acquireTokenRedirect, this.config, l, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  /**
   * Redirects window to given URL.
   * @param urlNavigate
   * @param onRedirectNavigateRequest - onRedirectNavigate callback provided on the request
   */
  async initiateAuthRequest(e) {
    if (this.logger.verbose("0yaw2e", this.correlationId), e) {
      this.logger.infoPii("1luf83", this.correlationId);
      const t = {
        apiId: k.acquireTokenRedirect,
        timeout: this.config.system.redirectNavigationTimeout,
        noHistory: !1
      }, n = this.config.auth.onRedirectNavigate;
      if (typeof n == "function")
        if (this.logger.verbose("1nehvl", this.correlationId), n(e) !== !1) {
          this.logger.verbose("1a0jxh", this.correlationId), await this.navigationClient.navigateExternal(e, t);
          return;
        } else {
          this.logger.verbose("09k5h5", this.correlationId);
          return;
        }
      else {
        this.logger.verbose("0klwf7", this.correlationId), await this.navigationClient.navigateExternal(e, t);
        return;
      }
    } else
      throw this.logger.info("0rlh4e", this.correlationId), m(Cn);
  }
  /**
   * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param logoutRequest
   */
  async logout(e) {
    var r, o;
    this.logger.verbose("1rkurh", this.correlationId);
    const t = this.initializeLogoutRequest(e), n = W(k.logout, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      this.eventHandler.emitEvent(y.LOGOUT_START, C.Redirect, e), await ni(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, t.account);
      const s = {
        apiId: k.logout,
        timeout: this.config.system.redirectNavigationTimeout,
        noHistory: !1
      }, a = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, this.correlationId)({
        serverTelemetryManager: n,
        requestAuthority: e && e.authority,
        requestExtraQueryParameters: e == null ? void 0 : e.extraQueryParameters,
        account: e && e.account || void 0
      });
      if (a.authority.protocolMode === J.OIDC)
        try {
          a.authority.endSessionEndpoint;
        } catch {
          if ((r = t.account) != null && r.homeAccountId) {
            this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Redirect, t);
            return;
          }
        }
      const c = a.getLogoutUri(t);
      (o = t.account) != null && o.homeAccountId && this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Redirect, t);
      const h = this.config.auth.onRedirectNavigate;
      if (typeof h == "function")
        if (h(c) !== !1) {
          this.logger.verbose("06v57e", this.correlationId), this.browserStorage.getInteractionInProgress() || this.browserStorage.setInteractionInProgress(!0, Re.SIGNOUT), await this.navigationClient.navigateExternal(c, s);
          return;
        } else
          this.browserStorage.setInteractionInProgress(!1), this.logger.verbose("0xqes1", this.correlationId);
      else {
        this.browserStorage.getInteractionInProgress() || this.browserStorage.setInteractionInProgress(!0, Re.SIGNOUT), await this.navigationClient.navigateExternal(c, s);
        return;
      }
    } catch (s) {
      throw s instanceof v && (s.setCorrelationId(this.correlationId), n.cacheFailedRequest(s)), this.eventHandler.emitEvent(y.LOGOUT_FAILURE, C.Redirect, null, s), this.eventHandler.emitEvent(y.LOGOUT_END, C.Redirect), s;
    }
    this.eventHandler.emitEvent(y.LOGOUT_END, C.Redirect);
  }
  /**
   * Use to get the redirectStartPage either from request or use current window
   * @param requestStartPage
   */
  getRedirectStartPage(e) {
    const t = e || window.location.href;
    return b.getAbsoluteUrl(t, Ie());
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function Ju(i, e, t, n) {
  if (!i)
    throw t.info("1l7hyp", n), m(Cn);
  return ie(Yu, Kd, t, e, n)(i);
}
async function Wu(i, e, t, n, r) {
  const o = li();
  if (!o.contentDocument)
    throw "No document associated with iframe!";
  return (await ai(o.contentDocument, i, e, t, n, r)).submit(), o;
}
async function Qu(i, e, t, n, r) {
  const o = li();
  if (!o.contentDocument)
    throw "No document associated with iframe!";
  return (await si(o.contentDocument, i, e, t, n, r)).submit(), o;
}
function Yu(i) {
  const e = li();
  return e.src = i, e;
}
function li() {
  const i = document.createElement("iframe");
  return i.className = "msalSilentIframe", i.style.visibility = "hidden", i.style.position = "absolute", i.style.width = i.style.height = "0", i.style.border = "0", i.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), i.setAttribute("allow", "local-network-access *"), document.body.appendChild(i), i;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Xu extends ot {
  constructor(e, t, n, r, o, s, a, c, h, l, d) {
    super(e, t, n, r, o, s, c, l, d), this.apiId = a, this.nativeStorage = h;
  }
  /**
   * Acquires a token silently by opening a hidden iframe to the /authorize endpoint with prompt=none or prompt=no_session
   * @param request
   */
  async acquireToken(e) {
    !e.loginHint && !e.sid && (!e.account || !e.account.username) && this.logger.warning("1kl318", this.correlationId);
    const t = { ...e };
    t.prompt ? t.prompt !== V.NONE && t.prompt !== V.NO_SESSION && (this.logger.warning("0bmctg", this.correlationId), t.prompt = V.NONE) : t.prompt = V.NONE;
    const n = await u(bn, kn, this.logger, this.performanceClient, this.correlationId)(t, C.Silent, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    return n.platformBroker = At(this.config, this.logger, this.correlationId, this.platformAuthProvider, n.authenticationScheme), Wr(n.authority), this.config.system.protocolMode === J.EAR ? this.executeEarFlow(n) : this.executeCodeFlow(n);
  }
  /**
   * Executes auth code + PKCE flow
   * @param request
   * @returns
   */
  async executeCodeFlow(e) {
    let t;
    const n = W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      return t = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, e.correlationId)({
        serverTelemetryManager: n,
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account
      }), await u(this.silentTokenHelper.bind(this), eo, this.logger, this.performanceClient, e.correlationId)(t, e);
    } catch (r) {
      if (r instanceof v && (r.setCorrelationId(this.correlationId), n.cacheFailedRequest(r)), !t || !(r instanceof v) || r.errorCode !== X.INVALID_GRANT_ERROR)
        throw r;
      return this.performanceClient.addFields({
        retryError: r.errorCode
      }, this.correlationId), await u(this.silentTokenHelper.bind(this), eo, this.logger, this.performanceClient, this.correlationId)(t, e);
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e) {
    const { correlationId: t, authority: n, azureCloudOptions: r, extraQueryParameters: o, account: s } = e, a = await u(Ae, Ke, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, o, s), c = await u(jr, Xr, this.logger, this.performanceClient, t)(), h = await u(Ge, je, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), l = {
      ...e,
      earJwk: c,
      codeChallenge: h.challenge
    };
    await u(Qu, xn, this.logger, this.performanceClient, t)(this.config, a, l, this.logger, this.performanceClient);
    const d = this.config.auth.OIDCOptions.responseMode, g = await u(De, en, this.logger, this.performanceClient, t)(this.config.system.iframeBridgeTimeout, this.logger, this.browserCrypto, e), f = ie(gt, ut, this.logger, this.performanceClient, t)(g, d, this.logger, this.correlationId);
    if (!f.ear_jwe && f.code) {
      const w = await u(this.createAuthCodeClient.bind(this), Ne, this.logger, this.performanceClient, t)({
        serverTelemetryManager: W(this.apiId, this.config.auth.clientId, t, this.browserStorage, this.logger),
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account,
        authority: a
      });
      return u(tt, qe, this.logger, this.performanceClient, t)(l, f, h.verifier, this.apiId, this.config, w, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    } else
      return u(ci, Yr, this.logger, this.performanceClient, t)(l, f, this.apiId, this.config, a, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(In));
  }
  /**
   * Helper which acquires an authorization code silently using a hidden iframe from given url
   * using the scopes requested as part of the id, and exchanges the code for a set of OAuth tokens.
   * @param navigateUrl
   * @param userRequestScopes
   */
  async silentTokenHelper(e, t) {
    const n = t.correlationId, r = await u(Ge, je, this.logger, this.performanceClient, n)(this.performanceClient, this.logger, n), o = {
      ...t,
      codeChallenge: r.challenge
    };
    if (t.httpMethod === Ye.POST)
      await u(Wu, xn, this.logger, this.performanceClient, n)(this.config, e.authority, o, this.logger, this.performanceClient);
    else {
      const h = await u(oi, vr, this.logger, this.performanceClient, n)(this.config, e.authority, o, this.logger, this.performanceClient);
      await u(Ju, xn, this.logger, this.performanceClient, n)(h, this.performanceClient, this.logger, n);
    }
    const s = this.config.auth.OIDCOptions.responseMode, a = await u(De, en, this.logger, this.performanceClient, n)(this.config.system.iframeBridgeTimeout, this.logger, this.browserCrypto, t), c = ie(gt, ut, this.logger, this.performanceClient, n)(a, s, this.logger, this.correlationId);
    return u(tt, qe, this.logger, this.performanceClient, n)(t, c, r.verifier, this.apiId, this.config, e, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class qu extends ot {
  /**
   * Exchanges the refresh token for new tokens
   * @param request
   */
  async acquireToken(e) {
    const t = await u(ri, Qr, this.logger, this.performanceClient, e.correlationId)(e, this.config, this.performanceClient, this.logger, this.correlationId), n = {
      ...e,
      ...t
    };
    e.redirectUri && (n.redirectUri = tn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId));
    const r = W(k.acquireTokenSilent_silentFlow, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), o = await this.createRefreshTokenClient({
      serverTelemetryManager: r,
      authorityUrl: n.authority,
      azureCloudOptions: n.azureCloudOptions,
      account: n.account
    });
    return u(o.acquireTokenByRefreshToken.bind(o), Dd, this.logger, this.performanceClient, e.correlationId)(n).catch((s) => {
      throw s.setCorrelationId(this.correlationId), r.cacheFailedRequest(s), s;
    });
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(In));
  }
  /**
   * Creates a Refresh Client with the given authority, or the default authority.
   * @param params {
   *         serverTelemetryManager: ServerTelemetryManager;
   *         authorityUrl?: string;
   *         azureCloudOptions?: AzureCloudOptions;
   *         extraQueryParams?: StringDict;
   *         account?: AccountInfo;
   *        }
   */
  async createRefreshTokenClient(e) {
    const t = await u(this.getClientConfiguration.bind(this), En, this.logger, this.performanceClient, this.correlationId)({
      serverTelemetryManager: e.serverTelemetryManager,
      requestAuthority: e.authorityUrl,
      requestAzureCloudOptions: e.azureCloudOptions,
      requestExtraQueryParameters: e.extraQueryParameters,
      account: e.account
    });
    return new Fl(t, this.performanceClient);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Zu extends ds {
  constructor(e, t) {
    super(e, t), this.includeRedirectUri = !1;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class eg extends ot {
  constructor(e, t, n, r, o, s, a, c, h, l) {
    super(e, t, n, r, o, s, c, h, l), this.apiId = a;
  }
  /**
   * Acquires a token silently by redeeming an authorization code against the /token endpoint
   * @param request
   */
  async acquireToken(e) {
    if (!e.code)
      throw m(Us);
    const t = await u(bn, kn, this.logger, this.performanceClient, this.correlationId)(
      e,
      C.Silent,
      this.config,
      this.browserCrypto,
      this.browserStorage,
      this.logger,
      this.performanceClient,
      /*
       * correlationId is optional in request payload, while this.correlationId is always instantiated as request.correlationId || createGuid().
       * Each auth request creates a new instance of *Client so we can safely use this.correlationId.
       */
      this.correlationId
    ), n = W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      const r = {
        ...t,
        code: e.code
      }, o = await u(this.getClientConfiguration.bind(this), En, this.logger, this.performanceClient, this.correlationId)({
        serverTelemetryManager: n,
        requestAuthority: t.authority,
        requestAzureCloudOptions: t.azureCloudOptions,
        requestExtraQueryParameters: t.extraQueryParameters,
        account: t.account
      }), s = new Zu(o, this.performanceClient);
      this.logger.verbose("1uic5e", this.correlationId);
      const a = new Ia(s, this.browserStorage, r, this.logger, this.performanceClient);
      return await u(a.handleCodeResponseFromServer.bind(a), rs, this.logger, this.performanceClient, this.correlationId)({
        code: e.code,
        msgraph_host: e.msGraphHost,
        cloud_graph_host_name: e.cloudGraphHostName,
        cloud_instance_host_name: e.cloudInstanceHostName
      }, t, !1);
    } catch (r) {
      throw r instanceof v && (r.setCorrelationId(this.correlationId), n.cacheFailedRequest(r)), r;
    }
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(In));
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function tg(i, e, t, n) {
  var a;
  const r = (
    // @ts-ignore
    ((a = window.msal) == null ? void 0 : a.clientIds) || []
  ), o = r.length, s = r.filter((c) => c === i).length;
  s > 1 && t.warning("1e88vg", n), e.add({
    msalInstanceCount: o,
    sameClientIdInstanceCount: s
  });
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function xt(i, e, t) {
  try {
    An(i);
  } catch (n) {
    throw e.end({ success: !1 }, n, t), n;
  }
}
class di {
  /**
   * @constructor
   * Constructor for the PublicClientApplication used to instantiate the PublicClientApplication object
   *
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
   * - authority: the authority URL for your application.
   * - redirect_uri: the uri of your application registered in the portal.
   *
   * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
   * It is of the form https://login.microsoftonline.com/{Enter_the_Tenant_Info_Here}
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * In Azure B2C, authority is of the form https://{instance}/tfp/{tenant}/{policyName}/
   * Full B2C functionality will be available in this library in future versions.
   *
   * @param configuration Object for the MSAL PublicClientApplication instance
   */
  constructor(e) {
    this.operatingContext = e, this.isBrowserEnvironment = this.operatingContext.isBrowserEnvironment(), this.config = e.getConfig(), this.initialized = !1, this.logger = this.operatingContext.getLogger(), this.networkClient = this.config.system.networkClient, this.navigationClient = this.config.system.navigationClient, this.redirectResponse = /* @__PURE__ */ new Map(), this.hybridAuthCodeResponses = /* @__PURE__ */ new Map(), this.performanceClient = this.config.telemetry.client, this.browserCrypto = this.isBrowserEnvironment ? new oe(this.logger, this.performanceClient) : pt, this.eventHandler = new ti(this.logger), this.browserStorage = this.isBrowserEnvironment ? new Tt(this.config.auth.clientId, this.config.cache, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler, _r(this.config.auth)) : fa(this.config.auth.clientId, this.logger, this.performanceClient, this.eventHandler);
    const t = {
      cacheLocation: q.MemoryStorage,
      cacheRetentionDays: 5
    };
    this.nativeInternalStorage = new Tt(this.config.auth.clientId, t, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler), this.activeSilentTokenRequests = /* @__PURE__ */ new Map(), this.trackPageVisibility = this.trackPageVisibility.bind(this), this.trackPageVisibilityWithMeasurement = this.trackPageVisibilityWithMeasurement.bind(this);
  }
  static async createController(e, t) {
    const n = new di(e);
    return await n.initialize(t), n;
  }
  trackPageVisibility(e) {
    e && (this.logger.info("16v6hv", e), this.performanceClient.incrementFields({ visibilityChangeCount: 1 }, e));
  }
  /**
   * Initializer function to perform async startup tasks such as connecting to WAM extension
   * @param request {?InitializeApplicationRequest} correlation id
   */
  async initialize(e) {
    const t = this.getRequestCorrelationId(e);
    if (this.logger.trace("1f7joy", t), this.initialized) {
      this.logger.info("061m5x", t);
      return;
    }
    if (!this.isBrowserEnvironment) {
      this.logger.info("19fvpi", t), this.initialized = !0, this.eventHandler.emitEvent(y.INITIALIZE_END);
      return;
    }
    const n = (e == null ? void 0 : e.correlationId) || this.getRequestCorrelationId(), r = this.config.system.allowPlatformBroker, o = this.performanceClient.startMeasurement(la, n);
    if (this.eventHandler.emitEvent(y.INITIALIZE_START), this.logMultipleInstances(o, n), await u(this.browserStorage.initialize.bind(this.browserStorage), Hd, this.logger, this.performanceClient, n)(n), r)
      try {
        this.platformAuthProvider = await Sa(this.logger, this.performanceClient, n, this.config.system.nativeBrokerHandshakeTimeout);
      } catch (s) {
        this.logger.verbose(s, n);
      }
    this.config.cache.cacheLocation === q.LocalStorage && this.eventHandler.subscribeCrossTab(), !this.config.system.navigatePopups && await this.preGeneratePkceCodes(n), this.initialized = !0, this.eventHandler.emitEvent(y.INITIALIZE_END), o.end({
      allowPlatformBroker: r,
      success: !0
    });
  }
  // #region Redirect Flow
  /**
   * Event handler function which allows users to fire events after the PublicClientApplication object
   * has loaded during redirect flows. This should be invoked on all page loads involved in redirect
   * auth flows.
   * @param hash Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.
   * @param options Object containing optional configuration for redirect promise handling.
   * @returns Token response or null. If the return value is null, then no auth redirect was detected.
   */
  async handleRedirectPromise(e) {
    if (this.logger.verbose("02l8bm", ""), Jr(this.initialized), this.isBrowserEnvironment) {
      const t = (e == null ? void 0 : e.hash) || "";
      let n = this.redirectResponse.get(t);
      return typeof n > "u" ? (n = this.handleRedirectPromiseInternal(e), this.redirectResponse.set(t, n), this.logger.verbose("1wn9kp", "")) : this.logger.verbose("0w0gm3", ""), n;
    }
    return this.logger.verbose("12xi63", ""), null;
  }
  /**
   * The internal details of handleRedirectPromise. This is separated out to a helper to allow handleRedirectPromise to memoize requests
   * @param hash
   * @returns
   */
  async handleRedirectPromiseInternal(e) {
    var c;
    if (!this.browserStorage.isInteractionInProgress(!0))
      return this.logger.info("0le6uv", ""), null;
    if (((c = this.browserStorage.getInteractionInProgress()) == null ? void 0 : c.type) === Re.SIGNOUT)
      return this.logger.verbose("1ywcv2", ""), this.browserStorage.setInteractionInProgress(!1), Promise.resolve(null);
    const n = this.getAllAccounts(), r = this.browserStorage.getCachedNativeRequest(), o = r && this.platformAuthProvider && !(e != null && e.hash);
    let s;
    this.eventHandler.emitEvent(y.HANDLE_REDIRECT_START, C.Redirect);
    let a;
    try {
      if (o && this.platformAuthProvider) {
        const h = (r == null ? void 0 : r.correlationId) || "";
        s = this.performanceClient.startMeasurement(Lt, h), this.logger.trace("12v7is", h);
        const l = new Ft(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, k.handleRedirectPromise, this.performanceClient, this.platformAuthProvider, r.accountId, this.nativeInternalStorage, r.correlationId);
        a = u(l.handleRedirectPromise.bind(l), Jd, this.logger, this.performanceClient, s.event.correlationId)(this.performanceClient, s.event.correlationId);
      } else {
        const [h, l] = this.browserStorage.getCachedRequest(""), d = h.correlationId;
        s = this.performanceClient.startMeasurement(Lt, d), this.logger.trace("0znzs5", d);
        const g = this.createRedirectClient(d);
        a = u(g.handleRedirectPromise.bind(g), $d, this.logger, this.performanceClient, s.event.correlationId)(h, l, s, e);
      }
    } catch (h) {
      throw this.browserStorage.resetRequestCache(""), h;
    }
    return a.then((h) => (h ? (this.browserStorage.resetRequestCache(h.correlationId), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Redirect, h), this.logger.verbose("0ui8f5", h.correlationId), n.length < this.getAllAccounts().length && (this.eventHandler.emitEvent(y.LOGIN_SUCCESS, C.Redirect, h.account), this.logger.verbose("16im3l", h.correlationId)), s.end({
      success: !0
    }, void 0, h.account)) : s.event.errorCode ? s.end({ success: !1 }, void 0) : s.discard(), this.eventHandler.emitEvent(y.HANDLE_REDIRECT_END, C.Redirect), h)).catch((h) => {
      this.browserStorage.resetRequestCache(s.event.correlationId);
      const l = h;
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Redirect, null, l), this.eventHandler.emitEvent(y.HANDLE_REDIRECT_END, C.Redirect), s.end({
        success: !1
      }, l), h;
    });
  }
  /**
   * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
   * the page, so any code that follows this function will not execute.
   *
   * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
   * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
   *
   * @param request
   */
  async acquireTokenRedirect(e) {
    const t = this.getRequestCorrelationId(e);
    this.logger.verbose("0os66p", t);
    const n = this.performanceClient.startMeasurement(ha, t);
    n.add({
      scenarioId: e.scenarioId
    });
    const r = this.config.auth.onRedirectNavigate;
    this.config.auth.onRedirectNavigate = (o) => {
      const s = typeof r == "function" ? r(o) : void 0;
      return n.add({
        navigateCallbackResult: s !== !1
      }), n.event = n.end({ success: !0 }, void 0, e.account) || n.event, s;
    };
    try {
      Xn(this.initialized, this.config), this.browserStorage.setInteractionInProgress(!0, Re.SIGNIN), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Redirect, e);
      let o;
      return this.platformAuthProvider && this.canUsePlatformBroker(e) ? o = new Ft(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, k.acquireTokenRedirect, this.performanceClient, this.platformAuthProvider, this.getNativeAccountId(e), this.nativeInternalStorage, t).acquireTokenRedirect(e, n).catch((a) => {
        if (a instanceof ge && We(a))
          return this.platformAuthProvider = void 0, this.createRedirectClient(t).acquireToken(e);
        if (a instanceof Z)
          return this.logger.verbose("1ipyz4", t), this.createRedirectClient(t).acquireToken(e);
        throw a;
      }) : o = this.createRedirectClient(t).acquireToken(e), await o;
    } catch (o) {
      throw this.browserStorage.resetRequestCache(t), n.event.status === 2 ? this.performanceClient.startMeasurement(Lt, t).end({ success: !1 }, o, e.account) : n.end({ success: !1 }, o, e.account), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Redirect, null, o), o;
    }
  }
  // #endregion
  // #region Popup Flow
  /**
   * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
   *
   * @param request
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  acquireTokenPopup(e) {
    const t = this.getRequestCorrelationId(e), n = this.performanceClient.startMeasurement(Zr, t);
    n.add({
      scenarioId: e.scenarioId
    });
    try {
      this.logger.verbose("0ch87b", t), xt(this.initialized, n, e.account), this.browserStorage.setInteractionInProgress(!0, Re.SIGNIN, e.overrideInteractionInProgress, t);
    } catch (a) {
      return Promise.reject(a);
    }
    const r = this.getAllAccounts();
    this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Popup, e);
    let o;
    const s = this.getPreGeneratedPkceCodes(t);
    return this.canUsePlatformBroker(e) ? o = this.acquireTokenNative({
      ...e,
      correlationId: t
    }, k.acquireTokenPopup).then((a) => (n.end({
      success: !0,
      isNativeBroker: !0
    }, void 0, a.account), a)).catch((a) => {
      if (a instanceof ge && We(a))
        return this.platformAuthProvider = void 0, this.createPopupClient(t).acquireToken(e, s);
      if (a instanceof Z)
        return this.logger.verbose("0yy5fw", t), this.createPopupClient(t).acquireToken(e, s);
      throw a;
    }) : o = this.createPopupClient(t).acquireToken(e, s), o.then((a) => {
      const c = r.length < this.getAllAccounts().length;
      return this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Popup, a), c && this.eventHandler.emitEvent(y.LOGIN_SUCCESS, C.Popup, a.account), n.end({
        success: !0,
        accessTokenSize: a.accessToken.length,
        idTokenSize: a.idToken.length
      }, void 0, a.account), a;
    }).catch((a) => (this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Popup, null, a), n.end({
      success: !1
    }, a, e.account), Promise.reject(a))).finally(async () => {
      this.browserStorage.setInteractionInProgress(!1), this.config.system.navigatePopups || await this.preGeneratePkceCodes(t);
    });
  }
  trackPageVisibilityWithMeasurement() {
    const e = this.ssoSilentMeasurement || this.acquireTokenByCodeAsyncMeasurement;
    e && e.increment({
      visibilityChangeCount: 1
    });
  }
  // #endregion
  // #region Silent Flow
  /**
   * This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
   * - Any browser using a form of Intelligent Tracking Prevention
   * - If there is not an established session with the service
   *
   * In these cases, the request must be done inside a popup or full frame redirect.
   *
   * For the cases where interaction is required, you cannot send a request with prompt=none.
   *
   * If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
   * you session on the server still exists.
   * @param request {@link SsoSilentRequest}
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  async ssoSilent(e) {
    var s, a;
    const t = this.getRequestCorrelationId(e), n = {
      ...e,
      // will be PromptValue.NONE or PromptValue.NO_SESSION
      prompt: e.prompt,
      correlationId: t
    };
    this.ssoSilentMeasurement = this.performanceClient.startMeasurement(ei, t), (s = this.ssoSilentMeasurement) == null || s.add({
      scenarioId: e.scenarioId
    }), xt(this.initialized, this.ssoSilentMeasurement, e.account), (a = this.ssoSilentMeasurement) == null || a.increment({
      visibilityChangeCount: 0
    }), document.addEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
    const r = this.getAllAccounts();
    this.logger.verbose("0w1b45", t), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, n);
    let o;
    return this.canUsePlatformBroker(n) ? o = this.acquireTokenNative(n, k.ssoSilent).catch((c) => {
      if (c instanceof ge && We(c))
        return this.platformAuthProvider = void 0, this.createSilentIframeClient(n.correlationId).acquireToken(n);
      throw c;
    }) : o = this.createSilentIframeClient(n.correlationId).acquireToken(n), o.then((c) => {
      var l;
      const h = r.length < this.getAllAccounts().length;
      return this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, c), h && this.eventHandler.emitEvent(y.LOGIN_SUCCESS, C.Silent, c.account), (l = this.ssoSilentMeasurement) == null || l.end({
        success: !0,
        isNativeBroker: c.fromPlatformBroker,
        accessTokenSize: c.accessToken.length,
        idTokenSize: c.idToken.length
      }, void 0, c.account), c;
    }).catch((c) => {
      var h;
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, c), (h = this.ssoSilentMeasurement) == null || h.end({
        success: !1
      }, c, e.account), c;
    }).finally(() => {
      document.removeEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
    });
  }
  /**
   * This function redeems an authorization code (passed as code) from the eSTS token endpoint.
   * This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
   * This API is not indended for normal authorization code acquisition and redemption.
   *
   * Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
   *
   * @param request {@link AuthorizationCodeRequest}
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  async acquireTokenByCode(e) {
    const t = this.getRequestCorrelationId(e);
    this.logger.trace("0ch6ga", t);
    const n = this.performanceClient.startMeasurement(ca, t);
    xt(this.initialized, n), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, e), n.add({ scenarioId: e.scenarioId });
    try {
      if (e.code && e.nativeAccountId)
        throw m(Ds);
      if (e.code) {
        const r = e.code;
        let o = this.hybridAuthCodeResponses.get(r);
        return o ? (this.logger.verbose("0qgp28", t), n.discard()) : (this.logger.verbose("06eh73", t), o = this.acquireTokenByCodeAsync({
          ...e,
          correlationId: t
        }).then((s) => (this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, s), this.hybridAuthCodeResponses.delete(r), n.end({
          success: !0,
          isNativeBroker: s.fromPlatformBroker,
          accessTokenSize: s.accessToken.length,
          idTokenSize: s.idToken.length
        }, void 0, s.account), s)).catch((s) => {
          throw this.hybridAuthCodeResponses.delete(r), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, s), n.end({
            success: !1
          }, s), s;
        }), this.hybridAuthCodeResponses.set(r, o)), await o;
      } else if (e.nativeAccountId)
        if (this.canUsePlatformBroker(e, e.nativeAccountId)) {
          const r = await this.acquireTokenNative({
            ...e,
            correlationId: t
          }, k.acquireTokenByCode, e.nativeAccountId).catch((o) => {
            throw o instanceof ge && We(o) && (this.platformAuthProvider = void 0), o;
          });
          return n.end({
            success: !0
          }, void 0, r.account), r;
        } else
          throw m(Ls);
      else
        throw m(xs);
    } catch (r) {
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, r), n.end({
        success: !1
      }, r), r;
    }
  }
  /**
   * Creates a SilentAuthCodeClient to redeem an authorization code.
   * @param request
   * @returns Result of the operation to redeem the authorization code
   */
  async acquireTokenByCodeAsync(e) {
    var o;
    const t = this.getRequestCorrelationId(e);
    return this.logger.trace("10d9hy", t), this.acquireTokenByCodeAsyncMeasurement = this.performanceClient.startMeasurement(Vd, t), (o = this.acquireTokenByCodeAsyncMeasurement) == null || o.increment({
      visibilityChangeCount: 0
    }), document.addEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement), await this.createSilentAuthCodeClient(t).acquireToken(e).then((s) => {
      var a;
      return (a = this.acquireTokenByCodeAsyncMeasurement) == null || a.end({
        success: !0,
        fromCache: s.fromCache,
        isNativeBroker: s.fromPlatformBroker
      }), s;
    }).catch((s) => {
      var a;
      throw (a = this.acquireTokenByCodeAsyncMeasurement) == null || a.end({
        success: !1
      }, s), s;
    }).finally(() => {
      document.removeEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
    });
  }
  /**
   * Attempt to acquire an access token from the cache
   * @param silentCacheClient SilentCacheClient
   * @param commonRequest CommonSilentFlowRequest
   * @param silentRequest SilentRequest
   * @returns A promise that, when resolved, returns the access token
   */
  async acquireTokenFromCache(e, t) {
    switch (t) {
      case U.Default:
      case U.AccessToken:
      case U.AccessTokenAndRefreshToken:
        const n = this.createSilentCacheClient(e.correlationId);
        return u(n.acquireToken.bind(n), Nd, this.logger, this.performanceClient, e.correlationId)(e);
      default:
        throw p(Le);
    }
  }
  /**
   * Attempt to acquire an access token via a refresh token
   * @param commonRequest CommonSilentFlowRequest
   * @param cacheLookupPolicy CacheLookupPolicy
   * @returns A promise that, when resolved, returns the access token
   */
  async acquireTokenByRefreshToken(e, t) {
    switch (t) {
      case U.Default:
      case U.AccessTokenAndRefreshToken:
      case U.RefreshToken:
      case U.RefreshTokenAndNetwork:
        const n = this.createSilentRefreshClient(e.correlationId);
        return u(n.acquireToken.bind(n), xd, this.logger, this.performanceClient, e.correlationId)(e);
      default:
        throw p(Le);
    }
  }
  /**
   * Attempt to acquire an access token via an iframe
   * @param request CommonSilentFlowRequest
   * @returns A promise that, when resolved, returns the access token
   */
  async acquireTokenBySilentIframe(e) {
    const t = this.createSilentIframeClient(e.correlationId);
    return u(t.acquireToken.bind(t), Md, this.logger, this.performanceClient, e.correlationId)(e);
  }
  // #endregion
  // #region Logout
  /**
   * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param logoutRequest
   */
  async logoutRedirect(e) {
    const t = this.getRequestCorrelationId(e);
    return Xn(this.initialized, this.config), this.browserStorage.setInteractionInProgress(!0, Re.SIGNOUT), this.createRedirectClient(t).logout(e);
  }
  /**
   * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
   * @param logoutRequest
   */
  logoutPopup(e) {
    try {
      const t = this.getRequestCorrelationId(e);
      return An(this.initialized), this.browserStorage.setInteractionInProgress(!0, Re.SIGNOUT), this.createPopupClient(t).logout(e).finally(() => {
        this.browserStorage.setInteractionInProgress(!1);
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }
  /**
   * Creates a cache interaction client to clear broswer cache.
   * @param logoutRequest
   */
  async clearCache(e) {
    if (!this.isBrowserEnvironment)
      return;
    const t = this.getRequestCorrelationId(e);
    return this.createSilentCacheClient(t).logout(e);
  }
  // #endregion
  // #region Account APIs
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(e) {
    return pa(this.logger, this.browserStorage, this.isBrowserEnvironment, this.getRequestCorrelationId(), e);
  }
  /**
   * Returns the first account found in the cache that matches the account filter passed in.
   * @param accountFilter
   * @returns The first account found in the cache matching the provided filter or null if no account could be found.
   */
  getAccount(e) {
    return Zn(e, this.logger, this.browserStorage, this.getRequestCorrelationId());
  }
  /**
   * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
   * @param account
   */
  setActiveAccount(e) {
    ma(e, this.browserStorage, this.getRequestCorrelationId());
  }
  /**
   * Gets the currently active account
   */
  getActiveAccount() {
    return ya(this.browserStorage, this.getRequestCorrelationId());
  }
  // #endregion
  /**
   * Hydrates the cache with the tokens from an AuthenticationResult
   * @param result
   * @param request
   * @returns
   */
  async hydrateCache(e, t) {
    this.logger.verbose("16jycr", e.correlationId);
    const n = Ir(e.account, e.cloudGraphHostName, e.msGraphHost);
    return await this.browserStorage.setAccount(n, e.correlationId, de(e.idTokenClaims)), e.fromPlatformBroker ? (this.logger.verbose("1fxyu8", e.correlationId), this.nativeInternalStorage.hydrateCache(e, t)) : this.browserStorage.hydrateCache(e, t);
  }
  // #region Helpers
  /**
   * Acquire a token from native device (e.g. WAM)
   * @param request
   */
  async acquireTokenNative(e, t, n, r) {
    const o = this.getRequestCorrelationId(e);
    if (this.logger.trace("0b9y3p", o), !this.platformAuthProvider)
      throw m(Hr);
    return new Ft(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, t, this.performanceClient, this.platformAuthProvider, n || this.getNativeAccountId(e), this.nativeInternalStorage, o).acquireToken(e, r);
  }
  /**
   * Returns boolean indicating if this request can use the platform broker
   * @param request
   */
  canUsePlatformBroker(e, t) {
    const n = this.getRequestCorrelationId(e);
    if (this.logger.trace("1n9lbl", n), !this.platformAuthProvider)
      return this.logger.trace("0vnu11", n), !1;
    if (!At(this.config, this.logger, n, this.platformAuthProvider, e.authenticationScheme))
      return this.logger.trace("1m4bzf", n), !1;
    if (e.prompt)
      switch (e.prompt) {
        case V.NONE:
        case V.CONSENT:
        case V.LOGIN:
          this.logger.trace("0vdv8e", n);
          break;
        default:
          return this.logger.trace("0pdzw6", n), !1;
      }
    return !t && !this.getNativeAccountId(e) ? (this.logger.trace("16lbtk", n), !1) : !0;
  }
  /**
   * Get the native accountId from the account
   * @param request
   * @returns
   */
  getNativeAccountId(e) {
    const t = e.account || this.getAccount({
      loginHint: e.loginHint,
      sid: e.sid
    }) || this.getActiveAccount();
    return t && t.nativeAccountId || "";
  }
  /**
   * Returns new instance of the Popup Interaction Client
   * @param correlationId
   */
  createPopupClient(e) {
    return new Gu(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Redirect Interaction Client
   * @param correlationId
   */
  createRedirectClient(e) {
    return new $u(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Iframe Interaction Client
   * @param correlationId
   */
  createSilentIframeClient(e) {
    return new Xu(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, k.ssoSilent, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Cache Interaction Client
   */
  createSilentCacheClient(e) {
    return new Ta(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Refresh Interaction Client
   */
  createSilentRefreshClient(e) {
    return new qu(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent AuthCode Interaction Client
   */
  createSilentAuthCodeClient(e) {
    return new eg(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, k.acquireTokenByCode, this.performanceClient, e, this.platformAuthProvider);
  }
  /**
   * Adds event callbacks to array
   * @param callback
   */
  addEventCallback(e, t) {
    return this.eventHandler.addEventCallback(e, t);
  }
  /**
   * Removes callback with provided id from callback array
   * @param callbackId
   */
  removeEventCallback(e) {
    this.eventHandler.removeEventCallback(e);
  }
  /**
   * Registers a callback to receive performance events.
   *
   * @param {PerformanceCallbackFunction} callback
   * @returns {string}
   */
  addPerformanceCallback(e) {
    return Tn(), this.performanceClient.addPerformanceCallback(e);
  }
  /**
   * Removes a callback registered with addPerformanceCallback.
   *
   * @param {string} callbackId
   * @returns {boolean}
   */
  removePerformanceCallback(e) {
    return this.performanceClient.removePerformanceCallback(e);
  }
  /**
   * Returns the logger instance
   */
  getLogger() {
    return this.logger;
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger Logger instance
   */
  setLogger(e) {
    this.logger = e;
  }
  /**
   * Called by wrapper libraries (Angular & React) to set SKU and Version passed down to telemetry, logger, etc.
   * @param sku
   * @param version
   */
  initializeWrapperLibrary(e, t) {
    this.browserStorage.setWrapperMetadata(e, t);
  }
  /**
   * Sets navigation client
   * @param navigationClient
   */
  setNavigationClient(e) {
    this.navigationClient = e;
  }
  /**
   * Returns the configuration object
   */
  getConfiguration() {
    return this.config;
  }
  /**
   * Returns the performance client
   */
  getPerformanceClient() {
    return this.performanceClient;
  }
  /**
   * Returns the browser env indicator
   */
  isBrowserEnv() {
    return this.isBrowserEnvironment;
  }
  /**
   * Generates a correlation id for a request if none is provided.
   *
   * @protected
   * @param {?Partial<BaseAuthRequest>} [request]
   * @returns {string}
   */
  getRequestCorrelationId(e) {
    return e != null && e.correlationId ? e.correlationId : this.isBrowserEnvironment ? O() : "";
  }
  // #endregion
  /**
   * Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
   * any code that follows this function will not execute.
   *
   * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
   * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
   *
   * @param request
   */
  async loginRedirect(e) {
    const t = this.getRequestCorrelationId(e);
    return this.logger.verbose("0lz9hf", t), this.acquireTokenRedirect({
      correlationId: t,
      ...e || Jn
    });
  }
  /**
   * Use when initiating the login process via opening a popup window in the user's browser
   *
   * @param request
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  loginPopup(e) {
    const t = this.getRequestCorrelationId(e);
    return this.logger.verbose("0qw7v5", t), this.acquireTokenPopup({
      correlationId: t,
      ...e || Jn
    });
  }
  /**
   * Silently acquire an access token for a given set of scopes. Returns currently processing promise if parallel requests are made.
   *
   * @param {@link (SilentRequest:type)}
   * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
   */
  async acquireTokenSilent(e) {
    const t = this.getRequestCorrelationId(e), n = this.performanceClient.startMeasurement(qr, t);
    n.add({
      cacheLookupPolicy: e.cacheLookupPolicy,
      scenarioId: e.scenarioId
    }), xt(this.initialized, n, e.account), this.logger.verbose("0x1c4s", t);
    const r = e.account || this.getActiveAccount();
    if (!r)
      throw m(_s);
    return this.acquireTokenSilentDeduped(e, r, t).then((o) => (n.end({
      success: !0,
      fromCache: o.fromCache,
      isNativeBroker: o.fromPlatformBroker,
      accessTokenSize: o.accessToken.length,
      idTokenSize: o.idToken.length
    }, void 0, o.account), {
      ...o,
      state: e.state,
      correlationId: t
      // Ensures PWB scenarios can correctly match request to response
    })).catch((o) => {
      throw o instanceof v && o.setCorrelationId(t), n.end({
        success: !1
      }, o, r), o;
    });
  }
  /**
   * Checks if identical request is already in flight and returns reference to the existing promise or fires off a new one if this is the first
   * @param request
   * @param account
   * @param correlationId
   * @returns
   */
  async acquireTokenSilentDeduped(e, t, n) {
    const r = fn(this.config.auth.clientId, {
      ...e,
      authority: e.authority || this.config.auth.authority
    }, t.homeAccountId), o = JSON.stringify(r), s = this.activeSilentTokenRequests.get(o);
    if (typeof s > "u") {
      this.logger.verbose("0fcjbk", n), this.performanceClient.addFields({ deduped: !1 }, n);
      const a = u(this.acquireTokenSilentAsync.bind(this), Rd, this.logger, this.performanceClient, n)({
        ...e,
        correlationId: n
      }, t);
      return this.activeSilentTokenRequests.set(o, a), a.finally(() => {
        this.activeSilentTokenRequests.delete(o);
      });
    } else
      return this.logger.verbose("1yq7nb", n), this.performanceClient.addFields({ deduped: !0 }, n), s;
  }
  /**
   * Silently acquire an access token for a given set of scopes. Will use cached token if available, otherwise will attempt to acquire a new token from the network via refresh token.
   * @param {@link (SilentRequest:type)}
   * @param {@link (AccountInfo:type)}
   * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse}
   */
  async acquireTokenSilentAsync(e, t) {
    const n = () => this.trackPageVisibility(e.correlationId);
    this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, e), e.correlationId && this.performanceClient.incrementFields({ visibilityChangeCount: 0 }, e.correlationId), document.addEventListener("visibilitychange", n);
    const r = await u(Tu, Ld, this.logger, this.performanceClient, e.correlationId)(e, t, this.config, this.performanceClient, this.logger), o = e.cacheLookupPolicy || U.Default;
    return this.acquireTokenSilentNoIframe(r, o).catch(async (a) => {
      if (ng(a, o))
        if (this.activeIframeRequest)
          if (o !== U.Skip) {
            const [h, l] = this.activeIframeRequest;
            this.logger.verbose("1w8fso", r.correlationId);
            const d = this.performanceClient.startMeasurement(Ud, r.correlationId);
            d.add({
              awaitIframeCorrelationId: l
            });
            const g = await h;
            if (d.end({
              success: g
            }), g)
              return this.logger.verbose("0ywzzi", r.correlationId), this.acquireTokenSilentNoIframe(r, o);
            throw this.logger.info("17y14q", r.correlationId), a;
          } else
            return this.logger.warning("1bd4p8", r.correlationId), u(this.acquireTokenBySilentIframe.bind(this), Zi, this.logger, this.performanceClient, r.correlationId)(r);
        else {
          let h;
          return this.activeIframeRequest = [
            new Promise((l) => {
              h = l;
            }),
            r.correlationId
          ], this.logger.verbose("0rh08z", r.correlationId), u(this.acquireTokenBySilentIframe.bind(this), Zi, this.logger, this.performanceClient, r.correlationId)(r).then((l) => (h(!0), l)).catch((l) => {
            throw h(!1), l;
          }).finally(() => {
            this.activeIframeRequest = void 0;
          });
        }
      else
        throw a;
    }).then((a) => (this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, a), e.correlationId && this.performanceClient.addFields({
      fromCache: a.fromCache,
      isNativeBroker: a.fromPlatformBroker
    }, e.correlationId), a)).catch((a) => {
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, a), a;
    }).finally(() => {
      document.removeEventListener("visibilitychange", n);
    });
  }
  /**
   * AcquireTokenSilent without the iframe fallback. This is used to enable the correct fallbacks in cases where there's a potential for multiple silent requests to be made in parallel and prevent those requests from making concurrent iframe requests.
   * @param silentRequest
   * @param cacheLookupPolicy
   * @returns
   */
  async acquireTokenSilentNoIframe(e, t) {
    return At(this.config, this.logger, e.correlationId, this.platformAuthProvider, e.authenticationScheme) && e.account.nativeAccountId ? (this.logger.verbose("0sczo4", e.correlationId), this.acquireTokenNative(e, k.acquireTokenSilent_silentFlow, e.account.nativeAccountId, t).catch(async (n) => {
      throw n instanceof ge && We(n) ? (this.logger.verbose("07rkmb", e.correlationId), this.platformAuthProvider = void 0, p(Le)) : n;
    })) : (this.logger.verbose("0ox81t", e.correlationId), t === U.AccessToken && this.logger.verbose("0fvwxe", e.correlationId), u(this.acquireTokenFromCache.bind(this), bd, this.logger, this.performanceClient, e.correlationId)(e, t).catch((n) => {
      if (t === U.AccessToken)
        throw n;
      return this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_NETWORK_START, C.Silent, e), u(this.acquireTokenByRefreshToken.bind(this), _d, this.logger, this.performanceClient, e.correlationId)(e, t);
    }));
  }
  /**
   * Pre-generates PKCE codes and stores it in local variable
   * @param correlationId
   */
  async preGeneratePkceCodes(e) {
    return this.logger.verbose("1x6uj6", e), this.pkceCode = await u(Ge, je, this.logger, this.performanceClient, e)(this.performanceClient, this.logger, e), Promise.resolve();
  }
  /**
   * Provides pre-generated PKCE codes, if any
   * @param correlationId
   */
  getPreGeneratedPkceCodes(e) {
    const t = this.pkceCode ? { ...this.pkceCode } : void 0;
    return this.pkceCode = void 0, t ? this.logger.verbose("12js1o", e) : this.logger.verbose("1oe9ci", e), this.performanceClient.addFields({ usePreGeneratedPkce: !!t }, e), t;
  }
  logMultipleInstances(e, t) {
    const n = this.config.auth.clientId;
    if (!window)
      return;
    window.msal = window.msal || {}, window.msal.clientIds = window.msal.clientIds || [], window.msal.clientIds.length > 0 && this.logger.verbose("1qtz3l", t), window.msal.clientIds.push(n), tg(n, e, this.logger, t);
  }
}
function ng(i, e) {
  const t = !(i instanceof Z && // For refresh token errors, bad_token does not always require interaction (silently resolvable)
  i.subError !== ln), n = i.errorCode === X.INVALID_GRANT_ERROR || i.errorCode === Le, r = t && n || i.errorCode === Wt || i.errorCode === Er, o = ad.includes(e);
  return r && o;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class _n {
  static loggerCallback(e, t) {
    switch (e) {
      case _.Error:
        console.error(t);
        return;
      case _.Info:
        return;
      case _.Verbose:
        return;
      case _.Warning:
        console.warn(t);
        return;
      default:
        return;
    }
  }
  constructor(e) {
    var c;
    this.browserEnvironment = typeof window < "u", this.config = va(e, this.browserEnvironment);
    let t;
    try {
      t = window[q.SessionStorage];
    } catch {
    }
    const n = t == null ? void 0 : t.getItem(du), r = (c = t == null ? void 0 : t.getItem(uu)) == null ? void 0 : c.toLowerCase(), o = r === "true" ? !0 : r === "false" ? !1 : void 0, s = { ...this.config.system.loggerOptions }, a = n && Object.keys(_).includes(n) ? _[n] : void 0;
    a && (s.loggerCallback = _n.loggerCallback, s.logLevel = a), o !== void 0 && (s.piiLoggingEnabled = o), this.logger = new Q(s, It, se), this.available = !1;
  }
  /**
   * Return the MSAL config
   * @returns BrowserConfiguration
   */
  getConfig() {
    return this.config;
  }
  /**
   * Returns the MSAL Logger
   * @returns Logger
   */
  getLogger() {
    return this.logger;
  }
  isAvailable() {
    return this.available;
  }
  isBrowserEnvironment() {
    return this.browserEnvironment;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class nt extends _n {
  /**
   * Return the module name.  Intended for use with import() to enable dynamic import
   * of the implementation associated with this operating context
   * @returns
   */
  getModuleName() {
    return nt.MODULE_NAME;
  }
  /**
   * Returns the unique identifier for this operating context
   * @returns string
   */
  getId() {
    return nt.ID;
  }
  /**
   * Checks whether the operating context is available.
   * Confirms that the code is running a browser rather.  This is required.
   * @returns Promise<boolean> indicating whether this operating context is currently available.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initialize(e) {
    return this.available = typeof window < "u", this.available;
  }
}
nt.MODULE_NAME = "";
nt.ID = "StandardOperatingContext";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function rg(i) {
  return i.status !== void 0;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Ce = {
  UserInteractionRequired: "USER_INTERACTION_REQUIRED",
  UserCancel: "USER_CANCEL",
  NoNetwork: "NO_NETWORK",
  TransientError: "TRANSIENT_ERROR",
  PersistentError: "PERSISTENT_ERROR",
  Disabled: "DISABLED",
  AccountUnavailable: "ACCOUNT_UNAVAILABLE",
  NestedAppAuthUnavailable: "NESTED_APP_AUTH_UNAVAILABLE"
  // NAA is unavailable in the current context, can retry with standard browser based auth
};
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ig {
  constructor(e, t, n, r) {
    this.clientId = e, this.clientCapabilities = t, this.crypto = n, this.logger = r;
  }
  toNaaTokenRequest(e) {
    var a;
    let t;
    e.extraQueryParameters === void 0 ? t = /* @__PURE__ */ new Map() : t = new Map(Object.entries(e.extraQueryParameters));
    const n = e.correlationId || this.crypto.createNewGuid(), r = fr(e.claims, this.clientCapabilities), o = e.scopes || Ue;
    return {
      platformBrokerId: (a = e.account) == null ? void 0 : a.homeAccountId,
      clientId: this.clientId,
      authority: e.authority,
      scope: o.join(" "),
      correlationId: n,
      claims: fe.isEmptyObj(r) ? void 0 : r,
      state: e.state,
      authenticationScheme: e.authenticationScheme || E.BEARER,
      extraParameters: t
    };
  }
  fromNaaTokenResponse(e, t, n) {
    if (!t.token.id_token || !t.token.access_token)
      throw p(Dn);
    const r = Te(n + (t.token.expires_in || 0)), o = re(t.token.id_token, this.crypto.base64Decode), s = this.fromNaaAccountInfo(t.account, t.token.id_token, o), a = t.token.scope || e.scope;
    return {
      authority: t.token.authority || s.environment,
      uniqueId: s.localAccountId,
      tenantId: s.tenantId,
      scopes: a.split(" "),
      account: s,
      idToken: t.token.id_token,
      idTokenClaims: o,
      accessToken: t.token.access_token,
      fromCache: !1,
      expiresOn: r,
      tokenType: e.authenticationScheme || E.BEARER,
      correlationId: e.correlationId,
      extExpiresOn: r,
      state: e.state
    };
  }
  /*
   *  export type AccountInfo = {
   *     homeAccountId: string;
   *     environment: string;
   *     tenantId: string;
   *     username: string;
   *     localAccountId: string;
   *     name?: string;
   *     idToken?: string;
   *     idTokenClaims?: TokenClaims & {
   *         [key: string]:
   *             | string
   *             | number
   *             | string[]
   *             | object
   *             | undefined
   *             | unknown;
   *     };
   *     nativeAccountId?: string;
   *     authorityType?: string;
   * };
   */
  fromNaaAccountInfo(e, t, n) {
    const r = n || e.idTokenClaims, o = e.localAccountId || (r == null ? void 0 : r.oid) || (r == null ? void 0 : r.sub) || "", s = e.tenantId || (r == null ? void 0 : r.tid) || "", a = e.homeAccountId || `${o}.${s}`, c = e.username || (r == null ? void 0 : r.preferred_username) || "", h = e.name || (r == null ? void 0 : r.name), l = e.loginHint || (r == null ? void 0 : r.login_hint), d = /* @__PURE__ */ new Map(), g = vt(a, o, s, r);
    return d.set(s, g), {
      homeAccountId: a,
      environment: e.environment,
      tenantId: s,
      username: c,
      localAccountId: o,
      name: h,
      loginHint: l,
      idToken: t,
      idTokenClaims: r,
      tenantProfiles: d
    };
  }
  /**
   *
   * @param error BridgeError
   * @returns AuthError, ClientAuthError, ClientConfigurationError, ServerError, InteractionRequiredError
   */
  fromBridgeError(e) {
    if (rg(e))
      switch (e.status) {
        case Ce.UserCancel:
          return new at(Bc);
        case Ce.NoNetwork:
          return new at(Fc);
        case Ce.AccountUnavailable:
          return new at(Fn);
        case Ce.Disabled:
          return new at(Ri);
        case Ce.NestedAppAuthUnavailable:
          return new at(e.code || Ri, e.description);
        case Ce.TransientError:
        case Ce.PersistentError:
          return new Ee(e.code, e.description);
        case Ce.UserInteractionRequired:
          return new Z(e.code, e.description);
        default:
          return new v(e.code, e.description);
      }
    else
      return new v("unknown_error", "An unknown error occurred");
  }
  /**
   * Returns an AuthenticationResult from the given cache items
   *
   * @param account
   * @param idToken
   * @param accessToken
   * @param reqTimestamp
   * @returns
   */
  toAuthenticationResultFromCache(e, t, n, r, o) {
    if (!t || !n)
      throw p(Dn);
    const s = re(t.secret, this.crypto.base64Decode), a = n.target || r.scopes.join(" ");
    return {
      authority: n.environment || e.environment,
      uniqueId: e.localAccountId,
      tenantId: e.tenantId,
      scopes: a.split(" "),
      account: e,
      idToken: t.secret,
      idTokenClaims: s || {},
      accessToken: n.secret,
      fromCache: !0,
      expiresOn: Te(n.expiresOn),
      extExpiresOn: Te(n.extendedExpiresOn),
      tokenType: r.authenticationScheme || E.BEARER,
      correlationId: o,
      state: r.state
    };
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Y extends v {
  constructor(e, t) {
    super(e, t), Object.setPrototypeOf(this, Y.prototype), this.name = "NestedAppAuthError";
  }
  static createUnsupportedError() {
    return new Y(bu);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ui {
  constructor(e) {
    this.operatingContext = e;
    const t = this.operatingContext.getBridgeProxy();
    if (t !== void 0)
      this.bridgeProxy = t;
    else
      throw new Error("unexpected: bridgeProxy is undefined");
    this.config = e.getConfig(), this.logger = this.operatingContext.getLogger(), this.performanceClient = this.config.telemetry.client, this.browserCrypto = e.isBrowserEnvironment() ? new oe(this.logger, this.performanceClient, !0) : pt, this.eventHandler = new ti(this.logger), this.browserStorage = this.operatingContext.isBrowserEnvironment() ? new Tt(this.config.auth.clientId, this.config.cache, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler, _r(this.config.auth)) : fa(this.config.auth.clientId, this.logger, this.performanceClient, this.eventHandler), this.nestedAppAuthAdapter = new ig(this.config.auth.clientId, this.config.auth.clientCapabilities, this.browserCrypto, this.logger);
    const n = this.bridgeProxy.getAccountContext();
    this.currentAccountContext = n || null;
  }
  /**
   * Factory function to create a new instance of NestedAppAuthController
   * @param operatingContext
   * @returns Promise<IController>
   */
  static async createController(e) {
    const t = new ui(e);
    return Promise.resolve(t);
  }
  /**
   * Specific implementation of initialize function for NestedAppAuthController
   * @returns
   */
  async initialize(e, t) {
    const n = (e == null ? void 0 : e.correlationId) || O();
    return await this.browserStorage.initialize(n), Promise.resolve();
  }
  /**
   * Validate the incoming request and add correlationId if not present
   * @param request
   * @returns
   */
  ensureValidRequest(e) {
    return e != null && e.correlationId ? e : {
      ...e,
      correlationId: this.browserCrypto.createNewGuid()
    };
  }
  /**
   * Internal implementation of acquireTokenInteractive flow
   * @param request
   * @returns
   */
  async acquireTokenInteractive(e) {
    const t = this.ensureValidRequest(e), n = t.correlationId || O();
    this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Popup, t);
    const r = this.performanceClient.startMeasurement(Zr, n);
    r.add({ nestedAppAuthRequest: !0 });
    try {
      const o = this.nestedAppAuthAdapter.toNaaTokenRequest(t), s = $(), a = await this.bridgeProxy.getTokenInteractive(o), c = {
        ...this.nestedAppAuthAdapter.fromNaaTokenResponse(o, a, s)
      };
      try {
        await this.hydrateCache(c, e);
      } catch {
        this.logger.warningPii("1mwr91", n);
      }
      return this.currentAccountContext = {
        homeAccountId: c.account.homeAccountId,
        environment: c.account.environment,
        tenantId: c.account.tenantId
      }, this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Popup, c), r.add({
        accessTokenSize: c.accessToken.length,
        idTokenSize: c.idToken.length
      }), r.end({
        success: !0,
        requestId: c.requestId
      }, void 0, c.account), c;
    } catch (o) {
      const s = o instanceof v ? o : this.nestedAppAuthAdapter.fromBridgeError(o);
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Popup, null, o), r.end({
        success: !1
      }, o, e.account), s;
    }
  }
  /**
   * Internal implementation of acquireTokenSilent flow
   * @param request
   * @returns
   */
  async acquireTokenSilentInternal(e) {
    const t = this.ensureValidRequest(e), n = t.correlationId || O();
    this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, t);
    const r = await this.acquireTokenFromCache(t);
    if (r)
      return this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, r), r;
    const o = this.performanceClient.startMeasurement(ei, n);
    o.increment({
      visibilityChangeCount: 0
    }), o.add({
      nestedAppAuthRequest: !0
    });
    try {
      const s = this.nestedAppAuthAdapter.toNaaTokenRequest(t);
      s.forceRefresh = t.forceRefresh;
      const a = $(), c = await this.bridgeProxy.getTokenSilent(s), h = this.nestedAppAuthAdapter.fromNaaTokenResponse(s, c, a);
      try {
        await this.hydrateCache(h, e);
      } catch {
        this.logger.warningPii("1mwr91", n);
      }
      return this.currentAccountContext = {
        homeAccountId: h.account.homeAccountId,
        environment: h.account.environment,
        tenantId: h.account.tenantId
      }, this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, h), o == null || o.add({
        accessTokenSize: h.accessToken.length,
        idTokenSize: h.idToken.length
      }), o == null || o.end({
        success: !0,
        requestId: h.requestId
      }, void 0, h.account), h;
    } catch (s) {
      const a = s instanceof v ? s : this.nestedAppAuthAdapter.fromBridgeError(s);
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, s), o == null || o.end({
        success: !1
      }, s, e.account), a;
    }
  }
  /**
   * acquires tokens from cache
   * @param request
   * @returns
   */
  async acquireTokenFromCache(e) {
    const t = e.correlationId || O(), n = this.performanceClient.startMeasurement(qr, t);
    if (n == null || n.add({
      nestedAppAuthRequest: !0
    }), e.claims)
      return this.logger.verbose("11t57w", t), null;
    if (e.forceRefresh)
      return this.logger.verbose("1ovnmo", t), null;
    let r = null;
    switch (e.cacheLookupPolicy || (e.cacheLookupPolicy = U.Default), e.cacheLookupPolicy) {
      case U.Default:
      case U.AccessToken:
      case U.AccessTokenAndRefreshToken:
        r = await this.acquireTokenFromCacheInternal(e);
        break;
      default:
        return null;
    }
    return r ? (this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, r), n.add({
      accessTokenSize: r.accessToken.length,
      idTokenSize: r.idToken.length
    }), n.end({
      success: !0
    }, void 0, r.account), r) : (this.logger.warning("1yb4fi", t), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null), n.end({
      success: !1
    }, void 0, e.account), null);
  }
  /**
   *
   * @param request
   * @returns
   */
  async acquireTokenFromCacheInternal(e) {
    var h;
    const t = this.bridgeProxy.getAccountContext() || this.currentAccountContext, n = e.correlationId || O();
    let r = null;
    if (t && (r = Zn(t, this.logger, this.browserStorage, n)), !r)
      return this.logger.verbose("10qnr0", n), Promise.resolve(null);
    this.logger.verbose("1u7hux", n);
    const o = {
      ...e,
      correlationId: n,
      authority: e.authority || r.environment,
      scopes: (h = e.scopes) != null && h.length ? e.scopes : [...Ue]
    }, s = this.browserStorage.getTokenKeys(), a = this.browserStorage.getAccessToken(r, o, s, r.tenantId);
    if (a) {
      if (ns(a.cachedAt) || mt(a.expiresOn, this.config.system.tokenRenewalOffsetSeconds))
        return this.logger.verbose("18egye", n), Promise.resolve(null);
    } else return this.logger.verbose("03vm49", n), Promise.resolve(null);
    const c = this.browserStorage.getIdToken(r, o.correlationId, s, r.tenantId);
    return c ? this.nestedAppAuthAdapter.toAuthenticationResultFromCache(r, c, a, o, o.correlationId) : (this.logger.verbose("0d68kd", n), Promise.resolve(null));
  }
  /**
   * acquireTokenPopup flow implementation
   * @param request
   * @returns
   */
  async acquireTokenPopup(e) {
    return this.acquireTokenInteractive(e);
  }
  /**
   * acquireTokenRedirect flow is not supported in nested app auth
   * @param request
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  acquireTokenRedirect(e) {
    throw Y.createUnsupportedError();
  }
  /**
   * acquireTokenSilent flow implementation
   * @param silentRequest
   * @returns
   */
  async acquireTokenSilent(e) {
    return this.acquireTokenSilentInternal(e);
  }
  /**
   * Hybrid flow is not currently supported in nested app auth
   * @param request
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  acquireTokenByCode(e) {
    throw Y.createUnsupportedError();
  }
  /**
   * Adds event callbacks to array
   * @param callback
   * @param eventTypes
   */
  addEventCallback(e, t) {
    return this.eventHandler.addEventCallback(e, t);
  }
  /**
   * Removes callback with provided id from callback array
   * @param callbackId
   */
  removeEventCallback(e) {
    this.eventHandler.removeEventCallback(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPerformanceCallback(e) {
    throw Y.createUnsupportedError();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removePerformanceCallback(e) {
    throw Y.createUnsupportedError();
  }
  // #region Account APIs
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(e) {
    return pa(this.logger, this.browserStorage, this.isBrowserEnv(), O(), e);
  }
  /**
   * Returns the first account found in the cache that matches the account filter passed in.
   * @param accountFilter
   * @returns The first account found in the cache matching the provided filter or null if no account could be found.
   */
  getAccount(e) {
    return Zn(e, this.logger, this.browserStorage, O());
  }
  /**
   * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
   * @param account
   */
  setActiveAccount(e) {
    return ma(e, this.browserStorage, O());
  }
  /**
   * Gets the currently active account
   */
  getActiveAccount() {
    return ya(this.browserStorage, O());
  }
  // #endregion
  handleRedirectPromise(e) {
    return Promise.resolve(null);
  }
  loginPopup(e) {
    return this.acquireTokenInteractive(e || Jn);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginRedirect(e) {
    throw Y.createUnsupportedError();
  }
  logoutRedirect(e) {
    throw Y.createUnsupportedError();
  }
  logoutPopup(e) {
    throw Y.createUnsupportedError();
  }
  ssoSilent(e) {
    return this.acquireTokenSilentInternal(e);
  }
  /**
   * Returns the logger instance
   */
  getLogger() {
    return this.logger;
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger Logger instance
   */
  setLogger(e) {
    this.logger = e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initializeWrapperLibrary(e, t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNavigationClient(e) {
    this.logger.warning("1k8729", "");
  }
  getConfiguration() {
    return this.config;
  }
  isBrowserEnv() {
    return this.operatingContext.isBrowserEnvironment();
  }
  getBrowserCrypto() {
    return this.browserCrypto;
  }
  getPerformanceClient() {
    throw Y.createUnsupportedError();
  }
  getRedirectResponse() {
    throw Y.createUnsupportedError();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async clearCache(e) {
    throw Y.createUnsupportedError();
  }
  async hydrateCache(e, t) {
    this.logger.verbose("16jycr", e.correlationId);
    const n = Ir(e.account, e.cloudGraphHostName, e.msGraphHost);
    return await this.browserStorage.setAccount(n, e.correlationId, de(e.idTokenClaims)), this.browserStorage.hydrateCache(e, t);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class G {
  /**
   * initializeNestedAppAuthBridge - Initializes the bridge to the host app
   * @returns a promise that resolves to an InitializeBridgeResponse or rejects with an Error
   * @remarks This method will be called by the create factory method
   * @remarks If the bridge is not available, this method will throw an error
   */
  static async initializeNestedAppAuthBridge() {
    if (window === void 0)
      throw new Error("window is undefined");
    if (window.nestedAppAuthBridge === void 0)
      throw new Error("window.nestedAppAuthBridge is undefined");
    try {
      window.nestedAppAuthBridge.addEventListener("message", (t) => {
        const n = typeof t == "string" ? t : t.data, r = JSON.parse(n), o = G.bridgeRequests.find((s) => s.requestId === r.requestId);
        o !== void 0 && (G.bridgeRequests.splice(G.bridgeRequests.indexOf(o), 1), r.success ? o.resolve(r) : o.reject(r.error));
      });
      const e = await new Promise((t, n) => {
        const r = G.buildRequest("GetInitContext"), o = {
          requestId: r.requestId,
          method: r.method,
          resolve: t,
          reject: n
        };
        G.bridgeRequests.push(o), window.nestedAppAuthBridge.postMessage(JSON.stringify(r));
      });
      return G.validateBridgeResultOrThrow(e.initContext);
    } catch (e) {
      throw window.console.log(e), e;
    }
  }
  /**
   * getTokenInteractive - Attempts to get a token interactively from the bridge
   * @param request A token request
   * @returns a promise that resolves to an auth result or rejects with a BridgeError
   */
  getTokenInteractive(e) {
    return this.getToken("GetTokenPopup", e);
  }
  /**
   * getTokenSilent Attempts to get a token silently from the bridge
   * @param request A token request
   * @returns a promise that resolves to an auth result or rejects with a BridgeError
   */
  getTokenSilent(e) {
    return this.getToken("GetToken", e);
  }
  async getToken(e, t) {
    const n = await this.sendRequest(e, {
      tokenParams: t
    });
    return {
      token: G.validateBridgeResultOrThrow(n.token),
      account: G.validateBridgeResultOrThrow(n.account)
    };
  }
  getHostCapabilities() {
    return this.capabilities ?? null;
  }
  getAccountContext() {
    return this.accountContext ? this.accountContext : null;
  }
  static buildRequest(e, t) {
    return {
      messageType: "NestedAppAuthRequest",
      method: e,
      requestId: O(),
      sendTime: Date.now(),
      clientLibrary: X.MSAL_SKU,
      clientLibraryVersion: se,
      ...t
    };
  }
  /**
   * A method used to send a request to the bridge
   * @param request A token request
   * @returns a promise that resolves to a response of provided type or rejects with a BridgeError
   */
  sendRequest(e, t) {
    const n = G.buildRequest(e, t);
    return new Promise((o, s) => {
      const a = {
        requestId: n.requestId,
        method: n.method,
        resolve: o,
        reject: s
      };
      G.bridgeRequests.push(a), window.nestedAppAuthBridge.postMessage(JSON.stringify(n));
    });
  }
  static validateBridgeResultOrThrow(e) {
    if (e === void 0)
      throw {
        status: Ce.NestedAppAuthUnavailable
      };
    return e;
  }
  /**
   * Private constructor for BridgeProxy
   * @param sdkName The name of the SDK being used to make requests on behalf of the app
   * @param sdkVersion The version of the SDK being used to make requests on behalf of the app
   * @param capabilities The capabilities of the bridge / SDK / platform broker
   */
  constructor(e, t, n, r) {
    this.sdkName = e, this.sdkVersion = t, this.accountContext = n, this.capabilities = r;
  }
  /**
   * Factory method for creating an implementation of IBridgeProxy
   * @returns A promise that resolves to a BridgeProxy implementation
   */
  static async create() {
    const e = await G.initializeNestedAppAuthBridge();
    return new G(e.sdkName, e.sdkVersion, e.accountContext, e.capabilities);
  }
}
G.bridgeRequests = [];
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class rt extends _n {
  constructor() {
    super(...arguments), this.bridgeProxy = void 0, this.accountContext = null;
  }
  /**
   * Return the module name.  Intended for use with import() to enable dynamic import
   * of the implementation associated with this operating context
   * @returns
   */
  getModuleName() {
    return rt.MODULE_NAME;
  }
  /**
   * Returns the unique identifier for this operating context
   * @returns string
   */
  getId() {
    return rt.ID;
  }
  /**
   * Returns the current BridgeProxy
   * @returns IBridgeProxy | undefined
   */
  getBridgeProxy() {
    return this.bridgeProxy;
  }
  /**
   * Checks whether the operating context is available.
   * Confirms that the code is running a browser rather.  This is required.
   * @param correlationId
   * @returns Promise<boolean> indicating whether this operating context is currently available.
   */
  async initialize(e) {
    try {
      if (typeof window < "u") {
        typeof window.__initializeNestedAppAuth == "function" && await window.__initializeNestedAppAuth();
        const t = await G.create();
        this.accountContext = t.getAccountContext(), this.bridgeProxy = t, this.available = t !== void 0;
      }
    } catch {
      this.logger.infoPii("1mdxyj", e);
    }
    return this.logger.info("12jy9a", e), this.available;
  }
}
rt.MODULE_NAME = "";
rt.ID = "NestedAppOperatingContext";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ba {
  /**
   * @constructor
   * Constructor for the PublicClientApplication used to instantiate the PublicClientApplication object
   *
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
   * - authority: the authority URL for your application.
   * - redirect_uri: the uri of your application registered in the portal.
   *
   * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
   * It is of the form https://login.microsoftonline.com/{Enter_the_Tenant_Info_Here}
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * In Azure B2C, authority is of the form https://{instance}/tfp/{tenant}/{policyName}/
   * Full B2C functionality will be available in this library in future versions.
   *
   * @param configuration Object for the MSAL PublicClientApplication instance
   * @param IController Optional parameter to explictly set the controller. (Will be removed when we remove public constructor)
   */
  constructor(e, t) {
    this.controller = t || new di(new nt(e));
  }
  /**
   * Initializer function to perform async startup tasks such as connecting to WAM extension
   * @param request {?InitializeApplicationRequest}
   */
  async initialize(e) {
    return this.controller.initialize(e);
  }
  /**
   * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
   *
   * @param request
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  async acquireTokenPopup(e) {
    return this.controller.acquireTokenPopup(e);
  }
  /**
   * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
   * the page, so any code that follows this function will not execute.
   *
   * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
   * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
   *
   * @param request
   */
  acquireTokenRedirect(e) {
    return this.controller.acquireTokenRedirect(e);
  }
  /**
   * Silently acquire an access token for a given set of scopes. Returns currently processing promise if parallel requests are made.
   *
   * @param {@link (SilentRequest:type)}
   * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthenticationResult} object
   */
  acquireTokenSilent(e) {
    return this.controller.acquireTokenSilent(e);
  }
  /**
   * This function redeems an authorization code (passed as code) from the eSTS token endpoint.
   * This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
   * This API is not indended for normal authorization code acquisition and redemption.
   *
   * Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
   *
   * @param request {@link AuthorizationCodeRequest}
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  acquireTokenByCode(e) {
    return this.controller.acquireTokenByCode(e);
  }
  /**
   * Adds event callbacks to array
   * @param callback
   * @param eventTypes
   */
  addEventCallback(e, t) {
    return this.controller.addEventCallback(e, t);
  }
  /**
   * Removes callback with provided id from callback array
   * @param callbackId
   */
  removeEventCallback(e) {
    return this.controller.removeEventCallback(e);
  }
  /**
   * Registers a callback to receive performance events.
   *
   * @param {PerformanceCallbackFunction} callback
   * @returns {string}
   */
  addPerformanceCallback(e) {
    return this.controller.addPerformanceCallback(e);
  }
  /**
   * Removes a callback registered with addPerformanceCallback.
   *
   * @param {string} callbackId
   * @returns {boolean}
   */
  removePerformanceCallback(e) {
    return this.controller.removePerformanceCallback(e);
  }
  /**
   * Returns the first account found in the cache that matches the account filter passed in.
   * @param accountFilter
   * @returns The first account found in the cache matching the provided filter or null if no account could be found.
   */
  getAccount(e) {
    return this.controller.getAccount(e);
  }
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(e) {
    return this.controller.getAllAccounts(e);
  }
  /**
   * Event handler function which allows users to fire events after the PublicClientApplication object
   * has loaded during redirect flows. This should be invoked on all page loads involved in redirect
   * auth flows.
   * @param hash Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.
   * @param options Object containing optional configuration for redirect promise handling.
   * @returns Token response or null. If the return value is null, then no auth redirect was detected.
   */
  handleRedirectPromise(e) {
    return this.controller.handleRedirectPromise(e);
  }
  /**
   * Use when initiating the login process via opening a popup window in the user's browser
   *
   * @param request
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  loginPopup(e) {
    return this.controller.loginPopup(e);
  }
  /**
   * Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
   * any code that follows this function will not execute.
   *
   * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
   * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
   *
   * @param request
   */
  loginRedirect(e) {
    return this.controller.loginRedirect(e);
  }
  /**
   * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param logoutRequest
   */
  logoutRedirect(e) {
    return this.controller.logoutRedirect(e);
  }
  /**
   * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
   * @param logoutRequest
   */
  logoutPopup(e) {
    return this.controller.logoutPopup(e);
  }
  /**
   * This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
   * - Any browser using a form of Intelligent Tracking Prevention
   * - If there is not an established session with the service
   *
   * In these cases, the request must be done inside a popup or full frame redirect.
   *
   * For the cases where interaction is required, you cannot send a request with prompt=none.
   *
   * If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
   * you session on the server still exists.
   * @param request {@link SsoSilentRequest}
   *
   * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
   */
  ssoSilent(e) {
    return this.controller.ssoSilent(e);
  }
  /**
   * Returns the logger instance
   */
  getLogger() {
    return this.controller.getLogger();
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger Logger instance
   */
  setLogger(e) {
    this.controller.setLogger(e);
  }
  /**
   * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
   * @param account
   */
  setActiveAccount(e) {
    this.controller.setActiveAccount(e);
  }
  /**
   * Gets the currently active account
   */
  getActiveAccount() {
    return this.controller.getActiveAccount();
  }
  /**
   * Called by wrapper libraries (Angular & React) to set SKU and Version passed down to telemetry, logger, etc.
   * @param sku
   * @param version
   */
  initializeWrapperLibrary(e, t) {
    return this.controller.initializeWrapperLibrary(e, t);
  }
  /**
   * Sets navigation client
   * @param navigationClient
   */
  setNavigationClient(e) {
    this.controller.setNavigationClient(e);
  }
  /**
   * Returns the configuration object
   * @internal
   */
  getConfiguration() {
    return this.controller.getConfiguration();
  }
  /**
   * Hydrates cache with the tokens and account in the AuthenticationResult object
   * @param result
   * @param request - The request object that was used to obtain the AuthenticationResult
   * @returns
   */
  async hydrateCache(e, t) {
    return this.controller.hydrateCache(e, t);
  }
  /**
   * Clears tokens and account from the browser cache.
   * @param logoutRequest
   */
  clearCache(e) {
    return this.controller.clearCache(e);
  }
}
async function Eg(i, e, t) {
  const n = e || O(), r = new rt(i);
  if (await r.initialize(n), r.isAvailable()) {
    const o = new ui(r), s = t ? t(i, o) : new ba(i, o);
    return await s.initialize({ correlationId: n }), s;
  }
  return og(i);
}
async function og(i) {
  const e = new ba(i);
  return await e.initialize(), e;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const kg = {
  initialize: () => Promise.reject(D(F)),
  acquireTokenPopup: () => Promise.reject(D(F)),
  acquireTokenRedirect: () => Promise.reject(D(F)),
  acquireTokenSilent: () => Promise.reject(D(F)),
  acquireTokenByCode: () => Promise.reject(D(F)),
  getAllAccounts: () => [],
  getAccount: () => null,
  handleRedirectPromise: () => Promise.reject(D(F)),
  loginPopup: () => Promise.reject(D(F)),
  loginRedirect: () => Promise.reject(D(F)),
  logoutRedirect: () => Promise.reject(D(F)),
  logoutPopup: () => Promise.reject(D(F)),
  ssoSilent: () => Promise.reject(D(F)),
  addEventCallback: () => null,
  removeEventCallback: () => {
  },
  addPerformanceCallback: () => "",
  removePerformanceCallback: () => !1,
  getLogger: () => {
    throw D(F);
  },
  setLogger: () => {
  },
  setActiveAccount: () => {
  },
  getActiveAccount: () => null,
  initializeWrapperLibrary: () => {
  },
  setNavigationClient: () => {
  },
  getConfiguration: () => {
    throw D(F);
  },
  hydrateCache: () => Promise.reject(D(F)),
  clearCache: () => Promise.reject(D(F))
};
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function vg(i, e, t, n, r = new St()) {
  Tn();
  const o = va(i, !0), s = e.correlationId || O(), a = r.startMeasurement(ua, s);
  try {
    const c = t.id_token ? re(t.id_token, j) : void 0, h = de(c || {}), l = {
      protocolMode: o.system.protocolMode,
      knownAuthorities: o.auth.knownAuthorities,
      cloudDiscoveryMetadata: o.auth.cloudDiscoveryMetadata,
      authorityMetadata: o.auth.authorityMetadata
    }, d = new Q(o.system.loggerOptions || {}), g = new oe(d, o.telemetry.client), f = new Tt(o.auth.clientId, o.cache, g, d, o.telemetry.client, new ti(d), _r(o.auth)), w = e.authority ? new z(z.generateAuthority(e.authority, e.azureCloudOptions), o.system.networkClient, f, l, d, e.correlationId || O(), o.telemetry.client) : void 0, I = await u(sg, ou, d, r, s)(e, n.clientInfo || t.client_info || "", s, f, d, g, c, w), A = await u(ag, su, d, r, s)(t, I.homeAccountId, I.environment, I.realm, h, s, f, d, i.auth.clientId), P = await u(cg, au, d, r, s)(e, t, I.homeAccountId, I.environment, I.realm, h, n, s, f, d, i.auth.clientId), S = await u(hg, cu, d, r, s)(t, I.homeAccountId, I.environment, h, s, f, d, i.auth.clientId);
    return a.end({ success: !0 }, void 0, me(I)), lg(e, {
      account: I,
      idToken: A,
      accessToken: P,
      refreshToken: S
    }, c, w);
  } catch (c) {
    throw a.end({ success: !1 }, c), c;
  }
}
async function sg(i, e, t, n, r, o, s, a) {
  if (r.verbose("0ke46k", t), i.account) {
    const d = Ir(i.account);
    return await n.setAccount(d, t, de(s || {})), d;
  } else if (!a || !e && !s)
    throw r.error("1ychpz", t), m(Ms);
  const c = Tr(e, a.authorityType, r, o, t, s), h = s == null ? void 0 : s.tid, l = br(
    n,
    a,
    c,
    j,
    t,
    s,
    e,
    a.hostnameAndPort,
    h,
    void 0,
    // authCodePayload
    void 0,
    // nativeAccountId
    r
  );
  return await n.setAccount(l, t, de(s || {})), l;
}
async function ag(i, e, t, n, r, o, s, a, c) {
  if (!i.id_token)
    return a.verbose("1pm7g1", o), null;
  a.verbose("168lyi", o);
  const h = dn(e, t, i.id_token, c, n);
  return await s.setIdTokenCredential(h, o, r), h;
}
async function cg(i, e, t, n, r, o, s, a, c, h, l) {
  if (e.access_token)
    if (e.expires_in) {
      if (!e.scope && (!i.scopes || !i.scopes.length))
        return h.error("1h7xse", a), null;
    } else return h.error("15mzx8", a), null;
  else return h.verbose("1ckp9e", a), null;
  h.verbose("01kmxb", a);
  const d = e.scope ? x.fromString(e.scope) : new x(i.scopes), g = s.expiresOn || e.expires_in + $(), f = s.extendedExpiresOn || (e.ext_expires_in || e.expires_in) + $(), w = un(t, n, e.access_token, l, r, d.printScopes(), g, f, j);
  return await c.setAccessTokenCredential(w, a, o), w;
}
async function hg(i, e, t, n, r, o, s, a) {
  if (!i.refresh_token)
    return s.verbose("1l7um5", r), null;
  s.verbose("0qy8ev", r);
  const c = is(
    e,
    t,
    i.refresh_token,
    a,
    i.foci,
    void 0,
    // userAssertionHash
    i.refresh_token_expires_in
  );
  return await o.setRefreshTokenCredential(c, r, n), c;
}
function lg(i, e, t, n) {
  var h, l, d;
  let r = "", o = [], s = null, a;
  e != null && e.accessToken && (r = e.accessToken.secret, o = x.fromString(e.accessToken.target).asArray(), s = Te(e.accessToken.expiresOn), a = Te(e.accessToken.extendedExpiresOn));
  const c = e.account;
  return {
    authority: n ? n.canonicalAuthority : "",
    uniqueId: e.account.localAccountId,
    tenantId: e.account.realm,
    scopes: o,
    account: me(c),
    idToken: ((h = e.idToken) == null ? void 0 : h.secret) || "",
    idTokenClaims: t || {},
    accessToken: r,
    fromCache: !0,
    expiresOn: s,
    correlationId: i.correlationId || "",
    requestId: "",
    extExpiresOn: a,
    familyId: ((l = e.refreshToken) == null ? void 0 : l.familyId) || "",
    tokenType: ((d = e == null ? void 0 : e.accessToken) == null ? void 0 : d.tokenType) || "",
    state: i.state || "",
    cloudGraphHostName: c.cloudGraphHostName || "",
    msGraphHost: c.msGraphHost || "",
    fromPlatformBroker: !1
  };
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Sg {
  /**
   * Gets interaction status from event message
   * @param message
   * @param currentStatus
   */
  static getInteractionStatusFromEvent(e, t) {
    switch (e.eventType) {
      case y.ACQUIRE_TOKEN_START:
        if (e.interactionType === C.Redirect || e.interactionType === C.Popup)
          return ye.AcquireToken;
        break;
      case y.HANDLE_REDIRECT_START:
        return ye.HandleRedirect;
      case y.LOGOUT_START:
        return ye.Logout;
      case y.LOGOUT_END:
        if (t && t !== ye.Logout)
          break;
        return ye.None;
      case y.HANDLE_REDIRECT_END:
        if (t && t !== ye.HandleRedirect)
          break;
        return ye.None;
      case y.ACQUIRE_TOKEN_SUCCESS:
      case y.ACQUIRE_TOKEN_FAILURE:
      case y.RESTORE_FROM_BFCACHE:
        if (e.interactionType === C.Redirect || e.interactionType === C.Popup) {
          if (t && t !== ye.AcquireToken)
            break;
          return ye.None;
        }
        break;
    }
    return null;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class bg {
  constructor(e, t) {
    const n = t && t.loggerOptions || {};
    this.logger = new Q(n, It, se), this.cryptoOps = new oe(this.logger), this.popTokenGenerator = new Be(this.cryptoOps, new St()), this.shrParameters = e;
  }
  /**
   * Generates and caches a keypair for the given request options.
   * @returns Public key digest, which should be sent to the token issuer.
   */
  async generatePublicKeyThumbprint() {
    const { kid: e } = await this.popTokenGenerator.generateKid(this.shrParameters);
    return e;
  }
  /**
   * Generates a signed http request for the given payload with the given key.
   * @param payload Payload to sign (e.g. access token)
   * @param publicKeyThumbprint Public key digest (from generatePublicKeyThumbprint API)
   * @param claims Additional claims to include/override in the signed JWT
   * @returns Pop token signed with the corresponding private key
   */
  async signRequest(e, t, n) {
    return this.popTokenGenerator.signPayload(e, t, this.shrParameters, n);
  }
  /**
   * Removes cached keys from browser for given public key thumbprint
   * @param publicKeyThumbprint Public key digest (from generatePublicKeyThumbprint API)
   * @param correlationId
   * @returns If keys are properly deleted
   */
  async removeKeys(e, t) {
    return this.cryptoOps.removeTokenBindingKey(e, t);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function go() {
  let i;
  try {
    i = window[q.SessionStorage];
    const e = i == null ? void 0 : i.getItem(gu);
    if (Number(e) === 1)
      return Promise.resolve().then(() => ug);
  } catch {
  }
}
function _a() {
  return typeof window < "u" && typeof window.performance < "u" && typeof window.performance.now == "function";
}
function dg(i) {
  if (!(!i || !_a()))
    return Math.round(window.performance.now() - i);
}
class _g extends id {
  constructor(e, t) {
    var n, r;
    super(e.auth.clientId, e.auth.authority || `${No}`, new Q(((n = e.system) == null ? void 0 : n.loggerOptions) || {}, It, se), It, se, ((r = e.telemetry) == null ? void 0 : r.application) || {
      appName: "",
      appVersion: ""
    }, t);
  }
  generateId() {
    return O();
  }
  getPageVisibility() {
    var e;
    return ((e = document.visibilityState) == null ? void 0 : e.toString()) || null;
  }
  deleteIncompleteSubMeasurements(e) {
    var t;
    (t = go()) == null || t.then((n) => {
      const r = this.eventsByCorrelationId.get(e.event.correlationId), o = r && r.eventId === e.event.eventId, s = [];
      o && (r != null && r.incompleteSubMeasurements) && r.incompleteSubMeasurements.forEach((a) => {
        s.push({ ...a });
      }), n.BrowserPerformanceMeasurement.flushMeasurements(e.event.correlationId, s);
    });
  }
  /**
   * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
   * Also captures browser page visibilityState.
   *
   * @param {PerformanceEvents} measureName
   * @param {?string} [correlationId]
   * @returns {((event?: Partial<PerformanceEvent>) => PerformanceEvent| null)}
   */
  startMeasurement(e, t) {
    var a;
    const n = this.getPageVisibility(), r = super.startMeasurement(e, t), o = _a() ? window.performance.now() : void 0, s = (a = go()) == null ? void 0 : a.then((c) => new c.BrowserPerformanceMeasurement(e, r.event.correlationId));
    return s == null || s.then((c) => c.startMeasurement()), {
      ...r,
      end: (c, h, l) => {
        const d = r.end({
          ...c,
          startPageVisibility: n,
          endPageVisibility: this.getPageVisibility(),
          durationMs: dg(o)
        }, h, l);
        return s == null || s.then((g) => g.endMeasurement()), this.deleteIncompleteSubMeasurements(r), d;
      },
      discard: () => {
        r.discard(), s == null || s.then((c) => c.flushMeasurement()), this.deleteIncompleteSubMeasurements(r);
      }
    };
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class te {
  constructor(e, t) {
    this.correlationId = t, this.measureName = te.makeMeasureName(e, t), this.startMark = te.makeStartMark(e, t), this.endMark = te.makeEndMark(e, t);
  }
  static makeMeasureName(e, t) {
    return `msal.measure.${e}.${t}`;
  }
  static makeStartMark(e, t) {
    return `msal.start.${e}.${t}`;
  }
  static makeEndMark(e, t) {
    return `msal.end.${e}.${t}`;
  }
  static supportsBrowserPerformance() {
    return typeof window < "u" && typeof window.performance < "u" && typeof window.performance.mark == "function" && typeof window.performance.measure == "function" && typeof window.performance.clearMarks == "function" && typeof window.performance.clearMeasures == "function" && typeof window.performance.getEntriesByName == "function";
  }
  /**
   * Flush browser marks and measurements.
   * @param {string} correlationId
   * @param {SubMeasurement} measurements
   */
  static flushMeasurements(e, t) {
    if (te.supportsBrowserPerformance())
      try {
        t.forEach((n) => {
          const r = te.makeMeasureName(n.name, e);
          window.performance.getEntriesByName(r, "measure").length > 0 && (window.performance.clearMeasures(r), window.performance.clearMarks(te.makeStartMark(r, e)), window.performance.clearMarks(te.makeEndMark(r, e)));
        });
      } catch {
      }
  }
  startMeasurement() {
    if (te.supportsBrowserPerformance())
      try {
        window.performance.mark(this.startMark);
      } catch {
      }
  }
  endMeasurement() {
    if (te.supportsBrowserPerformance())
      try {
        window.performance.mark(this.endMark), window.performance.measure(this.measureName, this.startMark, this.endMark);
      } catch {
      }
  }
  flushMeasurement() {
    if (te.supportsBrowserPerformance())
      try {
        const e = window.performance.getEntriesByName(this.measureName, "measure");
        if (e.length > 0) {
          const t = e[0].duration;
          return window.performance.clearMeasures(this.measureName), window.performance.clearMarks(this.startMark), window.performance.clearMarks(this.endMark), t;
        }
      } catch {
      }
    return null;
  }
}
const ug = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BrowserPerformanceMeasurement: te
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Rg = E, Og = sn, Pg = V, Ng = Po, Mg = Ue;
export {
  k as ApiId,
  v as AuthError,
  mg as AuthErrorCodes,
  pg as AuthenticationHeaderParser,
  Rg as AuthenticationScheme,
  mr as AzureCloudInstance,
  _t as BrowserAuthError,
  Cg as BrowserAuthErrorCodes,
  q as BrowserCacheLocation,
  Gr as BrowserConfigurationAuthError,
  wg as BrowserConfigurationAuthErrorCodes,
  _g as BrowserPerformanceClient,
  te as BrowserPerformanceMeasurement,
  Tg as BrowserRootPerformanceEvents,
  Ig as BrowserUtils,
  U as CacheLookupPolicy,
  at as ClientAuthError,
  Dg as ClientAuthErrorCodes,
  Lg as ClientConfigurationError,
  Hg as ClientConfigurationErrorCodes,
  Bu as DEFAULT_IFRAME_TIMEOUT_MS,
  ti as EventHandler,
  Sg as EventMessageUtils,
  y as EventType,
  Z as InteractionRequiredAuthError,
  fg as InteractionRequiredAuthErrorCodes,
  ye as InteractionStatus,
  C as InteractionType,
  Ng as JsonWebTokenTypes,
  Cu as LocalStorage,
  _ as LogLevel,
  Q as Logger,
  vn as MemoryStorage,
  rn as NavigationClient,
  Mg as OIDC_DEFAULT_SCOPES,
  Pg as PromptValue,
  J as ProtocolMode,
  ba as PublicClientApplication,
  Og as ResponseMode,
  Ee as ServerError,
  wu as SessionStorage,
  bg as SignedHttpRequest,
  St as StubPerformanceClient,
  yg as WrapperSKU,
  Eg as createNestablePublicClientApplication,
  og as createStandardPublicClientApplication,
  Ag as isPlatformBrokerAvailable,
  vg as loadExternalTokens,
  kg as stubbedPublicClientApplication,
  se as version
};
