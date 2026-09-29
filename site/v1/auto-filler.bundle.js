var x = Object.defineProperty;
var K = (S, t, e) => t in S ? x(S, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : S[t] = e;
var k = (S, t, e) => K(S, typeof t != "symbol" ? t + "" : t, e);
import { f as E, s as z, r as H, l as q, u as Q, q as G, c as j } from "./scroll-lock-CQElyp-P.js";
const $ = [
  "https://twerenbold.ch",
  "https://www.twerenbold.ch",
  "https://imbach.ch",
  "https://www.imbach.ch",
  "https://excellence-reisen.ch",
  "https://www.excellence-reisen.ch",
  "https://excellence.ch",
  "https://www.excellence.ch",
  "https://dev.excellence.ch",
  "https://excellence.ddev.site",
  "https://voegele-reisen.ch",
  "https://www.voegele-reisen.ch",
  "https://staging.voegele-reisen.ch",
  "https://mittelthurgau.ch",
  "https://www.mittelthurgau.ch",
  "https://ibe.voegele-reisen.ch",
  // Development/staging origins
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5500",
  "http://localhost:8080",
  "https://xitami.github.io",
  "https://wispy-butterfly-157811.1wp.site",
  "https://voegelereisen-ibe.stg.tripbuilder.app"
], v = (S) => !S || typeof S != "string" ? !1 : !!($.includes(S) || S.startsWith("http://localhost:") || S.startsWith("http://127.0.0.1:"));
class N extends E {
  constructor() {
    super(), this.visible = !1, this.languageConfig = null, this.brand = "twerenbold";
  }
  connectedCallback() {
    super.connectedCallback(), this.languageConfig || this._loadLanguageConfig(), this._ensureThemeStylesheet();
  }
  /**
   * Inject theme-config.css into the document <head> if not already present.
   * This is needed when the popup is used standalone (e.g. via auto-filler on 3rd-party pages)
   * where the host page does not include the theme stylesheet.
   */
  _ensureThemeStylesheet() {
    if (typeof document > "u") return;
    const t = "twerenbold-theme-config-css";
    if (!document.getElementById(t))
      try {
        const e = new URL("data:text/css;base64,LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICBUSEVNRSBDT05GSUdVUkFUSU9OUwogICBUaGVtZS1zcGVjaWZpYyBDU1MgVmFyaWFibGUgT3ZlcnJpZGVzCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KICAgQkFTRSBUSEVNRSAvIERFRkFVTFRTIChCYXNlZCBvbiBUd2VyZW5ib2xkKQogICBBcHBsaWVzIHRvIGFsbCB0aGVtZXMgYXMgYSBmYWxsYmFjay4gCiAgIFNwZWNpZmljIHRoZW1lcyBvbmx5IG5lZWQgdG8gb3ZlcnJpZGUgY2hhbmdlZCB2YWx1ZXMuCiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi8KCjpyb290W2RhdGEtdGhlbWVdLApbdGhlbWVdLApbY2xhc3MqPSItdGhlbWUiXSB7CiAgLyogLS0tIENPTE9SUyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1wcmltYXJ5OiAjMDA5NTUzOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjMDA3YTQ0OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgwLCAxNDksIDgzLCAwLjEpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjZTMwNjEzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICNjNDFlM2E7CgoKCiAgLS10aGVtZS10ZXh0OiAjMTExODI3OwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6IHJnYigxMDcsIDExNCwgMTI4KTsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5Y2EzYWY7CgogIC0tdGhlbWUtYmFja2dyb3VuZDogI2ZmZmZmZjsKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjlmYWZiOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2YzZjRmNjsKCiAgLS10aGVtZS1ib3JkZXI6ICNlNWU3ZWI7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNmM2Y0ZjY7CgogIC0tdGhlbWUtc3VjY2VzczogIzEwYjk4MTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2Y1OWUwYjsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOwogIC0tdGhlbWUtZXJyb3I6ICNlZjQ0NDQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsKCiAgLyogLS0tIFRZUE9HUkFQSFkgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogdmFyKC0tYnMtYm9keS1mb250LWZhbWlseSwgIkNlbnRyYSBObzIgQm9vayIsICJIZWx2ZXRpY2EiLCBBcmlhbCwgc2Fucy1zZXJpZiwgJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZik7CiAgLS10aGVtZS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tYnMtaGVhZGluZy1mb250LWZhbWlseSwgdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSkpOwogIAogIC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZTogNDAwOwogIC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3M6IDcwMDsKCiAgLyogTGVnYWN5IG1hcHBpbmcgZm9yIGJhY2t3YXJkIGNvbXBhdCBpZiBuZWVkZWQgaW50ZXJuYWwgdG8gdGhlbWUgZmlsZSAqLwogIC0tdGhlbWUtZm9udC1mYW1pbHk6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwoKICAvKiAtLS0gTEFZT1VUICYgU1BBQ0lORyAoRGVmYXVsdDogVHdlcmVuYm9sZCkgLS0tICovCiAgLS10aGVtZS1ib3JkZXItcmFkaXVzOiAxMnB4OwogIC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXM6IDk5OXB4OwogIC0tdGhlbWUtY29tcG9uZW50LXBhZGRpbmc6IDJyZW07CiAgLS10aGVtZS1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgLS10aGVtZS1zaGFkb3ctbGc6IDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTsKCiAgLyogLS0tIENPTVBPTkVOVFMgKERlZmF1bHQ6IFR3ZXJlbmJvbGQpIC0tLSAqLwogIC0tdGhlbWUtbmF2aWdhdGlvbi1ncm91cC1ib3JkZXI6IHZhcigtLXRoZW1lLWJvcmRlciwgMXB4IHNvbGlkICNlNWU3ZWIpOwogIC0tdGhlbWUtYWNjb3VudC1lbWJlZC16LWluZGV4OiAwOwoKICAvKiAtLS0gTEVHQUNZIEFMSUFTRVMgKEJhY2t3YXJkIENvbXBhdGliaWxpdHkpIC0tLSAqLwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5OiB2YXIoLS10aGVtZS1wcmltYXJ5KTsKICAtLXR3ZXJlbmJvbGQtcHJpbWFyeS1kYXJrOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC1wcmltYXJ5LWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXR3ZXJlbmJvbGQtc2Vjb25kYXJ5OiB2YXIoLS10aGVtZS1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1zZWNvbmRhcnktZGFyazogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5LWRhcmspOwogIC0tdHdlcmVuYm9sZC10ZXh0OiB2YXIoLS10aGVtZS10ZXh0KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLXRleHQtc2Vjb25kYXJ5KTsKICAtLXR3ZXJlbmJvbGQtdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CiAgLS10d2VyZW5ib2xkLWJhY2tncm91bmQ6IHZhcigtLXRoZW1lLWJhY2tncm91bmQpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLXNlY29uZGFyeTogdmFyKC0tdGhlbWUtYmFja2dyb3VuZC1zZWNvbmRhcnkpOwogIC0tdHdlcmVuYm9sZC1iYWNrZ3JvdW5kLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKICAtLXR3ZXJlbmJvbGQtYm9yZGVyOiB2YXIoLS10aGVtZS1ib3JkZXIpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CiAgLS10d2VyZW5ib2xkLXN1Y2Nlc3M6IHZhcigtLXRoZW1lLXN1Y2Nlc3MpOwogIC0tdHdlcmVuYm9sZC1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXR3ZXJlbmJvbGQtd2FybmluZzogdmFyKC0tdGhlbWUtd2FybmluZyk7CiAgLS10d2VyZW5ib2xkLXdhcm5pbmctYmc6IHZhcigtLXRoZW1lLXdhcm5pbmctYmcpOwogIC0tdHdlcmVuYm9sZC1lcnJvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tdHdlcmVuYm9sZC1lcnJvci1iZzogdmFyKC0tdGhlbWUtZXJyb3ItYmcpOwogIC0tdHdlcmVuYm9sZC1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHkpOwogIC0tdHdlcmVuYm9sZC1ib3JkZXItcmFkaXVzOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtYnRuLWJvcmRlci1yYWRpdXM6IHZhcigtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzKTsKICAtLXR3ZXJlbmJvbGQtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3cpOwogIC0tdGhlbWUtbmF2LWxpbmstcGFkZGluZzogMXJlbTsKCiAgZGlhbG9nLm1vZGFsOjpiYWNrZHJvcHsKICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsIDAuNSk7CiAgfQp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFRIRU1FIE9WRVJSSURFUwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgovKiAtLS0gVFdFUkVOQk9MRCAoRXhwbGljaXQpIC0tLSAqLwovKiBVc2VzIEJhc2UgRGVmYXVsdHMsIG5vIG92ZXJyaWRlcyBuZWVkZWQgY3VycmVudGx5ICovCjpyb290W2RhdGEtdGhlbWU9InR3ZXJlbmJvbGQiXSwKLnR3ZXJlbmJvbGQtdGhlbWUgewogIC8qIEluaGVyaXRzIGRlZmF1bHRzIGZyb20gQmFzZSBUaGVtZSAqLwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS10aGVtZS1tb2JpbGUtbmF2LXRvZ2dsZS1wb3NpdGlvbi10b3A6IDdyZW07Cn0KCi8qIC0tLSBNSVRURUxUSFVSR0FVIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJtaXR0ZWx0aHVyZ2F1Il0sClt0aGVtZT0ibWl0dGVsdGh1cmdhdSJdLAoubWl0dGVsdGh1cmdhdS10aGVtZSB7CiAgLS10aGVtZS1wcmltYXJ5OiAjNjMyNTRhOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjNGQxYjM5OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSg5OSwgMzcsIDc0LCAwLjEyKTsKICAtLXRoZW1lLXNlY29uZGFyeTogI2I0OGM2NTsKICAtLXRoZW1lLXNlY29uZGFyeS1kYXJrOiAjOGQ2YjRjOwoKICAtLXRoZW1lLXRleHQ6ICMzMjE0MjI7CiAgLS10aGVtZS10ZXh0LXNlY29uZGFyeTogIzVmNDk1NDsKICAtLXRoZW1lLXRleHQtbXV0ZWQ6ICM5YThiOTM7CgogIC0tdGhlbWUtYm9yZGVyOiAjZTZkY2UyOwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZjNlY2YxOwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICMyZjlkNzg7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDQ3LCAxNTcsIDEyMCwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjZDc5YzNmOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgyMTUsIDE1NiwgNjMsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICNjNzQzNWQ7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxOTksIDY3LCA5MywgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ01hbnJvcGUnLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiB2YXIoLS10aGVtZS1mb250LWZhbWlseS1iYXNlKTsKICAKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAwcHg7CiAgCiAgLS1ib3JkZXItcmFkaXVzLXNtOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLWxnOiAwcHg7CiAgLS1ib3JkZXItcmFkaXVzLXhsOiAwcHg7Cn0KCi8qIC0tLSBFWENFTExFTkNFIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJleGNlbGxlbmNlIl0sClt0aGVtZT0iZXhjZWxsZW5jZSJdLAouZXhjZWxsZW5jZS10aGVtZSB7CiAgLyogVG9rZW5zIGRlciBuZXVlbiBleGNlbGxlbmNlLmNoIChOdXh0L1RhaWx3aW5kLCBTdGFuZCAxNi4wOS4yMDI2KToKICAgICBwcmltYXJ5LTUwMCAjYjU5NzUyLCBwcmltYXJ5LTYwMCAjYTU4YTRiLCBwcmltYXJ5LTcwMCAjODU2YjM1LAogICAgIHdhcm0tOTAwICM1ZDU4NTMgKFRleHQpLCB3YXJtLTcwMCAjOGU4NzgxLCB3YXJtLTEwMCAjZWNlOWU3LAogICAgIGdyYXktNTAgI2Y4ZjhmOCwgZ3JheS0yMDAgI2RmZGJkNiwgZ3JheS00MDAgI2M1YmRiNSwgZ3JheS02MDAgI2E2OWY5OC4KICAgICBTY2hyaWZ0ZW4gdmlhIFR5cGVraXQgKGzDpGR0IGRpZSBXZWJzaXRlKTogY2FuYWRhLXR5cGUtZ2lic29uIChGbGllc3N0ZXh0KSwKICAgICBpdnlqb3VybmFsIChTZXJpZiksIEZyaXogUXVhZHJhdGEgKEF1c3plaWNobnVuZykuIFJhZGl1cyAycHgsIEJ1dHRvbnMKICAgICB1cHBlcmNhc2UgbWl0IExldHRlcnNwYWNpbmcgd2llIC5idXR0b24gZGVyIFdlYnNpdGUuICovCiAgLS10aGVtZS1wcmltYXJ5OiAjYjU5NzUyOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjODU2YjM1OwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSgxODEsIDE1MSwgODIsIDAuMTQpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICM0NDNmM2I7CgogIC0tdGhlbWUtdGV4dDogIzAwMDAwMDsKICAtLXRoZW1lLXRleHQtc2Vjb25kYXJ5OiAjNWQ1ODUzOwogIC0tdGhlbWUtdGV4dC1tdXRlZDogIzhlODc4MTsKCiAgLS10aGVtZS1iYWNrZ3JvdW5kLXNlY29uZGFyeTogI2Y4ZjhmODsKICAtLXRoZW1lLWJhY2tncm91bmQtbXV0ZWQ6ICNlY2U5ZTc7CgogIC0tdGhlbWUtYm9yZGVyOiAjZGZkYmQ2OwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZWNlOWU3OwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICM2YTg0MjQ7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDEwNiwgMTMyLCAzNiwgMC4xMik7CiAgLS10aGVtZS13YXJuaW5nOiAjYTU4YTRiOwogIC0tdGhlbWUtd2FybmluZy1iZzogcmdiYSgxNjUsIDEzOCwgNzUsIDAuMTQpOwogIC0tdGhlbWUtZXJyb3I6ICM4ZDMzMjk7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgxNDEsIDUxLCA0MSwgMC4xMik7CgogIC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZTogJ2NhbmFkYS10eXBlLWdpYnNvbicsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiAnaXZ5am91cm5hbCcsIHVpLXNlcmlmLCBHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWY7CiAgLS10aGVtZS1mb250LXdlaWdodC1oZWFkaW5nczogNDAwOwoKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDJweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAycHg7CgogIC8qIEtLLTIyOTogQnV0dG9ucyBncmF1IG1pdCBoZWxsZXJlbSBHcmF1IGFscyBIb3ZlciwgU2NocmlmdCBzY2h3YXJ6IOKAlAogICAgIGVudHNwcmljaHQgLmJ1dHRvbi5pcy1ncmF5IGRlciBXZWJzaXRlIChncmF5LTQwMCDihpIgZ3JheS0yMDApLiAqLwogIC0tYnRuLWJvcmRlci1yYWRpdXM6IDJweDsKICAvKiAuYnV0dG9uIGRlciBXZWJzaXRlOiBHZXdpY2h0IDQwMCwgVmVyc2FsaWVuLCBMYXVmd2VpdGUgMC40NXB4LiAqLwogIC0tYnRuLWZvbnQtd2VpZ2h0OiA0MDA7CiAgLS1idG4tdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICAtLWJ0bi1sZXR0ZXItc3BhY2luZzogMC40NXB4OwogIC0tYnRuLXByaW1hcnktYmFja2dyb3VuZC1jb2xvcjogI2M1YmRiNTsKICAtLWJ0bi1wcmltYXJ5LWJvcmRlci1jb2xvcjogI2M1YmRiNTsKICAtLWJ0bi1wcmltYXJ5LWNvbG9yOiAjMDAwMDAwOwogIC0tYnRuLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjogI2RmZGJkNjsKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWJvcmRlci1jb2xvcjogI2RmZGJkNjsKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWNvbG9yOiAjMDAwMDAwOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOiAjZWNlOWU3OwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6ICNjNWJkYjU7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWNvbG9yOiAjMDAwMDAwOwoKICAvKiBLb3BmemVpbGVuLU1lbsO8IHVuZCBBYm1lbGRlLUxpbms6IHNjaHdhcnogc3RhdHQgZ29sZCwgSG92ZXIgd2FybS0xMDAuICovCiAgLS1oZWFkZXItbWVudS1jb2xvcjogIzAwMDAwMDsKICAtLWhlYWRlci1tZW51LXRyaWdnZXItaG92ZXItY29sb3I6ICM1ZDU4NTM7CiAgLS1oZWFkZXItbWVudS1wcmltYXJ5LWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWhvdmVyLWJnOiAjZWNlOWU3OwogIC0taGVhZGVyLW1lbnUtYWN0aW9uLWhvdmVyLWNvbG9yOiAjMDAwMDAwOwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWJnOiAjYjU5NzUyOwogIC0taGVhZGVyLW1lbnUtZHJvcGRvd24tYm9yZGVyLXJhZGl1czogMnB4OwoKICAvKiBBYm1lbGRlbi1CdXR0b24gZGVyIEF1dGgtS29tcG9uZW50ZTogZWNraWcgdW5kIGluIFZlcnNhbGllbiB3aWUgZGllIFdlYnNpdGUuICovCiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtYm9yZGVyLXJhZGl1czogMnB4OwogIC0tYXV0aC1jb21wb25lbnQtbG9nb3V0LXRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgLS1hdXRoLWNvbXBvbmVudC1sb2dvdXQtbGV0dGVyLXNwYWNpbmc6IDAuNDVweDsKfQoKLyogLS0tIFZPRUdFTEUgLS0tICovCjpyb290W2RhdGEtdGhlbWU9InZvZWdlbGUiXSwKW3RoZW1lPSJ2b2VnZWxlIl0sCi52b2VnZWxlLXRoZW1lIHsKICAtLXRoZW1lLXByaW1hcnk6ICMwMDYwNTI7CiAgLS10aGVtZS1wcmltYXJ5LWRhcms6ICMwMDQyMzg7CiAgLS10aGVtZS1wcmltYXJ5LWxpZ2h0OiAjMDA2MDUxY2I7CiAgLS10aGVtZS1zZWNvbmRhcnk6ICNiMWQ1NGY7CiAgLS10aGVtZS1zZWNvbmRhcnktZGFyazogIzFhMjAyYzsKCiAgLS10aGVtZS10ZXh0OiAjMWEyMDJjOwogIC0tdGhlbWUtdGV4dC1zZWNvbmRhcnk6ICM0YTU1Njg7CiAgLS10aGVtZS10ZXh0LW11dGVkOiAjNzE4MDk2OwoKICAtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5OiAjZjdmYWZjOwogIC0tdGhlbWUtYmFja2dyb3VuZC1tdXRlZDogI2VkZjJmNzsKCiAgLS10aGVtZS1ib3JkZXI6ICNlMmU4ZjA7CiAgLS10aGVtZS1ib3JkZXItbGlnaHQ6ICNmMWY1Zjk7CgogIC0tdGhlbWUtc3VjY2VzczogIzM4YTE2OTsKICAtLXRoZW1lLXN1Y2Nlc3MtYmc6IHJnYmEoNTYsIDE2MSwgMTA1LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2Q2OWUyZTsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjE0LCAxNTgsIDQ2LCAwLjEpOwogIC0tdGhlbWUtZXJyb3I6ICNlNTNlM2U7CiAgLS10aGVtZS1lcnJvci1iZzogcmdiYSgyMjksIDYyLCA2MiwgMC4xKTsKCiAgLS10aGVtZS1mb250LWZhbWlseS1iYXNlOiBFdWNsaWRDaXJjdWxhckIsIEFsbGVyLCAnU2Vnb2UgVUknLCBzYW5zLXNlcmlmOwogIC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3M6IHZhcigtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2UpOwogIC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3M6IDcwMDsKICAtLWhlYWRsaW5lLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5KTsKICAtLXRpdGxlLWNvbG9yOiB2YXIoLS1oZWFkbGluZS1jb2xvcik7CiAgLS1zdWJ0aXRsZS1jb2xvcjogcmdiYSgyOSwgMjksIDI5LCAwLjYpOwoKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDBweDsKICAtLXRoZW1lLWJ0bi1ib3JkZXItcmFkaXVzOiAzcHg7CiAgLS10aGVtZS1jb21wb25lbnQtcGFkZGluZzogMHJlbTsKICAKICAvKiBWb2VnZWxlIFNwZWNpZmljcyAqLwogIC0tY2FyZC1wYWRkaW5nOiAxLjVyZW07CiAgLS1jYXJkLWJvcmRlci13aWR0aDogMHB4OwoKICAtLWJ0bi1wcmltYXJ5LWhvdmVyLWNvbG9yOiAjZmZmOwogIC0tYnRuLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeS1saWdodCk7CiAgLS1idG4tcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwoKICAtLWJ0bi1zZWNvbmRhcnktaG92ZXItY29sb3I6ICNmZmY7CiAgLS1idG4tc2Vjb25kYXJ5LWhvdmVyLWJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwogIC0tYnRuLXNlY29uZGFyeS1ob3Zlci1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLXByaW1hcnktbGlnaHQpOwoKICAvKiBOb3RlOiBSZS1kZWNsYXJpbmcgYSB2YWx1ZSBpZGVudGljYWwgdG8gZGVmYXVsdCBpcyBoYXJtbGVzcyAoc2hhZG93KSAqLwogIC0tdHdlcmVuYm9sZC1zaGFkb3c6IHJnYmEoMTUsIDIzLCA0MiwgMC4xOCkgMHB4IDI0cHggNDhweCAtMjRweDsKICAtLXR3ZXJlbmJvbGQtc2hhZG93LWxnOiByZ2JhKDE1LCAyMywgNDIsIDAuMjUpIDBweCAzMHB4IDYwcHggLTMwcHg7CgogIC8qIEhlYWRlciBNZW51IFNwZWNpZmljcyAoVm9lZ2VsZSBPbmx5KSAqLwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWJnOiAjYWU5OTViOwogIC0taGVhZGVyLW1lbnUtYXZhdGFyLWNvbG9yOiB2YXIoLS10aGVtZS1wcmltYXJ5LWRhcmspOwp9CgovKiAtLS0gSU1CQUNIIC0tLSAqLwo6cm9vdFtkYXRhLXRoZW1lPSJpbWJhY2giXSwKW3RoZW1lPSJpbWJhY2giXSwKLmltYmFjaC10aGVtZSB7CiAgLS10aGVtZS1wcmltYXJ5OiAjNmRhNWNkOwogIC0tdGhlbWUtcHJpbWFyeS1kYXJrOiAjMDA0MTVkOwogIC0tdGhlbWUtcHJpbWFyeS1saWdodDogcmdiYSg0NSwgNTUsIDcyLCAwLjEpOwogIC0tdGhlbWUtc2Vjb25kYXJ5OiAjNGE1NTY4OwogIC0tdGhlbWUtc2Vjb25kYXJ5LWRhcms6ICMwMDQxNWQ7CgogIC0tdGhlbWUtdGV4dDogIzAwNDE1ZDsKICAtLXRoZW1lLXRleHQtc2Vjb25kYXJ5OiAjMDA0MTVkOwogIC0tdGhlbWUtdGV4dC1tdXRlZDogIzcxODA5NjsKCiAgLS10aGVtZS1iYWNrZ3JvdW5kLXNlY29uZGFyeTogI2Y4ZjlmYTsKICAtLXRoZW1lLWJhY2tncm91bmQtbXV0ZWQ6ICNlOWVjZWY7CgogIC0tdGhlbWUtYm9yZGVyOiAjZGVlMmU2OwogIC0tdGhlbWUtYm9yZGVyLWxpZ2h0OiAjZTllY2VmOwoKICAtLXRoZW1lLXN1Y2Nlc3M6ICMyOGE3NDU7CiAgLS10aGVtZS1zdWNjZXNzLWJnOiByZ2JhKDQwLCAxNjcsIDY5LCAwLjEpOwogIC0tdGhlbWUtd2FybmluZzogI2ZmYzEwNzsKICAtLXRoZW1lLXdhcm5pbmctYmc6IHJnYmEoMjU1LCAxOTMsIDcsIDAuMSk7CiAgLS10aGVtZS1lcnJvcjogI2RjMzU0NTsKICAtLXRoZW1lLWVycm9yLWJnOiByZ2JhKDIyMCwgNTMsIDY5LCAwLjEpOwoKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWJhc2U6IEdpbHJveSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAtLXRoZW1lLWZvbnQtZmFtaWx5LWhlYWRpbmdzOiB2YXIoLS10aGVtZS1mb250LWZhbWlseS1iYXNlKTsKICAKICAtLXRoZW1lLWJvcmRlci1yYWRpdXM6IDMwcHg7CiAgLS10aGVtZS1idG4tYm9yZGVyLXJhZGl1czogMHB4OwogIC0tdGhlbWUtbW9iaWxlLW5hdi10b2dnbGUtcG9zaXRpb24tdG9wOiA3cmVtOwp9CgovKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CiAgIFNZU1RFTSBWQVJJQUJMRSBNQVBQSU5HCiAgIE1hcHMgVGhlbWUtU3BlY2lmaWMgVmFyaWFibGVzIChMZWZ0KSB0byBHZW5lcmljIFN5c3RlbSBWYXJpYWJsZXMgKFJpZ2h0KQogICBUaGlzIGlzIHRoZSBBUEkgY29uc3VtZWQgYnkgc2hhcmVkLXN0eWxlcy5qcwogICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCgo6cm9vdFtkYXRhLXRoZW1lXSwKW3RoZW1lXSwKW2NsYXNzKj0iLXRoZW1lIl0gewogIC8qIENvbG9ycyAqLwogIC0tcHJpbWFyeS1jb2xvcjogdmFyKC0tdGhlbWUtcHJpbWFyeSk7CiAgLS1wcmltYXJ5LWNvbG9yLWRhcms6IHZhcigtLXRoZW1lLXByaW1hcnktZGFyayk7CiAgLS1wcmltYXJ5LWNvbG9yLWxpZ2h0OiB2YXIoLS10aGVtZS1wcmltYXJ5LWxpZ2h0KTsKICAtLXNlY29uZGFyeS1jb2xvcjogdmFyKC0tdGhlbWUtc2Vjb25kYXJ5KTsKICAtLXNlY29uZGFyeS1jb2xvci1kYXJrOiB2YXIoLS10aGVtZS1zZWNvbmRhcnktZGFyayk7CgogIC0tdGV4dC1jb2xvcjogdmFyKC0tdGhlbWUtdGV4dCk7CiAgLS10ZXh0LXNlY29uZGFyeTogdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpOwogIC0tdGV4dC1tdXRlZDogdmFyKC0tdGhlbWUtdGV4dC1tdXRlZCk7CgogIC0taGVhZGxpbmUtY29sb3I6IHZhcigtLWhlYWRsaW5lLWNvbG9yLCB2YXIoLS10aGVtZS10ZXh0KSk7CiAgLS10aXRsZS1jb2xvcjogdmFyKC0tdGl0bGUtY29sb3IsIHZhcigtLXRoZW1lLXRleHQpKTsKICAtLXN1YnRpdGxlLWNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1jb2xvciwgdmFyKC0tdGhlbWUtdGV4dC1zZWNvbmRhcnkpKTsKCiAgLS1iZy1jb2xvcjogdmFyKC0tdGhlbWUtYmFja2dyb3VuZCk7CiAgLS1iZy1zZWNvbmRhcnk6IHZhcigtLXRoZW1lLWJhY2tncm91bmQtc2Vjb25kYXJ5KTsKICAtLWJnLW11dGVkOiB2YXIoLS10aGVtZS1iYWNrZ3JvdW5kLW11dGVkKTsKCiAgLS1ib3JkZXItY29sb3I6IHZhcigtLXRoZW1lLWJvcmRlcik7CiAgLS1ib3JkZXItbGlnaHQ6IHZhcigtLXRoZW1lLWJvcmRlci1saWdodCk7CgogIC8qIFN0YXR1cyAqLwogIC0tc3VjY2Vzcy1jb2xvcjogdmFyKC0tdGhlbWUtc3VjY2Vzcyk7CiAgLS1zdWNjZXNzLWJnOiB2YXIoLS10aGVtZS1zdWNjZXNzLWJnKTsKICAtLXdhcm5pbmctY29sb3I6IHZhcigtLXRoZW1lLXdhcm5pbmcpOwogIC0td2FybmluZy1iZzogdmFyKC0tdGhlbWUtd2FybmluZy1iZyk7CiAgLS1lcnJvci1jb2xvcjogdmFyKC0tdGhlbWUtZXJyb3IpOwogIC0tZXJyb3ItYmc6IHZhcigtLXRoZW1lLWVycm9yLWJnKTsKCiAgLyogVHlwb2dyYXBoeSAqLwogIC0tZm9udC1mYW1pbHktYmFzZTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CiAgLS1mb250LWZhbWlseS1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktaGVhZGluZ3MpOwogIC0tZm9udC13ZWlnaHQtYmFzZTogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtYmFzZSk7CiAgLS1mb250LXdlaWdodC1oZWFkaW5nczogdmFyKC0tdGhlbWUtZm9udC13ZWlnaHQtaGVhZGluZ3MpOwogIAogIC8qIExlZ2FjeS9HZW5lcmljIGZhbGxiYWNrICovCiAgLS1mb250LWZhbWlseTogdmFyKC0tdGhlbWUtZm9udC1mYW1pbHktYmFzZSk7CgogIC8qIExheW91dCAqLwogIC0tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1ib3JkZXItcmFkaXVzLXNtOiB2YXIoLS10aGVtZS1ib3JkZXItcmFkaXVzKTsKICAtLWJvcmRlci1yYWRpdXMtbGc6IHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMpOwogIC0tYm9yZGVyLXJhZGl1cy14bDogdmFyKC0tdGhlbWUtYm9yZGVyLXJhZGl1cyk7CiAgLS1idG4tYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtYnRuLWJvcmRlci1yYWRpdXMsIHZhcigtLXRoZW1lLWJvcmRlci1yYWRpdXMsIDk5OXB4KSk7CgogIC0tY29tcG9uZW50LXBhZGRpbmc6IHZhcigtLXRoZW1lLWNvbXBvbmVudC1wYWRkaW5nLCAycmVtKTsKICAKICAvKiBTaGFkb3dzICovCiAgLS1ib3gtc2hhZG93OiB2YXIoLS10aGVtZS1zaGFkb3csIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSkpOwogIC0tYm94LXNoYWRvdy1zbTogdmFyKC0tdGhlbWUtc2hhZG93LCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjA1KSk7CiAgLS1ib3gtc2hhZG93LWxnOiB2YXIoLS10aGVtZS1zaGFkb3ctbGcsIDAgMTBweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7Cn0=", import.meta.url).href, r = document.createElement("link");
        r.id = t, r.rel = "stylesheet", r.href = e, document.head.appendChild(r), console.debug("LoginBenefitPopup: Injected theme-config.css:", e);
      } catch (e) {
        console.warn("LoginBenefitPopup: Failed to inject theme-config.css", e);
      }
  }
  async _loadLanguageConfig() {
    try {
      const t = import.meta.url, e = "language-config.json";
      let r;
      const i = t.match(/^(.*)\/src\/components\/(?:[^/]+\/)*[^/]+$/);
      if (i)
        r = i[1] + "/src/config/" + e;
      else {
        const s = t.substring(0, t.lastIndexOf("/") + 1);
        r = new URL("config/" + e, s).href;
      }
      const o = await fetch(r);
      o.ok && (this.languageConfig = await o.json());
    } catch (t) {
      console.warn("LoginBenefitPopup: Failed to load language config", t);
    }
  }
  _getTextConfig() {
    if (!this.languageConfig)
      return this._getDefaultTexts();
    const t = this.languageConfig.common || {}, e = this.theme || this.brand, r = e && this.languageConfig[e] || {}, i = { ...t, ...r }, o = this._getDefaultTexts(), s = [];
    for (let a = 1; ; a++) {
      const l = i[`autoFillerLoginBenefit${a}`], n = o.benefits[a - 1];
      if (!l && !n) break;
      s.push(l || n);
    }
    return {
      title: i.autoFillerLoginBenefitTitle || o.title,
      subtitle: i.autoFillerLoginBenefitSubtitle || o.subtitle,
      description: i.autoFillerLoginBenefitDescription || o.description,
      benefits: s,
      loginButton: i.autoFillerLoginButton || o.loginButton,
      registerButton: i.autoFillerRegisterButton || o.registerButton,
      dismissButton: i.autoFillerDismissButton || o.dismissButton
    };
  }
  _getDefaultTexts() {
    return {
      title: "Reisen bequemer buchen",
      subtitle: "Entdecken Sie die Vorteile eines Kundenkontos",
      description: "Mit einem Kundenkonto können Sie Ihre Reisedaten automatisch ausfüllen lassen und Zeit sparen.",
      benefits: [
        "Sicheres Login",
        "Verwalten Ihrer Personalien und Reisenden",
        "Zugriff auf Ihre gebuchten Reisen",
        "Newsletter-Abonnements",
        "Merkzettel Ihrer Lieblingsreisen"
      ],
      loginButton: "Jetzt anmelden",
      registerButton: "Konto erstellen",
      dismissButton: "Später"
    };
  }
  show() {
    this.visible = !0, this._storeReturnUrl(), this.updateComplete.then(() => {
      var e;
      const t = (e = this.shadowRoot) == null ? void 0 : e.getElementById("popup-dialog");
      t && !t.open && (q(), t.showModal());
    });
  }
  hide() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.getElementById("popup-dialog");
    t != null && t.open && t.close(), Q(), this.visible = !1;
  }
  /**
   * Store the current page URL for redirect after successful login/registration
   */
  _storeReturnUrl() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        const t = window.location.href;
        window.sessionStorage.setItem("twerenbold:login-return-url", t), console.log("LoginBenefitPopup: Stored return URL:", t);
      } catch (t) {
        console.warn("LoginBenefitPopup: Failed to store return URL", t);
      }
  }
  /**
   * Get the stored return URL
   */
  _getReturnUrl() {
    if (typeof window > "u" || typeof window.sessionStorage > "u")
      return null;
    try {
      return window.sessionStorage.getItem("twerenbold:login-return-url");
    } catch (t) {
      return console.warn("LoginBenefitPopup: Failed to get return URL", t), null;
    }
  }
  /**
   * Clear the stored return URL
   */
  _clearReturnUrl() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        window.sessionStorage.removeItem("twerenbold:login-return-url");
      } catch (t) {
        console.warn("LoginBenefitPopup: Failed to clear return URL", t);
      }
  }
  _handleOverlayClick(t) {
    t.target === t.currentTarget && this._handleDismiss();
  }
  _handleLogin() {
    this.dispatchEvent(new CustomEvent("login-requested", {
      bubbles: !0,
      composed: !0
    })), this.hide();
  }
  _handleRegister() {
    this.dispatchEvent(new CustomEvent("register-requested", {
      bubbles: !0,
      composed: !0
    })), this.hide();
  }
  _handleDismiss() {
    this.dispatchEvent(new CustomEvent("popup-dismissed", {
      bubbles: !0,
      composed: !0
    })), this.hide();
  }
  render() {
    if (!this.visible)
      return G``;
    const t = this._getTextConfig();
    return G`
      <dialog id="popup-dialog" class="popup-dialog" @cancel=${(e) => {
      e.preventDefault(), this._handleDismiss();
    }} @click=${(e) => {
      e.target.tagName === "DIALOG" && this._handleDismiss();
    }}>
        <div class="popup">
          <div class="popup-header">
            <button
              class="popup-close"
              type="button"
              aria-label="Popup schließen"
              @click="${this._handleDismiss}"
            >
              ×
            </button>
            <h2>${t.title}</h2>
            <p>${t.subtitle}</p>
          </div>
          <div class="popup-content">
            <p class="description">${t.description}</p>
            <ul class="benefits">
              ${t.benefits.map((e) => G`
                <li class="benefit-item">
                  <span class="benefit-icon">✓</span>
                  <span>${e}</span>
                </li>
              `)}
            </ul>
            <div class="popup-actions">
              <button class="btn btn-primary" @click="${this._handleLogin}">
                ${t.loginButton}
              </button>
              <button class="btn btn-secondary" @click="${this._handleRegister}">
                ${t.registerButton}
              </button>
              <button class="btn btn-dismiss" @click="${this._handleDismiss}">
                ${t.dismissButton}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
}
k(N, "properties", {
  visible: { type: Boolean, reflect: !0 },
  theme: { type: String, reflect: !0 },
  languageConfig: { type: Object },
  brand: { type: String }
}), k(N, "styles", [z, H`
    :host {
      display: block;
      font-family: var(--font-family, var(--twerenbold-font-family, 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif));
    }

    dialog.popup-dialog {
      padding: 0;
      border: none;
      border-radius: var(--border-radius-xl, 20px);
      box-shadow: var(--shadow-xl, 0 25px 50px rgba(15, 23, 42, 0.25));
      max-width: 540px;
      width: calc(100% - 2rem);
      max-height: min(92vh, 760px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      color: inherit;
      font-family: inherit;
      animation: slideUp 0.3s ease-out;
    }

    dialog.popup-dialog::backdrop {
      background: var(--modal-overlay-bg, rgba(15, 23, 42, 0.6));
      backdrop-filter: blur(4px);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .popup {
      display: flex;
      flex-direction: column;
    }

    .btn{
          min-height: 44px;
    }

    .popup-header {
      position: relative;
      background: var(--primary-color-dark, var(--primary-color, #006052));
      color: white;
      padding: 2rem;
      text-align: center;

    }

    .popup-header h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
      font-weight: var(--font-weight-bold, 700);
      line-height: 1.2;
      color: var(--headline-color, white);
    }

    .popup-header p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.95;
      line-height: 1.5;
    }

    .popup-content {
      padding: 2rem;
    }

    .popup-close {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 2.25rem;
      height: 2.25rem;
      border: none;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      font-size: 1.25rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .popup-close:hover,
    .popup-close:focus-visible {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.03);
      outline: none;
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary, #475569);
      margin: 0 0 1.5rem 0;
    }

    .benefits {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      font-size: 0.95rem;
      color: var(--text-color, #334155);
      line-height: 1.5;
    }

    .benefit-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, var(--primary-color, #0ea5e9), var(--primary-color-dark, #006052));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      font-weight: var(--font-weight-semibold, 600);
    }

    .popup-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    /* Override shared button styles for popup-specific layout */
    .popup-actions .btn {
      flex: 1;
      min-width: 140px;
    }

    .popup-actions .btn-dismiss {
      flex-basis: 100%;
    }

    @media (max-width: 640px) {
      dialog.popup-dialog {
        width: calc(100% - 1rem);
        max-height: calc(100dvh - 1rem);
        margin: 0.5rem;
      }

      .popup-header {
        padding: 1.25rem 1.25rem 1.25rem 1.25rem;
      }

      .popup-header h2 {
        font-size: 1.5rem;
      }

      .popup-content {
        padding: 1.25rem;
      }

      .popup-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        min-width: auto;
    
      }

      .popup-close {
        top: 0.5rem;
        right: 0.5rem;
      }
    }
  `]);
const D = "login-benefit-popup";
customElements.get(D) || customElements.define(D, N);
const O = ["oauth-auth-component", "[data-auth-component]"], M = "app-state-provider", V = [
  "account-management-modern-component",
  "account-overview-component",
  "account-overview-context-component"
], W = "app-state-changed", U = 6e3, J = 12, tt = 12e3, et = "twerenbold:auto-filler-data", B = "__twerenboldAutoFiller", A = 3, Z = 2500, rt = [408, 429, 500, 502, 503, 504], R = 5e3, it = "twerenbold:auto-filler:profile", ot = "v1", F = "twerenbold:login-benefit-popup:shown-at", st = 10080 * 60 * 1e3, nt = 1800 * 1e3, at = 1e3, X = class X extends E {
  // Iframe: persistent channel to parent
  constructor() {
    super(), this.clientId = "", this.authority = "", this.nameSelectors = "", this.firstNameSelectors = "", this.lastNameSelectors = "", this.emailSelectors = "", this.streetSelectors = "", this.citySelectors = "", this.zipSelectors = "", this.countrySelectors = "", this.phoneSelectors = "", this.phoneMobileSelectors = "", this.phoneLandlineSelectors = "", this.phoneSource = "auto", this.phoneLeadingZeroMode = "auto", this.salutationSelectors = "", this.genderSelectors = "", this.birthdateSelectors = "", this.birthdateDaySelectors = "", this.birthdateMonthSelectors = "", this.birthdateYearSelectors = "", this.travelerFirstNameSelectors = "", this.travelerLastNameSelectors = "", this.travelerEmailSelectors = "", this.travelerPhoneSelectors = "", this.travelerSalutationSelectors = "", this.travelerGenderSelectors = "", this.travelerBirthdateSelectors = "", this.travelerBirthdateDaySelectors = "", this.travelerBirthdateMonthSelectors = "", this.travelerBirthdateYearSelectors = "", this.travelerStreetSelectors = "", this.travelerCitySelectors = "", this.travelerZipSelectors = "", this.travelerCountrySelectors = "", this.travelerSelectorInsertAfter = "", this.loginPopupAllowedOrigins = "", this.excludeSelectors = "", this.authComponentSelector = O.join(","), this.appStateSelector = M, this.accountComponentSelector = V.join(","), this.profileEndpoint = "", this.knownAuthorities = "", this.redirectUri = "", this.loginScopes = "", this.loadAccountOnInit = !0, this.useMsalFallback = !1, this.theme = "", this.logger = j("AutoFormFiller"), this.msalInstance = null, this.userData = null, this.travelersData = [], this.observer = null, this.debounceTimer = null, this.touchedFields = /* @__PURE__ */ new Set(), this.observedElements = /* @__PURE__ */ new Set(), this._appProvider = null, this._authComponent = null, this._appStateAttempts = 0, this._authLookupAttempts = 0, this._pendingProfileFetch = null, this._accountComponentObserver = null, this._accountComponents = /* @__PURE__ */ new Set(), this._accountComponentPollers = /* @__PURE__ */ new Map(), this._accountComponentSubscriptions = /* @__PURE__ */ new Map(), this._lastBroadcastSignature = "", this._msalScopes = [], this._msalAccessToken = null, this._profileFetchRetries = 0, this._msalProfileFetchRetries = 0, this._authUserSnapshot = null, this._lastHydratedCacheKey = null, this._activeCacheKey = null, this._msalAccount = null, this._msalSharedInstance = !1, this._loginBenefitPopup = null, this._loginBenefitPopupShown = !1, this._fillableFieldsDetected = !1, this._travelerSelectors = /* @__PURE__ */ new Map(), this._activeTravelerSelections = /* @__PURE__ */ new Map(), this._iframePorts = /* @__PURE__ */ new Map(), this._parentChannel = null, this._parentPortTransferred = !1, this._parentResponded = !1, this._cachedSessionKey = null, this._appStateListener = (t) => this._onAppStateEvent(t), this._authChangedHandler = (t) => this._onAuthComponentChanged(t.detail), this._updateGlobalSnapshot({ profile: null, travelers: [], timestamp: Date.now() });
  }
  connectedCallback() {
    super.connectedCallback(), this.loadAccountOnInit = this._normalizeBooleanAttribute("load-account-on-init", this.loadAccountOnInit), this.useMsalFallback = this._normalizeBooleanAttribute("use-msal-fallback", this.useMsalFallback), this.logger.info(`connected: loadAccountOnInit=${this.loadAccountOnInit}, useMsalFallback=${this.useMsalFallback}`), this._setupCrossWindowCommunication(), this._wireAppState(), this._wireAuthComponent(), this._wireAccountComponents(), this._loadProfileFromLocalStorageCache(), setTimeout(() => {
      this.findAndAttachListeners();
    }, 100), this._msalScopes = [], this._msalAccessToken = null, this._isRunningInIframe() ? (this.logger.info("🖼️ running in iframe - MSAL disabled, requesting data from parent"), this._requestDataFromParent(), this._ensureObserver(), this._setupIframeDataPolling()) : (this.logger.info("🏠 running in parent window - will respond to iframe requests"), this.useMsalFallback && this.clientId && this.authority && this.initializeAndAuth().catch((e) => {
      this.logger.warn("MSAL fallback initialization failed", e);
    }), this._setupPeriodicIframeBroadcast());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener(W, this._appStateListener), this._appProvider && (this._appProvider.removeEventListener(W, this._appStateListener), this._appProvider = null), this._authComponent && (this._authComponent.removeEventListener("auth-changed", this._authChangedHandler), this._authComponent = null), this._accountComponentObserver && (this._accountComponentObserver.disconnect(), this._accountComponentObserver = null);
    for (const t of Array.from(this._accountComponents))
      this._detachAccountComponent(t);
    this._accountComponents.clear(), this.observer && (this.observer.disconnect(), this.observer = null), this.debounceTimer && (clearTimeout(this.debounceTimer), this.debounceTimer = null), this._loginBenefitPopup && (this._loginBenefitPopup.remove(), this._loginBenefitPopup = null), this._travelerSelectors.forEach((t) => t.remove()), this._travelerSelectors.clear(), this._activeTravelerSelections.clear();
  }
  _normalizeBooleanAttribute(t, e) {
    if (!this.hasAttribute(t))
      return e;
    const r = this.getAttribute(t);
    if (r === "" || r === null)
      return !0;
    const i = r.trim().toLowerCase();
    return i !== "false" && i !== "0" && i !== "off";
  }
  /**
   * Check if user is authenticated
   */
  _isUserAuthenticated() {
    var t;
    if (this._authComponent && this._authComponent.isAuthenticated || this.userData && Object.keys(this.userData).length > 0 || this._getActiveMsalAccount())
      return !0;
    if (typeof window < "u") {
      const e = window.__twerenboldAppState;
      if ((t = e == null ? void 0 : e.state) != null && t.isAuthenticated)
        return !0;
    }
    return !1;
  }
  /**
   * Check if popup was already shown in this session
   */
  _wasPopupShownThisSession() {
    if (this._loginBenefitPopupShown)
      return !0;
    if (typeof window < "u" && typeof window.localStorage < "u")
      try {
        const t = window.localStorage.getItem(F);
        if (t) {
          const e = Date.now() - parseInt(t, 10), r = this._isRunningInIframe() ? nt : st;
          if (e < r)
            return this._loginBenefitPopupShown = !0, !0;
          window.localStorage.removeItem(F);
        }
      } catch {
      }
    return !1;
  }
  /**
   * Mark popup as shown — persists with interval in localStorage (30 min for iframe, 1 week otherwise)
   */
  _markPopupAsShown() {
    if (this._loginBenefitPopupShown = !0, typeof window < "u" && typeof window.localStorage < "u")
      try {
        window.localStorage.setItem(F, Date.now().toString());
      } catch {
      }
  }
  /**
   * Show login benefit popup if conditions are met
   */
  _maybeShowLoginBenefitPopup() {
    this._isUserAuthenticated() || this._fillableFieldsDetected && (this._wasPopupShownThisSession() || this._isOriginAllowedForLoginPopup() && this._showLoginBenefitPopup());
  }
  /**
   * Check if current origin is allowed to show the login popup
   * If no origins are configured, popup is NOT shown (opt-in behavior)
   * @returns {boolean}
   */
  _isOriginAllowedForLoginPopup() {
    if (!this.loginPopupAllowedOrigins || this.loginPopupAllowedOrigins.trim() === "")
      return this.logger.debug("Login popup not shown - no allowed origins configured"), !1;
    if (typeof window > "u")
      return !1;
    const t = window.location.origin, e = this._parseDelimitedList(this.loginPopupAllowedOrigins);
    if (e.includes(t))
      return !0;
    for (const r of e) {
      let i = null;
      if (r.startsWith("*."))
        i = r.slice(2);
      else
        try {
          const o = new URL(r);
          o.hostname.startsWith("*.") && (i = o.hostname.slice(2));
        } catch {
        }
      if (i) {
        const o = new URL(t).hostname;
        if (o === i || o.endsWith("." + i))
          return !0;
      }
    }
    return this.logger.debug(`Login popup not shown - origin '${t}' not in allowed list`), !1;
  }
  /**
   * Create and display the login benefit popup
   */
  _showLoginBenefitPopup() {
    typeof document > "u" || (this._loginBenefitPopup || (this._loginBenefitPopup = document.createElement("login-benefit-popup"), this.theme && this._loginBenefitPopup.setAttribute("theme", this.theme), this._loginBenefitPopup.addEventListener("login-requested", () => {
      this._handleLoginRequested();
    }), this._loginBenefitPopup.addEventListener("register-requested", () => {
      this._handleRegisterRequested();
    }), this._loginBenefitPopup.addEventListener("popup-dismissed", () => {
      this._markPopupAsShown();
    }), document.body.appendChild(this._loginBenefitPopup)), typeof this._loginBenefitPopup.show == "function" ? (this._loginBenefitPopup.show(), this._markPopupAsShown(), this.logger.info("✅ Login benefit popup shown and marked")) : this.logger.warn("⚠️ Login benefit popup has no show() method, not marking as shown"));
  }
  /**
   * Handle login request from popup
   */
  async _handleLoginRequested() {
    if (this._authComponent && typeof this._authComponent.login == "function") {
      try {
        this._authComponent.login();
      } catch (t) {
        this.logger.warn("Failed to trigger login", t);
      }
      return;
    }
    if (this._authComponent && typeof this._authComponent.signIn == "function") {
      try {
        this._authComponent.signIn();
      } catch (t) {
        this.logger.warn("Failed to trigger signIn", t);
      }
      return;
    }
    if (this.useMsalFallback) {
      this.logger.info("No auth component found, using MSAL fallback for login (redirect to auth page)");
      try {
        await this._triggerMsalLogin();
      } catch (t) {
        this.logger.warn("MSAL fallback login failed", t);
      }
      return;
    }
    this.logger.warn("No authentication method available (no auth component and MSAL fallback disabled)");
  }
  /**
   * Handle register request from popup
   */
  async _handleRegisterRequested() {
    if (this._authComponent && typeof this._authComponent.register == "function") {
      try {
        this._authComponent.register();
      } catch (t) {
        this.logger.warn("Failed to trigger register", t);
      }
      return;
    }
    if (this._authComponent && typeof this._authComponent.signUp == "function") {
      try {
        this._authComponent.signUp();
      } catch (t) {
        this.logger.warn("Failed to trigger signUp", t);
      }
      return;
    }
    if (this.useMsalFallback) {
      this.logger.info("No auth component found, using MSAL fallback for registration (redirect to auth page)");
      try {
        await this._triggerMsalRegister();
      } catch (t) {
        this.logger.warn("MSAL fallback registration failed", t);
      }
      return;
    }
    this.logger.info("Register method not available, falling back to login"), await this._handleLoginRequested();
  }
  _parseDelimitedList(t) {
    return !t || typeof t != "string" ? [] : t.split(/[\s,]+/).map((e) => e.trim()).filter(Boolean);
  }
  _resolveMsalScopes() {
    const t = this._parseDelimitedList(this.loginScopes);
    return t.length ? t : ["User.Read", "openid", "profile"];
  }
  _shouldFetchGraphProfile() {
    return !Array.isArray(this._msalScopes) || this._msalScopes.length === 0 ? !1 : this._msalScopes.some((t) => {
      const e = t.trim().toLowerCase();
      return e === "user.read" || e.startsWith("user.read.") || e === "https://graph.microsoft.com/.default";
    });
  }
  _delay(t) {
    return new Promise((e) => setTimeout(e, t));
  }
  _shouldRetryStatus(t) {
    return rt.includes(t);
  }
  /**
   * Check if running inside an iframe
   */
  _isRunningInIframe() {
    try {
      return typeof window < "u" && window.self !== window.top;
    } catch {
      return !0;
    }
  }
  /**
   * Setup cross-window communication for iframe scenarios
   */
  _setupCrossWindowCommunication() {
    if (typeof window > "u")
      return;
    this.logger.info("🔧 Setting up cross-window communication", {
      isIframe: this._isRunningInIframe(),
      hasUserData: !!this.userData
    });
    const t = (e) => {
      var c, u, h, d, p, b, m, g, C, _;
      const r = (u = (c = e.data) == null ? void 0 : c.type) == null ? void 0 : u.startsWith("twerenbold:");
      (h = e.data) != null && h.type && this.logger.debug("📬 ANY message received", {
        type: (d = e.data) == null ? void 0 : d.type,
        origin: e.origin,
        isAutoFillerMessage: r,
        isIframe: this._isRunningInIframe()
      }), r && this.logger.debug("📩 Received twerenbold message", {
        type: (p = e.data) == null ? void 0 : p.type,
        origin: e.origin,
        isIframe: this._isRunningInIframe(),
        hasProfile: !!((b = e.data) != null && b.profile),
        hasTravelers: Array.isArray((m = e.data) == null ? void 0 : m.travelers) && e.data.travelers.length > 0
      });
      const i = e.origin || "", o = i === "null" || i === "", s = ((g = e.data) == null ? void 0 : g.type) && (e.data.type === "twerenbold:auto-filler-data" || e.data.type === "twerenbold:request-auto-filler-data" || e.data.type === "twerenbold:msal-account" || e.data.type === "twerenbold:navigate" || e.data.type === "twerenbold:request-login" || e.data.type === "twerenbold:request-register" || e.data.type === "twerenbold:request-login-popup" || e.data.type === "twerenbold:login-popup-shown"), a = this._getReferrerOrigin();
      if (!(o && s && v(a)) && !v(e.origin)) {
        r && this.logger.warn("🚫 Rejected message from untrusted origin:", e.origin);
        return;
      }
      const n = e.data;
      if ((n == null ? void 0 : n.type) === "twerenbold:request-auto-filler-data") {
        if (!this._isRunningInIframe()) {
          this.logger.debug("📨 (parent) received data request from iframe", {
            iframeOrigin: n.iframeOrigin,
            hasUserData: !!this.userData,
            hasTravelersData: Array.isArray(this.travelersData) && this.travelersData.length > 0,
            hasPort: !!(e.ports && e.ports.length > 0)
          });
          const y = {
            type: "twerenbold:auto-filler-data",
            profile: this.userData ? this._cloneData(this.userData) : null,
            travelers: Array.isArray(this.travelersData) ? this.travelersData.map((f) => this._cloneData(f)) : [],
            timestamp: Date.now()
          };
          if (e.ports && e.ports.length > 0)
            try {
              const f = e.ports[0];
              f.postMessage(y);
              const I = n.iframeOrigin || e.origin || "unknown";
              this._iframePorts.set(I, f), f.onmessage = (L) => {
                this._handlePortMessageFromIframe(L.data, f);
              }, this.logger.debug("📤 (parent) sent data to iframe via MessageChannel port", { iframeKey: I });
            } catch (f) {
              this.logger.warn("⚠️ Failed to send via MessageChannel port", f);
            }
          if (e.source && typeof e.source.postMessage == "function")
            try {
              const f = this._getTrustedTargetOrigin(e, n);
              f ? (e.source.postMessage(y, f), this.logger.debug("📤 (parent) sent data to iframe via event.source", { targetOrigin: f })) : this.logger.debug("🚫 (parent) skipped event.source response — no trusted target origin available; iframe will retry via MessageChannel");
            } catch (f) {
              this.logger.debug("⚠️ Failed to send to iframe via event.source", f);
            }
          this._broadcastToChildIframes(y);
        }
        return;
      }
      if ((n == null ? void 0 : n.type) === "twerenbold:auto-filler-data" && this._isRunningInIframe() && (this.logger.info("📨 (iframe) received data from parent via postMessage"), this._handleParentData(n)), (n == null ? void 0 : n.type) === "twerenbold:msal-account" && this._isRunningInIframe() && (this.logger.debug("📨 (iframe) received MSAL account from parent"), n.account)) {
        const y = this._extractDataFromAuthUser(n.account);
        y && this._mergeUserData(y);
      }
      if ((n == null ? void 0 : n.type) === "twerenbold:navigate" && !this._isRunningInIframe() && n.url && (this.logger.debug("📨 (parent) received navigate request from iframe:", n.url), window.location.href = n.url), (n == null ? void 0 : n.type) === "twerenbold:request-login" && !this._isRunningInIframe()) {
        this.logger.debug("📨 (parent) received login request from iframe");
        const y = n.authPageUrl || this.authPageUrl || "/account", f = window.location.href;
        try {
          window.sessionStorage.setItem("twerenbold:login-return-url", f);
        } catch (P) {
          this.logger.warn("Failed to store return URL", P);
        }
        const I = y.includes("?") ? "&" : "?", L = encodeURIComponent(f), w = `${y}${I}autoLogin=true&returnUrl=${L}`;
        this.logger.info("➡️ (parent) redirecting to login:", w), window.location.href = w;
      }
      if ((n == null ? void 0 : n.type) === "twerenbold:request-login-popup" && !this._isRunningInIframe()) {
        this.logger.info("📨 (parent) received login-popup request from iframe"), this._fillableFieldsDetected = !0;
        const y = {
          hasAuthComponent: !!this._authComponent,
          authComponentAuthenticated: !!(this._authComponent && this._authComponent.isAuthenticated),
          hasUserData: !!(this.userData && Object.keys(this.userData).length > 0),
          hasMsalAccount: !!this._getActiveMsalAccount(),
          hasAppStateBridge: !!((_ = (C = window.__twerenboldAppState) == null ? void 0 : C.state) != null && _.isAuthenticated),
          isAuthenticated: this._isUserAuthenticated(),
          popupAlreadyShown: this._wasPopupShownThisSession()
        };
        if (this.logger.info("📋 (parent) popup decision auth state:", y), !this._isUserAuthenticated() && !this._wasPopupShownThisSession() ? (this.logger.info("📢 (parent) showing login benefit popup now"), this._showLoginBenefitPopup()) : this.logger.info("📨 (parent) popup NOT shown:", y), this._loginBenefitPopupShown) {
          const f = {
            type: "twerenbold:login-popup-shown",
            timestamp: Date.now()
          }, I = n.iframeOrigin || e.origin || "unknown", L = this._iframePorts.get(I);
          if (L)
            try {
              L.postMessage(f), this.logger.debug("📤 (parent) sent popup confirmation via stored port");
            } catch (w) {
              this.logger.debug("⚠️ Failed to send confirmation via port", w);
            }
          if (e.source && typeof e.source.postMessage == "function")
            try {
              const w = this._getTrustedTargetOrigin(e, n);
              w ? (e.source.postMessage(f, w), this.logger.debug("📤 (parent) sent popup confirmation via event.source", { targetOrigin: w })) : this.logger.debug("🚫 (parent) skipped event.source confirmation — no trusted target origin");
            } catch (w) {
              this.logger.debug("⚠️ Failed to send confirmation via event.source", w);
            }
        }
      }
      if ((n == null ? void 0 : n.type) === "twerenbold:login-popup-shown" && this._isRunningInIframe() && (this.logger.info("✅ (iframe) received popup confirmation from parent via postMessage — marking as shown"), this._markPopupAsShown()), (n == null ? void 0 : n.type) === "twerenbold:request-register" && !this._isRunningInIframe()) {
        this.logger.debug("📨 (parent) received register request from iframe");
        const y = n.authPageUrl || this.authPageUrl || "/account", f = window.location.href;
        try {
          window.sessionStorage.setItem("twerenbold:login-return-url", f);
        } catch (P) {
          this.logger.warn("Failed to store return URL", P);
        }
        const I = y.includes("?") ? "&" : "?", L = encodeURIComponent(f), w = `${y}${I}autoRegister=true&returnUrl=${L}`;
        this.logger.info("➡️ (parent) redirecting to register:", w), window.location.href = w;
      }
    };
    window.addEventListener("message", t);
  }
  /**
   * Request data from parent window.
   * Uses MessageChannel for reliable bidirectional communication that cannot
   * be blocked by third-party scripts calling stopImmediatePropagation().
   */
  _requestDataFromParent() {
    if (!(typeof window > "u" || !window.parent || window.parent === window))
      try {
        const t = this._getParentOrigin();
        if (t && !v(t)) {
          this.logger.warn("🚫 Refusing to request data from untrusted parent", t);
          return;
        }
        const e = t || "*", r = {
          type: "twerenbold:request-auto-filler-data",
          source: "auto-form-filler-iframe",
          iframeOrigin: window.location.origin,
          timestamp: Date.now()
        };
        if (this._parentChannel && this._parentPortTransferred)
          try {
            this._parentChannel.port1.postMessage(r), this.logger.debug("📤 (iframe) re-requested data via existing MessageChannel port");
            try {
              window.parent.postMessage(r, e);
            } catch {
            }
            return;
          } catch (i) {
            this.logger.debug("Existing port failed, creating new channel", i), this._parentChannel = null, this._parentPortTransferred = !1;
          }
        this._parentChannel || (this._parentChannel = new MessageChannel(), this._parentChannel.port1.onmessage = (i) => {
          this.logger.info("📨 (iframe) received data via MessageChannel port"), this._handleParentData(i.data);
        });
        try {
          r._hasPort = !0, window.parent.postMessage(r, e, [this._parentChannel.port2]), this._parentPortTransferred = !0, this.logger.debug("📤 (iframe) requested data from parent window", { withPort: !0, targetOrigin: e });
        } catch (i) {
          this.logger.debug("Port transfer failed, sending without port", i), this._parentChannel = null, this._parentPortTransferred = !1, window.parent.postMessage(r, e), this.logger.debug("📤 (iframe) requested data without port (fallback)");
        }
        if (window.top && window.top !== window.parent)
          try {
            window.top.postMessage(r, e), this.logger.debug("📤 (iframe) also requested data from top window");
          } catch {
          }
      } catch (t) {
        this.logger.warn("⚠️ Failed to request data from parent", t);
      }
  }
  /**
   * Handle data received from parent (shared handler for both postMessage and MessageChannel)
   */
  _handleParentData(t) {
    if (!t) return;
    if (t.type === "twerenbold:login-popup-shown") {
      this.logger.info("✅ (iframe) received popup confirmation from parent — marking as shown"), this._markPopupAsShown();
      return;
    }
    t.type === "twerenbold:auto-filler-data" && (this._parentResponded = !0);
    let e = !1;
    if (t.profile && (this._mergeUserData(t.profile), e = !0), Array.isArray(t.travelers) && t.travelers.length) {
      const r = this._normalizeTravelerRecords(t.travelers);
      this._mergeTravelerData(r), e = !0;
    }
    e && (this.logger.info("✅ (iframe): Data received from parent, populating fields"), this._ensureObserver(), this.findAndAttachListeners(), this.populateFields(), this._showTravelerSelectorsIfNeeded());
  }
  /**
   * Handle messages received from iframe via stored MessageChannel port (parent-side).
   * This handles requests like login popup that the iframe sends via port.
   */
  _handlePortMessageFromIframe(t, e) {
    if (!(!t || !t.type)) {
      if (t.type === "twerenbold:request-auto-filler-data") {
        if (!this._isRunningInIframe()) {
          this.logger.info("📨 (parent) received data request from iframe via MessageChannel port");
          const r = {
            type: "twerenbold:auto-filler-data",
            profile: this.userData ? this._cloneData(this.userData) : null,
            travelers: Array.isArray(this.travelersData) ? this.travelersData.map((i) => this._cloneData(i)) : [],
            timestamp: Date.now()
          };
          try {
            e.postMessage(r), this.logger.debug("📤 (parent) sent data to iframe via port (re-request)");
          } catch (i) {
            this.logger.warn("⚠️ Failed to send data via port", i);
          }
        }
        return;
      }
      if (t.type === "twerenbold:request-login-popup" && !this._isRunningInIframe() && (this.logger.info("📨 (parent) received login-popup request from iframe via MessageChannel port"), this._fillableFieldsDetected = !0, !this._isUserAuthenticated() && !this._wasPopupShownThisSession() ? (this.logger.info("📢 (parent) showing login benefit popup now (via port)"), this._showLoginBenefitPopup()) : this.logger.info("📨 (parent) popup NOT shown (via port):", {
        authenticated: this._isUserAuthenticated(),
        popupAlreadyShown: this._wasPopupShownThisSession()
      }), this._loginBenefitPopupShown))
        try {
          e.postMessage({
            type: "twerenbold:login-popup-shown",
            timestamp: Date.now()
          }), this.logger.debug("📤 (parent) sent popup confirmation via MessageChannel port");
        } catch (r) {
          this.logger.debug("⚠️ Failed to send popup confirmation via port", r);
        }
    }
  }
  /**
   * Ask the parent window to show the login benefit popup.
   * Used when the iframe detects fillable fields but the user is not authenticated.
   * The parent owns the auth infrastructure and can display the popup properly.
   */
  _requestLoginPopupFromParent() {
    if (!(typeof window > "u" || !window.parent || window.parent === window)) {
      if (this._isUserAuthenticated()) {
        this.logger.debug("🔒 (iframe) not requesting popup - user is authenticated");
        return;
      }
      if (this._wasPopupShownThisSession()) {
        this.logger.debug("🔒 (iframe) not requesting popup - already shown this session");
        return;
      }
      if (!this._isOriginAllowedForLoginPopup()) {
        this.logger.debug("🔒 (iframe) not requesting popup - origin not allowed or no origins configured");
        return;
      }
      try {
        const t = this._getParentOrigin();
        if (t && !v(t)) {
          this.logger.warn("🚫 Refusing to request login popup from untrusted parent", t);
          return;
        }
        const e = t || "*", r = {
          type: "twerenbold:request-login-popup",
          source: "auto-form-filler-iframe",
          iframeOrigin: window.location.origin,
          timestamp: Date.now()
        };
        let i = !1;
        if (this._parentChannel && this._parentChannel.port1)
          try {
            this._parentChannel.port1.postMessage(r), i = !0, this.logger.debug("📤 (iframe) requested login popup via MessageChannel port");
          } catch (o) {
            this.logger.debug("⚠️ Failed to send popup request via port", o);
          }
        window.parent.postMessage(r, e), this.logger.info("📤 (iframe) requested login popup from parent window", { sentViaPort: i });
      } catch (t) {
        this.logger.warn("⚠️ Failed to request login popup from parent", t);
      }
    }
  }
  _getReferrerOrigin() {
    if (typeof document > "u") return "";
    try {
      return document.referrer ? new URL(document.referrer).origin : "";
    } catch (t) {
      return this.logger.warn("⚠️ Failed to parse document.referrer", t), "";
    }
  }
  /**
   * Get the actual parent window origin for postMessage targetOrigin.
   * document.referrer is unreliable after iframe-internal navigation (SPA)
   * because it then points to the previous iframe page, not the parent.
   * ancestorOrigins[0] is the correct parent origin (Chrome/Safari/Edge).
   */
  _getParentOrigin() {
    var t;
    return typeof window < "u" && ((t = window.location.ancestorOrigins) == null ? void 0 : t.length) > 0 ? window.location.ancestorOrigins[0] : this._getReferrerOrigin();
  }
  _getTrustedTargetOrigin(t, e) {
    const r = (t == null ? void 0 : t.origin) || "";
    if (v(r)) return r;
    const i = typeof (e == null ? void 0 : e.iframeOrigin) == "string" ? e.iframeOrigin : "";
    if (v(i)) return i;
    const o = this._getReferrerOrigin();
    return v(o) ? o : "";
  }
  /**
   * Setup polling for iframe scenarios where fields are created dynamically
   * This ensures data is re-requested and fields are populated when they become available
   */
  _setupIframeDataPolling() {
    if (!this._isRunningInIframe())
      return;
    let t = 0;
    const e = 15, r = 20, i = 1e3, o = 1e3;
    let s = 0;
    const a = () => {
      if (t++, this.userData && Object.keys(this.userData).length > 0 || Array.isArray(this.travelersData) && this.travelersData.length > 0)
        this.findAndAttachListeners(), this.populateFields(), this._showTravelerSelectorsIfNeeded(), this.logger.debug(`(iframe): Poll #${t} - re-populated fields with existing data`), t < r ? setTimeout(a, i) : this.logger.debug("(iframe): Stopped polling - relying on MutationObserver now");
      else {
        if (this._parentResponded) {
          this.logger.info("(iframe): Parent responded with no data (not authenticated), stopped polling");
          return;
        }
        if (this._fillableFieldsDetected && !this._isUserAuthenticated() && !this._wasPopupShownThisSession()) {
          const n = Date.now();
          n - s >= o && (this._requestLoginPopupFromParent(), s = n);
        }
        this._requestDataFromParent(), this.logger.debug(`(iframe): Poll #${t} - no data yet, re-requested from parent`), t < e ? setTimeout(a, i) : this.logger.debug("(iframe): Stopped polling after max attempts without data");
      }
    };
    setTimeout(a, i);
  }
  /**
   * Load profile data from localStorage cache (same format as HeaderAccountMenu/API Service uses)
   * Cache key format: live_accountProfile_<userId> or demo_accountProfile_<userId>
   */
  _loadProfileFromLocalStorageCache() {
    if (!(typeof window > "u" || typeof localStorage > "u"))
      try {
        for (let e = 0; e < localStorage.length; e++) {
          const r = localStorage.key(e);
          if (!r || !r.includes("_accountProfile_"))
            continue;
          const i = localStorage.getItem(r);
          if (i)
            try {
              const o = JSON.parse(i), s = Date.now() - (o.timestamp || 0);
              if (s > 3e5) {
                this.logger.debug(`Skipping expired cache: ${r} (age: ${Math.round(s / 1e3)}s)`);
                continue;
              }
              const a = o.data;
              if (!a || typeof a != "object")
                continue;
              this.logger.info(`✅ Loaded profile from localStorage cache: ${r}`, {
                age: Math.round(s / 1e3) + "s",
                firstName: a.firstName,
                lastName: a.lastName,
                email: a.email
              });
              const l = this._transformProfilePayload(a);
              if (l && this._mergeUserData(l), Array.isArray(a.travelers) && a.travelers.length > 0) {
                const n = this._normalizeTravelerRecords(a.travelers);
                n.length > 0 && this._mergeTravelerData(n);
              }
              return;
            } catch (o) {
              this.logger.debug(`Failed to parse cache entry: ${r}`, o);
            }
        }
        this.logger.debug("No valid profile cache found in localStorage");
      } catch (t) {
        this.logger.warn("Failed to load profile from localStorage cache", t);
      }
  }
  _setAuthUserSnapshot(t) {
    if (!t || typeof t != "object") {
      this._authUserSnapshot = null;
      return;
    }
    try {
      this._authUserSnapshot = this._cloneData(t);
    } catch {
      this._authUserSnapshot = t;
    }
    this._cachedSessionKey = null, this._persistExistingDataToCache();
  }
  _resolveAuthUser() {
    var e, r, i;
    if (this._authUserSnapshot && typeof this._authUserSnapshot == "object")
      return this._authUserSnapshot;
    const t = this._authComponent && typeof this._authComponent == "object" && this._authComponent.user || ((e = this._authComponent) == null ? void 0 : e.currentUser) || ((i = (r = this._authComponent) == null ? void 0 : r.state) == null ? void 0 : i.user);
    return t && typeof t == "object" ? t : null;
  }
  _getActiveMsalAccount() {
    if (this._msalAccount && typeof this._msalAccount == "object")
      return this._msalAccount;
    if (this.msalInstance && typeof this.msalInstance.getActiveAccount == "function") {
      const t = this.msalInstance.getActiveAccount();
      if (t)
        return t;
    }
    if (this.msalInstance && typeof this.msalInstance.getAllAccounts == "function") {
      const t = this.msalInstance.getAllAccounts();
      if (Array.isArray(t) && t.length)
        return t[0];
    }
    return null;
  }
  _getIdentitySignature() {
    const t = [];
    this.authority && t.push(`auth:${this.authority}`), this.clientId && t.push(`cid:${this.clientId}`);
    const e = this._resolveAuthUser(), r = (e == null ? void 0 : e.homeAccountId) || (e == null ? void 0 : e.localAccountId) || (e == null ? void 0 : e.oid) || (e == null ? void 0 : e.sub) || (e == null ? void 0 : e.id) || (e == null ? void 0 : e.username) || (e == null ? void 0 : e.email) || (e == null ? void 0 : e.preferred_username);
    r && t.push(`user:${r}`);
    const i = (e == null ? void 0 : e.tid) || (e == null ? void 0 : e.tenantId);
    i && t.push(`tenant:${i}`);
    const o = this._getActiveMsalAccount(), s = (o == null ? void 0 : o.homeAccountId) || (o == null ? void 0 : o.localAccountId) || (o == null ? void 0 : o.username) || (o == null ? void 0 : o.name);
    return s && t.push(`msal:${s}`), t.length ? t.join("|") : null;
  }
  _getSessionCacheKey() {
    if (typeof window > "u" || typeof window.sessionStorage > "u")
      return null;
    if (this._cachedSessionKey) return this._cachedSessionKey;
    const t = this._getIdentitySignature();
    return t ? (this._cachedSessionKey = `${it}:${ot}:${t}`, this._cachedSessionKey) : null;
  }
  _hydrateDataFromCache() {
    const t = this._getSessionCacheKey();
    if (!t || t === this._lastHydratedCacheKey || typeof window > "u" || typeof window.sessionStorage > "u")
      return;
    let e = null;
    try {
      e = window.sessionStorage.getItem(t);
    } catch (s) {
      this.logger.warn("failed to access sessionStorage cache", s);
      return;
    }
    if (!e)
      return;
    let r;
    try {
      r = JSON.parse(e);
    } catch (s) {
      this.logger.warn("invalid session cache payload", s);
      return;
    }
    const i = r != null && r.profile && typeof r.profile == "object" ? this._cloneData(r.profile) : null, o = Array.isArray(r == null ? void 0 : r.travelers) ? r.travelers.map((s) => this._cloneData(s)) : [];
    !i && o.length === 0 || (this.userData = i, this.travelersData = o, this._activeCacheKey = t, this._lastHydratedCacheKey = t, this._ensureObserver(), this.findAndAttachListeners(), this.populateFields(), this._broadcastDataUpdate());
  }
  _persistProfileCache(t) {
    if (typeof window > "u" || typeof window.sessionStorage > "u")
      return;
    const e = this._getSessionCacheKey();
    if (e) {
      this._activeCacheKey && this._activeCacheKey !== e && this._removeSessionCache(this._activeCacheKey);
      try {
        window.sessionStorage.setItem(e, JSON.stringify(t)), this._activeCacheKey = e;
      } catch (r) {
        this.logger.warn("failed to persist profile cache", r);
      }
    }
  }
  _persistExistingDataToCache() {
    const t = this.userData && typeof this.userData == "object", e = Array.isArray(this.travelersData) && this.travelersData.length > 0;
    if (!t && !e)
      return;
    const r = {
      profile: t ? this._cloneData(this.userData) : null,
      travelers: e ? this.travelersData.map((i) => this._cloneData(i)) : [],
      timestamp: Date.now()
    };
    this._persistProfileCache(r);
  }
  _removeSessionCache(t) {
    if (!(!t || typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        window.sessionStorage.removeItem(t);
      } catch (e) {
        this.logger.warn("failed to clear session cache", e);
      }
  }
  _clearProfileCache() {
    if (this._activeCacheKey)
      this._removeSessionCache(this._activeCacheKey);
    else {
      const t = this._getSessionCacheKey();
      t && this._removeSessionCache(t);
    }
    this._activeCacheKey = null, this._lastHydratedCacheKey = null;
  }
  _wireAppState() {
    typeof document > "u" || (document.addEventListener(W, this._appStateListener), this._connectAppStateProvider());
  }
  _connectAppStateProvider() {
    if (typeof document > "u")
      return;
    const t = this.appStateSelector || M;
    let e = null;
    try {
      e = document.querySelector(t);
    } catch (r) {
      this.logger.warn("invalid app-state selector", t, r);
      return;
    }
    if (e) {
      this._attachAppStateProvider(e);
      return;
    }
    this._appStateAttempts < J && (this._appStateAttempts += 1, setTimeout(() => this._connectAppStateProvider(), U));
  }
  _attachAppStateProvider(t) {
    if (!t)
      return;
    if (this._appProvider === t) {
      const r = t.state || t.appState;
      r && this._handleAppStateUpdate(r);
      return;
    }
    this._appProvider && typeof this._appProvider.removeEventListener == "function" && this._appProvider.removeEventListener(W, this._appStateListener), this._appProvider = t, this._appStateAttempts = 0, typeof t.addEventListener == "function" && t.addEventListener(W, this._appStateListener);
    const e = t.state || t.appState;
    e && this._handleAppStateUpdate(e);
  }
  async _invokeProviderAction(t) {
    if (!this._appProvider)
      return;
    const e = [
      this._appProvider.appActions,
      this._appProvider.actions,
      this._appProvider._actions,
      this._appProvider
    ];
    for (const r of e) {
      if (!r)
        continue;
      const i = r[t];
      if (typeof i == "function") {
        try {
          const o = i.call(this._appProvider);
          o && typeof o.then == "function" && await o;
        } catch (o) {
          this.logger.warn(`provider action ${t} failed`, o);
        }
        return;
      }
    }
  }
  _onAppStateEvent(t) {
    var r;
    this.logger.debug("App state event received", t == null ? void 0 : t.detail);
    const e = ((r = t == null ? void 0 : t.detail) == null ? void 0 : r.newState) || (t == null ? void 0 : t.detail);
    !e || typeof e != "object" || this._handleAppStateUpdate(e);
  }
  _handleAppStateUpdate(t) {
    const e = this._deriveDataFromAppState(t);
    e && (e.profile && this._mergeUserData(e.profile), Array.isArray(e.travelers) && e.travelers.length && this._mergeTravelerData(e.travelers));
  }
  _deriveDataFromAppState(t) {
    var m;
    if (!t || typeof t != "object")
      return null;
    const e = {};
    this.logger.debug("Deriving data from state", { hasAuthUser: !!t.authUser, hasProfile: !!t.accountProfile });
    const r = t.authUser || {}, i = t.accountProfile || {}, o = i.personalData || i.personal || i, s = i.contact || i.contactInformation || i, a = i.address || s.address || i.primaryAddress || ((m = i.contactInformation) == null ? void 0 : m.address), l = a && typeof a == "object" ? a : i;
    l.zip || l.zipCode || l.postalCode, (r.name || r.displayName) && (e.name = r.name || r.displayName), (r.givenName || r.firstName) && (e.firstName = r.givenName || r.firstName), (r.surname || r.lastName) && (e.lastName = r.surname || r.lastName), (r.email || r.username || r.userPrincipalName) && (e.email = r.email || r.username || r.userPrincipalName), o.firstName && (e.firstName = o.firstName), o.lastName && (e.lastName = o.lastName), o.salutation && (e.salutation = o.salutation), o.dateOfBirth && (e.birthDate = o.dateOfBirth), s.email && (e.email = s.email);
    const n = this._selectPhoneFromSources(s, i), c = this._selectMobilePhoneFromSources(s, i), u = this._selectLandlinePhoneFromSources(s, i);
    n && (e.phone = n), c && (e.phoneMobile = c), u && (e.phoneLandline = u);
    const h = this._compactObject({
      street: l.street || l.street1 || l.addressLine1 || l.line1,
      city: l.city || l.town || l.locality,
      postalCode: l.zipCode || l.postalCode || l.zip,
      country: l.country || l.countryCode || l.countryRegion
    });
    if (h && Object.keys(h).length > 0 && (e.address = h), !e.name) {
      const g = this._getFullNameFromData({
        firstName: e.firstName,
        lastName: e.lastName
      });
      g && (e.name = g);
    }
    const d = this._compactObject(e), p = Array.isArray(t.accountTravelers) ? this._normalizeTravelerRecords(t.accountTravelers) : [];
    if (!d && p.length === 0)
      return null;
    const b = {};
    return d && Object.keys(d).length > 0 && (b.profile = d), p.length > 0 && (b.travelers = p), Object.keys(b).length > 0 ? b : null;
  }
  _wireAuthComponent() {
    typeof document > "u" || this._resolveAuthComponent();
  }
  _wireAccountComponents() {
    typeof document > "u" || (this._resolveAccountComponents(), !this._accountComponentObserver && typeof MutationObserver < "u" && (this._accountComponentObserver = new MutationObserver(() => {
      this._resolveAccountComponents();
    }), this._accountComponentObserver.observe(document.body, {
      childList: !0,
      subtree: !0
    })));
  }
  _resolveAuthComponent() {
    if (typeof document > "u")
      return;
    const t = (this.authComponentSelector || "").split(",").map((r) => r.trim()).filter(Boolean), e = t.length ? t : O;
    for (const r of e) {
      const i = document.querySelector(r);
      if (i) {
        this._attachAuthComponent(i);
        return;
      }
    }
    this._authLookupAttempts < J && (this._authLookupAttempts += 1, setTimeout(() => this._resolveAuthComponent(), U));
  }
  _resolveAccountComponents() {
    if (typeof document > "u")
      return;
    const t = (this.accountComponentSelector || "").split(",").map((i) => i.trim()).filter(Boolean), e = t.length ? t : V, r = /* @__PURE__ */ new Set();
    for (const i of e) {
      let o = [];
      try {
        o = document.querySelectorAll(i);
      } catch (s) {
        this.logger.warn("invalid account selector", i, s);
        continue;
      }
      o.forEach((s) => {
        s instanceof HTMLElement && (r.add(s), this._accountComponents.has(s) ? this._syncDataFromAccountComponent(s) : this._attachAccountComponent(s));
      });
    }
    for (const i of Array.from(this._accountComponents))
      (!r.has(i) || typeof document < "u" && !document.contains(i)) && this._detachAccountComponent(i);
  }
  _attachAuthComponent(t) {
    if (t) {
      if (this._authComponent === t) {
        t.isAuthenticated && (this._setAuthUserSnapshot(t.user), this._hydrateDataFromCache(), this._mergeUserData(this._extractDataFromAuthUser(t.user)));
        return;
      }
      this._authComponent && this._authComponent.removeEventListener("auth-changed", this._authChangedHandler), this._authComponent = t, t.addEventListener("auth-changed", this._authChangedHandler), t.isAuthenticated ? (this._setAuthUserSnapshot(t.user), this._hydrateDataFromCache(), this._mergeUserData(this._extractDataFromAuthUser(t.user)), this._maybeFetchProfileFromAuth()) : this._setAuthUserSnapshot(null);
    }
  }
  _onAuthComponentChanged(t = {}) {
    !t || typeof t != "object" || (t.isAuthenticated ? (this._setAuthUserSnapshot(t.user), this._hydrateDataFromCache(), this._mergeUserData(this._extractDataFromAuthUser(t.user)), this._maybeFetchProfileFromAuth(), this._checkAndHandlePostLoginRedirect()) : (this._setAuthUserSnapshot(null), this._clearUserData()));
  }
  /**
   * Check for stored return URL and reload page if found
   */
  _checkAndHandlePostLoginRedirect() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        const t = window.sessionStorage.getItem("twerenbold:login-return-url");
        t && (this.logger.info("Found return URL after login, reloading page:", t), window.sessionStorage.removeItem("twerenbold:login-return-url"), t !== window.location.href ? window.location.href = t : window.location.reload());
      } catch (t) {
        this.logger.warn("Failed to check post-login redirect", t);
      }
  }
  _attachAccountComponent(t) {
    if (!t)
      return;
    this._accountComponents.add(t), this._syncDataFromAccountComponent(t);
    const e = () => this._syncDataFromAccountComponent(t), r = [
      "account-profile-updated",
      "account-data-updated",
      "profile-updated",
      "travelers-updated",
      "account-saved"
    ], i = [];
    if (typeof t.addEventListener == "function")
      for (const o of r)
        try {
          t.addEventListener(o, e), i.push(o);
        } catch {
        }
    if (this._accountComponentSubscriptions.set(t, {
      events: i,
      handler: e
    }), typeof window < "u") {
      const o = window.setInterval(() => {
        if (typeof document < "u" && !document.contains(t)) {
          this._detachAccountComponent(t);
          return;
        }
        this._syncDataFromAccountComponent(t);
      }, tt);
      this._accountComponentPollers.set(t, o);
    }
  }
  _detachAccountComponent(t) {
    if (!t || !this._accountComponents.has(t))
      return;
    const e = this._accountComponentPollers.get(t);
    e && (clearInterval(e), this._accountComponentPollers.delete(t));
    const r = this._accountComponentSubscriptions.get(t);
    if (r) {
      const { events: i, handler: o } = r;
      if (typeof t.removeEventListener == "function")
        for (const s of i)
          try {
            t.removeEventListener(s, o);
          } catch {
          }
      this._accountComponentSubscriptions.delete(t);
    }
    this._accountComponents.delete(t);
  }
  _syncDataFromAccountComponent(t) {
    if (!t)
      return;
    const e = this._extractDataFromAccountComponent(t);
    e && (e.profile && this._mergeUserData(e.profile), Array.isArray(e.travelers) && e.travelers.length && this._mergeTravelerData(e.travelers));
  }
  _extractDataFromAccountComponent(t) {
    var a, l, n, c, u;
    if (!t || typeof t != "object")
      return null;
    const e = [
      t.profile,
      t.accountProfile,
      (a = t.account) == null ? void 0 : a.profile,
      (l = t.appState) == null ? void 0 : l.accountProfile,
      (n = t.state) == null ? void 0 : n.accountProfile
    ];
    let r = null;
    for (const h of e)
      if (h && typeof h == "object") {
        r = this._cloneData(h);
        break;
      }
    const i = {};
    if (r) {
      let h = this._transformProfilePayload(r);
      if (!h) {
        const d = r.personalData || r.personal || r, p = r.contact || r.contactInformation || r, b = r.address || p.address, m = b && typeof b == "object" ? b : r;
        h = this._compactObject({
          name: r.displayName || r.name,
          firstName: d.firstName || r.firstName,
          lastName: d.lastName || r.lastName,
          salutation: d.salutation || r.salutation,
          birthDate: d.dateOfBirth || r.dateOfBirth,
          email: p.email || r.email,
          phone: this._selectPhoneFromSources(p, r),
          phoneMobile: this._selectMobilePhoneFromSources(p, r),
          phoneLandline: this._selectLandlinePhoneFromSources(p, r),
          address: this._compactObject({
            street: m.street || m.street1,
            city: m.city,
            postalCode: m.postalCode || m.zip || m.zipCode,
            country: m.country || m.countryCode
          })
        });
      }
      h && (i.profile = h);
    }
    const o = [
      t.travelers,
      t.accountTravelers,
      (c = t.account) == null ? void 0 : c.travelers,
      (u = t.appState) == null ? void 0 : u.accountTravelers,
      r == null ? void 0 : r.travelers
    ];
    let s = null;
    for (const h of o)
      if (Array.isArray(h) && h.length) {
        s = h;
        break;
      }
    if (s) {
      const h = this._normalizeTravelerRecords(s);
      h.length && (i.travelers = h);
    }
    return Object.keys(i).length ? i : null;
  }
  _normalizeTravelerRecords(t) {
    return Array.isArray(t) ? t.map((e) => this._transformTravelerRecord(e)).filter((e) => e && Object.keys(e).length > 0) : [];
  }
  _transformTravelerRecord(t) {
    if (!t || typeof t != "object")
      return null;
    const e = t.personalData || t.personal || t, r = t.contact || t, i = t.address || r.address, o = i && typeof i == "object" ? i : t;
    return this._compactObject({
      id: t.id || t.travelerId || t.uuid,
      firstName: e.firstName || t.firstName,
      lastName: e.lastName || t.lastName,
      salutation: e.salutation || t.salutation,
      birthDate: e.dateOfBirth || t.dateOfBirth || t.birthDate,
      email: r.email || t.email,
      phone: this._selectPhoneFromSources(r, t),
      phoneMobile: this._selectMobilePhoneFromSources(r, t),
      phoneLandline: this._selectLandlinePhoneFromSources(r, t),
      address: this._compactObject({
        street: o.street || o.street1 || o.addressLine1,
        city: o.city || o.town || o.locality,
        postalCode: o.postalCode || o.zipCode || o.zip,
        country: o.country || o.countryCode || o.countryRegion
      }),
      // Preserve the API lock flags so populateTravelerFields() can apply
      // readonly to a traveler that's part of an upcoming booking.
      isLocked: t.isLocked === !0,
      lockReason: t.lockReason || null
    });
  }
  _extractDataFromAuthUser(t = {}) {
    if (!t || typeof t != "object")
      return null;
    const e = this._compactObject({
      name: t.name || t.displayName,
      firstName: t.firstName || t.givenName,
      lastName: t.lastName || t.surname,
      email: t.email || t.username || t.userPrincipalName
    });
    return e && Object.keys(e).length > 0 ? e : null;
  }
  _maybeFetchProfileFromAuth(t = !1) {
    return !this.profileEndpoint || !this._authComponent ? null : this._pendingProfileFetch ? this._pendingProfileFetch : (this._profileFetchRetries = 0, this._pendingProfileFetch = this._fetchProfileFromEndpoint(t).finally(() => {
      this._pendingProfileFetch = null;
    }), this._pendingProfileFetch);
  }
  async _fetchProfileFromEndpoint(t = !1, e = 1) {
    if (!this.profileEndpoint || !this._authComponent)
      return null;
    if (e > A)
      return this.logger.warn("profile fetch aborted after maximum auth-component retries"), this._profileFetchRetries = 0, null;
    this._profileFetchRetries = e;
    let r = null, i = !1;
    try {
      if (!t) {
        if (typeof this._authComponent.getCachedAccessToken == "function")
          try {
            r = await this._authComponent.getCachedAccessToken();
          } catch (o) {
            this.logger.debug("no cached token from auth component", o);
          }
        if (!r && typeof this._authComponent.getAccessToken == "function")
          try {
            r = await this._authComponent.getAccessToken();
          } catch (o) {
            this.logger.debug("getAccessToken cache probe failed", o);
          }
        r && (i = !0);
      }
      !r && typeof this._authComponent.getAccessTokenAsync == "function" && (r = await this._authComponent.getAccessTokenAsync(t)), !r && typeof this._authComponent.refreshToken == "function" && (r = await this._authComponent.refreshToken(t));
    } catch (o) {
      this.logger.warn("failed to acquire access token from auth component", o), r = null;
    }
    if (!r)
      return e < A ? (await this._delay(Z * e), this._fetchProfileFromEndpoint(t, e + 1)) : (this._profileFetchRetries = 0, null);
    try {
      !i && e === 1 && !t && await this._delay(R);
      const o = await fetch(this.profileEndpoint, {
        headers: { Authorization: `Bearer ${r}` }
      });
      if (o.status === 401) {
        if (!t && typeof this._authComponent.refreshToken == "function" && e < A) {
          try {
            await this._authComponent.refreshToken(!0);
          } catch (a) {
            this.logger.warn("token refresh via auth component failed", a);
          }
          return await this._delay(Z * e), this._fetchProfileFromEndpoint(!0, e + 1);
        }
        return this.logger.warn("profile endpoint unauthorized after retries, aborting"), this._profileFetchRetries = 0, null;
      }
      if (!o.ok)
        return this._shouldRetryStatus(o.status) && e < A ? (await this._delay(Z * e), this._fetchProfileFromEndpoint(t, e + 1)) : (this.logger.warn("profile endpoint responded with", o.status), this._profileFetchRetries = 0, null);
      const s = await o.json();
      return this._profileFetchRetries = 0, this._processProfilePayload(s);
    } catch (o) {
      return e < A ? (await this._delay(Z * e), this._fetchProfileFromEndpoint(t, e + 1)) : (this.logger.warn("fetching profile endpoint failed", o), this._profileFetchRetries = 0, null);
    }
  }
  _transformProfilePayload(t) {
    var l, n, c;
    if (!t || typeof t != "object")
      return null;
    const e = t.profile || t, r = e.personalData || e.personal || e, i = e.contactInformation || e.contact || e, o = e.address || i.address || t.address || ((l = t.contactInformation) == null ? void 0 : l.address), s = o && typeof o == "object" ? o : e, a = this._compactObject({
      name: e.displayName || t.displayName,
      firstName: r.firstName || e.firstName,
      lastName: r.lastName || e.lastName,
      salutation: r.salutation || e.salutation,
      birthDate: r.dateOfBirth || r.birthDate || e.dateOfBirth,
      email: i.email || e.email,
      phone: this._selectPhoneFromSources(i, e, t),
      phoneMobile: this._selectMobilePhoneFromSources(i, e, t),
      phoneLandline: this._selectLandlinePhoneFromSources(i, e, t),
      address: this._compactObject({
        street: s.street || s.street1 || s.addressLine1 || s.line1,
        city: s.city || s.town || s.locality,
        postalCode: s.zipCode || s.postalCode || s.zip,
        country: s.country || s.countryCode || s.countryRegion
      })
    });
    if (a) {
      const u = {
        firstName: r.isNameLocked === !0,
        lastName: r.isNameLocked === !0,
        birthDate: r.isDateOfBirthLocked === !0,
        email: i.isEmailLocked === !0
      };
      if (u.firstName || u.lastName || u.birthDate || u.email) {
        a._locks = u;
        const h = ((c = (n = e.metadata) == null ? void 0 : n.lockReasons) == null ? void 0 : c.nameChange) || e.lockReason || null;
        h && (a._lockReason = h);
      }
    }
    return a && Object.keys(a).length > 0 ? a : null;
  }
  _processProfilePayload(t) {
    var o;
    if (!t || typeof t != "object")
      return null;
    const e = t.profile || t.accountProfile || t, r = this._transformProfilePayload(e);
    r && this._mergeUserData(r);
    const i = t.travelers || t.accountTravelers || (e == null ? void 0 : e.travelers) || ((o = t.data) == null ? void 0 : o.travelers);
    return Array.isArray(i) && i.length && this._mergeTravelerData(i), r || null;
  }
  async _fetchProfileWithToken(t, e = !1, r = 1) {
    if (!this.profileEndpoint || !t)
      return null;
    if (r > A)
      return this.logger.warn("MSAL fallback profile fetch aborted after maximum retries"), this._msalProfileFetchRetries = 0, null;
    this._msalProfileFetchRetries = r;
    try {
      r === 1 && !e && await this._delay(R);
      const i = await fetch(this.profileEndpoint, {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (i.status === 401) {
        if (!e && this.msalInstance && r < A)
          try {
            const s = this.msalInstance.getActiveAccount() || this.msalInstance.getAllAccounts()[0];
            if (s) {
              const a = this._msalScopes.length ? this._msalScopes : this._resolveMsalScopes(), l = await this.msalInstance.acquireTokenSilent({ scopes: a, account: s, forceRefresh: !0 });
              if (l != null && l.accessToken)
                return this._msalAccessToken = l.accessToken, await this._delay(Z * r + R), this._fetchProfileWithToken(l.accessToken, !0, r + 1);
            }
          } catch (s) {
            this.logger.warn("MSAL token refresh failed", s);
          }
        return this.logger.warn("profile endpoint unauthorized after MSAL retries, aborting"), this._msalProfileFetchRetries = 0, null;
      }
      if (!i.ok)
        return this._shouldRetryStatus(i.status) && r < A ? (await this._delay(Z * r), this._fetchProfileWithToken(t, e, r + 1)) : (this.logger.warn("profile endpoint responded with", i.status), this._msalProfileFetchRetries = 0, null);
      const o = await i.json();
      return this._msalProfileFetchRetries = 0, this._processProfilePayload(o);
    } catch (i) {
      return r < A ? (await this._delay(Z * r), this._fetchProfileWithToken(t, e, r + 1)) : (this.logger.warn("fetching profile via MSAL token failed", i), this._msalProfileFetchRetries = 0, null);
    }
  }
  async initializeAndAuth() {
    if (!this.useMsalFallback || this.msalInstance || !this.clientId || !this.authority)
      return;
    const t = this.redirectUri || window.location.origin, e = this._parseDelimitedList(this.knownAuthorities), r = this._resolveMsalScopes();
    this._msalScopes = r;
    let i = typeof window < "u" ? window.__twrMsal : null;
    const o = typeof window < "u" ? window.__twrMsalPromise : null;
    if (!(i != null && i.instance) && o && typeof o.then == "function")
      try {
        await Promise.race([
          o,
          new Promise((n, c) => setTimeout(() => c(new Error("timeout")), 5e3))
        ]), i = typeof window < "u" ? window.__twrMsal : null;
      } catch (n) {
        this.logger.debug("Shared MSAL: __twrMsalPromise wait timed out or failed, falling back to own bootstrap", n);
      }
    if (i != null && i.instance && i.clientId === this.clientId && i.authority === this.authority) {
      this.logger.info("🔗 Reusing shared MSAL singleton from <oauth-login>", {
        clientId: i.clientId,
        authority: i.authority
      }), this.msalInstance = i.instance, this._msalSharedInstance = !0;
      let n = null;
      try {
        n = this.msalInstance.getActiveAccount() || this.msalInstance.getAllAccounts()[0] || null;
      } catch (c) {
        this.logger.warn("Shared MSAL: getActiveAccount failed", c);
      }
      if (n) {
        try {
          this.msalInstance.setActiveAccount(n);
        } catch {
        }
        this._msalAccount = n, this._hydrateDataFromCache();
        try {
          const c = await this.msalInstance.acquireTokenSilent({ scopes: r, account: n });
          await this._handleMsalResponse(c);
        } catch (c) {
          this.logger.info("Shared MSAL: silent acquisition failed", c);
        }
      }
      return;
    }
    const s = {
      auth: {
        clientId: this.clientId,
        authority: this.authority,
        redirectUri: t,
        ...e.length ? { knownAuthorities: e } : {}
      },
      cache: { cacheLocation: "localStorage" }
    };
    let a;
    try {
      a = (await import("./index-B2bSkN2e.js")).PublicClientApplication;
    } catch (n) {
      this.logger.error("Failed to load MSAL library", n);
      return;
    }
    this.msalInstance = new a(s), this._msalSharedInstance = !1;
    try {
      await this.msalInstance.initialize();
    } catch (n) {
      this.logger.error("MSAL initialize failed", n), this.msalInstance = null;
      return;
    }
    let l = null;
    try {
      const n = await this.msalInstance.handleRedirectPromise();
      n != null && n.account && (this.msalInstance.setActiveAccount(n.account), l = n.account, this._msalAccount = n.account, this._hydrateDataFromCache(), await this._handleMsalResponse(n));
    } catch (n) {
      this.logger.warn("MSAL handleRedirectPromise failed", n);
    }
    if (!l) {
      const n = this.msalInstance.getAllAccounts();
      if (n.length) {
        l = n[0], this.msalInstance.setActiveAccount(l), this._msalAccount = l, this._hydrateDataFromCache();
        try {
          const c = {
            scopes: r,
            account: l
          }, u = await this.msalInstance.acquireTokenSilent(c);
          await this._handleMsalResponse(u);
        } catch (c) {
          this.logger.info("silent MSAL acquisition failed for existing account.", c);
        }
      }
    }
  }
  async _handleMsalResponse(t) {
    if (t != null && t.account && (this._msalAccount = t.account, this._hydrateDataFromCache(), this._persistExistingDataToCache()), !t || !t.accessToken)
      return;
    this._msalAccessToken = t.accessToken, this._msalProfileFetchRetries = 0;
    let e = !1;
    if (this.profileEndpoint && (e = !!await this._fetchProfileWithToken(t.accessToken)), !e && this._shouldFetchGraphProfile()) {
      const r = await this.fetchUserData(t.accessToken);
      r && (this._mergeUserData(r), e = !0);
    }
    if (!e && t.account) {
      const r = this._extractDataFromAuthUser(t.account);
      r && this._mergeUserData(r);
    }
    this._checkAndRedirectToReturnUrl();
  }
  /**
   * Check if there's a stored return URL and redirect to it
   * This is used after successful login to return to the page where the user started
   */
  _checkAndRedirectToReturnUrl() {
    if (!(typeof window > "u" || typeof window.sessionStorage > "u"))
      try {
        const t = window.sessionStorage.getItem("twerenbold:login-return-url");
        t && (this.logger.info("Found return URL after MSAL login, redirecting:", t), window.sessionStorage.removeItem("twerenbold:login-return-url"), setTimeout(() => {
          window.location.href = t;
        }, 500));
      } catch (t) {
        this.logger.warn("Failed to check return URL", t);
      }
  }
  async _acquireTokenFallback(t = !1) {
    if (!this.msalInstance)
      throw new Error("MSAL instance not initialized");
    let e = this.msalInstance.getActiveAccount();
    if (!e) {
      const s = this.msalInstance.getAllAccounts();
      if (!s.length)
        throw new Error("No MSAL account available");
      e = s[0], this.msalInstance.setActiveAccount(e);
    }
    const i = {
      scopes: this._msalScopes.length ? this._msalScopes : this._resolveMsalScopes(),
      account: e,
      forceRefresh: t
    }, o = await this.msalInstance.acquireTokenSilent(i);
    await this._handleMsalResponse(o);
  }
  /**
   * Trigger login via redirect to auth page (used when no auth component is available)
   * The auth page should have an oauth-auth-component that handles the actual MSAL login.
   */
  async _triggerMsalLogin() {
    this.logger.info("🚀 _triggerMsalLogin() called");
    const t = this.authPageUrl || "/account";
    if (this.logger.debug("🎯 Auth page URL:", t), this.logger.debug("✅ useMsalFallback:", this.useMsalFallback), this._isRunningInIframe()) {
      this.logger.info("Running in iframe, requesting parent to handle login"), window.parent.postMessage({
        type: "twerenbold:request-login",
        authPageUrl: t
      }, "*");
      return;
    }
    const e = window.location.href;
    this.logger.debug("🔗 Current URL:", e);
    try {
      window.sessionStorage.setItem("twerenbold:login-return-url", e), this.logger.debug("💾 Stored return URL in sessionStorage");
    } catch (s) {
      this.logger.warn("Failed to store return URL in sessionStorage", s);
    }
    const r = t.includes("?") ? "&" : "?", i = encodeURIComponent(e), o = `${t}${r}autoLogin=true&returnUrl=${i}`;
    this.logger.info("➡️ Redirecting to:", o), window.location.href = o;
  }
  /**
   * @deprecated - No longer used. Kept for reference.
   * Direct MSAL login won't work because redirect URIs must be pre-registered in Azure.
   */
  async _triggerMsalLoginDirect() {
    if (!this.msalInstance) {
      this.logger.warn("Cannot trigger MSAL login - instance not initialized");
      return;
    }
    const e = {
      scopes: this._msalScopes.length ? this._msalScopes : this._resolveMsalScopes(),
      prompt: "login"
    };
    try {
      await this.msalInstance.loginRedirect(e);
    } catch (r) {
      throw this.logger.error("MSAL login failed", r), r;
    }
  }
  /**
   * Trigger registration via redirect to auth page (used when no auth component is available)
   * The auth page should have an oauth-auth-component that handles the actual MSAL register.
   */
  async _triggerMsalRegister() {
    const t = this.authPageUrl || "/account";
    if (this._isRunningInIframe()) {
      this.logger.info("Running in iframe, requesting parent to handle registration"), window.parent.postMessage({
        type: "twerenbold:request-register",
        authPageUrl: t
      }, "*");
      return;
    }
    const e = window.location.href;
    try {
      window.sessionStorage.setItem("twerenbold:login-return-url", e), this.logger.debug("Stored return URL in sessionStorage");
    } catch (s) {
      this.logger.warn("Failed to store return URL in sessionStorage", s);
    }
    const r = t.includes("?") ? "&" : "?", i = encodeURIComponent(e), o = `${t}${r}autoRegister=true&returnUrl=${i}`;
    this.logger.info("Redirecting to auth page for registration:", o), window.location.href = o;
  }
  /**
   * @deprecated - No longer used. Kept for reference.
   * Direct MSAL register won't work because redirect URIs must be pre-registered in Azure.
   */
  async _triggerMsalRegisterDirect() {
    if (!this.msalInstance) {
      this.logger.warn("Cannot trigger MSAL register - instance not initialized");
      return;
    }
    const e = {
      scopes: this._msalScopes.length ? this._msalScopes : this._resolveMsalScopes(),
      prompt: "create"
    };
    try {
      await this.msalInstance.loginRedirect(e);
    } catch (r) {
      throw this.logger.error("MSAL registration failed", r), r;
    }
  }
  async fetchUserData(t) {
    if (!t || !this._shouldFetchGraphProfile())
      return null;
    try {
      const e = await fetch("https://graph.microsoft.com/v1.0/me?$select=displayName,givenName,surname,mail,userPrincipalName,businessPhones", {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (!e.ok)
        return this.logger.warn("Microsoft Graph request failed", e.status), null;
      const r = await e.json();
      return this._compactObject({
        name: r.displayName,
        firstName: r.givenName,
        lastName: r.surname,
        email: r.mail || r.userPrincipalName,
        phone: Array.isArray(r.businessPhones) ? r.businessPhones[0] : void 0
      });
    } catch (e) {
      return this.logger.warn("Graph fetch failed", e), null;
    }
  }
  _ensureObserver() {
    if (typeof document > "u")
      return;
    if (!document.body) {
      setTimeout(() => this._ensureObserver(), 100);
      return;
    }
    const t = () => {
      this.debounceTimer && clearTimeout(this.debounceTimer), this.debounceTimer = setTimeout(() => {
        this.findAndAttachListeners(), this.populateFields(), this._showTravelerSelectorsIfNeeded(), this._resolveAccountComponents();
      }, 150);
    };
    this.observer = new MutationObserver(t), this.observer.observe(document.body, { childList: !0, subtree: !0 });
  }
  findAndAttachListeners() {
    if (typeof document > "u")
      return;
    const t = this._getAllSelectorGroups();
    if (!t.length)
      return;
    let e = !1;
    for (const r of t) {
      if (!r)
        continue;
      let i;
      try {
        i = document.querySelectorAll(r);
      } catch (o) {
        this.logger.warn("invalid selector", r, o);
        continue;
      }
      i.forEach((o) => {
        if (!o || this.observedElements.has(o))
          return;
        e = !0;
        const s = () => {
          this.touchedFields.add(o), o.removeEventListener("input", s), o.removeEventListener("change", s), o.removeEventListener("blur", s);
        };
        o.addEventListener("input", s), o.addEventListener("change", s), o.addEventListener("blur", s), this.observedElements.add(o);
      });
    }
    e && !this._fillableFieldsDetected && (this._fillableFieldsDetected = !0, this._ensureObserver(), setTimeout(() => {
      this._isRunningInIframe() && this._requestLoginPopupFromParent();
    }, at)), this._showTravelerSelectorsIfNeeded();
  }
  populateFields() {
    var c, u, h, d;
    if (!this.userData) {
      this.logger.debug("wrong user data", this.userData);
      return;
    }
    this.logger.debug("Populating fields with data", this.userData), this._ensureObserver();
    const t = this.userData, e = this._selectPhoneFromSources(t), r = this._selectMobilePhoneFromSources(t), i = this._selectLandlinePhoneFromSources(t), o = !!(this.countrySelectors && this.countrySelectors.trim()), s = t && t._locks || {}, a = (t == null ? void 0 : t._lockReason) || "Bevorstehende Buchung — bitte wenden Sie sich an den Kundenservice", n = [
      { selectors: this.firstNameSelectors, value: t.firstName, lock: !!s.firstName, lockReason: a },
      { selectors: this.lastNameSelectors, value: t.lastName, lock: !!s.lastName, lockReason: a },
      { selectors: this.nameSelectors, value: this._getFullNameFromData(t), lock: !!(s.firstName && s.lastName), lockReason: a },
      { selectors: this.emailSelectors, value: t.email, lock: !0, lockReason: "Die E-Mail-Adresse ist der Schlüssel zu Ihrem Kundenkonto und kann hier nicht geändert werden." },
      { selectors: this.phoneSelectors, value: this._normalizePhone(e, { hasCountrySelector: o }) },
      { selectors: this.phoneMobileSelectors, value: this._normalizePhone(r, { hasCountrySelector: o }) },
      { selectors: this.phoneLandlineSelectors, value: this._normalizePhone(i, { hasCountrySelector: o }) },
      { selectors: this.salutationSelectors, value: t.salutation },
      { selectors: this.genderSelectors, value: this._deriveGenderFromSalutation(t.salutation) },
      { selectors: this.birthdateSelectors, value: t.birthDate, lock: !!s.birthDate, lockReason: a },
      { selectors: this.streetSelectors, value: (c = t.address) == null ? void 0 : c.street },
      { selectors: this.citySelectors, value: (u = t.address) == null ? void 0 : u.city },
      { selectors: this.zipSelectors, value: (h = t.address) == null ? void 0 : h.postalCode },
      { selectors: this.countrySelectors, value: (d = t.address) == null ? void 0 : d.country }
    ];
    for (const { selectors: p, value: b, lock: m, lockReason: g } of n)
      this.injectValue(p, b, { lock: !!m, lockReason: g || null });
    t.birthDate && this._populateSplitDate(
      t.birthDate,
      this.birthdateDaySelectors,
      this.birthdateMonthSelectors,
      this.birthdateYearSelectors,
      !1,
      { lock: !!s.birthDate, lockReason: a }
    ), this.populateTravelerFields();
  }
  populateTravelerFields() {
    if (!Array.isArray(this.travelersData) || this.travelersData.length === 0)
      return;
    if (this._detectTravelerFieldGroups().length > 0) {
      this.logger.info("Skipping auto-fill - traveler selectors will be shown");
      return;
    }
    this._ensureObserver();
    const e = !!(this.travelerCountrySelectors && this.travelerCountrySelectors.trim());
    this.travelersData.forEach((r, i) => {
      var l, n, c, u, h, d, p, b, m;
      const o = (r == null ? void 0 : r.isLocked) === !0, s = (r == null ? void 0 : r.lockReason) || "Diese Person ist Teil einer bevorstehenden Buchung — bitte wenden Sie sich an den Kundenservice.", a = [
        { selectors: this.travelerFirstNameSelectors, value: r.firstName },
        { selectors: this.travelerLastNameSelectors, value: r.lastName },
        {
          selectors: this.travelerEmailSelectors,
          value: r.email,
          alwaysLock: !0,
          alwaysLockReason: "Die E-Mail-Adresse ist der Schlüssel zum Kundenkonto und kann hier nicht geändert werden."
        },
        { selectors: this.travelerPhoneSelectors, value: this._normalizePhone(r.phone, { hasCountrySelector: e }) },
        { selectors: this.travelerSalutationSelectors, value: r.salutation },
        { selectors: this.travelerGenderSelectors, value: this._deriveGenderFromSalutation(r.salutation) },
        { selectors: this.travelerBirthdateSelectors, value: r.birthDate },
        { selectors: this.travelerStreetSelectors, value: (l = r.address) == null ? void 0 : l.street },
        { selectors: this.travelerCitySelectors, value: (n = r.address) == null ? void 0 : n.city },
        { selectors: this.travelerZipSelectors, value: (c = r.address) == null ? void 0 : c.postalCode },
        { selectors: this.travelerCountrySelectors, value: ((u = r.address) == null ? void 0 : u.country) || ((d = (h = this.userData) == null ? void 0 : h.address) == null ? void 0 : d.country) }
      ];
      for (const g of a) {
        const { selectors: C, value: _, alwaysLock: y, alwaysLockReason: f } = g;
        if (!C)
          continue;
        const I = C.replace(/\{i\+1\}/g, String(i + 1)).replace(/\{i\}/g, String(i));
        C.includes("genderRadios") && this.logger.debug(`Processing traveler gender for index ${i}`, {
          originalSelector: C,
          indexedSelector: I,
          value: _,
          foundElement: this.shadowRoot ? this.shadowRoot.querySelector(I) : document.querySelector(I)
        });
        const L = y || o, w = y ? f : s;
        this.injectValue(I, _, { lock: L, lockReason: w });
      }
      r.birthDate && this._populateSplitDate(
        r.birthDate,
        (p = this.travelerBirthdateDaySelectors) == null ? void 0 : p.replace(/\{i\+1\}/g, String(i + 1)).replace(/\{i\}/g, String(i)),
        (b = this.travelerBirthdateMonthSelectors) == null ? void 0 : b.replace(/\{i\+1\}/g, String(i + 1)).replace(/\{i\}/g, String(i)),
        (m = this.travelerBirthdateYearSelectors) == null ? void 0 : m.replace(/\{i\+1\}/g, String(i + 1)).replace(/\{i\}/g, String(i)),
        !1,
        { lock: o, lockReason: s }
      );
    });
  }
  injectValue(t, e, r = !1) {
    const i = typeof r == "boolean" ? { forceUpdate: r, lock: !1, lockReason: null } : { forceUpdate: !1, lock: !1, lockReason: null, ...r }, { forceUpdate: o, lock: s, lockReason: a } = i;
    if (!t || e === void 0 || e === null)
      return;
    const l = typeof e == "string" ? e.trim() : e;
    if (l === "" || l === null || l === void 0)
      return;
    let n;
    try {
      n = document.querySelectorAll(t);
    } catch (c) {
      this.logger.warn("invalid selector encountered", t, c);
      return;
    }
    n.forEach((c) => {
      if (!(!c || !o && this.touchedFields.has(c))) {
        if (this._isExcludedElement(c)) {
          this.logger.debug("Skipping excluded element (honeypot)", c);
          return;
        }
        this.logger.debug("Injecting value into element", { selector: t, element: c, value: l, lock: s }), this._applyValueToElement(c, l, o), s && this._applyLockToElement(c, a);
      }
    });
  }
  /**
   * Apply a read-only lock to a filled element. Uses `readonly` for text-like
   * inputs (value still submitted with the form) and `disabled` for radio /
   * checkbox / select where `readonly` is a no-op per HTML spec. Adds the
   * `twr-autofiller-locked` class + a `data-lock-reason` attribute for CSS
   * styling and tooltips.
   */
  _applyLockToElement(t, e = null) {
    if (t) {
      this._ensureLockedStyles();
      try {
        const r = (t.tagName || "").toLowerCase(), i = (t.type || "").toLowerCase();
        r === "select" || i === "radio" || i === "checkbox" || i === "file" ? t.setAttribute("disabled", "") : t.setAttribute("readonly", ""), t.setAttribute("aria-readonly", "true"), t.setAttribute("tabindex", "-1"), t.classList.add("twr-autofiller-locked"), e && (t.setAttribute("data-lock-reason", e), t.getAttribute("title") || t.setAttribute("title", e));
      } catch (r) {
        this.logger.warn("Failed to apply lock to element", r);
      }
    }
  }
  /**
   * Undo a lock previously applied by _applyLockToElement(). Only touches
   * elements carrying our own marker class, so `readonly` / `disabled` that the
   * host page set itself stays untouched. Needed because the traveler dropdown
   * can replace a locked person with an unlocked one on the same fields.
   */
  _releaseLockFromElement(t) {
    if (!(!t || !t.classList || !t.classList.contains("twr-autofiller-locked")))
      try {
        t.removeAttribute("readonly"), t.removeAttribute("disabled"), t.removeAttribute("aria-readonly"), t.removeAttribute("tabindex"), t.classList.remove("twr-autofiller-locked");
        const e = t.getAttribute("data-lock-reason");
        e && t.getAttribute("title") === e && t.removeAttribute("title"), t.removeAttribute("data-lock-reason");
      } catch (e) {
        this.logger.warn("Failed to release lock from element", e);
      }
  }
  /**
   * Inject the lock styles once into the document <head>. Kept self-contained
   * so integrations don't need to import any extra CSS.
   */
  _ensureLockedStyles() {
    if (typeof document > "u" || document.getElementById("twr-autofiller-locked-styles")) return;
    const t = document.createElement("style");
    t.id = "twr-autofiller-locked-styles", t.textContent = `
      .twr-autofiller-locked {
        background-color: #f5f5f5 !important;
        color: #555 !important;
        cursor: not-allowed !important;
        opacity: 0.85;
        border-color: #d0d0d0 !important;
        background-image: linear-gradient(135deg, transparent 0, transparent calc(100% - 26px), rgba(0,0,0,0.04) calc(100% - 26px)) !important;
        background-repeat: no-repeat;
        padding-right: 28px;
      }
      .twr-autofiller-locked:focus { outline: none !important; box-shadow: none !important; }
      input.twr-autofiller-locked,
      textarea.twr-autofiller-locked,
      select.twr-autofiller-locked {
        pointer-events: none;
      }
    `, (document.head || document.documentElement).appendChild(t);
  }
  /**
   * Check if an element should be excluded from auto-filling
   * Used to skip honeypot fields and other elements that shouldn't be filled
   * @param {Element} element - The element to check
   * @returns {boolean} - True if element should be excluded
   */
  _isExcludedElement(t) {
    if (!t)
      return !1;
    const e = [".viahoney", "[data-honeypot]", ".honeypot", '[name*="honeypot"]'], r = this.excludeSelectors ? this._parseDelimitedList(this.excludeSelectors) : [], i = [...e, ...r];
    for (const o of i)
      try {
        if (t.matches(o))
          return !0;
      } catch (s) {
        this.logger.warn("Invalid exclude selector:", o, s);
      }
    return !1;
  }
  _applyValueToElement(t, e, r = !1) {
    if (t instanceof HTMLInputElement) {
      const i = (t.type || "").toLowerCase();
      if (i === "radio" || i === "checkbox") {
        this._setCheckedValue(t, e);
        return;
      }
      (r || !t.value) && (t.value = e, t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 })));
      return;
    }
    if (t instanceof HTMLSelectElement) {
      this._selectOption(t, e);
      return;
    }
    if (t instanceof HTMLTextAreaElement) {
      (r || !t.value) && (t.value = e, t.dispatchEvent(new Event("input", { bubbles: !0 })));
      return;
    }
    typeof t.textContent == "string" && (r || !t.textContent) && (t.textContent = e);
  }
  _setCheckedValue(t, e) {
    const r = String(e).toLowerCase(), i = (t.value || "").toLowerCase(), o = (t.dataset.value || "").toLowerCase(), s = (t.getAttribute("aria-label") || "").toLowerCase();
    r && (i === r || o === r || s === r) && (t.checked || (t.checked = !0, t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 }))));
  }
  _selectOption(t, e) {
    if (!e || !t)
      return;
    const r = String(e).toLowerCase().trim();
    if (!r)
      return;
    const i = Array.from(t.options);
    for (const o of i) {
      const s = (o.value || "").toLowerCase().trim(), a = (o.text || "").toLowerCase().trim();
      if (s === r || a === r) {
        t.value !== o.value && (t.value = o.value, t.dispatchEvent(new Event("change", { bubbles: !0 })), this.logger.debug("Matched (exact):", r, "→", o.value));
        return;
      }
    }
    for (const o of i) {
      const s = (o.value || "").toLowerCase().trim(), a = (o.text || "").toLowerCase().trim(), l = s.split(/[-_\s,]+/).filter(Boolean), n = a.split(/[-_\s,]+/).filter(Boolean);
      if (l.includes(r) || n.includes(r)) {
        t.value !== o.value && (t.value = o.value, t.dispatchEvent(new Event("change", { bubbles: !0 })), this.logger.debug("Matched (split exact):", r, "→", o.value));
        return;
      }
    }
    for (const o of i) {
      const s = (o.value || "").toLowerCase().trim(), a = (o.text || "").toLowerCase().trim();
      if (r.length >= 2 && (s.includes(r) || a.includes(r))) {
        t.value !== o.value && (t.value = o.value, t.dispatchEvent(new Event("change", { bubbles: !0 })), this.logger.debug("Matched (partial):", r, "→", o.value));
        return;
      }
    }
    for (const o of i) {
      const s = (o.value || "").toLowerCase().trim(), a = (o.text || "").toLowerCase().trim(), l = r.split(/[-_\s,]+/).filter(Boolean);
      for (const n of l)
        if (n.length >= 2) {
          const c = s.split(/[-_\s,]+/).filter(Boolean), u = a.split(/[-_\s,]+/).filter(Boolean);
          if (c.includes(n) || u.includes(n)) {
            t.value !== o.value && (t.value = o.value, t.dispatchEvent(new Event("change", { bubbles: !0 })), this.logger.debug("Matched (split partial):", r, "→", o.value));
            return;
          }
        }
    }
    this.logger.debug("No matching option found for value:", e, "in select:", t.id || t.name);
  }
  _getAllSelectorGroups() {
    const t = [
      this.nameSelectors,
      this.firstNameSelectors,
      this.lastNameSelectors,
      this.emailSelectors,
      this.phoneSelectors,
      this.salutationSelectors,
      this.birthdateSelectors,
      this.streetSelectors,
      this.citySelectors,
      this.zipSelectors,
      this.countrySelectors
    ].filter(Boolean), e = [
      this.travelerFirstNameSelectors,
      this.travelerLastNameSelectors,
      this.travelerEmailSelectors,
      this.travelerPhoneSelectors,
      this.travelerSalutationSelectors,
      this.travelerBirthdateSelectors,
      this.travelerStreetSelectors,
      this.travelerCitySelectors,
      this.travelerZipSelectors,
      this.travelerCountrySelectors
    ].filter(Boolean), r = [];
    return Array.isArray(this.travelersData) && this.travelersData.forEach((i, o) => {
      e.forEach((s) => {
        s && r.push(
          s.replace(/\{i\+1\}/g, String(o + 1)).replace(/\{i\}/g, String(o))
        );
      });
    }), [...t, ...r];
  }
  _mergeUserData(t) {
    const e = this._compactObject(t);
    if (!e || Object.keys(e).length === 0)
      return;
    const r = this.userData || {}, i = {
      ...r,
      ...e,
      address: {
        ...r.address || {},
        ...e.address || {}
      }
    };
    this._isSameData(r, i) || (this.userData = i, this._ensureObserver(), this.findAndAttachListeners(), this.populateFields(), this._broadcastDataUpdate());
  }
  _mergeTravelerData(t) {
    if (!Array.isArray(t) || t.length === 0)
      return;
    const e = t.map((o) => this._compactObject(o)).filter((o) => o && Object.keys(o).length > 0).map((o) => this._cloneData(o));
    if (!e.length)
      return;
    const r = JSON.stringify(this.travelersData), i = JSON.stringify(e);
    r !== i && (this.travelersData = e, this._ensureObserver(), this.findAndAttachListeners(), this.populateFields(), this._showTravelerSelectorsIfNeeded(), this._broadcastDataUpdate());
  }
  _broadcastDataUpdate() {
    if (typeof window > "u" && typeof document > "u")
      return;
    const t = {
      profile: this.userData ? this._cloneData(this.userData) : null,
      travelers: Array.isArray(this.travelersData) ? this.travelersData.map((r) => this._cloneData(r)) : [],
      timestamp: Date.now()
    }, e = JSON.stringify(t);
    if (e !== this._lastBroadcastSignature) {
      if (this._lastBroadcastSignature = e, this._persistProfileCache(t), typeof document < "u")
        try {
          const r = new CustomEvent(et, { detail: t });
          document.dispatchEvent(r);
        } catch (r) {
          this.logger.warn("failed to dispatch broadcast event", r);
        }
      this._updateGlobalSnapshot(t), this._broadcastToChildIframes(t);
    }
  }
  /**\n   * Send data via previously stored MessageChannel ports.\n   * These ports bypass any window-level message interception\n   * (e.g. stopImmediatePropagation by third-party scripts).\n   */
  _broadcastViaStoredPorts(t) {
    if (this._iframePorts.size === 0) return;
    const e = {
      type: "twerenbold:auto-filler-data",
      profile: t.profile,
      travelers: t.travelers,
      timestamp: t.timestamp
    };
    for (const [r, i] of this._iframePorts.entries())
      try {
        i.postMessage(e);
      } catch {
        this.logger.debug("Removing stale port for", r), this._iframePorts.delete(r);
      }
  }
  /**
   * Resolve a child iframe's origin from its `src` attribute, returning a
   * trusted origin (per `isTrustedOrigin`) or null. about:blank, javascript:,
   * data:, srcdoc and any URL whose origin is not on the allowlist all
   * resolve to null — those iframes are skipped by the broadcast path
   * because we can't address them safely with postMessage. They still
   * receive data via MessageChannel ports (set up when the iframe
   * itself sends `twerenbold:request-auto-filler-data` with a port).
   */
  _resolveIframeTrustedOrigin(t) {
    try {
      const e = t.getAttribute("src") || t.src || "";
      if (!e || e.startsWith("about:") || e.startsWith("javascript:") || e.startsWith("data:"))
        return null;
      const r = new URL(e, window.location.href);
      return r.protocol !== "https:" && r.protocol !== "http:" ? null : v(r.origin) ? r.origin : null;
    } catch {
      return null;
    }
  }
  /**
   * Broadcast data to all child iframes whose origin is on the trusted
   * allowlist. Sandboxed / srcdoc / cross-origin-untrusted iframes are
   * intentionally skipped — they receive data via MessageChannel ports
   * after they explicitly request it (see `_broadcastViaStoredPorts`).
   *
   * The payload contains user PII (profile, travelers) so we never
   * postMessage with target `'*'` — that would leak to any third-party
   * iframe (HubSpot widgets, ad iframes, analytics).
   */
  _broadcastToChildIframes(t) {
    if (!(typeof window > "u" || typeof document > "u"))
      try {
        const e = document.querySelectorAll("iframe");
        if (e.length === 0)
          return;
        const r = {
          type: "twerenbold:auto-filler-data",
          profile: t.profile,
          travelers: t.travelers,
          timestamp: t.timestamp
        };
        let i = 0, o = 0;
        e.forEach((s) => {
          try {
            if (!s.contentWindow) return;
            const a = this._resolveIframeTrustedOrigin(s);
            if (!a) {
              o++;
              return;
            }
            s.contentWindow.postMessage(r, a), i++;
          } catch (a) {
            this.logger.debug("Could not post to iframe", a);
          }
        }), (i > 0 || o > 0) && this.logger.info(`📤 Broadcasted data to ${i}/${e.length} iframe(s), skipped ${o} untrusted/sandboxed`);
      } catch (e) {
        this.logger.warn("Failed to broadcast to iframes", e);
      }
  }
  /**
   * Setup periodic broadcast to catch late-loading iframes
   * Some SPAs inside iframes may not be ready when the initial broadcast happens
   */
  _setupPeriodicIframeBroadcast() {
    if (this._isRunningInIframe())
      return;
    let t = 0;
    const e = 10, r = 1e3, i = () => {
      if (t++, this.userData || Array.isArray(this.travelersData) && this.travelersData.length > 0) {
        const o = {
          profile: this.userData ? this._cloneData(this.userData) : null,
          travelers: Array.isArray(this.travelersData) ? this.travelersData.map((s) => this._cloneData(s)) : [],
          timestamp: Date.now()
        };
        this._broadcastToChildIframes(o), this._broadcastViaStoredPorts(o), this.logger.debug(`🔄 (parent): Periodic broadcast #${t}`);
      }
      t < e ? setTimeout(i, r) : this.logger.debug("🔄 (parent): Stopped periodic broadcasts after", e, "attempts");
    };
    setTimeout(i, 1e3);
  }
  _updateGlobalSnapshot(t) {
    if (typeof window > "u")
      return;
    const e = window[B] || {};
    e.data = t, e.getProfile = () => {
      var r;
      return ((r = e.data) == null ? void 0 : r.profile) || null;
    }, e.getTravelers = () => {
      var r;
      return Array.isArray((r = e.data) == null ? void 0 : r.travelers) ? [...e.data.travelers] : [];
    }, e.refresh = () => {
      try {
        this.populateFields();
      } catch (r) {
        this.logger.warn("refresh call failed", r);
      }
    }, e.version = e.version || "1.0.0", e.source = "auto-form-filler", e.lastUpdated = t.timestamp || Date.now(), window[B] = e;
  }
  _cloneData(t) {
    if (typeof structuredClone == "function")
      try {
        return structuredClone(t);
      } catch {
      }
    try {
      return JSON.parse(JSON.stringify(t));
    } catch {
      return t;
    }
  }
  _compactObject(t) {
    if (!t || typeof t != "object")
      return t;
    const e = Array.isArray(t) ? [] : {};
    for (const [r, i] of Object.entries(t))
      if (i != null) {
        if (typeof i == "string") {
          const o = i.trim();
          if (!o)
            continue;
          e[r] = o;
          continue;
        }
        if (typeof i == "object") {
          const o = this._compactObject(i);
          o && (Array.isArray(o) ? o.length : Object.keys(o).length) && (e[r] = o);
          continue;
        }
        e[r] = i;
      }
    return Array.isArray(e) ? e.length ? e : null : Object.keys(e).length ? e : null;
  }
  _isSameData(t, e) {
    return JSON.stringify(t) === JSON.stringify(e);
  }
  _deriveGenderFromSalutation(t) {
    if (!t || typeof t != "string")
      return null;
    const e = t.trim().toLowerCase();
    return ["herr", "mr", "mr.", "mister", "male", "männlich"].includes(e) ? "Male" : ["frau", "mrs", "mrs.", "ms", "ms.", "miss", "female", "weiblich"].includes(e) ? "Female" : null;
  }
  _getPhoneLeadingZeroMode() {
    const t = String(this.phoneLeadingZeroMode || "auto").trim().toLowerCase();
    return ["remove", "strip", "always", "on", "true", "1"].includes(t) ? "remove" : ["keep", "preserve", "never", "off", "false", "0"].includes(t) ? "keep" : "auto";
  }
  _shouldStripLocalLeadingZero(t = !1) {
    const e = this._getPhoneLeadingZeroMode();
    return e === "remove" ? !0 : e === "keep" ? !1 : !!t;
  }
  _normalizePhone(t, e = {}) {
    if (!t || typeof t != "string") return t;
    let r = t.trim().replace(/[^\d+]/g, "");
    r.startsWith("00") && (r = `+${r.slice(2)}`);
    const i = !!(e != null && e.hasCountrySelector);
    return this._shouldStripLocalLeadingZero(i) && !r.startsWith("+") && /^0\d+$/.test(r) && (r = r.slice(1)), r;
  }
  _getFullNameFromData(t) {
    if (!t)
      return null;
    if (t.name)
      return t.name;
    const e = [
      t.firstName || t.givenName,
      t.lastName || t.familyName
    ].filter(Boolean);
    return e.length ? e.join(" ") : null;
  }
  _getPhoneSourcePreference() {
    const t = String(this.phoneSource || "auto").trim().toLowerCase();
    return ["mobile", "cell", "handy"].includes(t) ? "mobile" : ["landline", "main", "fixed", "festnetz"].includes(t) ? "landline" : "auto";
  }
  _extractPhoneCandidates(...t) {
    let e = null, r = null, i = null;
    for (const o of t)
      !o || typeof o != "object" || (e || (e = o.phoneMobile || o.mobilePhone || o.mobile || o.cellPhone || o.gsm || null), r || (r = o.phoneMain || o.landlinePhone || o.landline || o.fixedLine || o.homePhone || null), i || (i = o.phone || null));
    return { mobile: e, landline: r, generic: i };
  }
  _selectMobilePhoneFromSources(...t) {
    const { mobile: e } = this._extractPhoneCandidates(...t);
    return e || null;
  }
  _selectLandlinePhoneFromSources(...t) {
    const { landline: e } = this._extractPhoneCandidates(...t);
    return e || null;
  }
  _selectPhoneFromSources(...t) {
    const { mobile: e, landline: r, generic: i } = this._extractPhoneCandidates(...t);
    return this._getPhoneSourcePreference() === "landline" ? r || e || i || null : e || r || i || null;
  }
  /**
   * Parse date from various formats and return { day, month, year }
   * Supports: ISO (YYYY-MM-DD), DD.MM.YYYY, DD/MM/YYYY, MM/DD/YYYY, Date objects
   */
  _parseDate(t) {
    if (!t)
      return null;
    let e = null, r = null, i = null;
    if (t instanceof Date)
      return e = String(t.getDate()).padStart(2, "0"), r = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getFullYear()), { day: e, month: r, year: i };
    const o = String(t).trim();
    if (!o)
      return null;
    let s = o.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (s)
      return i = s[1], r = s[2].padStart(2, "0"), e = s[3].padStart(2, "0"), { day: e, month: r, year: i };
    if (s = o.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})/), s)
      return e = s[1].padStart(2, "0"), r = s[2].padStart(2, "0"), i = s[3], { day: e, month: r, year: i };
    if (s = o.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/), s) {
      const a = parseInt(s[1], 10);
      return parseInt(s[2], 10), a > 12 ? (e = s[1].padStart(2, "0"), r = s[2].padStart(2, "0")) : (r = s[1].padStart(2, "0"), e = s[2].padStart(2, "0")), i = s[3], { day: e, month: r, year: i };
    }
    try {
      const a = new Date(o);
      if (!isNaN(a.getTime()))
        return e = String(a.getDate()).padStart(2, "0"), r = String(a.getMonth() + 1).padStart(2, "0"), i = String(a.getFullYear()), { day: e, month: r, year: i };
    } catch (a) {
      this.logger.warn("Failed to parse date:", o, a);
    }
    return null;
  }
  /**
   * Populate split date fields (day, month, year selects)
   */
  _populateSplitDate(t, e, r, i, o = !1, s = null) {
    if (!t)
      return;
    const a = this._parseDate(t);
    if (!a) {
      this.logger.debug("Could not parse date:", t);
      return;
    }
    const { day: l, month: n, year: c } = a, u = s ? { forceUpdate: o, lock: !!s.lock, lockReason: s.lockReason || null } : o;
    e && l && this.injectValue(e, l, u), r && n && this.injectValue(r, n, u), i && c && this.injectValue(i, c, u);
  }
  /**
   * Detects traveler fields in the DOM and returns groups of related fields
   */
  _detectTravelerFieldGroups() {
    if (!Array.isArray(this.travelersData) || this.travelersData.length === 0)
      return [];
    const t = [
      this.travelerSalutationSelectors,
      this.travelerFirstNameSelectors,
      this.travelerLastNameSelectors,
      this.travelerEmailSelectors,
      this.travelerPhoneSelectors,
      this.travelerBirthdateSelectors,
      this.travelerBirthdateDaySelectors,
      this.travelerBirthdateMonthSelectors,
      this.travelerBirthdateYearSelectors,
      this.travelerStreetSelectors,
      this.travelerCitySelectors,
      this.travelerZipSelectors,
      this.travelerCountrySelectors
    ].filter(Boolean), e = [];
    for (let r = 0; r < 10; r++) {
      const i = [], o = [];
      for (const s of t) {
        const a = s.replace(/\{i\}/g, String(r));
        try {
          const l = document.querySelectorAll(a);
          l.length > 0 && (i.push(...Array.from(l)), o.push(a));
        } catch (l) {
          this.logger.warn("invalid traveler selector", a, l);
        }
      }
      i.length > 0 && e.push({ index: r, fields: i, selectors: o });
    }
    return e;
  }
  /**
   * Creates or updates a traveler selector dropdown for a field group
   */
  _createOrUpdateTravelerSelector(t) {
    const e = `traveler-${t.index}`, r = t.fields[0];
    if (!r || !r.parentElement)
      return;
    let i = this._travelerSelectors.get(e);
    if (!i) {
      i = document.createElement("fieldset"), i.className = "twerenbold-traveler-selector", i.setAttribute("data-traveler-index", String(t.index));
      const s = document.createElement("legend");
      s.textContent = "Aus Kundenkonto", s.style.cssText = "color: var(--traveler-selector-legend-color, var(--primary-color, #007bff)); font-weight: normal; font-size:small;margin-bottom: 0px;padding:0 5px;width:auto;", i.appendChild(s);
      const a = document.createElement("label");
      a.textContent = `Reisende/r ${t.index + 1}: `, a.id = `twerenbold-traveler-label-${t.index}`, a.style.cssText = "font-weight: bold; margin-right: 12px;margin-bottom:0px;white-space: nowrap;";
      const l = document.createElement("select");
      l.className = "twerenbold-traveler-select", l.style.cssText = "padding: 6px 12px; border: 1px solid #ccc; border-radius: var(--select-border-radius, 0px); font-size: var(--select-font-size, 14px); cursor: pointer;", l.name = `twerenbold-traveler-select-${t.index}`;
      const n = document.createElement("option");
      n.value = "-1", n.textContent = "-- Bitte wählen --", l.appendChild(n), this.travelersData.forEach((h, d) => {
        const p = document.createElement("option");
        p.value = String(d);
        const b = [h.firstName, h.lastName].filter(Boolean).join(" ");
        p.textContent = b || `Reisende/r ${d + 1}`, l.appendChild(p);
      });
      const c = document.createElement("span");
      c.textContent = "Wählen Sie optional einen Reisenden aus Ihrem Kundenkonto aus.", c.style.cssText = "line-height: 13px;font-size: 12px; color: var(--traveler-selector-description-color, var(--primary-color-dark, #666)); font-weight: normal; margin-left: 8px;", l.addEventListener("change", (h) => {
        const d = parseInt(h.target.value, 10);
        d >= 0 && d < this.travelersData.length && (this._activeTravelerSelections.set(e, d), this._fillTravelerFieldsForGroup(t, d));
      }), i.appendChild(a), i.appendChild(l), i.appendChild(c), i.style.cssText = `
        background: var(--traveler-selector-background, var(--primary-color-light, #e6f0ff));
        border: 1px solid var(--traveler-selector-border-color, var(--primary-color, #007bff));
        border-radius: var(--traveler-selector-border-radius, var(--border-radius-sm, 4px));
        padding: var(--traveler-selector-padding, 2px 12px 12px 12px);
        margin: var(--traveler-selector-margin, 8px 0px 16px 0px);
        display: flex;
        align-items: center;
        gap: var(--traveler-selector-gap, 12px);
      `;
      let u = !1;
      if (this.travelerSelectorInsertAfter) {
        const h = this.travelerSelectorInsertAfter.replace(/\{i\}/g, String(t.index));
        try {
          const d = document.querySelector(h);
          if (d && d.parentElement)
            d.parentElement.insertBefore(
              i,
              d.nextSibling
            ), u = !0, this.logger.debug(`Inserted traveler selector after '${h}'`);
          else {
            this.logger.warn(`Insert-after element not found: '${h}' - skipping traveler selector`);
            return;
          }
        } catch (d) {
          this.logger.warn(`Invalid insert-after selector: '${h}'`, d);
          return;
        }
      } else {
        const h = r.closest("form") || r.parentElement;
        h && h.parentElement ? h.parentElement.insertBefore(i, h) : r.parentElement.insertBefore(i, r), u = !0;
      }
      if (!u)
        return;
      this._travelerSelectors.set(e, i);
    }
    const o = this._activeTravelerSelections.get(e);
    if (o !== void 0) {
      const s = i.querySelector("select");
      s && (s.value = String(o));
    }
  }
  /**
   * Fills traveler fields for a specific group with data from selected traveler
   */
  _fillTravelerFieldsForGroup(t, e) {
    var c, u, h, d, p, b, m;
    if (e < 0 || e >= this.travelersData.length)
      return;
    const r = this.travelersData[e], i = t.index, o = (r == null ? void 0 : r.isLocked) === !0, s = (r == null ? void 0 : r.lockReason) || "Diese Person ist Teil einer bevorstehenden Buchung — bitte wenden Sie sich an den Kundenservice.";
    t.fields.forEach((g) => {
      this.touchedFields.delete(g);
    }), this._ensureObserver();
    const l = [
      { selectors: this.travelerFirstNameSelectors, value: r.firstName },
      { selectors: this.travelerLastNameSelectors, value: r.lastName },
      {
        selectors: this.travelerEmailSelectors,
        value: r.email,
        alwaysLock: !0,
        alwaysLockReason: "Die E-Mail-Adresse ist der Schlüssel zum Kundenkonto und kann hier nicht geändert werden."
      },
      { selectors: this.travelerPhoneSelectors, value: this._normalizePhone(r.phone) },
      { selectors: this.travelerSalutationSelectors, value: r.salutation },
      { selectors: this.travelerBirthdateSelectors, value: r.birthDate },
      { selectors: this.travelerStreetSelectors, value: (c = r.address) == null ? void 0 : c.street },
      { selectors: this.travelerCitySelectors, value: (u = r.address) == null ? void 0 : u.city },
      { selectors: this.travelerZipSelectors, value: (h = r.address) == null ? void 0 : h.postalCode },
      { selectors: this.travelerCountrySelectors, value: (d = r.address) == null ? void 0 : d.country }
    ].filter((g) => g.selectors).map((g) => ({ ...g, indexed: g.selectors.replace(/\{i\}/g, String(i)) })), n = [
      this.travelerBirthdateDaySelectors,
      this.travelerBirthdateMonthSelectors,
      this.travelerBirthdateYearSelectors
    ].filter(Boolean).map((g) => g.replace(/\{i\}/g, String(i)));
    [...l.map((g) => g.indexed), ...n].forEach((g) => {
      try {
        document.querySelectorAll(g).forEach((C) => this._releaseLockFromElement(C));
      } catch (C) {
        this.logger.debug("Skipping lock release for invalid selector", g, C);
      }
    });
    for (const g of l) {
      const C = g.alwaysLock || o, _ = g.alwaysLock ? g.alwaysLockReason : s;
      this.injectValue(g.indexed, g.value, { forceUpdate: !0, lock: C, lockReason: _ });
    }
    r.birthDate && this._populateSplitDate(
      r.birthDate,
      (p = this.travelerBirthdateDaySelectors) == null ? void 0 : p.replace(/\{i\}/g, String(i)),
      (b = this.travelerBirthdateMonthSelectors) == null ? void 0 : b.replace(/\{i\}/g, String(i)),
      (m = this.travelerBirthdateYearSelectors) == null ? void 0 : m.replace(/\{i\}/g, String(i)),
      !0,
      { lock: o, lockReason: s }
    );
  }
  /**
   * Checks for traveler fields and shows selectors if found
   */
  _showTravelerSelectorsIfNeeded() {
    if (!Array.isArray(this.travelersData) || this.travelersData.length === 0)
      return;
    const t = this._detectTravelerFieldGroups();
    t.length !== 0 && (this.logger.debug(`Found ${t.length} traveler field group(s)`), t.forEach((e) => {
      this._createOrUpdateTravelerSelector(e);
    }));
  }
  _clearUserData() {
    this._clearProfileCache(), this.userData = null, this.travelersData = [], this.touchedFields.clear(), this._msalAccessToken = null, this._profileFetchRetries = 0, this._msalProfileFetchRetries = 0, this._authUserSnapshot = null, this._msalAccount = null, this._broadcastDataUpdate();
  }
  updated(t) {
    super.updated(t), t.has("accountComponentSelector") && this._resolveAccountComponents(), t.has("authComponentSelector") && (this._authLookupAttempts = 0, this._resolveAuthComponent()), t.has("theme") && this._loginBenefitPopup && (this.theme ? this._loginBenefitPopup.setAttribute("theme", this.theme) : this._loginBenefitPopup.removeAttribute("theme"));
  }
  render() {
    return "";
  }
};
X.properties = {
  clientId: { type: String, attribute: "client-id" },
  authority: { type: String, attribute: "authority" },
  nameSelectors: { type: String, attribute: "name-selectors" },
  firstNameSelectors: { type: String, attribute: "first-name-selectors" },
  lastNameSelectors: { type: String, attribute: "last-name-selectors" },
  emailSelectors: { type: String, attribute: "email-selectors" },
  streetSelectors: { type: String, attribute: "street-selectors" },
  citySelectors: { type: String, attribute: "city-selectors" },
  zipSelectors: { type: String, attribute: "zip-selectors" },
  countrySelectors: { type: String, attribute: "country-selectors" },
  phoneSelectors: { type: String, attribute: "phone-selectors" },
  phoneMobileSelectors: { type: String, attribute: "phone-mobile-selectors" },
  phoneLandlineSelectors: { type: String, attribute: "phone-landline-selectors" },
  phoneSource: { type: String, attribute: "phone-source" },
  phoneLeadingZeroMode: { type: String, attribute: "phone-leading-zero-mode" },
  salutationSelectors: { type: String, attribute: "salutation-selectors" },
  genderSelectors: { type: String, attribute: "gender-selectors" },
  birthdateSelectors: { type: String, attribute: "birthdate-selectors" },
  birthdateDaySelectors: { type: String, attribute: "birthdate-day-selectors" },
  birthdateMonthSelectors: { type: String, attribute: "birthdate-month-selectors" },
  birthdateYearSelectors: { type: String, attribute: "birthdate-year-selectors" },
  travelerFirstNameSelectors: { type: String, attribute: "traveler-first-name-selectors" },
  travelerLastNameSelectors: { type: String, attribute: "traveler-last-name-selectors" },
  travelerEmailSelectors: { type: String, attribute: "traveler-email-selectors" },
  travelerPhoneSelectors: { type: String, attribute: "traveler-phone-selectors" },
  travelerSalutationSelectors: { type: String, attribute: "traveler-salutation-selectors" },
  travelerGenderSelectors: { type: String, attribute: "traveler-gender-selectors" },
  travelerBirthdateSelectors: { type: String, attribute: "traveler-birthdate-selectors" },
  travelerBirthdateDaySelectors: { type: String, attribute: "traveler-birthdate-day-selectors" },
  travelerBirthdateMonthSelectors: { type: String, attribute: "traveler-birthdate-month-selectors" },
  travelerBirthdateYearSelectors: { type: String, attribute: "traveler-birthdate-year-selectors" },
  travelerStreetSelectors: { type: String, attribute: "traveler-street-selectors" },
  travelerCitySelectors: { type: String, attribute: "traveler-city-selectors" },
  travelerZipSelectors: { type: String, attribute: "traveler-zip-selectors" },
  travelerCountrySelectors: { type: String, attribute: "traveler-country-selectors" },
  travelerSelectorInsertAfter: { type: String, attribute: "traveler-selector-insert-after" },
  loginPopupAllowedOrigins: { type: String, attribute: "login-popup-allowed-origins" },
  excludeSelectors: { type: String, attribute: "exclude-selectors" },
  authComponentSelector: { type: String, attribute: "auth-component-selector" },
  appStateSelector: { type: String, attribute: "app-state-selector" },
  accountComponentSelector: { type: String, attribute: "account-component-selector" },
  profileEndpoint: { type: String, attribute: "profile-endpoint" },
  knownAuthorities: { type: String, attribute: "known-authorities" },
  redirectUri: { type: String, attribute: "redirect-uri" },
  loginScopes: { type: String, attribute: "login-scopes" },
  loadAccountOnInit: { type: Boolean, attribute: "load-account-on-init", reflect: !0 },
  useMsalFallback: { type: Boolean, attribute: "use-msal-fallback", reflect: !0 },
  authPageUrl: { type: String, attribute: "auth-page-url" },
  theme: { type: String, attribute: "theme" }
};
let Y = X;
const T = "auto-form-filler";
customElements.get(T) || customElements.define(T, Y);
(function() {
  const S = j("AutoFormFiller");
  function t() {
    var h;
    const l = document.currentScript;
    if (l instanceof HTMLScriptElement && ((h = l.dataset) != null && h.clientId))
      return l;
    const n = Array.from(document.querySelectorAll("script[data-client-id]"));
    if (!n.length)
      return null;
    const c = n.find((d) => /auto-filler(\.bundle)?\.js/i.test(d.src || ""));
    if (c)
      return c;
    const u = n.find(
      (d) => {
        var p, b, m;
        return !!((p = d.dataset) != null && p.firstNameSelectors || (b = d.dataset) != null && b.lastNameSelectors || (m = d.dataset) != null && m.emailSelectors);
      }
    );
    return u || (n.length > 1 && S.warn("Multiple script[data-client-id] tags found; using the first one as fallback."), n[0]);
  }
  const e = t();
  if (!e) {
    S.error("Script tag with [data-client-id] not found.");
    return;
  }
  const r = e.dataset;
  if (!r.clientId || !r.authority) {
    S.error("data-client-id or data-authority is missing.");
    return;
  }
  function i() {
    if (!document.body || document.querySelector(T))
      return;
    const l = document.createElement(T);
    for (const n of Object.keys(r)) {
      const c = n.replace(/[A-Z]/g, (u) => `-${u.toLowerCase()}`);
      c === "load-account-on-init" || c === "use-msal-fallback" ? l.setAttribute(c, r[n] || "true") : l.setAttribute(c, r[n]);
    }
    document.body.appendChild(l);
  }
  const o = () => {
    setTimeout(i, 50);
  }, s = new MutationObserver(o);
  function a() {
    if (!document.body) {
      setTimeout(a, 50);
      return;
    }
    i(), s.observe(document.body, { childList: !0, subtree: !1 });
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", a) : a();
})();
