var Fr = Object.defineProperty;
var zr = Object.getPrototypeOf;
var Br = Reflect.get;
var Gr = (c, e, t) => e in c ? Fr(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var N = (c, e, t) => Gr(c, typeof e != "symbol" ? e + "" : e, t);
var at = (c, e, t) => Br(zr(c), t, e);
import { c as Ne, f as $e, s as ut, r as ie, q as u, a as Kt, u as pr, l as mr, G as R, g as Yr } from "./scroll-lock-CQElyp-P.js";
var fr = class extends Event {
  constructor(c, e, t) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = c, this.callback = e, this.subscribe = t ?? !1;
  }
};
function sa(c) {
  return c;
}
var Zt = class {
  constructor(c, e, t, i) {
    if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (r, o) => {
      this.unsubscribe && (this.unsubscribe !== o && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = r, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(r, o)), this.unsubscribe = o;
    }, this.host = c, e.context !== void 0) {
      let r = e;
      this.context = r.context, this.callback = r.callback, this.subscribe = r.subscribe ?? !1;
    } else this.context = e, this.callback = t, this.subscribe = i ?? !1;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new fr(this.context, this.t, this.subscribe));
  }
}, Hr = class {
  get value() {
    return this.o;
  }
  set value(c) {
    this.setValue(c);
  }
  setValue(c, e = !1) {
    let t = e || !Object.is(c, this.o);
    this.o = c, t && this.updateObservers();
  }
  constructor(c) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (let [e, { disposer: t }] of this.subscriptions) e(this.o, t);
    }, c !== void 0 && (this.value = c);
  }
  addCallback(c, e, t) {
    if (!t) return void c(this.value);
    this.subscriptions.has(c) || this.subscriptions.set(c, { disposer: () => {
      this.subscriptions.delete(c);
    }, consumerHost: e });
    let { disposer: i } = this.subscriptions.get(c);
    c(this.value, i);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}, Vr = class extends Event {
  constructor(c) {
    super("context-provider", { bubbles: !0, composed: !0 }), this.context = c;
  }
}, ci = class extends Hr {
  constructor(c, e, t) {
    var i, r;
    super(e.context !== void 0 ? e.initialValue : t), this.onContextRequest = (o) => {
      let a = o.composedPath()[0];
      o.context === this.context && a !== this.host && (o.stopPropagation(), this.addCallback(o.callback, a, o.subscribe));
    }, this.onProviderRequest = (o) => {
      let a = o.composedPath()[0];
      if (o.context !== this.context || a === this.host) return;
      let n = /* @__PURE__ */ new Set();
      for (let [s, { consumerHost: l }] of this.subscriptions) n.has(s) || (n.add(s), l.dispatchEvent(new fr(this.context, s, !0)));
      o.stopPropagation();
    }, this.host = c, e.context !== void 0 ? this.context = e.context : this.context = e, this.attachListeners(), (r = (i = this.host).addController) == null || r.call(i, this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new Vr(this.context));
  }
};
function la({ context: c }) {
  return (e, t) => {
    let i = /* @__PURE__ */ new WeakMap();
    if (typeof t == "object") return t.addInitializer((function() {
      i.set(this, new ci(this, { context: c }));
    })), { get() {
      return e.get.call(this);
    }, set(r) {
      var o;
      return (o = i.get(this)) == null || o.setValue(r), e.set.call(this, r);
    }, init(r) {
      var o;
      return (o = i.get(this)) == null || o.setValue(r), r;
    } };
    {
      e.constructor.addInitializer(((a) => {
        i.set(a, new ci(a, { context: c }));
      }));
      let r = Object.getOwnPropertyDescriptor(e, t), o;
      if (r === void 0) {
        let a = /* @__PURE__ */ new WeakMap();
        o = { get: function() {
          return a.get(this);
        }, set: function(n) {
          i.get(this).setValue(n), a.set(this, n);
        }, configurable: !0, enumerable: !0 };
      } else {
        let a = r.set;
        o = { ...r, set: function(n) {
          i.get(this).setValue(n), a == null || a.call(this, n);
        } };
      }
      return void Object.defineProperty(e, t, o);
    }
  };
}
function ca({ context: c, subscribe: e }) {
  return (t, i) => {
    typeof i == "object" ? i.addInitializer((function() {
      new Zt(this, { context: c, callback: (r) => {
        this[i.name] = r;
      }, subscribe: e });
    })) : t.constructor.addInitializer(((r) => {
      new Zt(r, { context: c, callback: (o) => {
        r[i] = o;
      }, subscribe: e });
    }));
  };
}
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
const Dt = {
  // Global/Common texts
  loading: "Wird geladen...",
  saving: "Wird gespeichert...",
  cancel: "Abbrechen",
  save: "Speichern",
  edit: "Bearbeiten",
  delete: "Löschen",
  confirm: "Bestätigen",
  close: "Schließen",
  retry: "Erneut versuchen",
  // Authentication
  authRequired: "Authentifizierung erforderlich",
  authRequiredText: "Um diese Funktion zu nutzen, melden Sie sich bitte an.",
  signIn: "Anmelden",
  sessionExpired: "Sitzung abgelaufen",
  sessionExpiredText: "Ihre Anmeldung ist abgelaufen. Bitte melden Sie sich erneut an.",
  loginRequired: "Anmeldung erforderlich",
  loginRequiredText: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an, um auf Ihre Daten zugreifen zu können.",
  // Errors
  errorLoading: "Fehler beim Laden",
  errorSaving: "Fehler beim Speichern",
  errorGeneral: "Ein Fehler ist aufgetreten",
  errorNetwork: "Verbindungsfehler",
  errorNetworkText: "Die Verbindung zum Server konnte nicht hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung.",
  errorServer: "Server-Fehler",
  errorServerText: "Ein Server-Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
  errorNotFound: "Nicht gefunden",
  errorNotFoundText: "Die angeforderten Daten konnten nicht gefunden werden.",
  errorUnauthorized: "Zugriff verweigert",
  errorUnauthorizedText: "Sie haben keine Berechtigung für diese Aktion.",
  // Success messages
  savedSuccessfully: "Erfolgreich gespeichert",
  updatedSuccessfully: "Erfolgreich aktualisiert",
  deletedSuccessfully: "Erfolgreich gelöscht",
  addedSuccessfully: "Erfolgreich hinzugefügt",
  // API Mode changes
  modeChanged: "Modus gewechselt",
  modeDemo: "Demo-Modus",
  modeLocal: "Entwicklungs-Modus",
  modeApi: "Test-API",
  modeLive: "Live-System",
  apiModeChanged: "API-Modus geändert",
  apiModeChangedText: "Die Anwendung verwendet jetzt den",
  // Data loading
  loadingFailed: "Laden fehlgeschlagen",
  loadingFailedText: "Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  dataNotAvailable: "Daten nicht verfügbar",
  noDataFound: "Keine Daten gefunden",
  // Demo mode
  demoMode: "Demo-Modus",
  demoModeText: "Es werden Demo-Daten angezeigt.",
  fallbackToDemo: "Fallback zu Demo-Daten",
  // Generic form elements
  firstName: "Vorname",
  lastName: "Nachname",
  email: "E-Mail-Adresse",
  phone: "Telefonnummer",
  address: "Adresse",
  city: "Ort",
  zipCode: "Postleitzahl",
  country: "Land",
  dateOfBirth: "Geburtsdatum",
  // Generic actions
  viewDetails: "Details anzeigen",
  manageData: "Daten verwalten",
  addNew: "Neu hinzufügen",
  removeItem: "Entfernen",
  editItem: "Bearbeiten"
};
let $ = null, zt = "twerenbold", Xr = typeof window < "u" && window.location.hostname === "localhost" ? "" : "https://xitami.github.io/TWR-Account-Components";
const di = /* @__PURE__ */ new Set(), hi = /* @__PURE__ */ new Set();
let Me = !1;
typeof localStorage < "u" && localStorage.getItem("twerenbold_editor_markers") === "true" && (Me = !0, console.log("📝 Text markers enabled"));
function jr(c) {
  Me = c, typeof localStorage < "u" && localStorage.setItem("twerenbold_editor_markers", c), window.location.reload();
}
function Jr() {
  return Me;
}
function Kr(c) {
  return hi.add(c), () => hi.delete(c);
}
function qr(c, e, t, i) {
  $ || ($ = {}), $[c] || ($[c] = {}), $[c][e] || ($[c][e] = {}), $[c][e][t] = i, console.log(`📝 Updated text: [${c}] ${e}.${t} = "${i}"`);
}
function Qr() {
  return Array.from(di).sort();
}
function eo() {
  if (!$) return;
  const c = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($, null, 2)), e = document.createElement("a");
  e.setAttribute("href", c), e.setAttribute("download", "language-config.json"), document.body.appendChild(e), e.click(), e.remove();
}
async function Bt() {
  if ($) return $;
  try {
    const e = await (await fetch(`${Xr}/config/language-config.json`)).json();
    return $ = e, console.log("📝 Text service loaded language config:", Object.keys(e)), $;
  } catch (c) {
    return console.warn("Failed to load language config, using defaults:", c), $ = {}, $;
  }
}
function br(c) {
  $ = c, console.log("📝 Text service language config set:", c ? Object.keys(c) : "null");
}
function St(c) {
  zt = c || "twerenbold";
}
function to() {
  return zt;
}
function io(c, e = null) {
  const t = e || zt;
  if (!$ || !$[t]) return null;
  const i = (r, o = "") => {
    for (const [a, n] of Object.entries(r)) {
      const s = o ? `${o}.${a}` : a;
      if (typeof n == "string") {
        if (n === c) return s;
      } else if (typeof n == "object" && n !== null) {
        const l = i(n, s);
        if (l) return l;
      }
    }
    return null;
  };
  return i($[t]);
}
function O(c, e = null, t = null, i = null) {
  const r = i || zt;
  if (!$)
    return console.warn("Language config not loaded, using fallback for:", c), t || Dt[c] || c;
  const o = e ? `${e}.${c}` : c;
  di.has(o) || (di.add(o), hi.forEach((s) => s(o)));
  const a = o.split(".");
  if ($[r]) {
    let s = $[r];
    for (const l of a)
      s = s == null ? void 0 : s[l];
    if (s != null && (typeof s == "string" || Array.isArray(s)))
      return Me && typeof s == "string" ? `​${o}​${s}` : s;
  }
  if (r !== "twerenbold" && $.twerenbold) {
    let s = $.twerenbold;
    for (const l of a)
      s = s == null ? void 0 : s[l];
    if (s != null && (typeof s == "string" || Array.isArray(s)))
      return Me && typeof s == "string" ? `​${o}​${s}` : s;
  }
  if ($.common) {
    if (e && $.common[e] && $.common[e][c]) {
      const s = $.common[e][c];
      return Me && typeof s == "string" ? `​${o}​${s}` : s;
    }
    if ($.common[c]) {
      const s = $.common[c];
      return Me && typeof s == "string" ? `​${o}​${s}` : s;
    }
  }
  if (Dt[c])
    return Me ? `​${o}​${Dt[c]}` : Dt[c];
  const n = t || c;
  return Me ? `​${o}​${n}` : n;
}
if (typeof window < "u") {
  const e = new URLSearchParams(window.location.search).get("theme") || "twerenbold";
  Bt().then(() => {
    St(e), console.log("📝 Text service initialized with theme:", e);
  });
}
const da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  downloadConfig: eo,
  findKeyForText: io,
  getAccessedKeys: Qr,
  getText: O,
  getTheme: to,
  getUseMarkers: Jr,
  loadLanguageConfig: Bt,
  setLanguageConfig: br,
  setTheme: St,
  setUseMarkers: jr,
  subscribeToTextAccess: Kr,
  updateText: qr
}, Symbol.toStringTag, { value: "Module" })), nt = 1800 * 1e3, ro = 3e4, Bi = 6e4 * 5, le = 3, Gi = 2e3;
class vr {
  constructor() {
    var e;
    if (this.logger = Ne("ApiService"), this.endpoints = {
      liveBaseUrl: "https://account-ase-prod-001.azurewebsites.net",
      localBaseUrl: "http://localhost:3000/v1",
      demoBaseUrl: "https://xitami.github.io/TWR-Account-Components",
      paths: {
        trips: "/Trip",
        accountProfile: "/account/profile",
        accountTravelers: "/account/travelers",
        clubStatus: "/club/status",
        clubBenefits: "/club/benefits",
        newsletter: "/Newsletter",
        favorites: "/Watchlist"
      }
    }, this.mode = "demo", this.authComponent = null, this._currentUserId = null, typeof localStorage < "u")
      try {
        if (this._currentUserId = localStorage.getItem("twerenbold_current_user_id"), this._currentUserId)
          this.logger.debug("💾 Restored user ID from localStorage:", this._currentUserId);
        else {
          const t = JSON.parse(localStorage.getItem("msal.account.keys") || "[]");
          if (t.length > 0) {
            const i = t[0], r = JSON.parse(localStorage.getItem(i) || "null");
            if (r) {
              const o = r.localAccountId || ((e = r.homeAccountId) == null ? void 0 : e.split(".")[0]) || r.oid;
              if (o) {
                this._currentUserId = o;
                try {
                  localStorage.setItem("twerenbold_current_user_id", o), this.logger.debug("💾 Extracted and stored user ID from MSAL:", o);
                } catch (a) {
                  this.logger.warn("⚠️ Failed to store user ID:", a);
                }
              }
            }
          }
        }
      } catch (t) {
        this.logger.warn("⚠️ Failed to restore user ID from localStorage:", t);
      }
    this.clubApiDisabled = !1, this._cache = /* @__PURE__ */ new Map(), this._ongoingRequests = /* @__PURE__ */ new Map(), this._activeRequests = 0, this._activeRequestLabels = /* @__PURE__ */ new Set(), this._loadingStartTime = null, this._isRevalidatingTrips = !1, this._cacheConfig = {
      trips: { ttl: nt, perUser: !0 },
      accountProfile: { ttl: nt, perUser: !0 },
      accountTravelers: { ttl: nt, perUser: !0 },
      clubStatus: { ttl: nt, perUser: !0 }
    }, this._setupEventHandlers(), this._initializeCacheFromStorage();
  }
  /**
   * Initialize cache from localStorage on startup
   * This enables Stale-While-Revalidate to work even on first page load
   * * SECURITY: Only loads cache entries for the current user to prevent
   * data leakage between user sessions
   */
  _initializeCacheFromStorage() {
    if (!(typeof localStorage > "u"))
      try {
        const e = this._currentUserId || localStorage.getItem("twerenbold_current_user_id"), t = Object.keys(localStorage).filter(
          (a) => a.includes("_trips_") || a.includes("_accountProfile_") || a.includes("_accountTravelers_") || a.includes("_clubStatus_")
        );
        let i = 0, r = 0, o = 0;
        t.forEach((a) => {
          try {
            const n = this._loadFromLocalStorage(a);
            if (n && n.data) {
              const s = n.userId;
              if (e)
                if (s === e)
                  this._cache.set(a, n), i++;
                else if (s === "anonymous") {
                  this.logger.debug("🔄 Migrating anonymous cache to user:", e), n.userId = e;
                  const l = a.replace("_anonymous", `_${e}`);
                  this._cache.set(l, n);
                  try {
                    localStorage.setItem(l, JSON.stringify(n)), localStorage.removeItem(a), o++;
                  } catch (g) {
                    this.logger.warn("⚠️ Failed to migrate cache entry:", a, g);
                  }
                } else
                  localStorage.removeItem(a), r++, this.logger.debug("🗑️ Removed stale cache for different user:", a);
              else
                this._cache.set(a, n), i++;
            }
          } catch (n) {
            this.logger.warn("⚠️ Failed to load cache entry:", a, n);
          }
        }), (i > 0 || o > 0) && this.logger.debug(
          "💾 Initialized cache from localStorage:",
          i,
          "entries",
          o > 0 ? `(${o} migrated from anonymous)` : "",
          r > 0 ? `(${r} skipped)` : ""
        );
      } catch (e) {
        this.logger.warn("⚠️ Failed to initialize cache from localStorage:", e);
      }
  }
  /**
   * Get user favorites list
   * Returns an array of favorite objects, each containing a 'trip' property
   * with the full trip structure matching the trips API format
   * @param {string} userId
   */
  async getFavorites(e) {
    if (this.isDemoMode)
      try {
        return (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).favorites || [];
      } catch {
        return [];
      }
    try {
      const t = this.endpoints.paths.watchlist || this.endpoints.paths.favorites, i = `${this.baseUrl}${t}` + (e && !t.endsWith("/Watchlist") ? `/${encodeURIComponent(e)}` : ""), r = await this.makeAuthenticatedRequest(i);
      return r && Array.isArray(r.watchlist) ? r.watchlist : Array.isArray(r) ? r : [];
    } catch (t) {
      return this.logger.error("❌ Failed to load favorites/watchlist:", t), null;
    }
  }
  /**
   * Add a favorite for the given user
   * @param {string} userId
   * @param {object} favoriteObj - payload matching NewFavorite
   */
  async addFavorite(e, t) {
    if (this.isDemoMode)
      return {
        id: `fav_${Date.now()}`,
        userId: e,
        type: t.type,
        meta: t.meta || {},
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    try {
      const i = this.endpoints.paths.watchlist || this.endpoints.paths.favorites, r = `${this.baseUrl}${i}`;
      return await this.makeAuthenticatedRequest(r, {
        method: "POST",
        body: JSON.stringify(t)
      });
    } catch (i) {
      throw this.logger.error("❌ Failed to create favorite/watchlist item:", i), i;
    }
  }
  /**
   * Remove favorite by id for a given user
   * @param {string} userId
   * @param {string} favoriteId
   */
  async removeFavorite(e, t) {
    if (!t) throw new Error("Missing favoriteId or tripCode");
    if (this.isDemoMode)
      return !0;
    try {
      const i = this.endpoints.paths.watchlist || this.endpoints.paths.favorites;
      let r;
      if (i.endsWith("/Watchlist"))
        r = `${this.baseUrl}${i}/${encodeURIComponent(t)}`;
      else {
        if (!e) throw new Error("Missing userId for legacy favorites delete");
        r = `${this.baseUrl}${i}/${encodeURIComponent(e)}/${encodeURIComponent(t)}`;
      }
      return await this.makeAuthenticatedRequest(r, { method: "DELETE" }), !0;
    } catch (i) {
      throw this.logger.error("❌ Failed to delete favorite/watchlist item:", i), i;
    }
  }
  /**
   * Get newsletter subscriptions for a given user
   * @param {string} userId
   */
  async getNewsletterSubscriptions(e) {
    var i;
    if (!e) return [];
    if (this.isDemoMode)
      try {
        return ((i = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).newsletter) == null ? void 0 : i.subscriptions) || [];
      } catch {
        return [];
      }
    const t = `${this.baseUrl}${this.endpoints.paths.newsletter}/${encodeURIComponent(e)}`;
    try {
      const r = await this.makeAuthenticatedRequest(t);
      return Array.isArray(r) ? r : [];
    } catch (r) {
      return this.logger.error("❌ Failed to load newsletter subscriptions:", r), [];
    }
  }
  async registerNewsletter(e, t) {
    if (!e) throw new Error("Missing userId");
    const i = `${this.baseUrl}${this.endpoints.paths.newsletter}/${encodeURIComponent(e)}/register/${encodeURIComponent(t)}`;
    return await this.makeAuthenticatedRequest(i, { method: "PUT" });
  }
  async removeNewsletter(e, t) {
    if (!e) throw new Error("Missing userId");
    const i = `${this.baseUrl}${this.endpoints.paths.newsletter}/${encodeURIComponent(e)}/remove/${encodeURIComponent(t)}`;
    return await this.makeAuthenticatedRequest(i, { method: "PUT" });
  }
  /**
   * Setup event handlers for document visibility and user changes
   */
  _setupEventHandlers() {
    typeof document < "u" && (document.addEventListener("visibilitychange", () => {
      document.hidden || this._recoverAuthComponent({ reason: "visibilitychange" });
    }), document.addEventListener("auth-session-expired", (e) => {
      var t;
      this.logger.warn("⚠️ Auth session expired event received:", e.detail), this._showGlobalNotification({
        type: "warning",
        title: "Sitzung abgelaufen",
        message: ((t = e.detail) == null ? void 0 : t.message) || "Ihre Sitzung ist abgelaufen. Sie werden automatisch neu angemeldet...",
        persistent: !1,
        duration: 5e3
      });
    }));
  }
  // ============================================================================
  // MODE MANAGEMENT
  // ============================================================================
  /**
   * Set the API mode (demo, local, or live)
   * @param {string} mode - 'demo', 'local', or 'live'
   */
  setMode(e = "demo") {
    typeof e == "boolean" && (e = e ? "local" : "live");
    const t = this.mode;
    this.mode = e, this.logger.debug("🔧 API Service mode set to:", e.toUpperCase()), t && t !== e && this._invalidateCacheForMode(t, "mode-change");
  }
  /**
   * Override demo base URL at runtime.
   * Example: apiService.setDemoBaseUrl('https://my-cdn.example.com/twr-demo')
   */
  setDemoBaseUrl(e) {
    !e || typeof e != "string" || (this.endpoints.demoBaseUrl = e, this.logger.debug("🔧 Demo base URL set to:", e));
  }
  /**
   * Get the current base URL based on mode
   */
  get baseUrl() {
    return this.mode === "demo" ? this.endpoints.demoBaseUrl : this.mode === "local" ? this.endpoints.localBaseUrl : this.endpoints.liveBaseUrl;
  }
  get isDemoMode() {
    return this.mode === "demo";
  }
  get isLocalMode() {
    return this.mode === "local";
  }
  get isLiveMode() {
    return this.mode === "live";
  }
  // ============================================================================
  // AUTHENTICATION MANAGEMENT
  // ============================================================================
  /**
   * Set the authentication component
   * @param {Object} authComponent - OAuth authentication component
   */
  setAuthComponent(e) {
    var o, a;
    const t = ((o = this.authComponent) == null ? void 0 : o.user) || ((a = this.authComponent) == null ? void 0 : a.account) || null;
    this.authComponent = e;
    const i = (e == null ? void 0 : e.user) || (e == null ? void 0 : e.account) || null, r = (e == null ? void 0 : e.isAuthenticated) || !1;
    this.logger.debug("🔐 Auth component set in API service:", {
      hasComponent: !!e,
      isAuthenticated: r,
      hasUser: !!i,
      userKeys: i ? Object.keys(i) : []
    }), this._handleAuthUserChange(t, i);
  }
  /**
   * Attempt to recover auth component from DOM or app context
   */
  _recoverAuthComponent(e = {}) {
    var o, a;
    if (this.authComponent)
      return this.authComponent;
    if (typeof document > "u")
      return null;
    const t = document.querySelector("app-state-provider"), i = (o = t == null ? void 0 : t.state) == null ? void 0 : o.authComponent;
    if (i)
      return this.setAuthComponent(i), this.logger.debug("🔄 Auth component recovered from provider state", e), i;
    const r = document.querySelector("oauth-login") || document.querySelector("[data-auth-component]");
    return r ? ((a = t == null ? void 0 : t.appActions) != null && a.registerAuthComponent ? t.appActions.registerAuthComponent(r) : this.setAuthComponent(r), this.logger.debug("🔄 Auth component recovered from DOM", e), r) : null;
  }
  /**
   * Get authentication headers for API requests
   */
  async getAuthHeaders() {
    var t;
    if (this.logger.debug("🔑 getAuthHeaders - mode:", this.mode, "authComponent:", !!this.authComponent), this.isLiveMode && !this.authComponent && (this._recoverAuthComponent({ reason: "getAuthHeaders" }), !this.authComponent)) {
      this.logger.debug("⏳ Waiting for auth component to be registered...");
      const i = Date.now(), r = 5e3;
      for (; !this.authComponent && Date.now() - i < r; )
        await new Promise((o) => setTimeout(o, 100)), this._recoverAuthComponent({ reason: "getAuthHeaders-retry" });
      if (!this.authComponent)
        throw this.logger.error("❌ Auth component still not available after timeout"), new Error("Auth component not available after waiting");
      this.logger.debug("✅ Auth component recovered after waiting");
    }
    if (this.isDemoMode)
      return this.logger.debug("🎭 DEMO mode - no auth required"), {
        "Content-Type": "application/json"
      };
    if (this.isLocalMode)
      return this.logger.debug("🏠 LOCAL mode with demo token"), {
        Authorization: "Bearer demo-token",
        "Content-Type": "application/json"
      };
    this.logger.debug("🌐 LIVE mode - authenticated:", (t = this.authComponent) == null ? void 0 : t.isAuthenticated);
    const e = await this._resolveAccessToken();
    if (!e)
      throw this.logger.warn("🛑 Auth token is null - aborting request to prevent 401"), new Error("AUTH_TOKEN_MISSING");
    return {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json"
    };
  }
  /**
   * Resolve access token with refresh if needed
   */
  async _resolveAccessToken(e = !1) {
    var i, r;
    if (!this.authComponent)
      throw new Error("Auth component not available");
    if (!this.authComponent.isAuthenticated)
      throw new Error("User not authenticated");
    this.logger.debug(`🔑 Resolving access token (forceRefresh=${e}) via auth component`);
    const t = await ((r = (i = this.authComponent).getAccessToken) == null ? void 0 : r.call(i, e));
    return t ? (this.logger.debug("✅ Access token acquired"), t) : (this.logger.error("❌ Failed to get access token - session may be expired or popup blocked"), null);
  }
  /**
   * Wait for auth component to be ready AND extract user ID
   */
  async _waitForAuthReady() {
    var t, i, r;
    if (!this.isLiveMode)
      return !0;
    const e = Date.now();
    for (; !this.authComponent || !this.authComponent.isMsalInitialized; ) {
      if (Date.now() - e > ro)
        return this.logger.warn("⚠️ MSAL initialization timeout reached"), !1;
      await new Promise((o) => setTimeout(o, 100));
    }
    if (!this.authComponent.isAuthenticated && (this.logger.warn("⚠️ MSAL initialized but user is not authenticated."), await new Promise((o) => setTimeout(o, 500)), !this.authComponent.isAuthenticated))
      return !1;
    if (this.logger.auth("Auth component ready", {
      hasAuthComponent: !!this.authComponent,
      isAuthenticated: (t = this.authComponent) == null ? void 0 : t.isAuthenticated,
      hasUser: !!((i = this.authComponent) != null && i.user),
      hasAccount: !!((r = this.authComponent) != null && r.account),
      hasUserId: !!this._currentUserId
    }), !this._currentUserId && this.authComponent) {
      const o = this.authComponent.user || this.authComponent.account;
      if (this.logger.debug("🔍 User object for extraction:", o), o) {
        const a = this._extractUserId(o, this.authComponent);
        if (this.logger.debug("🔍 Extracted user ID:", a), a) {
          this._currentUserId = a, this.logger.debug("💾 Set and storing user ID:", a);
          try {
            typeof localStorage < "u" && (localStorage.setItem("twerenbold_current_user_id", a), this.logger.debug("✅ User ID stored in localStorage"));
          } catch (n) {
            this.logger.warn("⚠️ Failed to store user ID:", n);
          }
        } else
          this.logger.warn("⚠️ Could not extract user ID from user object");
      } else
        this.logger.warn("⚠️ No user or account object available on auth component");
    } else this._currentUserId && this.logger.debug("✅ User ID already set:", this._currentUserId);
    return !0;
  }
  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================
  /**
   * Get cache key for a resource
   */
  _getCacheKey(e, t = null) {
    const i = t || this._currentUserId || "anonymous";
    return `${this.mode}_${e}_${i}`;
  }
  /**
   * Check if cache entry is valid
   */
  _isCacheValid(e, t) {
    const i = this._cache.get(e);
    return i ? Date.now() - i.timestamp < (t.ttl || nt) : !1;
  }
  /**
   * Get from cache
   */
  _getFromCache(e, t = null) {
    const i = this._cacheConfig[e];
    if (!i) return null;
    const r = this._getCacheKey(e, t);
    if (!this._isCacheValid(r, i))
      return this._cache.delete(r), null;
    const o = this._cache.get(r);
    return this.logger.debug("📦 Cache hit:", e, "for user:", t || this._currentUserId || "anonymous"), this._cloneData(o.data);
  }
  /**
   * Store in cache
   */
  _storeInCache(e, t, i = null) {
    if (!this._cacheConfig[e]) return;
    const o = this._getCacheKey(e, i), a = {
      data: this._cloneData(t),
      timestamp: Date.now(),
      mode: this.mode,
      userId: i || this._currentUserId || "anonymous"
    };
    this._cache.set(o, a), this.logger.debug("💾 Cached:", e, "for user:", a.userId), this._saveToLocalStorage(o, a);
  }
  /**
   * Invalidate cache for a resource
   */
  _invalidateCache(e, t = null, i = "manual") {
    const r = this._getCacheKey(e, t);
    if (this._cache.delete(r), typeof localStorage < "u")
      try {
        localStorage.removeItem(r);
      } catch (o) {
        this.logger.warn("⚠️ Failed to clear localStorage cache:", o);
      }
    this.logger.debug("♻️ Cache invalidated:", e, "reason:", i);
  }
  /**
   * Invalidate all cache for a mode
   */
  _invalidateCacheForMode(e, t = "mode-change") {
    const i = [];
    for (const [r] of this._cache.entries())
      r.startsWith(`${e}_`) && i.push(r);
    i.forEach((r) => {
      if (this._cache.delete(r), typeof localStorage < "u")
        try {
          localStorage.removeItem(r);
        } catch (o) {
          this.logger.warn("⚠️ Failed to clear localStorage:", o);
        }
    }), this.logger.debug("♻️ Cache cleared for mode:", e, "keys:", i.length, "reason:", t);
  }
  /**
   * Invalidate all cache for a user
   */
  _invalidateCacheForUser(e, t = "user-change") {
    if (!e) return;
    const i = e || "anonymous", r = [];
    for (const [o, a] of this._cache.entries())
      a.userId === i && r.push(o);
    r.forEach((o) => {
      if (this._cache.delete(o), typeof localStorage < "u")
        try {
          localStorage.removeItem(o);
        } catch (a) {
          this.logger.warn("⚠️ Failed to clear localStorage:", a);
        }
    }), this.logger.debug("♻️ Cache cleared for user:", i, "keys:", r.length, "reason:", t);
  }
  /**
   * Extract user ID from various auth user object formats
   * Supports: MSAL (oid, localAccountId), custom user objects (id, userId)
   * * For MSAL, tries multiple sources:
   * 1. Direct user object properties
   * 2. MSAL account object from auth component
   * 3. MSAL localStorage as last resort
   */
  _extractUserId(e, t = null) {
    var r, o;
    if (!e)
      return this.logger.debug("🔍 _extractUserId: user is null/undefined"), null;
    this.logger.userData("🔍 _extractUserId: trying to extract from user", e);
    let i = e.id || e.userId || e.oid || e.localAccountId || e.homeAccountId || e.sub || e.email || // Fallback to email
    e.username || // Fallback to username
    e.name || // Last resort fallback
    null;
    if (!i && t) {
      this.logger.debug("🔍 _extractUserId: trying auth component account...");
      const a = t.account || t._account;
      a && (this.logger.userData("🔍 _extractUserId: account object", a), i = a.localAccountId || ((r = a.homeAccountId) == null ? void 0 : r.split(".")[0]) || a.oid || null, this.logger.debug("🔍 _extractUserId: extracted from account:", i ? "[ID]" : "null"));
    }
    if (!i && typeof localStorage < "u") {
      this.logger.debug("🔍 _extractUserId: trying MSAL localStorage...");
      try {
        const a = JSON.parse(localStorage.getItem("msal.account.keys") || "[]");
        if (a.length > 0) {
          const n = a[0], s = JSON.parse(localStorage.getItem(n) || "null");
          s && (i = s.localAccountId || ((o = s.homeAccountId) == null ? void 0 : o.split(".")[0]) || s.oid || null, this.logger.debug("🔍 _extractUserId: extracted from MSAL localStorage:", i ? "[ID]" : "null"));
        }
      } catch (a) {
        this.logger.warn("⚠️ Failed to extract user ID from MSAL localStorage:", a);
      }
    }
    return this.logger.debug("🔍 _extractUserId: final extracted ID:", i ? "[ID]" : "null"), i;
  }
  /**
   * Public alias for handling user changes
   * Used by AppStateProvider to notify service of auth changes
   */
  handleAuthUserChange(e, t) {
    return this._handleAuthUserChange(e, t);
  }
  /**
   * Handle user change (login/logout/switch)
   * * SECURITY: Ensures complete cache isolation between users
   */
  _handleAuthUserChange(e, t) {
    const i = this._extractUserId(e, this.authComponent), r = this._extractUserId(t, this.authComponent);
    this.logger.debug("🔄 User change detected:", {
      previous: i,
      next: r,
      previousUser: e,
      nextUser: t
    });
    const o = i || this._currentUserId;
    this._currentUserId = r, r ? (this._storeUserIdInLocalStorage(r), this.logger.debug("💾 Stored user ID for cache keys:", r)) : o && !r && this.logger.debug("🗑️ Cleared stored user ID (logout)");
  }
  /**
   * Remove cache entries that belong to other users
   * This is a safety measure to prevent cross-user data leakage
   */
  _cleanupOtherUserCaches(e) {
    if (!(typeof localStorage > "u"))
      try {
        const t = Object.keys(localStorage).filter(
          (r) => r.includes("_trips_") || r.includes("_accountProfile_") || r.includes("_accountTravelers_") || r.includes("_clubStatus_")
        );
        let i = 0;
        t.forEach((r) => {
          const o = r.split("_"), a = o[o.length - 1];
          a !== e && a !== "anonymous" && (localStorage.removeItem(r), this._cache.delete(r), i++);
        }), i > 0 && this.logger.debug("🧹 Cleaned up", i, "cache entries from other users");
      } catch (t) {
        this.logger.warn("⚠️ Failed to cleanup other user caches:", t);
      }
  }
  /**
   * Clone data safely
   */
  _cloneData(e) {
    if (e == null) return e;
    if (typeof structuredClone == "function")
      try {
        return structuredClone(e);
      } catch (t) {
        this.logger.warn("structuredClone failed, falling back to JSON clone:", t);
      }
    try {
      return JSON.parse(JSON.stringify(e));
    } catch (t) {
      return this.logger.warn("JSON clone failed, returning original:", t), e;
    }
  }
  // ============================================================================
  // LOCAL STORAGE HELPERS
  // ============================================================================
  /**
   * Save data to localStorage for caching
   * Note: Only non-sensitive data (trips, profiles) is cached here.
   * Sensitive data like auth tokens are managed by OAuth component.
   */
  _saveToLocalStorage(e, t) {
    if (!(typeof localStorage > "u"))
      try {
        localStorage.setItem(e, JSON.stringify(t));
      } catch (i) {
        this.logger.warn("⚠️ Failed to save to localStorage:", i);
      }
  }
  _loadFromLocalStorage(e) {
    if (typeof localStorage > "u") return null;
    try {
      const t = localStorage.getItem(e);
      return t ? JSON.parse(t) : null;
    } catch (t) {
      return this.logger.warn("⚠️ Failed to load from localStorage:", t), null;
    }
  }
  /**
   * Store user ID for cache key purposes
   * Note: This is just the user ID for cache organization, not sensitive auth data
   */
  _storeUserIdInLocalStorage(e) {
    if (!(typeof localStorage > "u"))
      try {
        localStorage.setItem("twerenbold_current_user_id", e);
      } catch (t) {
        this.logger.warn("⚠️ Failed to store user ID:", t);
      }
  }
  _clearStoredUserId() {
    if (!(typeof localStorage > "u"))
      try {
        localStorage.removeItem("twerenbold_current_user_id");
      } catch (e) {
        this.logger.warn("⚠️ Failed to clear user ID:", e);
      }
  }
  // ============================================================================
  // LOADING STATE MANAGEMENT
  // ============================================================================
  _startLoading(e) {
    this._activeRequests++, this._activeRequests === 1 && (this._loadingStartTime = Date.now()), e && this._activeRequestLabels.add(this._getRequestLabel(e)), this._dispatchLoadingEvent(!0);
  }
  _stopLoading(e) {
    this._activeRequests--, e && this._activeRequestLabels.delete(this._getRequestLabel(e)), this._activeRequests <= 0 ? (this._activeRequests = 0, this._activeRequestLabels.clear(), this._loadingStartTime = null, this._dispatchLoadingEvent(!1)) : this._dispatchLoadingEvent(!0);
  }
  _getRequestLabel(e) {
    try {
      const t = new URL(e, this.baseUrl).pathname.toLowerCase();
      return t.includes("/trip") ? "Reisen werden geladen..." : t.includes("/favorites") ? "Merkliste wird aktualisiert..." : t.includes("/club") ? "Club-Status wird geprüft..." : t.includes("/profile") ? "Profil wird geladen..." : t.includes("/travelers") ? "Reiseteilnehmer werden geladen..." : t.includes("/newsletter") ? "Newsletter-Status wird geprüft..." : "Daten werden geladen...";
    } catch {
      return "Laden...";
    }
  }
  _dispatchLoadingEvent(e) {
    if (typeof document < "u") {
      const t = e ? "api-loading-start" : "api-loading-end", i = {
        activeRequests: Array.from(this._activeRequestLabels),
        startTime: this._loadingStartTime
      };
      document.dispatchEvent(new CustomEvent(t, {
        bubbles: !0,
        composed: !0,
        detail: i
      })), this.logger.debug(`🔄 API Loading State: ${e ? "STARTED" : "ENDED"} (${this._activeRequests} active)`, i.activeRequests);
    }
  }
  // ============================================================================
  // HTTP REQUEST HANDLING
  // ============================================================================
  /**
   * Make an authenticated API request
   * Includes request deduplication, error handling, and retry logic
   * Returns parsed JSON data directly
   */
  async makeAuthenticatedRequest(e, t = {}) {
    this.logger.debug("🌐 Making request to:", e, "method:", t.method || "GET");
    const i = `${e}:${t.method || "GET"}`, r = this._ongoingRequests.get(i);
    if (r)
      return this.logger.debug("🔄 Reusing existing request for:", i), r;
    this._startLoading(e);
    const a = (async () => {
      await this._waitForAuthReady();
      const n = await this._performRequest(e, t);
      return n.status === 204 ? (this.logger.debug("ℹ️ Response 204 No Content - returning null"), null) : n.json();
    })().finally(() => {
      this._stopLoading(e);
    });
    return this._ongoingRequests.set(i, a), a.finally(() => {
      this._ongoingRequests.delete(i);
    }), a;
  }
  /**
   * Perform the actual HTTP request with retry logic
   */
  async _performRequest(e, t = {}, i = 0) {
    let r;
    try {
      r = await this.getAuthHeaders();
    } catch (l) {
      throw l.message === "AUTH_TOKEN_MISSING" ? (this.logger.warn("🛑 Request aborted: Auth token missing (session expired)"), new Error("Authentifizierung erforderlich")) : l;
    }
    const o = {
      ...t,
      headers: {
        ...r,
        ...t.headers
      }
    };
    let a;
    try {
      const l = new AbortController(), g = setTimeout(() => l.abort(), Bi || 6e4);
      a = await fetch(e, {
        ...o,
        signal: l.signal
      }), clearTimeout(g);
    } catch (l) {
      const g = l.name === "AbortError";
      if (g ? this.logger.error(`❌ Request timeout (${Bi / 1e3}s) - API is very slow (attempt ${i + 1}/${le})`) : this.logger.error("❌ Network fetch failed:", l), i < le - 1) {
        const b = Gi * Math.pow(2, i), v = g ? `Verbindung wird in ${b / 1e3} Sekunden erneut versucht...` : `Netzwerk- oder Serverfehler. Erneuter Versuch in ${b / 1e3} Sekunden...`;
        return this.logger.debug(`🔄 Retrying request in ${b / 1e3}s...`), this._showGlobalNotification({
          type: g ? "info" : "warning",
          // Info for timeout retry, warning for network error
          title: "Erneuter Versuch",
          message: `${v} (Versuch ${i + 2}/${le})`,
          persistent: !1,
          duration: b
        }), await new Promise((y) => setTimeout(y, b)), this._performRequest(e, t, i + 1);
      }
      const p = g ? "Zeitüberschreitung" : "Server-Fehler", h = g ? `Die Anfrage konnte nach ${le} Versuchen nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.` : "Die Verbindung zum Server konnte nicht erfolgreich hergestellt werden.";
      this._showGlobalNotification({
        type: "error",
        title: p,
        message: h,
        persistent: !0
      });
      const m = g ? `Request timeout after ${le} attempts` : `Netzwerk-Fehler nach ${le} Versuchen: ${l.message}`;
      throw new Error(m);
    }
    this.logger.debug("📥 Response status:", a.status);
    const n = a.status === 401, s = a.status === 500 && i === 0;
    if ((n || s) && this.isLiveMode) {
      const l = n ? "401 Unauthorized" : "500 Internal Error (Token Suspect)";
      if (this.logger.warn(`🔑 ${l} - attempting token refresh...`), i >= le - 1)
        throw this.logger.error("🚫 Auth retry limit reached - aborting token refresh attempts"), this._showGlobalNotification({
          type: "error",
          title: "Authentifizierung fehlgeschlagen",
          message: "Die erneute Authentifizierung hat mehrfach nicht funktioniert. Bitte melden Sie sich erneut an.",
          persistent: !0
        }), new Error("AUTH_RETRY_EXCEEDED");
      try {
        if (!await this._resolveAccessToken(!0))
          throw this.logger.warn("⚠️ Token refresh returned null - user notification shown by auth component"), new Error("TOKEN_REFRESH_FAILED");
        return this.logger.debug("✅ Token refreshed successfully, retrying request..."), this._performRequest(e, t, i + 1);
      } catch (g) {
        throw g.message === "TOKEN_REFRESH_FAILED" ? (this.logger.debug("⏸️ Request cancelled - waiting for user to manually re-authenticate"), new Error("Authentifizierung erforderlich - bitte melden Sie sich an")) : (this.logger.error("❌ Token refresh failed:", g), s ? (this.logger.error("Server Fehler (500) persistiert nach Token Refresh für:", e), new Error("Server Fehler (500) persistiert nach Token Refresh")) : (this._showGlobalNotification({
          type: "error",
          title: "Authentifizierung fehlgeschlagen",
          message: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.",
          persistent: !0
        }), new Error("Authentifizierung fehlgeschlagen - bitte erneut anmelden")));
      }
    }
    if (!a.ok) {
      const l = await a.json().catch(() => ({}));
      throw this.logger.apiError(a.status, e, {
        method: t.method || "GET",
        message: l.message || a.statusText,
        responseData: l,
        context: "ApiService._performRequest"
      }), a.status >= 500 ? this.logger.error("Server Fehler", a.status, "für:", e) : a.status === 401 || a.status === 403 ? this._showGlobalNotification({
        type: "error",
        title: "Zugriff verweigert",
        message: a.status === 401 ? "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an." : "Sie haben keine Berechtigung für diese Aktion.",
        persistent: !0
      }) : a.status === 402 ? this._showGlobalNotification({
        type: "warning",
        title: "Zahlung erforderlich",
        message: "Für diese Aktion ist eine Zahlung erforderlich.",
        persistent: !0
      }) : a.status === 404 && this._showGlobalNotification({
        type: "warning",
        title: "Daten nicht gefunden",
        message: "Die angeforderten Daten konnten nicht gefunden werden.",
        autoHideDelay: 5e3
      }), new Error(`API Fehler: ${a.status} ${l.message || a.statusText}`);
    }
    return a;
  }
  // ============================================================================
  // TRIPS API METHODS
  // ============================================================================
  /**
   * Compatibility wrapper that mirrors the legacy tripsApiService.getTripsWithOptions
   * signature. Accepts an options object with optional onUpdate/onError callbacks.
   * Performs a cached read first and triggers an optional background refresh when
   * an update callback is provided.
   */
  async getTripsWithOptions(e = {}) {
    const t = typeof e == "boolean" ? { forceRefresh: e } : { ...e || {} }, {
      onUpdate: i,
      onError: r,
      forceRefresh: o,
      ...a
    } = t, n = await this.getTrips({ ...a, forceRefresh: o });
    return typeof i == "function" && Promise.resolve().then(async () => {
      try {
        const s = await this.getTrips({ ...a, forceRefresh: o });
        i(s);
      } catch (s) {
        if (this.logger.warn("⚠️ Hintergrundaktualisierung der Reisen fehlgeschlagen:", s), typeof r == "function")
          try {
            r(s);
          } catch (l) {
            this.logger.error("⚠️ onError Callback warf einen Fehler:", l);
          }
      }
    }), n;
  }
  /**
   * Get all trips with caching and Stale-While-Revalidate (SWR) pattern
   * * Performance Strategy:
   * 1. If cached data exists (even if stale) → Return immediately
   * 2. If cache is stale or forceRefresh → Revalidate in background
   * 3. If no cache → Fetch fresh data (blocking)
   * * This ensures:
   * - Instant page loads (cached data shown immediately)
   * - Fresh data arrives in background without blocking UI
   * - Users see stale content while fresh content is loading
   * - Components can listen to 'trips-updated' event for background updates
   * * @param {Object|boolean} options - Options object or boolean for forceRefresh
   * @param {boolean} options.forceRefresh - Force background revalidation even if cache is fresh
   * @returns {Promise<Array>} Array of trips
   */
  async getTrips(e = {}) {
    const t = e === !0 || (e == null ? void 0 : e.forceRefresh) === !0, i = this._currentUserId;
    if (this.isLiveMode && !i) {
      this.logger.debug("⏳ No user ID yet in live mode, checking if auth is pending...");
      const n = Date.now(), s = 2e3;
      for (; !this._currentUserId && Date.now() - n < s; )
        await new Promise((l) => setTimeout(l, 100)), this.authComponent || this._recoverAuthComponent({ reason: "getTrips-waiting-for-auth" });
      if (!this._currentUserId)
        return this.logger.warn("⚠️ No user ID available after waiting, fetching without cache"), this._fetchAndCacheTrips(null, !1);
      this.logger.debug("✅ User ID available after waiting:", this._currentUserId);
    }
    const r = this._getCacheKey("trips", this._currentUserId || i), o = this._cache.get(r);
    if (!!(o != null && o.data)) {
      this.logger.debug("🎯 [SWR] Returning cached trips immediately");
      const n = this._currentUserId || i;
      if (this.isLiveMode && o.userId && n && o.userId !== n)
        return this.logger.error("🚨 Cache user mismatch! Clearing invalid cache.", {
          cacheUser: o.userId,
          currentUser: n
        }), this._cache.delete(r), this._fetchAndCacheTrips(n, !1);
      const s = this._cloneData(o.data), l = this._cacheConfig.trips, p = Date.now() - o.timestamp >= ((l == null ? void 0 : l.ttl) || nt);
      return p || t ? (this.logger.debug(`🔄 [SWR] Cache is ${p ? "stale" : "forced refresh"}, revalidating in background...`), this._revalidateTripsInBackground(i).catch((h) => {
        this.logger.warn("⚠️ Background revalidation failed:", h);
      })) : this.logger.debug("✨ [SWR] Cache is fresh, no background refresh needed"), Promise.resolve(s);
    }
    return this.logger.debug("🔄 No cached trips found, fetching fresh data (blocking)..."), this._fetchAndCacheTrips(i, !1);
  }
  /**
   * Revalidate trips in background (Stale-While-Revalidate)
   */
  async _revalidateTripsInBackground(e) {
    if (this._isRevalidatingTrips) {
      this.logger.debug("⏭️ Skipping background revalidation - already in progress");
      return;
    }
    this._isRevalidatingTrips = !0;
    try {
      this.logger.debug("🔄 [SWR] Background revalidation started - fetching fresh trips..."), await new Promise((i) => setTimeout(i, 100));
      const t = await this._fetchAndCacheTrips(e, !0);
      if (typeof document < "u") {
        const i = new CustomEvent("trips-updated", {
          detail: {
            trips: t,
            source: "background-revalidation",
            timestamp: Date.now()
          }
        });
        document.dispatchEvent(i), this.logger.debug("📡 [SWR] Dispatched trips-updated event");
      }
      this.logger.debug(`✅ [SWR] Background revalidation completed: ${t.length} trips cached`);
    } catch (t) {
      this.logger.warn("⚠️ [SWR] Background revalidation failed:", t.message);
    } finally {
      this._isRevalidatingTrips = !1;
    }
  }
  /**
   * Fetch and cache trips (internal helper)
   */
  async _fetchAndCacheTrips(e, t = !1) {
    this.isLiveMode && !t && await this._waitForAuthReady();
    let i;
    this.isDemoMode ? i = await this._fetchTripsFromDemo() : i = await this._fetchTripsFromApi();
    const r = this._normalizeTrips(i), o = e || this._currentUserId;
    return this._storeInCache("trips", r, o), this.logger.debug("✅ Fetched and cached trips for user:", o || "anonymous"), r;
  }
  /**
   * Fetch trips from demo data
   */
  async _fetchTripsFromDemo() {
    const t = await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json(), i = [];
    return t.trips && (t.trips.current && i.push(...Array.isArray(t.trips.current) ? t.trips.current : [t.trips.current]), t.trips.upcoming && i.push(...Array.isArray(t.trips.upcoming) ? t.trips.upcoming : []), t.trips.past && i.push(...Array.isArray(t.trips.past) ? t.trips.past : [])), i;
  }
  /**
   * Fetch trips from API
   */
  async _fetchTripsFromApi() {
    const e = `${this.baseUrl}${this.endpoints.paths.trips}`, t = await this.makeAuthenticatedRequest(e);
    if (Array.isArray(t))
      return t;
    const i = [];
    return ["trips", "all", "current", "upcoming", "past", "archived", "future", "history"].forEach((o) => {
      t[o] && (Array.isArray(t[o]) ? i.push(...t[o]) : i.push(t[o]));
    }), i;
  }
  /**
   * Normalize trips data to consistent format
   */
  _normalizeTrips(e) {
    if (!Array.isArray(e)) return [];
    const t = /* @__PURE__ */ new Map(), i = [];
    return e.forEach((r) => {
      var s;
      if (!r || typeof r != "object") return;
      const o = r.bookingNumber || r.dossier || r.reference || r.bookingRef, a = o ? `${o}|${r.productCode || r.code || ""}|${((s = r.dates) == null ? void 0 : s.departureDate) || r.departureDate || ""}` : r.id || r.tripId || JSON.stringify(r);
      if (t.has(a)) return;
      const n = this._enrichTrip(r);
      n && (t.set(a, !0), i.push(n));
    }), i;
  }
  /**
   * Enrich trip with normalized fields
   */
  _enrichTrip(e) {
    var i, r, o, a, n, s, l;
    if (!e || typeof e != "object") return null;
    const t = { ...e };
    return t.departureDate = e.departureDate || ((i = e.dates) == null ? void 0 : i.departureDate) || e.startDate || e.beginDate || null, t.returnDate = e.returnDate || ((r = e.dates) == null ? void 0 : r.returnDate) || e.endDate || e.finishDate || null, t.duration = e.duration || ((o = e.dates) == null ? void 0 : o.duration) || null, t.price = e.price ?? ((a = e.pricing) == null ? void 0 : a.totalAmount) ?? ((n = e.pricing) == null ? void 0 : n.amount) ?? null, t.currency = e.currency || ((s = e.pricing) == null ? void 0 : s.currency) || null, t.bookingNumber = e.bookingNumber || e.dossier || e.reference || e.reservationNumber || null, t.code = e.code || e.tripCode || e.productCode || null, t.title = e.title || e.name || e.productName || "Unbenannte Reise", t.destination = e.destination || e.location || e.city || t.destination, t.status = this._normalizeTripStatus(e.status), t.image = e.image || ((l = e.media) == null ? void 0 : l.mainImage) || e.photo || null, (e.media || t.image) && (t.media = {
      ...e.media,
      mainImage: t.image
    }), t;
  }
  /**
   * Normalize trip status
   */
  _normalizeTripStatus(e) {
    if (e == null) return e;
    const t = e.toString().toLowerCase();
    return {
      booked: "confirmed",
      confirmed: "confirmed",
      guaranteed: "confirmed",
      current: "confirmed",
      active: "confirmed",
      completed: "completed",
      finished: "completed",
      past: "completed",
      cancelled: "cancelled",
      canceled: "cancelled",
      pending_payment: "pending",
      pending: "pending",
      waitlist: "waitlist"
    }[t] || e;
  }
  /**
   * Get details for a specific trip
   */
  async getTripDetails(e) {
    const t = `${this.baseUrl}${this.endpoints.paths.trips}/${e}`, i = await this.makeAuthenticatedRequest(t);
    return this._enrichTrip(i);
  }
  /**
   * Update a trip
   */
  async updateTrip(e, t) {
    const i = `${this.baseUrl}${this.endpoints.paths.trips}/${e}`, r = await this.makeAuthenticatedRequest(i, {
      method: "PUT",
      body: JSON.stringify(t)
    });
    return this._invalidateCache("trips", this._currentUserId, "trip-updated"), r;
  }
  // ============================================================================
  // ACCOUNT API METHODS
  // ============================================================================
  /**
   * Get account profile
   */
  async getAccountProfile() {
    const e = this._currentUserId, t = this._getFromCache("accountProfile", e);
    if (t) return t;
    let i;
    if (this.isDemoMode)
      i = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).profile || null;
    else {
      const r = `${this.baseUrl}${this.endpoints.paths.accountProfile}`, o = await this.makeAuthenticatedRequest(r);
      i = this._transformAccountProfile(o);
    }
    this._storeInCache("accountProfile", i, e);
    try {
      this.logger.debug("📡 getAccountProfile: returning profile with isClient:", i == null ? void 0 : i.isClient, "type:", typeof (i == null ? void 0 : i.isClient), "userId:", e);
    } catch {
    }
    return i;
  }
  /**
   * Transform nested account profile from API to flat structure
   */
  _transformAccountProfile(e) {
    if (!e) return null;
    const { personalData: t, address: i, contact: r, metaData: o, clubMembership: a, travelers: n, id: s } = e, l = (g) => {
      if (!g) return "";
      const p = g.toString().toLowerCase().trim();
      return p === "herr" ? "mr" : p === "frau" ? "ms" : p === "mr" || p === "ms" ? p : g;
    };
    return {
      // Personal data (flattened)
      id: s || null,
      isClient: (t == null ? void 0 : t.isClient) !== void 0 ? t.isClient : e.isClient !== void 0 ? e.isClient : null,
      salutation: l(t == null ? void 0 : t.salutation),
      firstName: (t == null ? void 0 : t.firstName) || "",
      lastName: (t == null ? void 0 : t.lastName) || "",
      dateOfBirth: (t == null ? void 0 : t.dateOfBirth) || "",
      isNameLocked: (t == null ? void 0 : t.isNameLocked) || !1,
      isDateOfBirthLocked: (t == null ? void 0 : t.isDateOfBirthLocked) || !1,
      // Address (flattened)
      address: (i == null ? void 0 : i.street) || "",
      street: (i == null ? void 0 : i.street) || "",
      zip: (i == null ? void 0 : i.zipCode) || "",
      zipCode: (i == null ? void 0 : i.zipCode) || "",
      city: (i == null ? void 0 : i.city) || "",
      country: (i == null ? void 0 : i.country) || "",
      // Contact (flattened)
      email: (r == null ? void 0 : r.email) || "",
      phoneMain: (r == null ? void 0 : r.phoneMain) || "",
      phoneMobile: (r == null ? void 0 : r.phoneMobile) || "",
      isEmailLocked: (r == null ? void 0 : r.isEmailLocked) || !1,
      // Metadata
      lastUpdated: (o == null ? void 0 : o.lastUpdated) || null,
      createdAt: (o == null ? void 0 : o.createdAt) || null,
      lockReasons: (o == null ? void 0 : o.lockReasons) || {},
      upcomingBookings: (o == null ? void 0 : o.upcomingBookings) || 0,
      // Club membership (keep nested)
      clubMembership: a || null,
      // Travelers (if included in profile response) - transform to ensure consistent structure
      travelers: Array.isArray(n) ? n.map((g) => this._transformTraveler(g)) : []
    };
  }
  /**
   * Update account profile (PUT for existing, POST for new)
   * Auto-detects if profile exists based on presence of ID
   * * @param {Object} profileData - Profile data to save
   * @param {Object} options - { forceCreate: boolean, forceUpdate: boolean }
   * @returns {Promise<Object>} Saved profile
   */
  async updateAccountProfile(e, t = {}, i = 0) {
    var s, l, g, p, h, m;
    const { forceCreate: r = !1, forceUpdate: o = !1 } = t;
    if (this.isDemoMode)
      return { ...e, id: e.id || `profile_${Date.now()}` };
    const a = `${this.baseUrl}${this.endpoints.paths.accountProfile}`;
    let n = "PUT";
    r ? n = "PUT" : !o && !e.id && (n = "PUT", this.logger.debug("ℹ️ No profile ID found, attempting POST (create new profile)"));
    try {
      const b = await this.makeAuthenticatedRequest(a, {
        method: n,
        body: JSON.stringify(e)
      });
      return this._invalidateCache("accountProfile", this._currentUserId, "profile-updated"), b;
    } catch (b) {
      if (!r && !o) {
        if (n === "POST" && ((s = b.message) != null && s.includes("409")))
          return this.logger.debug("⚠️ Profile already exists (409), switching to PUT..."), this.updateAccountProfile(e, { forceUpdate: !0 });
        if (n === "PUT" && ((l = b.message) != null && l.includes("404")))
          return this.logger.debug("⚠️ Profile not found (404), switching to POST..."), this.updateAccountProfile(e, { forceCreate: !0 });
      }
      if ((((g = b.message) == null ? void 0 : g.includes("timeout")) || ((p = b.message) == null ? void 0 : p.includes("Netzwerk")) || ((h = b.message) == null ? void 0 : h.includes("fetch")) || ((m = b.message) == null ? void 0 : m.includes("AbortError"))) && i < le - 1) {
        const y = Gi * Math.pow(2, i);
        return this.logger.debug(`🔄 Network/timeout error - retrying profile update in ${y / 1e3}s (attempt ${i + 2}/${le})...`), this._showGlobalNotification({
          type: "warning",
          title: "Verbindungsproblem",
          message: `Speichern fehlgeschlagen. Erneuter Versuch in ${y / 1e3} Sekunden... (Versuch ${i + 2}/${le})`,
          persistent: !1,
          duration: y
        }), await new Promise((I) => setTimeout(I, y)), this.updateAccountProfile(e, t, i + 1);
      }
      throw i >= le - 1 && (this.logger.error(`❌ Profile update failed after ${le} attempts`), this._showGlobalNotification({
        type: "error",
        title: "Speichern fehlgeschlagen",
        message: `Die Profildaten konnten nach ${le} Versuchen nicht gespeichert werden. Bitte versuchen Sie es später erneut.`,
        persistent: !0
      })), b;
    }
  }
  /**
   * Create a new account profile (explicit POST)
   * Use this when you're sure the profile doesn't exist yet
   * * @param {Object} profileData - Profile data
   * @returns {Promise<Object>} Created profile
   */
  async createAccountProfile(e) {
    if (this.isDemoMode)
      return { ...e, id: `profile_${Date.now()}` };
    const t = `${this.baseUrl}${this.endpoints.paths.accountProfile}`, i = await this.makeAuthenticatedRequest(t, {
      method: "POST",
      body: JSON.stringify(e)
    });
    return this._invalidateCache("accountProfile", this._currentUserId, "profile-created"), i;
  }
  /**
   * Get account travelers
   */
  async getAccountTravelers() {
    const e = this._currentUserId, t = this._getFromCache("accountTravelers", e);
    if (t) return t;
    let i;
    if (this.isDemoMode)
      i = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).travelers || [];
    else {
      const r = `${this.baseUrl}${this.endpoints.paths.accountTravelers}`, o = await this.makeAuthenticatedRequest(r);
      i = Array.isArray(o) ? o.map((a) => this._transformTraveler(a)) : [];
    }
    return this._storeInCache("accountTravelers", i, e), i;
  }
  /**
   * Transform traveler from API structure to component structure
   * API uses German field names (vorname, nachname, etc.)
   * Component expects English field names (firstName, lastName, etc.)
   */
  _transformTraveler(e) {
    return e ? {
      id: e.id || null,
      firstName: e.vorname || e.firstName || "",
      lastName: e.nachname || e.lastName || "",
      dateOfBirth: e.geburtstag || e.dateOfBirth || "",
      salutation: e.anrede || e.salutation || "",
      relation: e.relation || "friend",
      isLocked: e.isLocked !== void 0 ? e.isLocked : !1,
      lockReasons: e.lockReasons || {
        nameChange: "",
        emailChange: ""
      },
      errorMessage: e.errorMessage || null
    } : null;
  }
  /**
   * Update account travelers (legacy method - updates entire list)
   */
  async updateAccountTravelers(e) {
    const t = `${this.baseUrl}${this.endpoints.paths.accountTravelers}`, i = await this.makeAuthenticatedRequest(t, {
      method: "PUT",
      body: JSON.stringify({ travelers: e })
    });
    return this._invalidateCache("accountTravelers", this._currentUserId, "travelers-updated"), i;
  }
  /**
   * Add a new traveler (POST /account/travelers)
   * @param {Object} travelerData - { firstName, lastName, dateOfBirth, relation, salutation }
   * @returns {Promise<Object>} Created traveler
   */
  async addTraveler(e) {
    if (this.isDemoMode)
      return {
        id: `traveler_${Date.now()}`,
        ...e,
        isLocked: !1
      };
    const t = `${this.baseUrl}${this.endpoints.paths.accountTravelers}`, i = await this.makeAuthenticatedRequest(t, {
      method: "POST",
      body: JSON.stringify(e)
    });
    if (i.success === !1) {
      const o = i.message || (Array.isArray(i.errors) ? i.errors.join(", ") : "Unbekannter Fehler");
      throw new Error(o);
    }
    const r = i.traveler || i;
    return this._invalidateCache("accountTravelers", this._currentUserId, "traveler-added"), this._transformTraveler(r);
  }
  /**
   * Update a specific traveler (PUT /account/travelers/{travelerId})
   * @param {string} travelerId - Traveler ID
   * @param {Object} travelerData - Updated traveler data
   * @returns {Promise<Object>} Updated traveler
   */
  async updateTraveler(e, t) {
    if (this.isDemoMode)
      return {
        id: e,
        ...t
      };
    const i = `${this.baseUrl}${this.endpoints.paths.accountTravelers}/${encodeURIComponent(e)}`, r = await this.makeAuthenticatedRequest(i, {
      method: "PUT",
      body: JSON.stringify(t)
    });
    if (r.success === !1) {
      const a = r.message || (Array.isArray(r.errors) ? r.errors.join(", ") : "Unbekannter Fehler");
      throw new Error(a);
    }
    const o = r.traveler || r;
    return this._invalidateCache("accountTravelers", this._currentUserId, "traveler-updated"), this._transformTraveler(o);
  }
  /**
   * Delete a traveler (DELETE /account/travelers/{travelerId})
   * @param {string} travelerId - Traveler ID
   * @returns {Promise<void>}
   */
  async deleteTraveler(e) {
    if (this.isDemoMode)
      return;
    const t = `${this.baseUrl}${this.endpoints.paths.accountTravelers}/${encodeURIComponent(e)}`;
    await this.makeAuthenticatedRequest(t, {
      method: "DELETE"
    }), this._invalidateCache("accountTravelers", this._currentUserId, "traveler-deleted");
  }
  /**
   * Get a specific traveler (GET /account/travelers/{travelerId})
   * @param {string} travelerId - Traveler ID
   * @returns {Promise<Object>} Traveler data
   */
  async getTraveler(e) {
    if (this.isDemoMode)
      return (await this.getAccountTravelers()).find((o) => o.id === e) || null;
    const t = `${this.baseUrl}${this.endpoints.paths.accountTravelers}/${encodeURIComponent(e)}`, i = await this.makeAuthenticatedRequest(t);
    return this._transformTraveler(i);
  }
  // ============================================================================
  // CLUB STATUS API METHODS
  // ============================================================================
  /**
   * Get club status
   */
  async getClubStatus() {
    const e = this._currentUserId, t = this._getFromCache("clubStatus", e);
    if (t) return t;
    let i;
    if (this.isDemoMode || this.isLocalMode || this.clubApiDisabled)
      i = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).clubMembership || null;
    else {
      const r = `${this.baseUrl}${this.endpoints.paths.clubStatus}`;
      i = await this.makeAuthenticatedRequest(r);
    }
    return this._storeInCache("clubStatus", i, e), i;
  }
  /**
   * Get club benefits
   */
  async getClubBenefits() {
    if (this.isDemoMode || this.isLocalMode)
      return (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).clubBenefits || [];
    {
      const e = `${this.baseUrl}${this.endpoints.paths.clubBenefits}`;
      return await this.makeAuthenticatedRequest(e);
    }
  }
  // ============================================================================
  // NOTIFICATION HELPERS
  // ============================================================================
  /**
   * Show global notification with multiple fallback strategies
   */
  _showGlobalNotification(e) {
    var a, n;
    if (typeof document > "u") return;
    this.logger.debug("🔔 Showing notification:", e);
    const t = document.querySelector("app-state-provider");
    if (t && typeof t.addNotification == "function") {
      this.logger.debug("✅ Using app-state-provider.addNotification"), t.addNotification(e);
      return;
    }
    if (typeof window < "u" && ((n = (a = window.__twerenboldAppState) == null ? void 0 : a.actions) != null && n.addNotification)) {
      this.logger.debug("✅ Using window.__twerenboldAppState.actions.addNotification"), window.__twerenboldAppState.actions.addNotification(e);
      return;
    }
    const i = document.querySelector("auth-notification-component") || document.querySelector("auth-notifications");
    if (i && typeof i.showNotification == "function") {
      this.logger.debug("✅ Using auth-notification-component.showNotification"), i.showNotification({
        ...e,
        _fromAppState: !1
        // Prevent infinite loop
      });
      return;
    }
    this.logger.debug("⚠️ Falling back to custom event dispatch");
    const r = new CustomEvent("twerenbold:notification", {
      detail: e,
      bubbles: !0,
      composed: !0
    });
    document.dispatchEvent(r);
    const o = `${e.title || "Notification"}: ${e.message || ""}`;
    e.type === "error" ? this.logger.error("🚨", o) : e.type === "warning" ? this.logger.warn("⚠️", o) : this.logger.debug("ℹ️", o);
  }
  /**
   * Show mode change notification
   */
  _showModeChangeNotification(e) {
    const i = {
      demo: "Demo-Modus (Statische Daten)",
      local: "Entwicklungs-Modus (Lokaler Server)",
      live: "Live-System (Produktions-API)"
    }[e] || e;
    setTimeout(() => {
      this._showGlobalNotification({
        type: "info",
        title: "API-Modus geändert",
        message: `Die Anwendung verwendet jetzt den ${i}.`,
        autoHideDelay: 3e3
      });
    }, 100);
  }
  // ============================================================================
  // GENERIC API CALL METHOD
  // ============================================================================
  /**
   * Generic API call method for custom endpoints
   */
  async apiCall(e, t = "GET", i = null) {
    const r = `${this.baseUrl}${e}`, o = {
      method: t,
      ...i && { body: JSON.stringify(i) }
    };
    return await this.makeAuthenticatedRequest(r, o);
  }
}
const x = new vr(), ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApiService: vr,
  apiService: x
}, Symbol.toStringTag, { value: "Module" })), Q = (() => {
  let c = [], e = !1, t = null, i = null;
  function r() {
    return !!(window._hsq && typeof window._hsq.push == "function");
  }
  function o(m) {
    r() ? window._hsq.push(m) : c.push(m);
  }
  function a() {
    if (r())
      for (; c.length; )
        window._hsq.push(c.shift());
  }
  function n(m) {
    !m || typeof m != "object" || o(["identify", m]);
  }
  function s(m) {
    !m || e || (e = !0, o(["identify", { email: m }]), o(["trackPageView"]));
  }
  function l() {
    e = !1, o(["trackEvent", { id: "logout" }]);
  }
  function g() {
    const m = location.pathname + location.search + location.hash;
    m !== t && (t = m, o(["setPath", m]), o(["trackPageView"]));
  }
  function p() {
    clearTimeout(i), i = setTimeout(g, 80);
  }
  window.addEventListener("hashchange", p), ["pushState", "replaceState"].forEach((m) => {
    const b = history[m];
    history[m] = function() {
      const v = b.apply(this, arguments);
      return p(), v;
    };
  });
  const h = setInterval(() => {
    r() && (clearInterval(h), a());
  }, 300);
  return setTimeout(p, 0), {
    identify: s,
    reset: l,
    flush: a,
    updateUserProperties: n,
    track: p
  };
})(), Et = {
  modes: {
    demo: {
      components: {
        newsletter: !0,
        favorites: !0,
        clubStatus: !0,
        trips: !0,
        accountOverview: !0,
        accountPortal: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      integrations: {
        hubspot: { id: "8654209" }
      }
    },
    local: {
      components: {
        newsletter: !0,
        favorites: !0,
        clubStatus: !0,
        trips: !0,
        accountOverview: !0,
        accountPortal: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      integrations: {
        hubspot: { id: "8654209" }
      }
    },
    live: {
      components: {
        newsletter: !0,
        favorites: !0,
        clubStatus: !1,
        trips: !0,
        accountOverview: !0,
        accountPortal: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      integrations: {
        hubspot: { id: "8654209" }
      }
    }
  },
  themes: {
    twr: {
      components: {
        favorites: !0,
        supportBlock: !1,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      favorites: {
        revalidateEnabled: !0
      },
      integrations: {
        hubspot: { id: "" }
      },
      contact: {
        phone: "+41 (0) 56 484 84 84",
        openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "travel-list",
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 0,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      }
    },
    twerenbold: {
      components: {
        favorites: !0,
        supportBlock: !1,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      favorites: {
        revalidateEnabled: !0
      },
      integrations: {
        hubspot: { id: "" }
      },
      contact: {
        phone: "+41 (0) 56 484 84 84",
        openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "travel-list",
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 0,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      },
      auth: {
        flow: "redirect"
        // 'popup' or 'redirect'
      }
    },
    imbach: {
      components: {
        favorites: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      favorites: {
        revalidateEnabled: !0
      },
      integrations: {
        hubspot: { id: "" }
      },
      contact: {
        phone: "+41 (0) 41 418 00 00",
        openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "travel-list",
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 2,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      }
    },
    excellence: {
      components: {
        favorites: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      favorites: {
        revalidateEnabled: !0,
        // KK-231: excellence.ch führt einen eigenen Merkzettel (CMS-IDs, kein Watchlist-Sync).
        // Der Leerzustand verlinkt dorthin.
        websiteWishlist: { url: "/merkzettel", label: "Zum Merkzettel" }
      },
      integrations: {
        hubspot: { id: "" }
      },
      contact: {
        phone: "+41 (0) 56 484 84 84",
        // Fallback to Twerenbold for now if specific info not known
        openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "travel-list",
        // Defaulting excellence to share Twerenbold list or similar? User said 4.
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 4,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      }
    },
    voegele: {
      components: {
        favorites: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !0
      },
      favorites: {
        revalidateEnabled: !0
      },
      integrations: {
        hubspot: { id: "8654209" }
      },
      contact: {
        phone: "043 960 86 10",
        // Fallback
        openingHours: "Mo-Fr 09-12:00 / 13-17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "watchlist",
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 1,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      }
    },
    mittelthurgau: {
      // Added missing theme key for completeness
      components: {
        favorites: !0,
        supportBlock: !0,
        authSection: !0,
        apiModeSection: !1,
        themeSwitcherSection: !1
      },
      favorites: {
        revalidateEnabled: !0
      },
      integrations: {
        hubspot: { id: "" }
      },
      contact: {
        phone: "+41 (0) 71 626 85 85",
        openingHours: "Mo-Fr: 08:00 - 12:00 / 13:30 - 17:00 Uhr"
      },
      watchlist: {
        baseUrl: "https://account-ase-prod-001.azurewebsites.net",
        targetKey: "travel-list",
        // Assume default key if not specified
        tokenKey: "azure_token",
        interval: 1e3,
        debug: !1,
        providerId: 3,
        preventEmptyDelete: !0,
        logLocalWipe: !0,
        guardDeleteByServer: !0
      }
    }
  }
}, Xe = (c = {}, e = {}) => {
  const t = { ...c };
  for (const i of Object.keys(e))
    e[i] && typeof e[i] == "object" && !Array.isArray(e[i]) ? t[i] = Xe(c[i], e[i]) : t[i] = e[i];
  return t;
};
let _t = { modes: {}, themes: {}, components: {} };
function wr(c = {}) {
  _t = Xe(_t, c || {});
}
function ge(c = "demo", e = null) {
  var a, n, s, l, g, p;
  const t = Et.modes[c] ? Et.modes[c] : Et.modes.demo || {}, i = ((a = _t.modes) == null ? void 0 : a[c]) || {}, r = Xe({}, Xe(t, i));
  if (e) {
    const h = Et.themes[e] || {}, m = ((n = _t.themes) == null ? void 0 : n[e]) || {}, b = Xe(r, Xe(h, m));
    return ((l = (s = b.integrations) == null ? void 0 : s.hubspot) == null ? void 0 : l.id) === "" && delete b.integrations.hubspot.id, b;
  }
  const o = _t.components || {};
  return o && Object.keys(o).length > 0 && (r.components = Xe(r.components || {}, o)), ((p = (g = r.integrations) == null ? void 0 : g.hubspot) == null ? void 0 : p.id) === "" && delete r.integrations.hubspot.id, r;
}
function j(c, e = "demo", t = null) {
  const i = ge(e, t);
  return i != null && i.components && typeof i.components[c] < "u" ? !!i.components[c] : !0;
}
const oo = {
  getConfigFor: ge,
  isComponentEnabled: j
}, Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oo,
  getConfigFor: ge,
  isComponentEnabled: j,
  setRuntimeOverrides: wr
}, Symbol.toStringTag, { value: "Module" }));
class ui extends $e {
  constructor() {
    super(), this.logger = Ne("AuthNotifications"), this.show = !1, this.title = "Benachrichtigung", this.message = "", this.type = "info", this.persistent = !1, this.autoHideDelay = 5e3, this.actions = [], this._autoHideTimer = null, this._activeNotification = null, this._customEventHandler = null, this._contextConsumer = new Zt(this, {
      context: Ii,
      callback: (e) => {
        this._contextValue = e, this._onContextChanged(e);
      },
      subscribe: !0
    });
  }
  get appState() {
    var e;
    return (e = this._contextValue) == null ? void 0 : e.state;
  }
  get appActions() {
    var e;
    return (e = this._contextValue) == null ? void 0 : e.actions;
  }
  _onContextChanged(e) {
    var t, i;
    this.logger.debug("Context changed", {
      notifications: ((i = (t = e == null ? void 0 : e.state) == null ? void 0 : t.notifications) == null ? void 0 : i.length) || 0,
      hasActions: !!(e != null && e.actions)
    }), this._syncWithAppState();
  }
  connectedCallback() {
    super.connectedCallback(), this._customEventHandler = (e) => {
      this.logger.debug("Received custom event:", e.detail), this.showNotification({
        ...e.detail,
        _fromAppState: !1
      });
    }, document.addEventListener("twerenbold:notification", this._customEventHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearAutoHideTimer(), this._customEventHandler && (document.removeEventListener("twerenbold:notification", this._customEventHandler), this._customEventHandler = null);
  }
  updated(e) {
    super.updated(e), e.has("show") && (this.show && !this.persistent ? this._startAutoHideTimer() : this.show || this._clearAutoHideTimer());
  }
  showNotification(e = {}) {
    var i;
    if ((i = this.appActions) != null && i.addNotification && !e._fromAppState) {
      this.appActions.addNotification(e);
      return;
    }
    const t = this._normalizeNotification(e, { source: "local" });
    this._displayNotification(t);
  }
  hide(e = {}) {
    var r;
    const { skipStateRemoval: t = !1 } = e;
    this._clearAutoHideTimer();
    const i = this._activeNotification;
    this._activeNotification = null, this.show = !1, this.actions = [], !t && (i == null ? void 0 : i.source) === "global" && ((r = this.appActions) != null && r.removeNotification) && this.appActions.removeNotification(i.id), this.dispatchEvent(new CustomEvent("notification-hidden", {
      bubbles: !0
    }));
  }
  _syncWithAppState() {
    var r, o, a, n;
    const e = ((r = this.appState) == null ? void 0 : r.notifications) || [];
    if (this.logger.debug("_syncWithAppState:", {
      notificationCount: e.length,
      notifications: e,
      activeNotification: this._activeNotification,
      show: this.show
    }), !e.length) {
      ((o = this._activeNotification) == null ? void 0 : o.source) === "global" && (this.logger.debug("Hiding notification - no notifications in queue"), this.hide({ skipStateRemoval: !0 }));
      return;
    }
    const t = e[0];
    if (((a = this._activeNotification) == null ? void 0 : a.source) === "global" && ((n = this._activeNotification) == null ? void 0 : n.id) === t.id) {
      this.logger.debug("Same notification already showing, skipping");
      return;
    }
    this.logger.debug("Displaying new notification:", t);
    const i = this._normalizeNotification(t, { source: "global", id: t.id });
    this._displayNotification(i, !0);
  }
  _normalizeNotification(e = {}, t = {}) {
    const i = e.type || "info", r = i === "auth";
    return {
      id: e.id ?? t.id ?? `local-${Date.now()}`,
      title: e.title || "Benachrichtigung",
      message: e.message || "",
      type: i,
      persistent: e.persistent !== void 0 ? e.persistent : r,
      autoHideDelay: e.autoHideDelay || (r ? 1e4 : 5e3),
      actions: Array.isArray(e.actions) ? e.actions : [],
      source: t.source || "local"
    };
  }
  _displayNotification(e, t = !1) {
    this.logger.debug("_displayNotification called:", {
      notification: e,
      fromAppState: t,
      currentShow: this.show
    }), this._clearAutoHideTimer(), this._activeNotification = e, this.title = e.title, this.message = e.message, this.type = e.type, this.persistent = e.persistent, this.autoHideDelay = e.autoHideDelay, this.actions = [...e.actions], this.show = !0, this.logger.info("Notification UI updated:", {
      show: this.show,
      title: this.title,
      type: this.type
    }), this.dispatchEvent(new CustomEvent("notification-shown", {
      detail: {
        title: this.title,
        message: this.message,
        type: this.type,
        source: e.source,
        fromAppState: t
      },
      bubbles: !0
    })), this.persistent || this._startAutoHideTimer();
  }
  _startAutoHideTimer() {
    this._clearAutoHideTimer(), this._autoHideTimer = setTimeout(() => this.hide(), this.autoHideDelay);
  }
  _clearAutoHideTimer() {
    this._autoHideTimer && (clearTimeout(this._autoHideTimer), this._autoHideTimer = null);
  }
  /**
   * Handle reauthentication action
   */
  _handleReauthenticate() {
    this.hide();
    const e = document.querySelector("oauth-login");
    e && (typeof e.login == "function" ? e.login() : typeof e.authenticate == "function" && e.authenticate()), this.dispatchEvent(new CustomEvent("reauthenticate-requested", {
      bubbles: !0
    }));
  }
  /**
   * Handle dismiss action
   */
  _handleDismiss() {
    this.hide(), this.dispatchEvent(new CustomEvent("notification-dismissed", {
      bubbles: !0
    }));
  }
  getNotificationIcon() {
    switch (this.type) {
      case "success":
        return "✅";
      case "error":
      case "auth":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
      default:
        return "ℹ️";
    }
  }
  renderActions() {
    return this.type === "auth" && (!this.actions || this.actions.length === 0) ? u`
        <div class="notification-actions">
          <button 
            class="btn btn-primary" 
            @click=${this._handleReauthenticate}
          >
            Erneut anmelden
          </button>
          <button 
            class="btn btn-secondary" 
            @click=${this._handleDismiss}
          >
            Später
          </button>
        </div>
      ` : this.actions && this.actions.length > 0 ? u`
        <div class="notification-actions">
          ${this.actions.map((e) => u`
            <button 
              class="btn ${e.primary ? "btn-primary" : "btn-secondary"}" 
              @click=${() => this._handleCustomAction(e)}
            >
              ${e.label}
            </button>
          `)}
        </div>
      ` : "";
  }
  _handleCustomAction(e) {
    typeof e.handler == "function" && e.handler(), this.dispatchEvent(new CustomEvent("notification-action", {
      detail: { action: e },
      bubbles: !0
    })), e.dismiss !== !1 && this.hide();
  }
  _getLiveRegionConfig() {
    const e = this.type === "error" || this.type === "auth";
    return {
      role: e ? "alert" : "status",
      ariaLive: e ? "assertive" : "polite"
    };
  }
  render() {
    const { role: e, ariaLive: t } = this._getLiveRegionConfig();
    return u`
      <div
        class="notification"
        role=${e}
        aria-live=${t}
        aria-atomic="true"
        aria-hidden=${this.show ? "false" : "true"}
      >
        <div class="notification-header">
          <h3 class="notification-title">
            ${this.getNotificationIcon()} ${this.title}
          </h3>
          <button 
            class="close-button" 
            @click=${this._handleDismiss}
            title="Schließen"
          >
            ×
          </button>
        </div>
        <div class="notification-content">
          ${this.message}
        </div>
        ${this.renderActions()}
      </div>
    `;
  }
}
N(ui, "properties", {
  show: { type: Boolean, reflect: !0 },
  title: { type: String },
  message: { type: String },
  type: { type: String, reflect: !0 },
  // 'success', 'error', 'warning', 'info', 'auth'
  persistent: { type: Boolean },
  // If true, won't auto-hide
  autoHideDelay: { type: Number },
  // Delay in milliseconds before auto-hide
  actions: { type: Array }
  // Array of action buttons
}), N(ui, "styles", [
  ut,
  ie`
    :host {
      --header-height: 0px;
      position: fixed;
      top: calc(10vh + var(--header-height));
      /* left: 50%; */
      /* transform: translateX(-50%); */
      /* width: min(600px, calc(100vw - 2rem)); */
      z-index: 1000000;
      pointer-events: none;
      display: block;
    }

    :host([show]) {
      pointer-events: auto;
    }

    .notification {
      background: var(--notification-bg, #ffffff);
      border: 2px solid var(--notification-border, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      padding: 1.5rem;
      box-shadow: var(--twerenbold-shadow-xl);
      opacity: 0;
      transform: translate3d(0, -12px, 0);
      transition: opacity 0.28s ease, transform 0.28s ease;
      will-change: opacity, transform;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      backdrop-filter: blur(20px) saturate(1.2) brightness(1.3);
    
    }

    :host(:not([show])) .notification {
      visibility: hidden;
    }

    :host([type="success"]) .notification {
      border-color: var(--color-success, #10b981);
      background: color-mix(in srgb, var(--color-success, #10b981) 15%, white);
    }

    :host([type="error"]) .notification,
    :host([type="auth"]) .notification {
      border-color: var(--color-error, #ef4444);
      background: color-mix(in srgb, var(--color-error, #ef4444) 15%, white);
    }

    :host([type="warning"]) .notification {
      border-color: var(--color-warning, #f59e0b);
      background: color-mix(in srgb, var(--color-warning, #f59e0b) 15%, white);
    }

    :host([type="info"]) .notification {
      border-color: var(--color-info, #3b82f6);
      background: color-mix(in srgb, var(--color-info, #3b82f6) 15%, white);
    }

    :host([show]) .notification {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    .notification-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .notification-title {
      color: var(--notification-title-color, #374151);
      font-weight: 600;
      font-size: 0.875rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.25s ease;
    }

    :host([type="success"]) .notification-title {
      color: var(--color-success, #059669);
    }

    :host([type="error"]) .notification-title,
    :host([type="auth"]) .notification-title {
      color: var(--color-error, #dc2626);
    }

    :host([type="warning"]) .notification-title {
      color: var(--color-warning, #d97706);
    }

    :host([type="info"]) .notification-title {
      color: var(--color-info, #2563eb);
    }

    .close-button {
      background: none;
      border: none;
      color: var(--text-secondary, #6b7280);
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      padding: 0.25rem;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius-sm, 4px);
      transition: var(--twerenbold-transition);
    }

    .close-button:hover {
      color: var(--text-color, #374151);
      background: var(--bg-secondary, #f3f4f6);
    }

    .notification-content {
      color: var(--text-color, #374151);
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 1.25rem;
      white-space: pre-line;
    }

    .notification-actions {
      display: flex;
      gap: 0.75rem;
    }

    .notification-actions .btn {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    @media (max-width: 640px) {
      :host {
        --header-height: 70px;
        top: calc(10px + env(safe-area-inset-top) + var(--header-height, 0px));
        width: -webkit-fill-available;
        width: calc(100vw - 1rem);
        left: 1rem;
      }

      .notification {
        backdrop-filter: blur(16px) saturate(1.1) brightness(1.3);
      }

      .notification-actions {
        flex-direction: column;
      }
    }

    :host(:not([show])) {
      pointer-events: none;
    }
  `
]);
customElements.get("auth-notifications") || customElements.define("auth-notifications", ui);
const Re = "__twerenboldAppState", Wt = "twerenbold:app-state", Hi = "app-state-changed", Ii = "app-state", ao = {
  // Theme management
  theme: "twerenbold",
  // Authentication state
  isAuthenticated: !1,
  authUser: null,
  authComponent: null,
  // API configuration
  apiMode: "demo",
  // 'demo', 'local', 'live'
  // Language and localization
  languageConfig: null,
  isLanguageLoaded: !1,
  // Global loading states
  isInitializing: !0,
  // Notification system
  notifications: [],
  // Trip data
  currentTrip: null,
  trips: [],
  tripsLoaded: !1,
  tripsLoading: !1,
  // Account data
  accountProfile: null,
  accountTravelers: [],
  accountClubStatus: null,
  accountLoaded: !1,
  accountLoading: !1,
  // User preferences
  preferences: {
    autoHideNotifications: !0,
    notificationDuration: 5e3
  },
  authLastRefreshed: null,
  // Favorites tracking
  favoritesCount: 0,
  hasFavorites: !1,
  // Optional third-party integration IDs
  hubspotId: null,
  // HubSpot diagnostics for dev/debug (id, source, isLoaded)
  hubspotDiagnostics: { id: null, source: null, isLoaded: !1 },
  // whether this account is a B2B client that isn't supported (null = unknown)
  isClientAccount: null,
  // Components configuration (derived from component-config)
  componentsConfig: ge("demo", "twerenbold")
}, no = 600 * 1e3, so = 1e3, Vi = 10;
class gi extends $e {
  constructor() {
    super();
    // HUBSPOT CONFIG: Replace with your HubSpot portal ID
    N(this, "HUBSPOT_ID", null);
    // e.g. '12345678'
    N(this, "_isHubspotLoaded", !1);
    this.logger = Ne("AppStateProvider"), this.state = { ...ao }, this._actions = this._createActions();
    const t = this._buildContextValue();
    this._contextProvider = new ci(this, {
      context: Ii,
      initialValue: t
    }), this._publishGlobalState(t), this._authLookupAttempts = 0, this._authLookupTimeout = null, this._authChangedHandler = null, this._authRefreshTimer = null, this._maxAuthLookupAttempts = Vi, this._maxAuthLookupAttempts = Vi, this._favoritesUnsub = null, this._initializeApp(), this._logoutFallbackHandler = () => {
      this.logger.debug("App received twerenbold:logout-fallback event - delegating to logout()");
      try {
        this.logout();
      } catch (i) {
        this.logger.warn("logout fallback handler failed", i);
        try {
          this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null }, "AppStateProvider.logout.fallback.eventHandler");
          try {
            Q.reset();
          } catch {
          }
          try {
            x._clearStoredUserId();
          } catch {
          }
        } catch (r) {
          this.logger.warn("final logout fallback failed", r);
        }
      }
    }, typeof window < "u" && (window.addEventListener("twerenbold:logout-fallback", this._logoutFallbackHandler), this._requestLogoutHandler = () => {
      this.logger.debug("App received twerenbold:request-logout - triggering logout()");
      try {
        try {
          this.addNotification({ type: "info", title: "Abmeldung", message: "Abmeldung wird durchgeführt...", duration: 3e3 });
        } catch {
        }
        this.logout();
      } catch (i) {
        this.logger.warn("request-logout handler failed", i);
        try {
          this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null }, "AppStateProvider.logout.requestHandler.fallback");
          try {
            Q.reset();
          } catch {
          }
          try {
            x._clearStoredUserId();
          } catch {
          }
        } catch (r) {
          this.logger.warn("final logout fallback failed", r);
        }
      }
    }, window.addEventListener("twerenbold:request-logout", this._requestLogoutHandler), this._windowAuthChangedHandler = (i) => {
      try {
        const r = (i == null ? void 0 : i.detail) || {};
        if (typeof r.isAuthenticated != "boolean") return;
        this._handleAuthChanged(r);
      } catch (r) {
        this.logger.warn("window auth-changed fallback handler failed", r);
      }
    }, window.addEventListener("auth-changed", this._windowAuthChangedHandler), this._postLogoutHandler = (i) => {
      var o;
      this.logger.debug("App received twerenbold:post-logout, clearing auth & account state");
      const r = ((o = i == null ? void 0 : i.detail) == null ? void 0 : o.userId) || null;
      Kt.setContextUser(null);
      try {
        this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null, accountProfile: null, accountLoaded: !1 }, "AppStateProvider.postLogout");
        try {
          r && x._invalidateCacheForUser(r, "post-logout");
        } catch (a) {
          this.logger.warn("apiService._invalidateCacheForUser failed in post-logout", a);
        }
        try {
          for (let a = localStorage.length - 1; a >= 0; a--) {
            const n = localStorage.key(a);
            n && (n.includes("_accountProfile_") || n.includes("_accountTravelers_") || n.includes("_trips_") || n.startsWith("twerenbold_token_")) && localStorage.removeItem(n);
          }
        } catch {
        }
        try {
          Q.reset();
        } catch (a) {
          this.logger.warn("Hubspot reset failed in post-logout handler", a);
        }
        try {
          this.addNotification({ type: "info", title: "Abgemeldet", message: "Sie wurden abgemeldet. Cache wurde bereinigt." });
        } catch {
        }
      } catch (a) {
        this.logger.warn("post-logout handler failed", a);
      }
    }, window.addEventListener("twerenbold:post-logout", this._postLogoutHandler));
  }
  async loadHubspotScript(t) {
    if (t && !(this._isHubspotLoaded || typeof document > "u"))
      try {
        const i = document.querySelector('script[src*="js.hs-scripts.com/"]');
        if (i)
          try {
            const o = i.src.match(/js\.hs-scripts\.com\/(\d+)\.js/);
            if (o && !t && (t = o[1], this.HUBSPOT_ID = t), this._isHubspotLoaded = !!(window._hsq && typeof window._hsq.push == "function"), this._isHubspotLoaded) {
              Q.flush();
              try {
                this._updateState({ hubspotDiagnostics: { id: t, source: "existing_script_tag", isLoaded: !0 } }, "AppStateProvider.loadHubspotScript.existing");
              } catch {
              }
            } else {
              const a = setInterval(() => {
                if (window._hsq && typeof window._hsq.push == "function") {
                  clearInterval(a), this._isHubspotLoaded = !0;
                  try {
                    Q.flush();
                  } catch {
                  }
                  try {
                    this._updateState({ hubspotDiagnostics: { id: t, source: "existing_script_tag", isLoaded: !0 } }, "AppStateProvider.loadHubspotScript.existingPoll");
                  } catch {
                  }
                }
              }, 300);
            }
            this.logger.debug("Detected existing HubSpot script, using that one.");
            return;
          } catch (o) {
            this.logger.warn("⚠️ Failed to use existing HubSpot script", o);
          }
        window._hsq = window._hsq || [];
        const r = document.createElement("script");
        r.type = "text/javascript", r.async = !0, r.src = `https://js.hs-scripts.com/${t}.js`, r.onload = () => {
          this._isHubspotLoaded = !0, this.logger.debug("HubSpot script loaded");
          try {
            this._updateState({ hubspotDiagnostics: { id: t, source: "injected_script", isLoaded: !0 } }, "AppStateProvider.loadHubspotScript.onload");
          } catch {
          }
          try {
            Q.flush(), Q.track();
          } catch (o) {
            this.logger.warn("HubspotSPA flush/track failed", o);
          }
        }, document.head.appendChild(r), this.logger.debug("HubSpot script injected", t);
      } catch (i) {
        this.logger.warn("Failed to load HubSpot script", i);
      }
  }
  createRenderRoot() {
    return this;
  }
  _createActions() {
    return {
      setTheme: (t) => this.setTheme(t),
      registerAuthComponent: (t) => this._attachAuthComponent(t),
      login: () => this.login(),
      register: () => this.register(),
      logout: () => this.logout(),
      refreshAuth: (t) => this.refreshAuth(t),
      setApiMode: (t) => this.setApiMode(t),
      setCurrentTrip: (t) => this.setCurrentTrip(t),
      setTrips: (t) => this.setTrips(t),
      loadTrips: (t) => this.loadTrips(t),
      setAccountData: (t, i, r) => this.setAccountData(t, i, r),
      loadAccountData: () => this.loadAccountData(),
      addNotification: (t) => this.addNotification(t),
      removeNotification: (t) => this.removeNotification(t),
      updatePreferences: (t) => this.updatePreferences(t),
      setComponentOverrides: (t) => this.setComponentOverrides(t),
      setHubspotId: (t) => this._setHubspotId(t),
      forceLoadHubspot: () => this._forceLoadHubspot()
    };
  }
  _forceLoadHubspot() {
    this.logger.debug("AppStateProvider._forceLoadHubspot invoked (dev/debug)");
    try {
      if (!this.HUBSPOT_ID) {
        const t = this._resolveHubspotId();
        t != null && t.id && (this.HUBSPOT_ID = t.id);
      }
      if (!this.HUBSPOT_ID) {
        this.logger.warn("AppStateProvider._forceLoadHubspot: no HubSpot ID available to force load");
        return;
      }
      this.loadHubspotScript(this.HUBSPOT_ID);
    } catch (t) {
      this.logger.warn("AppStateProvider._forceLoadHubspot failed", t);
    }
  }
  _resolveHubspotId() {
    var s, l, g;
    const t = (g = (l = (s = this.state.componentsConfig) == null ? void 0 : s.integrations) == null ? void 0 : l.hubspot) == null ? void 0 : g.id, i = this.state.hubspotId, r = typeof window < "u" ? window.__twerenboldHubspotId : void 0;
    let o = null;
    try {
      const p = typeof document < "u" && document.querySelector('script[src*="js.hs-scripts.com/"]');
      if (p) {
        const h = p.src.match(/js\.hs-scripts\.com\/(\d+)\.js/);
        h && (o = h[1]);
      }
    } catch {
    }
    const a = t || i || r || o;
    let n = "none";
    t && t === a ? n = "componentsConfig" : i && i === a ? n = "state.hubspotId" : r && r === a ? n = "window.__twerenboldHubspotId" : o && o === a && (n = "existing_script_tag");
    try {
      this._updateState({ hubspotDiagnostics: { id: a || null, source: n } }, "AppStateProvider._resolveHubspotId");
    } catch {
    }
    return this.logger.debug("HubSpot ID resolved:", a, "source:", n), { id: a, source: n };
  }
  _setHubspotId(t) {
    this._updateState({ hubspotId: t }, "AppStateProvider._setHubspotId"), this.HUBSPOT_ID = t;
    try {
      this._updateState({ hubspotDiagnostics: { id: t, source: "action.setHubspotId", isLoaded: this._isHubspotLoaded } }, "AppStateProvider._setHubspotId.updateDiagnostic");
    } catch {
    }
    try {
      ((localStorage.getItem("twr_cookie_consent") || "").toLowerCase().includes("marketing") || document.cookie.includes("consent_marketing=true")) && this.loadHubspotScript(t);
    } catch (i) {
      this.logger.warn("AppStateProvider._setHubspotId consent check failed", i);
    }
  }
  login() {
    const t = this.state.authComponent;
    t != null && t.login ? t.login() : this._connectAuthComponent();
  }
  register() {
    const t = this.state.authComponent;
    t != null && t.register ? t.register() : (this.logger.warn("⚠️ No registration handler available"), this._connectAuthComponent());
  }
  logout() {
    const t = this.state.authComponent;
    if (this.logger.debug("🔐 AppStateProvider.logout invoked - authComponent present:", !!t), t) {
      try {
        typeof t._performLogout == "function" ? (this.logger.debug("🔐 AppStateProvider.logout: using component._performLogout"), t._performLogout()) : typeof t._confirmAndLogout == "function" ? (this.logger.debug("🔐 AppStateProvider.logout: using component._confirmAndLogout"), t._confirmAndLogout()) : typeof t.logout == "function" ? (this.logger.debug("logout: using component.logout"), t.logout()) : this.logger.warn("logout: no usable logout method on component");
      } catch (i) {
        this.logger.warn("logout: error invoking logout on component", i);
      }
      setTimeout(() => {
        try {
          if (typeof t.checkAuthStatus == "function")
            t.checkAuthStatus().then(() => {
              if (this._handleAuthStateSnapshot(), !t.isAuthenticated)
                try {
                  this._detachAuthComponent(!0);
                } catch (i) {
                  this.logger.warn("_detachAuthComponent failed", i);
                }
            }).catch((i) => {
              this.logger.warn("⚠️ checkAuthStatus failed after logout", i), this._handleAuthStateSnapshot();
              try {
                this._detachAuthComponent(!0);
              } catch (r) {
                this.logger.warn("_detachAuthComponent failed", r);
              }
            });
          else if (this._handleAuthStateSnapshot(), !t.isAuthenticated)
            try {
              this._detachAuthComponent(!0);
            } catch (i) {
              this.logger.warn("_detachAuthComponent failed", i);
            }
        } catch (i) {
          this.logger.warn("logout: error checking auth status", i);
        }
      }, 600);
      try {
        this.addNotification({ type: "info", title: "Abmeldung", message: "Der Abmeldevorgang wurde gestartet." });
      } catch {
      }
      return;
    }
    try {
      const i = document.querySelector("oauth-login") || document.querySelector("[data-auth-component]") || document.querySelector("oauth-login-component");
      if (i) {
        this.logger.debug("logout: found oauth-login in DOM, attempting logout via it"), typeof i._performLogout == "function" ? i._performLogout() : typeof i.logout == "function" && i.logout(), setTimeout(() => {
          try {
            if (typeof i.checkAuthStatus == "function")
              i.checkAuthStatus().then(() => {
                if (this._handleAuthStateSnapshot(), !i.isAuthenticated)
                  try {
                    this._detachAuthComponent(!0);
                  } catch (r) {
                    this.logger.warn("_detachAuthComponent failed", r);
                  }
              }).catch((r) => {
                this.logger.warn("⚠️ oauthEl.checkAuthStatus failed after logout", r), this._handleAuthStateSnapshot();
                try {
                  this._detachAuthComponent(!0);
                } catch (o) {
                  this.logger.warn("_detachAuthComponent failed", o);
                }
              });
            else if (this._handleAuthStateSnapshot(), !i.isAuthenticated)
              try {
                this._detachAuthComponent(!0);
              } catch (r) {
                this.logger.warn("_detachAuthComponent failed", r);
              }
          } catch (r) {
            this.logger.warn("logout: error checking oauthEl auth status", r);
          }
        }, 600);
        return;
      }
    } catch (i) {
      this.logger.warn("⚠️ AppStateProvider.logout: attempted to find oauth-login element and failed", i);
    }
    try {
      this.logger.debug("logout: final fallback - clearing local auth state"), this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null }, "AppStateProvider.logout.fallback");
    } catch (i) {
      this.logger.warn("AppStateProvider.logout final fallback failed", i);
    }
  }
  async refreshAuth(t = {}) {
    const i = t === !0 || (t == null ? void 0 : t.force), r = this.state.authComponent;
    if (!r || typeof r.refreshToken != "function")
      return !1;
    try {
      return await r.refreshToken(i), this._handleAuthStateSnapshot(), this._updateState({ authLastRefreshed: Date.now() }, "AppStateProvider.refreshAuth"), !0;
    } catch (o) {
      throw this.logger.warn("Failed to refresh authentication token:", o), o;
    }
  }
  _attachAuthComponent(t) {
    if (t) {
      if (this._authLookupTimeout && (clearTimeout(this._authLookupTimeout), this._authLookupTimeout = null), this.state.authComponent === t) {
        this._handleAuthStateSnapshot(), this._scheduleAuthRefresh();
        return;
      }
      this.state.authComponent && this._authChangedHandler && this.state.authComponent.removeEventListener("auth-changed", this._authChangedHandler), this._authChangedHandler = (i) => this._handleAuthChanged(i.detail), t.addEventListener("auth-changed", this._authChangedHandler), x.setAuthComponent(t), this._updateState({
        authComponent: t,
        isAuthenticated: !!t.isAuthenticated,
        authUser: t.user || null
      }, "AppStateProvider._attachAuthComponent"), this._scheduleAuthRefresh(), typeof t.checkAuthStatus == "function" ? Promise.resolve(t.checkAuthStatus()).then(() => this._handleAuthStateSnapshot()).catch((i) => this.logger.warn("Auth status check failed:", i)) : this._handleAuthStateSnapshot();
    }
  }
  _detachAuthComponent(t = !1) {
    this.state.authComponent && this._authChangedHandler && this.state.authComponent.removeEventListener("auth-changed", this._authChangedHandler), this._authChangedHandler = null, this._clearAuthRefreshTimer(), t && this._updateState({
      authComponent: null,
      isAuthenticated: !1,
      authUser: null
    }, "AppStateProvider._detachAuthComponent"), x.setAuthComponent(null);
  }
  _handleAuthChanged(t = {}) {
    const i = !!t.isAuthenticated, r = t.user || null, o = this.state.authUser;
    if (this._updateState({
      isAuthenticated: i,
      authUser: r,
      authLastRefreshed: Date.now()
    }, "AppStateProvider._handleAuthChanged"), ((o == null ? void 0 : o.id) || null) !== ((r == null ? void 0 : r.id) || null) && x.handleAuthUserChange(o, r), i) {
      try {
        const a = this.state.notifications || [];
        a.length > 0 && (this.logger.debug("Clearing all notifications after successful login/registration"), a.forEach((n) => this.removeNotification(n.id)));
      } catch (a) {
        this.logger.warn("Failed to clear notifications", a);
      }
      this._scheduleAuthRefresh(), !o && r && (this.logger.debug("User logged in - proactively loading account data and trips in background"), Promise.allSettled([
        this.loadAccountData().catch((a) => this.logger.warn("Background account load failed:", a)),
        this.loadTrips().catch((a) => this.logger.warn("Background trips load failed:", a))
      ]).then(() => {
        this.logger.debug("Background data loading completed");
      }));
      try {
        r != null && r.email && Q.identify(r.email);
      } catch (a) {
        this.logger.warn("HubSpot identify failed", a);
      }
    } else {
      try {
        Q.reset();
      } catch (a) {
        this.logger.warn("HubSpot reset failed", a);
      }
      this._clearAuthRefreshTimer();
    }
  }
  _handleAuthStateSnapshot() {
    const t = this.state.authComponent;
    t && this._handleAuthChanged({
      isAuthenticated: !!t.isAuthenticated,
      user: t.user || null
    });
  }
  _scheduleAuthRefresh() {
    this._clearAuthRefreshTimer();
    const t = this.state.authComponent;
    !t || typeof t.refreshToken != "function" || (this._authRefreshTimer = setInterval(() => {
      this.state.isAuthenticated && this.refreshAuth({ force: !1 }).catch((i) => {
        this.logger.debug("Silent auth refresh skipped:", (i == null ? void 0 : i.message) || i);
      });
    }, no));
  }
  _clearAuthRefreshTimer() {
    this._authRefreshTimer && (clearInterval(this._authRefreshTimer), this._authRefreshTimer = null);
  }
  async _initializeApp() {
    try {
      this.logger.debug("Initializing App State..."), this.logger.debug("Loading language config from: ./config/language-config.json");
      const t = await Bt();
      this.logger.debug("Language config loaded:", t ? "success" : "failed"), this._updateState({
        languageConfig: t,
        isLanguageLoaded: !0
      }, "AppStateProvider._initializeApp"), br(t), St(this.state.theme), this.logger.debug("Theme set to:", this.state.theme), this._restorePersistedState();
      let i;
      if (typeof window < "u" && (i = window.__twerenboldPreferredApiMode, i && this.logger.debug("Preferred API mode override detected:", i)), i && ["demo", "local", "live"].includes(i))
        await this.setApiMode(i), typeof window < "u" && (window.__twerenboldPreferredApiMode = void 0);
      else {
        const r = this._getCookie("apiMode");
        r && ["demo", "local", "live"].includes(r) && (this.logger.debug("Syncing API mode from cookie:", r), await this.setApiMode(r));
      }
      setTimeout(() => this._connectAuthComponent(), 100);
      try {
        const r = this._resolveHubspotId();
        this.HUBSPOT_ID = (r == null ? void 0 : r.id) || null;
        const o = () => {
          try {
            const s = localStorage.getItem("twr_cookie_consent");
            return !!(s && s.toLowerCase().includes("marketing") || document.cookie && document.cookie.includes("consent_marketing=true") || window.__twerenboldConsent && window.__twerenboldConsent.marketing || window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.marketing);
          } catch {
            return !1;
          }
        };
        (() => {
          this.HUBSPOT_ID && o() && (this.logger.debug("Consent given for marketing, attempting to load HubSpot"), this.loadHubspotScript(this.HUBSPOT_ID));
        })(), window.addEventListener("twr-cookie-consent-changed", (s) => {
          var l;
          (l = s == null ? void 0 : s.detail) != null && l.marketing && this.loadHubspotScript(this.HUBSPOT_ID);
        });
        const n = setInterval(() => {
          try {
            window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.marketing && (clearInterval(n), this.loadHubspotScript(this.HUBSPOT_ID));
          } catch {
          }
        }, 500);
      } catch (r) {
        this.logger.warn("HubSpot consent check failed", r);
      }
      this._updateState({ isInitializing: !1, componentsConfig: ge(this.state.apiMode, this.state.theme) }, "AppStateProvider._initializeApp.complete"), this.logger.debug("App State initialized successfully");
    } catch (t) {
      this.logger.error("Failed to initialize app state:", t), this._updateState({
        isInitializing: !1,
        isLanguageLoaded: !0
        // Continue without language config
      }, "AppStateProvider._initializeApp.error");
    }
    j("favorites", this.state.apiMode, this.state.theme) ? this._subscribeToFavorites() : this.logger.debug("Favorites component disabled by component-config; skipping subscription.");
  }
  _restorePersistedState() {
    try {
      const t = localStorage.getItem("twerenbold-app-state");
      if (t) {
        const i = JSON.parse(t);
        this.logger.debug("Restoring persisted state:", i), this._updateState({
          theme: i.theme || this.state.theme,
          // DO NOT restore apiMode from localStorage - let cookie/preferredApiMode take precedence
          preferences: { ...this.state.preferences, ...i.preferences }
        }, "AppStateProvider._restorePersistedState");
      } else
        this.logger.debug("No persisted state found, using defaults");
    } catch (t) {
      this.logger.warn("Failed to restore persisted state:", t);
    }
  }
  _persistState() {
    try {
      const t = {
        theme: this.state.theme,
        apiMode: this.state.apiMode,
        preferences: this.state.preferences
      };
      localStorage.setItem("twerenbold-app-state", JSON.stringify(t));
    } catch (t) {
      this.logger.warn("Failed to persist state:", t);
    }
  }
  _getCookie(t) {
    const r = `; ${document.cookie}`.split(`; ${t}=`);
    return r.length === 2 ? r.pop().split(";").shift() : null;
  }
  _connectAuthComponent() {
    const t = this.getAttribute("auth-selector"), i = t ? t.split(",").map((o) => o.trim()).filter(Boolean) : ["oauth-login"];
    let r = null;
    for (const o of i)
      if (r = this.querySelector(o), r)
        break;
    if (r || (r = this.querySelector("[data-auth-component]")), r) {
      this._authLookupAttempts = 0, this._attachAuthComponent(r);
      return;
    }
    this._authLookupAttempts < this._maxAuthLookupAttempts ? (this._authLookupAttempts += 1, this._authLookupTimeout && clearTimeout(this._authLookupTimeout), this._authLookupTimeout = setTimeout(() => this._connectAuthComponent(), so)) : this.logger.warn("No authentication component found using selectors:", i.join(", "));
  }
  _updateState(t, i = "unknown") {
    const r = this.state;
    this.state = { ...this.state, ...t };
    const o = Object.keys(t);
    this.logger.debug(`App State Update from [${i}]:`, {
      changed: o,
      values: t
    }), t.theme && t.theme !== r.theme && (this.logger.debug(`Theme changed by [${i}]:`, r.theme, "→", t.theme), St(t.theme), this._persistState()), t.apiMode && t.apiMode !== r.apiMode && (this.logger.debug(`API Mode changed by [${i}]:`, r.apiMode, "→", t.apiMode), this._persistState()), t.preferences && this._persistState(), this._updateContext(), this.requestUpdate(), this.dispatchEvent(new CustomEvent("app-state-changed", {
      detail: { oldState: r, newState: this.state, caller: i },
      bubbles: !0,
      composed: !0
    }));
  }
  // Public actions
  setTheme(t) {
    ["twerenbold", "voegele", "imbach"].includes(t) && this._updateState({ theme: t, componentsConfig: ge(this.state.apiMode, t) }, "AppStateProvider.setTheme");
  }
  async setApiMode(t) {
    if (["demo", "local", "live"].includes(t)) {
      this._updateState({ apiMode: t, componentsConfig: ge(t, this.state.theme) }, "AppStateProvider.setApiMode");
      const { apiService: i } = await Promise.resolve().then(() => ne);
      i.setMode(t), this.logger.debug("Updated apiService mode to:", t.toUpperCase());
    }
  }
  setCurrentTrip(t) {
    this._updateState({ currentTrip: t }, "AppStateProvider.setCurrentTrip");
    try {
      Q.track();
    } catch {
    }
  }
  setTrips(t) {
    this._updateState({ trips: t, tripsLoaded: !0, tripsLoading: !1 }, "AppStateProvider.setTrips");
  }
  async loadTrips(t = {}) {
    const i = t === !0 || (t == null ? void 0 : t.forceRefresh) === !0;
    if (!(this.state.tripsLoading && !i)) {
      this._updateState({ tripsLoading: !0 }, "AppStateProvider.loadTrips");
      try {
        const { apiService: r } = await Promise.resolve().then(() => ne), o = await r.getTripsWithOptions({
          forceRefresh: i,
          onUpdate: (a) => {
            this.logger.debug("Background update received, updating trips in state"), this.setTrips(a), this._updateState({ tripsLoading: !1 }, "AppStateProvider.loadTrips.onUpdate");
          }
        });
        this.setTrips(o), this.logger.debug("Trips loaded successfully:", o.length, "trips");
      } catch (r) {
        throw this.logger.error("Failed to load trips:", r), this._updateState({ tripsLoading: !1 }, "AppStateProvider.loadTrips.error"), r;
      }
    }
  }
  setAccountData(t, i, r) {
    let o = this.state.isClientAccount;
    t && Object.prototype.hasOwnProperty.call(t, "isClient") && t.isClient !== null && t.isClient !== void 0 && (o = !!t.isClient), this.logger.debug("setAccountData: set isClientAccount?", o, "profileId:", (t == null ? void 0 : t.id) || null), t && Kt.setContextUser(t), this._updateState({
      accountProfile: t,
      accountTravelers: i || [],
      accountClubStatus: r,
      isClientAccount: o,
      // isClientAccount: true,
      accountLoaded: !0,
      accountLoading: !1
    }, "AppStateProvider.setAccountData");
  }
  async loadAccountData() {
    var t;
    if (!this.state.accountLoading) {
      if (!this.state.isAuthenticated) {
        this.logger.debug("⏳ loadAccountData skipped — user not authenticated yet");
        return;
      }
      this._updateState({ accountLoading: !0 }, "AppStateProvider.loadAccountData");
      try {
        const { apiService: i } = await Promise.resolve().then(() => ne), r = 4, o = 3e3;
        let a = null, n = null;
        for (let v = 0; v < r; v++)
          try {
            a = await i.getAccountProfile(), n = null;
            break;
          } catch (y) {
            n = y;
            const I = (t = y == null ? void 0 : y.message) == null ? void 0 : t.includes("500"), M = v === r - 1;
            if (!I || M)
              throw y;
            const z = o * Math.pow(2, v);
            this.logger.warn(`⏳ Profile API returned 500 (attempt ${v + 1}/${r}) — retrying in ${z / 1e3}s...`), await new Promise((P) => setTimeout(P, z));
          }
        a && Kt.setContextUser(a), this._updateState({
          accountProfile: a,
          accountLoading: !0
          // Still loading other data
        }, "AppStateProvider.loadAccountData.profileLoaded");
        try {
          Q.track();
        } catch {
        }
        this.logger.debug("Profile loaded and displayed, loading travelers and club status in background...", a);
        const l = [Array.isArray(a == null ? void 0 : a.travelers) && a.travelers.length >= 0 ? Promise.resolve(a.travelers) : i.getAccountTravelers()];
        j("clubStatus", this.state.apiMode, this.state.theme) ? l.push(i.getClubStatus()) : l.push(Promise.resolve(null));
        const [p, h] = await Promise.allSettled(l);
        let m = [];
        p.status === "fulfilled" ? m = Array.isArray(p.value) ? p.value : [] : Array.isArray(a == null ? void 0 : a.travelers) ? (m = a.travelers, this.logger.warn("Using travelers from profile payload due to travelers endpoint issue:", p.reason)) : this.logger.warn("Travelers could not be loaded:", p.reason);
        let b = null;
        h.status === "fulfilled" ? b = h.value : a != null && a.clubMembership ? (b = a.clubMembership, this.logger.warn("Using club membership from profile payload due to club endpoint issue:", h.reason)) : this.logger.warn("Club status could not be loaded:", h.reason), this.setAccountData(a, m, b), this.logger.debug("Account data loaded successfully");
      } catch (i) {
        throw this.logger.error("Failed to load account data:", i), this._updateState({ accountLoading: !1 }, "AppStateProvider.loadAccountData.error"), i;
      }
    }
  }
  addNotification(t) {
    const i = [...this.state.notifications, {
      id: Date.now(),
      timestamp: /* @__PURE__ */ new Date(),
      ...t
    }];
    this._updateState({ notifications: i }, "AppStateProvider.addNotification");
  }
  removeNotification(t) {
    const i = this.state.notifications.filter((r) => r.id !== t);
    this._updateState({ notifications: i }, "AppStateProvider.removeNotification");
  }
  updatePreferences(t) {
    const i = { ...this.state.preferences, ...t };
    this._updateState({ preferences: i }, "AppStateProvider.updatePreferences");
  }
  setComponentOverrides(t) {
    try {
      wr(t || {}), this._updateState({ componentsConfig: ge(this.state.apiMode, this.state.theme) }, "AppStateProvider.setComponentOverrides");
    } catch (i) {
      this.logger.warn("Failed to apply component overrides", i);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.logger.debug("AppStateProvider connected, providing context..."), this._updateContext();
  }
  disconnectedCallback() {
    if (this._clearAuthRefreshTimer(), this._authLookupTimeout && (clearTimeout(this._authLookupTimeout), this._authLookupTimeout = null), this._detachAuthComponent(!1), typeof window < "u") {
      const t = window[Re];
      if ((t == null ? void 0 : t.provider) === this) {
        delete window[Re];
        try {
          window.dispatchEvent(new CustomEvent(Wt, {
            detail: { state: null, actions: null, provider: null }
          }));
        } catch (i) {
          this.logger.warn("Failed to dispatch global app-state teardown", i);
        }
      }
    }
    this._favoritesUnsub && (this._favoritesUnsub(), this._favoritesUnsub = null), super.disconnectedCallback();
  }
  async _subscribeToFavorites() {
    var t, i;
    if (!j("favorites", this.state.apiMode, this.state.theme)) {
      this.logger.debug("Favorites subscription skipped: component disabled for this mode/theme");
      return;
    }
    try {
      const { favoritesService: r } = await Promise.resolve().then(() => Uo), o = ((t = this.state.authUser) == null ? void 0 : t.localAccountId) || ((i = this.state.accountProfile) == null ? void 0 : i.id), a = await r.getLocalFavorites(o);
      this._updateFavoritesState(a), this._favoritesUnsub = r.onUpdate(({ items: n }) => {
        this._updateFavoritesState(n);
      });
    } catch (r) {
      this.logger.warn("Failed to subscribe to favorites service:", r);
    }
  }
  _updateFavoritesState(t) {
    const i = Array.isArray(t) ? t.length : 0;
    (this.state.favoritesCount !== i || this.state.hasFavorites !== i > 0) && this._updateState({
      favoritesCount: i,
      hasFavorites: i > 0
    }, "AppStateProvider._updateFavoritesState");
  }
  _buildContextValue() {
    return {
      state: this.state,
      actions: this._actions
    };
  }
  _updateContext() {
    if (!this._contextProvider) return;
    const t = this._buildContextValue();
    this._contextProvider.setValue(t), this.logger.debug("Context provided with state:", this.state), this.logger.debug("Context value:", t), this._publishGlobalState(t);
  }
  _publishGlobalState(t) {
    if (typeof window > "u")
      return;
    const i = window[Re] || {};
    i.state = (t == null ? void 0 : t.state) || this.state, i.actions = (t == null ? void 0 : t.actions) || this._actions, i.provider = this, i.timestamp = Date.now(), window[Re] = i;
    try {
      window.dispatchEvent(new CustomEvent(Wt, {
        detail: {
          state: i.state,
          actions: i.actions,
          provider: this
        }
      }));
    } catch (r) {
      this.logger.warn("Failed to dispatch global app-state event", r);
    }
  }
  render() {
    return u`
      ${this.renderClientNotSupportedOverlay()}
      <auth-notifications></auth-notifications>
      <slot></slot>
    `;
  }
  renderClientNotSupportedOverlay() {
    try {
      this.logger.debug("renderClientNotSupportedOverlay check:", { accountLoaded: this.state.accountLoaded, isClientAccount: this.state.isClientAccount, type: typeof this.state.isClientAccount });
    } catch {
    }
    if (!this.state.accountLoaded || this.state.isClientAccount !== !1) return "";
    const t = O("clientNotSupportedTitle", "account", "Liebe Nutzerinnen und Nutzer", this.state.theme), i = O("clientNotSupportedText", "account", "Das Kundenkonto ist aktuell nicht für Firmenkunden verfügbar.", this.state.theme);
    return u`
      <div class="client-unsupported-overlay" role="alertdialog" aria-modal="true" aria-labelledby="client-unsupported-title" aria-describedby="client-unsupported-desc">
        <div class="client-unsupported-card">
          <!--div class="client-unsupported-brand">
            <favicon-component size="180" brand="${this.state.theme}"></favicon-component>
          </div-->
          <h2 id="client-unsupported-title">${t}</h2>
          <p id="client-unsupported-desc">${i}</p>
          <div style="display:flex; gap:0.75rem; justify-content:left; margin-top:1rem;">
            <button class="btn btn-primary" @click=${() => {
      var r;
      return (r = this.logout) == null ? void 0 : r.call(this);
    }}>Abmelden</button>
            <!--button class="btn btn-secondary" @click=${() => window.open("mailto:support@twerenbold.ch", "_blank")}>Kontakt</button>
          </div>
        </div>
      </div>
    `;
  }
}
N(gi, "properties", {
  state: { type: Object, state: !0 }
}), N(gi, "styles", ie`
    .client-unsupported-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.95);
      z-index: 99999;
      backdrop-filter: blur(6px);
      padding: 1rem;
    }
    .client-unsupported-card {
      max-width: 720px;
      border-radius: 12px;
      background: var(--bg-color, white);
      border: 1px solid var(--border-color, #e5e7eb);
      padding: 1.5rem;
      box-shadow: 0 8px 28px rgba(15,23,42,0.12);
      text-align: center;
    }


    .client-unsupported-brand img, .client-unsupported-brand favicon-component {
      display:block;
      margin: 0 auto 1rem auto;
      max-width: 180px;
      height:auto;
    }
    .client-unsupported-card h2 { margin-top: 0.25rem; font-size: 1.25rem; color: var(--text-color, #0f172a); }
    .client-unsupported-card p { color: var(--text-secondary, #6b7280); }
  `);
const yr = (c) => class extends c {
  static get properties() {
    return {
      ...super.properties || {},
      theme: { type: String, reflect: !0 },
      apiMode: { type: String, attribute: "api-mode" },
      authComponent: { type: Object },
      // Make appState reactive so components update when it changes
      appState: { type: Object, attribute: !1 }
    };
  }
  constructor() {
    if (super(), this.logger = Ne(this.constructor.name), this.logger.debug("Constructor called"), this._contextValue = void 0, this._themeOverride = void 0, this._apiModeOverride = void 0, this._authComponentOverride = void 0, this._hasAppContext = !1, this._contextProvidedViaProvider = !1, this._handleGlobalAppEvent = null, this._handleDomAppStateEvent = null, this.logger.debug("Creating ContextConsumer in constructor"), this._contextConsumer = new Zt(this, {
      context: Ii,
      callback: (e) => {
        if (this.logger.debug("Received context update:", e), this._contextProvidedViaProvider = !!e, this._applyAppContext(e, { viaGlobal: !1 }), !e && typeof window < "u") {
          const t = window[Re];
          t != null && t.state && (t != null && t.actions) && (this.logger.debug("Context lost via provider, falling back to global bridge"), this._applyAppContext({ state: t.state, actions: t.actions }, { viaGlobal: !0 }));
        }
      },
      subscribe: !0
    }), this.logger.debug("ContextConsumer created"), typeof window < "u") {
      this._handleGlobalAppEvent = (t) => {
        const i = t == null ? void 0 : t.detail, r = i && i.state && i.actions ? { state: i.state, actions: i.actions } : (i == null ? void 0 : i.state) === null && (i == null ? void 0 : i.actions) === null ? null : window[Re] || null;
        this._applyAppContext(r, { viaGlobal: !0 });
      }, window.addEventListener(Wt, this._handleGlobalAppEvent);
      const e = window[Re];
      e && e.state && e.actions && !this._contextProvidedViaProvider && this._applyAppContext({ state: e.state, actions: e.actions }, { viaGlobal: !0, initial: !0 }), this._handleDomAppStateEvent = (t) => {
        var a, n, s;
        const i = ((a = t == null ? void 0 : t.detail) == null ? void 0 : a.newState) || ((n = t == null ? void 0 : t.detail) == null ? void 0 : n.state);
        if (!i)
          return;
        const r = window[Re], o = (r == null ? void 0 : r.actions) || ((s = this._contextValue) == null ? void 0 : s.actions) || null;
        this._applyAppContext({ state: i, actions: o || null }, { viaGlobal: !0 });
      }, window.addEventListener(Hi, this._handleDomAppStateEvent);
    }
  }
  // Convenience getters
  get appState() {
    var e;
    return ((e = this._contextValue) == null ? void 0 : e.state) || null;
  }
  get appActions() {
    var e;
    return ((e = this._contextValue) == null ? void 0 : e.actions) || null;
  }
  set theme(e) {
    const t = this.theme;
    e == null || e === "" ? this._themeOverride = void 0 : this._themeOverride = e, this.requestUpdate("theme", t);
  }
  get theme() {
    var e;
    return this._themeOverride !== void 0 ? this._themeOverride : ((e = this.appState) == null ? void 0 : e.theme) || "twerenbold";
  }
  set apiMode(e) {
    const t = this.apiMode;
    e == null || e === "" ? this._apiModeOverride = void 0 : this._apiModeOverride = e, this.requestUpdate("apiMode", t);
  }
  get apiMode() {
    var e;
    return this._apiModeOverride !== void 0 ? this._apiModeOverride : ((e = this.appState) == null ? void 0 : e.apiMode) || "demo";
  }
  get isAuthenticated() {
    var e;
    return ((e = this.appState) == null ? void 0 : e.isAuthenticated) || !1;
  }
  set authComponent(e) {
    const t = this.authComponent;
    this._authComponentOverride = e, this.requestUpdate("authComponent", t);
  }
  get languageConfig() {
    var e;
    return ((e = this.appState) == null ? void 0 : e.languageConfig) || null;
  }
  get authComponent() {
    var e;
    return this._authComponentOverride !== void 0 ? this._authComponentOverride : ((e = this.appState) == null ? void 0 : e.authComponent) || null;
  }
  get hasAppContext() {
    return this._hasAppContext;
  }
  connectedCallback() {
    super.connectedCallback(), this.logger.debug("Connected to DOM"), setTimeout(() => {
      this.appState ? this.logger.debug("Successfully connected to app context", {
        isInitializing: this.appState.isInitializing,
        isLanguageLoaded: this.appState.isLanguageLoaded,
        apiMode: this.appState.apiMode
      }) : this.logger.warn("Could not connect to app context", {
        _contextConsumer: !!this._contextConsumer,
        _contextValue: this._contextValue
      });
    }, 100);
  }
  disconnectedCallback() {
    typeof window < "u" && this._handleGlobalAppEvent && window.removeEventListener(Wt, this._handleGlobalAppEvent), typeof window < "u" && this._handleDomAppStateEvent && window.removeEventListener(Hi, this._handleDomAppStateEvent), typeof window < "u" && this._logoutFallbackHandler && (window.removeEventListener("twerenbold:logout-fallback", this._logoutFallbackHandler), this._logoutFallbackHandler = null), typeof window < "u" && this._requestLogoutHandler && (window.removeEventListener("twerenbold:request-logout", this._requestLogoutHandler), this._requestLogoutHandler = null), typeof window < "u" && this._postLogoutHandler && (window.removeEventListener("twerenbold:post-logout", this._postLogoutHandler), this._postLogoutHandler = null), typeof window < "u" && this._windowAuthChangedHandler && (window.removeEventListener("auth-changed", this._windowAuthChangedHandler), this._windowAuthChangedHandler = null), super.disconnectedCallback();
  }
  _applyAppContext(e, { viaGlobal: t = !1 } = {}) {
    var s, l;
    if (t && this._contextProvidedViaProvider)
      return;
    const i = this._contextValue;
    let r = e && typeof e == "object" ? { ...e } : null;
    r && !r.actions && (i != null && i.actions) && (r.actions = i.actions);
    const o = (s = i == null ? void 0 : i.state) == null ? void 0 : s.isAuthenticated, a = (l = r == null ? void 0 : r.state) == null ? void 0 : l.isAuthenticated;
    o !== a && this.logger.debug("Auth transition detected:", { from: o, to: a, viaGlobal: t }), this._contextValue = r;
    const n = this._hasAppContext;
    this._hasAppContext = !!this._contextValue, !n && this._hasAppContext && typeof this.appContextReady == "function" && this.appContextReady(this._contextValue), typeof this.appContextChanged == "function" && this.appContextChanged(this._contextValue, i), this.requestUpdate("appState");
  }
};
customElements.get("app-state-provider") || customElements.define("app-state-provider", gi);
class Oe extends yr($e) {
  constructor() {
    super(), this.logger = Ne("AuthenticatedComponent"), this.showAuthOverlay = !1, this.registrationUrl = "", this.loginUrl = "", this.infoUrl = "", this.isLoading = !1, this._email = "", this._password = "";
  }
  connectedCallback() {
    super.connectedCallback(), this._authChangedRerender = () => this.requestUpdate(), window.addEventListener("auth-changed", this._authChangedRerender);
    let e = 0;
    this._needsAuthPoll = setInterval(() => {
      var r;
      this.requestUpdate();
      const t = (r = this.appState) == null ? void 0 : r.authComponent;
      (this.appState && !this.appState.isInitializing && (!t || t.isMsalInitialized !== !1) || ++e > 40) && (clearInterval(this._needsAuthPoll), this._needsAuthPoll = null);
    }, 300);
  }
  disconnectedCallback() {
    this._authChangedRerender && window.removeEventListener("auth-changed", this._authChangedRerender), this._needsAuthPoll && (clearInterval(this._needsAuthPoll), this._needsAuthPoll = null), super.disconnectedCallback();
  }
  get needsAuth() {
    if (!this.appState || this.appState.isInitializing)
      return !1;
    const e = this.appState.authComponent;
    if (e && e.isMsalInitialized === !1)
      return this.logger && this.logger.debug("needsAuth: deferring while MSAL is still initializing"), !1;
    const t = this.appState.apiMode === "live" && !this.isAuthenticated;
    return this.logger && this.logger.debug("needsAuth result:", t, {
      apiMode: this.appState.apiMode,
      isAuthenticated: this.isAuthenticated
    }), t;
  }
  _openUrl(e) {
    e && window.open(e, "_blank", "noopener");
  }
  async _onLoginClicked() {
    var e;
    if ((e = this.appActions) != null && e.login) {
      try {
        this.isLoading = !0, await this.appActions.login();
      } catch (t) {
        this.logger.warn("Login action failed", t);
      } finally {
        this.isLoading = !1;
      }
      return;
    }
    if (this.loginUrl) {
      this._openUrl(this.loginUrl);
      return;
    }
    this._showFallbackInfo();
  }
  async _onRegisterClicked() {
    var e;
    if (this.registrationUrl) {
      this._openUrl(this.registrationUrl);
      return;
    }
    if ((e = this.appActions) != null && e.register) {
      try {
        this.isLoading = !0, await Promise.resolve(this.appActions.register());
      } catch (t) {
        this.logger.warn("Register action failed", t);
      } finally {
        this.isLoading = !1;
      }
      return;
    }
    this._showFallbackInfo();
  }
  _showFallbackInfo() {
    var t;
    const e = "Die Anmeldung erfolgt extern (MSAL). Bitte verwenden Sie den Login-Link.";
    (t = this.appActions) != null && t.addNotification ? this.appActions.addNotification({ type: "info", title: "Anmeldung", message: e }) : alert(e);
  }
  appContextChanged(e, t) {
    var r;
    (r = super.appContextChanged) == null || r.call(this, e, t);
    const i = this.needsAuth;
    this.showAuthOverlay !== i && (this.showAuthOverlay = i, this.logger && this.logger.debug("Auth overlay:", i));
  }
  renderAuthOverlaySingle() {
    return this.needsAuth || this.showAuthOverlay ? u`
      <div class="auth-overlay">
        <div class="auth-overlay-content">
          <h2>${this.getText("authRequired", "common", "Authentifizierung erforderlich")}</h2>
          <p>${this.getText("authRequiredText", "common", "Um diese Funktion zu nutzen, melden Sie sich bitte an.")}</p>
          <button class="btn btn-primary" @click=${this._redirectToAuth}>
            ${this.getText("signIn", "common", "Anmelden")}
          </button>
        </div>
      </div>
    ` : "";
  }
  renderAuthOverlay() {
    if (!this.needsAuth && !this.showAuthOverlay)
      return "";
    const e = this.getAttribute("intro") || "";
    return u`
      <div class="auth-overlay">
        <div class="auth-overlay-content">
          <div class="auth-shell">
            <div class="auth-shell__header">
              <div class="auth-shell__title">
               <div class="auth-shell__icon">
              <svg 
xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" style="width:24px; height:24px;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
               </div>
                <div>
                  <h1 style="margin-bottom: 0;margin-top:0px;">${this.getText("overlayTitle", "common", "Mein Konto")}</h1>
                  <span class="auth-shell__subtitle">${this.getText("overlaySubtitle", "common", "Twerenbold Reisen Gruppe")}</span>
                </div>
              </div>
              <div class="auth-shell__brand"><slot name="brand-right"></slot></div>
            </div>

            <div class="auth-shell__intro">${e}</div>

            <div class="auth-grid auth-grid--entra">
              <div class="card">
                <h2>${this.getText("overlayLoginTitle", "common", "Ich habe bereits ein Konto")}</h2>
                <p>${this.getText("overlayLoginText", "common", "Melden Sie sich mit Ihrem bestehenden Twerenbold ID Konto an und erhalten Sie Zugriff auf alle gebuchten Reisen.")}</p>
                <ul class="card__list">
                  ${(this.getText("overlayLoginBenefits", "common", ["Sicherer Login via Twerenbold ID", "Direkter Zugriff auf Ihre Buchungen", "Synchronisiert über alle Geräte", "Benachrichtigungen & Zusatzleistungen"]) || []).map((t) => u`<li>${t}</li>`)}
                </ul>
                <button class="btn btn-primary" @click=${() => this._onLoginClicked()} ?disabled=${this.isLoading}>
                  ${this.isLoading ? this.getText("overlayLoadingFlow", "common", "Flow wird gestartet…") : this.getText("overlayLoginButton", "common", "Anmelden")}
                </button>
              </div>

              <div class="card">
                <h2>${this.getText("overlayRegisterTitle", "common", "Ich benötige ein Konto")}</h2>
                ${(() => {
      const t = this.getText("overlayRegisterTexts", "common", null);
      return Array.isArray(t) && t.length > 0 ? t.map((i) => u`<p>${i}</p>`) : u`<p>${this.getText("overlayRegisterText", "common", "Erstellen Sie ein neues Konto für den persönlichen Zugriff auf Ihre Reisen und Services.")}</p>`;
    })()}
                <ul class="card__list">
                  ${(this.getText("overlayRegisterBenefits", "common", ["Schnelle und unkomplizierte Registrierung", "Individuelle Reiseübersicht nach Login", "Zentraler Merkzettel", "Club-Status"]) || []).map((t) => u`<li>${t}</li>`)}
                </ul>
                <button class="btn btn-secondary" @click=${() => this._onRegisterClicked()} ?disabled=${this.isLoading}>
                  ${this.isLoading ? this.getText("overlayLoadingFlow", "common", "Flow wird gestartet…") : this.getText("overlayRegisterButton", "common", "Konto anlegen")}
                </button>
              </div>
            </div>

            ${this.isLoading ? u`
              <div class="auth-status">
                <div class="spinner" role="status" aria-live="polite"></div>
                <span>${this.getText("overlayLoadingRedirect", "common", "Weiterleitung zur Microsoft-Anmeldung…")}</span>
              </div>
            ` : ""}

            <div class="auth-help">
              <p class="auth-help__hint">${this.getText("overlayHelpText", "common", "Sie benötigen Unterstützung?")} <a href="mailto:${this.getText("overlaySupportEmail", "common", "support@twerenbold.ch")}">${this.getText("overlaySupportEmail", "common", "support@twerenbold.ch")}</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Redirect to authentication using global context
   */
  _redirectToAuth() {
    var e, t;
    (t = (e = this.appActions).login) == null || t.call(e);
  }
  /**
   * Show notification using global context or fallback to component-level
   */
  _showNotification(e) {
    var i;
    if (this.appActions.addNotification) {
      this.appActions.addNotification(e);
      return;
    }
    const t = ((i = this.shadowRoot) == null ? void 0 : i.querySelector("auth-notification-component")) || document.querySelector("auth-notification-component");
    t ? t.showNotification(e) : this.logger.warn("No notification system found for:", e);
  }
  /**
   * Show success notification
   */
  _showSuccess(e, t, i = 4e3) {
    this._showNotification({
      type: "success",
      title: e,
      message: t,
      autoHideDelay: i
    });
  }
  /**
   * Show error notification
   */
  _showError(e, t, i = !0) {
    this._showNotification({
      type: "error",
      title: e,
      message: t,
      persistent: i
    });
  }
  /**
   * Show warning notification
   */
  _showWarning(e, t, i = 6e3) {
    this._showNotification({
      type: "warning",
      title: e,
      message: t,
      autoHideDelay: i
    });
  }
  /**
   * Show info notification
   */
  _showInfo(e, t, i = 5e3) {
    this._showNotification({
      type: "info",
      title: e,
      message: t,
      autoHideDelay: i
    });
  }
  /**
   * Get text using the central text service with context theme
   */
  getText(e, t = null, i = null) {
    return O(e, t, i, this.theme);
  }
}
N(Oe, "properties", {
  showAuthOverlay: { type: Boolean },
  registrationUrl: { type: String, attribute: "registration-url" },
  loginUrl: { type: String, attribute: "login-url" },
  infoUrl: { type: String, attribute: "info-url" },
  isLoading: { type: Boolean }
}), N(Oe, "styles", [
  ut,
  ie`
    :host {
      display: block;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: var(--text-color, #111827);
      line-height: 1.6;
    }

    /* Auth Overlay - Component specific */
    .auth-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: normal;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px) saturate(0.8);
    }

    /* mobile: make overlay content scrollable if it exceeds viewport height */
    @media (max-width: 768px) {
  
      .auth-overlay {
        position: relative !important;
        align-items: flex-start;
        padding: 2rem 0;
      }

      .auth-overlay-content{
        padding: 0px !important;
        max-width: auto;
        width: 100% !important;
       
        overflow-y: auto;
      }

      .auth-shell{
        padding: 0rem !important;
      }
    }

    /* make parent relative for absolute overlay */
    .main-content, .trips-page{
      position: relative;
    }

    .auth-overlay-content {
      background: var(--bg-color);
      border-radius: var(--border-radius-lg);
      padding: 0rem;
      /* max-width: 400px; */
      width: 100%;
      /* box-shadow: var(--shadow-lg); */
      /* text-align: center; */
    }

    .auth-overlay-content h2 {
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .auth-overlay-content p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    /* Favicon Styles - Component specific */
    a.with-favicon {
      align-items: center;
      gap: 4px;
      text-decoration: none;
    }

    a.with-favicon img {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    a.with-favicon--large img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
      border-radius: 100%;
      border: 1px solid #ddd;
    }

          :host { display:block; }
      .auth-shell { background: var(--bg-color, #fff); border-radius: 12px; border: none; box-shadow: none; padding: clamp(1rem, 2vw, 1.5rem); max-width: 980px; margin: 0 auto; }
      .auth-shell__header { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom: 1rem; flex-wrap:wrap; }
      .auth-shell__title { display:flex; align-items:center; gap:0.75rem }
      .auth-shell__icon { width:44px; height:44px; border-radius:50%; display:grid; place-items:center; background:var(--theme-primary); color:var(--primary-color); font-weight:700 }
      .auth-shell__intro { color:var(--text-secondary); margin-bottom:1rem }
      .auth-shell__subtitle { display:block; font-size:.9rem; color:var(--text-secondary); margin-top:.15rem }
      .auth-grid { display:grid; grid-template-columns: 1fr 1fr; gap:1rem }
      .auth-grid--entra { align-items:stretch }
      @media (max-width:800px){ .auth-grid, .auth-grid--entra{ grid-template-columns:1fr } }
      .card { background:var(--bg-color); border:1px solid var(--border-color); border-radius:12px; display:flex; flex-direction:column; gap:0.75rem; }
      .card h2 { margin:0; font-size:1.25rem }
      .card p { margin:0 0 0.5rem 0; color:var(--text-secondary) }
      .card__icon { font-size:2rem }
      .card__list { margin:0; padding-left:1.25rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:.25rem; }
      .input { display:block; width:100%; padding:.625rem .75rem; border:1px solid var(--border-color); border-radius:8px; margin-bottom:.75rem }
      /* .btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.6rem 1rem; border-radius:8px; cursor:pointer; border:1px solid transparent }
      .btn-primary { background:var(--primary-color); color:white }
      .btn-outline { background:transparent; border:1px solid var(--border-color); color:var(--primary-color); font-weight:600 } */
      .note { background:var(--bg-secondary); border-radius:10px; padding:.75rem; color:var(--text-secondary); font-size:.95rem }
      .auth-status { margin-top:1.5rem; display:flex; align-items:center; gap:.75rem; justify-content:center; color:var(--text-secondary) }
      .spinner { width:20px; height:20px; border:2px solid rgba(37,99,235,0.15); border-top-color:var(--primary-color); border-radius:50%; animation:spin 1s linear infinite }
      @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
      .auth-help { display:none; margin-top:1.5rem; text-align:center; }
      .auth-help__hint { margin:0; font-size:.9rem; color:var(--text-secondary); }
      .auth-help__hint a { color:var(--primary-color); text-decoration:none; }
      .auth-help__hint a:hover { text-decoration:underline; }
  `
]);
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */
const {
  entries: Tr,
  setPrototypeOf: Xi,
  isFrozen: lo,
  getPrototypeOf: co,
  getOwnPropertyDescriptor: ho
} = Object;
let {
  freeze: ee,
  seal: pe,
  create: pi
} = Object, {
  apply: mi,
  construct: fi
} = typeof Reflect < "u" && Reflect;
ee || (ee = function(e) {
  return e;
});
pe || (pe = function(e) {
  return e;
});
mi || (mi = function(e, t) {
  for (var i = arguments.length, r = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++)
    r[o - 2] = arguments[o];
  return e.apply(t, r);
});
fi || (fi = function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    i[r - 1] = arguments[r];
  return new e(...i);
});
const Rt = te(Array.prototype.forEach), uo = te(Array.prototype.lastIndexOf), ji = te(Array.prototype.pop), vt = te(Array.prototype.push), go = te(Array.prototype.splice), Ut = te(String.prototype.toLowerCase), qt = te(String.prototype.toString), Qt = te(String.prototype.match), wt = te(String.prototype.replace), po = te(String.prototype.indexOf), mo = te(String.prototype.trim), fe = te(Object.prototype.hasOwnProperty), q = te(RegExp.prototype.test), yt = fo(TypeError);
function te(c) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      i[r - 1] = arguments[r];
    return mi(c, e, i);
  };
}
function fo(c) {
  return function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return fi(c, t);
  };
}
function L(c, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ut;
  Xi && Xi(c, null);
  let i = e.length;
  for (; i--; ) {
    let r = e[i];
    if (typeof r == "string") {
      const o = t(r);
      o !== r && (lo(e) || (e[i] = o), r = o);
    }
    c[r] = !0;
  }
  return c;
}
function bo(c) {
  for (let e = 0; e < c.length; e++)
    fe(c, e) || (c[e] = null);
  return c;
}
function Ae(c) {
  const e = pi(null);
  for (const [t, i] of Tr(c))
    fe(c, t) && (Array.isArray(i) ? e[t] = bo(i) : i && typeof i == "object" && i.constructor === Object ? e[t] = Ae(i) : e[t] = i);
  return e;
}
function Tt(c, e) {
  for (; c !== null; ) {
    const i = ho(c, e);
    if (i) {
      if (i.get)
        return te(i.get);
      if (typeof i.value == "function")
        return te(i.value);
    }
    c = co(c);
  }
  function t() {
    return null;
  }
  return t;
}
const Ji = ee(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), ei = ee(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ti = ee(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), vo = ee(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ii = ee(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), wo = ee(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ki = ee(["#text"]), qi = ee(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), ri = ee(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Qi = ee(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ot = ee(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), yo = pe(/\{\{[\w\W]*|[\w\W]*\}\}/gm), To = pe(/<%[\w\W]*|[\w\W]*%>/gm), Ao = pe(/\$\{[\w\W]*/gm), _o = pe(/^data-[\-\w.\u00B7-\uFFFF]+$/), So = pe(/^aria-[\-\w]+$/), Ar = pe(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Co = pe(/^(?:\w+script|data):/i), ko = pe(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), _r = pe(/^html$/i), xo = pe(/^[a-z][.\w]*(-[.\w]+)+$/i);
var er = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: So,
  ATTR_WHITESPACE: ko,
  CUSTOM_ELEMENT: xo,
  DATA_ATTR: _o,
  DOCTYPE_NAME: _r,
  ERB_EXPR: To,
  IS_ALLOWED_URI: Ar,
  IS_SCRIPT_OR_DATA: Co,
  MUSTACHE_EXPR: yo,
  TMPLIT_EXPR: Ao
});
const At = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Io = function() {
  return typeof window > "u" ? null : window;
}, Po = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let i = null;
  const r = "data-tt-policy-suffix";
  t && t.hasAttribute(r) && (i = t.getAttribute(r));
  const o = "dompurify" + (i ? "#" + i : "");
  try {
    return e.createPolicy(o, {
      createHTML(a) {
        return a;
      },
      createScriptURL(a) {
        return a;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, tr = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Sr() {
  let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Io();
  const e = (S) => Sr(S);
  if (e.version = "3.3.1", e.removed = [], !c || !c.document || c.document.nodeType !== At.document || !c.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = c;
  const i = t, r = i.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: a,
    Node: n,
    Element: s,
    NodeFilter: l,
    NamedNodeMap: g = c.NamedNodeMap || c.MozNamedAttrMap,
    HTMLFormElement: p,
    DOMParser: h,
    trustedTypes: m
  } = c, b = s.prototype, v = Tt(b, "cloneNode"), y = Tt(b, "remove"), I = Tt(b, "nextSibling"), M = Tt(b, "childNodes"), z = Tt(b, "parentNode");
  if (typeof a == "function") {
    const S = t.createElement("template");
    S.content && S.content.ownerDocument && (t = S.content.ownerDocument);
  }
  let P, ce = "";
  const {
    implementation: Ue,
    createNodeIterator: Yt,
    createDocumentFragment: gt,
    getElementsByTagName: kt
  } = t, {
    importNode: Ht
  } = i;
  let V = tr();
  e.isSupported = typeof Tr == "function" && typeof z == "function" && Ue && Ue.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Ze,
    ERB_EXPR: We,
    TMPLIT_EXPR: pt,
    DATA_ATTR: Z,
    ARIA_ATTR: D,
    IS_SCRIPT_OR_DATA: se,
    ATTR_WHITESPACE: mt,
    CUSTOM_ELEMENT: xt
  } = er;
  let {
    IS_ALLOWED_URI: ft
  } = er, B = null;
  const It = L({}, [...Ji, ...ei, ...ti, ...ii, ...Ki]);
  let Y = null;
  const Ke = L({}, [...qi, ...ri, ...Qi, ...Ot]);
  let W = Object.seal(pi(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), _e = null, Fe = null;
  const ve = Object.seal(pi(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let ze = !0, Be = !0, Pt = !1, Se = !0, Ge = !1, Ye = !0, me = !1, Lt = !1, qe = !1, Ce = !1, Qe = !1, et = !1, bt = !0, Mt = !1;
  const ke = "user-content-";
  let De = !0, xe = !1, He = {}, de = null;
  const tt = L({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Vt = null;
  const f = L({}, ["audio", "video", "img", "source", "image", "track"]);
  let T = null;
  const C = L({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _ = "http://www.w3.org/1998/Math/MathML", k = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let X = U, re = !1, we = null;
  const he = L({}, [_, k, U], qt);
  let ue = L({}, ["mi", "mo", "mn", "ms", "mtext"]), ye = L({}, ["annotation-xml"]);
  const Nt = L({}, ["title", "style", "font", "a", "script"]);
  let Ee = null;
  const oe = ["application/xhtml+xml", "text/html"], it = "text/html";
  let H = null, rt = null;
  const Ur = t.createElement("form"), Mi = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, Xt = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(rt && rt === d)) {
      if ((!d || typeof d != "object") && (d = {}), d = Ae(d), Ee = // eslint-disable-next-line unicorn/prefer-includes
      oe.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? it : d.PARSER_MEDIA_TYPE, H = Ee === "application/xhtml+xml" ? qt : Ut, B = fe(d, "ALLOWED_TAGS") ? L({}, d.ALLOWED_TAGS, H) : It, Y = fe(d, "ALLOWED_ATTR") ? L({}, d.ALLOWED_ATTR, H) : Ke, we = fe(d, "ALLOWED_NAMESPACES") ? L({}, d.ALLOWED_NAMESPACES, qt) : he, T = fe(d, "ADD_URI_SAFE_ATTR") ? L(Ae(C), d.ADD_URI_SAFE_ATTR, H) : C, Vt = fe(d, "ADD_DATA_URI_TAGS") ? L(Ae(f), d.ADD_DATA_URI_TAGS, H) : f, de = fe(d, "FORBID_CONTENTS") ? L({}, d.FORBID_CONTENTS, H) : tt, _e = fe(d, "FORBID_TAGS") ? L({}, d.FORBID_TAGS, H) : Ae({}), Fe = fe(d, "FORBID_ATTR") ? L({}, d.FORBID_ATTR, H) : Ae({}), He = fe(d, "USE_PROFILES") ? d.USE_PROFILES : !1, ze = d.ALLOW_ARIA_ATTR !== !1, Be = d.ALLOW_DATA_ATTR !== !1, Pt = d.ALLOW_UNKNOWN_PROTOCOLS || !1, Se = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ge = d.SAFE_FOR_TEMPLATES || !1, Ye = d.SAFE_FOR_XML !== !1, me = d.WHOLE_DOCUMENT || !1, Ce = d.RETURN_DOM || !1, Qe = d.RETURN_DOM_FRAGMENT || !1, et = d.RETURN_TRUSTED_TYPE || !1, qe = d.FORCE_BODY || !1, bt = d.SANITIZE_DOM !== !1, Mt = d.SANITIZE_NAMED_PROPS || !1, De = d.KEEP_CONTENT !== !1, xe = d.IN_PLACE || !1, ft = d.ALLOWED_URI_REGEXP || Ar, X = d.NAMESPACE || U, ue = d.MATHML_TEXT_INTEGRATION_POINTS || ue, ye = d.HTML_INTEGRATION_POINTS || ye, W = d.CUSTOM_ELEMENT_HANDLING || {}, d.CUSTOM_ELEMENT_HANDLING && Mi(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (W.tagNameCheck = d.CUSTOM_ELEMENT_HANDLING.tagNameCheck), d.CUSTOM_ELEMENT_HANDLING && Mi(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (W.attributeNameCheck = d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), d.CUSTOM_ELEMENT_HANDLING && typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ge && (Be = !1), Qe && (Ce = !0), He && (B = L({}, Ki), Y = [], He.html === !0 && (L(B, Ji), L(Y, qi)), He.svg === !0 && (L(B, ei), L(Y, ri), L(Y, Ot)), He.svgFilters === !0 && (L(B, ti), L(Y, ri), L(Y, Ot)), He.mathMl === !0 && (L(B, ii), L(Y, Qi), L(Y, Ot))), d.ADD_TAGS && (typeof d.ADD_TAGS == "function" ? ve.tagCheck = d.ADD_TAGS : (B === It && (B = Ae(B)), L(B, d.ADD_TAGS, H))), d.ADD_ATTR && (typeof d.ADD_ATTR == "function" ? ve.attributeCheck = d.ADD_ATTR : (Y === Ke && (Y = Ae(Y)), L(Y, d.ADD_ATTR, H))), d.ADD_URI_SAFE_ATTR && L(T, d.ADD_URI_SAFE_ATTR, H), d.FORBID_CONTENTS && (de === tt && (de = Ae(de)), L(de, d.FORBID_CONTENTS, H)), d.ADD_FORBID_CONTENTS && (de === tt && (de = Ae(de)), L(de, d.ADD_FORBID_CONTENTS, H)), De && (B["#text"] = !0), me && L(B, ["html", "head", "body"]), B.table && (L(B, ["tbody"]), delete _e.tbody), d.TRUSTED_TYPES_POLICY) {
        if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw yt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw yt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = d.TRUSTED_TYPES_POLICY, ce = P.createHTML("");
      } else
        P === void 0 && (P = Po(m, r)), P !== null && typeof ce == "string" && (ce = P.createHTML(""));
      ee && ee(d), rt = d;
    }
  }, Ni = L({}, [...ei, ...ti, ...vo]), Di = L({}, [...ii, ...wo]), Zr = function(d) {
    let w = z(d);
    (!w || !w.tagName) && (w = {
      namespaceURI: X,
      tagName: "template"
    });
    const A = Ut(d.tagName), F = Ut(w.tagName);
    return we[d.namespaceURI] ? d.namespaceURI === k ? w.namespaceURI === U ? A === "svg" : w.namespaceURI === _ ? A === "svg" && (F === "annotation-xml" || ue[F]) : !!Ni[A] : d.namespaceURI === _ ? w.namespaceURI === U ? A === "math" : w.namespaceURI === k ? A === "math" && ye[F] : !!Di[A] : d.namespaceURI === U ? w.namespaceURI === k && !ye[F] || w.namespaceURI === _ && !ue[F] ? !1 : !Di[A] && (Nt[A] || !Ni[A]) : !!(Ee === "application/xhtml+xml" && we[d.namespaceURI]) : !1;
  }, Te = function(d) {
    vt(e.removed, {
      element: d
    });
    try {
      z(d).removeChild(d);
    } catch {
      y(d);
    }
  }, Ve = function(d, w) {
    try {
      vt(e.removed, {
        attribute: w.getAttributeNode(d),
        from: w
      });
    } catch {
      vt(e.removed, {
        attribute: null,
        from: w
      });
    }
    if (w.removeAttribute(d), d === "is")
      if (Ce || Qe)
        try {
          Te(w);
        } catch {
        }
      else
        try {
          w.setAttribute(d, "");
        } catch {
        }
  }, Ei = function(d) {
    let w = null, A = null;
    if (qe)
      d = "<remove></remove>" + d;
    else {
      const G = Qt(d, /^[\r\n\t ]+/);
      A = G && G[0];
    }
    Ee === "application/xhtml+xml" && X === U && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const F = P ? P.createHTML(d) : d;
    if (X === U)
      try {
        w = new h().parseFromString(F, Ee);
      } catch {
      }
    if (!w || !w.documentElement) {
      w = Ue.createDocument(X, "template", null);
      try {
        w.documentElement.innerHTML = re ? ce : F;
      } catch {
      }
    }
    const K = w.body || w.documentElement;
    return d && A && K.insertBefore(t.createTextNode(A), K.childNodes[0] || null), X === U ? kt.call(w, me ? "html" : "body")[0] : me ? w.documentElement : K;
  }, Ri = function(d) {
    return Yt.call(
      d.ownerDocument || d,
      d,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, jt = function(d) {
    return d instanceof p && (typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || !(d.attributes instanceof g) || typeof d.removeAttribute != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function");
  }, Oi = function(d) {
    return typeof n == "function" && d instanceof n;
  };
  function Ie(S, d, w) {
    Rt(S, (A) => {
      A.call(e, d, w, rt);
    });
  }
  const $i = function(d) {
    let w = null;
    if (Ie(V.beforeSanitizeElements, d, null), jt(d))
      return Te(d), !0;
    const A = H(d.nodeName);
    if (Ie(V.uponSanitizeElement, d, {
      tagName: A,
      allowedTags: B
    }), Ye && d.hasChildNodes() && !Oi(d.firstElementChild) && q(/<[/\w!]/g, d.innerHTML) && q(/<[/\w!]/g, d.textContent) || d.nodeType === At.progressingInstruction || Ye && d.nodeType === At.comment && q(/<[/\w]/g, d.data))
      return Te(d), !0;
    if (!(ve.tagCheck instanceof Function && ve.tagCheck(A)) && (!B[A] || _e[A])) {
      if (!_e[A] && Zi(A) && (W.tagNameCheck instanceof RegExp && q(W.tagNameCheck, A) || W.tagNameCheck instanceof Function && W.tagNameCheck(A)))
        return !1;
      if (De && !de[A]) {
        const F = z(d) || d.parentNode, K = M(d) || d.childNodes;
        if (K && F) {
          const G = K.length;
          for (let ae = G - 1; ae >= 0; --ae) {
            const Pe = v(K[ae], !0);
            Pe.__removalCount = (d.__removalCount || 0) + 1, F.insertBefore(Pe, I(d));
          }
        }
      }
      return Te(d), !0;
    }
    return d instanceof s && !Zr(d) || (A === "noscript" || A === "noembed" || A === "noframes") && q(/<\/no(script|embed|frames)/i, d.innerHTML) ? (Te(d), !0) : (Ge && d.nodeType === At.text && (w = d.textContent, Rt([Ze, We, pt], (F) => {
      w = wt(w, F, " ");
    }), d.textContent !== w && (vt(e.removed, {
      element: d.cloneNode()
    }), d.textContent = w)), Ie(V.afterSanitizeElements, d, null), !1);
  }, Ui = function(d, w, A) {
    if (bt && (w === "id" || w === "name") && (A in t || A in Ur))
      return !1;
    if (!(Be && !Fe[w] && q(Z, w))) {
      if (!(ze && q(D, w))) {
        if (!(ve.attributeCheck instanceof Function && ve.attributeCheck(w, d))) {
          if (!Y[w] || Fe[w]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Zi(d) && (W.tagNameCheck instanceof RegExp && q(W.tagNameCheck, d) || W.tagNameCheck instanceof Function && W.tagNameCheck(d)) && (W.attributeNameCheck instanceof RegExp && q(W.attributeNameCheck, w) || W.attributeNameCheck instanceof Function && W.attributeNameCheck(w, d)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              w === "is" && W.allowCustomizedBuiltInElements && (W.tagNameCheck instanceof RegExp && q(W.tagNameCheck, A) || W.tagNameCheck instanceof Function && W.tagNameCheck(A)))
            ) return !1;
          } else if (!T[w]) {
            if (!q(ft, wt(A, mt, ""))) {
              if (!((w === "src" || w === "xlink:href" || w === "href") && d !== "script" && po(A, "data:") === 0 && Vt[d])) {
                if (!(Pt && !q(se, wt(A, mt, "")))) {
                  if (A)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Zi = function(d) {
    return d !== "annotation-xml" && Qt(d, xt);
  }, Wi = function(d) {
    Ie(V.beforeSanitizeAttributes, d, null);
    const {
      attributes: w
    } = d;
    if (!w || jt(d))
      return;
    const A = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: Y,
      forceKeepAttr: void 0
    };
    let F = w.length;
    for (; F--; ) {
      const K = w[F], {
        name: G,
        namespaceURI: ae,
        value: Pe
      } = K, ot = H(G), Jt = Pe;
      let J = G === "value" ? Jt : mo(Jt);
      if (A.attrName = ot, A.attrValue = J, A.keepAttr = !0, A.forceKeepAttr = void 0, Ie(V.uponSanitizeAttribute, d, A), J = A.attrValue, Mt && (ot === "id" || ot === "name") && (Ve(G, d), J = ke + J), Ye && q(/((--!?|])>)|<\/(style|title|textarea)/i, J)) {
        Ve(G, d);
        continue;
      }
      if (ot === "attributename" && Qt(J, "href")) {
        Ve(G, d);
        continue;
      }
      if (A.forceKeepAttr)
        continue;
      if (!A.keepAttr) {
        Ve(G, d);
        continue;
      }
      if (!Se && q(/\/>/i, J)) {
        Ve(G, d);
        continue;
      }
      Ge && Rt([Ze, We, pt], (zi) => {
        J = wt(J, zi, " ");
      });
      const Fi = H(d.nodeName);
      if (!Ui(Fi, ot, J)) {
        Ve(G, d);
        continue;
      }
      if (P && typeof m == "object" && typeof m.getAttributeType == "function" && !ae)
        switch (m.getAttributeType(Fi, ot)) {
          case "TrustedHTML": {
            J = P.createHTML(J);
            break;
          }
          case "TrustedScriptURL": {
            J = P.createScriptURL(J);
            break;
          }
        }
      if (J !== Jt)
        try {
          ae ? d.setAttributeNS(ae, G, J) : d.setAttribute(G, J), jt(d) ? Te(d) : ji(e.removed);
        } catch {
          Ve(G, d);
        }
    }
    Ie(V.afterSanitizeAttributes, d, null);
  }, Wr = function S(d) {
    let w = null;
    const A = Ri(d);
    for (Ie(V.beforeSanitizeShadowDOM, d, null); w = A.nextNode(); )
      Ie(V.uponSanitizeShadowNode, w, null), $i(w), Wi(w), w.content instanceof o && S(w.content);
    Ie(V.afterSanitizeShadowDOM, d, null);
  };
  return e.sanitize = function(S) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, w = null, A = null, F = null, K = null;
    if (re = !S, re && (S = "<!-->"), typeof S != "string" && !Oi(S))
      if (typeof S.toString == "function") {
        if (S = S.toString(), typeof S != "string")
          throw yt("dirty is not a string, aborting");
      } else
        throw yt("toString is not a function");
    if (!e.isSupported)
      return S;
    if (Lt || Xt(d), e.removed = [], typeof S == "string" && (xe = !1), xe) {
      if (S.nodeName) {
        const Pe = H(S.nodeName);
        if (!B[Pe] || _e[Pe])
          throw yt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (S instanceof n)
      w = Ei("<!---->"), A = w.ownerDocument.importNode(S, !0), A.nodeType === At.element && A.nodeName === "BODY" || A.nodeName === "HTML" ? w = A : w.appendChild(A);
    else {
      if (!Ce && !Ge && !me && // eslint-disable-next-line unicorn/prefer-includes
      S.indexOf("<") === -1)
        return P && et ? P.createHTML(S) : S;
      if (w = Ei(S), !w)
        return Ce ? null : et ? ce : "";
    }
    w && qe && Te(w.firstChild);
    const G = Ri(xe ? S : w);
    for (; F = G.nextNode(); )
      $i(F), Wi(F), F.content instanceof o && Wr(F.content);
    if (xe)
      return S;
    if (Ce) {
      if (Qe)
        for (K = gt.call(w.ownerDocument); w.firstChild; )
          K.appendChild(w.firstChild);
      else
        K = w;
      return (Y.shadowroot || Y.shadowrootmode) && (K = Ht.call(i, K, !0)), K;
    }
    let ae = me ? w.outerHTML : w.innerHTML;
    return me && B["!doctype"] && w.ownerDocument && w.ownerDocument.doctype && w.ownerDocument.doctype.name && q(_r, w.ownerDocument.doctype.name) && (ae = "<!DOCTYPE " + w.ownerDocument.doctype.name + `>
` + ae), Ge && Rt([Ze, We, pt], (Pe) => {
      ae = wt(ae, Pe, " ");
    }), P && et ? P.createHTML(ae) : ae;
  }, e.setConfig = function() {
    let S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Xt(S), Lt = !0;
  }, e.clearConfig = function() {
    rt = null, Lt = !1;
  }, e.isValidAttribute = function(S, d, w) {
    rt || Xt({});
    const A = H(S), F = H(d);
    return Ui(A, F, w);
  }, e.addHook = function(S, d) {
    typeof d == "function" && vt(V[S], d);
  }, e.removeHook = function(S, d) {
    if (d !== void 0) {
      const w = uo(V[S], d);
      return w === -1 ? void 0 : go(V[S], w, 1)[0];
    }
    return ji(V[S]);
  }, e.removeHooks = function(S) {
    V[S] = [];
  }, e.removeAllHooks = function() {
    V = tr();
  }, e;
}
var Lo = Sr();
const ir = (c) => typeof c != "string" ? c : Lo.sanitize(c, {
  ALLOWED_TAGS: [],
  // No HTML tags allowed
  ALLOWED_ATTR: [],
  // No attributes allowed
  KEEP_CONTENT: !0
  // Keep text content
}), Mo = (c) => typeof c != "string" ? !1 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c), rr = (c) => typeof c != "string" ? !1 : /^[\d\s\+\-\(\)]+$/.test(c) && c.replace(/\D/g, "").length >= 7, Cr = [
  "salutation",
  "firstName",
  "lastName",
  "address",
  "zip",
  "city",
  "country",
  "phoneMain",
  "phoneMobile",
  "email",
  "dateOfBirth"
], oi = new Set(Cr), kr = [
  "salutation",
  "firstName",
  "lastName",
  "dateOfBirth"
], No = new Set(kr), ai = 6, or = {
  // Most common countries first (Swiss, German-speaking)
  Schweiz: "CH",
  Switzerland: "CH",
  Deutschland: "DE",
  Germany: "DE",
  Österreich: "AT",
  Austria: "AT",
  Frankreich: "FR",
  France: "FR",
  Italien: "IT",
  Italy: "IT",
  Liechtenstein: "LI",
  // Other European countries
  Belgien: "BE",
  Belgium: "BE",
  Niederlande: "NL",
  Netherlands: "NL",
  Spanien: "ES",
  Spain: "ES",
  Portugal: "PT",
  Großbritannien: "GB",
  "United Kingdom": "GB",
  Polen: "PL",
  Poland: "PL",
  Tschechien: "CZ",
  "Czech Republic": "CZ",
  Ungarn: "HU",
  Hungary: "HU",
  Schweden: "SE",
  Sweden: "SE",
  Norwegen: "NO",
  Norway: "NO",
  Dänemark: "DK",
  Denmark: "DK",
  Finnland: "FI",
  Finland: "FI"
}, ar = {
  CH: "Schweiz",
  DE: "Deutschland",
  AT: "Österreich",
  FR: "Frankreich",
  IT: "Italien",
  LI: "Liechtenstein",
  BE: "Belgien",
  NL: "Niederlande",
  ES: "Spanien",
  PT: "Portugal",
  GB: "Großbritannien",
  PL: "Polen",
  CZ: "Tschechien",
  HU: "Ungarn",
  SE: "Schweden",
  NO: "Norwegen",
  DK: "Dänemark",
  FI: "Finnland"
}, nr = [
  { code: "CH", name: "Schweiz" },
  { code: "DE", name: "Deutschland" },
  { code: "AT", name: "Österreich" },
  { code: "FR", name: "Frankreich" },
  { code: "IT", name: "Italien" },
  { code: "LI", name: "Liechtenstein" }
], st = class st extends Oe {
  constructor() {
    super(), this.logger = Ne("AccountManager"), this.apiBaseUrl = "/v1", this.profile = null, this.travelers = [], this.isLoading = !1, this.isSaving = !1, this.errors = {}, this.showAddTravelerModal = !1, this.showEditTravelerModal = !1, this.showDeleteTravelerModal = !1, this.currentTraveler = null, this.currentTravelerIndex = -1, this.languageConfig = {}, this._dataLoaded = !1, this._loadedViaFallback = !1, this._contextReloadScheduled = !1, this._hasUnsavedProfileChanges = !1, this._hasUnsavedTravelerChanges = !1, this.travelerFormErrors = {}, this._lockedProfileFields = /* @__PURE__ */ new Set(), this.autoLoadAccountData = !0, this._loadingStartTime = null, this._loadingElapsedInterval = null, this._loadingElapsedSeconds = 0, this._previousAuthStatus = !1, this._swissPostalCodes = null, this._postalCodesLoading = !1;
    {
      const e = import.meta.url, t = e.substring(0, e.lastIndexOf("/") + 1);
      this.postalCodesUrl = t + "postal-codes.json";
    }
  }
  async connectedCallback() {
    super.connectedCallback(), setTimeout(async () => {
      try {
        await this._waitForContext(500);
      } catch (e) {
        this.logger.warn("⚠️ _waitForContext failed or timed out:", e);
      }
      this._dataLoaded || (this.logger.debug("🔄 connectedCallback: Loading data..."), await this.loadData());
    }, 100);
  }
  async _waitForContext(e = 500) {
    const t = () => !!this.appState;
    if (t()) return;
    const i = 50, r = Date.now();
    return new Promise((o, a) => {
      const n = setInterval(() => {
        if (t()) {
          clearInterval(n), o();
          return;
        }
        Date.now() - r > e && (clearInterval(n), o());
      }, i);
    });
  }
  async loadData() {
    var e, t;
    if (this._dataLoaded = !0, this.logger.debug("🔄 loadData called - checking context availability..."), this.logger.debug("   - appState:", !!this.appState), this.logger.debug("   - appActions:", !!this.appActions), this.logger.debug("   - loadAccountData function:", typeof ((e = this.appActions) == null ? void 0 : e.loadAccountData)), this.appState && this.appActions && typeof this.appActions.loadAccountData == "function") {
      if (this.logger.debug("✅ Using global context to load account data"), this.logger.debug("   - apiMode:", this.appState.apiMode), this.logger.debug("   - isAuthenticated:", this.appState.isAuthenticated), this.logger.debug("   - accountLoaded:", this.appState.accountLoaded), this.logger.debug("   - accountLoading:", this.appState.accountLoading), !this.autoLoadAccountData)
        this.logger.debug("ℹ️ Auto load of account data disabled, awaiting external data injection");
      else if (!this.appState.isAuthenticated)
        this.logger.debug("⏳ User not authenticated yet, waiting for auth to complete...", {
          appStateAuth: this.appState.isAuthenticated,
          hasAuthComponent: !!this.appState.authComponent
        }), delete this.errors.loading, this.requestUpdate();
      else if (!this.appState.accountLoaded && !this.appState.accountLoading) {
        this.logger.debug("🚀 Triggering loadAccountData from AccountManager (auto-load)");
        try {
          await this.appActions.loadAccountData();
        } catch (r) {
          this.errors.loading = "Fehler beim Laden der Account-Daten", this.logger.error("❌ Error loading account data from global state:", r);
        }
      } else
        this.logger.debug("ℹ️ Account data already loaded or loading", {
          loaded: this.appState.accountLoaded,
          loading: this.appState.accountLoading
        });
      const i = this.appState.accountProfile ? this.appState.accountProfile : null;
      if (typeof i == "string")
        try {
          const r = JSON.parse(i);
          typeof r == "string" || typeof r == "number" ? this.profile = { email: r.toString() } : this.profile = r;
        } catch (r) {
          this.logger.warn("⚠️ account-manager: Failed to parse profile JSON from appState; using raw value", r), this.profile = { email: i };
        }
      else
        this.profile = i ? { ...i } : null;
      this.logger.debug("Profile", this.profile), this.travelers = Array.isArray(this.appState.accountTravelers) ? [...this.appState.accountTravelers] : [], this._hasUnsavedProfileChanges = !1, this._hasUnsavedTravelerChanges = !1, this._updateLockedFields(this.profile), this.logger.debug("📊 Data from context:", { profile: !!this.profile, travelers: (t = this.travelers) == null ? void 0 : t.length }), this._loadedViaFallback = !1;
    } else {
      this.logger.debug("⚠️ No context available - attempting direct API load");
      try {
        await this._loadAccountDataFromApi(), this._loadedViaFallback = !0;
      } catch (i) {
        this.logger.error("❌ Failed to load account data without context:", i), this.errors.loading = "Fehler beim Laden der Account-Daten";
      }
    }
  }
  appContextChanged(e, t) {
    var i, r, o, a, n;
    try {
      if (this.logger.debug("📥 AccountManager.appContextChanged:", {
        hasContext: !!e,
        hasState: !!(e != null && e.state),
        profileInState: !!((i = e == null ? void 0 : e.state) != null && i.accountProfile),
        loadingInState: (r = e == null ? void 0 : e.state) == null ? void 0 : r.accountLoading
      }), (o = super.appContextChanged) == null || o.call(this, e, t), !(e != null && e.state)) return;
      const s = e.state, l = s.isAuthenticated || !1;
      !this._previousAuthStatus && l && this.autoLoadAccountData && (this.logger.debug("✅ User just authenticated - loading account data..."), delete this.errors.loading, (n = (a = this.appActions) == null ? void 0 : a.loadAccountData) == null || n.call(a).catch((m) => {
        this.errors.loading = "Fehler beim Laden der Account-Daten", this.logger.error("❌ Error loading account data after auth:", m), this.requestUpdate();
      })), this._previousAuthStatus = l;
      const g = s.accountProfile || null, p = Array.isArray(s.accountTravelers) ? s.accountTravelers : [], h = s.accountLoading;
      this.logger.debug("🔄 Sync Check:", {
        stateProfile: !!g,
        localProfile: !!this.profile,
        areEqual: this._profilesAreEqual(g, this.profile)
      }), !this._hasUnsavedProfileChanges && !this._profilesAreEqual(g, this.profile) && (!g && this.profile && s.isAuthenticated && !s.accountLoading ? this.logger.debug("⚠️ Ignoring null profile sync while authenticated (likely transient state)") : (this.logger.debug("✅ Syncing profile from global state"), this.profile = g ? { ...g } : null, this._updateLockedFields(this.profile))), !this._hasUnsavedTravelerChanges && !this._travelerListsEqual(p, this.travelers) && (this.travelers = p.map((m) => ({ ...m }))), this._hasUnsavedTravelerChanges && this._travelerListsEqual(p, this.travelers) && (this._hasUnsavedTravelerChanges = !1), h !== this.isLoading && (this.isLoading = h, h ? this._startLoadingTimer() : this._stopLoadingTimer());
    } catch (s) {
      this.logger.error("💥 ERROR in appContextChanged:", s);
    }
    try {
      this._reloadFromContextIfNeeded();
    } catch (s) {
      this.logger.warn("⚠️ Failed to trigger context reload from appContextChanged:", s);
    }
  }
  updated(e) {
    super.updated(e), this.logger.debug("🔄 AccountManager.updated called", {
      changedProps: [...e.keys()]
    });
  }
  appContextReady() {
    this._reloadFromContextIfNeeded();
  }
  _reloadFromContextIfNeeded() {
    var e;
    !this._loadedViaFallback || this._contextReloadScheduled || !this.appState || !((e = this.appActions) != null && e.loadAccountData) || (this._contextReloadScheduled = !0, setTimeout(async () => {
      try {
        this._dataLoaded = !1, this._loadedViaFallback = !1, await this.loadData();
      } finally {
        this._contextReloadScheduled = !1;
      }
    }, 0));
  }
  async loadProfileFromAPI() {
    var e, t;
    try {
      this._configureApiService();
      const i = await x.getAccountProfile();
      if (typeof i == "string")
        try {
          const r = JSON.parse(i);
          typeof r == "string" || typeof r == "number" ? this.profile = { email: r.toString() } : this.profile = r;
        } catch (r) {
          this.logger.warn("⚠️ loadProfileFromAPI: Failed to parse profile JSON; storing as object with email if possible", r), this.profile = { email: i };
        }
      else
        this.profile = i ? { ...i } : null;
      if (this._hasUnsavedProfileChanges = !1, this._updateLockedFields(this.profile), Array.isArray(i == null ? void 0 : i.travelers) ? (this.travelers = i.travelers.map((r) => ({ ...r })), this._hasUnsavedTravelerChanges = !1) : Array.isArray(this.travelers) || (this.travelers = []), (e = this.appActions) != null && e.setAccountData) {
        const r = ((t = this.appState) == null ? void 0 : t.accountClubStatus) ?? null, o = Array.isArray(this.travelers) ? [...this.travelers] : [];
        this.appActions.setAccountData(this.profile ? { ...this.profile } : null, o, r);
      }
      return this.profile;
    } catch (i) {
      throw this.logger.error("❌ Failed to load account profile from API:", i), i;
    }
  }
  async loadTravelersFromAPI(e = !1) {
    var t, i;
    try {
      this._configureApiService();
      const r = !e && this.profile && Array.isArray(this.profile.travelers) && this.profile.travelers.length > 0 ? this.profile.travelers : await x.getAccountTravelers(), o = Array.isArray(r) ? r.map((n) => ({ ...n })) : [];
      this.travelers = [...o], this._hasUnsavedTravelerChanges = !1;
      const a = this.travelers.filter((n) => n.isLocked === !0);
      if (this.logger.debug("✅ Loaded travelers from API:", this.travelers.length, "travelers"), a.length > 0 && this.logger.debug("🔒 Locked travelers:", a.map((n) => `${n.firstName} ${n.lastName}`).join(", ")), (t = this.appActions) != null && t.setAccountData) {
        const n = this.profile ? { ...this.profile } : null, s = ((i = this.appState) == null ? void 0 : i.accountClubStatus) ?? null;
        this.appActions.setAccountData(n, [...this.travelers], s);
      }
      return this.travelers;
    } catch (r) {
      throw this.logger.error("❌ Failed to load travelers from API:", r), r;
    }
  }
  getText(e, t = null) {
    return O(e, "account", t, this.theme);
  }
  isFieldLocked(e) {
    if (this._lockedProfileFields && this._lockedProfileFields.size > 0)
      return this._lockedProfileFields.has(e);
  }
  async handleProfileSubmit(e) {
    e.preventDefault(), this.isSaving = !0, this.errors = {};
    const t = new FormData(e.target), i = Object.fromEntries(t), r = this._filterProfileData(
      this._applyLockedFieldValues(this._sanitizeProfileData(i))
    ), o = this._validateProfileData(r);
    if (Object.keys(o).length > 0) {
      this._handleProfileValidationErrors(o);
      return;
    }
    try {
      await this.saveProfile(r), this._showSuccess(
        "Erfolgreich gespeichert",
        "Ihre Profildaten wurden erfolgreich aktualisiert."
      ), this.errors = {}, this._hasUnsavedProfileChanges = !1;
    } catch (a) {
      this.logger.error("❌ handleProfileSubmit failed:", a), this._showError(
        "Speichern fehlgeschlagen",
        (a == null ? void 0 : a.message) || "Beim Speichern Ihrer Daten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isSaving = !1;
    }
  }
  async saveProfile(e) {
    try {
      this._configureApiService();
      const t = this._buildProfileUpdatePayload(e);
      if (Object.keys(t).length === 0) {
        this.logger.debug("ℹ️ saveProfile: No mutable fields to update, skipping API call.");
        return;
      }
      const i = await x.updateAccountProfile(t);
      this.logger.debug("✅ Profile updated successfully, reloading complete profile from API..."), await this.loadProfileFromAPI(), Array.isArray(i == null ? void 0 : i.warnings) && i.warnings.length > 0 && this._showWarning(
        "Profil gespeichert – mit Hinweisen",
        i.warnings.join(`
`)
      ), this._syncTravelersToContext(this.travelers);
    } catch (t) {
      throw this.logger.error("❌ Failed to save profile:", t), t;
    }
  }
  handleAddTraveler() {
    if ((Array.isArray(this.travelers) ? this.travelers.length : 0) >= ai) {
      this._showInfo(this.getText("maxTravelersReachedTitle", "Maximale Anzahl erreicht"), this.getText("maxTravelersReached", "Es sind max. 6 Reisende möglich"));
      return;
    }
    this.currentTraveler = { salutation: "", firstName: "", lastName: "", dateOfBirth: "" }, this.currentTravelerIndex = -1, this.showAddTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 }));
  }
  handleEditTraveler(e, t) {
    const i = this._normalizeSalutationFromApi(e.salutation);
    this.currentTraveler = {
      ...e,
      salutation: i
    }, this.currentTravelerIndex = t, this.showEditTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 }));
  }
  handleDeleteTraveler(e, t) {
    this.currentTraveler = e, this.currentTravelerIndex = t, this.showDeleteTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 }));
  }
  /**
   * Normalize salutation from API format (Herr/Frau) to form format (mr/ms)
   */
  _normalizeSalutationFromApi(e) {
    if (!e) return "";
    const t = e.toString().toLowerCase().trim();
    return t === "individuell" ? "" : t === "herr" ? "mr" : t === "frau" ? "ms" : t === "mr" || t === "ms" ? t : e;
  }
  /**
   * Convert date from ISO format (YYYY-MM-DD) to German format (DD.MM.YYYY)
   * @param {string} isoDate - Date in ISO format (1982-12-31)
   * @returns {string} Date in German format (31.12.1982) or empty string
   */
  _formatDateToGerman(e) {
    if (!e) return "";
    const t = e.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!t) return e;
    const [, i, r, o] = t;
    return `${o}.${r}.${i}`;
  }
  /**
   * Convert date from German format (DD.MM.YYYY) to ISO format (YYYY-MM-DD)
   * @param {string} germanDate - Date in German format (31.12.1982)
   * @returns {string} Date in ISO format (1982-12-31) or empty string
   */
  _formatDateToISO(e) {
    if (!e) return "";
    const t = e.match(/^(\d{4})[\.\-\/](\d{1,2})[\.\-\/](\d{1,2})$/);
    if (t) {
      const [, p, h, m] = t;
      return `${p}-${h.padStart(2, "0")}-${m.padStart(2, "0")}`;
    }
    const r = e.replace(/[\/\-]/g, ".").trim().split(".");
    if (r.length !== 3) return e;
    let [o, a, n] = r;
    if (o = o.padStart(2, "0"), a = a.padStart(2, "0"), n.length === 2) {
      const p = (/* @__PURE__ */ new Date()).getFullYear() % 100;
      n = parseInt(n, 10) > p + 10 ? `19${n}` : `20${n}`;
    }
    const s = parseInt(n, 10), l = parseInt(a, 10), g = parseInt(o, 10);
    return n.length !== 4 || isNaN(s) || s < 1800 || s > 2100 || isNaN(l) || l < 1 || l > 12 || isNaN(g) || g < 1 || g > 31 ? e : `${n}-${a}-${o}`;
  }
  closeModals() {
    var e;
    (e = this.shadowRoot) == null || e.querySelectorAll("dialog[open]").forEach((t) => t.close()), pr(), this.showAddTravelerModal = !1, this.showEditTravelerModal = !1, this.showDeleteTravelerModal = !1, this.currentTraveler = null, this.currentTravelerIndex = -1, this._clearTravelerErrors();
  }
  /**
   * Update portal modal after state change
   */
  _showNotification(e) {
    const t = this.shadowRoot.querySelector("auth-notifications");
    t && t.showNotification(e);
  }
  _showSuccess(e, t) {
    this._showNotification({
      type: "success",
      title: e,
      message: t
    });
  }
  _showError(e, t) {
    this._showNotification({
      type: "error",
      title: e,
      message: t
    });
  }
  _startLoadingTimer() {
    this._stopLoadingTimer(), this._loadingStartTime = Date.now(), this._loadingElapsedSeconds = 0, this._loadingElapsedInterval = setInterval(() => {
      this._loadingStartTime && typeof this._loadingStartTime == "number" && (this._loadingElapsedSeconds = Math.floor((Date.now() - this._loadingStartTime) / 1e3), this.requestUpdate());
    }, 1e3);
  }
  _stopLoadingTimer() {
    this._loadingElapsedInterval && (clearInterval(this._loadingElapsedInterval), this._loadingElapsedInterval = null), this._loadingStartTime = null, this._loadingElapsedSeconds = 0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopLoadingTimer();
  }
  /**
   * Remove all portal modals from document.body
   */
  updated(e) {
    super.updated(e), e.has("showAddTravelerModal") && this._syncDialog("add-traveler-dialog", this.showAddTravelerModal, "add-traveler-salutation"), e.has("showEditTravelerModal") && this._syncDialog("edit-traveler-dialog", this.showEditTravelerModal, "edit-traveler-salutation"), e.has("showDeleteTravelerModal") && this._syncDialog("delete-traveler-dialog", this.showDeleteTravelerModal, null, ".btn-danger");
  }
  /**
   * Sync a native <dialog> open/close state after Lit re-render.
   * Uses .showModal() for Top Layer rendering (above all z-index stacking contexts).
   */
  _syncDialog(e, t, i = null, r = null) {
    requestAnimationFrame(() => {
      var a;
      const o = (a = this.shadowRoot) == null ? void 0 : a.getElementById(e);
      if (o)
        if (t && !o.open) {
          mr(), o.showModal();
          const n = i ? this.shadowRoot.getElementById(i) : r ? o.querySelector(r) : null;
          n && n.focus();
        } else !t && o.open && o.close();
    });
  }
  _focusModal(e, t = null) {
    requestAnimationFrame(() => {
      const i = e ? this.shadowRoot.getElementById(e) : t ? this.shadowRoot.querySelector(t) : null;
      i && i.focus();
    });
  }
  _handleModalKeydown(e) {
    if (e.key === "Escape") {
      this.closeModals();
      return;
    }
    if (e.key === "Tab") {
      const i = e.currentTarget.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (i.length === 0) return;
      const r = i[0], o = i[i.length - 1], a = this.shadowRoot.activeElement;
      e.shiftKey ? a === r && (o.focus(), e.preventDefault()) : a === o && (r.focus(), e.preventDefault());
    }
  }
  _showInfo(e, t) {
    this._showNotification({
      type: "info",
      title: e,
      message: t
    });
  }
  _sanitizeProfileData(e = {}) {
    return Object.entries(e).reduce((t, [i, r]) => {
      let o = r;
      if (typeof o == "string") {
        if (o = o.trim(), i === "dateOfBirth") {
          const a = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, n = o.match(a);
          if (n) {
            const s = n[1].padStart(2, "0"), l = n[2].padStart(2, "0");
            o = `${n[3]}-${l}-${s}`;
          }
        }
        t[i] = ir(o);
      } else
        t[i] = o;
      return t;
    }, {});
  }
  _sanitizeTravelerData(e = {}) {
    return kr.reduce((t, i) => {
      let r = e[i];
      if (typeof r == "string") {
        if (r = r.trim(), i === "dateOfBirth") {
          const o = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, a = r.match(o);
          if (a) {
            const n = a[1].padStart(2, "0"), s = a[2].padStart(2, "0");
            r = `${a[3]}-${s}-${n}`;
          }
        }
        t[i] = ir(r);
      } else r != null ? t[i] = r : t[i] = "";
      return t;
    }, {});
  }
  _validateTravelerData(e = {}, t = {}) {
    const i = {}, r = typeof t.singleField == "string" ? t.singleField : null, o = [
      { name: "firstName", message: this.getText("errorRequiredTravelerFirstName", "Bitte geben Sie den Vornamen des Mitreisenden an.") },
      { name: "lastName", message: this.getText("errorRequiredTravelerLastName", "Bitte geben Sie den Nachnamen des Mitreisenden an.") },
      { name: "dateOfBirth", message: this.getText("errorRequiredTravelerDateOfBirth", "Bitte geben Sie das Geburtsdatum des Mitreisenden an.") }
    ], a = (s) => Object.prototype.hasOwnProperty.call(e, s) ? e[s] ?? "" : this.currentTraveler && Object.prototype.hasOwnProperty.call(this.currentTraveler, s) ? this.currentTraveler[s] ?? "" : "";
    o.forEach(({ name: s, message: l }) => {
      if (r && s !== r)
        return;
      a(s) || (i[s] = l);
    });
    const n = a("dateOfBirth");
    if ((!r || r === "dateOfBirth") && n) {
      const s = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, l = /^\d{4}-\d{2}-\d{2}$/;
      let g = null, p = !1;
      if (l.test(n))
        g = new Date(n), p = !0;
      else if (s.test(n)) {
        const h = n.match(s);
        if (h) {
          const m = h[1].padStart(2, "0"), b = h[2].padStart(2, "0"), v = h[3];
          g = /* @__PURE__ */ new Date(`${v}-${b}-${m}`), p = !0;
        }
      }
      if (!p)
        i.dateOfBirth = this.getText("errorInvalidTravelerDateOfBirthFormat", "Bitte geben Sie ein gültiges Datum ein (TT.MM.JJJJ).");
      else {
        const h = /* @__PURE__ */ new Date();
        h.setHours(0, 0, 0, 0);
        const m = new Date(h);
        m.setFullYear(m.getFullYear() - 120), !g || Number.isNaN(g.getTime()) ? i.dateOfBirth = this.getText("errorInvalidTravelerDateOfBirth", "Bitte geben Sie ein gültiges Geburtsdatum an.") : g > h ? i.dateOfBirth = this.getText("errorTravelerDateOfBirthInFuture", "Das Geburtsdatum darf nicht in der Zukunft liegen.") : g < m && (i.dateOfBirth = this.getText("errorTravelerDateOfBirthTooOld", "Das Geburtsdatum darf nicht mehr als 120 Jahre zurückliegen."));
      }
    }
    return i;
  }
  _handleTravelerValidationErrors(e, t) {
    this.travelerFormErrors = { ...e }, this.requestUpdate();
    const i = Object.keys(e)[0];
    i && this.updateComplete.then(() => {
      const r = t == null ? void 0 : t.querySelector(`[name="${i}"]`);
      r && (r.focus({ preventScroll: !1 }), r.scrollIntoView({ behavior: "smooth", block: "center" }));
    });
  }
  _clearTravelerErrors() {
    Object.keys(this.travelerFormErrors || {}).length !== 0 && (this.travelerFormErrors = {});
  }
  _handleTravelerInput(e) {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement))
      return;
    const i = t.name;
    if (!No.has(i))
      return;
    let r = t.value;
    i === "dateOfBirth" && (r = this._formatDateToISO(r));
    const o = typeof r == "string" ? r.trim() : r;
    this.currentTraveler = {
      ...this.currentTraveler || {},
      [i]: o
    };
    const a = this._validateTravelerData({ [i]: o }, { singleField: i }), n = { ...this.travelerFormErrors };
    a[i] ? n[i] = a[i] : i in n && delete n[i], this.travelerFormErrors = n;
  }
  _updateLockedFields(e) {
    if (this._lockedProfileFields || (this._lockedProfileFields = /* @__PURE__ */ new Set()), this._lockedProfileFields.clear(), !e)
      return;
    e.isNameLocked && (this._lockedProfileFields.add("firstName"), this._lockedProfileFields.add("lastName")), e.isEmailLocked && this._lockedProfileFields.add("email"), e.isDateOfBirthLocked && this._lockedProfileFields.add("dateOfBirth"), (Array.isArray(e.lockedFields) ? e.lockedFields : []).forEach((i) => {
      typeof i == "string" && i && this._lockedProfileFields.add(i);
    }), this.logger.debug("🔒 Locked fields:", Array.from(this._lockedProfileFields));
  }
  isFieldLocked(e) {
    return this._lockedProfileFields.has(e);
  }
  /**
   * Get the lock reason for a specific field
   * @param {string} fieldName - Field name (e.g., 'firstName', 'email')
   * @returns {string|null} Lock reason or null if not locked
   */
  getLockReason(e) {
    return !this.profile || !this.isFieldLocked(e) ? null : this.profile.lockReasons && typeof this.profile.lockReasons == "object" ? this.profile.lockReasons[e] || null : e === "firstName" || e === "lastName" ? this.getText("nameChangeLockReason", "Namensänderungen können nur über den Kundenservice vorgenommen werden.") : e === "email" ? this.getText("emailChangeLockReason", "E-Mail-Änderungen können nur über den Kundenservice vorgenommen werden.") : e === "dateOfBirth" ? this.getText("dateOfBirthLockReason", "Das Geburtsdatum kann nicht geändert werden.") : null;
  }
  _getActiveApiMode() {
    var e;
    return this.apiMode || ((e = this.appState) == null ? void 0 : e.apiMode) || "live";
  }
  _configureApiService() {
    var i;
    const e = this._getActiveApiMode();
    e && x.mode !== e && x.setMode(e);
    const t = this.authComponent || ((i = this.appState) == null ? void 0 : i.authComponent);
    t && x.setAuthComponent(t);
  }
  _buildProfileUpdatePayload(e = {}) {
    const t = {}, i = {};
    Object.entries({
      salutation: "salutation",
      firstName: "firstName",
      lastName: "lastName",
      dateOfBirth: "dateOfBirth"
    }).forEach(([n, s]) => {
      e[n] !== void 0 && !this.isFieldLocked(n) && e[n] !== null && e[n] !== "" && (n === "salutation" ? i[s] = this._mapSalutationToApi(e[n]) : i[s] = e[n]);
    }), Object.keys(i).length > 0 && (t.personalData = i);
    const o = {};
    e.address !== void 0 && (o.street = e.address), e.zip !== void 0 && (o.zipCode = e.zip), e.city !== void 0 && (o.city = e.city), e.country !== void 0 && (o.country = e.country), Object.keys(o).length > 0 && (t.address = o);
    const a = {};
    return e.phoneMain !== void 0 && (a.phoneMain = e.phoneMain), e.phoneMobile !== void 0 && (a.phoneMobile = e.phoneMobile), e.email !== void 0 && !this.isFieldLocked("email") && (a.email = e.email), Object.keys(a).length > 0 && (t.contact = a), t;
  }
  async _loadAccountDataFromApi() {
    this.isLoading = !0;
    try {
      await Promise.all([
        this.loadProfileFromAPI(),
        this.loadTravelersFromAPI()
      ]);
    } catch (e) {
      throw this._showError(
        "Accountdaten konnten nicht geladen werden",
        "Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut."
      ), e;
    } finally {
      this.isLoading = !1;
    }
  }
  _buildTravelerPayload(e = {}) {
    const t = {};
    return ["firstName", "lastName", "dateOfBirth", "salutation", "relation"].forEach((r) => {
      const o = e[r];
      o != null && o !== "" && (r === "salutation" ? t[r] = this._mapSalutationToApi(o) : t[r] = o);
    }), t.relation || (t.relation = "companion"), t;
  }
  async _createTravelerOnApi(e) {
    this._configureApiService();
    const t = this._buildTravelerPayload(e);
    return await x.addTraveler(t);
  }
  async _updateTravelerOnApi(e, t) {
    if (!e)
      throw new Error("Traveler ID erforderlich für das Aktualisieren.");
    this._configureApiService();
    const i = this._buildTravelerPayload(t);
    return await x.updateTraveler(e, i);
  }
  async _deleteTravelerOnApi(e) {
    if (!e)
      throw new Error("Traveler ID erforderlich für das Löschen.");
    return this._configureApiService(), await x.deleteTraveler(e), null;
  }
  _mapSalutationToApi(e) {
    if (!e)
      return "";
    const t = e.toString().trim().toLowerCase();
    return t === "mr" || t === "herr" ? "Herr" : t === "ms" || t === "frau" ? "Frau" : e;
  }
  /**
   * Renders a dynamic salutation option if the profile has a salutation
   * that doesn't match the standard options (mr, ms)
   * @returns {TemplateResult|nothing}
   */
  _renderDynamicSalutationOption() {
    var r;
    const e = (r = this.profile) == null ? void 0 : r.salutation;
    if (!e)
      return R;
    const t = e.toString().trim().toLowerCase();
    return t === "individuell" ? R : t === "mr" || t === "ms" ? R : u`<option selected value="${e}">${e}</option>`;
  }
  /**
   * Renders a spinner icon for buttons
   * @returns {TemplateResult}
   */
  _renderButtonSpinner() {
    return u`
      <svg class="button-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>
        <path class="spinner-path" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
      </svg>
    `;
  }
  _syncTravelersToContext(e) {
    var t, i;
    if ((t = this.appActions) != null && t.setAccountData) {
      const r = this.profile ? { ...this.profile } : null, o = ((i = this.appState) == null ? void 0 : i.accountClubStatus) ?? null;
      this.appActions.setAccountData(r, e, o);
    }
  }
  _applyLockedFieldValues(e = {}) {
    return this.profile && Object.entries(this.profile).forEach(([t, i]) => {
      this.isFieldLocked(t) && (e[t] === void 0 || e[t] === "") && (e[t] = i ?? "");
    }), e;
  }
  _filterProfileData(e = {}) {
    return Object.keys(e).reduce((t, i) => (oi.has(i) && (t[i] = e[i]), t), {});
  }
  _profilesAreEqual(e, t) {
    const i = e === t ? !0 : !e || !t ? !e && !t : Cr.every((r) => {
      let o = e[r], a = t[r];
      return o == null && (o = ""), a == null && (a = ""), typeof o == "string" && (o = o.trim()), typeof a == "string" && (a = a.trim()), o === a;
    });
    return this.logger.debug("⚖️ _profilesAreEqual:", {
      // hasA: !!profileA,
      // hasB: !!profileB,
      result: i
    }), i;
  }
  _travelerListsEqual(e, t) {
    if (e === t)
      return !0;
    if (!Array.isArray(e) || !Array.isArray(t))
      return Array.isArray(e) === Array.isArray(t);
    if (e.length !== t.length)
      return !1;
    for (let i = 0; i < e.length; i += 1) {
      const r = e[i], o = t[i];
      if (r === o)
        continue;
      if (!r || !o)
        return !1;
      const a = /* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(o)]);
      for (const n of a)
        if (r[n] !== o[n])
          return !1;
    }
    return !0;
  }
  /**
   * Handle country field blur - ensure value is mapped to ISO code
   */
  _handleCountryBlur(e) {
    const t = e.target;
    if (t.value) {
      const i = this._mapCountryToCode(t.value);
      t.value = this._mapCodeToCountryName(i);
    }
  }
  async _handleProfileInput(e) {
    var g;
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement))
      return;
    const i = t.name;
    if (!oi.has(i) || this.isFieldLocked(i))
      return;
    let r = t.value;
    i === "dateOfBirth" && (r = this._formatDateToISO(r));
    const o = typeof r == "string" ? r.trim() : r, a = { [i]: o }, n = this._validateField(i, a[i]), s = { ...this.errors };
    let l = !1;
    if (n[i] ? s[i] !== n[i] && (s[i] = n[i], l = !0) : i in s && (delete s[i], l = !0), l && (this.errors = s), this._hasUnsavedProfileChanges = !0, this.profile && this.profile[i] !== o && (this.profile = {
      ...this.profile,
      [i]: o
    }), i === "zip" && o && !((g = this.profile) != null && g.city) && await this._lookupSwissPostalCode(o), i === "country" && o) {
      const p = this._mapCountryToCode(o);
      p && p !== o && (this.profile = {
        ...this.profile,
        country: p
      });
    }
  }
  /**
   * Maps a country name or code to an ISO country code
   * @param {string} input - Country name (e.g., "Schweiz") or code (e.g., "CH")
   * @returns {string} ISO country code or original input if no match found
   */
  _mapCountryToCode(e) {
    if (!e) return "";
    const t = e.trim();
    if (/^[A-Z]{2}$/.test(t))
      return t;
    const i = Object.entries(or).find(
      ([o]) => o.toLowerCase() === t.toLowerCase()
    );
    if (i) return i[1];
    const r = Object.entries(or).find(
      ([o]) => o.toLowerCase().startsWith(t.toLowerCase())
    );
    return r ? r[1] : t;
  }
  /**
   * Maps an ISO country code to display name
   * @param {string} code - ISO country code (e.g., "CH")
   * @returns {string} Country display name or original code if no match found
   */
  _mapCodeToCountryName(e) {
    return e ? ar[e.toUpperCase()] || e : "";
  }
  _validateField(e, t) {
    if (!oi.has(e))
      return {};
    const i = { [e]: t };
    return this._validateProfileData(i, { singleField: e });
  }
  /**
   * Lazily loads Swiss postal codes from the GitHub repository
   * Only loads the data once when needed
   * @returns {Promise<Object>} Postal codes object mapping PLZ to city names
   */
  async _loadSwissPostalCodes() {
    if (this._swissPostalCodes)
      return this._swissPostalCodes;
    if (this._postalCodesLoading) {
      let e = 0;
      for (; this._postalCodesLoading && e < 50; )
        await new Promise((t) => setTimeout(t, 100)), e++;
      return this._swissPostalCodes || {};
    }
    this._postalCodesLoading = !0;
    try {
      this.logger.debug("📍 Loading Swiss postal codes...");
      const e = await fetch(this.postalCodesUrl);
      if (!e.ok)
        throw new Error(`Failed to load postal codes: ${e.status}`);
      const t = await e.json();
      return this._swissPostalCodes = t, this.logger.debug("✅ Swiss postal codes loaded successfully"), t;
    } catch (e) {
      return this.logger.error("❌ Failed to load Swiss postal codes:", e), this._swissPostalCodes = {}, {};
    } finally {
      this._postalCodesLoading = !1;
    }
  }
  /**
   * Looks up a city based on a Swiss postal code and auto-fills it if found
   * @param {string} postalCode - The postal code to lookup
   */
  async _lookupSwissPostalCode(e) {
    var t, i;
    if (!(!e || !/^\d{4}$/.test(e)))
      try {
        const o = (await this._loadSwissPostalCodes())[e];
        if (o) {
          if (this.logger.debug(`📍 Found city for postal code ${e}: ${o}`), this.profile = {
            ...this.profile,
            city: o,
            country: "CH"
          }, this.errors.city) {
            const s = { ...this.errors };
            delete s.city, this.errors = s;
          }
          await this.requestUpdate(), await this.updateComplete;
          const a = (t = this.renderRoot) == null ? void 0 : t.getElementById("city");
          a && (a.value = o, this.logger.debug(`✅ City field updated to: ${o}`));
          const n = (i = this.renderRoot) == null ? void 0 : i.getElementById("country");
          n && (n.value = "CH", this.logger.debug("✅ Country field updated to: CH"));
        }
      } catch (r) {
        this.logger.error("❌ Error looking up postal code:", r);
      }
  }
  _validateProfileData(e = {}, t = {}) {
    const i = {}, r = typeof t.singleField == "string" ? t.singleField : null, o = [
      { name: "salutation", message: this.getText("errorRequiredSalutation", "Bitte wählen Sie eine Anrede aus.") },
      { name: "firstName", message: this.getText("errorRequiredFirstName", "Bitte geben Sie Ihren Vornamen an.") },
      { name: "lastName", message: this.getText("errorRequiredLastName", "Bitte geben Sie Ihren Nachnamen an.") },
      { name: "address", message: this.getText("errorRequiredAddress", "Bitte ergänzen Sie Ihre Adresse.") },
      { name: "zip", message: this.getText("errorRequiredZip", "Bitte geben Sie Ihre Postleitzahl an.") },
      { name: "city", message: this.getText("errorRequiredCity", "Bitte geben Sie Ihren Wohnort an.") },
      { name: "email", message: this.getText("errorRequiredEmail", "Bitte geben Sie Ihre E-Mail-Adresse an.") }
    ], a = (h) => {
      var m;
      return Object.prototype.hasOwnProperty.call(e, h) ? e[h] : ((m = this.profile) == null ? void 0 : m[h]) ?? "";
    };
    o.forEach(({ name: h, message: m }) => {
      r && h !== r || a(h) || (i[h] = m);
    });
    const n = a("email");
    (!r || r === "email") && n && (Mo(n) || (i.email = this.getText("errorInvalidEmail", "Bitte geben Sie eine gültige E-Mail-Adresse ein.")));
    const s = a("zip");
    (!r || r === "zip") && s && (/^[0-9A-Za-z\-\s]{3,10}$/.test(s) || (i.zip = this.getText("errorInvalidZip", "Bitte geben Sie eine gültige Postleitzahl an.")));
    const l = a("phoneMain");
    (!r || r === "phoneMain") && l && (rr(l) || (i.phoneMain = this.getText("errorInvalidPhone", "Bitte geben Sie eine gültige Telefonnummer an.")));
    const g = a("phoneMobile");
    (!r || r === "phoneMobile") && g && (rr(g) || (i.phoneMobile = this.getText("errorInvalidMobile", "Bitte geben Sie eine gültige Mobilnummer an.")));
    const p = a("dateOfBirth");
    if ((!r || r === "dateOfBirth") && p)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p))
        i.dateOfBirth = this.getText("errorInvalidDateOfBirthFormat", "Bitte geben Sie ein gültiges Datum ein.");
      else {
        const m = new Date(p), b = Number.isNaN(m.getTime()) ? "" : m.toISOString().slice(0, 10), v = /* @__PURE__ */ new Date();
        v.setHours(0, 0, 0, 0);
        const y = new Date(v);
        y.setFullYear(y.getFullYear() - 120), Number.isNaN(m.getTime()) || b !== p ? i.dateOfBirth = this.getText("errorInvalidDateOfBirth", "Bitte geben Sie ein gültiges Geburtsdatum an.") : m > v ? i.dateOfBirth = this.getText("errorDateOfBirthInFuture", "Das Geburtsdatum darf nicht in der Zukunft liegen.") : m < y && (i.dateOfBirth = this.getText("errorDateOfBirthTooOld", "Das Geburtsdatum darf nicht mehr als 120 Jahre zurückliegen."));
      }
    return i;
  }
  _handleProfileValidationErrors(e) {
    this.errors = e, this.isSaving = !1, this.requestUpdate(), this.updateComplete.then(() => this._focusFirstError());
  }
  _focusField(e) {
    var i;
    const t = (i = this.renderRoot) == null ? void 0 : i.getElementById(e);
    t && (t.focus({ preventScroll: !1 }), t.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
  _focusFirstError() {
    var t;
    const e = (t = this.renderRoot) == null ? void 0 : t.querySelector('[aria-invalid="true"]');
    e && (e.focus({ preventScroll: !1 }), e.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
  _handleErrorSummaryActivate(e) {
    var i;
    e.preventDefault();
    const t = (i = e.currentTarget) == null ? void 0 : i.getAttribute("data-field");
    t && this._focusField(t);
  }
  async handleTravelerSubmit(e) {
    var n;
    e.preventDefault(), this.isSaving = !0;
    const t = new FormData(e.target), i = Object.fromEntries(t), r = this._sanitizeTravelerData(i), o = this._validateTravelerData(r);
    if (Object.keys(o).length > 0) {
      this._handleTravelerValidationErrors(o, e.target), this.isSaving = !1;
      return;
    }
    const a = Array.isArray(this.travelers) ? this.travelers.length : 0;
    if (this.showAddTravelerModal && a >= ai) {
      this._showInfo(this.getText("maxTravelersReachedTitle", "Maximale Anzahl erreicht"), this.getText("maxTravelersReached", "Es sind max. 6 Reisende möglich")), this.isSaving = !1, this.closeModals();
      return;
    }
    this.logger.debug("🌐 Persisting traveler via API:", r);
    try {
      if (this.showAddTravelerModal)
        await this._createTravelerOnApi(r), this._showSuccess(
          "Mitreisender hinzugefügt",
          `${r.firstName} ${r.lastName} wurde erfolgreich hinzugefügt.`
        );
      else if (this.showEditTravelerModal) {
        const s = (n = this.currentTraveler) == null ? void 0 : n.id;
        await this._updateTravelerOnApi(s, r), this._showSuccess(
          "Mitreisender aktualisiert",
          `Die Daten von ${r.firstName} ${r.lastName} wurden erfolgreich aktualisiert.`
        );
      }
      await this.loadTravelersFromAPI(!0), this._hasUnsavedTravelerChanges = !1, this._clearTravelerErrors(), this.closeModals(), this.requestUpdate();
    } catch (s) {
      this.logger.error("❌ Failed to persist traveler via API:", s), this._showError(
        "Aktion fehlgeschlagen",
        "Die Änderungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isSaving = !1;
    }
  }
  async confirmDeleteTraveler() {
    var t;
    if (this.currentTravelerIndex < 0 || this.currentTravelerIndex >= this.travelers.length) {
      this.closeModals();
      return;
    }
    this.isSaving = !0;
    const e = `${this.currentTraveler.firstName} ${this.currentTraveler.lastName}`;
    try {
      const i = (t = this.currentTraveler) == null ? void 0 : t.id;
      await this._deleteTravelerOnApi(i), await this.loadTravelersFromAPI(!0), this._showInfo(
        "Mitreisender entfernt",
        `${e} wurde aus der Liste entfernt.`
      ), this._hasUnsavedTravelerChanges = !1, this._clearTravelerErrors();
    } catch (i) {
      this.logger.error("❌ Failed to delete traveler via API:", i), this._showError(
        "Löschen fehlgeschlagen",
        "Der Mitreisende konnte nicht entfernt werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isSaving = !1, this.closeModals();
    }
  }
  renderProfileErrorSummary() {
    const e = Object.entries(this.errors || {});
    return e.length === 0 ? null : u`
      <div class="profile-error-summary" role="alert" aria-live="assertive" aria-atomic="true">
        <p class="profile-error-summary__title">${this.getText("errorSummaryTitle", "Bitte beheben Sie die folgenden Fehler:")}</p>
        <ul>
          ${e.map(([t, i]) => u`
            <li>
              <a href="#" data-field=${t} @click=${this._handleErrorSummaryActivate}>
                ${i}
              </a>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
  render() {
    var i, r;
    let e = this.autoLoadAccountData && !this.profile;
    this.logger.debug("🎨 AccountManager.render:", {
      isLoading: this.isLoading,
      accountLoading: this.accountLoading,
      isInitialLoad: e,
      autoLoad: this.autoLoadAccountData,
      hasProfile: this.profile,
      appStateProfile: (i = this.appState) == null ? void 0 : i.accountProfile,
      appStateLoaded: (r = this.appState) == null ? void 0 : r.accountLoaded
    });
    const t = this.renderAuthOverlay();
    return this.needsAuth || this.showAuthOverlay ? (this.logger.debug("Rendering auth overlay only (session required)"), u`<div class="account-page account-page--auth">${t}</div>`) : this.isLoading || this.accountLoading || e ? u`
        ${t}
        <div class="account-page">
          <div class="account-header">
            <h1 class="account-title page-title">${this.getText("pageTitle")}</h1>
            <p class="account-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>
          </div>

          <!-- Enhanced Loading State with Progress Indicator -->
          <div class="loading-state-enhanced">
            <div class="loading-icon">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
              </svg>
            </div>
            
            <div class="loading-content">
              <h3 class="loading-title">${this.getText("loadingTitle", "Kundendaten werden geladen...")}</h3>
              <p class="loading-message">
                ${this.getText("loadingMessage", "Ihre Daten werden vom Server abgerufen. Dies kann aufgrund der Serverauslastung bis zu einer Minute dauern.")}
              </p>
              
              <div class="loading-progress">
                <div class="loading-progress-bar">
                  <div class="loading-progress-fill"></div>
                </div>
                <p class="loading-hint">
                  ${this.getText("loadingHint", "Bitte haben Sie einen Moment Geduld...")}
                </p>
                ${this._loadingElapsedSeconds > 0 ? u`
                  <p class="loading-elapsed">
                    Laden seit <strong>${this._loadingElapsedSeconds}</strong> Sekunden...
                  </p>
                ` : ""}
              </div>
            </div>
          </div>

          <div class="skeleton-loader">
            <div class="skeleton-card">
              <div class="skeleton-title"></div>
              <div class="form-row ">       
              <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>
  
              <div class="skeleton-title"></div>
              <div class="form-row">
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>
        
              <div class="skeleton-title"></div>
              <div class="form-row">
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>
   
 
            </div>
            <div class="skeleton-card">
              <div class="skeleton-title"></div>
              <div class="form-row">
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>  
            </div>
            <div class="skeleton-card">
              <div class="skeleton-title"></div>
              <div class="form-row">
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>
            </div>
            <div class="skeleton-card">
              <div class="skeleton-title"></div>
              <div class="form-row">
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
                <div class="form-group"><div class="skeleton-text"></div>       <div class="skeleton-text"></div></div>
              </div>
            </div>  

            <div class="skeleton-list">
              <div class="skeleton-list-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                  <div class="skeleton-text title"></div>
                  <div class="skeleton-text subtitle"></div>
                  <div class="skeleton-text medium"></div>
                </div>
              </div>
              <div class="skeleton-list-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                  <div class="skeleton-text title"></div>
                  <div class="skeleton-text subtitle"></div>
                  <div class="skeleton-text medium"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  

        <!--div class="account-page">
          <div class="account-header">
            <h1 class="account-title">${this.getText("pageTitle")}</h1>
            <p class="account-subtitle">${this.getText("pageSubtitle")}</p>
          </div>

          <div class="loading-spinner"></div>
          <div class="loading">${O("loading", "common", "Wird geladen...")}</div>
        </div-->
      ` : u`
      ${t}
      <div class="account-page">
        <div class="account-header">
          <h1 class="account-title page-title">${this.getText("pageTitle")}</h1>
          <p class="account-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>
        </div>

        <!-- ${this.renderAccountOverviewCard()} -->

        <form class="account-form"
              role="form"
              aria-labelledby="account-title"
              novalidate
              @submit=${this.handleProfileSubmit}>
          ${this.renderProfileForm()}

            ${this.renderTravelersSection()}
        </form>

        ${this.renderModals()}
      </div>

      ${this.renderAuthOverlay()}
    `;
  }
  // renderClientNotSupportedOverlay() {
  //   const globalUnsupported = this.appState?.isClientAccount && this.appState?.accountLoaded;
  //   const localUnsupported = !!this.profile?.isClient && this._loadedViaFallback && this._loadedViaFallback !== false;
  //   if (!globalUnsupported && !localUnsupported) return '';
  //   const title = this.getText('clientNotSupportedTitle', 'Liebe Nutzerinnen und Nutzer');
  //   const text = this.getText('clientNotSupportedText', 'Das Kundenkonto der Twerenbold Reisen Gruppe wird aktuell nur für Privatkunden angeboten. Danke für die Kenntnisnahme und Ihr Verständnis. Bei Fragen wenden Sie sich bitte an die jeweilige Reisefirma. Ihre Twerenbold Reisen Gruppe');
  //   return html`
  //     <div class="client-unsupported-overlay" role="alertdialog" aria-modal="true" aria-labelledby="client-unsupported-title" aria-describedby="client-unsupported-desc">
  //       <div class="client-unsupported-card">
  //         <div class="client-unsupported-brand">
  //           <img src="/twr-logo.svg" alt="Twerenbold Reisen Gruppe" width="140" />
  //         </div>
  //         <h2 id="client-unsupported-title">${title}</h2>
  //         <p id="client-unsupported-desc">${text}</p>
  //         <div style="display:flex; gap:0.75rem; justify-content:center; margin-top:1rem;">
  //           <button class="btn btn-primary" @click=${this._onLogout}>Abmelden</button>
  //           <button class="btn btn-secondary" @click=${() => window.open('mailto:support@twerenbold.ch', '_blank')}>Kontakt</button>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }
  /**
   * Logout handler used by the client-not-supported overlay.
   * Prefers the appActions.logout() from context, falls back to any
   * local oauth-login component methods or finally resets apiService auth.
   */
  _onLogout() {
    var e, t, i;
    this.logger.debug("🔐 AccountManager._onLogout invoked - appActions/logout available:", !!((e = this.appActions) != null && e.logout));
    try {
      if ((t = this.appActions) != null && t.logout) {
        this.logger.debug("🔐 AccountManager._onLogout: triggering appActions.logout"), this.appActions.logout();
        try {
          this._showInfo("Abmeldung gestartet", "Sie werden abgemeldet...");
        } catch {
        }
        return;
      }
    } catch (r) {
      this.logger.warn("⚠️ appActions.logout failed or not available", r);
    }
    try {
      const r = this.querySelector("oauth-login") || document.querySelector("oauth-login") || document.querySelector("[data-auth-component]") || document.querySelector("oauth-login-component");
      if (this.logger.debug("🔐 AccountManager._onLogout: oauth-login element found:", !!r), r) {
        if (typeof r._openLogoutModal == "function") {
          this.logger.debug("🔐 AccountManager._onLogout: oauth-login._openLogoutModal()"), r._openLogoutModal();
          try {
            this._showInfo("Abmelden...", "Bitte folgen Sie den Anweisungen im Anmeldefenster.");
          } catch {
          }
          return;
        }
        if (typeof r._confirmAndLogout == "function") {
          this.logger.debug("🔐 AccountManager._onLogout: oauth-login._confirmAndLogout()"), r._confirmAndLogout();
          return;
        }
        if (typeof r._performLogout == "function") {
          this.logger.debug("🔐 AccountManager._onLogout: oauth-login._performLogout()"), r._performLogout();
          return;
        }
        if (typeof r.logout == "function") {
          this.logger.debug("🔐 AccountManager._onLogout: oauth-login.logout()"), r.logout();
          return;
        }
      }
    } catch (r) {
      this.logger.warn("⚠️ Fallback logout via oauth-login failed", r);
    }
    try {
      this.logger.debug("🔐 AccountManager._onLogout: performing final fallback - clearing apiService auth component"), x.setAuthComponent(null);
      try {
        this._showInfo("Abmeldung", "Sie wurden lokal abgemeldet.");
      } catch {
      }
      (i = this.appActions) != null && i.removeNotification && this.appActions.addNotification({ type: "info", title: "Abmeldung", message: "Sie wurden abgemeldet." });
    } catch (r) {
      this.logger.warn("⚠️ Final logout fallback failed", r);
    }
  }
  renderAccountOverviewCard() {
    var h, m, b;
    if (!this.profile) return "";
    const e = this.profile.createdAt ? new Date(this.profile.createdAt) : null, t = e ? this._getAccountAge(e) : null, i = this.profile.lastUpdated ? new Date(this.profile.lastUpdated) : null, r = i ? this._getRelativeTime(i) : null, o = this._calculateProfileCompleteness(), a = Array.isArray(this.travelers) ? this.travelers.length : 0, n = ((h = this.appState) == null ? void 0 : h.accountClubStatus) || null, s = j("clubStatus", this.apiMode, this.theme) && !!n, l = (n == null ? void 0 : n.totalTravelDays) || 0, g = (n == null ? void 0 : n.bonusPoints) || 0, p = (n == null ? void 0 : n.memberId) || this.profile.memberId || null;
    return u`
      <div class="account-overview-card" role="region" aria-label="Account-Übersicht">
        <div class="overview-header">
          <div class="overview-title">
            <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            <span>${this.getText("accountOverviewTitle", "Ihr Account")}</span>
          </div>
          <div class="overview-badge">
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
            <span>${this.getText("accountVerified", "Verifiziert")}</span>
          </div>
        </div>

        <div class="overview-meta">
          ${t ? u`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
              </svg>
              ${this.getText("memberSince", "Registriert seit")} ${t}
            </span>
          ` : ""}
          ${r ? u`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path>
              </svg>
              ${this.getText("lastUpdated", "Zuletzt aktualisiert")} ${r}
            </span>
          ` : ""}
          ${p ? u`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path>
              </svg>
              ${this.getText("memberId", "Mitglieds-ID")}: ${p}
            </span>
          ` : ""}
        </div>

        <div class="overview-stats">
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${l}</div>
            <div class="stat-label">${this.getText("travelDaysLabel", "Reisetage")}</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎫</div>
            <div class="stat-value">${a}</div>
            <div class="stat-label">${this.getText("travelersLabel", "Mitreisende")}</div>
          </div>
          ${s ? u`
            <div class="stat-card stat-highlight" style="--status-color: ${((m = n.currentStatus) == null ? void 0 : m.color) || "#2c5282"}">
              <div class="stat-icon">⭐</div>
              <div class="stat-value">${((b = n.currentStatus) == null ? void 0 : b.name) || "Member"}</div>
              <div class="stat-label">${this.getText("clubStatusLabel", "Club-Status")}</div>
            </div>
          ` : ""}
          ${g > 0 ? u`
            <div class="stat-card">
              <div class="stat-icon">🎁</div>
              <div class="stat-value">${this._formatNumber(g)}</div>
              <div class="stat-label">${this.getText("bonusPointsLabel", "Punkte")}</div>
            </div>
          ` : ""}
        </div>

        <div class="overview-completeness">
          <div class="completeness-header">
            <span class="completeness-label">${this.getText("profileCompletenessLabel", "Profil vollständig")}</span>
            <span class="completeness-value">${o}%</span>
          </div>
          <div class="completeness-bar">
            <div class="completeness-progress" style="width: ${o}%"></div>
          </div>
        </div>
      </div>
    `;
  }
  _getAccountAge(e) {
    const t = /* @__PURE__ */ new Date(), i = t.getFullYear() - e.getFullYear(), r = t.getMonth() - e.getMonth();
    if (i > 0)
      return r < 0 || r === 0 && t.getDate() < e.getDate() ? i === 1 ? "1 Jahr" : `${i - 1} Jahren` : i === 1 ? "1 Jahr" : `${i} Jahren`;
    const o = r + (t.getDate() < e.getDate() ? -1 : 0);
    return o > 0 ? o === 1 ? "1 Monat" : `${o} Monaten` : "weniger als 1 Monat";
  }
  _getRelativeTime(e) {
    const i = /* @__PURE__ */ new Date() - e, r = Math.floor(i / (1e3 * 60 * 60 * 24));
    if (r === 0) return "heute";
    if (r === 1) return "gestern";
    if (r < 7) return `vor ${r} Tagen`;
    if (r < 30) {
      const a = Math.floor(r / 7);
      return a === 1 ? "vor 1 Woche" : `vor ${a} Wochen`;
    }
    if (r < 365) {
      const a = Math.floor(r / 30);
      return a === 1 ? "vor 1 Monat" : `vor ${a} Monaten`;
    }
    const o = Math.floor(r / 365);
    return o === 1 ? "vor 1 Jahr" : `vor ${o} Jahren`;
  }
  _calculateProfileCompleteness() {
    if (!this.profile) return 0;
    const e = [
      "salutation",
      "firstName",
      "lastName",
      "email",
      "address",
      "zip",
      "city",
      "country",
      "phoneMain",
      "dateOfBirth"
    ], t = e.filter((i) => {
      const r = this.profile[i];
      return r && r.toString().trim() !== "";
    });
    return Math.round(t.length / e.length * 100);
  }
  _formatNumber(e) {
    return new Intl.NumberFormat("de-CH").format(e);
  }
  renderProfileForm() {
    let e = !this.profile || Object.keys(this.profile).length === 0;
    const t = (M) => {
      if (e && M !== "email") return "";
      const z = M.split(".");
      let P = this.profile;
      for (const ce of z)
        if (P = P == null ? void 0 : P[ce], P == null) return "";
      return P;
    };
    this.logger.debug("📝 renderProfileForm: Rendering", e ? "(new user - empty form)" : "(existing profile)");
    const i = this.errors || {}, r = (M, z = []) => {
      const P = i[M], ce = P ? `profile-error-${M}` : null, Ue = [...z, ce].filter(Boolean).join(" ") || null;
      return { errorMessage: P, errorId: ce, describedBy: Ue };
    }, o = r("salutation"), a = this.isFieldLocked("firstName") ? "firstName-help" : null, n = r("firstName", [a]), s = r("lastName"), l = r("address"), g = r("zip"), p = r("city"), h = r("country"), m = r("phoneMain"), b = r("phoneMobile"), v = this.isFieldLocked("email") ? "email-help" : null, y = r("email", [v]), I = r("dateOfBirth");
    return !e && !t("firstName") && !t("lastName") && (e = !0), u`
      <section class="form-section" role="group" aria-labelledby="profile-section-title" aria-describedby="profile-section-desc">
        <div class="form-section-header">
          <h2 class="section-title" id="profile-section-title">${this.getText("profileSectionTitle", "Hauptkonto")}</h2>
          <p class="form-section-desc" id="profile-section-desc">${this.getText("profileSectionDescription", "")}</p>
        </div>

        ${e ? u`
          <div class="info-banner" role="status" aria-live="polite" style="margin-bottom: 2rem; padding: 1rem 1.5rem; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
            <div style="display: flex; align-items: start; gap: 1rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0; margin-top: 2px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#2196f3"/>
              </svg>
              <div>
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #1565c0;">
                  ${this.getText("newProfileTitle", "Willkommen bei Twerenbold!")}
                </h3>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #1976d2;">
                  ${this.getText("newProfileMessage", "Wir konnten noch keine Profildaten finden. Bitte hinterlegen Sie Ihre Kontakt- und Adressdaten, damit wir Sie optimal betreuen und Sie über Ihre Reisen informieren können.")}
                </p>
              </div>
            </div>
          </div>
        ` : ""}

        ${this.renderProfileErrorSummary()}

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="salutation">
              ${this.getText("salutation")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <select class="form-select"
                    id="salutation"
                    name="salutation"
                    autocomplete="honorific-prefix"
                    aria-required="true"
                    aria-invalid=${o.errorMessage ? "true" : "false"}
                    aria-describedby=${o.describedBy ? o.describedBy : R}
        ?disabled=${this.isFieldLocked("salutation")}
        @change=${this._handleProfileInput}>
              <option value="">${this.getText("salutationPlaceholder", "Bitte auswählen")}</option>
              ${this._renderDynamicSalutationOption()}
              <option value="mr" ?selected=${t("salutation") === "mr"}>${this.getText("salutationMr")}</option>
              <option value="ms" ?selected=${t("salutation") === "ms"}>${this.getText("salutationMs")}</option>
            </select>
            ${o.errorMessage ? u`<p class="error-text" id=${o.errorId ?? R}>${o.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="firstName">
              ${this.getText("firstName")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="firstName"
                   name="firstName"
                   type="text"
                   autocomplete="given-name"
                   aria-required="true"
                   aria-invalid=${n.errorMessage ? "true" : "false"}
                   aria-describedby=${n.describedBy ? n.describedBy : R}
                   .value=${t("firstName")}
         ?disabled=${this.isFieldLocked("firstName")}
         @input=${this._handleProfileInput} />
            ${this.isFieldLocked("firstName") ? u`<p class="field-help" id="firstName-help">${this.getLockReason("firstName") || this.getText("nameChangeHelp")}</p>` : ""}
            ${n.errorMessage ? u`<p class="error-text" id=${n.errorId ?? R}>${n.errorMessage}</p>` : ""}
          </div>
          <div class="form-group">
            <label class="form-label" for="lastName">
              ${this.getText("lastName")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="lastName"
                   name="lastName"
                   type="text"
                   autocomplete="family-name"
                   aria-required="true"
                   aria-invalid=${s.errorMessage ? "true" : "false"}
                   aria-describedby=${s.describedBy ? s.describedBy : R}
                   .value=${t("lastName")}
         ?disabled=${this.isFieldLocked("lastName")}
         @input=${this._handleProfileInput} />
            ${s.errorMessage ? u`<p class="error-text" id=${s.errorId ?? R}>${s.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label class="form-label" for="address">
              ${this.getText("address")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="address"
                   name="address"
                   type="text"
                   autocomplete="street-address"
                   aria-required="true"
                   aria-invalid=${l.errorMessage ? "true" : "false"}
                   aria-describedby=${l.describedBy ? l.describedBy : R}
                   placeholder=${this.getText("addressPlaceholder")}
         .value=${t("address")}
         @input=${this._handleProfileInput} />
            ${l.errorMessage ? u`<p class="error-text" id=${l.errorId ?? R}>${l.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="zip">
              ${this.getText("zipCode")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="zip"
                   name="zip"
                   type="text"
                   inputmode="numeric"
                   autocomplete="postal-code"
                   aria-required="true"
                   aria-invalid=${g.errorMessage ? "true" : "false"}
                   aria-describedby=${g.describedBy ? g.describedBy : R}
                   placeholder=${this.getText("zipPlaceholder")}
         .value=${t("zip")}
         @input=${this._handleProfileInput} />
            ${g.errorMessage ? u`<p class="error-text" id=${g.errorId ?? R}>${g.errorMessage}</p>` : ""}
          </div>
          <div class="form-group span-2">
            <label class="form-label" for="city">
              ${this.getText("city")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="city"
                   name="city"
                   type="text"
                   autocomplete="address-level2"
                   aria-required="true"
                   aria-invalid=${p.errorMessage ? "true" : "false"}
                   aria-describedby=${p.describedBy ? p.describedBy : R}
                   placeholder=${this.getText("cityPlaceholder")}
         .value=${t("city")}
         @input=${this._handleProfileInput} />
            ${p.errorMessage ? u`<p class="error-text" id=${p.errorId ?? R}>${p.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="country">
              ${this.getText("country")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <select class="form-select"
                    id="country"
                    name="country"
                    autocomplete="country"
                    aria-required="true"
                    aria-invalid=${h.errorMessage ? "true" : "false"}
                    aria-describedby=${h.describedBy ? h.describedBy : R}
                    @change=${this._handleProfileInput}>
              <option value="">${this.getText("countryPlaceholder", "Bitte auswählen")}</option>
              <optgroup label="${this.getText("priorityCountries", "Häufig verwendet")}">
                ${nr.map((M) => u`
                  <option value="${M.code}" ?selected=${t("country") === M.code}>
                    ${M.name}
                  </option>
                `)}
              </optgroup>
              <optgroup label="${this.getText("otherCountries", "Weitere Länder")}">
                ${Object.entries(ar).filter(([M]) => !nr.some((z) => z.code === M)).sort((M, z) => M[1].localeCompare(z[1])).map(([M, z]) => u`
                    <option value="${M}" ?selected=${t("country") === M}>
                      ${z}
                    </option>
                  `)}
              </optgroup>
            </select>
            ${h.errorMessage ? u`<p class="error-text" id=${h.errorId ?? R}>${h.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="phoneMain">${this.getText("phoneMain")}</label>
            <input class="form-input"
                   id="phoneMain"
                   name="phoneMain"
                   type="tel"
                   inputmode="tel"
                   autocomplete="tel"
                   aria-invalid=${m.errorMessage ? "true" : "false"}
                   aria-describedby=${m.describedBy ? m.describedBy : R}
         .value=${t("phoneMain")}
         @input=${this._handleProfileInput} />
            ${m.errorMessage ? u`<p class="error-text" id=${m.errorId ?? R}>${m.errorMessage}</p>` : ""}
          </div>
          <div class="form-group">
            <label class="form-label" for="phoneMobile">${this.getText("phoneMobile")}</label>
            <input class="form-input"
                   id="phoneMobile"
                   name="phoneMobile"
                   type="tel"
                   inputmode="tel"
                   autocomplete="tel-national"
                   aria-invalid=${b.errorMessage ? "true" : "false"}
                   aria-describedby=${b.describedBy ? b.describedBy : R}
         .value=${t("phoneMobile")}
         @input=${this._handleProfileInput} />
            ${b.errorMessage ? u`<p class="error-text" id=${b.errorId ?? R}>${b.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="email">
              ${this.getText("email")}
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
            </label>
            <input class="form-input"
                   id="email"
                   name="email"
                   type="email"
                   inputmode="email"
                   autocomplete="email"
                   aria-required="true"
                   aria-invalid=${y.errorMessage ? "true" : "false"}
                   aria-describedby=${y.describedBy ? y.describedBy : R}
                   .value=${t("email")}
         ?disabled=${this.isFieldLocked("email")}
         @input=${this._handleProfileInput} />
            ${this.isFieldLocked("email") ? u`<p class="field-help" id="email-help">${this.getLockReason("email") || this.getText("emailChangeHelp")}</p>` : ""}
            ${y.errorMessage ? u`<p class="error-text" id=${y.errorId ?? R}>${y.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="dateOfBirth">${this.getText("dateOfBirth")}</label>
            <input class="form-input"
                   id="dateOfBirth"
                   name="dateOfBirth"
                   type="text"
                   inputmode="decimal"
                   autocomplete="bday"
                   placeholder=""
                   .value=${this._formatDateToGerman(t("dateOfBirth"))}
                   aria-invalid=${I.errorMessage ? "true" : "false"}
                   aria-describedby=${I.describedBy ? I.describedBy : R}

         ?disabled=${this.isFieldLocked("dateOfBirth")}
         @change=${this._handleProfileInput} />
            ${this.isFieldLocked("dateOfBirth") ? u`<p class="field-help" id="dateOfBirth-help">${this.getLockReason("dateOfBirth") || this.getText("dateOfBirthChangeHelp", "Das Geburtsdatum kann nicht geändert werden.")}</p>` : ""}
            ${I.errorMessage ? u`<p class="error-text" id=${I.errorId ?? R}>${I.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-actions">
          ${this._hasUnsavedProfileChanges ? u`
            <p class="unsaved-changes-hint" role="status" aria-live="polite">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 0.5rem;">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"></path>
              </svg>
              ${this.getText("unsavedChanges", "Sie haben ungespeicherte Änderungen")}
            </p>
          ` : ""}
          <button type="submit"
                  class="btn btn-primary"
                  aria-busy=${this.isSaving ? "true" : "false"}
                  ?disabled=${this.isSaving || !this._hasUnsavedProfileChanges}>
            ${this.isSaving ? u`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : this.getText("btnSave", "Speichern")}
          </button>
        </div>
      </section>
    `;
  }
  renderTravelersSection() {
    const t = (Array.isArray(this.travelers) ? this.travelers.length : 0) < ai;
    return u`
      <div class="travelers-section form-section" role="group" aria-labelledby="travelers-section-title" aria-describedby="travelers-section-desc">
        <h2 class="section-title">${this.getText("travelersTitle")}</h2>
        <p class="section-subtitle">${this.getText("travelersSubtitle")}</p>


        <div class="travelers-list">
          ${this.travelers.map((i, r) => this.renderTravelerItem(i, r))}
        </div>

        ${t ? u`
          <button type="button" class="btn btn-secondary" @click=${this.handleAddTraveler}>
            ${this.getText("btnAddTraveler")}
          </button>
        ` : u`
          <div role="status" aria-live="polite" class="field-help">
            ${this.getText("maxTravelersReached", "Es sind max. 6 Reisende möglich")}
          </div>
        `}
      </div>
    `;
  }
  renderTravelerItem(e, t) {
    var s;
    const i = ((s = e.salutation) == null ? void 0 : s.toLowerCase()) || "", r = i === "mr" || i === "herr" ? this.getText("salutationMr", "Herr") : i === "ms" || i === "frau" ? this.getText("salutationMs", "Frau") : e.salutation || "", o = this._formatDateToGerman(e.dateOfBirth), a = e.isLocked === !0, n = a && e.lockReason ? e.lockReason : a ? this.getText("travelerLockedDefaultReason", `Es besteht eine bevorstehende Buchung,
bitte wenden Sie sich für Anpassungen der Mitreisenden an den Kundenservice`) : null;
    return u`
      <div class="traveler-item ${a ? "traveler-locked" : ""}">
        ${a ? u`<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style="vertical-align: middle; margin-right: 0.5rem;" xmlns="http://www.w3.org/2000/svg">
          <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
        </svg>` : ""}
        <div class="traveler-info">
          <h4>

            ${r ? `${r} ` : ""}${e.firstName} ${e.lastName}
          </h4>
          <p>${this.getText("dateOfBirth")}: ${o}</p>
        </div>
        <div class="traveler-actions">
          ${a ? u`<p class="field-help traveler-lock-reason" role="alert">${n}</p>` : ""}
          ${a ? "" : u`

          <button type="button" @click=${() => this.handleEditTraveler(e, t)} class="btn btn-tertiary" ?disabled=${a} aria-label=${this.getText("btnEditTravelerLabel", "Mitreisenden bearbeiten")}>
            <svg fill="currentColor" height="16" viewBox="0 0 256 256" width="16" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96A16,16,0,0,0,227.31,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
            <span >${this.getText("btnEdit")}</span>
          </button>
          <button type="button" @click=${() => this.handleDeleteTraveler(e, t)} class="btn btn-secondary btn-danger" ?disabled=${a} aria-label=${this.getText("btnDeleteTravelerLabel", "Mitreisenden entfernen")}>
            <svg fill="currentColor" height="16" viewBox="0 0 256 256" width="16" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
            <span class="sr-only">${this.getText("btnDelete", "Entfernen")}</span>
          </button>
          `}
        </div>
      </div>
    `;
  }
  renderModals() {
    var e, t, i, r, o, a, n, s, l, g;
    return u`
      ${this.showAddTravelerModal ? u`
        <dialog id="add-traveler-dialog" class="modal" aria-labelledby="add-traveler-title" @cancel=${(p) => {
      p.preventDefault(), this.closeModals();
    }} @click=${(p) => {
      p.target.tagName === "DIALOG" && this.closeModals();
    }}>
            <h3 id="add-traveler-title">${this.getText("btnAddTraveler", "Mitreisenden hinzufügen")}</h3>
            <div class="travelers-note" role="note" aria-live="polite">
              <p><strong>${this.getText("travelersNoteTitle", "Hinweis:")}</strong> ${this.getText("travelersNoteText", "Bitte beachten Sie, dass die Namen der Reisenden laut Personalausweis/Reisepass angegeben werden müssen. Die korrekte Schreibweise ist sehr wichtig.")}</p>
            </div>
            <form @submit=${this.handleTravelerSubmit} novalidate>
              <label class="form-label" for="add-traveler-salutation">
                ${this.getText("salutation", "Anrede")}
              </label>
              <select
                id="add-traveler-salutation"
                class="form-select"
                name="salutation"
                .value=${((e = this.currentTraveler) == null ? void 0 : e.salutation) || ""}
                @input=${this._handleTravelerInput}
              >
                <option value="">${this.getText("salutationPlaceholder", "Bitte wählen")}</option>
                <option value="mr">${this.getText("salutationMr", "Herr")}</option>
                <option value="ms">${this.getText("salutationMs", "Frau")}</option>
              </select>

              <label class="form-label" for="add-traveler-firstName">
                ${this.getText("firstName")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="add-traveler-firstName"
                class="form-input"
                name="firstName"
                .value=${((t = this.currentTraveler) == null ? void 0 : t.firstName) || ""}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.firstName ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.firstName ? "add-traveler-firstName-error" : R}
                placeholder=${this.getText("firstNamePlaceholder", "Vorname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.firstName ? u`<p class="error-text" id="add-traveler-firstName-error">${this.travelerFormErrors.firstName}</p>` : ""}

              <label class="form-label" for="add-traveler-lastName">
                ${this.getText("lastName")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="add-traveler-lastName"
                class="form-input"
                name="lastName"
                .value=${((i = this.currentTraveler) == null ? void 0 : i.lastName) || ""}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.lastName ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.lastName ? "add-traveler-lastName-error" : R}
                placeholder=${this.getText("lastNamePlaceholder", "Nachname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.lastName ? u`<p class="error-text" id="add-traveler-lastName-error">${this.travelerFormErrors.lastName}</p>` : ""}

              <label class="form-label" for="add-traveler-dateOfBirth">
                ${this.getText("dateOfBirth")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="add-traveler-dateOfBirth"
                class="form-input"
                name="dateOfBirth"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                placeholder=""
                .value=${this._formatDateToGerman((r = this.currentTraveler) == null ? void 0 : r.dateOfBirth)}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.dateOfBirth ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.dateOfBirth ? "add-traveler-dateOfBirth-error" : R}
                @change=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.dateOfBirth ? u`<p class="error-text" id="add-traveler-dateOfBirth-error">${this.travelerFormErrors.dateOfBirth}</p>` : ""}

              <div class="modal-actions">
                <button type="submit" class="btn btn-primary" ?disabled=${this.isSaving}>
                  ${this.isSaving ? u`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : O("save", "common", "Speichern")}
                </button>
                <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
              </div>
            </form>
        </dialog>
      ` : ""}

      ${this.showEditTravelerModal ? u`
        <dialog id="edit-traveler-dialog" class="modal" aria-labelledby="edit-traveler-title" @cancel=${(p) => {
      p.preventDefault(), this.closeModals();
    }} @click=${(p) => {
      p.target.tagName === "DIALOG" && this.closeModals();
    }}>
            <h3 id="edit-traveler-title">${this.getText("modalEditTraveler", "Mitreisenden bearbeiten")}</h3>
            <div class="travelers-note" role="note" aria-live="polite">
              <p><strong>${this.getText("travelersNoteTitle", "Hinweis:")}</strong> ${this.getText("travelersNoteText", "Bitte beachten Sie, dass die Namen der Reisenden laut Personalausweis/Reisepass angegeben werden müssen. Die korrekte Schreibweise ist sehr wichtig.")}</p>
            </div>
            <form @submit=${this.handleTravelerSubmit} novalidate>
              <label class="form-label" for="edit-traveler-salutation">
                ${this.getText("salutation", "Anrede")}
              </label>
              <select
                id="edit-traveler-salutation"
                class="form-select"
                name="salutation"
                .value=${((o = this.currentTraveler) == null ? void 0 : o.salutation) || ""}
                @input=${this._handleTravelerInput}
              >
                <option value="">${this.getText("salutationPlaceholder", "Bitte wählen")}</option>
                <option value="mr">${this.getText("salutationMr", "Herr")}</option>
                <option value="ms">${this.getText("salutationMs", "Frau")}</option>
              </select>

              <label class="form-label" for="edit-traveler-firstName">
                ${this.getText("firstName")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="edit-traveler-firstName"
                class="form-input"
                name="firstName"
                .value=${((a = this.currentTraveler) == null ? void 0 : a.firstName) || ""}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.firstName ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.firstName ? "edit-traveler-firstName-error" : R}
                placeholder=${this.getText("firstNamePlaceholder", "Vorname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.firstName ? u`<p class="error-text" id="edit-traveler-firstName-error">${this.travelerFormErrors.firstName}</p>` : ""}

              <label class="form-label" for="edit-traveler-lastName">
                ${this.getText("lastName")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="edit-traveler-lastName"
                class="form-input"
                name="lastName"
                .value=${((n = this.currentTraveler) == null ? void 0 : n.lastName) || ""}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.lastName ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.lastName ? "edit-traveler-lastName-error" : R}
                placeholder=${this.getText("lastNamePlaceholder", "Nachname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.lastName ? u`<p class="error-text" id="edit-traveler-lastName-error">${this.travelerFormErrors.lastName}</p>` : ""}

              <label class="form-label" for="edit-traveler-dateOfBirth">
                ${this.getText("dateOfBirth")}
                <span class="required-indicator" aria-hidden="true">*</span>
                <span class="sr-only">${this.getText("requiredFieldSrOnly", "Pflichtfeld")}</span>
              </label>
              <input
                id="edit-traveler-dateOfBirth"
                class="form-input"
                name="dateOfBirth"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                placeholder=""
                .value=${this._formatDateToGerman((s = this.currentTraveler) == null ? void 0 : s.dateOfBirth)}
                aria-required="true"
                aria-invalid=${this.travelerFormErrors.dateOfBirth ? "true" : "false"}
                aria-describedby=${this.travelerFormErrors.dateOfBirth ? "edit-traveler-dateOfBirth-error" : R}
                @change=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.dateOfBirth ? u`<p class="error-text" id="edit-traveler-dateOfBirth-error">${this.travelerFormErrors.dateOfBirth}</p>` : ""}

              <div class="modal-actions">
                <button type="submit" class="btn btn-primary" ?disabled=${this.isSaving}>
                  ${this.isSaving ? u`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : O("save", "common", "Speichern")}
                </button>
                <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
              </div>
            </form>
        </dialog>
      ` : ""}

      ${this.showDeleteTravelerModal ? u`
        <dialog id="delete-traveler-dialog" class="modal" aria-labelledby="delete-traveler-title" @cancel=${(p) => {
      p.preventDefault(), this.closeModals();
    }} @click=${(p) => {
      p.target.tagName === "DIALOG" && this.closeModals();
    }}>
            <h3 id="delete-traveler-title">${this.getText("modalDeleteTraveler", "Mitreisenden löschen")}</h3>
            <p>${this.getText("modalDeleteTravelerConfirm", "Möchten Sie diesen Mitreisenden wirklich entfernen?")}</p>
            <p class="modal-traveler-name">${(l = this.currentTraveler) == null ? void 0 : l.firstName} ${(g = this.currentTraveler) == null ? void 0 : g.lastName}</p>
            <div class="modal-actions">
              <button type="button" class="btn btn-danger" @click=${this.confirmDeleteTraveler} ?disabled=${this.isSaving}>
                ${this.isSaving ? u`${this._renderButtonSpinner()}${O("deleting", "common", "Wird gelöscht...")}` : O("delete", "common", "Löschen")}
              </button>
              <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
            </div>
        </dialog>
      ` : ""}
    `;
  }
};
N(st, "properties", {
  profile: { type: Object },
  travelers: { type: Array },
  isLoading: { type: Boolean },
  isSaving: { type: Boolean },
  errors: { type: Object },
  showAddTravelerModal: { type: Boolean },
  showEditTravelerModal: { type: Boolean },
  showDeleteTravelerModal: { type: Boolean },
  currentTraveler: { type: Object },
  currentTravelerIndex: { type: Number },
  languageConfig: { type: Object },
  // Global state properties
  appState: { type: Object, attribute: !1 },
  // Ensure appState is tracked
  accountProfile: { type: Object },
  accountTravelers: { type: Array },
  accountClubStatus: { type: Object },
  accountLoaded: { type: Boolean },
  accountLoading: { type: Boolean },
  salutationMeta: { type: Object },
  apiMode: { type: String },
  travelerFormErrors: { type: Object },
  autoLoadAccountData: {
    type: Boolean,
    attribute: "auto-load-account-data",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e !== null && e !== "false" && e !== "0" && e !== "off",
      toAttribute: (e) => e ? "" : null
    }
  },
  _swissPostalCodes: { type: Object, state: !0 }
}), N(st, "styles", [
  at(st, st, "styles"),
  ie`
    :host {
      display: block;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      color: var(--text-color, #111827);
      max-width: var(--container-width, 1200px);
      margin: 0 auto;
      padding: var(--component-padding, 2rem);
    }

    .account-page {
      margin: 0 auto;
    }

    /* Session required: the overlay is the sole content (see render()). */
    .account-page--auth {
      position: relative;
    }
    .account-page--auth .auth-overlay {
      position: relative;
      background: transparent;
      backdrop-filter: none;
    }

    .account-header {
      margin-bottom: 2rem;
    }



    .form-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: clamp(1.5rem, 2vw, 2.5rem);
      border-radius: var(--border-radius-xl, 20px);
      background: var(--surface-primary, rgba(255, 255, 255, 0.95));
      box-shadow: 0 24px 48px -24px rgba(15, 23, 42, 0.18);
      border: 1px solid rgba(148, 163, 184, 0.25);
      backdrop-filter: blur(14px);
    }

    .form-section-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-section-title {
      font-size: clamp(1.5rem, 2.5vw, 1.85rem);
      font-weight: 700;
      color: var(--text-color, #0f172a);
      margin: 0;
      letter-spacing: -0.015em;
    }

    .form-section-desc {
      margin: 0;
      color: var(--text-secondary, #64748b);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.75rem);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      grid-column: span 6;
      position: relative;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group.span-2 {
      grid-column: span 6;
    }

    .form-label {
      font-weight: 600;
      color: var(--text-color, #0f172a);
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .form-label .required-indicator {
      color: var(--color-error, #dc2626);
      font-weight: 700;
      font-size: 0.85rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      appearance: none;
      border-radius: var(--border-radius-lg, 14px);
      border: 1px solid rgba(148, 163, 184, 0.55);
      background: var(--surface-elevated, rgba(255, 255, 255, 0.9));
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      color: var(--text-color, #0f172a);
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    }

    .form-input:hover,
    .form-select:hover,
    .form-textarea:hover {
      border-color: rgba(15, 118, 110, 0.6);
    }

    .form-input:focus-visible,
    .form-select:focus-visible,
    .form-textarea:focus-visible {
      outline: none;
      border-color: var(--primary-color, #0f766e);
      box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.22);
      transform: translateY(-1px);
    }

    .form-input[disabled],
    .form-select[disabled] {
      background: rgba(226, 232, 240, 0.6);
      color: rgba(100, 116, 139, 0.9);
      cursor: not-allowed;
    }

    .form-input[aria-invalid="true"],
    .form-select[aria-invalid="true"] {
      border-color: rgba(220, 38, 38, 0.65);
      box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.25);
    }

    .field-help,
    .form-hint {
      margin: 0;
      font-size: 0.8rem;
      color: var(--text-muted, #64748b);
      line-height: 1.45;
    }

    .error-text {
      margin: 0;
      font-size: 0.82rem;
      color: var(--color-error, #dc2626);
      font-weight: 500;
    }

    .profile-error-summary {
      border-radius: var(--border-radius-lg, 16px);
      border: 1px solid rgba(248, 113, 113, 0.4);
      background: rgba(254, 226, 226, 0.75);
      padding: clamp(1rem, 1.75vw, 1.5rem);
      display: grid;
      gap: 0.75rem;
      color: #991b1b;
    }

    .profile-error-summary__title {
      font-weight: 700;
      margin: 0;
    }

    .profile-error-summary ul {
      margin: 0;
      padding-left: 1.25rem;
      display: grid;
      gap: 0.25rem;
    }

    .profile-error-summary a {
      color: inherit;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
     
    }

    .loading-spinner {
      vertical-align: middle;
      margin: 0 auto;
      
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.75rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color, rgba(148, 163, 184, 0.25));
      margin-top: 0.5rem;
    }

    .unsaved-changes-hint {
      display: flex;
      align-items: center;
      color: var(--color-warning, #d97706);
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
      animation: fadeInSlide 0.3s ease-out;
    }

    @keyframes fadeInSlide {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    // .form-actions .btn {
    //   min-width: 200px;
    //   min-height: 3rem;
    //   border-radius: 999px;
    //   font-weight: 600;
    //   letter-spacing: 0.02em;
    // }

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

    .success-message {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      margin-bottom: 2rem;
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      border-radius: var(--border-radius, 8px);
      color: #166534;
    }

    .success-icon {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
      color: #16a34a;
    }

    .success-title {
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .success-text {
      margin: 0;
      font-size: 0.875rem;
    }

    .error-message {
      padding: 1rem;
      margin-bottom: 2rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: var(--border-radius, 8px);
      color: #dc2626;
    }

    .account-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .account-overview-card {
      background: linear-gradient(135deg, rgba(15, 118, 110, 0.03) 0%, rgba(15, 118, 110, 0.08) 100%);
      border: 1px solid rgba(15, 118, 110, 0.15);
      border-radius: var(--border-radius-xl, 20px);
      padding: clamp(1.5rem, 3vw, 2rem);
      margin-bottom: 2rem;
      box-shadow: 0 4px 16px rgba(15, 118, 110, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .account-overview-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.12);
    }

    .overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(15, 118, 110, 0.15);
              display: none;

    }

    .overview-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-color, #0f172a);
    }

    .overview-title svg {
      color: var(--primary-color, #0f766e);
      flex-shrink: 0;
    }

    .overview-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 999px;
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(6, 95, 70, 0.9);
              display: none;

    }

    .overview-badge svg {
      color: rgba(16, 185, 129, 1);
      flex-shrink: 0;
    }

    .overview-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-secondary, #64748b);
      font-size: 0.875rem;
      justify-content:  space-between;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .meta-item svg {
      flex-shrink: 0;
      opacity: 0.7;
    }

    .overview-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
              display: none;

    }

    .stat-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: var(--border-radius-lg, 14px);
      padding: 1.25rem 1rem;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      background: rgba(255, 255, 255, 0.9);
    }

    .stat-card.stat-highlight {
      background: linear-gradient(135deg, rgba(var(--status-color, 44, 82, 130), 0.08) 0%, rgba(var(--status-color, 44, 82, 130), 0.15) 100%);
      border-color: rgba(var(--status-color, 44, 82, 130), 0.3);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      filter: grayscale(0.2);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color, #0f172a);
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }

    .stat-highlight .stat-value {
      font-size: 1rem;
      font-weight: 600;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--text-secondary, #64748b);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .overview-completeness {
      padding-top: 1rem;
      border-top: 1px solid rgba(15, 118, 110, 0.15);
    }

    .completeness-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .completeness-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-color, #0f172a);
    }

    .completeness-value {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--primary-color, #0f766e);
    }

    .completeness-bar {
      height: 8px;
      background: rgba(226, 232, 240, 0.6);
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }

    .completeness-progress {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color, #0f766e) 0%, rgba(16, 185, 129, 0.9) 100%);
      border-radius: 999px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    .travelers-section {
      border-top: 1px solid var(--border-color, #e5e7eb);
      padding-top: 2rem;
      margin-top: 2rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color, #111827);
      margin: 0 0 0.5rem 0;
    }

    .section-subtitle {
      color: var(--text-secondary, #6b7280);
      margin: 0 0 1.5rem 0;
    }

    .travelers-note {
      background: linear-gradient(90deg, rgba(255,243,228,0.6) 0%, rgba(255,255,255,0.6) 100%);
      border-left: 4px solid var(--color-warning, #f59e0b);
      padding: 0rem 1rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      color: var(--text-secondary, #6b7280);
      font-size: 0.95rem;
    }

    .travelers-note strong {
      margin-bottom: 0.5rem;
      color: var(--text-color, #0f172a);
    }

    .travelers-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .traveler-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      background: var(--bg-color, #ffffff);
      transition: background-color 0.2s ease, opacity 0.2s ease;
      gap: 10px;
      flex-wrap: wrap;
      align-content: center;
    }

    .traveler-item.traveler-locked {
      background: rgba(241, 245, 249, 0.6);
      border-color: rgba(203, 213, 225, 0.8);
      opacity: 0.85;
    }

    .traveler-info h4 {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .traveler-info p {
      margin: 0;
      color: var(--text-secondary, #6b7280);
      font-size: 0.875rem;
    }

    .traveler-info .traveler-lock-reason {
      margin-top: 0.5rem;
      /* padding: 0.5rem 0.75rem;
      background: rgba(59, 130, 246, 0.08);
      border-left: 3px solid rgba(59, 130, 246, 0.5);
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: rgba(30, 58, 138, 0.9);
      line-height: 1.5; */
    }

    .traveler-actions {
      display: flex;
      gap: 0.5rem;
      max-width: 300px;
      margin-left: auto;
      margin-right: 0;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary, #6b7280);
    }

    /* Modal styles – native <dialog> */
    dialog.modal {
      border: none;
      padding: 0;
      background: transparent;
    }

    dialog.modal[open] {
      background: var(--bg-color, #ffffff);
      border-radius: var(--border-radius, 16px);
      padding: clamp(1.5rem, 2vw, 2.25rem);
      max-width: 520px;
      width: min(90vw, 520px);
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
      display: grid;
      gap: 1.5rem;
      overscroll-behavior: contain;
      animation: modal-fade-in 0.2s ease-out;
    }

    dialog.modal::backdrop {
      background:  rgba(255,255,255, 0.5);
      backdrop-filter: blur(4px);
    }

    @keyframes modal-fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .modal h3 {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .modal form {
      display: grid;
      gap: 1rem;
    }

    .modal .form-label {
      font-weight: 600;
      color: var(--text-color, #0f172a);
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-bottom: -1rem;
    }

    .modal input {
      padding: 0.85rem 1rem;
      border: 1px solid var(--border-color, #d1d5db);
      border-radius: var(--border-radius-lg, 12px);
      font-size: 0.95rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .modal input:focus-visible {
      outline: none;
      border-color: var(--primary-color, #0f766e);
      box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.25);
    }

    .modal input[aria-invalid="true"] {
      border-color: rgba(220, 38, 38, 0.65);
      box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.25);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .modal-actions .btn {
      min-width: 140px;
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    // .btn-primary {
    //   background: var(--primary-color, #009553);
    //   color: white;
    //   border: none;
    // }

    // .btn-secondary {
    //   background: var(--bg-color, #ffffff);
    //   border: 1px solid var(--border-color, #d1d5db);
    //   color: var(--text-color, #0f172a);
    // }

    // .btn-danger {
    //   color: #ffffff;
    //   border: none;
    // }

    .modal-traveler-name {
      font-weight: 600;
      color: var(--text-color, #0f172a);
      margin: 0;
    }

    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    /* Enhanced Loading State */
    .loading-state-enhanced {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      margin: 2rem 0;
      background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
      border: 2px dashed var(--color-border, #e5e7eb);
      border-radius: 1rem;
      gap: 1.5rem;
    }

    .loading-icon {
      width: 60px;
      height: 60px;
          display: none;
    }

    .spinner {
      animation: rotate 2s linear infinite;
      width: 100%;
      height: 100%;
  
    }

    .spinner-path {
      stroke: var(--primary-color, #10b981);
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }

    .button-spinner {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.5rem;
      animation: rotate 1s linear infinite;
    }

    .button-spinner .spinner-path {
      stroke: currentColor;
    }

    .loading-content {
      text-align: center;
      max-width: 500px;
    }

    .loading-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text, #1f2937);
      margin: 0 0 0.5rem 0;
    }

    .loading-message {
      font-size: 0.95rem;
      color: var(--color-text-secondary, #6b7280);
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
    }

    .loading-progress {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .loading-progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 0.75rem;
      position: relative;
    }

    .loading-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, 
        var(--primary-color, #10b981) 0%, 
        var(--primary-color-light, #34d399) 50%,
        var(--primary-color, #10b981) 100%);
      border-radius: 999px;
      animation: loading-progress 2.5s ease-in-out infinite;
      width: 70%;
    }

    @keyframes loading-progress {
      0% {
        transform: translateX(-100%);
        width: 30%;
      }
      50% {
        transform: translateX(0);
        width: 70%;
      }
      100% {
        transform: translateX(400%);
        width: 30%;
      }
    }

    .loading-hint {
      font-size: 0.875rem;
      color: var(--color-text-muted, #9ca3af);
      margin: 0;
      font-style: italic;
    }

    .loading-elapsed {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
      margin: 0.75rem 0 0 0;
      padding-top: 0.75rem;
      border-top: 1px solid #e5e7eb;
    }

    .loading-elapsed strong {
      color: var(--primary-color, #10b981);
      font-weight: 600;
      font-size: 1rem;
    }

/*
    .skeleton-loader {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .skeleton-header {
      height: 2rem;
      background: #e5e7eb;
      border-radius: 0.5rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .skeleton-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skeleton-card .skeleton-title {
      height: 1.5rem;
      background: #e5e7eb;
      border-radius: 0.375rem;
      animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      width: 60%;
    }

    .skeleton-card .skeleton-text {
      height: 1rem;
      background: #e5e7eb;
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
      border-radius: 0.5rem;
    }

    .skeleton-list-item .skeleton-avatar {
      width: 3rem;
      height: 3rem;
      background: #e5e7eb;
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
      */

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        padding: 1rem;
      }

      .account-page {
        max-width: 100%;
      }

      .account-overview-card {
        padding: 1.25rem;
      }

      .overview-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .overview-badge {
        align-self: flex-start;
      }

      .overview-meta {
        flex-direction: column;
        gap: 0.75rem;
      }

      .overview-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
     
      }

      .stat-card {
        padding: 1rem 0.75rem;
      }

      .stat-icon {
        font-size: 1.5rem;
      }

      .stat-value {
        font-size: 1.25rem;
      }

      .form-section {
        padding: 1.5rem;
        gap: 1.5rem;
      }

      .form-row {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 1rem;
      }

      .form-group,
      .form-group.full-width,
      .form-group.span-2 {
        grid-column: 1 / -1;
      }

      .success-message,
      .error-message {
        flex-direction: column;
        text-align: center;
      }

      .traveler-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .traveler-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `
]);
let bi = st;
customElements.get("account-manager") || customElements.define("account-manager", bi);
const Do = ie`
  /* ===============================================================================
     TRIP CARD STYLES - Gemeinsame Card-Layouts
     =============================================================================== */

  .trip-card,
  .current-trip-card {
    background: var(--card-background, var(--background-color, #ffffff));
    border: 1px solid var(--card-border-color, var(--border-color, #e5e7eb));
    border-radius: var(--card-border-radius, var(--border-radius, 8px));
    overflow: hidden;
    transition: all 0.2s ease;
    box-shadow: var(--card-shadow, var(--shadow, 0 1px 3px 0 rgb(0 0 0 / 0.1)));
  }

  .trip-card:hover,
  .current-trip-card:hover {
    box-shadow: var(--card-hover-shadow, var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1)));
    transform: translateY(-2px);
  }

  /* ===============================================================================
     TRIP IMAGE SECTION
     =============================================================================== */

  .trip-image-section,
  .current-trip-image-section {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    max-width:100px;
    max-height:85px;
    background: var(--image-placeholder-bg, #f3f4f6);
  }

  .current-trip-image-section:has(.current-trip-image-placeholder) {
      display: none !important;
    }

  .trip-image,
  .current-trip-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .trip-card:hover .trip-image,
  .current-trip-card:hover .current-trip-image {
    transform: scale(1.05);
  }

  .trip-image-placeholder,
  .current-trip-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary, #6b7280);
    font-size: 3rem;
  }

  /* ===============================================================================
     TRIP CONTENT SECTION
     =============================================================================== */

  .trip-content,
  .current-trip-content {
    padding: 1.5rem;
  }

  .trip-main,
  .current-trip-main {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .trip-details,
  .current-trip-details {
    flex: 1;
    min-width: 0;
  }

  /* ===============================================================================
     TRIP HEADER - Title, Provider, Destination
     =============================================================================== */

  .trip-header,
  .current-trip-header {
    margin-bottom: 1rem;
  }

  .trip-provider,
  .current-trip-provider {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .trip-title,
  .current-trip-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color, #111827);
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .trip-destination,
  .current-trip-destination {
    font-size: 1rem;
    color: var(--text-secondary, #6b7280);
    margin: 0;
    line-height: 1.5;
  }

  /* ===============================================================================
     TRIP INFO GRID - Date, Duration, Price
     =============================================================================== */

  .trip-info-grid,
  .current-trip-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    /* padding: 1rem; */
    //background: var(--background-secondary, #f9fafb);
    border-radius: var(--border-radius, 8px);
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    /* text-transform: uppercase;
    letter-spacing: 0.05em; */
    margin: 0;
  }

  .info-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-color, #111827);
    margin: 0;
  }

  /* ===============================================================================
     TRIP ACTIONS - Buttons
     =============================================================================== */

  .trip-actions,
  .current-trip-actions {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
    background: var(--background-secondary, #f9fafb);
  }

  /* ===============================================================================
     TRIP STATUS BADGES
     =============================================================================== */

  .trip-status,
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-confirmed {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success-color, #10b981);
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning-color, #f59e0b);
  }

  .status-cancelled {
    background: rgba(239, 68, 68, 0.1);
    color: var(--error-color, #ef4444);
  }

  .status-completed {
    background: rgba(107, 114, 128, 0.1);
    color: var(--text-secondary, #6b7280);
  }

  /* ===============================================================================
     TRIP LIST LAYOUT
     =============================================================================== */

  .trips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .trips-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  /* ===============================================================================
     EMPTY STATE
     =============================================================================== */

  .empty-state {
    text-align: center;
    padding: 3rem 1.5rem;
    color: var(--text-secondary, #6b7280);
    font-size: 1rem;
  }

  .empty-state-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  /* ===============================================================================
     SKELETON LOADING
     =============================================================================== */

  .skeleton-card {
    background: var(--background-color, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--border-radius, 8px);
    overflow: hidden;
  }

  .skeleton-content {
    padding: 1.5rem;
  }

  .skeleton-main {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .skeleton-image {
    width: 120px;
    height: 120px;
    border-radius: var(--border-radius, 8px);
  }

  .skeleton-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      #f3f4f6 0%,
      #e5e7eb 50%,
      #f3f4f6 100%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 4px;
  }

  .skeleton-text {
    height: 1rem;
  }

  .skeleton-text.large {
    height: 1.5rem;
    width: 80%;
  }

  .skeleton-text.small {
    height: 0.75rem;
    width: 60%;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  .skeleton-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    padding: 1rem;
    background: var(--background-secondary, #f9fafb);
    border-radius: var(--border-radius, 8px);
  }

  /* ===============================================================================
     TABS - Trip List Tabs (Upcoming/Past)
     =============================================================================== */

  .tabs-container {
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    margin-bottom: 1.5rem;
  }

  .tabs {
    display: flex;
    gap: 1rem;
  }

  .tab-button {
    background: none;
    border: none;
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    position: relative;
  }

  .tab-button:hover {
    color: var(--text-color, #111827);
  }

  .tab-button.active {
    color: var(--primary-color, #009553);
    border-bottom-color: var(--primary-color, #009553);
  }

  .tab-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.375rem;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--background-secondary, #f9fafb);
    border-radius: 9999px;
  }

  .tab-button.active .tab-count {
    background: var(--primary-color, #009553);
    color: white;
  }

  /* ===============================================================================
     FILTERS - Provider Filter
     =============================================================================== */

  .filters-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--background-secondary, #f9fafb);
    border-radius: var(--border-radius, 8px);
  }

  .filter-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-color, #111827);
  }

  .filter-select {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--border-radius, 8px);
    font-size: 0.875rem;
    color: var(--text-color, #111827);
    background: var(--background-color, #ffffff);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-select:focus {
    outline: none;
    border-color: var(--primary-color, #009553);
    box-shadow: 0 0 0 3px rgba(0, 149, 83, 0.1);
  }

  /* ===============================================================================
     RESPONSIVE - Mobile Optimierung
     =============================================================================== */

  @media (max-width: 768px) {
    .trip-main,
    .current-trip-main {
      flex-direction: column;
    }

    .trip-image-section,
    .current-trip-image-section {
      width: 100%;
      max-width: none;
    }

    .trip-info-grid,
    .current-trip-info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .trip-actions,
    .current-trip-actions {
      flex-direction: column;
    }

    .trips-grid {
      grid-template-columns: 1fr;
    }

    .tabs {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .tab-button {
      white-space: nowrap;
    }
  }

  @media (max-width: 480px) {
    .trip-info-grid,
    .current-trip-info-grid {
      grid-template-columns: 1fr;
    }

    .trip-title,
    .current-trip-title {
      font-size: 1.25rem;
    }
  }
`;
function xr(c) {
  if (!c) return "-";
  try {
    return new Date(c).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return console.warn("Invalid date:", c), c;
  }
}
function Pi(c, e = "CHF") {
  if (c == null) return "-";
  try {
    const t = typeof c == "string" ? parseFloat(c) : c;
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: e || "CHF"
    }).format(t);
  } catch {
    return console.warn("Invalid amount:", c), `${c} ${e}`;
  }
}
function Ir(c) {
  var e;
  return c && (e = c.links) != null && e.invoice ? c.links.invoice : null;
}
function Eo(c) {
  if (!c || typeof c != "string") return !1;
  try {
    const t = (c.includes("://") ? new URL(c).pathname : c).match(/\/p\/([^/?#]+)/);
    if (!t) return !0;
    const i = t[1];
    return !(!i.includes("_") || i.split("_").slice(1).join("_").length <= 1);
  } catch {
    return !1;
  }
}
function Pr(c) {
  var e, t;
  if (!c) return null;
  if ((e = c.links) != null && e.tripDetails) {
    const i = ((t = c.provider) == null ? void 0 : t.code) ?? c.provider;
    return (i === 1 || i === "1" || i === "voe") && !Eo(c.links.tripDetails) ? (console.warn("⚠️ Invalid Voegele trip details URL filtered:", c.links.tripDetails), null) : c.links.tripDetails;
  }
  return null;
}
function Ct(c) {
  if (!c) return "";
  typeof c == "object" && (c = c.name || c.code || "");
  const e = c.toString().toLowerCase().trim();
  return {
    twerenbold: "Twerenbold Reisen",
    twr: "Twerenbold Reisen",
    voegele: "Vögele Reisen",
    imbach: "Imbach Reisen",
    mittelthurgau: "Mittelthurgau",
    excellence: "Excellence",
    voe: "Vögele Reisen",
    "twerenbold reisen": "Twerenbold",
    "voegele reisen": "Vögele Reisen",
    "imbach reisen": "Imbach Reisen",
    "mittelthurgau reisen": "Mittelthurgau"
  }[e] || c;
}
function Lr(c) {
  if (!c) return "unknown";
  const e = c.toString().toLowerCase().trim();
  return {
    booked: "confirmed",
    confirmed: "confirmed",
    guaranteed: "confirmed",
    current: "confirmed",
    active: "confirmed",
    completed: "completed",
    finished: "completed",
    past: "completed",
    cancelled: "cancelled",
    canceled: "cancelled",
    pending_payment: "pending",
    pending: "pending",
    waitlist: "waitlist"
  }[e] || c;
}
function ha(c) {
  if (!c) return !1;
  const e = /* @__PURE__ */ new Date();
  return new Date(c.departureDate || c.startDate) > e;
}
function Mr(c) {
  return c ? (c = c.toString().toLowerCase().trim(), `${c}`) : "";
}
class vi extends Oe {
  constructor() {
    super(), this.currentTrip = null, this.isLoading = !1, this.error = null, this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = "https://xitami.github.io/TWR-Account-Components", this.mode = "demo", this.authComponent = null, this.mode = "full", this.showActions = !0, this.languageConfig = {}, this.demoData = {}, this._isInitialized = !1;
  }
  async connectedCallback() {
    super.connectedCallback(), await this.loadConfigurations();
    const e = this.apiMode || "demo";
    console.log(`🔧 CurrentTripComponent configuring API service: apiMode=${e}`), x.setMode(e), this.authComponent && x.setAuthComponent(this.authComponent), this._handleTripsUpdated = (t) => {
      var i;
      if (((i = t.detail) == null ? void 0 : i.source) === "background-revalidation") {
        console.log("🔄 CurrentTrip: Received background-revalidated trips, checking for current trip update...");
        const r = t.detail.trips || [], o = this.filterCurrentTrips(r);
        o.length > 0 && (console.log("✅ CurrentTrip: Updated from background revalidation"), this.currentTrip = o[0]);
      }
    }, document.addEventListener("trips-updated", this._handleTripsUpdated), await this.loadCurrentTrip();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._handleTripsUpdated && (document.removeEventListener("trips-updated", this._handleTripsUpdated), this._handleTripsUpdated = null);
  }
  async updated(e) {
    if (super.updated(e), e.has("apiMode") || e.has("authComponent")) {
      const t = this.apiMode || "demo";
      console.log(`🔧 CurrentTripComponent updating API service: apiMode=${t}`), x.setMode(t), this.authComponent && x.setAuthComponent(this.authComponent), this._isInitialized = !1, await this.loadCurrentTrip();
    }
  }
  async loadConfigurations() {
    try {
      const e = await fetch(`${this.demoBaseUrl}/config/language-config.json`);
      this.languageConfig = await e.json();
      const t = await fetch(`${this.demoBaseUrl}/config/demo-data.json`);
      this.demoData = await t.json();
    } catch (e) {
      console.error("Failed to load configurations:", e), this.languageConfig = { twerenbold: { trips: {} } }, this.demoData = { trips: { current: null } };
    }
  }
  getText(e, t = null) {
    return O(e, "trips", t, this.theme);
  }
  async loadCurrentTrip() {
    var e, t, i, r;
    this.isLoading = !0, this.error = null;
    try {
      let o = [];
      if ((e = this.appActions) != null && e.loadTrips && (!((t = this.appState) != null && t.tripsLoaded) && await this.appActions.loadTrips(), o = Array.isArray((i = this.appState) == null ? void 0 : i.trips) ? this.appState.trips : [], console.log("🔗 Using global app state trips for current trip:", o.length)), (!Array.isArray(o) || o.length === 0) && this.apiMode !== "demo" && (console.log("🌐 Loading trips from API fallback for current trip"), o = await this.loadTripsFromAPI()), !Array.isArray(o) || o.length === 0)
        console.log("ℹ️ No trips available - showing empty state"), this.currentTrip = null;
      else {
        const a = this.filterCurrentTrips(o);
        this.currentTrip = a.length > 0 ? a[0] : null, console.log("✅ Current trip extracted from global trips:", !!this.currentTrip), this.currentTrip && console.log("🖼️ Current trip image info:", {
          title: this.currentTrip.title,
          hasImage: !!this.currentTrip.image,
          imageUrl: this.currentTrip.image,
          imageFromMedia: (r = this.currentTrip.media) == null ? void 0 : r.mainImage,
          fullTrip: this.currentTrip
        });
      }
      this._isInitialized = !0;
    } catch (o) {
      console.error("❌ Failed to load current trip:", o), this.error = this.getText("errorLoadingTrips") || "Fehler beim Laden der aktuellen Reise", o.message && o.message.includes("Authentifizierung fehlgeschlagen") ? this._showAuthNotification() : this._showLoadingError(), this.currentTrip = null;
    } finally {
      this.isLoading = !1;
    }
  }
  async loadTripsFromAPI() {
    try {
      const e = await x.getTrips(), t = Array.isArray(e) ? e : [];
      return console.log("📊 API provided trips for current trip:", t.length), t;
    } catch (e) {
      throw console.error("❌ API loading failed for current trip:", e), e;
    }
  }
  filterCurrentTrips(e) {
    const t = /* @__PURE__ */ new Date(), i = new Date(t.getFullYear(), t.getMonth(), t.getDate()), r = [];
    return e.forEach((o) => {
      if (!o.departureDate || !o.returnDate) return;
      const a = new Date(o.returnDate), n = new Date(a.getFullYear(), a.getMonth(), a.getDate()), s = new Date(n);
      s.setDate(s.getDate() + 1), s >= i && r.push(o);
    }), this.sortTripsByPriority(r);
  }
  sortTripsByPriority(e) {
    const i = (() => {
      switch (this.theme) {
        case "twerenbold":
          return "twr";
        case "voegele":
          return "voe";
        case "imbach":
          return "imb";
        default:
          return "";
      }
    })();
    return e.sort((r, o) => {
      const a = (p) => {
        var m, b;
        const h = typeof p.provider == "string" ? p.provider : ((m = p.provider) == null ? void 0 : m.code) || ((b = p.provider) == null ? void 0 : b.name);
        return h === i || h === i.toLowerCase() ? 1 : h === "Voegele" || h === "voe" || h === "Imbach" || h === "imb" || h === "Twerenbold" || h === "twr" ? 2 : 3;
      }, n = a(r), s = a(o);
      if (n !== s) return n - s;
      const l = new Date(r.departureDate), g = new Date(o.departureDate);
      return l.getTime() !== g.getTime() ? l - g : (o.price || 0) - (r.price || 0);
    });
  }
  mapApiTripToComponent(e) {
    var i, r, o, a, n, s, l, g;
    if (!e) return null;
    Array.isArray(e) && (e = e[0]);
    const t = {
      id: e.id || e.tripId,
      title: e.title || e.name || "Unbenannte Reise",
      code: e.code || e.tripCode || e.productCode || "Unbekannter Code",
      destination: e.destination || e.location || "Unbekanntes Ziel",
      departureDate: ((i = e.dates) == null ? void 0 : i.departureDate) || e.departureDate || e.startDate,
      returnDate: ((r = e.dates) == null ? void 0 : r.returnDate) || e.returnDate || e.endDate,
      duration: ((o = e.dates) == null ? void 0 : o.duration) || e.duration || 0,
      price: ((a = e.pricing) == null ? void 0 : a.totalAmount) || e.price || e.totalPrice || 0,
      currency: ((n = e.pricing) == null ? void 0 : n.currency) || e.currency || "CHF",
      status: this.mapApiStatusToComponent(e.status),
      bookingNumber: e.dossier || e.bookingNumber || e.reference,
      image: ((s = e.media) == null ? void 0 : s.mainImage) || e.image || e.photo,
      provider: e.provider ? e.provider : "Twerenbold",
      bookingDate: ((l = e.dates) == null ? void 0 : l.bookingDate) || e.bookingDate || e.createdAt
    };
    return console.log("🖼️ Trip image mapping:", {
      title: t.title,
      hasImage: !!t.image,
      imageUrl: t.image,
      sources: {
        "trip.media?.mainImage": (g = e.media) == null ? void 0 : g.mainImage,
        "trip.image": e.image,
        "trip.photo": e.photo
      }
    }), t;
  }
  // Utility methods now imported from trip-utils.js
  mapApiStatusToComponent(e) {
    return Lr(e);
  }
  formatDate(e) {
    return xr(e);
  }
  formatCurrency(e, t = "CHF") {
    return Pi(e, t);
  }
  getTripDetailsUrl(e) {
    return Pr(e);
  }
  getTripInvoiceUrl(e) {
    return Ir(e);
  }
  _showAuthNotification() {
    const e = this.shadowRoot.querySelector("auth-notifications");
    e && e.showNotification({
      type: "auth",
      title: "Sitzung abgelaufen",
      message: "Ihre Anmeldung ist abgelaufen. Bitte melden Sie sich erneut an, um auf Ihre Reisedaten zugreifen zu können.",
      persistent: !0
    });
  }
  _showNotification(e) {
    const t = this.shadowRoot.querySelector("auth-notifications");
    t && t.showNotification(e);
  }
  _showLoadingError() {
    this._showNotification({
      type: "error",
      title: O("errorLoading", "common", "Fehler beim Laden"),
      message: "Beim Laden Ihrer aktuellen Reise ist ein Fehler aufgetreten.",
      actions: [{
        label: O("retry", "common", "Erneut versuchen"),
        type: "btn-primary",
        handler: () => {
          this._isInitialized = !1, this.loadCurrentTrip();
        }
      }]
    });
  }
  renderProvider(e) {
    if (e && typeof e == "object") {
      const t = Ct(e.name);
      return u`
        <a href="${e.websiteUrl}" style="color: var(--text-muted); text-decoration:none;white-space:nowrap;" class="text-sm text-gray-500 with-favicon">
        <favicon-component url=${e.websiteUrl} brand=${e.name} size=${24} alt="${e.name}"></favicon-component>
 
        <strong>${t}</strong>
        </a>
      `;
    }
    return Ct(e);
  }
  renderTripCode(e) {
    return Mr(e);
  }
  _handleImageError(e) {
    var r, o, a;
    const t = e.target;
    console.error("❌ Image failed to load:", {
      src: t.src,
      trip: (r = this.currentTrip) == null ? void 0 : r.title,
      error: e.type
    }), t.style.display = "none";
    const i = (o = t.parentElement) == null ? void 0 : o.querySelector(".current-trip-image-placeholder");
    if (i)
      i.style.display = "block";
    else {
      const n = document.createElement("div");
      n.className = "current-trip-image-placeholder", (a = t.parentElement) == null || a.appendChild(n);
    }
  }
  _handleImageLoad(e) {
    var i;
    const t = e.target;
    console.log("✅ Image loaded successfully:", {
      src: t.src,
      trip: (i = this.currentTrip) == null ? void 0 : i.title,
      dimensions: `${t.naturalWidth}x${t.naturalHeight}`
    });
  }
  render() {
    return this.isLoading ? u`
        <div class="skeleton-card" aria-busy="true" aria-label="Laden...">
          <div class="skeleton-content">
            <div class="skeleton-main">
              <div class="skeleton skeleton-image"></div>
              <div class="skeleton-details">
                <div class="skeleton skeleton-text large"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text small"></div>
              </div>
            </div>
            
            ${this.mode === "full" || this.mode === "compact" ? u`
              <div class="skeleton-info-grid">
                <div>
                  <div class="skeleton skeleton-text small"></div>
                  <div class="skeleton skeleton-text"></div>
                </div>
                <div>
                  <div class="skeleton skeleton-text small"></div>
                  <div class="skeleton skeleton-text"></div>
                </div>
                <div>
                  <div class="skeleton skeleton-text small"></div>
                  <div class="skeleton skeleton-text"></div>
                </div>
                <div>
                  <div class="skeleton skeleton-text small"></div>
                  <div class="skeleton skeleton-text"></div>
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      ` : this.error ? u`<div class="empty-state">${this.error}</div>` : this.currentTrip ? (console.log("🎨 Rendering current-trip with image:", {
      hasImage: !!this.currentTrip.image,
      imageUrl: this.currentTrip.image,
      title: this.currentTrip.title
    }), u`
      <div class="current-trip-card">
        <div class="current-trip-content">
          <div class="current-trip-main">
            <div class="current-trip-image-section">
              ${this.currentTrip.image ? u`
                    <img
                      src="${this.currentTrip.image}"
                      alt="${this.currentTrip.title}"
                      class="current-trip-image"
                      @error="${this._handleImageError}"
                      @load="${this._handleImageLoad}"
                      loading="lazy"
                    />
                  ` : u`<div class="current-trip-image-placeholder"></div>`}
            </div>
            <div class="current-trip-details">
              <div class="current-trip-header">
                <div class="current-trip-provider">${this.renderProvider(this.currentTrip.provider)}  <span class="trip-code-label">Buchungscode: </span><span class="trip-code">${this.renderTripCode(this.currentTrip.code)} </span></div>
                <h3 class="current-trip-title">${this.currentTrip.title}</h3>
                <p class="current-trip-destination">${this.currentTrip.destination}</p>
              </div>
            </div>
          </div>

          ${this.mode !== "preview" ? u`
            <div class="current-trip-info-grid">
              <div class="info-item">
                <p class="info-label">${this.getText("tripDeparture")}</p>
                <p class="info-value">${this.formatDate(this.currentTrip.departureDate)}</p>
              </div>
              <div class="info-item">
                <p class="info-label">${this.getText("tripReturn")}</p>
                <p class="info-value">${this.formatDate(this.currentTrip.returnDate)}</p>
              </div>
              <div class="info-item">
                <p class="info-label">${this.getText("tripDuration")}</p>
                <p class="info-value">${this.currentTrip.duration} ${this.getText("tripDays")}</p>
              </div>
              <div class="info-item">
                <p class="info-label">${this.getText("tripPrice")}</p>
                <p class="info-value">${this.formatCurrency(this.currentTrip.price, this.currentTrip.currency)}</p>
              </div>
            </div>
          ` : ""}
        </div>

        ${this.showActions && this.mode !== "preview" ? u`
          <div class="current-trip-actions">
            ${this.getTripInvoiceUrl(this.currentTrip) ? u`
              <a href="${this.getTripInvoiceUrl(this.currentTrip)}" class="btn btn-secondary">
                ${this.getText("btnInvoiceTrip") || "Rechnung"}
              </a>
            ` : ""}
            ${this.getTripDetailsUrl(this.currentTrip) ? u`
              <a href="${this.getTripDetailsUrl(this.currentTrip)}" target="_blank" class="btn btn-primary">
                ${this.getText("btnShowDetails") || "Details anzeigen"}
              </a>
            ` : ""}
          </div>
        ` : ""}
      </div>

      <auth-notifications></auth-notifications>
    `) : u`<div class="empty-state">${this.getText("currentTripNoData") || "Keine aktuelle Reise gefunden"}</div>`;
  }
}
N(vi, "properties", {
  currentTrip: { type: Object },
  isLoading: { type: Boolean },
  error: { type: String },
  mode: { type: String },
  // 'full', 'compact', 'preview'
  showActions: { type: Boolean },
  languageConfig: { type: Object },
  demoData: { type: Object }
}), N(vi, "styles", [
  ut,
  Do,
  ie`
    :host {
      display: block;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    }

    /* Full Mode Styles */
    .current-trip-card {
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius-lg, 12px);
      box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      background: var(--bg-color, #ffffff);
    }

    .current-trip-content {
      padding: 1.5rem;
    }

    .current-trip-main {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .current-trip-image-section {
      flex-shrink: 0;
    }

    .current-trip-image {

      object-fit: cover;
      border-radius: var(--border-radius, 8px);
      display: block;
    }

    .current-trip-image-placeholder {

      background: var(--bg-secondary, #f9fafb);
      border-radius: var(--border-radius, 8px);
      display: block;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRUZGMUYzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzMuMjUwMyAzOC40ODE2QzMzLjI2MDMgMzcuMDQ3MiAzNC40MTk5IDM1Ljg4NjQgMzUuODU0MyAzNS44NzVIODMuMTQ2M0M4NC41ODQ4IDM1Ljg3NSA4NS43NTAzIDM3LjA0MzEgODUuNzUwMyAzOC40ODE2VjgwLjUxODRDODUuNzQwMyA4MS45NTI4IDg0LjU4MDcgODMuMTEzNiA4My4xNDYzIDgzLjEyNUgzNS44NTQzQzM0LjQxNTggODMuMTIzNiAzMy4yNTAzIDgxLjk1NyAzMy4yNTAzIDgwLjUxODRWMzguNDgxNlpNODAuNTAwNiA0MS4xMjUxSDM4LjUwMDZWNzcuODc1MUw2Mi44OTIxIDUzLjQ3ODNDNM5xNzIgNTIuNDUzNiA2NS41Nzg4IDUyLjQ1MzYgNjYuNjAzOSA1My40NzgzTDgwLjUwMDYgNjcuNDAxM1Y0MS4xMjUxWk00My43NSA1MS42MjQ5QzQzLjc1IDU0LjUyNDQgNDYuMTAwNSA1Ni44NzQ5IDQ5IDU2Ljg3NDlDNTEuODk5NSA1Ni44NzQ5IDU0LjI1IDU0LjUyNDQgNTQuMjUgNTEuNjI0OUM1NC4yNSA0OC43MjU0IDUxLjg5OTUgNDYuMzc0OSA0OSA0Ni4zNzQ5QzQ2LjEwMDUgNDYuMzc0OSA0My43NSA0OC43MjU0IDQzLjc1IDUxLjYyNDlaIiBmaWxsPSIjNjg3Nzg3Ii8+Cjwvc3ZnPgo=');
      background-image: url('../../..img-placeholder.svg');
      background-image: url("data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='120' fill='%23EFF1F3'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z' fill='%23687787'/%3E%3C/svg%3E");
      background-size: cover;
      background-position: center;
      opacity: 0.5;
    }

    .current-trip-image-section:has(.current-trip-image-placeholder) {
      display: none !important;
    }

    .current-trip-details {
      flex: 1;
    }

    .current-trip-header {
      margin-bottom: 0.5rem;
    }

    .current-trip-provider {
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      text-decoration: none;
      display: block;
      margin-bottom: 0.25rem;
    }

    .current-trip-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color, #009553);
      margin: 0 0 0.25rem 0;
    }

    .current-trip-destination {
      color: var(--text-secondary, #6b7280);
      margin: 0;
    }

    .current-trip-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary, #6b7280);
      margin-bottom: 0px;
    }

    .info-value {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--text-color, #111827);
      margin-top: 0px;
    }

.trip-code{
  text-transform: lowercase
}

    .current-trip-actions {
      padding: 1rem 1.5rem;
      background: var(--bg-secondary, #f9fafb);
      border-top: 1px solid var(--border-color, #e5e7eb);
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    /* Compact Mode Styles */
    :host([mode="compact"]) .current-trip-content {
      padding: 1rem;
    }

    :host([mode="compact"]) .current-trip-main {
      margin-bottom: 1rem;
    }

    :host([mode="compact"]) .current-trip-image {
      width: 4rem;
      height: 4rem;
    }

    :host([mode="compact"]) .current-trip-image-placeholder {
      width: 4rem;
      height: 4rem;
    }

    :host([mode="compact"]) .current-trip-title {
      font-size: 1.25rem;
    }

    :host([mode="compact"]) .current-trip-info-grid {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
    }

    /* Preview Mode Styles (für account-overview) */
    :host([mode="preview"]) .current-trip-card {
        //   border: none;
      box-shadow: none;
      background: var(--bg-secondary, #f9fafb);
      margin-bottom: 1rem;
    }

    :host([mode="preview"]) .current-trip-content {
      padding: 1rem;
    }

    :host([mode="preview"]) .current-trip-main {
      margin-bottom: 0;
    }

    /* :host([mode="preview"]) .current-trip-image {
      width: 3rem;
      height: 3rem;
    } */

   :host([mode="preview"]) .current-trip-provider {
   display: none;
   }

    :host([mode="preview"]) .current-trip-image-placeholder {
      width: 3rem;
      height: 3rem;
    }

    :host([mode="preview"]) .current-trip-title {
      font-size: 1rem;
      font-weight: 600;
    }

    :host([mode="preview"]) .current-trip-destination {
      font-size: 0.875rem;
    }

    :host([mode="preview"]) .current-trip-info-grid {
      display: none;
    }

    :host([mode="preview"]) .current-trip-actions {
      display: none;
    }


    :host([mode="preview"]) .current-trip-header {
      margin-bottom: -.2em;
    }

    /* Empty State */
    .empty-state {
      text-align: left;
      padding: 2rem 1rem;
      color: var(--text-secondary, #6b7280);
    }

    .loading-state {
      text-align: center;
      padding: 2rem 1rem;
      color: var(--text-secondary, #6b7280);
    }

    /* Skeleton Loader Styles */
    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .skeleton {
      background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);
      background-size: 200% 100%;
      animation: skeleton-pulse 1.5s ease-in-out infinite;
      border-radius: var(--border-radius, 4px);
    }

    .skeleton-text {
      height: 1rem;
      margin-bottom: 0.5rem;
    }

    .skeleton-text.large {
      height: 1.5rem;
    }

    .skeleton-text.small {
      height: 0.75rem;
    }
/* 
    .skeleton-card {
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      background: var(--bg-color, #ffffff);
      overflow: hidden;
    } */

    /* .skeleton-content {
      padding: 1.5rem;
    } */

    .skeleton-main {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .skeleton-image {
      width: 6rem;
      height: 6rem;
      flex-shrink: 0;
    }

    .skeleton-details {
      flex: 1;
    }

    .skeleton-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    /* Compact Mode Skeleton */
    :host([mode="compact"]) .skeleton-content {
      padding: 1rem;
    }

    :host([mode="compact"]) .skeleton-main {
      margin-bottom: 1rem;
    }

    :host([mode="compact"]) .skeleton-image {
      width: 4rem;
      height: 4rem;
    }

    :host([mode="compact"]) .skeleton-info-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    /* Preview Mode Skeleton */
    :host([mode="preview"]) .skeleton-card {
      border: none;
      box-shadow: none;
      /* background: var(--bg-secondary, #f9fafb); */
    }

    :host([mode="preview"]) .skeleton-content {
      padding: 1rem;
    }

    :host([mode="preview"]) .skeleton-main {
      margin-bottom: 0;
    }

    :host([mode="preview"]) .skeleton-image {
      width: 3rem;
      height: 3rem;
    }

    :host([mode="preview"]) .skeleton-info-grid {
      display: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .current-trip-main,
      .skeleton-main {
        flex-direction: column;
      }

      .current-trip-image,
      .current-trip-image-placeholder,
      .skeleton-image {
        width: 100% !important;
        height: 8rem !important;
      }
/* 
      .current-trip-info-grid,
      .skeleton-info-grid {
        grid-template-columns: 1fr !important;
      } */

      .current-trip-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `
]);
customElements.get("current-trip-component") || customElements.define("current-trip-component", vi);
const Ro = {
  demoBaseUrl: "https://xitami.github.io/TWR-Account-Components"
};
function Gt(c) {
  if (typeof window < "u") {
    const e = window.__TWR_DEMO_BASE_URL__;
    if (typeof e == "string" && e.startsWith("http"))
      return e;
  }
  return Ro.demoBaseUrl;
}
function Nr(c) {
  switch (c) {
    case "twerenbold":
      return "twr";
    case "voegele":
      return "voe";
    case "imbach":
      return "imb";
    case "excellence":
      return "excellence";
    // Schiffpost
    default:
      return "";
  }
}
function Dr(c) {
  return c ? ((typeof c == "string" ? c : (c == null ? void 0 : c.code) || (c == null ? void 0 : c.name) || "") || "").toString().toLowerCase().trim() : "";
}
function Je(c, e) {
  const t = Dr(c);
  if (!t) return 3;
  const i = Nr(e), r = {
    twr: ["twr", "twerenbold", "twerenbold reisen", "twerenbold-reisen", "twerenboldreisen"],
    voe: ["voe", "voegele", "voegele reisen", "voegele-reisen", "voegelereisen", "vögele", "vögele reisen"],
    imb: ["imb", "imbach", "imbach reisen", "imbach-reisen", "imbachreisen"],
    excellence: ["excellence", "mittelthurgau", "reisebüro mittelthurgau"]
  };
  if (i && r[i]) {
    if (r[i].includes(t))
      return 1;
  } else if (i && (t === i || t === i.toLowerCase()))
    return 1;
  return Object.values(r).flat().includes(t) ? 2 : 3;
}
function Li(c, e, t = {}) {
  if (!Array.isArray(c)) return [];
  const {
    getProvider: i = (l) => l.provider,
    getDate: r = (l) => l.departureDate || l.date,
    getPrice: o = (l) => l.price || 0,
    sortMode: a = "upcoming",
    priceFallback: n = !0,
    debug: s = !1
  } = t;
  if (s)
    try {
      const l = Nr(e);
      console.groupCollapsed(`🔍 Sorting Debug: ${e} (${c.length} items)`), console.log(`%cTheme: ${e}`, "font-weight: bold; color: #009553"), console.log(`%cPriority Provider Code: ${l || "None"}`, "font-weight: bold");
      const g = c.map((p, h) => {
        const m = i(p), b = Dr(m), v = Je(m, e), y = r(p), I = o(p);
        return {
          Index: h,
          ID: p.id || p.code || p.newsletterCode || "?",
          "Provider (Raw)": typeof m == "object" ? JSON.stringify(m) : m,
          "Provider (Norm)": b,
          Priority: v,
          // 1=High, 2=Med, 3=Low
          Date: y instanceof Date ? y.toISOString().split("T")[0] : y,
          Price: I
        };
      });
      console.table(g), console.groupEnd();
    } catch (l) {
      console.warn("Error in sorting debug:", l);
    }
  return [...c].sort((l, g) => {
    const p = Je(i(l), e), h = Je(i(g), e);
    if (p !== h) return p - h;
    const m = new Date(r(l)), b = new Date(r(g)), v = !isNaN(m.getTime()), y = !isNaN(b.getTime());
    return v && y && m.getTime() !== b.getTime() ? a === "past" ? b - m : m - b : n ? o(g) - o(l) : 0;
  });
}
class wi extends $e {
  constructor() {
    super(), this.message = "", this.overlay = !1, this.small = !1;
  }
  render() {
    const e = this.small ? "spinner small" : "spinner", t = this.message || "Lädt", i = u`
      <div class="loader" role="status" aria-live="polite" aria-label="${t}">
        <div class="${e}" aria-hidden="true"></div>
        ${this.message ? u`<div class="message" aria-live="polite">${this.message}</div>` : ""}
      </div>
    `;
    return this.overlay ? u`<div class="overlay" role="alert">${i}</div>` : i;
  }
}
N(wi, "properties", {
  message: { type: String },
  overlay: { type: Boolean },
  small: { type: Boolean }
}), N(wi, "styles", ie`
    :host { display:block }
    .loader {
      display:flex;
      align-items:center;
      gap: 0.75rem;
      color: var(--text-secondary, #6b7280);
    }

    .spinner {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 4px solid rgba(0,0,0,0.08);
      border-top-color: var(--primary-color, #009553);
      animation: spin 1s linear infinite;
      flex-shrink:0;
    }

    .spinner.small { width: 20px; height: 20px; border-width: 3px; }

    .message { font-size: 0.95rem; }

    @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

    /* overlay styles */
    .overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display:flex;
      align-items:center;
      justify-content:center;
      background: rgba(255,255,255,0.85);
      z-index: 20;
    }

    .overlay .loader { flex-direction:column; gap:0.6rem; }
    .overlay .message { text-align:center }
  `);
customElements.get("loader-component") || customElements.define("loader-component", wi);
const je = class je extends $e {
  constructor() {
    super(), this.brand = null, this.domain = null, this.size = 32, this.alt = "", this.fallback = !0;
  }
  sanitizeDomain(e) {
    var r;
    if (!e) return null;
    let t = String(e).trim().toLowerCase().replace(/^(https?:\/\/)/, "").split("/")[0];
    return t = t.replace(/^www\./, ""), ((r = t.match(/[a-z0-9\-\.]+/g)) == null ? void 0 : r.join("")) || "" || null;
  }
  getDomain() {
    if (this.domain) {
      const e = this.sanitizeDomain(this.domain);
      if (e) return e;
    }
    if (this.url) {
      const e = this.sanitizeDomain(this.url);
      if (e) return e;
    }
    if (this.brand) {
      const e = String(this.brand).trim().toLowerCase();
      if (je.BRAND_TO_DOMAIN[e]) return je.BRAND_TO_DOMAIN[e];
      if (/^[a-z0-9\-]+$/.test(e)) return `${e}.ch`;
    }
    return null;
  }
  renderInitialsLabel(e) {
    return e && (e.split(".")[0] || "").slice(0, 2).toUpperCase() || "??";
  }
  render() {
    const e = this.getDomain(), t = Number(this.size) || 32, i = Math.max(16, Math.min(t, 64)), r = i * 2;
    if (this.style.setProperty("--favicon-size", `${i}px`), e) {
      const o = `https://www.google.com/s2/favicons?domain=https://www.${e}&sz=${r}`;
      return u`<img src=${o} alt=${this.alt || e} width=${i} height=${i} />`;
    }
    if (this.fallback) {
      const o = this.renderInitialsLabel(this.brand || this.domain);
      return u`<div class="initials" aria-hidden="true">${o}</div>`;
    }
    return u`<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${i}' height='${i}'></svg>" alt=${this.alt || ""} width=${i} height=${i} />`;
  }
};
N(je, "properties", {
  brand: { type: String },
  domain: { type: String },
  url: { type: String },
  size: { type: Number },
  alt: { type: String },
  fallback: { type: Boolean }
}), N(je, "styles", ie`
    :host { display: inline-block; vertical-align: middle; }
    img { display:block; width: var(--favicon-size, 28px); height: var(--favicon-size, 28px); border-radius: 4px; }
    .initials {
      display:inline-flex; align-items:center; justify-content:center; background: var(--bg-secondary, #f3f4f6);
      color: var(--text-color, #111827); width: var(--favicon-size, 28px); height: var(--favicon-size, 28px); border-radius: 4px; font-weight: 600; font-size: 0.75rem;
    }
  `), // Mapping from brand shorthand to canonical domains
N(je, "BRAND_TO_DOMAIN", {
  twr: "twerenbold.ch",
  twerenbold: "twerenbold.ch",
  imbach: "imbach.ch",
  excellence: "mittelthurgau.ch",
  vogele: "voegele-reisen.ch",
  voe: "voegele-reisen.ch",
  voegele: "voegele-reisen.ch",
  voegelereisen: "voegele-reisen.ch"
});
let yi = je;
customElements.get("favicon-component") || customElements.define("favicon-component", yi);
const Oo = 3600 * 1e3, sr = 30 * 1e3, lt = class lt extends Oe {
  constructor() {
    super(), this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.mode = "demo", this.authComponent = null, this.upcomingTrips = [], this.pastTrips = [], this.isLoading = !1, this.activeTab = "upcoming", this.error = null, this.languageConfig = {}, this.languageConfig = {}, this.providerFilter = null, this.providerFilter = null, this.showAuthOverlay = !1, this._isInitialized = !1, this._loadTripsPromise = null, this.lastLoadedAt = null, this.availableProviders = [], this._autoRefreshIntervalId = null, this._allTripsCache = [], this._lastHandledAuthRefresh = null, this._lastSyncedTripsRef = null, this.demoBaseUrl = Gt(), console.log(
      "🏗️ TripsViewComponent constructor - Initial apiMode:",
      this.apiMode
    );
  }
  async connectedCallback() {
    super.connectedCallback(), console.log(
      "🔗 TripsViewComponent CONNECTED - current apiMode:",
      this.apiMode,
      "theme:",
      this.theme
    ), console.log(
      "🔗 TripsViewComponent attributes:",
      [...this.attributes].map((i) => `${i.name}=${i.value}`)
    ), await this.loadConfigurations(), console.log(
      "⚙️ TripsViewComponent after config load - apiMode:",
      this.apiMode
    );
    const e = this.apiMode || "demo";
    x.mode !== e && (console.log("🔧 Configuring API Service for standalone/initial mode:", e), x.setMode(e)), console.log(
      "🔧 TripsView initialized:",
      "mode=",
      e,
      "isLocal=",
      e === "local"
    ), this.authComponent && (x.setAuthComponent(this.authComponent), console.log("🔐 API Service connected to auth component")), this._handleTripsUpdated = (i) => {
      var r;
      if (((r = i.detail) == null ? void 0 : r.source) === "background-revalidation") {
        console.log("🔄 Received background-revalidated trips, updating view silently...");
        const o = i.detail.trips || [];
        this._updateTripsView(o);
      }
    }, document.addEventListener("trips-updated", this._handleTripsUpdated), this._performInitialLoad();
  }
  disconnectedCallback() {
    this._stopAutoRefresh(), this._handleTripsUpdated && (document.removeEventListener("trips-updated", this._handleTripsUpdated), this._handleTripsUpdated = null), typeof super.disconnectedCallback == "function" && super.disconnectedCallback();
  }
  async updated(e) {
    const t = new Map(e);
    if (t.has("apiMode")) {
      const o = t.get("apiMode");
      if (o !== void 0 && o !== this.apiMode) {
        const a = {
          demo: "Demo-Modus",
          local: "Entwicklungs-Modus",
          api: "Test-API",
          live: "Live-System"
        };
        this._showNotification({
          type: "info",
          title: "Modus gewechselt",
          message: `Sie verwenden jetzt den ${a[this.apiMode] || this.apiMode}.`,
          autoHideDelay: 3e3
        });
      }
      t.delete("apiMode");
    }
    t.size > 0 && super.updated(t), console.log("🔄 updated called with changedProperties:", [...e.keys()]);
    let i = !1, r = !1;
    if (e.has("availableProviders")) {
      const o = e.get("availableProviders") || [];
      this.availableProviders.includes(this.providerFilter) || (this.providerFilter = null), (o || []).length !== this.availableProviders.length && this.requestUpdate("providerFilter");
    }
    if ((e.has("appState") || e.has("authComponent")) && this._setupAuthRefreshListener(), e.has("appState")) {
      const o = e.get("appState"), a = this.appState;
      a != null && a.authLastRefreshed && a.authLastRefreshed !== (o == null ? void 0 : o.authLastRefreshed) && (console.log("🔄 Auth state refreshed, synchronizing trips cache"), await this._handleAuthRefresh());
      const n = !(o != null && o.isAuthenticated) && !!(a != null && a.isAuthenticated), s = (o == null ? void 0 : o.isInitializing) === !0 && (a == null ? void 0 : a.isInitializing) === !1;
      (n || s) && (console.log("🔄 Auth resolved (justResolved=" + n + ", initJustFinished=" + s + ") — retrying initial trips load"), this.showAuthOverlay && (this.showAuthOverlay = !1), this._isInitialized = !1, await this._performInitialLoad());
      const l = a == null ? void 0 : a.trips;
      Array.isArray(l) && l !== this._lastSyncedTripsRef && l !== (o == null ? void 0 : o.trips) && (console.log("🔄 appState.trips reference changed, syncing view:", l.length), this._lastSyncedTripsRef = l, this._updateTripsView(l));
    }
    e.has("apiMode") && (console.log(
      "🔄 apiMode changed from",
      e.get("apiMode"),
      "to",
      this.apiMode
    ), x.setMode(this.apiMode || "demo"), this._stopAutoRefresh(), r = !0, i = !0), e.has("authComponent") && (console.log(
      "🔄 authComponent changed from",
      e.get("authComponent"),
      "to",
      this.authComponent
    ), this.authComponent && (x.setAuthComponent(this.authComponent), console.log("🔐 API Service connected to auth component"), r = !0, i = !0)), e.has("providerFilter") && (console.log(
      "🔄 providerFilter changed from",
      e.get("providerFilter"),
      "to",
      this.providerFilter
    ), i = !0), i && (r && (this._isInitialized = !1), await this._performInitialLoad(), this.requestUpdate()), this.sortPriorityRows();
  }
  async loadConfigurations() {
    try {
      const e = await fetch(`${this.demoBaseUrl}/config/language-config.json`);
      this.languageConfig = await e.json();
    } catch (e) {
      console.error("Failed to load configurations:", e), this.languageConfig = {
        twerenbold: {
          trips: {
            pageTitle: "Meine Reisen",
            pageSubtitle: "Übersicht Ihrer gebuchten Reisen"
          }
        }
      };
    }
  }
  // Get text based on current theme (using central service)
  getText(e, t = null) {
    return O(e, "trips", t, this.theme);
  }
  async _performInitialLoad(e = {}) {
    var r;
    if (this._loadTripsPromise)
      return console.log("⏳ Trips loading already in progress, waiting..."), this._loadTripsPromise;
    const t = e === !0 || (e == null ? void 0 : e.forceRefresh) === !0, i = this.apiMode === "demo" || this.apiMode === "local" || this.apiMode === "api" || this.apiMode === "live";
    if (console.log("🔍 Load check - apiMode:", this.apiMode, "authComponent:", !!this.authComponent, "shouldLoad:", i), !i) {
      console.log("⏸️ Skipping load - unsupported apiMode:", this.apiMode);
      return;
    }
    if ((this.apiMode === "live" || this.apiMode === "api") && !this.isAuthenticated) {
      const o = (r = this.appState) == null ? void 0 : r.authComponent;
      if (!!this.appState && (this.appState.isInitializing === !0 || !o || o.isMsalInitialized === !1)) {
        console.log("⏳ Auth still resolving — deferring overlay decision until ready"), this.isLoading = !0, this.showAuthOverlay = !1;
        return;
      }
      console.log("🔐 Live/API mode requires authentication - showing auth overlay"), this.showAuthOverlay = !0;
      return;
    } else
      this.showAuthOverlay = !1;
    console.log("🚀 Performing initial trips load with apiMode:", this.apiMode, "isInitialized:", this._isInitialized, "forceRefresh:", t), this._loadTripsPromise = this.loadTrips({ forceRefresh: t });
    try {
      await this._loadTripsPromise, this._isInitialized = !0, console.log("✅ Trips successfully loaded and initialized"), this._startAutoRefresh();
    } finally {
      this._loadTripsPromise = null;
    }
  }
  // getTripInvoiceUrl and getTripDetailsUrl are now imported from trip-utils.js
  async loadTrips(e = {}) {
    var i, r, o, a, n;
    const t = e === !0 || (e == null ? void 0 : e.forceRefresh) === !0;
    console.log(
      "🚀 loadTrips called - apiMode:",
      this.apiMode,
      "authComponent:",
      !!this.authComponent,
      "forceRefresh:",
      t
    ), this.isLoading = !0, this.error = null;
    try {
      let s = [];
      if ((i = this.appState) != null && i.trips && Array.isArray(this.appState.trips) && this.appState.trips.length > 0 && (console.log("⚡ Optimistic render from appState:", this.appState.trips.length), this._updateTripsView(this.appState.trips)), (r = this.appActions) != null && r.loadTrips) {
        (t || !((o = this.appState) != null && o.tripsLoaded)) && await this.appActions.loadTrips({ forceRefresh: t }), s = Array.isArray((a = this.appState) == null ? void 0 : a.trips) ? this.appState.trips : [], this._lastSyncedTripsRef = (n = this.appState) == null ? void 0 : n.trips, console.log("🔗 Using global app state trips:", s.length), this._updateTripsView(s);
        return;
      }
      const l = await x.getTrips({ forceRefresh: t });
      s = Array.isArray(l) ? l : [], console.log("📊 Loaded trips via ApiService (no app context):", s.length), this._updateTripsView(s);
    } catch (s) {
      console.error("❌ Failed to load trips:", s);
      const l = (s == null ? void 0 : s.message) || "";
      (l.includes("Authentifizierung fehlgeschlagen") || l.includes("401") || l.includes("Unauthorized") || l.includes("nicht authentifiziert")) && (this.showAuthOverlay = !0, this._showNotification({
        type: "auth",
        title: this.getText("loginRequired", "Anmeldung erforderlich"),
        message: this.getText("loginRequiredText", "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an."),
        persistent: !0
      })), this.error = this.getText("errorLoadingTrips") || "Fehler beim Laden der Reisen", this._showLoadingError(), this._updateTripsView([]);
    } finally {
      this.isLoading = !1, this.lastLoadedAt = Date.now();
    }
  }
  _cacheTrips(e) {
    const t = Array.isArray(e) ? [...e] : [];
    this._allTripsCache = t, this.lastLoadedAt = Date.now();
    const i = /* @__PURE__ */ new Set();
    t.forEach((o) => {
      const a = this._normalizeProvider(o == null ? void 0 : o.provider);
      a && i.add(a);
    });
    const r = Array.from(i).sort((o, a) => o.localeCompare(a));
    JSON.stringify(r) !== JSON.stringify(this.availableProviders) && (this.availableProviders = r);
  }
  _normalizeTripsForView(e) {
    return Array.isArray(e) ? e.map((t) => this.mapApiTripToComponent(t)).filter((t) => t !== null) : [];
  }
  _updateTripsView(e) {
    const t = this._normalizeTripsForView(e);
    this._cacheTrips(t), this.filterAndSortTrips(this._allTripsCache, this.providerFilter);
  }
  _normalizeProvider(e) {
    return e ? typeof e == "string" ? e : e.name ? e.name : e.code ? e.code : null : null;
  }
  _startAutoRefresh() {
    var e;
    this._stopAutoRefresh(), (this.apiMode === "live" || this.apiMode === "api") && (e = this.authComponent) != null && e.isAuthenticated && (this._autoRefreshIntervalId = setInterval(() => {
      this._handleAutoRefresh();
    }, Oo));
  }
  _stopAutoRefresh() {
    this._autoRefreshIntervalId && (clearInterval(this._autoRefreshIntervalId), this._autoRefreshIntervalId = null);
  }
  async _handleAutoRefresh() {
    var t;
    if (!(this.apiMode === "live" || this.apiMode === "api") || !((t = this.authComponent) != null && t.isAuthenticated) || this.isLoading || this._loadTripsPromise) return;
    const e = this.lastLoadedAt || 0;
    if (!(Date.now() - e < sr))
      try {
        await this.loadTrips();
      } catch (i) {
        console.warn("⚠️ Auto refresh failed:", i);
      }
  }
  _setupAuthRefreshListener() {
    this.appActions && this.authComponent && typeof this.appActions.registerAuthComponent == "function" && this.appActions.registerAuthComponent(this.authComponent);
  }
  async _handleAuthRefresh() {
    var i, r;
    if (!(this.apiMode === "live" || this.apiMode === "api"))
      return;
    const e = (i = this.appState) == null ? void 0 : i.authLastRefreshed;
    if (!e || e === this._lastHandledAuthRefresh)
      return;
    if (!((r = this.authComponent) != null && r.isAuthenticated)) {
      this.showAuthOverlay = !0, this._stopAutoRefresh(), this._lastHandledAuthRefresh = e;
      return;
    }
    if (this.isLoading || this._loadTripsPromise) {
      this._lastHandledAuthRefresh = e;
      return;
    }
    if (Date.now() - (this.lastLoadedAt || 0) < sr) {
      this._lastHandledAuthRefresh = e;
      return;
    }
    this._lastHandledAuthRefresh = e, await this.forceReload();
  }
  filterAndSortTrips(e, t = null) {
    const i = /* @__PURE__ */ new Date(), r = new Date(i.getFullYear(), i.getMonth(), i.getDate());
    console.log("🔄 Filtering trips - total trips:", e.length, "provider filter:", t);
    let o = e;
    t && (o = e.filter((s) => {
      var g, p;
      return (typeof s.provider == "string" ? s.provider : ((g = s.provider) == null ? void 0 : g.code) || ((p = s.provider) == null ? void 0 : p.name)) === t;
    }), console.log("🔄 After provider filter:", o.length, "trips"));
    let a = [], n = [];
    o.forEach((s) => {
      if (!s.departureDate || !s.returnDate) {
        console.warn("⚠️ Trip missing dates:", s);
        return;
      }
      const l = new Date(s.departureDate), g = new Date(s.returnDate), p = new Date(l.getFullYear(), l.getMonth(), l.getDate()), h = new Date(g.getFullYear(), g.getMonth(), g.getDate());
      if (p > r)
        a.push(s);
      else {
        const m = new Date(h);
        m.setDate(m.getDate() + 1), m < r && n.push(s);
      }
    }), this.sortTripsBy(a, "upcoming"), a = this.sortTripsByPriority(a, "upcoming"), this.sortTripsBy(n, "past"), n = this.sortTripsByPriority(n, "past"), console.log("📊 Filtered trips - upcoming:", a.length, "past:", n.length), console.log("📊 Sample upcoming trip:", a[0]), console.log("📊 Sample past trip:", n[0]), this.upcomingTrips = a, this.pastTrips = n, this.upcomingTrips.length === 0 && this.pastTrips.length > 0 && (console.log("ℹ️ No upcoming trips, switching to 'past' tab automatically"), this.activeTab = "past"), console.log("📊 Component updated - upcoming:", this.upcomingTrips.length, "past:", this.pastTrips.length), this.requestUpdate();
  }
  sortTripsBy(e, t = "current") {
    return console.log("🎨 TripsList sorting with theme:", this.theme), Li(e, this.theme, {
      getProvider: (i) => {
        var r, o;
        return typeof i.provider == "string" ? i.provider : ((r = i.provider) == null ? void 0 : r.name) || ((o = i.provider) == null ? void 0 : o.code);
      },
      getDate: (i) => i.departureDate,
      getPrice: (i) => i.price,
      sortMode: t,
      debug: !0
    });
  }
  sortTripsByPriority(e, t = "upcoming") {
    return this.sortTripsBy(e, t);
  }
  sortPriorityRows(e = "table", t = "priority-provider") {
    try {
      document.querySelectorAll(e).forEach((i) => {
        const r = i.querySelector("tbody");
        if (!r) return;
        const o = Array.from(r.querySelectorAll("tr")), a = o.filter((s) => s.classList.contains(t)), n = o.filter((s) => !s.classList.contains(t));
        [...a, ...n].forEach((s) => r.appendChild(s));
      });
    } catch (i) {
      console.error("sortPriorityRows() failed:", i);
    }
  }
  mapApiTripToComponent(e) {
    var s, l, g, p, h, m, b;
    if (!e)
      return console.warn("⚠️ Null trip provided to mapApiTripToComponent"), null;
    if (console.log("🔄 Mapping trip data:", e), Array.isArray(e) && (console.warn("⚠️ Trip data is an array, using first element"), e = e[0], !e))
      return null;
    const t = e.id || e.tripId || e._id, i = e.title || e.name || e.tripName || "Unbenannte Reise", r = ((s = e.dates) == null ? void 0 : s.departureDate) || e.departureDate || e.startDate || e.departure, o = ((l = e.dates) == null ? void 0 : l.returnDate) || e.returnDate || e.endDate || e.return, a = e.dossier || e.bookingNumber || e.reference || e.bookingRef || "N/A";
    if (console.log("🔄 Extracted fields - id:", t, "title:", i, "departure:", r, "return:", o), !r || !o)
      return console.warn("⚠️ Trip missing required dates, skipping:", e), null;
    const n = {
      id: t,
      title: i,
      code: e.code || e.tripCode || e.productCode || "Unbekannter Code",
      destination: e.destination || e.location || "Unbekanntes Ziel",
      departureDate: r,
      returnDate: o,
      duration: ((g = e.dates) == null ? void 0 : g.duration) || e.duration || 0,
      price: ((p = e.pricing) == null ? void 0 : p.totalAmount) || e.price || e.totalPrice || 0,
      currency: ((h = e.pricing) == null ? void 0 : h.currency) || e.currency || "CHF",
      status: this.mapApiStatusToComponent(e.status),
      bookingNumber: a,
      image: ((m = e.media) == null ? void 0 : m.mainImage) || e.image || e.photo,
      provider: e.provider ? e.provider : "Twerenbold",
      bookingDate: ((b = e.dates) == null ? void 0 : b.bookingDate) || e.bookingDate || e.createdAt,
      links: e.links
    };
    return console.log("🔄 Mapped trip result:", n), n;
  }
  // Utility methods now imported from trip-utils.js
  mapApiStatusToComponent(e) {
    return Lr(e);
  }
  formatDate(e) {
    return xr(e);
  }
  formatCurrency(e, t = "CHF") {
    return Pi(e, t);
  }
  getTripDetailsUrl(e) {
    return Pr(e);
  }
  getTripInvoiceUrl(e) {
    return Ir(e);
  }
  showButton(e, t, i, r, o) {
    if (!t || !e) return "";
    const a = typeof t == "string" ? t.trim() : "";
    return a === "" ? "" : o === "link" ? u`
        <a href="${a}" class="btn ${i}" target="${r}">
          ${this.getText(e)}
        </a>
      ` : u`
      <button @click=${() => window.open(a, r)} class="btn ${i}" type="${o}">
        ${this.getText(e)}
      </button>
    `;
  }
  setProviderFilter(e) {
    this.providerFilter = e, console.log("🔧 Provider filter set to:", e), this.forceReload();
  }
  async forceReload() {
    console.log("🔄 Force reloading trips"), this._stopAutoRefresh(), this._isInitialized = !1, await this._performInitialLoad({ forceRefresh: !0 });
  }
  _showNotification(e) {
    const t = this.shadowRoot.querySelector("auth-notification-component");
    t && t.showNotification(e);
  }
  _showLoadingError() {
    this._showNotification({
      type: "error",
      title: O("loadingFailed", "common", "Laden fehlgeschlagen"),
      message: O("loadingFailedText", "common", "Beim Laden Ihrer Reisedaten ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."),
      persistent: !0,
      actions: [{
        label: O("retry", "common", "Erneut versuchen"),
        type: "btn-primary",
        handler: () => this.forceReload()
      }]
    });
  }
  // Test method - can be called from console: document.querySelector('trips-view-modern-component').testAuthNotification()
  testAuthNotification() {
    console.log("🧪 Testing auth notification manually"), this._showAuthNotification();
  }
  render() {
    return this.needsAuth || this.showAuthOverlay ? u`<div class="trips-page trips-page--auth">${this.renderAuthOverlay()}</div>` : u`
      <div class="trips-page">
        <div class="trips-header">
          <h1 class="trips-title page-title">
            ${this.getText("pageTitle")}
            ${this.isLoading && (this.upcomingTrips.length > 0 || this.pastTrips.length > 0) ? u`<span class="loading-spinner-small" title="Aktualisiere..."></span>` : ""}
          </h1>
          <p class="trips-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>
        </div>

        ${this.renderCurrentTrip()}
        ${this.renderTripsTable()}

        ${this.renderAuthOverlay()}
      </div>
      
      <auth-notification-component></auth-notification-component>
      
      <style>
        .loading-spinner-small {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 10px;
          vertical-align: middle;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `;
  }
  renderCurrentTrip() {
    return !(this._allTripsCache && this._allTripsCache.length > 0) && !this.isLoading ? (console.log("ℹ️ No trips available - hiding current trip section"), "") : u`
      <div class="current-trip-section">
        <h2 class="section-title">${this.getText("currentTripTitle")}</h2>
        <current-trip-component 
          mode="full" 
          .apiMode=${this.apiMode}
          .theme=${this.theme}
          .authComponent=${this.authComponent}
          ?showActions=${!0}>
        </current-trip-component>
      </div>
    `;
  }
  renderTripCode(e) {
  }
  renderProvider(e, t = !0) {
    if (console.log("🔍 Rendering provider:", e), e && typeof e == "object") {
      const r = Ct(e.name);
      return u`
        <span style="color: var(--text-muted); text-decoration:none;white-space:nowrap;" class="text-sm text-gray-500 with-favicon">
          <favicon-component brand=${e.name} size=${16} alt="${e.name}"></favicon-component>
          ${t ? u`<strong>${r}</strong>` : ""}
        </span>
      `;
    }
    return e;
  }
  addFavicons() {
    this.shadowRoot.querySelectorAll("a.with-favicon").forEach((e) => {
      try {
        let t = 32;
        e.classList.contains("with-favicon--large") && (t = 64);
        const r = new URL(e.href).hostname.toLowerCase();
        let o = "generic";
        if (e.querySelector("img"))
          return;
        try {
          let a = 32;
          e.classList.contains("with-favicon--large") && (a = 64);
          const s = `https://www.google.com/s2/favicons?domain=${new URL(e.href).hostname}&sz=${a}`;
          e.insertAdjacentHTML(
            "afterbegin",
            `<img src="${s}" alt="" style="width:${a / 2}px;height:${a / 2}px;vertical-align:middle;margin-right:4px;">`
          );
        } catch (a) {
          console.error("Invalid URL:", e.href, a);
        }
      } catch (t) {
        console.error("FaviconComponent error:", t);
      }
    });
  }
  setActiveTab(e) {
    this.activeTab = e, console.log("🔧 Active tab set to:", e);
  }
  renderTripsTable() {
    const e = this.activeTab === "upcoming" ? this.upcomingTrips : this.pastTrips;
    return u`
      <div class="trips-table-section">
        <div class="trips-tabs" role="tablist" aria-label="Reise-Kategorien">
          <button
            role="tab"
            aria-selected="${this.activeTab === "upcoming" ? "true" : "false"}"
            aria-controls="upcoming-trips-panel"
            id="tab-upcoming"
            class="tab ${this.activeTab === "upcoming" ? "active" : ""}"
            @click=${() => this.setActiveTab("upcoming")}
          >
            ${this.getText("tabUpcoming")}
          </button>
          <button
            role="tab"
            aria-selected="${this.activeTab === "past" ? "true" : "false"}"
            aria-controls="past-trips-panel"
            id="tab-past"
            class="tab ${this.activeTab === "past" ? "active" : ""}"
            @click=${() => this.setActiveTab("past")}
          >
            ${this.getText("tabPast")}
          </button>
        </div>

        ${this.isLoading && e.length === 0 ? u`
              <div class="trips-table-container" role="tabpanel" id="${this.activeTab}-trips-panel" aria-labelledby="tab-${this.activeTab}">
                <table class="trips-table">
                  <thead>
                    <tr>
                      <th>${this.getText("tableBookingNumber")}</th>
                      <th>${this.getText("tableTrip")}</th>
                      <th>${this.getText("tableDeparture")}</th>
                      <th>${this.getText("tablePrice")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Array.from({ length: 5 }, (t, i) => u`
                      <tr class="skeleton-table-row">
                        <td><div class="skeleton skeleton-text" style="width: 80%;"></div></td>
                        <td>
                          <div class="skeleton skeleton-text small" style="width: 30%; margin-bottom: 0.25rem;"></div>
                          <div class="skeleton skeleton-text" style="width: 70%;"></div>
                        </td>
                        <td><div class="skeleton skeleton-text" style="width: 60%;"></div></td>
                        <td><div class="skeleton skeleton-text" style="width: 50%;"></div></td>
                        <td><div class="skeleton" style="width: 60px; height: 32px; border-radius: 4px;"></div></td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            ` : e.length === 0 ? u`
              <div class="empty-state" role="tabpanel" id="${this.activeTab}-trips-panel" aria-labelledby="tab-${this.activeTab}">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true" style="margin: 0 auto 1rem; opacity: 0.3;">
                  <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/>
                </svg>
                <h3>${this.getText("noTripsFound") || "Keine Reisen gefunden"}</h3>
                <p style="margin-bottom: 1.5rem;">
                  ${this.activeTab === "upcoming" ? this.getText("noUpcomingTrips") || "Sie haben aktuell keine gebuchten Reisen." : this.getText("noPastTrips") || "Sie haben noch keine vergangenen Reisen."}
                </p>
                <!--button class="btn btn-primary" @click=${() => window.location.href = "https://www.twerenbold.ch/reisen"}>
                  ${this.getText("discoverTrips") || "Reisen entdecken"}
                </button-->
              </div>
            ` : (() => {
      const t = [], i = [];
      e.forEach((o) => {
        var s, l;
        const a = typeof o.provider == "string" ? o.provider : ((s = o.provider) == null ? void 0 : s.name) || ((l = o.provider) == null ? void 0 : l.code);
        Je(a, this.theme) === 1 ? t.push(o) : i.push(o);
      });
      const r = (o, a = null) => u`
                ${a ? u`<h3 class="trips-section-title">${a}</h3>` : ""}
                <div class="trips-table-container" role="tabpanel">
                  <table class="trips-table">
                    <thead>
                      <tr>
                        <th>${this.getText("tableDate")}</th>
                        <th>${this.getText("tableTrip")}</th>
                        <th>${this.getText("tablePrice")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${o.map((n) => {
        var p, h;
        const s = typeof n.provider == "string" ? n.provider : ((p = n.provider) == null ? void 0 : p.name) || ((h = n.provider) == null ? void 0 : h.code), l = Je(s, this.theme), g = l === 1 ? "priority-high" : l === 2 ? "priority-medium" : "priority-low";
        return console.log(n), u`
                        <tr class="trip-row ${g}" @click=${() => this._handleTripClick(n)}>
                          <td class="trip-date">
                            <div class="date-wrapper">
                              <span class="date-day">${this.formatDate(n.departureDate)}</span>
                              <!--span class="date-duration text-muted">${n.duration} ${this.getText("days")}</span-->
                            </div>
                          </td>
                          <td class="trip-title">
                            <div class="title-wrapper">
                              <span class="trip-name">${this.renderProvider(n.provider, !1)} ${n.title}</span>
                              <span class="trip-route text-muted">${n.destination}</span>
                            </div>
                          </td>
                   
                          <td class="trip-price">
                            <div class="price-wrapper">
                              <span class="price-amount">${this.formatCurrency(n.price)}</span>
                            </div>
                          </td>
                          <td class="trip-action">
                              ${this.showButton("btnShowDetails", this.getTripDetailsUrl(n), "btn-secondary", "_blank", "link")}
                          </td>
                        </tr>
                      `;
      })}
                    </tbody>
                  </table>
                </div>
              `;
      return t.length > 0 && i.length > 0 ? u`
                  ${r(t, this.getText("yourTripsWithUs", "Ihre Reisen mit uns"))}
                  <div style="margin-top: 2rem;"></div>
                  ${r(i, this.getText("otherTrips", "Weitere Reisen der Gruppe"))}
                ` : r(e);
    })()}
      </div>
    `;
  }
  renderTableRow(e) {
    const t = `trip-row-${this.theme}`, i = (() => {
      var a, n;
      const o = typeof e.provider == "string" ? e.provider : ((a = e.provider) == null ? void 0 : a.code) || ((n = e.provider) == null ? void 0 : n.name);
      switch (this.theme) {
        case "twerenbold":
          return o === "Twerenbold" || o === "twr";
        case "voegele":
          return o === "Voegele" || o === "voe";
        case "imbach":
          return o === "Imbach" || o === "imb";
        default:
          return !1;
      }
    })();
    return u`
      <tr class="${t} ${i ? "priority-provider" : ""}" style="${""}">
        <td class="booking-number" data-label="Buchungsnummer">
          <span>${e.bookingNumber}</span>
        </td>
        <td class="trip-name" data-label="Reise">
          <span class="provider-link">${this.renderProvider(e.provider)}</span> ${this.renderTripCode(e.code)} ${e.title}
        </td>
        <td class="departure-date" data-label="Abreise">${this.formatDate(e.departureDate)}</td>
        <td class="trip-price" data-label="Preis">
          ${this.formatCurrency(e.price, e.currency)}
        </td>
        <td class="trip-actions">
          ${this.showButton("btnShowDetails", this.getTripDetailsUrl(e), "btn-secondary", "_blank", "link")}
        </td>
      </tr>
    `;
  }
};
N(lt, "properties", {
  upcomingTrips: { type: Array },
  pastTrips: { type: Array },
  isLoading: { type: Boolean },
  activeTab: { type: String },
  error: { type: String },
  languageConfig: { type: Object },
  demoData: { type: Object },
  providerFilter: { type: String },
  showAuthOverlay: { type: Boolean },
  lastLoadedAt: { type: Number },
  availableProviders: { type: Array }
}), N(lt, "styles", [
  at(lt, lt, "styles"),
  ie`
    /* Page Layout */
    :host {
        color: var(--text-color, #111827);
      max-width: var(--container-width, 1200px);
      margin: 0 auto;
      padding: var(--component-padding, 2rem);
      width: 100%;
    }

    .trips-page {
      // max-width: 1200px;
      // margin: 0 auto;
      // padding: var(--component-padding, 2rem);
    }

    /* Session required: the overlay is the sole content (see render()). */
    .trips-page--auth {
      position: relative;
    }
    .trips-page--auth .auth-overlay {
      position: relative;
      background: transparent;
      backdrop-filter: none;
    }

    /* Header */
    .trips-header {
      margin-bottom: 2rem;
    }

    /* Title and subtitle styles intentionally omitted to use defaults from theme */

    /* Current Trip Section */
    .current-trip-section {
      margin-bottom: 2.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-color, #111827);
      margin: 0 0 1rem 0;
    }

    .current-trip-card {
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius-lg, 12px);
      box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      background: var(--bg-color, #ffffff);
    }

    .current-trip-content {
      padding: 1.5rem;
    }

    .current-trip-main {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .current-trip-image-section {
      flex-shrink: 0;
    }

    .current-trip-image {
      width: 6rem;
      height: 6rem;
      object-fit: cover;
      border-radius: var(--border-radius, 8px);
    }

    .current-trip-image-placeholder {
      width: 6rem;
      height: 6rem;
      background: var(--bg-secondary, #f9fafb);
      border-radius: var(--border-radius, 8px);
    }

        .current-trip-image-section:has(.current-trip-image-placeholder) {
      display: none !important;
    }

    .current-trip-details {
      flex: 1;
    }

    .current-trip-header {
      margin-bottom: 0.5rem;
    }

    .current-trip-provider {
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      text-decoration: none;
      display: block;
      margin-bottom: 0.25rem;
    }

    .current-trip-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color, #009553);
      margin: 0 0 0.25rem 0;
    }

    .current-trip-destination {
      color: var(--text-secondary, #6b7280);
      margin: 0;
    }

    .current-trip-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary, #6b7280);
      margin-bottom: 0px;
    }

    .info-value {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--text-color, #111827);
      margin-top: 0px;
    }

    .current-trip-actions {
      padding: 1rem 1.5rem;
      background: var(--bg-secondary, #f9fafb);
      border-top: 1px solid var(--border-color, #e5e7eb);
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    /* Trips Table Section */
    .trips-table-section {
      margin-top: 2rem;
      width: 100%;
    }

    .trips-tabs {
      border-bottom: 1px solid var(--border-color, #e5e7eb);
      margin-bottom: 1.5rem;
      display: flex;
      gap: 2rem;
    }

    .tab {
      padding: 0.5rem 0;
      border: none;
      background: none;
      color: var(--text-secondary, #6b7280);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: var(--twerenbold-transition);
    }

    .tab.active {
      color: var(--primary-color, #009553);
      border-bottom-color: var(--primary-color, #009553);
    }

    .tab:hover {
      color: var(--text-color, #111827);
    }

    .trips-table-container {
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      overflow: hidden;
      background: var(--bg-color, #ffffff);
    }

    .trips-table {
      width: 100%;
      border-collapse: collapse;
    }

    .trips-table thead {
      background: var(--bg-secondary, #f9fafb);
    }

    .trips-table th {
      padding: 0.75rem 1.5rem;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary, #6b7280);
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }

    .trips-table td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
      font-size: 0.875rem;
    }

    .trips-table .trip-date,.trips-table .trip-price{
      min-width: 100px;
    }
    .trips-table .trip-title{
      width: 100%;
    }

    .booking-number {
      font-weight: 500;
      color: var(--text-color, #111827);
    }

    .provider-link {
      color: var(--text-secondary, #6b7280);
      text-decoration: none;
      font-size: 0.875rem;
      // display: flex;
      // flex-direction: row-reverse;
      img{
      border-radius:100%;
    }
    }

    table  .provider-link strong {
     display:none;
    }

    .provider-link:hover {
      color: var(--primary-color, #009553);
    }

    .trip-name {
      color: var(--text-secondary, #6b7280);
    }

    .departure-date {
      color: var(--text-secondary, #6b7280);
    }

    .trip-price {
      color: var(--text-secondary, #6b7280);
    }

    .trip-actions {
      text-align: right;
    }

    /* Theme-basierte Hervorhebungen */
    .priority-provider {
      background: rgba(var(--primary-color-rgb, 0, 155, 83), 0.05) !important;
      font-weight: 500;
    }

    .priority-provider .trip-name {
      color: var(--primary-color, #009553);
    }

    /* Theme-spezifische Anpassungen */
    // .trip-row-twerenbold.priority-provider {
    //   background: rgba(0, 155, 83, 0.08) !important;
    // }

    // .trip-row-voegele.priority-provider {
    //   background: rgba(33, 150, 243, 0.08) !important;
    // }

    // .trip-row-imbach.priority-provider {
    //   background: rgba(96, 125, 139, 0.08) !important;
    // }

    /* Empty States */
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--text-secondary, #6b7280);
    }

    favicon-component {
      vertical-align:sub;margin-right:4px;
    }

    .empty-state h3 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color, #111827);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .trips-page {
        padding: 1rem;
      }

      .current-trip-main {
        flex-direction: column;
      }

      .current-trip-image {
        width: 100%;
        height: 12rem;
      }

      .current-trip-image-placeholder {
        width: 100%;
        height: 12rem;
      }

      .current-trip-info-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }

      .current-trip-actions {
        flex-direction: column;
        gap: 0.5rem;
      }

      .trips-tabs {
        gap: 1rem;
        overflow-x: auto;
      }

      .trips-table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .trips-table {
        /* min-width: 600px; */
        width: 100%;
      } 

      /* Mobile table optimizations */
      .trips-table th:nth-child(4),
      .trips-table td:nth-child(4) {
        display: none; /* Hide price column on mobile */
      }

      .trips-table th:last-child,
      .trips-table td:last-child {
        width: 80px; /* Smaller actions column */
      }
    }

      //     .trip-name {
      //   font-size: 1.125rem;
      //   font-weight: 600;
      //   color: var(--text-color, #111827);
      //   margin-bottom: 0.5rem;
      // }

    /* Extra small screens - card layout */
    @media (max-width: 640px) {
      .trips-table,
      .trips-table thead,
      .trips-table tbody,
      .trips-table th,
      .trips-table td,
      .trips-table tr {
        display: block;
      }

      .trips-table thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      .trips-table tr {
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: var(--border-radius, 8px);
        margin-bottom: 1rem;
        padding: 1rem;
        background: var(--bg-color, #ffffff);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .trips-table td {
        border: none;
        position: relative;
        padding: 0.5rem 0;
        text-align: left;
      }

      .trips-table td:before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--text-secondary, #6b7280);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: block;
        margin-bottom: 0.25rem;
      }

      .trip-route{
        display:block;
        }

      .booking-number:before { content: "Buchungsnummer"; }
    
      .departure-date:before { content: "Abreise"; }
      .trip-price:before { content: "Preis"; }

      .trip-actions {
        text-align: center;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color, #e5e7eb);
      }

      .provider-link {
        // display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }



      .departure-date {
        font-size: 0.875rem;
        color: var(--text-color, #111827);
      }

      .trip-price {
        font-size: 1rem;
        font-weight: 600;
        color: var(--primary-color, #009553);
      }

      /* Hide table container borders and shadows for card layout */
      .trips-table-container {
        border: none;
        box-shadow: none;
        overflow: visible;
      }
    }

    /* Skeleton Loader Styles */
    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .skeleton {
      background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);
      background-size: 200% 100%;
      animation: skeleton-pulse 1.5s ease-in-out infinite;
      border-radius: var(--border-radius, 4px);
    }

    .skeleton-text {
      height: 1rem;
      margin-bottom: 0.5rem;
    }

    .skeleton-text.large {
      height: 1.5rem;
    }

    .skeleton-text.small {
      height: 0.75rem;
    }

    .skeleton-card {
      padding: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      margin-bottom: 1rem;
    }

    .skeleton-table-row {
      display: table-row;
    }

    .skeleton-table-row > div {
      display: table-cell;
      padding: 1rem;
      vertical-align: middle;
    }

    .skeleton-table-row > div:nth-child(1) {
      width: 20%;
    }

    .skeleton-table-row > div:nth-child(2) {
      width: 40%;
    }

    .skeleton-table-row > div:nth-child(3) {
      width: 20%;
    }

    .skeleton-table-row > div:nth-child(4) {
      width: 15%;
    }

    .skeleton-table-row > div:nth-child(5) {
      width: 5%;
    }

    /* Priority Styles */
    // tr.trip-row.priority-high {
    //   background-color: var(--bg-primary-light, rgba(0, 149, 83, 0.05));
    //   position: relative;
    // }
    
    // tr.trip-row.priority-high::after {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   bottom: 0;
    //   width: 4px;
    //   background-color: var(--primary-color);
    // }

    tr.trip-row.priority-medium {
      /* No special styling for medium priority yet, but class is available */
    }

    .trips-section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0 0 1rem 0;
      // padding-left: 0.5rem;
      // border-left: 3px solid var(--primary-color);
    }
  `
]);
let Ti = lt;
customElements.get("trips-list-component") || customElements.define("trips-list-component", Ti);
const $t = "twerenbold_favorites_", ni = "twerenbold_favorites_last_user_id";
class $o {
  constructor() {
    this._syncQueue = [], this._isSyncing = !1, this._listeners = /* @__PURE__ */ new Set(), this._handleStorage = this._handleStorage.bind(this), typeof window < "u" && (window.addEventListener("storage", this._handleStorage), window.addEventListener("twerenbold:post-logout", () => {
      try {
        localStorage.removeItem(ni);
      } catch {
      }
    }));
  }
  _handleStorage(e) {
    if (!e.key || !e.key.startsWith($t)) return;
    const t = e.key.replace($t, "");
    if (t)
      try {
        const i = e.newValue ? JSON.parse(e.newValue) : [];
        console.log("🔄 FavoritesService: Cross-tab update detected for user", t), this._dispatchUpdate({ userId: t, items: i });
      } catch (i) {
        console.warn("Failed to parse cross-tab favorites update", i);
      }
  }
  _loadLocal(e) {
    const t = this._storageKeyFor(e);
    try {
      const i = localStorage.getItem(t);
      return i ? JSON.parse(i) : [];
    } catch (i) {
      return console.warn("Failed to load favorites from localStorage", i), [];
    }
  }
  _saveLocal(e, t = []) {
    const i = this._storageKeyFor(e);
    try {
      localStorage.setItem(i, JSON.stringify(t)), e && localStorage.setItem(ni, e), this._dispatchUpdate({ userId: e, items: t });
    } catch (r) {
      console.warn("Failed to save favorites to localStorage", r);
    }
  }
  _dispatchUpdate(e) {
    document.dispatchEvent(new CustomEvent("favorites-updated", { detail: e })), this._listeners.forEach((t) => t(e));
  }
  onUpdate(e) {
    return this._listeners.add(e), () => this._listeners.delete(e);
  }
  async getLocalFavorites(e) {
    return this._loadLocal(e);
  }
  isTripFavorited(e, t) {
    return (this._loadLocal(e) || []).some((r) => (r == null ? void 0 : r.id) === t || (r == null ? void 0 : r.tripId) === t);
  }
  // KK-234: Der Schlüssel eines Merklisten-Eintrags ist der Reisecode, nicht
  // trip.id — die Trips-/Watchlist-API liefert für alle Reisen einer Person
  // dieselbe id (Kundennummer). Über die id entfernte ein Löschen alle Einträge
  // auf einmal, und die Revalidierung brachte nur einen davon zurück.
  favKey(e) {
    var i, r;
    if (!e) return null;
    const t = e.trip || e.tripObject || null;
    return e.code || e.productCode || e.tripCode || (t == null ? void 0 : t.productCode) || (t == null ? void 0 : t.code) || (t == null ? void 0 : t.tripCode) || ((r = (i = e.serverFavorite) == null ? void 0 : i.trip) == null ? void 0 : r.productCode) || e.tripId || e.id || null;
  }
  async addFavoriteLocal(e, t) {
    const i = this._loadLocal(e) || [], r = this.favKey(t), o = i.find((n) => this.favKey(n) === r);
    if (o) return o;
    const a = {
      id: t.id,
      tripId: t.id,
      // Code fallback: prefer productCode (trips API) over generic code property
      code: t.productCode || t.code,
      addedAt: (/* @__PURE__ */ new Date()).toISOString(),
      syncStatus: "pending",
      trip: t
      // Store trip in trips API structure
    };
    return i.push(a), this._saveLocal(e, i), this._queueSync(e, a), a;
  }
  async removeFavoriteLocal(e, t) {
    const i = this._loadLocal(e) || [], r = this.favKey(t), o = i.find((n) => this.favKey(n) === r), a = i.filter((n) => this.favKey(n) !== r);
    if (this._saveLocal(e, a), o) {
      const n = o.code || o.trip && (o.trip.productCode || o.trip.code) || o.tripId || o.serverId;
      n && this._queueRemoveServerFavorite(e, n);
    }
    return !0;
  }
  _queueSync(e, t) {
    this._syncQueue.push({ type: "create", userId: e, item: t }), this._processQueue();
  }
  _queueRemoveServerFavorite(e, t) {
    this._syncQueue.push({ type: "remove", userId: e, tripCode: t }), this._processQueue();
  }
  _storageKeyFor(e) {
    return e ? `${$t}${e}` : `${$t}anonymous`;
  }
  getLastUserId() {
    try {
      return localStorage.getItem(ni);
    } catch {
      return null;
    }
  }
  _getComponentsConfig() {
    var e, t, i;
    if (typeof window < "u") {
      const r = window.__twerenboldAppState;
      if ((e = r == null ? void 0 : r.state) != null && e.componentsConfig)
        return r.state.componentsConfig;
      const o = ((t = r == null ? void 0 : r.state) == null ? void 0 : t.theme) || localStorage.getItem("selectedTheme") || "twerenbold", a = ((i = r == null ? void 0 : r.state) == null ? void 0 : i.apiMode) || (x == null ? void 0 : x.mode) || "demo";
      return ge(a, o);
    }
    return ge((x == null ? void 0 : x.mode) || "demo", null);
  }
  // ...
  async _processQueue() {
    if (this._isSyncing || this._syncQueue.length === 0) return;
    this._isSyncing = !0;
    let e = null;
    try {
      for (; this._syncQueue.length > 0; ) {
        const t = this._syncQueue.shift();
        e = t.userId;
        try {
          t.type === "create" ? await this._syncCreate(t.userId, t.item) : t.type === "remove" && await this._syncRemove(t.userId, t.tripCode);
        } catch (i) {
          console.warn("FavoritesService sync failed for task", t, i);
        }
      }
    } finally {
      this._isSyncing = !1, e && setTimeout(() => {
        console.log("🔄 FavoritesService: Triggering post-sync revalidation for", e), this.revalidateFavorites(e);
      }, 1e3);
    }
  }
  async _syncCreate(e, t) {
    var i, r;
    try {
      const o = t.code || t.tripId || t.trip && (t.trip.id || t.trip.code), a = t.trip && (((i = t.trip.provider) == null ? void 0 : i.id) || ((r = t.trip.provider) == null ? void 0 : r.code)) || null, n = {
        tripCode: o,
        providerId: a,
        meta: { tripId: t.tripId, code: t.code }
      };
      if (!e)
        return;
      const s = await x.addFavorite(e, n);
      let l = this._loadLocal(e) || [];
      l = l.map((g) => g.tripId === t.tripId ? {
        ...g,
        serverId: s.id || s.favoriteId || s._id || s.id,
        syncStatus: "synced",
        serverFavorite: s,
        // Update trip with server response if available
        trip: s.trip || g.trip
      } : g), this._saveLocal(e, l);
    } catch (o) {
      let a = this._loadLocal(e) || [];
      a = a.map((n) => n.tripId === t.tripId ? { ...n, syncStatus: "error" } : n), this._saveLocal(e, a), console.warn("Failed to sync favorite with server", o);
    }
  }
  async _syncRemove(e, t) {
    try {
      await x.removeFavorite(e, t);
      let i = this._loadLocal(e) || [];
      i = i.filter((r) => !(r.tripId === t || r.code === t || r.serverId === t || r.serverFavorite && (r.serverFavorite.id === t || r.serverFavorite.trip && r.serverFavorite.trip.code === t))), this._saveLocal(e, i);
    } catch (i) {
      console.warn("Failed to remove favorite on server", i);
      let r = this._loadLocal(e) || [];
      r = r.map((o) => o.tripId === t || o.code === t ? { ...o, syncStatus: "error" } : o), this._saveLocal(e, r);
    }
  }
  // External: validate local favorites with server
  async revalidateFavorites(e) {
    var t;
    if (!this._isRevalidating) {
      this._isRevalidating = !0;
      try {
        const i = this._getComponentsConfig();
        if (((t = i == null ? void 0 : i.favorites) == null ? void 0 : t.revalidateEnabled) === !1) {
          console.warn("⚠️ favoritesService.revalidateFavorites: disabled by config; skipping server sync");
          return;
        }
        const r = await x.getFavorites(e);
        if (r === null) {
          console.warn("⚠️ favoritesService.revalidateFavorites: server fetch failed; skipping merge");
          return;
        }
        if (console.log("🔁 favoritesService.revalidateFavorites: fetched server list length=", Array.isArray(r) ? r.length : 0), !Array.isArray(r)) return;
        const o = this._loadLocal(e) || [];
        let a = o.map((l) => {
          const g = this.favKey(l), p = r.find(
            (h) => l.serverId && l.serverId === h.id || g && this.favKey(h) === g || (h.meta && h.meta.tripId) === l.tripId
          );
          return p ? {
            ...l,
            serverId: p.id || p.favoriteId,
            serverFavorite: p,
            syncStatus: "synced",
            // Update trip with server response (now includes full trip structure)
            trip: p.trip || l.trip
          } : l.syncStatus !== "pending" ? null : l;
        }).filter(Boolean);
        r.forEach((l) => {
          var m, b, v, y, I;
          const g = ((m = l.trip) == null ? void 0 : m.id) || ((b = l.meta) == null ? void 0 : b.tripId);
          if (!g) return;
          const p = this.favKey(l) || g;
          a.some((M) => this.favKey(M) === p) || a.push({
            tripId: g,
            id: g,
            code: ((v = l.trip) == null ? void 0 : v.productCode) || ((y = l.trip) == null ? void 0 : y.code) || ((I = l.meta) == null ? void 0 : I.tripCode) || null,
            serverId: l.id || l.favoriteId,
            serverFavorite: l,
            syncStatus: "synced",
            trip: l.trip,
            // Store trip in trips API structure
            addedAt: l.createdAt || (/* @__PURE__ */ new Date()).toISOString()
          });
        });
        const n = JSON.stringify(o), s = JSON.stringify(a);
        n !== s && this._saveLocal(e, a);
      } catch (i) {
        console.warn("Failed to revalidate favorites with server", i);
      } finally {
        this._isRevalidating = !1;
      }
    }
  }
}
const Le = new $o(), Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  favoritesService: Le
}, Symbol.toStringTag, { value: "Module" })), ct = class ct extends Oe {
  constructor() {
    super();
    N(this, "_handleGlobalWatchlistUpdate", () => {
      this._globalUpdateTimer && clearTimeout(this._globalUpdateTimer), this._globalUpdateTimer = setTimeout(() => {
        this.loadData();
      }, 500);
    });
    this.merkliste = [], this.isLoading = !1, this.isRemoving = null, this.languageConfig = {}, this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = Gt();
  }
  async connectedCallback() {
    if (super.connectedCallback(), !j("favorites", this.apiMode, this.theme)) {
      console.log("Favorites is disabled by component-config for this mode/theme");
      return;
    }
    await this.loadConfigurations(), this._favoritesUnsub = Le.onUpdate(({ userId: t, items: i }) => {
      this.merkliste = (i || []).map((r) => this._mapToUiItem(r)), this.requestUpdate();
    }), await this.loadData(), typeof window < "u" && window.addEventListener("twerenbold:watchlist-updated", this._handleGlobalWatchlistUpdate);
  }
  async loadConfigurations() {
    try {
      const t = await fetch(`${this.demoBaseUrl}/config/language-config.json`);
      this.languageConfig = await t.json();
    } catch {
      this.languageConfig = { twerenbold: { merkliste: {} } };
    }
  }
  async loadData() {
    const t = this._userId();
    try {
      const i = await Le.getLocalFavorites(t);
      i && i.length > 0 ? (this.merkliste = (i || []).map((r) => this._mapToUiItem(r)), this.isLoading = !1) : this.isLoading = !0, (t || this.apiMode === "demo") && await Le.revalidateFavorites(t);
    } catch (i) {
      console.error("Error loading merkliste data:", i), this.merkliste.length === 0 && this._showError(
        "Laden fehlgeschlagen",
        "Beim Laden Ihrer Merkliste ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isLoading = !1;
    }
  }
  async updated(t) {
    var i;
    if ((i = super.updated) == null || i.call(this, t), t.has("apiMode")) {
      const r = t.get("apiMode");
      r !== void 0 && r !== this.apiMode && await this.loadData();
    }
    if (t.has("appState")) {
      const r = t.get("appState"), o = this._getUserIdFromState(r), a = this._userId();
      !o && a && await this.loadData();
    }
  }
  appContextChanged(t, i) {
    var o;
    if ((o = super.appContextChanged) == null || o.call(this, t, i), this._revalidateTimer) return;
    const r = this._userId();
    r && r !== this._lastContextUserId && (this._lastContextUserId = r, this._revalidateTimer = setTimeout(async () => {
      try {
        await this.loadData();
      } finally {
        this._revalidateTimer = null;
      }
    }, 250));
  }
  _getUserIdFromState(t) {
    var i, r;
    return t ? (i = t.authUser) != null && i.localAccountId ? t.authUser.localAccountId : (r = t.accountProfile) != null && r.id ? t.accountProfile.id : null : null;
  }
  async loadMerklisteFromAPI() {
    try {
      const t = this._userId();
      if (!t) return;
      await Le.revalidateFavorites(t);
      const i = await Le.getLocalFavorites(t);
      this.merkliste = (i || []).map((r) => this._mapToUiItem(r));
    } catch (t) {
      console.warn("Failed to load merkliste from API", t);
    }
  }
  disconnectedCallback() {
    this._favoritesUnsub && (this._favoritesUnsub(), this._favoritesUnsub = null), typeof window < "u" && window.removeEventListener("twerenbold:watchlist-updated", this._handleGlobalWatchlistUpdate), this._globalUpdateTimer && clearTimeout(this._globalUpdateTimer), typeof super.disconnectedCallback == "function" && super.disconnectedCallback();
  }
  _userId() {
    var t, i, r, o, a, n;
    if ((i = (t = this.appState) == null ? void 0 : t.authUser) != null && i.localAccountId) return this.appState.authUser.localAccountId;
    if ((o = (r = this.appState) == null ? void 0 : r.authUser) != null && o.homeAccountId) return this.appState.authUser.homeAccountId.split(".")[0];
    if ((n = (a = this.appState) == null ? void 0 : a.accountProfile) != null && n.id) return this.appState.accountProfile.id;
    if (typeof localStorage < "u") {
      const s = localStorage.getItem("twerenbold_current_user_id") || localStorage.getItem("twerenbold_userId");
      if (s) return s;
      const l = Le.getLastUserId();
      return l && console.warn("⚠️ Favorites: Using fallback userId from favorites cache", l), l;
    }
    return null;
  }
  _mapToUiItem(t) {
    var r;
    const i = t.trip || t.tripObject || t;
    return {
      ...t,
      // Keep wrapper props (e.g. syncStatus)
      ...i,
      // Spread trip properties
      // Explicit mappings
      id: i.id || t.tripId || t.id,
      // KK-234: eindeutiger Schlüssel je Eintrag (Reisecode) — trip.id ist es nicht
      key: Le.favKey(t) || i.id || t.tripId || t.id,
      image: i.imagePreview || i.image,
      price: i.startingPrice || i.price,
      link: i.tripUrl || i.link,
      code: i.tripCode || i.code || t.tripCode,
      // Map code for display
      // Ensure brand is present and lowercase for logic checks
      brand: (((r = i.provider) == null ? void 0 : r.name) || i.brand || "").toLowerCase(),
      // Ensure provider object exists for sorting logic
      provider: i.provider || { name: i.brand || "Twerenbold" },
      date: i.departureDates || i.date
    };
  }
  getText(t, i = null) {
    return O(t, "merkliste", i, this.theme);
  }
  async handleRemove(t) {
    const i = this.merkliste.find((o) => o.key === t), r = i ? i.title : "Reise";
    this.isRemoving = t;
    try {
      if (!i)
        throw new Error("Item not found");
      await new Promise((a) => setTimeout(a, 500));
      const o = this._userId();
      await Le.removeFavoriteLocal(o, i), this.merkliste = this.merkliste.filter((a) => a.key !== t);
    } catch (o) {
      console.error("Error removing item:", o), this._showError(
        "Entfernen fehlgeschlagen",
        `"${r}" konnte nicht aus Ihrer Merkliste entfernt werden. Bitte versuchen Sie es erneut.`
      );
    } finally {
      this.isRemoving = null;
    }
  }
  async removeFromAPI(t, i) {
    try {
      console.log("Removing item from API:", t), await new Promise((r) => setTimeout(r, 500)), this.merkliste = this.merkliste.filter((r) => r.id !== t), this._showSuccess(
        "Aus Merkliste entfernt",
        `"${i}" wurde erfolgreich aus Ihrer Merkliste entfernt.`
      );
    } catch (r) {
      throw console.error("Error removing item:", r), r;
    }
  }
  render() {
    return j("favorites", this.apiMode, this.theme) ? this.needsAuth || this.showAuthOverlay ? u`<div class="merkliste-page merkliste-page--auth">${this.renderAuthOverlay()}</div>` : u`
      <div class="merkliste-page">
        <div class="merkliste-header">
          <h1 class="merkliste-title page-title">${this.getText("pageTitle")}</h1>
          <p class="merkliste-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>
        </div>

        ${this.isLoading ? u`
          <div class="merkliste-list">
            ${Array.from({ length: 6 }).map((t, i) => u`
              <div class="skeleton-merkliste-item" key=${i}>
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                  <div class="skeleton-brand"></div>
                  <div class="skeleton-title"></div>
                  <div class="skeleton-sub"></div>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-end;">
                  <div class="skeleton-price"></div>
                  <div style="width: 3.5rem; height: 2rem; background: #eef2f6; border-radius: 8px;"></div>
                </div>
              </div>
            `)}
          </div>
        ` : this.merkliste.length === 0 ? this.renderEmptyState() : this.renderMerklisteGrid()}
      </div>

      ${this.isLoading ? u`<loader-component overlay message=${this.getText("loading")}></loader-component>` : ""}
      <auth-notification-component></auth-notification-component>
      ${this.renderAuthOverlay()}
    ` : u``;
  }
  renderEmptyState() {
    var i, r;
    const t = ((r = (i = ge(this.apiMode, this.theme)) == null ? void 0 : i.favorites) == null ? void 0 : r.websiteWishlist) || null;
    return u`
      <div class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="empty-title">${this.getText("emptyTitle")}</h3>
        <p class="empty-text">${this.getText("emptyText")}</p>
        ${t ? u`<a class="btn btn-primary empty-link" href="${t.url}">${t.label}</a>` : ""}
      </div>
    `;
  }
  renderMerklisteGrid() {
    const t = (a) => {
      var n, s;
      return a.brand || ((n = a.provider) == null ? void 0 : n.code) || ((s = a.provider) == null ? void 0 : s.name);
    }, i = Li(this.merkliste, this.theme, {
      getProvider: t,
      getDate: (a) => a.departureDate || a.date,
      getPrice: (a) => a.price,
      debug: !0
    }), r = i.filter((a) => Je(t(a), this.theme) === 1), o = i.filter((a) => Je(t(a), this.theme) !== 1);
    return u`
      <div class="merkliste-list ${this._suppressTransitions ? "no-transition" : ""}">
        ${r.map((a) => this.renderMerklisteItem(a))}
        ${r.length > 0 && o.length > 0 ? u`
          <div class="group-divider">
            <p class="group-divider-title page-subtitle">${this.getText("additionalTripsHeadline", "Weitere Reisen der Twerenbold Gruppe")}</p>
          </div>
        ` : ""}
        ${o.map((a) => this.renderMerklisteItem(a))}
      </div>
    `;
  }
  renderMerklisteItem(t) {
    const i = this.isRemoving === t.key;
    return u`
      <div class="merkliste-item ${i ? "removing" : ""}">
        <img src="${t.image}" alt="Bild einer Reise nach ${t.title}" class="item-image" />
        <div class="item-content">
          ${this._renderProviderHtml(t.provider)}
          <h3 class="item-title">${t.title}</h3>
          ${t.code ? Mr(t.id) : ""}
          <p class="item-duration">${t.duration} ${this.getText("days")}</p>
        </div>

        <div class="item-meta">
        <div class="item-price">
          <p class="price-label">ab</p>
          <p class="price-amount">${Pi(t.price)}</p>
        </div>
          <div class="item-actions">
            <a href="${t.link}" target="_blank" class="btn btn-primary">
              ${this.getText("viewTrip")}
            </a>
            <button
              class="btn btn-remove"
              @click=${() => this.handleRemove(t.key)}
              ?disabled=${i}
            >
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
  _renderProviderHtml(t) {
    if (t && typeof t == "object") {
      const i = Ct(t.name || t.code);
      return u`
        <span target="_blank" style="color: var(--text-secondary, #6b7280); text-decoration:none; white-space:nowrap; display:block; margin-bottom:0.25rem;" class="item-brand-simple with-favicon">
        <favicon-component brand=${t.name} size=24 alt="${t.name}"></favicon-component>
        <strong>${i}</strong>
        </span>
      `;
    }
    return u`
      <span class="item-brand-simple" style="color: var(--text-secondary, #6b7280); display:block; margin-bottom:0.25rem;">
        <strong>${Ct(t)}</strong>
      </span>
    `;
  }
};
N(ct, "properties", {
  merkliste: { type: Array },
  isLoading: { type: Boolean },
  isRemoving: { type: String },
  languageConfig: { type: Object },
  demoData: { type: Object }
}), N(ct, "styles", [
  at(ct, ct, "styles"),
  ie`
    :host {
      display: block;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      color: var(--text-color, #111827);
      max-width: var(--container-width, 1200px);
      margin: 0 auto;
      padding: var(--component-padding, 2rem);
    }

    .merkliste-page {
      margin: 0 auto;
    }

    /* Session required: the overlay is the sole content (see render()). */
    .merkliste-page--auth {
      position: relative;
    }
    .merkliste-page--auth .auth-overlay {
      position: relative;
      background: transparent;
      backdrop-filter: none;
    }

    .merkliste-header {
      margin-bottom: 3rem;
    }

    /* Title and subtitle styles removed to avoid empty rulesets */

    .success-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      margin-bottom: 2rem;
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      border-radius: var(--border-radius, 8px);
      color: #166534;
    }

    .success-icon {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
      color: #16a34a;
    }

    .success-text {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .merkliste-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .group-divider {
      margin: 1rem 0 0.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color, #e5e7eb);
    }

    .group-divider-title {
      margin: 0;
    }

    .merkliste-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 12px);
      background: var(--bg-color, #ffffff);
      /* Sequence: Fade out opacity (0.2s), THEN collapse box model properties (0.3s delay) */
      transition: 
        opacity 0.2s ease-out,
        max-height 0.3s ease-in 0.2s,
        margin 0.3s ease-in 0.2s,
        padding 0.3s ease-in 0.2s,
        border-width 0.3s ease-in 0.2s,
        transform 0.2s ease-out;
        
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden; /* Ensure content doesn't spill during collapse */
      max-height: 600px; /* Explicit max-height for transition to work from */
    }

    .merkliste-item:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: var(--primary-color, #009553);
    }

    .merkliste-item.removing {
      opacity: 0;
      max-height: 0;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
      border-width: 0;
      transform: scale(0.98);
    }

    .item-image {
      width: 12rem;
      height: 8rem;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .item-brand {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      border: 1px solid #efefef;
      padding: 0.25rem 0.75rem;
      border-radius: 10px;
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      align-self: flex-start;
      margin-bottom: 0.5rem;
    }

    .item-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-color, #111827);
      margin: 0;
      line-height: 1.3;
    }

    .item-duration {
      color: var(--text-secondary, #6b7280);
      margin: 0;
      font-size: 0.875rem;
    }

    .item-price {
      text-align: right;
      display: flex;

      align-items: baseline;
      gap: 0.25rem;
      flex-shrink: 0;
      justify-content: end;
    }

    .price-label {
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      margin: 0;
    }

    .price-amount {
      font-weight: 700;
      color: var(--primary-color, #009553);
      margin: 0;
    }

    .item-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

          .item-meta{
        gap: 20px;
        display: flex;
        flex-direction: column;
    
    }

    .btn-remove {
      background: transparent;
      color: var(--text-secondary, #6b7280);
      border: 1px solid var(--border-color, #e5e7eb);
      padding: 0.5rem;
      min-width: auto;
      width: 3rem;
      height: 3rem;
      border-radius: var(--border-radius, 8px);
    }

    .btn-remove:hover {
      color: var(--error-color, #ef4444);
      border-color: var(--error-color, #ef4444);
      background: var(--error-bg, rgba(239, 68, 68, 0.1));
    }

    .remove-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: var(--border-radius, 12px);
    }

    .remove-text {
      color: var(--primary-color, #009553);
      font-weight: 500;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-secondary, #6b7280);
    }

    .empty-icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1rem;
      color: var(--border-color, #e5e7eb);
    }

    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color, #111827);
      margin: 0 0 0.5rem 0;
    }

    .empty-text {
      margin: 0;
      font-size: 0.875rem;
    }

    .empty-link {
      margin-top: 1.5rem;
    }

    .loading {
      text-align: center;
      padding: 4rem;
      color: var(--text-secondary, #6b7280);
    }

    /* Skeleton placeholders for merkliste items */
    .skeleton-merkliste-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: var(--border-radius, 12px);
      background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);
      background-size: 200% 100%;
      animation: skeleton-pulse 1.5s ease-in-out infinite;
    }

    .skeleton-image { width: 12rem; height: 8rem; background: #eef2f6; border-radius: 8px; flex-shrink:0; }
    .skeleton-content { flex: 1; display:flex; flex-direction:column; gap:0.5rem; }
    .skeleton-brand { width: 10rem; height: 1rem; background: #eef2f6; border-radius: 6px; }
    .skeleton-title { width: 70%; height: 1.25rem; background: #eef2f6; border-radius: 6px; }
    .skeleton-sub { width: 40%; height: 0.9rem; background: #f3f4f6; border-radius: 6px; }
    .skeleton-price { width: 6rem; height: 1.5rem; background: #eef2f6; border-radius: 6px; }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        padding: 1rem;
      }

      .merkliste-page {
        max-width: 100%;
      }

      .merkliste-title {
        font-size: 1.875rem;
      }



      .merkliste-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
      }

      .item-image {
        width: 100%;
        height: 12rem;
        order: -1;
      }

      .item-content {
        width: 100%;
        order: 0;
      }

      .item-brand {
        margin-bottom: 0.75rem;
      }

      .item-title {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }

      .item-price {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        order: 1;
        padding: 0.75rem 0;
        border-top: 1px solid var(--border-color, #e5e7eb);
      }

      .price-label {
        font-size: 1rem;
      }

      .price-amount {
        // font-size: 1.25rem;
      }

      .item-actions {
        width: 100%;
        justify-content: space-between;
        order: 2;
        gap: 1rem;
      }

      .btn {
        flex: 1;
        min-width: 0;
      }

      .btn-remove {
        flex: none;
        width: 3rem;
        height: 3rem;
      }

      .empty-state {
        padding: 3rem 1rem;
      }

      .empty-icon {
        width: 3rem;
        height: 3rem;
      }

      .empty-title {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      :host {
        padding: 0.75rem;
      }

      .merkliste-header {
        margin-bottom: 2rem;
      }




      .merkliste-item {
        padding: 0.75rem;
        gap: 0.75rem;
      }

      .item-image {
        height: 10rem;
        border-radius: 6px;
      }

      .item-brand {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }


      .item-title {
        font-size: 1rem;
        line-height: 1.4;
      }

      .item-duration {
        font-size: 0.75rem;
      }

      .item-actions {
        gap: 0.75rem;
      }

      .item-price{
      diplay: flex;}

      .btn {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }

      .btn-remove {
        width: 2.75rem;
        height: 2.75rem;
        padding: 0.5rem;
      }

      .btn-remove svg {
        width: 20px;
        height: 20px;
      }

      .price-amount {
        font-size: 1.125rem;
      }

      .empty-state {
        padding: 2rem 0.75rem;
      }

      .empty-icon {
        width: 2.5rem;
        height: 2.5rem;
      }

      .empty-title {
        font-size: 1rem;
      }

      .empty-text {
        font-size: 0.8rem;
      }
    }
  `
]);
let Ai = ct;
customElements.get("favorites-list") || customElements.define("favorites-list", Ai);
const lr = {
  100: "newsletter_twerenbold",
  110: "newsletter_velo",
  200: "newsletter_imbach",
  300: "newsletter_excellence",
  500: "newsletter_voegele"
}, Zo = {
  1: "twerenbold",
  2: "imbach",
  3: "excellence",
  5: "voegele"
}, si = [
  "M28.6892 14.1345C26.6291 15.3866 25.1967 16.2137 22.4803 17.1249C20.9659 17.6328 19.3869 18.0156 16.7324 18.2856C16.7324 18.2856 18.2861 18.7458 20.6153 18.8896C22.3114 18.9949 24.1662 19.0802 26.5671 18.8738C31.8474 18.4196 34.8145 17.3856 39.7792 13.5973C43.0706 11.0861 45.9938 8.77582 48.8267 7.3196C54.5524 4.37654 58.9996 5.38369 58.9996 5.38369C58.9996 5.38369 55.3206 4.27308 53.0552 4.01237C47.4281 3.36474 42.7894 4.33293 36.6484 8.5202C34.6068 9.91194 31.8062 12.2399 28.6892 14.1345Z",
  "M34.4194 1.51885C37.9943 0.500098 40.3301 0.836898 40.3301 0.836898C40.3301 0.836898 37.6511 0 33.0929 0C27.2045 0 22.6463 1.57081 16.5978 6.00256C14.2773 7.70327 10.4744 10.3838 7.19878 12.0826C3.04019 14.2393 0 14.4504 0 14.4504C0 14.4504 3.16554 14.9927 7.08037 14.8401C9.26026 14.7547 11.2316 14.2635 13.2107 13.5551C15.4928 12.7386 19.0432 10.5285 21.0436 9.06021C24.9478 6.19602 30.3154 2.68837 34.4194 1.51885Z",
  "M35.1285 7.80764C35.5739 7.48569 36.2825 6.99904 37.2076 6.41869C38.603 5.54328 40.7834 4.27077 42.979 3.57026C46.3684 2.48888 49.725 2.72502 49.725 2.72502C49.725 2.72502 44.7667 1.2957 39.4564 1.94472C34.938 2.49723 31.6138 3.57676 24.5552 8.36387C21.6459 10.3369 17.2828 13.9271 12.1895 15.4381C9.67842 16.1827 7.51379 16.2764 7.51379 16.2764C7.51379 16.2764 10.6548 17.3791 15.9207 16.8994C18.645 16.6512 20.4743 16.2996 22.5371 15.567C25.2725 14.5956 27.1536 13.3764 28.97 12.2269C30.9348 10.9836 34.3445 8.37454 35.1285 7.80764Z"
], Wo = {
  twerenbold: "twr",
  imbach: "imbach",
  excellence: "excellence",
  voegele: "voegele"
};
function Er(c) {
  const e = Math.floor(Number(c) / 100);
  return Zo[e] || "";
}
function Fo(c) {
  return Wo[Er(c)] || "mail";
}
const dt = class dt extends Oe {
  constructor() {
    super(), this.apiBaseUrl = "/api/v1", this.subscriptions = {
      general: !0,
      accommodations: !0,
      flights: !1,
      rentalCars: !1
    }, this.isLoading = !1, this.isSaving = !1, this.showSuccess = !1, this.languageConfig = {}, this.languageConfig = {}, this.newsletterFeeds = [], this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = Gt(), this.voegeleBaseUrl = "https://staging.voegele-reisen.ch", this.NEWSLETTER_CODES = {
      general: 100,
      // Twerenbold
      velo: 110,
      // optional - add UI to enable
      accommodations: 200,
      // Imbach
      flights: 300,
      // Excellence (Schiffpost)
      rentalCars: 500
      // Vögele
    };
  }
  async connectedCallback() {
    super.connectedCallback(), await this.loadConfigurations(), await this.loadData();
  }
  async loadConfigurations() {
    try {
      const e = await fetch(`${this.demoBaseUrl}/config/language-config.json`);
      this.languageConfig = await e.json();
    } catch {
      this.languageConfig = { twerenbold: { newsletter: {} } };
    }
  }
  async loadData() {
    var t, i;
    const e = ((i = (t = this.appState) == null ? void 0 : t.accountProfile) == null ? void 0 : i.id) || null;
    if (!e) {
      console.log("Newsletter: No user ID yet, keeping loader active..."), this.isLoading = !0;
      return;
    }
    this.isLoading = !0;
    try {
      const { apiService: r } = await Promise.resolve().then(() => ne);
      this._lastLoadedUserId = e;
      const o = await r.getNewsletterSubscriptions(e);
      this.newsletterFeeds = Array.isArray(o) ? o : [];
      const a = {};
      if (Array.isArray(o))
        for (const n of o) {
          const s = Number((n == null ? void 0 : n.newsletterCode) || (n == null ? void 0 : n.id)), l = !!(n != null && n.isRegistered);
          a[s] = l;
        }
      this.subscriptions = a;
    } catch (r) {
      console.error("Error loading newsletter data:", r);
    } finally {
      this.isLoading = !1;
    }
  }
  async updated(e) {
    var t;
    if ((t = super.updated) == null || t.call(this, e), e.has("apiMode")) {
      const i = e.get("apiMode");
      i !== void 0 && i !== this.apiMode && await this.loadData();
    }
  }
  appContextChanged() {
    var t, i;
    super.appContextChanged();
    const e = ((i = (t = this.appState) == null ? void 0 : t.accountProfile) == null ? void 0 : i.id) || null;
    e && e !== this._lastLoadedUserId && (console.log("Newsletter: Profile ID available/changed, reloading subscriptions...", {
      old: this._lastLoadedUserId,
      new: e
    }), this.loadData());
  }
  async loadSubscriptionsFromAPI() {
    var e, t;
    try {
      const { apiService: i } = await Promise.resolve().then(() => ne), r = ((t = (e = this.appState) == null ? void 0 : e.accountProfile) == null ? void 0 : t.id) || null;
      if (!r) {
        console.warn("NewsletterSignup: No user id available for loading subscriptions.");
        return;
      }
      const o = await i.getNewsletterSubscriptions(r);
      this.newsletterFeeds = Array.isArray(o) ? o : [];
      const a = {};
      if (Array.isArray(o))
        for (const n of o) {
          const s = Number((n == null ? void 0 : n.newsletterCode) || (n == null ? void 0 : n.id)), l = !!(n != null && n.isRegistered);
          a[s] = l;
        }
      this.subscriptions = a;
    } catch (i) {
      console.error("Failed to load subscriptions from API:", i);
    }
  }
  getText(e, t = null, i = null) {
    var r, o;
    if (!t) {
      const a = (o = (r = this.languageConfig) == null ? void 0 : r[this.theme]) == null ? void 0 : o.newsletter;
      return a && a[e] ? a[e] : super.getText(e, "newsletter", i);
    }
    return super.getText(e, t, i);
  }
  /**
   * Map a numeric newsletter code back to our UI category key (if any)
   * Example: 100 -> 'general', 200 -> 'accommodations'
   */
  _categoryForCode(e) {
    for (const [t, i] of Object.entries(this.NEWSLETTER_CODES))
      if (Number(i) === Number(e)) return t;
    return null;
  }
  async handleToggle(e, t) {
    const i = t.target.checked;
    this.subscriptions = { ...this.subscriptions, [String(e)]: i }, clearTimeout(this._toggleTimeout), this._toggleTimeout = setTimeout(async () => {
      var r, o, a, n, s, l, g, p;
      try {
        const { apiService: h } = await Promise.resolve().then(() => ne), m = ((o = (r = this.appState) == null ? void 0 : r.accountProfile) == null ? void 0 : o.id) || null;
        if (i ? await h.registerNewsletter(m, Number(e)) : await h.removeNewsletter(m, Number(e)), Number(e) === 500) {
          let v = ((n = (a = this.appState) == null ? void 0 : a.accountProfile) == null ? void 0 : n.email) || ((l = (s = this.appState) == null ? void 0 : s.authUser) == null ? void 0 : l.username) || ((p = (g = this.appState) == null ? void 0 : g.authUser) == null ? void 0 : p.email);
          if (v)
            try {
              console.log(`🦅 Sending additional Vögele request for ${v} (${i ? "subscribe" : "unsubscribe"})`), await this._sendVoegeleRequest(i ? "subscribe" : "unsubscribe", v);
            } catch (y) {
              console.error("Failed to update Vögele specific newsletter:", y);
            }
          else
            console.warn("Skipping Vögele request: No email address available");
        }
        const b = lr[Number(e)];
        this.apiMode === "demo" && (this.isSaving = !0, await new Promise((v) => setTimeout(v, 500)), this.isSaving = !1), this.showSuccessMessage();
      } catch (h) {
        console.error("Failed to update newsletter subscription:", h), this._showError("Fehler", "Abonnement konnte nicht aktualisiert werden"), this.subscriptions = { ...this.subscriptions, [String(e)]: !i };
      }
    }, 1500);
  }
  /**
   * Helper to perform the Vögele API request
   */
  async _sendVoegeleRequest(e, t) {
    const r = `${this.voegeleBaseUrl || "https://staging.voegele-reisen.ch"}/wp-json/viamonda/v1/hubspot/newsletter`, o = await fetch(r, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action: e, email: t })
    });
    if (!o.ok) {
      const a = await o.text();
      throw new Error(`Vögele API Error: ${o.status} ${o.statusText} - ${a}`);
    }
    return await o.json();
  }
  async saveSubscriptions() {
    var e, t;
    this.isSaving = !0;
    try {
      const { apiService: i } = await Promise.resolve().then(() => ne), r = ((t = (e = this.appState) == null ? void 0 : e.accountProfile) == null ? void 0 : t.id) || null;
      if (!r)
        throw new Error("No user ID available");
      for (const [o, a] of Object.entries(this.subscriptions)) {
        const n = Number(o);
        if (n)
          try {
            a ? await i.registerNewsletter(r, n) : await i.removeNewsletter(r, n);
            const s = lr[n];
            s && Q.updateUserProperties({ [s]: a });
          } catch (s) {
            console.warn("Failed to update newsletter subscription for", o, s);
          }
      }
      this.showSuccessMessage(this.subscriptions);
    } catch (i) {
      console.error("Error saving subscriptions:", i);
    } finally {
      this.isSaving = !1;
    }
  }
  async _updateNewsletterSubscription(e, t) {
    var o, a;
    const { apiService: i } = await Promise.resolve().then(() => ne), r = ((a = (o = this.appState) == null ? void 0 : o.accountProfile) == null ? void 0 : a.id) || null;
    if (!r) throw new Error("No user id available");
    if (!e) throw new Error("Unknown newsletter code");
    this.isSaving = !0;
    try {
      t ? await i.registerNewsletter(r, e) : await i.removeNewsletter(r, e), this._showSuccess(this.getText("settingsSaved"), this.getText("settingsSavedDescription"));
    } finally {
      this.isSaving = !1;
    }
  }
  showSuccessMessage(e) {
    this._showSuccess(this.getText("settingsSaved"), this.getText("settingsSavedDescription"));
  }
  render() {
    return j("newsletter", this.apiMode, this.theme) ? this.needsAuth || this.showAuthOverlay ? u`<div class="newsletter-page newsletter-page--auth">${this.renderAuthOverlay()}</div>` : this.isLoading ? u`
        <div class="newsletter-page">
           <div class="newsletter-header">
                  <h1 class="newsletter-title page-title">${this.getText("pageTitle")}</h1>
          <p class="newsletter-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>

  
            
        </div>

        </div>
        <!-- Render skeletons for newsletter items while loading -->
        <div class="newsletter-grid" style="margin-top: 1.5rem;">
          <div class="newsletter-main">
            ${Array.from({ length: 6 }).map((e, t) => u`
              <div class="skeleton-subscription-item" key=${t}>
                <div class="skeleton-subscription-icon"></div>
                <div style="flex:1; display:flex; flex-direction:column; gap:0.5rem;">
                  <div class="skeleton-subscription-title"></div>
                  <div class="skeleton-subscription-text"></div>
                </div>
                <div class="skeleton-subscription-switch"></div>
              </div>
            `)}
          </div>
        </div>
      ` : u`
      <div class="newsletter-page">
        <div class="newsletter-header">
          <h1 class="newsletter-title page-title">${this.getText("pageTitle")}</h1>
          <p class="newsletter-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>

              ${this.showSuccess ? u`
                <div class="success-message">
                  <div class="success-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p class="success-text">${this.getText("settingsSaved")}</p>
                </div>
              ` : ""}
        </div>

        <div class="newsletter-grid">
          <div class="newsletter-main">
            ${(() => {
      const e = this.newsletterFeeds.length ? this.newsletterFeeds : Object.keys(this.NEWSLETTER_CODES).map((i) => ({
        id: this.NEWSLETTER_CODES[i],
        newsletterCode: this.NEWSLETTER_CODES[i],
        newslettername: this.getText(`${i}Title`, "newsletter") || this.getText(`${i}Title`),
        newsletterdescription: this.getText(`${i}Description`, "newsletter") || this.getText(`${i}Description`),
        category: i
      }));
      return Li(e, this.theme, {
        getProvider: (i) => {
          const r = Number(i.newsletterCode || i.id);
          return Er(r);
        },
        priceFallback: !1,
        debug: !0
      }).map((i) => {
        const r = Number(i.newsletterCode || i.id), o = Fo(r), a = i.category || this._categoryForCode(r), n = i.newslettername || (a ? this.getText(`${a}Title`, "newsletter") : null) || `Newsletter ${r}`, s = i.newsletterdescription || (a ? this.getText(`${a}Description`, "newsletter") : "") || "";
        return this.renderSubscriptionItem(String(r), o, n, s);
      });
    })()}
          </div>

          <!--
          <div class="newsletter-sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">${this.getText("settingsTitle")}</h3>
              <p class="sidebar-text">${this.getText("settingsDescription")}</p>

            </div>
          </div>
          -->
        </div>


      </div>

   

      <auth-notification-component></auth-notification-component>
      ${this.renderAuthOverlay()}
    ` : u``;
  }
  renderSubscriptionItem(e, t, i, r) {
    const o = this.subscriptions[e], a = this.isSaving;
    return u`
      <div class="subscription-item">
        <div class="subscription-content">
          <div class="subscription-icon">
          <!-- favicon -->
            ${this.renderIcon(t)}
          </div>
          <div class="subscription-text">
            <h3>${i}</h3>
            <p>${r}</p>
          </div>
        </div>
        <div class="subscription-toggle">
          <label class="custom-switch">
            <input
              type="checkbox"
              .checked=${o}
              ?disabled=${a}
              @change=${(n) => this.handleToggle(e, n)}
            />
            <span class="switch-slider ${a ? "disabled" : ""}"></span>
          </label>
        </div>
      </div>
    `;
  }
  renderIcon(e) {
    let t = 32;
    const i = {
      mail: u`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z"></path>
      </svg>`,
      home: u`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
      </svg>`,
      plane: u`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M235.58,128.84,160,91.06V48a32,32,0,0,0-64,0V91.06L20.42,128.84A8,8,0,0,0,16,136v32a8,8,0,0,0,9.57,7.84L96,161.76v18.93L82.34,194.34A8,8,0,0,0,80,200v32a8,8,0,0,0,11,7.43l37-14.81,37,14.81A8,8,0,0,0,176,232V200a8,8,0,0,0-2.34-5.66L160,180.69V161.76l70.43,14.08A8,8,0,0,0,240,168V136A8,8,0,0,0,235.58,128.84ZM224,158.24l-70.43-14.08A8,8,0,0,0,144,152v32a8,8,0,0,0,2.34,5.66L160,203.31v16.87l-29-11.61a8,8,0,0,0-5.94,0L96,220.18V203.31l13.66-13.65A8,8,0,0,0,112,184V152a8,8,0,0,0-9.57-7.84L32,158.24v-17.3l75.58-37.78A8,8,0,0,0,112,96V48a16,16,0,0,1,32,0V96a8,8,0,0,0,4.42,7.16L224,140.94Z"></path>
      </svg>`,
      car: u`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"></path>
      </svg>`,
      // icons for stakeholder newsletters: use favicon component for mapping
      twr: u`<favicon-component brand="twr" size=${t} alt="Twerenbold"></favicon-component>`,
      imbach: u`<favicon-component brand="imbach" size=${t} alt="Imbach"></favicon-component>`,
      // KK-230: Schiffspost Excellence trägt die goldene Welle der Website
      // (Sprite-Symbol «wave» von excellence.ch), nicht das Favicon.
      excellence: u`<svg class="wave-icon" viewBox="0 0 59 19" width=${t} height=${Math.round(t * 19 / 59)} role="img" aria-label="Schiffspost Excellence"><path d="${si[0]}" fill="currentColor"></path><path d="${si[1]}" fill="currentColor"></path><path d="${si[2]}" fill="currentColor"></path></svg>`,
      voegele: u`<favicon-component brand="vogele" size=${t} alt="Vögele"></favicon-component>`
    };
    if (typeof e == "string") {
      const r = e.trim().toLowerCase();
      if (r.startsWith("http") || r.includes("."))
        return u`<favicon-component url="${e}" size=${t} alt="${e}"></favicon-component>`;
    }
    return i[e] || i.mail;
  }
};
N(dt, "properties", {
  subscriptions: { type: Object },
  newsletterFeeds: { type: Array },
  isLoading: { type: Boolean },
  isSaving: { type: Boolean },
  showSuccess: { type: Boolean },
  languageConfig: { type: Object },
  demoData: { type: Object },
  voegeleBaseUrl: { type: String }
}), N(dt, "styles", [
  at(dt, dt, "styles"),
  ie`
    :host {
      display: block;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      color: var(--text-color, #111827);
      max-width: var(--container-width, 1200px);
      margin: 0 auto;
      padding: var(--component-padding, 2rem);
    }

    .newsletter-page {
      margin: 0 auto;
    }

    /* Session required: the overlay is the sole content (see render()). */
    .newsletter-page--auth {
      position: relative;
    }
    .newsletter-page--auth .auth-overlay {
      position: relative;
      background: transparent;
      backdrop-filter: none;
    }

    .newsletter-header {
      margin-bottom: 3rem;
    }




    .newsletter-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }


    .newsletter-main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .newsletter-sidebar {
      position: sticky;
      top: 2rem;
    }

    .subscription-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      background: var(--bg-color, #ffffff);
      transition: all 0.2s ease-in-out;
    }

    .subscription-item:hover {
      border-color: var(--primary-color, #009553);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .subscription-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .subscription-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: var(--bg-secondary, #f9fafb);
      color: var(--primary-color, #009553);
      flex-shrink: 0;
    }
    .subscription-icon .wave-icon {
      width: 2rem;
      height: auto;
      color: var(--theme-primary, #b59752);
    }

    .subscription-text h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-color, #111827);
    }

    .subscription-text p {
      margin: 0;
      color: var(--text-secondary, #6b7280);
      font-size: 0.875rem;
    }

    .subscription-toggle {
      flex-shrink: 0;
    }

    .custom-switch {
      position: relative;
      display: inline-block;
      width: 3rem;
      height: 1.75rem;
    }

    .custom-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 1.75rem;
    }

    .switch-slider:before {
      position: absolute;
      content: "";
      height: 1.25rem;
      width: 1.25rem;
      left: 0.25rem;
      bottom: 0.25rem;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .switch-slider {
      background-color: var(--primary-color, #009553);
    }

    input:checked + .switch-slider:before {
      transform: translateX(1.25rem);
    }

    .switch-slider.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Skeleton placeholders for subscription items */
    .skeleton-subscription-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-radius: var(--border-radius, 8px);
      background: linear-gradient(90deg, var(--bg-secondary, #f3f4f6) 25%, var(--bg-color, #ffffff) 50%, var(--bg-secondary, #f3f4f6) 75%);
      background-size: 200% 100%;
      animation: skeleton-pulse 1.2s ease-in-out infinite;
      gap: 1rem;
    }

    .skeleton-subscription-icon { width: 3rem; height: 3rem; border-radius: 50%; background: #eef2f6; flex-shrink:0; }
    .skeleton-subscription-title { width: 40%; height: 1rem; background: #eef2f6; border-radius: 4px; }
    .skeleton-subscription-text { width: 55%; height: 0.8rem; background: #f3f4f6; border-radius: 4px; }
    .skeleton-subscription-switch { width: 2.5rem; height: 1.25rem; background: #eef2f6; border-radius: 999px; }

    .sidebar-card {
      padding: 1.5rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: var(--border-radius, 8px);
      background: var(--bg-secondary, #f9fafb);
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color, #111827);
      margin: 0 0 0.5rem 0;
    }

    .sidebar-text {
      margin: 0 0 1rem 0;
      color: var(--text-secondary, #6b7280);
      font-size: 0.875rem;
    }

    .success-message {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      border-radius: var(--border-radius, 8px);
      color: #166534;
    }

    .success-icon {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
      color: #16a34a;
    }

    .success-text {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary, #6b7280);
    }

    .saving-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius, 8px);
      z-index: 10;
    }

    .saving-text {
      color: var(--primary-color, #009553);
      font-weight: 500;
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        padding: 1rem;
      }

      .newsletter-page {
        max-width: 100%;
      }

      .newsletter-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .newsletter-sidebar {
        position: static;
      }

      .subscription-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        position: relative;
      }

      .subscription-content {
        width: 100%;
      }

      .subscription-toggle {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  `
]);
let _i = dt;
customElements.get("newsletter-signup") || customElements.define("newsletter-signup", _i);
class Si extends $e {
  constructor() {
    super(), this.theme = "twerenbold", this.apiMode = "demo", this.userId = "", this.clubData = null, this.languageConfig = null, this.loading = !1, this.error = null, this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = Gt();
  }
  async connectedCallback() {
    if (super.connectedCallback(), await Bt(), this.theme && St(this.theme), !j("clubStatus", this.apiMode, this.theme)) {
      console.log("ClubStatus component disabled for this mode/theme; skipping load.");
      return;
    }
    await this.loadClubData();
  }
  getText(e, t = e) {
    return O(e, "club", t, this.theme);
  }
  async loadClubData() {
    this.apiMode === "api" && this.userId ? await this.loadFromAPI() : await this.loadDemoData();
  }
  async loadFromAPI() {
    this.loading = !0, this.error = null;
    try {
      const e = await fetch(`${this.apiBaseUrl}/api/user/${this.userId}/club`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json"
        }
      });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}: ${e.statusText}`);
      const t = await e.json();
      if (t.success)
        this.clubData = t.data, this._showInfo(
          "Club-Daten geladen",
          "Ihre aktuellen Club-Informationen wurden erfolgreich geladen."
        );
      else
        throw new Error(t.message || "Failed to load club data");
    } catch (e) {
      console.error("Error loading club data from API:", e), this.error = `Fehler beim Laden der Club-Daten: ${e.message}`, this._showError(
        "Laden fehlgeschlagen",
        "Die Club-Daten konnten nicht geladen werden. Es werden Demo-Daten angezeigt."
      ), await this.loadDemoData();
    } finally {
      this.loading = !1;
    }
  }
  async loadDemoData() {
    try {
      const t = await (await fetch(`${this.demoBaseUrl}/config/demo-data.json`)).json();
      this.clubData = t.clubMembership, this.error && this._showInfo(
        "Demo-Modus",
        "Es werden Demo-Daten für die Club-Übersicht angezeigt."
      );
    } catch (e) {
      console.error("Error loading demo data:", e), this.error = "Fehler beim Laden der Demo-Daten", this._showError(
        "Kritischer Fehler",
        "Weder echte noch Demo-Daten konnten geladen werden. Bitte laden Sie die Seite neu."
      );
    }
  }
  isApiMode() {
    return String(this.apiMode).toLowerCase() === "api";
  }
  // (Removed the duplicate local getText method.)
  /**
   * Show notification - available in this component
   */
  _showNotification(e) {
    var i;
    const t = ((i = this.shadowRoot) == null ? void 0 : i.querySelector("auth-notification-component")) || document.querySelector("auth-notification-component");
    t ? t.showNotification(e) : console.warn("⚠️ No notification component found for displaying:", e);
  }
  _showSuccess(e, t, i = 4e3) {
    this._showNotification({
      type: "success",
      title: e,
      message: t,
      autoHideDelay: i
    });
  }
  _showError(e, t, i = !0) {
    this._showNotification({
      type: "error",
      title: e,
      message: t,
      persistent: i
    });
  }
  _showInfo(e, t, i = 5e3) {
    this._showNotification({
      type: "info",
      title: e,
      message: t,
      autoHideDelay: i
    });
  }
  formatDate(e) {
    return new Date(e).toLocaleDateString("de-CH");
  }
  getBenefitIcon(e) {
    return "✓";
  }
  getBenefitColor(e) {
    return "#718096";
  }
  renderProgressBar() {
    if (!this.clubData.progressToNext)
      return u`
        <div class="progress-text">
          ${this.getText("club.maxStatusReached", "Höchster Status erreicht!")}
        </div>
      `;
    const { percentage: e, daysNeeded: t, nextMilestone: i } = this.clubData.progressToNext;
    return u`
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${e}%"></div>
      </div>
      <div class="progress-text">
        ${this.getText("club.progressText", "Noch")} <strong>${t}</strong> 
        ${this.getText("club.daysToNext", "Reisetage bis zum nächsten Status:")} 
        <strong>${i.name}</strong>
      </div>
    `;
  }
  // (render logic continues below)
  renderStatusLevels() {
    return this.clubData.allStatuses ? u`
      <div class="status-levels">
        ${this.clubData.allStatuses.map((e, t) => {
      const i = e.level === this.clubData.currentStatus.level, r = this.clubData.totalTravelDays >= e.minTravelDays;
      return u`
            <div class="status-level ${i ? "current" : ""} ${r ? "achieved" : ""}">
              <div class="level-icon" style="background-color: ${e.color}">
                ${e.level === "excellence" ? "E" : e.level === "royal" ? "R" : "A"}
              </div>
              <div class="level-name">${e.name}</div>
              <div class="level-requirements">
                ${e.minTravelDays === 0 ? "Bezahlte Mitgliedschaft" : e.minTravelDays === 60 ? "Ab 60 Reisetagen" : "Ab 200 Reisetagen"}
              </div>
              <div class="level-description">${e.description}</div>
            </div>
          `;
    })}
      </div>
    ` : "";
  }
  render() {
    return j("clubStatus", this.apiMode, this.theme) ? this.loading ? u`<div class="loading">${this.getText("club.loading", "Lade Club-Daten...")}</div>` : this.error ? u`<div class="error">${this.error}</div>` : this.clubData ? u`
      <div class="club-container">
        <!-- Club Header -->
        <div class="club-header">
          <div class="member-id">${this.getText("club.memberId", "Mitglied-Nr.")}: ${this.clubData.memberId}</div>
          <div class="current-status">
            <div class="status-icon" style="background-color: ${this.clubData.currentStatus.color}">
              ${this.clubData.currentStatus.level === "excellence" ? "E" : this.clubData.currentStatus.level === "royal" ? "R" : "A"}
            </div>
            <div class="status-name">${this.clubData.currentStatus.name}</div>
          </div>
          <div class="member-since">
            ${this.getText("club.memberSince", "Mitglied seit")}: ${this.formatDate(this.clubData.memberSince)}
          </div>
        </div>

        <!-- Club Introduction -->
        <div class="club-intro">
          <h1 class="intro-title-">Willkommen im Excellence Reiseclub</h1>
          <div class="intro-text">
            Wir freuen uns, dass Sie sich für unseren Excellence Reiseclub interessieren. Mit dem Reiseclub bedanken wir uns bei Ihnen für Ihr Vertrauen in unsere Unternehmung und bieten Ihnen mit der Mitgliedschaft einen echten Mehrwert.
          </div>
          <div class="intro-text">
            Als Clubmitglied profitieren Sie von exklusiven Vorteilen und einem persönlichen Service, der Ihre Reiseerfahrung noch angenehmer macht.
          </div>
        </div>

        <!-- Status Levels Overview -->
        ${this.renderStatusLevels()}

        <!-- Progress Section -->
        <div class="progress-section">
          <div class="progress-header">
            <div class="travel-days">
              <div class="travel-days-number">${this.clubData.totalTravelDays}</div>
              <div class="travel-days-label">${this.getText("club.totalTravelDays", "Gesamte Reisetage")}</div>
            </div>
            <div class="travel-days">
              <div class="travel-days-number">${this.clubData.currentYearTravelDays}</div>
              <div class="travel-days-label">${this.getText("club.currentYearTravelDays", "Dieses Jahr")}</div>
            </div>
          </div>
          ${this.renderProgressBar()}
        </div>

        <!-- Benefits Section -->
        <div class="benefits-section">
          <h2 class="section-title">${this.getText("club.benefits", "Ihre Vorteile")}</h2>
          <div class="benefits-grid">
            ${this.clubData.benefits.map((e) => u`
              <div class="benefit-card ${e.isActive ? "" : "inactive"}">
                <div class="benefit-header">
                  <!--div class="benefit-icon" style="background-color: ${this.getBenefitColor(e.type)}">
                    ${this.getBenefitIcon(e.type)}
                  </div-->
                  <div class="benefit-content">
                    <div class="benefit-name">${e.name}</div>
                    <div class="benefit-value">${e.value}</div>
                  </div>
                </div>
                <div class="benefit-description">${e.description}</div>
              </div>
            `)}
          </div>
        </div>

        <!-- Membership Info -->
        <div class="membership-info">
          <div class="membership-title">So funktioniert das Bonusprogramm</div>
          <div class="membership-text">
            Die Mitgliedschaft im Excellence Reiseclub kostet pro Person und Jahr CHF 135.– (2 Personen CHF 240.–). 
            Ein Eintritt ist jederzeit möglich. Die Mitgliedschaft beginnt mit Anmeldung und ist gültig für ein Jahr.
          </div>
        </div>
      </div>
      
      <auth-notification-component></auth-notification-component>
    ` : u`<div class="error">${this.getText("club.noData", "Keine Club-Daten verfügbar")}</div>` : u``;
  }
}
N(Si, "properties", {
  theme: { type: String },
  // `apiMode` supports values: 'api' | 'demo' | 'local'
  apiMode: { type: String, attribute: "api-mode" },
  userId: { type: String },
  clubData: { type: Object },
  languageConfig: { type: Object },
  loading: { type: Boolean },
  error: { type: String }
}), N(Si, "styles", [
  ut,
  ie`
    :host {
      display: block;
      font-family: var(--font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
      color: var(--text-color, #333);
      background-color: var(--bg-color, #fff);
      padding: var(--spacing-lg, 20px);
      max-width: 1200px;
      margin: 0 auto;
    }

    .club-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg, 20px);
    }

    .club-header {
      // background: linear-gradient(135deg, var(--primary-color, #4a5568) 0%, var(--primary-color-dark, var(--primary-color, #4a5568)) 100%);
      // color: white;
      // padding: var(--spacing-lg, 20px);
      // border-radius: var(--border-radius, 8px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-md, 15px);
    }

    .member-id {
      font-weight: 600;
      font-size: 1.1em;
    }

    .current-status {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 10px);
    }

    .status-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      color:#fff;
      background-color: var(--accent-color, #718096);
    }

    .status-name {
      font-weight: 700;
      font-size: 1.2em;
    }

    .member-since {
      font-size: 0.9em;
      opacity: 0.9;
    }

    .club-intro {
      // background-color: var(--card-bg, #f8f9fa);
      // padding: var(--spacing-lg, 20px);
      border-radius: var(--border-radius, 8px);
    }

    .intro-title {
      font-size: 1.3em;
      font-weight: 700;
      color: var(--primary-color, #4a5568);
      margin-bottom: var(--spacing-md, 15px);
    }

    .intro-text {
      margin-bottom: var(--spacing-md, 15px);
      line-height: 1.6;
      color: var(--text-color, #333);
    }

    .status-levels {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md, 15px);
    }

    .status-level {
      background-color: var(--card-bg, #f8f9fa);
      border: 2px solid transparent;
      border-radius: var(--border-radius, 8px);
      padding: var(--spacing-md, 15px);
      text-align: center;
      transition: all 0.3s ease;
      opacity: 0.5;
    }

    .status-level.current {
      border-color: var(--primary-color, #4a5568);
      background-color: var(--primary-color-light, rgba(74, 85, 104, 0.1));
    }

    .status-level.achieved {
      background-color: var(--success-bg, #f0fff4);
      border-color: var(--success-color, #38a169);
      opacity: 1;
    }

    .level-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      margin: 0 auto var(--spacing-sm, 10px);
      background-color: var(--accent-color, #718096);
      color: white;
    }

    .level-name {
      font-weight: 700;
      font-size: 1.1em;
      margin-bottom: var(--spacing-xs, 5px);
    }

    .level-requirements {
      font-size: 0.9em;
      color: var(--text-secondary, #666);
      margin-bottom: var(--spacing-xs, 5px);
    }

    .level-description {
      font-size: 0.85em;
      color: var(--text-secondary, #666);
      line-height: 1.4;
    }

    .progress-section {
      background-color: var(--card-bg, #f8f9fa);
      padding: var(--spacing-lg, 20px);
      border-radius: var(--border-radius, 8px);
      text-align: center;
    }

    .progress-header {
      display: flex;
      justify-content: center;
      gap: var(--spacing-xl, 30px);
      margin-bottom: var(--spacing-lg, 20px);
    }

    .travel-days {
      text-align: center;
    }

    .travel-days-number {
      font-size: 2.5em;
      font-weight: 700;
      color: var(--primary-color, #4a5568);
      line-height: 1;
    }

    .travel-days-label {
      font-size: 0.9em;
      color: var(--text-secondary, #666);
      margin-top: var(--spacing-xs, 5px);
    }

    .progress-bar {
      width: 100%;
      height: 12px;
      background-color: var(--border-color, #e2e8f0);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: var(--spacing-sm, 10px);
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color, #4a5568) 0%, var(--success-color, #38a169) 100%);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.9em;
      color: var(--text-secondary, #666);
    }

    .benefits-section {
      background-color: var(--card-bg, #f8f9fa);
      padding: var(--spacing-lg, 20px);
      border-radius: var(--border-radius, 8px);
    }

    .section-title {
      font-size: 1.4em;
      font-weight: 700;
      color: var(--primary-color, #4a5568);
      margin-bottom: var(--spacing-lg, 20px);
      text-align: center;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-md, 15px);
    }

    .benefit-card {
      background-color: white;
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--border-radius, 8px);
      padding: var(--spacing-md, 15px);
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .benefit-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .benefit-card.inactive {
      opacity: 0.6;
      background-color: var(--inactive-bg, #f7fafc);
    }

    .benefit-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md, 15px);
      margin-bottom: var(--spacing-sm, 10px);
    }

    .benefit-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      background-color: var(--accent-color, #718096);
      color: white;
      flex-shrink: 0;
    }

    .benefit-content {
      flex: 1;
    }

    .benefit-name {
      font-weight: 600;
      font-size: 1.1em;
      margin-bottom: var(--spacing-xs, 5px);
    }

    .benefit-value {
      font-size: 0.9em;
      color: var(--primary-color, #4a5568);
      font-weight: 600;
    }

    .benefit-description {
      font-size: 0.9em;
      color: var(--text-secondary, #666);
      line-height: 1.5;
    }

    .membership-title {
      font-size: 1.2em;
      font-weight: 700;
      color: var(--primary-color, #4a5568);
      margin-bottom: var(--spacing-md, 15px);
    }

    .membership-text {
      line-height: 1.6;
      color: var(--text-color, #333);
    }

    .loading, .error {
      text-align: center;
      padding: var(--spacing-xl, 40px);
      font-size: 1.1em;
    }

    .error {
      color: var(--error-color, #e53e3e);
      background-color: var(--error-bg, #fed7d7);
      border-radius: var(--border-radius, 8px);
      border: 1px solid var(--error-border, #feb2b2);
    }

    @media (max-width: 768px) {
      .club-header {
        flex-direction: column;
        text-align: center;
      }

      .progress-header {
        flex-direction: column;
        gap: var(--spacing-md, 15px);
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .status-levels {
        grid-template-columns: 1fr;
      }
    }
  `
]);
customElements.get("club-status-component") || customElements.define("club-status-component", Si);
const ht = class ht extends Oe {
  constructor() {
    super(), this.logger = Ne("AccountOverview"), this.userName = "", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = "https://xitami.github.io/TWR-Account-Components", this.mode = "live", this.authComponent = null, this.languageConfig = {}, this.demoData = {}, this.loading = !1, this.showAuthOverlay = !1;
  }
  async connectedCallback() {
    super.connectedCallback(), await this.loadData();
  }
  // async loadData() {
  //   // try {
  //   // this.userName = '';
  //   //   const demoResponse = await fetch('../config/demo-data.json');
  //   //   this.demoData = await demoResponse.json();
  //   //   this.appState.accountProfile
  //   //   this.userName = this.demoData.profile?.firstName + ' ' + this.demoData.profile?.lastName || 'Max Mustermann';
  //   //   this.loading = false;
  //   //   console.log('🎨 Demo data loaded:', this.demoData);
  //   // } catch (error) {
  //   //   console.error('Error loading demo data:', error);
  //   // }
  //     if (this.appActions?.loadAccountData) {
  //       if (!this.appState?.accountLoaded && !this.appState?.accountLoading) {
  //         await this.appActions.loadAccountData();
  //       }
  //       this._applyAccountState();
  //     } else {
  //       const demoResponse = await fetch('../config/demo-data.json');
  //       this.demoData = await demoResponse.json();
  //       this._setUserNameFromProfile(this.demoData?.profile, 'Max Mustermann');
  //     }
  //   return getText(key, 'overview', fallback, this.theme);
  // }
  async loadData() {
    var e, t, i, r;
    if ((e = this.appActions) != null && e.loadAccountData) {
      if ((t = this.appState) != null && t.isAuthenticated && !((i = this.appState) != null && i.accountLoaded) && !((r = this.appState) != null && r.accountLoading))
        try {
          await this.appActions.loadAccountData();
        } catch (o) {
          this.logger.warn("⚠️ loadAccountData failed:", o == null ? void 0 : o.message);
        }
      this._applyAccountState();
    }
  }
  getText(e, t = null) {
    return O(e, "overview", t, this.theme);
  }
  _applyAccountState() {
    this.appState && (this._setUserNameFromProfile(this.appState.accountProfile), (!this.demoData || Object.keys(this.demoData).length === 0) && (this.demoData = {}), this.appState.accountClubStatus && (this.demoData.clubMembership = this.appState.accountClubStatus));
  }
  _setUserNameFromProfile(e, t = "") {
    var a, n;
    if (!e) {
      this.userName = t;
      return;
    }
    const i = ((a = e.firstName) == null ? void 0 : a.trim()) || "", r = ((n = e.lastName) == null ? void 0 : n.trim()) || "", o = [i, r].filter(Boolean).join(" ");
    this.userName = o || t;
  }
  appContextChanged(e, t) {
    var n, s, l, g, p;
    (n = super.appContextChanged) == null || n.call(this, e, t);
    const i = (s = t == null ? void 0 : t.state) == null ? void 0 : s.accountProfile, r = (l = e == null ? void 0 : e.state) == null ? void 0 : l.accountProfile, o = (g = t == null ? void 0 : t.state) == null ? void 0 : g.accountClubStatus, a = (p = e == null ? void 0 : e.state) == null ? void 0 : p.accountClubStatus;
    (r !== i || a !== o) && this._applyAccountState();
  }
  navigateTo(e) {
    window.location.hash = `#${e}`;
  }
  render() {
    var e, t, i, r, o;
    try {
      if (this.logger.debug("AccountOverviewComponent render called, apiMode:", this.apiMode, "needsAuth:", this.needsAuth), this.loading)
        return this.logger.debug("Returning loading state"), u`<div class="loading">${this.getText("loading")}</div>`;
      if (this.needsAuth || this.showAuthOverlay)
        return this.logger.debug("Rendering auth overlay (session required)"), u`<div class="overview-container overview-container--auth">${this.renderAuthOverlay()}</div>`;
      this.logger.debug("Rendering main content");
      const a = ((e = this.appState) == null ? void 0 : e.accountClubStatus) || this.demoData.clubMembership, n = this.getText("welcomeMessage"), s = (t = this.userName) == null ? void 0 : t.trim();
      return u`
      <div class="overview-container">
        <div class="overview-header">
          <h1 class="overview-title page-title">${this.getText("pageTitle")}</h1>
          <p class="overview-subtitle page-subtitle">
            ${s ? `${n} ${s}!` : `${n}!`}
          </p>
        </div>
 <!-- Main Overview Cards -->
        <div class="overview-grid">
          <!-- Trips Card - Only show if there are trips -->
          ${((r = (i = this.appState) == null ? void 0 : i.trips) == null ? void 0 : r.length) > 0 ? u`
            <div class="overview-card animate-in current-trip-card">
              <h3 class="card-title">${this.getText("tripsTitle")}</h3>
              <p class="card-description">${this.getText("tripsDescription")}</p>

              <current-trip-component
                mode="preview"
                .apiMode=${this.apiMode}
                .theme=${this.theme}
                .authComponent=${this.authComponent}
                ?showActions=${!1}>
              </current-trip-component>

              <div class="action-buttons">
                <button class="btn btn-primary" @click=${() => this.navigateTo("trips")}>
                  ${this.getText("viewTrips")}
                </button>
               <!-- ${(o = this.appState) != null && o.hasFavorites ? u`
                  <button class="btn btn-secondary" @click=${() => this.navigateTo("merkliste")}>
                    ${this.getText("viewMerkliste")}
                  </button>
                ` : ""} -->
              </div>
            </div>
          ` : ""}

          <!-- Account Card -->
          <!--div class="overview-card">
            <h3 class="card-title">${this.getText("accountTitle")}</h3>
            <p class="card-description">${this.getText("accountDescription")}</p>
            <p class="card-description">${this.getText("newsletterDescription")}</p>
            <div class="action-buttons">
              <button class="btn btn-primary" @click=${() => this.navigateTo("account")}>
                ${this.getText("editData")}
              </button>
              <button class="btn btn-secondary" @click=${() => this.navigateTo("newsletter")}>
                ${this.getText("manageNewsletter")}
              </button>
            </div>
          </div>
        </div-->
          <div class="overview-card">
            <h3 class="card-title">${this.getText("accountTitle")}</h3>
            <p class="card-description">${this.getText("accountDescription")}</p>
            <div class="action-buttons">
              <button class="btn btn-primary" @click=${() => this.navigateTo("account")}>
                ${this.getText("editData")}
              </button>
            </div>
          </div>
 
                  <!-- Account Card -->
          <div class="overview-card newsletter-card">
            <h3 class="card-title">${this.getText("manageNewsletter")}</h3>
            <p class="card-description">${this.getText("newsletterDescription")}</p>
            <div class="action-buttons">
              <button class="btn btn-secondary" @click=${() => this.navigateTo("newsletter")}>
                ${this.getText("manageNewsletter")}
              </button>
            </div>
          </div>
      
        <!-- Club Status Banner - Only show if there is actual club data and component enabled -->
        ${j("clubStatus", this.apiMode, this.theme) && a && (a.memberId || a.currentStatus) ? u`
          <div class="overview-card club-status-card animate-in">
            <div class="club-status-header">
              <div>
                <h2 class="club-level">${a.currentStatus.name}</h2>
                <p class="club-member-id">${this.getText("memberId")}: ${a.memberId}</p>
              </div>
              <div class="club-stats">
                <div class="stat-item">
                  <p class="stat-number">${a.totalTravelDays}</p>
                  <p class="stat-label">${this.getText("totalTravelDays")}</p>
                </div>
                <div class="stat-item">
                  <p class="stat-number">${a.currentYearTravelDays}</p>
                  <p class="stat-label">${this.getText("currentYear")}</p>
                </div>
              </div>
            </div>
            <div class="club-actions">
              <button class="btn btn-primary" @click=${() => this.navigateTo("club")}>
                ${this.getText("viewClubDetails")}
              </button>
            </div>
          </div>
        ` : ""}


      </div>
    `;
    } catch (a) {
      return this.logger.error("Error in AccountOverviewComponent render:", a), u`<div class="error">Fehler beim Laden der Übersicht: ${a.message}</div>`;
    }
  }
};
N(ht, "properties", {
  userName: { type: String },
  languageConfig: { type: Object },
  demoData: { type: Object },
  loading: { type: Boolean },
  showAuthOverlay: { type: Boolean }
}), N(ht, "styles", [
  at(ht, ht, "styles"),
  ut,
  ie`
    :host {
      display: block;
      padding: var(--component-padding, 2rem);
      font-family: var(--font-family, sans-serif);
      color: var(--text-color, #111827);
      max-width: var(--container-width, 1200px);
      margin: 0 auto;
      padding: var(--component-padding, 2rem);
    }
    /* When a session is required the account cards are NOT rendered at all
       (see render()); the overlay then flows as the sole content. */
    .overview-container--auth {
      position: relative;
    }
    .overview-container--auth .auth-overlay {
      position: relative;
      background: transparent;
      backdrop-filter: none;
    }
    .overview-header {
      margin-bottom: var(--spacing-xl);
    }

    .club-status-card {
    display:none;
    }


    .overview-grid {
      --min-col-size: 350px;
      display: grid;
      //grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      grid-template-columns: repeat(auto-fit, minmax(min(var(--min-col-size), 100%), 1fr));

      gap: var(--spacing-lg);

      margin-bottom: var(--spacing-xl);
    }

    .overview-card {
      background: var(--bg-color, #ffffff);
      border: var(--card-border-width, 1px) solid var(--border-color, #e5e7eb);
      border-radius: var(--card-border-radius, 12px);
      padding: var(--card-padding, 1.5rem);
      transition: var(--transition);
      box-shadow: var(--card-box-shadow, var(--twerenbold-shadow, 0 1px 3px rgba(0, 0, 0, 0.1)));
    }

    .overview-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-hover-box-shadow, var(--twerenbold-shadow-lg, 0 4px 12px rgba(0, 0, 0, 0.15)));
      border-color: var(--primary-color, #009553);
    }

    .current-trip-card {
       grid-column: 1 / -1;
    }

    .card-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--text-color, #111827);
      margin: 0 0 0.75rem 0;
    }

    .card-description {
      color: var(--text-secondary, #6b7280);
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    .club-actions {
      margin-top: 1rem;
      display: flex;
        padding: 1rem;
      }



      .overview-card {
        padding: 1rem;
      }
    
  `
]);
let Ci = ht;
customElements.get("account-overview-component") || customElements.define("account-overview-component", Ci);
const cr = "twerenboldMsal";
function Rr() {
  const c = import.meta.url, e = "msal-browser.js", t = c.match(/^(.*)\/src\/services\/[^/]+$/);
  if (t)
    return t[1] + "/libs/" + e;
  const i = c.substring(0, c.lastIndexOf("/") + 1);
  return new URL("libs/" + e, i).href;
}
function Or() {
  var e;
  if (typeof window > "u" || (e = window.msal) != null && e.PublicClientApplication) return Promise.resolve();
  if (window.__twrMsalLibLoadPromise) return window.__twrMsalLibLoadPromise;
  const c = (async () => {
    var r;
    const t = Rr(), i = Array.from(document.scripts).find(
      (o) => {
        var a;
        return o.src === t || ((a = o.dataset) == null ? void 0 : a[cr]) === "true";
      }
    );
    if (i) {
      if (i.dataset.loaded === "true" || (r = window.msal) != null && r.PublicClientApplication) return;
      await new Promise((o, a) => {
        i.addEventListener("load", o, { once: !0 }), i.addEventListener("error", a, { once: !0 });
      });
      return;
    }
    await new Promise((o, a) => {
      const n = document.createElement("script");
      n.src = t, n.async = !1, n.dataset[cr] = "true", n.dataset.loading = "true", n.addEventListener(
        "load",
        () => {
          n.dataset.loaded = "true", delete n.dataset.loading, o();
        },
        { once: !0 }
      ), n.addEventListener("error", a, { once: !0 }), document.head.appendChild(n);
    });
  })();
  return window.__twrMsalLibLoadPromise = c, c;
}
function dr() {
  return Rr();
}
class Ft extends $e {
  constructor() {
    super(), this.logger = Ne("OAuthLogin"), this.theme = "twerenbold", this.isAuthenticated = !1, this.isLoading = !1, this.isMsalInitialized = !1, this.user = null, this.error = null, this.redirectUri = null, this.pendingAction = null, this.cacheLocation = "localStorage", this.passive = !1, this.silentRedirectUri = null, this.msalConfig = null, this.msalInstance = null, this.loginRequest = {
      scopes: ["api://042fdca8-11ec-42f0-ac02-c7f9961eb0db/api.write", "api://042fdca8-11ec-42f0-ac02-c7f9961eb0db/api.read"]
    }, this._lastKnownAccountId = null, this.showLogoutModal = !1, this._pendingLoginSuccessPromise = null;
  }
  /**
   * Get cookie domain for subdomain-wide cookies
   * @returns {string|null} - Cookie domain (e.g., '.twerenbold.ch') or null for current domain only
   */
  _getCookieDomain() {
    try {
      const e = window.location.hostname;
      if (e === "localhost" || e === "127.0.0.1" || e === "::1" || e.startsWith("localhost.") || e.endsWith(".localhost") || /^(\d{1,3}\.){3}\d{1,3}$/.test(e) || e.includes(":") || /^\[[\da-f:]+\]$/i.test(e) || !e.includes("."))
        return null;
      const t = e.split(".");
      return t.length < 2 ? null : `.${t.slice(-2).join(".")}`;
    } catch (e) {
      return this.logger.warn("⚠️ Failed to determine cookie domain", e), null;
    }
  }
  /**
   * Set Azure session hint cookies for subdomain-wide silent login detection.
   * All three cookies live on the parent domain (.twerenbold.ch) and are
   * deliberately SESSION cookies (no Max-Age) — cleared on browser close.
   * None of them must outlive the Azure/Entra session they hint at:
   *
   *   `try_silent_login`
   *     Signals to server-side integrators "an Azure/Entra session probably
   *     exists RIGHT NOW". A persistent lifetime would falsely tell the
   *     server a session exists long after it has expired.
   *
   *   `tw_login_hint`
   *     Carries the email so a subdomain can call ssoSilent({ loginHint })
   *     without an account picker. Session-scoped so a stale hint cannot
   *     trigger a silent login for a previous user on a shared device.
   *
   *   `tw_user_name`
   *     Display name for instant header rendering on subdomains, without an
   *     API call. Session-scoped to avoid leaving the name on disk.
   *
   * A fresh browser visit re-validates by calling ssoSilent and only re-sets
   * the cookies on success. On logout `_clearAuthSessionCookie` removes all.
   */
  _setAuthSessionCookie() {
    var e, t, i;
    try {
      const r = this._getCookieDomain(), o = window.location.hostname, a = window.location.protocol === "https:", n = (g) => {
        const p = [g, "path=/", "SameSite=Lax"];
        return r && p.push(`domain=${r}`), a && p.push("Secure"), p.join("; ");
      };
      document.cookie = n("try_silent_login=true");
      const s = ((e = this.user) == null ? void 0 : e.email) || ((t = this.user) == null ? void 0 : t.username);
      s && (document.cookie = n(`tw_login_hint=${encodeURIComponent(s)}`));
      const l = ((i = this.user) == null ? void 0 : i.name) && this.user.name.trim();
      l && l.toLowerCase() !== "unknown" && (document.cookie = n(`tw_user_name=${encodeURIComponent(l)}`)), this._clearLoggedOutMarker(), this.logger.debug("✅ Auth session cookie set", {
        hostname: o,
        domain: r || "current",
        secure: a,
        hasHint: !!s,
        hasName: !!l,
        sessionCookies: ["try_silent_login", s && "tw_login_hint", l && "tw_user_name"].filter(Boolean)
      });
    } catch (r) {
      this.logger.warn("⚠️ Failed to set auth session cookie", r);
    }
  }
  /**
   * Remove Azure session hint cookies (both flag and login hint).
   */
  _clearAuthSessionCookie() {
    try {
      const e = this._getCookieDomain(), t = (i) => {
        const r = [`${i}=`, "path=/", "expires=Thu, 01 Jan 1970 00:00:00 GMT"];
        return e && r.push(`domain=${e}`), r.join("; ");
      };
      document.cookie = t("try_silent_login"), document.cookie = t("tw_login_hint"), document.cookie = t("tw_user_name"), this._setLoggedOutMarker(), this.logger.debug("✅ Auth session cookies cleared", { domain: e || "current" });
    } catch (e) {
      this.logger.warn("⚠️ Failed to clear auth session cookie", e);
    }
  }
  _hasAuthSessionCookie() {
    if (typeof document > "u") return !1;
    try {
      return document.cookie.split("; ").some((e) => e.startsWith("try_silent_login=true"));
    } catch {
      return !1;
    }
  }
  // ─── Cross-origin logout marker ──────────────────────────────────────────
  // localStorage is strictly per-origin, so a logout on one .twerenbold.ch
  // origin cannot purge the MSAL token cache of another. `tw_logged_out` is
  // the domain-wide signal: set whenever the session cookies are cleared
  // (logout / definitive session loss), cleared whenever they are set (login).
  // Any origin that sees it at init purges its own stale MSAL cache instead of
  // silently re-authenticating from a cached — but post-logout — access token.
  _setLoggedOutMarker() {
    try {
      const e = this._getCookieDomain(), t = [
        `tw_logged_out=${Date.now()}`,
        "path=/",
        "SameSite=Lax",
        `Max-Age=${1440 * 60}`
      ];
      e && t.push(`domain=${e}`), window.location.protocol === "https:" && t.push("Secure"), document.cookie = t.join("; ");
    } catch (e) {
      this.logger.warn("⚠️ Failed to set logged-out marker", e);
    }
  }
  _clearLoggedOutMarker() {
    try {
      const e = this._getCookieDomain(), t = ["tw_logged_out=", "path=/", "expires=Thu, 01 Jan 1970 00:00:00 GMT"];
      e && t.push(`domain=${e}`), document.cookie = t.join("; ");
    } catch (e) {
      this.logger.warn("⚠️ Failed to clear logged-out marker", e);
    }
  }
  _hasLoggedOutMarker() {
    if (typeof document > "u") return !1;
    try {
      return document.cookie.split("; ").some((e) => e.startsWith("tw_logged_out="));
    } catch {
      return !1;
    }
  }
  /**
   * If a logout happened on any .twerenbold.ch origin (tw_logged_out cookie
   * present), this origin's MSAL cache is stale. Purge it so we do not
   * silently re-authenticate from a still-cached post-logout access token.
   * Returns true if a purge was performed.
   */
  async _purgeMsalCacheAfterLogout() {
    if (!this.msalInstance || !this._hasLoggedOutMarker()) return !1;
    const e = this.msalInstance.getAllAccounts();
    if (e.length === 0) return !1;
    this.logger.info("Logout marker present — purging stale MSAL cache for this origin", { accounts: e.length });
    for (const t of e)
      try {
        await this.msalInstance.removeAccount(t);
      } catch (i) {
        this.logger.warn("removeAccount during logout purge failed", i);
      }
    try {
      typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
      for (let t = localStorage.length - 1; t >= 0; t--) {
        const i = localStorage.key(t);
        i && (i.includes("_accountProfile_") || i.startsWith("twerenbold_token_")) && localStorage.removeItem(i);
      }
    } catch {
    }
    if (this.isAuthenticated = !1, this.user = null, !this.passive)
      try {
        this._dispatchAuthChangedEvent();
      } catch {
      }
    return !0;
  }
  /**
   * Detect a stale MSAL cache and purge it before init.
   *
   * MSAL.js encrypts the localStorage cache with an AES-GCM key. In MSAL v5+
   * (in use here), that key lives in a session cookie named
   * `msal.cache.encryption` (see msal-browser/dist/cache/LocalStorage.mjs).
   * If the cookie disappears (browser session end, partial site-data clear,
   * cookie eviction) while ciphertext token entries remain in localStorage,
   * MSAL silently fails to decrypt and `getAllAccounts()` returns []. From
   * the user's perspective the UI shows "Anmelden" even though they appear
   * to be logged in.
   *
   * Probe: token entries present in localStorage but `msal.cache.encryption`
   * cookie missing → orphan. Wipe `msal.*` localStorage entries so MSAL
   * starts clean and triggers a fresh auth flow.
   *
   * NOTE — Bug history: an earlier version of this probe checked
   * `indexedDB.databases()` for an IDB named `msal.cache.encryption`. That
   * was based on an MSAL v3 storage layout; v5 never creates that IDB,
   * so the probe was always positive → tokens were wiped on every page
   * load → "session weg beim 2. Aufruf"-Symptom. The cookie-based probe
   * here matches what MSAL v5 actually does.
   *
   * Skipped in passive (cross-subdomain bootstrap) mode — passive instances
   * must not destroy shared state.
   */
  async _purgeOrphanedMsalCacheIfNeeded() {
    if (this.passive || typeof window > "u" || typeof document > "u") return !1;
    let e = !1;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const r = localStorage.key(i);
        if (!(!r || !r.startsWith("msal.")) && /idtoken|accesstoken|refreshtoken/i.test(r)) {
          e = !0;
          break;
        }
      }
    } catch {
      return !1;
    }
    if (!e || document.cookie.split("; ").some((i) => i.startsWith("msal.cache.encryption="))) return !1;
    this.logger.warn("🧹 MSAL cache appears orphaned (ciphertext present, msal.cache.encryption cookie missing) — purging localStorage MSAL entries");
    try {
      const i = [];
      for (let r = 0; r < localStorage.length; r++) {
        const o = localStorage.key(r);
        o && o.startsWith("msal.") && i.push(o);
      }
      i.forEach((r) => {
        try {
          localStorage.removeItem(r);
        } catch {
        }
      });
    } catch (i) {
      this.logger.warn("orphan-cache purge: localStorage cleanup failed", i);
    }
    return !0;
  }
  _readCookie(e) {
    if (typeof document > "u") return null;
    try {
      const t = `${e}=`, i = document.cookie.split("; ").find((r) => r.startsWith(t));
      return i ? decodeURIComponent(i.substring(t.length)) : null;
    } catch {
      return null;
    }
  }
  /**
   * Cross-subdomain silent SSO bootstrap.
   *
   * Why: localStorage is strictly per-origin, so when a user logs in on
   * twerenbold.ch and navigates to reisemarkt.twerenbold.ch, this origin's
   * MSAL cache is empty and the header menu shows "logged out". The B2C
   * session at auth.twerenbold.ch IS shared (cookie), so we can use ssoSilent
   * to seed this origin's cache with valid tokens — but only if the parent-
   * domain hint cookies indicate a session likely exists.
   */
  async _attemptCrossSubdomainSilentSSO() {
    const e = "🔁 [SilentSSO]", t = {
      origin: typeof window < "u" ? window.location.origin : "n/a",
      hostname: typeof window < "u" ? window.location.hostname : "n/a",
      hasMsal: !!this.msalInstance,
      localAccounts: this.msalInstance ? this.msalInstance.getAllAccounts().length : -1,
      hasTrySilentCookie: this._hasAuthSessionCookie(),
      loginHint: this._readCookie("tw_login_hint") || null,
      cookies: typeof document < "u" ? document.cookie : "n/a"
    };
    console.log(`${e} entry`, t);
    try {
      if (!this.msalInstance) {
        console.log(`${e} skip: MSAL not initialized`);
        return;
      }
      if (t.localAccounts > 0) {
        console.log(`${e} skip: local MSAL account already present (checkAuthStatus will handle it)`);
        return;
      }
      if (!t.hasTrySilentCookie && !t.loginHint) {
        console.log(`${e} skip: no session signal (try_silent_login + tw_login_hint both absent)`);
        return;
      }
      if (!t.loginHint) {
        console.log(`${e} skip: tw_login_hint cookie missing — user must log in once with new code to seed the hint cookie`);
        return;
      }
      const i = this.silentRedirectUri ? this.silentRedirectUri.trim() : "", r = i ? new URL(i, window.location.origin).href : window.location.origin;
      console.log(`${e} attempting ssoSilent`, {
        hint: t.loginHint,
        redirectUri: r,
        scopes: this.loginRequest.scopes
      });
      const o = await this.msalInstance.ssoSilent({
        scopes: this.loginRequest.scopes,
        loginHint: t.loginHint,
        redirectUri: r
      });
      o != null && o.account ? (console.log(`${e} ✅ ssoSilent succeeded`, {
        account: o.account.username,
        homeAccountId: o.account.homeAccountId
      }), await this.handleLoginSuccess(o)) : console.warn(`${e} ssoSilent returned without account`, o);
    } catch (i) {
      const r = (i == null ? void 0 : i.errorCode) || "", o = (i == null ? void 0 : i.errorMessage) || (i == null ? void 0 : i.message) || "";
      if (r === "login_required" || r === "interaction_required" || r === "silent_sso_error" || r === "no_account_in_silent_request" || o.includes("AADSTS50058"))
        if (this.passive) {
          console.log(`${e} no shared B2C session (passive mode — leaving hint cookies in place)`, { errorCode: r, message: o });
          try {
            window.dispatchEvent(new CustomEvent("twerenbold:silent-sso-unavailable"));
          } catch {
          }
        } else
          console.log(`${e} no shared B2C session — clearing stale hint cookies`, { errorCode: r, message: o }), this._clearAuthSessionCookie();
      else
        console.error(
          `${e} ❌ unexpected error — code=${r || "(none)"} subError=${(i == null ? void 0 : i.subError) || "(none)"} message=${o || "(none)"}`,
          i
        );
    }
  }
  /**
   * Detect if device is mobile and should use redirect instead of popup
   * Mobile browsers often block popups, so we use redirect for better UX
   * @returns {boolean} - True if mobile device
   */
  _isMobileDevice() {
    const e = window.innerWidth < 768, t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ), i = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return e || t || i && window.innerWidth < 1024;
  }
  /**
   * Determine whether to use popup or redirect for authentication
   * @returns {boolean} - True to use popup, false to use redirect
   */
  _shouldUsePopup() {
    var e;
    if (this._isMobileDevice())
      return !1;
    try {
      const t = ge(this.apiMode || "demo", this.theme);
      if (((e = t == null ? void 0 : t.auth) == null ? void 0 : e.flow) === "popup")
        return this.logger.info("Using popup flow due to theme configuration"), !0;
    } catch (t) {
      this.logger.warn("Error checking config for auth flow", t);
    }
    return !1;
  }
  /**
   * Mark that popup had issues, so future logins use redirect
   */
  _markPopupFailed() {
    try {
      sessionStorage.setItem("msal_popup_failed", "true");
    } catch {
    }
  }
  /**
   * Lazy-load the MSAL browser library if it hasn't been loaded yet.
   * Delegates to the shared loader so the script URL is resolved at runtime
   * (against the bundle's actual CDN origin) and a single script tag is shared
   * with <account-portal-embed> on pages that mount both.
   */
  async _ensureMsalLoaded() {
    var t;
    const e = "🔁 [OAuthLogin][MsalLoader]";
    try {
      (t = window.msal) != null && t.PublicClientApplication || console.log(`${e} window.msal missing — loading`, dr()), await Or();
    } catch (i) {
      throw console.error(`${e} ❌ failed to load MSAL from`, dr(), i), i;
    }
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = window.location.hash;
    try {
      await this._ensureMsalLoaded();
    } catch (i) {
      this.logger.error("Failed to load MSAL library — auth flows disabled on this page", i), this.error = "Authentifizierungs-Bibliothek konnte nicht geladen werden", this.isMsalInitialized = !0;
      return;
    }
    try {
      await this._purgeOrphanedMsalCacheIfNeeded();
    } catch (i) {
      this.logger.warn("orphan-cache self-heal threw — continuing init", i);
    }
    let t = this.redirectUri || window.location.href;
    t = t.split("?")[0].split("#")[0];
    try {
      const i = window.location.origin;
      new URL(t, window.location.href).origin !== i && window.location.hostname.includes("localhost") && (this.logger.warn("⚠️ Redirect URI origin mismatch on localhost. Using current origin for MSAL config.", {
        redirectUri: t,
        currentOrigin: i
      }), t = `${i}${window.location.pathname}`);
    } catch (i) {
      this.logger.warn("⚠️ Failed to validate redirect URI origin, using current URL fallback", i), t = window.location.href.split("?")[0].split("#")[0];
    }
    this.msalConfig = {
      auth: {
        clientId: "63005751-cf8a-4090-8e08-6c93aa362d95",
        authority: "https://auth.twerenbold.ch/7ac16d58-e7a0-441d-9376-d096d0f610a5",
        redirectUri: t,
        knownAuthorities: ["auth.twerenbold.ch"]
      },
      cache: {
        cacheLocation: this.cacheLocation,
        // Configurable: 'localStorage' (default) or 'sessionStorage'
        storeAuthStateInCookie: !window.location.hostname.includes("localhost")
        // Store OAuth state in cookies for reliability (except localhost)
      },
      system: {
        // Default is 6000ms which is too short when the silent redirect URI is
        // a heavy server-rendered page (ASP.NET WebForms, etc.). Give MSAL up
        // to 15s to detect the URL hash in the iframe before timing out.
        iframeHashTimeout: 15e3,
        loggerOptions: {
          loggerCallback: (i, r, o) => {
            if (!o)
              switch (i) {
                case window.msal.LogLevel.Error:
                  this.logger.error(r);
                  return;
                case window.msal.LogLevel.Info:
                  this.logger.info(r);
                  return;
                case window.msal.LogLevel.Verbose:
                  this.logger.debug(r);
                  return;
                case window.msal.LogLevel.Warning:
                  this.logger.warn(r);
                  return;
              }
          },
          logLevel: window.msal.LogLevel.Info,
          piiLoggingEnabled: !1
        }
      }
    };
    try {
      const i = this.msalConfig.auth.clientId, r = this.msalConfig.auth.authority, o = typeof window < "u" ? window.__twrMsal : null;
      if (!!(o != null && o.instance) && o.clientId === i && o.authority === r)
        this.logger.info("🔗 Reusing resolved MSAL singleton", {
          ownerTag: (() => {
            var l, g, p;
            try {
              return ((p = (g = (l = o.owner) == null ? void 0 : l.tagName) == null ? void 0 : g.toLowerCase) == null ? void 0 : p.call(g)) || "unknown";
            } catch {
              return "unknown";
            }
          })(),
          passive: !!this.passive
        }), this.msalInstance = o.instance;
      else {
        const l = typeof window < "u" ? window.__twrMsalPromise : null;
        if (l)
          this.logger.info("🔗 Awaiting shared MSAL singleton in-flight from another <oauth-login>", {
            passive: !!this.passive
          }), this.msalInstance = await l;
        else {
          const g = this.msalConfig, p = this, h = (async () => {
            let m;
            return window.msal.PublicClientApplication.createPublicClientApplication ? m = await window.msal.PublicClientApplication.createPublicClientApplication(g) : (m = new window.msal.PublicClientApplication(g), typeof m.initialize == "function" && await m.initialize()), typeof window < "u" && (window.__twrMsal = {
              instance: m,
              clientId: i,
              authority: r,
              owner: p
            }), m;
          })();
          typeof window < "u" && (window.__twrMsalPromise = h), this.logger.info("🛠️ Creating MSAL singleton (first <oauth-login> on page)", {
            passive: !!this.passive
          }), this.msalInstance = await h;
        }
      }
      this.msalInstance && typeof this.msalInstance.addEventCallback == "function" && (this._msalEventCallbackId = this.msalInstance.addEventCallback((l) => {
        try {
          const g = l == null ? void 0 : l.eventType, p = l == null ? void 0 : l.payload;
          if (g === window.msal.EventType.LOGIN_SUCCESS || g === window.msal.EventType.ACQUIRE_TOKEN_SUCCESS)
            if (this.logger.debug("MSAL event: login or acquire token success", g, p), p != null && p.account) {
              const h = this.handleLoginSuccess(p);
              g === window.msal.EventType.LOGIN_SUCCESS && (this._pendingLoginSuccessPromise = h);
            } else g === window.msal.EventType.ACQUIRE_TOKEN_SUCCESS && (p != null && p.accessToken) && this.handleLoginSuccess(p);
          if (g === window.msal.EventType.ACQUIRE_TOKEN_FAILURE) {
            const h = p, m = (h == null ? void 0 : h.errorMessage) || (h == null ? void 0 : h.message) || "";
            this.logger.warn("MSAL event: acquire token failure", m), m && (m.includes("interaction_required") || m.includes("invalid_grant") || m.includes("AADSTS700084")) && (this.passive ? this.logger.debug("passive mode: ignoring ACQUIRE_TOKEN_FAILURE side-effects") : (this._showSessionExpiredWithAction(), this.isAuthenticated = !1, this.user = null, this._dispatchAuthChangedEvent()));
          }
          (g === window.msal.EventType.LOGOUT_SUCCESS || g === window.msal.EventType.ACCOUNTS_CHANGED) && (this.logger.info("MSAL event: account or logout change - checking auth status"), this.checkAuthStatus().catch((h) => this.logger.warn("Error in checkAuthStatus after MSAL event:", h)));
        } catch (g) {
          this.logger.warn("MSAL event callback error", g);
        }
      }), this.logger.debug("Registered event callback id", this._msalEventCallbackId));
      const n = (l) => {
        try {
          sessionStorage.getItem("twerenbold_pending_auth") === "true" && (this.logger.warn(`⚠️ Clearing pending auth flag (${l})`), sessionStorage.removeItem("twerenbold_pending_auth"), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", { bubbles: !0, composed: !0 })));
        } catch (g) {
          this.logger.warn("⚠️ Could not clear pending auth flag", g);
        }
      }, s = e && (e.includes("code=") || e.includes("state=") || e.includes("error="));
      this.logger.debug(
        "🔍 Calling handleRedirectPromise. Current URL:",
        window.location.href,
        s ? "(using saved hash)" : "(no auth hash saved)"
      ), await this.msalInstance.handleRedirectPromise(s ? e : void 0).then(async (l) => {
        if (this.logger.debug("🔍 handleRedirectPromise resolved. Response:", l ? "Present" : "NULL"), sessionStorage.getItem("msal_logout_intent") === "true") {
          this.logger.info("Returned from logout - cleaning up state"), sessionStorage.removeItem("msal_logout_intent"), this.isAuthenticated = !1, this.user = null, this.pendingAction = null, this.isLoading = !1;
          const p = (function() {
            try {
              return localStorage.getItem("twerenbold_current_user_id");
            } catch {
              return null;
            }
          })();
          try {
            typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_current_user_id"), p && localStorage.removeItem(`twerenbold_token_${p}`);
            for (let h = localStorage.length - 1; h >= 0; h--) {
              const m = localStorage.key(h);
              m && m.startsWith("twerenbold_token_") && localStorage.removeItem(m);
            }
          } catch {
          }
          try {
            const { apiService: h } = await Promise.resolve().then(() => ne);
            if (p) {
              try {
                h._invalidateCacheForUser(p, "logout-redirect");
              } catch (m) {
                this.logger.warn("⚠️ apiService._invalidateCacheForUser failed", m);
              }
              try {
                h._clearStoredUserId();
              } catch (m) {
                this.logger.warn("⚠️ apiService._clearStoredUserId failed", m);
              }
            }
          } catch (h) {
            this.logger.warn("⚠️ Could not run apiService cleanup after logout redirect", h);
          }
          try {
            Q.reset();
          } catch (h) {
            this.logger.warn("⚠️ HubspotSPA.reset failed", h);
          }
          try {
            window.dispatchEvent(new CustomEvent("twerenbold:post-logout", { detail: { userId: p }, bubbles: !0 }));
          } catch (h) {
            this.logger.warn("⚠️ post-logout event dispatch failed", h);
          }
          try {
            this._dispatchAuthChangedEvent();
          } catch (h) {
            this.logger.warn("⚠️ dispatch auth changed failed", h);
          }
        } else l !== null ? (this.logger.info("✅ handleRedirectPromise returned success", l), await this.handleLoginSuccess(l)) : n("redirect_response_null");
      }).catch((l) => {
        if (l.errorCode === "state_not_found") {
          this.logger.warn("OAuth state not found (likely page reload during auth flow) - ignoring"), this.isLoading = !1, n("state_not_found");
          return;
        }
        if (l.errorCode === "login_required" || l.errorCode === "interaction_required" || (l.errorMessage || "").includes("AADSTS50058")) {
          this.logger.info("No active Azure session (login_required) — user is not signed in"), sessionStorage.removeItem("msal_logout_intent"), localStorage.removeItem("twerenbold_logout_timestamp"), this.isAuthenticated = !1, this.user = null, this.pendingAction = null, this.isLoading = !1, this.error = null;
          try {
            this._dispatchAuthChangedEvent();
          } catch {
          }
          n("no_active_session");
          return;
        }
        this.logger.error("Handle redirect promise error", l), this.error = "Fehler bei der Authentifizierung", this.isLoading = !1, sessionStorage.getItem("twerenbold_pending_auth") === "true" && (this.logger.warn("⚠️ Cleaning up pending auth state after error"), sessionStorage.removeItem("twerenbold_pending_auth"), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", { bubbles: !0, composed: !0 })));
      }), this._pendingLoginSuccessPromise && (await this._pendingLoginSuccessPromise, this._pendingLoginSuccessPromise = null);
      try {
        /[#&](code|id_token|error)=/.test(window.location.hash) && window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );
      } catch {
      }
      if (await this._purgeMsalCacheAfterLogout(), await this._attemptCrossSubdomainSilentSSO(), this.passive) {
        this.logger.debug("passive mode: skipping checkAuthStatus + post-init handlers"), this.isMsalInitialized = !0, this.isLoading = !1;
        return;
      }
      await this.checkAuthStatus(), this.isMsalInitialized = !0, this.isLoading = !1;
      try {
        const l = new URLSearchParams(window.location.search), g = l.get("autoLogin"), p = l.get("autoRegister"), h = l.get("returnUrl");
        if (h)
          try {
            const m = decodeURIComponent(h);
            this.logger.debug("🔗 Received returnUrl parameter, storing in sessionStorage:", m), window.sessionStorage.setItem("twerenbold:login-return-url", m);
          } catch (m) {
            this.logger.warn("⚠️ Failed to decode or store returnUrl parameter:", m);
          }
        if (g === "true" && !this.isAuthenticated) {
          this.logger.info("🔔 Detected autoLogin parameter - triggering login automatically"), l.delete("autoLogin"), l.delete("returnUrl");
          const m = window.location.pathname + (l.toString() ? "?" + l.toString() : "") + window.location.hash;
          window.history.replaceState({}, "", m), setTimeout(() => this.login(), 100);
        } else if (p === "true" && !this.isAuthenticated) {
          this.logger.info("🔔 Detected autoRegister parameter - triggering register automatically"), l.delete("autoRegister"), l.delete("returnUrl");
          const m = window.location.pathname + (l.toString() ? "?" + l.toString() : "") + window.location.hash;
          window.history.replaceState({}, "", m), setTimeout(() => this.register(), 100);
        }
      } catch (l) {
        this.logger.warn("⚠️ Failed to check auto-login/register parameters:", l);
      }
      try {
        if (sessionStorage.getItem("twerenbold_request_logout") === "true") {
          try {
            sessionStorage.removeItem("twerenbold_request_logout");
          } catch {
          }
          this.logger.info("🔔 Detected pending request-logout flag - performing logout now"), await this._performLogout();
        }
      } catch (l) {
        this.logger.warn("⚠️ Failed to handle pending request-logout flag:", l);
      }
    } catch (i) {
      this.logger.error("MSAL initialization error:", i), this.error = "Fehler bei der Initialisierung der Authentifizierung", this.isMsalInitialized = !0;
    }
  }
  async checkAuthStatus() {
    var e, t, i, r, o, a, n, s, l, g, p;
    if (!this.msalInstance) {
      console.warn("MSAL: No instance available for checkAuthStatus"), this.isAuthenticated = !1, this.user = null;
      return;
    }
    try {
      let h = null;
      try {
        h = this.msalInstance.getActiveAccount();
      } catch (b) {
        if (b.errorCode === "uninitialized_public_client_application") {
          this.logger.debug("⚠️ MSAL not yet initialized in checkAuthStatus - assuming not authenticated");
          return;
        }
        throw b;
      }
      let m = [];
      try {
        m = this.msalInstance.getAllAccounts();
      } catch (b) {
        this.logger.debug("⚠️ MSAL uninitialized in getAllAccounts check", b);
        return;
      }
      if (!h && m.length > 0 && (h = m[0], this.msalInstance.setActiveAccount(h)), h)
        try {
          const b = {
            scopes: this.loginRequest.scopes,
            account: h,
            forceRefresh: !1
          };
          await this.msalInstance.acquireTokenSilent(b), this.isAuthenticated = !0, this.user = {
            name: h.name || "unknown",
            username: h.username,
            email: h.username,
            // Add technical IDs to prevent session mismatches
            id: h.localAccountId || ((e = h.homeAccountId) == null ? void 0 : e.split(".")[0]) || h.oid,
            oid: ((t = h.idTokenClaims) == null ? void 0 : t.oid) || h.oid,
            sub: (i = h.idTokenClaims) == null ? void 0 : i.sub,
            homeAccountId: h.homeAccountId,
            localAccountId: h.localAccountId
          }, this.error = null, this.logger.info("User authenticated with valid tokens", { name: this.user.name, email: this.user.email, id: this.user.id }), this._setAuthSessionCookie();
          try {
            const { apiService: v } = await Promise.resolve().then(() => ne), y = this.user.id, I = !!this._lastKnownAccountId && this._lastKnownAccountId !== y;
            this._lastKnownAccountId = y, v.setAuthComponent(this), I && this.logger.info("Account changed - notifying API service");
          } catch (v) {
            this.logger.warn("⚠️ Failed to attach auth component to apiService in checkAuthStatus", v);
          }
        } catch (b) {
          const v = (b == null ? void 0 : b.errorCode) || "", y = (b == null ? void 0 : b.errorMessage) || (b == null ? void 0 : b.message) || "";
          if (v === "monitor_window_timeout" || v === "timed_out" || v === "network_error" || v === "no_network_connectivity" || v === "endpoints_resolution_error" || y.includes("timed_out") || y.includes("Token renewal operation failed due to timeout")) {
            this.logger.warn("checkAuthStatus: silent acquire transient failure — keeping cached auth state", v || y), this.isAuthenticated = !0, this.user = {
              name: h.name || "unknown",
              username: h.username,
              email: h.username,
              id: h.localAccountId || ((r = h.homeAccountId) == null ? void 0 : r.split(".")[0]) || h.oid,
              oid: ((o = h.idTokenClaims) == null ? void 0 : o.oid) || h.oid,
              sub: (a = h.idTokenClaims) == null ? void 0 : a.sub,
              homeAccountId: h.homeAccountId,
              localAccountId: h.localAccountId
            }, this.error = null, this._setAuthSessionCookie();
            try {
              const { apiService: M } = await Promise.resolve().then(() => ne);
              M.setAuthComponent(this);
            } catch (M) {
              this.logger.warn("⚠️ Failed to attach auth component to apiService after transient silent failure", M);
            }
            return;
          }
          this.logger.warn("Account tokens invalid/missing for", h == null ? void 0 : h.username, "-", y);
          try {
            await this.msalInstance.removeAccount(h);
          } catch (M) {
            this.logger.warn("⚠️ removeAccount after auth failure failed", M);
          }
          if (this.msalInstance.getAllAccounts().length > 0) {
            this.logger.info("Stale account removed; another account remains — keeping session");
            return;
          }
          this.isAuthenticated = !1, this.user = null, this._clearAuthSessionCookie();
          try {
            const { apiService: M } = await Promise.resolve().then(() => ne);
            M.setAuthComponent(null);
          } catch (M) {
            this.logger.warn("⚠️ Failed to detach auth component from apiService", M);
          }
        }
      else {
        this.isAuthenticated = !1, this.user = null, this.logger.debug("No user signed in");
        let b = !1;
        try {
          const v = localStorage.getItem(
            `msal.2.token.keys.${((s = (n = this.msalConfig) == null ? void 0 : n.auth) == null ? void 0 : s.clientId) || ""}`
          );
          if (v) {
            const y = JSON.parse(v);
            b = !!((l = y == null ? void 0 : y.idToken) != null && l.length || (g = y == null ? void 0 : y.accessToken) != null && g.length || (p = y == null ? void 0 : y.refreshToken) != null && p.length);
          }
        } catch {
        }
        b ? this.logger.warn("checkAuthStatus: 0 in-memory accounts but localStorage has token-keys — likely MSAL v5 hydration lag, leaving hint cookies in place") : this._clearAuthSessionCookie();
        try {
          const { apiService: v } = await Promise.resolve().then(() => ne);
          v.setAuthComponent(null);
        } catch (v) {
          this.logger.warn("⚠️ Failed to detach auth component from apiService in checkAuthStatus", v);
        }
      }
    } catch (h) {
      this.logger.error("Error checking auth status", h), this.isAuthenticated = !1, this.user = null;
    }
  }
  async register() {
    if (!this.msalInstance) {
      this.error = "Authentifizierung nicht initialisiert";
      return;
    }
    this.pendingAction = "register", this.isLoading = !0, this.error = null;
    try {
      sessionStorage.setItem("twerenbold_pending_auth", "true");
    } catch (e) {
      this.logger.warn("⚠️ Could not set pending auth flag", e);
    }
    try {
      const e = {
        scopes: this.loginRequest.scopes,
        prompt: "create"
      };
      if (this._shouldUsePopup()) {
        const i = await this.msalInstance.loginPopup(e);
        this.logger.info("Registration successful", i), await this.handleLoginSuccess(i);
      } else
        await this.msalInstance.loginRedirect(e);
    } catch (e) {
      this.logger.error("Registration error", e), this.error = "Fehler bei der Registrierung", this.isLoading = !1, this.pendingAction = null;
    }
  }
  async login() {
    if (!this.msalInstance) {
      this.error = "Authentifizierung nicht initialisiert";
      return;
    }
    this.pendingAction = "login", this.isLoading = !0, this.error = null;
    try {
      sessionStorage.setItem("twerenbold_pending_auth", "true");
    } catch (e) {
      this.logger.warn("⚠️ Could not set pending auth flag", e);
    }
    try {
      const e = {
        scopes: this.loginRequest.scopes,
        account: this.msalInstance.getAllAccounts()[0]
      }, t = await this.msalInstance.acquireTokenSilent(e);
      this.logger.info("Silent login successful", t), this.handleLoginSuccess(t);
    } catch (e) {
      this.logger.debug("Silent login failed, trying interactive login", e);
      try {
        const t = this._shouldUsePopup(), i = {
          scopes: this.loginRequest.scopes,
          prompt: "select_account"
        };
        if (t)
          try {
            const r = await this.msalInstance.loginPopup(i);
            this.logger.info("Popup login successful", r), r && this.handleLoginSuccess(r);
          } catch (r) {
            const o = (r == null ? void 0 : r.message) || "";
            if (o.includes("hash_does_not_contain_known_properties") || o.includes("popup_window_error") || o.includes("monitor_popup_timeout") || o.includes("user_cancelled"))
              this.logger.warn("Popup failed due to COOP/popup issues, falling back to redirect", r), this._markPopupFailed(), await this.msalInstance.loginRedirect(i);
            else
              throw r;
          }
        else
          await this.msalInstance.loginRedirect(i);
      } catch (t) {
        this.logger.error("Interactive login failed", t), this.error = `Anmeldung fehlgeschlagen: ${t.message}`, this.isLoading = !1, this.pendingAction = null;
      }
    }
  }
  async handleLoginSuccess(e) {
    var r, o, a, n, s, l, g, p, h, m, b;
    if (!(e != null && e.account)) return;
    const t = e.account.homeAccountId || e.account.localAccountId;
    if (this._lastProcessedLoginId === t && Date.now() - (this._lastProcessedLoginTime || 0) < 5e3) {
      this.logger.debug("Skipping duplicate login handling for", t);
      return;
    }
    if (this._lastProcessedLoginId = t, this._lastProcessedLoginTime = Date.now(), this.pendingAction = "processing", this.isLoading = !0, this.error = null, this.msalInstance && e.account) {
      if (typeof this.msalInstance.hydrateCache == "function")
        try {
          await this.msalInstance.hydrateCache(e, {
            scopes: ((r = this.loginRequest) == null ? void 0 : r.scopes) || [],
            account: e.account
          }), this.logger.debug("hydrateCache: in-memory account list populated", {
            accountsAfter: ((a = (o = this.msalInstance).getAllAccounts) == null ? void 0 : a.call(o).length) ?? null
          });
        } catch (v) {
          this.logger.warn("hydrateCache failed — getAllAccounts may stay empty until next page-load reads from cache", v);
        }
      this.msalInstance.setActiveAccount(e.account);
    }
    if (e && e.accessToken && ((n = this.user) != null && n.id))
      try {
        const v = `twerenbold_token_${this.user.id}`;
        localStorage.setItem(v, e.accessToken), localStorage.removeItem("access_token");
      } catch {
      }
    e.idTokenClaims ? this.user = {
      name: e.idTokenClaims.name || ((s = e.account) == null ? void 0 : s.name),
      email: e.idTokenClaims.preferred_username || ((l = e.account) == null ? void 0 : l.username),
      // Add technical IDs for session management
      id: ((g = e.account) == null ? void 0 : g.localAccountId) || e.idTokenClaims.oid,
      oid: e.idTokenClaims.oid,
      sub: e.idTokenClaims.sub,
      homeAccountId: (p = e.account) == null ? void 0 : p.homeAccountId,
      localAccountId: (h = e.account) == null ? void 0 : h.localAccountId
    } : e.account && (this.user = {
      name: e.account.name,
      email: e.account.username,
      // Add technical IDs for session management
      id: e.account.localAccountId || ((m = e.account.homeAccountId) == null ? void 0 : m.split(".")[0]),
      homeAccountId: e.account.homeAccountId,
      localAccountId: e.account.localAccountId
    }), typeof window < "u" && (window.__twerenbold_cached_msal_user = {
      name: this.user.name,
      email: this.user.email,
      username: this.user.email,
      // fallback
      userId: this.user.id,
      homeAccountId: this.user.homeAccountId,
      localAccountId: this.user.localAccountId
    }), console.log("MSAL: Login success handled", this.user), this._lastInteractionRequiredAt = null;
    try {
      const { apiService: v } = await Promise.resolve().then(() => ne);
      v.setAuthComponent(this), this.logger.debug("Auth component set on apiService after login");
    } catch (v) {
      this.logger.warn("⚠️ Failed to attach auth component to apiService:", v);
    }
    if (sessionStorage.getItem("twerenbold_pending_auth") === "true") {
      try {
        sessionStorage.removeItem("twerenbold_pending_auth");
      } catch (v) {
        console.warn("⚠️ Could not remove pending auth flag", v);
      }
      this.logger.debug("⏳ Waiting for Azure Functions to complete..."), document.dispatchEvent(new CustomEvent("azure-functions-wait-start", {
        bubbles: !0,
        composed: !0
      })), await new Promise((v) => setTimeout(v, 4e3)), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", {
        bubbles: !0,
        composed: !0
      }));
    } else
      this.logger.debug("ℹ️ Skipping Azure Functions wait - not a user-initiated auth flow");
    this.isAuthenticated = !0, this.isLoading = !1, this.pendingAction = null, this.logger.info("✅ Login success handling completed"), this._dispatchAuthChangedEvent();
    try {
      (b = this.user) != null && b.email && Q.identify(this.user.email);
    } catch (v) {
      this.logger.warn("⚠️ Hubspot identify failed in oauth-login", v);
    }
    this._setAuthSessionCookie(), this._checkAndRedirectToReturnUrl();
  }
  /**
   * Check if there's a stored return URL and redirect to it
   * This is used after successful login to return to the page where the user started
   */
  _checkAndRedirectToReturnUrl() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        const e = window.sessionStorage.getItem("twerenbold:login-return-url");
        e && (this.logger.info("Found return URL after login, redirecting:", e), window.sessionStorage.removeItem("twerenbold:login-return-url"), setTimeout(() => {
          window.location.href = e;
        }, 500));
      } catch (e) {
        this.logger.warn("Failed to check return URL", e);
      }
  }
  async logout() {
    if (this.msalInstance) {
      this.pendingAction = "logout", this.isLoading = !0;
      try {
        sessionStorage.setItem("msal_logout_intent", "true"), this._clearAuthSessionCookie(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
        for (let e = localStorage.length - 1; e >= 0; e--) {
          const t = localStorage.key(e);
          t && (t.includes("_accountProfile_") || t.startsWith("twerenbold_token_")) && localStorage.removeItem(t);
        }
        await this.msalInstance.logoutRedirect({
          postLogoutRedirectUri: window.location.origin
        });
      } catch (e) {
        this.logger.error("Logout error", e), this.pendingAction = null, this.isLoading = !1, this.error = "Fehler beim Abmelden. Bitte versuchen Sie es erneut.", sessionStorage.removeItem("msal_logout_intent");
      }
    }
  }
  _confirmAndLogout() {
    this._openLogoutModal();
  }
  _openLogoutModal() {
    this.showLogoutModal = !0, this.updateComplete.then(() => {
      var t;
      const e = (t = this.shadowRoot) == null ? void 0 : t.getElementById("logout-dialog");
      e && !e.open && (mr(), e.showModal());
    });
  }
  _closeLogoutModal() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.getElementById("logout-dialog");
    e != null && e.open && e.close(), pr(), this.showLogoutModal = !1;
  }
  async _performLogout() {
    if (!this.msalInstance) {
      this.logger.warn("MSAL not initialized, performing fallback logout");
      try {
        this.logout();
      } catch (e) {
        console.warn(e);
      }
      this._closeLogoutModal();
      return;
    }
    this.pendingAction = "logout", this.isLoading = !0;
    try {
      this._clearAuthSessionCookie(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
      for (let e = localStorage.length - 1; e >= 0; e--) {
        const t = localStorage.key(e);
        t && (t.includes("_accountProfile_") || t.startsWith("twerenbold_token_")) && localStorage.removeItem(t);
      }
      sessionStorage.setItem("msal_logout_intent", "true"), localStorage.setItem("twerenbold_logout_timestamp", Date.now().toString());
      try {
        Q.reset();
      } catch {
      }
      await this.msalInstance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin
      });
    } catch (e) {
      this.logger.error("Logout failed", e), this._showSessionExpiredNotification();
    } finally {
      this.pendingAction = null, this.isLoading = !1, this._closeLogoutModal();
    }
  }
  /**
   * Public method to get access token, used by ApiService
   */
  async getAccessToken(e = !1) {
    var t, i, r;
    if (this.logger.debug("[Debug] getAccessToken called", {
      isAuthenticated: this.isAuthenticated,
      hasMsalInstance: !!this.msalInstance,
      activeAccount: (t = this.msalInstance) == null ? void 0 : t.getActiveAccount(),
      allAccounts: (i = this.msalInstance) == null ? void 0 : i.getAllAccounts()
    }), !this.isAuthenticated && !((r = this.msalInstance) != null && r.getActiveAccount()))
      return this.logger.warn("[Debug] getAccessToken: aborted - neither authenticated nor active account"), null;
    try {
      const o = await this._acquireTokenSilent(e);
      return this.logger.debug("[Debug] getAccessToken: success", { tokenLength: o == null ? void 0 : o.length }), o;
    } catch (o) {
      return this.logger.error("[Debug] getAccessToken: failed", o), null;
    }
  }
  _dispatchAuthChangedEvent() {
    this.dispatchEvent(new CustomEvent("auth-changed", {
      detail: {
        isAuthenticated: this.isAuthenticated,
        user: this.user
      },
      bubbles: !0,
      composed: !0
    }));
  }
  async _acquireTokenSilent(e = !1) {
    var r, o, a, n;
    if (!this.msalInstance)
      throw new Error("MSAL nicht initialisiert");
    this.pendingAction = e ? "token-refresh" : this.pendingAction, this.logger.debug("_acquireTokenSilent called", { forceRefresh: e, pendingAction: this.pendingAction });
    const t = this.msalInstance.getActiveAccount() || this.msalInstance.getAllAccounts()[0];
    if (!t)
      throw new Error("Kein angemeldetes Konto gefunden");
    const i = {
      scopes: this.loginRequest.scopes,
      account: t,
      forceRefresh: e
    };
    if (this._lastInteractionRequiredAt && Date.now() - this._lastInteractionRequiredAt < 60 * 1e3)
      throw new Error("INTERACTION_REQUIRED");
    if (e && this._tokenRefreshPromise)
      try {
        return await this._tokenRefreshPromise;
      } catch {
      }
    try {
      let s;
      e ? (s = (async () => this.msalInstance.acquireTokenSilent(i))(), this._tokenRefreshPromise = s) : s = this.msalInstance.acquireTokenSilent(i);
      const l = await s;
      if (this.logger.debug("_acquireTokenSilent response obtained", { hasResponse: !!l, account: ((r = l == null ? void 0 : l.account) == null ? void 0 : r.username) || ((o = l == null ? void 0 : l.account) == null ? void 0 : o.homeAccountId) }), l) {
        const g = l.idTokenClaims ? { name: l.idTokenClaims.name, email: l.idTokenClaims.preferred_username } : null;
        (!this.user || g && g.email !== this.user.email) && await this.handleLoginSuccess(l);
      }
      if (l && l.accessToken && ((a = this.user) != null && a.id))
        try {
          const g = `twerenbold_token_${this.user.id}`;
          localStorage.setItem(g, l.accessToken);
        } catch {
        }
      return l.accessToken;
    } catch (s) {
      console.error("MSAL: acquireTokenSilent failed", s);
      const l = s.errorMessage || s.message || "", g = s.errorCode || "";
      if (((n = window.msal) == null ? void 0 : n.InteractionRequiredAuthError) && s instanceof window.msal.InteractionRequiredAuthError || // MSAL BrowserAuthError codes that mean "no silent recovery possible".
      // `refresh_token_expired` is NOT an InteractionRequiredAuthError and its
      // errorMessage is only a docs URL — so it must be matched by errorCode.
      // Without this it falls through to `throw error`, the stale account /
      // token are never cleaned up, and the UI stays half-logged-in.
      g === "refresh_token_expired" || g === "interaction_required" || g === "login_required" || g === "consent_required" || g === "no_tokens_found" || l.includes("invalid_grant") || l.includes("AADSTS700084") || // SPA refresh token expired
      l.includes("refresh_token_expired") || l.includes("interaction_required") || l.includes("consent_required") || l.includes("login_required")) {
        this.logger.warn("Silent token acquisition failed for account", t == null ? void 0 : t.username, "—", g || l);
        try {
          await this.msalInstance.removeAccount(t);
        } catch (h) {
          this.logger.warn("removeAccount for failed account failed", h);
        }
        try {
          const h = (t == null ? void 0 : t.localAccountId) || (t == null ? void 0 : t.homeAccountId);
          h && localStorage.removeItem(`twerenbold_token_${h}`);
        } catch {
        }
        if (this._lastInteractionRequiredAt = Date.now(), this._tokenRefreshPromise && (this._tokenRefreshPromise = null), this.msalInstance.getAllAccounts().length > 0)
          throw this.logger.info("Stale account removed; another account remains — keeping session"), new Error("INTERACTION_REQUIRED");
        this.logger.warn("No accounts left after stale-account removal — user is signed out"), this._showSessionExpiredWithAction(), this.isAuthenticated = !1, this.user = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
        for (let h = localStorage.length - 1; h >= 0; h--) {
          const m = localStorage.key(h);
          m && (m.includes("_accountProfile_") || m.startsWith("twerenbold_token_")) && localStorage.removeItem(m);
        }
        throw this.passive || this._clearAuthSessionCookie(), this._dispatchAuthChangedEvent(), new Error("INTERACTION_REQUIRED");
      }
      throw s;
    } finally {
      this.pendingAction === "token-refresh" && (this.pendingAction = null);
    }
  }
  _showSessionExpiredWithAction() {
    this.logger.warn("Showing session expired notification with manual login action"), typeof document < "u" && document.dispatchEvent(new CustomEvent("twerenbold:notification", {
      detail: {
        type: "auth",
        title: "Sitzung abgelaufen",
        message: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an, um fortzufahren.",
        persistent: !0,
        actions: [
          {
            label: "Neu anmelden",
            handler: () => {
              this.logger.debug("User clicked re-login button"), this.login();
            },
            primary: !0
          },
          {
            label: "Später",
            handler: () => {
              this.logger.debug("User dismissed session expired notification");
            }
          }
        ]
      },
      bubbles: !0,
      composed: !0
      // event dispatched inline
    }));
  }
  _showSessionExpiredNotification() {
    if (typeof document < "u") {
      const e = new CustomEvent("auth-session-expired", {
        detail: {
          message: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an."
        },
        bubbles: !0,
        composed: !0
      });
      this.dispatchEvent(e), document.dispatchEvent(e);
    }
  }
  async getAccessTokenAsync(e = !1) {
    try {
      const t = await this._acquireTokenSilent(e);
      return t ? this.logger.debug("getAccessTokenAsync: Token resolved (masked) length:", t.length) : this.logger.debug("getAccessTokenAsync: No token - likely session expired or interaction required"), t;
    } catch (t) {
      return t.message === "INTERACTION_REQUIRED" ? (this.logger.info("Session expired - user notification shown"), null) : (this.logger.warn("getAccessTokenAsync failed", t), null);
    }
  }
  async refreshToken(e = !1) {
    return this._acquireTokenSilent(e);
  }
  /**
   * Get access token - delegates to async version for MSAL compatibility
   * This method is called by API service and must return a Promise
   * @param {boolean} forceRefresh - Force token refresh if expired
   * @returns {Promise<string|null>} Access token
   */
  async getAccessToken(e = !1) {
    const t = await this.getAccessTokenAsync(e);
    return this.logger.debug("getAccessToken called, returning token:", t ? "YES" : "NO"), t;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback();
    try {
      this.msalInstance && this._msalEventCallbackId && typeof this.msalInstance.removeEventCallback == "function" && (this.msalInstance.removeEventCallback(this._msalEventCallbackId), this._msalEventCallbackId = null, this.logger.debug("removed event callback"));
    } catch (t) {
      this.logger.warn("failed to remove event callback", t);
    }
    try {
      typeof window < "u" && ((e = window.__twrMsal) == null ? void 0 : e.owner) === this && (delete window.__twrMsal, delete window.__twrMsalPromise);
    } catch {
    }
  }
  render() {
    var e, t;
    return this.isMsalInitialized ? u`
      <div class="auth-container">
        <!--div class="auth-header">
          <div class="auth-title">Authentifizierung</div>
          <div class="auth-subtitle">
           DEMO
          </div>
        </div -->

        ${this.error ? u`
          <div class="error">${this.error}</div>
        ` : ""}

        ${this.isAuthenticated ? u`
          <div class="user-info">
            <div class="user-email">
              Angemeldet als: ${((e = this.user) == null ? void 0 : e.email) || ((t = this.user) == null ? void 0 : t.username) || ""}
            </div>
            <button class="logout-button btn btn-secondary" @click=${() => this._openLogoutModal()}>
              Abmelden
            </button>
          </div>
        ` : u`
          <div class="auth-choice">
            <div class="auth-card">
              <!--div class="auth-card__icon">🔐</div>
              <h3>Ich habe bereits ein Konto</h3>
              <p>Melden Sie sich mit Ihrer bestehenden Microsoft&nbsp;Entra ID an.</p>
              <ul class="auth-card__list">
                <li>Anmeldung über sicheren Microsoft Login</li>
                <li>Zugriff auf persönliche Buchungen</li>
              </ul-->
              <button class="btn btn-primary" @click=${() => this.login()} ?disabled=${this.isLoading}>
                ${this.pendingAction === "login" ? "Weiterleitung…" : "Anmelden"}
              </button>
            </div>
            <div class="auth-card">
              <!--div class="auth-card__icon">🆕</div>
              <h3>Ich benötige ein Konto</h3>
              <p>Starten Sie den Registrierungs-Flow und erstellen Sie Ihre Entra ID.</p>
              <ul class="auth-card__list">
                <li>Geführter Registrierungsprozess</li>
                <li>Direkter Zugang nach Abschluss</li>
              </ul -->
              <button class="btn btn-outline" @click=${() => this.register()} ?disabled=${this.isLoading}>
                ${this.pendingAction === "register" ? "Weiterleitung…" : "Konto erstellen"}
              </button>
            </div>
          </div>

          ${this.isLoading ? u`
            <div class="loading" role="status">
              <div class="spinner"></div>
              <span>${this.pendingAction === "processing" ? "Authentifizierung wird abgeschlossen…" : this.pendingAction === "register" ? "Registrierungs-Flow wird vorbereitet…" : "Anmeldung wird vorbereitet…"}</span>
            </div>
          ` : ""}
        `}
      </div>
      ${this.renderLogoutModal()}
    ` : u`
        <div class="auth-container">
          <div class="loading" role="status">
            <div class="spinner"></div>
            <span>${this.pendingAction === "processing" ? "Authentifizierung wird abgeschlossen…" : "Authentifizierung initialisieren…"}</span>
          </div>
        </div>
      `;
  }
  // Append logout modal to render tree
  renderLogoutModal() {
    return this.showLogoutModal ? u`
      <dialog id="logout-dialog" class="modal" aria-labelledby="logout-confirm-title" @cancel=${(e) => {
      e.preventDefault(), this._closeLogoutModal();
    }} @click=${(e) => {
      e.target.tagName === "DIALOG" && this._closeLogoutModal();
    }}>
          <h3 id="logout-confirm-title">Abmelden</h3>
          <p>Sind Sie sicher, dass Sie sich abmelden möchten? Dies beendet Ihre aktive Sitzung.</p>
          <div class="modal-actions">
            <button class="btn btn-danger" @click=${() => this._performLogout()} ?disabled=${this.isLoading}>Abmelden</button>
            <button class="btn btn-secondary" @click=${this._closeLogoutModal} ?disabled=${this.isLoading}>Abbrechen</button>
          </div>
      </dialog>
    ` : "";
  }
}
N(Ft, "properties", {
  isAuthenticated: { type: Boolean },
  isLoading: { type: Boolean },
  isMsalInitialized: { type: Boolean },
  showLogoutModal: { type: Boolean },
  user: { type: Object },
  error: { type: String },
  theme: { type: String },
  apiMode: { type: String },
  // 'demo', 'local', 'live'
  redirectUri: { type: String },
  pendingAction: { type: String },
  cacheLocation: { type: String, attribute: "cache-location", reflect: !0 },
  // When true, this instance is only used as a cross-subdomain ssoSilent
  // bootstrap (auto-mounted by <header-account-menu>). It runs MSAL init +
  // ssoSilent and applies tokens on success — but on failure it MUST NOT
  // touch shared state (cookies, auth-changed events, isAuthenticated=false
  // dispatches) because that would destroy the existing UX fallback that
  // displays the user as logged in via the parent-domain hint cookie.
  passive: { type: Boolean, attribute: "passive", reflect: !0 },
  // Optional override for the redirect_uri sent ONLY to ssoSilent. Use this
  // when the bare origin would be caught by CMS rewrites that strip the URL
  // hash (e.g. ASP.NET WebForms session URLs). Must point to a URL that the
  // server delivers with HTTP 200 and stable URL (no client-side replace).
  // Accepts an absolute URL or a path relative to the current origin.
  // The interactive login flow continues to use `redirectUri` / window.location.href.
  silentRedirectUri: { type: String, attribute: "silent-redirect-uri" }
}), N(Ft, "styles", [ut, ie`
    :host {
      display: block;
      font-family: var(--font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
      color: var(--text-color, #333);
      background-color: var(--bg-color, #fff);
      // padding: var(--spacing-lg, 20px);
      max-width: 400px;
      margin: 0 auto;
    }

    .auth-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg, 20px);
      align-items: center;
      text-align: center;
    }

    .auth-header {
      margin-bottom: var(--spacing-md, 15px);
    }

    .auth-title {
      font-size: 1.5em;
      font-weight: 700;
      color: var(--primary-color, #4a5568);
      margin-bottom: var(--spacing-sm, 10px);
    }



   


    .auth-button {

      width: 100%;
    }

    // .auth-button:hover {
    //   transform: translateY(-2px);
    //   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    // }

    .auth-button:active {
      transform: translateY(0);
    }

    .auth-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    /*
     * <oauth-login> renders the "Angemeldet als …" / Abmelden block.
     * All spacings, colours and the logout-button styling are exposed as
     * CSS Custom Properties so host pages can theme the Shadow-DOM content
     * from the outside.
     *
     * Naming: --auth-component-* (this component) — distinct from
     * --header-menu-* on <header-account-menu>.
     */
    .user-info {
      padding: var(--auth-component-user-info-padding, var(--spacing-lg, 20px));
      margin-top: var(--auth-component-user-info-margin-top, 0);
      background: var(--auth-component-user-info-bg, transparent);
      border: var(--auth-component-user-info-border, none);
      border-radius: var(--auth-component-user-info-border-radius, 0);
      width: 100%;
    }

    .user-name {
      font-weight: var(--auth-component-user-name-font-weight, 600);
      font-size: var(--auth-component-user-name-font-size, 1.1em);
      color: var(--auth-component-user-name-color, var(--primary-color, #4a5568));
      margin-bottom: var(--auth-component-user-name-margin-bottom, var(--spacing-xs, 5px));
    }

    .user-email {
      color: var(--auth-component-user-email-color, var(--text-secondary, #666));
      font-size: var(--auth-component-user-email-font-size, 0.9em);
      margin-bottom: var(--auth-component-user-email-margin-bottom, 0);
    }

    .logout-button {
      width: 100%;
      margin-top: var(--auth-component-logout-margin-top, 0.75rem);
      padding: var(--auth-component-logout-padding, 0.6rem 1.5rem);
      font-size: var(--auth-component-logout-font-size, 0.9em);
      font-weight: var(--auth-component-logout-font-weight, normal);
      text-transform: var(--auth-component-logout-text-transform, none);
      letter-spacing: var(--auth-component-logout-letter-spacing, normal);
      color: var(--auth-component-logout-color, inherit);
      background: var(--auth-component-logout-bg, transparent);
      border: var(--auth-component-logout-border, 1px solid currentColor);
      border-radius: var(--auth-component-logout-border-radius, 999px);
      cursor: pointer;
      transition: var(--auth-component-logout-transition, background 0.2s ease, color 0.2s ease);
    }

    .logout-button:hover {
      background: var(--auth-component-logout-hover-bg, rgba(0, 0, 0, 0.04));
      color: var(--auth-component-logout-hover-color, var(--auth-component-logout-color, inherit));
      border-color: var(--auth-component-logout-hover-border-color, currentColor);
    }

    .loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 10px);
      color: var(--text-secondary, #666);
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color, #e2e8f0);
      border-top: 2px solid var(--primary-color, #4a5568);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error {
      background-color: var(--error-bg, #fed7d7);
      color: var(--error-color, #e53e3e);
      border: 1px solid var(--error-border, #feb2b2);
      border-radius: var(--border-radius, 8px);
      padding: var(--spacing-md, 15px);
      font-size: 0.9em;
      text-align: center;
    }

    .token-info {
      background-color: var(--info-bg, #ebf8ff);
      border: 1px solid var(--info-border, #90cdf4);
      border-radius: var(--border-radius, 8px);
      padding: var(--spacing-md, 15px);
      font-size: 0.8em;
      color: var(--text-secondary, #666);
      margin-top: var(--spacing-md, 15px);
      word-break: break-all;
    }

    .token-label {
      font-weight: 600;
      color: var(--primary-color, #4a5568);
      margin-bottom: var(--spacing-xs, 5px);
    }

    .auth-choice {
      display: grid;
      gap: var(--spacing-lg, 20px);
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      width: 100%;
    }

    .auth-card {
      /* border: 1px solid var(--border-color, #e2e8f0); */
      /* border-radius: var(--border-radius, 8px); */
      padding: var(--spacing-lg, 20px);
      text-align: left;
      /* background-color: var(--card-bg, #f8f9fa); */
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 10px);
    }

    /* .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      border-radius: var(--border-radius, 6px);
      border: 1px solid transparent;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: var(--primary-color, #4a5568);
      color: white;
    }

    .btn-secondary {
      background-color: var(--bg-secondary, #edf2f7);
      color: var(--text-color, #333);
      border-color: var(--border-color, #e2e8f0);
    } */

    .btn-outline {
      background: transparent;
      border-color: var(--primary-color, #4a5568);
      color: var(--primary-color, #4a5568);
    }

    .auth-card__icon {
      font-size: 1.75rem;
    }

    .auth-card__list {
      margin: 0;
      padding-left: 1.2rem;
      color: var(--text-secondary, #666);
      font-size: 0.9em;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    /* Modal styles – native <dialog> */
    dialog.modal {
      background: var(--bg-color, white);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      width: min(560px, 100%);
      max-width: 100%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      border: none;
      color: inherit;
      font-family: inherit;
      overscroll-behavior: contain;
    }

    dialog.modal::backdrop {
      background:  rgba(255,255,255, 0.5);
    }

    dialog.modal[open] {
      animation: modal-fade-in 0.2s ease-out;
    }

    @keyframes modal-fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .modal h3 { margin: 0 0 0.5rem 0; }
    .modal p { margin: 0 0 1rem 0; color: var(--text-secondary, #6b7280); }
    .modal-actions { display:flex; gap: 0.5rem; justify-content: flex-end; }
  `]);
customElements.get("oauth-login") || customElements.define("oauth-login", Ft);
const hr = "oauth-auth-component";
if (!customElements.get(hr)) {
  class c extends Ft {
  }
  customElements.define(hr, c);
}
const be = class be extends yr($e) {
  constructor() {
    super();
    N(this, "_handleStorageChange", (t) => {
      t.key && this._isRelevantMSALKey(t.key) && (console.debug("🔄 [HeaderAccountMenu] MSAL storage changed:", t.key), this._storageDebounceTimer && clearTimeout(this._storageDebounceTimer), this._storageDebounceTimer = setTimeout(() => {
        this._cachedMSALUser = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), this._checkMSALStorage(), this._loadCachedProfileData(), this.requestUpdate();
      }, 300)), t.key && (t.key.includes("_accountProfile_") || t.key.includes("_clubStatus_")) && (console.log("🔄 [HeaderAccountMenu] Profile cache changed:", t.key), this._loadCachedProfileData()), (t.key === "twerenbold_current_user_id" || t.key === "twerenbold_userId") && (this._cachedMSALUser = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), this._checkMSALStorage(), this._loadCachedProfileData());
    });
    this.accountUrl = "", this.loginUrl = "", this.registerUrl = "", this.variant = "default", this.menuOpen = !1, this.headless = !1, this.silentRedirectUri = "/webauswahl.aspx", this._cachedProfile = null, this._cachedClubStatus = null, this._cachedMSALUser = typeof window < "u" && window.__twerenbold_cached_msal_user || null, this._boundOutsideClick = (t) => this._handleOutsideClick(t), this.cacheMaxAge = 1440 * 60 * 1e3, this._previousAuthStatus = !1, this._logoutMessage = null, this._lastAuthChangeAt = 0, this._storageDebounceTimer = null, this._autoFillerProfile = null, this._snapshotApplied = !1, this._snapshot = null, this._readyMarked = !1, this._silentSsoFailed = !1, this._applyPreloadSnapshot();
  }
  connectedCallback() {
    var t, i;
    super.connectedCallback(), document.addEventListener("click", this._boundOutsideClick, !0);
    try {
      requestAnimationFrame(() => {
        this.classList.add("loaded");
      });
    } catch (r) {
      console.error(r);
    }
    this._checkMSALStorage(), this._loadCachedProfileData(), window.addEventListener("storage", this._handleStorageChange), this._boundAuthChanged = this._handleAuthChanged.bind(this), window.addEventListener("auth-changed", this._boundAuthChanged), this._boundSilentSsoFailed = () => {
      this._silentSsoFailed = !0, this.requestUpdate();
    }, window.addEventListener("twerenbold:silent-sso-unavailable", this._boundSilentSsoFailed), this._boundPostLogout = () => this._clearSnapshot(), window.addEventListener("twerenbold:post-logout", this._boundPostLogout), window.addEventListener("twerenbold:request-logout", this._boundPostLogout), this._boundAutoFillerData = this._handleAutoFillerData.bind(this), document.addEventListener("twerenbold:auto-filler-data", this._boundAutoFillerData), this._checkAutoFillerGlobal(), console.log("🎯 [HeaderAccountMenu] Connected:", {
      isAuthenticated: this._isAuthenticated,
      hasProfile: !!this._profile,
      hasCachedProfile: !!this._cachedProfile,
      hasAuthUser: !!this._authUser,
      displayName: this._displayName,
      email: this._email,
      loginUrl: this.loginUrl,
      registerUrl: this.registerUrl,
      hasLoginAction: !!((t = this.appActions) != null && t.login),
      hasRegisterAction: !!((i = this.appActions) != null && i.register),
      hasMSALTokens: this._hasMSALTokens(),
      hasAuthSessionCookie: this._hasAuthSessionCookie()
    }), this._ensureOAuthLoginMounted();
  }
  /**
   * Check if the Azure session cookie is set
   * This cookie is set by oauth-login when user is authenticated
   */
  _hasAuthSessionCookie() {
    if (typeof document > "u") return !1;
    try {
      return document.cookie.split("; ").some((t) => t.startsWith("try_silent_login=true"));
    } catch (t) {
      return console.warn("⚠️ [HeaderAccountMenu] Failed to read auth session cookie:", t), !1;
    }
  }
  /**
   * Make sure exactly one <oauth-login> element exists in the document.
   * If another component (e.g. account-portal-embed) already created one,
   * we leave it alone. Otherwise we append a hidden instance to <body> so
   * oauth-login's connectedCallback fires and runs MSAL init + the
   * cross-subdomain ssoSilent bootstrap (see oauth-login.js).
   */
  _ensureOAuthLoginMounted() {
    var o;
    if (typeof document > "u") return;
    const t = "🔁 [HeaderAccountMenu][AuthMount]";
    if (typeof window < "u" && ((o = window.twerenboldConfig) == null ? void 0 : o.crossDomainAuth) === "cookie-only") {
      console.log(`${t} crossDomainAuth='cookie-only' — skipping oauth-login bootstrap (cookie-based state only)`);
      return;
    }
    if (document.querySelector("oauth-login, oauth-auth-component, [data-auth-component]")) {
      console.log(`${t} oauth-login already present in DOM — skipping auto-mount`);
      return;
    }
    const r = document.querySelector("twerenbold-account-embed, account-portal-embed");
    if (r) {
      console.log(`${t} <${r.tagName.toLowerCase()}> on page — portal will provide oauth-login, skipping auto-mount`);
      return;
    }
    try {
      const a = document.createElement("oauth-login");
      a.setAttribute("data-auto-mounted-by", "header-account-menu"), a.setAttribute("passive", ""), this.silentRedirectUri && a.setAttribute("silent-redirect-uri", this.silentRedirectUri), a.style.display = "none", document.body.appendChild(a), this._autoMountedOauthLogin = a, console.log(`${t} ✅ auto-mounted hidden <oauth-login passive> (origin=${window.location.origin}${this.silentRedirectUri ? `, silentRedirectUri=${this.silentRedirectUri}` : ""})`);
    } catch (a) {
      console.warn(`${t} failed to auto-mount oauth-login:`, a);
    }
  }
  _hasMSALTokens() {
    if (typeof localStorage > "u") return !1;
    for (let t = 0; t < localStorage.length; t++) {
      const i = localStorage.key(t);
      if (i && i.startsWith("msal."))
        return !0;
    }
    return !1;
  }
  /**
   * Check if a non-expired MSAL access token exists in localStorage.
   * MSAL keeps account keys even after token expiry, so this is more reliable
   * than _hasMSALTokens() for determining if the user is truly still authenticated.
   */
  _hasValidMSALAccessToken() {
    var i;
    if (typeof localStorage > "u") return !1;
    const t = Math.floor(Date.now() / 1e3);
    for (let r = 0; r < localStorage.length; r++) {
      const o = localStorage.key(r);
      if (!(!o || !o.toLowerCase().includes("accesstoken")))
        try {
          const a = JSON.parse(localStorage.getItem(o));
          if (a && ((i = a.credentialType) == null ? void 0 : i.toLowerCase()) === "accesstoken" && a.secret && (!a.tokenType || a.tokenType.toLowerCase() === "bearer") && a.expiresOn && parseInt(a.expiresOn, 10) > t)
            return !0;
        } catch {
        }
    }
    return !1;
  }
  _checkMSALStorage() {
    this._hasMSALTokens() && (console.debug("🔐 [HeaderAccountMenu] MSAL tokens detected in localStorage"), this._cachedMSALUser || (this._cachedMSALUser = this._extractMSALUser(), this._cachedMSALUser && (typeof window < "u" && (window.__twerenbold_cached_msal_user = this._cachedMSALUser), console.debug("👤 [HeaderAccountMenu] Extracted and cached MSAL user (shared):", this._cachedMSALUser))));
  }
  _extractMSALUser() {
    if (typeof window < "u" && window.__twerenbold_cached_msal_user)
      return console.debug("👤 [HeaderAccountMenu] Found cached MSAL user in window global:", window.__twerenbold_cached_msal_user), window.__twerenbold_cached_msal_user;
    if (typeof localStorage > "u") return null;
    try {
      const t = localStorage.getItem("twerenbold_current_user_id") || localStorage.getItem("twerenbold_userId");
      if (t)
        return console.debug("🔍 [HeaderAccountMenu] Found user ID from API service:", t), {
          userId: t,
          localAccountId: t,
          homeAccountId: t
        };
      const i = localStorage.getItem("msal.account.keys"), r = JSON.parse(i || "[]");
      if (Array.isArray(r) && r.length > 0) {
        const o = r[0], a = localStorage.getItem(o), n = a ? JSON.parse(a) : null;
        if (n && typeof n == "object")
          return {
            ...n,
            userId: n.localAccountId || n.homeAccountId || n.oid || n.sub || n.username || n.email || null
          };
      }
      for (let o = 0; o < localStorage.length; o++) {
        const a = localStorage.key(o);
        if (!(!a || !a.includes("msal") || !a.includes("account")))
          try {
            const n = localStorage.getItem(a);
            if (!n) continue;
            const s = JSON.parse(n);
            if (!s || typeof s != "object") continue;
            const l = s.localAccountId || s.homeAccountId || s.oid || s.sub || s.username || s.email;
            if (l)
              return {
                ...s,
                userId: l
              };
          } catch {
          }
      }
    } catch (t) {
      console.warn("⚠️ [HeaderAccountMenu] Failed to extract MSAL user:", t);
    }
    return null;
  }
  /**
   * Load cached profile data from localStorage (API Service cache)
   * Cache key format: `${mode}_accountProfile_${userId}`
   */
  _loadCachedProfileData() {
    var t, i, r, o, a;
    if (typeof localStorage > "u") {
      this._cachedProfile = null;
      return;
    }
    try {
      const n = this._cachedMSALUser || this._extractMSALUser();
      n || console.log("ℹ️ [HeaderAccountMenu] No MSAL user found for targeted cache lookup, trying generic cache scan"), n && !this._cachedMSALUser && (this._cachedMSALUser = n), console.log("🔍 [HeaderAccountMenu] Looking for profile cache with user:", n);
      const s = n ? [
        n.userId,
        n.localAccountId,
        n.homeAccountId,
        n.email
      ].filter(Boolean) : [];
      console.log("🔑 [HeaderAccountMenu] Trying user IDs:", s);
      for (const p of s) {
        const h = [
          `live_accountProfile_${p}`,
          `demo_accountProfile_${p}`
        ], m = [
          `live_clubStatus_${p}`,
          `demo_clubStatus_${p}`
        ];
        for (const b of h) {
          const v = localStorage.getItem(b);
          if (v) {
            const y = JSON.parse(v), I = Date.now() - y.timestamp, M = this.cacheMaxAge;
            if (I < M) {
              console.log("✅ [HeaderAccountMenu] Loaded cached profile from localStorage:", {
                cacheKey: b,
                age: Math.round(I / 1e3) + "s",
                firstName: (t = y.data) == null ? void 0 : t.firstName,
                lastName: (i = y.data) == null ? void 0 : i.lastName,
                email: (r = y.data) == null ? void 0 : r.email
              }), this._cachedProfile = y.data, this.requestUpdate();
              break;
            } else
              console.log("⏱️ [HeaderAccountMenu] Cache expired:", {
                cacheKey: b,
                age: Math.round(I / 1e3) + "s"
              });
          }
        }
        for (const b of m) {
          const v = localStorage.getItem(b);
          if (!v) continue;
          const y = JSON.parse(v), I = Date.now() - y.timestamp, M = this.cacheMaxAge;
          if (!(I >= M)) {
            this._cachedClubStatus = y.data || null, this.requestUpdate();
            break;
          }
        }
      }
      console.log("🔍 [HeaderAccountMenu] Trying fallback: scanning all localStorage keys...");
      let l = !!this._cachedProfile, g = !!this._cachedClubStatus;
      for (let p = 0; p < localStorage.length; p++) {
        const h = localStorage.key(p);
        if (h && h.includes("_accountProfile_")) {
          console.log("📦 [HeaderAccountMenu] Found cache key:", h);
          const m = localStorage.getItem(h);
          if (m) {
            const b = JSON.parse(m), v = Date.now() - b.timestamp, y = this.cacheMaxAge;
            v < y && (console.log("✅ [HeaderAccountMenu] Using fallback cache:", {
              key: h,
              firstName: (o = b.data) == null ? void 0 : o.firstName,
              lastName: (a = b.data) == null ? void 0 : a.lastName
            }), this._cachedProfile = b.data, l = !0, this.requestUpdate());
          }
        }
        if (h && h.includes("_clubStatus_")) {
          const m = localStorage.getItem(h);
          if (m) {
            const b = JSON.parse(m), v = Date.now() - b.timestamp, y = this.cacheMaxAge;
            v < y && (this._cachedClubStatus = b.data || null, g = !0, this.requestUpdate());
          }
        }
      }
      l || (console.log("❌ [HeaderAccountMenu] No valid cached profile found in localStorage"), this._cachedProfile = null), g || (this._cachedClubStatus = null);
    } catch (n) {
      console.warn("⚠️ [HeaderAccountMenu] Failed to load cached profile:", n), this._cachedProfile = null, this._cachedClubStatus = null;
    }
  }
  /**
   * Ignore MSAL keys that are not auth-relevant (telemetry, version, etc.)
   * These change frequently and would cause unnecessary cache invalidation & flicker.
   */
  _isRelevantMSALKey(t) {
    return !(!t || !t.startsWith("msal.") || t.includes("server-telemetry") || t.includes("msal.version") || t.includes("msal.throttling"));
  }
  /**
   * Handle data broadcast from auto-form-filler component.
   * This provides profile data on pages without the account embed.
   */
  _handleAutoFillerData(t) {
    const i = t == null ? void 0 : t.detail;
    i != null && i.profile && (console.debug("📥 [HeaderAccountMenu] Received auto-filler data:", {
      firstName: i.profile.firstName,
      lastName: i.profile.lastName,
      email: i.profile.email
    }), this._autoFillerProfile = i.profile, this.requestUpdate());
  }
  /**
   * Check the global auto-filler API handle for already-available profile data.
   * The auto-filler may have loaded and broadcast data before this component connected.
   */
  _checkAutoFillerGlobal() {
    var i;
    if (typeof window > "u") return;
    const t = window.__twerenboldAutoFiller;
    (i = t == null ? void 0 : t.data) != null && i.profile && (console.debug("📥 [HeaderAccountMenu] Found existing auto-filler data:", {
      firstName: t.data.profile.firstName,
      lastName: t.data.profile.lastName,
      email: t.data.profile.email
    }), this._autoFillerProfile = t.data.profile);
  }
  _handleAuthChanged(t) {
    console.debug("🔄 [HeaderAccountMenu] Auth changed event received:", t.detail);
    const { isAuthenticated: i, user: r } = t.detail;
    i && r ? (this._cachedMSALUser = {
      name: r.name,
      email: r.username,
      username: r.username,
      localAccountId: r.id
    }, typeof window < "u" && (window.__twerenbold_cached_msal_user = this._cachedMSALUser), this._loadCachedProfileData()) : (this._cachedMSALUser = null, this._cachedProfile = null, this._cachedClubStatus = null, this._autoFillerProfile = null, this._clearSnapshot(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null)), this._lastAuthChangeAt = Date.now(), this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundOutsideClick, !0), window.removeEventListener("storage", this._handleStorageChange), this._boundAuthChanged && window.removeEventListener("auth-changed", this._boundAuthChanged), this._boundSilentSsoFailed && window.removeEventListener("twerenbold:silent-sso-unavailable", this._boundSilentSsoFailed), this._boundPostLogout && (window.removeEventListener("twerenbold:post-logout", this._boundPostLogout), window.removeEventListener("twerenbold:request-logout", this._boundPostLogout)), this._boundAutoFillerData && document.removeEventListener("twerenbold:auto-filler-data", this._boundAutoFillerData), this._storageDebounceTimer && (clearTimeout(this._storageDebounceTimer), this._storageDebounceTimer = null), this._autoMountedOauthLogin && this._autoMountedOauthLogin.isConnected && (this._autoMountedOauthLogin.remove(), this._autoMountedOauthLogin = null);
  }
  updated(t) {
    var i, r;
    if ((i = super.updated) == null || i.call(this, t), t.has("appState")) {
      const o = !!((r = this.appState) != null && r.isAuthenticated);
      this._previousAuthStatus !== o && (console.debug("🔄 [HeaderAccountMenu] App state changed (auth):", {
        isAuthenticated: o,
        displayName: this._displayName,
        email: this._email,
        statusLabel: this._statusLabel,
        profile: this._profile ? "present" : "missing"
      }), this._lastAuthChangeAt = Date.now()), this._previousAuthStatus = o;
    }
    this._publishFallbackBridge(), this._persistSnapshot(), this._readyMarked || (this._readyMarked = !0, this.setAttribute("data-ready", ""));
  }
  /**
   * Auto-bootstrap a minimal `window.__twerenboldAppState` bridge so host pages
   * can read auth state without mounting <app-state-provider>.
   *
   * If a real provider is already mounted (`existing.provider` truthy), we do NOT overwrite.
   * Real providers always win because their state is canonical.
   */
  _publishFallbackBridge() {
    if (typeof window > "u") return;
    const t = window.__twerenboldAppState;
    if (t != null && t.provider) return;
    const i = this._profile || null, r = {
      isAuthenticated: this._isAuthenticated,
      authUser: this._authUser || null,
      profile: i,
      // Mirror under the key the provider uses, so consumers reading the
      // canonical shape (`state.accountProfile`) work too.
      accountProfile: i,
      email: this._email || null,
      displayName: this._displayName || null,
      isInitializing: !1,
      // Fallback bridge has no async profile fetch — mark as loaded so
      // _shouldShowProfileLoading() doesn't get stuck on "Profil wird geladen…"
      accountLoaded: !0,
      fallback: !0
    }, o = t == null ? void 0 : t.state;
    if (o && o.isAuthenticated === r.isAuthenticated && o.email === r.email && o.displayName === r.displayName && o.fallback === !0) return;
    const n = {
      login: () => this._handleLogin(),
      logout: () => this._handleLogout(),
      register: () => this._handleRegister(),
      // Marker: these belong to the header's OWN fallback bridge. _handleLogout
      // must NOT delegate to actions.logout here — it calls _handleLogout()
      // again → infinite recursion. Real AppStateProvider actions lack this.
      _headerFallback: !0
    };
    window.__twerenboldAppState = {
      state: r,
      actions: n,
      provider: null,
      fallbackSource: "header-account-menu",
      timestamp: Date.now()
    };
    try {
      window.dispatchEvent(new CustomEvent("twerenbold:app-state", {
        detail: { state: r, actions: n, provider: null, fallback: !0 }
      }));
    } catch {
    }
  }
  // 24h
  _applyPreloadSnapshot() {
    let t = null;
    try {
      if (typeof window < "u" && window.__twerenboldHeaderSnapshot)
        t = window.__twerenboldHeaderSnapshot;
      else if (typeof localStorage < "u") {
        const r = localStorage.getItem(be._SNAPSHOT_KEY);
        r && (t = JSON.parse(r));
      }
    } catch {
    }
    !t || typeof t != "object" || (t.timestamp ? Date.now() - t.timestamp : 1 / 0) > be._SNAPSHOT_TTL_MS || t.isAuthenticated === !0 && (t.profile && (this._cachedProfile = t.profile), t.authUser && !this._cachedMSALUser && (this._cachedMSALUser = t.authUser), this._snapshot = t, this._snapshotApplied = !0);
  }
  _persistSnapshot() {
    if (!(typeof localStorage > "u"))
      try {
        if (!this._isAuthenticated) {
          (this._lastPersistedSnapshot || localStorage.getItem(be._SNAPSHOT_KEY)) && this._clearSnapshot();
          return;
        }
        const t = this._displayName, i = this._email;
        if (!t && !i) return;
        const r = this._profile, o = this._authUser, a = r ? {
          firstName: r.firstName || null,
          lastName: r.lastName || null,
          email: r.email || r.username || null
        } : null, n = o ? {
          name: o.name || null,
          username: o.username || o.email || null,
          localAccountId: o.localAccountId || o.userId || null
        } : null, s = {
          version: 1,
          timestamp: Date.now(),
          isAuthenticated: !0,
          displayName: t || null,
          email: i || null,
          profile: a,
          authUser: n
        }, l = this._lastPersistedSnapshot;
        if (l && l.displayName === s.displayName && l.email === s.email) return;
        localStorage.setItem(be._SNAPSHOT_KEY, JSON.stringify(s)), this._lastPersistedSnapshot = s;
      } catch {
      }
  }
  _clearSnapshot() {
    if (!(typeof localStorage > "u"))
      try {
        localStorage.removeItem(be._SNAPSHOT_KEY), typeof window < "u" && (window.__twerenboldHeaderSnapshot = null), this._snapshot = null, this._snapshotApplied = !1, this._lastPersistedSnapshot = null;
      } catch {
      }
  }
  get _isAuthenticated() {
    var n;
    if (!this._hasMSALTokens() && this._hasAuthSessionCookie() && !this._silentSsoFailed)
      return !0;
    if (this.appState && typeof this.appState.isAuthenticated == "boolean")
      return !!(this.appState.isAuthenticated || (this.appState.isInitializing || !this.appState.authComponent && !this.appState.accountLoaded) && this._hasMSALTokens() || this._lastAuthChangeAt && Date.now() - this._lastAuthChangeAt < 600 && this._hasMSALTokens());
    const t = !!this._authUser, i = !!this._profile, r = this._hasMSALTokens(), o = this._hasAuthSessionCookie();
    console.debug("🔐 [HeaderAccountMenu] _isAuthenticated check:", {
      appStateAuth: (n = this.appState) == null ? void 0 : n.isAuthenticated,
      hasTokens: r,
      hasUser: t,
      hasProfile: i,
      hasSessionCookie: o
    });
    const a = this._hasValidMSALAccessToken();
    return o && (t || i || r) ? (console.debug("✅ [HeaderAccountMenu] Auth via session cookie + local data"), !0) : a && (t || i);
  }
  get _profile() {
    var t;
    return (t = this.appState) != null && t.accountProfile ? this.appState.accountProfile : this._cachedProfile ? this._cachedProfile : this._autoFillerProfile || null;
  }
  get _authUser() {
    var t;
    return (t = this.appState) != null && t.authUser ? this.appState.authUser : (this._hasMSALTokens() && !this._cachedMSALUser && (this._cachedMSALUser = this._extractMSALUser()), this._cachedMSALUser || null);
  }
  /**
   * Helper: returns true if a name string is empty or the placeholder "unknown"
   * that Entra ID sometimes returns.
   */
  _isUnknownName(t) {
    return t ? t.trim().toLowerCase() === "unknown" : !0;
  }
  get _displayName() {
    const t = this._profile, i = this._authUser, r = (t == null ? void 0 : t.personalData) || (t == null ? void 0 : t.personal) || t, o = this._isUnknownName(r == null ? void 0 : r.firstName) ? null : r == null ? void 0 : r.firstName, a = this._isUnknownName(r == null ? void 0 : r.lastName) ? null : r == null ? void 0 : r.lastName, n = o || a ? [o, a].filter(Boolean).join(" ") : (this._isUnknownName(t == null ? void 0 : t.displayName) ? null : t == null ? void 0 : t.displayName) || (this._isUnknownName(t == null ? void 0 : t.name) ? null : t == null ? void 0 : t.name), s = (this._isUnknownName(i == null ? void 0 : i.name) ? null : i == null ? void 0 : i.name) || (this._isUnknownName(i == null ? void 0 : i.displayName) ? null : i == null ? void 0 : i.displayName) || (this._isUnknownName(i == null ? void 0 : i.givenName) ? null : i == null ? void 0 : i.givenName), l = this._isUnknownName(this._displayNameFromCookie()) ? null : this._displayNameFromCookie();
    return n || s || l || "eingeloggt";
  }
  get _email() {
    const t = this._profile, i = this._authUser, r = (t == null ? void 0 : t.contactInformation) || (t == null ? void 0 : t.contact) || t;
    return (r == null ? void 0 : r.email) || (i == null ? void 0 : i.email) || (i == null ? void 0 : i.preferred_username) || (i == null ? void 0 : i.userPrincipalName) || (i == null ? void 0 : i.username) || // Last resort: parent-domain hint cookie set during the source-domain
    // login. Lets cross-subdomain pages (e.g. booking strecke) display the
    // user's email even when no real profile/tokens are available locally.
    this._loginHintFromCookie() || null;
  }
  _loginHintFromCookie() {
    return this._readDecodedCookie("tw_login_hint");
  }
  _displayNameFromCookie() {
    return this._readDecodedCookie("tw_user_name");
  }
  _readDecodedCookie(t) {
    if (typeof document > "u") return null;
    try {
      const i = `${t}=`, r = document.cookie.split("; ").find((a) => a.startsWith(i));
      return r && decodeURIComponent(r.substring(i.length)) || null;
    } catch {
      return null;
    }
  }
  get _initials() {
    const t = this._displayName, i = this._email;
    if (!t || t === "Angemeldet" || t === "eingeloggt")
      return i ? i.charAt(0).toUpperCase() : "U";
    const r = t.trim().split(/[\s-]+/).filter(Boolean);
    return r.length === 0 ? t.charAt(0).toUpperCase() : r.length === 1 ? r[0].charAt(0).toUpperCase() : `${r[0].charAt(0)}${r[r.length - 1].charAt(0)}`.toUpperCase();
  }
  get _statusLabel() {
    var r, o;
    const t = ((r = this.appState) == null ? void 0 : r.accountClubStatus) || this._cachedClubStatus || ((o = this._profile) == null ? void 0 : o.clubMembership) || null, i = (t == null ? void 0 : t.currentStatus) || (t == null ? void 0 : t.status);
    return i != null && i.name ? i.name : t != null && t.name ? t.name : null;
  }
  getText(t, i = null) {
    return O(t, "header", i, this.theme);
  }
  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  _shouldShowProfileLoading() {
    var o;
    const i = this._lastAuthChangeAt && Date.now() - this._lastAuthChangeAt < 400;
    if (((o = this.appState) == null ? void 0 : o.fallback) === !0) return !1;
    const r = !!(this._profile || this._authUser || this._cachedProfile || this._autoFillerProfile);
    return !!(this.appState && this.appState.isAuthenticated && !this.appState.accountLoaded && !r || i && !r);
  }
  _renderProfileLoadingMenu() {
    return u`
      <div class="twr-hm-dropdown">
        <div class="twr-hm-dropdown__section">
          <span class="twr-hm-dropdown__secondary">Profil wird geladen...</span>
        </div>
      </div>
    `;
  }
  _handleOutsideClick(t) {
    var r;
    if (!this.menuOpen)
      return;
    (((r = t.composedPath) == null ? void 0 : r.call(t)) || t.path || []).includes(this) || (this.menuOpen = !1);
  }
  /**
   * Fires before navigation when an account menu link is clicked.
   * Lets host pages close their navigation overlay or show a loading state
   * before the new page loads.
   *
   * Event: `twerenbold:navigate` (bubbles, on window)
   *   detail: { target: 'overview'|'profile'|'trips'|'watchlist'|'newsletter', href: string, originalEvent: MouseEvent }
   *
   * Calling event.preventDefault() inside the listener will cancel both the
   * dropdown close AND the link navigation (allowing SPA-style routing).
   */
  _handleNavClick(t, i, r) {
    const o = new CustomEvent("twerenbold:navigate", {
      bubbles: !0,
      cancelable: !0,
      detail: { target: i, href: r, originalEvent: t }
    });
    if (!window.dispatchEvent(o)) {
      t.preventDefault();
      return;
    }
    this.menuOpen = !1;
  }
  _handleLogin() {
    var t;
    if (this.menuOpen = !1, this.loginUrl && this.loginUrl !== "#") {
      console.log("🔗 [HeaderAccountMenu] Navigating to login URL:", this.loginUrl), window.location.assign(this.loginUrl);
      return;
    }
    (t = this.appActions) != null && t.login ? (console.log("🔐 [HeaderAccountMenu] Calling appActions.login()"), this.appActions.login()) : console.warn("⚠️ [HeaderAccountMenu] No login action available and no loginUrl set");
  }
  _handleRegister() {
    var t;
    if (this.menuOpen = !1, this.registerUrl && this.registerUrl !== "#") {
      console.log("🔗 [HeaderAccountMenu] Navigating to register URL:", this.registerUrl), window.location.assign(this.registerUrl);
      return;
    }
    (t = this.appActions) != null && t.register ? (console.log("📝 [HeaderAccountMenu] Calling appActions.register()"), this.appActions.register()) : console.warn("⚠️ [HeaderAccountMenu] No register action available and no registerUrl set");
  }
  _handleLogout() {
    var r, o, a;
    if (this._logoutInProgress) return;
    this._logoutInProgress = !0, setTimeout(() => {
      this._logoutInProgress = !1;
    }, 0), this.menuOpen = !1, ((n, s) => {
      var l;
      (l = this.appActions) != null && l.addNotification ? this.appActions.addNotification({ type: "info", title: n, message: s, duration: 3e3 }) : (this._logoutMessage = s, this.requestUpdate(), setTimeout(() => {
        this._logoutMessage = null, this.requestUpdate();
      }, 3e3));
    })("Abmeldung", "Wird ausgeloggt...");
    const i = this._findServerLogoutButton();
    if (i) {
      this._clearAuthHintCookies(), this._clearSnapshot(), this._localLogoutCleanup();
      try {
        sessionStorage.setItem("twerenbold_request_logout", "true");
      } catch {
      }
      try {
        window.dispatchEvent(new CustomEvent("twerenbold:request-logout", { bubbles: !0 }));
      } catch {
      }
      console.log("🔐 [HeaderAccountMenu] Submitting server-side SSO logout via #" + (i.id || i.name)), i.click();
      return;
    }
    if ((r = this.appActions) != null && r.logout && !this.appActions._headerFallback) {
      this.appActions.logout();
      return;
    }
    try {
      const n = ((a = (o = this.appState) == null ? void 0 : o.componentsConfig) == null ? void 0 : a.links) || {}, s = this.accountUrl || n.account || "/account";
      if (s) {
        try {
          sessionStorage.setItem("twerenbold_request_logout", "true");
        } catch {
        }
        try {
          window.dispatchEvent(new CustomEvent("twerenbold:request-logout", { bubbles: !0 }));
        } catch {
        }
        console.log("🔗 [HeaderAccountMenu] Navigating to account page to trigger proper logout:", s), window.location.assign(s);
        return;
      }
    } catch (n) {
      console.warn("⚠️ [HeaderAccountMenu] Failed to navigate to account page for logout:", n);
    }
    try {
      const n = document.querySelector("oauth-login") || document.querySelector("oauth-auth-component") || document.querySelector("[data-auth-component]") || document.querySelector("oauth-login-component");
      if (n) {
        if (console.log("🔐 [HeaderAccountMenu] Attempting logout via discovered auth component:", n), typeof n._performLogout == "function") {
          n._performLogout();
          return;
        } else if (typeof n._confirmAndLogout == "function") {
          n._confirmAndLogout();
          return;
        } else if (typeof n.logout == "function") {
          n.logout();
          return;
        }
      }
    } catch (n) {
      console.warn("⚠️ [HeaderAccountMenu] Error invoking fallback logout:", n);
    }
    console.warn("⚠️ [HeaderAccountMenu] No logout handler found - performing local cleanup"), this._clearAuthHintCookies(), this._clearSnapshot(), this._localLogoutCleanup();
    try {
      window.dispatchEvent(new CustomEvent("twerenbold:logout-fallback", { bubbles: !0 }));
    } catch {
    }
  }
  /**
   * Find the host CMS's hidden server-side SSO logout button.
   * Booking / CMS pages render an ASP.NET WebForms submit input
   * (id="BTN_OAUTH_Logout", name="ctl00$...$BTN_OAUTH_Logout").
   */
  _findServerLogoutButton() {
    return typeof document > "u" ? null : document.getElementById("BTN_OAUTH_Logout") || document.querySelector('input[name$="BTN_OAUTH_Logout"]');
  }
  /**
   * Clear the cross-subdomain auth hint cookies (try_silent_login,
   * tw_login_hint, tw_user_name). Unlike a failed silent SSO — where the
   * shared cookies must be left intact — an explicit logout SHOULD remove
   * them so no subdomain keeps showing the user as logged in.
   */
  _clearAuthHintCookies() {
    if (!(typeof document > "u"))
      try {
        const t = window.location.hostname, i = t.split("."), r = i.length > 2 ? "." + i.slice(-2).join(".") : null, o = [void 0, t, r].filter((n, s, l) => l.indexOf(n) === s);
        for (const n of ["try_silent_login", "tw_login_hint", "tw_user_name"])
          for (const s of o) {
            let l = `${n}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            s && (l += `; domain=${s}`), document.cookie = l;
          }
        let a = `tw_logged_out=${Date.now()}; path=/; SameSite=Lax; Max-Age=${1440 * 60}`;
        r && (a += `; domain=${r}`), window.location.protocol === "https:" && (a += "; Secure"), document.cookie = a;
      } catch (t) {
        console.warn("⚠️ [HeaderAccountMenu] Failed to clear auth hint cookies:", t);
      }
  }
  /**
   * Purge auth-related localStorage / sessionStorage for this origin.
   * Shared by the server-logout path and the final local fallback.
   */
  _localLogoutCleanup() {
    try {
      localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id");
      const t = [
        "_accountProfile_",
        "msal.",
        "msal.account.keys",
        "msal.version",
        "idtoken",
        "refreshtoken",
        "access_token",
        "id_token",
        "auth.twerenbold.ch",
        "server-telemetry-"
      ];
      for (let i = localStorage.length - 1; i >= 0; i--)
        try {
          const r = localStorage.key(i);
          if (!r) continue;
          t.some((a) => a.endsWith("-") ? r.indexOf(a) === 0 || r.includes(a) : r.includes(a) || r.startsWith(a)) && localStorage.removeItem(r);
        } catch (r) {
          console.warn("⚠️ Error while scanning localStorage keys for cleanup:", r);
        }
      try {
        localStorage.removeItem("msal.account.keys");
      } catch {
      }
      try {
        sessionStorage.removeItem("msal_logout_intent");
      } catch {
      }
      try {
        HubspotSPA.reset();
      } catch (i) {
        console.warn("⚠️ HubspotSPA.reset failed during logout cleanup", i);
      }
    } catch (t) {
      console.warn("⚠️ [HeaderAccountMenu] Local logout cleanup failed:", t);
    }
  }
  _renderAuthenticatedMenu() {
    var h, m, b, v, y;
    const t = this._displayName, i = this._email, r = this._statusLabel, o = (h = this.appState) == null ? void 0 : h.accountLoading, a = ((b = (m = this.appState) == null ? void 0 : m.componentsConfig) == null ? void 0 : b.links) || {}, n = this.accountUrl || a.account || null, s = ((y = (v = this._profile) == null ? void 0 : v.links) == null ? void 0 : y.personalData) || a.profile || (n ? `${n}#account` : null), l = a.trips || a.myTrips || (n ? `${n}#trips` : null), g = a.watchlist || a.favorites || (n ? `${n}#merkliste` : null), p = a.newsletter || (n ? `${n}#newsletter` : null);
    return u`
      <div class="twr-hm-dropdown">
        <div class="twr-hm-dropdown__section">
          <span class="twr-hm-dropdown__primary">${t}</span>
          ${i ? u`<span class="twr-hm-dropdown__secondary">${i}</span>` : ""}
          ${o ? u`
            <span class="twr-hm-dropdown__secondary" style="font-style: italic; color: #94a3b8;">
              Profil wird geladen...
            </span>
          ` : ""}
          ${r ? u`<!--<span class="twr-hm-status-badge">${r}</span>-->` : ""}
        </div>
        <div class="twr-hm-dropdown__actions">
          ${n ? u`<a href="${n}" data-nav-target="overview" @click=${(I) => this._handleNavClick(I, "overview", n)}><span class="twr-hm-action-label">${this.getText("accountOverview", "Kontoübersicht")}</span></a>` : ""}
          ${s ? u`<a href="${s}" data-nav-target="profile" @click=${(I) => this._handleNavClick(I, "profile", s)}><span class="twr-hm-action-label">${this.getText("personalData", "Persönliche Daten")}</span></a>` : u`<div>${this.getText("personalData", "Persönliche Daten")}</div>`}

          ${l ? u`<a href="${l}" data-nav-target="trips" @click=${(I) => this._handleNavClick(I, "trips", l)}><span class="twr-hm-action-label">${this.getText("myTrips", "Meine Reisen")}</span></a>` : u`<div>${this.getText("myTrips", "Meine Reisen")}</div>`}

          ${g ? u`<a href="${g}" data-nav-target="watchlist" @click=${(I) => this._handleNavClick(I, "watchlist", g)}><span class="twr-hm-action-label">${this.getText("watchlist", "Merkliste")}</span></a>` : u`<div>${this.getText("watchlist", "Merkliste")}</div>`}

          ${p ? u`<a href="${p}" data-nav-target="newsletter" @click=${(I) => this._handleNavClick(I, "newsletter", p)}><span class="twr-hm-action-label">${this.getText("newsletter", "Newsletter-Abonnements")}</span></a>` : u`<div>${this.getText("newsletter", "Newsletter-Abonnements")}</div>`}
          ${i ? u`<span class="twr-hm-logged-in-as">${this.getText("loggedInAs", "Angemeldet als:")} ${i}</span>` : ""}
          <button class="twr-hm-logout" @click=${this._handleLogout}>${this.getText("logout", "Abmelden")}</button>
        </div>
      </div>
    `;
  }
  _renderGuestMenu() {
    var a, n;
    const t = this.loginUrl && this.loginUrl !== "#", i = this.registerUrl && this.registerUrl !== "#", r = !!((a = this.appActions) != null && a.login), o = !!((n = this.appActions) != null && n.register);
    return u`
      <div class="twr-hm-dropdown">
        <slot name="guest">
          <div class="twr-hm-dropdown__actions">
            ${t || r ? u`
              <button @click=${this._handleLogin}>Login</button>
            ` : ""}
            ${i || o ? u`
              <button @click=${this._handleRegister}>Registrieren</button>
            ` : ""}
            ${!t && !r && !i && !o ? u`
              <div style="padding: 0.6rem 1rem; color: #94a3b8; font-size: 0.875rem;">
                Authentifizierung nicht konfiguriert
              </div>
            ` : ""}
          </div>
        </slot>
      </div>
    `;
  }
  render() {
    if (this.headless)
      return u``;
    const t = this._isAuthenticated ? this._displayName : "Mein Konto", i = this.variant === "inline", r = this._isAuthenticated ? this._shouldShowProfileLoading() ? this._renderProfileLoadingMenu() : this._renderAuthenticatedMenu() : this._renderGuestMenu();
    return i ? u`${r}` : u`
      <button class="twr-hm-trigger" @click=${this._toggleMenu} aria-expanded="${this.menuOpen}">
      ${this._isAuthenticated ? u`<span class="twr-hm-avatar">${this._initials}</span>` : ""}
      ${this._isAuthenticated ? u`<span class="twr-hm-check" title="Angemeldet" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M6.4 11.6 3 8.2l1.2-1.2 2.2 2.2 5.4-5.4L13 5z" fill="currentColor"/></svg></span>` : ""}
      <span class="twr-hm-label hidden-md hidden-lg">${t}</span>
      <span class="twr-hm-chevron" aria-hidden="true"></span>
      </button>
      ${this.menuOpen ? r : ""}
    `;
  }
};
N(be, "properties", {
  accountUrl: { type: String, attribute: "account-url" },
  loginUrl: { type: String, attribute: "login-url" },
  registerUrl: { type: String, attribute: "register-url" },
  variant: { type: String, reflect: !0 },
  menuOpen: { type: Boolean, state: !0 },
  // Stable URL or path used as redirect_uri ONLY for the auto-mounted
  // ssoSilent bootstrap (forwarded to <oauth-login silent-redirect-uri>).
  // Defaults to '/webauswahl.aspx' which is the known-stable callback path
  // on the Twerenbold/Reisemarkt booking infrastructure (delivers HTTP 200
  // without CMS rewrite). Override via attribute for other CMS setups, or
  // pass an empty string to fall back to window.location.origin.
  silentRedirectUri: { type: String, attribute: "silent-redirect-uri" },
  // When true, the component renders no UI at all but keeps running its full
  // cross-subdomain auth machinery: it auto-mounts the passive <oauth-login>,
  // resolves the cookie-based optimistic state, and publishes the global
  // `window.__twerenboldAppState` fallback bridge. Used by the bundle's
  // auto-bootstrap so host pages without a visible header still get auth state.
  headless: { type: Boolean, attribute: "headless", reflect: !0 }
}), // ─── Pre-Mount Snapshot (Flicker Reduction) ────────────────────────────────
// The snapshot lets a returning user see the correct username on the very
// first paint, before MSAL/profile-cache scans complete. Three sources are
// checked, in priority order:
//   1. window.__twerenboldHeaderSnapshot   (set by inline bootstrap)
//   2. localStorage 'twerenbold_hm_snapshot'      (written on every stable render)
//   3. nothing → component renders "Mein Konto" / loading as before
N(be, "_SNAPSHOT_KEY", "twerenbold_hm_snapshot"), N(be, "_SNAPSHOT_TTL_MS", 1440 * 60 * 1e3), N(be, "styles", ie`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      /* Flicker reduction: keep the upgraded shadow tree invisible until the
       * first render with a stable auth state has run. data-ready is set in
       * updated(); transition smooths the reveal. Set
       * --header-menu-ready-transition: none; to disable. */
      opacity: var(--header-menu-pre-ready-opacity, 0);
      transition: var(--header-menu-ready-transition, opacity 0.15s ease-out);
    }
    :host([data-ready]) {
      opacity: 1;
    }

    /* Headless mode: auth machinery runs, but the element occupies no space
     * and is fully invisible — used by the bundle's auto-bootstrap. */
    :host([headless]) {
      display: none !important;
    }

    /* Inline variant: menu renders in place, no trigger button, no absolute positioning */
    :host([variant="inline"]) {
      display: block;
      position: static;
    }
    :host([variant="inline"]) button.twr-hm-trigger { display: none; }
    :host([variant="inline"]) .twr-hm-dropdown {
      position: static;
      box-shadow: none;
      padding: var(--header-menu-inline-padding, 0);
      min-width: 0;
      width: auto;
      background: var(--header-menu-inline-bg, transparent);
      border: none;
    }

    button.twr-hm-trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--header-menu-trigger-gap, 0.5rem);
      border: var(--header-menu-trigger-border, none);
      border-radius: var(--header-menu-trigger-border-radius, 0);
      background: var(--header-menu-bg, rgba(255, 255, 255, 0.85));
      color: var(--header-menu-color, var(--primary-color, #0f766e));
      font-size: var(--header-menu-trigger-font-size, 0.9rem);
      font-weight: var(--header-menu-trigger-font-weight, 600);
      cursor: pointer;
      padding: var(--header-menu-trigger-padding, 0px);
      transition: var(--header-menu-trigger-transition, none);
    }

    button.twr-hm-trigger:hover {
      background: var(--header-menu-trigger-hover-bg, var(--header-menu-bg, rgba(255, 255, 255, 0.85)));
      color: var(--header-menu-trigger-hover-color, var(--header-menu-color, var(--primary-color, #0f766e)));
      border-color: var(--header-menu-trigger-hover-border-color, transparent);
      box-shadow: var(--header-menu-trigger-hover-shadow, none);
    }

    .twr-hm-avatar {
      width: var(--header-menu-avatar-size, 18px);
      height: var(--header-menu-avatar-size, 18px);
      border-radius: var(--header-menu-avatar-border-radius, 50%);
      background: var(--header-menu-avatar-bg, #ae995b);
      color: var(--header-menu-avatar-color, #f8fafc);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--header-menu-avatar-font-size, 0.65rem);
      font-weight: var(--header-menu-avatar-font-weight, 700);
      text-transform: uppercase;
      display: none;
    }

    /* Trigger / fallback reveal animation.
     * To disable entirely: set --header-menu-trigger-initial-opacity: 1
     * (and optionally --header-menu-trigger-transition: none) on the host. */
    .twr-hm-fallback {
      opacity: 1;
      transition: var(--header-menu-trigger-transition, opacity 0.45s ease);
    }

    button.twr-hm-trigger {
      opacity: var(--header-menu-trigger-initial-opacity, 0);
      transform: var(--header-menu-trigger-initial-transform, translateX(2px));
      transition: var(--header-menu-trigger-transition, opacity 0.45s ease, transform 0.45s ease);
    }

    :host(.loaded) button.twr-hm-trigger {
      opacity: 1;
      transform: translateX(0);
    }

    :host(.loaded) .twr-hm-fallback {
      opacity: 0;
      pointer-events: none;
    }

    .twr-hm-label {
      max-width: var(--header-menu-label-max-width, 140px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: var(--header-menu-label-font-size, inherit);
      font-weight: var(--header-menu-label-font-weight, inherit);
    }

    .twr-hm-dropdown {
      position: absolute;
      right: var(--header-menu-dropdown-right, 0);
      top: var(--header-menu-dropdown-top, calc(100% + 0.5rem));
      min-width: var(--header-menu-dropdown-min-width, 220px);
      width: max-content;
      max-width: var(--header-menu-dropdown-max-width, 400px);
      background: var(--header-menu-dropdown-bg, #ffffff);
      border: var(--header-menu-dropdown-border, none);
      border-radius: var(--header-menu-dropdown-border-radius, 0);
      box-shadow: var(--header-menu-dropdown-shadow, 0 24px 48px rgba(15, 23, 42, 0.15));
      padding: var(--header-menu-dropdown-padding, 0.5rem 0);
      z-index: var(--header-menu-dropdown-z-index, 1000);
    }

    .twr-hm-dropdown__section {
      padding: var(--header-menu-section-padding, 0.75rem 1rem);
      border-bottom: var(--header-menu-section-border, 1px solid rgba(148, 163, 184, 0.25));
      display: grid;
      gap: var(--header-menu-section-gap, 0.25rem);
    }

    .twr-hm-dropdown__section:last-of-type {
      border-bottom: none;
    }

    .twr-hm-dropdown__primary {
      font-weight: var(--header-menu-primary-font-weight, 600);
      color: var(--header-menu-primary-color, #0f172a);
      font-size: var(--header-menu-primary-font-size, 0.95rem);
    }

    .twr-hm-dropdown__secondary {
      font-size: var(--header-menu-secondary-font-size, 0.8rem);
      color: var(--header-menu-secondary-color, #64748b);
      font-weight: var(--header-menu-secondary-font-weight, normal);
    }

    .twr-hm-dropdown__actions {
      display: flex;
      flex-direction: column;
      gap: var(--header-menu-action-row-gap, 0);
    }

    .twr-hm-dropdown__actions button,
    .twr-hm-dropdown__actions a {
      width: 100%;
      position: relative; /* anchor for absolute-positioned chevron pseudo-elements */
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--header-menu-action-gap, 0.5rem);
      padding: var(--header-menu-action-padding, 0.6rem 1rem);
      border: none;
      background: transparent;
      color: var(--header-menu-action-color, inherit);
      font: inherit;
      font-size: var(--header-menu-action-font-size, inherit);
      font-weight: var(--header-menu-action-font-weight, normal);
      cursor: pointer;
      transition: var(--header-menu-action-transition, background 0.2s ease);
      text-decoration: none;
      box-sizing: border-box;
    }

    .twr-hm-dropdown__actions button:hover,
    .twr-hm-dropdown__actions a:hover {
      background: var(--header-menu-action-hover-bg, rgba(15, 118, 110, 0.08));
      color: var(--header-menu-action-hover-color, var(--header-menu-action-color, inherit));
    }

    /*
     * Chevrons via ::before / ::after pseudo-elements.
     * Pseudo-elements live INSIDE the shadow DOM so the host page CSS-isolation
     * issue doesn't apply — but every aspect (icon, color, size, position,
     * hover-shift) is configurable via CSS custom properties from the outside.
     *
     * TWO RENDERING MODES — switch by toggling the icon variable:
     *
     * 1) SVG mask mode (default)
     *    --header-menu-action-chevron-icon: <url(...) data: SVG>     (default chevron-right)
     *    --header-menu-action-chevron-color: currentColor             (fill colour)
     *
     * 2) Border-trick mode (rotated div with border-top + border-right,
     *    matches the host site style of nav-panel ul a:before).
     *    Activate by zeroing the SVG layer:
     *       --header-menu-action-chevron-icon: none
     *       --header-menu-action-chevron-color: transparent
     *    then set:
     *       --header-menu-action-chevron-border-top:    2px solid #fff
     *       --header-menu-action-chevron-border-right:  2px solid #fff
     *       --header-menu-action-chevron-transform:     rotate(45deg)
     *       --header-menu-action-chevron-size:          9px
     *
     * Position control (independent from rendering mode):
     *   --header-menu-action-chevron-start-display:  default "none"          → no left arrow
     *   --header-menu-action-chevron-end-display:    default "inline-block"  → right arrow on
     *   Set both to "inline-block" to render arrows on both sides.
     */
    .twr-hm-dropdown__actions a::before,
    .twr-hm-dropdown__actions a::after {
      content: '';
      flex-shrink: 0;
      box-sizing: border-box;
      width: var(--header-menu-action-chevron-size, 0.7em);
      height: var(--header-menu-action-chevron-size, 0.7em);
      pointer-events: var(--header-menu-action-chevron-pointer-events, none);
      user-select: none;
      -webkit-user-select: none;

      /* Layout (positioned by default = static / flex item; switch to absolute for offset positioning) */
      position: var(--header-menu-action-chevron-position, static);
      top: var(--header-menu-action-chevron-top, auto);
      right: var(--header-menu-action-chevron-right, auto);
      bottom: var(--header-menu-action-chevron-bottom, auto);
      left: var(--header-menu-action-chevron-left, auto);

      /* SVG-mask layer (default rendering mode) */
      background: var(--header-menu-action-chevron-background, none);
      background-color: var(--header-menu-action-chevron-color, currentColor);
      mask-image: var(--header-menu-action-chevron-icon, url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='9 6 15 12 9 18'/></svg>"));
      -webkit-mask-image: var(--header-menu-action-chevron-icon, url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='9 6 15 12 9 18'/></svg>"));
      mask-size: contain;
      -webkit-mask-size: contain;
      mask-position: center;
      -webkit-mask-position: center;
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;

      /* Border-trick layer (no-op by default; set any of these to activate the border style) */
      border-top: var(--header-menu-action-chevron-border-top, 0 solid transparent);
      border-right: var(--header-menu-action-chevron-border-right, 0 solid transparent);
      border-bottom: var(--header-menu-action-chevron-border-bottom, 0 solid transparent);
      border-left: var(--header-menu-action-chevron-border-left, 0 solid transparent);
      border-radius: var(--header-menu-action-chevron-border-radius, 0);

      /* Transform (rotate for border-trick chevrons; combined with hover translate below) */
      transform: var(--header-menu-action-chevron-transform, none);
      transition: var(--header-menu-action-chevron-transition, transform 0.2s ease);
      opacity: var(--header-menu-action-chevron-opacity, 1);
    }

    .twr-hm-dropdown__actions a::before {
      display: var(--header-menu-action-chevron-start-display, none);
      margin-right: var(--header-menu-action-chevron-gap, 0.5rem);
    }

    .twr-hm-dropdown__actions a::after {
      display: var(--header-menu-action-chevron-end-display, inline-block);
      margin-left: auto;
    }

    .twr-hm-dropdown__actions a:hover::before {
      transform: var(--header-menu-action-chevron-hover-transform, var(--header-menu-action-chevron-transform, none) translateX(calc(-1 * var(--header-menu-action-chevron-hover-translate, 2px))));
    }

    .twr-hm-dropdown__actions a:hover::after {
      transform: var(--header-menu-action-chevron-hover-transform, var(--header-menu-action-chevron-transform, none) translateX(var(--header-menu-action-chevron-hover-translate, 2px)));
    }

    .twr-hm-dropdown__actions button.twr-hm-logout {
      color: var(--header-menu-logout-color, #dc2626);
      font-size: var(--header-menu-logout-font-size, var(--header-menu-action-font-size, inherit));
      font-weight: var(--header-menu-logout-font-weight, normal);
      padding: var(--header-menu-logout-padding, var(--header-menu-action-padding, 0.6rem 1rem));
      margin-top: var(--header-menu-logout-margin-top, 0);
      border: var(--header-menu-logout-border, none);
      border-radius: var(--header-menu-logout-border-radius, 0);
      justify-content: var(--header-menu-logout-justify, flex-start);
    }

    .twr-hm-dropdown__actions button.twr-hm-logout:hover {
      background: var(--header-menu-logout-hover-bg, rgba(220, 38, 38, 0.08));
      color: var(--header-menu-logout-hover-color, var(--header-menu-logout-color, #dc2626));
    }

    .twr-hm-logged-in-as {
      display: var(--header-menu-logged-in-as-display, none);
      padding: var(--header-menu-logged-in-as-padding, 0.5rem 1rem 0);
      margin-top: var(--header-menu-logged-in-as-margin-top, 0.5rem);
      font-size: var(--header-menu-logged-in-as-font-size, 0.8rem);
      color: var(--header-menu-logged-in-as-color, #64748b);
    }

    .twr-hm-status-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--header-menu-badge-gap, 0.4rem);
      padding: var(--header-menu-badge-padding, 0.25rem 0.55rem);
      border-radius: var(--header-menu-badge-border-radius, 999px);
      background: var(--header-menu-badge-bg, rgba(15, 118, 110, 0.1));
      color: var(--header-menu-badge-color, #0f766e);
      font-size: var(--header-menu-badge-font-size, 0.75rem);
      font-weight: var(--header-menu-badge-font-weight, 600);
      text-transform: var(--header-menu-badge-text-transform, uppercase);
      border: var(--header-menu-badge-border, none);
    }

    .twr-hm-label {
        display: none;
    }
    .twr-hm-chevron {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: var(--header-menu-chevron-size, 4px) solid transparent;
      border-right: var(--header-menu-chevron-size, 4px) solid transparent;
      border-top: var(--header-menu-chevron-height, 6px) solid var(--header-menu-chevron-color, currentColor);
      display: none;
    }




    /* KK-233: Häkchen, solange der Name versteckt ist — auf kleinen Desktops
     * und mobil sieht man sonst nur das Konto-Symbol und nicht, ob man
     * angemeldet ist. Ab 1580px übernimmt der Name diese Aufgabe. */
    .twr-hm-check {
      display: var(--header-menu-check-display, inline-flex);
      align-items: center;
      justify-content: center;
      width: var(--header-menu-check-size, 14px);
      height: var(--header-menu-check-size, 14px);
      border-radius: 50%;
      background: var(--header-menu-check-bg, #16a34a);
      color: var(--header-menu-check-color, #ffffff);
      flex: 0 0 auto;
    }
    .twr-hm-check svg {
      width: 62%;
      height: 62%;
      display: block;
    }
    @media (min-width: 1580px) {
     .twr-hm-trigger > .twr-hm-label {
        display: inline;
      }
      .twr-hm-trigger > .twr-hm-check {
        display: var(--header-menu-check-display-wide, none);
      }
    }

  `);
let ki = be;
customElements.get("header-account-menu") || customElements.define("header-account-menu", ki);
const zo = "https://fonts.googleapis.com/css2?display=swap&family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900", Bo = new URL("data:text/css;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBDU1MgVkFSSUFCTEVTIENPTkZJR1VSQVRJT04KICAgWmVudHJhbGVzIERlc2lnbi1TeXN0ZW0gZsO8ciBhbGxlIFR3ZXJlbmJvbGQgV2ViIENvbXBvbmVudHMKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKOnJvb3QgewogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBUWVBPR1JBUEhZCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBGb250IEZhbWlsaWVzICovCiAgLS1mb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7CiAgLS10d2VyZW5ib2xkLWZvbnQtZmFtaWx5OiAnTWFucm9wZScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmOwoKICAvKiBGb250IFNpemVzICovCiAgLS1mb250LXNpemUteHM6IDAuNzVyZW07CiAgLS1mb250LXNpemUtc206IDAuODc1cmVtOwogIC0tZm9udC1zaXplLWJhc2U6IDFyZW07CiAgLS1mb250LXNpemUtbGc6IDEuMTI1cmVtOwogIC0tZm9udC1zaXplLXhsOiAxLjI1cmVtOwogIC0tZm9udC1zaXplLTJ4bDogMS41cmVtOwogIC0tZm9udC1zaXplLTN4bDogMS44NzVyZW07CiAgLS1mb250LXNpemUtNHhsOiAyLjI1cmVtOwoKICAvKiBGb250IFdlaWdodHMgKi8KICAtLWZvbnQtd2VpZ2h0LW5vcm1hbDogNDAwOwogIC0tZm9udC13ZWlnaHQtbWVkaXVtOiA1MDA7CiAgLS1mb250LXdlaWdodC1zZW1pYm9sZDogNjAwOwogIC0tZm9udC13ZWlnaHQtYm9sZDogNzAwOwogIC0tZm9udC13ZWlnaHQtZXh0cmFib2xkOiA4MDA7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBQUklNQVJZIFBBTEVUVEUKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIFByaW1hcnkgQ29sb3JzICovCiAgLS1wcmltYXJ5LWNvbG9yOiAjNGE1NTY4OwogIC0tcHJpbWFyeS1jb2xvci1kYXJrOiAjMmQzNzQ4OwogIC0tcHJpbWFyeS1jb2xvci1saWdodDogcmdiYSg3NCwgODUsIDEwNCwgMC4xKTsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeTogIzAwOTU1MzsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeS1kYXJrOiAjMDA3YTQ0OwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5LWxpZ2h0OiByZ2JhKDAsIDE0OSwgODMsIDAuMSk7CgogIC8qIFNlY29uZGFyeSBDb2xvcnMgKi8KICAtLXNlY29uZGFyeS1jb2xvcjogIzcxODA5NjsKICAtLXR3ZXJlbmJvbGQtc2Vjb25kYXJ5OiAjZTMwNjEzOwogIC0tdHdlcmVuYm9sZC1zZWNvbmRhcnktZGFyazogI2M0MWUzYTsKCiAgLyogQWNjZW50IENvbG9ycyAqLwogIC0tYWNjZW50LWNvbG9yOiAjNzE4MDk2OwogIC0tYWNjZW50LWNvbG9yLWxpZ2h0OiByZ2JhKDExMywgMTI4LCAxNTAsIDAuMSk7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBURVhUCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBUZXh0IENvbG9ycyAqLwogIC0tdGV4dC1jb2xvcjogIzMzMzsKICAtLXRleHQtc2Vjb25kYXJ5OiAjNjY2OwogIC0tdGV4dC1tdXRlZDogIzljYTNhZjsKICAtLXR3ZXJlbmJvbGQtdGV4dDogIzExMTgyNzsKICAtLXR3ZXJlbmJvbGQtdGV4dC1zZWNvbmRhcnk6ICM2YjcyODA7CiAgLS10d2VyZW5ib2xkLXRleHQtbXV0ZWQ6ICM5Y2EzYWY7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBCQUNLR1JPVU5EUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogQmFja2dyb3VuZCBDb2xvcnMgKi8KICAtLWJnLWNvbG9yOiAjZmZmOwogIC0tYmctc2Vjb25kYXJ5OiAjZjhmOWZhOwogIC0tYmctbXV0ZWQ6ICNmM2Y0ZjY7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQ6ICNmZmZmZmY7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjlmYWZiOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLW11dGVkOiAjZjNmNGY2OwoKICAvKiBDYXJkIEJhY2tncm91bmRzICovCiAgLS1jYXJkLWJnOiAjZjhmOWZhOwogIC0tY2FyZC1iZy1ob3ZlcjogI2ZmZmZmZjsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIENPTE9SUyAtIEJPUkRFUlMKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIEJvcmRlciBDb2xvcnMgKi8KICAtLWJvcmRlci1jb2xvcjogI2UyZThmMDsKICAtLWJvcmRlci1saWdodDogI2YzZjRmNjsKICAtLXR3ZXJlbmJvbGQtYm9yZGVyOiAjZTVlN2ViOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItbGlnaHQ6ICNmM2Y0ZjY7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBTVEFUVVMKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIFN0YXR1cyBDb2xvcnMgKi8KICAtLXN1Y2Nlc3MtY29sb3I6ICMzOGExNjk7CiAgLS1zdWNjZXNzLWJnOiAjZjBmZmY0OwogIC0tc3VjY2Vzcy1ib3JkZXI6ICNjNmY2ZDU7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3M6ICMxMGI5ODE7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3MtYmc6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOwoKICAtLXdhcm5pbmctY29sb3I6ICNkNjllMmU7CiAgLS13YXJuaW5nLWJnOiAjZmVmNWU3OwogIC0td2FybmluZy1ib3JkZXI6ICNmNmUwNWU7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmc6ICNmNTllMGI7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmctYmc6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOwoKICAtLWVycm9yLWNvbG9yOiAjZTUzZTNlOwogIC0tZXJyb3ItYmc6ICNmZWQ3ZDc7CiAgLS1lcnJvci1ib3JkZXI6ICNmZWIyYjI7CiAgLS10d2VyZW5ib2xkLWVycm9yOiAjZWY0NDQ0OwogIC0tdHdlcmVuYm9sZC1lcnJvci1iZzogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsKCiAgLyogSW5mbyBDb2xvcnMgKi8KICAtLWluZm8tY29sb3I6ICMzMTgyY2U7CiAgLS1pbmZvLWJnOiAjZWJmOGZmOwogIC0taW5mby1ib3JkZXI6ICM5MGNkZjQ7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBJTkFDVElWRS9ESVNBQkxFRAogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS1pbmFjdGl2ZS1iZzogI2Y3ZmFmYzsKICAtLWluYWN0aXZlLWNvbG9yOiAjYTBhZWMwOwogIC0taW5hY3RpdmUtYm9yZGVyOiAjZTJlOGYwOwoKICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgICAgU1BBQ0lORwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogU3BhY2luZyBTY2FsZSAqLwogIC0tc3BhY2luZy14czogNXB4OwogIC0tc3BhY2luZy1zbTogMTBweDsKICAtLXNwYWNpbmctbWQ6IDE1cHg7CiAgLS1zcGFjaW5nLWxnOiAyMHB4OwogIC0tc3BhY2luZy14bDogMzBweDsKICAtLXNwYWNpbmctMnhsOiA0MHB4OwoKICAvKiBUd2VyZW5ib2xkIFNwYWNpbmcgKHJlbS1iYXNlZCkgKi8KICAtLXR3ZXJlbmJvbGQtc3BhY2UtMTogMC4yNXJlbTsKICAtLXR3ZXJlbmJvbGQtc3BhY2UtMjogMC41cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS0zOiAwLjc1cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS00OiAxcmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS01OiAxLjI1cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS02OiAxLjVyZW07CiAgLS10d2VyZW5ib2xkLXNwYWNlLTg6IDJyZW07CiAgLS10d2VyZW5ib2xkLXNwYWNlLTEwOiAyLjVyZW07CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBCT1JERVIgUkFESVVTCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAtLWJvcmRlci1yYWRpdXM6IDhweDsKICAtLWJvcmRlci1yYWRpdXMtc206IDRweDsKICAtLWJvcmRlci1yYWRpdXMtbGc6IDEycHg7CiAgLS1ib3JkZXItcmFkaXVzLXhsOiAxNnB4OwogIC0tdHdlcmVuYm9sZC1yYWRpdXM6IDhweDsKICAtLXR3ZXJlbmJvbGQtcmFkaXVzLWxnOiAxMnB4OwoKICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgICAgU0hBRE9XUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDUpOwogIC0tc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA2KTsKICAtLXNoYWRvdy1tZDogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wNyksIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgLS1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7CiAgLS1zaGFkb3cteGw6IDAgMjBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA0KTsKCiAgLS10d2VyZW5ib2xkLXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpOwogIC0tdHdlcmVuYm9sZC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpOwogIC0tdHdlcmVuYm9sZC1zaGFkb3cteGw6IDAgMjBweCAyNXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDEwcHggMTBweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBUUkFOU0lUSU9OUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS10cmFuc2l0aW9uLWZhc3Q6IDAuMTVzIGVhc2UtaW4tb3V0OwogIC0tdHJhbnNpdGlvbjogMC4ycyBlYXNlLWluLW91dDsKICAtLXRyYW5zaXRpb24tc2xvdzogMC4zcyBlYXNlLWluLW91dDsKICAtLXR3ZXJlbmJvbGQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBaLUlOREVYCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAtLXotZHJvcGRvd246IDEwMDA7CiAgLS16LXN0aWNreTogMTAyMDsKICAtLXotZml4ZWQ6IDEwMzA7CiAgLS16LW1vZGFsLWJhY2tkcm9wOiAxMDQwOwogIC0tei1tb2RhbDogMTA1MDsKICAtLXotcG9wb3ZlcjogMTA2MDsKICAtLXotdG9vbHRpcDogMTA3MDsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIEJSRUFLUE9JTlRTIChmb3IgcmVmZXJlbmNlKQogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogTm90ZTogVGhlc2UgYXJlIGZvciByZWZlcmVuY2Ugb25seSwgYWN0dWFsIG1lZGlhIHF1ZXJpZXMgc2hvdWxkIGJlIGluIGNvbXBvbmVudHMgKi8KICAtLWJyZWFrcG9pbnQtc206IDY0MHB4OwogIC0tYnJlYWtwb2ludC1tZDogNzY4cHg7CiAgLS1icmVha3BvaW50LWxnOiAxMDI0cHg7CiAgLS1icmVha3BvaW50LXhsOiAxMjgwcHg7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT01QT05FTlQgU1BFQ0lGSUMgVkFSSUFCTEVTCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBGb3JtIEVsZW1lbnRzICovCiAgLS1pbnB1dC1oZWlnaHQ6IDQwcHg7CiAgLS1pbnB1dC1ib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpOwogIC0taW5wdXQtYm9yZGVyLWZvY3VzOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvcik7CiAgLS1pbnB1dC1ib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKCiAgLyogQnV0dG9ucyAqLwogIC0tYnV0dG9uLXByaW1hcnktYmc6IHZhcigtLXByaW1hcnktY29sb3IpOwogIC0tYnV0dG9uLXByaW1hcnktY29sb3I6IHdoaXRlOwogIC0tYnV0dG9uLXNlY29uZGFyeS1iZzogdHJhbnNwYXJlbnQ7CiAgLS1idXR0b24tc2Vjb25kYXJ5LWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yKTsKICAtLWJ1dHRvbi1zZWNvbmRhcnktYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvcik7CgogIC8qIENhcmRzICovCiAgLS1jYXJkLXBhZGRpbmc6IHZhcigtLXNwYWNpbmctbGcpOwogIC0tY2FyZC1ib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKICAtLWNhcmQtc2hhZG93OiB2YXIoLS1zaGFkb3cpOwoKICAvKiBOYXZpZ2F0aW9uICovCiAgLS1uYXYtaGVpZ2h0OiA2MHB4OwogIC0tbmF2LWJnOiB2YXIoLS1iZy1jb2xvcik7CiAgLS1uYXYtYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIFRIRU1FIE9WRVJSSURFUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogVHdlcmVuYm9sZCBUaGVtZSAqLwogIC0tdHdlcmVuYm9sZC1ib3JkZXItcmFkaXVzOiAxMnB4OwoKICAvKiBWb2VnZWxlIFRoZW1lICovCiAgLS12b2VnZWxlLXByaW1hcnk6ICMxYTM2NWQ7CiAgLS12b2VnZWxlLXNlY29uZGFyeTogIzJkMzc0ODsKCiAgLyogSW1iYWNoIFRoZW1lICovCiAgLS1pbWJhY2gtcHJpbWFyeTogIzZkYTVjZDsKICAtLWltYmFjaC1zZWNvbmRhcnk6ICM0YTU1Njg7CgogICAvKiBNaXR0ZWx0aHVyZ2F1IFRoZW1lICovCiAgIC0tbWl0dGVsdGh1cmdhdS1wcmltYXJ5OiAjNjMyNTRhOwogICAtLW1pdHRlbHRodXJnYXUtc2Vjb25kYXJ5OiAjYjQ4YzY1OwoKICAgLyogRXhjZWxsZW5jZSBUaGVtZSAqLwogICAtLWV4Y2VsbGVuY2UtcHJpbWFyeTogI2I2OTg1NDsKICAgLS1leGNlbGxlbmNlLXNlY29uZGFyeTogIzRhNTU2ODsKCiAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICAgRVhURU5ERUQgQ09NUE9ORU5UIFRPS0VOUwogICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogICAvKiBCdXR0b24gU3BlY2lmaWNzICovCiAgIC0tYnRuLXBhZGRpbmcteTogMC43NXJlbTsKICAgLS1idG4tcGFkZGluZy14OiAxcmVtOwogICAtLWJ0bi1mb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS1zbSk7CiAgIC0tYnRuLWJvcmRlci1yYWRpdXM6IDk5OXB4OyAvKiBEZWZhdWx0IHBpbGwgc2hhcGUgKi8KICAgLS1idG4tdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7CiAgIAogICAvKiBJbnB1dCBTcGVjaWZpY3MgKi8KICAgLS1pbnB1dC1wYWRkaW5nOiAwLjc1cmVtOwogICAtLWlucHV0LWJnOiB2YXIoLS1iZy1jb2xvcik7CiAgIC0taW5wdXQtcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpOwoKICAgLyogTW9kYWwgU3BlY2lmaWNzICovCiAgIC0tbW9kYWwtb3ZlcmxheS1iZzogcmdiYSgxNSwgMjMsIDQyLCAwLjQ1KTsKICAgLS1tb2RhbC1iZzogdmFyKC0tYmctY29sb3IpOwogICAtLW1vZGFsLXJhZGl1czogdmFyKC0tYm9yZGVyLXJhZGl1cy14bCk7CiAgIC0tbW9kYWwtc2hhZG93OiB2YXIoLS1zaGFkb3cteGwpOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIERBUksgTU9ERSBTVVBQT1JUIChPcHRpb25hbCkKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKLyogRGFyayBtb2RlIG92ZXJyaWRlcyBjYW4gYmUgYWRkZWQgaGVyZSBpZiBuZWVkZWQgKi8KLyogQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgewogIDpyb290IHsKICAgICAtLWJnLWNvbG9yOiAjMWEyMDJjOwogICAgLS10ZXh0LWNvbG9yOiAjZjdmYWZjOwogICAgLS10ZXh0LXNlY29uZGFyeTogI2EwYWVjMDsKICAgIC0tY2FyZC1iZzogI2ZmZjsKICAgIC0tYm9yZGVyLWNvbG9yOiAjNGE1NTY4OwogIH0KfSAqLwoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBQUklOVCBTVFlMRVMKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKQG1lZGlhIHByaW50IHsKICA6cm9vdCB7CiAgICAtLWJnLWNvbG9yOiB3aGl0ZTsKICAgIC0tdGV4dC1jb2xvcjogYmxhY2s7CiAgICAtLXNoYWRvdzogbm9uZTsKICAgIC0tYm9yZGVyLWNvbG9yOiAjY2NjOwogIH0KfQ==", import.meta.url).href, Go = new URL("data:text/css;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBUSEVNRSBDT05GSUdVUkFUSU9OUwogICBUaGVtZS1zcGVjaWZpYyBDU1MgVmFyaWFibGUgT3ZlcnJpZGVzCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgQkFTRSBUSEVNRSAvIERFRkFVTFRTIChCYXNlZCBvbiBUd2VyZW5ib2xkKQogICBBcHBsaWVzIHRvIGFsbCB0aGVtZXMgYXMgYSBmYWxsYmFjay4gCiAgIFNwZWNpZmljIHRoZW1lcyBvbmx5IG5lZWQgdG8gb3ZlcnJpZGUgY2hhbmdlZCB2YWx1ZXMuCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCjpyb290W2RhdGEtdGhlbWVdLApbdGhlbWVdLApbY2xhc3MqPSItdGhlbWUiXSB7CiAgLyogLS0tIENPTE9SUyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1wcmltYXJ5OiAjMDA5NTUzOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjMDA3YTQ0OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgwLCAxNDksIDgzLCAwLjEpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjZTMwNjEzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICNjNDFlM2E7CgoKCiAgLS10aGVtZS10ZXh0OiAjMTExODI3OwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6IHJnYigxMDcsIDExNCwgMTI4KTsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5Y2EzYWY7CgogIC0tdGhlbWUtYmFja2dyb3VuZDogI2ZmZmZmZjsKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjlmYWZiOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2YzZjRmNjsKCiAgLS10aGVtZS1ib3JkZXI6ICNlNWU3ZWI7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNmM2Y0ZjY7CgogIC0tdGhlbWUtc3VjY2VzczogIzEwYjk4MTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2Y1OWUwYjsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOwogIC0tdGhlbWUtZXJyb3I6ICNlZjQ0NDQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsKCiAgLyogLS0tIFRZUE9HUkFQSFkgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogdmFyKC0tYnMtYm9keS1mb250LWZhbWlseSwgIkNlbnRyYSBObzIgQm9vayIsICJIZWx2ZXRpY2EiLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZik7CiAgLS10aGVtZS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tYnMtaGVhZGluZy1mb250LWZhbWlseSwgdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSkpOwogIAogIC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZTogNDAwOwogIC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3M6IDcwMDsKCiAgLyogTGVnYWN5IG1hcHBpbmcgZm9yIGJhY2t3YXJkIGNvbXBhdCBpZiBuZWVkZWQgaW50ZXJuYWwgdG8gdGhlbWUgZmlsZSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHk6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwoKICAvKiAtLS0gTEFZT1VUICYgU1BBQ0lORyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1ib3JkZXItcmFkaXVzOiAxMnB4OwogIC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXM6IDk5OXB4OwogIC0tdGhlbWUtY29tcG9uZW50LXBhZGRpbmc6IDJyZW07CiAgLS10aGVtZS1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgLS10aGVtZS1zaGFkb3ctbGc6IDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTsKCiAgLyogLS0tIENPTVBPTkVOVFMgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtbmF2aWdhdGlvbi1ncm91cC1ib3JkZXI6IHZhcigtLXRoZW1lLWJvcmRlciwgMXB4IHNvbGlkICNlNWU3ZWIpOwogIC0tdGhlbWUtYWNjb3VudC1lbWJlZC16LWluZGV4OiAwOwoKICAvKiAtLS0gTEVHQUNZIEFMSUFTRVMgKEJhY2t3YXJkIENvbXBhdGliaWxpdHkpIC0tLSAqLwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5OiB2YXIoLS10aGVtZS1wcmltYXJ5KTsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeS1kYXJrOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5LWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXR3ZXJlbmJvbGQtc2Vjb25kYXJ5OiB2YXIoLS10aGVtZS1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1zZWNvbmRhcnktZGFyazogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC10ZXh0OiB2YXIoLS10aGVtZS10ZXh0KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLXRleHQtc2Vjb25kYXJ5KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWJhY2tncm91bmQpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLXNlY29uZGFyeTogdmFyKC0tdGhlbWUtYmFja2dyb3VuZC1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKICAtLXR3ZXJlbmJvbGQtYm9yZGVyOiB2YXIoLS10aGVtZS1ib3JkZXIpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3M6IHZhcigtLXRoZW1lLXN1Y2Nlc3MpOwogIC0tdHdlcmVuYm9sZC1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXR3ZXJlbmJvbGQtd2FybmluZzogdmFyKC0tdGhlbWUtd2FybmluZyk7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmctYmc6IHZhcigtLXRoZW1lLXdhcm5pbmctYmcpOwogIC0tdHdlcmVuYm9sZC1lcnJvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tdHdlcmVuYm9sZC1lcnJvci1iZzogdmFyKC0tdGhlbWUtZXJyb3ItYmcpOwogIC0tdHdlcmVuYm9sZC1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHkpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItcmFkaXVzOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtYnRuLWJvcmRlci1yYWRpdXM6IHZhcigtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3cpOwogIC0tdGhlbWUtbmF2LWxpbmstcGFkZGluZzogMXJlbTsKCiAgZGlhbG9nLm1vZGFsOjpiYWNrZHJvcHsKICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsIDAuNSk7CiAgfQp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFRIRU1FIE9WRVJSSURFUwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgovKiAtLS0gVFdFUkVOQk9MRCAoRXhwbGljaXQpIC0tLSAqLwovKiBVc2VzIEJhc2UgRGVmYXVsdHMsIG5vIG92ZXJyaWRlcyBuZWVkZWQgY3VycmVudGx5ICovCjpyb290W2RhdGEtdGhlbWU9InR3ZXJlbmJvbGQiXSwKLnR3ZXJlbmJvbGQtdGhlbWUgewogIC8qIEluaGVyaXRzIGRlZmF1bHRzIGZyb20gQmFzZSBUaGVtZSAqLwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS10aGVtZS1tb2JpbGUtbmF2LXRvZ2dsZS1wb3NpdGlvbi10b3A6IDdyZW07Cn0KCi8qIC0tLSBNSVRURUxUSFVSR0FVIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJtaXR0ZWx0aHVyZ2F1Il0sClt0aGVtZT0ibWl0dGVsdGh1cmdhdSJdLAoubWl0dGVsdGh1cmdhdS10aGVtZSB7CiAgLS10aGVtZS1wcmltYXJ5OiAjNjMyNTRhOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjNGQxYjM5OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSg5OSwgMzcsIDc0LCAwLjEyKTsKICAtLXRoZW1lLXNlY29uZGFyeTogI2I0OGM2NTsKICAtLXRoZW1lLXNlY29uZGFyeS1kYXJrOiAjOGQ2YjRjOwoKICAtLXRoZW1lLXRleHQ6ICMzMjE0MjI7CiAgLS10aGVtZS10ZXh0LXNlY29uZGFyeTogIzVmNDk1NDsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5YThiOTM7CgogIC0tdGhlbWUtYm9yZGVyOiAjZTZkY2UyOwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZjNlY2YxOwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICMyZjlkNzg7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDQ3LCAxNTcsIDEyMCwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjZDc5YzNmOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgyMTUsIDE1NiwgNjMsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICNjNzQzNWQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxOTksIDY3LCA5MywgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiB2YXIoLS10aGVtZS1mb250LWZhbWlseS1iYXNlKTsKICAKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAwcHg7CiAgCiAgLS1ib3JkZXItcmFkaXVzLXNtOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLWxnOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLXhsOiAwcHg7Cn0KCi8qIC0tLSBFWENFTExFTkNFIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJleGNlbGxlbmNlIl0sClt0aGVtZT0iZXhjZWxsZW5jZSJdLAouZXhjZWxsZW5jZS10aGVtZSB7CiAgLyogVG9rZW5zIGRlciBuZXVlbiBleGNlbGxlbmNlLmNoIChOdXh0L1RhaWx3aW5kLCBTdGFuZCAxNi4wOS4yMDI2KToKICAgICBwcmltYXJ5LTUwMCAjYjU5NzUyLCBwcmltYXJ5LTYwMCAjYTU4YTRiLCBwcmltYXJ5LTcwMCAjODU2YjM1LAogICAgIHdhcm0tOTAwICM1ZDU4NTMgKFRleHQpLCB3YXJtLTcwMCAjOGU4NzgxLCB3YXJtLTEwMCAjZWNlOWU3LAogICAgIGdyYXktNTAgI2Y4ZjhmOCwgZ3JheS0yMDAgI2RmZGJkNiwgZ3JheS00MDAgI2M1YmRiNSwgZ3JheS02MDAgI2E2OWY5OC4KICAgICBTY2hyaWZ0ZW4gdmlhIFR5cGVraXQgKGzDpGR0IGRpZSBXZWJzaXRlKTogY2FuYWRhLXR5cGUtZ2lic29uIChGbGllc3N0ZXh0KSwKICAgICBpdnlqb3VybmFsIChTZXJpZiksIEZyaXogUXVhZHJhdGEgKEF1c3plaWNobnVuZykuIFJhZGl1cyAycHgsIEJ1dHRvbnMKICAgICB1cHBlcmNhc2UgbWl0IExldHRlcnNwYWNpbmcgd2llIC5idXR0b24gZGVyIFdlYnNpdGUuICovCiAgLS10aGVtZS1wcmltYXJ5OiAjYjU5NzUyOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjODU2YjM1OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgxODEsIDE1MSwgODIsIDAuMTQpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICM0NDNmM2I7CgogIC0tdGhlbWUtdGV4dDogIzAwMDAwMDsKICAtLXRoZW1lLXRleHQtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtdGV4dC1tdXRlZDogIzhlODc4MTsKCiAgLS10aGVtZS1iYWNrZ3JvdW5kLXNlY29uZGFyeTogI2Y4ZjhmODsKICAtLXRoZW1lLWJhY2tncm91bmQtbXV0ZWQ6ICNlY2U5ZTc7CgogIC0tdGhlbWUtYm9yZGVyOiAjZGZkYmQ2OwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZWNlOWU3OwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICM2YTg0MjQ7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDEwNiwgMTMyLCAzNiwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjYTU4YTRiOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgxNjUsIDEzOCwgNzUsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICM4ZDMzMjk7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxNDEsIDUxLCA0MSwgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ2NhbmFkYS10eXBlLWdpYnNvbicsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiAnaXZ5am91cm5hbCcsIHVpLXNlcmlmLCBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWY7CiAgLS10aGVtZS1mb250LXdlaWdodC1oZWFkaW5nczogNDAwOwoKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDJweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAycHg7CgogIC8qIEtLLTIyOTogQnV0dG9ucyBncmF1IG1pdCBoZWxsZXJlbSBHcmF1IGFscyBIb3ZlciwgU2NocmlmdCBzY2h3YXJ6IOKAlAogICAgIGVudHNwcmljaHQgLmJ1dHRvbi5pcy1ncmF5IGRlciBXZWJzaXRlIChncmF5LTQwMCDihpIgZ3JheS0yMDApLiAqLwogIC0tYnRuLWJvcmRlci1yYWRpdXM6IDJweDsKICAvKiAuYnV0dG9uIGRlciBXZWJzaXRlOiBHZXdpY2h0IDQwMCwgVmVyc2FsaWVuLCBMYXVmd2VpdGUgMC40NXB4LiAqLwogIC0tYnRuLWZvbnQtd2VpZ2h0OiA0MDA7CiAgLS1idG4tdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICAtLWJ0bi1sZXR0ZXItc3BhY2luZzogMC40NXB4OwogIC0tYnRuLXByaW1hcnktYmFja2dyb3VuZC1jb2xvcjogI2M1YmRiNTsKICAtLWJ0bi1wcmltYXJ5LWJvcmRlci1jb2xvcjogI2M1YmRiNTsKICAtLWJ0bi1wcmltYXJ5LWNvbG9yOiAjMDAwMDAwOwogIC0tYnRuLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjogI2RmZGJkNjsKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjogI2RmZGJkNjsKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWNvbG9yOiAjMDAwMDAwOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiAjZWNlOWU3OwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6ICNjNWJkYjU7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWNvbG9yOiAjMDAwMDAwOwoKICAvKiBLb3BmemVpbGVuLU1lbsO8IHVuZCBBYm1lbGRlLUxpbms6IHNjaHdhcnogc3RhdHQgZ29sZCwgSG92ZXIgd2FybS0xMDAuICovCiAgLS1oZWFkZXItbWVudS1jb2xvcjogIzAwMDAwMDsKICAtLWhlYWRlci1tZW51LXRyaWdnZXItaG92ZXItY29sb3I6ICM1ZDU4NTM7CiAgLS1oZWFkZXItbWVudS1wcmltYXJ5LWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWhvdmVyLWJnOiAjZWNlOWU3OwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWhvdmVyLWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWJnOiAjYjU5NzUyOwogIC0taGVhZGVyLW1lbnUtZHJvcGRvd24tYm9yZGVyLXJhZGl1czogMnB4OwoKICAvKiBBYm1lbGRlbi1CdXR0b24gZGVyIEF1dGgtS29tcG9uZW50ZTogZWNraWcgdW5kIGluIFZlcnNhbGllbiB3aWUgZGllIFdlYnNpdGUuICovCiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtYm9yZGVyLXJhZGl1czogMnB4OwogIC0tYXV0aC1jb21wb25lbnQtbG9nb3V0LXRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtbGV0dGVyLXNwYWNpbmc6IDAuNDVweDsKfQoKLyogLS0tIFZPRUdFTEUgLS0tICovCjpyb290W2RhdGEtdGhlbWU9InZvZWdlbGUiXSwKW3RoZW1lPSJ2b2VnZWxlIl0sCi52b2VnZWxlLXRoZW1lIHsKICAtLXRoZW1lLXByaW1hcnk6ICMwMDYwNTI7CiAgLS10aGVtZS1wcmltYXJ5LWRhcms6ICMwMDQyMzg7CiAgLS10aGVtZS1wcmltYXJ5LWxpZ2h0OiAjMDA2MDUxY2I7CiAgLS10aGVtZS1zZWNvbmRhcnk6ICNiMWQ1NGY7CiAgLS10aGVtZS1zZWNvbmRhcnktZGFyazogIzFhMjAyYzsKCiAgLS10aGVtZS10ZXh0OiAjMWEyMDJjOwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6ICM0YTU1Njg7CiAgLS10aGVtZS10ZXh0LW11dGVkOiAjNzE4MDk2OwoKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjdmYWZjOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2VkZjJmNzsKCiAgLS10aGVtZS1ib3JkZXI6ICNlMmU4ZjA7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNmMWY1Zjk7CgogIC0tdGhlbWUtc3VjY2VzczogIzM4YTE2OTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoNTYsIDE2MSwgMTA1LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2Q2OWUyZTsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjE0LCAxNTgsIDQ2LCAwLjEpOwogIC0tdGhlbWUtZXJyb3I6ICNlNTNlM2U7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgyMjksIDYyLCA2MiwgMC4xKTsKCiAgLS10aGVtZS1mb250LWZhbWlseS1iYXNlOiBFdWNsaWRDaXJjdWxhckIsIEFsbGVyLCAnU2Vnb2UgVUknLCBzYW5zLXNlcmlmOwogIC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3M6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwogIC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3M6IDcwMDsKICAtLWhlYWRsaW5lLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5KTsKICAtLXRpdGxlLWNvbG9yOiB2YXIoLS1oZWFkbGluZS1jb2xvcik7CiAgLS1zdWJ0aXRsZS1jb2xvcjogcmdiYSgyOSwgMjksIDI5LCAwLjYpOwoKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAzcHg7CiAgLS10aGVtZS1jb21wb25lbnQtcGFkZGluZzogMHJlbTsKICAKICAvKiBWb2VnZWxlIFNwZWNpZmljcyAqLwogIC0tY2FyZC1wYWRkaW5nOiAxLjVyZW07CiAgLS1jYXJkLWJvcmRlci13aWR0aDogMHB4OwoKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWNvbG9yOiAjZmZmOwogIC0tYnRuLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeS1saWdodCk7CiAgLS1idG4tcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwoKICAtLWJ0bi1zZWNvbmRhcnktaG92ZXItY29sb3I6ICNmZmY7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwoKICAvKiBOb3RlOiBSZS1kZWNsYXJpbmcgYSB2YWx1ZSBpZGVudGljYWwgdG8gZGVmYXVsdCBpcyBoYXJtbGVzcyAoc2hhZG93KSAqLwogIC0tdHdlcmVuYm9sZC1zaGFkb3c6IHJnYmEoMTUsIDIzLCA0MiwgMC4xOCkgMHB4IDI0cHggNDhweCAtMjRweDsKICAtLXR3ZXJlbmJvbGQtc2hhZG93LWxnOiByZ2JhKDE1LCAyMywgNDIsIDAuMjUpIDBweCAzMHB4IDYwcHggLTMwcHg7CgogIC8qIEhlYWRlciBNZW51IFNwZWNpZmljcyAoVm9lZ2VsZSBPbmx5KSAqLwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWJnOiAjYWU5OTViOwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwp9CgovKiAtLS0gSU1CQUNIIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJpbWJhY2giXSwKW3RoZW1lPSJpbWJhY2giXSwKLmltYmFjaC10aGVtZSB7CiAgLS10aGVtZS1wcmltYXJ5OiAjNmRhNWNkOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjMDA0MTVkOwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSg0NSwgNTUsIDcyLCAwLjEpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjNGE1NTY4OwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICMwMDQxNWQ7CgogIC0tdGhlbWUtdGV4dDogIzAwNDE1ZDsKICAtLXRoZW1lLXRleHQtc2Vjb25kYXJ5OiAjMDA0MTVkOwogIC0tdGhlbWUtdGV4dC1tdXRlZDogIzcxODA5NjsKCiAgLS10aGVtZS1iYWNrZ3JvdW5kLXNlY29uZGFyeTogI2Y4ZjlmYTsKICAtLXRoZW1lLWJhY2tncm91bmQtbXV0ZWQ6ICNlOWVjZWY7CgogIC0tdGhlbWUtYm9yZGVyOiAjZGVlMmU2OwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZTllY2VmOwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICMyOGE3NDU7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDQwLCAxNjcsIDY5LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2ZmYzEwNzsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjU1LCAxOTMsIDcsIDAuMSk7CiAgLS10aGVtZS1lcnJvcjogI2RjMzU0NTsKICAtLXRoZW1lLWVycm9yLWJnOiByZ2JhKDIyMCwgNTMsIDY5LCAwLjEpOwoKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2U6IEdpbHJveSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiB2YXIoLS10aGVtZS1mb250LWZhbWlseS1iYXNlKTsKICAKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDMwcHg7CiAgLS10aGVtZS1idG4tYm9yZGVyLXJhZGl1czogMHB4OwogIC0tdGhlbWUtbW9iaWxlLW5hdi10b2dnbGUtcG9zaXRpb24tdG9wOiA3cmVtOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFNZU1RFTSBWQVJJQUJMRSBNQVBQSU5HCiAgIE1hcHMgVGhlbWUtU3BlY2lmaWMgVmFyaWFibGVzIChMZWZ0KSB0byBHZW5lcmljIFN5c3RlbSBWYXJpYWJsZXMgKFJpZ2h0KQogICBUaGlzIGlzIHRoZSBBUEkgY29uc3VtZWQgYnkgc2hhcmVkLXN0eWxlcy5qcwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgo6cm9vdFtkYXRhLXRoZW1lXSwKW3RoZW1lXSwKW2NsYXNzKj0iLXRoZW1lIl0gewogIC8qIENvbG9ycyAqLwogIC0tcHJpbWFyeS1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeSk7CiAgLS1wcmltYXJ5LWNvbG9yLWRhcms6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS1wcmltYXJ5LWNvbG9yLWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXNlY29uZGFyeS1jb2xvcjogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5KTsKICAtLXNlY29uZGFyeS1jb2xvci1kYXJrOiB2YXIoLS10aGVtZS1zZWNvbmRhcnktZGFyayk7CgogIC0tdGV4dC1jb2xvcjogdmFyKC0tdGhlbWUtdGV4dCk7CiAgLS10ZXh0LXNlY29uZGFyeTogdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpOwogIC0tdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CgogIC0taGVhZGxpbmUtY29sb3I6IHZhcigtLWhlYWRsaW5lLWNvbG9yLCB2YXIoLS10aGVtZS10ZXh0KSk7CiAgLS10aXRsZS1jb2xvcjogdmFyKC0tdGl0bGUtY29sb3IsIHZhcigtLXRoZW1lLXRleHQpKTsKICAtLXN1YnRpdGxlLWNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1jb2xvciwgdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpKTsKCiAgLS1iZy1jb2xvcjogdmFyKC0tdGhlbWUtYmFja2dyb3VuZCk7CiAgLS1iZy1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5KTsKICAtLWJnLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKCiAgLS1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLWJvcmRlcik7CiAgLS1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CgogIC8qIFN0YXR1cyAqLwogIC0tc3VjY2Vzcy1jb2xvcjogdmFyKC0tdGhlbWUtc3VjY2Vzcyk7CiAgLS1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXdhcm5pbmctY29sb3I6IHZhcigtLXRoZW1lLXdhcm5pbmcpOwogIC0td2FybmluZy1iZzogdmFyKC0tdGhlbWUtd2FybmluZy1iZyk7CiAgLS1lcnJvci1jb2xvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tZXJyb3ItYmc6IHZhcigtLXRoZW1lLWVycm9yLWJnKTsKCiAgLyogVHlwb2dyYXBoeSAqLwogIC0tZm9udC1mYW1pbHktYmFzZTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CiAgLS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3MpOwogIC0tZm9udC13ZWlnaHQtYmFzZTogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZSk7CiAgLS1mb250LXdlaWdodC1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3MpOwogIAogIC8qIExlZ2FjeS9HZW5lcmljIGZhbGxiYWNrICovCiAgLS1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CgogIC8qIExheW91dCAqLwogIC0tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1ib3JkZXItcmFkaXVzLXNtOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLWJvcmRlci1yYWRpdXMtbGc6IHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMpOwogIC0tYm9yZGVyLXJhZGl1cy14bDogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1idG4tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXMsIHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMsIDk5OXB4KSk7CgogIC0tY29tcG9uZW50LXBhZGRpbmc6IHZhcigtLXRoZW1lLWNvbXBvbmVudC1wYWRkaW5nLCAycmVtKTsKICAKICAvKiBTaGFkb3dzICovCiAgLS1ib3gtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3csIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSkpOwogIC0tYm94LXNoYWRvdy1zbTogdmFyKC0tdGhlbWUtc2hhZG93LCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KSk7CiAgLS1ib3gtc2hhZG93LWxnOiB2YXIoLS10aGVtZS1zaGFkb3ctbGcsIDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7Cn0=", import.meta.url).href, xi = "twerenbold-account-embed-root", Yo = ["twerenbold", "voegele", "imbach", "mittelthurgau", "excellence"], E = Ne("AccountPortalEmbed"), Ho = `
${Yr(`.${xi}`)}

  /* Light DOM styles - no Shadow DOM isolation */
  twerenbold-account-embed {
    display: block;
    width: 100%;
  }

  .${xi} {
    font-family: var(--twerenbold-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: var(--account-embed-z-index, 0);
  }

  .twerenbold-account-embed-root.sidebar-open {
    overflow: hidden;
  }

    .twerenbold-account-embed-root .twerenbold-account-portal .sidebar-title {
    padding-left: 1rem;
    }

  .twerenbold-account-embed-root .twerenbold-account-portal {
    width: 100%;
    display: flex;
    flex: 1;
    min-height: 100%;
    position: relative;
    z-index: var(--theme-account-embed-z-index, 1000);
  }

  .twerenbold-account-embed-root .navigation-group {
    display: flex;
    flex-direction: column;
    border: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
  }

  .twerenbold-account-embed-root .navigation-group > .nav-link + .nav-link:not(.hidden) {
    border-top: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
  }

  .twerenbold-account-embed-root .support-block {
    padding: 1.5rem;
  }

  .twerenbold-account-embed-root .api-mode-section,
  .twerenbold-account-embed-root .theme-switcher-section {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
  }

  .twerenbold-account-embed-root .api-mode-section h4,
  .twerenbold-account-embed-root .theme-switcher-section h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
  }

  .twerenbold-account-embed-root select[data-portal="api-mode-select"],
  .twerenbold-account-embed-root select[data-portal="theme-select"] {
    width: 100%;
    padding: 0.5rem;
    border: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
    border-radius: 4px;
    font-size: 0.9rem;
    background: #ffffff;
  }

  .twerenbold-account-embed-root p[data-portal="api-mode-hint"],
  .twerenbold-account-embed-root p[data-portal="theme-hint"] {
    margin: 0.5rem 0 0 0;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .twerenbold-account-embed-root .auth-section {
    margin-bottom: 2rem;
  }

  @media (max-width: 900px) {
    .twerenbold-account-embed-root .twerenbold-account-portal {
      flex-direction: column;
      min-height: auto;
    }

    .twerenbold-account-embed-root .main-content {
      padding: 1rem 1.25rem 2.5rem;
      min-height: auto;
    }
  }

.twerenbold-account-embed-root.sidebar-open {
  overflow: hidden;
}

.twerenbold-account-embed-root .mobile-nav-toggle {
  display: none;
  position: sticky;
  top: var(--theme-mobile-nav-toggle-position-top, 0);
  z-index: 1200;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 118, 110, 0.15);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--twerenbold-shadow-lg, 0 10px 25px -10px rgba(17, 24, 39, 0.25));
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

.twerenbold-account-embed-root .mobile-nav-toggle:focus-visible {
  outline: 2px solid var(--primary-color, #009553);
  outline-offset: 3px;
}

.twerenbold-account-embed-root .mobile-nav-toggle:hover {
  transform: translateY(-1px);
  box-shadow: var(--twerenbold-shadow-xl, 0 20px 45px -20px rgba(17, 24, 39, 0.35));
}

.twerenbold-account-embed-root .mobile-nav-toggle__icon {
  position: relative;
  width: 20px;
  height: 14px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}

.twerenbold-account-embed-root .mobile-nav-toggle__icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 999px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.twerenbold-account-embed-root .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.twerenbold-account-embed-root .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(2) {
  opacity: 0;
}

.twerenbold-account-embed-root .mobile-nav-toggle[aria-expanded="true"] .mobile-nav-toggle__icon span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* When sidebar is open, toggle becomes fixed so it stays above the overlay */
.twerenbold-account-embed-root.sidebar-open .mobile-nav-toggle {
  display: none !important; /* Override sticky */
  top: var(--theme-mobile-nav-toggle-position-top, 1rem);
  left: var(--theme-mobile-nav-toggle-position-left, 1rem);
  margin: 0;
}

.twerenbold-account-embed-root .sidebar-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1100;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.twerenbold-account-embed-root .sidebar-backdrop.visible {
  display: block;
  opacity: 1;
}

.twerenbold-account-embed-root .sr-only {
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

.twerenbold-account-embed-root .sidebar {
  width: var(--theme-navigation-sidebar-width, 320px);
  background: #fff;


  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100vh;
  position: sticky;
  top: 0;
  transition: transform 0.3s ease;
    margin-left: 2rem;
}

/* .twerenbold-account-embed-root .sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #009553;
  margin-bottom: 2rem;
} */

.twerenbold-account-embed-root .nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  width: auto;
  text-align: left;
  border-radius: calc(var(--theme-border-radius, 16px));
  text-decoration: none;
}

.twerenbold-account-embed-root .nav-link:not(.active):hover {
  transform: translateX(2px);
  text-decoration: none;
}

.twerenbold-account-embed-root .nav-link.active {
  color: #ffffff;
}

.twerenbold-account-embed-root .nav-link.active .shrink-0 {
  display: none;
}

.twerenbold-account-embed-root .nav-icon {
  width: 24px;
  height: 24px;
}

.twerenbold-account-embed-root .main-content {
  flex: 1;
  min-height: 100vh;
//   background: var(--theme-background-secondary, #fff);
}

.twerenbold-account-embed-root .rounded-2xl {
  border-radius: var(--border-radius-xl, 20px) !important;
}

.twerenbold-account-embed-root .navigation-group {
  display: flex;
  flex-direction: column;
  border: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
  overflow: hidden;
}

.twerenbold-account-embed-root .navigation-group > .nav-link + .nav-link {
  border-top: var(--theme-navigation-group-border, var(--theme-border, 1px solid #e5e7eb));
}

.twerenbold-account-embed-root .support-block {
  padding: 1.5rem;
  font-size: 1rem;
}

.twerenbold-account-embed-root .support-block h3{
  font-size: 1.25rem;
}

.twerenbold-account-embed-root .api-mode-section,
.twerenbold-account-embed-root .theme-switcher-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.twerenbold-account-embed-root .api-mode-section h4,
.twerenbold-account-embed-root .theme-switcher-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.twerenbold-account-embed-root select[data-portal="api-mode-select"],
.twerenbold-account-embed-root select[data-portal="theme-select"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.9rem;
  background: #ffffff;
}

.twerenbold-account-embed-root p[data-portal="api-mode-hint"],
.twerenbold-account-embed-root p[data-portal="theme-hint"] {
  margin: 0.5rem 0 0 0;
  font-size: 0.75rem;
  color: #6b7280;
}

.twerenbold-account-embed-root .auth-section {
  margin-bottom: 2rem;
}

@media (max-width: 900px) {
  .twerenbold-account-embed-root .twerenbold-account-portal {
    flex-direction: column;
    min-height: auto;
  }

  .twerenbold-account-embed-root .mobile-nav-toggle {
    display: inline-flex;
  }

  .twerenbold-account-embed-root .main-content {
    padding: 1rem 1.25rem 2.5rem;
    min-height: auto;
  }

  .twerenbold-account-embed-root .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    height: 100vh;
    width: min(85vw, 320px);
    transform: translateX(-105%);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.35);
    z-index: 1150;
    padding: 2rem 1.5rem 3rem;
    overflow-y: auto;
    background: #ffffff;
    margin-left: 0rem;
  }

  .twerenbold-account-embed-root .sidebar.is-open {
    transform: translateX(0);
  }

  .twerenbold-account-embed-root .sidebar-title {
    margin-top: 3rem;
    padding-left: 1rem;
  }

  .twerenbold-account-embed-root .nav-link {
    font-size: 1rem;
    padding: 0.85rem 0.5rem;
  }
}

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.twerenbold-account-embed-root .skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

.twerenbold-account-embed-root .skeleton-header {
  height: 2rem;
  background: #e5e7eb;
  border-radius: 0.5rem;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.twerenbold-account-embed-root .skeleton-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.twerenbold-account-embed-root .skeleton-card .skeleton-title {
  height: 1.5rem;
  background: #e5e7eb;
  border-radius: 0.375rem;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  width: 60%;
}

.twerenbold-account-embed-root .skeleton-card .skeleton-text {
  height: 1rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.twerenbold-account-embed-root .skeleton-card .skeleton-text.short {
  width: 40%;
}

.twerenbold-account-embed-root .skeleton-card .skeleton-text.medium {
  width: 70%;
}

.twerenbold-account-embed-root .skeleton-card .skeleton-text.long {
  width: 90%;
}

.twerenbold-account-embed-root .skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.twerenbold-account-embed-root .skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.twerenbold-account-embed-root .skeleton-list-item .skeleton-avatar {
  width: 3rem;
  height: 3rem;
  background: #e5e7eb;
  border-radius: 50%;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.twerenbold-account-embed-root .skeleton-list-item .skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.twerenbold-account-embed-root .skeleton-list-item .skeleton-content .skeleton-text {
  height: 1rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.twerenbold-account-embed-root .skeleton-list-item .skeleton-content .skeleton-text.title {
  width: 50%;
  height: 1.25rem;
}

.twerenbold-account-embed-root .skeleton-list-item .skeleton-content .skeleton-text.subtitle {
  width: 30%;
}


.twerenbold-account-embed-root.page-transitioning {
  pointer-events: none;
}

.twerenbold-account-embed-root.page-transitioning .main-content,
.twerenbold-account-embed-root.page-transitioning .sidebar,
.twerenbold-account-embed-root.page-transitioning .mobile-nav-toggle {
  pointer-events: none;
}

.twerenbold-account-embed-root .main-content.fade-in {
  animation: portal-fade-in 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes portal-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes portal-slide-old-left {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-12%);
    opacity: 0;
  }
}

@keyframes portal-slide-new-right {
  from {
    transform: translateX(12%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes portal-slide-old-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(12%);
    opacity: 0;
  }
}

@keyframes portal-slide-new-left {
  from {
    transform: translateX(-12%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes portal-scale-old {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.96);
    opacity: 0;
  }
}

@keyframes portal-scale-new {
  from {
    transform: scale(1.04);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes portal-fade-old {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes portal-fade-new {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.twerenbold-account-embed-root.page-transition-slide-right::view-transition-old(portal-main-content) {
  animation: portal-slide-old-left 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-slide-right::view-transition-new(portal-main-content) {
  animation: portal-slide-new-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-slide-left::view-transition-old(portal-main-content) {
  animation: portal-slide-old-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-slide-left::view-transition-new(portal-main-content) {
  animation: portal-slide-new-left 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-scale::view-transition-old(portal-main-content) {
  animation: portal-scale-old 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-scale::view-transition-new(portal-main-content) {
  animation: portal-scale-new 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.twerenbold-account-embed-root.page-transition-fade::view-transition-old(portal-main-content) {
  animation: portal-fade-old 0.28s ease both;
}

.twerenbold-account-embed-root.page-transition-fade::view-transition-new(portal-main-content) {
  animation: portal-fade-new 0.28s ease both;
}

@media (prefers-reduced-motion: reduce) {
  .twerenbold-account-embed-root.page-transition-slide-right::view-transition-old(portal-main-content),
  .twerenbold-account-embed-root.page-transition-slide-right::view-transition-new(portal-main-content),
  .twerenbold-account-embed-root.page-transition-slide-left::view-transition-old(portal-main-content),
  .twerenbold-account-embed-root.page-transition-slide-left::view-transition-new(portal-main-content),
  .twerenbold-account-embed-root.page-transition-scale::view-transition-old(portal-main-content),
  .twerenbold-account-embed-root.page-transition-scale::view-transition-new(portal-main-content),
  .twerenbold-account-embed-root.page-transition-fade::view-transition-old(portal-main-content),
  .twerenbold-account-embed-root.page-transition-fade::view-transition-new(portal-main-content) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  .twerenbold-account-embed-root .main-content.fade-in {
    animation-duration: 0.01ms !important;
  }
  .twerenbold-account-embed-root .main-content.fade-in {
    animation-duration: 0.01ms !important;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.twerenbold-account-embed-root.animate-in {
  animation: fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Navigation Item Transitions */
.twerenbold-account-embed-root .nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 60px; /* Approximate height of nav item */
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top;
  overflow: hidden;
}

.twerenbold-account-embed-root .nav-link.hidden {
  /* display: none; - Removed to allow transition */
  max-height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  transform: scaleY(0);
  pointer-events: none;
  border-width: 0 !important;
}

`, Vo = (
  /* css */
  `
  .twerenbold-account-embed-root .global-spinner-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    background: white;
    padding: 8px;
    border-radius: 50%;
   // box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .twerenbold-account-embed-root .global-spinner-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .twerenbold-account-embed-root .global-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(15, 118, 110, 0.1);
    border-left-color: var(--primary-color, #009553);
    border-radius: 50%;
    animation: global-spin 0.8s linear infinite;
  }

  .twerenbold-account-embed-root .global-spinner-tooltip {
    position: absolute;
    top: 1px;
    right: 44px;
    margin-top: 8px;
    background: var(--primary-color, #009553);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    pointer-events: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .twerenbold-account-embed-root .global-spinner-overlay:hover .global-spinner-tooltip {
    opacity: .5;
    visibility: visible;
    transform: translateY(0);
  }

  @keyframes global-spin {
    to { transform: rotate(360deg); }
  }
`
), Xo = (
  /* css */
  `
  .twerenbold-account-portal.pending-auth {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  .twerenbold-account-portal.auth-ready {
    opacity: 1 !important;
    transition: opacity 0.4s ease !important;
  }

  .azure-functions-loader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }

  .azure-functions-loader__content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
  }

  .azure-functions-loader__spinner {
    width: 64px;
    height: 64px;
    margin: 0 auto 1.5rem;
    border: 4px solid rgba(15, 118, 110, 0.1);
    border-left-color: var(--primary-color, #009553);
    border-radius: 50%;
    animation: azure-spin 1s linear infinite;
  }

  @keyframes azure-spin {
    to { transform: rotate(360deg); }
  }

  .azure-functions-loader__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color, #009553);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .azure-functions-loader__text {
    font-size: 0.95rem;
    color: #64748b;
    margin: 0;
  }

  .azure-functions-loader__progress {
    width: 100%;
    height: 4px;
    background: rgba(15, 118, 110, 0.1);
    border-radius: 999px;
    margin-top: 1.5rem;
    overflow: hidden;
  }

  .azure-functions-loader__progress-bar {
    height: 100%;
    background: var(--primary-color, #009553);
    border-radius: 999px;
    animation: azure-progress 2s ease-in-out;
  }

  @keyframes azure-progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
`
), jo = Ho + Vo + Xo;
function Jo(c) {
  if (typeof document > "u")
    return null;
  const t = `; ${document.cookie}`.split(`; ${c}=`);
  return t.length === 2 ? t.pop().split(";").shift() : null;
}
function Ko(c = {}) {
  const e = /* @__PURE__ */ new Set(["demo", "local", "live"]), t = Jo("apiMode");
  let i = null;
  if (E.debug("resolveInitialConfig - cookie apiMode:", t), E.debug("resolveInitialConfig - options.apiMode:", c.apiMode), typeof localStorage < "u")
    try {
      i = localStorage.getItem("selectedTheme");
    } catch (o) {
      E.warn("Unable to access localStorage for theme preference:", o), i = null;
    }
  const r = c.apiMode && e.has(c.apiMode) ? c.apiMode : e.has(t) ? t : "demo";
  return E.debug("Resolved initial API mode:", r), {
    apiMode: r,
    theme: $r(c.theme || i || "twerenbold"),
    useHashRouting: !!c.useHashRouting
  };
}
function $r(c) {
  if (typeof c != "string") return "twerenbold";
  const e = c.trim();
  return !e || !/^[a-z0-9_-]{1,32}$/i.test(e) ? "twerenbold" : e;
}
const qo = (
  /* html */
  `
  <app-state-provider class="twerenbold-account-portal" data-portal="provider" auth-selector="oauth-auth-component">
    <button class="mobile-nav-toggle" type="button" data-portal="mobile-toggle" aria-controls="sidebarNav" aria-expanded="false" aria-label="Navigation öffnen">
      <span class="mobile-nav-toggle__icon" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span class="mobile-nav-toggle__label" data-portal="mobile-label">Menü</span>
      <span class="sr-only" data-portal="mobile-assistive">Navigation öffnen</span>
    </button>
    <div class="global-spinner-overlay" data-portal="global-spinner">
      <div class="global-spinner"></div>
      <div class="global-spinner-tooltip" data-portal="global-spinner-tooltip">Laden...</div>
    </div>
    <language-editor></language-editor>
    <div class="sidebar-backdrop" data-portal="sidebar-backdrop"></div>
    <main class="main-content" data-portal="main-content">
      <div class="skeleton-loader" data-portal="skeleton-loader">
        <div class="skeleton-header"></div>
        <div class="skeleton-card">
          <div class="skeleton-title"></div>
          <div class="skeleton-text medium"></div>
          <div class="skeleton-text long"></div>
          <div class="skeleton-text short"></div>
        </div>
        <div class="skeleton-list">
          <div class="skeleton-list-item">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-content">
              <div class="skeleton-text title"></div>
              <div class="skeleton-text subtitle"></div>
              <div class="skeleton-text medium"></div>
            </div>
          </div>
          <div class="skeleton-list-item">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-content">
              <div class="skeleton-text title"></div>
              <div class="skeleton-text subtitle"></div>
              <div class="skeleton-text medium"></div>
            </div>
          </div>
          <div class="skeleton-list-item">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-content">
              <div class="skeleton-text title"></div>
              <div class="skeleton-text subtitle"></div>
              <div class="skeleton-text medium"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <aside class="sidebar" data-portal="sidebar-nav" aria-label="Hauptnavigation">
      <h2 class="sidebar-title">Mein Konto</h2>
      <div class="navigation-group">
        <a class="nav-link" data-portal="nav-link" data-page="overview">
          <p>Kontoübersicht</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
        <a class="nav-link" data-portal="nav-link" data-page="account">
          <p>Persönliche Daten</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
        <a class="nav-link" data-portal="nav-link" data-page="trips">
          <p>Meine Reisen</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
        <a class="nav-link" data-portal="nav-link" data-page="merkliste">
          <p>Merkliste</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
        <a class="nav-link" data-portal="nav-link" data-page="newsletter">
          <p>Newsletter-Abonnements</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
        <a class="nav-link" data-portal="nav-link" data-page="club">
          <p>Kundenclub</p>
          <div class="nav-icon">
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
      </div>
      <div class="support-block">
        <h3>Fragen &amp; Support</h3>
        <p>
          Telefon: 043 960 86 10<br />
          Mo-Fr: 09:00 - 12:00 / 13:00 - 17:00 Uhr
        </p>
      </div>
      <div class="auth-section" data-portal="auth-section"></div>
      <div class="api-mode-section" data-portal="api-mode-section">
        <h4>API Modus</h4>
        <select data-portal="api-mode-select">
          <option value="demo">Demo (Mock Daten)</option>
          <option value="local">Lokal (Mock Server)</option>
          <option value="live">Live (OAuth)</option>
        </select>
        <p data-portal="api-mode-hint">Verwenden Sie Mock-Daten für Entwicklung</p>
      </div>
      <div class="theme-switcher-section" data-portal="theme-section">
        <h4>Theme Debug</h4>
        <select data-portal="theme-select">
          <option value="twerenbold">Twerenbold (Grün)</option>
          <option value="voegele">Voegele (Dunkelgrün)</option>
          <option value="imbach">Imbach (Blau)</option>
          <option value="mittelthurgau">Mittelthurgau (Weinrot)</option>
          <option value="excellence">Excellence (Gold)</option>
        </select>
        <p data-portal="theme-hint">Twerenbold Theme (Grün)</p>
      </div>
    </aside>

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\/script>

  </app-state-provider>
`
);
async function Qo() {
  await Or();
}
async function ea() {
  const c = [
    "app-state-provider",
    "account-overview-component",
    "account-manager",
    "current-trip-component",
    "trips-list-component",
    "favorites-list",
    "newsletter-signup",
    "club-status-component",
    "oauth-auth-component"
  ];
  await Promise.all(c.map((e) => customElements.whenDefined(e)));
}
const li = (c, e) => {
  const t = document.createElement("link");
  return t.rel = "stylesheet", t.href = c, t.setAttribute("data-twerenbold-style", e), t;
};
async function ta(c, e = {}) {
  if (!c)
    throw new Error("mountAccountPortal: container element is required");
  const t = Ko(e);
  ia(c, t.theme || "twerenbold"), typeof window < "u" && (window.__twerenboldPreferredApiMode = t.apiMode, E.debug("Setting preferred API mode BEFORE provider init:", t.apiMode)), await Qo(), await ea();
  const i = document.createElement("div");
  i.className = xi, i.dataset.portal = "wrapper", i.appendChild(li(zo, "fonts")), i.appendChild(li(Bo, "variables")), i.appendChild(li(Go, "theme"));
  const r = document.createElement("style");
  r.textContent = jo, i.appendChild(r), i.insertAdjacentHTML("beforeend", qo), c.replaceChildren(i);
  const o = await ra(i, { ...e, initialConfig: t });
  return i.__twerenboldPortalController = o, o;
}
function ia(c, e = "twerenbold") {
  const t = $r(e), i = (
    /* html */
    `
    <style>
      .twerenbold-initial-loader {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        // background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .twerenbold-initial-loader__content {
        text-align: center;
        max-width: 400px;
        padding: 2rem;
      }

      .twerenbold-initial-loader__spinner {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        border: 4px solid rgba(15, 118, 110, 0.1);
        border-left-color: var(--primary-color, #009553);
        border-radius: 50%;
        animation: twerenbold-spin 1s linear infinite;
      }

      @keyframes twerenbold-spin {
        to { transform: rotate(360deg); }
      }

      .twerenbold-initial-loader__logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color, #009553);
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
      }

      .twerenbold-initial-loader__text {
        font-size: 0.95rem;
        color: #64748b;
        margin: 0;
      }

      .twerenbold-initial-loader__progress {
        width: 100%;
        height: 4px;
        background: rgba(15, 118, 110, 0.1);
        border-radius: 999px;
        margin-top: 1.5rem;
        overflow: hidden;
      }

      .twerenbold-initial-loader__progress-bar {
        height: 100%;
        background: var(--primary-color, #009553);
        border-radius: 999px;
        animation: twerenbold-progress 2s ease-in-out infinite;
      }

      @keyframes twerenbold-progress {
        0% { width: 0%; transform: translateX(0); }
        50% { width: 70%; transform: translateX(0); }
        100% { width: 100%; transform: translateX(0); }
      }
    </style>
    <div class="twerenbold-initial-loader">
      <div class="twerenbold-initial-loader__content">
        <div class="twerenbold-initial-loader__spinner"></div>
        <div class="twerenbold-initial-loader__logo">Twerenbold</div>
        <p class="twerenbold-initial-loader__text">Portal wird geladen...</p>
        <div class="twerenbold-initial-loader__progress">
          <div class="twerenbold-initial-loader__progress-bar"></div>
        </div>
      </div>
    </div>
  `
  );
  c.innerHTML = i;
  const r = c.querySelector(".twerenbold-initial-loader");
  r && (r.dataset.theme = t);
}
function ur(c) {
  if (c.querySelector('[data-portal="azure-loader"]'))
    return;
  c.insertAdjacentHTML(
    "beforeend",
    /* html */
    `
    <div class="azure-functions-loader" data-portal="azure-loader">
      <div class="azure-functions-loader__content">
        <div class="azure-functions-loader__spinner"></div>
        <div class="azure-functions-loader__logo">Mein Konto</div>
        <p class="azure-functions-loader__text">Authentifizierung wird abgeschlossen…</p>
        <div class="azure-functions-loader__progress">
          <div class="azure-functions-loader__progress-bar"></div>
        </div>
      </div>
    </div>
  `
  );
}
function gr(c) {
  const e = c.querySelector('[data-portal="azure-loader"]');
  e && (e.style.opacity = "0", setTimeout(() => e.remove(), 300));
}
async function ra(c, e) {
  const t = c.querySelector('[data-portal="provider"]'), i = c.querySelector('[data-portal="main-content"]'), r = Array.from(c.querySelectorAll('[data-portal="nav-link"]')), o = c.querySelector('[data-portal="api-mode-select"]'), a = c.querySelector('[data-portal="api-mode-hint"]'), n = c.querySelector('[data-portal="theme-select"]'), s = c.querySelector('[data-portal="theme-hint"]'), l = c.querySelector(".support-block"), g = c.querySelector('[data-portal="auth-section"]'), p = c.querySelector('[data-portal="api-mode-section"]'), h = c.querySelector('[data-portal="theme-section"]'), m = c.querySelector('[data-portal="sidebar-nav"]'), b = c.querySelector('[data-portal="sidebar-backdrop"]'), v = c.querySelector('[data-portal="mobile-toggle"]'), y = c.querySelector('[data-portal="mobile-label"]'), I = c.querySelector('[data-portal="mobile-assistive"]');
  if (!t || !i)
    throw new Error("Failed to initialize account portal: required elements missing.");
  sessionStorage.getItem("twerenbold_pending_auth") === "true" && (E.debug("Pending auth detected - hiding portal until Azure Functions complete"), t.classList.add("pending-auth"), ur(c), setTimeout(() => {
    t.classList.contains("pending-auth") && (E.warn("Auth pending state timed out (15s) - force revealing portal"), t.classList.remove("pending-auth"), t.classList.add("auth-ready"), sessionStorage.removeItem("twerenbold_pending_auth"), gr(c), t.state && me(t.state));
  }, 15e3)), i.style.viewTransitionName = "portal-main-content", import("./language-editor-BcDz6wsk.js").catch((f) => E.warn("Failed to load language editor:", f)), await customElements.whenDefined("app-state-provider");
  const z = [], P = (f, T, C, _) => {
    f && (f.addEventListener(T, C, _), z.push(() => f.removeEventListener(T, C, _)));
  }, ce = (f, T) => {
    f && (typeof f.addEventListener == "function" ? (f.addEventListener("change", T), z.push(() => f.removeEventListener("change", T))) : typeof f.addListener == "function" && (f.addListener(T), z.push(() => f.removeListener(T))));
  }, Ue = () => {
    E.debug("Showing Azure Functions fullscreen loader"), ur(c);
  }, Yt = () => {
    E.debug("Hiding Azure Functions fullscreen loader and revealing portal"), gr(c), t.classList.contains("pending-auth") && (t.classList.remove("pending-auth"), t.classList.add("auth-ready"));
  };
  P(document, "azure-functions-wait-start", Ue), P(document, "azure-functions-wait-end", Yt);
  const gt = c.querySelector('[data-portal="global-spinner"]'), kt = c.querySelector('[data-portal="global-spinner-tooltip"]');
  if (gt) {
    let f = null;
    const T = (C) => {
      var X, re;
      const _ = ((X = C.detail) == null ? void 0 : X.activeRequests) || [], k = (re = C.detail) == null ? void 0 : re.startTime;
      if (C.type === "api-loading-start" || _.length > 0) {
        gt.classList.add("visible");
        const we = () => {
          if (!kt) return;
          let he = "";
          if (_.length > 0) {
            const ue = _.slice(0, 3), ye = _.length - 3;
            he = ue.join(", "), ye > 0 && (he += ` (+${ye})`);
          } else
            he = "Laden...";
          if (k) {
            const ue = Math.floor((Date.now() - k) / 1e3);
            ue > 0 && (he += ` (${ue}s)`);
          }
          kt.textContent = he;
        };
        we(), !f && k && (f = setInterval(we, 1e3));
      } else
        gt.classList.remove("visible"), f && (clearInterval(f), f = null);
    };
    P(document, "api-loading-start", T), P(document, "api-loading-end", T);
  }
  const Ht = (f, T, C) => {
    let _ = "";
    {
      const U = /* @__PURE__ */ new Date();
      U.setTime(U.getTime() + C * 24 * 60 * 60 * 1e3), _ = `; expires=${U.toUTCString()}`;
    }
    const k = `${f}=${T || ""}${_}; path=/`;
    document.cookie = k, E.debug(`Setting cookie: ${f}=${T} (expires in ${C} days)`), E.debug(`Cookie string: ${k}`), E.debug("Verification - readback:", V(f));
  }, V = (f) => {
    const T = `${f}=`, C = document.cookie.split(";");
    for (let _ = 0; _ < C.length; _ += 1) {
      let k = C[_];
      for (; k.charAt(0) === " "; )
        k = k.substring(1, k.length);
      if (k.indexOf(T) === 0)
        return k.substring(T.length, k.length);
    }
    return null;
  }, Ze = e.initialConfig || {}, We = !!(e.useHashRouting ?? Ze.useHashRouting), pt = ["demo", "local", "live"];
  let Z = Ze.apiMode ?? e.apiMode ?? V("apiMode") ?? "live";
  pt.includes(Z) || (Z = "live");
  let D = Ze.theme ?? e.theme ?? null;
  if (!D && typeof localStorage < "u")
    try {
      D = localStorage.getItem("selectedTheme");
    } catch (f) {
      E.warn("Unable to access localStorage for initial theme:", f);
    }
  D = D || "twerenbold";
  let se = "";
  o && (o.value = Z), n && (n.value = D);
  const mt = () => {
    if (!a) return;
    const f = {
      demo: "Verwenden Sie Mock-Daten für Entwicklung",
      local: 'Demo: <code style="background:#e5e7eb;padding:0.125rem 0.25rem;border-radius:3px;">cd api-demo &amp;&amp; npm start</code>',
      live: "Erfordert OAuth-Authentifizierung"
    };
    a.innerHTML = f[Z] || f.demo;
  }, xt = () => {
    if (!s) return;
    const f = {
      twerenbold: "Twerenbold Theme (Grün)",
      voegele: "Voegele Theme (Dunkelgrün)",
      imbach: "Imbach Theme (Blau)",
      mittelthurgau: "Mittelthurgau Theme (Weinrot)",
      excellence: "Excellence Theme (Gold)"
    };
    s.textContent = f[D] || "Unbekanntes Theme";
  }, ft = () => {
    const f = (T, C) => {
      T && (T.hidden = !C, T.style.display = C ? "" : "none");
    };
    f(l, j("supportBlock", Z, D)), f(g, j("authSection", Z, D)), f(p, j("apiModeSection", Z, D)), f(h, j("themeSwitcherSection", Z, D));
  }, B = async () => {
    var C;
    c.setAttribute("theme", D), Yo.forEach((_) => c.classList.remove(`${_}-theme`)), c.classList.add(`${D}-theme`);
    let f = { phone: "+41 (0) 56 484 84 84", openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr" };
    try {
      const { getConfigFor: _ } = await Promise.resolve().then(() => Yi), k = _(((C = e.initialConfig) == null ? void 0 : C.apiMode) || "live", D);
      E.debug("Loaded theme config for contact:", { theme: D, contact: k == null ? void 0 : k.contact }), k != null && k.contact && (f = k.contact);
    } catch (_) {
      E.warn("Could not load component config for contact info:", _);
    }
    const T = c.querySelector(".support-block p");
    if (T) {
      const _ = c.parentElement, k = _ ? _.getAttribute("data-phone") : null, U = _ ? _.getAttribute("data-opening-hours") : null, X = e.phone || k || f.phone, re = e.openingHours || U || f.openingHours;
      E.debug("Updating contact info:", { phone: X, hours: re, source: { options: e.phone, attr: k, config: f.phone } }), T.innerHTML = `
        Telefon: ${X}<br />
        ${re}
      `;
    }
    ft();
  };
  mt(), xt(), B();
  const It = () => {
    x.setMode(Z);
  }, Y = async (f) => {
    var T;
    if (!(typeof window > "u"))
      try {
        if (window._watchlistSyncer)
          if (typeof window._watchlistSyncer.destroy == "function")
            window._watchlistSyncer.destroy(), window._watchlistSyncer = null;
          else {
            E.debug("Existing WatchlistSyncer found without destroy() - assuming external control, skipping auto-init.");
            return;
          }
        const _ = (await import("./watchlist-syncer.bundle.js")).default || window.WatchlistSyncer;
        if (_) {
          const k = x.baseUrl;
          E.debug("Auto-initializing WatchlistSyncer", { mode: f, baseUrl: k });
          const X = (await Promise.resolve().then(() => Yi)).getConfigFor(f, D), re = ((T = X == null ? void 0 : X.watchlist) == null ? void 0 : T.providerId) || void 0;
          window._watchlistSyncer = new _({
            baseUrl: k,
            //Pass provider ID if found
            ...re !== void 0 ? { defaultProviderId: re } : {},
            //   debug: mode !== 'live', // Forced debug removed
            debug: !0,
            getToken: async () => {
              let we = 0;
              for (; !x.authComponent && we < 10; )
                await new Promise((he) => setTimeout(he, 500)), we++;
              return x.authComponent && typeof x.authComponent.getAccessToken == "function" ? await x.authComponent.getAccessToken() : (E.debug("WatchlistSyncer asked for token but authComponent is missing/invalid after wait"), null);
            }
          });
        }
      } catch (C) {
        E.warn("Failed to auto-load WatchlistSyncer:", C);
      }
  };
  let Ke = !1;
  const W = async () => {
    var f, T;
    if (t) {
      Ke = !0;
      try {
        typeof t.setTheme == "function" ? t.setTheme(D) : (f = t._actions) != null && f.setTheme && t._actions.setTheme(D), typeof t.setApiMode == "function" ? await t.setApiMode(Z) : (T = t._actions) != null && T.setApiMode && await t._actions.setApiMode(Z);
      } catch (C) {
        E.warn("Failed to sync provider state:", C);
      } finally {
        setTimeout(() => {
          Ke = !1;
        }, 100);
      }
    }
  }, _e = () => {
    if (!g) return;
    let f = g.querySelector("oauth-auth-component");
    f || (f = document.createElement("oauth-auth-component"), g.appendChild(f)), f.setAttribute("theme", D), f.setAttribute("api-mode", Z);
    const T = e.oauthRedirectUri || (typeof window < "u" ? window.location.href : void 0);
    T && (f.setAttribute("redirect-uri", T), E.debug("OAuth redirect URI set to:", T)), t && typeof t.registerAuthComponent == "function" ? (E.debug("Manually registering OAuth component with app-state-provider"), t.registerAuthComponent(f)) : t && t._actions && typeof t._actions.registerAuthComponent == "function" && (E.debug("Manually registering OAuth component with app-state-provider (via _actions)"), t._actions.registerAuthComponent(f));
  }, Fe = () => {
    const f = m == null ? void 0 : m.querySelector(".sidebar-title");
    f && (f.textContent = O("overlayTitle", "common", "Mein Konto", D)), r.forEach((T) => {
      const C = T.dataset.page;
      if (!C) return;
      const _ = T.querySelector("p");
      _ && (_.textContent = O("pageTitle", C, _.textContent, D));
    });
  }, ve = (f, { persist: T = !0, rerender: C = !0 } = {}) => {
    if (f) {
      if (D = f, n && (n.value = D), T)
        try {
          localStorage.setItem("selectedTheme", D);
        } catch (_) {
          E.warn("Unable to persist theme selection:", _);
        }
      B(), xt(), Fe(), _e(), W(), C && se && ke(se, { force: !0, skipTransition: !0, suppressSidebarClose: !0 });
    }
  }, ze = (f, { persist: T = !0, rerender: C = !0 } = {}) => {
    f && (E.debug("applyApiMode →", f, { persist: T, rerender: C }), Z = f, o && (o.value = Z), T && Ht("apiMode", Z, 30), mt(), It(), ft(), W(), _e(), C && se && ke(se, { force: !0, skipTransition: !0, suppressSidebarClose: !0 }), Y(f));
  };
  ve(D, { persist: !0, rerender: !1 }), ze(Z, { persist: !0, rerender: !1 }), requestAnimationFrame(() => {
    _e();
  });
  const Be = window.matchMedia("(max-width: 900px)"), Pt = () => {
    if (!m) return;
    m.classList.add("is-open"), c.classList.add("sidebar-open"), b == null || b.classList.add("visible"), v == null || v.setAttribute("aria-expanded", "true"), v == null || v.setAttribute("aria-label", "Navigation schließen"), y && (y.textContent = "Schließen"), I && (I.textContent = "Navigation schließen");
    const f = m.querySelector(".nav-link");
    f && requestAnimationFrame(() => f.focus({ preventScroll: !0 }));
  }, Se = ({ skipFocus: f = !1 } = {}) => {
    if (!m) return;
    const T = m.classList.contains("is-open");
    m.classList.remove("is-open"), c.classList.remove("sidebar-open"), b == null || b.classList.remove("visible"), v == null || v.setAttribute("aria-expanded", "false"), v == null || v.setAttribute("aria-label", "Navigation öffnen"), y && (y.textContent = "Menü"), I && (I.textContent = "Navigation öffnen"), T && v && !f && requestAnimationFrame(() => v.focus({ preventScroll: !0 }));
  };
  P(v, "click", () => {
    m && (m.classList.contains("is-open") ? Se() : Pt());
  }), P(b, "click", () => Se({ skipFocus: !0 })), P(document, "keydown", (f) => {
    f.key === "Escape" && Se({ skipFocus: !0 });
  });
  const Ye = (f) => {
    f.matches || Se({ skipFocus: !0 });
  };
  ce(Be, Ye), Be && Ye(Be), r.forEach((f) => {
    P(f, "click", (T) => {
      T.preventDefault();
      const C = f.dataset.page;
      ke(C);
    });
  }), P(o, "change", () => ze(o.value)), P(n, "change", () => ve(n.value));
  const me = (f) => {
    if (!f) return;
    try {
      if (!!f.isAuthenticated)
        m && (m.classList.remove("hidden"), m.style.display = ""), v && (v.style.display = "");
      else {
        m && (m.classList.add("hidden"), m.style.display = "none", Se({ skipFocus: !0 })), v && (v.style.display = "none");
        return;
      }
    } catch (k) {
      E.warn("updateNavigationVisibility auth check failed:", k);
    }
    const T = r.find((k) => k.dataset.page === "trips"), C = r.find((k) => k.dataset.page === "merkliste"), _ = r.find((k) => k.dataset.page === "club");
    if (T && (f.trips && f.trips.length > 0 ? (T.classList.remove("hidden"), T.style.display = "") : T.classList.add("hidden")), C && (j("favorites", f.apiMode, f.theme) ? (C.classList.remove("hidden"), C.style.display = "") : C.classList.add("hidden")), _) {
      const k = j("clubStatus", f.apiMode, f.theme), U = f.accountClubStatus && (f.accountClubStatus.memberId || f.accountClubStatus.currentStatus);
      k && (U || f.apiMode === "demo") ? (_.classList.remove("hidden"), _.style.display = "") : _.classList.add("hidden");
    }
  };
  P(t, "app-state-changed", (f) => {
    var C;
    const T = (C = f == null ? void 0 : f.detail) == null ? void 0 : C.newState;
    if (T) {
      if (!Ke) {
        const _ = T.apiMode;
        _ && _ !== Z && (E.debug("Provider apiMode changed externally:", _), ze(_, { persist: !0, rerender: !1 })), o && o.value !== Z && (o.value = Z);
      }
      me(T), Fe();
    }
  }), t && t.state && me(t.state), Fe();
  const qe = {
    overview: () => {
      const f = document.createElement("account-overview-component");
      return f.setAttribute("theme", D), f.setAttribute("api-mode", Z), f;
    },
    account: () => {
      const f = document.createElement("account-manager");
      return f.setAttribute("theme", D), f.setAttribute("api-mode", Z), f.setAttribute("auto-load-account-data", ""), f;
    },
    trips: () => {
      const f = document.createElement("div");
      f.style.display = "flex", f.style.flexDirection = "column", f.style.gap = "2rem", f.style.width = "100%";
      const T = document.createElement("trips-list-component");
      return T.setAttribute("theme", D), T.setAttribute("api-mode", Z), f.appendChild(T), f;
    },
    merkliste: () => {
      const f = document.createElement("favorites-list");
      return f.setAttribute("theme", D), f.setAttribute("api-mode", Z), f;
    },
    newsletter: () => {
      const f = document.createElement("newsletter-signup");
      return f.setAttribute("theme", D), f.setAttribute("api-mode", Z), f;
    },
    club: () => {
      const f = document.createElement("club-status-component");
      return f.setAttribute("theme", D), f.setAttribute("api-mode", Z), f;
    }
  }, Ce = ["overview", "account", "trips", "merkliste", "newsletter", "club"], Qe = (f, T) => {
    const C = Ce.indexOf(f), _ = Ce.indexOf(T);
    return C === -1 || _ === -1 ? "fade" : _ > C ? "slide-right" : _ < C ? "slide-left" : "scale";
  }, et = () => {
    if (sessionStorage.getItem("twerenbold_pending_auth") === "true")
      return !0;
    const f = window.location.hash || "";
    return f.includes("code=") || f.includes("state=") || f.includes("error=");
  }, bt = (f) => {
    if (!We)
      return;
    if (et()) {
      E.debug("Skipping hash sync to preserve auth redirect fragment");
      return;
    }
    const T = `#${f}`;
    window.location.hash !== T && history.replaceState(null, "", T);
  }, Mt = typeof document.startViewTransition == "function", ke = async (f, { force: T = !1, skipTransition: C = !1, suppressSidebarClose: _ = !1, skipHashUpdate: k = !1 } = {}) => {
    const U = qe[f] ? f : "overview", X = i.children.length > 0;
    if (!T && se === U && X) {
      bt(U);
      return;
    }
    const re = !!se, he = `page-transition-${Qe(se, U)}`, ue = () => {
      r.forEach((oe) => oe.classList.toggle("active", oe.dataset.page === U));
    }, ye = () => {
      const oe = qe[U], it = oe ? oe() : document.createElement("div");
      oe || (it.textContent = "Seite nicht gefunden."), i.innerHTML = "", i.appendChild(it);
    }, Nt = () => {
      i.classList.remove("fade-in");
    }, Ee = () => {
      se = U;
      const oe = O("pageTitle", U, "Account", D), it = O("companyName", "trips", "Twerenbold Reisen", D);
      oe && (document.title = `${oe} – Kundenkonto – ${it}`), k || bt(U), _ || Se({ skipFocus: !re });
    };
    if (C || !Mt) {
      ue(), ye(), i.classList.add("fade-in"), setTimeout(Nt, 320), Ee();
      return;
    }
    c.classList.add(he, "page-transitioning");
    try {
      await document.startViewTransition(() => {
        ue(), ye(), i.classList.add("fade-in");
      }).finished;
    } catch (oe) {
      E.warn("View transition failed:", oe);
    } finally {
      Nt(), c.classList.remove(he, "page-transitioning"), Ee();
    }
  };
  We && P(window, "hashchange", () => {
    const T = window.location.hash.replace("#", "");
    ke(T || e.initialPage || "overview");
  });
  const De = window.location.hash, xe = De.includes("code=") || De.includes("state=") || De.includes("error="), de = (We && !xe ? De.replace("#", "") : "") || e.initialPage || "overview", tt = i.querySelector('[data-portal="skeleton-loader"]');
  return tt && (tt.style.display = "none"), xe && E.debug("Auth response detected in hash - preserving for MSAL"), await ke(de, { force: !0, skipTransition: !0, skipHashUpdate: xe }), {
    setPage: (f) => ke(f),
    getPage: () => se,
    setApiMode: (f) => ze(f, { persist: !1 }),
    getApiMode: () => Z,
    setTheme: (f) => ve(f, { persist: !1 }),
    getTheme: () => D,
    refresh: () => se && ke(se, { force: !0, skipTransition: !0, suppressSidebarClose: !0 }),
    destroy: () => {
      z.forEach((f) => f()), z.length = 0, c.replaceChildren();
    }
  };
}
class oa extends HTMLElement {
  static get observedAttributes() {
    return ["api-mode", "theme", "page"];
  }
  constructor() {
    super(), this._controller = null, this._mountingPromise = null, this._root = this;
  }
  connectedCallback() {
    if (this._controller || this._mountingPromise)
      return;
    const e = this._collectOptions();
    this._mountingPromise = ta(this._root, e).then((t) => {
      this._controller = t, this._mountingPromise = null, this.dispatchEvent(new CustomEvent("account-portal-ready", {
        detail: t,
        bubbles: !1
      }));
    }).catch((t) => {
      console.error("Failed to mount twerenbold-account-embed:", t), this._mountingPromise = null, this.dispatchEvent(new CustomEvent("account-portal-error", {
        detail: t,
        bubbles: !1
      }));
    });
  }
  disconnectedCallback() {
    var e;
    (e = this._controller) != null && e.destroy && this._controller.destroy(), this._controller = null, this._mountingPromise = null, this.replaceChildren();
  }
  attributeChangedCallback(e, t, i) {
    var r, o, a, n, s, l;
    if (t !== i && this._controller)
      switch (e) {
        case "api-mode":
          (o = (r = this._controller).setApiMode) == null || o.call(r, i);
          break;
        case "theme":
          (n = (a = this._controller).setTheme) == null || n.call(a, i);
          break;
        case "page":
          (l = (s = this._controller).setPage) == null || l.call(s, i);
          break;
      }
  }
  _collectOptions() {
    const e = this.getAttribute("oauth-redirect-uri") || (typeof window < "u" ? window.location.href.split("#")[0] : void 0);
    return {
      apiMode: this.getAttribute("api-mode") || void 0,
      theme: this.getAttribute("theme") || void 0,
      initialPage: this.getAttribute("page") || void 0,
      useHashRouting: !this.hasAttribute("no-hash-routing"),
      // Default to true, opt-out with no-hash-routing
      oauthRedirectUri: e
    };
  }
}
customElements.get("twerenbold-account-embed") || customElements.define("twerenbold-account-embed", oa);
export {
  bi as A,
  da as B,
  Si as C,
  Ai as F,
  ki as H,
  _i as N,
  Ft as O,
  Ti as T,
  Jr as a,
  Qr as b,
  St as c,
  eo as d,
  jr as e,
  O as f,
  to as g,
  xr as h,
  ha as i,
  br as j,
  ca as k,
  Bt as l,
  Ci as m,
  gi as n,
  ui as o,
  sa as p,
  Oe as q,
  vi as r,
  Kr as s,
  Do as t,
  qr as u,
  la as v,
  yr as w,
  oa as x,
  Ii as y,
  ta as z
};
