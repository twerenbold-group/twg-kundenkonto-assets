const i = {
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
        phone: "+41 (0) 56 484 84 84",
        openingHours: "Mo – Fr<br>09:00&nbsp;–&nbsp;12:00&nbsp;Uhr<br>13:00&nbsp;–&nbsp;17:00&nbsp;Uhr"
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
        phone: "+41 (0) 56 484 84 84",
        openingHours: "Mo – Fr<br>09:00&nbsp;–&nbsp;12:00&nbsp;Uhr<br>13:00&nbsp;–&nbsp;17:00&nbsp;Uhr"
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
        openingHours: "Montag – Freitag<br>9.00&nbsp;–&nbsp;12.00&nbsp;Uhr<br>13.00&nbsp;–&nbsp;17.00&nbsp;Uhr"
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
        openingHours: "Mo – Fr<br>08:30&nbsp;–&nbsp;12:00&nbsp;Uhr<br>13:30&nbsp;–&nbsp;17:00&nbsp;Uhr"
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
        openingHours: "Mo – Fr<br>09:00&nbsp;–&nbsp;12:00&nbsp;Uhr<br>13:00&nbsp;–&nbsp;17:00&nbsp;Uhr"
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
        openingHours: "Mo – Fr<br>08:00&nbsp;–&nbsp;12:00&nbsp;Uhr<br>13:30&nbsp;–&nbsp;17:00&nbsp;Uhr"
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
}, n = (r = {}, t = {}) => {
  const o = { ...r };
  for (const e of Object.keys(t))
    t[e] && typeof t[e] == "object" && !Array.isArray(t[e]) ? o[e] = n(r[e], t[e]) : o[e] = t[e];
  return o;
};
let a = { modes: {}, themes: {}, components: {} };
function w(r = {}) {
  a = n(a, r || {});
}
function f(r = "demo", t = null) {
  var c, l, b, d, h, v;
  const o = i.modes[r] ? i.modes[r] : i.modes.demo || {}, e = ((c = a.modes) == null ? void 0 : c[r]) || {}, s = n({}, n(o, e));
  if (t) {
    const g = i.themes[t] || {}, m = ((l = a.themes) == null ? void 0 : l[t]) || {}, p = n(s, n(g, m));
    return ((d = (b = p.integrations) == null ? void 0 : b.hubspot) == null ? void 0 : d.id) === "" && delete p.integrations.hubspot.id, p;
  }
  const u = a.components || {};
  return u && Object.keys(u).length > 0 && (s.components = n(s.components || {}, u)), ((v = (h = s.integrations) == null ? void 0 : h.hubspot) == null ? void 0 : v.id) === "" && delete s.integrations.hubspot.id, s;
}
function S(r, t = "demo", o = null) {
  const e = f(t, o);
  return e != null && e.components && typeof e.components[r] < "u" ? !!e.components[r] : !0;
}
const y = {
  getConfigFor: f,
  isComponentEnabled: S
};
export {
  y as default,
  f as getConfigFor,
  S as isComponentEnabled,
  w as setRuntimeOverrides
};
