# KK-236: GitHub Pages script hosting

## Deployment design and Rafter secure-design review

Source: the clean account/main commit 81a0b21 of the existing private source repository.
The source repository and its history remain private. This release repository contains
only distributable browser assets, publication tooling and this deployment record.

Flow: trusted maintainer -> clean, locked npm build -> allowlisted static release ->
GitHub Actions Pages artifact -> public HTTPS CDN -> existing customer websites.
The websites continue to authenticate with their existing Entra and API configuration.
This host receives asset GET requests only; no login page, callback HTML, customer data,
server credentials or API endpoints are published. OAuth callback JavaScript is a
public library used by callback pages hosted on the existing approved origins.

GitHub Free requires a public release repository. Only site/ is deployed. GitHub
terminates TLS; Cloudflare supplies a DNS-only CNAME for kk-script.twgapp.ch.
Configure and verify the custom domain in GitHub before switching DNS. Enforce HTTPS
after certificate issuance. Keep the existing Voegele host for rollback and existing
integrations. No existing website integration is changed by this release.

CI uses pinned first-party Actions on ephemeral GitHub runners. Build/upload has
contents:read; only deployment has pages:write and id-token:write. There are no static
cloud keys or private-source tokens. Deployment is a manual workflow_dispatch on main,
with a github-pages environment and recorded commit/actor. No pull-request deployment.
Maintainers review and scan each release before triggering the workflow.

## STRIDE and residual risks

- Spoofing: claim the hostname in Pages before DNS and require HTTPS. A future teardown
  must remove DNS before deleting the Pages site to avoid a dangling domain.
- Tampering: immutable Action SHAs, locked clean source build, SHA-256 file manifest,
  tracked releases. A compromised repository administrator could still replace scripts;
  repository access is a production trust boundary. No signed provenance claim is made.
- Repudiation: Git commits, workflow runs and Pages deployments record changes/actors.
- Disclosure: exclude demo fixtures, backup configs, source maps, HTML login/test pages,
  secrets and local files. The assets are intentionally public, as on the original host.
- DoS: Pages service limits/outage can affect new integrations; retain the original
  hostname. No server process, database, uploads or privileged runtime exists here.
- Privilege escalation: the deploy job can publish Pages only; source and API permissions
  are not granted. Browser authentication remains unchanged on consuming sites.

Abuse twin: replacing a legitimate component with a credential-stealing script would
compromise consuming websites. Restrict release-repository write access, review releases,
retain manifests and roll back to the prior known commit if integrity is in doubt.

Pages ignores Cloudflare _headers and _redirects. Publish /v1 URLs directly and test
CORS, MIME types, relative imports, JSON and CSS from a different origin. Do not claim
the former 300-second cache policy is preserved. Root legacy aliases are not switched.
The user elected Pages after discussion of GitHub's commercial-hosting limitations.

Containers, database encryption, secret rotation and server egress rules are not
applicable to this static-only host. CDN access logs/retention are managed by GitHub.
