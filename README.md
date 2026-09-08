# Grainulation

Grainulation is the organization behind [Grainulator](https://github.com/grainulation/grainulator), evidence and verification tools for model-assisted work. This checkout contains the rebuilt organization website for [grainulation.com](https://grainulation.com).

The current architecture has two maintained repositories: **Grainulator** owns the product, CLI, MCP tools, research playground, and product website; **Grainulation** owns this organization website. These local changes have not been published, and repository archival has not been performed.

## Preview and build the website

Use Node.js 24 or later; Node 25 is the local default. The static build needs no dependency installation:

```sh
node scripts/build-site.mjs
python3 -m http.server 4518 --bind 127.0.0.1 --directory dist/site
```

Open http://127.0.0.1:4518. The build copies the authored `site/` into `dist/site/`; it does not run the historical shared-asset generator. The Pages workflow is prepared to upload that artifact. Running the build does not deploy anything.

For the paired local product and organization previews, run `node scripts/preview.mjs` from the sibling `grainulator-dogfood` checkout. Product setup and local artifact installation are documented in that checkout's `docs/INSTALLATION.md`.

## Repository contents

- `site/` — current organization website, branding, and metadata.
- `scripts/build-site.mjs` — dependency-free static artifact build.
- `.github/workflows/pages.yml` — organization website deployment workflow.
- `bin/`, `lib/`, `public/`, `test/`, and the existing package manifest — retained historical ecosystem CLI source and compatibility tests.

The retained CLI source and its historical package metadata have not been removed or migrated in this checkout. They are not the current product entry point. The package publication workflow is retired; use the consolidated Grainulator product for new work. Remaining documents that describe the earlier ecosystem are historical references, not installation instructions for the new build.

## History and license

[CHANGELOG.md](CHANGELOG.md) preserves prior releases. Source history and existing repository stars remain intact. MIT licensed; see [LICENSE](LICENSE).
