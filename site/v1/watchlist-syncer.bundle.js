class g {
  constructor(e = {}) {
    const t = g.getScriptAttributes();
    this._domConfig = t, this.useDataAttributes = e.useDataAttributes === !0, this.config = this.useDataAttributes ? { ...t, ...e } : { ...e };
    const i = localStorage.getItem("twerenbold_debug_target_key");
    i && console.warn("[WatchlistSyncer] ⚠️ Using DEBUG targetKey form localStorage:", i), this.targetKey = i || this.config.targetKey || "travel-list", this.tokenKey = this.config.tokenKey || "azure_token", this.baseUrl = this.config.baseUrl ? this.config.baseUrl.replace(/\/$/, "") : null, this.defaultProviderId = this.config.defaultProviderId !== void 0 ? this.config.defaultProviderId : 0, this.intervalMs = this.config.interval || 1e3, this.debug = this.config.debug || !1, this.logLocalWipe = this.config.logLocalWipe || !1, this.preventEmptyDelete = this.config.preventEmptyDelete !== void 0 ? this.config.preventEmptyDelete : !0, this.guardDeleteByServer = this.config.guardDeleteByServer || !1, this.watchlistBaseUrl = null, this.lastKnownValue = null, this.isSyncing = !1, this.pollerId = null, this.handleStorageEvent = this.handleStorageEvent.bind(this), this.handleFavoritesUpdated = this.handleFavoritesUpdated.bind(this), this.handleLogout = this.handleLogout.bind(this), this.init();
  }
  /**
   * Extrahiert Konfiguration aus dem aktuell ausgeführten Script-Tag
   */
  static getScriptAttributes() {
    let e = document.currentScript;
    return e || (e = document.querySelector('script[src*="watchlist-syncer.js"]')), console.log("Watchlist Script found:", e), e ? {
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
    await this._loadThemeConfig();
    const e = this._resolveBaseUrl();
    if (!e) {
      console.error("[WatchlistSyncer] Base URL fehlt. Bitte in component-config setzen (watchlist.baseUrl) oder via Konstruktor übergeben.");
      return;
    }
    this.baseUrl = e;
    const t = localStorage.getItem("twerenbold_logout_timestamp");
    if (t && Date.now() - parseInt(t, 10) < 1e4 && (this._log("Info", "Detected recent logout flag. Triggering cleanup."), this.handleLogout(), localStorage.removeItem("twerenbold_logout_timestamp")), !await this.getToken()) {
      this._log("Warn", "Kein Token (Key: " + this.tokenKey + "). Sync pausiert.");
      return;
    }
    window.addEventListener("storage", this.handleStorageEvent), document.addEventListener("favorites-updated", this.handleFavoritesUpdated), window.addEventListener("twerenbold:post-logout", this.handleLogout);
    try {
      await this.performInitialSync(), this.startPolling();
    } catch (i) {
      this._log("Error", "Initialisierung fehlgeschlagen", i);
    }
  }
  handleStorageEvent(e) {
    e.key === this.targetKey && (this._log("Info", "Cross-Tab Änderung erkannt. Trigger Sync."), this.checkForChanges(), this._dispatchGlobalEvent(e.newValue));
  }
  handleLogout() {
    this._log("Info", "Logout detected. Clearing local watchlist storage safely."), localStorage.setItem("watchlist_logout_pending", Date.now().toString()), localStorage.removeItem(this.targetKey), this.lastKnownValue = null, this.isSyncing = !1, this._dispatchGlobalEvent(""), setTimeout(() => {
      localStorage.removeItem("watchlist_logout_pending");
    }, 5e3);
  }
  handleFavoritesUpdated(e) {
    if (!e.detail || !Array.isArray(e.detail.items)) return;
    this._log("Info", "Receiver favorites-updated from application. Syncing local CSV.");
    const t = e.detail.items;
    let i = t;
    this.defaultProviderId !== void 0 && (i = t.filter((n) => {
      var l, d, u;
      const c = n.providerId ?? ((d = (l = n.trip) == null ? void 0 : l.provider) == null ? void 0 : d.id) ?? ((u = n.serverFavorite) == null ? void 0 : u.providerId);
      return c != null ? Number(c) === Number(this.defaultProviderId) : !1;
    }), this._log("Info", `Filtered CSV update: Kept ${i.length}/${t.length} items for Provider ${this.defaultProviderId}`));
    const r = i.map((n) => n.code || n.tripId || n.trip && (n.trip.code || n.trip.productCode)).filter((n) => n), a = Array.from(new Set(r)).join(",");
    a !== this.lastKnownValue && (this.updateLocalStorageSilent(a), this.lastKnownValue = a);
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
      const r = `twerenbold_token_${t}`, s = localStorage.getItem(r);
      if (s)
        return this._log("Info", "Scoped Token gefunden für User:", t), s;
    }
    const i = localStorage.getItem("access_token");
    return i ? (this._log("Info", "Legacy Global Token gefunden."), i) : this.findMsalToken(t);
  }
  async findRuntimeToken() {
    var t, i;
    if ((i = (t = window.apiService) == null ? void 0 : t.authComponent) != null && i.getAccessToken)
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
    for (let i = 0; i < localStorage.length; i++) {
      const r = localStorage.key(i);
      if (r.toLowerCase().includes("accesstoken") && !(e && !r.includes(e))) {
        t++;
        try {
          const a = localStorage.getItem(r), n = JSON.parse(a), c = n.credentialType && n.credentialType.toLowerCase() === "accesstoken", l = !n.tokenType || n.tokenType.toLowerCase() === "bearer", d = !!n.secret;
          if (n && c && d && l) {
            if (n.expiresOn) {
              const u = Math.floor(Date.now() / 1e3);
              if (parseInt(n.expiresOn, 10) <= u) {
                this._log("Debug", "Abgelaufenes Token ignoriert:", r, "Expire:", n.expiresOn, "Now:", u);
                continue;
              }
            }
            return this._log("Info", "Gültiges MSAL Token gefunden in:", r), n.secret;
          } else
            this._log(
              "Debug",
              "Item ignoriert (falscher Typ/Struktur):",
              r,
              "credentialType:",
              n == null ? void 0 : n.credentialType,
              "hasSecret:",
              d,
              "tokenType:",
              n == null ? void 0 : n.tokenType,
              "FULL_OBJECT:",
              n
              // Log the full object to see structure
            );
        } catch (a) {
          this._log("Debug", "Parsing Fehler für Key:", r, a);
          continue;
        }
      }
    }
    return this._log("Warn", "MSAL Scan beendet. Keine gültigen Tokens gefunden. Kandidaten:", t), null;
  }
  /**
   * Initialer Merge: Union aus Server und Lokal
   */
  async performInitialSync() {
    const e = localStorage.getItem(this.targetKey) || "", t = e ? e.split(",").filter((n) => n.trim()) : [];
    this._log("Info", "Starte Initial-Sync. Lokal:", t);
    const i = await this.fetchServerList(), r = t.filter((n) => !i.includes(n));
    r.length > 0 && (this._log("Info", "Pushe lokale Items zum Server (Batch):", r), await this.processBatch(r, "POST"));
    const s = /* @__PURE__ */ new Set([...t, ...i]), a = Array.from(s).join(",");
    a !== e && this.updateLocalStorageSilent(a), this.lastKnownValue = a;
  }
  startPolling() {
    this._log("Info", `Polling gestartet (${this.intervalMs}ms)`), this.pollerId = setInterval(() => {
      document.hidden || this.isSyncing || this.checkForChanges();
    }, this.intervalMs);
  }
  async checkForChanges() {
    var r;
    const e = localStorage.getItem(this.targetKey) || "";
    if (e === this.lastKnownValue) return;
    const t = localStorage.getItem("watchlist_logout_pending");
    if (t && Date.now() - parseInt(t, 10) < 5e3 && !e) {
      this._log("Info", "Logout Clean-up detected. Ignoring empty list sync to server."), this.lastKnownValue = e;
      return;
    }
    if (await this.getToken()) {
      if (!e && this.lastKnownValue) {
        const s = this.defaultProviderId !== void 0 && this.preventEmptyDelete;
        this.logLocalWipe && console.warn("[WatchlistSyncer] ⚠️ Local wipe detected", {
          targetKey: this.targetKey,
          providerId: this.defaultProviderId,
          lastKnownValueLength: ((r = this.lastKnownValue) == null ? void 0 : r.length) || 0,
          preventEmptyDelete: this.preventEmptyDelete
        });
        try {
          const a = await this.fetchServerList();
          if (a.length > 0) {
            const n = a.join(",");
            this._log("Warn", "Local watchlist emptied unexpectedly; restoring from server."), this.updateLocalStorageSilent(n), this.lastKnownValue = n;
          } else s ? (this._log("Warn", "Local empty with providerId set; refusing delete to avoid cross-provider wipe."), this.lastKnownValue = e) : (this._log("Info", "Server list already empty; keeping local empty without delete sync."), this.lastKnownValue = e);
          return;
        } catch (a) {
          this._log("Error", "Server verify failed; skipping delete to avoid data loss", a);
          return;
        }
      }
      this.isSyncing = !0;
      try {
        const s = this.lastKnownValue ? this.lastKnownValue.split(",").filter((l) => l) : [], a = e ? e.split(",").filter((l) => l) : [];
        let n = s.filter((l) => !a.includes(l));
        if (n.length > 0 && this.guardDeleteByServer && this.defaultProviderId !== void 0)
          try {
            const l = await this.fetchServerList();
            n = n.filter((d) => l.includes(d)), n.length === 0 && this._log("Warn", "Delete-Guard: Keine Items im Server-Set; Delete übersprungen.");
          } catch (l) {
            this._log("Error", "Delete-Guard: Serverprüfung fehlgeschlagen; Delete übersprungen.", l), n = [];
          }
        n.length > 0 && (this._log("Info", "Löschung erkannt:", n), await this.processBatch(n, "DELETE"));
        const c = a.filter((l) => !s.includes(l));
        c.length > 0 && (this._log("Info", "Hinzufügung erkannt:", c), await this.processBatch(c, "POST")), this.lastKnownValue = e;
      } catch (s) {
        this._log("Error", "Polling Zyklus Fehler", s);
      } finally {
        this.isSyncing = !1;
      }
    }
  }
  async processBatch(e, t) {
    !e || e.length === 0 || (t === "POST" ? await this.sendBatchPost(e) : t === "DELETE" && await this.sendParallelDelete(e));
  }
  async sendBatchPost(e) {
    const t = await this.getToken();
    if (!t) throw new Error("No Token");
    const i = e.join(","), r = `${this.baseUrl}/Watchlist?tripCodes=${i}&providerId=${this.defaultProviderId}`, s = await fetch(r, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${t}`,
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
    (await Promise.allSettled(t)).forEach((r, s) => {
      r.status === "rejected" && this._log("Error", `DELETE fehlgeschlagen für ${e[s]}`, r.reason);
    });
  }
  async sendSingleDelete(e) {
    const t = await this.getToken();
    if (!t) throw new Error("No Token");
    const i = `${this.baseUrl}/Watchlist/${e}`, r = await fetch(i, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${t}`,
        Accept: "application/json"
      },
      keepalive: !0
    });
    if (!r.ok) {
      if (r.status === 404) return;
      throw new Error(`${r.status} ${r.statusText}`);
    }
  }
  async fetchServerList() {
    const e = await this.getToken(), t = await fetch(`${this.baseUrl}/Watchlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${e}`,
        Accept: "application/json"
      }
    });
    if (!t.ok) throw new Error(`GET fehlgeschlagen: ${t.status}`);
    const i = await t.json();
    return i && Array.isArray(i.watchlist) ? i.watchlist.filter((r) => this.defaultProviderId !== void 0 ? r.providerId === void 0 || r.providerId === null ? !1 : Number(r.providerId) === Number(this.defaultProviderId) : !0).map((r) => r.tripCode).filter((r) => r) : [];
  }
  updateLocalStorageSilent(e) {
    localStorage.getItem(this.targetKey) !== e && (window.removeEventListener("storage", this.handleStorageEvent), localStorage.setItem(this.targetKey, e), window.addEventListener("storage", this.handleStorageEvent), this._dispatchGlobalEvent(e));
  }
  _dispatchGlobalEvent(e) {
    if (typeof window > "u") return;
    const t = e ? e.split(",").filter((r) => r).map((r) => r.trim()) : [], i = new CustomEvent("twerenbold:watchlist-updated", {
      detail: {
        tripCodes: t,
        source: "watchlist-syncer"
      }
    });
    window.dispatchEvent(i), this._log("Info", "Dispatched twerenbold:watchlist-updated", t);
  }
  async _loadThemeConfig() {
    var e, t, i, r, s, a, n, c, l;
    try {
      const d = this._resolveConfigUrl();
      if (!d) return;
      const u = await import(d);
      if (u && u.getConfigFor) {
        let h = localStorage.getItem("selectedTheme") || "twerenbold";
        const o = u.getConfigFor("live", h);
        (e = o == null ? void 0 : o.watchlist) != null && e.targetKey && (this.targetKey = o.watchlist.targetKey, this._log("Info", `TargetKey aus Theme '${h}' übernommen:`, this.targetKey)), ((t = o == null ? void 0 : o.watchlist) == null ? void 0 : t.providerId) !== void 0 && (this.defaultProviderId = o.watchlist.providerId, this._log("Info", `ProviderId aus Theme '${h}' übernommen:`, this.defaultProviderId)), (i = o == null ? void 0 : o.watchlist) != null && i.baseUrl && (this.watchlistBaseUrl = o.watchlist.baseUrl, this._log("Info", `BaseUrl aus Theme '${h}' übernommen:`, this.watchlistBaseUrl)), (r = o == null ? void 0 : o.watchlist) != null && r.tokenKey && (this.tokenKey = o.watchlist.tokenKey, this._log("Info", `TokenKey aus Theme '${h}' übernommen:`, this.tokenKey)), (s = o == null ? void 0 : o.watchlist) != null && s.interval && (this.intervalMs = o.watchlist.interval, this._log("Info", `Interval aus Theme '${h}' übernommen:`, this.intervalMs)), ((a = o == null ? void 0 : o.watchlist) == null ? void 0 : a.debug) !== void 0 && (this.debug = o.watchlist.debug, this._log("Info", `Debug aus Theme '${h}' übernommen:`, this.debug)), ((n = o == null ? void 0 : o.watchlist) == null ? void 0 : n.preventEmptyDelete) !== void 0 && (this.preventEmptyDelete = o.watchlist.preventEmptyDelete, this._log("Info", `preventEmptyDelete aus Theme '${h}' übernommen:`, this.preventEmptyDelete)), ((c = o == null ? void 0 : o.watchlist) == null ? void 0 : c.logLocalWipe) !== void 0 && (this.logLocalWipe = o.watchlist.logLocalWipe, this._log("Info", `logLocalWipe aus Theme '${h}' übernommen:`, this.logLocalWipe)), ((l = o == null ? void 0 : o.watchlist) == null ? void 0 : l.guardDeleteByServer) !== void 0 && (this.guardDeleteByServer = o.watchlist.guardDeleteByServer, this._log("Info", `guardDeleteByServer aus Theme '${h}' übernommen:`, this.guardDeleteByServer));
      }
    } catch (d) {
      this._log("Debug", "Konnte Theme-Config nicht laden (Ignore wenn Standalone):", d);
    }
  }
  _resolveConfigUrl() {
    var i;
    let e = document.currentScript;
    e || (e = document.querySelector('script[src*="watchlist-syncer.js"]'));
    const t = (i = e == null ? void 0 : e.getAttribute) == null ? void 0 : i.call(e, "src");
    if (!t) return null;
    try {
      return new URL("config/component-config.js", t).toString();
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
    this.pollerId && (clearInterval(this.pollerId), this.pollerId = null), window.removeEventListener("storage", this.handleStorageEvent), document.removeEventListener("favorites-updated", this.handleFavoritesUpdated), window.removeEventListener("twerenbold:post-logout", this.handleLogout), this._log("Info", "Destroyed and event listeners removed.");
  }
}
typeof window < "u" && (window.WatchlistSyncer = g);
const f = g.getScriptAttributes();
f.baseUrl && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  console.log("[WatchlistSyncer] Auto-Init (via DOMContentLoaded)"), window._watchlistSyncer = new g(f);
}) : (console.log("[WatchlistSyncer] Auto-Init (Immediate)"), window._watchlistSyncer = new g(f)));
