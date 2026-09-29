var A = Object.defineProperty;
var _ = (s, e, t) => e in s ? A(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var l = (s, e, t) => _(s, typeof e != "symbol" ? e + "" : e, t);
import { t as S, w as v, i as N, h as M, l as I, j as L, c as D, v as z, p as E, k as B, f as u } from "./twerenbold-account-embed.entry-wFAOk4VK.js";
import { A as K, m as V, n as W, o as Y, q as J, C as Z, r as Q, F as X, H as ee, N as te, O as re, T as ie, x as ae, y as oe, z as se } from "./twerenbold-account-embed.entry-wFAOk4VK.js";
import { f as p, s as k, r as h, q as r, a as O } from "./scroll-lock-CQElyp-P.js";
class g extends p {
  constructor() {
    super(), this.trip = null, this.travelers = [], this.isLoading = !1, this.errorMessage = "", this.successMessage = "", this.activeTab = "overview", this.apiUrl = "", this.authToken = "", this.canEdit = !1, this.theme = "twerenbold", this.showCheckIn = !1, this.checkInData = null, this._newTraveler = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      documentNumber: ""
    }, this._checkIfCheckInAvailable();
  }
  connectedCallback() {
    super.connectedCallback(), this.trip && (this._loadTravelersData(), this._checkIfCheckInAvailable());
  }
  async _loadTravelersData() {
    if (!this.trip || !this.apiUrl) {
      this.travelers = [
        {
          id: "traveler-1",
          firstName: "Max",
          lastName: "Mustermann",
          email: "max.mustermann@email.com",
          phone: "+41 76 123 45 67",
          dateOfBirth: "1980-05-15",
          documentNumber: "P1234567",
          status: "checkedin",
          checkInTime: "2025-08-15T08:30:00Z",
          isMainTraveler: !0
        },
        {
          id: "traveler-2",
          firstName: "Maria",
          lastName: "Mustermann",
          email: "maria.mustermann@email.com",
          phone: "+41 76 765 43 21",
          dateOfBirth: "1985-09-22",
          documentNumber: "P7654321",
          status: "pending",
          checkInTime: null,
          isMainTraveler: !1
        }
      ];
      return;
    }
    try {
      this.isLoading = !0;
      const e = await this._apiCall(`trips/${this.trip.id}/travelers`);
      this.travelers = Array.isArray(e) ? e : e.travelers || [];
    } catch (e) {
      this.errorMessage = `Fehler beim Laden der Mitreisenden: ${e.message}`, console.error("Error loading travelers:", e);
    } finally {
      this.isLoading = !1;
    }
  }
  async _apiCall(e, t = null, i = "GET") {
    const a = `${this.apiUrl}/${e}`, o = {
      "Content-Type": "application/json",
      ...this.authToken && { Authorization: `Bearer ${this.authToken}` }
    }, n = {
      method: i,
      headers: o,
      ...t && { body: JSON.stringify(t) }
    }, c = await fetch(a, n);
    if (!c.ok)
      throw new Error(`HTTP ${c.status}: ${c.statusText}`);
    return await c.json();
  }
  _checkIfCheckInAvailable() {
    var a;
    if (!this.trip) return;
    const e = new Date(this.trip.date), i = Math.floor((e - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24));
    this.showCheckIn = i <= 7 && i >= -1, this.showCheckIn && (this.checkInData = {
      checkInAvailable: !0,
      checkInDeadline: new Date(e.getTime() - 1440 * 60 * 1e3),
      // 24h vor Abfahrt
      meetingPoint: "Bahnhof Zürich HB, Gleis 7",
      meetingTime: "08:00 Uhr",
      contactNumber: "+41 44 123 45 67",
      documents: ["Personalausweis/Pass", "Reisebestätigung", "Versicherungsnachweis"],
      isCompleted: ((a = this.travelers) == null ? void 0 : a.some((o) => o.isMainTraveler && o.status === "checkedin")) || !1
    });
  }
  render() {
    return this.trip ? r`
      <div class="trip-details-container">
        ${this.isLoading ? r`
          <div class="loading-overlay">
            <div class="spinner"></div>
          </div>
        ` : ""}

        ${this._renderTripHeader()}
        ${this._renderTabNavigation()}
        ${this._renderTabContent()}
      </div>
    ` : r`<div class="alert error">Keine Reisedaten verfügbar</div>`;
  }
  _renderTripHeader() {
    return r`
      <div class="trip-header">
        <h1 class="trip-title">${this.trip.name}</h1>
        <p class="trip-subtitle">
          ${this.trip.destination} • ${this.trip.date}
        </p>
        <div class="trip-status status-${(this.trip.status || "confirmed").toLowerCase()}">
          ${this._getStatusText(this.trip.status)}
        </div>
      </div>
    `;
  }
  _renderTabNavigation() {
    const e = [
      { id: "overview", label: "📋 Übersicht", icon: "📋" },
      { id: "travelers", label: "👥 Mitreisende", icon: "👥" },
      ...this.showCheckIn ? [{ id: "checkin", label: "✈️ Check-in", icon: "✈️" }] : []
    ];
    return r`
      <div class="tab-navigation">
        ${e.map((t) => r`
          <button 
            class="tab-button ${this.activeTab === t.id ? "active" : ""}"
            @click=${() => this._setActiveTab(t.id)}
          >
            ${t.label}
          </button>
        `)}
      </div>
    `;
  }
  _renderTabContent() {
    return r`
      <div class="tab-content">
        ${this.errorMessage ? r`
          <div class="alert error">
            ${this.errorMessage}
            <button @click="${this._clearError}" style="float: right; background: none; border: none; cursor: pointer;">×</button>
          </div>
        ` : ""}

        ${this.successMessage ? r`
          <div class="alert success">
            ${this.successMessage}
          </div>
        ` : ""}

        ${this._renderActiveTabContent()}
      </div>
    `;
  }
  _renderActiveTabContent() {
    switch (this.activeTab) {
      case "overview":
        return this._renderOverviewTab();
      case "travelers":
        return this._renderTravelersTab();
      case "checkin":
        return this._renderCheckInTab();
      default:
        return r`<p>Tab nicht gefunden</p>`;
    }
  }
  _renderOverviewTab() {
    return r`
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 Reisedaten</h4>
          <p><strong>Abfahrt:</strong> ${this.trip.date}</p>
          <p><strong>Dauer:</strong> ${this.trip.duration || "Nicht angegeben"}</p>
          <p><strong>Rückkehr:</strong> ${this.trip.returnDate || "Wird bekannt gegeben"}</p>
        </div>

        <div class="info-card">
          <h4>💰 Buchungsdetails</h4>
          <p><strong>Buchungsnummer:</strong> ${this.trip.bookingNumber || this.trip.id}</p>
          <p><strong>Preis:</strong> ${this.trip.price || "Auf Anfrage"}</p>
          <p><strong>Anzahl Personen:</strong> ${this.trip.passengers || this.travelers.length}</p>
        </div>

        <div class="info-card">
          <h4>📍 Reiseziel</h4>
          <p><strong>Destination:</strong> ${this.trip.destination}</p>
          <p><strong>Land:</strong> ${this.trip.country || "Wird bekannt gegeben"}</p>
          <p><strong>Kategorie:</strong> ${this.trip.category || "Rundreise"}</p>
        </div>

        <div class="info-card">
          <h4>🏨 Unterkunft</h4>
          <p><strong>Hotel:</strong> ${this.trip.hotel || "Wird bekannt gegeben"}</p>
          <p><strong>Kategorie:</strong> ${this.trip.hotelCategory || "4 Sterne"}</p>
          <p><strong>Verpflegung:</strong> ${this.trip.meals || "Halbpension"}</p>
        </div>
      </div>

      ${this.trip.description ? r`
        <div class="info-card">
          <h4>📝 Reisebeschreibung</h4>
          <p>${this.trip.description}</p>
        </div>
      ` : ""}
    `;
  }
  _renderTravelersTab() {
    return r`
      <h3>👥 Mitreisende verwalten</h3>
      
      ${this.canEdit ? this._renderAddTravelerForm() : ""}

      <ul class="travelers-list">
        ${this.travelers.map((e) => this._renderTravelerItem(e))}
      </ul>

      ${this.travelers.length === 0 ? r`
        <div class="alert">
          <p>Noch keine Mitreisenden eingetragen.</p>
          ${this.canEdit ? r`<p>Fügen Sie die ersten Mitreisenden über das Formular oben hinzu.</p>` : ""}
        </div>
      ` : ""}
    `;
  }
  _renderAddTravelerForm() {
    return r`
      <div class="add-traveler-form">
        <h4>Neue Person hinzufügen</h4>
        <form @submit=${this._handleAddTraveler}>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Vorname *</label>
              <input 
                type="text" 
                id="firstName" 
                .value=${this._newTraveler.firstName}
                @input=${(e) => this._newTraveler.firstName = e.target.value}
                required
              />
            </div>
            <div class="form-group">
              <label for="lastName">Nachname *</label>
              <input 
                type="text" 
                id="lastName" 
                .value=${this._newTraveler.lastName}
                @input=${(e) => this._newTraveler.lastName = e.target.value}
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input 
                type="email" 
                id="email" 
                .value=${this._newTraveler.email}
                @input=${(e) => this._newTraveler.email = e.target.value}
              />
            </div>
            <div class="form-group">
              <label for="phone">Telefon</label>
              <input 
                type="tel" 
                id="phone" 
                .value=${this._newTraveler.phone}
                @input=${(e) => this._newTraveler.phone = e.target.value}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="dateOfBirth">Geburtsdatum</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                .value=${this._newTraveler.dateOfBirth}
                @input=${(e) => this._newTraveler.dateOfBirth = e.target.value}
              />
            </div>
            <div class="form-group">
              <label for="documentNumber">Ausweisnummer</label>
              <input 
                type="text" 
                id="documentNumber" 
                .value=${this._newTraveler.documentNumber}
                @input=${(e) => this._newTraveler.documentNumber = e.target.value}
                placeholder="Pass- oder Personalausweisnummer"
              />
            </div>
          </div>

          <button type="submit" class="button" ?disabled=${this.isLoading}>
            ${this.isLoading ? "Wird hinzugefügt..." : "+ Person hinzufügen"}
          </button>
        </form>
      </div>
    `;
  }
  _renderTravelerItem(e) {
    return r`
      <li class="traveler-item">
        <div class="traveler-info">
          <div class="traveler-name">
            ${e.firstName} ${e.lastName}
            ${e.isMainTraveler ? r`<span style="color: var(--primary-color); font-weight: normal;"> (Hauptperson)</span>` : ""}
          </div>
          <div class="traveler-details">
            ${e.email ? r`📧 ${e.email}<br>` : ""}
            ${e.phone ? r`📞 ${e.phone}<br>` : ""}
            ${e.dateOfBirth ? r`🎂 ${new Date(e.dateOfBirth).toLocaleDateString("de-CH")}<br>` : ""}
            ${e.documentNumber ? r`🆔 ${e.documentNumber}` : ""}
          </div>
        </div>
        <div class="traveler-status ${e.status}">
          ${e.status === "checkedin" ? "✅ Eingecheckt" : "⏳ Ausstehend"}
          ${e.checkInTime ? r`<br><small>${new Date(e.checkInTime).toLocaleString("de-CH")}</small>` : ""}
        </div>
        ${this.canEdit && !e.isMainTraveler ? r`
          <button 
            class="button danger" 
            @click=${() => this._removeTraveler(e.id)}
            ?disabled=${this.isLoading}
          >
            🗑️ Entfernen
          </button>
        ` : ""}
      </li>
    `;
  }
  _renderCheckInTab() {
    var e, t, i, a, o, n, c, d, f, x, w;
    return this.showCheckIn ? r`
      <div class="checkin-section">
        <div class="checkin-icon">
          ${(e = this.checkInData) != null && e.isCompleted ? "✅" : "✈️"}
        </div>
        
        <div class="checkin-status ${(t = this.checkInData) != null && t.isCompleted ? "completed" : "pending"}">
          ${(i = this.checkInData) != null && i.isCompleted ? "Check-in abgeschlossen!" : "Online Check-in verfügbar"}
        </div>

        <div class="checkin-details">
          <div class="info-grid">
            <div class="info-card">
              <h4>📍 Treffpunkt</h4>
              <p><strong>${(a = this.checkInData) == null ? void 0 : a.meetingPoint}</strong></p>
              <p>🕒 ${(o = this.checkInData) == null ? void 0 : o.meetingTime}</p>
            </div>

            <div class="info-card">
              <h4>📞 Notfall-Kontakt</h4>
              <p>${(n = this.checkInData) == null ? void 0 : n.contactNumber}</p>
              <p><small>Verfügbar 24/7 während der Reise</small></p>
            </div>

            <div class="info-card">
              <h4>📋 Benötigte Dokumente</h4>
              <ul style="margin: 0; padding-left: 20px;">
                ${((d = (c = this.checkInData) == null ? void 0 : c.documents) == null ? void 0 : d.map((C) => r`<li>${C}</li>`)) || ""}
              </ul>
            </div>

            <div class="info-card">
              <h4>⏰ Check-in Frist</h4>
              <p><strong>${(x = (f = this.checkInData) == null ? void 0 : f.checkInDeadline) == null ? void 0 : x.toLocaleDateString("de-CH")} um 18:00</strong></p>
              <p><small>Spätestens 24h vor Abfahrt</small></p>
            </div>
          </div>

          ${(w = this.checkInData) != null && w.isCompleted ? r`
            <div class="alert success" style="margin-top: 20px;">
              <strong>Check-in erfolgreich!</strong><br>
              Sie sind für diese Reise eingecheckt. Wir freuen uns auf Sie!
            </div>
          ` : r`
            <button 
              class="button" 
              @click=${this._performCheckIn}
              ?disabled=${this.isLoading}
              style="margin-top: 20px; font-size: 1.1em; padding: 15px 30px;"
            >
              ${this.isLoading ? "Check-in läuft..." : "✈️ Jetzt einchecken"}
            </button>
          `}
        </div>
      </div>
    ` : r`
        <div class="alert">
          <h3>Check-in noch nicht verfügbar</h3>
          <p>Der Online Check-in wird 7 Tage vor Reisebeginn freigeschaltet.</p>
        </div>
      `;
  }
  async _handleAddTraveler(e) {
    if (e.preventDefault(), !this._newTraveler.firstName || !this._newTraveler.lastName) {
      this.errorMessage = "Vor- und Nachname sind erforderlich.";
      return;
    }
    try {
      this.isLoading = !0, this.errorMessage = "";
      const t = {
        ...this._newTraveler,
        id: `traveler-${Date.now()}`,
        status: "pending",
        checkInTime: null,
        isMainTraveler: !1
      };
      this.apiUrl ? (await this._apiCall(`trips/${this.trip.id}/travelers`, t, "POST"), await this._loadTravelersData()) : this.travelers = [...this.travelers, t], this._newTraveler = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        documentNumber: ""
      }, this.successMessage = `${t.firstName} ${t.lastName} wurde erfolgreich hinzugefügt.`, setTimeout(() => this.successMessage = "", 5e3);
    } catch (t) {
      this.errorMessage = `Fehler beim Hinzufügen: ${t.message}`;
    } finally {
      this.isLoading = !1;
    }
  }
  async _removeTraveler(e) {
    if (confirm("Möchten Sie diese Person wirklich entfernen?"))
      try {
        this.isLoading = !0, this.apiUrl ? (await this._apiCall(`trips/${this.trip.id}/travelers/${e}`, null, "DELETE"), await this._loadTravelersData()) : this.travelers = this.travelers.filter((t) => t.id !== e), this.successMessage = "Person wurde erfolgreich entfernt.", setTimeout(() => this.successMessage = "", 5e3);
      } catch (t) {
        this.errorMessage = `Fehler beim Entfernen: ${t.message}`;
      } finally {
        this.isLoading = !1;
      }
  }
  async _performCheckIn() {
    try {
      if (this.isLoading = !0, this.errorMessage = "", await new Promise((e) => setTimeout(e, 2e3)), this.apiUrl && await this._apiCall(`trips/${this.trip.id}/checkin`, {}, "POST"), this.travelers.length > 0) {
        const e = this.travelers.find((t) => t.isMainTraveler);
        e && (e.status = "checkedin", e.checkInTime = (/* @__PURE__ */ new Date()).toISOString());
      }
      this.checkInData = {
        ...this.checkInData,
        isCompleted: !0
      }, this.successMessage = "Check-in erfolgreich abgeschlossen!", this.dispatchEvent(new CustomEvent("checkin-completed", {
        detail: {
          tripId: this.trip.id,
          checkInTime: (/* @__PURE__ */ new Date()).toISOString()
        },
        bubbles: !0,
        composed: !0
      }));
    } catch (e) {
      this.errorMessage = `Check-in Fehler: ${e.message}`;
    } finally {
      this.isLoading = !1;
    }
  }
  _setActiveTab(e) {
    this.activeTab = e, this._clearMessages();
  }
  _clearError() {
    this.errorMessage = "";
  }
  _clearMessages() {
    this.errorMessage = "", this.successMessage = "";
  }
  _getStatusText(e) {
    return {
      confirmed: "Bestätigt",
      pending: "Ausstehend",
      cancelled: "Storniert",
      checkedin: "Eingecheckt"
    }[e] || "Bestätigt";
  }
  // Event to close the component
  _close() {
    this.dispatchEvent(new CustomEvent("close-trip-details", {
      bubbles: !0,
      composed: !0
    }));
  }
}
l(g, "properties", {
  trip: { type: Object },
  travelers: { type: Array },
  isLoading: { type: Boolean, state: !0 },
  errorMessage: { type: String, state: !0 },
  successMessage: { type: String, state: !0 },
  activeTab: { type: String, state: !0 },
  apiUrl: { type: String, attribute: "api-url" },
  authToken: { type: String, attribute: "auth-token" },
  canEdit: { type: Boolean, attribute: "can-edit" },
  theme: { type: String, attribute: "theme" },
  showCheckIn: { type: Boolean, state: !0 },
  checkInData: { type: Object, state: !0 }
}), l(g, "styles", [
  k,
  S,
  h`
    :host {
      display: block;
      --primary-color: var(--primary-color, #009553);
      --secondary-color: var(--secondary-color, #e30613);
      --text-color: var(--text-color, #111827);
      --text-secondary: var(--text-secondary, #6b7280);
      --background-color: var(--bg-color, #ffffff);
      --background-secondary: var(--bg-secondary, #f9fafb);
      --border-color: var(--border-color, #e5e7eb);
      --border-radius: var(--border-radius, 8px);
      --shadow: var(--shadow, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1));
      --shadow-lg: var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1));
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --error-color: var(--secondary-color);
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-color);
      
    }

    .trip-details-container {
      background: var(--background-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      max-width: 1000px;
      margin: 0 auto;
    }

    .trip-header {
      background: linear-gradient(135deg, var(--primary-color), #007a44);
      color: white;
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }

    .trip-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
      opacity: 0.3;
    }

    .trip-header > * {
      position: relative;
      z-index: 1;
    }

    .trip-title {
      font-size: 36px;
      margin: 0 0 10px 0;
      font-weight: 700;
      letter-spacing: -0.025em;
    }

    .trip-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin: 0;
      font-weight: 400;
    }

    .trip-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 20px;
      letter-spacing: 0.025em;
      text-transform: uppercase;
    }

    .status-confirmed {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .status-pending {
      background-color: var(--warning-color);
      color: white;
    }

    .status-checkedin {
      background-color: var(--success-color);
      color: white;
    }

    .tab-navigation {
      display: flex;
      background: var(--background-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .tab-button {
      flex: 1;
      background: none;
      border: none;
      padding: 16px 20px;
      font-size: 14px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
      border-bottom: 2px solid transparent;
      font-weight: 500;
      position: relative;
    }

    .tab-button:hover {
      background: rgba(0, 149, 83, 0.05);
      color: var(--text-color);
    }

    .tab-button.active {
      background: var(--background-color);
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      font-weight: 600;
    }

    .tab-content {
      padding: 40px 30px;
      min-height: 400px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .info-card {
      background: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 24px;
      box-shadow: var(--shadow);
      transition: all 0.2s ease;
    }

    .info-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-1px);
    }

    .info-card h4 {
      margin: 0 0 12px 0;
      color: var(--primary-color);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .info-card p {
      margin: 8px 0;
      color: var(--text-color);
      font-size: 14px;
      line-height: 1.5;
    }

    .travelers-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .traveler-item {
      background: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 24px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      transition: all 0.2s ease;
      box-shadow: var(--shadow);
    }

    .traveler-item:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-1px);
    }

    .traveler-info {
      flex: 1;
    }

    .traveler-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    .traveler-details {
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.5;
    }

    .traveler-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      margin-top: 12px;
    }

    .traveler-status.checkedin {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
    }

    .traveler-status.pending {
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning-color);
    }

    .add-traveler-form {
      background: #f8f9fa;
      border-radius: var(--box-border-radius);
      padding: 20px;
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      margin-bottom: 5px;
      font-weight: 600;
      color: var(--text-color);
    }

    .form-group input {
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 1em;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 90, 158, 0.1);
    }

    .button {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: var(--border-radius);
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .button:hover:not(:disabled) {
      background: #004a85;
      transform: translateY(-1px);
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .button.secondary {
      background: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
    }

    .button.secondary:hover:not(:disabled) {
      background: var(--primary-color);
      color: white;
    }

    .button.danger {
      background: var(--error-color);
    }

    .button.danger:hover:not(:disabled) {
      background: #c41e3a;
    }

    .checkin-section {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: var(--border-radius);
      padding: 30px;
      text-align: center;
    }

    .checkin-icon {
      font-size: 4em;
      margin-bottom: 20px;
      color: var(--primary-color);
    }

    .checkin-status {
      font-size: 1.4em;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .checkin-status.completed {
      color: var(--success-color);
    }

    .checkin-status.pending {
      color: var(--warning-color);
    }

    .checkin-details {
      background: white;
      border-radius: var(--border-radius);
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .alert {
      padding: 15px;
      border-radius: var(--box-border-radius);
      margin-bottom: 20px;
      border-left: 4px solid;
    }

    .alert.success {
      background: #d4edda;
      color: #155724;
      border-left-color: var(--success-color);
    }

    .alert.error {
      background: #f8d7da;
      color: #721c24;
      border-left-color: var(--error-color);
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .trip-header {
        padding: 20px;
      }

      .trip-title {
        font-size: 1.8em;
      }

      .tab-navigation {
        flex-direction: column;
      }

      .tab-content {
        padding: 20px;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .traveler-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
  `
]);
customElements.get("trip-details") || customElements.define("trip-details", g);
class y extends v(p) {
  render() {
    const t = (this.appState.trips || []).filter((i) => N(i)).slice(0, 3);
    return t.length === 0 ? r`
                <div class="trip-overview">
                    <h4>Nächste Reisen</h4>
                    <div class="no-trips">Keine bevorstehenden Reisen</div>
                </div>
            ` : r`
            <div class="trip-overview">
                <h4>Nächste Reisen</h4>
                ${t.map((i) => r`
                    <div class="trip-item">
                        <div class="trip-title">${i.title}</div>
                        <div class="trip-date">${M(i.departureDate)}</div>
                    </div>
                `)}
            </div>
        `;
  }
}
l(y, "styles", h`
        :host {
            display: block;
        }

        .trip-overview {
            font-size: 0.9rem;
        }

        .trip-item {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }

        .trip-item:last-child {
            border-bottom: none;
        }

        .trip-title {
            font-weight: bold;
            color: #009553;
        }

        .trip-date {
            color: #666;
            font-size: 0.8rem;
        }

        .no-trips {
            color: #666;
            font-style: italic;
        }
    `);
customElements.get("trip-overview-widget") || customElements.define("trip-overview-widget", y);
const P = E("global-app-state"), U = {
  theme: "twerenbold",
  isAuthenticated: !1,
  authUser: null,
  authComponent: null,
  apiMode: "demo",
  languageConfig: null,
  isLanguageLoaded: !1,
  isInitializing: !0,
  notifications: [],
  currentTrip: null,
  trips: [],
  preferences: {
    autoHideNotifications: !0,
    notificationDuration: 5e3
  }
};
class $ extends p {
  constructor() {
    super(), this.state = { ...U }, this._initializeGlobalApp();
  }
  async _initializeGlobalApp() {
    try {
      console.log("🌍 Initializing GLOBAL App State...");
      const e = await I();
      this._updateState({
        languageConfig: e,
        isLanguageLoaded: !0
      }), L(e), D(this.state.theme), this._restorePersistedState(), this._connectAuthComponent(), this._updateState({ isInitializing: !1 }), console.log("✅ Global App State initialized"), this._provideGlobalContext();
    } catch (e) {
      console.error("❌ Failed to initialize global app state:", e), this._updateState({
        isInitializing: !1,
        isLanguageLoaded: !0
      });
    }
  }
  _provideGlobalContext() {
    this.state, this.setTheme.bind(this), this.setApiMode.bind(this), this.setCurrentTrip.bind(this), this.setTrips.bind(this), this.addNotification.bind(this), this.removeNotification.bind(this), this.updatePreferences.bind(this), this.login.bind(this), this.logout.bind(this), z(document.body), console.log("🌍 Global context provided to entire document");
  }
  // ... alle anderen Methoden wie im normalen AppStateProvider
  // (setTheme, setApiMode, etc. - kopiere sie hierher)
  _updateState(e) {
    if (this.state = { ...this.state, ...e }, e.authUser !== void 0 || e.isAuthenticated !== void 0) {
      const t = this.state.isAuthenticated ? this.state.authUser : null;
      O.setContextUser(t);
    }
    this._persistState(), this.state.isInitializing || this._provideGlobalContext(), this.dispatchEvent(new CustomEvent("app-state-changed", {
      detail: e,
      bubbles: !0,
      composed: !0
    }));
  }
  // Kopiere alle anderen Methoden vom normalen AppStateProvider...
  // (setTheme, _restorePersistedState, _persistState, etc.)
  render() {
    return r`<slot></slot>`;
  }
}
l($, "properties", {
  state: { type: Object, state: !0 }
});
customElements.define("global-app-state-provider", $);
const F = (s) => {
  var e;
  return e = class extends s {
    constructor() {
      super(), this._globalAppContext = null;
    }
    connectedCallback() {
      super.connectedCallback(), console.log(`🌍 ${this.constructor.name} connecting to GLOBAL app context...`), setTimeout(() => {
        try {
          this._globalAppContext = B(this, P), this._globalAppContext && this._globalAppContext.state ? (console.log(`✅ ${this.constructor.name} connected to GLOBAL context`), this.requestUpdate()) : console.warn(`⚠️ ${this.constructor.name} could not connect to global context`);
        } catch (t) {
          console.error(`❌ ${this.constructor.name} global context error:`, t);
        }
      }, 100);
    }
    // Convenience getters (gleiche wie normale Version)
    get appState() {
      var t;
      return ((t = this._globalAppContext) == null ? void 0 : t.state) || {};
    }
    get appActions() {
      var t;
      return ((t = this._globalAppContext) == null ? void 0 : t.actions) || {};
    }
    get theme() {
      return this.appState.theme || "twerenbold";
    }
    get apiMode() {
      return this.appState.apiMode || "demo";
    }
    get isAuthenticated() {
      return this.appState.isAuthenticated || !1;
    }
    get needsAuth() {
      return (this.apiMode === "live" || this.apiMode === "local") && !this.isAuthenticated;
    }
    get languageConfig() {
      return this.appState.languageConfig || {};
    }
    showGlobalNotification(t) {
      var i, a;
      (a = (i = this.appActions).addNotification) == null || a.call(i, t);
    }
  }, l(e, "properties", {
    ...s.properties,
    _globalAppContext: { type: Object, state: !0 }
  }), e;
};
class m extends v(p) {
  constructor() {
    super(), this.loading = !1;
  }
  // Access global state through context
  render() {
    const { theme: e, apiMode: t, isAuthenticated: i, currentTrip: a } = this.appState, { setTheme: o, setApiMode: n, addNotification: c } = this.appActions;
    return r`
      <div class="example-component">
        <h2>Context Example Component</h2>
        
        <!-- Display current global state -->
        <div class="state-display">
          <h3>Current Global State:</h3>
          <p><strong>Theme:</strong> ${e}</p>
          <p><strong>API Mode:</strong> ${t}</p>
          <p><strong>Authenticated:</strong> ${i ? "Yes" : "No"}</p>
          <p><strong>Current Trip:</strong> ${(a == null ? void 0 : a.title) || "None"}</p>
          <p><strong>Needs Auth:</strong> ${this.needsAuth ? "Yes" : "No"}</p>
        </div>

        <!-- Controls to modify global state -->
        <div class="controls">
          <h3>Global State Controls:</h3>
          
          <div class="control-group">
            <label>Theme:</label>
            <select @change=${(d) => o == null ? void 0 : o(d.target.value)} .value=${e}>
              <option value="twerenbold">Twerenbold</option>
              <option value="voegele">Voegele</option>
              <option value="imbach">Imbach</option>
            </select>
          </div>

          <div class="control-group">
            <label>API Mode:</label>
            <select @change=${(d) => n == null ? void 0 : n(d.target.value)} .value=${t}>
              <option value="demo">Demo</option>
              <option value="local">Local</option>
              <option value="live">Live</option>
            </select>
          </div>

          <div class="control-group">
            <button class="btn btn-primary" @click=${() => this.showTestNotification()}>
              Test Global Notification
            </button>
          </div>

          <div class="control-group">
            <button class="btn btn-secondary" @click=${() => this.testTextService()}>
              Test Text Service
            </button>
          </div>
        </div>

        <!-- Auth overlay (automatically shown when needed) -->
        ${this.renderAuthOverlay()}
      </div>
    `;
  }
  showTestNotification() {
    var e, t;
    (t = (e = this.appActions).addNotification) == null || t.call(e, {
      type: "success",
      title: "Global Notification Test",
      message: `This notification was sent through the global context system. Current theme: ${this.theme}`,
      autoHideDelay: 3e3
    });
  }
  testTextService() {
    var i, a;
    const e = "pageTitle", t = u(e, "trips", "Default Text", this.theme);
    (a = (i = this.appActions).addNotification) == null || a.call(i, {
      type: "info",
      title: "Text Service Test",
      message: `getText('${e}', 'trips') for theme '${this.theme}': "${t}"`,
      autoHideDelay: 4e3
    });
  }
  renderAuthOverlay() {
    return this.needsAuth ? r`
      <div class="auth-overlay">
        <div class="auth-overlay-content">
          <h2>${u("authRequired", "common", "Authentication Required", this.theme)}</h2>
          <p>${u("authRequiredText", "common", "Please sign in to access this feature.", this.theme)}</p>
          <button class="btn btn-primary" @click=${() => {
      var e, t;
      return (t = (e = this.appActions).login) == null ? void 0 : t.call(e);
    }}>
            ${u("signIn", "common", "Sign In", this.theme)}
          </button>
        </div>
      </div>
    ` : "";
  }
}
l(m, "properties", {
  loading: { type: Boolean }
}), l(m, "styles", h`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--font-family, sans-serif);
    }

    .example-component {
      max-width: 800px;
      margin: 0 auto;
    }

    .state-display {
      background: var(--bg-secondary, #f9fafb);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .controls {
      border: 1px solid var(--border-color, #e5e7eb);
      padding: 1rem;
      border-radius: 8px;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .control-group label {
      min-width: 100px;
      font-weight: 600;
    }

    .control-group select {
      padding: 0.5rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 4px;
    }

    /* Auth overlay styles */
    .auth-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    }

    .auth-overlay-content {
      background: white;
      padding: 0rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 100%;
    }

    .auth-overlay-content h2 {
      color: var(--primary-color, #009553);
      margin-bottom: 1rem;
    }

    .auth-overlay-content p {
      color: var(--text-secondary, #6b7280);
      margin-bottom: 2rem;
    }

    /* Button styles */
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: var(--primary-color, #009553);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-color-dark, #007a43);
    }

    .btn-secondary {
      background: var(--bg-secondary, #f3f4f6);
      color: var(--text-color, #374151);
      border: 1px solid var(--border-color, #e5e7eb);
    }

    .btn-secondary:hover {
      background: var(--bg-color, #ffffff);
    }
  `);
customElements.define("context-example-component", m);
class b extends p {
  constructor() {
    super(), this.theme = "twerenbold", this.active = "account", this.pages = [
      { id: "overview", label: "Kontoübersicht", icon: "overview", component: "overview-component" },
      { id: "account", label: "Persönliche Daten", icon: "account", component: "account-management-component" },
      { id: "trips", label: "Meine Reisen", icon: "trips", component: "trips-view-component" },
      { id: "merkliste", label: "Merkliste", icon: "merkliste", component: "merkliste-component" },
      { id: "newsletter", label: "Newsletter-Abonnements", icon: "newsletter", component: "newsletter-component" }
    ];
  }
  selectPage(e) {
    this.active = e, this.requestUpdate();
  }
  renderIcon(e) {
    switch (e) {
      case "account":
        return r`<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>`;
      case "trips":
        return r`<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2"/><path d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2"/></svg>`;
      case "merkliste":
        return r`<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5v14l7-7 7 7V5z"/></svg>`;
      case "newsletter":
        return r`<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 6l8 6 8-6"/></svg>`;
      default:
        return r`<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
    }
  }
  render() {
    return r`
      <nav class="nav">
        ${this.pages.map((e) => r`
          <button class="nav-link ${this.active === e.id ? "active" : ""}" @click=${() => this.selectPage(e.id)}>
            ${this.renderIcon(e.icon)}
            <span>${e.label}</span>
          </button>
        `)}
      </nav>
      <div class="main-content">
        ${this.renderActiveComponent()}
      </div>
    `;
  }
  renderActiveComponent() {
    const e = this.pages.find((t) => t.id === this.active);
    if (!e) return r`<div>Seite nicht gefunden.</div>`;
    switch (e.component) {
      case "account-management-component":
        return r`<account-management-component theme="${this.theme}" api-mode="demo"></account-management-component>`;
      case "trips-view-component":
        return r`<trips-view-component theme="${this.theme}" api-mode="demo"></trips-view-component>`;
      case "merkliste-component":
        return r`<merkliste-component theme="${this.theme}" api-mode="demo"></merkliste-component>`;
      case "newsletter-component":
        return r`<newsletter-component theme="${this.theme}" api-mode="demo"></newsletter-component>`;
      default:
        return r`<div>Kontoübersicht</div>`;
    }
  }
}
l(b, "properties", {
  theme: { type: String },
  active: { type: String },
  pages: { type: Array }
}), l(b, "styles", [
  k,
  h`
    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background: var(--twerenbold-background, #fff);
      border-radius: 16px;
      border: 1px solid var(--twerenbold-border, #e5e7eb);
      padding: 2rem 1rem;
      box-shadow: var(--twerenbold-shadow, 0 1px 3px rgba(0,0,0,0.07));
      max-width: 320px;
      margin: 2rem auto;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--twerenbold-text, #111827);
      background: none;
      border: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .nav-link.active {
      background: var(--twerenbold-primary-light, #e6f5ef);
      color: var(--twerenbold-primary, #009553);
    }
    .nav-link:hover {
      background: var(--twerenbold-background-secondary, #f9fafb);
    }
    .nav-icon {
      width: 24px;
      height: 24px;
      color: var(--twerenbold-primary, #009553);
    }
    .main-content {
      margin-top: 2rem;
      min-height: 400px;
    }
  `
]);
customElements.define("modular-navigation", b);
class T extends v(p) {
  render() {
    var e, t;
    return this.isAuthenticated && this.appState.authUser ? r`
                <div class="user-status">
                    <div class="user-avatar">
                        ${((t = (e = this.appState.authUser.name) == null ? void 0 : e.charAt(0)) == null ? void 0 : t.toUpperCase()) || "U"}
                    </div>
                    <span>Hallo, ${this.appState.authUser.name || "User"}!</span>
                </div>
            ` : r`
            <button class="login-button" @click=${this.handleLogin}>
                Anmelden
            </button>
        `;
  }
  handleLogin() {
    console.log("Login clicked - implement OAuth flow here"), this.appActions.addNotification({
      type: "info",
      title: "Login",
      message: "Login-Funktionalität würde hier implementiert werden"
    });
  }
}
l(T, "styles", h`
        :host {
            display: block;
            font-size: 0.9rem;
        }

        .user-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #009553;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .login-button {
            background: #009553;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
        }
    `);
customElements.get("user-status-widget") || customElements.define("user-status-widget", T);
(function() {
  if (typeof window > "u" || typeof document > "u") return;
  const e = window.twerenboldConfig;
  if (e && e.autoBootstrapAppState === !1) return;
  const t = [
    "header-account-menu",
    "app-state-provider",
    "twerenbold-account-embed",
    "account-portal-embed",
    "oauth-login",
    "oauth-auth-component"
  ].join(","), i = () => {
    var a;
    try {
      if ((a = window.__twerenboldAppState) != null && a.provider || document.querySelector(t) || !document.body) return;
      const o = document.createElement("header-account-menu");
      o.setAttribute("headless", ""), o.setAttribute("data-auto-bootstrapped", "");
      const n = e && e.silentRedirectUri;
      typeof n == "string" && o.setAttribute("silent-redirect-uri", n), document.body.appendChild(o);
    } catch (o) {
      try {
        console.warn("[twerenbold] autoBootstrapAppState failed", o);
      } catch {
      }
    }
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", i, { once: !0 }) : i();
})();
export {
  K as AccountManager,
  V as AccountOverviewComponent,
  W as AppStateProvider,
  Y as AuthNotifications,
  J as AuthenticatedComponent,
  Z as ClubStatusComponent,
  m as ContextExampleComponent,
  Q as CurrentTripComponent,
  X as Favorites,
  $ as GlobalAppContext,
  ee as HeaderAccountMenu,
  b as ModularNavigation,
  te as NewsletterSignup,
  re as OAuthLogin,
  g as TripDetailsComponent,
  y as TripOverviewWidget,
  ie as TripsList,
  ae as TwerenboldAccountEmbed,
  T as UserStatusWidget,
  oe as appStateContext,
  P as globalAppStateContext,
  se as mountAccountPortal,
  v as withAppState,
  F as withGlobalAppState
};
