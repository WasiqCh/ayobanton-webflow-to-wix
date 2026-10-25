# Migration plan

## Starting point (checked 25 Oct 2026)

| Piece | Where it is today |
| --- | --- |
| Live site | Webflow (Ecommerce plan), serving `www.ayobanton.com` and the bare domain |
| Domain registration and DNS | Wix (Wix nameservers `ns4/ns5.wixdns.net`) |
| Email (`info@`) | Google Workspace, through MX records in Wix DNS |
| Old Wix site | "Ayo Banton Digital", Wix Studio, 2021, has a paid plan and the domain attached, but DNS points away from it |
| New Wix site | Blank Wix Studio site created 25 Oct 2026 on a free preview URL |

## Phases

| Phase | Goal | Done when |
| --- | --- | --- |
| 0. Alignment and inventory | Know exactly what exists | URL inventory, redirect map, content export, baseline screenshots, animation list, repo and issues |
| 1. Content decisions | Lock the content before building | Catalog names and options, enquiry button copy, Contact page content approved |
| 2. Build | Rebuild every page in Wix Studio on the preview URL | All pages, CMS catalog, enquiry form, animations, 404, hidden style guide |
| 3. Parity QA | Prove the new site matches | Side-by-side screenshots at 3 widths, links, forms, SEO tags, redirects, accessibility; client sign-off |
| 4. Switch | Point the domain at the new site | Plan and domain moved, HTTPS working, email checked, redirects live, sitemap submitted |
| 5. Aftercare | Safety net, then clean up | 1–2 weeks without issues, then Webflow cancelled |

## Zero-downtime switch

Both sites stay live throughout, so there's never a moment when nothing answers.

1. Two days before: lower the TTL (how long DNS answers are cached) on the website records.
2. Save a copy of every DNS record, especially the 5 Google MX records.
3. At a quiet hour: complete the headless migration on "Ayo Banton Digital" (it keeps its plan and domain), then point the domain's website records at Wix.
4. Check right away: HTTPS padlock on `www` and the bare domain, MX records unchanged, a test email delivered, redirects working.
5. For 24–48 h, some visitors may still reach Webflow while DNS caches expire. Both sites work, so that's fine.
6. Rollback: point the website records back at Webflow (minutes). Webflow stays paid until aftercare ends.

**Don't** click "Try Again" on the domain warning in the Wix dashboard before switch day. It would point the domain at the 2021 site.

## Decisions log

| Date | Decision | Why |
| --- | --- | --- |
| 25 Oct 2026 | Rebuild in a fresh Wix Studio site; keep the 2021 site as an archive; move the plan and domain on switch day | Free preview URL for client review, no leftover apps, the paid plan is reused |
| 25 Oct 2026 | Store becomes a CMS catalog with an enquiry form, not Wix Stores | No prices are shown, and Wix Stores is built around checkout |
| 25 Oct 2026 | Artwork names follow the new gallery shop; 5 extra works stay until the client decides | The old names were template placeholders |
| 25 Oct 2026 | Enquiries go to the site owner's own inbox, with the artwork, size and finish pre-filled | The old buttons emailed an outside address |
| 25 Oct 2026 | Utility pages: keep the style guide as a hidden, noindex page; drop the template's licenses, changelog and instructions pages (licenses recorded below) | Design reference for future work |
| 25 Oct 2026 | Blog dropped | All 6 posts are unpublished template placeholders |
| 25 Oct 2026 | Animations recreated identically, using code where Wix's built-in effects can't match | Client wants an identical feel |
| 25 Oct 2026 | Custom code verified on the free Wix plan: a test snippet runs on the preview URL | Coded animations can be tested before the switch |
| 25 Oct 2026 | Public repo with no client images, emails or private data | The client hasn't approved publishing their materials |
| 25 Oct 2026 | **Changed:** build the frontend in code and attach it to the existing "Ayo Banton Digital" site through Wix's headless migration ("Moving your site to a custom frontend"), instead of rebuilding in the Studio editor | The Studio editor can't be driven reliably by automation. The client won't edit layouts. Wix keeps the site's plan, domain and data, and offers "Switch back". Animations stay identical |
| 25 Oct 2026 | The frontend source lives in a separate **private** repo | It is built on a purchased Webflow template |
| 25 Oct 2026 | The blank Studio site created earlier is no longer needed | Delete only with the owner's approval |

## Licenses carried over

| Asset | Source | License |
| --- | --- | --- |
| Font: Big Shoulders Display (300–700) | Google Fonts | SIL Open Font License, free for commercial use, so it can be uploaded to Wix |
| Icons | Iconify | Per-icon set licenses (template credit) |
| Template stock images | Lummi.ai | Not carried over: the new site uses only the artist's own work |
