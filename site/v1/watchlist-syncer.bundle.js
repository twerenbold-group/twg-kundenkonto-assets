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
    return e || (e = document.querySelector('script[src*="watchlist-syncer.js"], script[src*="watchlist-syncer.bundle.js"]')), console.log("Watchlist Script found:", e), e ? {
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
      } catch (i) {
        this._log("Error", "Initialisierung fehlgeschlagen", i);
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
    this.defaultProviderId !== void 0 && (n = t.filter((r) => {
      var o, c, d;
      const a = r.providerId ?? ((c = (o = r.trip) == null ? void 0 : o.provider) == null ? void 0 : c.id) ?? ((d = r.serverFavorite) == null ? void 0 : d.providerId);
      return a != null ? Number(a) === Number(this.defaultProviderId) : !1;
    }), this._log("Info", `Filtered CSV update: Kept ${n.length}/${t.length} items for Provider ${this.defaultProviderId}`));
    const i = n.map((r) => r.code || r.tripId || r.trip && (r.trip.code || r.trip.productCode)).filter((r) => r), l = Array.from(new Set(i)).join(",");
    l !== this.lastKnownValue && (this.updateLocalStorageSilent(l), this.lastKnownValue = l);
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
      const i = `twerenbold_token_${t}`, s = localStorage.getItem(i);
      if (s)
        return this._log("Info", "Scoped Token gefunden für User:", t), s;
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
      const i = localStorage.key(n);
      if (i.toLowerCase().includes("accesstoken") && !(e && !i.includes(e))) {
        t++;
        try {
          const l = localStorage.getItem(i), r = JSON.parse(l), a = r.credentialType && r.credentialType.toLowerCase() === "accesstoken", o = !r.tokenType || r.tokenType.toLowerCase() === "bearer", c = !!r.secret;
          if (r && a && c && o) {
            if (r.expiresOn) {
              const d = Math.floor(Date.now() / 1e3);
              if (parseInt(r.expiresOn, 10) <= d) {
                this._log("Debug", "Abgelaufenes Token ignoriert:", i, "Expire:", r.expiresOn, "Now:", d);
                continue;
              }
            }
            return this._log("Info", "Gültiges MSAL Token gefunden in:", i), r.secret;
          } else
            this._log(
              "Debug",
              "Item ignoriert (falscher Typ/Struktur):",
              i,
              "credentialType:",
              r == null ? void 0 : r.credentialType,
              "hasSecret:",
              c,
              "tokenType:",
              r == null ? void 0 : r.tokenType,
              "FULL_OBJECT:",
              r
              // Log the full object to see structure
            );
        } catch (l) {
          this._log("Debug", "Parsing Fehler für Key:", i, l);
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
    const t = () => !this._destroyed && e === this._generation, n = localStorage.getItem(this.targetKey) || "", i = n ? n.split(",").filter((o) => o.trim()) : [];
    this._log("Info", "Starte Initial-Sync. Lokal:", i);
    const s = await this.fetchServerList();
    if (!t()) return;
    const l = i.filter((o) => !s.includes(o));
    if (l.length > 0 && (this._log("Info", "Pushe lokale Items zum Server (Batch):", l), await this.processBatch(l, "POST"), !t()))
      return;
    const r = /* @__PURE__ */ new Set([...i, ...s]), a = Array.from(r).join(",");
    a !== n && this.updateLocalStorageSilent(a), this.lastKnownValue = a;
  }
  startPolling() {
    this._destroyed || this.pollerId !== null || (this._log("Info", `Polling gestartet (${this.intervalMs}ms)`), this.pollerId = setInterval(() => {
      document.hidden || this.isSyncing || this.checkForChanges();
    }, this.intervalMs));
  }
  async checkForChanges() {
    var l;
    if (this._destroyed || this.pollerId === null || this.isSyncing) return;
    const e = this._generation, t = () => !this._destroyed && e === this._generation, n = localStorage.getItem(this.targetKey) || "";
    if (n === this.lastKnownValue) return;
    const i = localStorage.getItem("watchlist_logout_pending");
    if (i && Date.now() - parseInt(i, 10) < 5e3 && !n) {
      this._log("Info", "Logout Clean-up detected. Ignoring empty list sync to server."), this.lastKnownValue = n;
      return;
    }
    if (!(!await this.getToken() || !t())) {
      if (!n && this.lastKnownValue) {
        const r = this.defaultProviderId !== void 0 && this.preventEmptyDelete;
        this.logLocalWipe && console.warn("[WatchlistSyncer] ⚠️ Local wipe detected", {
          targetKey: this.targetKey,
          providerId: this.defaultProviderId,
          lastKnownValueLength: ((l = this.lastKnownValue) == null ? void 0 : l.length) || 0,
          preventEmptyDelete: this.preventEmptyDelete
        });
        try {
          const a = await this.fetchServerList();
          if (!t()) return;
          if (a.length > 0) {
            const o = a.join(",");
            this._log("Warn", "Local watchlist emptied unexpectedly; restoring from server."), this.updateLocalStorageSilent(o), this.lastKnownValue = o;
          } else r ? (this._log("Warn", "Local empty with providerId set; refusing delete to avoid cross-provider wipe."), this.lastKnownValue = n) : (this._log("Info", "Server list already empty; keeping local empty without delete sync."), this.lastKnownValue = n);
          return;
        } catch (a) {
          this._log("Error", "Server verify failed; skipping delete to avoid data loss", a);
          return;
        }
      }
      this.isSyncing = !0;
      try {
        const r = this.lastKnownValue ? this.lastKnownValue.split(",").filter((d) => d) : [], a = n ? n.split(",").filter((d) => d) : [];
        let o = r.filter((d) => !a.includes(d));
        if (o.length > 0 && this.guardDeleteByServer && this.defaultProviderId !== void 0)
          try {
            const d = await this.fetchServerList();
            if (!t()) return;
            o = o.filter((u) => d.includes(u)), o.length === 0 && this._log("Warn", "Delete-Guard: Keine Items im Server-Set; Delete übersprungen.");
          } catch (d) {
            this._log("Error", "Delete-Guard: Serverprüfung fehlgeschlagen; Delete übersprungen.", d), o = [];
          }
        if (o.length > 0 && (this._log("Info", "Löschung erkannt:", o), await this.processBatch(o, "DELETE"), !t()))
          return;
        const c = a.filter((d) => !r.includes(d));
        c.length > 0 && (this._log("Info", "Hinzufügung erkannt:", c), await this.processBatch(c, "POST")), t() && (this.lastKnownValue = n);
      } catch (r) {
        this._log("Error", "Polling Zyklus Fehler", r);
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
    const i = e.join(","), s = `${this.baseUrl}/Watchlist?tripCodes=${i}&providerId=${this.defaultProviderId}`, l = await fetch(s, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n}`,
        Accept: "application/json"
      },
      keepalive: !0
    });
    if (!l.ok)
      throw new Error(`Batch POST fehlgeschlagen: ${l.status}`);
    this._log("Info", `Batch POST OK für ${e.length} Items.`);
  }
  async sendParallelDelete(e) {
    const t = e.map((i) => this.sendSingleDelete(i));
    (await Promise.allSettled(t)).forEach((i, s) => {
      i.status === "rejected" && this._log("Error", `DELETE fehlgeschlagen für ${e[s]}`, i.reason);
    });
  }
  async sendSingleDelete(e) {
    const t = this._generation, n = await this.getToken();
    if (!n || this._destroyed || t !== this._generation) throw new Error("Sync stopped or token unavailable");
    const i = `${this.baseUrl}/Watchlist/${e}`, s = await fetch(i, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${n}`,
        Accept: "application/json"
      },
      keepalive: !0
    });
    if (!s.ok) {
      if (s.status === 404) return;
      throw new Error(`${s.status} ${s.statusText}`);
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
    const i = await n.json();
    return i && Array.isArray(i.watchlist) ? i.watchlist.filter((s) => this.defaultProviderId !== void 0 ? s.providerId === void 0 || s.providerId === null ? !1 : Number(s.providerId) === Number(this.defaultProviderId) : !0).map((s) => s.tripCode).filter((s) => s) : [];
  }
  updateLocalStorageSilent(e) {
    localStorage.getItem(this.targetKey) !== e && (window.removeEventListener("storage", this.handleStorageEvent), localStorage.setItem(this.targetKey, e), window.addEventListener("storage", this.handleStorageEvent), this._dispatchGlobalEvent(e));
  }
  _dispatchGlobalEvent(e) {
    if (typeof window > "u") return;
    const t = e ? e.split(",").filter((i) => i).map((i) => i.trim()) : [], n = new CustomEvent("twerenbold:watchlist-updated", {
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
        const i = this.config.theme || localStorage.getItem("selectedTheme") || "twerenbold", s = (e = n.getConfigFor("live", i)) == null ? void 0 : e.watchlist, l = {
          targetKey: "targetKey",
          defaultProviderId: "providerId",
          tokenKey: "tokenKey",
          intervalMs: "interval",
          debug: "debug",
          preventEmptyDelete: "preventEmptyDelete",
          logLocalWipe: "logLocalWipe",
          guardDeleteByServer: "guardDeleteByServer"
        };
        for (const [r, a] of Object.entries(l)) {
          const o = r === "intervalMs" ? "interval" : r;
          this.config[o] == null && (s == null ? void 0 : s[a]) !== void 0 && (this[r] = s[a]);
        }
        this.watchlistBaseUrl = (s == null ? void 0 : s.baseUrl) || null;
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
    this.debug && console.log(`[WatchlistSyncer][${e}]`, ...t);
  }
  destroy() {
    this._destroyed = !0, this.stopSync(), window.removeEventListener("auth-changed", this.handleAuthChanged), window.removeEventListener("storage", this.handleStorageEvent), document.removeEventListener("favorites-updated", this.handleFavoritesUpdated), window.removeEventListener("twerenbold:post-logout", this.handleLogout), this._log("Info", "Destroyed and event listeners removed.");
  }
}
typeof window < "u" && (window.WatchlistSyncer = h);
const g = h.getScriptAttributes();
g.baseUrl && document.currentScript && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  console.log("[WatchlistSyncer] Auto-Init (via DOMContentLoaded)"), window._watchlistSyncer || (window._watchlistSyncer = new h(g));
}) : (console.log("[WatchlistSyncer] Auto-Init (Immediate)"), window._watchlistSyncer || (window._watchlistSyncer = new h(g))));
