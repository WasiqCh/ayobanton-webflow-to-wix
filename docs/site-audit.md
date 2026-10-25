# Audit of the old site (Webflow)

Checked 25 Oct 2026 by crawling the live site, reading the Webflow CMS through its API, and reading the code export.

## What exists

| Area | Count | Notes |
| --- | --- | --- |
| Static pages | Home, About, Projects, Store, 404 | Plus a password page and 4 template utility pages (drafts) |
| Projects (series) | 4 published, 2 drafts | Into Dust, Kind of Blue, Luminous Bones, Brutiful. Drafts are template placeholders |
| Store categories | 4 | One per series, each with its own page at `/category/<series>` |
| Products | 30 | Webflow Ecommerce, 2 formats each (lightbox, fine art print) |
| Blog posts | 6 | All unpublished template filler, so the blog is dropped |
| Live URLs | 42 | See [data/url-inventory.csv](../data/url-inventory.csv) |
| Animations | 29 + 1 custom | See [animation-inventory.md](animation-inventory.md) |
| Font | Big Shoulders Display | Google Font, 300–700 |
| Colour tokens | black `#090909`, white `#fff`, gold `#c39c5d`, grey text `#fff9`, dark grey `#35353599` | From the template's CSS variables |

## Problems found

| # | Problem | Fix on Wix |
| --- | --- | --- |
| 1 | The footer on every page links to the template seller ("Buy now for $99", "See more by …") | Removed |
| 2 | Store and product "Contact & Buy" buttons email an address outside the business, with an internal subject line | Enquiry form sent to the owner's inbox |
| 3 | A hidden error message on product pages contains the template author's email address | Not carried over |
| 4 | 25 of 30 products use template placeholder names | Renamed: [data/catalog-mapping.csv](../data/catalog-mapping.csv) |
| 5 | Every product shows £2,750, and both formats are £2,750 and £7,000 for every product, including the 9 Kind of Blue works whose edition notes give other prices | Prices removed; enquiry instead |
| 6 | Checkout, PayPal checkout and order confirmation pages are public but unused | Redirected to `/store` |
| 7 | No `sitemap.xml` | Wix generates one; submit to Google Search Console |
| 8 | No SPF record; DMARC in monitor-only mode | Add SPF for Google Workspace; tighten DMARC later |
| 9 | No Contact page | New Contact page |
| 10 | The mobile menu markup contains the template's placeholder artist name | Not carried over (visibility to be confirmed from screenshots) |
| 11 | The Luminous Bones project page has no summary or description | Content needed from the client |

## Open content question

Kind of Blue edition details in the CMS differ from the new gallery shop:

| Works | Current edition note | New shop |
| --- | --- | --- |
| Chroma & Flora I–IV (old "Frequency I–IV") | Unique 1/1, 30×40 cm | 4 sizes × 4 finishes |
| Chroma & Flora V, Floral Cyanotype I–IV (old "Frequency V", "Variation I–IV") | Limited edition of 3 + 1 AP | 4 sizes × 4 finishes |

A unique 1/1 work can't come in 4 sizes, so the client has to confirm which is right before the catalog is built.
