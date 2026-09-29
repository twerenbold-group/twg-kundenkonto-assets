"""Export public /v1 browser assets from a clean customer-account dist build."""
import hashlib
import json
from pathlib import Path
import shutil
import sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve(strict=True)
revision = sys.argv[2]
if not (len(revision) == 40 and all(c in '0123456789abcdef' for c in revision)):
    raise SystemExit('Expected the full source Git commit SHA')
source = source / 'v1'
if not source.is_dir():
    raise SystemExit('Expected a dist directory containing v1/')
target = root / 'site' / 'v1'
extensions = {'.js', '.css', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico'}
manifest = []
for file in sorted(source.rglob('*')):
    if file.is_symlink():
        raise SystemExit(f'Symlinks are not publishable: {file.name}')
    if not file.is_file():
        continue
    rel = file.relative_to(source)
    if any(part.startswith('.') for part in rel.parts):
        continue
    if file.suffix.lower() not in extensions:
        continue
    # Publish bundle entrypoints/chunks and their runtime resources only.
    # Unbundled source modules and legacy integration loaders are not part of
    # the supported /v1/*.bundle.js interface.
    if file.suffix == '.js' and not (
        (len(rel.parts) == 1 and (file.name.endswith('.bundle.js') or file.name in
         {p.name for p in source.parent.glob('*.js')})) or rel.parts[0] == 'libs'
    ):
        continue
    if len(rel.parts) > 1 and rel.parts[0] not in {'assets', 'libs', 'config'}:
        continue
    if file.name == 'demo-data.json' or 'language-editor' in file.name:
        continue
    if file.suffix == '.json' and file.name not in {'language-config.json', 'postal-codes.json'}:
        continue
    dest = target / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(file, dest)
    manifest.append({'path': f'v1/{rel.as_posix()}', 'sha256': hashlib.sha256(dest.read_bytes()).hexdigest()})

site = root / 'site'
site.mkdir(exist_ok=True)
(site / '.nojekyll').touch()
(site / 'index.html').write_text('<!doctype html><html lang="de"><meta charset="utf-8"><title>TWG Kundenkonto</title><p>Statische Kundenkonto-Komponenten der Twerenbold Reise Gruppe.</p></html>\n')
(site / 'release.json').write_text(json.dumps({'sourceCommit': revision, 'files': manifest}, indent=2) + '\n')
print(f'Exported {len(manifest)} browser assets from {revision}')
