# ayobanton.com: Webflow → Wix Studio migration

A documented, zero-downtime move of [ayobanton.com](https://www.ayobanton.com), a fine-art photography portfolio and print store, from Webflow to Wix Studio. The site keeps the same domain, the same content and the same animations, and gets a refreshed store.

This repo holds the plan, the audit of the old site, the URL and redirect maps, the animation inventory, and the scripts used along the way. It deliberately contains **no client images, email addresses or private data**. Those live in a local `private/` folder that is git-ignored.

## Status

| Phase | What | Status |
| --- | --- | --- |
| 0 | Alignment and inventory | In progress |
| 1 | Content decisions (catalog, enquiry copy, Contact page) | Not started |
| 2 | Build on Wix Studio (free preview URL) | Not started |
| 3 | Parity QA: screenshots, links, SEO, accessibility | Not started |
| 4 | Domain switch | Not started |
| 5 | Aftercare, then cancel Webflow | Not started |

Progress is tracked in [GitHub Issues](../../issues), with one milestone per phase.

## Why a rebuild and not an import

Wix can't import a Webflow site. Webflow exports static HTML/CSS/JS, and Wix Studio sites are built in its editor. So the site is rebuilt in Wix Studio to match the old one, with Webflow animations recreated using Wix animations or custom code. See [docs/plan.md](docs/plan.md).

## Repo layout

| Path | What's inside |
| --- | --- |
| [docs/plan.md](docs/plan.md) | Phases, the zero-downtime switch, decisions |
| [docs/site-audit.md](docs/site-audit.md) | What the old site has, what's wrong with it, and the fix for each |
| [docs/animation-inventory.md](docs/animation-inventory.md) | Every Webflow animation and how it will be rebuilt |
| [data/url-inventory.csv](data/url-inventory.csv) | Every live URL found by crawling the old site |
| [data/catalog-mapping.csv](data/catalog-mapping.csv) | Old artwork names → corrected names |
| [data/redirects.csv](data/redirects.csv) | Old URL → new URL, for 301 redirects on Wix |
| [scripts/](scripts) | Crawler, redirect builder, animation lister, screenshot capture |

## Scripts

```bash
python -I scripts/crawl.py https://www.ayobanton.com > data/url-inventory.csv
python -I scripts/build-redirects.py > data/redirects.csv
node scripts/list-animations.js path/to/export/js/webflow.js
```

Content (artwork, text, photography) © Ayo Banton. Not licensed for reuse.
