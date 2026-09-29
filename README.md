# TWG customer-account assets

Static release files for `https://kk-script.twgapp.ch/v1/` (KK-236).
This repository does not contain the source history, customer data, or a login website.
Only `site/` is deployed. Existing Voegele integrations remain unchanged.

## Release

1. Build a clean reviewed source checkout with `npm ci --ignore-scripts && npm run build`.
2. Run `python3 tools/export_release.py /absolute/path/to/dist FULL_SOURCE_COMMIT_SHA`.
3. Review the file diff, verify imports and run the required Rafter review/scans.
4. Commit the release to main, then manually run `Publish customer-account assets`.
5. Verify HTTPS, JavaScript MIME types, CORS and the source commit in `/release.json`.

Older hashed chunks are retained so cached entry files continue to load. Do not delete
them without accounting for browser/CDN cache lifetimes. Missing scripts must return
404, never an HTML SPA fallback. Pages uses its own cache policy.

Rollback: redeploy a prior reviewed commit through main. Existing integrations can
continue using `https://twr-account.voegele-reisen.ch/v1/` while this host is tested.
Before deleting the Pages site, remove its DNS record to avoid a dangling custom domain.
