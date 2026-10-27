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
| 25 Oct 2026 | Headless migration started on "Ayo Banton Digital" (preview only; live site untouched) | Wix created a separate deploy site for the preview; "Complete Migration" is the only step that switches anything |
| 25 Oct 2026 | Artwork photos moved to the site's Wix Media; smaller sizes use Wix's on-the-fly resizing | Webflow's CDN stops serving once Webflow is cancelled |
| 25 Oct 2026 | Frontend runs as a Wix Astro project, not a plain static upload | Wix's static hosting only serves `/about/`, while the site's existing links and Google's index use `/about`. One Astro route serves each page unchanged at its clean URL |
| 25 Oct 2026 | Local patch for a Windows path bug in `@wix/astro-wix-hosting-adapter` 3.0.4 | `wix build` fails on Windows without it; the patch only makes a path root-relative |
| 25 Oct 2026 | Artworks live in a Wix CMS collection ("Artworks") read by the store pages at request time | The owner edits names, images, text, sizes and finishes in the dashboard with no code change or rebuild |
| 25 Oct 2026 | Enquiries go to a Wix Forms form ("Artwork enquiry") through a small server endpoint | Submissions appear in the Wix dashboard and notify the owner; artwork, size and finish arrive pre-filled |
| 25 Oct 2026 | Product descriptions come from the new gallery shop; the 5 extra works use their series' text until the client sends their own | The old descriptions described the retired lightbox/giclée formats |
| 25 Oct 2026 | Old product URLs redirect from the CMS (`oldSlug`), and retired store pages redirect to `/store`; `/checkout` is Wix's own reserved page and can't redirect | Keeps search rankings and old links working |
| 25 Oct 2026 | Room-setting photos from the client go on product pages (switchable views, with the lit shot shown when the Lightbox finish is picked) and as a hover reveal on store cards; Home and the series pages stay identical | Room shots show scale and the finishes where buying decisions happen, without changing the pages that must match the old site |
| 25 Oct 2026 | Room photos live in two new Artworks CMS fields ("Room photos" gallery, "Room photo (Lightbox finish)") and in Wix Media | The owner can add or swap shots in the dashboard without code |
| 25 Oct 2026 | 28 of 29 room photos matched to 25 artworks; Chroma & Flora I and III, Floral Cyanotype I and IV, and Constellations have none and show only the artwork; "Golden Hour 2" is not in the catalog and waits for the client | Mapped from the photos' old Webflow names (see data/room-photo-mapping.csv) |
| 25 Oct 2026 | Contact portrait: the client's new photo with its background removed locally (rembg with the BiRefNet model, mask only, full 3000×3690 resolution) | The spotlight needs a cut-out; a local model keeps the photo private and never alters its colour pixels |
| 25 Oct 2026 | Contact spotlight in the site's gold, reworked from the prototype the client liked; the cycling words and counter are dropped | The prototype's pink and violet clash with the black-and-gold site |
| 25 Oct 2026 | Store-card room-photo hover removed; room photos stay on product pages | Owner did not like it on the store grid |
| 25 Oct 2026 | Every gold button uses the letter-by-letter hover | One button style, one behaviour |
| 25 Oct 2026 | Store page: the second copy of the header that the live Webflow page has after its footer is dropped | It lay on top of the real header, blocked the Contact link and doubled the menu animations |
| 25 Oct 2026 | Contact page gets Studio (London), Bespoke work and Orders details from the new gallery shop; the email stays info@ayobanton.com until the client confirms (the shop shows studio@ayobanton.com) | Open question for the client; the shop's "calculated at checkout" became "confirmed with your quote" because this site has no checkout |
| 25 Oct 2026 | Sitemap served at /sitemap-pages.xml; on switch day add it in Google Search Console and as a Sitemap line in the Wix robots.txt editor | Wix reserves /sitemap.xml and builds it from its page registry, which is empty because the pages come from one catch-all route |
| 25 Oct 2026 | Hidden style guide at /style-guide (noindex, not in menu or sitemap); the template's "Light Grey" swatch, which shows the gold accent, is labelled Gold | Design reference for future work |
| 25 Oct 2026 | Product image column pinned to the live site's width (396px at 1440) | The template sized it by squeezing it against the old descriptions; the new, shorter ones made it twice as wide |
| 25 Oct 2026 | Before/after screenshots use Webflow originals and local copies in place of Wix Media images (capture-baseline.mjs --media-fallback) | static.wixstatic.com is blocked on the capturing network except in the owner's Chrome |
| 27 Oct 2026 | Form notifications also email info@ayobanton.com (two custom Wix automations copying Wix's own, submitter excluded); Wix's originals keep emailing the Wix login, ayobanton21@gmail.com | The client watches info@ but sorts mail from his Wix login; the app-made notifications only email the account owner |
| 27 Oct 2026 | Floral Cyanotype I-IV and Chroma & Flora III and V hidden from the store (CMS visible = false) | Client: mostly sold; 1/1 replacements to follow |

## Licenses carried over

| Asset | Source | License |
| --- | --- | --- |
| Font: Big Shoulders Display (300–700) | Google Fonts | SIL Open Font License, free for commercial use, so it can be uploaded to Wix |
| Icons | Iconify | Per-icon set licenses (template credit) |
| Template stock images | Lummi.ai | Not carried over: the new site uses only the artist's own work |
