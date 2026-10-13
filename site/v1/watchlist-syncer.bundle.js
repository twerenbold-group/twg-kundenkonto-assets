class h {
  constructor(e = {}) {
    const t = h.getScriptAttributes();
    this._domConfig = t, this.useDataAttributes = e.useDataAttributes === !0, this.config = this.useDataAttributes ? { ...t, ...e } : { ...e };
    const n = localStorage.getItem("twerenbold_debug_target_key");
    n && console.warn("[WatchlistSyncer] ⚠️ Using DEBUG targetKey form localStorage:", n), this.targetKey = n || this.config.targetKey || "travel-list", this.tokenKey = this.config.tokenKey || "azure_token", this.baseUrl = this.config.baseUrl ? this.config.baseUrl.replace(/\/$/, "") : null, this.defaultProviderId = this.config.defaultProviderId !== void 0 ? this.config.defaultProviderId : 0, this.intervalMs = this.config.interval || 1e3, this.debug = this.config.debug || !1, this.logLocalWipe = this.config.logLocalWipe || !1, this.preventEmptyDelete = this.config.preventEmptyDelete !== void 0 ? this.config.preventEmptyDelete : !0, this.guardDeleteByServer = this.config.guardDeleteByServer || !1, this.watchlistBaseUrl = null, this.lastKnownValue = null, this.isSyncing = !1, this.pollerId = null, this._generation = 0, this._destroyed = !1, this._startPromise = null, this.handleStorageEvent = this.handleStorageEvent.bind(this), this.handleFavoritesUpdated = this.handleFavoritesUpdated.bind(this), this.handleLogout = this.handleLogout.bind(this), this.handleAuthChanged = this.handleAuthChanged.bind(this), this.ready = this.init();
  }
  /**
   * Extrahiert Konfiguration aus dem aktuell ausgeführten Script-Tag
   */
  static getScriptAttributes() {
    let e = document.currentScript;
    return e || (e = document.querySelector('script[src*="watchlist-syncer.js"], script[src*="watchlist-syncer.bundle.js"]')), e ? {
      baseUrl: e.getAttribute("data-base-url"),
      targetKey: e.getAttribute("data-target-key"),
      tokenKey: e.getAttribute("data-token-key"),
      defaultProviderId: e.hasAttribute("data-provider-id") ? parseInt(e.getAttribute("data-provider-id"), 10) : void 0,
      interval: e.hasAttribute("data-interval") ? parseInt(e.getAttribute("data-interval"), 10) : void 0,
      debug: e.getAttribute("data-debug") === "true",
      logLocalWipe: e.getAttribute("data-log-local-wipe") === "true",
      preventEmptyDelete: e.getAttribute("data-prevent-empty-delete") !== null ? e.getAttribute("data-prevent-empty-delete") === "true" : void 0,
      guardDeleteByServer: e.getAttribute("data-guard-delete-by-server") === "true"
    } : {};
  }
  async init() {
    const e = this._generation;
    if (window.addEventListener("auth-changed", this.handleAuthChanged), window.addEventListener("twerenbold:post-logout", this.handleLogout), await this._loadThemeConfig(), this._destroyed) return;
    const t = this._resolveBaseUrl();
    if (!t) {
      console.error("[WatchlistSyncer] Base URL fehlt. Bitte in component-config setzen (watchlist.baseUrl) oder via Konstruktor übergeben.");
      return;
    }
    this.baseUrl = t;
    const n = localStorage.getItem("twerenbold_logout_timestamp");
    n && Date.now() - parseInt(n, 10) < 1e4 && (this._log("Info", "Detected recent logout flag. Triggering cleanup."), this.handleLogout(), localStorage.removeItem("twerenbold_logout_timestamp")), e === this._generation && await this.startSync();
  }
  handleAuthChanged(e) {
    var n;
    if (((n = e.detail) == null ? void 0 : n.isAuthenticated) !== !0) {
      this.stopSync();
      return;
    }
    const t = this._generation;
    this.ready.then(() => {
      if (t === this._generation) return this.startSync();
    });
  }
  stopSync() {
    this._generation++, this._startPromise = null, this.isSyncing = !1, this.pollerId !== null && clearInterval(this.pollerId), this.pollerId = null, window.removeEventListener("storage", this.handleStorageEvent), document.removeEventListener("favorites-updated", this.handleFavoritesUpdated);
  }
  async startSync() {
    if (this._destroyed || !this.baseUrl || this.pollerId !== null) return;
    if (this._startPromise) return this._startPromise;
    const e = this._generation, t = () => !this._destroyed && e === this._generation, n = (async () => {
      try {
        if (!await this.getToken() || !t() || (await this.performInitialSync(e), !t())) return;
        window.addEventListener("storage", this.handleStorageEvent), document.addEventListener("favorites-updated", this.handleFavoritesUpdated), this.startPolling();
      } catch (r) {
        this._log("Error", "Initialisierung fehlgeschlagen", r);
      }
    })();
    this._startPromise = n;
    try {
      await n;
    } finally {
      this._startPromise === n && (this._startPromise = null);
    }
  }
  handleStorageEvent(e) {
    e.key === this.targetKey && (this._log("Info", "Cross-Tab Änderung erkannt. Trigger Sync."), this.checkForChanges(), this._dispatchGlobalEvent(e.newValue));
  }
  handleLogout() {
    this.stopSync(), this._log("Info", "Logout detected. Clearing local watchlist storage safely."), localStorage.setItem("watchlist_logout_pending", Date.now().toString()), localStorage.removeItem(this.targetKey), this.lastKnownValue = null, this.isSyncing = !1, this._dispatchGlobalEvent(""), setTimeout(() => {
      localStorage.removeItem("watchlist_logout_pending");
    }, 5e3);
  }
  handleFavoritesUpdated(e) {
    if (!e.detail || !Array.isArray(e.detail.items)) return;
    this._log("Info", "Receiver favorites-updated from application. Syncing local CSV.");
    const t = e.detail.items;
    let n = t;
    this.defaultProviderId !== void 0 && (n = t.filter((i) => {
      var a, d, c;
      const l = i.providerId ?? ((d = (a = i.trip) == null ? void 0 : a.provider) == null ? void 0 : d.id) ?? ((c = i.serverFavorite) == null ? void 0 : c.providerId);
      return l != null ? Number(l) === Number(this.defaultProviderId) : !1;
    }), this._log("Info", `Filtered CSV update: Kept ${n.length}/${t.length} items for Provider ${this.defaultProviderId}`));
    const r = n.map((i) => i.code || i.tripId || i.trip && (i.trip.code || i.trip.productCode)).filter((i) => i), s = Array.from(new Set(r)).join(",");
    s !== this.lastKnownValue && (this.updateLocalStorageSilent(s), this.lastKnownValue = s);
  }
  async getToken() {
    if (this.config.getToken && typeof this.config.getToken == "function")
      try {
        const t = await this.config.getToken();
        if (t) return t;
      } catch (t) {
        this._log("Warn", "Configured getToken() failed:", t);
      }
    let e = localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    return e ? (this._log("Info", "Token gefunden unter explizitem Key:", this.tokenKey), e) : (this._log("Info", "Kein explizites Token. Starte multi-layered Token-Suche..."), this.findToken());
  }
  async findToken() {
    const e = await this.findRuntimeToken();
    if (e) return e;
    const t = this.getCurrentUserId();
    if (t) {
      const r = `twerenbold_token_${t}`, o = localStorage.getItem(r);
      if (o)
        return this._log("Info", "Scoped Token gefunden für User:", t), o;
    }
    const n = localStorage.getItem("access_token");
    return n ? (this._log("Info", "Legacy Global Token gefunden."), n) : this.findMsalToken(t);
  }
  async findRuntimeToken() {
    var t, n;
    if ((n = (t = window.apiService) == null ? void 0 : t.authComponent) != null && n.getAccessToken)
      try {
        return await window.apiService.authComponent.getAccessToken();
      } catch {
      }
    const e = document.querySelector("oauth-login, oauth-auth-component");
    if (e && typeof e.getAccessToken == "function")
      try {
        return await e.getAccessToken();
      } catch {
      }
    return null;
  }
  getCurrentUserId() {
    return localStorage.getItem("twerenbold_current_user_id") || localStorage.getItem("twerenbold_userId");
  }
  /**
   * Fallback: Scannt LocalStorage nach MSAL Tokens (Blind Scan)
   */
  findMsalToken(e = null) {
    e ? this._log("Info", "Filtere MSAL Tokens für User ID:", e) : this._log("Info", "Keine User-ID für MSAL Scan verfügbar. Scannt alle...");
    let t = 0;
    for (let n = 0; n < localStorage.length; n++) {
      const r = localStorage.key(n);
      if (r.toLowerCase().includes("accesstoken") && !(e && !r.includes(e))) {
        t++;
        try {
          const s = localStorage.getItem(r), i = JSON.parse(s), l = i.credentialType && i.credentialType.toLowerCase() === "accesstoken", a = !i.tokenType || i.tokenType.toLowerCase() === "bearer", d = !!i.secret;
          if (i && l && d && a) {
            if (i.expiresOn) {
              const c = Math.floor(Date.now() / 1e3);
              if (parseInt(i.expiresOn, 10) <= c) {
                this._log("Debug", "Abgelaufenes Token ignoriert:", r, "Expire:", i.expiresOn, "Now:", c);
                continue;
              }
            }
            return this._log("Info", "Gültiges MSAL Token gefunden in:", r), i.secret;
          } else
            this._log(
              "Debug",
              "Item ignoriert (falscher Typ/Struktur):",
              r,
              "credentialType:",
              i == null ? void 0 : i.credentialType,
              "hasSecret:",
              d,
              "tokenType:",
              i == null ? void 0 : i.tokenType,
              "FULL_OBJECT:",
              i
              // Log the full object to see structure
            );
        } catch (s) {
          this._log("Debug", "Parsing Fehler für Key:", r, s);
          continue;
        }
      }
    }
    return this._log("Warn", "MSAL Scan beendet. Keine gültigen Tokens gefunden. Kandidaten:", t), null;
  }
  /**
   * Initialer Merge: Union aus Server und Lokal
   */
  async performInitialSync(e = this._generation) {
    const t = () => !this._destroyed && e === this._generation, n = localStorage.getItem(this.targetKey) || "", r = n ? n.split(",").filter((a) => a.trim()) : [];
    this._log("Info", "Starte Initial-Sync. Lokal:", r);
    const o = await this.fetchServerList();
    if (!t()) return;
    const s = r.filter((a) => !o.includes(a));
    if (s.length > 0 && (this._log("Info", "Pushe lokale Items zum Server (Batch):", s), await this.processBatch(s, "POST"), !t()))
      return;
    const i = /* @__PURE__ */ new Set([...r, ...o]), l = Array.from(i).join(",");
    l !== n && this.updateLocalStorageSilent(l), this.lastKnownValue = l;
  }
  startPolling() {
    this._destroyed || this.pollerId !== null || (this._log("Info", `Polling gestartet (${this.intervalMs}ms)`), this.pollerId = setInterval(() => {
      document.hidden || this.isSyncing || this.checkForChanges();
    }, this.intervalMs));
  }
  async checkForChanges() {
    var s;
    if (this._destroyed || this.pollerId === null || this.isSyncing) return;
    const e = this._generation, t = () => !this._destroyed && e === this._generation, n = localStorage.getItem(this.targetKey) || "";
    if (n === this.lastKnownValue) return;
    const r = localStorage.getItem("watchlist_logout_pending");
    if (r && Date.now() - parseInt(r, 10) < 5e3 && !n) {
      this._log("Info", "Logout Clean-up detected. Ignoring empty list sync to server."), this.lastKnownValue = n;
      return;
    }
    if (!(!await this.getToken() || !t())) {
      if (!n && this.lastKnownValue) {
        const i = this.defaultProviderId !== void 0 && this.preventEmptyDelete;
        this.logLocalWipe && console.warn("[WatchlistSyncer] ⚠️ Local wipe detected", {
          targetKey: this.targetKey,
          providerId: this.defaultProviderId,
          lastKnownValueLength: ((s = this.lastKnownValue) == null ? void 0 : s.length) || 0,
          preventEmptyDelete: this.preventEmptyDelete
        });
        try {
          const l = await this.fetchServerList();
          if (!t()) return;
          if (l.length > 0) {
            const a = l.join(",");
            this._log("Warn", "Local watchlist emptied unexpectedly; restoring from server."), this.updateLocalStorageSilent(a), this.lastKnownValue = a;
          } else i ? (this._log("Warn", "Local empty with providerId set; refusing delete to avoid cross-provider wipe."), this.lastKnownValue = n) : (this._log("Info", "Server list already empty; keeping local empty without delete sync."), this.lastKnownValue = n);
          return;
        } catch (l) {
          this._log("Error", "Server verify failed; skipping delete to avoid data loss", l);
          return;
        }
      }
      this.isSyncing = !0;
      try {
        const i = this.lastKnownValue ? this.lastKnownValue.split(",").filter((c) => c) : [], l = n ? n.split(",").filter((c) => c) : [];
        let a = i.filter((c) => !l.includes(c));
        if (a.length > 0 && this.guardDeleteByServer && this.defaultProviderId !== void 0)
          try {
            const c = await this.fetchServerList();
            if (!t()) return;
            a = a.filter((g) => c.includes(g)), a.length === 0 && this._log("Warn", "Delete-Guard: Keine Items im Server-Set; Delete übersprungen.");
          } catch (c) {
            this._log("Error", "Delete-Guard: Serverprüfung fehlgeschlagen; Delete übersprungen.", c), a = [];
          }
        if (a.length > 0 && (this._log("Info", "Löschung erkannt:", a), await this.processBatch(a, "DELETE"), !t()))
          return;
        const d = l.filter((c) => !i.includes(c));
        d.length > 0 && (this._log("Info", "Hinzufügung erkannt:", d), await this.processBatch(d, "POST")), t() && (this.lastKnownValue = n);
      } catch (i) {
        this._log("Error", "Polling Zyklus Fehler", i);
      } finally {
        t() && (this.isSyncing = !1);
      }
    }
  }
  async processBatch(e, t) {
    !e || e.length === 0 || (t === "POST" ? await this.sendBatchPost(e) : t === "DELETE" && await this.sendParallelDelete(e));
  }
  async sendBatchPost(e) {
    const t = this._generation, n = await this.getToken();
    if (!n || this._destroyed || t !== this._generation) throw new Error("Sync stopped or token unavailable");
    const r = e.join(","), o = `${this.baseUrl}/Watchlist?tripCodes=${r}&providerId=${this.defaultProviderId}`, s = await fetch(o, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        Accept: "application/json"
      },
      keepalive: !0
    });
    if (!s.ok)
      throw new Error(`Batch POST fehlgeschlagen: ${s.status}`);
    this._log("Info", `Batch POST OK für ${e.length} Items.`);
  }
  async sendParallelDelete(e) {
    const t = e.map((r) => this.sendSingleDelete(r));
    (await Promise.allSettled(t)).forEach((r, o) => {
      r.status === "rejected" && this._log("Error", `DELETE fehlgeschlagen für ${e[o]}`, r.reason);
    });
  }
  async sendSingleDelete(e) {
    const t = this._generation, n = await this.getToken();
    if (!n || this._destroyed || t !== this._generation) throw new Error("Sync stopped or token unavailable");
    const r = `${this.baseUrl}/Watchlist/${e}`, o = await fetch(r, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${n}`,
        Accept: "application/json"
      },
      keepalive: !0
    });
    if (!o.ok) {
      if (o.status === 404) return;
      throw new Error(`${o.status} ${o.statusText}`);
    }
  }
  async fetchServerList() {
    const e = this._generation, t = await this.getToken();
    if (!t || this._destroyed || e !== this._generation) throw new Error("Sync stopped or token unavailable");
    const n = await fetch(`${this.baseUrl}/Watchlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${t}`,
        Accept: "application/json"
      }
    });
    if (!n.ok) throw new Error(`GET fehlgeschlagen: ${n.status}`);
    const r = await n.json();
    return r && Array.isArray(r.watchlist) ? r.watchlist.filter((o) => this.defaultProviderId !== void 0 ? o.providerId === void 0 || o.providerId === null ? !1 : Number(o.providerId) === Number(this.defaultProviderId) : !0).map((o) => o.tripCode).filter((o) => o) : [];
  }
  updateLocalStorageSilent(e) {
    localStorage.getItem(this.targetKey) !== e && (window.removeEventListener("storage", this.handleStorageEvent), localStorage.setItem(this.targetKey, e), window.addEventListener("storage", this.handleStorageEvent), this._dispatchGlobalEvent(e));
  }
  _dispatchGlobalEvent(e) {
    if (typeof window > "u") return;
    const t = e ? e.split(",").filter((r) => r).map((r) => r.trim()) : [], n = new CustomEvent("twerenbold:watchlist-updated", {
      detail: {
        tripCodes: t,
        source: "watchlist-syncer"
      }
    });
    window.dispatchEvent(n), this._log("Info", "Dispatched twerenbold:watchlist-updated", t);
  }
  async _loadThemeConfig() {
    var e;
    try {
      const t = this._resolveConfigUrl();
      if (!t) return;
      const n = await import(t);
      if (n && n.getConfigFor) {
        const r = this.config.theme || localStorage.getItem("selectedTheme") || "twerenbold", o = (e = n.getConfigFor("live", r)) == null ? void 0 : e.watchlist, s = {
          targetKey: "targetKey",
          defaultProviderId: "providerId",
          tokenKey: "tokenKey",
          intervalMs: "interval",
          debug: "debug",
          preventEmptyDelete: "preventEmptyDelete",
          logLocalWipe: "logLocalWipe",
          guardDeleteByServer: "guardDeleteByServer"
        };
        for (const [i, l] of Object.entries(s)) {
          const a = i === "intervalMs" ? "interval" : i;
          this.config[a] == null && (o == null ? void 0 : o[l]) !== void 0 && (this[i] = o[l]);
        }
        this.watchlistBaseUrl = (o == null ? void 0 : o.baseUrl) || null;
      }
    } catch (t) {
      this._log("Debug", "Konnte Theme-Config nicht laden (Ignore wenn Standalone):", t);
    }
  }
  _resolveConfigUrl() {
    var n;
    let e = document.currentScript;
    e || (e = document.querySelector('script[src*="watchlist-syncer.js"], script[src*="watchlist-syncer.bundle.js"]'));
    const t = (n = e == null ? void 0 : e.getAttribute) == null ? void 0 : n.call(e, "src");
    if (!t) return null;
    try {
      return new URL("config/component-config.js", new URL(t, document.baseURI)).toString();
    } catch {
      return null;
    }
  }
  _resolveBaseUrl() {
    var e, t;
    return this.baseUrl ? this.baseUrl.replace(/\/$/, "") : this.watchlistBaseUrl ? this.watchlistBaseUrl.replace(/\/$/, "") : (e = window == null ? void 0 : window.apiService) != null && e.baseUrl ? window.apiService.baseUrl.replace(/\/$/, "") : this.useDataAttributes && ((t = this._domConfig) != null && t.baseUrl) ? this._domConfig.baseUrl.replace(/\/$/, "") : null;
  }
  _log(e, ...t) {
    this.debug && (`${e}`, [...t]);
  }
  destroy() {
    this._destroyed = !0, this.stopSync(), window.removeEventListener("auth-changed", this.handleAuthChanged), window.removeEventListener("storage", this.handleStorageEvent), document.removeEventListener("favorites-updated", this.handleFavoritesUpdated), window.removeEventListener("twerenbold:post-logout", this.handleLogout), this._log("Info", "Destroyed and event listeners removed.");
  }
}
typeof window < "u" && (window.WatchlistSyncer = h);
(function() {
  const e = document.currentScript;
  if (!e || e.getAttribute("data-autoload-header") === "false") return;
  let t;
  try {
    const r = new URL(e.src || e.getAttribute("src"), document.baseURI);
    if (!["https://kk-script.twgapp.ch", "https://twr-account.voegele-reisen.ch"].includes(r.origin)) return;
    t = new URL("twerenbold-components.bundle.js", r).href;
  } catch {
    return;
  }
  const n = () => {
    var o, s;
    if (((o = window.twerenboldConfig) == null ? void 0 : o.autoBootstrapAppState) === !1 || !document.querySelector("header-account-menu") || (s = window.customElements) != null && s.get("header-account-menu") || document.querySelector('script[src*="twerenbold-components.bundle.js"], script[src*="twerenbold-account-embed.bundle.js"]')) return;
    const r = document.createElement("script");
    r.type = "module", r.src = t, r.setAttribute("data-watchlist-header-fallback", ""), r.addEventListener("error", () => console.warn("[WatchlistSyncer] Header-Bundle konnte nicht geladen werden."), { once: !0 }), document.head.appendChild(r);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n, { once: !0 }) : n();
})();
const u = h.getScriptAttributes();
u.baseUrl && document.currentScript && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  window._watchlistSyncer || (window._watchlistSyncer = new h(u));
}) : window._watchlistSyncer || (window._watchlistSyncer = new h(u)));
