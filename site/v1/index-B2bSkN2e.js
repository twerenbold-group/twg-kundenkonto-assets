/*! @azure/msal-common v16.0.2 2026-01-17 */
const mc = "msal.js.common", cr = "https://login.microsoftonline.com/common/", yc = "login.microsoftonline.com", Oi = "common", Cc = "adfs", wc = "dstsv2", Ic = `${cr}discovery/instance?api-version=1.1&authorization_endpoint=`, Ho = ".ciamlogin.com", Tc = ".onmicrosoft.com", Bn = "|", Pi = "openid", Ni = "profile", hr = "offline_access", Ac = "email", lr = "S256", Ec = "application/x-www-form-urlencoded;charset=utf-8", ct = "Not Available", zn = "/", Ko = "http://169.254.169.254/metadata/instance/compute/location", Sc = "2020-06-01", kc = 2e3, _c = "TryAutoDetect", vc = "login.microsoft.com", bc = [
  "login.microsoftonline.com",
  "login.windows.net",
  "login.microsoft.com",
  "sts.windows.net"
], Fo = 240, Rc = "invalid_instance", Bo = 200, Oc = 400, zo = 400, Pc = 499, Nc = 500, Mc = 599, qe = {
  GET: "GET",
  POST: "POST"
}, Se = [
  Pi,
  Ni,
  hr
], jo = [...Se, Ac], K = {
  CONTENT_TYPE: "Content-Type",
  CONTENT_LENGTH: "Content-Length",
  RETRY_AFTER: "Retry-After",
  CCS_HEADER: "X-AnchorMailbox",
  WWWAuthenticate: "WWW-Authenticate",
  AuthenticationInfo: "Authentication-Info",
  X_MS_REQUEST_ID: "x-ms-request-id",
  X_MS_HTTP_VERSION: "x-ms-httpver"
}, Go = {
  ACTIVE_ACCOUNT_FILTERS: "active-account-filters"
  // new cache entry for active_account for a more robust version for browser
}, Me = {
  COMMON: "common",
  ORGANIZATIONS: "organizations",
  CONSUMERS: "consumers"
}, Nt = {
  ACCESS_TOKEN: "access_token",
  XMS_CC: "xms_cc"
}, V = {
  LOGIN: "login",
  SELECT_ACCOUNT: "select_account",
  CONSENT: "consent",
  NONE: "none",
  CREATE: "create",
  NO_SESSION: "no_session"
}, dr = {
  CODE: "code",
  IDTOKEN_TOKEN_REFRESHTOKEN: "id_token token refresh_token"
}, ln = {
  QUERY: "query",
  FRAGMENT: "fragment",
  FORM_POST: "form_post"
}, Mi = {
  AUTHORIZATION_CODE_GRANT: "authorization_code",
  REFRESH_TOKEN_GRANT: "refresh_token"
}, Uc = "MSSTS", xc = "ADFS", Ui = "Generic", xi = "-", jn = ".", H = {
  ID_TOKEN: "IdToken",
  ACCESS_TOKEN: "AccessToken",
  ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
  REFRESH_TOKEN: "RefreshToken"
}, ur = "appmetadata", Dc = "client_info", jt = "1", Gn = "authority-metadata", Lc = 3600 * 24, ce = {
  CONFIG: "config",
  CACHE: "cache",
  NETWORK: "network",
  HARDCODED_VALUES: "hardcoded_values"
}, Vo = 5, Hc = 330, Kc = 50, Di = "server-telemetry", $o = "|", Je = ",", Fc = "1", Bc = "0", zc = "unknown_error", S = {
  BEARER: "Bearer",
  POP: "pop",
  SSH: "ssh-cert"
}, jc = 60, Gc = 3600, Li = "throttling", Vc = "retry-after, h429", $c = "invalid_grant", Jc = "client_mismatch", We = {
  FAILED_AUTO_DETECTION: "1",
  INTERNAL_CACHE: "2",
  ENVIRONMENT_VARIABLE: "3",
  IMDS: "4"
}, Un = {
  CONFIGURED_NO_AUTO_DETECTION: "2",
  AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
  AUTO_DETECTION_REQUESTED_FAILED: "5"
}, He = {
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
}, Hi = {
  Jwt: "JWT",
  Jwk: "JWK",
  Pop: "pop"
}, Ki = 300;
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ze = "client_id", Fi = "redirect_uri", Wc = "response_type", Qc = "response_mode", Yc = "grant_type", qc = "claims", Xc = "scope", Zc = "refresh_token", eh = "state", th = "nonce", nh = "prompt", rh = "code", oh = "code_challenge", ih = "code_challenge_method", sh = "code_verifier", ah = "client-request-id", ch = "x-client-SKU", hh = "x-client-VER", lh = "x-client-OS", dh = "x-client-CPU", uh = "x-client-current-telemetry", gh = "x-client-last-telemetry", fh = "x-ms-lib-capability", ph = "x-app-name", mh = "x-app-ver", yh = "post_logout_redirect_uri", Ch = "id_token_hint", wh = "client_secret", Ih = "client_assertion", Th = "client_assertion_type", Bi = "token_type", zi = "req_cnf", Jo = "return_spa_code", Ah = "nativebroker", Eh = "logout_hint", Sh = "sid", kh = "login_hint", _h = "domain_hint", vh = "x-client-xtra-sku", Gt = "brk_client_id", Vt = "brk_redirect_uri", Vn = "instance_aware", bh = "ear_jwk", Rh = "ear_jwe_crypto";
/*! @azure/msal-common v16.0.2 2026-01-17 */
function gr(o) {
  return `See https://aka.ms/msal.js.errors#${o} for details`;
}
class A extends Error {
  constructor(e, t, n) {
    const r = t || (e ? gr(e) : ""), i = r ? `${e}: ${r}` : e;
    super(i), Object.setPrototypeOf(this, A.prototype), this.errorCode = e || "", this.errorMessage = r || "", this.subError = n || "", this.name = "AuthError";
  }
  setCorrelationId(e) {
    this.correlationId = e;
  }
}
function $n(o, e) {
  return new A(o, e || gr(o));
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class fr extends A {
  constructor(e) {
    super(e), this.name = "ClientConfigurationError", Object.setPrototypeOf(this, fr.prototype);
  }
}
function v(o) {
  return new fr(o);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class X {
  /**
   * Check if stringified object is empty
   * @param strObj
   */
  static isEmptyObj(e) {
    if (e)
      try {
        const t = JSON.parse(e);
        return Object.keys(t).length === 0;
      } catch {
      }
    return !0;
  }
  static startsWith(e, t) {
    return e.indexOf(t) === 0;
  }
  static endsWith(e, t) {
    return e.length >= t.length && e.lastIndexOf(t) === e.length - t.length;
  }
  /**
   * Parses string into an object.
   *
   * @param query
   */
  static queryStringToObject(e) {
    const t = {}, n = e.split("&"), r = (i) => decodeURIComponent(i.replace(/\+/g, " "));
    return n.forEach((i) => {
      if (i.trim()) {
        const [s, a] = i.split(/=(.+)/g, 2);
        s && a && (t[r(s)] = r(a));
      }
    }), t;
  }
  /**
   * Trims entries in an array.
   *
   * @param arr
   */
  static trimArrayEntries(e) {
    return e.map((t) => t.trim());
  }
  /**
   * Removes empty strings from array
   * @param arr
   */
  static removeEmptyStringsFromArray(e) {
    return e.filter((t) => !!t);
  }
  /**
   * Attempts to parse a string into JSON
   * @param str
   */
  static jsonParseHelper(e) {
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  /**
   * Tests if a given string matches a given pattern, with support for wildcards and queries.
   * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
   * @param input String to match against
   */
  static matchPattern(e, t) {
    return new RegExp(e.replace(/\\/g, "\\\\").replace(/\*/g, "[^ ]*").replace(/\?/g, "\\?")).test(t);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Oe extends A {
  constructor(e, t) {
    super(e, t), this.name = "ClientAuthError", Object.setPrototypeOf(this, Oe.prototype);
  }
}
function p(o, e) {
  return new Oe(o, e);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ji = "redirect_uri_empty", Oh = "claims_request_parsing_error", Gi = "authority_uri_insecure", lt = "url_parse_error", Vi = "empty_url_error", $i = "empty_input_scopes_error", pr = "invalid_claims", Ji = "token_request_empty", Wi = "logout_request_empty", Ph = "invalid_code_challenge_method", mr = "pkce_params_missing", yr = "invalid_cloud_discovery_metadata", Qi = "invalid_authority_metadata", Yi = "untrusted_authority", dn = "missing_ssh_jwk", qi = "missing_ssh_kid", Xi = "missing_nonce_authentication_header", Jn = "invalid_authentication_header", Zi = "cannot_set_OIDCOptions", es = "cannot_allow_platform_broker", ts = "authority_mismatch", ns = "invalid_request_method_for_EAR", _g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authorityMismatch: ts,
  authorityUriInsecure: Gi,
  cannotAllowPlatformBroker: es,
  cannotSetOIDCOptions: Zi,
  claimsRequestParsingError: Oh,
  emptyInputScopesError: $i,
  invalidAuthenticationHeader: Jn,
  invalidAuthorityMetadata: Qi,
  invalidClaims: pr,
  invalidCloudDiscoveryMetadata: yr,
  invalidCodeChallengeMethod: Ph,
  invalidRequestMethodForEAR: ns,
  logoutRequestEmpty: Wi,
  missingNonceAuthenticationHeader: Xi,
  missingSshJwk: dn,
  missingSshKid: qi,
  pkceParamsMissing: mr,
  redirectUriEmpty: ji,
  tokenRequestEmpty: Ji,
  untrustedAuthority: Yi,
  urlEmptyError: Vi,
  urlParseError: lt
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Cr = "client_info_decoding_error", rs = "client_info_empty_error", wr = "token_parsing_error", $t = "null_or_empty_token", we = "endpoints_resolution_error", os = "network_error", is = "openid_config_error", ss = "hash_not_deserialized", rt = "invalid_state", as = "state_mismatch", Wn = "state_not_found", cs = "nonce_mismatch", Ir = "auth_time_not_found", hs = "max_age_transpired", Nh = "multiple_matching_tokens", ls = "multiple_matching_appMetadata", ds = "request_cannot_be_made", us = "cannot_remove_empty_scope", gs = "cannot_append_scopeset", Qn = "empty_input_scopeset", Tr = "no_account_in_silent_request", fs = "invalid_cache_record", Ar = "invalid_cache_environment", Jt = "no_account_found", Er = "no_crypto_object", Mh = "unexpected_credential_type", Ue = "token_refresh_required", ps = "token_claims_cnf_required_for_signedjwt", ms = "authorization_code_missing_from_server_response", ys = "binding_key_not_removed", Cs = "end_session_endpoint_not_supported", Sr = "key_id_missing", ws = "no_network_connectivity", Is = "user_canceled", T = "method_not_implemented", Yn = "nested_app_auth_bridge_disabled", Uh = "platform_broker_error", vg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authTimeNotFound: Ir,
  authorizationCodeMissingFromServerResponse: ms,
  bindingKeyNotRemoved: ys,
  cannotAppendScopeSet: gs,
  cannotRemoveEmptyScope: us,
  clientInfoDecodingError: Cr,
  clientInfoEmptyError: rs,
  emptyInputScopeSet: Qn,
  endSessionEndpointNotSupported: Cs,
  endpointResolutionError: we,
  hashNotDeserialized: ss,
  invalidCacheEnvironment: Ar,
  invalidCacheRecord: fs,
  invalidState: rt,
  keyIdMissing: Sr,
  maxAgeTranspired: hs,
  methodNotImplemented: T,
  multipleMatchingAppMetadata: ls,
  multipleMatchingTokens: Nh,
  nestedAppAuthBridgeDisabled: Yn,
  networkError: os,
  noAccountFound: Jt,
  noAccountInSilentRequest: Tr,
  noCryptoObject: Er,
  noNetworkConnectivity: ws,
  nonceMismatch: cs,
  nullOrEmptyToken: $t,
  openIdConfigError: is,
  platformBrokerError: Uh,
  requestCannotBeMade: ds,
  stateMismatch: as,
  stateNotFound: Wn,
  tokenClaimsCnfRequiredForSignedJwt: ps,
  tokenParsingError: wr,
  tokenRefreshRequired: Ue,
  unexpectedCredentialType: Mh,
  userCanceled: Is
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
class x {
  constructor(e) {
    const t = e ? X.trimArrayEntries([...e]) : [], n = t ? X.removeEmptyStringsFromArray(t) : [];
    if (!n || !n.length)
      throw v($i);
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
    const t = e && e.length > 0 ? e : [...Se], n = new x(t);
    return n.containsOnlyOIDCScopes() ? n.removeScope(hr) : n.removeOIDCScopes(), n;
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
    return jo.forEach((t) => {
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
      throw p(gs);
    }
  }
  /**
   * Removes element from set of scopes.
   * @param scope
   */
  removeScope(e) {
    if (!e)
      throw p(us);
    this.scopes.delete(e.trim());
  }
  /**
   * Removes default scopes from set of scopes
   * Primarily used to prevent cache misses if the default scopes are not returned from the server
   */
  removeOIDCScopes() {
    jo.forEach((e) => {
      this.scopes.delete(e);
    });
  }
  /**
   * Combines an array of scopes with the current set of scopes.
   * @param otherScopes
   */
  unionScopeSets(e) {
    if (!e)
      throw p(Qn);
    const t = /* @__PURE__ */ new Set();
    return e.scopes.forEach((n) => t.add(n.toLowerCase())), this.scopes.forEach((n) => t.add(n.toLowerCase())), t;
  }
  /**
   * Check if scopes intersect between this set and another.
   * @param otherScopes
   */
  intersectingScopeSets(e) {
    if (!e)
      throw p(Qn);
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
function un(o, e, t) {
  if (!e)
    return;
  const n = o.get(ze);
  n && o.has(Gt) && (t == null || t.addFields({
    embeddedClientId: n,
    embeddedRedirectUri: o.get(Fi)
  }, e));
}
function kr(o, e) {
  o.set(Wc, e);
}
function xh(o, e) {
  o.set(Qc, e || ln.QUERY);
}
function Dh(o) {
  o.set(Ah, "1");
}
function _r(o, e, t = !0, n = Se) {
  t && !n.includes("openid") && !e.includes("openid") && n.push("openid");
  const r = t ? [...e || [], ...n] : e || [], i = new x(r);
  o.set(Xc, i.printScopes());
}
function vr(o, e) {
  o.set(ze, e);
}
function br(o, e) {
  o.set(Fi, e);
}
function Lh(o, e) {
  o.set(yh, e);
}
function Hh(o, e) {
  o.set(Ch, e);
}
function Kh(o, e) {
  o.set(_h, e);
}
function Mt(o, e) {
  o.set(kh, e);
}
function Wt(o, e) {
  o.set(K.CCS_HEADER, `UPN:${e}`);
}
function ut(o, e) {
  o.set(K.CCS_HEADER, `Oid:${e.uid}@${e.utid}`);
}
function Wo(o, e) {
  o.set(Sh, e);
}
function Rr(o, e, t) {
  const n = xr(e, t);
  try {
    JSON.parse(n);
  } catch {
    throw v(pr);
  }
  o.set(qc, n);
}
function Or(o, e) {
  o.set(ah, e);
}
function Pr(o, e) {
  o.set(ch, e.sku), o.set(hh, e.version), e.os && o.set(lh, e.os), e.cpu && o.set(dh, e.cpu);
}
function Nr(o, e) {
  e != null && e.appName && o.set(ph, e.appName), e != null && e.appVersion && o.set(mh, e.appVersion);
}
function Fh(o, e) {
  o.set(nh, e);
}
function Ts(o, e) {
  e && o.set(eh, e);
}
function Bh(o, e) {
  o.set(th, e);
}
function Mr(o, e, t) {
  if (e && t)
    o.set(oh, e), o.set(ih, t);
  else
    throw v(mr);
}
function zh(o, e) {
  o.set(rh, e);
}
function jh(o, e) {
  o.set(Zc, e);
}
function Gh(o, e) {
  o.set(sh, e);
}
function As(o, e) {
  o.set(wh, e);
}
function Es(o, e) {
  e && o.set(Ih, e);
}
function Ss(o, e) {
  e && o.set(Th, e);
}
function ks(o, e) {
  o.set(Yc, e);
}
function Ur(o) {
  o.set(Dc, "1");
}
function _s(o) {
  o.has(Vn) || o.set(Vn, "true");
}
function pe(o, e) {
  Object.entries(e).forEach(([t, n]) => {
    !o.has(t) && n && o.set(t, n);
  });
}
function xr(o, e) {
  let t;
  if (!o)
    t = {};
  else
    try {
      t = JSON.parse(o);
    } catch {
      throw v(pr);
    }
  return e && e.length > 0 && (t.hasOwnProperty(Nt.ACCESS_TOKEN) || (t[Nt.ACCESS_TOKEN] = {}), t[Nt.ACCESS_TOKEN][Nt.XMS_CC] = {
    values: e
  }), JSON.stringify(t);
}
function Dr(o, e) {
  e && (o.set(Bi, S.POP), o.set(zi, e));
}
function vs(o, e) {
  e && (o.set(Bi, S.SSH), o.set(zi, e));
}
function bs(o, e) {
  o.set(uh, e.generateCurrentRequestHeaderValue()), o.set(gh, e.generateLastRequestHeaderValue());
}
function Rs(o) {
  o.set(fh, Vc);
}
function Vh(o, e) {
  o.set(Eh, e);
}
function gn(o, e, t) {
  o.has(Gt) || o.set(Gt, e), o.has(Vt) || o.set(Vt, t);
}
function $h(o, e) {
  o.set(bh, encodeURIComponent(e)), o.set(Rh, "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Qo(o) {
  if (!o)
    return o;
  let e = o.toLowerCase();
  return X.endsWith(e, "?") ? e = e.slice(0, -1) : X.endsWith(e, "?/") && (e = e.slice(0, -2)), X.endsWith(e, "/") || (e += "/"), e;
}
function Os(o) {
  return o.startsWith("#/") ? o.substring(2) : o.startsWith("#") || o.startsWith("?") ? o.substring(1) : o;
}
function Qt(o) {
  if (!o || o.indexOf("=") < 0)
    return null;
  try {
    const e = Os(o), t = Object.fromEntries(new URLSearchParams(e));
    if (t.code || t.ear_jwe || t.error || t.error_description || t.state)
      return t;
  } catch {
    throw p(ss);
  }
  return null;
}
function mt(o) {
  const e = new Array();
  return o.forEach((t, n) => {
    e.push(`${n}=${encodeURIComponent(t)}`);
  }), e.join("&");
}
function Yo(o) {
  if (!o)
    return o;
  const e = o.split("#")[0];
  try {
    const t = new URL(e), n = t.origin + t.pathname + t.search;
    return Qo(n);
  } catch {
    return Qo(e);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const yt = {
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
var R;
(function(o) {
  o[o.Error = 0] = "Error", o[o.Warning = 1] = "Warning", o[o.Info = 2] = "Info", o[o.Verbose = 3] = "Verbose", o[o.Trace = 4] = "Trace";
})(R || (R = {}));
const Jh = 50, Wh = 500, Ie = /* @__PURE__ */ new Map();
function Qh(o, e) {
  Ie.delete(o), Ie.set(o, e);
}
function Yh(o, e) {
  const t = Date.now();
  let n = Ie.get(o);
  if (n)
    Qh(o, n);
  else if (n = { logs: [], firstEventTime: t }, Ie.set(o, n), Ie.size > Jh) {
    const r = Ie.keys().next().value;
    r && Ie.delete(r);
  }
  n.logs.push({
    ...e,
    milliseconds: t - n.firstEventTime
  }), n.logs.length > Wh && n.logs.shift();
}
function qh(o) {
  const e = [];
  for (const t of ["", o]) {
    const n = Ie.get(t);
    e.push(...(n == null ? void 0 : n.logs) ?? []), Ie.delete(t);
  }
  return e;
}
function Xh(o) {
  if (o.length !== 6)
    return !1;
  for (let e = 0; e < o.length; e++) {
    const t = o[e];
    if (!(t >= "a" && t <= "z" || t >= "A" && t <= "Z" || t >= "0" && t <= "9"))
      return !1;
  }
  return !0;
}
class Q {
  constructor(e, t, n) {
    this.level = R.Info;
    const r = () => {
    }, i = e || Q.createDefaultLoggerOptions();
    this.localCallback = i.loggerCallback || r, this.piiLoggingEnabled = i.piiLoggingEnabled || !1, this.level = typeof i.logLevel == "number" ? i.logLevel : R.Info, this.packageName = t || "", this.packageVersion = n || "";
  }
  static createDefaultLoggerOptions() {
    return {
      loggerCallback: () => {
      },
      piiLoggingEnabled: !1,
      logLevel: R.Info
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
    if (Xh(e)) {
      const c = {
        hash: e,
        level: t.logLevel,
        containsPii: t.containsPii || !1,
        milliseconds: 0
        // Will be calculated in addLogToCache
      };
      Yh(n, c);
    }
    if (t.logLevel > this.level || !this.piiLoggingEnabled && t.containsPii)
      return;
    const a = `${`[${(/* @__PURE__ */ new Date()).toUTCString()}] : [${n}]`} : ${this.packageName}@${this.packageVersion} : ${R[t.logLevel]} - ${e}`;
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
      logLevel: R.Error,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs error messages with PII.
   */
  errorPii(e, t) {
    this.logMessage(e, {
      logLevel: R.Error,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs warning messages.
   */
  warning(e, t) {
    this.logMessage(e, {
      logLevel: R.Warning,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs warning messages with PII.
   */
  warningPii(e, t) {
    this.logMessage(e, {
      logLevel: R.Warning,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs info messages.
   */
  info(e, t) {
    this.logMessage(e, {
      logLevel: R.Info,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs info messages with PII.
   */
  infoPii(e, t) {
    this.logMessage(e, {
      logLevel: R.Info,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs verbose messages.
   */
  verbose(e, t) {
    this.logMessage(e, {
      logLevel: R.Verbose,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs verbose messages with PII.
   */
  verbosePii(e, t) {
    this.logMessage(e, {
      logLevel: R.Verbose,
      containsPii: !0,
      correlationId: t
    });
  }
  /**
   * Logs trace messages.
   */
  trace(e, t) {
    this.logMessage(e, {
      logLevel: R.Trace,
      containsPii: !1,
      correlationId: t
    });
  }
  /**
   * Logs trace messages with PII.
   */
  tracePii(e, t) {
    this.logMessage(e, {
      logLevel: R.Trace,
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
const fn = "@azure/msal-common", kt = "16.0.2";
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Lr = {
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
function qo(o, e) {
  return !!o && !!e && o === e.split(".")[1];
}
function _t(o, e, t, n) {
  if (n) {
    const { oid: r, sub: i, tid: s, name: a, tfp: c, acr: h, preferred_username: l, upn: d, login_hint: g } = n, f = s || c || h || "";
    return {
      tenantId: f,
      localAccountId: r || i || "",
      name: a,
      username: l || d || "",
      loginHint: g,
      isHomeTenant: qo(f, o)
    };
  } else
    return {
      tenantId: t,
      localAccountId: e,
      username: "",
      isHomeTenant: qo(t, o)
    };
}
function Hr(o, e, t, n) {
  let r = o;
  if (e) {
    const { isHomeTenant: i, ...s } = e;
    r = { ...o, ...s };
  }
  if (t) {
    const { isHomeTenant: i, ...s } = _t(o.homeAccountId, o.localAccountId, o.tenantId, t);
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
function oe(o, e) {
  const t = Zh(o);
  try {
    const n = e(t);
    return JSON.parse(n);
  } catch {
    throw p(wr);
  }
}
function ue(o) {
  if (!o.signin_state)
    return !1;
  const e = ["kmsi", "dvc_dmjd"];
  return o.signin_state.some((t) => e.includes(t.trim().toLowerCase()));
}
function Zh(o) {
  if (!o)
    throw p($t);
  const t = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(o);
  if (!t || t.length < 4)
    throw p(wr);
  return t[2];
}
function Ps(o, e) {
  if (e === 0 || Date.now() - 3e5 > o + e)
    throw p(hs);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class k {
  get urlString() {
    return this._urlString;
  }
  constructor(e) {
    if (this._urlString = e, !this._urlString)
      throw v(Vi);
    e.includes("#") || (this._urlString = k.canonicalizeUri(e));
  }
  /**
   * Ensure urls are lower case and end with a / character.
   * @param url
   */
  static canonicalizeUri(e) {
    if (e) {
      let t = e.toLowerCase();
      return X.endsWith(t, "?") ? t = t.slice(0, -1) : X.endsWith(t, "?/") && (t = t.slice(0, -2)), X.endsWith(t, "/") || (t += "/"), t;
    }
    return e;
  }
  /**
   * Throws if urlString passed is not a valid authority URI string.
   */
  validateAsUri() {
    let e;
    try {
      e = this.getUrlComponents();
    } catch {
      throw v(lt);
    }
    if (!e.HostNameAndPort || !e.PathSegments)
      throw v(lt);
    if (!e.Protocol || e.Protocol.toLowerCase() !== "https:")
      throw v(Gi);
  }
  /**
   * Given a url and a query string return the url with provided query string appended
   * @param url
   * @param queryString
   */
  static appendQueryString(e, t) {
    return t ? e.indexOf("?") < 0 ? `${e}?${t}` : `${e}&${t}` : e;
  }
  /**
   * Returns a url with the hash removed
   * @param url
   */
  static removeHashFromUrl(e) {
    return k.canonicalizeUri(e.split("#")[0]);
  }
  /**
   * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
   * @param href The url
   * @param tenantId The tenant id to replace
   */
  replaceTenantPath(e) {
    const t = this.getUrlComponents(), n = t.PathSegments;
    return e && n.length !== 0 && (n[0] === Me.COMMON || n[0] === Me.ORGANIZATIONS) && (n[0] = e), k.constructAuthorityUriFromObject(t);
  }
  /**
   * Parses out the components from a url string.
   * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
   */
  getUrlComponents() {
    const e = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"), t = this.urlString.match(e);
    if (!t)
      throw v(lt);
    const n = {
      Protocol: t[1],
      HostNameAndPort: t[4],
      AbsolutePath: t[5],
      QueryString: t[7]
    };
    let r = n.AbsolutePath.split("/");
    return r = r.filter((i) => i && i.length > 0), n.PathSegments = r, n.QueryString && n.QueryString.endsWith("/") && (n.QueryString = n.QueryString.substring(0, n.QueryString.length - 1)), n;
  }
  static getDomainFromUrl(e) {
    const t = RegExp("^([^:/?#]+://)?([^/?#]*)"), n = e.match(t);
    if (!n)
      throw v(lt);
    return n[2];
  }
  static getAbsoluteUrl(e, t) {
    if (e[0] === zn) {
      const r = new k(t).getUrlComponents();
      return r.Protocol + "//" + r.HostNameAndPort + e;
    }
    return e;
  }
  static constructAuthorityUriFromObject(e) {
    return new k(e.Protocol + "//" + e.HostNameAndPort + "/" + e.PathSegments.join("/"));
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const el = [
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
function tl(o, e) {
  return {
    token_endpoint: `https://${o}/{tenantid}/oauth2/v2.0/token`,
    jwks_uri: `https://${o}/{tenantid}/discovery/v2.0/keys`,
    issuer: `https://${e}/{tenantid}/v2.0`,
    authorization_endpoint: `https://${o}/{tenantid}/oauth2/v2.0/authorize`,
    end_session_endpoint: `https://${o}/{tenantid}/oauth2/v2.0/logout`
  };
}
const nl = el.reduce((o, { host: e, issuerHost: t }) => (o[e] = tl(e, t || e), o), {}), Ns = {
  endpointMetadata: nl,
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
}, Xo = Ns.endpointMetadata, Kr = Ns.instanceDiscoveryMetadata, Ms = /* @__PURE__ */ new Set();
Kr.metadata.forEach((o) => {
  o.aliases.forEach((e) => {
    Ms.add(e);
  });
});
function rl(o, e, t) {
  var i;
  let n;
  const r = o.canonicalAuthority;
  if (r) {
    const s = new k(r).getUrlComponents().HostNameAndPort;
    n = Zo(e, t, s, (i = o.cloudDiscoveryMetadata) == null ? void 0 : i.metadata) || Zo(e, t, s, Kr.metadata) || o.knownAuthorities;
  }
  return n || [];
}
function Zo(o, e, t, n, r) {
  if (o.trace("1bmquz", e), t && n) {
    const i = Yt(n, t);
    if (i)
      return o.trace("1fotbt", e), i.aliases;
    o.trace("14avvj", e);
  }
  return null;
}
function ol(o) {
  return Yt(Kr.metadata, o);
}
function Yt(o, e) {
  for (let t = 0; t < o.length; t++) {
    const n = o[t];
    if (n.aliases.includes(e))
      return n;
  }
  return null;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const qn = "cache_quota_exceeded", il = "cache_error_unknown";
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Fe extends Error {
  constructor(e, t) {
    const n = t || gr(e);
    super(n), Object.setPrototypeOf(this, Fe.prototype), this.name = "CacheError", this.errorCode = e, this.errorMessage = n;
  }
}
function Xn(o) {
  return o instanceof Error ? o.name === "QuotaExceededError" || o.name === "NS_ERROR_DOM_QUOTA_REACHED" || o.message.includes("exceeded the quota") ? new Fe(qn) : new Fe(o.name, o.message) : new Fe(il);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function qt(o, e) {
  if (!o)
    throw p(rs);
  try {
    const t = e(o);
    return JSON.parse(t);
  } catch {
    throw p(Cr);
  }
}
function Xe(o) {
  if (!o)
    throw p(Cr);
  const e = o.split(jn, 2);
  return {
    uid: e[0],
    utid: e.length < 2 ? "" : e[1]
  };
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const le = {
  Default: 0,
  Adfs: 1,
  Dsts: 2,
  Ciam: 3
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Fr(o) {
  return o && (o.tid || o.tfp || o.acr) || null;
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
function me(o) {
  return {
    homeAccountId: o.homeAccountId,
    environment: o.environment,
    tenantId: o.realm,
    username: o.username,
    localAccountId: o.localAccountId,
    loginHint: o.loginHint,
    name: o.name,
    nativeAccountId: o.nativeAccountId,
    authorityType: o.authorityType,
    // Deserialize tenant profiles array into a Map
    tenantProfiles: new Map((o.tenantProfiles || []).map((e) => [e.tenantId, e])),
    dataBoundary: o.dataBoundary
  };
}
function sl(o, e, t) {
  var w, I, E, P, b, N, te;
  let n;
  e.authorityType === le.Adfs ? n = xc : e.protocolMode === J.OIDC ? n = Ui : n = Uc;
  let r, i;
  o.clientInfo && t && (r = qt(o.clientInfo, t), r.xms_tdbr && (i = r.xms_tdbr === "EU" ? "EU" : "None"));
  const s = o.environment || e && e.getPreferredCache();
  if (!s)
    throw p(Ar);
  const a = ((w = o.idTokenClaims) == null ? void 0 : w.preferred_username) || ((I = o.idTokenClaims) == null ? void 0 : I.upn), c = (E = o.idTokenClaims) != null && E.emails ? o.idTokenClaims.emails[0] : null, h = a || c || "", l = (P = o.idTokenClaims) == null ? void 0 : P.login_hint, d = (r == null ? void 0 : r.utid) || Fr(o.idTokenClaims) || "", g = (r == null ? void 0 : r.uid) || ((b = o.idTokenClaims) == null ? void 0 : b.oid) || ((N = o.idTokenClaims) == null ? void 0 : N.sub) || "";
  let f;
  return o.tenantProfiles ? f = o.tenantProfiles : f = [_t(o.homeAccountId, g, d, o.idTokenClaims)], {
    homeAccountId: o.homeAccountId,
    environment: s,
    realm: d,
    localAccountId: g,
    username: h,
    authorityType: n,
    loginHint: l,
    clientInfo: o.clientInfo,
    name: ((te = o.idTokenClaims) == null ? void 0 : te.name) || "",
    lastModificationTime: void 0,
    lastModificationApp: void 0,
    cloudGraphHostName: o.cloudGraphHostName,
    msGraphHost: o.msGraphHost,
    nativeAccountId: o.nativeAccountId,
    tenantProfiles: f,
    dataBoundary: i
  };
}
function Br(o, e, t) {
  var n;
  return {
    authorityType: o.authorityType || Ui,
    homeAccountId: o.homeAccountId,
    localAccountId: o.localAccountId,
    nativeAccountId: o.nativeAccountId,
    realm: o.tenantId,
    environment: o.environment,
    username: o.username,
    loginHint: o.loginHint,
    name: o.name,
    cloudGraphHostName: e,
    msGraphHost: t,
    tenantProfiles: Array.from(((n = o.tenantProfiles) == null ? void 0 : n.values()) || []),
    dataBoundary: o.dataBoundary
  };
}
function zr(o, e, t, n, r, i) {
  if (!(e === le.Adfs || e === le.Dsts)) {
    if (o)
      try {
        const s = qt(o, n.base64Decode);
        if (s.uid && s.utid)
          return `${s.uid}.${s.utid}`;
      } catch {
      }
    t.warning("1ub6wv", r);
  }
  return (i == null ? void 0 : i.sub) || "";
}
function al(o) {
  return o ? o.hasOwnProperty("homeAccountId") && o.hasOwnProperty("environment") && o.hasOwnProperty("realm") && o.hasOwnProperty("localAccountId") && o.hasOwnProperty("username") && o.hasOwnProperty("authorityType") : !1;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Zn {
  constructor(e, t, n, r, i) {
    this.clientId = e, this.cryptoImpl = t, this.commonLogger = n.clone(fn, kt), this.staticAuthorityOptions = i, this.performanceClient = r;
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
    return n.length > 1 ? n.sort((i) => i.idTokenClaims ? -1 : 1)[0] : n.length === 1 ? n[0] : null;
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
  getTenantedAccountInfoByFilter(e, t, n, r, i) {
    let s = null, a;
    if (i && !this.tenantProfileMatchesFilter(n, i))
      return null;
    const c = this.getIdToken(e, r, t, n.tenantId);
    return c && (a = oe(c.secret, this.cryptoImpl.base64Decode), !this.idTokenClaimsMatchTenantProfileFilter(a, i)) ? null : (s = Hr(e, n, a, c == null ? void 0 : c.secret), s);
  }
  getTenantProfilesFromAccountEntity(e, t, n, r) {
    const i = me(e);
    let s = i.tenantProfiles || /* @__PURE__ */ new Map();
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
      const l = this.getTenantedAccountInfoByFilter(i, a, h, t, r);
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
    var i;
    if (!e)
      throw p(fs);
    try {
      e.account && await this.setAccount(e.account, t, n), e.idToken && (r == null ? void 0 : r.idToken) !== !1 && await this.setIdTokenCredential(e.idToken, t, n), e.accessToken && (r == null ? void 0 : r.accessToken) !== !1 && await this.saveAccessToken(e.accessToken, t, n), e.refreshToken && (r == null ? void 0 : r.refreshToken) !== !1 && await this.setRefreshTokenCredential(e.refreshToken, t, n), e.appMetadata && this.setAppMetadata(e.appMetadata, t);
    } catch (s) {
      throw (i = this.commonLogger) == null || i.error("0j476p", t), s instanceof A ? s : Xn(s);
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
    }, i = this.getTokenKeys(), s = x.fromString(e.target);
    i.accessToken.forEach((a) => {
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
    return n.forEach((i) => {
      var h;
      const s = this.getAccount(i, t);
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
    return !(t.clientId && !this.matchClientId(e, t.clientId) || t.userAssertionHash && !this.matchUserAssertionHash(e, t.userAssertionHash) || typeof t.homeAccountId == "string" && !this.matchHomeAccountId(e, t.homeAccountId) || t.environment && !this.matchEnvironment(e, t.environment, n) || t.realm && !this.matchRealm(e, t.realm) || t.credentialType && !this.matchCredentialType(e, t.credentialType) || t.familyId && !this.matchFamilyId(e, t.familyId) || t.target && !this.matchTarget(e, t.target) || e.credentialType === H.ACCESS_TOKEN_WITH_AUTH_SCHEME && (t.tokenType && !this.matchTokenType(e, t.tokenType) || t.tokenType === S.SSH && t.keyId && !this.matchKeyId(e, t.keyId)));
  }
  /**
   * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
   * @param filter
   * @param correlationId
   */
  getAppMetadataFilteredBy(e, t) {
    const n = this.getKeys(), r = {};
    return n.forEach((i) => {
      if (!this.isAppMetadata(i))
        return;
      const s = this.getAppMetadata(i, t);
      s && (e.environment && !this.matchEnvironment(s, e.environment, t) || e.clientId && !this.matchClientId(s, e.clientId) || (r[i] = s));
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
    return n.forEach((i) => {
      if (!this.isAuthorityMetadata(i) || i.indexOf(this.clientId) === -1)
        return;
      const s = this.getAuthorityMetadata(i, t);
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
    const n = this.getAccountKeys(), r = (i) => i.includes(e.homeAccountId) && i.includes(e.environment);
    n.filter(r).forEach((i) => {
      this.removeItem(i, t), this.performanceClient.incrementFields({ accountsRemoved: 1 }, t);
    });
  }
  /**
   * Removes credentials associated with the provided account
   * @param account
   */
  removeAccountContext(e, t) {
    const n = this.getTokenKeys(), r = (i) => i.includes(e.homeAccountId) && i.includes(e.environment);
    n.idToken.filter(r).forEach((i) => {
      this.removeIdToken(i, t);
    }), n.accessToken.filter(r).forEach((i) => {
      this.removeAccessToken(i, t);
    }), n.refreshToken.filter(r).forEach((i) => {
      this.removeRefreshToken(i, t);
    });
  }
  /**
   * returns a boolean if the given credential is removed
   * @param key
   * @param correlationId
   */
  removeAccessToken(e, t) {
    const n = this.getAccessTokenCredential(e, t);
    if (n && (this.removeItem(e, t), this.performanceClient.incrementFields({ accessTokensRemoved: 1 }, t), n.credentialType.toLowerCase() === H.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase() && n.tokenType === S.POP)) {
      const i = n.keyId;
      i && this.cryptoImpl.removeTokenBindingKey(i, t).catch(() => {
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
    const i = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: H.ID_TOKEN,
      clientId: this.clientId,
      realm: r
    }, s = this.getIdTokensByFilter(i, t, n), a = s.size;
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
    const r = n && n.idToken || this.getTokenKeys().idToken, i = /* @__PURE__ */ new Map();
    return r.forEach((s) => {
      if (!this.idTokenKeyMatchesFilter(s, {
        clientId: this.clientId,
        ...e
      }))
        return;
      const a = this.getIdTokenCredential(s, t);
      a && this.credentialMatchesFilter(a, e, t) && i.set(s, a);
    }), i;
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
    const i = t.correlationId;
    this.commonLogger.trace("1t7hz1", i);
    const s = x.createSearchScopes(t.scopes), a = t.authenticationScheme || S.BEARER, c = a && a.toLowerCase() !== S.BEARER.toLowerCase() ? H.ACCESS_TOKEN_WITH_AUTH_SCHEME : H.ACCESS_TOKEN, h = {
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
        const w = this.getAccessTokenCredential(f, i);
        w && this.credentialMatchesFilter(w, h, i) && d.push(w);
      }
    });
    const g = d.length;
    return g < 1 ? (this.commonLogger.info("1nckna", i), null) : g > 1 ? (this.commonLogger.info("1wkfwp", i), d.forEach((f) => {
      this.removeAccessToken(this.generateCredentialKey(f), i);
    }), this.performanceClient.addFields({ multiMatchedAT: d.length }, i), null) : (this.commonLogger.info("06yt98", i), d[0]);
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
      const i = t.target.asArray();
      for (let s = 0; s < i.length; s++) {
        if (n && !r.includes(i[s].toLowerCase()))
          return !1;
        if (!n && r.includes(i[s].toLowerCase()))
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
    return n.accessToken.forEach((i) => {
      if (!this.accessTokenKeyMatchesFilter(i, e, !0))
        return;
      const s = this.getAccessTokenCredential(i, t);
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
    const i = t ? jt : void 0, s = {
      homeAccountId: e.homeAccountId,
      environment: e.environment,
      credentialType: H.REFRESH_TOKEN,
      clientId: this.clientId,
      familyId: i
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
    }, r = this.getAppMetadataFilteredBy(n, t), i = Object.keys(r).map((a) => r[a]), s = i.length;
    if (s < 1)
      return null;
    if (s > 1)
      throw p(ls);
    return i[0];
  }
  /**
   * Return the family_id value associated  with FOCI
   * @param environment
   * @param clientId
   */
  isAppMetadataFOCI(e, t) {
    const n = this.readAppMetadataFromCache(e, t);
    return !!(n && n.familyId === jt);
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
      const i = rl(this.staticAuthorityOptions, this.commonLogger, n);
      if (i.includes(t) && i.includes(e.environment))
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
    return e.indexOf(ur) !== -1;
  }
  /**
   * returns if a given cache entity is of the type authoritymetadata
   * @param key
   */
  isAuthorityMetadata(e) {
    return e.indexOf(Gn) !== -1;
  }
  /**
   * returns cache key used for cloud instance metadata
   */
  generateAuthorityMetadataCacheKey(e) {
    return `${Gn}-${this.clientId}-${e}`;
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
class cl extends Zn {
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
const er = {
  InProgress: 1,
  Completed: 2
}, hl = /* @__PURE__ */ new Set([
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
class vt {
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
        status: er.InProgress,
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
const Us = {
  tokenRenewalOffsetSeconds: Ki,
  preventCorsPreflight: !1
}, ll = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: !1,
  logLevel: R.Info,
  correlationId: ""
}, dl = {
  async sendGetRequestAsync() {
    throw p(T);
  },
  async sendPostRequestAsync() {
    throw p(T);
  }
}, ul = {
  sku: mc,
  version: kt,
  cpu: "",
  os: ""
}, gl = {
  clientSecret: "",
  clientAssertion: void 0
}, fl = {
  azureCloudInstance: Lr.None,
  tenant: `${Oi}`
}, pl = {
  application: {
    appName: "",
    appVersion: ""
  }
};
function jr({ authOptions: o, systemOptions: e, loggerOptions: t, storageInterface: n, networkInterface: r, cryptoInterface: i, clientCredentials: s, libraryInfo: a, telemetry: c, serverTelemetryManager: h, persistencePlugin: l, serializableCache: d }) {
  const g = {
    ...ll,
    ...t
  };
  return {
    authOptions: ml(o),
    systemOptions: { ...Us, ...e },
    loggerOptions: g,
    storageInterface: n || new cl(o.clientId, yt, new Q(g), new vt()),
    networkInterface: r || dl,
    cryptoInterface: i || yt,
    clientCredentials: s || gl,
    libraryInfo: { ...ul, ...a },
    telemetry: { ...pl, ...c },
    serverTelemetryManager: h || null,
    persistencePlugin: l || null,
    serializableCache: d || null
  };
}
function ml(o) {
  return {
    clientCapabilities: [],
    azureCloudOptions: fl,
    instanceAware: !1,
    ...o
  };
}
function xs(o) {
  return o.authOptions.authority.options.protocolMode === J.OIDC;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class ke extends A {
  constructor(e, t, n, r, i) {
    super(e, t, n), this.name = "ServerError", this.errorNo = r, this.status = i, Object.setPrototypeOf(this, ke.prototype);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Xt = "no_tokens_found", Ds = "native_account_unavailable", Gr = "refresh_token_expired", Vr = "ux_not_allowed", Ls = "interaction_required", Hs = "consent_required", Ks = "login_required", pn = "bad_token", bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badToken: pn,
  consentRequired: Hs,
  interactionRequired: Ls,
  loginRequired: Ks,
  nativeAccountUnavailable: Ds,
  noTokensFound: Xt,
  refreshTokenExpired: Gr,
  uxNotAllowed: Vr
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ei = [
  Ls,
  Hs,
  Ks,
  pn,
  Vr
], yl = [
  "message_only",
  "additional_action",
  "basic_action",
  "user_password_expired",
  "consent_required",
  "bad_token",
  "ux_not_allowed"
];
class ee extends A {
  constructor(e, t, n, r, i, s, a, c) {
    super(e, t, n), Object.setPrototypeOf(this, ee.prototype), this.timestamp = r || "", this.traceId = i || "", this.correlationId = s || "", this.claims = a || "", this.name = "InteractionRequiredAuthError", this.errorNo = c;
  }
}
function Fs(o, e, t) {
  const n = !!o && ei.indexOf(o) > -1, r = !!t && yl.indexOf(t) > -1, i = !!e && ei.some((s) => e.indexOf(s) > -1);
  return n || i || r;
}
function Zt(o, e) {
  return new ee(o, e);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Cl(o, e, t) {
  const n = wl(o, t);
  return e ? `${n}${Bn}${e}` : n;
}
function wl(o, e) {
  if (!o)
    throw p(Er);
  const t = {
    id: o.createNewGuid()
  };
  e && (t.meta = e);
  const n = JSON.stringify(t);
  return o.base64Encode(n);
}
function bt(o, e) {
  if (!o)
    throw p(Er);
  if (!e)
    throw p(rt);
  try {
    const t = e.split(Bn), n = t[0], r = t.length > 1 ? t.slice(1).join(Bn) : "", i = o(n), s = JSON.parse(i);
    return {
      userRequestState: r || "",
      libraryState: s
    };
  } catch {
    throw p(rt);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function $() {
  return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function ti(o) {
  return o.getTime() / 1e3;
}
function Ae(o) {
  return o ? new Date(Number(o) * 1e3) : /* @__PURE__ */ new Date();
}
function Ct(o, e) {
  const t = Number(o) || 0;
  return $() + e > t;
}
function ni(o, e) {
  const t = Number(o) + e * 24 * 60 * 60 * 1e3;
  return Date.now() > t;
}
function Bs(o) {
  return Number(o) > $();
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Il = "networkClientSendPostRequestAsync", Tl = "refreshTokenClientExecutePostToTokenEndpoint", Al = "authorizationCodeClientExecutePostToTokenEndpoint", El = "refreshTokenClientExecuteTokenRequest", Sl = "refreshTokenClientAcquireToken", xn = "refreshTokenClientAcquireTokenWithCachedRefreshToken", kl = "refreshTokenClientCreateTokenRequestBody", _l = "silentFlowClientGenerateResultFromCacheRecord", $r = "getAuthCodeUrl", zs = "handleCodeResponseFromServer", vl = "authClientExecuteTokenRequest", bl = "authClientCreateTokenRequestBody", Rl = "updateTokenEndpointAuthority", Rt = "popTokenGenerateCnf", Jr = "handleServerTokenResponse", Ol = "authorityResolveEndpointsAsync", Pl = "authorityGetCloudDiscoveryMetadataFromNetwork", Nl = "authorityUpdateCloudDiscoveryMetadata", Ml = "authorityGetEndpointMetadataFromNetwork", Ul = "authorityUpdateEndpointMetadata", ri = "authorityUpdateMetadataWithRegionalInformation", xl = "regionDiscoveryDetectRegion", oi = "regionDiscoveryGetRegionFromIMDS", Dl = "regionDiscoveryGetCurrentVersion", Ll = "cacheManagerGetRefreshToken", Hl = "setUserData";
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ie = (o, e, t, n, r) => (...i) => {
  t.trace("1plfzx", r);
  const s = n.startMeasurement(e, r);
  if (r) {
    const a = e + "CallCount";
    n.incrementFields({ [a]: 1 }, r);
  }
  try {
    const a = o(...i);
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
}, u = (o, e, t, n, r) => (...i) => {
  t.trace("1plfzx", r);
  const s = n.startMeasurement(e, r);
  if (r) {
    const a = e + "CallCount";
    n.incrementFields({ [a]: 1 }, r);
  }
  return o(...i).then((a) => (t.trace("1g8n6a", r), s.end({
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
const Kl = {
  SW: "sw"
};
class je {
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
    const n = await u(this.generateKid.bind(this), Rt, t, this.performanceClient, e.correlationId)(e), r = this.cryptoUtils.base64UrlEncode(JSON.stringify(n));
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
      xms_ksl: Kl.SW
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
    const { resourceRequestMethod: i, resourceRequestUri: s, shrClaims: a, shrNonce: c, shrOptions: h } = n, l = s ? new k(s) : void 0, d = l == null ? void 0 : l.getUrlComponents();
    return this.cryptoUtils.signJwt({
      at: e,
      ts: $(),
      m: i == null ? void 0 : i.toUpperCase(),
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
class Fl {
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
function mn(o, e, t, n, r) {
  return {
    credentialType: H.ID_TOKEN,
    homeAccountId: o,
    environment: e,
    clientId: n,
    secret: t,
    realm: r,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
}
function yn(o, e, t, n, r, i, s, a, c, h, l, d, g) {
  var w, I;
  const f = {
    homeAccountId: o,
    credentialType: H.ACCESS_TOKEN,
    secret: t,
    cachedAt: $().toString(),
    expiresOn: s.toString(),
    extendedExpiresOn: a.toString(),
    environment: e,
    clientId: n,
    realm: r,
    target: i,
    tokenType: l || S.BEARER,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
  if (d && (f.userAssertionHash = d), h && (f.refreshOn = h.toString()), ((w = f.tokenType) == null ? void 0 : w.toLowerCase()) !== S.BEARER.toLowerCase())
    switch (f.credentialType = H.ACCESS_TOKEN_WITH_AUTH_SCHEME, f.tokenType) {
      case S.POP:
        const E = oe(t, c);
        if (!((I = E == null ? void 0 : E.cnf) != null && I.kid))
          throw p(ps);
        f.keyId = E.cnf.kid;
        break;
      case S.SSH:
        f.keyId = g;
    }
  return f;
}
function js(o, e, t, n, r, i, s) {
  const a = {
    credentialType: H.REFRESH_TOKEN,
    homeAccountId: o,
    environment: e,
    clientId: n,
    secret: t,
    lastUpdatedAt: Date.now().toString()
  };
  return i && (a.userAssertionHash = i), r && (a.familyId = r), s && (a.expiresOn = s.toString()), a;
}
function Cn(o) {
  return o.hasOwnProperty("homeAccountId") && o.hasOwnProperty("environment") && o.hasOwnProperty("credentialType") && o.hasOwnProperty("clientId") && o.hasOwnProperty("secret");
}
function ii(o) {
  return o ? Cn(o) && o.hasOwnProperty("realm") && o.hasOwnProperty("target") && (o.credentialType === H.ACCESS_TOKEN || o.credentialType === H.ACCESS_TOKEN_WITH_AUTH_SCHEME) : !1;
}
function Bl(o) {
  return o ? Cn(o) && o.hasOwnProperty("realm") && o.credentialType === H.ID_TOKEN : !1;
}
function si(o) {
  return o ? Cn(o) && o.credentialType === H.REFRESH_TOKEN : !1;
}
function zl(o, e) {
  const t = o.indexOf(Di) === 0;
  let n = !0;
  return e && (n = e.hasOwnProperty("failedRequests") && e.hasOwnProperty("errors") && e.hasOwnProperty("cacheHits")), t && n;
}
function jl(o, e) {
  let t = !1;
  o && (t = o.indexOf(Li) === 0);
  let n = !0;
  return e && (n = e.hasOwnProperty("throttleTime")), t && n;
}
function Gl({ environment: o, clientId: e }) {
  return [
    ur,
    o,
    e
  ].join(xi).toLowerCase();
}
function Vl(o, e) {
  return e ? o.indexOf(ur) === 0 && e.hasOwnProperty("clientId") && e.hasOwnProperty("environment") : !1;
}
function $l(o, e) {
  return e ? o.indexOf(Gn) === 0 && e.hasOwnProperty("aliases") && e.hasOwnProperty("preferred_cache") && e.hasOwnProperty("preferred_network") && e.hasOwnProperty("canonical_authority") && e.hasOwnProperty("authorization_endpoint") && e.hasOwnProperty("token_endpoint") && e.hasOwnProperty("issuer") && e.hasOwnProperty("aliasesFromNetwork") && e.hasOwnProperty("endpointsFromNetwork") && e.hasOwnProperty("expiresAt") && e.hasOwnProperty("jwks_uri") : !1;
}
function ai() {
  return $() + Lc;
}
function Ut(o, e, t) {
  o.authorization_endpoint = e.authorization_endpoint, o.token_endpoint = e.token_endpoint, o.end_session_endpoint = e.end_session_endpoint, o.issuer = e.issuer, o.endpointsFromNetwork = t, o.jwks_uri = e.jwks_uri;
}
function Dn(o, e, t) {
  o.aliases = e.aliases, o.preferred_cache = e.preferred_cache, o.preferred_network = e.preferred_network, o.aliasesFromNetwork = t;
}
function ci(o) {
  return o.expiresAt <= $();
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Ge {
  constructor(e, t, n, r, i, s, a) {
    this.clientId = e, this.cacheStorage = t, this.cryptoObj = n, this.logger = r, this.performanceClient = i, this.serializableCache = s, this.persistencePlugin = a;
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
      const i = `Error(s): ${e.error_codes || ct} - Timestamp: ${e.timestamp || ct} - Description: ${e.error_description || ct} - Correlation ID: ${e.correlation_id || ct} - Trace ID: ${e.trace_id || ct}`, s = (r = e.error_codes) != null && r.length ? e.error_codes[0] : void 0, a = new ke(e.error, i, e.suberror, s, e.status);
      if (n && e.status && e.status >= Nc && e.status <= Mc) {
        this.logger.warning("16ks7j", t);
        return;
      } else if (n && e.status && e.status >= Oc && e.status <= Pc) {
        this.logger.warning("0g61x3", t);
        return;
      }
      throw Fs(e.error, e.error_description, e.suberror) ? new ee(e.error, e.error_description, e.suberror, e.timestamp || "", e.trace_id || "", e.correlation_id || "", e.claims || "", s) : a;
    }
  }
  /**
   * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
   * @param serverTokenResponse
   * @param authority
   */
  async handleServerTokenResponse(e, t, n, r, i, s, a, c, h) {
    let l;
    if (e.id_token) {
      if (l = oe(e.id_token || "", this.cryptoObj.base64Decode), i && i.nonce && l.nonce !== i.nonce)
        throw p(cs);
      if (r.maxAge || r.maxAge === 0) {
        const w = l.auth_time;
        if (!w)
          throw p(Ir);
        Ps(w, r.maxAge);
      }
    }
    this.homeAccountIdentifier = zr(e.client_info || "", t.authorityType, this.logger, this.cryptoObj, r.correlationId, l);
    let d;
    i && i.state && (d = bt(this.cryptoObj.base64Decode, i.state)), e.key_id = e.key_id || r.sshKid || void 0;
    const g = this.generateCacheRecord(e, t, n, r, l, s, i);
    let f;
    try {
      if (this.persistencePlugin && this.serializableCache && (this.logger.verbose("0jbz5k", r.correlationId), f = new Fl(this.serializableCache, !0), await this.persistencePlugin.beforeCacheAccess(f)), a && !c && g.account) {
        const w = this.cacheStorage.generateAccountKey(me(g.account));
        if (!this.cacheStorage.getAccount(w, r.correlationId))
          return this.logger.warning("1gmt66", r.correlationId), await Ge.generateAuthenticationResult(this.cryptoObj, t, g, !1, r, this.performanceClient, l, d, void 0, h);
      }
      await this.cacheStorage.saveCacheRecord(g, r.correlationId, ue(l || {}), r.storeInCache);
    } finally {
      this.persistencePlugin && this.serializableCache && f && (this.logger.verbose("1bh17u", r.correlationId), await this.persistencePlugin.afterCacheAccess(f));
    }
    return Ge.generateAuthenticationResult(this.cryptoObj, t, g, !1, r, this.performanceClient, l, d, e, h);
  }
  /**
   * Generates CacheRecord
   * @param serverTokenResponse
   * @param idTokenObj
   * @param authority
   */
  generateCacheRecord(e, t, n, r, i, s, a) {
    var I;
    const c = t.getPreferredCache();
    if (!c)
      throw p(Ar);
    const h = Fr(i);
    let l, d;
    e.id_token && i && (l = mn(this.homeAccountIdentifier, c, e.id_token, this.clientId, h || ""), d = Wr(
      this.cacheStorage,
      t,
      this.homeAccountIdentifier,
      this.cryptoObj.base64Decode,
      r.correlationId,
      i,
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
      const E = e.scope ? x.fromString(e.scope) : new x(r.scopes || []), P = (typeof e.expires_in == "string" ? parseInt(e.expires_in, 10) : e.expires_in) || 0, b = (typeof e.ext_expires_in == "string" ? parseInt(e.ext_expires_in, 10) : e.ext_expires_in) || 0, N = (typeof e.refresh_in == "string" ? parseInt(e.refresh_in, 10) : e.refresh_in) || void 0, te = n + P, _e = te + b, ve = N && N > 0 ? n + N : void 0;
      g = yn(this.homeAccountIdentifier, c, e.access_token, this.clientId, h || t.tenant || "", E.printScopes(), te, _e, this.cryptoObj.base64Decode, ve, e.token_type, s, e.key_id);
    }
    let f = null;
    if (e.refresh_token) {
      let E;
      if (e.refresh_token_expires_in) {
        const P = typeof e.refresh_token_expires_in == "string" ? parseInt(e.refresh_token_expires_in, 10) : e.refresh_token_expires_in;
        E = n + P, (I = this.performanceClient) == null || I.addFields({ ntwkRtExpiresOnSeconds: E }, r.correlationId);
      }
      f = js(this.homeAccountIdentifier, c, e.refresh_token, this.clientId, e.foci, s, E);
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
  static async generateAuthenticationResult(e, t, n, r, i, s, a, c, h, l) {
    var te, _e, ve, xo, Do;
    let d = "", g = [], f = null, w, I, E = "";
    if (n.accessToken) {
      if (n.accessToken.tokenType === S.POP && !i.popKid) {
        const fc = new je(e, s), { secret: pc, keyId: Lo } = n.accessToken;
        if (!Lo)
          throw p(Sr);
        d = await fc.signPopToken(pc, Lo, i);
      } else
        d = n.accessToken.secret;
      g = x.fromString(n.accessToken.target).asArray(), f = Ae(n.accessToken.expiresOn), w = Ae(n.accessToken.extendedExpiresOn), n.accessToken.refreshOn && (I = Ae(n.accessToken.refreshOn));
    }
    n.appMetadata && (E = n.appMetadata.familyId === jt ? jt : "");
    const P = (a == null ? void 0 : a.oid) || (a == null ? void 0 : a.sub) || "", b = (a == null ? void 0 : a.tid) || "";
    h != null && h.spa_accountid && n.account && (n.account.nativeAccountId = h == null ? void 0 : h.spa_accountid);
    const N = n.account ? Hr(
      me(n.account),
      void 0,
      // tenantProfile optional
      a,
      (te = n.idToken) == null ? void 0 : te.secret
    ) : null;
    return {
      authority: t.canonicalAuthority,
      uniqueId: P,
      tenantId: b,
      scopes: g,
      account: N,
      idToken: ((_e = n == null ? void 0 : n.idToken) == null ? void 0 : _e.secret) || "",
      idTokenClaims: a || {},
      accessToken: d,
      fromCache: r,
      expiresOn: f,
      extExpiresOn: w,
      refreshOn: I,
      correlationId: i.correlationId,
      requestId: l || "",
      familyId: E,
      tokenType: ((ve = n.accessToken) == null ? void 0 : ve.tokenType) || "",
      state: c ? c.userRequestState : "",
      cloudGraphHostName: ((xo = n.account) == null ? void 0 : xo.cloudGraphHostName) || "",
      msGraphHost: ((Do = n.account) == null ? void 0 : Do.msGraphHost) || "",
      code: h == null ? void 0 : h.spa_code,
      fromPlatformBroker: !1
    };
  }
}
function Wr(o, e, t, n, r, i, s, a, c, h, l, d) {
  d == null || d.verbose("09jz0t", r);
  const f = o.getAccountKeys().find((b) => b.startsWith(t));
  let w = null;
  f && (w = o.getAccount(f, r));
  const I = w || sl({
    homeAccountId: t,
    idTokenClaims: i,
    clientInfo: s,
    environment: a,
    cloudGraphHostName: h == null ? void 0 : h.cloud_graph_host_name,
    msGraphHost: h == null ? void 0 : h.msgraph_host,
    nativeAccountId: l
  }, e, n), E = I.tenantProfiles || [], P = c || I.realm;
  if (P && !E.find((b) => b.tenantId === P)) {
    const b = _t(t, I.localAccountId, P, i);
    E.push(b);
  }
  return I.tenantProfiles = E, I;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const de = {
  HOME_ACCOUNT_ID: "home_account_id",
  UPN: "UPN"
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
async function Gs(o, e, t) {
  return typeof o == "string" ? o : o({
    clientId: e,
    tokenEndpoint: t
  });
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function wn(o, e, t) {
  var n;
  return {
    clientId: o,
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
class ge {
  /**
   * Prepares a RequestThumbprint to be stored as a key.
   * @param thumbprint
   */
  static generateThrottlingStorageKey(e) {
    return `${Li}.${JSON.stringify(e)}`;
  }
  /**
   * Performs necessary throttling checks before a network request.
   * @param cacheManager
   * @param thumbprint
   */
  static preProcess(e, t, n) {
    var s;
    const r = ge.generateThrottlingStorageKey(t), i = e.getThrottlingCache(r, n);
    if (i) {
      if (i.throttleTime < Date.now()) {
        e.removeItem(r, n);
        return;
      }
      throw new ke(((s = i.errorCodes) == null ? void 0 : s.join(" ")) || "", i.errorMessage, i.subError);
    }
  }
  /**
   * Performs necessary throttling checks after a network request.
   * @param cacheManager
   * @param thumbprint
   * @param response
   */
  static postProcess(e, t, n, r) {
    if (ge.checkResponseStatus(n) || ge.checkResponseForRetryAfter(n)) {
      const i = {
        throttleTime: ge.calculateThrottleTime(parseInt(n.headers[K.RETRY_AFTER])),
        error: n.body.error,
        errorCodes: n.body.error_codes,
        errorMessage: n.body.error_description,
        subError: n.body.suberror
      };
      e.setThrottlingCache(ge.generateThrottlingStorageKey(t), i, r);
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
    return Math.floor(Math.min(n + (t || jc), n + Gc) * 1e3);
  }
  static removeThrottle(e, t, n, r) {
    const i = wn(t, n, r), s = this.generateThrottlingStorageKey(i);
    e.removeItem(s, n.correlationId);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class In extends A {
  constructor(e, t, n) {
    super(e.errorCode, e.errorMessage, e.subError), Object.setPrototypeOf(this, In.prototype), this.name = "NetworkError", this.error = e, this.httpStatus = t, this.responseHeaders = n;
  }
}
function dt(o, e, t, n) {
  return o.errorMessage = `${o.errorMessage}, additionalErrorInfo: error.name:${n == null ? void 0 : n.name}, error.message:${n == null ? void 0 : n.message}`, new In(o, e, t);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Vs(o, e, t) {
  const n = {};
  if (n[K.CONTENT_TYPE] = Ec, !e && t)
    switch (t.type) {
      case de.HOME_ACCOUNT_ID:
        try {
          const r = Xe(t.credential);
          n[K.CCS_HEADER] = `Oid:${r.uid}@${r.utid}`;
        } catch {
          o.verbose("1qhtee", "");
        }
        break;
      case de.UPN:
        n[K.CCS_HEADER] = `UPN: ${t.credential}`;
        break;
    }
  return n;
}
function $s(o, e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return o.embeddedClientId && gn(r, e, t), o.extraQueryParameters && pe(r, o.extraQueryParameters), Or(r, o.correlationId), un(r, o.correlationId, n), mt(r);
}
async function Js(o, e, t, n, r, i, s, a, c, h) {
  const l = await Jl(n, o, { body: e, headers: t }, r, i, s, a, c);
  return h && l.status < 500 && l.status !== 429 && h.clearTelemetryCache(), l;
}
async function Jl(o, e, t, n, r, i, s, a) {
  var h;
  ge.preProcess(r, o, n);
  let c;
  try {
    c = await u(i.sendPostRequestAsync.bind(i), Il, s, a, n)(e, t);
    const l = c.headers || {};
    a == null || a.addFields({
      refreshTokenSize: ((h = c.body.refresh_token) == null ? void 0 : h.length) || 0,
      httpVerToken: l[K.X_MS_HTTP_VERSION] || "",
      requestId: l[K.X_MS_REQUEST_ID] || ""
    }, n);
  } catch (l) {
    if (l instanceof In) {
      const d = l.responseHeaders;
      throw d && (a == null || a.addFields({
        httpVerToken: d[K.X_MS_HTTP_VERSION] || "",
        requestId: d[K.X_MS_REQUEST_ID] || "",
        contentTypeHeader: d[K.CONTENT_TYPE] || void 0,
        contentLengthHeader: d[K.CONTENT_LENGTH] || void 0,
        httpStatus: l.httpStatus
      }, n)), l.error;
    }
    throw l instanceof A ? l : p(os);
  }
  return ge.postProcess(r, o, c, n), c;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Wl(o) {
  return o.hasOwnProperty("authorization_endpoint") && o.hasOwnProperty("token_endpoint") && o.hasOwnProperty("issuer") && o.hasOwnProperty("jwks_uri");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Ql(o) {
  return o.hasOwnProperty("tenant_discovery_endpoint") && o.hasOwnProperty("metadata");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function Yl(o) {
  return o.hasOwnProperty("error") && o.hasOwnProperty("error_description");
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Tn {
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
      t.region_source = We.ENVIRONMENT_VARIABLE;
    else {
      const r = Tn.IMDS_OPTIONS;
      try {
        const i = await u(this.getRegionFromIMDS.bind(this), oi, this.logger, this.performanceClient, this.correlationId)(Sc, r);
        if (i.status === Bo && (n = i.body, t.region_source = We.IMDS), i.status === zo) {
          const s = await u(this.getCurrentVersion.bind(this), Dl, this.logger, this.performanceClient, this.correlationId)(r);
          if (!s)
            return t.region_source = We.FAILED_AUTO_DETECTION, null;
          const a = await u(this.getRegionFromIMDS.bind(this), oi, this.logger, this.performanceClient, this.correlationId)(s, r);
          a.status === Bo && (n = a.body, t.region_source = We.IMDS);
        }
      } catch {
        return t.region_source = We.FAILED_AUTO_DETECTION, null;
      }
    }
    return n || (t.region_source = We.FAILED_AUTO_DETECTION), n || null;
  }
  /**
   * Make the call to the IMDS endpoint
   *
   * @param imdsEndpointUrl
   * @returns Promise<NetworkResponse<string>>
   */
  async getRegionFromIMDS(e, t) {
    return this.networkInterface.sendGetRequestAsync(`${Ko}?api-version=${e}&format=text`, t, kc);
  }
  /**
   * Get the most recent version of the IMDS endpoint available
   *
   * @returns Promise<string | null>
   */
  async getCurrentVersion(e) {
    try {
      const t = await this.networkInterface.sendGetRequestAsync(`${Ko}?format=json`, e);
      return t.status === zo && t.body && t.body["newest-versions"] && t.body["newest-versions"].length > 0 ? t.body["newest-versions"][0] : null;
    } catch {
      return null;
    }
  }
}
Tn.IMDS_OPTIONS = {
  headers: {
    Metadata: "true"
  }
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
class z {
  constructor(e, t, n, r, i, s, a, c) {
    this.canonicalAuthority = e, this._canonicalAuthority.validateAsUri(), this.networkInterface = t, this.cacheManager = n, this.authorityOptions = r, this.regionDiscoveryMetadata = {
      region_used: void 0,
      region_source: void 0,
      region_outcome: void 0
    }, this.logger = i, this.performanceClient = a, this.correlationId = s, this.managedIdentity = c || !1, this.regionDiscovery = new Tn(t, this.logger, this.performanceClient, this.correlationId);
  }
  /**
   * Get {@link AuthorityType}
   * @param authorityUri {@link IUri}
   * @private
   */
  getAuthorityType(e) {
    if (e.HostNameAndPort.endsWith(Ho))
      return le.Ciam;
    const t = e.PathSegments;
    if (t.length)
      switch (t[0].toLowerCase()) {
        case Cc:
          return le.Adfs;
        case wc:
          return le.Dsts;
      }
    return le.Default;
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
    this._canonicalAuthority = new k(e), this._canonicalAuthority.validateAsUri(), this._canonicalAuthorityUrlComponents = null;
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
    throw p(we);
  }
  /**
   * OAuth /token endpoint for requests
   */
  get tokenEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint);
    throw p(we);
  }
  get deviceCodeEndpoint() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
    throw p(we);
  }
  /**
   * OAuth logout endpoint for requests
   */
  get endSessionEndpoint() {
    if (this.discoveryComplete()) {
      if (!this.metadata.end_session_endpoint)
        throw p(Cs);
      return this.replacePath(this.metadata.end_session_endpoint);
    } else
      throw p(we);
  }
  /**
   * OAuth issuer for requests
   */
  get selfSignedJwtAudience() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.issuer);
    throw p(we);
  }
  /**
   * Jwks_uri for token signing keys
   */
  get jwksUri() {
    if (this.discoveryComplete())
      return this.replacePath(this.metadata.jwks_uri);
    throw p(we);
  }
  /**
   * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
   * @param authorityUri {@link IUri}
   * @private
   */
  canReplaceTenant(e) {
    return e.PathSegments.length === 1 && !z.reservedTenantDomains.has(e.PathSegments[0]) && this.getAuthorityType(e) === le.Default && this.protocolMode !== J.OIDC;
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
    const r = new k(this.metadata.canonical_authority).getUrlComponents(), i = r.PathSegments;
    return this.canonicalAuthorityUrlComponents.PathSegments.forEach((a, c) => {
      let h = i[c];
      if (c === 0 && this.canReplaceTenant(r)) {
        const l = new k(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
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
    return this.canonicalAuthority.endsWith("v2.0/") || this.authorityType === le.Adfs || this.protocolMode === J.OIDC && !this.isAliasOfKnownMicrosoftAuthority(e) ? `${this.canonicalAuthority}.well-known/openid-configuration` : `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
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
    const e = this.getCurrentMetadataEntity(), t = await u(this.updateCloudDiscoveryMetadata.bind(this), Nl, this.logger, this.performanceClient, this.correlationId)(e);
    this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, e.preferred_network);
    const n = await u(this.updateEndpointMetadata.bind(this), Ul, this.logger, this.performanceClient, this.correlationId)(e);
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
      expiresAt: ai(),
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
    t !== ce.CACHE && (n == null ? void 0 : n.source) !== ce.CACHE && (e.expiresAt = ai(), e.canonical_authority = this.canonicalAuthority);
    const r = this.cacheManager.generateAuthorityMetadataCacheKey(e.preferred_cache, this.correlationId);
    this.cacheManager.setAuthorityMetadata(r, e, this.correlationId), this.metadata = e;
  }
  /**
   * Update AuthorityMetadataEntity with new endpoints and return where the information came from
   * @param metadataEntity
   */
  async updateEndpointMetadata(e) {
    var r, i;
    const t = this.updateEndpointMetadataFromLocalSources(e);
    if (t) {
      if (t.source === ce.HARDCODED_VALUES && (r = this.authorityOptions.azureRegionConfiguration) != null && r.azureRegion && t.metadata) {
        const s = await u(this.updateMetadataWithRegionalInformation.bind(this), ri, this.logger, this.performanceClient, this.correlationId)(t.metadata);
        Ut(e, s, !1), e.canonical_authority = this.canonicalAuthority;
      }
      return t.source;
    }
    let n = await u(this.getEndpointMetadataFromNetwork.bind(this), Ml, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return (i = this.authorityOptions.azureRegionConfiguration) != null && i.azureRegion && (n = await u(this.updateMetadataWithRegionalInformation.bind(this), ri, this.logger, this.performanceClient, this.correlationId)(n)), Ut(e, n, !0), ce.NETWORK;
    throw p(is, this.defaultOpenIdConfigurationEndpoint);
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
      return this.logger.verbose("06t0uj", this.correlationId), Ut(e, t, !1), {
        source: ce.CONFIG
      };
    this.logger.verbose("151k0p", this.correlationId);
    const n = this.getEndpointMetadataFromHardcodedValues();
    if (n)
      return Ut(e, n, !1), {
        source: ce.HARDCODED_VALUES,
        metadata: n
      };
    this.logger.verbose("1imop5", this.correlationId);
    const r = ci(e);
    return this.isAuthoritySameType(e) && e.endpointsFromNetwork && !r ? (this.logger.verbose("16uq31", ""), { source: ce.CACHE }) : (r && this.logger.verbose("0uoibc", ""), null);
  }
  /**
   * Compares the number of url components after the domain to determine if the cached
   * authority metadata can be used for the requested authority. Protects against same domain different
   * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
   * @param metadataEntity
   */
  isAuthoritySameType(e) {
    return new k(e.canonical_authority).getUrlComponents().PathSegments.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
  }
  /**
   * Parse authorityMetadata config option
   */
  getEndpointMetadataFromConfig() {
    if (this.authorityOptions.authorityMetadata)
      try {
        return JSON.parse(this.authorityOptions.authorityMetadata);
      } catch {
        throw v(Qi);
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
      return Wl(n.body) ? n.body : (this.logger.verbose("1koyv8", this.correlationId), null);
    } catch {
      return this.logger.verbose("0a9wik", this.correlationId), null;
    }
  }
  /**
   * Get OAuth endpoints for common authorities.
   */
  getEndpointMetadataFromHardcodedValues() {
    return this.hostnameAndPort in Xo ? Xo[this.hostnameAndPort] : null;
  }
  /**
   * Update the retrieved metadata with regional information.
   * User selected Azure region will be used if configured.
   */
  async updateMetadataWithRegionalInformation(e) {
    var n, r;
    const t = (n = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : n.azureRegion;
    if (t) {
      if (t !== _c)
        return this.regionDiscoveryMetadata.region_outcome = Un.CONFIGURED_NO_AUTO_DETECTION, this.regionDiscoveryMetadata.region_used = t, z.replaceWithRegionalInformation(e, t);
      const i = await u(this.regionDiscovery.detectRegion.bind(this.regionDiscovery), xl, this.logger, this.performanceClient, this.correlationId)((r = this.authorityOptions.azureRegionConfiguration) == null ? void 0 : r.environmentRegion, this.regionDiscoveryMetadata);
      if (i)
        return this.regionDiscoveryMetadata.region_outcome = Un.AUTO_DETECTION_REQUESTED_SUCCESSFUL, this.regionDiscoveryMetadata.region_used = i, z.replaceWithRegionalInformation(e, i);
      this.regionDiscoveryMetadata.region_outcome = Un.AUTO_DETECTION_REQUESTED_FAILED;
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
    const n = await u(this.getCloudDiscoveryMetadataFromNetwork.bind(this), Pl, this.logger, this.performanceClient, this.correlationId)();
    if (n)
      return Dn(e, n, !0), ce.NETWORK;
    throw v(Yi);
  }
  updateCloudDiscoveryMetadataFromLocalSources(e) {
    this.logger.verbose("0jhlgt", this.correlationId), this.logger.verbosePii("1fy7uz", this.correlationId), this.logger.verbosePii("08zabj", this.correlationId), this.logger.verbosePii("1o1kv3", this.correlationId);
    const t = this.getCloudDiscoveryMetadataFromConfig();
    if (t)
      return this.logger.verbose("1nakio", this.correlationId), Dn(e, t, !1), ce.CONFIG;
    this.logger.verbose("1x74aj", this.correlationId);
    const n = ol(this.hostnameAndPort);
    if (n)
      return this.logger.verbose("0by47c", this.correlationId), Dn(e, n, !1), ce.HARDCODED_VALUES;
    this.logger.verbose("0r2fzy", this.correlationId);
    const r = ci(e);
    return this.isAuthoritySameType(e) && e.aliasesFromNetwork && !r ? (this.logger.verbose("1uffgh", ""), ce.CACHE) : (r && this.logger.verbose("0uoibc", ""), null);
  }
  /**
   * Parse cloudDiscoveryMetadata config or check knownAuthorities
   */
  getCloudDiscoveryMetadataFromConfig() {
    if (this.authorityType === le.Ciam)
      return this.logger.verbose("04y84h", this.correlationId), z.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    if (this.authorityOptions.cloudDiscoveryMetadata) {
      this.logger.verbose("0gszr3", this.correlationId);
      try {
        this.logger.verbose("1iifkx", this.correlationId);
        const e = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata), t = Yt(e.metadata, this.hostnameAndPort);
        if (this.logger.verbose("0q67e3", ""), t)
          return this.logger.verbose("0hzfao", this.correlationId), t;
        this.logger.verbose("1ajz3u", this.correlationId);
      } catch {
        throw this.logger.verbose("1wq5tu", this.correlationId), v(yr);
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
    const e = `${Ic}${this.canonicalAuthority}oauth2/v2.0/authorize`, t = {};
    let n = null;
    try {
      const r = await this.networkInterface.sendGetRequestAsync(e, t);
      let i, s;
      if (Ql(r.body))
        i = r.body, s = i.metadata, this.logger.verbosePii("1vglyt", this.correlationId);
      else if (Yl(r.body)) {
        if (this.logger.warning("062uto", this.correlationId), i = r.body, i.error === Rc)
          return this.logger.error("1x90tm", this.correlationId), null;
        this.logger.warning("0wchdm", this.correlationId), this.logger.warning("1s5mpv", this.correlationId), this.logger.warning("1yhqpw", this.correlationId), s = [];
      } else
        return this.logger.error("0768g0", this.correlationId), null;
      this.logger.verbose("1lrobr", this.correlationId), n = Yt(s, this.hostnameAndPort);
    } catch (r) {
      return r instanceof A ? this.logger.error("0vwhc7", this.correlationId) : this.logger.error("0s2z41", this.correlationId), null;
    }
    return n || (this.logger.warning("0jp28q", this.correlationId), this.logger.verbose("130sd8", this.correlationId), n = z.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort)), n;
  }
  /**
   * Helper function to determine if this host is included in the knownAuthorities config option
   */
  isInKnownAuthorities() {
    return this.authorityOptions.knownAuthorities.filter((t) => t && k.getDomainFromUrl(t).toLowerCase() === this.hostnameAndPort).length > 0;
  }
  /**
   * helper function to populate the authority based on azureCloudOptions
   * @param authorityString
   * @param azureCloudOptions
   */
  static generateAuthority(e, t) {
    let n;
    if (t && t.azureCloudInstance !== Lr.None) {
      const r = t.tenant ? t.tenant : Oi;
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
      return yc;
    if (this.discoveryComplete())
      return this.metadata.preferred_cache;
    throw p(we);
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
    return Ms.has(e);
  }
  /**
   * Checks whether the provided host is that of a public cloud authority
   *
   * @param authority string
   * @returns bool
   */
  static isPublicCloudAuthority(e) {
    return bc.indexOf(e) >= 0;
  }
  /**
   * Rebuild the authority string with the region
   *
   * @param host string
   * @param region string
   */
  static buildRegionalAuthorityString(e, t, n) {
    const r = new k(e);
    r.validateAsUri();
    const i = r.getUrlComponents();
    let s = `${t}.${i.HostNameAndPort}`;
    this.isPublicCloudAuthority(i.HostNameAndPort) && (s = `${t}.${vc}`);
    const a = k.constructAuthorityUriFromObject({
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
    const r = new k(e).getUrlComponents();
    if (r.PathSegments.length === 0 && r.HostNameAndPort.endsWith(Ho)) {
      const i = r.HostNameAndPort.split(".")[0];
      t = `${t}${i}${Tc}`;
    }
    return t;
  }
}
z.reservedTenantDomains = /* @__PURE__ */ new Set([
  "{tenant}",
  "{tenantid}",
  Me.COMMON,
  Me.CONSUMERS,
  Me.ORGANIZATIONS
]);
function ql(o) {
  var r;
  const n = (r = new k(o).getUrlComponents().PathSegments.slice(-1)[0]) == null ? void 0 : r.toLowerCase();
  switch (n) {
    case Me.COMMON:
    case Me.ORGANIZATIONS:
    case Me.CONSUMERS:
      return;
    default:
      return n;
  }
}
function Ws(o) {
  return o.endsWith(zn) ? o : `${o}${zn}`;
}
function Qr(o) {
  const e = o.cloudDiscoveryMetadata;
  let t;
  if (e)
    try {
      t = JSON.parse(e);
    } catch {
      throw v(yr);
    }
  return {
    canonicalAuthority: o.authority ? Ws(o.authority) : void 0,
    knownAuthorities: o.knownAuthorities,
    cloudDiscoveryMetadata: t
  };
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
async function Qs(o, e, t, n, r, i, s) {
  const a = z.transformCIAMAuthority(Ws(o)), c = new z(a, e, t, n, r, i, s);
  try {
    return await u(c.resolveEndpointsAsync.bind(c), Ol, r, s, i)(), c;
  } catch {
    throw p(we);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Ys {
  constructor(e, t) {
    var n;
    this.includeRedirectUri = !0, this.config = jr(e), this.logger = new Q(this.config.loggerOptions, fn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t, this.oidcDefaultScopes = (n = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : n.defaultScopes;
  }
  /**
   * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
   * authorization_code_grant
   * @param request
   */
  async acquireToken(e, t) {
    var a;
    if (!e.code)
      throw p(ds);
    t && t.cloud_instance_host_name && await u(this.updateTokenEndpointAuthority.bind(this), Rl, this.logger, this.performanceClient, e.correlationId)(t.cloud_instance_host_name, e.correlationId);
    const n = $(), r = await u(this.executeTokenRequest.bind(this), vl, this.logger, this.performanceClient, e.correlationId)(this.authority, e, this.serverTelemetryManager), i = (a = r.headers) == null ? void 0 : a[K.X_MS_REQUEST_ID], s = new Ge(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    return s.validateTokenResponse(r.body, e.correlationId), u(s.handleServerTokenResponse.bind(s), Jr, this.logger, this.performanceClient, e.correlationId)(r.body, this.authority, n, e, t, void 0, void 0, void 0, i);
  }
  /**
   * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param authorityUri
   */
  getLogoutUri(e) {
    if (!e)
      throw v(Wi);
    const t = this.createLogoutUrlQueryString(e);
    return k.appendQueryString(this.authority.endSessionEndpoint, t);
  }
  /**
   * Executes POST request to token endpoint
   * @param authority
   * @param request
   */
  async executeTokenRequest(e, t, n) {
    const r = $s(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient), i = k.appendQueryString(e.tokenEndpoint, r), s = await u(this.createTokenRequestBody.bind(this), bl, this.logger, this.performanceClient, t.correlationId)(t);
    let a;
    if (t.clientInfo)
      try {
        const l = qt(t.clientInfo, this.cryptoUtils.base64Decode);
        a = {
          credential: `${l.uid}${jn}${l.utid}`,
          type: de.HOME_ACCOUNT_ID
        };
      } catch {
        this.logger.verbose("0wznt3", t.correlationId);
      }
    const c = Vs(this.logger, this.config.systemOptions.preventCorsPreflight, a || t.ccsCredential), h = wn(this.config.authOptions.clientId, t);
    return u(Js, Al, this.logger, this.performanceClient, t.correlationId)(i, s, c, h, t.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, n);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request
   */
  async createTokenRequestBody(e) {
    var r;
    const t = /* @__PURE__ */ new Map();
    if (vr(t, e.embeddedClientId || ((r = e.extraParameters) == null ? void 0 : r[ze]) || this.config.authOptions.clientId), this.includeRedirectUri)
      br(t, e.redirectUri);
    else if (!e.redirectUri)
      throw v(ji);
    if (_r(t, e.scopes, !0, this.oidcDefaultScopes), zh(t, e.code), Pr(t, this.config.libraryInfo), Nr(t, this.config.telemetry.application), Rs(t), this.serverTelemetryManager && !xs(this.config) && bs(t, this.serverTelemetryManager), e.codeVerifier && Gh(t, e.codeVerifier), this.config.clientCredentials.clientSecret && As(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const i = this.config.clientCredentials.clientAssertion;
      Es(t, await Gs(i.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Ss(t, i.assertionType);
    }
    if (ks(t, Mi.AUTHORIZATION_CODE_GRANT), Ur(t), e.authenticationScheme === S.POP) {
      const i = new je(this.cryptoUtils, this.performanceClient);
      let s;
      e.popKid ? s = this.cryptoUtils.encodeKid(e.popKid) : s = (await u(i.generateCnf.bind(i), Rt, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, Dr(t, s);
    } else if (e.authenticationScheme === S.SSH)
      if (e.sshJwk)
        vs(t, e.sshJwk);
      else
        throw v(dn);
    (!X.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && Rr(t, e.claims, this.config.authOptions.clientCapabilities);
    let n;
    if (e.clientInfo)
      try {
        const i = qt(e.clientInfo, this.cryptoUtils.base64Decode);
        n = {
          credential: `${i.uid}${jn}${i.utid}`,
          type: de.HOME_ACCOUNT_ID
        };
      } catch {
        this.logger.verbose("0wznt3", e.correlationId);
      }
    else
      n = e.ccsCredential;
    if (this.config.systemOptions.preventCorsPreflight && n)
      switch (n.type) {
        case de.HOME_ACCOUNT_ID:
          try {
            const i = Xe(n.credential);
            ut(t, i);
          } catch {
            this.logger.verbose("1qhtee", e.correlationId);
          }
          break;
        case de.UPN:
          Wt(t, n.credential);
          break;
      }
    return e.embeddedClientId && gn(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.extraParameters && pe(t, e.extraParameters), e.enableSpaAuthorizationCode && (!e.extraParameters || !e.extraParameters[Jo]) && pe(t, {
      [Jo]: "1"
    }), un(t, e.correlationId, this.performanceClient), mt(t);
  }
  /**
   * This API validates the `EndSessionRequest` and creates a URL
   * @param request
   */
  createLogoutUrlQueryString(e) {
    const t = /* @__PURE__ */ new Map();
    return e.postLogoutRedirectUri && Lh(t, e.postLogoutRedirectUri), e.correlationId && Or(t, e.correlationId), e.idTokenHint && Hh(t, e.idTokenHint), e.state && Ts(t, e.state), e.logoutHint && Vh(t, e.logoutHint), e.extraQueryParameters && pe(t, e.extraQueryParameters), this.config.authOptions.instanceAware && _s(t), mt(t);
  }
  /**
   * Updates the authority to the cloud instance provided in the authorization response
   * @param cloudInstanceHostName - cloud instance host name from authorization code payload
   * @param correlationId - request correlation id
   */
  async updateTokenEndpointAuthority(e, t) {
    const n = `https://${e}/${this.authority.tenant}/`, r = await Qs(n, this.networkClient, this.cacheManager, this.authority.options, this.logger, t, this.performanceClient);
    this.authority = r;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const Xl = 300;
class Zl {
  constructor(e, t) {
    this.config = jr(e), this.logger = new Q(this.config.loggerOptions, fn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t;
  }
  async acquireToken(e) {
    var s;
    const t = $(), n = await u(this.executeTokenRequest.bind(this), El, this.logger, this.performanceClient, e.correlationId)(e, this.authority), r = (s = n.headers) == null ? void 0 : s[K.X_MS_REQUEST_ID], i = new Ge(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    return i.validateTokenResponse(n.body, e.correlationId), u(i.handleServerTokenResponse.bind(i), Jr, this.logger, this.performanceClient, e.correlationId)(n.body, this.authority, t, e, void 0, void 0, !0, e.forceCache, r);
  }
  /**
   * Gets cached refresh token and attaches to request, then calls acquireToken API
   * @param request
   */
  async acquireTokenByRefreshToken(e) {
    if (!e)
      throw v(Ji);
    if (!e.account)
      throw p(Tr);
    if (this.cacheManager.isAppMetadataFOCI(e.account.environment, e.correlationId))
      try {
        return await u(this.acquireTokenWithCachedRefreshToken.bind(this), xn, this.logger, this.performanceClient, e.correlationId)(e, !0);
      } catch (n) {
        const r = n instanceof ee && n.errorCode === Xt, i = n instanceof ke && n.errorCode === $c && n.subError === Jc;
        if (r || i)
          return u(this.acquireTokenWithCachedRefreshToken.bind(this), xn, this.logger, this.performanceClient, e.correlationId)(e, !1);
        throw n;
      }
    return u(this.acquireTokenWithCachedRefreshToken.bind(this), xn, this.logger, this.performanceClient, e.correlationId)(e, !1);
  }
  /**
   * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
   * @param request
   */
  async acquireTokenWithCachedRefreshToken(e, t) {
    var i;
    const n = ie(this.cacheManager.getRefreshToken.bind(this.cacheManager), Ll, this.logger, this.performanceClient, e.correlationId)(e.account, t, e.correlationId, void 0);
    if (!n)
      throw Zt(Xt);
    if (n.expiresOn) {
      const s = e.refreshTokenExpirationOffsetSeconds || Xl;
      if ((i = this.performanceClient) == null || i.addFields({
        cacheRtExpiresOnSeconds: Number(n.expiresOn),
        rtOffsetSeconds: s
      }, e.correlationId), Ct(n.expiresOn, s))
        throw Zt(Gr);
    }
    const r = {
      ...e,
      refreshToken: n.secret,
      authenticationScheme: e.authenticationScheme || S.BEARER,
      ccsCredential: {
        credential: e.account.homeAccountId,
        type: de.HOME_ACCOUNT_ID
      }
    };
    try {
      return await u(this.acquireToken.bind(this), Sl, this.logger, this.performanceClient, e.correlationId)(r);
    } catch (s) {
      if (s instanceof ee && s.subError === pn) {
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
    const n = $s(e, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient), r = k.appendQueryString(t.tokenEndpoint, n), i = await u(this.createTokenRequestBody.bind(this), kl, this.logger, this.performanceClient, e.correlationId)(e), s = Vs(this.logger, this.config.systemOptions.preventCorsPreflight, e.ccsCredential), a = wn(this.config.authOptions.clientId, e);
    return u(Js, Tl, this.logger, this.performanceClient, e.correlationId)(r, i, s, a, e.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, this.serverTelemetryManager);
  }
  /**
   * Helper function to create the token request body
   * @param request
   */
  async createTokenRequestBody(e) {
    var n, r;
    const t = /* @__PURE__ */ new Map();
    if (vr(t, e.embeddedClientId || ((n = e.extraParameters) == null ? void 0 : n[ze]) || this.config.authOptions.clientId), e.redirectUri && br(t, e.redirectUri), _r(t, e.scopes, !0, (r = this.config.authOptions.authority.options.OIDCOptions) == null ? void 0 : r.defaultScopes), ks(t, Mi.REFRESH_TOKEN_GRANT), Ur(t), Pr(t, this.config.libraryInfo), Nr(t, this.config.telemetry.application), Rs(t), this.serverTelemetryManager && !xs(this.config) && bs(t, this.serverTelemetryManager), jh(t, e.refreshToken), this.config.clientCredentials.clientSecret && As(t, this.config.clientCredentials.clientSecret), this.config.clientCredentials.clientAssertion) {
      const i = this.config.clientCredentials.clientAssertion;
      Es(t, await Gs(i.assertion, this.config.authOptions.clientId, e.resourceRequestUri)), Ss(t, i.assertionType);
    }
    if (e.authenticationScheme === S.POP) {
      const i = new je(this.cryptoUtils, this.performanceClient);
      let s;
      e.popKid ? s = this.cryptoUtils.encodeKid(e.popKid) : s = (await u(i.generateCnf.bind(i), Rt, this.logger, this.performanceClient, e.correlationId)(e, this.logger)).reqCnfString, Dr(t, s);
    } else if (e.authenticationScheme === S.SSH)
      if (e.sshJwk)
        vs(t, e.sshJwk);
      else
        throw v(dn);
    if ((!X.isEmptyObj(e.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) && Rr(t, e.claims, this.config.authOptions.clientCapabilities), this.config.systemOptions.preventCorsPreflight && e.ccsCredential)
      switch (e.ccsCredential.type) {
        case de.HOME_ACCOUNT_ID:
          try {
            const i = Xe(e.ccsCredential.credential);
            ut(t, i);
          } catch {
            this.logger.verbose("1qhtee", e.correlationId);
          }
          break;
        case de.UPN:
          Wt(t, e.ccsCredential.credential);
          break;
      }
    return e.embeddedClientId && gn(t, this.config.authOptions.clientId, this.config.authOptions.redirectUri), e.extraParameters && pe(t, {
      ...e.extraParameters
    }), un(t, e.correlationId, this.performanceClient), mt(t);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class ed {
  constructor(e, t) {
    this.config = jr(e), this.logger = new Q(this.config.loggerOptions, fn, kt), this.cryptoUtils = this.config.cryptoInterface, this.cacheManager = this.config.storageInterface, this.networkClient = this.config.networkInterface, this.serverTelemetryManager = this.config.serverTelemetryManager, this.authority = this.config.authOptions.authority, this.performanceClient = t;
  }
  /**
   * Retrieves token from cache or throws an error if it must be refreshed.
   * @param request
   */
  async acquireCachedToken(e) {
    let t = He.NOT_APPLICABLE;
    if (e.forceRefresh || !X.isEmptyObj(e.claims))
      throw this.setCacheOutcome(He.FORCE_REFRESH_OR_CLAIMS, e.correlationId), p(Ue);
    if (!e.account)
      throw p(Tr);
    const n = e.account.tenantId || ql(e.authority), r = this.cacheManager.getTokenKeys(), i = this.cacheManager.getAccessToken(e.account, e, r, n);
    if (i) {
      if (Bs(i.cachedAt) || Ct(i.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds))
        throw this.setCacheOutcome(He.CACHED_ACCESS_TOKEN_EXPIRED, e.correlationId), p(Ue);
      i.refreshOn && Ct(i.refreshOn, 0) && (t = He.PROACTIVELY_REFRESHED);
    } else throw this.setCacheOutcome(He.NO_CACHED_ACCESS_TOKEN, e.correlationId), p(Ue);
    const s = e.authority || this.authority.getPreferredCache(), a = {
      account: this.cacheManager.getAccount(this.cacheManager.generateAccountKey(e.account), e.correlationId),
      accessToken: i,
      idToken: this.cacheManager.getIdToken(e.account, e.correlationId, r, n),
      refreshToken: null,
      appMetadata: this.cacheManager.readAppMetadataFromCache(s, e.correlationId)
    };
    return this.setCacheOutcome(t, e.correlationId), this.config.serverTelemetryManager && this.config.serverTelemetryManager.incrementCacheHits(), [
      await u(this.generateResultFromCacheRecord.bind(this), _l, this.logger, this.performanceClient, e.correlationId)(a, e),
      t
    ];
  }
  setCacheOutcome(e, t) {
    var n, r;
    (n = this.serverTelemetryManager) == null || n.setCacheOutcome(e), (r = this.performanceClient) == null || r.addFields({
      cacheOutcome: e
    }, t), e !== He.NOT_APPLICABLE && this.logger.info("09ingz", t);
  }
  /**
   * Helper function to build response object from the CacheRecord
   * @param cacheRecord
   */
  async generateResultFromCacheRecord(e, t) {
    let n;
    if (e.idToken && (n = oe(e.idToken.secret, this.config.cryptoInterface.base64Decode)), t.maxAge || t.maxAge === 0) {
      const r = n == null ? void 0 : n.auth_time;
      if (!r)
        throw p(Ir);
      Ps(r, t.maxAge);
    }
    return Ge.generateAuthenticationResult(this.cryptoUtils, this.authority, e, !0, t, this.performanceClient, n);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const td = {
  sendGetRequestAsync: () => Promise.reject(p(T)),
  sendPostRequestAsync: () => Promise.reject(p(T))
};
/*! @azure/msal-common v16.0.2 2026-01-17 */
function nd(o, e, t, n) {
  var a, c;
  const r = e.correlationId, i = /* @__PURE__ */ new Map();
  vr(i, e.embeddedClientId || ((a = e.extraQueryParameters) == null ? void 0 : a[ze]) || o.clientId);
  const s = [
    ...e.scopes || [],
    ...e.extraScopesToConsent || []
  ];
  if (_r(i, s, !0, (c = o.authority.options.OIDCOptions) == null ? void 0 : c.defaultScopes), br(i, e.redirectUri), Or(i, r), xh(i, e.responseMode), Ur(i), e.prompt && (Fh(i, e.prompt), n == null || n.addFields({ prompt: e.prompt }, r)), e.domainHint && (Kh(i, e.domainHint), n == null || n.addFields({ domainHintFromRequest: !0 }, r)), e.prompt !== V.SELECT_ACCOUNT)
    if (e.sid && e.prompt === V.NONE)
      t.verbose("1tvqyx", e.correlationId), Wo(i, e.sid), n == null || n.addFields({ sidFromRequest: !0 }, r);
    else if (e.account) {
      const h = id(e.account);
      let l = sd(e.account);
      if (l && e.domainHint && (t.warning("0wkg3v", e.correlationId), l = null), l) {
        t.verbose("1eyfsw", e.correlationId), Mt(i, l), n == null || n.addFields({ loginHintFromClaim: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          ut(i, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      } else if (h && e.prompt === V.NONE) {
        t.verbose("1rmd8s", e.correlationId), Wo(i, h), n == null || n.addFields({ sidFromClaim: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          ut(i, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      } else if (e.loginHint)
        t.verbose("0y3007", e.correlationId), Mt(i, e.loginHint), Wt(i, e.loginHint), n == null || n.addFields({ loginHintFromRequest: !0 }, r);
      else if (e.account.username) {
        t.verbose("02f507", e.correlationId), Mt(i, e.account.username), n == null || n.addFields({ loginHintFromUpn: !0 }, r);
        try {
          const d = Xe(e.account.homeAccountId);
          ut(i, d);
        } catch {
          t.verbose("12ugck", e.correlationId);
        }
      }
    } else e.loginHint && (t.verbose("0g01ey", e.correlationId), Mt(i, e.loginHint), Wt(i, e.loginHint), n == null || n.addFields({ loginHintFromRequest: !0 }, r));
  else
    t.verbose("169k9v", e.correlationId);
  return e.nonce && Bh(i, e.nonce), e.state && Ts(i, e.state), (e.claims || o.clientCapabilities && o.clientCapabilities.length > 0) && Rr(i, e.claims, o.clientCapabilities), e.embeddedClientId && gn(i, o.clientId, o.redirectUri), o.instanceAware && (!e.extraQueryParameters || !Object.keys(e.extraQueryParameters).includes(Vn)) && _s(i), i;
}
function Yr(o, e) {
  const t = mt(e);
  return k.appendQueryString(o.authorizationEndpoint, t);
}
function rd(o, e) {
  if (qs(o, e), !o.code)
    throw p(ms);
  return o;
}
function qs(o, e) {
  if (!o.state || !e)
    throw o.state ? p(Wn, "Cached State") : p(Wn, "Server State");
  let t, n;
  try {
    t = decodeURIComponent(o.state);
  } catch {
    throw p(rt, o.state);
  }
  try {
    n = decodeURIComponent(e);
  } catch {
    throw p(rt, o.state);
  }
  if (t !== n)
    throw p(as);
  if (o.error || o.error_description || o.suberror) {
    const r = od(o);
    throw Fs(o.error, o.error_description, o.suberror) ? new ee(o.error || "", o.error_description, o.suberror, o.timestamp || "", o.trace_id || "", o.correlation_id || "", o.claims || "", r) : new ke(o.error || "", o.error_description, o.suberror, r);
  }
}
function od(o) {
  var n, r;
  const e = "code=", t = (n = o.error_uri) == null ? void 0 : n.lastIndexOf(e);
  return t && t >= 0 ? (r = o.error_uri) == null ? void 0 : r.substring(t + e.length) : void 0;
}
function id(o) {
  var e;
  return ((e = o.idTokenClaims) == null ? void 0 : e.sid) || null;
}
function sd(o) {
  var e;
  return o.loginHint || ((e = o.idTokenClaims) == null ? void 0 : e.login_hint) || null;
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Rg {
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
      throw v(Jn);
    }
    const t = this.headers[K.WWWAuthenticate];
    if (t) {
      const n = this.parseChallenges(t);
      if (n.nonce)
        return n.nonce;
      throw v(Jn);
    }
    throw v(Xi);
  }
  /**
   * Parses an HTTP header's challenge set into a key/value map.
   * @param header
   * @returns
   */
  parseChallenges(e) {
    const t = e.indexOf(" "), n = e.substr(t + 1).split(","), r = {};
    return n.forEach((i) => {
      const [s, a] = i.split("=");
      r[s] = unescape(a.replace(/['"]+/g, ""));
    }), r;
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const en = "unexpected_error", ad = "post_request_failed", Og = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  postRequestFailed: ad,
  unexpectedError: en
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-common v16.0.2 2026-01-17 */
const hi = ",", Xs = "|";
function cd(o) {
  const { skus: e, libraryName: t, libraryVersion: n, extensionName: r, extensionVersion: i } = o, s = /* @__PURE__ */ new Map([
    [0, [t, n]],
    [2, [r, i]]
  ]);
  let a = [];
  if (e != null && e.length) {
    if (a = e.split(hi), a.length < 4)
      return e;
  } else
    a = Array.from({ length: 4 }, () => Xs);
  return s.forEach((c, h) => {
    var l, d;
    c.length === 2 && ((l = c[0]) != null && l.length) && ((d = c[1]) != null && d.length) && hd({
      skuArr: a,
      index: h,
      skuName: c[0],
      skuVersion: c[1]
    });
  }), a.join(hi);
}
function hd(o) {
  const { skuArr: e, index: t, skuName: n, skuVersion: r } = o;
  t >= e.length || (e[t] = [n, r].join(Xs));
}
class wt {
  constructor(e, t) {
    this.cacheOutcome = He.NOT_APPLICABLE, this.cacheManager = t, this.apiId = e.apiId, this.correlationId = e.correlationId, this.wrapperSKU = e.wrapperSKU || "", this.wrapperVer = e.wrapperVer || "", this.telemetryCacheKey = Di + xi + e.clientId;
  }
  /**
   * API to add MSER Telemetry to request
   */
  generateCurrentRequestHeaderValue() {
    const e = `${this.apiId}${Je}${this.cacheOutcome}`, t = [this.wrapperSKU, this.wrapperVer], n = this.getNativeBrokerErrorCode();
    n != null && n.length && t.push(`broker_error=${n}`);
    const r = t.join(Je), i = this.getRegionDiscoveryFields(), s = [
      e,
      i
    ].join(Je);
    return [
      Vo,
      s,
      r
    ].join($o);
  }
  /**
   * API to add MSER Telemetry for the last failed request
   */
  generateLastRequestHeaderValue() {
    const e = this.getLastRequests(), t = wt.maxErrorsToSend(e), n = e.failedRequests.slice(0, 2 * t).join(Je), r = e.errors.slice(0, t).join(Je), i = e.errors.length, s = t < i ? Fc : Bc, a = [i, s].join(Je);
    return [
      Vo,
      e.cacheHits,
      n,
      r,
      a
    ].join($o);
  }
  /**
   * API to cache token failures for MSER data capture
   * @param error
   */
  cacheFailedRequest(e) {
    const t = this.getLastRequests();
    t.errors.length >= Kc && (t.failedRequests.shift(), t.failedRequests.shift(), t.errors.shift()), t.failedRequests.push(this.apiId, this.correlationId), e instanceof Error && e && e.toString() ? e instanceof A ? e.subError ? t.errors.push(e.subError) : e.errorCode ? t.errors.push(e.errorCode) : t.errors.push(e.toString()) : t.errors.push(e.toString()) : t.errors.push(zc), this.cacheManager.setServerTelemetry(this.telemetryCacheKey, t, this.correlationId);
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
    const e = this.getLastRequests(), t = wt.maxErrorsToSend(e), n = e.errors.length;
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
    const i = e.errors.length;
    for (t = 0; t < i; t++) {
      const s = e.failedRequests[2 * t] || "", a = e.failedRequests[2 * t + 1] || "", c = e.errors[t] || "";
      if (r += s.toString().length + a.toString().length + c.length + 3, r < Hc)
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
    return cd(e);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
class qr extends A {
  constructor(e, t) {
    super(e, t), this.name = "JoseHeaderError", Object.setPrototypeOf(this, qr.prototype);
  }
}
function li(o) {
  return new qr(o);
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
const ld = "missing_kid_error", dd = "missing_alg_error";
/*! @azure/msal-common v16.0.2 2026-01-17 */
class Xr {
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
      throw li(ld);
    if (!e.alg)
      throw li(dd);
    const t = new Xr({
      // Access Token PoP headers must have type pop, but the type header can be overriden for special cases
      typ: e.typ || Hi.Pop,
      kid: e.kid,
      alg: e.alg
    });
    return JSON.stringify(t);
  }
}
/*! @azure/msal-common v16.0.2 2026-01-17 */
function ud(o, e) {
  e && e.push({
    name: o.name
  });
}
function gd(o, e, t) {
  if (!(e != null && e.length))
    return;
  const n = (g) => g.length ? g[g.length - 1] : void 0, r = o.name, i = n(e);
  if ((i == null ? void 0 : i.name) !== r)
    return;
  const s = e == null ? void 0 : e.pop();
  if (!s)
    return;
  const a = t instanceof A ? t.errorCode : t instanceof Error ? t.name : void 0, c = t instanceof A ? t.subError : void 0;
  a && s.childErr !== a && (s.err = a, c && (s.subErr = c)), delete s.name, delete s.childErr;
  const h = {
    ...s,
    dur: o.durationMs
  };
  o.success || (h.fail = 1);
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
function fd(o, e, t, n = 5) {
  var r, i;
  if (o instanceof Error) {
    if (o instanceof A) {
      t.errorCode = o.errorCode, t.subErrorCode = o.subError, (o instanceof ke || o instanceof ee) && (t.serverErrorNo = o.errorNo);
      return;
    } else if (o instanceof Fe) {
      t.errorCode = o.errorCode;
      return;
    } else if ((r = t.errorStack) != null && r.length) {
      e.trace("0lmqrh", t.correlationId);
      return;
    } else if (!((i = o.stack) != null && i.length)) {
      e.trace("1cnpwa", t.correlationId);
      return;
    }
  } else {
    e.trace("0gcyox", t.correlationId);
    return;
  }
  o.stack && (t.errorStack = pd(o.stack, n)), t.errorName = o.name;
}
function pd(o, e) {
  if (e < 0)
    return [];
  const t = o.split(`
`) || [], n = [], r = t[0];
  r.startsWith("TypeError: Cannot read property") || r.startsWith("TypeError: Cannot read properties of") || r.startsWith("TypeError: Cannot set property") || r.startsWith("TypeError: Cannot set properties of") || r.endsWith("is not a function") ? n.push(Ln(r)) : (r.startsWith("SyntaxError") || r.startsWith("TypeError")) && n.push(Ln(
    // Example: SyntaxError: Unexpected token 'e', "test" is not valid JSON -> SyntaxError: Unexpected token <redacted>, <redacted> is not valid JSON
    r.replace(/['].*[']|["].*["]/g, "<redacted>")
  ));
  for (let i = 1; i < t.length && !(n.length >= e); i++) {
    const s = t[i];
    n.push(Ln(s));
  }
  return n;
}
function Ln(o) {
  const e = o.lastIndexOf(" ") + 1;
  if (e < 1)
    return o;
  const t = o.substring(e);
  let n = t.lastIndexOf("/");
  return n = n < 0 ? t.lastIndexOf("\\") : n, n >= 0 ? (o.substring(0, e) + "(" + t.substring(n + 1) + (t.charAt(t.length - 1) === ")" ? "" : ")")).trimStart() : o.trimStart();
}
function md(o) {
  const e = o == null ? void 0 : o.idTokenClaims;
  if (e != null && e.tfp || e != null && e.acr)
    return "B2C";
  if (e != null && e.tid) {
    if ((e == null ? void 0 : e.tid) === "9188040d-6c67-4c5b-b112-36a304b66dad")
      return "MSA";
  } else return;
  return "AAD";
}
class yd {
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
  constructor(e, t, n, r, i, s, a) {
    this.authority = t, this.libraryName = r, this.libraryVersion = i, this.applicationTelemetry = s, this.clientId = e, this.logger = n, this.callbacks = /* @__PURE__ */ new Map(), this.eventsByCorrelationId = /* @__PURE__ */ new Map(), this.eventStack = /* @__PURE__ */ new Map(), this.intFields = a || /* @__PURE__ */ new Set();
    for (const c of hl)
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
    var i, s;
    const n = t || this.generateId(), r = {
      eventId: this.generateId(),
      status: er.InProgress,
      authority: this.authority,
      libraryName: this.libraryName,
      libraryVersion: this.libraryVersion,
      clientId: this.clientId,
      name: e,
      startTimeMs: Date.now(),
      correlationId: n,
      appName: (i = this.applicationTelemetry) == null ? void 0 : i.appName,
      appVersion: (s = this.applicationTelemetry) == null ? void 0 : s.appVersion
    };
    return this.cacheEventByCorrelationId(r), ud(r, this.eventStack.get(n)), {
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
    const i = e.eventId === r.eventId;
    e.durationMs = Math.round(e.durationMs || this.getDurationMs(e.startTimeMs));
    const s = JSON.stringify(gd(e, this.eventStack.get(r.correlationId), t));
    if (i ? this.discardMeasurements(r.correlationId) : (d = r.incompleteSubMeasurements) == null || d.delete(e.eventId), t && fd(t, this.logger, r), !i)
      return r[e.name + "DurationMs"] = Math.floor(e.durationMs), { ...r };
    i && !t && (r.errorCode || r.subErrorCode) && (this.logger.trace("1fm1tm", e.correlationId), r.errorCode = void 0, r.subErrorCode = void 0);
    let a = { ...r, ...e }, c = 0;
    (g = a.incompleteSubMeasurements) == null || g.forEach((f) => {
      this.logger.trace("0nxk52", a.correlationId), c++;
    }), a.incompleteSubMeasurements = void 0;
    const l = qh(e.correlationId).map((f) => `${f.milliseconds},${f.hash}`).join(";");
    return a = {
      ...a,
      status: er.Completed,
      incompleteSubsCount: c,
      context: s,
      logs: l
    }, n && (a.accountType = md(n), a.dataBoundary = n.dataBoundary), this.truncateIntegralFields(a), this.emitEvents([a], e.correlationId), a;
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
function An(o) {
  return `See https://aka.ms/msal.js.errors#${o} for details`;
}
class Ot extends A {
  constructor(e, t) {
    super(e, An(e), t), Object.setPrototypeOf(this, Ot.prototype), this.name = "BrowserAuthError";
  }
}
function m(o, e) {
  return new Ot(o, e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const q = {
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
}, re = {
  CHANNEL_ID: "53ee284d-920a-4b59-9d30-a60315b26836",
  PREFERRED_EXTENSION_ID: "ppnbnpeolgkicgegkbkbjmhlideopiji",
  MATS_TELEMETRY: "MATS",
  MICROSOFT_ENTRA_BROKERID: "MicrosoftEntra",
  DOM_API_NAME: "DOM API",
  PLATFORM_DOM_APIS: "get-token-and-sign-out",
  PLATFORM_DOM_PROVIDER: "PlatformAuthDOMHandler",
  PLATFORM_EXTENSION_PROVIDER: "PlatformAuthExtensionHandler"
}, ht = {
  HandshakeRequest: "Handshake",
  HandshakeResponse: "HandshakeResponse",
  GetToken: "GetToken",
  Response: "Response"
}, Z = {
  LocalStorage: "localStorage",
  SessionStorage: "sessionStorage",
  MemoryStorage: "memoryStorage"
}, di = {
  GET: "GET",
  POST: "POST"
}, Pe = {
  SIGNIN: "signin",
  SIGNOUT: "signout"
}, M = {
  ORIGIN_URI: "request.origin",
  URL_HASH: "urlHash",
  REQUEST_PARAMS: "request.params",
  VERIFIER: "code.verifier",
  INTERACTION_STATUS_KEY: "interaction.status",
  NATIVE_REQUEST: "request.native"
}, xt = {
  WRAPPER_SKU: "wrapper.sku",
  WRAPPER_VER: "wrapper.version"
}, _ = {
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
(function(o) {
  o.Redirect = "redirect", o.Popup = "popup", o.Silent = "silent", o.None = "none";
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
}, tr = {
  scopes: Se
}, Zs = "jwk", Pg = {
  React: "@azure/msal-react",
  Angular: "@azure/msal-angular"
}, nr = "msal.db", Cd = 1, wd = `${nr}.keys`, U = {
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
}, Id = [
  U.Default,
  U.Skip,
  U.RefreshTokenAndNetwork
];
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Dt(o) {
  return encodeURIComponent(It(o).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"));
}
function Le(o) {
  return ea(o).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function It(o) {
  return ea(new TextEncoder().encode(o));
}
function ea(o) {
  const e = Array.from(o, (t) => String.fromCodePoint(t)).join("");
  return btoa(e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Zr = "pkce_not_created", eo = "ear_jwk_empty", ta = "ear_jwe_empty", rr = "crypto_nonexistent", En = "empty_navigate_uri", na = "hash_empty_error", Sn = "no_state_in_hash", ra = "hash_does_not_contain_known_properties", to = "unable_to_parse_state", oa = "state_interaction_type_mismatch", ia = "interaction_in_progress", sa = "interaction_in_progress_cancelled", aa = "popup_window_error", ca = "empty_window_error", tn = "user_cancelled", ha = "redirect_bridge_empty_response", la = "redirect_in_iframe", da = "block_iframe_reload", ua = "block_nested_popups", Td = "iframe_closed_prematurely", kn = "silent_logout_unsupported", ga = "no_account_error", Ad = "silent_prompt_value_error", fa = "no_token_request_cache_error", pa = "unable_to_parse_token_request_cache_error", Ed = "auth_request_not_set_error", Sd = "invalid_cache_type", no = "non_browser_environment", Qe = "database_not_open", nn = "no_network_connectivity", ma = "post_request_failed", ya = "get_request_failed", or = "failed_to_parse_response", Ca = "unable_to_load_token", ro = "crypto_key_not_found", wa = "auth_code_required", Ia = "auth_code_or_nativeAccountId_required", Ta = "spa_code_and_nativeAccountId_present", oo = "database_unavailable", Aa = "unable_to_acquire_token_from_native_platform", Ea = "native_handshake_timeout", Sa = "native_extension_not_installed", io = "native_connection_not_established", gt = "uninitialized_public_client_application", ka = "native_prompt_not_supported", _a = "invalid_base64_string", va = "invalid_pop_token_request", ba = "failed_to_build_headers", Ra = "failed_to_parse_headers", Ht = "failed_to_decrypt_ear_response", Tt = "timed_out", Oa = "empty_response", Ng = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authCodeOrNativeAccountIdRequired: Ia,
  authCodeRequired: wa,
  authRequestNotSetError: Ed,
  blockIframeReload: da,
  blockNestedPopups: ua,
  cryptoKeyNotFound: ro,
  cryptoNonExistent: rr,
  databaseNotOpen: Qe,
  databaseUnavailable: oo,
  earJweEmpty: ta,
  earJwkEmpty: eo,
  emptyNavigateUri: En,
  emptyResponse: Oa,
  emptyWindowError: ca,
  failedToBuildHeaders: ba,
  failedToDecryptEarResponse: Ht,
  failedToParseHeaders: Ra,
  failedToParseResponse: or,
  getRequestFailed: ya,
  hashDoesNotContainKnownProperties: ra,
  hashEmptyError: na,
  iframeClosedPrematurely: Td,
  interactionInProgress: ia,
  interactionInProgressCancelled: sa,
  invalidBase64String: _a,
  invalidCacheType: Sd,
  invalidPopTokenRequest: va,
  nativeConnectionNotEstablished: io,
  nativeExtensionNotInstalled: Sa,
  nativeHandshakeTimeout: Ea,
  nativePromptNotSupported: ka,
  noAccountError: ga,
  noNetworkConnectivity: nn,
  noStateInHash: Sn,
  noTokenRequestCacheError: fa,
  nonBrowserEnvironment: no,
  pkceNotCreated: Zr,
  popupWindowError: aa,
  postRequestFailed: ma,
  redirectBridgeEmptyResponse: ha,
  redirectInIframe: la,
  silentLogoutUnsupported: kn,
  silentPromptValueError: Ad,
  spaCodeAndNativeAccountIdPresent: Ta,
  stateInteractionTypeMismatch: oa,
  timedOut: Tt,
  unableToAcquireTokenFromNativePlatform: Aa,
  unableToLoadToken: Ca,
  unableToParseState: to,
  unableToParseTokenRequestCacheError: pa,
  uninitializedPublicClientApplication: gt,
  userCancelled: tn
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function j(o) {
  return new TextDecoder().decode(xe(o));
}
function xe(o) {
  let e = o.replace(/-/g, "+").replace(/_/g, "/");
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
      throw m(_a);
  }
  const t = atob(e);
  return Uint8Array.from(t, (n) => n.codePointAt(0) || 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const kd = "RSASSA-PKCS1-v1_5", st = "AES-GCM", Pa = "HKDF", so = "SHA-256", _d = 2048, vd = new Uint8Array([1, 0, 1]), ui = "0123456789abcdef", gi = new Uint32Array(1), ao = "raw", Na = "encrypt", co = "decrypt", bd = "deriveKey", Rd = "crypto_subtle_undefined", ho = {
  name: kd,
  hash: so,
  modulusLength: _d,
  publicExponent: vd
};
function Od(o) {
  if (!window)
    throw m(no);
  if (!window.crypto)
    throw m(rr);
  if (!o && !window.crypto.subtle)
    throw m(rr, Rd);
}
async function Ma(o) {
  const t = new TextEncoder().encode(o);
  return window.crypto.subtle.digest(so, t);
}
function Pd(o) {
  return window.crypto.getRandomValues(o);
}
function Hn() {
  return window.crypto.getRandomValues(gi), gi[0];
}
function O() {
  const o = Date.now(), e = Hn() * 1024 + (Hn() & 1023), t = new Uint8Array(16), n = Math.trunc(e / 2 ** 30), r = e & 2 ** 30 - 1, i = Hn();
  t[0] = o / 2 ** 40, t[1] = o / 2 ** 32, t[2] = o / 2 ** 24, t[3] = o / 2 ** 16, t[4] = o / 2 ** 8, t[5] = o, t[6] = 112 | n >>> 8, t[7] = n, t[8] = 128 | r >>> 24, t[9] = r >>> 16, t[10] = r >>> 8, t[11] = r, t[12] = i >>> 24, t[13] = i >>> 16, t[14] = i >>> 8, t[15] = i;
  let s = "";
  for (let a = 0; a < t.length; a++)
    s += ui.charAt(t[a] >>> 4), s += ui.charAt(t[a] & 15), (a === 3 || a === 5 || a === 7 || a === 9) && (s += "-");
  return s;
}
async function Nd(o, e) {
  return window.crypto.subtle.generateKey(ho, o, e);
}
async function Kn(o) {
  return window.crypto.subtle.exportKey(Zs, o);
}
async function Md(o, e, t) {
  return window.crypto.subtle.importKey(Zs, o, ho, e, t);
}
async function Ud(o, e) {
  return window.crypto.subtle.sign(ho, o, e);
}
async function lo() {
  const o = await Ua(), t = {
    alg: "dir",
    kty: "oct",
    k: Le(new Uint8Array(o))
  };
  return It(JSON.stringify(t));
}
async function xd(o) {
  const e = j(o), n = JSON.parse(e).k, r = xe(n);
  return window.crypto.subtle.importKey(ao, r, st, !1, [
    co
  ]);
}
async function Dd(o, e) {
  const t = e.split(".");
  if (t.length !== 5)
    throw m(Ht, "jwe_length");
  const n = await xd(o).catch(() => {
    throw m(Ht, "import_key");
  });
  try {
    const r = new TextEncoder().encode(t[0]), i = xe(t[2]), s = xe(t[3]), a = xe(t[4]), c = a.byteLength * 8, h = new Uint8Array(s.length + a.length);
    h.set(s), h.set(a, s.length);
    const l = await window.crypto.subtle.decrypt({
      name: st,
      iv: i,
      tagLength: c,
      additionalData: r
    }, n, h);
    return new TextDecoder().decode(l);
  } catch {
    throw m(Ht, "decrypt");
  }
}
async function Ua() {
  const o = await window.crypto.subtle.generateKey({
    name: st,
    length: 256
  }, !0, [Na, co]);
  return window.crypto.subtle.exportKey(ao, o);
}
async function fi(o) {
  return window.crypto.subtle.importKey(ao, o, Pa, !1, [
    bd
  ]);
}
async function xa(o, e, t) {
  return window.crypto.subtle.deriveKey({
    name: Pa,
    salt: e,
    hash: so,
    info: new TextEncoder().encode(t)
  }, o, { name: st, length: 256 }, !1, [Na, co]);
}
async function Ld(o, e, t) {
  const n = new TextEncoder().encode(e), r = window.crypto.getRandomValues(new Uint8Array(16)), i = await xa(o, r, t), s = await window.crypto.subtle.encrypt({
    name: st,
    iv: new Uint8Array(12)
    // New key is derived for every encrypt so we don't need a new nonce
  }, i, n);
  return {
    data: Le(new Uint8Array(s)),
    nonce: Le(r)
  };
}
async function pi(o, e, t, n) {
  const r = xe(n), i = await xa(o, xe(e), t), s = await window.crypto.subtle.decrypt({
    name: st,
    iv: new Uint8Array(12)
    // New key is derived for every encrypt so we don't need a new nonce
  }, i, r);
  return new TextDecoder().decode(s);
}
async function Hd(o) {
  const e = await Ma(o), t = new Uint8Array(e);
  return Le(t);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class uo extends A {
  constructor(e, t) {
    super(e, t), this.name = "BrowserConfigurationAuthError", Object.setPrototypeOf(this, uo.prototype);
  }
}
function D(o) {
  return new uo(o, An(o));
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const go = "storage_not_supported", F = "stubbed_public_client_application_called", Da = "in_mem_redirect_unavailable", Mg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  inMemRedirectUnavailable: Da,
  storageNotSupported: go,
  stubbedPublicClientApplicationCalled: F
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function La() {
  const o = window.location.hash, e = window.location.search;
  let t = !1, n = !1, r = "", i;
  if (o && o.length > 1) {
    const l = o.charAt(0) === "#" ? o.substring(1) : o, d = new URLSearchParams(l);
    d.has("state") && (t = !0, r = l, i = d);
  }
  if (e && e.length > 1) {
    const l = e.charAt(0) === "?" ? e.substring(1) : e, d = new URLSearchParams(l);
    d.has("state") && (n = !0, r = l, i = d);
  }
  if (t && n) {
    const l = e.charAt(0) === "?" ? e.substring(1) : e, d = o.charAt(0) === "#" ? o.substring(1) : o;
    r = `${l}${d}`, i = new URLSearchParams(r);
  }
  if (!r || !i)
    throw m(Oa);
  const s = i.get("state");
  if (!s)
    throw m(Sn);
  const { libraryState: a } = bt(j, s), { id: c, meta: h } = a;
  if (!c || !h)
    throw m(to, "missing_library_state");
  return {
    params: i,
    payload: r,
    urlHash: o,
    urlQuery: e,
    hasResponseInHash: t,
    hasResponseInQuery: n,
    libraryState: {
      id: c,
      meta: h
    }
  };
}
function fo(o) {
  o.location.hash = "", typeof o.history.replaceState == "function" && o.history.replaceState(null, "", `${o.location.origin}${o.location.pathname}${o.location.search}`);
}
function Ha(o) {
  const e = o.split("#");
  e.shift(), window.location.hash = e.length > 0 ? e.join("#") : "";
}
function Pt() {
  return window.parent !== window;
}
function Ka() {
  if (Pt())
    return !1;
  try {
    const { libraryState: o } = La(), { meta: e } = o;
    return e.interactionType === C.Popup;
  } catch {
    return !1;
  }
}
let Ne = null;
function Fa(o, e) {
  Ne && (o.verbose("18y01k", e), clearTimeout(Ne.timeoutId), Ne.channel.close(), Ne.reject(m(sa)), Ne = null);
}
async function Ke(o, e, t, n) {
  return new Promise((r, i) => {
    e.verbose("1rf6em", n.correlationId);
    const { libraryState: s } = bt(t.base64Decode, n.state || ""), a = new BroadcastChannel(s.id);
    let c;
    const h = window.setTimeout(() => {
      Ne = null, a.close(), i(m(Tt, "redirect_bridge_timeout"));
    }, o);
    Ne = {
      timeoutId: h,
      channel: a,
      reject: i
    }, a.onmessage = (l) => {
      c = l.data.payload, Ne = null, clearTimeout(h), a.close(), c ? r(c) : i(m(ha));
    };
  });
}
function Te() {
  return typeof window < "u" && window.location ? window.location.href.split("?")[0].split("#")[0] : "";
}
function Ba() {
  const e = new k(window.location.href).getUrlComponents();
  return `${e.Protocol}//${e.HostNameAndPort}/`;
}
function za() {
  if (Qt(window.location.hash) && Pt())
    throw m(da);
}
function ja(o) {
  if (Pt() && !o)
    throw m(la);
}
function Ga() {
  if (Ka())
    throw m(ua);
}
function _n() {
  if (typeof window > "u")
    throw m(no);
}
function po(o) {
  if (!o)
    throw m(gt);
}
function vn(o) {
  _n(), za(), Ga(), po(o);
}
function ir(o, e) {
  if (vn(o), ja(e.system.allowRedirectInIframe), e.cache.cacheLocation === Z.MemoryStorage)
    throw D(Da);
}
function mo(o) {
  const e = document.createElement("link");
  e.rel = "preconnect", e.href = new URL(o).origin, e.crossOrigin = "anonymous", document.head.appendChild(e), window.setTimeout(() => {
    try {
      document.head.removeChild(e);
    } catch {
    }
  }, 1e4);
}
function rn() {
  return O();
}
const Kd = xr, Ug = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClientCapabilitiesToClaims: Kd,
  blockAPICallsBeforeInitialize: po,
  blockAcquireTokenInPopups: Ga,
  blockNonBrowserEnvironment: _n,
  blockRedirectInIframe: ja,
  blockReloadInHiddenIframes: za,
  cancelPendingBridgeResponse: Fa,
  clearHash: fo,
  createGuid: rn,
  getCurrentUri: Te,
  getHomepage: Ba,
  invoke: ie,
  invokeAsync: u,
  isInIframe: Pt,
  isInPopup: Ka,
  parseAuthResponseFromUrl: La,
  preconnect: mo,
  preflightCheck: vn,
  redirectPreflightCheck: ir,
  replaceHash: Ha,
  waitForBridgeResponse: Ke
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Fd = "acquireTokenFromCache", Bd = "acquireTokenByRefreshToken", zd = "acquireTokenSilentAsync", jd = "cryptoOptsGetPublicKeyThumbprint", Gd = "cryptoOptsSignJwt", Vd = "silentCacheClientAcquireToken", $d = "silentIframeClientAcquireToken", Jd = "awaitConcurrentIframe", Wd = "silentRefreshClientAcquireToken", Be = "standardInteractionClientGetDiscoveredAuthority", Va = "nativeInteractionClientAcquireToken", Qd = "refreshTokenClientAcquireTokenByRefreshToken", mi = "acquireTokenBySilentIframe", yo = "initializeBaseRequest", Yd = "initializeSilentRequest", qd = "initializeCache", yi = "silentIframeClientTokenHelper", Fn = "silentHandlerInitiateAuthRequest", on = "silentHandlerMonitorIframeForHash", Xd = "silentHandlerLoadFrameSync", De = "standardInteractionClientCreateAuthCodeClient", bn = "standardInteractionClientGetClientConfiguration", Rn = "standardInteractionClientInitializeAuthorizationRequest", Zd = "silentFlowClientAcquireCachedToken", eu = "getStandardParams", tu = "handleCodeResponse", Co = "handleResponseEar", $a = "handleResponsePlatformBroker", Ze = "handleResponseCode", nu = "authClientAcquireToken", ft = "deserializeResponse", ru = "authorityFactoryCreateDiscoveredInstance", ou = "acquireTokenByCodeAsync", iu = "handleRedirectPromise", su = "handleNativeRedirectPromise", au = "nativeMessageHandlerHandshake", cu = "importExistingCache", Ve = "generatePkceCodes", hu = "generateCodeVerifier", lu = "generateCodeChallengeFromVerifier", du = "sha256Digest", uu = "getRandomValues", Ci = "generateHKDF", gu = "generateBaseKey", fu = "base64Decode", pu = "urlEncodeArr", mu = "encrypt", wi = "decrypt", wo = "generateEarKey", yu = "decryptEarResponse", Cu = "loadAccount", wu = "loadIdToken", Iu = "loadAccessToken", Tu = "loadRefreshToken";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Au {
  constructor() {
    this.dbName = nr, this.version = Cd, this.tableName = wd, this.dbOpen = !1;
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
        const i = r;
        this.db = i.target.result, this.dbOpen = !0, e();
      }), n.addEventListener("error", () => t(m(oo)));
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
        return n(m(Qe));
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
        return r(m(Qe));
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
        return n(m(Qe));
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
        return t(m(Qe));
      const i = this.db.transaction([this.tableName], "readonly").objectStore(this.tableName).getAllKeys();
      i.addEventListener("success", (s) => {
        const a = s;
        this.closeConnection(), e(a.target.result);
      }), i.addEventListener("error", (s) => {
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
        return n(m(Qe));
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
      const n = window.indexedDB.deleteDatabase(nr), r = setTimeout(() => t(!1), 200);
      n.addEventListener("success", () => (clearTimeout(r), e(!0))), n.addEventListener("blocked", () => (clearTimeout(r), e(!0))), n.addEventListener("error", () => (clearTimeout(r), t(!1)));
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class On {
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
class Eu {
  constructor(e) {
    this.inMemoryCache = new On(), this.indexedDBCache = new Au(), this.logger = e;
  }
  handleDatabaseAccessError(e, t) {
    if (e instanceof Ot && e.errorCode === oo)
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
class se {
  constructor(e, t, n) {
    this.logger = e, Od(n ?? !1), this.cache = new Eu(this.logger), this.performanceClient = t;
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
    return It(e);
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
    return Dt(e);
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
    const t = (l = this.performanceClient) == null ? void 0 : l.startMeasurement(jd, e.correlationId), n = await Nd(se.EXTRACTABLE, se.POP_KEY_USAGES), r = await Kn(n.publicKey), i = {
      e: r.e,
      kty: r.kty,
      n: r.n
    }, s = Ii(i), a = await this.hashString(s), c = await Kn(n.privateKey), h = await Md(c, !1, ["sign"]);
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
      throw p(ys);
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
    const i = (N = this.performanceClient) == null ? void 0 : N.startMeasurement(Gd, r), s = await this.cache.getItem(t, r || "");
    if (!s)
      throw m(ro);
    const a = await Kn(s.publicKey), c = Ii(a), h = Dt(JSON.stringify({ kid: t })), l = Xr.getShrHeaderString({
      ...n == null ? void 0 : n.header,
      alg: a.alg,
      kid: h
    }), d = Dt(l);
    e.cnf = {
      jwk: JSON.parse(c)
    };
    const g = Dt(JSON.stringify(e)), f = `${d}.${g}`, I = new TextEncoder().encode(f), E = await Ud(s.privateKey, I), P = Le(new Uint8Array(E)), b = `${f}.${P}`;
    return i && i.end({
      success: !0
    }), b;
  }
  /**
   * Returns the SHA-256 hash of an input string
   * @param plainText
   */
  async hashString(e) {
    return Hd(e);
  }
}
se.POP_KEY_USAGES = ["sign", "verify"];
se.EXTRACTABLE = !0;
function Ii(o) {
  return JSON.stringify(o, Object.keys(o).sort());
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Io = "acquireTokenSilent", Ja = "acquireTokenByCode", To = "acquireTokenPopup", Wa = "acquireTokenPreRedirect", Kt = "acquireTokenRedirect", Ao = "ssoSilent", Qa = "initializeClientApplication", Ya = "localStorageUpdated", qa = "loadExternalTokens", xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AcquireTokenByCode: Ja,
  AcquireTokenPopup: To,
  AcquireTokenPreRedirect: Wa,
  AcquireTokenRedirect: Kt,
  AcquireTokenSilent: Io,
  InitializeClientApplication: Qa,
  LoadExternalTokens: qa,
  LocalStorageUpdated: Ya,
  SsoSilent: Ao
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const L = "msal", Pn = "browser", Ti = "|", B = 2, Ft = 2, Su = `${L}.${Pn}.log.level`, ku = `${L}.${Pn}.log.pii`, _u = `${L}.${Pn}.performance.enabled`, vu = `${L}.${Pn}.platform.auth.dom`, Ai = `${L}.version`, Ei = "account.keys", Si = "token.keys";
function et(o = Ft) {
  return o < 1 ? `${L}.${Ei}` : `${L}.${o}.${Ei}`;
}
function tt(o, e = B) {
  return e < 1 ? `${L}.${Si}.${o}` : `${L}.${e}.${Si}.${o}`;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const bu = 1440 * 60 * 1e3, sr = {
  Lax: "Lax",
  None: "None"
};
class Xa {
  initialize() {
    return Promise.resolve();
  }
  getItem(e) {
    const t = `${encodeURIComponent(e)}`, n = document.cookie.split(";");
    for (let r = 0; r < n.length; r++) {
      const i = n[r], [s, ...a] = decodeURIComponent(i).trim().split("="), c = a.join("=");
      if (s === t)
        return c;
    }
    return "";
  }
  getUserData() {
    throw p(T);
  }
  setItem(e, t, n, r = !0, i = sr.Lax) {
    let s = `${encodeURIComponent(e)}=${encodeURIComponent(t)};path=/;SameSite=${i};`;
    if (n) {
      const a = Ru(n);
      s += `expires=${a};`;
    }
    (r || i === sr.None) && (s += "Secure;"), document.cookie = s;
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
function Ru(o) {
  const e = /* @__PURE__ */ new Date();
  return new Date(e.getTime() + o * bu).toUTCString();
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Re(o, e) {
  const t = o.getItem(et(e));
  return t ? JSON.parse(t) : [];
}
function he(o, e, t) {
  const n = e.getItem(tt(o, t));
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
function Bt(o) {
  return o.hasOwnProperty("id") && o.hasOwnProperty("nonce") && o.hasOwnProperty("data");
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const ki = "msal.cache.encryption", Ou = "msal.broadcast.cache";
class Pu {
  constructor(e, t, n) {
    if (!window.localStorage)
      throw D(go);
    this.memoryStorage = new On(), this.initialized = !1, this.clientId = e, this.logger = t, this.performanceClient = n, this.broadcast = new BroadcastChannel(Ou);
  }
  async initialize(e) {
    const t = new Xa(), n = t.getItem(ki);
    let r = { key: "", id: "" };
    if (n)
      try {
        r = JSON.parse(n);
      } catch {
      }
    if (r.key && r.id) {
      const i = ie(xe, fu, this.logger, this.performanceClient, e)(r.key);
      this.encryptionCookie = {
        id: r.id,
        key: await u(fi, Ci, this.logger, this.performanceClient, e)(i)
      };
    } else {
      const i = O(), s = await u(Ua, gu, this.logger, this.performanceClient, e)(), a = ie(Le, pu, this.logger, this.performanceClient, e)(new Uint8Array(s));
      this.encryptionCookie = {
        id: i,
        key: await u(fi, Ci, this.logger, this.performanceClient, e)(s)
      };
      const c = {
        id: i,
        key: a
      };
      t.setItem(
        ki,
        JSON.stringify(c),
        0,
        // Expiration - 0 means cookie will be cleared at the end of the browser session
        !0,
        // Secure flag
        sr.None
        // SameSite must be None to support iframed apps
      );
    }
    await u(this.importExistingCache.bind(this), cu, this.logger, this.performanceClient, e)(e), this.broadcast.addEventListener("message", (i) => {
      this.updateCache(i, e);
    }), this.initialized = !0;
  }
  getItem(e) {
    return window.localStorage.getItem(e);
  }
  getUserData(e) {
    if (!this.initialized)
      throw m(gt);
    return this.memoryStorage.getItem(e);
  }
  async decryptData(e, t, n) {
    if (!this.initialized || !this.encryptionCookie)
      throw m(gt);
    if (t.id !== this.encryptionCookie.id)
      return this.performanceClient.incrementFields({ encryptedCacheExpiredCount: 1 }, n), null;
    const r = await u(pi, wi, this.logger, this.performanceClient, n)(this.encryptionCookie.key, t.nonce, this.getContext(e), t.data);
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
  async setUserData(e, t, n, r, i) {
    if (!this.initialized || !this.encryptionCookie)
      throw m(gt);
    if (i)
      this.setItem(e, t);
    else {
      const { data: s, nonce: a } = await u(Ld, mu, this.logger, this.performanceClient, n)(this.encryptionCookie.key, t, this.getContext(e)), c = {
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
    this.memoryStorage.clear(), Re(this).forEach((n) => this.removeItem(n));
    const t = he(this.clientId, this);
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
    let t = Re(this);
    t = await this.importArray(t, e), t.length ? this.setItem(et(), JSON.stringify(t)) : this.removeItem(et());
    const n = he(this.clientId, this);
    n.idToken = await this.importArray(n.idToken, e), n.accessToken = await this.importArray(n.accessToken, e), n.refreshToken = await this.importArray(n.refreshToken, e), n.idToken.length || n.accessToken.length || n.refreshToken.length ? this.setItem(tt(this.clientId), JSON.stringify(n)) : this.removeItem(tt(this.clientId));
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
    return Bt(r) ? r.id !== this.encryptionCookie.id ? (this.performanceClient.incrementFields({ encryptedCacheExpiredCount: 1 }, t), null) : (this.performanceClient.incrementFields({ encryptedCacheCount: 1 }, t), u(pi, wi, this.logger, this.performanceClient, t)(this.encryptionCookie.key, r.nonce, this.getContext(e), r.data)) : (this.performanceClient.incrementFields({ unencryptedCacheCount: 1 }, t), n);
  }
  /**
   * Helper to decrypt and save an array of cache keys
   * @param arr
   * @returns Array of keys successfully imported
   */
  async importArray(e, t) {
    const n = [], r = [];
    return e.forEach((i) => {
      const s = this.getItemFromEncryptedCache(i, t).then((a) => {
        a ? (this.memoryStorage.setItem(i, a), n.push(i)) : this.removeItem(i);
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
    const n = this.performanceClient.startMeasurement(Ya);
    n.add({ isBackground: !0 });
    const { key: r, value: i, context: s } = e.data;
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
    i ? (this.memoryStorage.setItem(r, i), this.logger.verbose("1vzsgt", t)) : (this.memoryStorage.removeItem(r), this.logger.verbose("04ypih", t)), n.end({ success: !0 });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Nu {
  constructor() {
    if (!window.sessionStorage)
      throw D(go);
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
const At = "@azure/msal-browser", ae = "5.0.2";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function be(o, e) {
  const t = o.indexOf(e);
  t > -1 && o.splice(t, 1);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Et extends Zn {
  constructor(e, t, n, r, i, s, a) {
    super(e, n, r, i, a), this.cacheConfig = t, this.logger = r, this.internalStorage = new On(), this.browserStorage = _i(e, t.cacheLocation, r, i), this.temporaryCacheStorage = _i(e, Z.SessionStorage, r, i), this.cookieStorage = new Xa(), this.eventHandler = s;
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
    let t = Re(this.browserStorage), n = he(this.clientId, this.browserStorage);
    this.performanceClient.addFields({
      preMigrateAcntCount: t.length,
      preMigrateATCount: n.accessToken.length,
      preMigrateITCount: n.idToken.length,
      preMigrateRTCount: n.refreshToken.length
    }, e);
    for (let i = 0; i < Ft; i++) {
      const s = i;
      await this.removeStaleAccounts(i, s, e);
    }
    for (let i = 0; i < B; i++) {
      const s = i;
      await this.migrateIdTokens(i, s, e);
    }
    const r = this.getKMSIValues();
    for (let i = 0; i < B; i++)
      await this.migrateAccessTokens(i, r, e), await this.migrateRefreshTokens(i, r, e);
    t = Re(this.browserStorage), n = he(this.clientId, this.browserStorage), this.performanceClient.addFields({
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
    else if (ni(r.lastUpdatedAt, this.cacheConfig.cacheRetentionDays))
      return this.browserStorage.removeItem(e), this.performanceClient.incrementFields({ expiredCacheRemovedCount: 1 }, t), null;
    const i = Bt(r) ? await this.browserStorage.decryptData(e, r, t) : r;
    return !i || !Cn(i) ? (this.performanceClient.incrementFields({ invalidCacheCount: 1 }, t), null) : (ii(i) || si(i)) && i.expiresOn && Ct(i.expiresOn, Ki) ? (this.browserStorage.removeItem(e), this.performanceClient.incrementFields({ expiredCacheRemovedCount: 1 }, t), null) : i;
  }
  /**
   * Remove accounts from the cache for older schema versions if they have not been updated in the last cacheRetentionDays
   * @param accountSchema
   * @param credentialSchema
   * @param correlationId
   * @returns
   */
  async removeStaleAccounts(e, t, n) {
    const r = Re(this.browserStorage, e);
    if (r.length !== 0) {
      for (const i of [...r]) {
        this.performanceClient.incrementFields({ oldAcntCount: 1 }, n);
        const s = this.browserStorage.getItem(i), a = this.validateAndParseJson(s || "");
        if (!a) {
          be(r, i);
          continue;
        }
        if (a.lastUpdatedAt)
          ni(a.lastUpdatedAt, this.cacheConfig.cacheRetentionDays) && (await this.removeAccountOldSchema(i, a, t, n), be(r, i));
        else {
          a.lastUpdatedAt = Date.now().toString(), this.setItem(i, JSON.stringify(a), n);
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
    const i = Bt(t) ? await this.browserStorage.decryptData(e, t, r) : t, s = i == null ? void 0 : i.homeAccountId;
    if (s) {
      const a = this.getTokenKeys(n);
      [...a.idToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), be(a.idToken, c);
      }), [...a.accessToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), be(a.accessToken, c);
      }), [...a.refreshToken].filter((c) => c.includes(s)).forEach((c) => {
        this.browserStorage.removeItem(c), be(a.refreshToken, c);
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
        const i = JSON.parse(r), s = oe(i.secret, j);
        s && (e[i.homeAccountId] = ue(s));
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
    const r = he(this.clientId, this.browserStorage, e);
    if (r.idToken.length === 0)
      return;
    const i = he(this.clientId, this.browserStorage, B), s = Re(this.browserStorage), a = Re(this.browserStorage, t);
    for (const c of [...r.idToken]) {
      this.performanceClient.incrementFields({ oldITCount: 1 }, n);
      const h = await this.updateOldEntry(c, n);
      if (!h) {
        be(r.idToken, c);
        continue;
      }
      const l = s.find((b) => b.includes(h.homeAccountId)), d = a.find((b) => b.includes(h.homeAccountId));
      let g = null;
      if (l)
        g = this.getAccount(l, n);
      else if (d) {
        const b = this.browserStorage.getItem(d), N = this.validateAndParseJson(b || "");
        g = N && Bt(N) ? await this.browserStorage.decryptData(d, N, n) : N;
      }
      if (!g) {
        this.performanceClient.incrementFields({ skipITMigrateCount: 1 }, n);
        continue;
      }
      const f = oe(h.secret, j), w = this.generateCredentialKey(h), I = this.getIdTokenCredential(w, n), E = Object.keys(f).includes("signin_state"), P = I && Object.keys(oe(I.secret, j) || {}).includes("signin_state");
      if (!I || h.lastUpdatedAt > I.lastUpdatedAt && (E || !P)) {
        const b = g.tenantProfiles || [], N = Fr(f) || g.realm;
        if (N && !b.find((ve) => ve.tenantId === N)) {
          const ve = _t(g.homeAccountId, g.localAccountId, N, f);
          b.push(ve);
        }
        g.tenantProfiles = b;
        const te = this.generateAccountKey(me(g)), _e = ue(f);
        await this.setUserData(te, JSON.stringify(g), n, g.lastUpdatedAt, _e), s.includes(te) || s.push(te), await this.setUserData(w, JSON.stringify(h), n, h.lastUpdatedAt, _e), this.performanceClient.incrementFields({ migratedITCount: 1 }, n), i.idToken.push(w);
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(i, n), this.setAccountKeys(s, n);
  }
  /**
   * Migrates access tokens from old cache schema to current schema
   * @param credentialSchema
   * @param kmsiMap
   * @param correlationId
   * @returns
   */
  async migrateAccessTokens(e, t, n) {
    const r = he(this.clientId, this.browserStorage, e);
    if (r.accessToken.length === 0)
      return;
    const i = he(this.clientId, this.browserStorage, B);
    for (const s of [...r.accessToken]) {
      this.performanceClient.incrementFields({ oldATCount: 1 }, n);
      const a = await this.updateOldEntry(s, n);
      if (!a) {
        be(r.accessToken, s);
        continue;
      }
      if (!(a.homeAccountId in t)) {
        this.performanceClient.incrementFields({ skipATMigrateCount: 1 }, n);
        continue;
      }
      const c = this.generateCredentialKey(a), h = t[a.homeAccountId];
      if (!i.accessToken.includes(c))
        await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedATCount: 1 }, n), i.accessToken.push(c);
      else {
        const l = this.getAccessTokenCredential(c, n);
        (!l || a.lastUpdatedAt > l.lastUpdatedAt) && (await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedATCount: 1 }, n));
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(i, n);
  }
  /**
   * Migrates refresh tokens from old cache schema to current schema
   * @param credentialSchema
   * @param kmsiMap
   * @param correlationId
   * @returns
   */
  async migrateRefreshTokens(e, t, n) {
    const r = he(this.clientId, this.browserStorage, e);
    if (r.refreshToken.length === 0)
      return;
    const i = he(this.clientId, this.browserStorage, B);
    for (const s of [
      ...r.refreshToken
    ]) {
      this.performanceClient.incrementFields({ oldRTCount: 1 }, n);
      const a = await this.updateOldEntry(s, n);
      if (!a) {
        be(r.refreshToken, s);
        continue;
      }
      if (!(a.homeAccountId in t)) {
        this.performanceClient.incrementFields({ skipRTMigrateCount: 1 }, n);
        continue;
      }
      const c = this.generateCredentialKey(a), h = t[a.homeAccountId];
      if (!i.refreshToken.includes(c))
        await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedRTCount: 1 }, n), i.refreshToken.push(c);
      else {
        const l = this.getRefreshTokenCredential(c, n);
        (!l || a.lastUpdatedAt > l.lastUpdatedAt) && (await this.setUserData(c, JSON.stringify(a), n, a.lastUpdatedAt, h), this.performanceClient.incrementFields({ migratedRTCount: 1 }, n));
      }
    }
    this.setTokenKeys(r, n, e), this.setTokenKeys(i, n);
  }
  /**
   * Tracks upgrades and downgrades for telemetry and debugging purposes
   */
  trackVersionChanges(e) {
    const t = this.browserStorage.getItem(Ai);
    t && (this.logger.info("1wuc87", e), this.performanceClient.addFields({ previousLibraryVersion: t }, e)), t !== ae && this.setItem(Ai, ae, e);
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
    const r = new Array(B + 1).fill(0), i = [], s = 20;
    for (let a = 0; a <= s; a++)
      try {
        if (this.browserStorage.setItem(e, t), a > 0)
          for (let c = 0; c <= B; c++) {
            const h = r.slice(0, c).reduce((d, g) => d + g, 0);
            if (h >= a)
              break;
            const l = a > h + r[c] ? h + r[c] : a;
            a > h && r[c] > 0 && this.removeAccessTokenKeys(i.slice(h, l), n, c);
          }
        break;
      } catch (c) {
        const h = Xn(c);
        if (h.errorCode === qn && a < s) {
          if (!i.length)
            for (let l = 0; l <= B; l++)
              if (e === tt(this.clientId, l)) {
                const d = JSON.parse(t).accessToken;
                i.push(...d), r[l] = d.length;
              } else {
                const d = this.getTokenKeys(l).accessToken;
                i.push(...d), r[l] = d.length;
              }
          if (i.length <= a)
            throw h;
          this.removeAccessToken(
            i[a],
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
  async setUserData(e, t, n, r, i) {
    const s = new Array(B + 1).fill(0), a = [], c = 20;
    for (let h = 0; h <= c; h++)
      try {
        if (await u(this.browserStorage.setUserData.bind(this.browserStorage), Hl, this.logger, this.performanceClient, n)(e, t, n, r, i), h > 0)
          for (let l = 0; l <= B; l++) {
            const d = s.slice(0, l).reduce((f, w) => f + w, 0);
            if (d >= h)
              break;
            const g = h > d + s[l] ? d + s[l] : h;
            h > d && s[l] > 0 && this.removeAccessTokenKeys(a.slice(d, g), n, l);
          }
        break;
      } catch (l) {
        const d = Xn(l);
        if (d.errorCode === qn && h < c) {
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
    return !r || !al(r) ? null : Zn.toObject({}, r);
  }
  /**
   * set account entity in the platform cache
   * @param account
   */
  async setAccount(e, t, n) {
    this.logger.trace("1bz3wr", t);
    const r = this.generateAccountKey(me(e)), i = Date.now().toString();
    e.lastUpdatedAt = i, await this.setUserData(r, JSON.stringify(e), t, i, n), this.addAccountKeyToMap(r, t), this.performanceClient.addFields({ kmsi: n }, t);
  }
  setAccountKeys(e, t, n = Ft) {
    e.length === 0 ? this.removeItem(et(n)) : this.setItem(et(n), JSON.stringify(e), t);
  }
  /**
   * Returns the array of account keys currently cached
   * @returns
   */
  getAccountKeys() {
    return Re(this.browserStorage);
  }
  /**
   * Add a new account to the key map
   * @param key
   */
  addAccountKeyToMap(e, t) {
    this.logger.trace("0rb85k", t), this.logger.tracePii("1l9bdo", t);
    const n = this.getAccountKeys();
    return n.indexOf(e) === -1 ? (n.push(e), this.setItem(et(), JSON.stringify(n), t), this.logger.verbose("0xia39", t), !0) : (this.logger.verbose("0161kk", t), !1);
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
    let i = 0;
    if (e.forEach((s) => {
      const a = r.accessToken.indexOf(s);
      a > -1 && (r.accessToken.splice(a, 1), i++);
    }), i > 0) {
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
    return he(this.clientId, this.browserStorage, e);
  }
  /**
   * Sets the token keys in the cache
   * @param tokenKeys
   * @param correlationId
   * @returns
   */
  setTokenKeys(e, t, n = B) {
    if (e.idToken.length === 0 && e.accessToken.length === 0 && e.refreshToken.length === 0) {
      this.removeItem(tt(this.clientId, n));
      return;
    } else
      this.setItem(tt(this.clientId, n), JSON.stringify(e), t);
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
    return !r || !Bl(r) ? (this.logger.trace("1jukz6", t), null) : (this.logger.trace("01ju66", t), r);
  }
  /**
   * set IdToken credential to the platform cache
   * @param idToken
   */
  async setIdTokenCredential(e, t, n) {
    this.logger.trace("13hjll", t);
    const r = this.generateCredentialKey(e), i = Date.now().toString();
    e.lastUpdatedAt = i, await this.setUserData(r, JSON.stringify(e), t, i, n);
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
    return !r || !ii(r) ? (this.logger.trace("0bqvx8", t), null) : (this.logger.trace("1o81rl", t), r);
  }
  /**
   * set accessToken credential to the platform cache
   * @param accessToken
   */
  async setAccessTokenCredential(e, t, n) {
    this.logger.trace("1pondb", t);
    const r = this.generateCredentialKey(e), i = Date.now().toString();
    e.lastUpdatedAt = i, await this.setUserData(r, JSON.stringify(e), t, i, n);
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
    return !r || !si(r) ? (this.logger.trace("0jlizt", t), null) : (this.logger.trace("0nokxi", t), r);
  }
  /**
   * set refreshToken credential to the platform cache
   * @param refreshToken
   */
  async setRefreshTokenCredential(e, t, n) {
    this.logger.trace("0tcg8d", t);
    const r = this.generateCredentialKey(e), i = Date.now().toString();
    e.lastUpdatedAt = i, await this.setUserData(r, JSON.stringify(e), t, i, n);
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
    return !r || !Vl(e, r) ? (this.logger.trace("1q101h", t), null) : (this.logger.trace("19pvg2", t), r);
  }
  /**
   * set appMetadata entity to the platform cache
   * @param appMetadata
   * @param correlationId
   */
  setAppMetadata(e, t) {
    this.logger.trace("0cyma6", t);
    const n = Gl(e);
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
    return !r || !zl(e, r) ? (this.logger.trace("0jk19c", t), null) : (this.logger.trace("12jguk", t), r);
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
    return r && $l(e, r) ? (this.logger.trace("1ohvk3", t), r) : null;
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
    this.internalStorage.setItem(xt.WRAPPER_SKU, e), this.internalStorage.setItem(xt.WRAPPER_VER, t);
  }
  /**
   * Returns wrapper metadata from in-memory storage
   */
  getWrapperMetadata() {
    const e = this.internalStorage.getItem(xt.WRAPPER_SKU) || "", t = this.internalStorage.getItem(xt.WRAPPER_VER) || "";
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
    const t = this.generateCacheKey(Go.ACTIVE_ACCOUNT_FILTERS), n = this.browserStorage.getItem(t);
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
    const n = this.generateCacheKey(Go.ACTIVE_ACCOUNT_FILTERS);
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
    return !r || !jl(e, r) ? (this.logger.trace("1h4wa6", t), null) : (this.logger.trace("0of6n8", t), r);
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
    const r = n ? this.generateCacheKey(e) : e, i = this.temporaryCacheStorage.getItem(r);
    if (!i) {
      if (this.cacheConfig.cacheLocation === Z.LocalStorage) {
        const s = this.browserStorage.getItem(r);
        if (s)
          return this.logger.trace("1yt61y", t), s;
      }
      return this.logger.trace("1qhy81", t), null;
    }
    return i;
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
    return X.startsWith(e, L) ? e : `${L}.${this.clientId}.${e}`;
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
    const t = e.credentialType === H.REFRESH_TOKEN && e.familyId || e.clientId, n = e.tokenType && e.tokenType.toLowerCase() !== S.BEARER.toLowerCase() ? e.tokenType.toLowerCase() : "";
    return [
      `${L}.${B}`,
      e.homeAccountId,
      e.environment,
      e.credentialType,
      t,
      e.realm || "",
      e.target || "",
      n
    ].join(Ti).toLowerCase();
  }
  /**
   * Cache Key: msal.<schema_version>.<home_account_id>.<environment>.<tenant_id>
   * @param account
   * @returns
   */
  generateAccountKey(e) {
    const t = e.homeAccountId.split(".")[1];
    return [
      `${L}.${Ft}`,
      e.homeAccountId,
      e.environment,
      t || e.tenantId || ""
    ].join(Ti).toLowerCase();
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
    const r = It(JSON.stringify(e));
    if (this.setTemporaryCache(M.REQUEST_PARAMS, r, !0), n) {
      const i = It(n);
      this.setTemporaryCache(M.VERIFIER, i, !0);
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
      throw m(fa);
    const n = this.getTemporaryCache(M.VERIFIER, e, !0);
    let r, i = "";
    try {
      r = JSON.parse(j(t)), n && (i = j(n));
    } catch {
      throw this.logger.errorPii("0ewsey", e), this.logger.error("0tvdic", e), m(pa);
    }
    return [r, i];
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
      return this.logger.error("0jjyys", ""), this.removeTemporaryItem(e), this.resetRequestCache(""), fo(window), null;
    }
  }
  setInteractionInProgress(e, t = Pe.SIGNIN, n = !1, r = "") {
    var s;
    const i = `${L}.${M.INTERACTION_STATUS_KEY}`;
    if (e) {
      if (this.getInteractionInProgress())
        if (n)
          this.logger.warning("1pmscr", r), Fa(this.logger, r), this.removeTemporaryItem(i);
        else
          throw m(ia);
      this.setTemporaryCache(i, JSON.stringify({ clientId: this.clientId, type: t }), !1);
    } else !e && ((s = this.getInteractionInProgress()) == null ? void 0 : s.clientId) === this.clientId && this.removeTemporaryItem(i);
  }
  /**
   * Builds credential entities from AuthenticationResult object and saves the resulting credentials to the cache
   * @param result
   * @param request
   */
  async hydrateCache(e, t) {
    var s, a, c;
    const n = mn((s = e.account) == null ? void 0 : s.homeAccountId, (a = e.account) == null ? void 0 : a.environment, e.idToken, this.clientId, e.tenantId), r = yn(
      (c = e.account) == null ? void 0 : c.homeAccountId,
      e.account.environment,
      e.accessToken,
      this.clientId,
      e.tenantId,
      e.scopes.join(" "),
      // Access token expiresOn stored in seconds, converting from AuthenticationResult expiresOn stored as Date
      e.expiresOn ? ti(e.expiresOn) : 0,
      e.extExpiresOn ? ti(e.extExpiresOn) : 0,
      j,
      void 0,
      // refreshOn
      e.tokenType,
      void 0,
      // userAssertionHash
      t.sshKid
    ), i = {
      idToken: n,
      accessToken: r
    };
    return this.saveCacheRecord(i, e.correlationId, ue(oe(e.idToken, j)));
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
    } catch (i) {
      if (i instanceof Fe && this.performanceClient && t)
        try {
          const s = this.getTokenKeys();
          this.performanceClient.addFields({
            cacheRtCount: s.refreshToken.length,
            cacheIdCount: s.idToken.length,
            cacheAtCount: s.accessToken.length
          }, t);
        } catch {
        }
      throw i;
    }
  }
}
function _i(o, e, t, n) {
  try {
    switch (e) {
      case Z.LocalStorage:
        return new Pu(o, t, n);
      case Z.SessionStorage:
        return new Nu();
      case Z.MemoryStorage:
      default:
        break;
    }
  } catch (r) {
    t.error(r, "");
  }
  return new On();
}
const Za = (o, e, t, n) => {
  const r = {
    cacheLocation: Z.MemoryStorage,
    cacheRetentionDays: 5
  };
  return new Et(o, r, yt, e, t, n);
};
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function ec(o, e, t, n, r) {
  return o.verbose("1yd030", n), t ? e.getAllAccounts(r, n) : [];
}
function ar(o, e, t, n) {
  if (e.trace("0u7b90", n), Object.keys(o).length === 0)
    return e.warning("1kz0cu", n), null;
  const r = t.getAccountInfoFilteredBy(o, n);
  return r ? (e.verbose("0btgll", n), r) : (e.verbose("0ltaj5", n), null);
}
function tc(o, e, t) {
  e.setActiveAccount(o, t);
}
function nc(o, e) {
  return o.getActiveAccount(e);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Mu = "msal.broadcast.event";
class Eo {
  constructor(e) {
    this.eventCallbacks = /* @__PURE__ */ new Map(), this.logger = e || new Q({}), typeof BroadcastChannel < "u" && (this.broadcastChannel = new BroadcastChannel(Mu)), this.invokeCrossTabCallbacks = this.invokeCrossTabCallbacks.bind(this);
  }
  /**
   * Adds event callbacks to array
   * @param callback - callback to be invoked when an event is raised
   * @param eventTypes - list of events that this callback will be invoked for, if not provided callback will be invoked for all events
   * @param callbackId - Identifier for the callback, used to locate and remove the callback when no longer required
   */
  addEventCallback(e, t, n) {
    if (typeof window < "u") {
      const r = n || rn();
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
    const i = {
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
        (s = this.broadcastChannel) == null || s.postMessage(i);
    }
    this.invokeCallbacks(i);
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
class rc {
  constructor(e, t, n, r, i, s, a, c, h) {
    this.config = e, this.browserStorage = t, this.browserCrypto = n, this.networkClient = this.config.system.networkClient, this.eventHandler = i, this.navigationClient = s, this.platformAuthProvider = h, this.correlationId = c, this.logger = r.clone(q.MSAL_SKU, ae), this.performanceClient = a;
  }
}
function sn(o, e, t, n) {
  t.verbose("0bd1la", n);
  const r = o || e || "";
  return k.getAbsoluteUrl(r, Te());
}
function W(o, e, t, n, r, i) {
  r.verbose("1p12tq", t);
  const s = {
    clientId: e,
    correlationId: t,
    apiId: o,
    forceRefresh: !1,
    wrapperSKU: n.getWrapperMetadata()[0],
    wrapperVer: n.getWrapperMetadata()[1]
  };
  return new wt(s, n);
}
async function Ee(o, e, t, n, r, i, s, a, c) {
  const h = a && a.hasOwnProperty("instance_aware") ? a.instance_aware : void 0, l = {
    protocolMode: o.system.protocolMode,
    OIDCOptions: o.auth.OIDCOptions,
    knownAuthorities: o.auth.knownAuthorities,
    cloudDiscoveryMetadata: o.auth.cloudDiscoveryMetadata,
    authorityMetadata: o.auth.authorityMetadata
  }, d = i || o.auth.authority, g = h != null && h.length ? h === "true" : o.auth.instanceAware, f = c && g ? o.auth.authority.replace(k.getDomainFromUrl(d), c.environment) : d, w = z.generateAuthority(f, s || o.auth.azureCloudOptions), I = await u(Qs, ru, r, t, e)(w, o.system.networkClient, n, l, r, e, t);
  if (c && !I.isAlias(c.environment))
    throw v(ts);
  return I;
}
async function So(o, e, t, n, r) {
  if (r)
    try {
      o.removeAccount(r, n), t.verbose("0s4z6h", n);
    } catch {
      t.error("0mgg1d", n);
    }
  else
    try {
      t.verbose("0zj631", n), o.clear(n), await e.clearKeystore(n);
    } catch {
      t.error("12ih0c", n);
    }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function ko(o, e, t, n, r) {
  const i = o.authority || e.auth.authority, s = [...o && o.scopes || []], a = {
    ...o,
    correlationId: o.correlationId,
    authority: i,
    scopes: s
  };
  if (!a.authenticationScheme)
    a.authenticationScheme = S.BEARER, n.verbose("1l4fwv", r);
  else {
    if (a.authenticationScheme === S.SSH) {
      if (!o.sshJwk)
        throw v(dn);
      if (!o.sshKid)
        throw v(qi);
    }
    n.verbose("1ecmns", r);
  }
  return a;
}
async function Uu(o, e, t, n, r) {
  const i = await u(ko, yo, r, n, o.correlationId)(o, t, n, r, o.correlationId);
  return {
    ...o,
    ...i,
    account: e,
    forceRefresh: o.forceRefresh || !1
  };
}
function oc(o, e) {
  let t;
  const n = o.httpMethod;
  if (e === J.EAR) {
    if (n && n !== qe.POST)
      throw v(ns);
    t = qe.POST;
  } else
    t = n || qe.GET;
  return t;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class at extends rc {
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
    return !e || e.postLogoutRedirectUri !== null ? e && e.postLogoutRedirectUri ? (this.logger.verbose("1vamm6", t.correlationId), t.postLogoutRedirectUri = k.getAbsoluteUrl(e.postLogoutRedirectUri, Te())) : this.config.auth.postLogoutRedirectUri === null ? this.logger.verbose("15m5g7", t.correlationId) : this.config.auth.postLogoutRedirectUri ? (this.logger.verbose("1f4xlz", t.correlationId), t.postLogoutRedirectUri = k.getAbsoluteUrl(this.config.auth.postLogoutRedirectUri, Te())) : (this.logger.verbose("17s5rf", t.correlationId), t.postLogoutRedirectUri = k.getAbsoluteUrl(Te(), Te())) : this.logger.verbose("0ljv63", t.correlationId), t;
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
    const t = await u(this.getClientConfiguration.bind(this), bn, this.logger, this.performanceClient, this.correlationId)(e);
    return new Ys(t, this.performanceClient);
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
    const { serverTelemetryManager: t, requestAuthority: n, requestAzureCloudOptions: r, requestExtraQueryParameters: i, account: s } = e, a = e.authority || await u(Ee, Be, this.logger, this.performanceClient, this.correlationId)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, i, s), c = this.config.system.loggerOptions;
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
        sku: q.MSAL_SKU,
        version: ae,
        cpu: "",
        os: ""
      },
      telemetry: this.config.telemetry
    };
  }
}
async function Nn(o, e, t, n, r, i, s, a) {
  const c = sn(o.redirectUri, t.auth.redirectUri, i, a), h = {
    interactionType: e
  }, l = Cl(n, o && o.state || "", h), g = {
    ...await u(ko, yo, i, s, a)({ ...o, correlationId: a }, t, s, i, a),
    redirectUri: c,
    state: l,
    nonce: o.nonce || O(),
    responseMode: t.auth.OIDCOptions.responseMode
  }, f = {
    ...g,
    httpMethod: oc(g, t.system.protocolMode)
  };
  if (o.loginHint || o.sid)
    return f;
  const w = o.account || r.getActiveAccount(a);
  return w && (i.verbose("1eqlb3", a), i.verbosePii("0tf99t", a), f.account = w), f;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function xu(o, e) {
  if (!e)
    return null;
  try {
    return bt(o.base64Decode, e).libraryState.meta;
  } catch {
    throw p(rt);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function pt(o, e, t, n) {
  const r = Qt(o);
  if (!r)
    throw Os(o) ? (t.error("13pl0s", n), t.errorPii("1097vx", n), m(ra)) : (t.error("18h0l1", n), m(na));
  return r;
}
function Du(o, e, t) {
  if (!o.state)
    throw m(Sn);
  const n = xu(e, o.state);
  if (!n)
    throw m(to);
  if (n.interactionType !== t)
    throw m(oa);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ic {
  constructor(e, t, n, r, i) {
    this.authModule = e, this.browserStorage = t, this.authCodeRequest = n, this.logger = r, this.performanceClient = i;
  }
  /**
   * Function to handle response parameters from hash.
   * @param locationHash
   */
  async handleCodeResponse(e, t) {
    let n;
    try {
      n = rd(e, t.state);
    } catch (r) {
      throw r instanceof ke && r.subError === tn ? m(tn) : r;
    }
    return u(this.handleCodeResponseFromServer.bind(this), zs, this.logger, this.performanceClient, t.correlationId)(n, t);
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
      const i = this.createCcsCredentials(t);
      i && (this.authCodeRequest.ccsCredential = i);
    }
    return await u(this.authModule.acquireToken.bind(this.authModule), nu, this.logger, this.performanceClient, t.correlationId)(this.authCodeRequest, e);
  }
  /**
   * Build ccs creds if available
   */
  createCcsCredentials(e) {
    return e.account ? {
      credential: e.account.homeAccountId,
      type: de.HOME_ACCOUNT_ID
    } : e.loginHint ? {
      credential: e.loginHint,
      type: de.UPN
    } : null;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Lu = "ContentError", Hu = "PageException", Ku = "user_switch", Fu = "unsupported_method";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Bu = "USER_INTERACTION_REQUIRED", zu = "USER_CANCEL", ju = "NO_NETWORK", Gu = "PERSISTENT_ERROR", Vu = "DISABLED", $u = "ACCOUNT_UNAVAILABLE", Ju = "UX_NOT_ALLOWED";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Wu = -2147186943;
class fe extends A {
  constructor(e, t, n) {
    super(e, t || An(e)), Object.setPrototypeOf(this, fe.prototype), this.name = "NativeAuthError", this.ext = n;
  }
}
function Ye(o) {
  if (o.ext && o.ext.status && (o.ext.status === Gu || o.ext.status === Vu) || o.ext && o.ext.error && o.ext.error === Wu)
    return !0;
  switch (o.errorCode) {
    case Lu:
    case Hu:
      return !0;
    default:
      return !1;
  }
}
function an(o, e, t) {
  if (t && t.status)
    switch (t.status) {
      case $u:
        return Zt(Ds, An(o));
      case Bu:
        return new ee(o, e);
      case zu:
        return m(tn);
      case ju:
        return m(nn);
      case Ju:
        return Zt(Vr);
    }
  return new fe(o, e, t);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class sc extends at {
  /**
   * Returns unexpired tokens from the cache, if available
   * @param silentRequest
   */
  async acquireToken(e) {
    const t = W(_.acquireTokenSilent_silentFlow, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), n = await u(this.getClientConfiguration.bind(this), bn, this.logger, this.performanceClient, this.correlationId)({
      serverTelemetryManager: t,
      requestAuthority: e.authority,
      requestAzureCloudOptions: e.azureCloudOptions,
      account: e.account
    }), r = new ed(n, this.performanceClient);
    this.logger.verbose("0wa871", this.correlationId);
    try {
      const s = (await u(r.acquireCachedToken.bind(r), Zd, this.logger, this.performanceClient, e.correlationId)(e))[0];
      return this.performanceClient.addFields({
        fromCache: !0
      }, e.correlationId), s;
    } catch (i) {
      throw i instanceof Ot && i.errorCode === ro && this.logger.verbose("06wena", this.correlationId), i;
    }
  }
  /**
   * API to silenty clear the browser cache.
   * @param logoutRequest
   */
  logout(e) {
    this.logger.verbose("1rkurh", this.correlationId);
    const t = this.initializeLogoutRequest(e);
    return So(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, t.account);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class zt extends rc {
  constructor(e, t, n, r, i, s, a, c, h, l, d, g) {
    super(e, t, n, r, i, s, c, g, h), this.apiId = a, this.accountId = l, this.platformAuthProvider = h, this.nativeStorageManager = d, this.silentCacheClient = new sc(e, this.nativeStorageManager, n, r, i, s, c, g, h);
    const f = this.platformAuthProvider.getExtensionName();
    this.skus = wt.makeExtraSkuString({
      libraryName: q.MSAL_SKU,
      libraryVersion: ae,
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
      [vh]: this.skus
    };
  }
  /**
   * Acquire token from native platform via browser extension
   * @param request
   */
  async acquireToken(e, t) {
    this.logger.trace("03qeos", this.correlationId);
    const n = this.performanceClient.startMeasurement(Va, e.correlationId), r = $(), i = W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
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
      }), i.clearNativeBrokerErrorCode(), c)).catch((c) => {
        throw n.end({
          success: !1,
          errorCode: c.errorCode,
          subErrorCode: c.subError,
          isNativeBroker: !0
        }), c;
      });
    } catch (s) {
      throw s instanceof fe && i.setNativeBrokerErrorCode(s.errorCode), s;
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
      throw this.logger.warning("1ndf3e", this.correlationId), p(Jt);
    const n = this.browserStorage.getBaseAccountInfo({
      nativeAccountId: e
    }, t.correlationId);
    if (!n)
      throw p(Jt);
    try {
      const r = this.createSilentCacheRequest(t, n), i = await this.silentCacheClient.acquireToken(r), s = {
        ...n,
        idTokenClaims: i == null ? void 0 : i.idTokenClaims,
        idToken: i == null ? void 0 : i.idToken
      };
      return {
        ...i,
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
    const r = await this.initializeNativeRequest(e), i = (n == null ? void 0 : n.navigateToLoginRequestUrl) ?? !0;
    try {
      await this.platformAuthProvider.sendMessage(r);
    } catch (c) {
      if (c instanceof fe && (W(this.apiId, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger).setNativeBrokerErrorCode(c.errorCode), Ye(c)))
        throw c;
    }
    this.browserStorage.setTemporaryCache(M.NATIVE_REQUEST, JSON.stringify(r), !0);
    const s = {
      apiId: _.acquireTokenRedirect,
      timeout: this.config.system.redirectNavigationTimeout,
      noHistory: !1
    }, a = i ? window.location.href : sn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId);
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
    const { prompt: r, ...i } = n;
    r && this.logger.verbose("0ac34v", this.correlationId), this.browserStorage.removeItem(this.browserStorage.generateCacheKey(M.NATIVE_REQUEST));
    const s = $();
    try {
      this.logger.verbose("003x5a", this.correlationId);
      const a = await this.platformAuthProvider.sendMessage(i), c = await this.handleNativeResponse(a, i, s);
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
    const r = oe(e.id_token, j), i = this.createHomeAccountIdentifier(e, r), s = (l = this.browserStorage.getAccountInfoFilteredBy({
      nativeAccountId: t.accountId
    }, this.correlationId)) == null ? void 0 : l.homeAccountId;
    if ((d = t.extraParameters) != null && d.child_client_id && e.account.id !== t.accountId)
      this.logger.info("1ub1in", this.correlationId);
    else if (i !== s && e.account.id !== t.accountId)
      throw an(Ku);
    const a = await Ee(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, t.authority), c = Wr(
      this.browserStorage,
      a,
      i,
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
    return await this.cacheAccount(c, ue(r)), await this.cacheNativeTokens(e, t, i, r, e.access_token, h.tenantId, n), h;
  }
  /**
   * creates an homeAccountIdentifier for the account
   * @param response
   * @param idTokenObj
   * @returns
   */
  createHomeAccountIdentifier(e, t) {
    return zr(e.client_info || "", le.Default, this.logger, this.browserCrypto, this.correlationId, t);
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
    if (t.tokenType === S.POP && t.signPopToken) {
      if (e.shr)
        return this.logger.trace("0coqhu", this.correlationId), e.shr;
      const n = new je(this.browserCrypto, this.performanceClient), r = {
        resourceRequestMethod: t.resourceRequestMethod,
        resourceRequestUri: t.resourceRequestUri,
        shrClaims: t.shrClaims,
        shrNonce: t.shrNonce,
        correlationId: this.correlationId
      };
      if (!t.keyId)
        throw p(Sr);
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
  async generateAuthenticationResult(e, t, n, r, i, s) {
    const a = this.addTelemetryFromNativeResponse(e.properties.MATS), c = this.generateScopes(t.scope, e.scope), h = e.account.properties || {}, l = h.UID || n.oid || n.sub || "", d = h.TenantId || n.tid || "", g = Hr(
      me(r),
      void 0,
      // tenantProfile optional
      n,
      e.id_token
    );
    g.nativeAccountId !== e.account.id && (g.nativeAccountId = e.account.id);
    const f = await this.generatePopAccessToken(e, t), w = t.tokenType === S.POP ? S.POP : S.BEARER;
    return {
      authority: i,
      uniqueId: l,
      tenantId: d,
      scopes: c.asArray(),
      account: g,
      idToken: e.id_token,
      idTokenClaims: n,
      accessToken: f,
      fromCache: a ? this.isResponseFromCache(a) : !1,
      // Request timestamp and NativeResponse expires_in are in seconds, converting to Date for AuthenticationResult
      expiresOn: Ae(s + e.expires_in),
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
  cacheNativeTokens(e, t, n, r, i, s, a) {
    const c = mn(n, t.authority, e.id_token || "", t.clientId, r.tid || ""), h = t.tokenType === S.POP ? Fo : (typeof e.expires_in == "string" ? parseInt(e.expires_in, 10) : e.expires_in) || 0, l = a + h, d = this.generateScopes(e.scope, t.scope), g = yn(n, t.authority, i, t.clientId, r.tid || s, d.printScopes(), l, 0, j, void 0, t.tokenType, void 0, t.keyId), f = {
      idToken: c,
      accessToken: g
    };
    return this.nativeStorageManager.saveCacheRecord(f, this.correlationId, ue(r), t.storeInCache);
  }
  getExpiresInValue(e, t) {
    return e === S.POP ? Fo : (typeof t == "string" ? parseInt(t, 10) : t) || 0;
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
    const t = await this.getCanonicalAuthority(e), { scopes: n, ...r } = e, i = new x(n || []);
    i.appendScopes(Se);
    const s = {
      ...r,
      accountId: this.accountId,
      clientId: this.config.auth.clientId,
      authority: t.urlString,
      scope: i.printScopes(),
      redirectUri: sn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId),
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
      throw m(va);
    if (this.handleExtraBrokerParams(s), s.extraParameters = s.extraParameters || {}, s.extraParameters.telemetry = re.MATS_TELEMETRY, e.authenticationScheme === S.POP) {
      const a = {
        resourceRequestUri: e.resourceRequestUri,
        resourceRequestMethod: e.resourceRequestMethod,
        shrClaims: e.shrClaims,
        shrNonce: e.shrNonce,
        correlationId: this.correlationId
      }, c = new je(this.browserCrypto, this.performanceClient);
      let h;
      if (s.keyId)
        h = this.browserCrypto.base64UrlEncode(JSON.stringify({ kid: s.keyId })), s.signPopToken = !1;
      else {
        const l = await u(c.generateCnf.bind(c), Rt, this.logger, this.performanceClient, this.correlationId)(a, this.logger);
        h = l.reqCnfString, s.keyId = l.kid, s.signPopToken = !0;
      }
      s.reqCnf = h;
    }
    return this.addRequestSKUs(s), s;
  }
  async getCanonicalAuthority(e) {
    const t = e.authority || this.config.auth.authority, { azureCloudOptions: n, account: r } = e;
    r && await Ee(
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
    const i = new k(t);
    return i.validateAsUri(), i;
  }
  getPrompt(e) {
    switch (this.apiId) {
      case _.ssoSilent:
      case _.acquireTokenSilent_silentFlow:
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
        throw this.logger.trace("0nkr6q", this.correlationId), m(ka);
    }
  }
  /**
   * Handles extra broker request parameters
   * @param request {PlatformAuthRequest}
   * @private
   */
  handleExtraBrokerParams(e) {
    var i;
    const t = e.extraParameters && e.extraParameters.hasOwnProperty(Gt) && e.extraParameters.hasOwnProperty(Vt) && e.extraParameters.hasOwnProperty(ze);
    if (!e.embeddedClientId && !t)
      return;
    let n = "";
    const r = e.redirectUri;
    e.embeddedClientId ? (e.redirectUri = this.config.auth.redirectUri, n = e.embeddedClientId) : e.extraParameters && (e.redirectUri = e.extraParameters[Vt], n = e.extraParameters[ze]), e.extraParameters = {
      child_client_id: n,
      child_redirect_uri: r
    }, (i = this.performanceClient) == null || i.addFields({
      embeddedClientId: n,
      embeddedRedirectUri: r
    }, e.correlationId);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function _o(o, e, t, n, r) {
  const i = nd({ ...o.auth, authority: e }, t, n, r);
  if (Pr(i, {
    sku: q.MSAL_SKU,
    version: ae,
    os: "",
    cpu: ""
  }), o.system.protocolMode !== J.OIDC && Nr(i, o.telemetry.application), t.platformBroker && (Dh(i), t.authenticationScheme === S.POP)) {
    const s = new se(n, r), a = new je(s, r);
    let c;
    t.popKid ? c = s.encodeKid(t.popKid) : c = (await u(a.generateCnf.bind(a), Rt, n, r, t.correlationId)(t, n)).reqCnfString, Dr(i, c);
  }
  return un(i, t.correlationId, r), i;
}
async function vo(o, e, t, n, r) {
  if (!t.codeChallenge)
    throw v(mr);
  const i = await u(_o, eu, n, r, t.correlationId)(o, e, t, n, r);
  return kr(i, dr.CODE), Mr(i, t.codeChallenge, lr), pe(i, {
    ...t.extraQueryParameters,
    ...t.extraParameters
  }), Yr(e, i);
}
async function bo(o, e, t, n, r, i) {
  if (!n.earJwk)
    throw m(eo);
  const s = await _o(e, t, n, r, i);
  kr(s, dr.IDTOKEN_TOKEN_REFRESHTOKEN), $h(s, n.earJwk), Mr(s, n.codeChallenge, lr), pe(s, {
    ...n.extraParameters
  });
  const a = /* @__PURE__ */ new Map();
  pe(a, n.extraQueryParameters || {});
  const c = Yr(t, a);
  return ac(o, c, s);
}
async function Ro(o, e, t, n, r, i) {
  const s = await _o(e, t, n, r, i);
  kr(s, dr.CODE), Mr(s, n.codeChallenge, n.codeChallengeMethod || lr), pe(s, {
    ...n.extraParameters
  });
  const a = /* @__PURE__ */ new Map();
  pe(a, n.extraQueryParameters || {});
  const c = Yr(t, a);
  return ac(o, c, s);
}
function ac(o, e, t) {
  const n = o.createElement("form");
  return n.method = "post", n.action = e, t.forEach((r, i) => {
    const s = o.createElement("input");
    s.hidden = !0, s.name = i, s.value = r, n.appendChild(s);
  }), o.body.appendChild(n), n;
}
async function cc(o, e, t, n, r, i, s, a, c, h) {
  if (a.verbose("11qcow", o.correlationId), !h)
    throw m(io);
  const l = new se(a, c), d = new zt(n, r, l, a, s, n.system.navigationClient, t, c, h, e, i, o.correlationId), { userRequestState: g } = bt(l.base64Decode, o.state);
  return u(d.acquireToken.bind(d), Va, a, c, o.correlationId)({
    ...o,
    state: g,
    prompt: void 0
    // Server should handle the prompt, ideally native broker can do this part silently
  });
}
async function nt(o, e, t, n, r, i, s, a, c, h, l, d) {
  if (ge.removeThrottle(s, r.auth.clientId, o), e.accountId)
    return u(cc, $a, h, l, o.correlationId)(o, e.accountId, n, r, s, a, c, h, l, d);
  const g = {
    ...o,
    code: e.code || "",
    codeVerifier: t
  }, f = new ic(i, s, g, h, l);
  return await u(f.handleCodeResponse.bind(f), tu, h, l, o.correlationId)(e, o);
}
async function Oo(o, e, t, n, r, i, s, a, c, h, l) {
  if (ge.removeThrottle(i, n.auth.clientId, o), qs(e, o.state), !e.ear_jwe)
    throw m(ta);
  if (!o.earJwk)
    throw m(eo);
  const d = JSON.parse(await u(Dd, yu, c, h, o.correlationId)(o.earJwk, e.ear_jwe));
  if (d.accountId)
    return u(cc, $a, c, h, o.correlationId)(o, d.accountId, t, n, i, s, a, c, h, l);
  const g = new Ge(n.auth.clientId, i, new se(c, h), c, h, null, null);
  g.validateTokenResponse(d, o.correlationId);
  const f = {
    code: "",
    state: o.state,
    nonce: o.nonce,
    client_info: d.client_info,
    cloud_graph_host_name: d.cloud_graph_host_name,
    cloud_instance_host_name: d.cloud_instance_host_name,
    cloud_instance_name: d.cloud_instance_name,
    msgraph_host: d.msgraph_host
  };
  return await u(g.handleServerTokenResponse.bind(g), Jr, c, h, o.correlationId)(d, r, $(), o, f, void 0, void 0, void 0, void 0);
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Qu = 32;
async function $e(o, e, t) {
  const n = ie(Yu, hu, e, o, t)(o, e, t), r = await u(qu, lu, e, o, t)(n, o, e, t);
  return {
    verifier: n,
    challenge: r
  };
}
function Yu(o, e, t) {
  try {
    const n = new Uint8Array(Qu);
    return ie(Pd, uu, e, o, t)(n), Le(n);
  } catch {
    throw m(Zr);
  }
}
async function qu(o, e, t, n) {
  try {
    const r = await u(Ma, du, t, e, n)(o);
    return Le(new Uint8Array(r));
  } catch {
    throw m(Zr);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class cn {
  /**
   * Navigates to other pages within the same web application
   * @param url
   * @param options
   */
  navigateInternal(e, t) {
    return cn.defaultNavigateWindow(e, t);
  }
  /**
   * Navigates to other pages outside the web application i.e. the Identity Provider
   * @param url
   * @param options
   */
  navigateExternal(e, t) {
    return cn.defaultNavigateWindow(e, t);
  }
  /**
   * Default navigation implementation invoked by the internal and external functions
   * @param url
   * @param options
   */
  static defaultNavigateWindow(e, t) {
    return t.noHistory ? window.location.replace(e) : window.location.assign(e), new Promise((n, r) => {
      setTimeout(() => {
        r(m(Tt, "failed_to_redirect"));
      }, t.timeout);
    });
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Xu {
  /**
   * Fetch Client for REST endpoints - Get request
   * @param url
   * @param headers
   * @param body
   */
  async sendGetRequestAsync(e, t) {
    let n, r = {}, i = 0;
    const s = vi(t);
    try {
      n = await fetch(e, {
        method: di.GET,
        headers: s
      });
    } catch (a) {
      throw dt(m(window.navigator.onLine ? ya : nn), void 0, void 0, a);
    }
    r = bi(n.headers);
    try {
      return i = n.status, {
        headers: r,
        body: await n.json(),
        status: i
      };
    } catch (a) {
      throw dt(m(or), i, r, a);
    }
  }
  /**
   * Fetch Client for REST endpoints - Post request
   * @param url
   * @param headers
   * @param body
   */
  async sendPostRequestAsync(e, t) {
    const n = t && t.body || "", r = vi(t);
    let i, s = 0, a = {};
    try {
      i = await fetch(e, {
        method: di.POST,
        headers: r,
        body: n
      });
    } catch (c) {
      throw dt(m(window.navigator.onLine ? ma : nn), void 0, void 0, c);
    }
    a = bi(i.headers);
    try {
      return s = i.status, {
        headers: a,
        body: await i.json(),
        status: s
      };
    } catch (c) {
      throw dt(m(or), s, a, c);
    }
  }
}
function vi(o) {
  try {
    const e = new Headers();
    if (!(o && o.headers))
      return e;
    const t = o.headers;
    return Object.entries(t).forEach(([n, r]) => {
      e.append(n, r);
    }), e;
  } catch (e) {
    throw dt(m(ba), void 0, void 0, e);
  }
}
function bi(o) {
  try {
    const e = {};
    return o.forEach((t, n) => {
      e[n] = t;
    }), e;
  } catch {
    throw m(Ra);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Zu = 6e4, eg = 1e4, tg = 3e4, hc = 2e3;
function lc({ auth: o, cache: e, system: t, telemetry: n }, r) {
  const i = {
    clientId: "",
    authority: `${cr}`,
    knownAuthorities: [],
    cloudDiscoveryMetadata: "",
    authorityMetadata: "",
    redirectUri: typeof window < "u" && window.location ? window.location.href.split("?")[0].split("#")[0] : "",
    postLogoutRedirectUri: "",
    clientCapabilities: [],
    OIDCOptions: {
      responseMode: ln.FRAGMENT,
      defaultScopes: [
        Pi,
        Ni,
        hr
      ]
    },
    azureCloudOptions: {
      azureCloudInstance: Lr.None,
      tenant: ""
    },
    instanceAware: !1
  }, s = {
    cacheLocation: Z.SessionStorage,
    cacheRetentionDays: 5
  }, a = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loggerCallback: () => {
    },
    logLevel: R.Info,
    piiLoggingEnabled: !1
  }, h = {
    ...{
      ...Us,
      loggerOptions: a,
      networkClient: r ? new Xu() : td,
      navigationClient: new cn(),
      popupBridgeTimeout: (t == null ? void 0 : t.popupBridgeTimeout) || Zu,
      iframeBridgeTimeout: (t == null ? void 0 : t.iframeBridgeTimeout) || eg,
      redirectNavigationTimeout: tg,
      allowRedirectInIframe: !1,
      navigatePopups: !0,
      allowPlatformBroker: !1,
      nativeBrokerHandshakeTimeout: (t == null ? void 0 : t.nativeBrokerHandshakeTimeout) || hc,
      protocolMode: J.AAD
    },
    ...t,
    loggerOptions: (t == null ? void 0 : t.loggerOptions) || a
  }, l = {
    application: {
      appName: "",
      appVersion: ""
    },
    client: new vt()
  };
  if ((t == null ? void 0 : t.protocolMode) !== J.OIDC && (o != null && o.OIDCOptions) && new Q(h.loggerOptions).warning(JSON.stringify(v(Zi)), ""), t != null && t.protocolMode && t.protocolMode === J.OIDC && (h != null && h.allowPlatformBroker))
    throw v(es);
  return {
    auth: {
      ...i,
      ...o,
      OIDCOptions: {
        ...i.OIDCOptions,
        ...o == null ? void 0 : o.OIDCOptions
      }
    },
    cache: { ...s, ...e },
    system: h,
    telemetry: { ...l, ...n }
  };
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class hn {
  constructor(e, t, n, r) {
    this.logger = e, this.handshakeTimeoutMs = t, this.extensionId = r, this.resolvers = /* @__PURE__ */ new Map(), this.handshakeResolvers = /* @__PURE__ */ new Map(), this.messageChannel = new MessageChannel(), this.windowListener = this.onWindowMessage.bind(this), this.performanceClient = n, this.handshakeEvent = n.startMeasurement(au), this.platformAuthType = re.PLATFORM_EXTENSION_PROVIDER;
  }
  /**
   * Sends a given message to the extension and resolves with the extension response
   * @param request
   */
  async sendMessage(e) {
    this.logger.trace("0on4p2", e.correlationId);
    const t = {
      method: ht.GetToken,
      request: e
    }, n = {
      channel: re.CHANNEL_ID,
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
      const i = new hn(e, t, n, re.PREFERRED_EXTENSION_ID);
      return await i.sendHandshakeRequest(r), i;
    } catch {
      const s = new hn(e, t, n);
      return await s.sendHandshakeRequest(r), s;
    }
  }
  /**
   * Send handshake request helper.
   */
  async sendHandshakeRequest(e) {
    this.logger.trace("1dpg9o", e), window.addEventListener("message", this.windowListener, !1);
    const t = {
      channel: re.CHANNEL_ID,
      extensionId: this.extensionId,
      responseId: O(),
      body: {
        method: ht.HandshakeRequest
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
        }), r(m(Ea)), this.handshakeResolvers.delete(t.responseId);
      }, this.handshakeTimeoutMs);
    });
  }
  /**
   * Invoked when a message is posted to the window. If a handshake request is received it means the extension is not installed.
   * @param event
   */
  onWindowMessage(e) {
    const t = rn();
    if (this.logger.trace("0jpn5u", t), e.source !== window)
      return;
    const n = e.data;
    if (!(!n.channel || n.channel !== re.CHANNEL_ID) && !(n.extensionId && n.extensionId !== this.extensionId) && n.body.method === ht.HandshakeRequest) {
      const r = this.handshakeResolvers.get(n.responseId);
      if (!r) {
        this.logger.trace("07buhm", t);
        return;
      }
      this.logger.verbose(n.extensionId ? "0xrkug" : "No extension installed", t), clearTimeout(this.timeoutId), this.messageChannel.port1.close(), this.messageChannel.port2.close(), window.removeEventListener("message", this.windowListener, !1), this.handshakeEvent.end({
        success: !1,
        extensionInstalled: !1
      }), r.reject(m(Sa));
    }
  }
  /**
   * Invoked when a message is received from the extension on the MessageChannel port
   * @param event
   */
  onChannelMessage(e) {
    const t = rn();
    this.logger.trace("1py8yf", t);
    const n = e.data, r = this.resolvers.get(n.responseId), i = this.handshakeResolvers.get(n.responseId);
    try {
      const s = n.body.method;
      if (s === ht.Response) {
        if (!r)
          return;
        const a = n.body.response;
        if (this.logger.trace("19hpgm", t), this.logger.tracePii("179a24", t), a.status !== "Success")
          r.reject(an(a.code, a.description, a.ext));
        else if (a.result)
          a.result.code && a.result.description ? r.reject(an(a.result.code, a.result.description, a.result.ext)) : r.resolve(a.result);
        else
          throw $n(en, "Event does not contain result.");
        this.resolvers.delete(n.responseId);
      } else if (s === ht.HandshakeResponse) {
        if (!i) {
          this.logger.trace("082qnt", t);
          return;
        }
        clearTimeout(this.timeoutId), window.removeEventListener("message", this.windowListener, !1), this.extensionId = n.extensionId, this.extensionVersion = n.body.version, this.logger.verbose("0yf5ib", t), this.handshakeEvent.end({
          extensionInstalled: !0,
          success: !0
        }), i.resolve(), this.handshakeResolvers.delete(n.responseId);
      }
    } catch (s) {
      this.logger.error("0xf978", t), this.logger.errorPii("04i99o", t), this.logger.errorPii("0xdvsy", t), r ? r.reject(s) : i && i.reject(s);
    }
  }
  /**
   * Validates native platform response before processing
   * @param response
   */
  validatePlatformBrokerResponse(e) {
    if (e.hasOwnProperty("access_token") && e.hasOwnProperty("id_token") && e.hasOwnProperty("client_info") && e.hasOwnProperty("account") && e.hasOwnProperty("scope") && e.hasOwnProperty("expires_in"))
      return e;
    throw $n(en, "Response missing expected properties.");
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
    return this.getExtensionId() === re.PREFERRED_EXTENSION_ID ? "chrome" : (e = this.getExtensionId()) != null && e.length ? "unknown" : void 0;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Po {
  constructor(e, t, n) {
    this.logger = e, this.performanceClient = t, this.correlationId = n, this.platformAuthType = re.PLATFORM_DOM_PROVIDER;
  }
  static async createProvider(e, t, n) {
    var r;
    if (e.trace("12mj4a", n), (r = window.navigator) != null && r.platformAuthentication) {
      const i = (
        // @ts-ignore
        await window.navigator.platformAuthentication.getSupportedContracts(re.MICROSOFT_ENTRA_BROKERID)
      );
      if (i != null && i.includes(re.PLATFORM_DOM_APIS))
        return e.trace("1h5q1r", n), new Po(e, t, n);
    }
  }
  /**
   * Returns the Id for the broker extension this handler is communicating with
   * @returns
   */
  getExtensionId() {
    return re.MICROSOFT_ENTRA_BROKERID;
  }
  getExtensionVersion() {
    return "";
  }
  getExtensionName() {
    return re.DOM_API_NAME;
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
    const { accountId: t, clientId: n, authority: r, scope: i, redirectUri: s, correlationId: a, state: c, storeInCache: h, embeddedClientId: l, extraParameters: d, ...g } = e, f = this.getDOMExtraParams(g);
    return {
      accountId: t,
      brokerId: this.getExtensionId(),
      authority: r,
      clientId: n,
      correlationId: a || this.correlationId,
      extraParameters: { ...d, ...f },
      isSecurityTokenService: !1,
      redirectUri: s,
      scope: i,
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
          throw this.logger.trace("0g92vm", t), an(n.error.code, n.error.description, {
            error: parseInt(n.error.errorCode),
            protocol_error: n.error.protocolError,
            status: n.error.status,
            properties: n.error.properties
          });
      }
    }
    throw $n(en, "Response missing expected properties.");
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
      ...Object.entries(e).reduce((r, [i, s]) => (r[i] = String(s), r), {})
    };
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function Dg(o, e, t) {
  const n = new Q(o || {}, At, ae), r = t || "";
  n.trace("07660b", r);
  const i = e || new vt();
  return typeof window > "u" ? (n.trace("082ed3", r), !1) : !!await dc(n, i, r);
}
async function dc(o, e, t, n) {
  o.trace("134j0v", t);
  const r = ng();
  o.trace("04c81g", t);
  let i;
  try {
    r && (i = await Po.createProvider(o, e, t)), i || (o.trace("0l3na8", t), i = await hn.createProvider(o, n || hc, e, t));
  } catch (s) {
    o.trace("0icbd7", s);
  }
  return i;
}
function ng() {
  let o;
  try {
    return o = window[Z.SessionStorage], (o == null ? void 0 : o.getItem(vu)) === "true";
  } catch {
    return !1;
  }
}
function St(o, e, t, n, r) {
  if (e.trace("0uko3r", t), !o.system.allowPlatformBroker)
    return e.trace("04hozs", t), !1;
  if (!n)
    return e.trace("0kvv1r", t), !1;
  if (r)
    switch (r) {
      case S.BEARER:
      case S.POP:
        return e.trace("18tev1", t), !0;
      default:
        return e.trace("1dd2nh", t), !1;
    }
  return !0;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class rg extends at {
  constructor(e, t, n, r, i, s, a, c, h, l) {
    super(e, t, n, r, i, s, a, h, l), this.nativeStorage = c, this.eventHandler = i;
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
        popupName: this.generatePopupName(e.scopes || Se, e.authority || this.config.auth.authority),
        popupWindowAttributes: e.popupWindowAttributes || {},
        popupWindowParent: e.popupWindowParent ?? window
      }, this.performanceClient.addFields({ isAsyncPopup: !this.config.system.navigatePopups }, this.correlationId), this.config.system.navigatePopups) {
        const i = {
          ...e,
          httpMethod: oc(e, this.config.system.protocolMode)
        };
        return this.logger.verbose("1f9ok3", this.correlationId), n.popup = this.openSizedPopup("about:blank", n), this.acquireTokenPopupAsync(i, n, t);
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
      }, r = e && e.authority, i = e && e.mainWindowRedirectUri;
      return this.config.system.navigatePopups ? (this.logger.verbose("1a28da", this.correlationId), n.popup = this.openSizedPopup("about:blank", n), this.logoutPopupAsync(t, n, r, i)) : (this.logger.verbose("1phd8u", this.correlationId), this.logoutPopupAsync(t, n, r, i));
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
    const r = await u(Nn, Rn, this.logger, this.performanceClient, this.correlationId)(e, C.Popup, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    t.popup && mo(r.authority);
    const i = St(this.config, this.logger, this.correlationId, this.platformAuthProvider, e.authenticationScheme);
    return r.platformBroker = i, this.config.system.protocolMode === J.EAR ? this.executeEarFlow(r, t, n) : this.executeCodeFlow(r, t, n);
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
    const r = e.correlationId, i = W(_.acquireTokenPopup, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), s = n || await u($e, Ve, this.logger, this.performanceClient, r)(this.performanceClient, this.logger, r), a = {
      ...e,
      codeChallenge: s.challenge
    };
    try {
      const h = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, r)({
        serverTelemetryManager: i,
        requestAuthority: a.authority,
        requestAzureCloudOptions: a.azureCloudOptions,
        requestExtraQueryParameters: a.extraQueryParameters,
        account: a.account
      });
      if (a.httpMethod === qe.POST)
        return await this.executeCodeFlowWithPost(a, t, h, s.verifier);
      {
        const l = await u(vo, $r, this.logger, this.performanceClient, r)(this.config, h.authority, a, this.logger, this.performanceClient), d = this.initiateAuthRequest(l, t);
        this.eventHandler.emitEvent(y.POPUP_OPENED, C.Popup, { popupWindow: d }, null);
        const g = await Ke(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e), f = ie(pt, ft, this.logger, this.performanceClient, this.correlationId)(g, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
        return await u(nt, Ze, this.logger, this.performanceClient, r)(e, f, s.verifier, _.acquireTokenPopup, this.config, h, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
      }
    } catch (h) {
      throw (c = t.popup) == null || c.close(), h instanceof A && (h.setCorrelationId(this.correlationId), i.cacheFailedRequest(h)), h;
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e, t, n) {
    const { correlationId: r, authority: i, azureCloudOptions: s, extraQueryParameters: a, account: c } = e, h = await u(Ee, Be, this.logger, this.performanceClient, r)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, i, s, a, c), l = await u(lo, wo, this.logger, this.performanceClient, r)(), d = n || await u($e, Ve, this.logger, this.performanceClient, r)(this.performanceClient, this.logger, r), g = {
      ...e,
      earJwk: l,
      codeChallenge: d.challenge
    }, f = t.popup || this.openPopup("about:blank", t);
    (await bo(f.document, this.config, h, g, this.logger, this.performanceClient)).submit();
    const I = await u(Ke, on, this.logger, this.performanceClient, r)(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, g), E = ie(pt, ft, this.logger, this.performanceClient, this.correlationId)(I, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
    if (!E.ear_jwe && E.code) {
      const P = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, r)({
        serverTelemetryManager: W(_.acquireTokenPopup, this.config.auth.clientId, r, this.browserStorage, this.logger),
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account,
        authority: h
      });
      return u(nt, Ze, this.logger, this.performanceClient, r)(g, E, d.verifier, _.acquireTokenPopup, this.config, P, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    } else
      return u(Oo, Co, this.logger, this.performanceClient, r)(g, E, _.acquireTokenPopup, this.config, h, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  async executeCodeFlowWithPost(e, t, n, r) {
    const i = e.correlationId, s = await u(Ee, Be, this.logger, this.performanceClient, i)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger), a = t.popup || this.openPopup("about:blank", t);
    (await Ro(a.document, this.config, s, e, this.logger, this.performanceClient)).submit();
    const h = await u(Ke, on, this.logger, this.performanceClient, i)(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e), l = ie(pt, ft, this.logger, this.performanceClient, this.correlationId)(h, this.config.auth.OIDCOptions.responseMode, this.logger, this.correlationId);
    return u(nt, Ze, this.logger, this.performanceClient, i)(e, l, r, _.acquireTokenPopup, this.config, n, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
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
    const i = W(_.logoutPopup, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      await So(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, e.account);
      const h = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, this.correlationId)({
        serverTelemetryManager: i,
        requestAuthority: n,
        account: e.account || void 0
      });
      try {
        h.authority.endSessionEndpoint;
      } catch {
        if ((s = e.account) != null && s.homeAccountId && e.postLogoutRedirectUri && h.authority.protocolMode === J.OIDC) {
          if (this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Popup, e), r) {
            const g = {
              apiId: _.logoutPopup,
              timeout: this.config.system.redirectNavigationTimeout,
              noHistory: !1
            }, f = k.getAbsoluteUrl(r, Te());
            await this.navigationClient.navigateInternal(f, g);
          }
          (a = t.popup) == null || a.close();
          return;
        }
      }
      const l = h.getLogoutUri(e);
      this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Popup, e);
      const d = this.openPopup(l, t);
      if (this.eventHandler.emitEvent(y.POPUP_OPENED, C.Popup, { popupWindow: d }, null), await Ke(this.config.system.popupBridgeTimeout, this.logger, this.browserCrypto, e).catch(() => {
      }), r) {
        const g = {
          apiId: _.logoutPopup,
          timeout: this.config.system.redirectNavigationTimeout,
          noHistory: !1
        }, f = k.getAbsoluteUrl(r, Te());
        this.logger.verbose("0qcur2", this.correlationId), this.logger.verbosePii("0oj7lk", this.correlationId), await this.navigationClient.navigateInternal(f, g);
      } else
        this.logger.verbose("03zgcf", this.correlationId);
    } catch (h) {
      throw (c = t.popup) == null || c.close(), h instanceof A && (h.setCorrelationId(this.correlationId), i.cacheFailedRequest(h)), this.eventHandler.emitEvent(y.LOGOUT_FAILURE, C.Popup, null, h), this.eventHandler.emitEvent(y.LOGOUT_END, C.Popup), h;
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
    throw this.logger.error("1l7hyp", this.correlationId), m(En);
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
        throw m(ca);
      return n.focus && n.focus(), this.currentWindow = n, n;
    } catch {
      throw this.logger.error("0dxfb9", this.correlationId), m(aa);
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
    var f, w, I, E;
    const i = r.screenLeft ? r.screenLeft : r.screenX, s = r.screenTop ? r.screenTop : r.screenY, a = r.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = r.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let h = (f = n.popupSize) == null ? void 0 : f.width, l = (w = n.popupSize) == null ? void 0 : w.height, d = (I = n.popupPosition) == null ? void 0 : I.top, g = (E = n.popupPosition) == null ? void 0 : E.left;
    return (!h || h < 0 || h > a) && (this.logger.verbose("08vfmo", this.correlationId), h = q.POPUP_WIDTH), (!l || l < 0 || l > c) && (this.logger.verbose("09cxa0", this.correlationId), l = q.POPUP_HEIGHT), (!d || d < 0 || d > c) && (this.logger.verbose("1qh4wo", this.correlationId), d = Math.max(0, c / 2 - q.POPUP_HEIGHT / 2 + s)), (!g || g < 0 || g > a) && (this.logger.verbose("1sz3en", this.correlationId), g = Math.max(0, a / 2 - q.POPUP_WIDTH / 2 + i)), r.open(e, t, `width=${h}, height=${l}, top=${d}, left=${g}, scrollbars=yes`);
  }
  /**
   * Generates the name for the popup based on the client id and request
   * @param clientId
   * @param request
   */
  generatePopupName(e, t) {
    return `${q.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${e.join("-")}.${t}.${this.correlationId}`;
  }
  /**
   * Generates the name for the popup based on the client id and request for logouts
   * @param clientId
   * @param request
   */
  generateLogoutPopupName(e) {
    const t = e.account && e.account.homeAccountId;
    return `${q.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${t}.${this.correlationId}`;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function og() {
  if (typeof window > "u" || typeof window.performance > "u" || typeof window.performance.getEntriesByType != "function")
    return;
  const o = window.performance.getEntriesByType("navigation"), e = o.length ? o[0] : void 0;
  return e == null ? void 0 : e.type;
}
class ig extends at {
  constructor(e, t, n, r, i, s, a, c, h, l) {
    super(e, t, n, r, i, s, a, h, l), this.nativeStorage = c;
  }
  /**
   * Redirects the page to the /authorize endpoint of the IDP
   * @param request
   */
  async acquireToken(e) {
    const t = await u(Nn, Rn, this.logger, this.performanceClient, this.correlationId)(e, C.Redirect, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    t.platformBroker = St(this.config, this.logger, this.correlationId, this.platformAuthProvider, e.authenticationScheme);
    const n = (i) => {
      i.persisted && (this.logger.verbose("0udvtt", this.correlationId), this.browserStorage.resetRequestCache(this.correlationId), this.eventHandler.emitEvent(y.RESTORE_FROM_BFCACHE, C.Redirect));
    }, r = this.getRedirectStartPage(e.redirectStartPage);
    this.logger.verbosePii("0zao0a", this.correlationId), this.browserStorage.setTemporaryCache(M.ORIGIN_URI, r, !0), window.addEventListener("pageshow", n);
    try {
      this.config.system.protocolMode === J.EAR ? await this.executeEarFlow(t) : await this.executeCodeFlow(t);
    } catch (i) {
      throw i instanceof A && i.setCorrelationId(this.correlationId), window.removeEventListener("pageshow", n), i;
    }
  }
  /**
   * Executes auth code + PKCE flow
   * @param request
   * @returns
   */
  async executeCodeFlow(e) {
    const t = e.correlationId, n = W(_.acquireTokenRedirect, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), r = await u($e, Ve, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), i = {
      ...e,
      codeChallenge: r.challenge
    };
    this.browserStorage.cacheAuthorizeRequest(i, this.correlationId, r.verifier);
    try {
      if (i.httpMethod === qe.POST)
        return await this.executeCodeFlowWithPost(i);
      {
        const s = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, this.correlationId)({
          serverTelemetryManager: n,
          requestAuthority: i.authority,
          requestAzureCloudOptions: i.azureCloudOptions,
          requestExtraQueryParameters: i.extraQueryParameters,
          account: i.account
        }), a = await u(vo, $r, this.logger, this.performanceClient, e.correlationId)(this.config, s.authority, i, this.logger, this.performanceClient);
        return await this.initiateAuthRequest(a);
      }
    } catch (s) {
      throw s instanceof A && (s.setCorrelationId(this.correlationId), n.cacheFailedRequest(s)), s;
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e) {
    const { correlationId: t, authority: n, azureCloudOptions: r, extraQueryParameters: i, account: s } = e, a = await u(Ee, Be, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, i, s), c = await u(lo, wo, this.logger, this.performanceClient, t)(), h = await u($e, Ve, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), l = {
      ...e,
      earJwk: c,
      codeChallenge: h.challenge
    };
    return this.browserStorage.cacheAuthorizeRequest(l, this.correlationId, h.verifier), (await bo(document, this.config, a, l, this.logger, this.performanceClient)).submit(), new Promise((g, f) => {
      setTimeout(() => {
        f(m(Tt, "failed_to_redirect"));
      }, this.config.system.redirectNavigationTimeout);
    });
  }
  /**
   * Executes classic Authorization Code flow with a POST request.
   * @param request
   */
  async executeCodeFlowWithPost(e) {
    const t = e.correlationId, n = await u(Ee, Be, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger);
    return this.browserStorage.cacheAuthorizeRequest(e, this.correlationId), (await Ro(document, this.config, n, e, this.logger, this.performanceClient)).submit(), new Promise((i, s) => {
      setTimeout(() => {
        s(m(Tt, "failed_to_redirect"));
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
    const i = W(_.handleRedirectPromise, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), s = (r == null ? void 0 : r.navigateToLoginRequestUrl) ?? !0;
    try {
      const [a, c] = this.getRedirectResponse((r == null ? void 0 : r.hash) || "");
      if (!a)
        return this.logger.info("1qmv0q", this.correlationId), this.browserStorage.resetRequestCache(this.correlationId), og() !== "back_forward" ? n.event.errorCode = "no_server_response" : this.logger.verbose("1eqegq", this.correlationId), null;
      const h = this.browserStorage.getTemporaryCache(M.ORIGIN_URI, this.correlationId, !0) || "", l = Yo(h), d = Yo(window.location.href);
      if (l === d && s)
        return this.logger.verbose("11yred", this.correlationId), h.indexOf("#") > -1 && Ha(h), await this.handleResponse(a, e, t, i);
      if (s) {
        if (!Pt() || this.config.system.allowRedirectInIframe) {
          this.browserStorage.setTemporaryCache(M.URL_HASH, c, !0);
          const g = {
            apiId: _.handleRedirectPromise,
            timeout: this.config.system.redirectNavigationTimeout,
            noHistory: !0
          };
          let f = !0;
          if (!h || h === "null") {
            const w = Ba();
            this.browserStorage.setTemporaryCache(M.ORIGIN_URI, w, !0), this.logger.warning("1dutq1", this.correlationId), f = await this.navigationClient.navigateInternal(w, g);
          } else
            this.logger.verbose("08jpy1", this.correlationId), f = await this.navigationClient.navigateInternal(h, g);
          if (!f)
            return await this.handleResponse(a, e, t, i);
        }
      } else return this.logger.verbose("0v4sdv", this.correlationId), await this.handleResponse(a, e, t, i);
      return null;
    } catch (a) {
      throw a instanceof A && (a.setCorrelationId(this.correlationId), i.cacheFailedRequest(a)), a;
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
    t || (this.config.auth.OIDCOptions.responseMode === ln.QUERY ? t = window.location.search : t = window.location.hash);
    let n = Qt(t);
    if (n) {
      try {
        Du(n, this.browserCrypto, C.Redirect);
      } catch (i) {
        return i instanceof A && this.logger.error("0bkq6p", this.correlationId), [null, ""];
      }
      return fo(window), this.logger.verbose("00uvho", this.correlationId), [n, t];
    }
    const r = this.browserStorage.getTemporaryCache(M.URL_HASH, this.correlationId, !0);
    return this.browserStorage.removeItem(this.browserStorage.generateCacheKey(M.URL_HASH)), r && (n = Qt(r), n) ? (this.logger.verbose("001671", this.correlationId), [n, r]) : [null, ""];
  }
  /**
   * Checks if hash exists and handles in window.
   * @param hash
   * @param state
   */
  async handleResponse(e, t, n, r) {
    if (!e.state)
      throw m(Sn);
    const { authority: s, azureCloudOptions: a, extraQueryParameters: c, account: h } = t;
    if (e.ear_jwe) {
      const d = await u(Ee, Be, this.logger, this.performanceClient, t.correlationId)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, s, a, c, h);
      return u(Oo, Co, this.logger, this.performanceClient, t.correlationId)(t, e, _.acquireTokenRedirect, this.config, d, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    }
    const l = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, this.correlationId)({ serverTelemetryManager: r, requestAuthority: t.authority });
    return u(nt, Ze, this.logger, this.performanceClient, t.correlationId)(t, e, n, _.acquireTokenRedirect, this.config, l, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
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
        apiId: _.acquireTokenRedirect,
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
      throw this.logger.info("0rlh4e", this.correlationId), m(En);
  }
  /**
   * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param logoutRequest
   */
  async logout(e) {
    var r, i;
    this.logger.verbose("1rkurh", this.correlationId);
    const t = this.initializeLogoutRequest(e), n = W(_.logout, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger);
    try {
      this.eventHandler.emitEvent(y.LOGOUT_START, C.Redirect, e), await So(this.browserStorage, this.browserCrypto, this.logger, this.correlationId, t.account);
      const s = {
        apiId: _.logout,
        timeout: this.config.system.redirectNavigationTimeout,
        noHistory: !1
      }, a = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, this.correlationId)({
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
      (i = t.account) != null && i.homeAccountId && this.eventHandler.emitEvent(y.LOGOUT_SUCCESS, C.Redirect, t);
      const h = this.config.auth.onRedirectNavigate;
      if (typeof h == "function")
        if (h(c) !== !1) {
          this.logger.verbose("06v57e", this.correlationId), this.browserStorage.getInteractionInProgress() || this.browserStorage.setInteractionInProgress(!0, Pe.SIGNOUT), await this.navigationClient.navigateExternal(c, s);
          return;
        } else
          this.browserStorage.setInteractionInProgress(!1), this.logger.verbose("0xqes1", this.correlationId);
      else {
        this.browserStorage.getInteractionInProgress() || this.browserStorage.setInteractionInProgress(!0, Pe.SIGNOUT), await this.navigationClient.navigateExternal(c, s);
        return;
      }
    } catch (s) {
      throw s instanceof A && (s.setCorrelationId(this.correlationId), n.cacheFailedRequest(s)), this.eventHandler.emitEvent(y.LOGOUT_FAILURE, C.Redirect, null, s), this.eventHandler.emitEvent(y.LOGOUT_END, C.Redirect), s;
    }
    this.eventHandler.emitEvent(y.LOGOUT_END, C.Redirect);
  }
  /**
   * Use to get the redirectStartPage either from request or use current window
   * @param requestStartPage
   */
  getRedirectStartPage(e) {
    const t = e || window.location.href;
    return k.getAbsoluteUrl(t, Te());
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
async function sg(o, e, t, n) {
  if (!o)
    throw t.info("1l7hyp", n), m(En);
  return ie(hg, Xd, t, e, n)(o);
}
async function ag(o, e, t, n, r) {
  const i = No();
  if (!i.contentDocument)
    throw "No document associated with iframe!";
  return (await Ro(i.contentDocument, o, e, t, n, r)).submit(), i;
}
async function cg(o, e, t, n, r) {
  const i = No();
  if (!i.contentDocument)
    throw "No document associated with iframe!";
  return (await bo(i.contentDocument, o, e, t, n, r)).submit(), i;
}
function hg(o) {
  const e = No();
  return e.src = o, e;
}
function No() {
  const o = document.createElement("iframe");
  return o.className = "msalSilentIframe", o.style.visibility = "hidden", o.style.position = "absolute", o.style.width = o.style.height = "0", o.style.border = "0", o.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), o.setAttribute("allow", "local-network-access *"), document.body.appendChild(o), o;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class lg extends at {
  constructor(e, t, n, r, i, s, a, c, h, l, d) {
    super(e, t, n, r, i, s, c, l, d), this.apiId = a, this.nativeStorage = h;
  }
  /**
   * Acquires a token silently by opening a hidden iframe to the /authorize endpoint with prompt=none or prompt=no_session
   * @param request
   */
  async acquireToken(e) {
    !e.loginHint && !e.sid && (!e.account || !e.account.username) && this.logger.warning("1kl318", this.correlationId);
    const t = { ...e };
    t.prompt ? t.prompt !== V.NONE && t.prompt !== V.NO_SESSION && (this.logger.warning("0bmctg", this.correlationId), t.prompt = V.NONE) : t.prompt = V.NONE;
    const n = await u(Nn, Rn, this.logger, this.performanceClient, this.correlationId)(t, C.Silent, this.config, this.browserCrypto, this.browserStorage, this.logger, this.performanceClient, this.correlationId);
    return n.platformBroker = St(this.config, this.logger, this.correlationId, this.platformAuthProvider, n.authenticationScheme), mo(n.authority), this.config.system.protocolMode === J.EAR ? this.executeEarFlow(n) : this.executeCodeFlow(n);
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
      return t = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, e.correlationId)({
        serverTelemetryManager: n,
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account
      }), await u(this.silentTokenHelper.bind(this), yi, this.logger, this.performanceClient, e.correlationId)(t, e);
    } catch (r) {
      if (r instanceof A && (r.setCorrelationId(this.correlationId), n.cacheFailedRequest(r)), !t || !(r instanceof A) || r.errorCode !== q.INVALID_GRANT_ERROR)
        throw r;
      return this.performanceClient.addFields({
        retryError: r.errorCode
      }, this.correlationId), await u(this.silentTokenHelper.bind(this), yi, this.logger, this.performanceClient, this.correlationId)(t, e);
    }
  }
  /**
   * Executes EAR flow
   * @param request
   */
  async executeEarFlow(e) {
    const { correlationId: t, authority: n, azureCloudOptions: r, extraQueryParameters: i, account: s } = e, a = await u(Ee, Be, this.logger, this.performanceClient, t)(this.config, this.correlationId, this.performanceClient, this.browserStorage, this.logger, n, r, i, s), c = await u(lo, wo, this.logger, this.performanceClient, t)(), h = await u($e, Ve, this.logger, this.performanceClient, t)(this.performanceClient, this.logger, t), l = {
      ...e,
      earJwk: c,
      codeChallenge: h.challenge
    };
    await u(cg, Fn, this.logger, this.performanceClient, t)(this.config, a, l, this.logger, this.performanceClient);
    const d = this.config.auth.OIDCOptions.responseMode, g = await u(Ke, on, this.logger, this.performanceClient, t)(this.config.system.iframeBridgeTimeout, this.logger, this.browserCrypto, e), f = ie(pt, ft, this.logger, this.performanceClient, t)(g, d, this.logger, this.correlationId);
    if (!f.ear_jwe && f.code) {
      const w = await u(this.createAuthCodeClient.bind(this), De, this.logger, this.performanceClient, t)({
        serverTelemetryManager: W(this.apiId, this.config.auth.clientId, t, this.browserStorage, this.logger),
        requestAuthority: e.authority,
        requestAzureCloudOptions: e.azureCloudOptions,
        requestExtraQueryParameters: e.extraQueryParameters,
        account: e.account,
        authority: a
      });
      return u(nt, Ze, this.logger, this.performanceClient, t)(l, f, h.verifier, this.apiId, this.config, w, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
    } else
      return u(Oo, Co, this.logger, this.performanceClient, t)(l, f, this.apiId, this.config, a, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(kn));
  }
  /**
   * Helper which acquires an authorization code silently using a hidden iframe from given url
   * using the scopes requested as part of the id, and exchanges the code for a set of OAuth tokens.
   * @param navigateUrl
   * @param userRequestScopes
   */
  async silentTokenHelper(e, t) {
    const n = t.correlationId, r = await u($e, Ve, this.logger, this.performanceClient, n)(this.performanceClient, this.logger, n), i = {
      ...t,
      codeChallenge: r.challenge
    };
    if (t.httpMethod === qe.POST)
      await u(ag, Fn, this.logger, this.performanceClient, n)(this.config, e.authority, i, this.logger, this.performanceClient);
    else {
      const h = await u(vo, $r, this.logger, this.performanceClient, n)(this.config, e.authority, i, this.logger, this.performanceClient);
      await u(sg, Fn, this.logger, this.performanceClient, n)(h, this.performanceClient, this.logger, n);
    }
    const s = this.config.auth.OIDCOptions.responseMode, a = await u(Ke, on, this.logger, this.performanceClient, n)(this.config.system.iframeBridgeTimeout, this.logger, this.browserCrypto, t), c = ie(pt, ft, this.logger, this.performanceClient, n)(a, s, this.logger, this.correlationId);
    return u(nt, Ze, this.logger, this.performanceClient, n)(t, c, r.verifier, this.apiId, this.config, e, this.browserStorage, this.nativeStorage, this.eventHandler, this.logger, this.performanceClient, this.platformAuthProvider);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class dg extends at {
  /**
   * Exchanges the refresh token for new tokens
   * @param request
   */
  async acquireToken(e) {
    const t = await u(ko, yo, this.logger, this.performanceClient, e.correlationId)(e, this.config, this.performanceClient, this.logger, this.correlationId), n = {
      ...e,
      ...t
    };
    e.redirectUri && (n.redirectUri = sn(e.redirectUri, this.config.auth.redirectUri, this.logger, this.correlationId));
    const r = W(_.acquireTokenSilent_silentFlow, this.config.auth.clientId, this.correlationId, this.browserStorage, this.logger), i = await this.createRefreshTokenClient({
      serverTelemetryManager: r,
      authorityUrl: n.authority,
      azureCloudOptions: n.azureCloudOptions,
      account: n.account
    });
    return u(i.acquireTokenByRefreshToken.bind(i), Qd, this.logger, this.performanceClient, e.correlationId)(n).catch((s) => {
      throw s.setCorrelationId(this.correlationId), r.cacheFailedRequest(s), s;
    });
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(kn));
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
    const t = await u(this.getClientConfiguration.bind(this), bn, this.logger, this.performanceClient, this.correlationId)({
      serverTelemetryManager: e.serverTelemetryManager,
      requestAuthority: e.authorityUrl,
      requestAzureCloudOptions: e.azureCloudOptions,
      requestExtraQueryParameters: e.extraQueryParameters,
      account: e.account
    });
    return new Zl(t, this.performanceClient);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class ug extends Ys {
  constructor(e, t) {
    super(e, t), this.includeRedirectUri = !1;
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class gg extends at {
  constructor(e, t, n, r, i, s, a, c, h, l) {
    super(e, t, n, r, i, s, c, h, l), this.apiId = a;
  }
  /**
   * Acquires a token silently by redeeming an authorization code against the /token endpoint
   * @param request
   */
  async acquireToken(e) {
    if (!e.code)
      throw m(wa);
    const t = await u(Nn, Rn, this.logger, this.performanceClient, this.correlationId)(
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
      }, i = await u(this.getClientConfiguration.bind(this), bn, this.logger, this.performanceClient, this.correlationId)({
        serverTelemetryManager: n,
        requestAuthority: t.authority,
        requestAzureCloudOptions: t.azureCloudOptions,
        requestExtraQueryParameters: t.extraQueryParameters,
        account: t.account
      }), s = new ug(i, this.performanceClient);
      this.logger.verbose("1uic5e", this.correlationId);
      const a = new ic(s, this.browserStorage, r, this.logger, this.performanceClient);
      return await u(a.handleCodeResponseFromServer.bind(a), zs, this.logger, this.performanceClient, this.correlationId)({
        code: e.code,
        msgraph_host: e.msGraphHost,
        cloud_graph_host_name: e.cloudGraphHostName,
        cloud_instance_host_name: e.cloudInstanceHostName
      }, t, !1);
    } catch (r) {
      throw r instanceof A && (r.setCorrelationId(this.correlationId), n.cacheFailedRequest(r)), r;
    }
  }
  /**
   * Currently Unsupported
   */
  logout() {
    return Promise.reject(m(kn));
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function fg(o, e, t, n) {
  var a;
  const r = (
    // @ts-ignore
    ((a = window.msal) == null ? void 0 : a.clientIds) || []
  ), i = r.length, s = r.filter((c) => c === o).length;
  s > 1 && t.warning("1e88vg", n), e.add({
    msalInstanceCount: i,
    sameClientIdInstanceCount: s
  });
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function Lt(o, e, t) {
  try {
    vn(o);
  } catch (n) {
    throw e.end({ success: !1 }, n, t), n;
  }
}
class Mo {
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
    this.operatingContext = e, this.isBrowserEnvironment = this.operatingContext.isBrowserEnvironment(), this.config = e.getConfig(), this.initialized = !1, this.logger = this.operatingContext.getLogger(), this.networkClient = this.config.system.networkClient, this.navigationClient = this.config.system.navigationClient, this.redirectResponse = /* @__PURE__ */ new Map(), this.hybridAuthCodeResponses = /* @__PURE__ */ new Map(), this.performanceClient = this.config.telemetry.client, this.browserCrypto = this.isBrowserEnvironment ? new se(this.logger, this.performanceClient) : yt, this.eventHandler = new Eo(this.logger), this.browserStorage = this.isBrowserEnvironment ? new Et(this.config.auth.clientId, this.config.cache, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler, Qr(this.config.auth)) : Za(this.config.auth.clientId, this.logger, this.performanceClient, this.eventHandler);
    const t = {
      cacheLocation: Z.MemoryStorage,
      cacheRetentionDays: 5
    };
    this.nativeInternalStorage = new Et(this.config.auth.clientId, t, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler), this.activeSilentTokenRequests = /* @__PURE__ */ new Map(), this.trackPageVisibility = this.trackPageVisibility.bind(this), this.trackPageVisibilityWithMeasurement = this.trackPageVisibilityWithMeasurement.bind(this);
  }
  static async createController(e, t) {
    const n = new Mo(e);
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
    const n = (e == null ? void 0 : e.correlationId) || this.getRequestCorrelationId(), r = this.config.system.allowPlatformBroker, i = this.performanceClient.startMeasurement(Qa, n);
    if (this.eventHandler.emitEvent(y.INITIALIZE_START), this.logMultipleInstances(i, n), await u(this.browserStorage.initialize.bind(this.browserStorage), qd, this.logger, this.performanceClient, n)(n), r)
      try {
        this.platformAuthProvider = await dc(this.logger, this.performanceClient, n, this.config.system.nativeBrokerHandshakeTimeout);
      } catch (s) {
        this.logger.verbose(s, n);
      }
    this.config.cache.cacheLocation === Z.LocalStorage && this.eventHandler.subscribeCrossTab(), !this.config.system.navigatePopups && await this.preGeneratePkceCodes(n), this.initialized = !0, this.eventHandler.emitEvent(y.INITIALIZE_END), i.end({
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
    if (this.logger.verbose("02l8bm", ""), po(this.initialized), this.isBrowserEnvironment) {
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
    if (((c = this.browserStorage.getInteractionInProgress()) == null ? void 0 : c.type) === Pe.SIGNOUT)
      return this.logger.verbose("1ywcv2", ""), this.browserStorage.setInteractionInProgress(!1), Promise.resolve(null);
    const n = this.getAllAccounts(), r = this.browserStorage.getCachedNativeRequest(), i = r && this.platformAuthProvider && !(e != null && e.hash);
    let s;
    this.eventHandler.emitEvent(y.HANDLE_REDIRECT_START, C.Redirect);
    let a;
    try {
      if (i && this.platformAuthProvider) {
        const h = (r == null ? void 0 : r.correlationId) || "";
        s = this.performanceClient.startMeasurement(Kt, h), this.logger.trace("12v7is", h);
        const l = new zt(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, _.handleRedirectPromise, this.performanceClient, this.platformAuthProvider, r.accountId, this.nativeInternalStorage, r.correlationId);
        a = u(l.handleRedirectPromise.bind(l), su, this.logger, this.performanceClient, s.event.correlationId)(this.performanceClient, s.event.correlationId);
      } else {
        const [h, l] = this.browserStorage.getCachedRequest(""), d = h.correlationId;
        s = this.performanceClient.startMeasurement(Kt, d), this.logger.trace("0znzs5", d);
        const g = this.createRedirectClient(d);
        a = u(g.handleRedirectPromise.bind(g), iu, this.logger, this.performanceClient, s.event.correlationId)(h, l, s, e);
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
    const n = this.performanceClient.startMeasurement(Wa, t);
    n.add({
      scenarioId: e.scenarioId
    });
    const r = this.config.auth.onRedirectNavigate;
    this.config.auth.onRedirectNavigate = (i) => {
      const s = typeof r == "function" ? r(i) : void 0;
      return n.add({
        navigateCallbackResult: s !== !1
      }), n.event = n.end({ success: !0 }, void 0, e.account) || n.event, s;
    };
    try {
      ir(this.initialized, this.config), this.browserStorage.setInteractionInProgress(!0, Pe.SIGNIN), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Redirect, e);
      let i;
      return this.platformAuthProvider && this.canUsePlatformBroker(e) ? i = new zt(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, _.acquireTokenRedirect, this.performanceClient, this.platformAuthProvider, this.getNativeAccountId(e), this.nativeInternalStorage, t).acquireTokenRedirect(e, n).catch((a) => {
        if (a instanceof fe && Ye(a))
          return this.platformAuthProvider = void 0, this.createRedirectClient(t).acquireToken(e);
        if (a instanceof ee)
          return this.logger.verbose("1ipyz4", t), this.createRedirectClient(t).acquireToken(e);
        throw a;
      }) : i = this.createRedirectClient(t).acquireToken(e), await i;
    } catch (i) {
      throw this.browserStorage.resetRequestCache(t), n.event.status === 2 ? this.performanceClient.startMeasurement(Kt, t).end({ success: !1 }, i, e.account) : n.end({ success: !1 }, i, e.account), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Redirect, null, i), i;
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
    const t = this.getRequestCorrelationId(e), n = this.performanceClient.startMeasurement(To, t);
    n.add({
      scenarioId: e.scenarioId
    });
    try {
      this.logger.verbose("0ch87b", t), Lt(this.initialized, n, e.account), this.browserStorage.setInteractionInProgress(!0, Pe.SIGNIN, e.overrideInteractionInProgress, t);
    } catch (a) {
      return Promise.reject(a);
    }
    const r = this.getAllAccounts();
    this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Popup, e);
    let i;
    const s = this.getPreGeneratedPkceCodes(t);
    return this.canUsePlatformBroker(e) ? i = this.acquireTokenNative({
      ...e,
      correlationId: t
    }, _.acquireTokenPopup).then((a) => (n.end({
      success: !0,
      isNativeBroker: !0
    }, void 0, a.account), a)).catch((a) => {
      if (a instanceof fe && Ye(a))
        return this.platformAuthProvider = void 0, this.createPopupClient(t).acquireToken(e, s);
      if (a instanceof ee)
        return this.logger.verbose("0yy5fw", t), this.createPopupClient(t).acquireToken(e, s);
      throw a;
    }) : i = this.createPopupClient(t).acquireToken(e, s), i.then((a) => {
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
    this.ssoSilentMeasurement = this.performanceClient.startMeasurement(Ao, t), (s = this.ssoSilentMeasurement) == null || s.add({
      scenarioId: e.scenarioId
    }), Lt(this.initialized, this.ssoSilentMeasurement, e.account), (a = this.ssoSilentMeasurement) == null || a.increment({
      visibilityChangeCount: 0
    }), document.addEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
    const r = this.getAllAccounts();
    this.logger.verbose("0w1b45", t), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, n);
    let i;
    return this.canUsePlatformBroker(n) ? i = this.acquireTokenNative(n, _.ssoSilent).catch((c) => {
      if (c instanceof fe && Ye(c))
        return this.platformAuthProvider = void 0, this.createSilentIframeClient(n.correlationId).acquireToken(n);
      throw c;
    }) : i = this.createSilentIframeClient(n.correlationId).acquireToken(n), i.then((c) => {
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
    const n = this.performanceClient.startMeasurement(Ja, t);
    Lt(this.initialized, n), this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_START, C.Silent, e), n.add({ scenarioId: e.scenarioId });
    try {
      if (e.code && e.nativeAccountId)
        throw m(Ta);
      if (e.code) {
        const r = e.code;
        let i = this.hybridAuthCodeResponses.get(r);
        return i ? (this.logger.verbose("0qgp28", t), n.discard()) : (this.logger.verbose("06eh73", t), i = this.acquireTokenByCodeAsync({
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
        }), this.hybridAuthCodeResponses.set(r, i)), await i;
      } else if (e.nativeAccountId)
        if (this.canUsePlatformBroker(e, e.nativeAccountId)) {
          const r = await this.acquireTokenNative({
            ...e,
            correlationId: t
          }, _.acquireTokenByCode, e.nativeAccountId).catch((i) => {
            throw i instanceof fe && Ye(i) && (this.platformAuthProvider = void 0), i;
          });
          return n.end({
            success: !0
          }, void 0, r.account), r;
        } else
          throw m(Aa);
      else
        throw m(Ia);
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
    var i;
    const t = this.getRequestCorrelationId(e);
    return this.logger.trace("10d9hy", t), this.acquireTokenByCodeAsyncMeasurement = this.performanceClient.startMeasurement(ou, t), (i = this.acquireTokenByCodeAsyncMeasurement) == null || i.increment({
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
        return u(n.acquireToken.bind(n), Vd, this.logger, this.performanceClient, e.correlationId)(e);
      default:
        throw p(Ue);
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
        return u(n.acquireToken.bind(n), Wd, this.logger, this.performanceClient, e.correlationId)(e);
      default:
        throw p(Ue);
    }
  }
  /**
   * Attempt to acquire an access token via an iframe
   * @param request CommonSilentFlowRequest
   * @returns A promise that, when resolved, returns the access token
   */
  async acquireTokenBySilentIframe(e) {
    const t = this.createSilentIframeClient(e.correlationId);
    return u(t.acquireToken.bind(t), $d, this.logger, this.performanceClient, e.correlationId)(e);
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
    return ir(this.initialized, this.config), this.browserStorage.setInteractionInProgress(!0, Pe.SIGNOUT), this.createRedirectClient(t).logout(e);
  }
  /**
   * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
   * @param logoutRequest
   */
  logoutPopup(e) {
    try {
      const t = this.getRequestCorrelationId(e);
      return vn(this.initialized), this.browserStorage.setInteractionInProgress(!0, Pe.SIGNOUT), this.createPopupClient(t).logout(e).finally(() => {
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
    return ec(this.logger, this.browserStorage, this.isBrowserEnvironment, this.getRequestCorrelationId(), e);
  }
  /**
   * Returns the first account found in the cache that matches the account filter passed in.
   * @param accountFilter
   * @returns The first account found in the cache matching the provided filter or null if no account could be found.
   */
  getAccount(e) {
    return ar(e, this.logger, this.browserStorage, this.getRequestCorrelationId());
  }
  /**
   * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
   * @param account
   */
  setActiveAccount(e) {
    tc(e, this.browserStorage, this.getRequestCorrelationId());
  }
  /**
   * Gets the currently active account
   */
  getActiveAccount() {
    return nc(this.browserStorage, this.getRequestCorrelationId());
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
    const n = Br(e.account, e.cloudGraphHostName, e.msGraphHost);
    return await this.browserStorage.setAccount(n, e.correlationId, ue(e.idTokenClaims)), e.fromPlatformBroker ? (this.logger.verbose("1fxyu8", e.correlationId), this.nativeInternalStorage.hydrateCache(e, t)) : this.browserStorage.hydrateCache(e, t);
  }
  // #region Helpers
  /**
   * Acquire a token from native device (e.g. WAM)
   * @param request
   */
  async acquireTokenNative(e, t, n, r) {
    const i = this.getRequestCorrelationId(e);
    if (this.logger.trace("0b9y3p", i), !this.platformAuthProvider)
      throw m(io);
    return new zt(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, t, this.performanceClient, this.platformAuthProvider, n || this.getNativeAccountId(e), this.nativeInternalStorage, i).acquireToken(e, r);
  }
  /**
   * Returns boolean indicating if this request can use the platform broker
   * @param request
   */
  canUsePlatformBroker(e, t) {
    const n = this.getRequestCorrelationId(e);
    if (this.logger.trace("1n9lbl", n), !this.platformAuthProvider)
      return this.logger.trace("0vnu11", n), !1;
    if (!St(this.config, this.logger, n, this.platformAuthProvider, e.authenticationScheme))
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
    return new rg(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Redirect Interaction Client
   * @param correlationId
   */
  createRedirectClient(e) {
    return new ig(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Iframe Interaction Client
   * @param correlationId
   */
  createSilentIframeClient(e) {
    return new lg(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, _.ssoSilent, this.performanceClient, this.nativeInternalStorage, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Cache Interaction Client
   */
  createSilentCacheClient(e) {
    return new sc(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent Refresh Interaction Client
   */
  createSilentRefreshClient(e) {
    return new dg(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, e, this.platformAuthProvider);
  }
  /**
   * Returns new instance of the Silent AuthCode Interaction Client
   */
  createSilentAuthCodeClient(e) {
    return new gg(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, _.acquireTokenByCode, this.performanceClient, e, this.platformAuthProvider);
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
    return _n(), this.performanceClient.addPerformanceCallback(e);
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
      ...e || tr
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
      ...e || tr
    });
  }
  /**
   * Silently acquire an access token for a given set of scopes. Returns currently processing promise if parallel requests are made.
   *
   * @param {@link (SilentRequest:type)}
   * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
   */
  async acquireTokenSilent(e) {
    const t = this.getRequestCorrelationId(e), n = this.performanceClient.startMeasurement(Io, t);
    n.add({
      cacheLookupPolicy: e.cacheLookupPolicy,
      scenarioId: e.scenarioId
    }), Lt(this.initialized, n, e.account), this.logger.verbose("0x1c4s", t);
    const r = e.account || this.getActiveAccount();
    if (!r)
      throw m(ga);
    return this.acquireTokenSilentDeduped(e, r, t).then((i) => (n.end({
      success: !0,
      fromCache: i.fromCache,
      isNativeBroker: i.fromPlatformBroker,
      accessTokenSize: i.accessToken.length,
      idTokenSize: i.idToken.length
    }, void 0, i.account), {
      ...i,
      state: e.state,
      correlationId: t
      // Ensures PWB scenarios can correctly match request to response
    })).catch((i) => {
      throw i instanceof A && i.setCorrelationId(t), n.end({
        success: !1
      }, i, r), i;
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
    const r = wn(this.config.auth.clientId, {
      ...e,
      authority: e.authority || this.config.auth.authority
    }, t.homeAccountId), i = JSON.stringify(r), s = this.activeSilentTokenRequests.get(i);
    if (typeof s > "u") {
      this.logger.verbose("0fcjbk", n), this.performanceClient.addFields({ deduped: !1 }, n);
      const a = u(this.acquireTokenSilentAsync.bind(this), zd, this.logger, this.performanceClient, n)({
        ...e,
        correlationId: n
      }, t);
      return this.activeSilentTokenRequests.set(i, a), a.finally(() => {
        this.activeSilentTokenRequests.delete(i);
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
    const r = await u(Uu, Yd, this.logger, this.performanceClient, e.correlationId)(e, t, this.config, this.performanceClient, this.logger), i = e.cacheLookupPolicy || U.Default;
    return this.acquireTokenSilentNoIframe(r, i).catch(async (a) => {
      if (pg(a, i))
        if (this.activeIframeRequest)
          if (i !== U.Skip) {
            const [h, l] = this.activeIframeRequest;
            this.logger.verbose("1w8fso", r.correlationId);
            const d = this.performanceClient.startMeasurement(Jd, r.correlationId);
            d.add({
              awaitIframeCorrelationId: l
            });
            const g = await h;
            if (d.end({
              success: g
            }), g)
              return this.logger.verbose("0ywzzi", r.correlationId), this.acquireTokenSilentNoIframe(r, i);
            throw this.logger.info("17y14q", r.correlationId), a;
          } else
            return this.logger.warning("1bd4p8", r.correlationId), u(this.acquireTokenBySilentIframe.bind(this), mi, this.logger, this.performanceClient, r.correlationId)(r);
        else {
          let h;
          return this.activeIframeRequest = [
            new Promise((l) => {
              h = l;
            }),
            r.correlationId
          ], this.logger.verbose("0rh08z", r.correlationId), u(this.acquireTokenBySilentIframe.bind(this), mi, this.logger, this.performanceClient, r.correlationId)(r).then((l) => (h(!0), l)).catch((l) => {
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
    return St(this.config, this.logger, e.correlationId, this.platformAuthProvider, e.authenticationScheme) && e.account.nativeAccountId ? (this.logger.verbose("0sczo4", e.correlationId), this.acquireTokenNative(e, _.acquireTokenSilent_silentFlow, e.account.nativeAccountId, t).catch(async (n) => {
      throw n instanceof fe && Ye(n) ? (this.logger.verbose("07rkmb", e.correlationId), this.platformAuthProvider = void 0, p(Ue)) : n;
    })) : (this.logger.verbose("0ox81t", e.correlationId), t === U.AccessToken && this.logger.verbose("0fvwxe", e.correlationId), u(this.acquireTokenFromCache.bind(this), Fd, this.logger, this.performanceClient, e.correlationId)(e, t).catch((n) => {
      if (t === U.AccessToken)
        throw n;
      return this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_NETWORK_START, C.Silent, e), u(this.acquireTokenByRefreshToken.bind(this), Bd, this.logger, this.performanceClient, e.correlationId)(e, t);
    }));
  }
  /**
   * Pre-generates PKCE codes and stores it in local variable
   * @param correlationId
   */
  async preGeneratePkceCodes(e) {
    return this.logger.verbose("1x6uj6", e), this.pkceCode = await u($e, Ve, this.logger, this.performanceClient, e)(this.performanceClient, this.logger, e), Promise.resolve();
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
    window.msal = window.msal || {}, window.msal.clientIds = window.msal.clientIds || [], window.msal.clientIds.length > 0 && this.logger.verbose("1qtz3l", t), window.msal.clientIds.push(n), fg(n, e, this.logger, t);
  }
}
function pg(o, e) {
  const t = !(o instanceof ee && // For refresh token errors, bad_token does not always require interaction (silently resolvable)
  o.subError !== pn), n = o.errorCode === q.INVALID_GRANT_ERROR || o.errorCode === Ue, r = t && n || o.errorCode === Xt || o.errorCode === Gr, i = Id.includes(e);
  return r && i;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Mn {
  static loggerCallback(e, t) {
    switch (e) {
      case R.Error:
        console.error(t);
        return;
      case R.Info:
        console.info(t);
        return;
      case R.Verbose:
        console.debug(t);
        return;
      case R.Warning:
        console.warn(t);
        return;
      default:
        console.log(t);
        return;
    }
  }
  constructor(e) {
    var c;
    this.browserEnvironment = typeof window < "u", this.config = lc(e, this.browserEnvironment);
    let t;
    try {
      t = window[Z.SessionStorage];
    } catch {
    }
    const n = t == null ? void 0 : t.getItem(Su), r = (c = t == null ? void 0 : t.getItem(ku)) == null ? void 0 : c.toLowerCase(), i = r === "true" ? !0 : r === "false" ? !1 : void 0, s = { ...this.config.system.loggerOptions }, a = n && Object.keys(R).includes(n) ? R[n] : void 0;
    a && (s.loggerCallback = Mn.loggerCallback, s.logLevel = a), i !== void 0 && (s.piiLoggingEnabled = i), this.logger = new Q(s, At, ae), this.available = !1;
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
class ot extends Mn {
  /**
   * Return the module name.  Intended for use with import() to enable dynamic import
   * of the implementation associated with this operating context
   * @returns
   */
  getModuleName() {
    return ot.MODULE_NAME;
  }
  /**
   * Returns the unique identifier for this operating context
   * @returns string
   */
  getId() {
    return ot.ID;
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
ot.MODULE_NAME = "";
ot.ID = "StandardOperatingContext";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
function mg(o) {
  return o.status !== void 0;
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
class yg {
  constructor(e, t, n, r) {
    this.clientId = e, this.clientCapabilities = t, this.crypto = n, this.logger = r;
  }
  toNaaTokenRequest(e) {
    var a;
    let t;
    e.extraQueryParameters === void 0 ? t = /* @__PURE__ */ new Map() : t = new Map(Object.entries(e.extraQueryParameters));
    const n = e.correlationId || this.crypto.createNewGuid(), r = xr(e.claims, this.clientCapabilities), i = e.scopes || Se;
    return {
      platformBrokerId: (a = e.account) == null ? void 0 : a.homeAccountId,
      clientId: this.clientId,
      authority: e.authority,
      scope: i.join(" "),
      correlationId: n,
      claims: X.isEmptyObj(r) ? void 0 : r,
      state: e.state,
      authenticationScheme: e.authenticationScheme || S.BEARER,
      extraParameters: t
    };
  }
  fromNaaTokenResponse(e, t, n) {
    if (!t.token.id_token || !t.token.access_token)
      throw p($t);
    const r = Ae(n + (t.token.expires_in || 0)), i = oe(t.token.id_token, this.crypto.base64Decode), s = this.fromNaaAccountInfo(t.account, t.token.id_token, i), a = t.token.scope || e.scope;
    return {
      authority: t.token.authority || s.environment,
      uniqueId: s.localAccountId,
      tenantId: s.tenantId,
      scopes: a.split(" "),
      account: s,
      idToken: t.token.id_token,
      idTokenClaims: i,
      accessToken: t.token.access_token,
      fromCache: !1,
      expiresOn: r,
      tokenType: e.authenticationScheme || S.BEARER,
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
    const r = n || e.idTokenClaims, i = e.localAccountId || (r == null ? void 0 : r.oid) || (r == null ? void 0 : r.sub) || "", s = e.tenantId || (r == null ? void 0 : r.tid) || "", a = e.homeAccountId || `${i}.${s}`, c = e.username || (r == null ? void 0 : r.preferred_username) || "", h = e.name || (r == null ? void 0 : r.name), l = e.loginHint || (r == null ? void 0 : r.login_hint), d = /* @__PURE__ */ new Map(), g = _t(a, i, s, r);
    return d.set(s, g), {
      homeAccountId: a,
      environment: e.environment,
      tenantId: s,
      username: c,
      localAccountId: i,
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
    if (mg(e))
      switch (e.status) {
        case Ce.UserCancel:
          return new Oe(Is);
        case Ce.NoNetwork:
          return new Oe(ws);
        case Ce.AccountUnavailable:
          return new Oe(Jt);
        case Ce.Disabled:
          return new Oe(Yn);
        case Ce.NestedAppAuthUnavailable:
          return new Oe(e.code || Yn, e.description);
        case Ce.TransientError:
        case Ce.PersistentError:
          return new ke(e.code, e.description);
        case Ce.UserInteractionRequired:
          return new ee(e.code, e.description);
        default:
          return new A(e.code, e.description);
      }
    else
      return new A("unknown_error", "An unknown error occurred");
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
  toAuthenticationResultFromCache(e, t, n, r, i) {
    if (!t || !n)
      throw p($t);
    const s = oe(t.secret, this.crypto.base64Decode), a = n.target || r.scopes.join(" ");
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
      expiresOn: Ae(n.expiresOn),
      extExpiresOn: Ae(n.extendedExpiresOn),
      tokenType: r.authenticationScheme || S.BEARER,
      correlationId: i,
      state: r.state
    };
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Y extends A {
  constructor(e, t) {
    super(e, t), Object.setPrototypeOf(this, Y.prototype), this.name = "NestedAppAuthError";
  }
  static createUnsupportedError() {
    return new Y(Fu);
  }
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Uo {
  constructor(e) {
    this.operatingContext = e;
    const t = this.operatingContext.getBridgeProxy();
    if (t !== void 0)
      this.bridgeProxy = t;
    else
      throw new Error("unexpected: bridgeProxy is undefined");
    this.config = e.getConfig(), this.logger = this.operatingContext.getLogger(), this.performanceClient = this.config.telemetry.client, this.browserCrypto = e.isBrowserEnvironment() ? new se(this.logger, this.performanceClient, !0) : yt, this.eventHandler = new Eo(this.logger), this.browserStorage = this.operatingContext.isBrowserEnvironment() ? new Et(this.config.auth.clientId, this.config.cache, this.browserCrypto, this.logger, this.performanceClient, this.eventHandler, Qr(this.config.auth)) : Za(this.config.auth.clientId, this.logger, this.performanceClient, this.eventHandler), this.nestedAppAuthAdapter = new yg(this.config.auth.clientId, this.config.auth.clientCapabilities, this.browserCrypto, this.logger);
    const n = this.bridgeProxy.getAccountContext();
    this.currentAccountContext = n || null;
  }
  /**
   * Factory function to create a new instance of NestedAppAuthController
   * @param operatingContext
   * @returns Promise<IController>
   */
  static async createController(e) {
    const t = new Uo(e);
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
    const r = this.performanceClient.startMeasurement(To, n);
    r.add({ nestedAppAuthRequest: !0 });
    try {
      const i = this.nestedAppAuthAdapter.toNaaTokenRequest(t), s = $(), a = await this.bridgeProxy.getTokenInteractive(i), c = {
        ...this.nestedAppAuthAdapter.fromNaaTokenResponse(i, a, s)
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
    } catch (i) {
      const s = i instanceof A ? i : this.nestedAppAuthAdapter.fromBridgeError(i);
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Popup, null, i), r.end({
        success: !1
      }, i, e.account), s;
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
    const i = this.performanceClient.startMeasurement(Ao, n);
    i.increment({
      visibilityChangeCount: 0
    }), i.add({
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
      }, this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_SUCCESS, C.Silent, h), i == null || i.add({
        accessTokenSize: h.accessToken.length,
        idTokenSize: h.idToken.length
      }), i == null || i.end({
        success: !0,
        requestId: h.requestId
      }, void 0, h.account), h;
    } catch (s) {
      const a = s instanceof A ? s : this.nestedAppAuthAdapter.fromBridgeError(s);
      throw this.eventHandler.emitEvent(y.ACQUIRE_TOKEN_FAILURE, C.Silent, null, s), i == null || i.end({
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
    const t = e.correlationId || O(), n = this.performanceClient.startMeasurement(Io, t);
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
    if (t && (r = ar(t, this.logger, this.browserStorage, n)), !r)
      return this.logger.verbose("10qnr0", n), Promise.resolve(null);
    this.logger.verbose("1u7hux", n);
    const i = {
      ...e,
      correlationId: n,
      authority: e.authority || r.environment,
      scopes: (h = e.scopes) != null && h.length ? e.scopes : [...Se]
    }, s = this.browserStorage.getTokenKeys(), a = this.browserStorage.getAccessToken(r, i, s, r.tenantId);
    if (a) {
      if (Bs(a.cachedAt) || Ct(a.expiresOn, this.config.system.tokenRenewalOffsetSeconds))
        return this.logger.verbose("18egye", n), Promise.resolve(null);
    } else return this.logger.verbose("03vm49", n), Promise.resolve(null);
    const c = this.browserStorage.getIdToken(r, i.correlationId, s, r.tenantId);
    return c ? this.nestedAppAuthAdapter.toAuthenticationResultFromCache(r, c, a, i, i.correlationId) : (this.logger.verbose("0d68kd", n), Promise.resolve(null));
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
    return ec(this.logger, this.browserStorage, this.isBrowserEnv(), O(), e);
  }
  /**
   * Returns the first account found in the cache that matches the account filter passed in.
   * @param accountFilter
   * @returns The first account found in the cache matching the provided filter or null if no account could be found.
   */
  getAccount(e) {
    return ar(e, this.logger, this.browserStorage, O());
  }
  /**
   * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
   * @param account
   */
  setActiveAccount(e) {
    return tc(e, this.browserStorage, O());
  }
  /**
   * Gets the currently active account
   */
  getActiveAccount() {
    return nc(this.browserStorage, O());
  }
  // #endregion
  handleRedirectPromise(e) {
    return Promise.resolve(null);
  }
  loginPopup(e) {
    return this.acquireTokenInteractive(e || tr);
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
    const n = Br(e.account, e.cloudGraphHostName, e.msGraphHost);
    return await this.browserStorage.setAccount(n, e.correlationId, ue(e.idTokenClaims)), this.browserStorage.hydrateCache(e, t);
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
        const n = typeof t == "string" ? t : t.data, r = JSON.parse(n), i = G.bridgeRequests.find((s) => s.requestId === r.requestId);
        i !== void 0 && (G.bridgeRequests.splice(G.bridgeRequests.indexOf(i), 1), r.success ? i.resolve(r) : i.reject(r.error));
      });
      const e = await new Promise((t, n) => {
        const r = G.buildRequest("GetInitContext"), i = {
          requestId: r.requestId,
          method: r.method,
          resolve: t,
          reject: n
        };
        G.bridgeRequests.push(i), window.nestedAppAuthBridge.postMessage(JSON.stringify(r));
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
      clientLibrary: q.MSAL_SKU,
      clientLibraryVersion: ae,
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
    return new Promise((i, s) => {
      const a = {
        requestId: n.requestId,
        method: n.method,
        resolve: i,
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
class it extends Mn {
  constructor() {
    super(...arguments), this.bridgeProxy = void 0, this.accountContext = null;
  }
  /**
   * Return the module name.  Intended for use with import() to enable dynamic import
   * of the implementation associated with this operating context
   * @returns
   */
  getModuleName() {
    return it.MODULE_NAME;
  }
  /**
   * Returns the unique identifier for this operating context
   * @returns string
   */
  getId() {
    return it.ID;
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
it.MODULE_NAME = "";
it.ID = "NestedAppOperatingContext";
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class uc {
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
    this.controller = t || new Mo(new ot(e));
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
async function Lg(o, e, t) {
  const n = e || O(), r = new it(o);
  if (await r.initialize(n), r.isAvailable()) {
    const i = new Uo(r), s = t ? t(o, i) : new uc(o, i);
    return await s.initialize({ correlationId: n }), s;
  }
  return Cg(o);
}
async function Cg(o) {
  const e = new uc(o);
  return await e.initialize(), e;
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const Hg = {
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
async function Kg(o, e, t, n, r = new vt()) {
  _n();
  const i = lc(o, !0), s = e.correlationId || O(), a = r.startMeasurement(qa, s);
  try {
    const c = t.id_token ? oe(t.id_token, j) : void 0, h = ue(c || {}), l = {
      protocolMode: i.system.protocolMode,
      knownAuthorities: i.auth.knownAuthorities,
      cloudDiscoveryMetadata: i.auth.cloudDiscoveryMetadata,
      authorityMetadata: i.auth.authorityMetadata
    }, d = new Q(i.system.loggerOptions || {}), g = new se(d, i.telemetry.client), f = new Et(i.auth.clientId, i.cache, g, d, i.telemetry.client, new Eo(d), Qr(i.auth)), w = e.authority ? new z(z.generateAuthority(e.authority, e.azureCloudOptions), i.system.networkClient, f, l, d, e.correlationId || O(), i.telemetry.client) : void 0, I = await u(wg, Cu, d, r, s)(e, n.clientInfo || t.client_info || "", s, f, d, g, c, w), E = await u(Ig, wu, d, r, s)(t, I.homeAccountId, I.environment, I.realm, h, s, f, d, o.auth.clientId), P = await u(Tg, Iu, d, r, s)(e, t, I.homeAccountId, I.environment, I.realm, h, n, s, f, d, o.auth.clientId), b = await u(Ag, Tu, d, r, s)(t, I.homeAccountId, I.environment, h, s, f, d, o.auth.clientId);
    return a.end({ success: !0 }, void 0, me(I)), Eg(e, {
      account: I,
      idToken: E,
      accessToken: P,
      refreshToken: b
    }, c, w);
  } catch (c) {
    throw a.end({ success: !1 }, c), c;
  }
}
async function wg(o, e, t, n, r, i, s, a) {
  if (r.verbose("0ke46k", t), o.account) {
    const d = Br(o.account);
    return await n.setAccount(d, t, ue(s || {})), d;
  } else if (!a || !e && !s)
    throw r.error("1ychpz", t), m(Ca);
  const c = zr(e, a.authorityType, r, i, t, s), h = s == null ? void 0 : s.tid, l = Wr(
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
  return await n.setAccount(l, t, ue(s || {})), l;
}
async function Ig(o, e, t, n, r, i, s, a, c) {
  if (!o.id_token)
    return a.verbose("1pm7g1", i), null;
  a.verbose("168lyi", i);
  const h = mn(e, t, o.id_token, c, n);
  return await s.setIdTokenCredential(h, i, r), h;
}
async function Tg(o, e, t, n, r, i, s, a, c, h, l) {
  if (e.access_token)
    if (e.expires_in) {
      if (!e.scope && (!o.scopes || !o.scopes.length))
        return h.error("1h7xse", a), null;
    } else return h.error("15mzx8", a), null;
  else return h.verbose("1ckp9e", a), null;
  h.verbose("01kmxb", a);
  const d = e.scope ? x.fromString(e.scope) : new x(o.scopes), g = s.expiresOn || e.expires_in + $(), f = s.extendedExpiresOn || (e.ext_expires_in || e.expires_in) + $(), w = yn(t, n, e.access_token, l, r, d.printScopes(), g, f, j);
  return await c.setAccessTokenCredential(w, a, i), w;
}
async function Ag(o, e, t, n, r, i, s, a) {
  if (!o.refresh_token)
    return s.verbose("1l7um5", r), null;
  s.verbose("0qy8ev", r);
  const c = js(
    e,
    t,
    o.refresh_token,
    a,
    o.foci,
    void 0,
    // userAssertionHash
    o.refresh_token_expires_in
  );
  return await i.setRefreshTokenCredential(c, r, n), c;
}
function Eg(o, e, t, n) {
  var h, l, d;
  let r = "", i = [], s = null, a;
  e != null && e.accessToken && (r = e.accessToken.secret, i = x.fromString(e.accessToken.target).asArray(), s = Ae(e.accessToken.expiresOn), a = Ae(e.accessToken.extendedExpiresOn));
  const c = e.account;
  return {
    authority: n ? n.canonicalAuthority : "",
    uniqueId: e.account.localAccountId,
    tenantId: e.account.realm,
    scopes: i,
    account: me(c),
    idToken: ((h = e.idToken) == null ? void 0 : h.secret) || "",
    idTokenClaims: t || {},
    accessToken: r,
    fromCache: !0,
    expiresOn: s,
    correlationId: o.correlationId || "",
    requestId: "",
    extExpiresOn: a,
    familyId: ((l = e.refreshToken) == null ? void 0 : l.familyId) || "",
    tokenType: ((d = e == null ? void 0 : e.accessToken) == null ? void 0 : d.tokenType) || "",
    state: o.state || "",
    cloudGraphHostName: c.cloudGraphHostName || "",
    msGraphHost: c.msGraphHost || "",
    fromPlatformBroker: !1
  };
}
/*! @azure/msal-browser v5.0.2 2026-01-17 */
class Fg {
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
class Bg {
  constructor(e, t) {
    const n = t && t.loggerOptions || {};
    this.logger = new Q(n, At, ae), this.cryptoOps = new se(this.logger), this.popTokenGenerator = new je(this.cryptoOps, new vt()), this.shrParameters = e;
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
function Ri() {
  let o;
  try {
    o = window[Z.SessionStorage];
    const e = o == null ? void 0 : o.getItem(_u);
    if (Number(e) === 1)
      return Promise.resolve().then(() => kg);
  } catch {
  }
}
function gc() {
  return typeof window < "u" && typeof window.performance < "u" && typeof window.performance.now == "function";
}
function Sg(o) {
  if (!(!o || !gc()))
    return Math.round(window.performance.now() - o);
}
class zg extends yd {
  constructor(e, t) {
    var n, r;
    super(e.auth.clientId, e.auth.authority || `${cr}`, new Q(((n = e.system) == null ? void 0 : n.loggerOptions) || {}, At, ae), At, ae, ((r = e.telemetry) == null ? void 0 : r.application) || {
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
    (t = Ri()) == null || t.then((n) => {
      const r = this.eventsByCorrelationId.get(e.event.correlationId), i = r && r.eventId === e.event.eventId, s = [];
      i && (r != null && r.incompleteSubMeasurements) && r.incompleteSubMeasurements.forEach((a) => {
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
    const n = this.getPageVisibility(), r = super.startMeasurement(e, t), i = gc() ? window.performance.now() : void 0, s = (a = Ri()) == null ? void 0 : a.then((c) => new c.BrowserPerformanceMeasurement(e, r.event.correlationId));
    return s == null || s.then((c) => c.startMeasurement()), {
      ...r,
      end: (c, h, l) => {
        const d = r.end({
          ...c,
          startPageVisibility: n,
          endPageVisibility: this.getPageVisibility(),
          durationMs: Sg(i)
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
class ne {
  constructor(e, t) {
    this.correlationId = t, this.measureName = ne.makeMeasureName(e, t), this.startMark = ne.makeStartMark(e, t), this.endMark = ne.makeEndMark(e, t);
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
    if (ne.supportsBrowserPerformance())
      try {
        t.forEach((n) => {
          const r = ne.makeMeasureName(n.name, e);
          window.performance.getEntriesByName(r, "measure").length > 0 && (window.performance.clearMeasures(r), window.performance.clearMarks(ne.makeStartMark(r, e)), window.performance.clearMarks(ne.makeEndMark(r, e)));
        });
      } catch {
      }
  }
  startMeasurement() {
    if (ne.supportsBrowserPerformance())
      try {
        window.performance.mark(this.startMark);
      } catch {
      }
  }
  endMeasurement() {
    if (ne.supportsBrowserPerformance())
      try {
        window.performance.mark(this.endMark), window.performance.measure(this.measureName, this.startMark, this.endMark);
      } catch {
      }
  }
  flushMeasurement() {
    if (ne.supportsBrowserPerformance())
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
const kg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BrowserPerformanceMeasurement: ne
}, Symbol.toStringTag, { value: "Module" }));
/*! @azure/msal-browser v5.0.2 2026-01-17 */
const jg = S, Gg = ln, Vg = V, $g = Hi, Jg = Se;
export {
  _ as ApiId,
  A as AuthError,
  Og as AuthErrorCodes,
  Rg as AuthenticationHeaderParser,
  jg as AuthenticationScheme,
  Lr as AzureCloudInstance,
  Ot as BrowserAuthError,
  Ng as BrowserAuthErrorCodes,
  Z as BrowserCacheLocation,
  uo as BrowserConfigurationAuthError,
  Mg as BrowserConfigurationAuthErrorCodes,
  zg as BrowserPerformanceClient,
  ne as BrowserPerformanceMeasurement,
  xg as BrowserRootPerformanceEvents,
  Ug as BrowserUtils,
  U as CacheLookupPolicy,
  Oe as ClientAuthError,
  vg as ClientAuthErrorCodes,
  fr as ClientConfigurationError,
  _g as ClientConfigurationErrorCodes,
  eg as DEFAULT_IFRAME_TIMEOUT_MS,
  Eo as EventHandler,
  Fg as EventMessageUtils,
  y as EventType,
  ee as InteractionRequiredAuthError,
  bg as InteractionRequiredAuthErrorCodes,
  ye as InteractionStatus,
  C as InteractionType,
  $g as JsonWebTokenTypes,
  Pu as LocalStorage,
  R as LogLevel,
  Q as Logger,
  On as MemoryStorage,
  cn as NavigationClient,
  Jg as OIDC_DEFAULT_SCOPES,
  Vg as PromptValue,
  J as ProtocolMode,
  uc as PublicClientApplication,
  Gg as ResponseMode,
  ke as ServerError,
  Nu as SessionStorage,
  Bg as SignedHttpRequest,
  vt as StubPerformanceClient,
  Pg as WrapperSKU,
  Lg as createNestablePublicClientApplication,
  Cg as createStandardPublicClientApplication,
  Dg as isPlatformBrokerAvailable,
  Kg as loadExternalTokens,
  Hg as stubbedPublicClientApplication,
  ae as version
};
