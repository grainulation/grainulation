<p align="center">
  <a href="https://grainulation.com"><img src="site/logo-mark.png" alt="Grainulation logo" width="80" height="80"></a>
</p>

<h1 align="center">Grainulation</h1>

<p align="center"><strong>Intelligence, put to work.</strong></p>

<p align="center">
  Open tools for work with AI.<br>
  Evidence you can inspect. Checks you define. Context you keep.
</p>

<p align="center">
  <a href="https://grainulation.com"><img src="https://img.shields.io/badge/visit-grainulation.com-8df6ff?style=for-the-badge" alt="Visit grainulation.com"></a>
</p>

<p align="center">
  <a href="https://github.com/grainulation/grainulation/releases"><img src="https://img.shields.io/github/v/release/grainulation/grainulation?label=release" alt="Latest GitHub release"></a>
  <a href="https://github.com/grainulation/grainulation/actions/workflows/ci.yml"><img src="https://github.com/grainulation/grainulation/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT license"></a>
</p>

<p align="center">
  <a href="#our-product">Our product</a> ·
  <a href="#work-on-the-website">Work on the website</a> ·
  <a href="#repository-contents">Repository contents</a> ·
  <a href="https://github.com/grainulation/grainulation/issues">Feedback</a>
</p>

---

## Our product

Models keep getting better. We build the tools that help you turn their output into work you can inspect, verify, and continue.

**[Grainulator](https://github.com/grainulation/grainulator)** brings evidence, verification, memory, and session handoff into one product. Keep your model and agent; add a record of what supports the answer, checks that matter to your task, and clear next actions.

**[Explore Grainulator](https://grainulator.app/)** · **[Try the playground](https://grainulator.app/playground/)** · **[Product setup](https://github.com/grainulation/grainulator/blob/main/docs/INSTALLATION.md)**

The public playground lets you configure a workflow and export a session. Model execution happens through your local Grainulator installation and provider account.

| Repository | What lives here |
| --- | --- |
| **[Grainulator](https://github.com/grainulation/grainulator)** | The product: CLI, MCP tools, research sessions, plugins, and product website. |
| **Grainulation — this repository** | The organization website at [grainulation.com](https://grainulation.com). |

## Work on the website

Requires **Node.js 24+**; Node 25 is the development default. The preview command below also uses **Python 3**. The static build needs no dependency installation.

```sh
git clone https://github.com/grainulation/grainulation.git
cd grainulation
node scripts/build-site.mjs
python3 -m http.server 4518 --bind 127.0.0.1 --directory dist/site
```

Open **[localhost:4518](http://127.0.0.1:4518/)**. The build copies the authored `site/` files into `dist/site/`. Product links retain their public destinations; running this website does not require a local product server.

Before opening a pull request, run the site metadata check:

```sh
bash scripts/seo-check.sh
```

The [CI workflow](.github/workflows/ci.yml) runs formatting, SEO, package compatibility tests, and static builds on Node 24 and 25. The [Pages workflow](.github/workflows/pages.yml) deploys website changes merged into `main`. A local build does not deploy anything.

## Repository contents

```text
site/                    Organization website, branding, and metadata
scripts/build-site.mjs   Static artifact build
scripts/seo-check.sh     Site metadata checks
.github/workflows/       CI and website deployment
```

The earlier ecosystem CLI remains in `bin/`, `lib/`, `public/`, and `test/`, alongside its historical package metadata. That source is retained for compatibility and history; new product work belongs in Grainulator. The organization package's publication workflow is retired.

Questions about the website belong in [this repository's issues](https://github.com/grainulation/grainulation/issues). Product feedback belongs in [Grainulator's issues](https://github.com/grainulation/grainulator/issues).

[Release history](CHANGELOG.md) · [MIT license](LICENSE)
