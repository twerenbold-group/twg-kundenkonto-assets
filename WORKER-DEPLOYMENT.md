# Customer-account asset hosting

Production: Cloudflare Worker `twg-kundenkonto-assets` in the twgapp.ch account (`a373a42c0f4754cd4e9a404f3c2991a1`). Publish only `site/` using the existing export allowlist. No private source, demo data, secrets or server execution is added. Existing hashed assets remain available for old entrypoints.

Deploy with `npx wrangler@4.63.0 deploy` from this repository after export/manifest checks. The pinned CLI uses the operator's Cloudflare credentials; never commit tokens. Inspect the exact worker version and verify all manifest SHA-256 values over HTTPS, JS MIME, CORS, 404 on missing scripts and X-TWG-Asset-Host.

The narrow route `kk-script.twgapp.ch/*` serves static assets directly from Workers. The existing proxied DNS record is retained; no GitHub origin fetch is needed while the route matches. The old Pages site remains for rollback. Removing the route returns traffic to that origin (whose release can be older); prefer deploying a previously verified asset revision to Workers. Do not remove the DNS record or GitHub Pages domain binding without a separate migration.

GitHub Pages workflow is legacy/manual only, not the production release path. The timed-out KK-285 Pages run was canceled when Workers migration was authorized.

Review: public static files only, no runtime secrets/auth/data ingestion. CORS * intentionally applies to public JS/assets, no credentials. Missing paths return404, never SPA HTML. Fixed account and exact host route; no wildcard across other services. User authorized the domain cutover after preview verification. Remote review remains pending under global daily scan policy.
