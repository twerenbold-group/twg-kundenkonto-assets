var ko = Object.defineProperty;
var xo = Object.getPrototypeOf;
var Io = Reflect.get;
var Lo = (l, e, t) => e in l ? ko(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var D = (l, e, t) => Lo(l, typeof e != "symbol" ? e + "" : e, t);
var ct = (l, e, t) => Io(xo(l), t, e);
import { b as Po } from "./index-CgbWBKBt.js";
import { c as De, f as Ue, s as wt, r as ae, q as m, a as ui, u as Xr, l as jr, G as $, g as Mo } from "./scroll-lock-Cdi8R-Hj.js";
import { getConfigFor as Ne, isComponentEnabled as Q, setRuntimeOverrides as No } from "./component-config-BZQIVaLD.js";
function Do(l) {
  var e;
  for (const t of [l.search, l.hash]) {
    const i = new URLSearchParams((t || "").slice(1));
    if (!i.has("code") && !i.has("error")) continue;
    const r = i.get("state");
    if (!(!r || r.length > 16384))
      try {
        const o = r.split("|")[0].replace(/-/g, "+").replace(/_/g, "/"), a = JSON.parse(atob(o));
        if (typeof a.id == "string" && a.id && ["silent", "popup"].includes((e = a.meta) == null ? void 0 : e.interactionType)) return !0;
      } catch {
      }
  }
  return !1;
}
const oi = typeof window < "u" && Do(window.location);
oi && Po().catch(() => {
  console.error("[OAuthCallback] Authentication response could not be forwarded.");
});
var Jr = class extends Event {
  constructor(e, t, i) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = e, this.callback = t, this.subscribe = i ?? !1;
  }
};
function An(l) {
  return l;
}
var Kt = class {
  constructor(e, t, i, r) {
    if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (o, a) => {
      this.unsubscribe && (this.unsubscribe !== a && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = o, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(o, a)), this.unsubscribe = a;
    }, this.host = e, t.context !== void 0) {
      let o = t;
      this.context = o.context, this.callback = o.callback, this.subscribe = o.subscribe ?? !1;
    } else this.context = t, this.callback = i, this.subscribe = r ?? !1;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new Jr(this.context, this.t, this.subscribe));
  }
}, Ro = class {
  get value() {
    return this.o;
  }
  set value(e) {
    this.setValue(e);
  }
  setValue(e, t = !1) {
    let i = t || !Object.is(e, this.o);
    this.o = e, i && this.updateObservers();
  }
  constructor(e) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (let [t, { disposer: i }] of this.subscriptions) t(this.o, i);
    }, e !== void 0 && (this.value = e);
  }
  addCallback(e, t, i) {
    if (!i) return void e(this.value);
    this.subscriptions.has(e) || this.subscriptions.set(e, { disposer: () => {
      this.subscriptions.delete(e);
    }, consumerHost: t });
    let { disposer: r } = this.subscriptions.get(e);
    e(this.value, r);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}, Eo = class extends Event {
  constructor(e) {
    super("context-provider", { bubbles: !0, composed: !0 }), this.context = e;
  }
}, Li = class extends Ro {
  constructor(e, t, i) {
    var r, o;
    super(t.context !== void 0 ? t.initialValue : i), this.onContextRequest = (a) => {
      let n = a.composedPath()[0];
      a.context === this.context && n !== this.host && (a.stopPropagation(), this.addCallback(a.callback, n, a.subscribe));
    }, this.onProviderRequest = (a) => {
      let n = a.composedPath()[0];
      if (a.context !== this.context || n === this.host) return;
      let s = /* @__PURE__ */ new Set();
      for (let [c, { consumerHost: p }] of this.subscriptions) s.has(c) || (s.add(c), p.dispatchEvent(new Jr(this.context, c, !0)));
      a.stopPropagation();
    }, this.host = e, t.context !== void 0 ? this.context = t.context : this.context = t, this.attachListeners(), (o = (r = this.host).addController) == null || o.call(r, this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new Eo(this.context));
  }
};
function xn({ context: l }) {
  return (e, t) => {
    let i = /* @__PURE__ */ new WeakMap();
    if (typeof t == "object") return t.addInitializer((function() {
      i.set(this, new Li(this, { context: l }));
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
        i.set(a, new Li(a, { context: l }));
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
function In({ context: l, subscribe: e }) {
  return (t, i) => {
    typeof i == "object" ? i.addInitializer((function() {
      new Kt(this, { context: l, callback: (r) => {
        this[i.name] = r;
      }, subscribe: e });
    })) : t.constructor.addInitializer(((r) => {
      new Kt(r, { context: l, callback: (o) => {
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
const gi = {
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
let X = null, Kr = "twerenbold", $o = typeof window < "u" && window.location.hostname === "localhost" ? "" : "https://xitami.github.io/TWR-Account-Components";
const cr = /* @__PURE__ */ new Set(), Zo = /* @__PURE__ */ new Set();
async function Yi() {
  if (X) return X;
  try {
    const e = await (await fetch(`${$o}/config/language-config.json`)).json();
    return X = e, Object.keys(e), X;
  } catch (l) {
    return console.warn("Failed to load language config, using defaults:", l), X = {}, X;
  }
}
function Oo(l) {
  X = l, l && Object.keys(l);
}
function qt(l) {
  Kr = l || "twerenbold";
}
function O(l, e = null, t = null, i = null) {
  const r = i || Kr;
  if (!X)
    return console.warn("Language config not loaded, using fallback for:", l), t || gi[l] || l;
  const o = e ? `${e}.${l}` : l;
  cr.has(o) || (cr.add(o), Zo.forEach((s) => s(o)));
  const a = o.split(".");
  if (X[r]) {
    let s = X[r];
    for (const c of a)
      s = s == null ? void 0 : s[c];
    if (s != null && (typeof s == "string" || Array.isArray(s)))
      return s;
  }
  if (r !== "twerenbold" && X.twerenbold) {
    let s = X.twerenbold;
    for (const c of a)
      s = s == null ? void 0 : s[c];
    if (s != null && (typeof s == "string" || Array.isArray(s)))
      return s;
  }
  if (X.common) {
    if (e && X.common[e] && X.common[e][l])
      return X.common[e][l];
    if (X.common[l])
      return X.common[l];
  }
  return gi[l] ? gi[l] : t || l;
}
if (typeof window < "u") {
  const e = new URLSearchParams(window.location.search).get("theme") || "twerenbold";
  Yi().then(() => {
    qt(e);
  });
}
const dt = 1800 * 1e3, Uo = 3e4, dr = 6e4 * 5, de = 3, hr = 2e3, Wo = [
  (l) => l.includes("_accountProfile_"),
  (l) => l.includes("_accountTravelers_"),
  (l) => l.includes("_trips_"),
  (l) => l.includes("_clubStatus_"),
  (l) => l.startsWith("twerenbold_favorites_"),
  (l) => l.startsWith("twerenbold_fav_removed_"),
  (l) => l.startsWith("twerenbold_fav_added_"),
  (l) => l === "twerenbold_hm_snapshot",
  (l) => l.startsWith("twerenbold_token_")
];
class qr {
  constructor() {
    var e;
    if (this.logger = De("ApiService"), this.endpoints = {
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
      trips: { ttl: dt, perUser: !0 },
      accountProfile: { ttl: dt, perUser: !0 },
      accountTravelers: { ttl: dt, perUser: !0 },
      clubStatus: { ttl: dt, perUser: !0 }
    }, this._cacheGeneration = {}, this._setupEventHandlers(), this._initializeCacheFromStorage();
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
                  const c = a.replace("_anonymous", `_${e}`);
                  this._cache.set(c, n);
                  try {
                    localStorage.setItem(c, JSON.stringify(n)), localStorage.removeItem(a), o++;
                  } catch (p) {
                    this.logger.warn("⚠️ Failed to migrate cache entry:", a, p);
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
    })), typeof window < "u" && (window.addEventListener("twerenbold:post-logout", () => {
      this._currentUserId = null, this.clearAllUserData("post-logout");
    }), window.addEventListener("storage", (e) => this._handleCacheStorageEvent(e)));
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
      if (Date.now() - e > Uo)
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
    return i ? Date.now() - i.timestamp < (t.ttl || dt) : !1;
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
  _storeInCache(e, t, i = null, r = null) {
    if (!this._cacheConfig[e]) return;
    if (r !== null && r !== this._getCacheGeneration(e)) {
      this.logger.debug("⏭️ Stale result not cached:", e);
      return;
    }
    const a = this._getCacheKey(e, i), n = {
      data: this._cloneData(t),
      timestamp: Date.now(),
      mode: this.mode,
      userId: i || this._currentUserId || "anonymous"
    };
    this._cache.set(a, n), this.logger.debug("💾 Cached:", e, "for user:", n.userId), this._saveToLocalStorage(a, n);
  }
  /**
   * Invalidate cache for a resource
   */
  _invalidateCache(e, t = null, i = "manual") {
    const r = this._getCacheKey(e, t);
    if (this._cache.delete(r), this._bumpCacheGeneration(e), typeof localStorage < "u")
      try {
        localStorage.removeItem(r);
      } catch (o) {
        this.logger.warn("⚠️ Failed to clear localStorage cache:", o);
      }
    this.logger.debug("♻️ Cache invalidated:", e, "reason:", i);
  }
  _getCacheGeneration(e) {
    return this._cacheGeneration[e] || 0;
  }
  /**
   * Generation hochzählen und laufende, deduplizierte GETs dieser Ressource
   * verwerfen, damit ein Folgeaufruf einen frischen Request startet statt die
   * alte Antwort mitzunehmen.
   */
  _bumpCacheGeneration(e) {
    this._cacheGeneration[e] = this._getCacheGeneration(e) + 1;
    const t = this.endpoints.paths[e];
    if (t)
      for (const i of Array.from(this._ongoingRequests.keys())) {
        if (!i.endsWith(":GET")) continue;
        const r = i.slice(0, -4);
        try {
          new URL(r, "https://placeholder.invalid").pathname.endsWith(t) && this._ongoingRequests.delete(i);
        } catch {
        }
      }
  }
  /**
   * Zentrales Aufräumen bei Abmeldung und Benutzerwechsel (Secure Design
   * Paket 3): Speicher-Cache, benutzerbezogene localStorage-Einträge und
   * laufende GETs. Die App-State-Felder setzt app-context auf das Event
   * `twerenbold:user-data-cleared` hin zurück. MSAL-Daten fasst das nicht an.
   */
  clearAllUserData(e = "manual") {
    if (Object.keys(this._cacheConfig).forEach((t) => this._bumpCacheGeneration(t)), this._cache.clear(), typeof localStorage < "u")
      try {
        for (let t = localStorage.length - 1; t >= 0; t--) {
          const i = localStorage.key(t);
          i && Wo.some((r) => r(i)) && localStorage.removeItem(i);
        }
      } catch (t) {
        this.logger.warn("⚠️ Failed to clear user data from localStorage:", t);
      }
    if (this.logger.debug("🧹 All user data cleared, reason:", e), typeof window < "u")
      try {
        window.dispatchEvent(new CustomEvent("twerenbold:user-data-cleared", { detail: { reason: e } }));
      } catch {
      }
  }
  /**
   * storage-Event aus einem anderen Tab: betroffene Cache-Einträge im Speicher
   * ersetzen bzw. verwerfen. Fremde Benutzer werden nie übernommen.
   */
  _handleCacheStorageEvent(e) {
    if (!e) return;
    if (e.key === null) {
      Object.keys(this._cacheConfig).forEach((r) => this._bumpCacheGeneration(r)), this._cache.clear();
      return;
    }
    const t = Object.keys(this._cacheConfig).find((r) => e.key.startsWith(`${this.mode}_${r}_`));
    if (!t) return;
    let i = null;
    try {
      i = e.newValue ? JSON.parse(e.newValue) : null;
    } catch {
      i = null;
    }
    i && i.data && i.userId && i.userId === this._currentUserId ? this._cache.set(e.key, i) : (this._cache.delete(e.key), e.newValue || this._bumpCacheGeneration(t));
  }
  /**
   * Mitreisende haben sich geändert: neben der Liste auch das Profil verwerfen.
   * Das Profil bettet `travelers` ein, und app-context wie account-manager
   * nehmen die Liste bevorzugt von dort. Ohne das kam ein gelöschter
   * Mitreisender beim nächsten Seitenwechsel aus dem 30-min-Profil-Cache zurück
   * und verschwand erst nach einem echten Reload.
   */
  _invalidateTravelerCaches(e = "travelers-changed") {
    this._invalidateCache("accountTravelers", this._currentUserId, e), this._invalidateCache("accountProfile", this._currentUserId, e);
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
    }), Object.keys(this._cacheConfig).forEach((r) => this._bumpCacheGeneration(r)), this.logger.debug("♻️ Cache cleared for mode:", e, "keys:", i.length, "reason:", t);
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
    this._currentUserId = r, o && r && o !== r && (this.logger.debug("🗑️ User switch detected, clearing data of previous user"), this.clearAllUserData("user-switch")), r ? (this._storeUserIdInLocalStorage(r), this.logger.debug("💾 Stored user ID for cache keys:", r)) : o && !r && this.logger.debug("🗑️ Cleared stored user ID (logout)");
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
      this._ongoingRequests.get(i) === a && this._ongoingRequests.delete(i);
    }).catch(() => {
    }), a;
  }
  /**
   * Perform the actual HTTP request with retry logic
   */
  async _performRequest(e, t = {}, i = 0) {
    let r;
    try {
      r = await this.getAuthHeaders();
    } catch (c) {
      throw c.message === "AUTH_TOKEN_MISSING" ? (this.logger.warn("🛑 Request aborted: Auth token missing (session expired)"), new Error("Authentifizierung erforderlich")) : c;
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
      const c = new AbortController(), p = setTimeout(() => c.abort(), dr || 6e4);
      a = await fetch(e, {
        ...o,
        signal: c.signal
      }), clearTimeout(p);
    } catch (c) {
      const p = c.name === "AbortError";
      if (p ? this.logger.error(`❌ Request timeout (${dr / 1e3}s) - API is very slow (attempt ${i + 1}/${de})`) : this.logger.error("❌ Network fetch failed:", c), i < de - 1) {
        const f = hr * Math.pow(2, i), v = p ? `Verbindung wird in ${f / 1e3} Sekunden erneut versucht...` : `Netzwerk- oder Serverfehler. Erneuter Versuch in ${f / 1e3} Sekunden...`;
        return this.logger.debug(`🔄 Retrying request in ${f / 1e3}s...`), this._showGlobalNotification({
          type: p ? "info" : "warning",
          // Info for timeout retry, warning for network error
          title: "Erneuter Versuch",
          message: `${v} (Versuch ${i + 2}/${de})`,
          persistent: !1,
          duration: f
        }), await new Promise((y) => setTimeout(y, f)), this._performRequest(e, t, i + 1);
      }
      const d = p ? "Zeitüberschreitung" : "Server-Fehler", g = p ? `Die Anfrage konnte nach ${de} Versuchen nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.` : "Die Verbindung zum Server konnte nicht erfolgreich hergestellt werden.";
      this._showGlobalNotification({
        type: "error",
        title: d,
        message: g,
        persistent: !0
      });
      const h = p ? `Request timeout after ${de} attempts` : `Netzwerk-Fehler nach ${de} Versuchen: ${c.message}`;
      throw new Error(h);
    }
    this.logger.debug("📥 Response status:", a.status);
    const n = a.status === 401, s = a.status === 500 && i === 0;
    if ((n || s) && this.isLiveMode) {
      const c = n ? "401 Unauthorized" : "500 Internal Error (Token Suspect)";
      if (this.logger.warn(`🔑 ${c} - attempting token refresh...`), i >= de - 1)
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
      } catch (p) {
        throw p.message === "TOKEN_REFRESH_FAILED" ? (this.logger.debug("⏸️ Request cancelled - waiting for user to manually re-authenticate"), new Error("Authentifizierung erforderlich - bitte melden Sie sich an")) : (this.logger.error("❌ Token refresh failed:", p), s ? (this.logger.error("Server Fehler (500) persistiert nach Token Refresh für:", e), new Error("Server Fehler (500) persistiert nach Token Refresh")) : (this._showGlobalNotification({
          type: "error",
          title: "Authentifizierung fehlgeschlagen",
          message: "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.",
          persistent: !0
        }), new Error("Authentifizierung fehlgeschlagen - bitte erneut anmelden")));
      }
    }
    if (!a.ok) {
      const c = await a.json().catch(() => ({}));
      throw this.logger.apiError(a.status, e, {
        method: t.method || "GET",
        message: c.message || a.statusText,
        responseData: c,
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
      }), new Error(`API Fehler: ${a.status} ${c.message || a.statusText}`);
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
          } catch (c) {
            this.logger.error("⚠️ onError Callback warf einen Fehler:", c);
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
        await new Promise((c) => setTimeout(c, 100)), this.authComponent || this._recoverAuthComponent({ reason: "getTrips-waiting-for-auth" });
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
      const s = this._cloneData(o.data), c = this._cacheConfig.trips, d = Date.now() - o.timestamp >= ((c == null ? void 0 : c.ttl) || dt);
      return d || t ? (this.logger.debug(`🔄 [SWR] Cache is ${d ? "stale" : "forced refresh"}, revalidating in background...`), this._revalidateTripsInBackground(i).catch((g) => {
        this.logger.warn("⚠️ Background revalidation failed:", g);
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
    const i = this._getCacheGeneration("trips");
    this.isLiveMode && !t && await this._waitForAuthReady();
    let r;
    this.isDemoMode ? r = await this._fetchTripsFromDemo() : r = await this._fetchTripsFromApi();
    const o = this._normalizeTrips(r), a = e || this._currentUserId;
    return this._storeInCache("trips", o, a, i), this.logger.debug("✅ Fetched and cached trips for user:", a || "anonymous"), o;
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
    var i, r, o, a, n, s, c;
    if (!e || typeof e != "object") return null;
    const t = { ...e };
    return t.departureDate = e.departureDate || ((i = e.dates) == null ? void 0 : i.departureDate) || e.startDate || e.beginDate || null, t.returnDate = e.returnDate || ((r = e.dates) == null ? void 0 : r.returnDate) || e.endDate || e.finishDate || null, t.duration = e.duration || ((o = e.dates) == null ? void 0 : o.duration) || null, t.price = e.price ?? ((a = e.pricing) == null ? void 0 : a.totalAmount) ?? ((n = e.pricing) == null ? void 0 : n.amount) ?? null, t.currency = e.currency || ((s = e.pricing) == null ? void 0 : s.currency) || null, t.bookingNumber = e.bookingNumber || e.dossier || e.reference || e.reservationNumber || null, t.code = e.code || e.tripCode || e.productCode || null, t.title = e.title || e.name || e.productName || "Unbenannte Reise", t.destination = e.destination || e.location || e.city || t.destination, t.status = this._normalizeTripStatus(e.status), t.image = e.image || ((c = e.media) == null ? void 0 : c.mainImage) || e.photo || null, (e.media || t.image) && (t.media = {
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
    const i = this._getCacheGeneration("accountProfile");
    let r;
    if (this.isDemoMode)
      r = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).profile || null;
    else {
      const o = `${this.baseUrl}${this.endpoints.paths.accountProfile}`, a = await this.makeAuthenticatedRequest(o);
      r = this._transformAccountProfile(a);
    }
    this._storeInCache("accountProfile", r, e, i);
    try {
      this.logger.debug("📡 getAccountProfile: returning profile with isClient:", r == null ? void 0 : r.isClient, "type:", typeof (r == null ? void 0 : r.isClient), "userId:", e);
    } catch {
    }
    return r;
  }
  /**
   * Transform nested account profile from API to flat structure
   */
  _transformAccountProfile(e) {
    if (!e) return null;
    const { personalData: t, address: i, contact: r, metaData: o, clubMembership: a, travelers: n, id: s } = e, c = (p) => {
      if (!p) return "";
      const d = p.toString().toLowerCase().trim();
      return d === "herr" ? "mr" : d === "frau" ? "ms" : d === "mr" || d === "ms" ? d : p;
    };
    return {
      // Personal data (flattened)
      id: s || null,
      isClient: (t == null ? void 0 : t.isClient) !== void 0 ? t.isClient : e.isClient !== void 0 ? e.isClient : null,
      salutation: c(t == null ? void 0 : t.salutation),
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
      travelers: Array.isArray(n) ? n.map((p) => this._transformTraveler(p)) : []
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
    var s, c, p, d, g, h;
    const { forceCreate: r = !1, forceUpdate: o = !1 } = t;
    if (this.isDemoMode)
      return { ...e, id: e.id || `profile_${Date.now()}` };
    const a = `${this.baseUrl}${this.endpoints.paths.accountProfile}`;
    let n = "PUT";
    r ? n = "PUT" : !o && !e.id && (n = "PUT", this.logger.debug("ℹ️ No profile ID found, attempting POST (create new profile)"));
    try {
      const f = await this.makeAuthenticatedRequest(a, {
        method: n,
        body: JSON.stringify(e)
      });
      return this._invalidateCache("accountProfile", this._currentUserId, "profile-updated"), f;
    } catch (f) {
      if (!r && !o) {
        if (n === "POST" && ((s = f.message) != null && s.includes("409")))
          return this.logger.debug("⚠️ Profile already exists (409), switching to PUT..."), this.updateAccountProfile(e, { forceUpdate: !0 });
        if (n === "PUT" && ((c = f.message) != null && c.includes("404")))
          return this.logger.debug("⚠️ Profile not found (404), switching to POST..."), this.updateAccountProfile(e, { forceCreate: !0 });
      }
      if ((((p = f.message) == null ? void 0 : p.includes("timeout")) || ((d = f.message) == null ? void 0 : d.includes("Netzwerk")) || ((g = f.message) == null ? void 0 : g.includes("fetch")) || ((h = f.message) == null ? void 0 : h.includes("AbortError"))) && i < de - 1) {
        const y = hr * Math.pow(2, i);
        return this.logger.debug(`🔄 Network/timeout error - retrying profile update in ${y / 1e3}s (attempt ${i + 2}/${de})...`), this._showGlobalNotification({
          type: "warning",
          title: "Verbindungsproblem",
          message: `Speichern fehlgeschlagen. Erneuter Versuch in ${y / 1e3} Sekunden... (Versuch ${i + 2}/${de})`,
          persistent: !1,
          duration: y
        }), await new Promise((S) => setTimeout(S, y)), this.updateAccountProfile(e, t, i + 1);
      }
      throw i >= de - 1 && (this.logger.error(`❌ Profile update failed after ${de} attempts`), this._showGlobalNotification({
        type: "error",
        title: "Speichern fehlgeschlagen",
        message: `Die Profildaten konnten nach ${de} Versuchen nicht gespeichert werden. Bitte versuchen Sie es später erneut.`,
        persistent: !0
      })), f;
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
    const i = this._getCacheGeneration("accountTravelers");
    let r;
    if (this.isDemoMode)
      r = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).travelers || [];
    else {
      const o = `${this.baseUrl}${this.endpoints.paths.accountTravelers}`, a = await this.makeAuthenticatedRequest(o);
      r = Array.isArray(a) ? a.map((n) => this._transformTraveler(n)) : [];
    }
    return this._storeInCache("accountTravelers", r, e, i), r;
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
      hasMitgliedschaft: e.hasMitgliedschaft === !0,
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
    return this._invalidateTravelerCaches("travelers-updated"), i;
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
    return this._invalidateTravelerCaches("traveler-added"), this._transformTraveler(r);
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
    return this._invalidateTravelerCaches("traveler-updated"), this._transformTraveler(o);
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
    }), this._invalidateTravelerCaches("traveler-deleted");
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
    const i = this._getCacheGeneration("clubStatus");
    let r;
    if (this.isDemoMode || this.isLocalMode || this.clubApiDisabled)
      r = (await (await fetch(`${this.endpoints.demoBaseUrl}/config/demo-data.json`)).json()).clubMembership || null;
    else {
      const o = `${this.baseUrl}${this.endpoints.paths.clubStatus}`;
      r = await this.makeAuthenticatedRequest(o);
    }
    return this._storeInCache("clubStatus", r, e, i), r;
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
const P = new qr(), ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApiService: qr,
  apiService: P
}, Symbol.toStringTag, { value: "Module" })), te = (() => {
  let l = [], e = !1, t = null, i = null;
  function r() {
    return !!(window._hsq && typeof window._hsq.push == "function");
  }
  function o(h) {
    r() ? window._hsq.push(h) : l.push(h);
  }
  function a() {
    if (r())
      for (; l.length; )
        window._hsq.push(l.shift());
  }
  function n(h) {
    !h || typeof h != "object" || o(["identify", h]);
  }
  function s(h) {
    !h || e || (e = !0, o(["identify", { email: h }]), o(["trackPageView"]));
  }
  function c() {
    e = !1, o(["trackEvent", { id: "logout" }]);
  }
  function p() {
    const h = location.pathname + location.search + location.hash;
    h !== t && (t = h, o(["setPath", h]), o(["trackPageView"]));
  }
  function d() {
    clearTimeout(i), i = setTimeout(p, 80);
  }
  window.addEventListener("hashchange", d), ["pushState", "replaceState"].forEach((h) => {
    const f = history[h];
    history[h] = function() {
      const v = f.apply(this, arguments);
      return d(), v;
    };
  });
  const g = setInterval(() => {
    r() && (clearInterval(g), a());
  }, 300);
  return setTimeout(d, 0), {
    identify: s,
    reset: c,
    flush: a,
    updateUserProperties: n,
    track: d
  };
})();
class Pi extends Ue {
  constructor() {
    super(), this.logger = De("AuthNotifications"), this.show = !1, this.title = "Benachrichtigung", this.message = "", this.type = "info", this.persistent = !1, this.autoHideDelay = 5e3, this.actions = [], this._autoHideTimer = null, this._activeNotification = null, this._customEventHandler = null, this._contextConsumer = new Kt(this, {
      context: Vi,
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
    return this.type === "auth" && (!this.actions || this.actions.length === 0) ? m`
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
      ` : this.actions && this.actions.length > 0 ? m`
        <div class="notification-actions">
          ${this.actions.map((e) => m`
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
    return m`
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
D(Pi, "properties", {
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
}), D(Pi, "styles", [
  wt,
  ae`
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
customElements.get("auth-notifications") || customElements.define("auth-notifications", Pi);
const Ze = "__twerenboldAppState", Qt = "twerenbold:app-state", ur = "app-state-changed", Vi = "app-state", Fo = {
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
  componentsConfig: Ne("demo", "twerenbold")
}, zo = 600 * 1e3, Ho = 1e3, gr = 10;
class Mi extends Ue {
  constructor() {
    super();
    // HUBSPOT CONFIG: Replace with your HubSpot portal ID
    D(this, "HUBSPOT_ID", null);
    // e.g. '12345678'
    D(this, "_isHubspotLoaded", !1);
    this.logger = De("AppStateProvider"), this.state = { ...Fo }, this._actions = this._createActions();
    const t = this._buildContextValue();
    this._contextProvider = new Li(this, {
      context: Vi,
      initialValue: t
    }), this._publishGlobalState(t), this._authLookupAttempts = 0, this._authLookupTimeout = null, this._authChangedHandler = null, this._authRefreshTimer = null, this._maxAuthLookupAttempts = gr, this._maxAuthLookupAttempts = gr, this._favoritesUnsub = null, this._initializeApp(), this._logoutFallbackHandler = () => {
      this.logger.debug("App received twerenbold:logout-fallback event - delegating to logout()");
      try {
        this.logout();
      } catch (i) {
        this.logger.warn("logout fallback handler failed", i);
        try {
          this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null }, "AppStateProvider.logout.fallback.eventHandler");
          try {
            te.reset();
          } catch {
          }
          try {
            P._clearStoredUserId();
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
            te.reset();
          } catch {
          }
          try {
            P._clearStoredUserId();
          } catch {
          }
        } catch (r) {
          this.logger.warn("final logout fallback failed", r);
        }
      }
    }, window.addEventListener("twerenbold:request-logout", this._requestLogoutHandler), this._windowAuthChangedHandler = (i) => {
      try {
        const r = this.state.authComponent;
        if (r && !i.composedPath().includes(r)) return;
        const o = (i == null ? void 0 : i.detail) || {};
        if (typeof o.isAuthenticated != "boolean") return;
        this._handleAuthChanged(o);
      } catch (r) {
        this.logger.warn("window auth-changed fallback handler failed", r);
      }
    }, window.addEventListener("auth-changed", this._windowAuthChangedHandler), this._postLogoutHandler = (i) => {
      this.logger.debug("App received twerenbold:post-logout, clearing auth & account state"), ui.setContextUser(null);
      try {
        this._detachAuthComponent(!0), this._updateState({ isAuthenticated: !1, authUser: null, accountProfile: null, accountLoaded: !1 }, "AppStateProvider.postLogout");
        try {
          te.reset();
        } catch (r) {
          this.logger.warn("Hubspot reset failed in post-logout handler", r);
        }
        try {
          this.addNotification({ type: "info", title: "Abgemeldet", message: "Sie wurden abgemeldet. Cache wurde bereinigt." });
        } catch {
        }
      } catch (r) {
        this.logger.warn("post-logout handler failed", r);
      }
    }, window.addEventListener("twerenbold:post-logout", this._postLogoutHandler), this._userDataClearedHandler = () => {
      this._accountLoadSeq = (this._accountLoadSeq || 0) + 1, this._updateState({
        accountProfile: null,
        accountTravelers: [],
        accountClubStatus: null,
        accountLoaded: !1,
        accountLoading: !1,
        currentTrip: null,
        trips: [],
        tripsLoaded: !1,
        favoritesCount: 0,
        hasFavorites: !1
      }, "AppStateProvider.userDataCleared");
    }, window.addEventListener("twerenbold:user-data-cleared", this._userDataClearedHandler));
  }
  async loadHubspotScript(t) {
    if (t && !(this._isHubspotLoaded || typeof document > "u"))
      try {
        const i = document.querySelector('script[src*="js.hs-scripts.com/"]');
        if (i)
          try {
            const o = i.src.match(/js\.hs-scripts\.com\/(\d+)\.js/);
            if (o && !t && (t = o[1], this.HUBSPOT_ID = t), this._isHubspotLoaded = !!(window._hsq && typeof window._hsq.push == "function"), this._isHubspotLoaded) {
              te.flush();
              try {
                this._updateState({ hubspotDiagnostics: { id: t, source: "existing_script_tag", isLoaded: !0 } }, "AppStateProvider.loadHubspotScript.existing");
              } catch {
              }
            } else {
              const a = setInterval(() => {
                if (window._hsq && typeof window._hsq.push == "function") {
                  clearInterval(a), this._isHubspotLoaded = !0;
                  try {
                    te.flush();
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
            te.flush(), te.track();
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
    var s, c, p;
    const t = (p = (c = (s = this.state.componentsConfig) == null ? void 0 : s.integrations) == null ? void 0 : c.hubspot) == null ? void 0 : p.id, i = this.state.hubspotId, r = typeof window < "u" ? window.__twerenboldHubspotId : void 0;
    let o = null;
    try {
      const d = typeof document < "u" && document.querySelector('script[src*="js.hs-scripts.com/"]');
      if (d) {
        const g = d.src.match(/js\.hs-scripts\.com\/(\d+)\.js/);
        g && (o = g[1]);
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
      this.state.authComponent && this._authChangedHandler && this.state.authComponent.removeEventListener("auth-changed", this._authChangedHandler), this._authChangedHandler = (i) => this._handleAuthChanged(i.detail), t.addEventListener("auth-changed", this._authChangedHandler), P.setAuthComponent(t), this._updateState({
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
    }, "AppStateProvider._detachAuthComponent"), P.setAuthComponent(null);
  }
  _handleAuthChanged(t = {}) {
    const i = !!t.isAuthenticated, r = t.user || null, o = this.state.authUser;
    if (this._updateState({
      isAuthenticated: i,
      authUser: r,
      authLastRefreshed: Date.now()
    }, "AppStateProvider._handleAuthChanged"), ((o == null ? void 0 : o.id) || null) !== ((r == null ? void 0 : r.id) || null) && P.handleAuthUserChange(o, r), i) {
      try {
        const a = this.state.notifications || [];
        a.length > 0 && (this.logger.debug("Clearing all notifications after successful login/registration"), a.forEach((n) => this.removeNotification(n.id)));
      } catch (a) {
        this.logger.warn("Failed to clear notifications", a);
      }
      this._scheduleAuthRefresh(), r && (!o || o.id && r.id && o.id !== r.id) && (this.logger.debug("User logged in - proactively loading account data and trips in background"), Promise.allSettled([
        this.loadAccountData().catch((a) => this.logger.warn("Background account load failed:", a)),
        this.loadTrips().catch((a) => this.logger.warn("Background trips load failed:", a))
      ]).then(() => {
        this.logger.debug("Background data loading completed");
      }));
      try {
        r != null && r.email && te.identify(r.email);
      } catch (a) {
        this.logger.warn("HubSpot identify failed", a);
      }
    } else {
      try {
        te.reset();
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
    }, zo));
  }
  _clearAuthRefreshTimer() {
    this._authRefreshTimer && (clearInterval(this._authRefreshTimer), this._authRefreshTimer = null);
  }
  async _initializeApp() {
    try {
      this.logger.debug("Initializing App State..."), this.logger.debug("Loading language config from: ./config/language-config.json");
      const t = await Yi();
      this.logger.debug("Language config loaded:", t ? "success" : "failed"), this._updateState({
        languageConfig: t,
        isLanguageLoaded: !0
      }, "AppStateProvider._initializeApp"), Oo(t), qt(this.state.theme), this.logger.debug("Theme set to:", this.state.theme), this._restorePersistedState();
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
          var c;
          (c = s == null ? void 0 : s.detail) != null && c.marketing && this.loadHubspotScript(this.HUBSPOT_ID);
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
      this._updateState({ isInitializing: !1, componentsConfig: Ne(this.state.apiMode, this.state.theme) }, "AppStateProvider._initializeApp.complete"), this.logger.debug("App State initialized successfully");
    } catch (t) {
      this.logger.error("Failed to initialize app state:", t), this._updateState({
        isInitializing: !1,
        isLanguageLoaded: !0
        // Continue without language config
      }, "AppStateProvider._initializeApp.error");
    }
    Q("favorites", this.state.apiMode, this.state.theme) ? this._subscribeToFavorites() : this.logger.debug("Favorites component disabled by component-config; skipping subscription.");
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
    this._authLookupAttempts < this._maxAuthLookupAttempts ? (this._authLookupAttempts += 1, this._authLookupTimeout && clearTimeout(this._authLookupTimeout), this._authLookupTimeout = setTimeout(() => this._connectAuthComponent(), Ho)) : this.logger.warn("No authentication component found using selectors:", i.join(", "));
  }
  _updateState(t, i = "unknown") {
    const r = this.state;
    this.state = { ...this.state, ...t };
    const o = Object.keys(t);
    this.logger.debug(`App State Update from [${i}]:`, {
      changed: o,
      values: t
    }), t.theme && t.theme !== r.theme && (this.logger.debug(`Theme changed by [${i}]:`, r.theme, "→", t.theme), qt(t.theme), this._persistState()), t.apiMode && t.apiMode !== r.apiMode && (this.logger.debug(`API Mode changed by [${i}]:`, r.apiMode, "→", t.apiMode), this._persistState()), t.preferences && this._persistState(), this._updateContext(), this.requestUpdate(), this.dispatchEvent(new CustomEvent("app-state-changed", {
      detail: { oldState: r, newState: this.state, caller: i },
      bubbles: !0,
      composed: !0
    }));
  }
  // Public actions
  setTheme(t) {
    ["twerenbold", "voegele", "imbach"].includes(t) && this._updateState({ theme: t, componentsConfig: Ne(this.state.apiMode, t) }, "AppStateProvider.setTheme");
  }
  async setApiMode(t) {
    if (["demo", "local", "live"].includes(t)) {
      this._updateState({ apiMode: t, componentsConfig: Ne(t, this.state.theme) }, "AppStateProvider.setApiMode");
      const { apiService: i } = await Promise.resolve().then(() => ie);
      i.setMode(t), this.logger.debug("Updated apiService mode to:", t.toUpperCase());
    }
  }
  setCurrentTrip(t) {
    this._updateState({ currentTrip: t }, "AppStateProvider.setCurrentTrip");
    try {
      te.track();
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
        const { apiService: r } = await Promise.resolve().then(() => ie), o = await r.getTripsWithOptions({
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
    t && Object.prototype.hasOwnProperty.call(t, "isClient") && t.isClient !== null && t.isClient !== void 0 && (o = !!t.isClient), this.logger.debug("setAccountData: set isClientAccount?", o, "profileId:", (t == null ? void 0 : t.id) || null), t && ui.setContextUser(t), this._updateState({
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
    var r;
    if (!this.state.isAuthenticated) {
      this.logger.debug("⏳ loadAccountData skipped — user not authenticated yet");
      return;
    }
    const t = this._accountLoadSeq = (this._accountLoadSeq || 0) + 1, i = () => t !== this._accountLoadSeq;
    this._updateState({ accountLoading: !0 }, "AppStateProvider.loadAccountData");
    try {
      const { apiService: o } = await Promise.resolve().then(() => ie), a = 4, n = 3e3;
      let s = null, c = null;
      for (let S = 0; S < a; S++)
        try {
          s = await o.getAccountProfile(), c = null;
          break;
        } catch (x) {
          c = x;
          const E = (r = x == null ? void 0 : x.message) == null ? void 0 : r.includes("500"), I = S === a - 1;
          if (!E || I)
            throw x;
          const Y = n * Math.pow(2, S);
          this.logger.warn(`⏳ Profile API returned 500 (attempt ${S + 1}/${a}) — retrying in ${Y / 1e3}s...`), await new Promise((he) => setTimeout(he, Y));
        }
      if (i()) return;
      s && ui.setContextUser(s), this._updateState({
        accountProfile: s,
        accountLoading: !0
        // Still loading other data
      }, "AppStateProvider.loadAccountData.profileLoaded");
      try {
        te.track();
      } catch {
      }
      this.logger.debug("Profile loaded and displayed, loading travelers and club status in background...", s);
      const d = [o.getAccountTravelers()];
      Q("clubStatus", this.state.apiMode, this.state.theme) ? d.push(o.getClubStatus()) : d.push(Promise.resolve(null));
      const [h, f] = await Promise.allSettled(d);
      let v = [];
      h.status === "fulfilled" ? v = Array.isArray(h.value) ? h.value : [] : Array.isArray(s == null ? void 0 : s.travelers) ? (v = s.travelers.map((S) => ({
        ...S,
        isLocked: !0,
        lockReason: "Der Status der Mitreisenden konnte nicht geladen werden. Bitte laden Sie die Seite erneut."
      })), this.logger.warn("Using travelers from profile payload due to travelers endpoint issue:", h.reason)) : this.logger.warn("Travelers could not be loaded:", h.reason);
      let y = null;
      if (f.status === "fulfilled" ? y = f.value : s != null && s.clubMembership ? (y = s.clubMembership, this.logger.warn("Using club membership from profile payload due to club endpoint issue:", f.reason)) : this.logger.warn("Club status could not be loaded:", f.reason), i()) return;
      this.setAccountData(s && { ...s, travelers: v }, v, y), this.logger.debug("Account data loaded successfully");
    } catch (o) {
      if (i()) return;
      throw this.logger.error("Failed to load account data:", o), this._updateState({ accountLoading: !1 }, "AppStateProvider.loadAccountData.error"), o;
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
      No(t || {}), this._updateState({ componentsConfig: Ne(this.state.apiMode, this.state.theme) }, "AppStateProvider.setComponentOverrides");
    } catch (i) {
      this.logger.warn("Failed to apply component overrides", i);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.logger.debug("AppStateProvider connected, providing context..."), this._updateContext();
  }
  disconnectedCallback() {
    if (this._clearAuthRefreshTimer(), this._authLookupTimeout && (clearTimeout(this._authLookupTimeout), this._authLookupTimeout = null), this._detachAuthComponent(!1), typeof window < "u") {
      const t = window[Ze];
      if ((t == null ? void 0 : t.provider) === this) {
        delete window[Ze];
        try {
          window.dispatchEvent(new CustomEvent(Qt, {
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
    if (!Q("favorites", this.state.apiMode, this.state.theme)) {
      this.logger.debug("Favorites subscription skipped: component disabled for this mode/theme");
      return;
    }
    try {
      const { favoritesService: r } = await Promise.resolve().then(() => Za), o = ((t = this.state.authUser) == null ? void 0 : t.localAccountId) || ((i = this.state.accountProfile) == null ? void 0 : i.id), a = await r.getLocalFavorites(o);
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
    const i = window[Ze] || {};
    i.state = (t == null ? void 0 : t.state) || this.state, i.actions = (t == null ? void 0 : t.actions) || this._actions, i.provider = this, i.timestamp = Date.now(), window[Ze] = i;
    try {
      window.dispatchEvent(new CustomEvent(Qt, {
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
    return m`
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
    return m`
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
D(Mi, "properties", {
  state: { type: Object, state: !0 }
}), D(Mi, "styles", ae`
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
const Qr = (l) => class extends l {
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
    if (super(), this.logger = De(this.constructor.name), this.logger.debug("Constructor called"), this._contextValue = void 0, this._themeOverride = void 0, this._apiModeOverride = void 0, this._authComponentOverride = void 0, this._hasAppContext = !1, this._contextProvidedViaProvider = !1, this._handleGlobalAppEvent = null, this._handleDomAppStateEvent = null, this.logger.debug("Creating ContextConsumer in constructor"), this._contextConsumer = new Kt(this, {
      context: Vi,
      callback: (e) => {
        if (this.logger.debug("Received context update:", e), this._contextProvidedViaProvider = !!e, this._applyAppContext(e, { viaGlobal: !1 }), !e && typeof window < "u") {
          const t = window[Ze];
          t != null && t.state && (t != null && t.actions) && (this.logger.debug("Context lost via provider, falling back to global bridge"), this._applyAppContext({ state: t.state, actions: t.actions }, { viaGlobal: !0 }));
        }
      },
      subscribe: !0
    }), this.logger.debug("ContextConsumer created"), typeof window < "u") {
      this._handleGlobalAppEvent = (t) => {
        const i = t == null ? void 0 : t.detail, r = i && i.state && i.actions ? { state: i.state, actions: i.actions } : (i == null ? void 0 : i.state) === null && (i == null ? void 0 : i.actions) === null ? null : window[Ze] || null;
        this._applyAppContext(r, { viaGlobal: !0 });
      }, window.addEventListener(Qt, this._handleGlobalAppEvent);
      const e = window[Ze];
      e && e.state && e.actions && !this._contextProvidedViaProvider && this._applyAppContext({ state: e.state, actions: e.actions }, { viaGlobal: !0, initial: !0 }), this._handleDomAppStateEvent = (t) => {
        var a, n, s;
        const i = ((a = t == null ? void 0 : t.detail) == null ? void 0 : a.newState) || ((n = t == null ? void 0 : t.detail) == null ? void 0 : n.state);
        if (!i)
          return;
        const r = window[Ze], o = (r == null ? void 0 : r.actions) || ((s = this._contextValue) == null ? void 0 : s.actions) || null;
        this._applyAppContext({ state: i, actions: o || null }, { viaGlobal: !0 });
      }, window.addEventListener(ur, this._handleDomAppStateEvent);
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
    typeof window < "u" && this._handleGlobalAppEvent && window.removeEventListener(Qt, this._handleGlobalAppEvent), typeof window < "u" && this._handleDomAppStateEvent && window.removeEventListener(ur, this._handleDomAppStateEvent), typeof window < "u" && this._logoutFallbackHandler && (window.removeEventListener("twerenbold:logout-fallback", this._logoutFallbackHandler), this._logoutFallbackHandler = null), typeof window < "u" && this._requestLogoutHandler && (window.removeEventListener("twerenbold:request-logout", this._requestLogoutHandler), this._requestLogoutHandler = null), typeof window < "u" && this._postLogoutHandler && (window.removeEventListener("twerenbold:post-logout", this._postLogoutHandler), this._postLogoutHandler = null), typeof window < "u" && this._windowAuthChangedHandler && (window.removeEventListener("auth-changed", this._windowAuthChangedHandler), this._windowAuthChangedHandler = null), super.disconnectedCallback();
  }
  _applyAppContext(e, { viaGlobal: t = !1 } = {}) {
    var s, c;
    if (t && this._contextProvidedViaProvider)
      return;
    const i = this._contextValue;
    let r = e && typeof e == "object" ? { ...e } : null;
    r && !r.actions && (i != null && i.actions) && (r.actions = i.actions);
    const o = (s = i == null ? void 0 : i.state) == null ? void 0 : s.isAuthenticated, a = (c = r == null ? void 0 : r.state) == null ? void 0 : c.isAuthenticated;
    o !== a && this.logger.debug("Auth transition detected:", { from: o, to: a, viaGlobal: t }), this._contextValue = r;
    const n = this._hasAppContext;
    this._hasAppContext = !!this._contextValue, !n && this._hasAppContext && typeof this.appContextReady == "function" && this.appContextReady(this._contextValue), typeof this.appContextChanged == "function" && this.appContextChanged(this._contextValue, i), this.requestUpdate("appState");
  }
};
customElements.get("app-state-provider") || customElements.define("app-state-provider", Mi);
class Oe extends Qr(Ue) {
  constructor() {
    super(), this.logger = De("AuthenticatedComponent"), this.showAuthOverlay = !1, this.registrationUrl = "", this.loginUrl = "", this.infoUrl = "", this.isLoading = !1, this._email = "", this._password = "";
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
    return this.needsAuth || this.showAuthOverlay ? m`
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
    return m`
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
                <h2>${this.getText("overlayRegisterTitle", "common", "Ich benötige ein Konto")}</h2>
                ${(() => {
      const t = this.getText("overlayRegisterTexts", "common", null);
      return Array.isArray(t) && t.length > 0 ? t.map((i, r) => m`<p>${r === 1 ? m`<strong>${i}</strong>` : i}</p>`) : m`<p>${this.getText("overlayRegisterText", "common", "Erstellen Sie ein neues Konto für den persönlichen Zugriff auf Ihre Reisen und Services.")}</p>`;
    })()}
                <ul class="card__list">
                  ${(this.getText("overlayRegisterBenefits", "common", ["Schnelle und unkomplizierte Registrierung", "Individuelle Reiseübersicht nach Login", "Zentraler Merkzettel", "Club-Status"]) || []).map((t) => m`<li>${t}</li>`)}
                </ul>
                <button class="btn btn-secondary" @click=${() => this._onRegisterClicked()} ?disabled=${this.isLoading}>
                  ${this.isLoading ? this.getText("overlayLoadingFlow", "common", "Flow wird gestartet…") : this.getText("overlayRegisterButton", "common", "Konto anlegen")}
                </button>
              </div>

              <div class="card">
                <h2>${this.getText("overlayLoginTitle", "common", "Ich habe bereits ein Konto")}</h2>
                <p>${this.getText("overlayLoginText", "common", "Melden Sie sich mit Ihrem bestehenden Twerenbold ID Konto an und erhalten Sie Zugriff auf alle gebuchten Reisen.")}</p>
                <ul class="card__list">
                  ${(this.getText("overlayLoginBenefits", "common", ["Sicherer Login via Twerenbold ID", "Direkter Zugriff auf Ihre Buchungen", "Synchronisiert über alle Geräte", "Benachrichtigungen & Zusatzleistungen"]) || []).map((t) => m`<li>${t}</li>`)}
                </ul>
                <button class="btn btn-primary" @click=${() => this._onLoginClicked()} ?disabled=${this.isLoading}>
                  ${this.isLoading ? this.getText("overlayLoadingFlow", "common", "Flow wird gestartet…") : this.getText("overlayLoginButton", "common", "Anmelden")}
                </button>
              </div>
            </div>

            ${this.isLoading ? m`
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
D(Oe, "properties", {
  showAuthOverlay: { type: Boolean },
  registrationUrl: { type: String, attribute: "registration-url" },
  loginUrl: { type: String, attribute: "login-url" },
  infoUrl: { type: String, attribute: "info-url" },
  isLoading: { type: Boolean }
}), D(Oe, "styles", [
  wt,
  ae`
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
  entries: eo,
  setPrototypeOf: pr,
  isFrozen: Bo,
  getPrototypeOf: Go,
  getOwnPropertyDescriptor: Yo
} = Object;
let {
  freeze: re,
  seal: fe,
  create: Ni
} = Object, {
  apply: Di,
  construct: Ri
} = typeof Reflect < "u" && Reflect;
re || (re = function(e) {
  return e;
});
fe || (fe = function(e) {
  return e;
});
Di || (Di = function(e, t) {
  for (var i = arguments.length, r = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++)
    r[o - 2] = arguments[o];
  return e.apply(t, r);
});
Ri || (Ri = function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    i[r - 1] = arguments[r];
  return new e(...i);
});
const Yt = oe(Array.prototype.forEach), Vo = oe(Array.prototype.lastIndexOf), mr = oe(Array.prototype.pop), kt = oe(Array.prototype.push), Xo = oe(Array.prototype.splice), Jt = oe(String.prototype.toLowerCase), pi = oe(String.prototype.toString), mi = oe(String.prototype.match), xt = oe(String.prototype.replace), jo = oe(String.prototype.indexOf), Jo = oe(String.prototype.trim), ve = oe(Object.prototype.hasOwnProperty), ee = oe(RegExp.prototype.test), It = Ko(TypeError);
function oe(l) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      i[r - 1] = arguments[r];
    return Di(l, e, i);
  };
}
function Ko(l) {
  return function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return Ri(l, t);
  };
}
function M(l, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Jt;
  pr && pr(l, null);
  let i = e.length;
  for (; i--; ) {
    let r = e[i];
    if (typeof r == "string") {
      const o = t(r);
      o !== r && (Bo(e) || (e[i] = o), r = o);
    }
    l[r] = !0;
  }
  return l;
}
function qo(l) {
  for (let e = 0; e < l.length; e++)
    ve(l, e) || (l[e] = null);
  return l;
}
function _e(l) {
  const e = Ni(null);
  for (const [t, i] of eo(l))
    ve(l, t) && (Array.isArray(i) ? e[t] = qo(i) : i && typeof i == "object" && i.constructor === Object ? e[t] = _e(i) : e[t] = i);
  return e;
}
function Lt(l, e) {
  for (; l !== null; ) {
    const i = Yo(l, e);
    if (i) {
      if (i.get)
        return oe(i.get);
      if (typeof i.value == "function")
        return oe(i.value);
    }
    l = Go(l);
  }
  function t() {
    return null;
  }
  return t;
}
const fr = re(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), fi = re(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), bi = re(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Qo = re(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), vi = re(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ea = re(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), br = re(["#text"]), vr = re(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), wi = re(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), wr = re(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Vt = re(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ta = fe(/\{\{[\w\W]*|[\w\W]*\}\}/gm), ia = fe(/<%[\w\W]*|[\w\W]*%>/gm), ra = fe(/\$\{[\w\W]*/gm), oa = fe(/^data-[\-\w.\u00B7-\uFFFF]+$/), aa = fe(/^aria-[\-\w]+$/), to = fe(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), na = fe(/^(?:\w+script|data):/i), sa = fe(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), io = fe(/^html$/i), la = fe(/^[a-z][.\w]*(-[.\w]+)+$/i);
var yr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: aa,
  ATTR_WHITESPACE: sa,
  CUSTOM_ELEMENT: la,
  DATA_ATTR: oa,
  DOCTYPE_NAME: io,
  ERB_EXPR: ia,
  IS_ALLOWED_URI: to,
  IS_SCRIPT_OR_DATA: na,
  MUSTACHE_EXPR: ta,
  TMPLIT_EXPR: ra
});
const Pt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, ca = function() {
  return typeof window > "u" ? null : window;
}, da = function(e, t) {
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
}, Tr = function() {
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
function ro() {
  let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ca();
  const e = (C) => ro(C);
  if (e.version = "3.3.1", e.removed = [], !l || !l.document || l.document.nodeType !== Pt.document || !l.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = l;
  const i = t, r = i.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: a,
    Node: n,
    Element: s,
    NodeFilter: c,
    NamedNodeMap: p = l.NamedNodeMap || l.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: g,
    trustedTypes: h
  } = l, f = s.prototype, v = Lt(f, "cloneNode"), y = Lt(f, "remove"), S = Lt(f, "nextSibling"), x = Lt(f, "childNodes"), E = Lt(f, "parentNode");
  if (typeof a == "function") {
    const C = t.createElement("template");
    C.content && C.content.ownerDocument && (t = C.content.ownerDocument);
  }
  let I, Y = "";
  const {
    implementation: he,
    createNodeIterator: yt,
    createDocumentFragment: Tt,
    getElementsByTagName: Ut
  } = t, {
    importNode: si
  } = i;
  let V = Tr();
  e.isSupported = typeof eo == "function" && typeof E == "function" && he && he.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: We,
    ERB_EXPR: Fe,
    TMPLIT_EXPR: At,
    DATA_ATTR: U,
    ARIA_ATTR: N,
    IS_SCRIPT_OR_DATA: ce,
    ATTR_WHITESPACE: _t,
    CUSTOM_ELEMENT: Wt
  } = yr;
  let {
    IS_ALLOWED_URI: St
  } = yr, z = null;
  const Ft = M({}, [...fr, ...fi, ...bi, ...vi, ...br]);
  let B = null;
  const tt = M({}, [...vr, ...wi, ...wr, ...Vt]);
  let W = Object.seal(Ni(null, {
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
  })), Se = null, ze = null;
  const we = Object.seal(Ni(null, {
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
  let He = !0, Be = !0, zt = !1, Ce = !0, Ge = !1, Ye = !0, be = !1, Ht = !1, it = !1, ke = !1, rt = !1, ot = !1, Ct = !0, Bt = !1;
  const xe = "user-content-";
  let Re = !0, Ie = !1, Ve = {}, ue = null;
  const at = M({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let li = null;
  const b = M({}, ["audio", "video", "img", "source", "image", "track"]);
  let T = null;
  const k = M({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), _ = "http://www.w3.org/1998/Math/MathML", L = "http://www.w3.org/2000/svg", R = "http://www.w3.org/1999/xhtml";
  let J = R, ne = !1, ye = null;
  const ge = M({}, [_, L, R], pi);
  let pe = M({}, ["mi", "mo", "mn", "ms", "mtext"]), Te = M({}, ["annotation-xml"]);
  const Gt = M({}, ["title", "style", "font", "a", "script"]);
  let Ee = null;
  const se = ["application/xhtml+xml", "text/html"], nt = "text/html";
  let G = null, st = null;
  const _o = t.createElement("form"), Ki = function(u) {
    return u instanceof RegExp || u instanceof Function;
  }, ci = function() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(st && st === u)) {
      if ((!u || typeof u != "object") && (u = {}), u = _e(u), Ee = // eslint-disable-next-line unicorn/prefer-includes
      se.indexOf(u.PARSER_MEDIA_TYPE) === -1 ? nt : u.PARSER_MEDIA_TYPE, G = Ee === "application/xhtml+xml" ? pi : Jt, z = ve(u, "ALLOWED_TAGS") ? M({}, u.ALLOWED_TAGS, G) : Ft, B = ve(u, "ALLOWED_ATTR") ? M({}, u.ALLOWED_ATTR, G) : tt, ye = ve(u, "ALLOWED_NAMESPACES") ? M({}, u.ALLOWED_NAMESPACES, pi) : ge, T = ve(u, "ADD_URI_SAFE_ATTR") ? M(_e(k), u.ADD_URI_SAFE_ATTR, G) : k, li = ve(u, "ADD_DATA_URI_TAGS") ? M(_e(b), u.ADD_DATA_URI_TAGS, G) : b, ue = ve(u, "FORBID_CONTENTS") ? M({}, u.FORBID_CONTENTS, G) : at, Se = ve(u, "FORBID_TAGS") ? M({}, u.FORBID_TAGS, G) : _e({}), ze = ve(u, "FORBID_ATTR") ? M({}, u.FORBID_ATTR, G) : _e({}), Ve = ve(u, "USE_PROFILES") ? u.USE_PROFILES : !1, He = u.ALLOW_ARIA_ATTR !== !1, Be = u.ALLOW_DATA_ATTR !== !1, zt = u.ALLOW_UNKNOWN_PROTOCOLS || !1, Ce = u.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ge = u.SAFE_FOR_TEMPLATES || !1, Ye = u.SAFE_FOR_XML !== !1, be = u.WHOLE_DOCUMENT || !1, ke = u.RETURN_DOM || !1, rt = u.RETURN_DOM_FRAGMENT || !1, ot = u.RETURN_TRUSTED_TYPE || !1, it = u.FORCE_BODY || !1, Ct = u.SANITIZE_DOM !== !1, Bt = u.SANITIZE_NAMED_PROPS || !1, Re = u.KEEP_CONTENT !== !1, Ie = u.IN_PLACE || !1, St = u.ALLOWED_URI_REGEXP || to, J = u.NAMESPACE || R, pe = u.MATHML_TEXT_INTEGRATION_POINTS || pe, Te = u.HTML_INTEGRATION_POINTS || Te, W = u.CUSTOM_ELEMENT_HANDLING || {}, u.CUSTOM_ELEMENT_HANDLING && Ki(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (W.tagNameCheck = u.CUSTOM_ELEMENT_HANDLING.tagNameCheck), u.CUSTOM_ELEMENT_HANDLING && Ki(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (W.attributeNameCheck = u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), u.CUSTOM_ELEMENT_HANDLING && typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Ge && (Be = !1), rt && (ke = !0), Ve && (z = M({}, br), B = [], Ve.html === !0 && (M(z, fr), M(B, vr)), Ve.svg === !0 && (M(z, fi), M(B, wi), M(B, Vt)), Ve.svgFilters === !0 && (M(z, bi), M(B, wi), M(B, Vt)), Ve.mathMl === !0 && (M(z, vi), M(B, wr), M(B, Vt))), u.ADD_TAGS && (typeof u.ADD_TAGS == "function" ? we.tagCheck = u.ADD_TAGS : (z === Ft && (z = _e(z)), M(z, u.ADD_TAGS, G))), u.ADD_ATTR && (typeof u.ADD_ATTR == "function" ? we.attributeCheck = u.ADD_ATTR : (B === tt && (B = _e(B)), M(B, u.ADD_ATTR, G))), u.ADD_URI_SAFE_ATTR && M(T, u.ADD_URI_SAFE_ATTR, G), u.FORBID_CONTENTS && (ue === at && (ue = _e(ue)), M(ue, u.FORBID_CONTENTS, G)), u.ADD_FORBID_CONTENTS && (ue === at && (ue = _e(ue)), M(ue, u.ADD_FORBID_CONTENTS, G)), Re && (z["#text"] = !0), be && M(z, ["html", "head", "body"]), z.table && (M(z, ["tbody"]), delete Se.tbody), u.TRUSTED_TYPES_POLICY) {
        if (typeof u.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw It('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof u.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw It('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        I = u.TRUSTED_TYPES_POLICY, Y = I.createHTML("");
      } else
        I === void 0 && (I = da(h, r)), I !== null && typeof Y == "string" && (Y = I.createHTML(""));
      re && re(u), st = u;
    }
  }, qi = M({}, [...fi, ...bi, ...Qo]), Qi = M({}, [...vi, ...ea]), So = function(u) {
    let w = E(u);
    (!w || !w.tagName) && (w = {
      namespaceURI: J,
      tagName: "template"
    });
    const A = Jt(u.tagName), F = Jt(w.tagName);
    return ye[u.namespaceURI] ? u.namespaceURI === L ? w.namespaceURI === R ? A === "svg" : w.namespaceURI === _ ? A === "svg" && (F === "annotation-xml" || pe[F]) : !!qi[A] : u.namespaceURI === _ ? w.namespaceURI === R ? A === "math" : w.namespaceURI === L ? A === "math" && Te[F] : !!Qi[A] : u.namespaceURI === R ? w.namespaceURI === L && !Te[F] || w.namespaceURI === _ && !pe[F] ? !1 : !Qi[A] && (Gt[A] || !qi[A]) : !!(Ee === "application/xhtml+xml" && ye[u.namespaceURI]) : !1;
  }, Ae = function(u) {
    kt(e.removed, {
      element: u
    });
    try {
      E(u).removeChild(u);
    } catch {
      y(u);
    }
  }, Xe = function(u, w) {
    try {
      kt(e.removed, {
        attribute: w.getAttributeNode(u),
        from: w
      });
    } catch {
      kt(e.removed, {
        attribute: null,
        from: w
      });
    }
    if (w.removeAttribute(u), u === "is")
      if (ke || rt)
        try {
          Ae(w);
        } catch {
        }
      else
        try {
          w.setAttribute(u, "");
        } catch {
        }
  }, er = function(u) {
    let w = null, A = null;
    if (it)
      u = "<remove></remove>" + u;
    else {
      const H = mi(u, /^[\r\n\t ]+/);
      A = H && H[0];
    }
    Ee === "application/xhtml+xml" && J === R && (u = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + u + "</body></html>");
    const F = I ? I.createHTML(u) : u;
    if (J === R)
      try {
        w = new g().parseFromString(F, Ee);
      } catch {
      }
    if (!w || !w.documentElement) {
      w = he.createDocument(J, "template", null);
      try {
        w.documentElement.innerHTML = ne ? Y : F;
      } catch {
      }
    }
    const q = w.body || w.documentElement;
    return u && A && q.insertBefore(t.createTextNode(A), q.childNodes[0] || null), J === R ? Ut.call(w, be ? "html" : "body")[0] : be ? w.documentElement : q;
  }, tr = function(u) {
    return yt.call(
      u.ownerDocument || u,
      u,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, di = function(u) {
    return u instanceof d && (typeof u.nodeName != "string" || typeof u.textContent != "string" || typeof u.removeChild != "function" || !(u.attributes instanceof p) || typeof u.removeAttribute != "function" || typeof u.setAttribute != "function" || typeof u.namespaceURI != "string" || typeof u.insertBefore != "function" || typeof u.hasChildNodes != "function");
  }, ir = function(u) {
    return typeof n == "function" && u instanceof n;
  };
  function Le(C, u, w) {
    Yt(C, (A) => {
      A.call(e, u, w, st);
    });
  }
  const rr = function(u) {
    let w = null;
    if (Le(V.beforeSanitizeElements, u, null), di(u))
      return Ae(u), !0;
    const A = G(u.nodeName);
    if (Le(V.uponSanitizeElement, u, {
      tagName: A,
      allowedTags: z
    }), Ye && u.hasChildNodes() && !ir(u.firstElementChild) && ee(/<[/\w!]/g, u.innerHTML) && ee(/<[/\w!]/g, u.textContent) || u.nodeType === Pt.progressingInstruction || Ye && u.nodeType === Pt.comment && ee(/<[/\w]/g, u.data))
      return Ae(u), !0;
    if (!(we.tagCheck instanceof Function && we.tagCheck(A)) && (!z[A] || Se[A])) {
      if (!Se[A] && ar(A) && (W.tagNameCheck instanceof RegExp && ee(W.tagNameCheck, A) || W.tagNameCheck instanceof Function && W.tagNameCheck(A)))
        return !1;
      if (Re && !ue[A]) {
        const F = E(u) || u.parentNode, q = x(u) || u.childNodes;
        if (q && F) {
          const H = q.length;
          for (let le = H - 1; le >= 0; --le) {
            const Pe = v(q[le], !0);
            Pe.__removalCount = (u.__removalCount || 0) + 1, F.insertBefore(Pe, S(u));
          }
        }
      }
      return Ae(u), !0;
    }
    return u instanceof s && !So(u) || (A === "noscript" || A === "noembed" || A === "noframes") && ee(/<\/no(script|embed|frames)/i, u.innerHTML) ? (Ae(u), !0) : (Ge && u.nodeType === Pt.text && (w = u.textContent, Yt([We, Fe, At], (F) => {
      w = xt(w, F, " ");
    }), u.textContent !== w && (kt(e.removed, {
      element: u.cloneNode()
    }), u.textContent = w)), Le(V.afterSanitizeElements, u, null), !1);
  }, or = function(u, w, A) {
    if (Ct && (w === "id" || w === "name") && (A in t || A in _o))
      return !1;
    if (!(Be && !ze[w] && ee(U, w))) {
      if (!(He && ee(N, w))) {
        if (!(we.attributeCheck instanceof Function && we.attributeCheck(w, u))) {
          if (!B[w] || ze[w]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(ar(u) && (W.tagNameCheck instanceof RegExp && ee(W.tagNameCheck, u) || W.tagNameCheck instanceof Function && W.tagNameCheck(u)) && (W.attributeNameCheck instanceof RegExp && ee(W.attributeNameCheck, w) || W.attributeNameCheck instanceof Function && W.attributeNameCheck(w, u)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              w === "is" && W.allowCustomizedBuiltInElements && (W.tagNameCheck instanceof RegExp && ee(W.tagNameCheck, A) || W.tagNameCheck instanceof Function && W.tagNameCheck(A)))
            ) return !1;
          } else if (!T[w]) {
            if (!ee(St, xt(A, _t, ""))) {
              if (!((w === "src" || w === "xlink:href" || w === "href") && u !== "script" && jo(A, "data:") === 0 && li[u])) {
                if (!(zt && !ee(ce, xt(A, _t, "")))) {
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
  }, ar = function(u) {
    return u !== "annotation-xml" && mi(u, Wt);
  }, nr = function(u) {
    Le(V.beforeSanitizeAttributes, u, null);
    const {
      attributes: w
    } = u;
    if (!w || di(u))
      return;
    const A = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: B,
      forceKeepAttr: void 0
    };
    let F = w.length;
    for (; F--; ) {
      const q = w[F], {
        name: H,
        namespaceURI: le,
        value: Pe
      } = q, lt = G(H), hi = Pe;
      let K = H === "value" ? hi : Jo(hi);
      if (A.attrName = lt, A.attrValue = K, A.keepAttr = !0, A.forceKeepAttr = void 0, Le(V.uponSanitizeAttribute, u, A), K = A.attrValue, Bt && (lt === "id" || lt === "name") && (Xe(H, u), K = xe + K), Ye && ee(/((--!?|])>)|<\/(style|title|textarea)/i, K)) {
        Xe(H, u);
        continue;
      }
      if (lt === "attributename" && mi(K, "href")) {
        Xe(H, u);
        continue;
      }
      if (A.forceKeepAttr)
        continue;
      if (!A.keepAttr) {
        Xe(H, u);
        continue;
      }
      if (!Ce && ee(/\/>/i, K)) {
        Xe(H, u);
        continue;
      }
      Ge && Yt([We, Fe, At], (lr) => {
        K = xt(K, lr, " ");
      });
      const sr = G(u.nodeName);
      if (!or(sr, lt, K)) {
        Xe(H, u);
        continue;
      }
      if (I && typeof h == "object" && typeof h.getAttributeType == "function" && !le)
        switch (h.getAttributeType(sr, lt)) {
          case "TrustedHTML": {
            K = I.createHTML(K);
            break;
          }
          case "TrustedScriptURL": {
            K = I.createScriptURL(K);
            break;
          }
        }
      if (K !== hi)
        try {
          le ? u.setAttributeNS(le, H, K) : u.setAttribute(H, K), di(u) ? Ae(u) : mr(e.removed);
        } catch {
          Xe(H, u);
        }
    }
    Le(V.afterSanitizeAttributes, u, null);
  }, Co = function C(u) {
    let w = null;
    const A = tr(u);
    for (Le(V.beforeSanitizeShadowDOM, u, null); w = A.nextNode(); )
      Le(V.uponSanitizeShadowNode, w, null), rr(w), nr(w), w.content instanceof o && C(w.content);
    Le(V.afterSanitizeShadowDOM, u, null);
  };
  return e.sanitize = function(C) {
    let u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, w = null, A = null, F = null, q = null;
    if (ne = !C, ne && (C = "<!-->"), typeof C != "string" && !ir(C))
      if (typeof C.toString == "function") {
        if (C = C.toString(), typeof C != "string")
          throw It("dirty is not a string, aborting");
      } else
        throw It("toString is not a function");
    if (!e.isSupported)
      return C;
    if (Ht || ci(u), e.removed = [], typeof C == "string" && (Ie = !1), Ie) {
      if (C.nodeName) {
        const Pe = G(C.nodeName);
        if (!z[Pe] || Se[Pe])
          throw It("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (C instanceof n)
      w = er("<!---->"), A = w.ownerDocument.importNode(C, !0), A.nodeType === Pt.element && A.nodeName === "BODY" || A.nodeName === "HTML" ? w = A : w.appendChild(A);
    else {
      if (!ke && !Ge && !be && // eslint-disable-next-line unicorn/prefer-includes
      C.indexOf("<") === -1)
        return I && ot ? I.createHTML(C) : C;
      if (w = er(C), !w)
        return ke ? null : ot ? Y : "";
    }
    w && it && Ae(w.firstChild);
    const H = tr(Ie ? C : w);
    for (; F = H.nextNode(); )
      rr(F), nr(F), F.content instanceof o && Co(F.content);
    if (Ie)
      return C;
    if (ke) {
      if (rt)
        for (q = Tt.call(w.ownerDocument); w.firstChild; )
          q.appendChild(w.firstChild);
      else
        q = w;
      return (B.shadowroot || B.shadowrootmode) && (q = si.call(i, q, !0)), q;
    }
    let le = be ? w.outerHTML : w.innerHTML;
    return be && z["!doctype"] && w.ownerDocument && w.ownerDocument.doctype && w.ownerDocument.doctype.name && ee(io, w.ownerDocument.doctype.name) && (le = "<!DOCTYPE " + w.ownerDocument.doctype.name + `>
` + le), Ge && Yt([We, Fe, At], (Pe) => {
      le = xt(le, Pe, " ");
    }), I && ot ? I.createHTML(le) : le;
  }, e.setConfig = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ci(C), Ht = !0;
  }, e.clearConfig = function() {
    st = null, Ht = !1;
  }, e.isValidAttribute = function(C, u, w) {
    st || ci({});
    const A = G(C), F = G(u);
    return or(A, F, w);
  }, e.addHook = function(C, u) {
    typeof u == "function" && kt(V[C], u);
  }, e.removeHook = function(C, u) {
    if (u !== void 0) {
      const w = Vo(V[C], u);
      return w === -1 ? void 0 : Xo(V[C], w, 1)[0];
    }
    return mr(V[C]);
  }, e.removeHooks = function(C) {
    V[C] = [];
  }, e.removeAllHooks = function() {
    V = Tr();
  }, e;
}
var ha = ro();
const Ar = (l) => typeof l != "string" ? l : ha.sanitize(l, {
  ALLOWED_TAGS: [],
  // No HTML tags allowed
  ALLOWED_ATTR: [],
  // No attributes allowed
  KEEP_CONTENT: !0
  // Keep text content
}), ua = (l) => typeof l != "string" ? !1 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l), _r = (l) => typeof l != "string" ? !1 : /^[\d\s\+\-\(\)]+$/.test(l) && l.replace(/\D/g, "").length >= 7, oo = [
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
], yi = new Set(oo), ao = [
  "salutation",
  "firstName",
  "lastName",
  "dateOfBirth"
], ga = new Set(ao), Ti = 6, Sr = {
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
}, Cr = {
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
}, kr = [
  { code: "CH", name: "Schweiz" },
  { code: "DE", name: "Deutschland" },
  { code: "AT", name: "Österreich" },
  { code: "FR", name: "Frankreich" },
  { code: "IT", name: "Italien" },
  { code: "LI", name: "Liechtenstein" }
], ht = class ht extends Oe {
  constructor() {
    super(), this.logger = De("AccountManager"), this.apiBaseUrl = "/v1", this.profile = null, this.travelers = [], this.isLoading = !1, this.isSaving = !1, this.errors = {}, this.showAddTravelerModal = !1, this.showEditTravelerModal = !1, this.showDeleteTravelerModal = !1, this.currentTraveler = null, this.currentTravelerIndex = -1, this.languageConfig = {}, this._dataLoaded = !1, this._loadedViaFallback = !1, this._contextReloadScheduled = !1, this._hasUnsavedProfileChanges = !1, this._hasUnsavedTravelerChanges = !1, this.travelerFormErrors = {}, this._lockedProfileFields = /* @__PURE__ */ new Set(), this.autoLoadAccountData = !0, this._loadingStartTime = null, this._loadingElapsedInterval = null, this._loadingElapsedSeconds = 0, this._previousAuthStatus = !1, this._swissPostalCodes = null, this._postalCodesLoading = !1;
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
      const s = e.state, c = s.isAuthenticated || !1, p = !this._previousAuthStatus && c;
      this._previousAuthStatus = c, p && this.autoLoadAccountData && !s.accountLoaded && !s.accountLoading && (this.logger.debug("✅ User just authenticated - loading account data..."), delete this.errors.loading, (n = (a = this.appActions) == null ? void 0 : a.loadAccountData) == null || n.call(a).catch((f) => {
        this.errors.loading = "Fehler beim Laden der Account-Daten", this.logger.error("❌ Error loading account data after auth:", f), this.requestUpdate();
      }));
      const d = s.accountProfile || null, g = Array.isArray(s.accountTravelers) ? s.accountTravelers : [], h = s.accountLoading;
      this.logger.debug("🔄 Sync Check:", {
        stateProfile: !!d,
        localProfile: !!this.profile,
        areEqual: this._profilesAreEqual(d, this.profile)
      }), !this._hasUnsavedProfileChanges && !this._profilesAreEqual(d, this.profile) && (!d && this.profile && s.isAuthenticated && !s.accountLoading ? this.logger.debug("⚠️ Ignoring null profile sync while authenticated (likely transient state)") : (this.logger.debug("✅ Syncing profile from global state"), this.profile = d ? { ...d } : null, this._updateLockedFields(this.profile))), !this._hasUnsavedTravelerChanges && !this._travelerListsEqual(g, this.travelers) && (this.travelers = g.map((f) => ({ ...f }))), this._hasUnsavedTravelerChanges && this._travelerListsEqual(g, this.travelers) && (this._hasUnsavedTravelerChanges = !1), h !== this.isLoading && (this.isLoading = h, h ? this._startLoadingTimer() : this._stopLoadingTimer());
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
      const i = await P.getAccountProfile();
      if (typeof i == "string")
        try {
          const r = JSON.parse(i);
          typeof r == "string" || typeof r == "number" ? this.profile = { email: r.toString() } : this.profile = r;
        } catch (r) {
          this.logger.warn("⚠️ loadProfileFromAPI: Failed to parse profile JSON; storing as object with email if possible", r), this.profile = { email: i };
        }
      else
        this.profile = i ? { ...i } : null;
      if (this._hasUnsavedProfileChanges = !1, this._updateLockedFields(this.profile), Array.isArray(this.travelers) || (this.travelers = []), this.profile && (this.profile = { ...this.profile, travelers: [...this.travelers] }), (e = this.appActions) != null && e.setAccountData) {
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
      const r = await P.getAccountTravelers(), o = Array.isArray(r) ? r.map((n) => ({ ...n })) : [];
      this.travelers = [...o], this._hasUnsavedTravelerChanges = !1;
      const a = this.travelers.filter((n) => n.isLocked === !0);
      if (this.logger.debug("✅ Loaded travelers from API:", this.travelers.length, "travelers"), a.length > 0 && this.logger.debug("🔒 Locked travelers:", a.map((n) => `${n.firstName} ${n.lastName}`).join(", ")), this.profile && (this.profile = { ...this.profile, travelers: this.travelers.map((n) => ({ ...n })) }), (t = this.appActions) != null && t.setAccountData) {
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
      const i = await P.updateAccountProfile(t);
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
    if ((Array.isArray(this.travelers) ? this.travelers.length : 0) >= Ti) {
      this._showInfo(this.getText("maxTravelersReachedTitle", "Maximale Anzahl erreicht"), this.getText("maxTravelersReached", "Es sind max. 6 Reisende möglich"));
      return;
    }
    this.currentTraveler = { salutation: "", firstName: "", lastName: "", dateOfBirth: "" }, this.currentTravelerIndex = -1, this.showAddTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 }));
  }
  handleEditTraveler(e, t) {
    if (e.isLocked === !0 || e.hasMitgliedschaft === !0) return;
    const i = this._normalizeSalutationFromApi(e.salutation);
    this.currentTraveler = {
      ...e,
      salutation: i
    }, this.currentTravelerIndex = t, this.showEditTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 }));
  }
  handleDeleteTraveler(e, t) {
    e.isLocked === !0 || e.hasMitgliedschaft === !0 || (this.currentTraveler = e, this.currentTravelerIndex = t, this.showDeleteTravelerModal = !0, this._clearTravelerErrors(), document.dispatchEvent(new CustomEvent("twerenbold-modal-open", { bubbles: !0 })));
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
      const [, d, g, h] = t;
      return `${d}-${g.padStart(2, "0")}-${h.padStart(2, "0")}`;
    }
    const r = e.replace(/[\/\-]/g, ".").trim().split(".");
    if (r.length !== 3) return e;
    let [o, a, n] = r;
    if (o = o.padStart(2, "0"), a = a.padStart(2, "0"), n.length === 2) {
      const d = (/* @__PURE__ */ new Date()).getFullYear() % 100;
      n = parseInt(n, 10) > d + 10 ? `19${n}` : `20${n}`;
    }
    const s = parseInt(n, 10), c = parseInt(a, 10), p = parseInt(o, 10);
    return n.length !== 4 || isNaN(s) || s < 1800 || s > 2100 || isNaN(c) || c < 1 || c > 12 || isNaN(p) || p < 1 || p > 31 ? e : `${n}-${a}-${o}`;
  }
  closeModals() {
    var e;
    (e = this.shadowRoot) == null || e.querySelectorAll("dialog[open]").forEach((t) => t.close()), Xr(), this.showAddTravelerModal = !1, this.showEditTravelerModal = !1, this.showDeleteTravelerModal = !1, this.currentTraveler = null, this.currentTravelerIndex = -1, this._clearTravelerErrors();
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
          jr(), o.showModal();
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
            const s = n[1].padStart(2, "0"), c = n[2].padStart(2, "0");
            o = `${n[3]}-${c}-${s}`;
          }
        }
        t[i] = Ar(o);
      } else
        t[i] = o;
      return t;
    }, {});
  }
  _sanitizeTravelerData(e = {}) {
    return ao.reduce((t, i) => {
      let r = e[i];
      if (typeof r == "string") {
        if (r = r.trim(), i === "dateOfBirth") {
          const o = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, a = r.match(o);
          if (a) {
            const n = a[1].padStart(2, "0"), s = a[2].padStart(2, "0");
            r = `${a[3]}-${s}-${n}`;
          }
        }
        t[i] = Ar(r);
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
    o.forEach(({ name: s, message: c }) => {
      if (r && s !== r)
        return;
      a(s) || (i[s] = c);
    });
    const n = a("dateOfBirth");
    if ((!r || r === "dateOfBirth") && n) {
      const s = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/, c = /^\d{4}-\d{2}-\d{2}$/;
      let p = null, d = !1;
      if (c.test(n))
        p = new Date(n), d = !0;
      else if (s.test(n)) {
        const g = n.match(s);
        if (g) {
          const h = g[1].padStart(2, "0"), f = g[2].padStart(2, "0"), v = g[3];
          p = /* @__PURE__ */ new Date(`${v}-${f}-${h}`), d = !0;
        }
      }
      if (!d)
        i.dateOfBirth = this.getText("errorInvalidTravelerDateOfBirthFormat", "Bitte geben Sie ein gültiges Datum ein (TT.MM.JJJJ).");
      else {
        const g = /* @__PURE__ */ new Date();
        g.setHours(0, 0, 0, 0);
        const h = new Date(g);
        h.setFullYear(h.getFullYear() - 120), !p || Number.isNaN(p.getTime()) ? i.dateOfBirth = this.getText("errorInvalidTravelerDateOfBirth", "Bitte geben Sie ein gültiges Geburtsdatum an.") : p > g ? i.dateOfBirth = this.getText("errorTravelerDateOfBirthInFuture", "Das Geburtsdatum darf nicht in der Zukunft liegen.") : p < h && (i.dateOfBirth = this.getText("errorTravelerDateOfBirthTooOld", "Das Geburtsdatum darf nicht mehr als 120 Jahre zurückliegen."));
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
    if (!ga.has(i))
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
    e && P.mode !== e && P.setMode(e);
    const t = this.authComponent || ((i = this.appState) == null ? void 0 : i.authComponent);
    t && P.setAuthComponent(t);
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
    return await P.addTraveler(t);
  }
  async _updateTravelerOnApi(e, t) {
    if (!e)
      throw new Error("Traveler ID erforderlich für das Aktualisieren.");
    this._configureApiService();
    const i = this._buildTravelerPayload(t);
    return await P.updateTraveler(e, i);
  }
  async _deleteTravelerOnApi(e) {
    if (!e)
      throw new Error("Traveler ID erforderlich für das Löschen.");
    return this._configureApiService(), await P.deleteTraveler(e), null;
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
      return $;
    const t = e.toString().trim().toLowerCase();
    return t === "individuell" ? $ : t === "mr" || t === "ms" ? $ : m`<option selected value="${e}">${e}</option>`;
  }
  /**
   * Renders a spinner icon for buttons
   * @returns {TemplateResult}
   */
  _renderButtonSpinner() {
    return m`
      <svg class="button-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>
        <path class="spinner-path" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
      </svg>
    `;
  }
  _syncTravelersToContext(e) {
    var t, i;
    if (this.profile && Array.isArray(this.profile.travelers) && Array.isArray(e) && (this.profile = { ...this.profile, travelers: e.map((r) => ({ ...r })) }), (t = this.appActions) != null && t.setAccountData) {
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
    return Object.keys(e).reduce((t, i) => (yi.has(i) && (t[i] = e[i]), t), {});
  }
  _profilesAreEqual(e, t) {
    const i = e === t ? !0 : !e || !t ? !e && !t : oo.every((r) => {
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
    var p;
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement))
      return;
    const i = t.name;
    if (!yi.has(i) || this.isFieldLocked(i))
      return;
    let r = t.value;
    i === "dateOfBirth" && (r = this._formatDateToISO(r));
    const o = typeof r == "string" ? r.trim() : r, a = { [i]: o }, n = this._validateField(i, a[i]), s = { ...this.errors };
    let c = !1;
    if (n[i] ? s[i] !== n[i] && (s[i] = n[i], c = !0) : i in s && (delete s[i], c = !0), c && (this.errors = s), this._hasUnsavedProfileChanges = !0, this.profile && this.profile[i] !== o && (this.profile = {
      ...this.profile,
      [i]: o
    }), i === "zip" && o && !((p = this.profile) != null && p.city) && await this._lookupSwissPostalCode(o), i === "country" && o) {
      const d = this._mapCountryToCode(o);
      d && d !== o && (this.profile = {
        ...this.profile,
        country: d
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
    const i = Object.entries(Sr).find(
      ([o]) => o.toLowerCase() === t.toLowerCase()
    );
    if (i) return i[1];
    const r = Object.entries(Sr).find(
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
    return e ? Cr[e.toUpperCase()] || e : "";
  }
  _validateField(e, t) {
    if (!yi.has(e))
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
    ], a = (g) => {
      var h;
      return Object.prototype.hasOwnProperty.call(e, g) ? e[g] : ((h = this.profile) == null ? void 0 : h[g]) ?? "";
    };
    o.forEach(({ name: g, message: h }) => {
      r && g !== r || a(g) || (i[g] = h);
    });
    const n = a("email");
    (!r || r === "email") && n && (ua(n) || (i.email = this.getText("errorInvalidEmail", "Bitte geben Sie eine gültige E-Mail-Adresse ein.")));
    const s = a("zip");
    (!r || r === "zip") && s && (/^[0-9A-Za-z\-\s]{3,10}$/.test(s) || (i.zip = this.getText("errorInvalidZip", "Bitte geben Sie eine gültige Postleitzahl an.")));
    const c = a("phoneMain");
    (!r || r === "phoneMain") && c && (_r(c) || (i.phoneMain = this.getText("errorInvalidPhone", "Bitte geben Sie eine gültige Telefonnummer an.")));
    const p = a("phoneMobile");
    (!r || r === "phoneMobile") && p && (_r(p) || (i.phoneMobile = this.getText("errorInvalidMobile", "Bitte geben Sie eine gültige Mobilnummer an.")));
    const d = a("dateOfBirth");
    if ((!r || r === "dateOfBirth") && d)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d))
        i.dateOfBirth = this.getText("errorInvalidDateOfBirthFormat", "Bitte geben Sie ein gültiges Datum ein.");
      else {
        const h = new Date(d), f = Number.isNaN(h.getTime()) ? "" : h.toISOString().slice(0, 10), v = /* @__PURE__ */ new Date();
        v.setHours(0, 0, 0, 0);
        const y = new Date(v);
        y.setFullYear(y.getFullYear() - 120), Number.isNaN(h.getTime()) || f !== d ? i.dateOfBirth = this.getText("errorInvalidDateOfBirth", "Bitte geben Sie ein gültiges Geburtsdatum an.") : h > v ? i.dateOfBirth = this.getText("errorDateOfBirthInFuture", "Das Geburtsdatum darf nicht in der Zukunft liegen.") : h < y && (i.dateOfBirth = this.getText("errorDateOfBirthTooOld", "Das Geburtsdatum darf nicht mehr als 120 Jahre zurückliegen."));
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
    var n, s, c;
    if (e.preventDefault(), this.showEditTravelerModal) {
      const p = this.travelers.find((d) => {
        var g;
        return d.id != null && d.id === ((g = this.currentTraveler) == null ? void 0 : g.id);
      });
      if (!p || p.isLocked === !0 || p.hasMitgliedschaft === !0 || ((n = this.currentTraveler) == null ? void 0 : n.isLocked) === !0 || ((s = this.currentTraveler) == null ? void 0 : s.hasMitgliedschaft) === !0) {
        this.closeModals();
        return;
      }
    }
    this.isSaving = !0;
    const t = new FormData(e.target), i = Object.fromEntries(t), r = this._sanitizeTravelerData(i), o = this._validateTravelerData(r);
    if (Object.keys(o).length > 0) {
      this._handleTravelerValidationErrors(o, e.target), this.isSaving = !1;
      return;
    }
    const a = Array.isArray(this.travelers) ? this.travelers.length : 0;
    if (this.showAddTravelerModal && a >= Ti) {
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
        const p = (c = this.currentTraveler) == null ? void 0 : c.id;
        await this._updateTravelerOnApi(p, r), this._showSuccess(
          "Mitreisender aktualisiert",
          `Die Daten von ${r.firstName} ${r.lastName} wurden erfolgreich aktualisiert.`
        );
      }
      await this.loadTravelersFromAPI(!0), this._hasUnsavedTravelerChanges = !1, this._clearTravelerErrors(), this.closeModals(), this.requestUpdate();
    } catch (p) {
      this.logger.error("❌ Failed to persist traveler via API:", p), this._showError(
        "Aktion fehlgeschlagen",
        "Die Änderungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isSaving = !1;
    }
  }
  async confirmDeleteTraveler() {
    var i, r, o;
    const e = this.travelers.find((a) => {
      var n;
      return a.id != null && a.id === ((n = this.currentTraveler) == null ? void 0 : n.id);
    });
    if (!e || e.isLocked === !0 || e.hasMitgliedschaft === !0 || ((i = this.currentTraveler) == null ? void 0 : i.isLocked) === !0 || ((r = this.currentTraveler) == null ? void 0 : r.hasMitgliedschaft) === !0) {
      this.closeModals();
      return;
    }
    this.isSaving = !0;
    const t = `${this.currentTraveler.firstName} ${this.currentTraveler.lastName}`;
    try {
      const a = (o = this.currentTraveler) == null ? void 0 : o.id;
      await this._deleteTravelerOnApi(a), await this.loadTravelersFromAPI(!0), this._showInfo(
        "Mitreisender entfernt",
        `${t} wurde aus der Liste entfernt.`
      ), this._hasUnsavedTravelerChanges = !1, this._clearTravelerErrors();
    } catch (a) {
      this.logger.error("❌ Failed to delete traveler via API:", a), this._showError(
        "Löschen fehlgeschlagen",
        "Der Mitreisende konnte nicht entfernt werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      this.isSaving = !1, this.closeModals();
    }
  }
  renderProfileErrorSummary() {
    const e = Object.entries(this.errors || {});
    return e.length === 0 ? null : m`
      <div class="profile-error-summary" role="alert" aria-live="assertive" aria-atomic="true">
        <p class="profile-error-summary__title">${this.getText("errorSummaryTitle", "Bitte beheben Sie die folgenden Fehler:")}</p>
        <ul>
          ${e.map(([t, i]) => m`
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
    return this.needsAuth || this.showAuthOverlay ? (this.logger.debug("Rendering auth overlay only (session required)"), m`<div class="account-page account-page--auth">${t}</div>`) : this.isLoading || this.accountLoading || e ? m`
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
                ${this._loadingElapsedSeconds > 0 ? m`
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
      ` : m`
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
      this.logger.debug("🔐 AccountManager._onLogout: performing final fallback - clearing apiService auth component"), P.setAuthComponent(null);
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
    var g, h, f;
    if (!this.profile) return "";
    const e = this.profile.createdAt ? new Date(this.profile.createdAt) : null, t = e ? this._getAccountAge(e) : null, i = this.profile.lastUpdated ? new Date(this.profile.lastUpdated) : null, r = i ? this._getRelativeTime(i) : null, o = this._calculateProfileCompleteness(), a = Array.isArray(this.travelers) ? this.travelers.length : 0, n = ((g = this.appState) == null ? void 0 : g.accountClubStatus) || null, s = Q("clubStatus", this.apiMode, this.theme) && !!n, c = (n == null ? void 0 : n.totalTravelDays) || 0, p = (n == null ? void 0 : n.bonusPoints) || 0, d = (n == null ? void 0 : n.memberId) || this.profile.memberId || null;
    return m`
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
          ${t ? m`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
              </svg>
              ${this.getText("memberSince", "Registriert seit")} ${t}
            </span>
          ` : ""}
          ${r ? m`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path>
              </svg>
              ${this.getText("lastUpdated", "Zuletzt aktualisiert")} ${r}
            </span>
          ` : ""}
          ${d ? m`
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path>
              </svg>
              ${this.getText("memberId", "Mitglieds-ID")}: ${d}
            </span>
          ` : ""}
        </div>

        <div class="overview-stats">
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${c}</div>
            <div class="stat-label">${this.getText("travelDaysLabel", "Reisetage")}</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎫</div>
            <div class="stat-value">${a}</div>
            <div class="stat-label">${this.getText("travelersLabel", "Mitreisende")}</div>
          </div>
          ${s ? m`
            <div class="stat-card stat-highlight" style="--status-color: ${((h = n.currentStatus) == null ? void 0 : h.color) || "#2c5282"}">
              <div class="stat-icon">⭐</div>
              <div class="stat-value">${((f = n.currentStatus) == null ? void 0 : f.name) || "Member"}</div>
              <div class="stat-label">${this.getText("clubStatusLabel", "Club-Status")}</div>
            </div>
          ` : ""}
          ${p > 0 ? m`
            <div class="stat-card">
              <div class="stat-icon">🎁</div>
              <div class="stat-value">${this._formatNumber(p)}</div>
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
    const t = (x) => {
      if (e && x !== "email") return "";
      const E = x.split(".");
      let I = this.profile;
      for (const Y of E)
        if (I = I == null ? void 0 : I[Y], I == null) return "";
      return I;
    };
    this.logger.debug("📝 renderProfileForm: Rendering", e ? "(new user - empty form)" : "(existing profile)");
    const i = this.errors || {}, r = (x, E = []) => {
      const I = i[x], Y = I ? `profile-error-${x}` : null, he = [...E, Y].filter(Boolean).join(" ") || null;
      return { errorMessage: I, errorId: Y, describedBy: he };
    }, o = r("salutation"), a = this.isFieldLocked("firstName") ? "firstName-help" : null, n = r("firstName", [a]), s = r("lastName"), c = r("address"), p = r("zip"), d = r("city"), g = r("country"), h = r("phoneMain"), f = r("phoneMobile"), v = this.isFieldLocked("email") ? "email-help" : null, y = r("email", [v]), S = r("dateOfBirth");
    return !e && !t("firstName") && !t("lastName") && (e = !0), m`
      <section class="form-section" role="group" aria-labelledby="profile-section-title" aria-describedby="profile-section-desc">
        <div class="form-section-header">
          <h2 class="section-title" id="profile-section-title">${this.getText("profileSectionTitle", "Hauptkonto")}</h2>
          <p class="form-section-desc" id="profile-section-desc">${this.getText("profileSectionDescription", "")}</p>
        </div>

        ${e ? m`
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
                    aria-describedby=${o.describedBy ? o.describedBy : $}
        ?disabled=${this.isFieldLocked("salutation")}
        @change=${this._handleProfileInput}>
              <option value="">${this.getText("salutationPlaceholder", "Bitte auswählen")}</option>
              ${this._renderDynamicSalutationOption()}
              <option value="mr" ?selected=${t("salutation") === "mr"}>${this.getText("salutationMr")}</option>
              <option value="ms" ?selected=${t("salutation") === "ms"}>${this.getText("salutationMs")}</option>
            </select>
            ${o.errorMessage ? m`<p class="error-text" id=${o.errorId ?? $}>${o.errorMessage}</p>` : ""}
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
                   aria-describedby=${n.describedBy ? n.describedBy : $}
                   .value=${t("firstName")}
         ?disabled=${this.isFieldLocked("firstName")}
         @input=${this._handleProfileInput} />
            ${this.isFieldLocked("firstName") ? m`<p class="field-help" id="firstName-help">${this.getLockReason("firstName") || this.getText("nameChangeHelp")}</p>` : ""}
            ${n.errorMessage ? m`<p class="error-text" id=${n.errorId ?? $}>${n.errorMessage}</p>` : ""}
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
                   aria-describedby=${s.describedBy ? s.describedBy : $}
                   .value=${t("lastName")}
         ?disabled=${this.isFieldLocked("lastName")}
         @input=${this._handleProfileInput} />
            ${s.errorMessage ? m`<p class="error-text" id=${s.errorId ?? $}>${s.errorMessage}</p>` : ""}
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
                   aria-invalid=${c.errorMessage ? "true" : "false"}
                   aria-describedby=${c.describedBy ? c.describedBy : $}
                   placeholder=${this.getText("addressPlaceholder")}
         .value=${t("address")}
         @input=${this._handleProfileInput} />
            ${c.errorMessage ? m`<p class="error-text" id=${c.errorId ?? $}>${c.errorMessage}</p>` : ""}
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
                   aria-invalid=${p.errorMessage ? "true" : "false"}
                   aria-describedby=${p.describedBy ? p.describedBy : $}
                   placeholder=${this.getText("zipPlaceholder")}
         .value=${t("zip")}
         @input=${this._handleProfileInput} />
            ${p.errorMessage ? m`<p class="error-text" id=${p.errorId ?? $}>${p.errorMessage}</p>` : ""}
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
                   aria-invalid=${d.errorMessage ? "true" : "false"}
                   aria-describedby=${d.describedBy ? d.describedBy : $}
                   placeholder=${this.getText("cityPlaceholder")}
         .value=${t("city")}
         @input=${this._handleProfileInput} />
            ${d.errorMessage ? m`<p class="error-text" id=${d.errorId ?? $}>${d.errorMessage}</p>` : ""}
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
                    aria-invalid=${g.errorMessage ? "true" : "false"}
                    aria-describedby=${g.describedBy ? g.describedBy : $}
                    @change=${this._handleProfileInput}>
              <option value="">${this.getText("countryPlaceholder", "Bitte auswählen")}</option>
              <optgroup label="${this.getText("priorityCountries", "Häufig verwendet")}">
                ${kr.map((x) => m`
                  <option value="${x.code}" ?selected=${t("country") === x.code}>
                    ${x.name}
                  </option>
                `)}
              </optgroup>
              <optgroup label="${this.getText("otherCountries", "Weitere Länder")}">
                ${Object.entries(Cr).filter(([x]) => !kr.some((E) => E.code === x)).sort((x, E) => x[1].localeCompare(E[1])).map(([x, E]) => m`
                    <option value="${x}" ?selected=${t("country") === x}>
                      ${E}
                    </option>
                  `)}
              </optgroup>
            </select>
            ${g.errorMessage ? m`<p class="error-text" id=${g.errorId ?? $}>${g.errorMessage}</p>` : ""}
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
                   aria-invalid=${h.errorMessage ? "true" : "false"}
                   aria-describedby=${h.describedBy ? h.describedBy : $}
         .value=${t("phoneMain")}
         @input=${this._handleProfileInput} />
            ${h.errorMessage ? m`<p class="error-text" id=${h.errorId ?? $}>${h.errorMessage}</p>` : ""}
          </div>
          <div class="form-group">
            <label class="form-label" for="phoneMobile">${this.getText("phoneMobile")}</label>
            <input class="form-input"
                   id="phoneMobile"
                   name="phoneMobile"
                   type="tel"
                   inputmode="tel"
                   autocomplete="tel-national"
                   aria-invalid=${f.errorMessage ? "true" : "false"}
                   aria-describedby=${f.describedBy ? f.describedBy : $}
         .value=${t("phoneMobile")}
         @input=${this._handleProfileInput} />
            ${f.errorMessage ? m`<p class="error-text" id=${f.errorId ?? $}>${f.errorMessage}</p>` : ""}
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
                   aria-describedby=${y.describedBy ? y.describedBy : $}
                   .value=${t("email")}
         ?disabled=${this.isFieldLocked("email")}
         @input=${this._handleProfileInput} />
            ${this.isFieldLocked("email") ? m`<p class="field-help" id="email-help">${this.getLockReason("email") || this.getText("emailChangeHelp")}</p>` : ""}
            ${y.errorMessage ? m`<p class="error-text" id=${y.errorId ?? $}>${y.errorMessage}</p>` : ""}
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
                   aria-invalid=${S.errorMessage ? "true" : "false"}
                   aria-describedby=${S.describedBy ? S.describedBy : $}

         ?disabled=${this.isFieldLocked("dateOfBirth")}
         @change=${this._handleProfileInput} />
            ${this.isFieldLocked("dateOfBirth") ? m`<p class="field-help" id="dateOfBirth-help">${this.getLockReason("dateOfBirth") || this.getText("dateOfBirthChangeHelp", "Das Geburtsdatum kann nicht geändert werden.")}</p>` : ""}
            ${S.errorMessage ? m`<p class="error-text" id=${S.errorId ?? $}>${S.errorMessage}</p>` : ""}
          </div>
        </div>

        <div class="form-actions">
          ${this._hasUnsavedProfileChanges ? m`
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
            ${this.isSaving ? m`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : this.getText("btnSave", "Speichern")}
          </button>
        </div>
      </section>
    `;
  }
  renderTravelersSection() {
    const t = (Array.isArray(this.travelers) ? this.travelers.length : 0) < Ti;
    return m`
      <div class="travelers-section form-section" role="group" aria-labelledby="travelers-section-title" aria-describedby="travelers-section-desc">
        <h2 class="section-title">${this.getText("travelersTitle")}</h2>
        <p class="section-subtitle">${this.getText("travelersSubtitle")}</p>


        <div class="travelers-list">
          ${this.travelers.map((i, r) => this.renderTravelerItem(i, r))}
        </div>

        ${t ? m`
          <button type="button" class="btn btn-secondary" @click=${this.handleAddTraveler}>
            ${this.getText("btnAddTraveler")}
          </button>
        ` : m`
          <div role="status" aria-live="polite" class="field-help">
            ${this.getText("maxTravelersReached", "Es sind max. 6 Reisende möglich")}
          </div>
        `}
      </div>
    `;
  }
  renderTravelerItem(e, t) {
    var c;
    const i = ((c = e.salutation) == null ? void 0 : c.toLowerCase()) || "", r = i === "mr" || i === "herr" ? this.getText("salutationMr", "Herr") : i === "ms" || i === "frau" ? this.getText("salutationMs", "Frau") : e.salutation || "", o = this._formatDateToGerman(e.dateOfBirth), a = e.hasMitgliedschaft === !0, n = e.isLocked === !0 || a, s = a ? this.getText("travelerMembershipLockedReason", "Es besteht eine aktive Mitgliedschaft. Bitte wenden Sie sich für Anpassungen der Mitreisenden an den Kundenservice.") : n && e.lockReason ? e.lockReason : n ? this.getText("travelerLockedDefaultReason", `Es besteht eine bevorstehende Buchung,
bitte wenden Sie sich für Anpassungen der Mitreisenden an den Kundenservice`) : null;
    return m`
      <div class="traveler-item ${n || a ? "traveler-locked" : ""}">
        ${n ? m`<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style="vertical-align: middle; margin-right: 0.5rem;" xmlns="http://www.w3.org/2000/svg">
          <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
        </svg>` : ""}
        <div class="traveler-info">
          <h4>

            ${r ? `${r} ` : ""}${e.firstName} ${e.lastName}
          </h4>
          <p>${this.getText("dateOfBirth")}: ${o}</p>
        </div>
        <div class="traveler-actions">
          ${n ? m`<p class="field-help traveler-lock-reason" role="alert">${s}</p>` : ""}
          ${n ? "" : m`

          <button type="button" @click=${() => this.handleEditTraveler(e, t)} class="btn btn-tertiary" ?disabled=${n} aria-label=${this.getText("btnEditTravelerLabel", "Mitreisenden bearbeiten")}>
            <svg fill="currentColor" height="16" viewBox="0 0 256 256" width="16" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96A16,16,0,0,0,227.31,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
            <span >${this.getText("btnEdit")}</span>
          </button>
          <button type="button" @click=${() => this.handleDeleteTraveler(e, t)} class="btn btn-secondary btn-danger" ?disabled=${n || a} aria-label=${this.getText("btnDeleteTravelerLabel", "Mitreisenden entfernen")}>
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
    var e, t, i, r, o, a, n, s, c, p;
    return m`
      ${this.showAddTravelerModal ? m`
        <dialog id="add-traveler-dialog" class="modal" aria-labelledby="add-traveler-title" @cancel=${(d) => {
      d.preventDefault(), this.closeModals();
    }} @click=${(d) => {
      d.target.tagName === "DIALOG" && this.closeModals();
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
                aria-describedby=${this.travelerFormErrors.firstName ? "add-traveler-firstName-error" : $}
                placeholder=${this.getText("firstNamePlaceholder", "Vorname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.firstName ? m`<p class="error-text" id="add-traveler-firstName-error">${this.travelerFormErrors.firstName}</p>` : ""}

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
                aria-describedby=${this.travelerFormErrors.lastName ? "add-traveler-lastName-error" : $}
                placeholder=${this.getText("lastNamePlaceholder", "Nachname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.lastName ? m`<p class="error-text" id="add-traveler-lastName-error">${this.travelerFormErrors.lastName}</p>` : ""}

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
                aria-describedby=${this.travelerFormErrors.dateOfBirth ? "add-traveler-dateOfBirth-error" : $}
                @change=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.dateOfBirth ? m`<p class="error-text" id="add-traveler-dateOfBirth-error">${this.travelerFormErrors.dateOfBirth}</p>` : ""}

              <div class="modal-actions">
                <button type="submit" class="btn btn-primary" ?disabled=${this.isSaving}>
                  ${this.isSaving ? m`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : O("save", "common", "Speichern")}
                </button>
                <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
              </div>
            </form>
        </dialog>
      ` : ""}

      ${this.showEditTravelerModal ? m`
        <dialog id="edit-traveler-dialog" class="modal" aria-labelledby="edit-traveler-title" @cancel=${(d) => {
      d.preventDefault(), this.closeModals();
    }} @click=${(d) => {
      d.target.tagName === "DIALOG" && this.closeModals();
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
                aria-describedby=${this.travelerFormErrors.firstName ? "edit-traveler-firstName-error" : $}
                placeholder=${this.getText("firstNamePlaceholder", "Vorname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.firstName ? m`<p class="error-text" id="edit-traveler-firstName-error">${this.travelerFormErrors.firstName}</p>` : ""}

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
                aria-describedby=${this.travelerFormErrors.lastName ? "edit-traveler-lastName-error" : $}
                placeholder=${this.getText("lastNamePlaceholder", "Nachname")}
                required
                @input=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.lastName ? m`<p class="error-text" id="edit-traveler-lastName-error">${this.travelerFormErrors.lastName}</p>` : ""}

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
                aria-describedby=${this.travelerFormErrors.dateOfBirth ? "edit-traveler-dateOfBirth-error" : $}
                @change=${this._handleTravelerInput}
              />
              ${this.travelerFormErrors.dateOfBirth ? m`<p class="error-text" id="edit-traveler-dateOfBirth-error">${this.travelerFormErrors.dateOfBirth}</p>` : ""}

              <div class="modal-actions">
                <button type="submit" class="btn btn-primary" ?disabled=${this.isSaving}>
                  ${this.isSaving ? m`${this._renderButtonSpinner()}${O("saving", "common", "Wird gespeichert...")}` : O("save", "common", "Speichern")}
                </button>
                <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
              </div>
            </form>
        </dialog>
      ` : ""}

      ${this.showDeleteTravelerModal ? m`
        <dialog id="delete-traveler-dialog" class="modal" aria-labelledby="delete-traveler-title" @cancel=${(d) => {
      d.preventDefault(), this.closeModals();
    }} @click=${(d) => {
      d.target.tagName === "DIALOG" && this.closeModals();
    }}>
            <h3 id="delete-traveler-title">${this.getText("modalDeleteTraveler", "Mitreisenden löschen")}</h3>
            <p>${this.getText("modalDeleteTravelerConfirm", "Möchten Sie diesen Mitreisenden wirklich entfernen?")}</p>
            <p class="modal-traveler-name">${(c = this.currentTraveler) == null ? void 0 : c.firstName} ${(p = this.currentTraveler) == null ? void 0 : p.lastName}</p>
            <div class="modal-actions">
              <button type="button" class="btn btn-danger" @click=${this.confirmDeleteTraveler} ?disabled=${this.isSaving}>
                ${this.isSaving ? m`${this._renderButtonSpinner()}${O("deleting", "common", "Wird gelöscht...")}` : O("delete", "common", "Löschen")}
              </button>
              <button type="button" class="btn btn-secondary" @click=${this.closeModals} ?disabled=${this.isSaving}>${O("cancel", "common", "Abbrechen")}</button>
            </div>
        </dialog>
      ` : ""}
    `;
  }
};
D(ht, "properties", {
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
  // Keep withAppState's context getter; a generated subclass accessor would
  // hide it and make the profile fall back to unauthenticated direct requests.
  appState: { type: Object, attribute: !1, noAccessor: !0 },
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
}), D(ht, "styles", [
  ct(ht, ht, "styles"),
  ae`
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
      font-weight: var(--account-section-title-font-weight, 700);
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
      font-weight: var(--account-form-label-font-weight, 600);
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
      font-weight: var(--account-section-title-font-weight, 700);
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
      font-weight: var(--account-card-title-font-weight, 600);
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
      font-weight: var(--account-section-title-font-weight, 600);
    }

    .modal form {
      display: grid;
      gap: 1rem;
    }

    .modal .form-label {
      font-weight: var(--account-form-label-font-weight, 600);
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
let Ei = ht;
customElements.get("account-manager") || customElements.define("account-manager", Ei);
const pa = ae`
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
function no(l) {
  if (!l) return "-";
  try {
    return new Date(l).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return console.warn("Invalid date:", l), l;
  }
}
function Xi(l, e = "CHF") {
  if (l == null) return "-";
  try {
    const t = typeof l == "string" ? parseFloat(l) : l;
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: e || "CHF"
    }).format(t);
  } catch {
    return console.warn("Invalid amount:", l), `${l} ${e}`;
  }
}
function so(l) {
  var e;
  return l && (e = l.links) != null && e.invoice ? l.links.invoice : null;
}
function ma(l) {
  if (!l || typeof l != "string") return !1;
  try {
    const t = (l.includes("://") ? new URL(l).pathname : l).match(/\/p\/([^/?#]+)/);
    if (!t) return !0;
    const i = t[1];
    return !(!i.includes("_") || i.split("_").slice(1).join("_").length <= 1);
  } catch {
    return !1;
  }
}
function lo(l) {
  var e, t;
  if (!l) return null;
  if ((e = l.links) != null && e.tripDetails) {
    const i = ((t = l.provider) == null ? void 0 : t.code) ?? l.provider;
    return (i === 1 || i === "1" || i === "voe") && !ma(l.links.tripDetails) ? (console.warn("⚠️ Invalid Voegele trip details URL filtered:", l.links.tripDetails), null) : l.links.tripDetails;
  }
  return null;
}
function Et(l) {
  if (!l) return "";
  typeof l == "object" && (l = l.name || l.code || "");
  const e = l.toString().toLowerCase().trim();
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
  }[e] || l;
}
function co(l) {
  if (!l) return "unknown";
  const e = l.toString().toLowerCase().trim();
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
  }[e] || l;
}
function Ln(l) {
  if (!l) return !1;
  const e = /* @__PURE__ */ new Date();
  return new Date(l.departureDate || l.startDate) > e;
}
function ho(l) {
  return l ? (l = l.toString().toLowerCase().trim(), `${l}`) : "";
}
class $i extends Oe {
  constructor() {
    super(), this.currentTrip = null, this.isLoading = !1, this.error = null, this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = "https://xitami.github.io/TWR-Account-Components", this.mode = "demo", this.authComponent = null, this.mode = "full", this.showActions = !0, this.languageConfig = {}, this.demoData = {}, this._isInitialized = !1;
  }
  async connectedCallback() {
    super.connectedCallback(), await this.loadConfigurations();
    const e = this.apiMode || "demo";
    `${e}`, P.setMode(e), this.authComponent && P.setAuthComponent(this.authComponent), this._handleTripsUpdated = (t) => {
      var i;
      if (((i = t.detail) == null ? void 0 : i.source) === "background-revalidation") {
        const r = t.detail.trips || [], o = this.filterCurrentTrips(r);
        o.length > 0 && (this.currentTrip = o[0]);
      }
    }, document.addEventListener("trips-updated", this._handleTripsUpdated), await this.loadCurrentTrip();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._handleTripsUpdated && (document.removeEventListener("trips-updated", this._handleTripsUpdated), this._handleTripsUpdated = null);
  }
  async updated(e) {
    if (super.updated(e), e.has("apiMode") || e.has("authComponent")) {
      const t = this.apiMode || "demo";
      `${t}`, P.setMode(t), this.authComponent && P.setAuthComponent(this.authComponent), this._isInitialized = !1, await this.loadCurrentTrip();
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
      if ((e = this.appActions) != null && e.loadTrips && (!((t = this.appState) != null && t.tripsLoaded) && await this.appActions.loadTrips(), o = Array.isArray((i = this.appState) == null ? void 0 : i.trips) ? this.appState.trips : [], o.length), (!Array.isArray(o) || o.length === 0) && this.apiMode !== "demo" && (o = await this.loadTripsFromAPI()), !Array.isArray(o) || o.length === 0)
        this.currentTrip = null;
      else {
        const a = this.filterCurrentTrips(o);
        this.currentTrip = a.length > 0 ? a[0] : null, this.currentTrip, this.currentTrip && (this.currentTrip.title, this.currentTrip.image, this.currentTrip.image, (r = this.currentTrip.media) == null || r.mainImage, this.currentTrip);
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
      const e = await P.getTrips(), t = Array.isArray(e) ? e : [];
      return t.length, t;
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
      const a = (d) => {
        var h, f;
        const g = typeof d.provider == "string" ? d.provider : ((h = d.provider) == null ? void 0 : h.code) || ((f = d.provider) == null ? void 0 : f.name);
        return g === i || g === i.toLowerCase() ? 1 : g === "Voegele" || g === "voe" || g === "Imbach" || g === "imb" || g === "Twerenbold" || g === "twr" ? 2 : 3;
      }, n = a(r), s = a(o);
      if (n !== s) return n - s;
      const c = new Date(r.departureDate), p = new Date(o.departureDate);
      return c.getTime() !== p.getTime() ? c - p : (o.price || 0) - (r.price || 0);
    });
  }
  mapApiTripToComponent(e) {
    var i, r, o, a, n, s, c, p;
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
      bookingDate: ((c = e.dates) == null ? void 0 : c.bookingDate) || e.bookingDate || e.createdAt
    };
    return t.title, t.image, t.image, (p = e.media) == null || p.mainImage, e.image, e.photo, t;
  }
  // Utility methods now imported from trip-utils.js
  mapApiStatusToComponent(e) {
    return co(e);
  }
  formatDate(e) {
    return no(e);
  }
  formatCurrency(e, t = "CHF") {
    return Xi(e, t);
  }
  getTripDetailsUrl(e) {
    return lo(e);
  }
  getTripInvoiceUrl(e) {
    return so(e);
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
      const t = Et(e.name);
      return m`
        <a href="${e.websiteUrl}" style="color: var(--text-muted); text-decoration:none;white-space:nowrap;" class="text-sm text-gray-500 with-favicon">
        <favicon-component url=${e.websiteUrl} brand=${e.name} size=${24} alt="${e.name}"></favicon-component>
 
        <strong>${t}</strong>
        </a>
      `;
    }
    return Et(e);
  }
  renderTripCode(e) {
    return ho(e);
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
    t.src, (i = this.currentTrip) == null || i.title, `${t.naturalWidth}${t.naturalHeight}`;
  }
  render() {
    return this.isLoading ? m`
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
            
            ${this.mode === "full" || this.mode === "compact" ? m`
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
      ` : this.error ? m`<div class="empty-state">${this.error}</div>` : this.currentTrip ? (this.currentTrip.image, this.currentTrip.image, this.currentTrip.title, m`
      <div class="current-trip-card">
        <div class="current-trip-content">
          <div class="current-trip-main">
            <div class="current-trip-image-section">
              ${this.currentTrip.image ? m`
                    <img
                      src="${this.currentTrip.image}"
                      alt="${this.currentTrip.title}"
                      class="current-trip-image"
                      @error="${this._handleImageError}"
                      @load="${this._handleImageLoad}"
                      loading="lazy"
                    />
                  ` : m`<div class="current-trip-image-placeholder"></div>`}
            </div>
            <div class="current-trip-details">
              <div class="current-trip-header">
                <div class="current-trip-provider">${this.renderProvider(this.currentTrip.provider)}  <span class="trip-code-label">Buchungscode: </span><span class="trip-code">${this.renderTripCode(this.currentTrip.code)} </span></div>
                <h3 class="current-trip-title">${this.currentTrip.title}</h3>
                <p class="current-trip-destination">${this.currentTrip.destination}</p>
              </div>
            </div>
          </div>

          ${this.mode !== "preview" ? m`
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

        ${this.showActions && this.mode !== "preview" ? m`
          <div class="current-trip-actions">
            ${this.getTripInvoiceUrl(this.currentTrip) ? m`
              <a href="${this.getTripInvoiceUrl(this.currentTrip)}" class="btn btn-secondary">
                ${this.getText("btnInvoiceTrip") || "Rechnung"}
              </a>
            ` : ""}
            ${this.getTripDetailsUrl(this.currentTrip) ? m`
              <a href="${this.getTripDetailsUrl(this.currentTrip)}" target="_blank" class="btn btn-primary">
                ${this.getText("btnShowDetails") || "Details anzeigen"}
              </a>
            ` : ""}
          </div>
        ` : ""}
      </div>

      <auth-notifications></auth-notifications>
    `) : m`<div class="empty-state">${this.getText("currentTripNoData") || "Keine aktuelle Reise gefunden"}</div>`;
  }
}
D($i, "properties", {
  currentTrip: { type: Object },
  isLoading: { type: Boolean },
  error: { type: String },
  mode: { type: String },
  // 'full', 'compact', 'preview'
  showActions: { type: Boolean },
  languageConfig: { type: Object },
  demoData: { type: Object }
}), D($i, "styles", [
  wt,
  pa,
  ae`
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
      font-weight: var(--account-card-title-font-weight, 700);
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
customElements.get("current-trip-component") || customElements.define("current-trip-component", $i);
const fa = {
  demoBaseUrl: "https://xitami.github.io/TWR-Account-Components"
};
function ai(l) {
  if (typeof window < "u") {
    const e = window.__TWR_DEMO_BASE_URL__;
    if (typeof e == "string" && e.startsWith("http"))
      return e;
  }
  return fa.demoBaseUrl;
}
function uo(l) {
  switch (l) {
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
function go(l) {
  return l ? ((typeof l == "string" ? l : (l == null ? void 0 : l.code) || (l == null ? void 0 : l.name) || "") || "").toString().toLowerCase().trim() : "";
}
function Qe(l, e) {
  const t = go(l);
  if (!t) return 3;
  const i = uo(e), r = {
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
function ji(l, e, t = {}) {
  if (!Array.isArray(l)) return [];
  const {
    getProvider: i = (c) => c.provider,
    getDate: r = (c) => c.departureDate || c.date,
    getPrice: o = (c) => c.price || 0,
    sortMode: a = "upcoming",
    priceFallback: n = !0,
    debug: s = !1
  } = t;
  if (s)
    try {
      const c = uo(e);
      `${e}${l.length}`, `${e}`, `${c || "None"}`;
      const p = l.map((d, g) => {
        const h = i(d), f = go(h), v = Qe(h, e), y = r(d), S = o(d);
        return {
          Index: g,
          ID: d.id || d.code || d.newsletterCode || "?",
          "Provider (Raw)": typeof h == "object" ? JSON.stringify(h) : h,
          "Provider (Norm)": f,
          Priority: v,
          // 1=High, 2=Med, 3=Low
          Date: y instanceof Date ? y.toISOString().split("T")[0] : y,
          Price: S
        };
      });
    } catch (c) {
      console.warn("Error in sorting debug:", c);
    }
  return [...l].sort((c, p) => {
    const d = Qe(i(c), e), g = Qe(i(p), e);
    if (d !== g) return d - g;
    const h = new Date(r(c)), f = new Date(r(p)), v = !isNaN(h.getTime()), y = !isNaN(f.getTime());
    return v && y && h.getTime() !== f.getTime() ? a === "past" ? f - h : h - f : n ? o(p) - o(c) : 0;
  });
}
class Zi extends Ue {
  constructor() {
    super(), this.message = "", this.overlay = !1, this.small = !1;
  }
  render() {
    const e = this.small ? "spinner small" : "spinner", t = this.message || "Lädt", i = m`
      <div class="loader" role="status" aria-live="polite" aria-label="${t}">
        <div class="${e}" aria-hidden="true"></div>
        ${this.message ? m`<div class="message" aria-live="polite">${this.message}</div>` : ""}
      </div>
    `;
    return this.overlay ? m`<div class="overlay" role="alert">${i}</div>` : i;
  }
}
D(Zi, "properties", {
  message: { type: String },
  overlay: { type: Boolean },
  small: { type: Boolean }
}), D(Zi, "styles", ae`
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
customElements.get("loader-component") || customElements.define("loader-component", Zi);
const Ke = class Ke extends Ue {
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
      if (Ke.BRAND_TO_DOMAIN[e]) return Ke.BRAND_TO_DOMAIN[e];
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
      return m`<img src=${o} alt=${this.alt || e} width=${i} height=${i} />`;
    }
    if (this.fallback) {
      const o = this.renderInitialsLabel(this.brand || this.domain);
      return m`<div class="initials" aria-hidden="true">${o}</div>`;
    }
    return m`<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${i}' height='${i}'></svg>" alt=${this.alt || ""} width=${i} height=${i} />`;
  }
};
D(Ke, "properties", {
  brand: { type: String },
  domain: { type: String },
  url: { type: String },
  size: { type: Number },
  alt: { type: String },
  fallback: { type: Boolean }
}), D(Ke, "styles", ae`
    :host { display: inline-block; vertical-align: middle; }
    img { display:block; width: var(--favicon-size, 28px); height: var(--favicon-size, 28px); border-radius: 4px; }
    .initials {
      display:inline-flex; align-items:center; justify-content:center; background: var(--bg-secondary, #f3f4f6);
      color: var(--text-color, #111827); width: var(--favicon-size, 28px); height: var(--favicon-size, 28px); border-radius: 4px; font-weight: 600; font-size: 0.75rem;
    }
  `), // Mapping from brand shorthand to canonical domains
D(Ke, "BRAND_TO_DOMAIN", {
  twr: "twerenbold.ch",
  twerenbold: "twerenbold.ch",
  imbach: "imbach.ch",
  excellence: "mittelthurgau.ch",
  vogele: "voegele-reisen.ch",
  voe: "voegele-reisen.ch",
  voegele: "voegele-reisen.ch",
  voegelereisen: "voegele-reisen.ch"
});
let Oi = Ke;
customElements.get("favicon-component") || customElements.define("favicon-component", Oi);
const ba = 3600 * 1e3, xr = 30 * 1e3, ut = class ut extends Oe {
  constructor() {
    super(), this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.mode = "demo", this.authComponent = null, this.upcomingTrips = [], this.pastTrips = [], this.isLoading = !1, this.activeTab = "upcoming", this.error = null, this.languageConfig = {}, this.languageConfig = {}, this.providerFilter = null, this.providerFilter = null, this.showAuthOverlay = !1, this._isInitialized = !1, this._loadTripsPromise = null, this.lastLoadedAt = null, this.availableProviders = [], this._autoRefreshIntervalId = null, this._allTripsCache = [], this._lastHandledAuthRefresh = null, this._lastSyncedTripsRef = null, this.demoBaseUrl = ai(), this.apiMode;
  }
  async connectedCallback() {
    super.connectedCallback(), this.apiMode, this.theme, [...this.attributes].map((i) => `${i.name}=${i.value}`), await this.loadConfigurations(), this.apiMode;
    const e = this.apiMode || "demo";
    P.mode !== e && P.setMode(e);
    const t = e === "local";
    this.authComponent && P.setAuthComponent(this.authComponent), this._handleTripsUpdated = (i) => {
      var r;
      if (((r = i.detail) == null ? void 0 : r.source) === "background-revalidation") {
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
    t.size > 0 && super.updated(t), [...e.keys()];
    let i = !1, r = !1;
    if (e.has("availableProviders")) {
      const o = e.get("availableProviders") || [];
      this.availableProviders.includes(this.providerFilter) || (this.providerFilter = null), (o || []).length !== this.availableProviders.length && this.requestUpdate("providerFilter");
    }
    if ((e.has("appState") || e.has("authComponent")) && this._setupAuthRefreshListener(), e.has("appState")) {
      const o = e.get("appState"), a = this.appState;
      a != null && a.authLastRefreshed && a.authLastRefreshed !== (o == null ? void 0 : o.authLastRefreshed) && await this._handleAuthRefresh();
      const n = !(o != null && o.isAuthenticated) && !!(a != null && a.isAuthenticated), s = (o == null ? void 0 : o.isInitializing) === !0 && (a == null ? void 0 : a.isInitializing) === !1;
      (n || s) && ("" + n + s, this.showAuthOverlay && (this.showAuthOverlay = !1), this._isInitialized = !1, await this._performInitialLoad());
      const c = a == null ? void 0 : a.trips;
      Array.isArray(c) && c !== this._lastSyncedTripsRef && c !== (o == null ? void 0 : o.trips) && (c.length, this._lastSyncedTripsRef = c, this._updateTripsView(c));
    }
    e.has("apiMode") && (e.get("apiMode"), this.apiMode, P.setMode(this.apiMode || "demo"), this._stopAutoRefresh(), r = !0, i = !0), e.has("authComponent") && (e.get("authComponent"), this.authComponent, this.authComponent && (P.setAuthComponent(this.authComponent), r = !0, i = !0)), e.has("providerFilter") && (e.get("providerFilter"), this.providerFilter, i = !0), i && (r && (this._isInitialized = !1), await this._performInitialLoad(), this.requestUpdate()), this.sortPriorityRows();
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
      return this._loadTripsPromise;
    const t = e === !0 || (e == null ? void 0 : e.forceRefresh) === !0, i = this.apiMode === "demo" || this.apiMode === "local" || this.apiMode === "api" || this.apiMode === "live";
    if (this.apiMode, this.authComponent, !i) {
      this.apiMode;
      return;
    }
    if ((this.apiMode === "live" || this.apiMode === "api") && !this.isAuthenticated) {
      const o = (r = this.appState) == null ? void 0 : r.authComponent;
      if (!!this.appState && (this.appState.isInitializing === !0 || !o || o.isMsalInitialized === !1)) {
        this.isLoading = !0, this.showAuthOverlay = !1;
        return;
      }
      this.showAuthOverlay = !0;
      return;
    } else
      this.showAuthOverlay = !1;
    this.apiMode, this._isInitialized, this._loadTripsPromise = this.loadTrips({ forceRefresh: t });
    try {
      await this._loadTripsPromise, this._isInitialized = !0, this._startAutoRefresh();
    } finally {
      this._loadTripsPromise = null;
    }
  }
  // getTripInvoiceUrl and getTripDetailsUrl are now imported from trip-utils.js
  async loadTrips(e = {}) {
    var i, r, o, a, n;
    const t = e === !0 || (e == null ? void 0 : e.forceRefresh) === !0;
    this.apiMode, this.authComponent, this.isLoading = !0, this.error = null;
    try {
      let s = [];
      if ((i = this.appState) != null && i.trips && Array.isArray(this.appState.trips) && this.appState.trips.length > 0 && (this.appState.trips.length, this._updateTripsView(this.appState.trips)), (r = this.appActions) != null && r.loadTrips) {
        (t || !((o = this.appState) != null && o.tripsLoaded)) && await this.appActions.loadTrips({ forceRefresh: t }), s = Array.isArray((a = this.appState) == null ? void 0 : a.trips) ? this.appState.trips : [], this._lastSyncedTripsRef = (n = this.appState) == null ? void 0 : n.trips, s.length, this._updateTripsView(s);
        return;
      }
      const c = await P.getTrips({ forceRefresh: t });
      s = Array.isArray(c) ? c : [], s.length, this._updateTripsView(s);
    } catch (s) {
      console.error("❌ Failed to load trips:", s);
      const c = (s == null ? void 0 : s.message) || "";
      (c.includes("Authentifizierung fehlgeschlagen") || c.includes("401") || c.includes("Unauthorized") || c.includes("nicht authentifiziert")) && (this.showAuthOverlay = !0, this._showNotification({
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
    }, ba));
  }
  _stopAutoRefresh() {
    this._autoRefreshIntervalId && (clearInterval(this._autoRefreshIntervalId), this._autoRefreshIntervalId = null);
  }
  async _handleAutoRefresh() {
    var t;
    if (!(this.apiMode === "live" || this.apiMode === "api") || !((t = this.authComponent) != null && t.isAuthenticated) || this.isLoading || this._loadTripsPromise) return;
    const e = this.lastLoadedAt || 0;
    if (!(Date.now() - e < xr))
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
    if (Date.now() - (this.lastLoadedAt || 0) < xr) {
      this._lastHandledAuthRefresh = e;
      return;
    }
    this._lastHandledAuthRefresh = e, await this.forceReload();
  }
  filterAndSortTrips(e, t = null) {
    const i = /* @__PURE__ */ new Date(), r = new Date(i.getFullYear(), i.getMonth(), i.getDate());
    e.length;
    let o = e;
    t && (o = e.filter((s) => {
      var p, d;
      return (typeof s.provider == "string" ? s.provider : ((p = s.provider) == null ? void 0 : p.code) || ((d = s.provider) == null ? void 0 : d.name)) === t;
    }), o.length);
    let a = [], n = [];
    o.forEach((s) => {
      if (!s.departureDate || !s.returnDate) {
        console.warn("⚠️ Trip missing dates:", s);
        return;
      }
      const c = new Date(s.departureDate), p = new Date(s.returnDate), d = new Date(c.getFullYear(), c.getMonth(), c.getDate()), g = new Date(p.getFullYear(), p.getMonth(), p.getDate());
      if (d > r)
        a.push(s);
      else {
        const h = new Date(g);
        h.setDate(h.getDate() + 1), h < r && n.push(s);
      }
    }), this.sortTripsBy(a, "upcoming"), a = this.sortTripsByPriority(a, "upcoming"), this.sortTripsBy(n, "past"), n = this.sortTripsByPriority(n, "past"), a.length, n.length, a[0], n[0], this.upcomingTrips = a, this.pastTrips = n, this.upcomingTrips.length === 0 && this.pastTrips.length > 0 && (this.activeTab = "past"), this.upcomingTrips.length, this.pastTrips.length, this.requestUpdate();
  }
  sortTripsBy(e, t = "current") {
    return this.theme, ji(e, this.theme, {
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
    var s, c, p, d, g, h, f;
    if (!e)
      return console.warn("⚠️ Null trip provided to mapApiTripToComponent"), null;
    if (Array.isArray(e) && (console.warn("⚠️ Trip data is an array, using first element"), e = e[0], !e))
      return null;
    const t = e.id || e.tripId || e._id, i = e.title || e.name || e.tripName || "Unbenannte Reise", r = ((s = e.dates) == null ? void 0 : s.departureDate) || e.departureDate || e.startDate || e.departure, o = ((c = e.dates) == null ? void 0 : c.returnDate) || e.returnDate || e.endDate || e.return, a = e.dossier || e.bookingNumber || e.reference || e.bookingRef || "N/A";
    if (!r || !o)
      return console.warn("⚠️ Trip missing required dates, skipping:", e), null;
    const n = {
      id: t,
      title: i,
      code: e.code || e.tripCode || e.productCode || "Unbekannter Code",
      destination: e.destination || e.location || "Unbekanntes Ziel",
      departureDate: r,
      returnDate: o,
      duration: ((p = e.dates) == null ? void 0 : p.duration) || e.duration || 0,
      price: ((d = e.pricing) == null ? void 0 : d.totalAmount) || e.price || e.totalPrice || 0,
      currency: ((g = e.pricing) == null ? void 0 : g.currency) || e.currency || "CHF",
      status: this.mapApiStatusToComponent(e.status),
      bookingNumber: a,
      image: ((h = e.media) == null ? void 0 : h.mainImage) || e.image || e.photo,
      provider: e.provider ? e.provider : "Twerenbold",
      bookingDate: ((f = e.dates) == null ? void 0 : f.bookingDate) || e.bookingDate || e.createdAt,
      links: e.links
    };
    return n;
  }
  // Utility methods now imported from trip-utils.js
  mapApiStatusToComponent(e) {
    return co(e);
  }
  formatDate(e) {
    return no(e);
  }
  formatCurrency(e, t = "CHF") {
    return Xi(e, t);
  }
  getTripDetailsUrl(e) {
    return lo(e);
  }
  getTripInvoiceUrl(e) {
    return so(e);
  }
  showButton(e, t, i, r, o) {
    if (!t || !e) return "";
    const a = typeof t == "string" ? t.trim() : "";
    return a === "" ? "" : o === "link" ? m`
        <a href="${a}" class="btn ${i}" target="${r}">
          ${this.getText(e)}
        </a>
      ` : m`
      <button @click=${() => window.open(a, r)} class="btn ${i}" type="${o}">
        ${this.getText(e)}
      </button>
    `;
  }
  setProviderFilter(e) {
    this.providerFilter = e, this.forceReload();
  }
  async forceReload() {
    this._stopAutoRefresh(), this._isInitialized = !1, await this._performInitialLoad({ forceRefresh: !0 });
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
    this._showAuthNotification();
  }
  render() {
    return this.needsAuth || this.showAuthOverlay ? m`<div class="trips-page trips-page--auth">${this.renderAuthOverlay()}</div>` : m`
      <div class="trips-page">
        <div class="trips-header">
          <h1 class="trips-title page-title">
            ${this.getText("pageTitle")}
            ${this.isLoading && (this.upcomingTrips.length > 0 || this.pastTrips.length > 0) ? m`<span class="loading-spinner-small" title="Aktualisiere..."></span>` : ""}
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
    return !(this._allTripsCache && this._allTripsCache.length > 0) && !this.isLoading ? "" : m`
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
    if (e && typeof e == "object") {
      const r = Et(e.name);
      return m`
        <span style="color: var(--text-muted); text-decoration:none;white-space:nowrap;" class="text-sm text-gray-500 with-favicon">
          <favicon-component brand=${e.name} size=${16} alt="${e.name}"></favicon-component>
          ${t ? m`<strong>${r}</strong>` : ""}
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
    this.activeTab = e;
  }
  renderTripsTable() {
    const e = this.activeTab === "upcoming" ? this.upcomingTrips : this.pastTrips;
    return m`
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

        ${this.isLoading && e.length === 0 ? m`
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
                    ${Array.from({ length: 5 }, (t, i) => m`
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
            ` : e.length === 0 ? m`
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
        var s, c;
        const a = typeof o.provider == "string" ? o.provider : ((s = o.provider) == null ? void 0 : s.name) || ((c = o.provider) == null ? void 0 : c.code);
        Qe(a, this.theme) === 1 ? t.push(o) : i.push(o);
      });
      const r = (o, a = null) => m`
                ${a ? m`<h3 class="trips-section-title">${a}</h3>` : ""}
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
        var d, g;
        const s = typeof n.provider == "string" ? n.provider : ((d = n.provider) == null ? void 0 : d.name) || ((g = n.provider) == null ? void 0 : g.code), c = Qe(s, this.theme);
        return m`
                        <tr class="trip-row ${c === 1 ? "priority-high" : c === 2 ? "priority-medium" : "priority-low"}" @click=${() => this._handleTripClick(n)}>
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
      return t.length > 0 && i.length > 0 ? m`
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
    return m`
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
D(ut, "properties", {
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
}), D(ut, "styles", [
  ct(ut, ut, "styles"),
  ae`
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
      font-weight: var(--account-section-title-font-weight, 700);
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
      font-weight: var(--account-card-title-font-weight, 700);
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
      font-weight: var(--account-nav-font-weight, 500);
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
      font-weight: var(--account-section-title-font-weight, 600);
      color: var(--text-color);
      margin: 0 0 1rem 0;
      // padding-left: 0.5rem;
      // border-left: 3px solid var(--primary-color);
    }
  `
]);
let Ui = ut;
customElements.get("trips-list-component") || customElements.define("trips-list-component", Ui);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = globalThis, Ir = (l) => l, ei = Rt.trustedTypes, Lr = ei ? ei.createPolicy("lit-html", { createHTML: (l) => l }) : void 0, po = "$lit$", $e = `lit$${Math.random().toFixed(9).slice(2)}$`, mo = "?" + $e, va = `<${mo}>`, et = document, ti = () => et.createComment(""), $t = (l) => l === null || typeof l != "object" && typeof l != "function", Ji = Array.isArray, wa = (l) => Ji(l) || typeof (l == null ? void 0 : l[Symbol.iterator]) == "function", Ai = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pr = /-->/g, Mr = />/g, je = RegExp(`>|${Ai}(?:([^\\s"'>=/]+)(${Ai}*=${Ai}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nr = /'/g, Dr = /"/g, fo = /^(?:script|style|textarea|title)$/i, ft = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), Rr = /* @__PURE__ */ new WeakMap(), qe = et.createTreeWalker(et, 129);
function bo(l, e) {
  if (!Ji(l) || !l.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lr !== void 0 ? Lr.createHTML(e) : e;
}
const ya = (l, e) => {
  const t = l.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Mt;
  for (let n = 0; n < t; n++) {
    const s = l[n];
    let c, p, d = -1, g = 0;
    for (; g < s.length && (a.lastIndex = g, p = a.exec(s), p !== null); ) g = a.lastIndex, a === Mt ? p[1] === "!--" ? a = Pr : p[1] !== void 0 ? a = Mr : p[2] !== void 0 ? (fo.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = je) : p[3] !== void 0 && (a = je) : a === je ? p[0] === ">" ? (a = r ?? Mt, d = -1) : p[1] === void 0 ? d = -2 : (d = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? je : p[3] === '"' ? Dr : Nr) : a === Dr || a === Nr ? a = je : a === Pr || a === Mr ? a = Mt : (a = je, r = void 0);
    const h = a === je && l[n + 1].startsWith("/>") ? " " : "";
    o += a === Mt ? s + va : d >= 0 ? (i.push(c), s.slice(0, d) + po + s.slice(d) + $e + h) : s + $e + (d === -2 ? n : h);
  }
  return [bo(l, o + (l[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Zt {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, s = this.parts, [c, p] = ya(e, t);
    if (this.el = Zt.createElement(c, i), qe.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = qe.nextNode()) !== null && s.length < n; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(po)) {
          const g = p[a++], h = r.getAttribute(d).split($e), f = /([.?@])?(.*)/.exec(g);
          s.push({ type: 1, index: o, name: f[2], strings: h, ctor: f[1] === "." ? Aa : f[1] === "?" ? _a : f[1] === "@" ? Sa : ni }), r.removeAttribute(d);
        } else d.startsWith($e) && (s.push({ type: 6, index: o }), r.removeAttribute(d));
        if (fo.test(r.tagName)) {
          const d = r.textContent.split($e), g = d.length - 1;
          if (g > 0) {
            r.textContent = ei ? ei.emptyScript : "";
            for (let h = 0; h < g; h++) r.append(d[h], ti()), qe.nextNode(), s.push({ type: 2, index: ++o });
            r.append(d[g], ti());
          }
        }
      } else if (r.nodeType === 8) if (r.data === mo) s.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf($e, d + 1)) !== -1; ) s.push({ type: 7, index: o }), d += $e.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = et.createElement("template");
    return i.innerHTML = e, i;
  }
}
function bt(l, e, t = l, i) {
  var a, n;
  if (e === ft) return e;
  let r = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const o = $t(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((n = r == null ? void 0 : r._$AO) == null || n.call(r, !1), o === void 0 ? r = void 0 : (r = new o(l), r._$AT(l, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = r : t._$Cl = r), r !== void 0 && (e = bt(l, r._$AS(l, e.values), r, i)), e;
}
class Ta {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? et).importNode(t, !0);
    qe.currentNode = r;
    let o = qe.nextNode(), a = 0, n = 0, s = i[0];
    for (; s !== void 0; ) {
      if (a === s.index) {
        let c;
        s.type === 2 ? c = new Ot(o, o.nextSibling, this, e) : s.type === 1 ? c = new s.ctor(o, s.name, s.strings, this, e) : s.type === 6 && (c = new Ca(o, this, e)), this._$AV.push(c), s = i[++n];
      }
      a !== (s == null ? void 0 : s.index) && (o = qe.nextNode(), a++);
    }
    return qe.currentNode = et, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Ot {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = bt(this, e, t), $t(e) ? e === j || e == null || e === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : e !== this._$AH && e !== ft && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : wa(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== j && $t(this._$AH) ? this._$AA.nextSibling.data = e : this.T(et.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Zt.createElement(bo(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(t);
    else {
      const a = new Ta(r, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Rr.get(e.strings);
    return t === void 0 && Rr.set(e.strings, t = new Zt(e)), t;
  }
  k(e) {
    Ji(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new Ot(this.O(ti()), this.O(ti()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = Ir(e).nextSibling;
      Ir(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ni {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = j, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = j;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = bt(this, e, t, 0), a = !$t(e) || e !== this._$AH && e !== ft, a && (this._$AH = e);
    else {
      const n = e;
      let s, c;
      for (e = o[0], s = 0; s < o.length - 1; s++) c = bt(this, n[i + s], t, s), c === ft && (c = this._$AH[s]), a || (a = !$t(c) || c !== this._$AH[s]), c === j ? e = j : e !== j && (e += (c ?? "") + o[s + 1]), this._$AH[s] = c;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Aa extends ni {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === j ? void 0 : e;
  }
}
class _a extends ni {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== j);
  }
}
class Sa extends ni {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = bt(this, e, t, 0) ?? j) === ft) return;
    const i = this._$AH, r = e === j && i !== j || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== j && (i === j || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ca {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    bt(this, e);
  }
}
const ka = { I: Ot }, _i = Rt.litHtmlPolyfillSupport;
_i == null || _i(Zt, Ot), (Rt.litHtmlVersions ?? (Rt.litHtmlVersions = [])).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xa = { CHILD: 2 }, Ia = (l) => (...e) => ({ _$litDirective$: l, values: e });
let La = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Pa } = ka, Er = (l) => l, $r = () => document.createComment(""), Nt = (l, e, t) => {
  var o;
  const i = l._$AA.parentNode, r = e === void 0 ? l._$AB : e._$AA;
  if (t === void 0) {
    const a = i.insertBefore($r(), r), n = i.insertBefore($r(), r);
    t = new Pa(a, n, l, l.options);
  } else {
    const a = t._$AB.nextSibling, n = t._$AM, s = n !== l;
    if (s) {
      let c;
      (o = t._$AQ) == null || o.call(t, l), t._$AM = l, t._$AP !== void 0 && (c = l._$AU) !== n._$AU && t._$AP(c);
    }
    if (a !== r || s) {
      let c = t._$AA;
      for (; c !== a; ) {
        const p = Er(c).nextSibling;
        Er(i).insertBefore(c, r), c = p;
      }
    }
  }
  return t;
}, Je = (l, e, t = l) => (l._$AI(e, t), l), Ma = {}, Na = (l, e = Ma) => l._$AH = e, Da = (l) => l._$AH, Si = (l) => {
  l._$AR(), l._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zr = (l, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(l[r], r);
  return i;
}, Or = Ia(class extends La {
  constructor(l) {
    if (super(l), l.type !== xa.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(l, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], o = [];
    let a = 0;
    for (const n of l) r[a] = i ? i(n, a) : a, o[a] = t(n, a), a++;
    return { values: o, keys: r };
  }
  render(l, e, t) {
    return this.dt(l, e, t).values;
  }
  update(l, [e, t, i]) {
    const r = Da(l), { values: o, keys: a } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = a, o;
    const n = this.ut ?? (this.ut = []), s = [];
    let c, p, d = 0, g = r.length - 1, h = 0, f = o.length - 1;
    for (; d <= g && h <= f; ) if (r[d] === null) d++;
    else if (r[g] === null) g--;
    else if (n[d] === a[h]) s[h] = Je(r[d], o[h]), d++, h++;
    else if (n[g] === a[f]) s[f] = Je(r[g], o[f]), g--, f--;
    else if (n[d] === a[f]) s[f] = Je(r[d], o[f]), Nt(l, s[f + 1], r[d]), d++, f--;
    else if (n[g] === a[h]) s[h] = Je(r[g], o[h]), Nt(l, r[d], r[g]), g--, h++;
    else if (c === void 0 && (c = Zr(a, h, f), p = Zr(n, d, g)), c.has(n[d])) if (c.has(n[g])) {
      const v = p.get(a[h]), y = v !== void 0 ? r[v] : null;
      if (y === null) {
        const S = Nt(l, r[d]);
        Je(S, o[h]), s[h] = S;
      } else s[h] = Je(y, o[h]), Nt(l, r[d], y), r[v] = null;
      h++;
    } else Si(r[g]), g--;
    else Si(r[d]), d++;
    for (; h <= f; ) {
      const v = Nt(l, s[f + 1]);
      Je(v, o[h]), s[h++] = v;
    }
    for (; d <= g; ) {
      const v = r[d++];
      v !== null && Si(v);
    }
    return this.ut = a, Na(l, s), ft;
  }
}), Xt = "twerenbold_favorites_", Ci = "twerenbold_favorites_last_user_id", Ur = "twerenbold_fav_removed_", Ra = 120 * 1e3, jt = "twerenbold_fav_added_", Ea = 120 * 1e3;
class $a {
  constructor() {
    this._syncQueue = [], this._isSyncing = !1, this._listeners = /* @__PURE__ */ new Set(), this._handleStorage = this._handleStorage.bind(this), typeof window < "u" && (window.addEventListener("storage", this._handleStorage), window.addEventListener("twerenbold:post-logout", () => {
      this._syncQueue = [];
      try {
        localStorage.removeItem(Ci);
      } catch {
      }
    }));
  }
  _handleStorage(e) {
    if (!e.key || !e.key.startsWith(Xt)) return;
    const t = e.key.replace(Xt, "");
    if (t)
      try {
        const i = e.newValue ? JSON.parse(e.newValue) : [];
        this._dispatchUpdate({ userId: t, items: i });
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
      localStorage.setItem(i, JSON.stringify(t)), e && localStorage.setItem(Ci, e), this._dispatchUpdate({ userId: e, items: t });
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
  // KK-234: Liste der frisch entfernten Schlüssel. Ohne sie holte eine
  // Revalidierung, deren Server-Antwort noch den alten Stand trug, den gerade
  // gelöschten Eintrag zurück («Add favorites from server that are not present
  // locally») – er tauchte kurz wieder auf und verschwand erst beim nächsten Lauf.
  _loadRemoved(e) {
    return this._loadMarks(Ur, Ra, e);
  }
  _saveRemoved(e, t) {
    this._saveMarks(Ur, e, t);
  }
  // Gemeinsame Ablage für «entfernt»- und «hinzugefügt»-Markierungen mit TTL
  _loadMarks(e, t, i) {
    try {
      const r = localStorage.getItem(`${e}${i || "anonymous"}`), o = r ? JSON.parse(r) : {}, a = Date.now();
      return Object.fromEntries(Object.entries(o).filter(([, n]) => a - n < t));
    } catch {
      return {};
    }
  }
  _saveMarks(e, t, i) {
    try {
      const r = `${e}${t || "anonymous"}`;
      Object.keys(i).length === 0 ? localStorage.removeItem(r) : localStorage.setItem(r, JSON.stringify(i));
    } catch {
    }
  }
  _loadAdded(e) {
    return this._loadMarks(jt, Ea, e);
  }
  _markAdded(e, t) {
    if (!t) return;
    const i = this._loadAdded(e);
    i[t] = Date.now(), this._saveMarks(jt, e, i);
  }
  _unmarkAdded(e, t) {
    const i = this._loadAdded(e);
    t in i && (delete i[t], this._saveMarks(jt, e, i));
  }
  _markRemoved(e, t) {
    if (!t) return;
    const i = this._loadRemoved(e);
    i[t] = Date.now(), this._saveRemoved(e, i);
  }
  _unmarkRemoved(e, t) {
    const i = this._loadRemoved(e);
    t in i && (delete i[t], this._saveRemoved(e, i));
  }
  async getLocalFavorites(e) {
    return this._loadLocal(e);
  }
  // Nimmt ein Reiseobjekt oder einen Reisecode. Abgleich über favKey, nicht über
  // trip.id (siehe favKey: die id ist bei allen Reisen dieselbe Kundennummer).
  isTripFavorited(e, t) {
    const i = typeof t == "object" ? this.favKey(t) : t;
    return i ? (this._loadLocal(e) || []).some((o) => this.favKey(o) === i) : !1;
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
    this._unmarkRemoved(e, r), this._markAdded(e, r);
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
    const i = this._loadLocal(e) || [], r = this.favKey(t), o = i.find((n) => this.favKey(n) === r);
    if (!r || !o) return !1;
    const a = i.filter((n) => this.favKey(n) !== r);
    if (this._unmarkAdded(e, r), this._markRemoved(e, r), this._saveLocal(e, a), o) {
      const n = this.favKey(o);
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
    return e ? `${Xt}${e}` : `${Xt}anonymous`;
  }
  getLastUserId() {
    try {
      return localStorage.getItem(Ci);
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
      const o = ((t = r == null ? void 0 : r.state) == null ? void 0 : t.theme) || localStorage.getItem("selectedTheme") || "twerenbold", a = ((i = r == null ? void 0 : r.state) == null ? void 0 : i.apiMode) || (P == null ? void 0 : P.mode) || "demo";
      return Ne(a, o);
    }
    return Ne((P == null ? void 0 : P.mode) || "demo", null);
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
        this.revalidateFavorites(e);
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
      const s = await P.addFavorite(e, n), c = this.favKey(t);
      let p = this._loadLocal(e) || [];
      p = p.map((d) => this.favKey(d) === c ? {
        ...d,
        serverId: s.id || s.favoriteId || s._id || s.id,
        syncStatus: "synced",
        serverFavorite: s,
        // Update trip with server response if available
        trip: s.trip || d.trip
      } : d), this._saveLocal(e, p), p.some((d) => this.favKey(d) === c) && this._markAdded(e, c);
    } catch (o) {
      const a = this.favKey(t);
      let n = this._loadLocal(e) || [];
      n = n.map((s) => this.favKey(s) === a ? { ...s, syncStatus: "error" } : s), this._saveLocal(e, n), console.warn("Failed to sync favorite with server", o);
    }
  }
  async _syncRemove(e, t) {
    try {
      await P.removeFavorite(e, t);
      let i = this._loadLocal(e) || [];
      i = i.filter((r) => this.favKey(r) !== t), this._saveLocal(e, i);
    } catch (i) {
      console.warn("Failed to remove favorite on server", i);
      let r = this._loadLocal(e) || [];
      r = r.map((o) => this.favKey(o) === t ? { ...o, syncStatus: "error" } : o), this._saveLocal(e, r);
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
        const r = await P.getFavorites(e);
        if (r === null) {
          console.warn("⚠️ favoritesService.revalidateFavorites: server fetch failed; skipping merge");
          return;
        }
        if (Array.isArray(r) && r.length, !Array.isArray(r)) return;
        const o = this._loadLocal(e) || [], a = new Set(r.map((f) => this.favKey(f)).filter(Boolean)), n = this._loadAdded(e);
        let s = !1;
        Object.keys(n).forEach((f) => {
          a.has(f) && (delete n[f], s = !0);
        }), s && this._saveMarks(jt, e, n);
        let c = o.map((f) => {
          const v = this.favKey(f), y = v && r.find((S) => this.favKey(S) === v);
          return y ? {
            ...f,
            serverId: y.id || y.favoriteId,
            serverFavorite: y,
            syncStatus: "synced",
            // Update trip with server response (now includes full trip structure)
            trip: y.trip || f.trip
          } : f.syncStatus === "pending" || f.syncStatus === "error" || v && n[v] ? f : null;
        }).filter(Boolean);
        const p = this._loadRemoved(e);
        let d = !1;
        Object.keys(p).forEach((f) => {
          a.has(f) || (delete p[f], d = !0);
        }), d && this._saveRemoved(e, p), r.forEach((f) => {
          var x, E, I, Y, he;
          const v = ((x = f.trip) == null ? void 0 : x.id) || ((E = f.meta) == null ? void 0 : E.tripId);
          if (!v) return;
          const y = this.favKey(f) || v;
          if (p[y]) return;
          c.some((yt) => this.favKey(yt) === y) || c.push({
            tripId: v,
            id: v,
            code: ((I = f.trip) == null ? void 0 : I.productCode) || ((Y = f.trip) == null ? void 0 : Y.code) || ((he = f.meta) == null ? void 0 : he.tripCode) || null,
            serverId: f.id || f.favoriteId,
            serverFavorite: f,
            syncStatus: "synced",
            trip: f.trip,
            // Store trip in trips API structure
            addedAt: f.createdAt || (/* @__PURE__ */ new Date()).toISOString()
          });
        });
        const g = JSON.stringify(o), h = JSON.stringify(c);
        g !== h && this._saveLocal(e, c);
      } catch (i) {
        console.warn("Failed to revalidate favorites with server", i);
      } finally {
        this._isRevalidating = !1;
      }
    }
  }
}
const Me = new $a(), Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  favoritesService: Me
}, Symbol.toStringTag, { value: "Module" })), gt = class gt extends Oe {
  constructor() {
    super();
    D(this, "_handleGlobalWatchlistUpdate", () => {
      this._globalUpdateTimer && clearTimeout(this._globalUpdateTimer), this._globalUpdateTimer = setTimeout(() => {
        this.loadData();
      }, 500);
    });
    this.merkliste = [], this.isLoading = !1, this.isRemoving = null, this.languageConfig = {}, this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = ai();
  }
  async connectedCallback() {
    super.connectedCallback(), Q("favorites", this.apiMode, this.theme) && (await this.loadConfigurations(), this._favoritesUnsub = Me.onUpdate(({ userId: t, items: i }) => {
      t === this._userId() && (this.merkliste = (i || []).map((r) => this._mapToUiItem(r)), this.requestUpdate());
    }), await this.loadData(), typeof window < "u" && window.addEventListener("twerenbold:watchlist-updated", this._handleGlobalWatchlistUpdate));
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
      const i = await Me.getLocalFavorites(t);
      i && i.length > 0 ? (this.merkliste = (i || []).map((r) => this._mapToUiItem(r)), this.isLoading = !1) : this.isLoading = !0, (t || this.apiMode === "demo") && await Me.revalidateFavorites(t);
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
      await Me.revalidateFavorites(t);
      const i = await Me.getLocalFavorites(t);
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
      const c = Me.getLastUserId();
      return c && console.warn("⚠️ Favorites: Using fallback userId from favorites cache", c), c;
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
      key: Me.favKey(t) || i.id || t.tripId || t.id,
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
    if (this.isRemoving !== null || !t) return;
    const i = this.merkliste.find((o) => o.key === t), r = i ? i.title : "Reise";
    this.isRemoving = t;
    try {
      if (!i)
        throw new Error("Item not found");
      await new Promise((a) => setTimeout(a, 500));
      const o = this._userId();
      await Me.removeFavoriteLocal(o, i), this.merkliste = this.merkliste.filter((a) => a.key !== t);
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
      await new Promise((r) => setTimeout(r, 500)), this.merkliste = this.merkliste.filter((r) => r.id !== t), this._showSuccess(
        "Aus Merkliste entfernt",
        `"${i}" wurde erfolgreich aus Ihrer Merkliste entfernt.`
      );
    } catch (r) {
      throw console.error("Error removing item:", r), r;
    }
  }
  render() {
    return Q("favorites", this.apiMode, this.theme) ? this.needsAuth || this.showAuthOverlay ? m`<div class="merkliste-page merkliste-page--auth">${this.renderAuthOverlay()}</div>` : m`
      <div class="merkliste-page">
        <div class="merkliste-header">
          <h1 class="merkliste-title page-title">${this.getText("pageTitle")}</h1>
          <p class="merkliste-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>
        </div>

        ${this.isLoading ? m`
          <div class="merkliste-list">
            ${Array.from({ length: 6 }).map((t, i) => m`
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

      ${this.isLoading ? m`<loader-component overlay message=${this.getText("loading")}></loader-component>` : ""}
      <auth-notification-component></auth-notification-component>
      ${this.renderAuthOverlay()}
    ` : m``;
  }
  renderEmptyState() {
    var i, r;
    const t = ((r = (i = Ne(this.apiMode, this.theme)) == null ? void 0 : i.favorites) == null ? void 0 : r.websiteWishlist) || null;
    return m`
      <div class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="empty-title">${this.getText("emptyTitle")}</h3>
        <p class="empty-text">${this.getText("emptyText")}</p>
        ${t ? m`<a class="btn btn-primary empty-link" href="${t.url}">${t.label}</a>` : ""}
      </div>
    `;
  }
  renderMerklisteGrid() {
    const t = (a) => {
      var n, s;
      return a.brand || ((n = a.provider) == null ? void 0 : n.code) || ((s = a.provider) == null ? void 0 : s.name);
    }, i = ji(this.merkliste, this.theme, {
      getProvider: t,
      getDate: (a) => a.departureDate || a.date,
      getPrice: (a) => a.price,
      debug: !0
    }), r = i.filter((a) => Qe(t(a), this.theme) === 1), o = i.filter((a) => Qe(t(a), this.theme) !== 1);
    return m`
      <div class="merkliste-list ${this._suppressTransitions ? "no-transition" : ""}">
        ${Or(r, (a) => a.key, (a) => this.renderMerklisteItem(a))}
        ${r.length > 0 && o.length > 0 ? m`
          <div class="group-divider">
            <p class="group-divider-title page-subtitle">${this.getText("additionalTripsHeadline", "Weitere Reisen der Twerenbold Gruppe")}</p>
          </div>
        ` : ""}
        ${Or(o, (a) => a.key, (a) => this.renderMerklisteItem(a))}
      </div>
    `;
  }
  renderMerklisteItem(t) {
    const i = this.isRemoving === t.key;
    return m`
      <div class="merkliste-item ${i ? "removing" : ""}">
        <img src="${t.image}" alt="Bild einer Reise nach ${t.title}" class="item-image" />
        <div class="item-content">
          ${this._renderProviderHtml(t.provider)}
          <h3 class="item-title">${t.title}</h3>
          ${t.code ? ho(t.id) : ""}
          <p class="item-duration">${t.duration} ${this.getText("days")}</p>
        </div>

        <div class="item-meta">
        <div class="item-price">
          <p class="price-label">ab</p>
          <p class="price-amount">${Xi(t.price)}</p>
        </div>
          <div class="item-actions">
            <a href="${t.link}" target="_blank" class="btn btn-primary">
              ${this.getText("viewTrip")}
            </a>
            <button
              class="btn btn-remove"
              @click=${() => this.handleRemove(t.key)}
              ?disabled=${this.isRemoving !== null}
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
      const i = Et(t.name || t.code);
      return m`
        <span target="_blank" style="color: var(--text-secondary, #6b7280); text-decoration:none; white-space:nowrap; display:block; margin-bottom:0.25rem;" class="item-brand-simple with-favicon">
        <favicon-component brand=${t.name} size=24 alt="${t.name}"></favicon-component>
        <strong>${i}</strong>
        </span>
      `;
    }
    return m`
      <span class="item-brand-simple" style="color: var(--text-secondary, #6b7280); display:block; margin-bottom:0.25rem;">
        <strong>${Et(t)}</strong>
      </span>
    `;
  }
};
D(gt, "properties", {
  merkliste: { type: Array },
  isLoading: { type: Boolean },
  isRemoving: { type: String },
  languageConfig: { type: Object },
  demoData: { type: Object }
}), D(gt, "styles", [
  ct(gt, gt, "styles"),
  ae`
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
      font-weight: var(--account-card-title-font-weight, 700);
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
      font-weight: var(--account-section-title-font-weight, 600);
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
let Wi = gt;
customElements.get("favorites-list") || customElements.define("favorites-list", Wi);
const Wr = {
  100: "newsletter_twerenbold",
  110: "newsletter_velo",
  200: "newsletter_imbach",
  300: "newsletter_excellence",
  500: "newsletter_voegele"
}, Oa = {
  1: "twerenbold",
  2: "imbach",
  3: "excellence",
  5: "voegele"
}, ki = [
  "M28.6892 14.1345C26.6291 15.3866 25.1967 16.2137 22.4803 17.1249C20.9659 17.6328 19.3869 18.0156 16.7324 18.2856C16.7324 18.2856 18.2861 18.7458 20.6153 18.8896C22.3114 18.9949 24.1662 19.0802 26.5671 18.8738C31.8474 18.4196 34.8145 17.3856 39.7792 13.5973C43.0706 11.0861 45.9938 8.77582 48.8267 7.3196C54.5524 4.37654 58.9996 5.38369 58.9996 5.38369C58.9996 5.38369 55.3206 4.27308 53.0552 4.01237C47.4281 3.36474 42.7894 4.33293 36.6484 8.5202C34.6068 9.91194 31.8062 12.2399 28.6892 14.1345Z",
  "M34.4194 1.51885C37.9943 0.500098 40.3301 0.836898 40.3301 0.836898C40.3301 0.836898 37.6511 0 33.0929 0C27.2045 0 22.6463 1.57081 16.5978 6.00256C14.2773 7.70327 10.4744 10.3838 7.19878 12.0826C3.04019 14.2393 0 14.4504 0 14.4504C0 14.4504 3.16554 14.9927 7.08037 14.8401C9.26026 14.7547 11.2316 14.2635 13.2107 13.5551C15.4928 12.7386 19.0432 10.5285 21.0436 9.06021C24.9478 6.19602 30.3154 2.68837 34.4194 1.51885Z",
  "M35.1285 7.80764C35.5739 7.48569 36.2825 6.99904 37.2076 6.41869C38.603 5.54328 40.7834 4.27077 42.979 3.57026C46.3684 2.48888 49.725 2.72502 49.725 2.72502C49.725 2.72502 44.7667 1.2957 39.4564 1.94472C34.938 2.49723 31.6138 3.57676 24.5552 8.36387C21.6459 10.3369 17.2828 13.9271 12.1895 15.4381C9.67842 16.1827 7.51379 16.2764 7.51379 16.2764C7.51379 16.2764 10.6548 17.3791 15.9207 16.8994C18.645 16.6512 20.4743 16.2996 22.5371 15.567C25.2725 14.5956 27.1536 13.3764 28.97 12.2269C30.9348 10.9836 34.3445 8.37454 35.1285 7.80764Z"
], Ua = {
  twerenbold: "twr",
  imbach: "imbach",
  excellence: "excellence",
  voegele: "voegele"
};
function vo(l) {
  const e = Math.floor(Number(l) / 100);
  return Oa[e] || "";
}
function Wa(l) {
  return Ua[vo(l)] || "mail";
}
const pt = class pt extends Oe {
  constructor() {
    super(), this.apiBaseUrl = "/api/v1", this.subscriptions = {
      general: !0,
      accommodations: !0,
      flights: !1,
      rentalCars: !1
    }, this.isLoading = !1, this.isSaving = !1, this.showSuccess = !1, this.languageConfig = {}, this.languageConfig = {}, this.newsletterFeeds = [], this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = ai(), this.voegeleBaseUrl = "https://staging.voegele-reisen.ch", this.NEWSLETTER_CODES = {
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
      this.isLoading = !0;
      return;
    }
    this.isLoading = !0;
    try {
      const { apiService: r } = await Promise.resolve().then(() => ie);
      this._lastLoadedUserId = e;
      const o = await r.getNewsletterSubscriptions(e);
      this.newsletterFeeds = Array.isArray(o) ? o : [];
      const a = {};
      if (Array.isArray(o))
        for (const n of o) {
          const s = Number((n == null ? void 0 : n.newsletterCode) || (n == null ? void 0 : n.id)), c = !!(n != null && n.isRegistered);
          a[s] = c;
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
    e && e !== this._lastLoadedUserId && (this._lastLoadedUserId, this.loadData());
  }
  async loadSubscriptionsFromAPI() {
    var e, t;
    try {
      const { apiService: i } = await Promise.resolve().then(() => ie), r = ((t = (e = this.appState) == null ? void 0 : e.accountProfile) == null ? void 0 : t.id) || null;
      if (!r) {
        console.warn("NewsletterSignup: No user id available for loading subscriptions.");
        return;
      }
      const o = await i.getNewsletterSubscriptions(r);
      this.newsletterFeeds = Array.isArray(o) ? o : [];
      const a = {};
      if (Array.isArray(o))
        for (const n of o) {
          const s = Number((n == null ? void 0 : n.newsletterCode) || (n == null ? void 0 : n.id)), c = !!(n != null && n.isRegistered);
          a[s] = c;
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
    this.subscriptions = { ...this.subscriptions, [String(e)]: i }, this._toggleTimeouts || (this._toggleTimeouts = /* @__PURE__ */ new Map());
    const r = String(e);
    clearTimeout(this._toggleTimeouts.get(r)), this._toggleTimeouts.set(r, setTimeout(async () => {
      var o, a, n, s, c, p, d, g;
      this._toggleTimeouts.delete(r);
      try {
        const { apiService: h } = await Promise.resolve().then(() => ie), f = ((a = (o = this.appState) == null ? void 0 : o.accountProfile) == null ? void 0 : a.id) || null;
        if (i ? await h.registerNewsletter(f, Number(e)) : await h.removeNewsletter(f, Number(e)), Number(e) === 500) {
          let y = ((s = (n = this.appState) == null ? void 0 : n.accountProfile) == null ? void 0 : s.email) || ((p = (c = this.appState) == null ? void 0 : c.authUser) == null ? void 0 : p.username) || ((g = (d = this.appState) == null ? void 0 : d.authUser) == null ? void 0 : g.email);
          if (y)
            try {
              `${y}`, await this._sendVoegeleRequest(i ? "subscribe" : "unsubscribe", y);
            } catch (S) {
              console.error("Failed to update Vögele specific newsletter:", S);
            }
          else
            console.warn("Skipping Vögele request: No email address available");
        }
        const v = Wr[Number(e)];
        this.apiMode === "demo" && (this.isSaving = !0, await new Promise((y) => setTimeout(y, 500)), this.isSaving = !1), this.showSuccessMessage();
      } catch (h) {
        console.error("Failed to update newsletter subscription:", h), this._showError("Fehler", "Abonnement konnte nicht aktualisiert werden"), this.subscriptions = { ...this.subscriptions, [String(e)]: !i };
      }
    }, 1500));
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
      const { apiService: i } = await Promise.resolve().then(() => ie), r = ((t = (e = this.appState) == null ? void 0 : e.accountProfile) == null ? void 0 : t.id) || null;
      if (!r)
        throw new Error("No user ID available");
      for (const [o, a] of Object.entries(this.subscriptions)) {
        const n = Number(o);
        if (n)
          try {
            a ? await i.registerNewsletter(r, n) : await i.removeNewsletter(r, n);
            const s = Wr[n];
            s && te.updateUserProperties({ [s]: a });
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
    const { apiService: i } = await Promise.resolve().then(() => ie), r = ((a = (o = this.appState) == null ? void 0 : o.accountProfile) == null ? void 0 : a.id) || null;
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
    return Q("newsletter", this.apiMode, this.theme) ? this.needsAuth || this.showAuthOverlay ? m`<div class="newsletter-page newsletter-page--auth">${this.renderAuthOverlay()}</div>` : this.isLoading ? m`
        <div class="newsletter-page">
           <div class="newsletter-header">
                  <h1 class="newsletter-title page-title">${this.getText("pageTitle")}</h1>
          <p class="newsletter-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>

  
            
        </div>

        </div>
        <!-- Render skeletons for newsletter items while loading -->
        <div class="newsletter-grid" style="margin-top: 1.5rem;">
          <div class="newsletter-main">
            ${Array.from({ length: 6 }).map((e, t) => m`
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
      ` : m`
      <div class="newsletter-page">
        <div class="newsletter-header">
          <h1 class="newsletter-title page-title">${this.getText("pageTitle")}</h1>
          <p class="newsletter-subtitle page-subtitle">${this.getText("pageSubtitle")}</p>

              ${this.showSuccess ? m`
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
      return ji(e, this.theme, {
        getProvider: (i) => {
          const r = Number(i.newsletterCode || i.id);
          return vo(r);
        },
        priceFallback: !1,
        debug: !0
      }).map((i) => {
        const r = Number(i.newsletterCode || i.id), o = Wa(r), a = i.category || this._categoryForCode(r), n = i.newslettername || (a ? this.getText(`${a}Title`, "newsletter") : null) || `Newsletter ${r}`, s = i.newsletterdescription || (a ? this.getText(`${a}Description`, "newsletter") : "") || "";
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
    ` : m``;
  }
  renderSubscriptionItem(e, t, i, r) {
    const o = this.subscriptions[e], a = this.isSaving;
    return m`
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
      mail: m`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z"></path>
      </svg>`,
      home: m`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
      </svg>`,
      plane: m`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M235.58,128.84,160,91.06V48a32,32,0,0,0-64,0V91.06L20.42,128.84A8,8,0,0,0,16,136v32a8,8,0,0,0,9.57,7.84L96,161.76v18.93L82.34,194.34A8,8,0,0,0,80,200v32a8,8,0,0,0,11,7.43l37-14.81,37,14.81A8,8,0,0,0,176,232V200a8,8,0,0,0-2.34-5.66L160,180.69V161.76l70.43,14.08A8,8,0,0,0,240,168V136A8,8,0,0,0,235.58,128.84ZM224,158.24l-70.43-14.08A8,8,0,0,0,144,152v32a8,8,0,0,0,2.34,5.66L160,203.31v16.87l-29-11.61a8,8,0,0,0-5.94,0L96,220.18V203.31l13.66-13.65A8,8,0,0,0,112,184V152a8,8,0,0,0-9.57-7.84L32,158.24v-17.3l75.58-37.78A8,8,0,0,0,112,96V48a16,16,0,0,1,32,0V96a8,8,0,0,0,4.42,7.16L224,140.94Z"></path>
      </svg>`,
      car: m`<svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
        <path d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"></path>
      </svg>`,
      // icons for stakeholder newsletters: use favicon component for mapping
      twr: m`<favicon-component brand="twr" size=${t} alt="Twerenbold"></favicon-component>`,
      imbach: m`<favicon-component brand="imbach" size=${t} alt="Imbach"></favicon-component>`,
      // KK-230: Schiffspost Excellence trägt die goldene Welle der Website
      // (Sprite-Symbol «wave» von excellence.ch), nicht das Favicon.
      excellence: m`<svg class="wave-icon" viewBox="0 0 59 19" width=${t} height=${Math.round(t * 19 / 59)} role="img" aria-label="Schiffspost Excellence"><path d="${ki[0]}" fill="currentColor"></path><path d="${ki[1]}" fill="currentColor"></path><path d="${ki[2]}" fill="currentColor"></path></svg>`,
      voegele: m`<favicon-component brand="vogele" size=${t} alt="Vögele"></favicon-component>`
    };
    if (typeof e == "string") {
      const r = e.trim().toLowerCase();
      if (r.startsWith("http") || r.includes("."))
        return m`<favicon-component url="${e}" size=${t} alt="${e}"></favicon-component>`;
    }
    return i[e] || i.mail;
  }
};
D(pt, "properties", {
  subscriptions: { type: Object },
  newsletterFeeds: { type: Array },
  isLoading: { type: Boolean },
  isSaving: { type: Boolean },
  showSuccess: { type: Boolean },
  languageConfig: { type: Object },
  demoData: { type: Object },
  voegeleBaseUrl: { type: String }
}), D(pt, "styles", [
  ct(pt, pt, "styles"),
  ae`
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
      color: #b59752; /* Excellence-Markenfarbe, unabhängig vom Seitentheme (KK-252). */
    }

    .subscription-text h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
      font-weight: var(--account-section-title-font-weight, 600);
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
      font-weight: var(--account-section-title-font-weight, 600);
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
let Fi = pt;
customElements.get("newsletter-signup") || customElements.define("newsletter-signup", Fi);
class zi extends Ue {
  constructor() {
    super(), this.theme = "twerenbold", this.apiMode = "demo", this.userId = "", this.clubData = null, this.languageConfig = null, this.loading = !1, this.error = null, this.apiBaseUrl = "http://localhost:3000/v1", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = ai();
  }
  async connectedCallback() {
    super.connectedCallback(), await Yi(), this.theme && qt(this.theme), Q("clubStatus", this.apiMode, this.theme) && await this.loadClubData();
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
      return m`
        <div class="progress-text">
          ${this.getText("club.maxStatusReached", "Höchster Status erreicht!")}
        </div>
      `;
    const { percentage: e, daysNeeded: t, nextMilestone: i } = this.clubData.progressToNext;
    return m`
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
    return this.clubData.allStatuses ? m`
      <div class="status-levels">
        ${this.clubData.allStatuses.map((e, t) => {
      const i = e.level === this.clubData.currentStatus.level, r = this.clubData.totalTravelDays >= e.minTravelDays;
      return m`
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
    return Q("clubStatus", this.apiMode, this.theme) ? this.loading ? m`<div class="loading">${this.getText("club.loading", "Lade Club-Daten...")}</div>` : this.error ? m`<div class="error">${this.error}</div>` : this.clubData ? m`
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
            ${this.clubData.benefits.map((e) => m`
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
    ` : m`<div class="error">${this.getText("club.noData", "Keine Club-Daten verfügbar")}</div>` : m``;
  }
}
D(zi, "properties", {
  theme: { type: String },
  // `apiMode` supports values: 'api' | 'demo' | 'local'
  apiMode: { type: String, attribute: "api-mode" },
  userId: { type: String },
  clubData: { type: Object },
  languageConfig: { type: Object },
  loading: { type: Boolean },
  error: { type: String }
}), D(zi, "styles", [
  wt,
  ae`
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
      font-weight: var(--account-section-title-font-weight, 700);
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
customElements.get("club-status-component") || customElements.define("club-status-component", zi);
const mt = class mt extends Oe {
  constructor() {
    super(), this.logger = De("AccountOverview"), this.userName = "", this.localBaseUrl = "http://localhost:3000/v1", this.demoBaseUrl = "https://xitami.github.io/TWR-Account-Components", this.mode = "live", this.authComponent = null, this.languageConfig = {}, this.demoData = {}, this.loading = !1, this.showAuthOverlay = !1;
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
    var n, s, c, p, d;
    (n = super.appContextChanged) == null || n.call(this, e, t);
    const i = (s = t == null ? void 0 : t.state) == null ? void 0 : s.accountProfile, r = (c = e == null ? void 0 : e.state) == null ? void 0 : c.accountProfile, o = (p = t == null ? void 0 : t.state) == null ? void 0 : p.accountClubStatus, a = (d = e == null ? void 0 : e.state) == null ? void 0 : d.accountClubStatus;
    (r !== i || a !== o) && this._applyAccountState();
  }
  navigateTo(e) {
    window.location.hash = `#${e}`;
  }
  render() {
    var e, t, i, r, o, a, n;
    try {
      if (this.logger.debug("AccountOverviewComponent render called, apiMode:", this.apiMode, "needsAuth:", this.needsAuth), this.loading)
        return this.logger.debug("Returning loading state"), m`<div class="loading">${this.getText("loading")}</div>`;
      if (this.needsAuth || this.showAuthOverlay)
        return this.logger.debug("Rendering auth overlay (session required)"), m`<div class="overview-container overview-container--auth">${this.renderAuthOverlay()}</div>`;
      this.logger.debug("Rendering main content");
      const s = ((e = this.appState) == null ? void 0 : e.accountClubStatus) || this.demoData.clubMembership, c = this.getText("welcomeMessage"), p = (t = this.userName) == null ? void 0 : t.trim(), d = (r = (i = this.appState) == null ? void 0 : i.accountProfile) == null ? void 0 : r.id, g = typeof d == "string" ? d.trim() : typeof d == "number" && Number.isFinite(d) ? String(d) : "";
      return m`
      <div class="overview-container">
        <div class="overview-header">
          <h1 class="overview-title page-title">${this.getText("pageTitle")}</h1>
          <p class="overview-subtitle page-subtitle">
            ${p ? `${c} ${p}!` : `${c}!`}
          </p>
          ${g ? m`<p class="overview-customer-number">${this.getText("customerNumberLabel")}: ${g}</p>` : ""}
        </div>
 <!-- Main Overview Cards -->
        <div class="overview-grid">
          <!-- Trips Card - Only show if there are trips -->
          ${((a = (o = this.appState) == null ? void 0 : o.trips) == null ? void 0 : a.length) > 0 ? m`
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
               <!-- ${(n = this.appState) != null && n.hasFavorites ? m`
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
        ${Q("clubStatus", this.apiMode, this.theme) && s && (s.memberId || s.currentStatus) ? m`
          <div class="overview-card club-status-card animate-in">
            <div class="club-status-header">
              <div>
                <h2 class="club-level">${s.currentStatus.name}</h2>
                <p class="club-member-id">${this.getText("memberId")}: ${s.memberId}</p>
              </div>
              <div class="club-stats">
                <div class="stat-item">
                  <p class="stat-number">${s.totalTravelDays}</p>
                  <p class="stat-label">${this.getText("totalTravelDays")}</p>
                </div>
                <div class="stat-item">
                  <p class="stat-number">${s.currentYearTravelDays}</p>
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
    } catch (s) {
      return this.logger.error("Error in AccountOverviewComponent render:", s), m`<div class="error">Fehler beim Laden der Übersicht: ${s.message}</div>`;
    }
  }
};
D(mt, "properties", {
  userName: { type: String },
  languageConfig: { type: Object },
  demoData: { type: Object },
  loading: { type: Boolean },
  showAuthOverlay: { type: Boolean }
}), D(mt, "styles", [
  ct(mt, mt, "styles"),
  wt,
  ae`
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

    .overview-header .overview-customer-number {
      margin: var(--spacing-sm, 0.5rem) 0 0;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-normal, 400);
      line-height: 1.5;
      color: var(--text-secondary, #6b7280);
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
      font-weight: var(--account-card-title-font-weight, var(--font-weight-bold));
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
let Hi = mt;
customElements.get("account-overview-component") || customElements.define("account-overview-component", Hi);
class Fa {
  constructor(e, t) {
    this.verify = e, this.apply = t, this.generation = 0, this.pending = null;
  }
  cancel() {
    this.generation++;
  }
  refresh(e) {
    if (this.pending) return this.pending;
    if (typeof e != "string" || !e.trim() || e.length > 320) return Promise.resolve(!1);
    const t = this.generation;
    return this.pending = Promise.resolve().then(() => this.verify(e.trim())).then(async (i) => t !== this.generation || !(i != null && i.account) ? !1 : (await this.apply(i, () => t === this.generation), t === this.generation)).catch(() => !1).finally(() => {
      this.pending = null;
    }), this.pending;
  }
}
const za = ["twerenbold.ch", "imbach.ch", "excellence.ch", "mittelthurgau.ch", "voegele-reisen.ch"], Ha = ["", "www.", "dev.", "staging.", "reisemarkt."], Ba = /* @__PURE__ */ new Set([
  ...za.flatMap((l) => Ha.map((e) => e + l)),
  // Explicit staging booking origins (no wildcard subdomain acceptance).
  "staging.reisemarkt.twerenbold.ch",
  "staging.reisemarkt.imbach.ch",
  // Existing booking destinations in security-config.js.
  "ibe.voegele-reisen.ch",
  "voegelereisen-ibe.stg.tripbuilder.app",
  "excellence-reisen.ch",
  "www.excellence-reisen.ch"
]), ii = "twerenbold:logout-return", Dt = "twerenbold:booking-logout", Ga = 7200 * 1e3;
function vt(l, e = window.location.href) {
  try {
    if (typeof l != "string" || !l || l.length > 8192) return null;
    const t = new URL(l, e), i = new URL(e).origin;
    return t.username || t.password || t.protocol !== "https:" && !(t.protocol === "http:" && t.origin === i && ["localhost", "127.0.0.1"].includes(t.hostname)) || t.origin !== i && (!Ba.has(t.hostname) || t.port) ? null : t.href;
  } catch {
    return null;
  }
}
function wo(l, e) {
  try {
    const t = JSON.parse(l.getItem(e));
    if (t && Number.isFinite(t.created) && Date.now() >= t.created && Date.now() - t.created < Ga) return t;
    l.removeItem(e);
  } catch {
  }
  return null;
}
function Ya(l = window) {
  try {
    const e = new URL(l.location.href);
    if (!e.searchParams.has("logoutReturnUrl")) return;
    const t = vt(e.searchParams.get("logoutReturnUrl"), l.location.href);
    l.sessionStorage.removeItem(ii), t && l.sessionStorage.setItem(ii, JSON.stringify({ url: t, created: Date.now() })), e.searchParams.delete("logoutReturnUrl"), l.history.replaceState(l.history.state, "", e.href);
  } catch {
  }
}
function Fr(l = window) {
  const e = wo(l.sessionStorage, ii);
  try {
    l.sessionStorage.removeItem(ii);
  } catch {
    return null;
  }
  return vt(e == null ? void 0 : e.url, l.location.href);
}
function zr(l, e = window) {
  const t = vt(l, e.location.href);
  if (!t) return l;
  try {
    const i = new URL(e.location.href);
    i.searchParams.delete("kkLogout");
    const r = e.crypto.randomUUID(), o = { url: i.href, nonce: r, phase: "left", created: Date.now() };
    e.sessionStorage.setItem(Dt, JSON.stringify(o)), i.searchParams.set("kkLogout", r);
    const a = new URL(t);
    return a.searchParams.set("logoutReturnUrl", i.href), a.href;
  } catch {
    return l;
  }
}
function Va(l, e = window, t = () => {
}, i = !1) {
  const r = wo(e.sessionStorage, Dt);
  if (!r) return !1;
  const o = vt(r.url, e.location.href);
  if (!o || new URL(o).origin !== e.location.origin) return !1;
  const a = new URL(e.location.href);
  if (r.phase === "left" && a.searchParams.get("kkLogout") === r.nonce && (l || i)) {
    if (a.searchParams.delete("kkLogout"), e.history.replaceState(e.history.state, "", a.href), i)
      return e.sessionStorage.removeItem(Dt), t(), !1;
    try {
      e.sessionStorage.setItem(Dt, JSON.stringify({ ...r, phase: "server" }));
    } catch {
      return !1;
    }
    return t(), l.click(), !0;
  }
  if (r.phase === "server") {
    try {
      e.sessionStorage.removeItem(Dt);
    } catch {
      return !1;
    }
    return a.href !== o ? (e.location.replace(o), !0) : !1;
  }
  return !1;
}
function Xa(l = window) {
  const e = new URL(l.location.href), t = /* @__PURE__ */ new Set([
    "twerenbold.ch",
    "www.twerenbold.ch",
    "staging.twerenbold.ch",
    "dev.twerenbold.ch",
    "imbach.ch",
    "www.imbach.ch",
    "staging.imbach.ch",
    "dev.imbach.ch"
  ]);
  return e.protocol !== "https:" || e.port || !t.has(e.hostname) || e.pathname === "/kundenkonto" || e.pathname === "/kundenkonto/" ? null : new URL("/kundenkonto", e.origin).href;
}
function ja(l = window) {
  return {
    "https://staging.reisemarkt.twerenbold.ch": "https://staging.twerenbold.ch/kundenkonto",
    "https://reisemarkt.twerenbold.ch": "https://www.twerenbold.ch/kundenkonto",
    "https://staging.reisemarkt.imbach.ch": "https://staging.imbach.ch/kundenkonto",
    "https://reisemarkt.imbach.ch": "https://www.imbach.ch/kundenkonto"
  }[new URL(l.location.href).origin] || null;
}
const Hr = "twerenboldMsal";
function yo() {
  const l = import.meta.url, e = "msal-browser.js", t = l.match(/^(.*)\/src\/services\/[^/]+$/);
  if (t)
    return t[1] + "/libs/" + e;
  const i = l.substring(0, l.lastIndexOf("/") + 1);
  return new URL("libs/" + e, i).href;
}
function To() {
  var e;
  if (typeof window > "u" || (e = window.msal) != null && e.PublicClientApplication) return Promise.resolve();
  if (window.__twrMsalLibLoadPromise) return window.__twrMsalLibLoadPromise;
  const l = (async () => {
    var r;
    const t = yo(), i = Array.from(document.scripts).find(
      (o) => {
        var a;
        return o.src === t || ((a = o.dataset) == null ? void 0 : a[Hr]) === "true";
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
      n.src = t, n.async = !1, n.dataset[Hr] = "true", n.dataset.loading = "true", n.addEventListener(
        "load",
        () => {
          n.dataset.loaded = "true", delete n.dataset.loading, o();
        },
        { once: !0 }
      ), n.addEventListener("error", a, { once: !0 }), document.head.appendChild(n);
    });
  })();
  return window.__twrMsalLibLoadPromise = l, l;
}
function Br() {
  return yo();
}
class ri extends Ue {
  constructor() {
    super(), this.logger = De("OAuthLogin"), this.theme = "twerenbold", this.isAuthenticated = !1, this.isLoading = !1, this.isMsalInitialized = !1, this.user = null, this.error = null, this.redirectUri = null, this.pendingAction = null, this.cacheLocation = "localStorage", this.passive = !1, this.silentRedirectUri = null, this.msalConfig = null, this.msalInstance = null, this.loginRequest = {
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
      const r = this._getCookieDomain(), o = window.location.hostname, a = window.location.protocol === "https:", n = (p) => {
        const d = [p, "path=/", "SameSite=Lax"];
        return r && d.push(`domain=${r}`), a && d.push("Secure"), d.join("; ");
      };
      document.cookie = n("try_silent_login=true");
      const s = ((e = this.user) == null ? void 0 : e.email) || ((t = this.user) == null ? void 0 : t.username);
      s && (document.cookie = n(`tw_login_hint=${encodeURIComponent(s)}`));
      const c = ((i = this.user) == null ? void 0 : i.name) && this.user.name.trim();
      c && c.toLowerCase() !== "unknown" && (document.cookie = n(`tw_user_name=${encodeURIComponent(c)}`)), this._clearLoggedOutMarker(), this.logger.debug("✅ Auth session cookie set", {
        hostname: o,
        domain: r || "current",
        secure: a,
        hasHint: !!s,
        hasName: !!c,
        sessionCookies: ["try_silent_login", s && "tw_login_hint", c && "tw_user_name"].filter(Boolean)
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
        await this.msalInstance.clearCache({ account: t });
      } catch (i) {
        this.logger.warn("clearCache during logout purge failed", i);
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
  _getSilentRedirectUri() {
    const e = window.location.origin, t = /^(?:(?:staging|www)\.)?reisemarkt\.(twerenbold|imbach)\.ch$/.test(new URL(e).hostname), i = this.silentRedirectUri || (t ? "/callback.aspx" : "/kundenkonto"), r = new URL(i, e);
    if (r.origin !== e) throw new Error("OAuth callback must use the current origin");
    return r.search = "", r.hash = "", r.href;
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
    `${e}`;
    try {
      if (!this.msalInstance) {
        `${e}`;
        return;
      }
      if (t.localAccounts > 0) {
        `${e}`;
        return;
      }
      if (!t.hasTrySilentCookie && !t.loginHint) {
        `${e}`;
        return;
      }
      if (!t.loginHint) {
        `${e}`;
        return;
      }
      const i = this._getSilentRedirectUri();
      `${e}`, t.loginHint, this.loginRequest.scopes;
      const r = await this.msalInstance.ssoSilent({
        scopes: this.loginRequest.scopes,
        loginHint: t.loginHint,
        redirectUri: i
      });
      r != null && r.account ? (`${e}`, r.account.username, r.account.homeAccountId, await this.handleLoginSuccess(r)) : console.warn(`${e} ssoSilent returned without account`, r);
    } catch (i) {
      const r = (i == null ? void 0 : i.errorCode) || "", o = (i == null ? void 0 : i.errorMessage) || (i == null ? void 0 : i.message) || "";
      if (r === "login_required" || r === "interaction_required" || r === "silent_sso_error" || r === "no_account_in_silent_request" || o.includes("AADSTS50058"))
        if (this.passive) {
          `${e}`;
          try {
            window.dispatchEvent(new CustomEvent("twerenbold:silent-sso-unavailable"));
          } catch {
          }
        } else
          `${e}`, this._clearAuthSessionCookie();
      else
        console.error(
          `${e} ❌ unexpected error — code=${r || "(none)"} subError=${(i == null ? void 0 : i.subError) || "(none)"} message=${o || "(none)"}`,
          i
        );
    }
  }
  /**
   * Passiver Modus mit lokalem MSAL-Konto (Secure Design Paket 1).
   *
   * `_attemptCrossSubdomainSilentSSO` überspringt diesen Fall («checkAuthStatus
   * will handle it»), passiv läuft checkAuthStatus aber nie: Header ohne
   * Bestätigung, kein `auth-changed`, Hinweis-Cookie nicht erneuert. Hier daher
   * einmal pro Seitenaufruf `setActiveAccount` + `acquireTokenSilent`.
   * - Erfolg: Benutzer setzen, Hinweis-Cookie erneuern, `auth-changed` feuern.
   * - InteractionRequired bzw. anderer endgültiger Fehler: nicht bestätigt →
   *   `twerenbold:silent-sso-unavailable`. Kein interaktiver Login, kein Retry,
   *   Hinweis-Cookies bleiben (die räumt nur der Ursprungs-Origin).
   * - Transiente Fehler (Timeout/Netz): keine Aussage, der Header bleibt bei
   *   seinen Hinweisen.
   */
  async _confirmExistingAccountPassive() {
    var r, o, a;
    if (this._passiveConfirmAttempted || (this._passiveConfirmAttempted = !0, !this.msalInstance)) return;
    const e = "🔁 [PassiveConfirm]";
    let t = [];
    try {
      t = this.msalInstance.getAllAccounts() || [];
    } catch {
      return;
    }
    if (t.length === 0 || this.isAuthenticated && this.user) return;
    const i = this.msalInstance.getActiveAccount() || t[0];
    try {
      this.msalInstance.setActiveAccount(i);
      const n = { scopes: this.loginRequest.scopes, account: i, forceRefresh: !1, redirectUri: this._getSilentRedirectUri() };
      await this.msalInstance.acquireTokenSilent(n), this.isAuthenticated = !0, this.user = {
        name: i.name || "unknown",
        username: i.username,
        email: i.username,
        id: i.localAccountId || ((r = i.homeAccountId) == null ? void 0 : r.split(".")[0]) || i.oid,
        oid: ((o = i.idTokenClaims) == null ? void 0 : o.oid) || i.oid,
        sub: (a = i.idTokenClaims) == null ? void 0 : a.sub,
        homeAccountId: i.homeAccountId,
        localAccountId: i.localAccountId
      }, this.error = null, `${e}`, this._setAuthSessionCookie();
      try {
        const { apiService: s } = await Promise.resolve().then(() => ie);
        s.setAuthComponent(this);
      } catch (s) {
        this.logger.warn("⚠️ Failed to attach auth component to apiService after passive confirm", s);
      }
      this._dispatchAuthChangedEvent();
    } catch (n) {
      const s = (n == null ? void 0 : n.errorCode) || "", c = (n == null ? void 0 : n.errorMessage) || (n == null ? void 0 : n.message) || "";
      if (s === "monitor_window_timeout" || s === "timed_out" || s === "network_error" || s === "no_network_connectivity" || s === "endpoints_resolution_error" || c.includes("timed_out") || c.includes("Token renewal operation failed due to timeout")) {
        `${e}`;
        return;
      }
      `${e}`;
      try {
        window.dispatchEvent(new CustomEvent("twerenbold:silent-sso-unavailable", {
          detail: { reason: s || "silent-token-failed" }
        }));
      } catch {
      }
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
      const t = Ne(this.apiMode || "demo", this.theme);
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
      (t = window.msal) != null && t.PublicClientApplication || (`${e}`, Br()), await To();
    } catch (i) {
      throw console.error(`${e} ❌ failed to load MSAL from`, Br(), i), i;
    }
  }
  async connectedCallback() {
    if (super.connectedCallback(), oi) return;
    const e = window.location.hash;
    Ya(), this._externalRefreshIds = /* @__PURE__ */ new Set(), this._sessionRefresh = new Fa(async (i) => {
      const r = crypto.randomUUID();
      this._externalRefreshIds.add(r);
      try {
        return await this.msalInstance.ssoSilent({
          scopes: this.loginRequest.scopes,
          loginHint: i,
          correlationId: r,
          redirectUri: this._getSilentRedirectUri()
        });
      } finally {
        this._externalRefreshIds.delete(r);
      }
    }, (i, r) => this.handleLoginSuccess(i, r)), this._onExternalSessionChanged = (i) => {
      var o;
      const r = ((o = i.detail) == null ? void 0 : o.loginHint) || this._readCookie("tw_login_hint");
      if (!this.isMsalInitialized) {
        this._pendingSessionHint = r;
        return;
      }
      this.refreshSession(r);
    }, this._cancelSessionRefresh = () => {
      this._pendingSessionHint = null, this._sessionRefresh.cancel();
    }, window.addEventListener("twerenbold:session-changed", this._onExternalSessionChanged), window.addEventListener("twerenbold:request-logout", this._cancelSessionRefresh), window.addEventListener("twerenbold:post-logout", this._cancelSessionRefresh);
    try {
      await this._ensureMsalLoaded();
    } catch (i) {
      this.logger.error("Failed to load MSAL library — auth flows disabled on this page", i), this.error = "Authentifizierungs-Bibliothek konnte nicht geladen werden", this.isMsalInitialized = !0;
      return;
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
        cacheLocation: this.cacheLocation
      },
      system: {
        iframeBridgeTimeout: 15e3,
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
            var c, p, d;
            try {
              return ((d = (p = (c = o.owner) == null ? void 0 : c.tagName) == null ? void 0 : p.toLowerCase) == null ? void 0 : d.call(p)) || "unknown";
            } catch {
              return "unknown";
            }
          })(),
          passive: !!this.passive
        }), this.msalInstance = o.instance;
      else {
        const c = typeof window < "u" ? window.__twrMsalPromise : null;
        if (c)
          this.logger.info("🔗 Awaiting shared MSAL singleton in-flight from another <oauth-login>", {
            passive: !!this.passive
          }), this.msalInstance = await c;
        else {
          const p = this.msalConfig, d = this, g = (async () => {
            let h;
            return window.msal.PublicClientApplication.createPublicClientApplication ? h = await window.msal.PublicClientApplication.createPublicClientApplication(p) : (h = new window.msal.PublicClientApplication(p), typeof h.initialize == "function" && await h.initialize()), typeof window < "u" && (window.__twrMsal = {
              instance: h,
              clientId: i,
              authority: r,
              owner: d
            }), h;
          })();
          typeof window < "u" && (window.__twrMsalPromise = g), this.logger.info("🛠️ Creating MSAL singleton (first <oauth-login> on page)", {
            passive: !!this.passive
          }), this.msalInstance = await g;
        }
      }
      this.msalInstance && typeof this.msalInstance.addEventCallback == "function" && (this._msalEventCallbackId = this.msalInstance.addEventCallback((c) => {
        var p;
        try {
          const d = c == null ? void 0 : c.eventType, g = c == null ? void 0 : c.payload;
          if ((p = this._externalRefreshIds) != null && p.has((g == null ? void 0 : g.correlationId) || (c == null ? void 0 : c.correlationId))) return;
          if (d === window.msal.EventType.LOGIN_SUCCESS || d === window.msal.EventType.ACQUIRE_TOKEN_SUCCESS)
            if (this.logger.debug("MSAL event: login or acquire token success", d, g), g != null && g.account) {
              const h = this.handleLoginSuccess(g);
              this._pendingLoginSuccessPromise = h;
            } else d === window.msal.EventType.ACQUIRE_TOKEN_SUCCESS && (g != null && g.accessToken) && this.handleLoginSuccess(g);
          if (d === window.msal.EventType.ACQUIRE_TOKEN_FAILURE) {
            const h = c.error, f = (h == null ? void 0 : h.errorMessage) || (h == null ? void 0 : h.message) || "";
            this.logger.warn("MSAL event: acquire token failure", f), f && (f.includes("interaction_required") || f.includes("invalid_grant") || f.includes("AADSTS700084")) && (this.passive ? this.logger.debug("passive mode: ignoring ACQUIRE_TOKEN_FAILURE side-effects") : (this._showSessionExpiredWithAction(), this.isAuthenticated = !1, this.user = null, this._dispatchAuthChangedEvent()));
          }
          (d === window.msal.EventType.LOGOUT_SUCCESS || d === window.msal.EventType.ACTIVE_ACCOUNT_CHANGED) && (this.logger.info("MSAL event: account or logout change - checking auth status"), this.isMsalInitialized && !this._accountStateCheck && (this._accountStateCheck = this.checkAuthStatus().catch((h) => this.logger.warn("Error in checkAuthStatus after MSAL event:", h)).finally(() => {
            this._accountStateCheck = null;
          })));
        } catch (d) {
          this.logger.warn("MSAL event callback error", d);
        }
      }), this.logger.debug("Registered event callback id", this._msalEventCallbackId));
      const n = (c) => {
        try {
          sessionStorage.getItem("twerenbold_pending_auth") === "true" && (this.logger.warn(`⚠️ Clearing pending auth flag (${c})`), sessionStorage.removeItem("twerenbold_pending_auth"), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", { bubbles: !0, composed: !0 })));
        } catch (p) {
          this.logger.warn("⚠️ Could not clear pending auth flag", p);
        }
      }, s = e && (e.includes("code=") || e.includes("state=") || e.includes("error="));
      this.logger.debug(
        "🔍 Calling handleRedirectPromise. Current URL:",
        window.location.href,
        s ? "(using saved hash)" : "(no auth hash saved)"
      ), await this.msalInstance.handleRedirectPromise(s ? { hash: e } : void 0).then(async (c) => {
        if (this.logger.debug("🔍 handleRedirectPromise resolved. Response:", c ? "Present" : "NULL"), this._consumeLogoutIntent(c)) {
          this.logger.info("Returned from logout - cleaning up state"), sessionStorage.removeItem("msal_logout_intent"), this.isAuthenticated = !1, this.user = null, this.pendingAction = null, this.isLoading = !1;
          const d = (function() {
            try {
              return localStorage.getItem("twerenbold_current_user_id");
            } catch {
              return null;
            }
          })();
          try {
            typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_current_user_id"), d && localStorage.removeItem(`twerenbold_token_${d}`);
            for (let h = localStorage.length - 1; h >= 0; h--) {
              const f = localStorage.key(h);
              f && f.startsWith("twerenbold_token_") && localStorage.removeItem(f);
            }
          } catch {
          }
          try {
            const { apiService: h } = await Promise.resolve().then(() => ie);
            if (d) {
              try {
                h._invalidateCacheForUser(d, "logout-redirect");
              } catch (f) {
                this.logger.warn("⚠️ apiService._invalidateCacheForUser failed", f);
              }
              try {
                h._clearStoredUserId();
              } catch (f) {
                this.logger.warn("⚠️ apiService._clearStoredUserId failed", f);
              }
            }
          } catch (h) {
            this.logger.warn("⚠️ Could not run apiService cleanup after logout redirect", h);
          }
          try {
            te.reset();
          } catch (h) {
            this.logger.warn("⚠️ HubspotSPA.reset failed", h);
          }
          try {
            window.dispatchEvent(new CustomEvent("twerenbold:post-logout", { detail: { userId: d }, bubbles: !0 }));
          } catch (h) {
            this.logger.warn("⚠️ post-logout event dispatch failed", h);
          }
          const g = Fr() || Xa();
          g && (this._returningFromLogout = !0, window.location.replace(g));
          try {
            this._dispatchAuthChangedEvent();
          } catch (h) {
            this.logger.warn("⚠️ dispatch auth changed failed", h);
          }
        } else c !== null ? (this.logger.info("✅ handleRedirectPromise returned success", c), await this.handleLoginSuccess(c)) : n("redirect_response_null");
      }).catch((c) => {
        if (c.errorCode === "state_not_found") {
          this.logger.warn("OAuth state not found (likely page reload during auth flow) - ignoring"), this.isLoading = !1, n("state_not_found");
          return;
        }
        if (c.errorCode === "login_required" || c.errorCode === "interaction_required" || (c.errorMessage || "").includes("AADSTS50058")) {
          this.logger.info("No active Azure session (login_required) — user is not signed in"), sessionStorage.removeItem("msal_logout_intent"), localStorage.removeItem("twerenbold_logout_timestamp"), this.isAuthenticated = !1, this.user = null, this.pendingAction = null, this.isLoading = !1, this.error = null;
          try {
            this._dispatchAuthChangedEvent();
          } catch {
          }
          n("no_active_session");
          return;
        }
        this.logger.error("Handle redirect promise error", c), this.error = "Fehler bei der Authentifizierung", this.isLoading = !1, sessionStorage.getItem("twerenbold_pending_auth") === "true" && (this.logger.warn("⚠️ Cleaning up pending auth state after error"), sessionStorage.removeItem("twerenbold_pending_auth"), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", { bubbles: !0, composed: !0 })));
      }), this._pendingLoginSuccessPromise && (await this._pendingLoginSuccessPromise, this._pendingLoginSuccessPromise = null);
      try {
        /[#&](code|id_token|error)=/.test(window.location.hash) && window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );
      } catch {
      }
      if (this._returningFromLogout) return;
      if (await this._purgeMsalCacheAfterLogout(), await this._attemptCrossSubdomainSilentSSO(), this.passive) {
        await this._confirmExistingAccountPassive(), this.logger.debug("passive mode: skipping checkAuthStatus + post-init handlers"), this.isMsalInitialized = !0, this.isLoading = !1, this._pendingSessionHint && this.refreshSession(this._pendingSessionHint);
        return;
      }
      await this.checkAuthStatus(), this.isMsalInitialized = !0, this.isLoading = !1, this._pendingSessionHint && this.refreshSession(this._pendingSessionHint);
      try {
        const c = new URLSearchParams(window.location.search), p = c.get("autoLogin"), d = c.get("autoRegister"), g = c.get("returnUrl");
        if (g)
          try {
            const h = vt(g);
            if (!h) throw new Error("Untrusted return URL");
            this.logger.debug("🔗 Received returnUrl parameter, storing in sessionStorage:", h), window.sessionStorage.setItem("twerenbold:login-return-url", h);
          } catch (h) {
            this.logger.warn("⚠️ Failed to decode or store returnUrl parameter:", h);
          }
        if (p === "true" && !this.isAuthenticated) {
          this.logger.info("🔔 Detected autoLogin parameter - triggering login automatically"), c.delete("autoLogin"), c.delete("returnUrl");
          const h = window.location.pathname + (c.toString() ? "?" + c.toString() : "") + window.location.hash;
          window.history.replaceState({}, "", h), setTimeout(() => this.login(), 100);
        } else if (d === "true" && !this.isAuthenticated) {
          this.logger.info("🔔 Detected autoRegister parameter - triggering register automatically"), c.delete("autoRegister"), c.delete("returnUrl");
          const h = window.location.pathname + (c.toString() ? "?" + c.toString() : "") + window.location.hash;
          window.history.replaceState({}, "", h), setTimeout(() => this.register(), 100);
        }
      } catch (c) {
        this.logger.warn("⚠️ Failed to check auto-login/register parameters:", c);
      }
      try {
        if (sessionStorage.getItem("twerenbold_request_logout") === "true") {
          try {
            sessionStorage.removeItem("twerenbold_request_logout");
          } catch {
          }
          this.logger.info("🔔 Detected pending request-logout flag - performing logout now"), await this._performLogout();
        }
      } catch (c) {
        this.logger.warn("⚠️ Failed to handle pending request-logout flag:", c);
      }
    } catch (i) {
      this.logger.error("MSAL initialization error:", i), this.error = "Fehler bei der Initialisierung der Authentifizierung", this.isMsalInitialized = !0;
    }
  }
  async checkAuthStatus() {
    var e, t, i, r, o, a, n, s, c, p, d;
    if (this.pendingAction !== "logout") {
      if (!this.msalInstance) {
        console.warn("MSAL: No instance available for checkAuthStatus"), this.isAuthenticated = !1, this.user = null;
        return;
      }
      try {
        let g = null;
        try {
          g = this.msalInstance.getActiveAccount();
        } catch (f) {
          if (f.errorCode === "uninitialized_public_client_application") {
            this.logger.debug("⚠️ MSAL not yet initialized in checkAuthStatus - assuming not authenticated");
            return;
          }
          throw f;
        }
        let h = [];
        try {
          h = this.msalInstance.getAllAccounts();
        } catch (f) {
          this.logger.debug("⚠️ MSAL uninitialized in getAllAccounts check", f);
          return;
        }
        if (!g && h.length > 0 && (g = h[0], this.msalInstance.setActiveAccount(g)), g)
          try {
            const f = {
              scopes: this.loginRequest.scopes,
              account: g,
              forceRefresh: !1,
              redirectUri: this._getSilentRedirectUri()
            };
            if (await this.msalInstance.acquireTokenSilent(f), this.pendingAction === "logout") return;
            this.isAuthenticated = !0, this.user = {
              name: g.name || "unknown",
              username: g.username,
              email: g.username,
              // Add technical IDs to prevent session mismatches
              id: g.localAccountId || ((e = g.homeAccountId) == null ? void 0 : e.split(".")[0]) || g.oid,
              oid: ((t = g.idTokenClaims) == null ? void 0 : t.oid) || g.oid,
              sub: (i = g.idTokenClaims) == null ? void 0 : i.sub,
              homeAccountId: g.homeAccountId,
              localAccountId: g.localAccountId
            }, this.error = null, this.logger.info("User authenticated with valid tokens", { name: this.user.name, email: this.user.email, id: this.user.id }), this._setAuthSessionCookie();
            try {
              const { apiService: v } = await Promise.resolve().then(() => ie), y = this.user.id, S = !!this._lastKnownAccountId && this._lastKnownAccountId !== y;
              this._lastKnownAccountId = y, v.setAuthComponent(this), S && this.logger.info("Account changed - notifying API service");
            } catch (v) {
              this.logger.warn("⚠️ Failed to attach auth component to apiService in checkAuthStatus", v);
            }
          } catch (f) {
            const v = (f == null ? void 0 : f.errorCode) || "", y = (f == null ? void 0 : f.errorMessage) || (f == null ? void 0 : f.message) || "";
            if (v === "monitor_window_timeout" || v === "timed_out" || v === "network_error" || v === "no_network_connectivity" || v === "endpoints_resolution_error" || y.includes("timed_out") || y.includes("Token renewal operation failed due to timeout")) {
              this.logger.warn("checkAuthStatus: silent acquire transient failure — keeping cached auth state", v || y), this.isAuthenticated = !0, this.user = {
                name: g.name || "unknown",
                username: g.username,
                email: g.username,
                id: g.localAccountId || ((r = g.homeAccountId) == null ? void 0 : r.split(".")[0]) || g.oid,
                oid: ((o = g.idTokenClaims) == null ? void 0 : o.oid) || g.oid,
                sub: (a = g.idTokenClaims) == null ? void 0 : a.sub,
                homeAccountId: g.homeAccountId,
                localAccountId: g.localAccountId
              }, this.error = null, this._setAuthSessionCookie();
              try {
                const { apiService: x } = await Promise.resolve().then(() => ie);
                x.setAuthComponent(this);
              } catch (x) {
                this.logger.warn("⚠️ Failed to attach auth component to apiService after transient silent failure", x);
              }
              return;
            }
            this.logger.warn("Account tokens invalid/missing for", g == null ? void 0 : g.username, "-", y);
            try {
              await this.msalInstance.clearCache({ account: g });
            } catch (x) {
              this.logger.warn("⚠️ clearCache after auth failure failed", x);
            }
            if (this.msalInstance.getAllAccounts().length > 0) {
              this.logger.info("Stale account removed; another account remains — keeping session");
              return;
            }
            this.isAuthenticated = !1, this.user = null, this._clearAuthSessionCookie();
            try {
              const { apiService: x } = await Promise.resolve().then(() => ie);
              x.setAuthComponent(null);
            } catch (x) {
              this.logger.warn("⚠️ Failed to detach auth component from apiService", x);
            }
          }
        else {
          this.isAuthenticated = !1, this.user = null, this.logger.debug("No user signed in");
          let f = !1;
          try {
            const v = localStorage.getItem(
              `msal.2.token.keys.${((s = (n = this.msalConfig) == null ? void 0 : n.auth) == null ? void 0 : s.clientId) || ""}`
            );
            if (v) {
              const y = JSON.parse(v);
              f = !!((c = y == null ? void 0 : y.idToken) != null && c.length || (p = y == null ? void 0 : y.accessToken) != null && p.length || (d = y == null ? void 0 : y.refreshToken) != null && d.length);
            }
          } catch {
          }
          f ? this.logger.warn("checkAuthStatus: 0 in-memory accounts but localStorage has token-keys — likely MSAL v5 hydration lag, leaving hint cookies in place") : this._clearAuthSessionCookie();
          try {
            const { apiService: v } = await Promise.resolve().then(() => ie);
            v.setAuthComponent(null);
          } catch (v) {
            this.logger.warn("⚠️ Failed to detach auth component from apiService in checkAuthStatus", v);
          }
        }
      } catch (g) {
        this.logger.error("Error checking auth status", g), this.isAuthenticated = !1, this.user = null;
      }
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
        const i = await this.msalInstance.loginPopup({ ...e, redirectUri: this._getSilentRedirectUri() });
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
        account: this.msalInstance.getActiveAccount() || this.msalInstance.getAllAccounts()[0],
        redirectUri: this._getSilentRedirectUri()
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
            const r = await this.msalInstance.loginPopup({ ...i, redirectUri: this._getSilentRedirectUri() });
            this.logger.info("Popup login successful", r), r && this.handleLoginSuccess(r);
          } catch (r) {
            const o = (r == null ? void 0 : r.message) || "";
            if (o.includes("hash_does_not_contain_known_properties") || o.includes("popup_window_error") || o.includes("monitor_popup_timeout") || (r == null ? void 0 : r.errorCode) === "redirect_bridge_timeout" || o.includes("user_cancelled"))
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
  _consumeLogoutIntent(e) {
    const t = sessionStorage.getItem("msal_logout_intent") === "true";
    return e != null && e.account ? (sessionStorage.removeItem("msal_logout_intent"), Fr(), !1) : t;
  }
  async handleLoginSuccess(e, t = () => !0) {
    var o, a, n, s, c, p, d;
    if (!(e != null && e.account) || !t()) return;
    const i = e.account.homeAccountId || e.account.localAccountId;
    if (this._lastProcessedLoginId === i && Date.now() - (this._lastProcessedLoginTime || 0) < 5e3) {
      this.logger.debug("Skipping duplicate login handling for", i);
      return;
    }
    if (this._lastProcessedLoginId = i, this._lastProcessedLoginTime = Date.now(), this.pendingAction = "processing", this.isLoading = !0, this.error = null, this.msalInstance && e.account) {
      if (!t()) return;
      this.msalInstance.setActiveAccount(e.account);
    }
    e.idTokenClaims ? this.user = {
      name: e.idTokenClaims.name || ((o = e.account) == null ? void 0 : o.name),
      email: e.idTokenClaims.preferred_username || ((a = e.account) == null ? void 0 : a.username),
      // Add technical IDs for session management
      id: ((n = e.account) == null ? void 0 : n.localAccountId) || e.idTokenClaims.oid,
      oid: e.idTokenClaims.oid,
      sub: e.idTokenClaims.sub,
      homeAccountId: (s = e.account) == null ? void 0 : s.homeAccountId,
      localAccountId: (c = e.account) == null ? void 0 : c.localAccountId
    } : e.account && (this.user = {
      name: e.account.name,
      email: e.account.username,
      // Add technical IDs for session management
      id: e.account.localAccountId || ((p = e.account.homeAccountId) == null ? void 0 : p.split(".")[0]),
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
    }), this.user, this._lastInteractionRequiredAt = null;
    try {
      const { apiService: g } = await Promise.resolve().then(() => ie);
      if (!t()) return;
      g.setAuthComponent(this), this.logger.debug("Auth component set on apiService after login");
    } catch (g) {
      this.logger.warn("⚠️ Failed to attach auth component to apiService:", g);
    }
    if (sessionStorage.getItem("twerenbold_pending_auth") === "true") {
      try {
        sessionStorage.removeItem("twerenbold_pending_auth");
      } catch (g) {
        console.warn("⚠️ Could not remove pending auth flag", g);
      }
      this.logger.debug("⏳ Waiting for Azure Functions to complete..."), document.dispatchEvent(new CustomEvent("azure-functions-wait-start", {
        bubbles: !0,
        composed: !0
      })), await new Promise((g) => setTimeout(g, 4e3)), document.dispatchEvent(new CustomEvent("azure-functions-wait-end", {
        bubbles: !0,
        composed: !0
      }));
    } else
      this.logger.debug("ℹ️ Skipping Azure Functions wait - not a user-initiated auth flow");
    if (t()) {
      this.isAuthenticated = !0, this.isLoading = !1, this.pendingAction = null, this.logger.info("✅ Login success handling completed"), this._dispatchAuthChangedEvent();
      try {
        (d = this.user) != null && d.email && te.identify(this.user.email);
      } catch (g) {
        this.logger.warn("⚠️ Hubspot identify failed in oauth-login", g);
      }
      this._setAuthSessionCookie(), this._checkAndRedirectToReturnUrl();
    }
  }
  /**
   * Check if there's a stored return URL and redirect to it
   * This is used after successful login to return to the page where the user started
   */
  _checkAndRedirectToReturnUrl() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        const e = vt(window.sessionStorage.getItem("twerenbold:login-return-url"));
        window.sessionStorage.removeItem("twerenbold:login-return-url"), e && (this.logger.info("Found return URL after login, redirecting:", e), window.sessionStorage.removeItem("twerenbold:login-return-url"), setTimeout(() => {
          window.location.href = e;
        }, 500));
      } catch (e) {
        this.logger.warn("Failed to check return URL", e);
      }
  }
  async refreshSession(e) {
    if (this._pendingSessionHint = null, !this.isMsalInitialized || !this.msalInstance) return !1;
    const t = await this._sessionRefresh.refresh(e);
    return window.dispatchEvent(new CustomEvent("twerenbold:session-check-complete", { detail: { confirmed: t } })), t;
  }
  _getLogoutRequest() {
    const e = this.msalInstance.getAllAccounts(), t = this.msalInstance.getActiveAccount() || (e.length === 1 ? e[0] : null);
    return { postLogoutRedirectUri: window.location.origin, ...t ? { account: t } : {} };
  }
  async logout() {
    var e;
    if ((e = this._cancelSessionRefresh) == null || e.call(this), !!this.msalInstance) {
      this.pendingAction = "logout", this.isLoading = !0;
      try {
        sessionStorage.setItem("msal_logout_intent", "true"), this._clearAuthSessionCookie(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
        for (let t = localStorage.length - 1; t >= 0; t--) {
          const i = localStorage.key(t);
          i && (i.includes("_accountProfile_") || i.startsWith("twerenbold_token_")) && localStorage.removeItem(i);
        }
        await this.msalInstance.logoutRedirect(this._getLogoutRequest());
      } catch (t) {
        this.logger.error("Logout error", t), this.pendingAction = null, this.isLoading = !1, this.error = "Fehler beim Abmelden. Bitte versuchen Sie es erneut.", sessionStorage.removeItem("msal_logout_intent");
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
      e && !e.open && (jr(), e.showModal());
    });
  }
  _closeLogoutModal() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.getElementById("logout-dialog");
    e != null && e.open && e.close(), Xr(), this.showLogoutModal = !1;
  }
  async _performLogout() {
    var e;
    if (!this.msalInstance) {
      this.logger.warn("MSAL not initialized, performing fallback logout");
      try {
        this.logout();
      } catch (t) {
        console.warn(t);
      }
      this._closeLogoutModal();
      return;
    }
    (e = this._cancelSessionRefresh) == null || e.call(this), this.pendingAction = "logout", this.isLoading = !0;
    try {
      this._clearAuthSessionCookie(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
      for (let t = localStorage.length - 1; t >= 0; t--) {
        const i = localStorage.key(t);
        i && (i.includes("_accountProfile_") || i.startsWith("twerenbold_token_")) && localStorage.removeItem(i);
      }
      sessionStorage.setItem("msal_logout_intent", "true"), localStorage.setItem("twerenbold_logout_timestamp", Date.now().toString());
      try {
        te.reset();
      } catch {
      }
      await this.msalInstance.logoutRedirect(this._getLogoutRequest());
    } catch (t) {
      this.logger.error("Logout failed", t), this._showSessionExpiredNotification();
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
    var r, o, a;
    if (!this.msalInstance)
      throw new Error("MSAL nicht initialisiert");
    this.pendingAction = e ? "token-refresh" : this.pendingAction, this.logger.debug("_acquireTokenSilent called", { forceRefresh: e, pendingAction: this.pendingAction });
    const t = this.msalInstance.getActiveAccount() || this.msalInstance.getAllAccounts()[0];
    if (!t)
      throw new Error("Kein angemeldetes Konto gefunden");
    const i = {
      scopes: this.loginRequest.scopes,
      account: t,
      forceRefresh: e,
      redirectUri: this._getSilentRedirectUri()
    };
    if (this._lastInteractionRequiredAt && Date.now() - this._lastInteractionRequiredAt < 60 * 1e3)
      throw new Error("INTERACTION_REQUIRED");
    if (e && this._tokenRefreshPromise)
      try {
        return await this._tokenRefreshPromise;
      } catch {
      }
    try {
      let n;
      e ? (n = (async () => this.msalInstance.acquireTokenSilent(i))(), this._tokenRefreshPromise = n) : n = this.msalInstance.acquireTokenSilent(i);
      const s = await n;
      if (this.logger.debug("_acquireTokenSilent response obtained", { hasResponse: !!s, account: ((r = s == null ? void 0 : s.account) == null ? void 0 : r.username) || ((o = s == null ? void 0 : s.account) == null ? void 0 : o.homeAccountId) }), s) {
        const c = s.idTokenClaims ? { name: s.idTokenClaims.name, email: s.idTokenClaims.preferred_username } : null;
        (!this.user || c && c.email !== this.user.email) && await this.handleLoginSuccess(s);
      }
      return s.accessToken;
    } catch (n) {
      console.error("MSAL: acquireTokenSilent failed", n);
      const s = n.errorMessage || n.message || "", c = n.errorCode || "";
      if (((a = window.msal) == null ? void 0 : a.InteractionRequiredAuthError) && n instanceof window.msal.InteractionRequiredAuthError || // MSAL BrowserAuthError codes that mean "no silent recovery possible".
      // `refresh_token_expired` is NOT an InteractionRequiredAuthError and its
      // errorMessage is only a docs URL — so it must be matched by errorCode.
      // Without this it falls through to `throw error`, the stale account /
      // token are never cleaned up, and the UI stays half-logged-in.
      c === "refresh_token_expired" || c === "interaction_required" || c === "login_required" || c === "consent_required" || c === "no_tokens_found" || s.includes("invalid_grant") || s.includes("AADSTS700084") || // SPA refresh token expired
      s.includes("refresh_token_expired") || s.includes("interaction_required") || s.includes("consent_required") || s.includes("login_required")) {
        this.logger.warn("Silent token acquisition failed for account", t == null ? void 0 : t.username, "—", c || s);
        try {
          await this.msalInstance.clearCache({ account: t });
        } catch (d) {
          this.logger.warn("clearCache for failed account failed", d);
        }
        try {
          const d = (t == null ? void 0 : t.localAccountId) || (t == null ? void 0 : t.homeAccountId);
          d && localStorage.removeItem(`twerenbold_token_${d}`);
        } catch {
        }
        if (this._lastInteractionRequiredAt = Date.now(), this._tokenRefreshPromise && (this._tokenRefreshPromise = null), this.msalInstance.getAllAccounts().length > 0)
          throw this.logger.info("Stale account removed; another account remains — keeping session"), new Error("INTERACTION_REQUIRED");
        this.logger.warn("No accounts left after stale-account removal — user is signed out"), this._showSessionExpiredWithAction(), this.isAuthenticated = !1, this.user = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), localStorage.removeItem("twerenbold_userId"), localStorage.removeItem("twerenbold_current_user_id"), localStorage.removeItem("access_token"), localStorage.removeItem("id_token");
        for (let d = localStorage.length - 1; d >= 0; d--) {
          const g = localStorage.key(d);
          g && (g.includes("_accountProfile_") || g.startsWith("twerenbold_token_")) && localStorage.removeItem(g);
        }
        throw this.passive || this._clearAuthSessionCookie(), this._dispatchAuthChangedEvent(), new Error("INTERACTION_REQUIRED");
      }
      throw n;
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
    var e, t;
    (e = this._cancelSessionRefresh) == null || e.call(this), window.removeEventListener("twerenbold:session-changed", this._onExternalSessionChanged), window.removeEventListener("twerenbold:request-logout", this._cancelSessionRefresh), window.removeEventListener("twerenbold:post-logout", this._cancelSessionRefresh), super.disconnectedCallback();
    try {
      this.msalInstance && this._msalEventCallbackId && typeof this.msalInstance.removeEventCallback == "function" && (this.msalInstance.removeEventCallback(this._msalEventCallbackId), this._msalEventCallbackId = null, this.logger.debug("removed event callback"));
    } catch (i) {
      this.logger.warn("failed to remove event callback", i);
    }
    try {
      typeof window < "u" && ((t = window.__twrMsal) == null ? void 0 : t.owner) === this && (delete window.__twrMsal, delete window.__twrMsalPromise);
    } catch {
    }
  }
  render() {
    var e, t;
    return this.isMsalInitialized ? m`
      <div class="auth-container">
        <!--div class="auth-header">
          <div class="auth-title">Authentifizierung</div>
          <div class="auth-subtitle">
           DEMO
          </div>
        </div -->

        ${this.error ? m`
          <div class="error">${this.error}</div>
        ` : ""}

        ${this.isAuthenticated ? m`
          <div class="user-info">
            <div class="user-email">
              Angemeldet als: ${((e = this.user) == null ? void 0 : e.email) || ((t = this.user) == null ? void 0 : t.username) || ""}
            </div>
            <button class="logout-button btn btn-secondary" @click=${() => this._openLogoutModal()}>
              Abmelden
            </button>
          </div>
        ` : m`
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

          ${this.isLoading ? m`
            <div class="loading" role="status">
              <div class="spinner"></div>
              <span>${this.pendingAction === "processing" ? "Authentifizierung wird abgeschlossen…" : this.pendingAction === "register" ? "Registrierungs-Flow wird vorbereitet…" : "Anmeldung wird vorbereitet…"}</span>
            </div>
          ` : ""}
        `}
      </div>
      ${this.renderLogoutModal()}
    ` : m`
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
    return this.showLogoutModal ? m`
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
D(ri, "properties", {
  isAuthenticated: { type: Boolean },
  isLoading: { type: Boolean },
  isMsalInitialized: { type: Boolean },
  showLogoutModal: { type: Boolean },
  user: { type: Object },
  error: { type: String },
  theme: { type: String },
  apiMode: { type: String },
  // 'demo', 'local', 'live'
  redirectUri: { type: String, attribute: "redirect-uri" },
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
}), D(ri, "styles", [wt, ae`
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
      box-sizing: border-box;
      width: min(560px, calc(100vw - 2rem));
      max-width: calc(100vw - 2rem);
      max-height: calc(100vh - 2rem);
      max-height: calc(100dvh - 2rem);
      overflow: auto;
      overflow-wrap: anywhere;
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
    .modal-actions { display:flex; flex-wrap: wrap; gap: 0.5rem; justify-content: flex-end; }
    .modal-actions .btn { min-width: 0; }

    @media (max-width: 480px) {
      dialog.modal { padding: 1.25rem; }
      .modal-actions { flex-direction: column; }
      .modal-actions .btn { width: 100%; white-space: normal; }
    }
  `]);
customElements.get("oauth-login") || customElements.define("oauth-login", ri);
const Gr = "oauth-auth-component";
if (!customElements.get(Gr)) {
  class l extends ri {
  }
  customElements.define(Gr, l);
}
const Ja = Object.freeze([
  "https://reisemarkt.twerenbold.ch",
  "https://www.reisemarkt.twerenbold.ch",
  "https://staging.reisemarkt.twerenbold.ch",
  "https://reisemarkt.imbach.ch",
  "https://www.reisemarkt.imbach.ch",
  "https://staging.reisemarkt.imbach.ch",
  "https://ibe.voegele-reisen.ch",
  "https://voegelereisen-ibe.stg.tripbuilder.app"
]);
function Ka(l, e = document) {
  if (!Ja.includes(l.origin) || !l.source) return null;
  const t = l.data;
  if (!t || typeof t != "object" || Array.isArray(t) || t.type !== "twerenbold:booking-login-complete" || typeof t.loginHint != "string" || t.loginHint.length > 320) return null;
  const i = t.loginHint.trim();
  return !i || /[\u0000-\u001f\u007f]/.test(i) ? null : [...e.querySelectorAll("iframe")].some((o) => {
    if (!o.isConnected || o.contentWindow !== l.source) return !1;
    try {
      const a = new URL(o.getAttribute("src"), e.baseURI);
      return !a.username && !a.password && a.origin === l.origin;
    } catch {
      return !1;
    }
  }) ? i : null;
}
const xi = /* @__PURE__ */ new WeakMap();
function qa(l = window, e = document) {
  let t = xi.get(l);
  t || (t = { users: 0, lastAcceptedAt: -1 / 0 }, t.listener = (r) => {
    const o = Ka(r, e);
    if (!o) return;
    const a = Date.now();
    a - t.lastAcceptedAt < 5e3 || (t.lastAcceptedAt = a, l.dispatchEvent(new l.CustomEvent("twerenbold:session-changed", {
      detail: { loginHint: o }
    })));
  }, l.addEventListener("message", t.listener), xi.set(l, t)), t.users++;
  let i = !1;
  return () => {
    i || (i = !0, --t.users === 0 && (l.removeEventListener("message", t.listener), xi.delete(l)));
  };
}
const me = class me extends Qr(Ue) {
  constructor() {
    var t;
    super();
    D(this, "_handleStorageChange", (t) => {
      t.key && this._isRelevantMSALKey(t.key) && (t.key, this._storageDebounceTimer && clearTimeout(this._storageDebounceTimer), this._storageDebounceTimer = setTimeout(() => {
        this._msalConfirmed = null, this._cachedMSALUser = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), this._checkMSALStorage(), this._loadCachedProfileData(), this.requestUpdate();
      }, 300)), t.key && (t.key.includes("_accountProfile_") || t.key.includes("_clubStatus_")) && (t.key, this._loadCachedProfileData()), t.key === me._SNAPSHOT_KEY && !t.newValue && (this._snapshot = null, this._snapshotApplied = !1, this._lastPersistedSnapshot = null, this.requestUpdate()), (t.key === "twerenbold_current_user_id" || t.key === "twerenbold_userId") && (this._cachedMSALUser = null, typeof window < "u" && (window.__twerenbold_cached_msal_user = null), this._checkMSALStorage(), this._loadCachedProfileData());
    });
    this.accountUrl = "", this.loginUrl = "", this.registerUrl = "", this.variant = "default", this.menuOpen = !1, this.headless = !1, this.silentRedirectUri = /^(?:(?:staging|www)\.)?reisemarkt\.(twerenbold|imbach)\.ch$/.test(((t = globalThis.location) == null ? void 0 : t.hostname) || "") ? "/callback.aspx" : "", this._cachedProfile = null, this._cachedClubStatus = null, this._cachedMSALUser = typeof window < "u" && window.__twerenbold_cached_msal_user || null, this._boundOutsideClick = (i) => this._handleOutsideClick(i), this.cacheMaxAge = 1440 * 60 * 1e3, this._previousAuthStatus = !1, this._logoutMessage = null, this._lastAuthChangeAt = 0, this._storageDebounceTimer = null, this._autoFillerProfile = null, this._snapshotApplied = !1, this._snapshot = null, this._readyMarked = !1, this._silentSsoFailed = !1, this._msalConfirmed = null, this._applyPreloadSnapshot();
  }
  connectedCallback() {
    var t, i, r, o;
    if (super.connectedCallback(), !Va(this._findServerLogoutButton(), window, () => {
      this._clearAuthHintCookies(), this._clearSnapshot(), this._localLogoutCleanup();
    }, !!((t = document.getElementById("BTN_OAUTH_Login")) != null && t.getClientRects().length))) {
      this._restoreServerLoginIconHint(), this._startSharedAuthHintSync(), (i = this._detachBookingSessionBridge) == null || i.call(this), this._detachBookingSessionBridge = qa(), document.addEventListener("click", this._boundOutsideClick, !0);
      try {
        requestAnimationFrame(() => {
          this.classList.add("loaded");
        });
      } catch (a) {
        console.error(a);
      }
      this._boundBookingAccountLink = (a) => {
        var c, p, d;
        if (!this._findServerLogoutButton()) return;
        const n = a.composedPath().find((g) => (g == null ? void 0 : g.tagName) === "A"), s = this.accountUrl || ja() || ((d = (p = (c = this.appState) == null ? void 0 : c.componentsConfig) == null ? void 0 : p.links) == null ? void 0 : d.account);
        if (!(!n || !s))
          try {
            const g = new URL(n.href, window.location.href), h = new URL(s, window.location.href);
            g.origin === h.origin && g.pathname === h.pathname && (n.href = zr(n.href));
          } catch {
          }
      }, document.addEventListener("click", this._boundBookingAccountLink, !0), this._checkMSALStorage(), this._loadCachedProfileData(), window.addEventListener("storage", this._handleStorageChange), this._boundServerLoginIcon = (a) => this._acceptServerLoginIconHint(a), window.addEventListener("twerenbold:session-changed", this._boundServerLoginIcon), this._boundAuthChanged = this._handleAuthChanged.bind(this), window.addEventListener("auth-changed", this._boundAuthChanged), this._boundSilentSsoFailed = () => {
        this._silentSsoFailed = !0, this._msalConfirmed = !1, this.requestUpdate();
      }, window.addEventListener("twerenbold:silent-sso-unavailable", this._boundSilentSsoFailed), this._boundPostLogout = () => {
        this._clearServerLoginIconHint(), this._msalConfirmed = !1, this._clearSnapshot(), this.requestUpdate();
      }, window.addEventListener("twerenbold:post-logout", this._boundPostLogout), window.addEventListener("twerenbold:request-logout", this._boundPostLogout), this._boundUserDataCleared = () => {
        this._cachedProfile = null, this._cachedClubStatus = null, this._snapshot = null, this._snapshotApplied = !1, this._lastPersistedSnapshot = null, this.requestUpdate();
      }, window.addEventListener("twerenbold:user-data-cleared", this._boundUserDataCleared), this._boundAutoFillerData = this._handleAutoFillerData.bind(this), document.addEventListener("twerenbold:auto-filler-data", this._boundAutoFillerData), this._checkAutoFillerGlobal(), this._isAuthenticated, this._profile, this._cachedProfile, this._authUser, this._displayName, this._email, this.loginUrl, this.registerUrl, (r = this.appActions) != null && r.login, (o = this.appActions) != null && o.register, this._hasMSALTokens(), this._hasAuthSessionCookie(), this._ensureOAuthLoginMounted();
    }
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
    if (document.readyState === "loading") {
      this._authMountAfterDomReady || (this._authMountAfterDomReady = () => {
        this._authMountAfterDomReady = null, this.isConnected && this._ensureOAuthLoginMounted();
      }, document.addEventListener("DOMContentLoaded", this._authMountAfterDomReady, { once: !0 }));
      return;
    }
    if (typeof window < "u" && ((o = window.twerenboldConfig) == null ? void 0 : o.crossDomainAuth) === "cookie-only") {
      `${t}`;
      return;
    }
    if (document.querySelector("oauth-login, oauth-auth-component, [data-auth-component]")) {
      `${t}`;
      return;
    }
    const r = document.querySelector('twerenbold-account-embed, account-portal-embed, #account-portal-container, #account-root, [data-twerenbold-portal-mount], .twerenbold-account-embed-root, app-state-provider[auth-selector="oauth-auth-component"]');
    if (r) {
      `${t}${r.tagName.toLowerCase()}`;
      return;
    }
    try {
      const a = document.createElement("oauth-login");
      a.setAttribute("data-auto-mounted-by", "header-account-menu"), a.setAttribute("passive", ""), this.silentRedirectUri && a.setAttribute("silent-redirect-uri", this.silentRedirectUri), a.style.display = "none", document.body.appendChild(a), this._autoMountedOauthLogin = a, `${t}${window.location.origin}`, this.silentRedirectUri && `${this.silentRedirectUri}`;
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
   * Optimistischer Hinweis auf eine lokale MSAL-Sitzung (nur Anzeige, zu
   * bestätigen durch oauth-login). MSAL v5 verschlüsselt die Token-Einträge;
   * lesbar ist nur der Klartext-Index `msal.2.token.keys.<clientId>`. Die alte
   * Prüfung auf Klartext-Access-Tokens (MSAL v3) griff mit v5 nie.
   * Bedingung zusätzlich: `twerenbold_current_user_id` ist gesetzt.
   */
  _hasMSALTokenIndexHint() {
    var t, i, r;
    if (typeof localStorage > "u") return !1;
    try {
      if (!localStorage.getItem("twerenbold_current_user_id")) return !1;
      for (let o = 0; o < localStorage.length; o++) {
        const a = localStorage.key(o);
        if (!a || !a.startsWith("msal.2.token.keys.")) continue;
        const n = JSON.parse(localStorage.getItem(a) || "null");
        if ((t = n == null ? void 0 : n.idToken) != null && t.length || (i = n == null ? void 0 : n.accessToken) != null && i.length || (r = n == null ? void 0 : n.refreshToken) != null && r.length)
          return !0;
      }
    } catch {
    }
    return !1;
  }
  /**
   * App-State eines echten AppStateProvider. Die eigene Fallback-Bridge
   * (`fallback: true`) kommt über withAppState ebenfalls als appState zurück,
   * ist aber nur ein Abbild dieser Komponente und darf nicht als Quelle dienen:
   * sonst friert die erste Auswertung bis zum Reload ein.
   */
  get _providerAppState() {
    const t = this.appState;
    return t && t.fallback !== !0 ? t : null;
  }
  _checkMSALStorage() {
    this._hasMSALTokens() && (this._cachedMSALUser || (this._cachedMSALUser = this._extractMSALUser(), this._cachedMSALUser && (typeof window < "u" && (window.__twerenbold_cached_msal_user = this._cachedMSALUser), this._cachedMSALUser)));
  }
  _extractMSALUser() {
    if (typeof window < "u" && window.__twerenbold_cached_msal_user)
      return window.__twerenbold_cached_msal_user, window.__twerenbold_cached_msal_user;
    if (typeof localStorage > "u") return null;
    try {
      const t = localStorage.getItem("twerenbold_current_user_id") || localStorage.getItem("twerenbold_userId");
      if (t)
        return {
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
            const c = s.localAccountId || s.homeAccountId || s.oid || s.sub || s.username || s.email;
            if (c)
              return {
                ...s,
                userId: c
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
      n && !this._cachedMSALUser && (this._cachedMSALUser = n);
      const s = n ? [
        n.userId,
        n.localAccountId,
        n.homeAccountId,
        n.email
      ].filter(Boolean) : [];
      for (const h of s) {
        const f = [
          `live_accountProfile_${h}`,
          `demo_accountProfile_${h}`
        ], v = [
          `live_clubStatus_${h}`,
          `demo_clubStatus_${h}`
        ];
        for (const y of f) {
          const S = localStorage.getItem(y);
          if (S) {
            const x = JSON.parse(S), E = Date.now() - x.timestamp, I = this.cacheMaxAge;
            if (E < I) {
              Math.round(E / 1e3) + "", (t = x.data) == null || t.firstName, (i = x.data) == null || i.lastName, (r = x.data) == null || r.email, this._cachedProfile = x.data, this.requestUpdate();
              break;
            } else
              Math.round(E / 1e3) + "";
          }
        }
        for (const y of v) {
          const S = localStorage.getItem(y);
          if (!S) continue;
          const x = JSON.parse(S), E = Date.now() - x.timestamp, I = this.cacheMaxAge;
          if (!(E >= I)) {
            this._cachedClubStatus = x.data || null, this.requestUpdate();
            break;
          }
        }
      }
      const c = localStorage.getItem("twerenbold_current_user_id"), p = c ? `_${c}` : null;
      let d = !!this._cachedProfile, g = !!this._cachedClubStatus;
      for (let h = 0; h < localStorage.length; h++) {
        const f = localStorage.key(h);
        if (!(!p || !f || !f.endsWith(p))) {
          if (f && f.includes("_accountProfile_")) {
            const v = localStorage.getItem(f);
            if (v) {
              const y = JSON.parse(v), S = Date.now() - y.timestamp, x = this.cacheMaxAge;
              S < x && ((o = y.data) == null || o.firstName, (a = y.data) == null || a.lastName, this._cachedProfile = y.data, d = !0, this.requestUpdate());
            }
          }
          if (f && f.includes("_clubStatus_")) {
            const v = localStorage.getItem(f);
            if (v) {
              const y = JSON.parse(v), S = Date.now() - y.timestamp, x = this.cacheMaxAge;
              S < x && (this._cachedClubStatus = y.data || null, g = !0, this.requestUpdate());
            }
          }
        }
      }
      d || (this._cachedProfile = null), g || (this._cachedClubStatus = null);
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
    i != null && i.profile && (i.profile.firstName, i.profile.lastName, i.profile.email, this._autoFillerProfile = i.profile, this.requestUpdate());
  }
  /**
   * Check the global auto-filler API handle for already-available profile data.
   * The auto-filler may have loaded and broadcast data before this component connected.
   */
  _checkAutoFillerGlobal() {
    var i;
    if (typeof window > "u") return;
    const t = window.__twerenboldAutoFiller;
    (i = t == null ? void 0 : t.data) != null && i.profile && (t.data.profile.firstName, t.data.profile.lastName, t.data.profile.email, this._autoFillerProfile = t.data.profile);
  }
  _handleAuthChanged(t) {
    t.detail;
    const { isAuthenticated: i, user: r } = t.detail;
    i && r ? (this._msalConfirmed = !0, this._cachedMSALUser = {
      name: r.name,
      email: r.username,
      username: r.username,
      localAccountId: r.id
    }, typeof window < "u" && (window.__twerenbold_cached_msal_user = this._cachedMSALUser), this._loadCachedProfileData()) : (i || (this._msalConfirmed = !1), this._cachedMSALUser = null, this._cachedProfile = null, this._cachedClubStatus = null, this._autoFillerProfile = null, this._clearSnapshot(), typeof window < "u" && (window.__twerenbold_cached_msal_user = null)), this._lastAuthChangeAt = Date.now(), this.requestUpdate();
  }
  disconnectedCallback() {
    var t, i;
    this._stopSharedAuthHintSync(), (t = this._reisemarktIconObserver) == null || t.disconnect(), this._reisemarktIconObserver = null, this._reisemarktIconTargets = null, (i = this._detachBookingSessionBridge) == null || i.call(this), this._detachBookingSessionBridge = null, this._authMountAfterDomReady && (document.removeEventListener("DOMContentLoaded", this._authMountAfterDomReady), this._authMountAfterDomReady = null), this._serverLoginIconHint = null, window.removeEventListener("twerenbold:session-changed", this._boundServerLoginIcon), super.disconnectedCallback(), document.removeEventListener("click", this._boundOutsideClick, !0), document.removeEventListener("click", this._boundBookingAccountLink, !0), window.removeEventListener("storage", this._handleStorageChange), this._boundAuthChanged && window.removeEventListener("auth-changed", this._boundAuthChanged), this._boundSilentSsoFailed && window.removeEventListener("twerenbold:silent-sso-unavailable", this._boundSilentSsoFailed), this._boundPostLogout && (window.removeEventListener("twerenbold:post-logout", this._boundPostLogout), window.removeEventListener("twerenbold:request-logout", this._boundPostLogout)), this._boundUserDataCleared && window.removeEventListener("twerenbold:user-data-cleared", this._boundUserDataCleared), this._boundAutoFillerData && document.removeEventListener("twerenbold:auto-filler-data", this._boundAutoFillerData), this._storageDebounceTimer && (clearTimeout(this._storageDebounceTimer), this._storageDebounceTimer = null), this._autoMountedOauthLogin && this._autoMountedOauthLogin.isConnected && (this._autoMountedOauthLogin.remove(), this._autoMountedOauthLogin = null);
  }
  updated(t) {
    var i, r;
    if ((i = super.updated) == null || i.call(this, t), t.has("appState")) {
      const o = !!((r = this.appState) != null && r.isAuthenticated);
      this._previousAuthStatus !== o && (this._displayName, this._email, this._statusLabel, this._profile, this._lastAuthChangeAt = Date.now()), this._previousAuthStatus = o;
    }
    this._publishFallbackBridge(), this._syncReisemarktHeaderIcon(), this._persistSnapshot(), this._readyMarked || (this._readyMarked = !0, this.setAttribute("data-ready", ""));
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
    if (t != null && t.provider || !this._isAuthenticated && this._isVisuallyAuthenticated) return;
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
    var a;
    let t = null;
    try {
      if (typeof window < "u" && window.__twerenboldHeaderSnapshot)
        t = window.__twerenboldHeaderSnapshot;
      else if (typeof localStorage < "u") {
        const n = localStorage.getItem(me._SNAPSHOT_KEY);
        n && (t = JSON.parse(n));
      }
    } catch {
    }
    if (!t || typeof t != "object" || (t.timestamp ? Date.now() - t.timestamp : 1 / 0) > me._SNAPSHOT_TTL_MS || t.isAuthenticated !== !0) return;
    let r = null;
    try {
      r = localStorage.getItem("twerenbold_current_user_id");
    } catch {
    }
    const o = ((a = t.authUser) == null ? void 0 : a.localAccountId) || null;
    if (!(!r || !o)) {
      if (o !== r) {
        this._clearSnapshot();
        return;
      }
      t.profile && (this._cachedProfile = t.profile), t.authUser && !this._cachedMSALUser && (this._cachedMSALUser = t.authUser), this._snapshot = t, this._snapshotApplied = !0;
    }
  }
  _persistSnapshot() {
    if (!(typeof localStorage > "u"))
      try {
        if (!this._isAuthenticated) {
          (this._msalConfirmed === !1 || this._silentSsoFailed === !0) && (this._lastPersistedSnapshot || localStorage.getItem(me._SNAPSHOT_KEY)) && this._clearSnapshot();
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
        }, c = this._lastPersistedSnapshot;
        if (c && c.displayName === s.displayName && c.email === s.email) return;
        localStorage.setItem(me._SNAPSHOT_KEY, JSON.stringify(s)), this._lastPersistedSnapshot = s;
      } catch {
      }
  }
  _clearSnapshot() {
    if (!(typeof localStorage > "u"))
      try {
        localStorage.removeItem(me._SNAPSHOT_KEY), typeof window < "u" && (window.__twerenboldHeaderSnapshot = null), this._snapshot = null, this._snapshotApplied = !1, this._lastPersistedSnapshot = null;
      } catch {
      }
  }
  get _isAuthenticated() {
    var t;
    return this._sharedLogoutObserved || this._hasSharedLogoutMarker() ? !1 : this._msalConfirmed !== null ? this._msalConfirmed : ((t = this._providerAppState) == null ? void 0 : t.isAuthenticated) === !0;
  }
  get _isReisemarktHost() {
    return typeof location < "u" && /^(?:(?:staging|www)\.)?reisemarkt\.(twerenbold|imbach)\.ch$/.test(location.hostname);
  }
  _sharedLogoutMarkerValue() {
    return !this._isReisemarktHost || typeof document > "u" ? "" : (document.cookie || "").split(";").map((t) => t.trim()).filter((t) => t.startsWith("tw_logged_out=")).sort().join(";");
  }
  _hasSharedLogoutMarker() {
    return !!this._sharedLogoutMarkerValue();
  }
  _acceptServerLoginIconHint(t) {
    var r;
    const i = (r = t.detail) == null ? void 0 : r.loginHint;
    if (!(!this._isReisemarktHost || !this._findServerLogoutButton() || typeof i != "string" || !i.trim() || i.length > 320 || /[\u0000-\u001f\u007f]/.test(i))) {
      this._reconcileSharedAuthHint(), this._serverLoginIconHint = {
        logoutMarker: this._sharedLogoutMarkerValue(),
        sessionPath: this._bookingIconSessionPath(),
        expiresAt: Date.now() + 7200 * 1e3
      };
      try {
        sessionStorage.setItem("twerenbold:booking-icon-hint", JSON.stringify(this._serverLoginIconHint));
      } catch {
      }
      this._syncReisemarktHeaderIcon();
    }
  }
  _bookingIconSessionPath() {
    var t, i;
    return ((i = (t = location.pathname) == null ? void 0 : t.match(/\(S\([^)]+\)\)/)) == null ? void 0 : i[0]) || "";
  }
  _clearServerLoginIconHint() {
    this._serverLoginIconHint = null;
    try {
      sessionStorage.removeItem("twerenbold:booking-icon-hint");
    } catch {
    }
  }
  _restoreServerLoginIconHint() {
    if (this._isReisemarktHost)
      try {
        const t = sessionStorage.getItem("twerenbold:booking-icon-hint"), i = t && t.length < 2048 ? JSON.parse(t) : null;
        i && typeof i.expiresAt == "number" && i.expiresAt > Date.now() && i.expiresAt <= Date.now() + 7200 * 1e3 && i.sessionPath === this._bookingIconSessionPath() && i.logoutMarker === this._sharedLogoutMarkerValue() ? this._serverLoginIconHint = i : this._clearServerLoginIconHint();
      } catch {
        this._clearServerLoginIconHint();
      }
  }
  get _hasServerLoginIconHint() {
    return this._isReisemarktHost && !!this._serverLoginIconHint && this._serverLoginIconHint.expiresAt > Date.now() && !!this._findServerLogoutButton() && this._serverLoginIconHint.logoutMarker === this._sharedLogoutMarkerValue();
  }
  _reconcileSharedAuthHint() {
    if (!this._isReisemarktHost) return;
    const t = this._hasAuthSessionCookie(), i = this._hasSharedLogoutMarker(), r = this._sharedLogoutMarkerValue();
    this._serverLoginIconHint && (this._serverLoginIconHint.logoutMarker !== r || this._serverLoginIconHint.expiresAt <= Date.now()) && (this._clearServerLoginIconHint(), this._sharedAuthHintSignature = null);
    const o = `${t}:${r}`;
    this._lastSharedAuthHint === !0 && !t && this._clearServerLoginIconHint(), o !== this._sharedAuthHintSignature && (this._sharedAuthHintSignature = o, i || this._lastSharedAuthHint === !0 && !t ? (this._sharedLogoutObserved = !0, this._msalConfirmed = null, this._clearSnapshot()) : t && this._sharedLogoutObserved && (this._sharedLogoutObserved = !1, this._msalConfirmed = null, this._silentSsoFailed = !1), this._lastSharedAuthHint = t, this._syncReisemarktHeaderIcon(), this.requestUpdate());
  }
  _startSharedAuthHintSync() {
    this._stopSharedAuthHintSync(), this._isReisemarktHost && (this._boundSharedAuthHintSync = () => this._reconcileSharedAuthHint(), window.addEventListener("focus", this._boundSharedAuthHintSync), window.addEventListener("pageshow", this._boundSharedAuthHintSync), document.addEventListener("visibilitychange", this._boundSharedAuthHintSync), this._sharedAuthHintTimer = setInterval(() => {
      document.visibilityState !== "hidden" && this._reconcileSharedAuthHint();
    }, 1e3), this._reconcileSharedAuthHint());
  }
  _stopSharedAuthHintSync() {
    clearInterval(this._sharedAuthHintTimer), this._sharedAuthHintTimer = null, this._boundSharedAuthHintSync && (window.removeEventListener("focus", this._boundSharedAuthHintSync), window.removeEventListener("pageshow", this._boundSharedAuthHintSync), document.removeEventListener("visibilitychange", this._boundSharedAuthHintSync), this._boundSharedAuthHintSync = null);
  }
  _syncReisemarktHeaderIcon() {
    if (!this._isReisemarktHost || typeof document > "u") return;
    const t = document.querySelectorAll("a#account-btn, a.account-btn");
    for (const i of t) {
      try {
        const o = new URL(i.getAttribute("href"), location.href), a = location.hostname.endsWith("imbach.ch") ? "imbach" : "twerenbold";
        if (o.protocol !== "https:" || ![`${a}.ch`, `www.${a}.ch`, `staging.${a}.ch`].includes(o.hostname) || o.pathname.replace(/\/$/, "") !== "/kundenkonto") continue;
      } catch {
        continue;
      }
      typeof MutationObserver < "u" && (this._reisemarktIconObserver || (this._reisemarktIconTargets = /* @__PURE__ */ new WeakSet(), this._reisemarktIconObserver = new MutationObserver(() => this._syncReisemarktHeaderIcon())), this._reisemarktIconTargets.has(i) || (this._reisemarktIconTargets.add(i), this._reisemarktIconObserver.observe(i, { attributes: !0, attributeFilter: ["class"] })));
      const r = this._hasServerLoginIconHint || this._isVisuallyAuthenticated;
      i.classList.contains("is-logged-in") !== r && i.classList.toggle("is-logged-in", r), i.classList.contains("is-logged-out") !== !r && i.classList.toggle("is-logged-out", !r);
    }
  }
  get _isVisuallyAuthenticated() {
    var t;
    return this._sharedLogoutObserved || this._hasSharedLogoutMarker() ? !1 : this._msalConfirmed !== null ? this._msalConfirmed : this._isAuthenticated ? !0 : this._silentSsoFailed ? !1 : ((t = this._snapshot) == null ? void 0 : t.isAuthenticated) === !0 || this._isReisemarktHost && this._hasAuthSessionCookie();
  }
  get _profile() {
    var t;
    return (t = this._providerAppState) != null && t.accountProfile ? this._providerAppState.accountProfile : this._cachedProfile ? this._cachedProfile : this._autoFillerProfile || null;
  }
  get _authUser() {
    var t;
    return (t = this._providerAppState) != null && t.authUser ? this._providerAppState.authUser : (this._hasMSALTokens() && !this._cachedMSALUser && (this._cachedMSALUser = this._extractMSALUser()), this._cachedMSALUser || null);
  }
  /**
   * Helper: returns true if a name string is empty or the placeholder "unknown"
   * that Entra ID sometimes returns.
   */
  _isUnknownName(t) {
    return t ? t.trim().toLowerCase() === "unknown" : !0;
  }
  get _displayName() {
    const t = this._profile, i = this._authUser, r = (t == null ? void 0 : t.personalData) || (t == null ? void 0 : t.personal) || t, o = this._isUnknownName(r == null ? void 0 : r.firstName) ? null : r == null ? void 0 : r.firstName, a = this._isUnknownName(r == null ? void 0 : r.lastName) ? null : r == null ? void 0 : r.lastName, n = o || a ? [o, a].filter(Boolean).join(" ") : (this._isUnknownName(t == null ? void 0 : t.displayName) ? null : t == null ? void 0 : t.displayName) || (this._isUnknownName(t == null ? void 0 : t.name) ? null : t == null ? void 0 : t.name), s = (this._isUnknownName(i == null ? void 0 : i.name) ? null : i == null ? void 0 : i.name) || (this._isUnknownName(i == null ? void 0 : i.displayName) ? null : i == null ? void 0 : i.displayName) || (this._isUnknownName(i == null ? void 0 : i.givenName) ? null : i == null ? void 0 : i.givenName), c = this._isUnknownName(this._displayNameFromCookie()) ? null : this._displayNameFromCookie();
    return n || s || c || "eingeloggt";
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
    const t = ((r = this._providerAppState) == null ? void 0 : r.accountClubStatus) || this._cachedClubStatus || ((o = this._profile) == null ? void 0 : o.clubMembership) || null, i = (t == null ? void 0 : t.currentStatus) || (t == null ? void 0 : t.status);
    return i != null && i.name ? i.name : t != null && t.name ? t.name : null;
  }
  getText(t, i = null) {
    return O(t, "header", i, this.theme);
  }
  _toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  _shouldShowProfileLoading() {
    var a;
    const i = this._lastAuthChangeAt && Date.now() - this._lastAuthChangeAt < 400;
    if (((a = this.appState) == null ? void 0 : a.fallback) === !0) return !1;
    const r = !!(this._profile || this._authUser || this._cachedProfile || this._autoFillerProfile), o = this._providerAppState;
    return !!(o && o.isAuthenticated && !o.accountLoaded && !r || i && !r);
  }
  _renderProfileLoadingMenu() {
    return m`
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
    var n;
    this._findServerLogoutButton() && (r = zr(r), ((n = t.currentTarget) == null ? void 0 : n.tagName) === "A" && (t.currentTarget.href = r));
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
    var i;
    if (this.menuOpen = !1, this.loginUrl && this.loginUrl !== "#") {
      this.loginUrl, window.location.assign(this.loginUrl);
      return;
    }
    if ((i = this.appActions) != null && i.login && !this.appActions._headerFallback) {
      this.appActions.login();
      return;
    }
    const t = this._findOAuthLogin();
    typeof (t == null ? void 0 : t.login) == "function" ? t.login() : console.warn("⚠️ [HeaderAccountMenu] No login action available and no loginUrl set");
  }
  _findOAuthLogin() {
    return typeof document > "u" ? null : document.querySelector("oauth-login, oauth-auth-component, [data-auth-component]");
  }
  _handleRegister() {
    var i;
    if (this.menuOpen = !1, this.registerUrl && this.registerUrl !== "#") {
      this.registerUrl, window.location.assign(this.registerUrl);
      return;
    }
    if ((i = this.appActions) != null && i.register && !this.appActions._headerFallback) {
      this.appActions.register();
      return;
    }
    const t = this._findOAuthLogin();
    typeof (t == null ? void 0 : t.register) == "function" ? t.register() : console.warn("⚠️ [HeaderAccountMenu] No register action available and no registerUrl set");
  }
  _handleLogout() {
    var r, o, a;
    if (this._logoutInProgress) return;
    this._logoutInProgress = !0, setTimeout(() => {
      this._logoutInProgress = !1;
    }, 0), this.menuOpen = !1, ((n, s) => {
      var c;
      (c = this.appActions) != null && c.addNotification ? this.appActions.addNotification({ type: "info", title: n, message: s, duration: 3e3 }) : (this._logoutMessage = s, this.requestUpdate(), setTimeout(() => {
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
      "" + (i.id || i.name), i.click();
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
        window.location.assign(s);
        return;
      }
    } catch (n) {
      console.warn("⚠️ [HeaderAccountMenu] Failed to navigate to account page for logout:", n);
    }
    try {
      const n = document.querySelector("oauth-login") || document.querySelector("oauth-auth-component") || document.querySelector("[data-auth-component]") || document.querySelector("oauth-login-component");
      if (n) {
        if (typeof n._performLogout == "function") {
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
    if (this._clearServerLoginIconHint(), !(typeof document > "u"))
      try {
        const t = window.location.hostname, i = t.split("."), r = i.length > 2 ? "." + i.slice(-2).join(".") : null, o = [void 0, t, r].filter((n, s, c) => c.indexOf(n) === s);
        for (const n of ["try_silent_login", "tw_login_hint", "tw_user_name"])
          for (const s of o) {
            let c = `${n}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            s && (c += `; domain=${s}`), document.cookie = c;
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
    var g, h, f, v, y;
    const t = this._displayName, i = this._email, r = this._statusLabel, o = (g = this.appState) == null ? void 0 : g.accountLoading, a = ((f = (h = this.appState) == null ? void 0 : h.componentsConfig) == null ? void 0 : f.links) || {}, n = this.accountUrl || a.account || null, s = ((y = (v = this._profile) == null ? void 0 : v.links) == null ? void 0 : y.personalData) || a.profile || (n ? `${n}#account` : null), c = a.trips || a.myTrips || (n ? `${n}#trips` : null), p = a.watchlist || a.favorites || (n ? `${n}#merkliste` : null), d = a.newsletter || (n ? `${n}#newsletter` : null);
    return m`
      <div class="twr-hm-dropdown">
        <div class="twr-hm-dropdown__section">
          <span class="twr-hm-dropdown__primary">${t}</span>
          ${i ? m`<span class="twr-hm-dropdown__secondary">${i}</span>` : ""}
          ${o ? m`
            <span class="twr-hm-dropdown__secondary" style="font-style: italic; color: #94a3b8;">
              Profil wird geladen...
            </span>
          ` : ""}
          ${r ? m`<!--<span class="twr-hm-status-badge">${r}</span>-->` : ""}
        </div>
        <div class="twr-hm-dropdown__actions">
          ${n ? m`<a href="${n}" data-nav-target="overview" @click=${(S) => this._handleNavClick(S, "overview", n)}><span class="twr-hm-action-label">${this.getText("accountOverview", "Kontoübersicht")}</span></a>` : ""}
          ${s ? m`<a href="${s}" data-nav-target="profile" @click=${(S) => this._handleNavClick(S, "profile", s)}><span class="twr-hm-action-label">${this.getText("personalData", "Persönliche Daten")}</span></a>` : m`<div>${this.getText("personalData", "Persönliche Daten")}</div>`}

          ${c ? m`<a href="${c}" data-nav-target="trips" @click=${(S) => this._handleNavClick(S, "trips", c)}><span class="twr-hm-action-label">${this.getText("myTrips", "Meine Reisen")}</span></a>` : m`<div>${this.getText("myTrips", "Meine Reisen")}</div>`}

          ${p ? m`<a href="${p}" data-nav-target="watchlist" @click=${(S) => this._handleNavClick(S, "watchlist", p)}><span class="twr-hm-action-label">${this.getText("watchlist", "Merkliste")}</span></a>` : m`<div>${this.getText("watchlist", "Merkliste")}</div>`}

          ${d ? m`<a href="${d}" data-nav-target="newsletter" @click=${(S) => this._handleNavClick(S, "newsletter", d)}><span class="twr-hm-action-label">${this.getText("newsletter", "Newsletter-Abonnements")}</span></a>` : m`<div>${this.getText("newsletter", "Newsletter-Abonnements")}</div>`}
          ${i ? m`<span class="twr-hm-logged-in-as">${this.getText("loggedInAs", "Angemeldet als:")} ${i}</span>` : ""}
          <button class="twr-hm-logout" @click=${this._handleLogout}>${this.getText("logout", "Abmelden")}</button>
        </div>
      </div>
    `;
  }
  _renderGuestMenu() {
    var a, n;
    const t = this.loginUrl && this.loginUrl !== "#", i = this.registerUrl && this.registerUrl !== "#", r = !!((a = this.appActions) != null && a.login), o = !!((n = this.appActions) != null && n.register);
    return m`
      <div class="twr-hm-dropdown">
        <slot name="guest">
          <div class="twr-hm-dropdown__actions">
            ${t || r ? m`
              <button @click=${this._handleLogin}>Login</button>
            ` : ""}
            ${i || o ? m`
              <button @click=${this._handleRegister}>Registrieren</button>
            ` : ""}
            ${!t && !r && !i && !o ? m`
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
      return m``;
    const t = this._isVisuallyAuthenticated ? this._displayName : "Mein Konto", i = this.variant === "inline", r = this._isVisuallyAuthenticated ? this._shouldShowProfileLoading() ? this._renderProfileLoadingMenu() : this._renderAuthenticatedMenu() : this._renderGuestMenu();
    return i ? m`${r}` : m`
      <button class="twr-hm-trigger" @click=${this._toggleMenu} aria-expanded="${this.menuOpen}">
      ${this._isVisuallyAuthenticated ? m`<span class="twr-hm-avatar">${this._initials}</span>` : ""}
      ${this._isVisuallyAuthenticated ? m`<span class="twr-hm-check" title="Angemeldet" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M6.4 11.6 3 8.2l1.2-1.2 2.2 2.2 5.4-5.4L13 5z" fill="currentColor"/></svg></span>` : ""}
      <span class="twr-hm-label hidden-md hidden-lg">${t}</span>
      <span class="twr-hm-chevron" aria-hidden="true"></span>
      </button>
      ${this.menuOpen ? r : ""}
    `;
  }
};
D(me, "properties", {
  accountUrl: { type: String, attribute: "account-url" },
  loginUrl: { type: String, attribute: "login-url" },
  registerUrl: { type: String, attribute: "register-url" },
  variant: { type: String, reflect: !0 },
  menuOpen: { type: Boolean, state: !0 },
  // Stable URL or path used as redirect_uri ONLY for the auto-mounted
  // ssoSilent bootstrap (forwarded to <oauth-login silent-redirect-uri>).
  // WebForms callback default applies only to the Reisemarkt hosts.
  // Other websites use the existing origin fallback unless explicitly configured.
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
D(me, "_SNAPSHOT_KEY", "twerenbold_hm_snapshot"), D(me, "_SNAPSHOT_TTL_MS", 1440 * 60 * 1e3), D(me, "styles", ae`
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

    /* Inline host menus may supply absolute offsets for desktop dropdowns.
     * Keep these icons in the flex row so they cannot cover the link label. */
    :host([variant="inline"]) .twr-hm-dropdown__actions a::before,
    :host([variant="inline"]) .twr-hm-dropdown__actions a::after {
      position: static;
      inset: auto;
    }

    :host([variant="inline"]) .twr-hm-action-label {
      min-width: 0;
      overflow-wrap: anywhere;
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
let Bi = me;
customElements.get("header-account-menu") || customElements.define("header-account-menu", Bi);
const Qa = "https://fonts.googleapis.com/css2?display=swap&family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900", en = new URL("data:text/css;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBDU1MgVkFSSUFCTEVTIENPTkZJR1VSQVRJT04KICAgWmVudHJhbGVzIERlc2lnbi1TeXN0ZW0gZsO8ciBhbGxlIFR3ZXJlbmJvbGQgV2ViIENvbXBvbmVudHMKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKOnJvb3QgewogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBUWVBPR1JBUEhZCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBGb250IEZhbWlsaWVzICovCiAgLS1mb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7CiAgLS10d2VyZW5ib2xkLWZvbnQtZmFtaWx5OiAnTWFucm9wZScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmOwoKICAvKiBGb250IFNpemVzICovCiAgLS1mb250LXNpemUteHM6IDAuNzVyZW07CiAgLS1mb250LXNpemUtc206IDAuODc1cmVtOwogIC0tZm9udC1zaXplLWJhc2U6IDFyZW07CiAgLS1mb250LXNpemUtbGc6IDEuMTI1cmVtOwogIC0tZm9udC1zaXplLXhsOiAxLjI1cmVtOwogIC0tZm9udC1zaXplLTJ4bDogMS41cmVtOwogIC0tZm9udC1zaXplLTN4bDogMS44NzVyZW07CiAgLS1mb250LXNpemUtNHhsOiAyLjI1cmVtOwoKICAvKiBGb250IFdlaWdodHMgKi8KICAtLWZvbnQtd2VpZ2h0LW5vcm1hbDogNDAwOwogIC0tZm9udC13ZWlnaHQtbWVkaXVtOiA1MDA7CiAgLS1mb250LXdlaWdodC1zZW1pYm9sZDogNjAwOwogIC0tZm9udC13ZWlnaHQtYm9sZDogNzAwOwogIC0tZm9udC13ZWlnaHQtZXh0cmFib2xkOiA4MDA7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBQUklNQVJZIFBBTEVUVEUKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIFByaW1hcnkgQ29sb3JzICovCiAgLS1wcmltYXJ5LWNvbG9yOiAjNGE1NTY4OwogIC0tcHJpbWFyeS1jb2xvci1kYXJrOiAjMmQzNzQ4OwogIC0tcHJpbWFyeS1jb2xvci1saWdodDogcmdiYSg3NCwgODUsIDEwNCwgMC4xKTsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeTogIzAwOTU1MzsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeS1kYXJrOiAjMDA3YTQ0OwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5LWxpZ2h0OiByZ2JhKDAsIDE0OSwgODMsIDAuMSk7CgogIC8qIFNlY29uZGFyeSBDb2xvcnMgKi8KICAtLXNlY29uZGFyeS1jb2xvcjogIzcxODA5NjsKICAtLXR3ZXJlbmJvbGQtc2Vjb25kYXJ5OiAjZTMwNjEzOwogIC0tdHdlcmVuYm9sZC1zZWNvbmRhcnktZGFyazogI2M0MWUzYTsKCiAgLyogQWNjZW50IENvbG9ycyAqLwogIC0tYWNjZW50LWNvbG9yOiAjNzE4MDk2OwogIC0tYWNjZW50LWNvbG9yLWxpZ2h0OiByZ2JhKDExMywgMTI4LCAxNTAsIDAuMSk7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBURVhUCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBUZXh0IENvbG9ycyAqLwogIC0tdGV4dC1jb2xvcjogIzMzMzsKICAtLXRleHQtc2Vjb25kYXJ5OiAjNjY2OwogIC0tdGV4dC1tdXRlZDogIzljYTNhZjsKICAtLXR3ZXJlbmJvbGQtdGV4dDogIzExMTgyNzsKICAtLXR3ZXJlbmJvbGQtdGV4dC1zZWNvbmRhcnk6ICM2YjcyODA7CiAgLS10d2VyZW5ib2xkLXRleHQtbXV0ZWQ6ICM5Y2EzYWY7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBCQUNLR1JPVU5EUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogQmFja2dyb3VuZCBDb2xvcnMgKi8KICAtLWJnLWNvbG9yOiAjZmZmOwogIC0tYmctc2Vjb25kYXJ5OiAjZjhmOWZhOwogIC0tYmctbXV0ZWQ6ICNmM2Y0ZjY7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQ6ICNmZmZmZmY7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjlmYWZiOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLW11dGVkOiAjZjNmNGY2OwoKICAvKiBDYXJkIEJhY2tncm91bmRzICovCiAgLS1jYXJkLWJnOiAjZjhmOWZhOwogIC0tY2FyZC1iZy1ob3ZlcjogI2ZmZmZmZjsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIENPTE9SUyAtIEJPUkRFUlMKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIEJvcmRlciBDb2xvcnMgKi8KICAtLWJvcmRlci1jb2xvcjogI2UyZThmMDsKICAtLWJvcmRlci1saWdodDogI2YzZjRmNjsKICAtLXR3ZXJlbmJvbGQtYm9yZGVyOiAjZTVlN2ViOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItbGlnaHQ6ICNmM2Y0ZjY7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBTVEFUVVMKICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogIC8qIFN0YXR1cyBDb2xvcnMgKi8KICAtLXN1Y2Nlc3MtY29sb3I6ICMzOGExNjk7CiAgLS1zdWNjZXNzLWJnOiAjZjBmZmY0OwogIC0tc3VjY2Vzcy1ib3JkZXI6ICNjNmY2ZDU7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3M6ICMxMGI5ODE7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3MtYmc6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOwoKICAtLXdhcm5pbmctY29sb3I6ICNkNjllMmU7CiAgLS13YXJuaW5nLWJnOiAjZmVmNWU3OwogIC0td2FybmluZy1ib3JkZXI6ICNmNmUwNWU7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmc6ICNmNTllMGI7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmctYmc6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOwoKICAtLWVycm9yLWNvbG9yOiAjZTUzZTNlOwogIC0tZXJyb3ItYmc6ICNmZWQ3ZDc7CiAgLS1lcnJvci1ib3JkZXI6ICNmZWIyYjI7CiAgLS10d2VyZW5ib2xkLWVycm9yOiAjZWY0NDQ0OwogIC0tdHdlcmVuYm9sZC1lcnJvci1iZzogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsKCiAgLyogSW5mbyBDb2xvcnMgKi8KICAtLWluZm8tY29sb3I6ICMzMTgyY2U7CiAgLS1pbmZvLWJnOiAjZWJmOGZmOwogIC0taW5mby1ib3JkZXI6ICM5MGNkZjQ7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT0xPUlMgLSBJTkFDVElWRS9ESVNBQkxFRAogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS1pbmFjdGl2ZS1iZzogI2Y3ZmFmYzsKICAtLWluYWN0aXZlLWNvbG9yOiAjYTBhZWMwOwogIC0taW5hY3RpdmUtYm9yZGVyOiAjZTJlOGYwOwoKICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgICAgU1BBQ0lORwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogU3BhY2luZyBTY2FsZSAqLwogIC0tc3BhY2luZy14czogNXB4OwogIC0tc3BhY2luZy1zbTogMTBweDsKICAtLXNwYWNpbmctbWQ6IDE1cHg7CiAgLS1zcGFjaW5nLWxnOiAyMHB4OwogIC0tc3BhY2luZy14bDogMzBweDsKICAtLXNwYWNpbmctMnhsOiA0MHB4OwoKICAvKiBUd2VyZW5ib2xkIFNwYWNpbmcgKHJlbS1iYXNlZCkgKi8KICAtLXR3ZXJlbmJvbGQtc3BhY2UtMTogMC4yNXJlbTsKICAtLXR3ZXJlbmJvbGQtc3BhY2UtMjogMC41cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS0zOiAwLjc1cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS00OiAxcmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS01OiAxLjI1cmVtOwogIC0tdHdlcmVuYm9sZC1zcGFjZS02OiAxLjVyZW07CiAgLS10d2VyZW5ib2xkLXNwYWNlLTg6IDJyZW07CiAgLS10d2VyZW5ib2xkLXNwYWNlLTEwOiAyLjVyZW07CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBCT1JERVIgUkFESVVTCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAtLWJvcmRlci1yYWRpdXM6IDhweDsKICAtLWJvcmRlci1yYWRpdXMtc206IDRweDsKICAtLWJvcmRlci1yYWRpdXMtbGc6IDEycHg7CiAgLS1ib3JkZXItcmFkaXVzLXhsOiAxNnB4OwogIC0tdHdlcmVuYm9sZC1yYWRpdXM6IDhweDsKICAtLXR3ZXJlbmJvbGQtcmFkaXVzLWxnOiAxMnB4OwoKICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgICAgU0hBRE9XUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS1zaGFkb3ctc206IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMDUpOwogIC0tc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA2KTsKICAtLXNoYWRvdy1tZDogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wNyksIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgLS1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7CiAgLS1zaGFkb3cteGw6IDAgMjBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA0KTsKCiAgLS10d2VyZW5ib2xkLXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpOwogIC0tdHdlcmVuYm9sZC1zaGFkb3ctbGc6IDAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpOwogIC0tdHdlcmVuYm9sZC1zaGFkb3cteGw6IDAgMjBweCAyNXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDEwcHggMTBweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4wNCk7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBUUkFOU0lUSU9OUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLS10cmFuc2l0aW9uLWZhc3Q6IDAuMTVzIGVhc2UtaW4tb3V0OwogIC0tdHJhbnNpdGlvbjogMC4ycyBlYXNlLWluLW91dDsKICAtLXRyYW5zaXRpb24tc2xvdzogMC4zcyBlYXNlLWluLW91dDsKICAtLXR3ZXJlbmJvbGQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBaLUlOREVYCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAtLXotZHJvcGRvd246IDEwMDA7CiAgLS16LXN0aWNreTogMTAyMDsKICAtLXotZml4ZWQ6IDEwMzA7CiAgLS16LW1vZGFsLWJhY2tkcm9wOiAxMDQwOwogIC0tei1tb2RhbDogMTA1MDsKICAtLXotcG9wb3ZlcjogMTA2MDsKICAtLXotdG9vbHRpcDogMTA3MDsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIEJSRUFLUE9JTlRTIChmb3IgcmVmZXJlbmNlKQogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogTm90ZTogVGhlc2UgYXJlIGZvciByZWZlcmVuY2Ugb25seSwgYWN0dWFsIG1lZGlhIHF1ZXJpZXMgc2hvdWxkIGJlIGluIGNvbXBvbmVudHMgKi8KICAtLWJyZWFrcG9pbnQtc206IDY0MHB4OwogIC0tYnJlYWtwb2ludC1tZDogNzY4cHg7CiAgLS1icmVha3BvaW50LWxnOiAxMDI0cHg7CiAgLS1icmVha3BvaW50LXhsOiAxMjgwcHg7CgogIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICBDT01QT05FTlQgU1BFQ0lGSUMgVkFSSUFCTEVTCiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKICAvKiBGb3JtIEVsZW1lbnRzICovCiAgLS1pbnB1dC1oZWlnaHQ6IDQwcHg7CiAgLS1pbnB1dC1ib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpOwogIC0taW5wdXQtYm9yZGVyLWZvY3VzOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvcik7CiAgLS1pbnB1dC1ib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKCiAgLyogQnV0dG9ucyAqLwogIC0tYnV0dG9uLXByaW1hcnktYmc6IHZhcigtLXByaW1hcnktY29sb3IpOwogIC0tYnV0dG9uLXByaW1hcnktY29sb3I6IHdoaXRlOwogIC0tYnV0dG9uLXNlY29uZGFyeS1iZzogdHJhbnNwYXJlbnQ7CiAgLS1idXR0b24tc2Vjb25kYXJ5LWNvbG9yOiB2YXIoLS1wcmltYXJ5LWNvbG9yKTsKICAtLWJ1dHRvbi1zZWNvbmRhcnktYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeS1jb2xvcik7CgogIC8qIENhcmRzICovCiAgLS1jYXJkLXBhZGRpbmc6IHZhcigtLXNwYWNpbmctbGcpOwogIC0tY2FyZC1ib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKICAtLWNhcmQtc2hhZG93OiB2YXIoLS1zaGFkb3cpOwoKICAvKiBOYXZpZ2F0aW9uICovCiAgLS1uYXYtaGVpZ2h0OiA2MHB4OwogIC0tbmF2LWJnOiB2YXIoLS1iZy1jb2xvcik7CiAgLS1uYXYtYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsKCiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgIFRIRU1FIE9WRVJSSURFUwogICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCiAgLyogVHdlcmVuYm9sZCBUaGVtZSAqLwogIC0tdHdlcmVuYm9sZC1ib3JkZXItcmFkaXVzOiAxMnB4OwoKICAvKiBWb2VnZWxlIFRoZW1lICovCiAgLS12b2VnZWxlLXByaW1hcnk6ICMxYTM2NWQ7CiAgLS12b2VnZWxlLXNlY29uZGFyeTogIzJkMzc0ODsKCiAgLyogSW1iYWNoIFRoZW1lICovCiAgLS1pbWJhY2gtcHJpbWFyeTogIzZkYTVjZDsKICAtLWltYmFjaC1zZWNvbmRhcnk6ICM0YTU1Njg7CgogICAvKiBNaXR0ZWx0aHVyZ2F1IFRoZW1lICovCiAgIC0tbWl0dGVsdGh1cmdhdS1wcmltYXJ5OiAjNjMyNTRhOwogICAtLW1pdHRlbHRodXJnYXUtc2Vjb25kYXJ5OiAjYjQ4YzY1OwoKICAgLyogRXhjZWxsZW5jZSBUaGVtZSAqLwogICAtLWV4Y2VsbGVuY2UtcHJpbWFyeTogI2I2OTg1NDsKICAgLS1leGNlbGxlbmNlLXNlY29uZGFyeTogIzRhNTU2ODsKCiAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgICAgRVhURU5ERUQgQ09NUE9ORU5UIFRPS0VOUwogICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgogICAvKiBCdXR0b24gU3BlY2lmaWNzICovCiAgIC0tYnRuLXBhZGRpbmcteTogMC43NXJlbTsKICAgLS1idG4tcGFkZGluZy14OiAxcmVtOwogICAtLWJ0bi1mb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS1zbSk7CiAgIC0tYnRuLWJvcmRlci1yYWRpdXM6IDk5OXB4OyAvKiBEZWZhdWx0IHBpbGwgc2hhcGUgKi8KICAgLS1idG4tdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7CiAgIAogICAvKiBJbnB1dCBTcGVjaWZpY3MgKi8KICAgLS1pbnB1dC1wYWRkaW5nOiAwLjc1cmVtOwogICAtLWlucHV0LWJnOiB2YXIoLS1iZy1jb2xvcik7CiAgIC0taW5wdXQtcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpOwoKICAgLyogTW9kYWwgU3BlY2lmaWNzICovCiAgIC0tbW9kYWwtb3ZlcmxheS1iZzogcmdiYSgxNSwgMjMsIDQyLCAwLjQ1KTsKICAgLS1tb2RhbC1iZzogdmFyKC0tYmctY29sb3IpOwogICAtLW1vZGFsLXJhZGl1czogdmFyKC0tYm9yZGVyLXJhZGl1cy14bCk7CiAgIC0tbW9kYWwtc2hhZG93OiB2YXIoLS1zaGFkb3cteGwpOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIERBUksgTU9ERSBTVVBQT1JUIChPcHRpb25hbCkKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKLyogRGFyayBtb2RlIG92ZXJyaWRlcyBjYW4gYmUgYWRkZWQgaGVyZSBpZiBuZWVkZWQgKi8KLyogQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgewogIDpyb290IHsKICAgICAtLWJnLWNvbG9yOiAjMWEyMDJjOwogICAgLS10ZXh0LWNvbG9yOiAjZjdmYWZjOwogICAgLS10ZXh0LXNlY29uZGFyeTogI2EwYWVjMDsKICAgIC0tY2FyZC1iZzogI2ZmZjsKICAgIC0tYm9yZGVyLWNvbG9yOiAjNGE1NTY4OwogIH0KfSAqLwoKLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBQUklOVCBTVFlMRVMKICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqLwoKQG1lZGlhIHByaW50IHsKICA6cm9vdCB7CiAgICAtLWJnLWNvbG9yOiB3aGl0ZTsKICAgIC0tdGV4dC1jb2xvcjogYmxhY2s7CiAgICAtLXNoYWRvdzogbm9uZTsKICAgIC0tYm9yZGVyLWNvbG9yOiAjY2NjOwogIH0KfQ==", import.meta.url).href, tn = new URL("data:text/css;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBUSEVNRSBDT05GSUdVUkFUSU9OUwogICBUaGVtZS1zcGVjaWZpYyBDU1MgVmFyaWFibGUgT3ZlcnJpZGVzCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgQkFTRSBUSEVNRSAvIERFRkFVTFRTIChCYXNlZCBvbiBUd2VyZW5ib2xkKQogICBBcHBsaWVzIHRvIGFsbCB0aGVtZXMgYXMgYSBmYWxsYmFjay4gCiAgIFNwZWNpZmljIHRoZW1lcyBvbmx5IG5lZWQgdG8gb3ZlcnJpZGUgY2hhbmdlZCB2YWx1ZXMuCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCjpyb290W2RhdGEtdGhlbWVdLApbdGhlbWVdLApbY2xhc3MqPSItdGhlbWUiXSB7CiAgLyogLS0tIENPTE9SUyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1wcmltYXJ5OiAjMDA5NTUzOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjMDA3YTQ0OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgwLCAxNDksIDgzLCAwLjEpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjZTMwNjEzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICNjNDFlM2E7CgoKCiAgLS10aGVtZS10ZXh0OiAjMTExODI3OwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6IHJnYigxMDcsIDExNCwgMTI4KTsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5Y2EzYWY7CgogIC0tdGhlbWUtYmFja2dyb3VuZDogI2ZmZmZmZjsKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjlmYWZiOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2YzZjRmNjsKCiAgLS10aGVtZS1ib3JkZXI6ICNlNWU3ZWI7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNmM2Y0ZjY7CgogIC0tdGhlbWUtc3VjY2VzczogIzEwYjk4MTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2Y1OWUwYjsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOwogIC0tdGhlbWUtZXJyb3I6ICNlZjQ0NDQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsKCiAgLyogLS0tIFRZUE9HUkFQSFkgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogdmFyKC0tYnMtYm9keS1mb250LWZhbWlseSwgIkNlbnRyYSBObzIgQm9vayIsICJIZWx2ZXRpY2EiLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZik7CiAgLS10aGVtZS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tYnMtaGVhZGluZy1mb250LWZhbWlseSwgdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSkpOwogIAogIC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZTogNDAwOwogIC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3M6IDcwMDsKCiAgLyogTGVnYWN5IG1hcHBpbmcgZm9yIGJhY2t3YXJkIGNvbXBhdCBpZiBuZWVkZWQgaW50ZXJuYWwgdG8gdGhlbWUgZmlsZSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHk6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwoKICAvKiAtLS0gTEFZT1VUICYgU1BBQ0lORyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1ib3JkZXItcmFkaXVzOiAxMnB4OwogIC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXM6IDk5OXB4OwogIC0tdGhlbWUtY29tcG9uZW50LXBhZGRpbmc6IDJyZW07CiAgLS10aGVtZS1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgLS10aGVtZS1zaGFkb3ctbGc6IDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTsKCiAgLyogLS0tIENPTVBPTkVOVFMgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtbmF2aWdhdGlvbi1ncm91cC1ib3JkZXI6IHZhcigtLXRoZW1lLWJvcmRlciwgMXB4IHNvbGlkICNlNWU3ZWIpOwogIC0tdGhlbWUtYWNjb3VudC1lbWJlZC16LWluZGV4OiAwOwoKICAvKiAtLS0gTEVHQUNZIEFMSUFTRVMgKEJhY2t3YXJkIENvbXBhdGliaWxpdHkpIC0tLSAqLwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5OiB2YXIoLS10aGVtZS1wcmltYXJ5KTsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeS1kYXJrOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5LWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXR3ZXJlbmJvbGQtc2Vjb25kYXJ5OiB2YXIoLS10aGVtZS1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1zZWNvbmRhcnktZGFyazogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC10ZXh0OiB2YXIoLS10aGVtZS10ZXh0KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLXRleHQtc2Vjb25kYXJ5KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWJhY2tncm91bmQpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLXNlY29uZGFyeTogdmFyKC0tdGhlbWUtYmFja2dyb3VuZC1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKICAtLXR3ZXJlbmJvbGQtYm9yZGVyOiB2YXIoLS10aGVtZS1ib3JkZXIpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3M6IHZhcigtLXRoZW1lLXN1Y2Nlc3MpOwogIC0tdHdlcmVuYm9sZC1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXR3ZXJlbmJvbGQtd2FybmluZzogdmFyKC0tdGhlbWUtd2FybmluZyk7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmctYmc6IHZhcigtLXRoZW1lLXdhcm5pbmctYmcpOwogIC0tdHdlcmVuYm9sZC1lcnJvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tdHdlcmVuYm9sZC1lcnJvci1iZzogdmFyKC0tdGhlbWUtZXJyb3ItYmcpOwogIC0tdHdlcmVuYm9sZC1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHkpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItcmFkaXVzOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtYnRuLWJvcmRlci1yYWRpdXM6IHZhcigtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3cpOwogIC0tdGhlbWUtbmF2LWxpbmstcGFkZGluZzogMXJlbTsKCiAgZGlhbG9nLm1vZGFsOjpiYWNrZHJvcHsKICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsIDAuNSk7CiAgfQp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFRIRU1FIE9WRVJSSURFUwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgovKiAtLS0gVFdFUkVOQk9MRCAoRXhwbGljaXQpIC0tLSAqLwovKiBVc2VzIEJhc2UgRGVmYXVsdHMsIG5vIG92ZXJyaWRlcyBuZWVkZWQgY3VycmVudGx5ICovCjpyb290W2RhdGEtdGhlbWU9InR3ZXJlbmJvbGQiXSwKLnR3ZXJlbmJvbGQtdGhlbWUgewogIC8qIEluaGVyaXRzIGRlZmF1bHRzIGZyb20gQmFzZSBUaGVtZSAqLwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS10aGVtZS1tb2JpbGUtbmF2LXRvZ2dsZS1wb3NpdGlvbi10b3A6IDdyZW07Cn0KCi8qIC0tLSBNSVRURUxUSFVSR0FVIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJtaXR0ZWx0aHVyZ2F1Il0sClt0aGVtZT0ibWl0dGVsdGh1cmdhdSJdLAoubWl0dGVsdGh1cmdhdS10aGVtZSB7CiAgLS10aGVtZS1wcmltYXJ5OiAjNjMyNTRhOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjNGQxYjM5OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSg5OSwgMzcsIDc0LCAwLjEyKTsKICAtLXRoZW1lLXNlY29uZGFyeTogI2I0OGM2NTsKICAtLXRoZW1lLXNlY29uZGFyeS1kYXJrOiAjOGQ2YjRjOwoKICAtLXRoZW1lLXRleHQ6ICMzMjE0MjI7CiAgLS10aGVtZS10ZXh0LXNlY29uZGFyeTogIzVmNDk1NDsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5YThiOTM7CgogIC0tdGhlbWUtYm9yZGVyOiAjZTZkY2UyOwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZjNlY2YxOwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICMyZjlkNzg7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDQ3LCAxNTcsIDEyMCwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjZDc5YzNmOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgyMTUsIDE1NiwgNjMsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICNjNzQzNWQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxOTksIDY3LCA5MywgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiB2YXIoLS10aGVtZS1mb250LWZhbWlseS1iYXNlKTsKICAKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAwcHg7CiAgCiAgLS1ib3JkZXItcmFkaXVzLXNtOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLWxnOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLXhsOiAwcHg7Cn0KCi8qIC0tLSBFWENFTExFTkNFIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJleGNlbGxlbmNlIl0sClt0aGVtZT0iZXhjZWxsZW5jZSJdLAouZXhjZWxsZW5jZS10aGVtZSB7CiAgLyogVG9rZW5zIGRlciBuZXVlbiBleGNlbGxlbmNlLmNoIChOdXh0L1RhaWx3aW5kLCBTdGFuZCAxNi4wOS4yMDI2KToKICAgICBwcmltYXJ5LTUwMCAjYjU5NzUyLCBwcmltYXJ5LTYwMCAjYTU4YTRiLCBwcmltYXJ5LTcwMCAjODU2YjM1LAogICAgIHdhcm0tOTAwICM1ZDU4NTMgKFRleHQpLCB3YXJtLTcwMCAjOGU4NzgxLCB3YXJtLTEwMCAjZWNlOWU3LAogICAgIGdyYXktNTAgI2Y4ZjhmOCwgZ3JheS0yMDAgI2RmZGJkNiwgZ3JheS00MDAgI2M1YmRiNSwgZ3JheS02MDAgI2E2OWY5OC4KICAgICBTY2hyaWZ0ZW4gdmlhIFR5cGVraXQgKGzDpGR0IGRpZSBXZWJzaXRlKTogY2FuYWRhLXR5cGUtZ2lic29uIChGbGllc3N0ZXh0KSwKICAgICBpdnlqb3VybmFsIChTZXJpZiksIEZyaXogUXVhZHJhdGEgKEF1c3plaWNobnVuZykuIFJhZGl1cyAycHgsIEJ1dHRvbnMKICAgICB1cHBlcmNhc2UgbWl0IExldHRlcnNwYWNpbmcgd2llIC5idXR0b24gZGVyIFdlYnNpdGUuICovCiAgLS10aGVtZS1wcmltYXJ5OiAjYjU5NzUyOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjODU2YjM1OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgxODEsIDE1MSwgODIsIDAuMTQpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICM0NDNmM2I7CgogIC0tdGhlbWUtdGV4dDogIzAwMDAwMDsKICAtLXRoZW1lLXRleHQtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtdGV4dC1tdXRlZDogIzhlODc4MTsKCiAgLS10aGVtZS1iYWNrZ3JvdW5kLXNlY29uZGFyeTogI2Y4ZjhmODsKICAtLXRoZW1lLWJhY2tncm91bmQtbXV0ZWQ6ICNlY2U5ZTc7CgogIC0tdGhlbWUtYm9yZGVyOiAjZGZkYmQ2OwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZWNlOWU3OwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICM2YTg0MjQ7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDEwNiwgMTMyLCAzNiwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjYTU4YTRiOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgxNjUsIDEzOCwgNzUsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICM4ZDMzMjk7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxNDEsIDUxLCA0MSwgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ2NhbmFkYS10eXBlLWdpYnNvbicsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiAnaXZ5am91cm5hbCcsIHVpLXNlcmlmLCBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWY7CiAgLS10aGVtZS1mb250LXdlaWdodC1oZWFkaW5nczogNDAwOwogIC8qIEtLLTIyODogRVhDIG5hdmlnYXRpb24gYW5kIG92ZXJ2aWV3IGNhcmQgdGl0bGVzIHVzZSByZWd1bGFyIHdlaWdodC4gKi8KICAtLWFjY291bnQtbmF2LWZvbnQtd2VpZ2h0OiA0MDA7CiAgLS1hY2NvdW50LWNhcmQtdGl0bGUtZm9udC13ZWlnaHQ6IDQwMDsKICAtLWFjY291bnQtc2VjdGlvbi10aXRsZS1mb250LXdlaWdodDogNDAwOwogIC0tYWNjb3VudC1mb3JtLWxhYmVsLWZvbnQtd2VpZ2h0OiA0MDA7CgogIC0tdGhlbWUtYm9yZGVyLXJhZGl1czogMnB4OwogIC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXM6IDJweDsKCiAgLyogS0stMjI5OiBCdXR0b25zIGdyYXUgbWl0IGhlbGxlcmVtIEdyYXUgYWxzIEhvdmVyLCBTY2hyaWZ0IHNjaHdhcnog4oCUCiAgICAgZW50c3ByaWNodCAuYnV0dG9uLmlzLWdyYXkgZGVyIFdlYnNpdGUgKGdyYXktNDAwIOKGkiBncmF5LTIwMCkuICovCiAgLS1idG4tYm9yZGVyLXJhZGl1czogMnB4OwogIC8qIC5idXR0b24gZGVyIFdlYnNpdGU6IEdld2ljaHQgNDAwLCBWZXJzYWxpZW4sIExhdWZ3ZWl0ZSAwLjQ1cHguICovCiAgLS1idG4tZm9udC13ZWlnaHQ6IDQwMDsKICAtLWJ0bi10ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOwogIC0tYnRuLWxldHRlci1zcGFjaW5nOiAwLjQ1cHg7CiAgLS1idG4tcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOiAjYzViZGI1OwogIC0tYnRuLXByaW1hcnktYm9yZGVyLWNvbG9yOiAjYzViZGI1OwogIC0tYnRuLXByaW1hcnktY29sb3I6ICMwMDAwMDA7CiAgLS1idG4tcHJpbWFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiAjZGZkYmQ2OwogIC0tYnRuLXByaW1hcnktaG92ZXItYm9yZGVyLWNvbG9yOiAjZGZkYmQ2OwogIC0tYnRuLXByaW1hcnktaG92ZXItY29sb3I6ICMwMDAwMDA7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWJhY2tncm91bmQtY29sb3I6ICNlY2U5ZTc7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjogI2M1YmRiNTsKICAtLWJ0bi1zZWNvbmRhcnktaG92ZXItY29sb3I6ICMwMDAwMDA7CgogIC8qIEtvcGZ6ZWlsZW4tTWVuw7wgdW5kIEFibWVsZGUtTGluazogc2Nod2FyeiBzdGF0dCBnb2xkLCBIb3ZlciB3YXJtLTEwMC4gKi8KICAtLWhlYWRlci1tZW51LWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtdHJpZ2dlci1ob3Zlci1jb2xvcjogIzVkNTg1MzsKICAtLWhlYWRlci1tZW51LXByaW1hcnktY29sb3I6ICMwMDAwMDA7CiAgLS1oZWFkZXItbWVudS1hY3Rpb24tY29sb3I6ICMwMDAwMDA7CiAgLS1oZWFkZXItbWVudS1hY3Rpb24taG92ZXItYmc6ICNlY2U5ZTc7CiAgLS1oZWFkZXItbWVudS1hY3Rpb24taG92ZXItY29sb3I6ICMwMDAwMDA7CiAgLS1oZWFkZXItbWVudS1hdmF0YXItYmc6ICNiNTk3NTI7CiAgLS1oZWFkZXItbWVudS1kcm9wZG93bi1ib3JkZXItcmFkaXVzOiAycHg7CgogIC8qIEFibWVsZGVuLUJ1dHRvbiBkZXIgQXV0aC1Lb21wb25lbnRlOiBlY2tpZyB1bmQgaW4gVmVyc2FsaWVuIHdpZSBkaWUgV2Vic2l0ZS4gKi8KICAtLWF1dGgtY29tcG9uZW50LWxvZ291dC1ib3JkZXItcmFkaXVzOiAycHg7CiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICAtLWF1dGgtY29tcG9uZW50LWxvZ291dC1sZXR0ZXItc3BhY2luZzogMC40NXB4Owp9CgovKiAtLS0gVk9FR0VMRSAtLS0gKi8KOnJvb3RbZGF0YS10aGVtZT0idm9lZ2VsZSJdLApbdGhlbWU9InZvZWdlbGUiXSwKLnZvZWdlbGUtdGhlbWUgewogIC0tdGhlbWUtcHJpbWFyeTogIzAwNjA1MjsKICAtLXRoZW1lLXByaW1hcnktZGFyazogIzAwNDIzODsKICAtLXRoZW1lLXByaW1hcnktbGlnaHQ6ICMwMDYwNTFjYjsKICAtLXRoZW1lLXNlY29uZGFyeTogI2IxZDU0ZjsKICAtLXRoZW1lLXNlY29uZGFyeS1kYXJrOiAjMWEyMDJjOwoKICAtLXRoZW1lLXRleHQ6ICMxYTIwMmM7CiAgLS10aGVtZS10ZXh0LXNlY29uZGFyeTogIzRhNTU2ODsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM3MTgwOTY7CgogIC0tdGhlbWUtYmFja2dyb3VuZC1zZWNvbmRhcnk6ICNmN2ZhZmM7CiAgLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkOiAjZWRmMmY3OwoKICAtLXRoZW1lLWJvcmRlcjogI2UyZThmMDsKICAtLXRoZW1lLWJvcmRlci1saWdodDogI2YxZjVmOTsKCiAgLS10aGVtZS1zdWNjZXNzOiAjMzhhMTY5OwogIC0tdGhlbWUtc3VjY2Vzcy1iZzogcmdiYSg1NiwgMTYxLCAxMDUsIDAuMSk7CiAgLS10aGVtZS13YXJuaW5nOiAjZDY5ZTJlOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgyMTQsIDE1OCwgNDYsIDAuMSk7CiAgLS10aGVtZS1lcnJvcjogI2U1M2UzZTsKICAtLXRoZW1lLWVycm9yLWJnOiByZ2JhKDIyOSwgNjIsIDYyLCAwLjEpOwoKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2U6IEV1Y2xpZENpcmN1bGFyQiwgQWxsZXIsICdTZWdvZSBVSScsIHNhbnMtc2VyaWY7CiAgLS10aGVtZS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CiAgLS10aGVtZS1mb250LXdlaWdodC1oZWFkaW5nczogNzAwOwogIC0taGVhZGxpbmUtY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnkpOwogIC0tdGl0bGUtY29sb3I6IHZhcigtLWhlYWRsaW5lLWNvbG9yKTsKICAtLXN1YnRpdGxlLWNvbG9yOiByZ2JhKDI5LCAyOSwgMjksIDAuNik7CgogIC0tdGhlbWUtYm9yZGVyLXJhZGl1czogMHB4OwogIC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXM6IDNweDsKICAtLXRoZW1lLWNvbXBvbmVudC1wYWRkaW5nOiAwcmVtOwogIAogIC8qIFZvZWdlbGUgU3BlY2lmaWNzICovCiAgLS1jYXJkLXBhZGRpbmc6IDEuNXJlbTsKICAtLWNhcmQtYm9yZGVyLXdpZHRoOiAwcHg7CgogIC0tYnRuLXByaW1hcnktaG92ZXItY29sb3I6ICNmZmY7CiAgLS1idG4tcHJpbWFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeS1saWdodCk7CgogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1jb2xvcjogI2ZmZjsKICAtLWJ0bi1zZWNvbmRhcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeS1saWdodCk7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeS1saWdodCk7CgogIC8qIE5vdGU6IFJlLWRlY2xhcmluZyBhIHZhbHVlIGlkZW50aWNhbCB0byBkZWZhdWx0IGlzIGhhcm1sZXNzIChzaGFkb3cpICovCiAgLS10d2VyZW5ib2xkLXNoYWRvdzogcmdiYSgxNSwgMjMsIDQyLCAwLjE4KSAwcHggMjRweCA0OHB4IC0yNHB4OwogIC0tdHdlcmVuYm9sZC1zaGFkb3ctbGc6IHJnYmEoMTUsIDIzLCA0MiwgMC4yNSkgMHB4IDMwcHggNjBweCAtMzBweDsKCiAgLyogSGVhZGVyIE1lbnUgU3BlY2lmaWNzIChWb2VnZWxlIE9ubHkpICovCiAgLS1oZWFkZXItbWVudS1hdmF0YXItYmc6ICNhZTk5NWI7CiAgLS1oZWFkZXItbWVudS1hdmF0YXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7Cn0KCi8qIC0tLSBJTUJBQ0ggLS0tICovCjpyb290W2RhdGEtdGhlbWU9ImltYmFjaCJdLApbdGhlbWU9ImltYmFjaCJdLAouaW1iYWNoLXRoZW1lIHsKICAtLXRoZW1lLXByaW1hcnk6ICM2ZGE1Y2Q7CiAgLS10aGVtZS1wcmltYXJ5LWRhcms6ICMwMDQxNWQ7CiAgLS10aGVtZS1wcmltYXJ5LWxpZ2h0OiByZ2JhKDQ1LCA1NSwgNzIsIDAuMSk7CiAgLS10aGVtZS1zZWNvbmRhcnk6ICM0YTU1Njg7CiAgLS10aGVtZS1zZWNvbmRhcnktZGFyazogIzAwNDE1ZDsKCiAgLS10aGVtZS10ZXh0OiAjMDA0MTVkOwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6ICMwMDQxNWQ7CiAgLS10aGVtZS10ZXh0LW11dGVkOiAjNzE4MDk2OwoKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjhmOWZhOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2U5ZWNlZjsKCiAgLS10aGVtZS1ib3JkZXI6ICNkZWUyZTY7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNlOWVjZWY7CgogIC0tdGhlbWUtc3VjY2VzczogIzI4YTc0NTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoNDAsIDE2NywgNjksIDAuMSk7CiAgLS10aGVtZS13YXJuaW5nOiAjZmZjMTA3OwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgyNTUsIDE5MywgNywgMC4xKTsKICAtLXRoZW1lLWVycm9yOiAjZGMzNTQ1OwogIC0tdGhlbWUtZXJyb3ItYmc6IHJnYmEoMjIwLCA1MywgNjksIDAuMSk7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogR2lscm95LCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3M6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwoKICAvKiBNYXRjaCB0aGUgaG9zdCBzaXRlJ3MgR2lscm95IE1lZGl1bSAoNDAwKSBhbmQgQmxhY2sgKDcwMCkgZmFjZXMuICovCiAgLS10aGVtZS1mb250LXdlaWdodC1oZWFkaW5nczogNzAwOwogIC0tYWNjb3VudC1uYXYtZm9udC13ZWlnaHQ6IDcwMDsKICAtLWFjY291bnQtbmF2LWZvbnQtc2l6ZTogMTZweDsKICAtLWFjY291bnQtbmF2LWxldHRlci1zcGFjaW5nOiAwLjhweDsKICAtLWFjY291bnQtbmF2LWNvbG9yOiAjMDA0MTVkOwogIC0tYWNjb3VudC1jYXJkLXRpdGxlLWZvbnQtd2VpZ2h0OiA3MDA7CiAgLS1hY2NvdW50LXNlY3Rpb24tdGl0bGUtZm9udC13ZWlnaHQ6IDcwMDsKICAtLWFjY291bnQtZm9ybS1sYWJlbC1mb250LXdlaWdodDogNDAwOwogIC0tYWNjb3VudC1zaWRlYmFyLXRpdGxlLWZvbnQtc2l6ZTogMS41cmVtOwoKICAtLWJ0bi1mb250LXdlaWdodDogNzAwOwogIC0tYnRuLWZvbnQtc2l6ZTogMS4xMjVyZW07CiAgLS1idG4tbGV0dGVyLXNwYWNpbmc6IDAuOXB4OwogIC0tYXV0aC1jb21wb25lbnQtbG9nb3V0LWZvbnQtd2VpZ2h0OiB2YXIoLS1idG4tZm9udC13ZWlnaHQpOwogIC0tYXV0aC1jb21wb25lbnQtbG9nb3V0LWZvbnQtc2l6ZTogdmFyKC0tYnRuLWZvbnQtc2l6ZSk7CiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtbGV0dGVyLXNwYWNpbmc6IHZhcigtLWJ0bi1sZXR0ZXItc3BhY2luZyk7CiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXMpOwogIAogIC0tdGhlbWUtYm9yZGVyLXJhZGl1czogMzBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAwcHg7CiAgLS10aGVtZS1tb2JpbGUtbmF2LXRvZ2dsZS1wb3NpdGlvbi10b3A6IDdyZW07Cn0KCi8qIEtlZXAgdGhlIGFjY291bnQgc2lkZWJhciBzdWJvcmRpbmF0ZSB0byBpdHMgcGFnZSB0aXRsZSBvbiBJbWJhY2ggb25seS4gKi8KLnR3ZXJlbmJvbGQtYWNjb3VudC1lbWJlZC1yb290OmlzKFt0aGVtZT0iaW1iYWNoIl0sIC5pbWJhY2gtdGhlbWUpIC5zaWRlYmFyLXRpdGxlIHsKICBmb250LXNpemU6IHZhcigtLWFjY291bnQtc2lkZWJhci10aXRsZS1mb250LXNpemUpOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFNZU1RFTSBWQVJJQUJMRSBNQVBQSU5HCiAgIE1hcHMgVGhlbWUtU3BlY2lmaWMgVmFyaWFibGVzIChMZWZ0KSB0byBHZW5lcmljIFN5c3RlbSBWYXJpYWJsZXMgKFJpZ2h0KQogICBUaGlzIGlzIHRoZSBBUEkgY29uc3VtZWQgYnkgc2hhcmVkLXN0eWxlcy5qcwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgo6cm9vdFtkYXRhLXRoZW1lXSwKW3RoZW1lXSwKW2NsYXNzKj0iLXRoZW1lIl0gewogIC8qIENvbG9ycyAqLwogIC0tcHJpbWFyeS1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeSk7CiAgLS1wcmltYXJ5LWNvbG9yLWRhcms6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS1wcmltYXJ5LWNvbG9yLWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXNlY29uZGFyeS1jb2xvcjogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5KTsKICAtLXNlY29uZGFyeS1jb2xvci1kYXJrOiB2YXIoLS10aGVtZS1zZWNvbmRhcnktZGFyayk7CgogIC0tdGV4dC1jb2xvcjogdmFyKC0tdGhlbWUtdGV4dCk7CiAgLS10ZXh0LXNlY29uZGFyeTogdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpOwogIC0tdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CgogIC0taGVhZGxpbmUtY29sb3I6IHZhcigtLWhlYWRsaW5lLWNvbG9yLCB2YXIoLS10aGVtZS10ZXh0KSk7CiAgLS10aXRsZS1jb2xvcjogdmFyKC0tdGl0bGUtY29sb3IsIHZhcigtLXRoZW1lLXRleHQpKTsKICAtLXN1YnRpdGxlLWNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1jb2xvciwgdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpKTsKCiAgLS1iZy1jb2xvcjogdmFyKC0tdGhlbWUtYmFja2dyb3VuZCk7CiAgLS1iZy1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5KTsKICAtLWJnLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKCiAgLS1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLWJvcmRlcik7CiAgLS1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CgogIC8qIFN0YXR1cyAqLwogIC0tc3VjY2Vzcy1jb2xvcjogdmFyKC0tdGhlbWUtc3VjY2Vzcyk7CiAgLS1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXdhcm5pbmctY29sb3I6IHZhcigtLXRoZW1lLXdhcm5pbmcpOwogIC0td2FybmluZy1iZzogdmFyKC0tdGhlbWUtd2FybmluZy1iZyk7CiAgLS1lcnJvci1jb2xvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tZXJyb3ItYmc6IHZhcigtLXRoZW1lLWVycm9yLWJnKTsKCiAgLyogVHlwb2dyYXBoeSAqLwogIC0tZm9udC1mYW1pbHktYmFzZTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CiAgLS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3MpOwogIC0tZm9udC13ZWlnaHQtYmFzZTogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZSk7CiAgLS1mb250LXdlaWdodC1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3MpOwogIAogIC8qIExlZ2FjeS9HZW5lcmljIGZhbGxiYWNrICovCiAgLS1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CgogIC8qIExheW91dCAqLwogIC0tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1ib3JkZXItcmFkaXVzLXNtOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLWJvcmRlci1yYWRpdXMtbGc6IHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMpOwogIC0tYm9yZGVyLXJhZGl1cy14bDogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1idG4tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXMsIHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMsIDk5OXB4KSk7CgogIC0tY29tcG9uZW50LXBhZGRpbmc6IHZhcigtLXRoZW1lLWNvbXBvbmVudC1wYWRkaW5nLCAycmVtKTsKICAKICAvKiBTaGFkb3dzICovCiAgLS1ib3gtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3csIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSkpOwogIC0tYm94LXNoYWRvdy1zbTogdmFyKC0tdGhlbWUtc2hhZG93LCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KSk7CiAgLS1ib3gtc2hhZG93LWxnOiB2YXIoLS10aGVtZS1zaGFkb3ctbGcsIDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7Cn0K", import.meta.url).href, Gi = "twerenbold-account-embed-root", rn = ["twerenbold", "voegele", "imbach", "mittelthurgau", "excellence"], Z = De("AccountPortalEmbed"), on = `
${Mo(`.${Gi}`)}

  /* Light DOM styles - no Shadow DOM isolation */
  twerenbold-account-embed {
    display: block;
    width: 100%;
  }

  .${Gi} {
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
  font-weight: var(--btn-font-weight, 600);
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
  font-size: var(--account-nav-font-size, 1.1rem);
  letter-spacing: var(--account-nav-letter-spacing, inherit);
  font-weight: var(--account-nav-font-weight, 500);
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  width: auto;
  text-align: left;
  border-radius: calc(var(--theme-border-radius, 16px));
  text-decoration: none;
}

.twerenbold-account-embed-root .nav-link:hover,
.twerenbold-account-embed-root .nav-link:hover * {
  text-decoration: none;
}

.twerenbold-account-embed-root .nav-link:not(.active):hover {
  transform: translateX(2px);
}

.twerenbold-account-embed-root .nav-link:not(.active),
.twerenbold-account-embed-root .nav-link:not(.active) p {
  color: var(--account-nav-color, #111827);
}

.twerenbold-account-embed-root .nav-link p {
  font-size: inherit;
  letter-spacing: inherit;
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
  /* The host footer/header can otherwise paint over our nested fixed drawer. */
  .twerenbold-account-embed-root.sidebar-open {
    z-index: var(--account-mobile-menu-z-index, 1200);
  }

  html:has(.twerenbold-account-embed-root.sidebar-open),
  body:has(.twerenbold-account-embed-root.sidebar-open) {
    overflow: hidden;
    overscroll-behavior: none;
  }

  .twerenbold-account-embed-root.sidebar-open .mobile-nav-toggle {
    position: fixed;
    top: max(0.75rem, env(safe-area-inset-top));
    right: 1rem;
    margin: 0;
  }

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
    height: 100dvh;
    min-height: 0;
    box-sizing: border-box;
    width: min(85vw, 320px);
    transform: translateX(-105%);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.35);
    z-index: 1150;
    padding: 2rem 1.5rem 3rem;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    padding-bottom: calc(3rem + env(safe-area-inset-bottom));
    background: #ffffff;
    margin-left: 0rem;
  }

  /* Scroll the complete drawer instead of shrinking/clipping its navigation. */
  .twerenbold-account-embed-root .sidebar > * {
    flex-shrink: 0;
  }

  .twerenbold-account-embed-root .sidebar .navigation-group {
    overflow: visible;
    max-height: none;
  }

  .twerenbold-account-embed-root .sidebar.is-open {
    transform: translateX(0);
  }

  /* Reserve only the close-button row, independent of host header spacing. */
  .twerenbold-account-embed-root .twerenbold-account-portal .sidebar {
    padding-top: calc(4.75rem + env(safe-area-inset-top)) !important;
  }

  .twerenbold-account-embed-root .twerenbold-account-portal .sidebar-title {
    display: none;
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

`, an = (
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
), nn = (
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
), sn = on + an + nn;
function ln(l) {
  if (typeof document > "u")
    return null;
  const t = `; ${document.cookie}`.split(`; ${l}=`);
  return t.length === 2 ? t.pop().split(";").shift() : null;
}
function cn(l = {}) {
  const e = /* @__PURE__ */ new Set(["demo", "local", "live"]), t = ln("apiMode");
  let i = null;
  if (Z.debug("resolveInitialConfig - cookie apiMode:", t), Z.debug("resolveInitialConfig - options.apiMode:", l.apiMode), typeof localStorage < "u")
    try {
      i = localStorage.getItem("selectedTheme");
    } catch (o) {
      Z.warn("Unable to access localStorage for theme preference:", o), i = null;
    }
  const r = l.apiMode && e.has(l.apiMode) ? l.apiMode : e.has(t) ? t : "demo";
  return Z.debug("Resolved initial API mode:", r), {
    apiMode: r,
    theme: Ao(l.theme || i || "twerenbold"),
    useHashRouting: !!l.useHashRouting
  };
}
function Ao(l) {
  if (typeof l != "string") return "twerenbold";
  const e = l.trim();
  return !e || !/^[a-z0-9_-]{1,32}$/i.test(e) ? "twerenbold" : e;
}
const dn = (
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
async function hn() {
  await To();
}
async function un() {
  const l = [
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
  await Promise.all(l.map((e) => customElements.whenDefined(e)));
}
const Ii = (l, e) => {
  const t = document.createElement("link");
  return t.rel = "stylesheet", t.href = l, t.setAttribute("data-twerenbold-style", e), t;
};
async function gn(l, e = {}) {
  if (oi) return null;
  if (!l)
    throw new Error("mountAccountPortal: container element is required");
  l.setAttribute("data-twerenbold-portal-mount", "");
  const t = cn(e);
  pn(l, t.theme || "twerenbold"), typeof window < "u" && (window.__twerenboldPreferredApiMode = t.apiMode, Z.debug("Setting preferred API mode BEFORE provider init:", t.apiMode)), await hn(), await un();
  const i = document.createElement("div");
  i.className = Gi, i.dataset.portal = "wrapper", i.appendChild(Ii(Qa, "fonts")), i.appendChild(Ii(en, "variables")), i.appendChild(Ii(tn, "theme"));
  const r = document.createElement("style");
  r.textContent = sn, i.appendChild(r), i.insertAdjacentHTML("beforeend", dn), l.replaceChildren(i);
  const o = await mn(i, { ...e, initialConfig: t });
  return i.__twerenboldPortalController = o, o;
}
function pn(l, e = "twerenbold") {
  const t = Ao(e), i = (
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
  l.innerHTML = i;
  const r = l.querySelector(".twerenbold-initial-loader");
  r && (r.dataset.theme = t);
}
function Yr(l) {
  if (l.querySelector('[data-portal="azure-loader"]'))
    return;
  l.insertAdjacentHTML(
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
function Vr(l) {
  const e = l.querySelector('[data-portal="azure-loader"]');
  e && (e.style.opacity = "0", setTimeout(() => e.remove(), 300));
}
async function mn(l, e) {
  const t = l.querySelector('[data-portal="provider"]'), i = l.querySelector('[data-portal="main-content"]'), r = Array.from(l.querySelectorAll('[data-portal="nav-link"]')), o = l.querySelector('[data-portal="api-mode-select"]'), a = l.querySelector('[data-portal="api-mode-hint"]'), n = l.querySelector('[data-portal="theme-select"]'), s = l.querySelector('[data-portal="theme-hint"]'), c = l.querySelector(".support-block"), p = l.querySelector('[data-portal="auth-section"]'), d = l.querySelector('[data-portal="api-mode-section"]'), g = l.querySelector('[data-portal="theme-section"]'), h = l.querySelector('[data-portal="sidebar-nav"]'), f = l.querySelector('[data-portal="sidebar-backdrop"]'), v = l.querySelector('[data-portal="mobile-toggle"]'), y = l.querySelector('[data-portal="mobile-label"]'), S = l.querySelector('[data-portal="mobile-assistive"]');
  if (!t || !i)
    throw new Error("Failed to initialize account portal: required elements missing.");
  sessionStorage.getItem("twerenbold_pending_auth") === "true" && (Z.debug("Pending auth detected - hiding portal until Azure Functions complete"), t.classList.add("pending-auth"), Yr(l), setTimeout(() => {
    t.classList.contains("pending-auth") && (Z.warn("Auth pending state timed out (15s) - force revealing portal"), t.classList.remove("pending-auth"), t.classList.add("auth-ready"), sessionStorage.removeItem("twerenbold_pending_auth"), Vr(l), t.state && be(t.state));
  }, 15e3)), i.style.viewTransitionName = "portal-main-content", await customElements.whenDefined("app-state-provider");
  const E = [], I = (b, T, k, _) => {
    b && (b.addEventListener(T, k, _), E.push(() => b.removeEventListener(T, k, _)));
  }, Y = (b, T) => {
    b && (typeof b.addEventListener == "function" ? (b.addEventListener("change", T), E.push(() => b.removeEventListener("change", T))) : typeof b.addListener == "function" && (b.addListener(T), E.push(() => b.removeListener(T))));
  }, he = () => {
    Z.debug("Showing Azure Functions fullscreen loader"), Yr(l);
  }, yt = () => {
    Z.debug("Hiding Azure Functions fullscreen loader and revealing portal"), Vr(l), t.classList.contains("pending-auth") && (t.classList.remove("pending-auth"), t.classList.add("auth-ready"));
  };
  I(document, "azure-functions-wait-start", he), I(document, "azure-functions-wait-end", yt);
  const Tt = l.querySelector('[data-portal="global-spinner"]'), Ut = l.querySelector('[data-portal="global-spinner-tooltip"]');
  if (Tt) {
    let b = null;
    const T = (k) => {
      var J, ne;
      const _ = ((J = k.detail) == null ? void 0 : J.activeRequests) || [], L = (ne = k.detail) == null ? void 0 : ne.startTime;
      if (k.type === "api-loading-start" || _.length > 0) {
        Tt.classList.add("visible");
        const ye = () => {
          if (!Ut) return;
          let ge = "";
          if (_.length > 0) {
            const pe = _.slice(0, 3), Te = _.length - 3;
            ge = pe.join(", "), Te > 0 && (ge += ` (+${Te})`);
          } else
            ge = "Laden...";
          if (L) {
            const pe = Math.floor((Date.now() - L) / 1e3);
            pe > 0 && (ge += ` (${pe}s)`);
          }
          Ut.textContent = ge;
        };
        ye(), !b && L && (b = setInterval(ye, 1e3));
      } else
        Tt.classList.remove("visible"), b && (clearInterval(b), b = null);
    };
    I(document, "api-loading-start", T), I(document, "api-loading-end", T);
  }
  const si = (b, T, k) => {
    let _ = "";
    {
      const R = /* @__PURE__ */ new Date();
      R.setTime(R.getTime() + k * 24 * 60 * 60 * 1e3), _ = `; expires=${R.toUTCString()}`;
    }
    const L = `${b}=${T || ""}${_}; path=/`;
    document.cookie = L, Z.debug(`Setting cookie: ${b}=${T} (expires in ${k} days)`), Z.debug(`Cookie string: ${L}`), Z.debug("Verification - readback:", V(b));
  }, V = (b) => {
    const T = `${b}=`, k = document.cookie.split(";");
    for (let _ = 0; _ < k.length; _ += 1) {
      let L = k[_];
      for (; L.charAt(0) === " "; )
        L = L.substring(1, L.length);
      if (L.indexOf(T) === 0)
        return L.substring(T.length, L.length);
    }
    return null;
  }, We = e.initialConfig || {}, Fe = !!(e.useHashRouting ?? We.useHashRouting), At = ["demo", "local", "live"];
  let U = We.apiMode ?? e.apiMode ?? V("apiMode") ?? "live";
  At.includes(U) || (U = "live");
  let N = We.theme ?? e.theme ?? null;
  if (!N && typeof localStorage < "u")
    try {
      N = localStorage.getItem("selectedTheme");
    } catch (b) {
      Z.warn("Unable to access localStorage for initial theme:", b);
    }
  N = N || "twerenbold";
  let ce = "";
  o && (o.value = U), n && (n.value = N);
  const _t = () => {
    if (!a) return;
    const b = {
      demo: "Verwenden Sie Mock-Daten für Entwicklung",
      local: 'Demo: <code style="background:#e5e7eb;padding:0.125rem 0.25rem;border-radius:3px;">cd api-demo &amp;&amp; npm start</code>',
      live: "Erfordert OAuth-Authentifizierung"
    };
    a.innerHTML = b[U] || b.demo;
  }, Wt = () => {
    if (!s) return;
    const b = {
      twerenbold: "Twerenbold Theme (Grün)",
      voegele: "Voegele Theme (Dunkelgrün)",
      imbach: "Imbach Theme (Blau)",
      mittelthurgau: "Mittelthurgau Theme (Weinrot)",
      excellence: "Excellence Theme (Gold)"
    };
    s.textContent = b[N] || "Unbekanntes Theme";
  }, St = () => {
    const b = (T, k) => {
      T && (T.hidden = !k, T.style.display = k ? "" : "none");
    };
    b(c, Q("supportBlock", U, N)), b(p, Q("authSection", U, N)), b(d, Q("apiModeSection", U, N)), b(g, Q("themeSwitcherSection", U, N));
  }, z = async () => {
    var k;
    l.setAttribute("theme", N), rn.forEach((_) => l.classList.remove(`${_}-theme`)), l.classList.add(`${N}-theme`);
    let b = { phone: "+41 (0) 56 484 84 84", openingHours: "Mo-Fr: 08:30 - 12:00 / 13:30 - 17:00 Uhr" };
    try {
      const { getConfigFor: _ } = await import("./component-config-BZQIVaLD.js"), L = _(((k = e.initialConfig) == null ? void 0 : k.apiMode) || "live", N);
      Z.debug("Loaded theme config for contact:", { theme: N, contact: L == null ? void 0 : L.contact }), L != null && L.contact && (b = L.contact);
    } catch (_) {
      Z.warn("Could not load component config for contact info:", _);
    }
    const T = l.querySelector(".support-block p");
    if (T) {
      const _ = l.parentElement, L = _ ? _.getAttribute("data-phone") : null, R = _ ? _.getAttribute("data-opening-hours") : null, J = e.phone || L || b.phone, ne = e.openingHours || R || b.openingHours;
      Z.debug("Updating contact info:", { phone: J, hours: ne, source: { options: e.phone, attr: L, config: b.phone } }), T.innerHTML = `
        Telefon: ${J}<br />
        ${ne}
      `;
    }
    St();
  };
  _t(), Wt(), z();
  const Ft = () => {
    P.setMode(U);
  }, B = async (b) => {
    if (!(typeof window > "u"))
      try {
        if (window._watchlistSyncer)
          if (typeof window._watchlistSyncer.destroy == "function")
            window._watchlistSyncer.destroy(), window._watchlistSyncer = null;
          else {
            Z.debug("Existing WatchlistSyncer found without destroy() - assuming external control, skipping auto-init.");
            return;
          }
        const k = (await import("./watchlist-syncer.bundle.js")).default || window.WatchlistSyncer;
        if (k) {
          const _ = P.baseUrl;
          Z.debug("Auto-initializing WatchlistSyncer", { mode: b, baseUrl: _ });
          const R = (await import("./component-config-BZQIVaLD.js")).getConfigFor(b, N), J = (R == null ? void 0 : R.watchlist) || {}, ne = J.providerId;
          window._watchlistSyncer = new k({
            ...J,
            baseUrl: _,
            theme: N,
            //Pass provider ID if found
            ...ne !== void 0 ? { defaultProviderId: ne } : {},
            debug: !1,
            getToken: async () => {
              let ye = 0;
              for (; !P.authComponent && ye < 10; )
                await new Promise((ge) => setTimeout(ge, 500)), ye++;
              return P.authComponent && typeof P.authComponent.getAccessToken == "function" ? await P.authComponent.getAccessToken() : (Z.debug("WatchlistSyncer asked for token but authComponent is missing/invalid after wait"), null);
            }
          });
        }
      } catch (T) {
        Z.warn("Failed to auto-load WatchlistSyncer:", T);
      }
  };
  let tt = !1;
  const W = async () => {
    var b, T;
    if (t) {
      tt = !0;
      try {
        typeof t.setTheme == "function" ? t.setTheme(N) : (b = t._actions) != null && b.setTheme && t._actions.setTheme(N), typeof t.setApiMode == "function" ? await t.setApiMode(U) : (T = t._actions) != null && T.setApiMode && await t._actions.setApiMode(U);
      } catch (k) {
        Z.warn("Failed to sync provider state:", k);
      } finally {
        setTimeout(() => {
          tt = !1;
        }, 100);
      }
    }
  }, Se = () => {
    if (!p) return;
    let b = p.querySelector("oauth-auth-component");
    const T = !b;
    T && (b = document.createElement("oauth-auth-component")), b.setAttribute("theme", N), b.setAttribute("api-mode", U);
    const k = e.oauthRedirectUri || (typeof window < "u" ? window.location.href : void 0), _ = k ? k.split("?")[0].split("#")[0] : void 0;
    _ && (b.setAttribute("redirect-uri", _), Z.debug("OAuth redirect URI set to:", _)), T && p.appendChild(b), t && typeof t.registerAuthComponent == "function" ? (Z.debug("Manually registering OAuth component with app-state-provider"), t.registerAuthComponent(b)) : t && t._actions && typeof t._actions.registerAuthComponent == "function" && (Z.debug("Manually registering OAuth component with app-state-provider (via _actions)"), t._actions.registerAuthComponent(b));
  }, ze = () => {
    const b = h == null ? void 0 : h.querySelector(".sidebar-title");
    b && (b.textContent = O("overlayTitle", "common", "Mein Konto", N)), r.forEach((T) => {
      const k = T.dataset.page;
      if (!k) return;
      const _ = T.querySelector("p");
      _ && (_.textContent = O("pageTitle", k, _.textContent, N));
    });
  }, we = (b, { persist: T = !0, rerender: k = !0 } = {}) => {
    if (b) {
      if (N = b, n && (n.value = N), T)
        try {
          localStorage.setItem("selectedTheme", N);
        } catch (_) {
          Z.warn("Unable to persist theme selection:", _);
        }
      z(), Wt(), ze(), Se(), W(), k && ce && xe(ce, { force: !0, skipTransition: !0, suppressSidebarClose: !0 });
    }
  }, He = (b, { persist: T = !0, rerender: k = !0 } = {}) => {
    b && (Z.debug("applyApiMode →", b, { persist: T, rerender: k }), U = b, o && (o.value = U), T && si("apiMode", U, 30), _t(), Ft(), St(), W(), Se(), k && ce && xe(ce, { force: !0, skipTransition: !0, suppressSidebarClose: !0 }), B(b));
  };
  we(N, { persist: !0, rerender: !1 }), He(U, { persist: !0, rerender: !1 }), requestAnimationFrame(() => {
    Se();
  });
  const Be = window.matchMedia("(max-width: 900px)"), zt = () => {
    if (!h) return;
    h.classList.add("is-open"), l.classList.add("sidebar-open"), f == null || f.classList.add("visible"), v == null || v.setAttribute("aria-expanded", "true"), v == null || v.setAttribute("aria-label", "Navigation schließen"), y && (y.textContent = "Schließen"), S && (S.textContent = "Navigation schließen");
    const b = h.querySelector(".nav-link");
    b && requestAnimationFrame(() => b.focus({ preventScroll: !0 }));
  }, Ce = ({ skipFocus: b = !1 } = {}) => {
    if (!h) return;
    const T = h.classList.contains("is-open");
    h.classList.remove("is-open"), l.classList.remove("sidebar-open"), f == null || f.classList.remove("visible"), v == null || v.setAttribute("aria-expanded", "false"), v == null || v.setAttribute("aria-label", "Navigation öffnen"), y && (y.textContent = "Menü"), S && (S.textContent = "Navigation öffnen"), T && v && !b && requestAnimationFrame(() => v.focus({ preventScroll: !0 }));
  };
  I(v, "click", () => {
    h && (h.classList.contains("is-open") ? Ce() : zt());
  }), I(f, "click", () => Ce({ skipFocus: !0 })), I(document, "keydown", (b) => {
    b.key === "Escape" && Ce({ skipFocus: !0 });
  });
  const Ye = (b) => {
    b.matches || Ce({ skipFocus: !0 });
  };
  Y(Be, Ye), Be && Ye(Be), r.forEach((b) => {
    I(b, "click", (T) => {
      T.preventDefault();
      const k = b.dataset.page;
      xe(k);
    });
  }), I(o, "change", () => He(o.value)), I(n, "change", () => we(n.value));
  const be = (b) => {
    if (!b) return;
    try {
      if (!!b.isAuthenticated)
        h && (h.classList.remove("hidden"), h.style.display = ""), v && (v.style.display = "");
      else {
        h && (h.classList.add("hidden"), h.style.display = "none", Ce({ skipFocus: !0 })), v && (v.style.display = "none");
        return;
      }
    } catch (L) {
      Z.warn("updateNavigationVisibility auth check failed:", L);
    }
    const T = r.find((L) => L.dataset.page === "trips"), k = r.find((L) => L.dataset.page === "merkliste"), _ = r.find((L) => L.dataset.page === "club");
    if (T && (b.trips && b.trips.length > 0 ? (T.classList.remove("hidden"), T.style.display = "") : T.classList.add("hidden")), k && (Q("favorites", b.apiMode, b.theme) ? (k.classList.remove("hidden"), k.style.display = "") : k.classList.add("hidden")), _) {
      const L = Q("clubStatus", b.apiMode, b.theme), R = b.accountClubStatus && (b.accountClubStatus.memberId || b.accountClubStatus.currentStatus);
      L && (R || b.apiMode === "demo") ? (_.classList.remove("hidden"), _.style.display = "") : _.classList.add("hidden");
    }
  };
  I(t, "app-state-changed", (b) => {
    var k;
    const T = (k = b == null ? void 0 : b.detail) == null ? void 0 : k.newState;
    if (T) {
      if (!tt) {
        const _ = T.apiMode;
        _ && _ !== U && (Z.debug("Provider apiMode changed externally:", _), He(_, { persist: !0, rerender: !1 })), o && o.value !== U && (o.value = U);
      }
      be(T), ze();
    }
  }), t && t.state && be(t.state), ze();
  const it = {
    overview: () => {
      const b = document.createElement("account-overview-component");
      return b.setAttribute("theme", N), b.setAttribute("api-mode", U), b;
    },
    account: () => {
      const b = document.createElement("account-manager");
      return b.setAttribute("theme", N), b.setAttribute("api-mode", U), b.setAttribute("auto-load-account-data", ""), b;
    },
    trips: () => {
      const b = document.createElement("div");
      b.style.display = "flex", b.style.flexDirection = "column", b.style.gap = "2rem", b.style.width = "100%";
      const T = document.createElement("trips-list-component");
      return T.setAttribute("theme", N), T.setAttribute("api-mode", U), b.appendChild(T), b;
    },
    merkliste: () => {
      const b = document.createElement("favorites-list");
      return b.setAttribute("theme", N), b.setAttribute("api-mode", U), b;
    },
    newsletter: () => {
      const b = document.createElement("newsletter-signup");
      return b.setAttribute("theme", N), b.setAttribute("api-mode", U), b;
    },
    club: () => {
      const b = document.createElement("club-status-component");
      return b.setAttribute("theme", N), b.setAttribute("api-mode", U), b;
    }
  }, ke = ["overview", "account", "trips", "merkliste", "newsletter", "club"], rt = (b, T) => {
    const k = ke.indexOf(b), _ = ke.indexOf(T);
    return k === -1 || _ === -1 ? "fade" : _ > k ? "slide-right" : _ < k ? "slide-left" : "scale";
  }, ot = () => {
    if (sessionStorage.getItem("twerenbold_pending_auth") === "true")
      return !0;
    const b = window.location.hash || "";
    return b.includes("code=") || b.includes("state=") || b.includes("error=");
  }, Ct = (b) => {
    if (!Fe)
      return;
    if (ot()) {
      Z.debug("Skipping hash sync to preserve auth redirect fragment");
      return;
    }
    const T = `#${b}`;
    window.location.hash !== T && history.replaceState(null, "", T);
  }, Bt = typeof document.startViewTransition == "function", xe = async (b, { force: T = !1, skipTransition: k = !1, suppressSidebarClose: _ = !1, skipHashUpdate: L = !1 } = {}) => {
    const R = it[b] ? b : "overview", J = i.children.length > 0;
    if (!T && ce === R && J) {
      Ct(R);
      return;
    }
    const ne = !!ce, ge = `page-transition-${rt(ce, R)}`, pe = () => {
      r.forEach((se) => se.classList.toggle("active", se.dataset.page === R));
    }, Te = () => {
      const se = it[R], nt = se ? se() : document.createElement("div");
      se || (nt.textContent = "Seite nicht gefunden."), i.innerHTML = "", i.appendChild(nt);
    }, Gt = () => {
      i.classList.remove("fade-in");
    }, Ee = () => {
      ce = R;
      const se = O("pageTitle", R, "Account", N), nt = O("companyName", "trips", "Twerenbold Reisen", N);
      se && (document.title = `${se} – Kundenkonto – ${nt}`), L || Ct(R), _ || Ce({ skipFocus: !ne });
    };
    if (k || !Bt) {
      pe(), Te(), i.classList.add("fade-in"), setTimeout(Gt, 320), Ee();
      return;
    }
    l.classList.add(ge, "page-transitioning");
    try {
      await document.startViewTransition(() => {
        pe(), Te(), i.classList.add("fade-in");
      }).finished;
    } catch (se) {
      Z.warn("View transition failed:", se);
    } finally {
      Gt(), l.classList.remove(ge, "page-transitioning"), Ee();
    }
  };
  Fe && I(window, "hashchange", () => {
    const T = window.location.hash.replace("#", "");
    xe(T || e.initialPage || "overview");
  });
  const Re = window.location.hash, Ie = Re.includes("code=") || Re.includes("state=") || Re.includes("error="), ue = (Fe && !Ie ? Re.replace("#", "") : "") || e.initialPage || "overview", at = i.querySelector('[data-portal="skeleton-loader"]');
  return at && (at.style.display = "none"), Ie && Z.debug("Auth response detected in hash - preserving for MSAL"), await xe(ue, { force: !0, skipTransition: !0, skipHashUpdate: Ie }), {
    setPage: (b) => xe(b),
    getPage: () => ce,
    setApiMode: (b) => He(b, { persist: !1 }),
    getApiMode: () => U,
    setTheme: (b) => we(b, { persist: !1 }),
    getTheme: () => N,
    refresh: () => ce && xe(ce, { force: !0, skipTransition: !0, suppressSidebarClose: !0 }),
    destroy: () => {
      E.forEach((b) => b()), E.length = 0, l.replaceChildren();
    }
  };
}
class fn extends HTMLElement {
  static get observedAttributes() {
    return ["api-mode", "theme", "page"];
  }
  constructor() {
    super(), this._controller = null, this._mountingPromise = null, this._root = this;
  }
  connectedCallback() {
    if (oi || this._controller || this._mountingPromise)
      return;
    const e = this._collectOptions();
    this._mountingPromise = gn(this._root, e).then((t) => {
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
    var r, o, a, n, s, c;
    if (t !== i && this._controller)
      switch (e) {
        case "api-mode":
          (o = (r = this._controller).setApiMode) == null || o.call(r, i);
          break;
        case "theme":
          (n = (a = this._controller).setTheme) == null || n.call(a, i);
          break;
        case "page":
          (c = (s = this._controller).setPage) == null || c.call(s, i);
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
customElements.get("twerenbold-account-embed") || customElements.define("twerenbold-account-embed", fn);
export {
  Ei as A,
  zi as C,
  Wi as F,
  Bi as H,
  Fi as N,
  ri as O,
  Ui as T,
  qt as a,
  In as b,
  oi as c,
  Hi as d,
  Mi as e,
  no as f,
  O as g,
  Pi as h,
  Ln as i,
  Oe as j,
  $i as k,
  Yi as l,
  fn as m,
  Vi as n,
  gn as o,
  An as p,
  Oo as s,
  pa as t,
  xn as v,
  Qr as w
};
