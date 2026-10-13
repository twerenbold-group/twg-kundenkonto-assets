/*! @azure/msal-common v16.0.2 2026-01-17 */
const Pt = "msal.js.common", N = "https://login.microsoftonline.com/common/", Ut = "login.microsoftonline.com", Ht = "common", bt = "adfs", Ft = "dstsv2", vt = `${N}discovery/instance?api-version=1.1&authorization_endpoint=`, kt = ".ciamlogin.com", wt = ".onmicrosoft.com", l = "|", g = "openid", I = "profile", f = "offline_access", y = "email", Vt = "S256", Gt = "application/x-www-form-urlencoded;charset=utf-8", Kt = "Not Available", D = "/", Wt = "http://169.254.169.254/metadata/instance/compute/location", xt = "2020-06-01", jt = 2e3, qt = "TryAutoDetect", Yt = "login.microsoft.com", Bt = [
  "login.microsoftonline.com",
  "login.windows.net",
  "login.microsoft.com",
  "sts.windows.net"
], zt = 240, Qt = "invalid_instance", Xt = 200, Jt = 400, $t = 400, Zt = 499, te = 500, ee = 599, se = {
  GET: "GET",
  POST: "POST"
}, M = [
  g,
  I,
  f
], ne = [...M, y], oe = {
  CONTENT_TYPE: "Content-Type",
  CONTENT_LENGTH: "Content-Length",
  RETRY_AFTER: "Retry-After",
  CCS_HEADER: "X-AnchorMailbox",
  WWWAuthenticate: "WWW-Authenticate",
  AuthenticationInfo: "Authentication-Info",
  X_MS_REQUEST_ID: "x-ms-request-id",
  X_MS_HTTP_VERSION: "x-ms-httpver"
}, ae = {
  ACTIVE_ACCOUNT_FILTERS: "active-account-filters"
  // new cache entry for active_account for a more robust version for browser
}, p = {
  COMMON: "common",
  ORGANIZATIONS: "organizations",
  CONSUMERS: "consumers"
}, re = {
  ACCESS_TOKEN: "access_token",
  XMS_CC: "xms_cc"
}, ce = {
  LOGIN: "login",
  SELECT_ACCOUNT: "select_account",
  CONSENT: "consent",
  NONE: "none",
  CREATE: "create",
  NO_SESSION: "no_session"
}, ie = {
  CODE: "code",
  IDTOKEN_TOKEN_REFRESHTOKEN: "id_token token refresh_token"
}, _e = {
  QUERY: "query",
  FRAGMENT: "fragment",
  FORM_POST: "form_post"
}, Ee = {
  AUTHORIZATION_CODE_GRANT: "authorization_code",
  REFRESH_TOKEN_GRANT: "refresh_token"
}, ue = "MSSTS", Te = "ADFS", le = "Generic", Ae = "-", Se = ".", me = {
  ID_TOKEN: "IdToken",
  ACCESS_TOKEN: "AccessToken",
  ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
  REFRESH_TOKEN: "RefreshToken"
}, Re = "appmetadata", de = "client_info", pe = "1", Oe = "authority-metadata", he = 3600 * 24, Ce = {
  CONFIG: "config",
  CACHE: "cache",
  NETWORK: "network",
  HARDCODED_VALUES: "hardcoded_values"
}, Ne = 5, ge = 330, Ie = 50, fe = "server-telemetry", ye = "|", De = ",", Me = "1", Le = "0", Pe = "unknown_error", Ue = {
  BEARER: "Bearer",
  POP: "pop",
  SSH: "ssh-cert"
}, He = 60, be = 3600, Fe = "throttling", ve = "retry-after, h429", ke = "invalid_grant", we = "client_mismatch", Ve = {
  FAILED_AUTO_DETECTION: "1",
  INTERNAL_CACHE: "2",
  ENVIRONMENT_VARIABLE: "3",
  IMDS: "4"
}, Ge = {
  CONFIGURED_NO_AUTO_DETECTION: "2",
  AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
  AUTO_DETECTION_REQUESTED_FAILED: "5"
}, Ke = {
  // When a token is found in the cache or the cache is not supposed to be hit when making the request
  NOT_APPLICABLE: "0",
  // When the token request goes to the identity provider because force_refresh was set to true. Also occurs if claims were requested
  FORCE_REFRESH_OR_CLAIMS: "1",
  // When the token request goes to the identity provider because no cached access token exists
  NO_CACHED_ACCESS_TOKEN: "2",
  // When the token request goes to the identity provider because cached access token expired
  CACHED_ACCESS_TOKEN_EXPIRED: "3",
  // When the token request goes to the identity provider because refresh_in was used and the existing token needs to be refreshed
  PROACTIVELY_REFRESHED: "4"
}, We = {
  Jwt: "JWT",
  Jwk: "JWK",
  Pop: "pop"
}, xe = 300;
/*! @azure/msal-common v16.0.2 2026-01-17 */
function O(n) {
  return `See https://aka.ms/msal.js.errors#${n} for details`;
}
class _ extends Error {
  constructor(t, e, s) {
    const o = e || (t ? O(t) : ""), a = o ? `${t}: ${o}` : t;
    super(a), Object.setPrototypeOf(this, _.prototype), this.errorCode = t || "", this.errorMessage = o || "", this.subError = s || "", this.name = "AuthError";
  }
  setCorrelationId(t) {
    this.correlationId = t;
  }
}
function je(n, t) {
  return new _(n, t || O(n));
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class S extends _ {
  constructor(t) {
    super(t), this.name = "ClientConfigurationError", Object.setPrototypeOf(this, S.prototype);
  }
}
function r(n) {
  return new S(n);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class T {
  /**
   * Check if stringified object is empty
   * @param strObj
   */
  static isEmptyObj(t) {
    if (t)
      try {
        const e = JSON.parse(t);
        return Object.keys(e).length === 0;
      } catch {
      }
    return !0;
  }
  static startsWith(t, e) {
    return t.indexOf(e) === 0;
  }
  static endsWith(t, e) {
    return t.length >= e.length && t.lastIndexOf(e) === t.length - e.length;
  }
  /**
   * Parses string into an object.
   *
   * @param query
   */
  static queryStringToObject(t) {
    const e = {}, s = t.split("&"), o = (a) => decodeURIComponent(a.replace(/\+/g, " "));
    return s.forEach((a) => {
      if (a.trim()) {
        const [E, d] = a.split(/=(.+)/g, 2);
        E && d && (e[o(E)] = o(d));
      }
    }), e;
  }
  /**
   * Trims entries in an array.
   *
   * @param arr
   */
  static trimArrayEntries(t) {
    return t.map((e) => e.trim());
  }
  /**
   * Removes empty strings from array
   * @param arr
   */
  static removeEmptyStringsFromArray(t) {
    return t.filter((e) => !!e);
  }
  /**
   * Attempts to parse a string into JSON
   * @param str
   */
  static jsonParseHelper(t) {
    try {
      return JSON.parse(t);
    } catch {
      return null;
    }
  }
  /**
   * Tests if a given string matches a given pattern, with support for wildcards and queries.
   * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
   * @param input String to match against
   */
  static matchPattern(t, e) {
    return new RegExp(t.replace(/\\/g, "\\\\").replace(/\*/g, "[^ ]*").replace(/\?/g, "\\?")).test(e);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class m extends _ {
  constructor(t, e) {
    super(t, e), this.name = "ClientAuthError", Object.setPrototypeOf(this, m.prototype);
  }
}
function u(n, t) {
  return new m(n, t);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const L = "redirect_uri_empty", P = "claims_request_parsing_error", h = "authority_uri_insecure", i = "url_parse_error", C = "empty_url_error", U = "empty_input_scopes_error", H = "invalid_claims", b = "token_request_empty", F = "logout_request_empty", v = "invalid_code_challenge_method", k = "pkce_params_missing", w = "invalid_cloud_discovery_metadata", V = "invalid_authority_metadata", G = "untrusted_authority", K = "missing_ssh_jwk", W = "missing_ssh_kid", x = "missing_nonce_authentication_header", j = "invalid_authentication_header", q = "cannot_set_OIDCOptions", Y = "cannot_allow_platform_broker", B = "authority_mismatch", z = "invalid_request_method_for_EAR", qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authorityMismatch: B,
  authorityUriInsecure: h,
  cannotAllowPlatformBroker: Y,
  cannotSetOIDCOptions: q,
  claimsRequestParsingError: P,
  emptyInputScopesError: U,
  invalidAuthenticationHeader: j,
  invalidAuthorityMetadata: V,
  invalidClaims: H,
  invalidCloudDiscoveryMetadata: w,
  invalidCodeChallengeMethod: v,
  invalidRequestMethodForEAR: z,
  logoutRequestEmpty: F,
  missingNonceAuthenticationHeader: x,
  missingSshJwk: K,
  missingSshKid: W,
  pkceParamsMissing: k,
  redirectUriEmpty: L,
  tokenRequestEmpty: b,
  untrustedAuthority: G,
  urlEmptyError: C,
  urlParseError: i
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Q = "client_info_decoding_error", X = "client_info_empty_error", J = "token_parsing_error", $ = "null_or_empty_token", Z = "endpoints_resolution_error", tt = "network_error", et = "openid_config_error", st = "hash_not_deserialized", A = "invalid_state", nt = "state_mismatch", ot = "state_not_found", at = "nonce_mismatch", rt = "auth_time_not_found", ct = "max_age_transpired", it = "multiple_matching_tokens", _t = "multiple_matching_appMetadata", Et = "request_cannot_be_made", ut = "cannot_remove_empty_scope", Tt = "cannot_append_scopeset", lt = "empty_input_scopeset", At = "no_account_in_silent_request", St = "invalid_cache_record", mt = "invalid_cache_environment", Rt = "no_account_found", R = "no_crypto_object", dt = "unexpected_credential_type", pt = "token_refresh_required", Ot = "token_claims_cnf_required_for_signedjwt", ht = "authorization_code_missing_from_server_response", Ct = "binding_key_not_removed", Nt = "end_session_endpoint_not_supported", gt = "key_id_missing", It = "no_network_connectivity", ft = "user_canceled", yt = "method_not_implemented", Dt = "nested_app_auth_bridge_disabled", Mt = "platform_broker_error", Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authTimeNotFound: rt,
  authorizationCodeMissingFromServerResponse: ht,
  bindingKeyNotRemoved: Ct,
  cannotAppendScopeSet: Tt,
  cannotRemoveEmptyScope: ut,
  clientInfoDecodingError: Q,
  clientInfoEmptyError: X,
  emptyInputScopeSet: lt,
  endSessionEndpointNotSupported: Nt,
  endpointResolutionError: Z,
  hashNotDeserialized: st,
  invalidCacheEnvironment: mt,
  invalidCacheRecord: St,
  invalidState: A,
  keyIdMissing: gt,
  maxAgeTranspired: ct,
  methodNotImplemented: yt,
  multipleMatchingAppMetadata: _t,
  multipleMatchingTokens: it,
  nestedAppAuthBridgeDisabled: Dt,
  networkError: tt,
  noAccountFound: Rt,
  noAccountInSilentRequest: At,
  noCryptoObject: R,
  noNetworkConnectivity: It,
  nonceMismatch: at,
  nullOrEmptyToken: $,
  openIdConfigError: et,
  platformBrokerError: Mt,
  requestCannotBeMade: Et,
  stateMismatch: nt,
  stateNotFound: ot,
  tokenClaimsCnfRequiredForSignedJwt: Ot,
  tokenParsingError: J,
  tokenRefreshRequired: pt,
  unexpectedCredentialType: dt,
  userCanceled: ft
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
class c {
  get urlString() {
    return this._urlString;
  }
  constructor(t) {
    if (this._urlString = t, !this._urlString)
      throw r(C);
    t.includes("#") || (this._urlString = c.canonicalizeUri(t));
  }
  /**
   * Ensure urls are lower case and end with a / character.
   * @param url
   */
  static canonicalizeUri(t) {
    if (t) {
      let e = t.toLowerCase();
      return T.endsWith(e, "?") ? e = e.slice(0, -1) : T.endsWith(e, "?/") && (e = e.slice(0, -2)), T.endsWith(e, "/") || (e += "/"), e;
    }
    return t;
  }
  /**
   * Throws if urlString passed is not a valid authority URI string.
   */
  validateAsUri() {
    let t;
    try {
      t = this.getUrlComponents();
    } catch {
      throw r(i);
    }
    if (!t.HostNameAndPort || !t.PathSegments)
      throw r(i);
    if (!t.Protocol || t.Protocol.toLowerCase() !== "https:")
      throw r(h);
  }
  /**
   * Given a url and a query string return the url with provided query string appended
   * @param url
   * @param queryString
   */
  static appendQueryString(t, e) {
    return e ? t.indexOf("?") < 0 ? `${t}?${e}` : `${t}&${e}` : t;
  }
  /**
   * Returns a url with the hash removed
   * @param url
   */
  static removeHashFromUrl(t) {
    return c.canonicalizeUri(t.split("#")[0]);
  }
  /**
   * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
   * @param href The url
   * @param tenantId The tenant id to replace
   */
  replaceTenantPath(t) {
    const e = this.getUrlComponents(), s = e.PathSegments;
    return t && s.length !== 0 && (s[0] === p.COMMON || s[0] === p.ORGANIZATIONS) && (s[0] = t), c.constructAuthorityUriFromObject(e);
  }
  /**
   * Parses out the components from a url string.
   * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
   */
  getUrlComponents() {
    const t = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"), e = this.urlString.match(t);
    if (!e)
      throw r(i);
    const s = {
      Protocol: e[1],
      HostNameAndPort: e[4],
      AbsolutePath: e[5],
      QueryString: e[7]
    };
    let o = s.AbsolutePath.split("/");
    return o = o.filter((a) => a && a.length > 0), s.PathSegments = o, s.QueryString && s.QueryString.endsWith("/") && (s.QueryString = s.QueryString.substring(0, s.QueryString.length - 1)), s;
  }
  static getDomainFromUrl(t) {
    const e = RegExp("^([^:/?#]+://)?([^/?#]*)"), s = t.match(e);
    if (!s)
      throw r(i);
    return s[2];
  }
  static getAbsoluteUrl(t, e) {
    if (t[0] === D) {
      const o = new c(e).getUrlComponents();
      return o.Protocol + "//" + o.HostNameAndPort + t;
    }
    return t;
  }
  static constructAuthorityUriFromObject(t) {
    return new c(t.Protocol + "//" + t.HostNameAndPort + "/" + t.PathSegments.join("/"));
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Be(n, t, e) {
  const s = Lt(n, e);
  return t ? `${s}${l}${t}` : s;
}
function Lt(n, t) {
  if (!n)
    throw u(R);
  const e = {
    id: n.createNewGuid()
  };
  t && (e.meta = t);
  const s = JSON.stringify(e);
  return n.base64Encode(s);
}
function ze(n, t) {
  if (!n)
    throw u(R);
  if (!t)
    throw u(A);
  try {
    const e = t.split(l), s = e[0], o = e.length > 1 ? e.slice(1).join(l) : "", a = n(s), E = JSON.parse(a);
    return {
      userRequestState: o || "",
      libraryState: E
    };
  } catch {
    throw u(A);
  }
}
export {
  at as $,
  _ as A,
  St as B,
  re as C,
  me as D,
  _t as E,
  Re as F,
  Oe as G,
  oe as H,
  xe as I,
  Pt as J,
  Ht as K,
  Ae as L,
  fe as M,
  Fe as N,
  M as O,
  Ot as P,
  he as Q,
  _e as R,
  T as S,
  pe as T,
  c as U,
  Kt as V,
  te as W,
  ve as X,
  ee as Y,
  Jt as Z,
  Zt as _,
  f as a,
  z as a$,
  rt as a0,
  gt as a1,
  He as a2,
  be as a3,
  Gt as a4,
  tt as a5,
  xt as a6,
  Xt as a7,
  Ve as a8,
  $t as a9,
  Ee as aA,
  b as aB,
  At as aC,
  ke as aD,
  we as aE,
  Ke as aF,
  pt as aG,
  ot as aH,
  A as aI,
  nt as aJ,
  ht as aK,
  ce as aL,
  j as aM,
  x as aN,
  De as aO,
  Ne as aP,
  ye as aQ,
  Ie as aR,
  Pe as aS,
  ge as aT,
  Me as aU,
  Le as aV,
  We as aW,
  Ct as aX,
  ae as aY,
  B as aZ,
  se as a_,
  Wt as aa,
  jt as ab,
  w as ac,
  kt as ad,
  Ft as ae,
  bt as af,
  Ce as ag,
  et as ah,
  V as ai,
  qt as aj,
  Ge as ak,
  G as al,
  vt as am,
  Qt as an,
  Ut as ao,
  Bt as ap,
  D as aq,
  Z as ar,
  Nt as as,
  Yt as at,
  wt as au,
  p as av,
  Et as aw,
  F as ax,
  L as ay,
  K as az,
  ne as b,
  W as b0,
  Be as b1,
  Rt as b2,
  zt as b3,
  Vt as b4,
  ie as b5,
  q as b6,
  Y as b7,
  g as b8,
  I as b9,
  N as ba,
  je as bb,
  m as bc,
  Dt as bd,
  It as be,
  ft as bf,
  Ye as bg,
  S as bh,
  qe as bi,
  r as c,
  u as d,
  U as e,
  Tt as f,
  ut as g,
  lt as h,
  k as i,
  de as j,
  Ue as k,
  H as l,
  st as m,
  yt as n,
  $ as o,
  ze as p,
  ct as q,
  O as r,
  X as s,
  J as t,
  Q as u,
  Se as v,
  le as w,
  mt as x,
  Te as y,
  ue as z
};
