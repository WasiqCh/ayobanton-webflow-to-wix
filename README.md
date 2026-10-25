# ayobanton.com: Webflow → Wix migration

A documented, zero-downtime move of [ayobanton.com](https://www.ayobanton.com), a fine-art photography portfolio and print store, from Webflow to Wix. The site keeps the same domain, the same content and the same animations, and gets a refreshed store.

This repo holds the plan, the audit of the old site, the URL and redirect maps, the animation inventory, and the scripts used along the way. It deliberately contains **no client images, email addresses or private data**. Those live in a local `private/` folder that is git-ignored.

## Status

| Phase | What | Status |
| --- | --- | --- |
| 0 | Alignment and inventory | Done |
| 1 | Content decisions (catalog, enquiry copy, Contact page) | Not started |
| 2 | Build the coded frontend (private repo), preview on Wix | In progress: every page on the Wix preview (incl. new Contact page with the gold spotlight portrait, 404, and "in a room" views on the store and product pages); hidden style guide to do |
| 3 | Parity QA: screenshots, links, SEO, accessibility | Not started |
| 4 | Domain switch | Not started |
| 5 | Aftercare, then cancel Webflow | Not started |

Progress is tracked in [GitHub Issues](../../issues), with one milestone per phase.

## How the site moves

Wix can't import a Webflow site into its editor. Instead, the pages are kept as code (HTML, CSS and the original animation scripts) and attached to the client's existing Wix site as a **headless frontend**. Wix's "Moving your site to a custom frontend" feature does this while keeping the site's plan, domain and data, and it can switch back. Wix runs the backend (CMS, forms, domain, SEO), so content stays editable in the Wix dashboard. The frontend source is in a separate private repo because it is built on a purchased template. See [docs/plan.md](docs/plan.md).

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
node scripts/capture-baseline.mjs https://www.ayobanton.com private/baseline   # needs the playwright package
```

Content (artwork, text, photography) © Ayo Banton. Not licensed for reuse.
