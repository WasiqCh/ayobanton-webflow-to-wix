# Animation inventory

Source: the Webflow export's `js/webflow.js` (Webflow Interactions, "IX2") plus custom GSAP code in each page's footer. Generated with `node scripts/list-animations.js <path-to-webflow.js>`.

**Total:** 29 Webflow animations wired to 41 triggers, plus 1 custom GSAP effect (defined site-wide, unused on the live site).

The goal is an identical result on Wix. "Native" means Wix Studio's built-in animations; "Code" means Velo or custom code. The approach column is a plan, to be confirmed by tests in Phase 2.

## Hover effects

| Animation | Trigger | Timing | Planned approach |
| --- | --- | --- | --- |
| Button text moves (3 variants) | Hover in / out | 300 ms, ease | Native hover, check easing |
| Image link moves | Hover in / out | 300 ms, ease | Native hover |
| Primary button hover (size + text colour) | Hover in / out | 300–500 ms, outCubic | Native hover |
| Project thumbnail hover | Hover in / out | 500 ms, outQuad | Native hover |
| Store thumbnail hover | Hover in / out | 500 ms, outQuad | Native hover |
| Blog thumbnail hover | Hover in / out | 500 ms, outQuad | Not needed (blog dropped) |

## Plays once when scrolled into view

| Animation | Trigger | Timing | Planned approach |
| --- | --- | --- | --- |
| Image revealed (scale + fade + move) | Scroll into view, 4 places | 500–1000 ms, easeInOut | Native entrance, or Velo timeline if timing is off |
| Separator line in | Scroll into view, 2 places | 500–2000 ms | Native entrance |
| Show separator | Scroll into view | 500–1000 ms, easeInOut | Native entrance |

## Linked to scroll position

| Animation | Where | Planned approach |
| --- | --- | --- |
| Hero section (tablet and up): fade + move + scale | Home hero | Code |
| Hero section (mobile): fade + move + size | Home hero | Code |
| Store thumbnails slide right to left while scrolling (desktop) | Store section | Code |
| White text colour fills in while scrolling | Text section | Code |
| Project thumbnails scale as they come into view | Projects | Native scroll effect, or code |

## Follows the cursor

| Animation | Planned approach |
| --- | --- |
| Image moves with the cursor (2 places) | Code |
| Background mask moves with the cursor | Code |

## Other

| Animation | Trigger | Planned approach |
| --- | --- | --- |
| Logos marquee | Page load, 20 s loop | Native if available, else code |
| Hamburger icon open / close | Menu open, close, click | Native menu, or code |
| Letter-by-letter button text (custom GSAP 3.12.5, `anm-stagger-btn` attributes) | Hover | Code. **Correction:** the script is on every page but no live element uses it. The new Contact page uses it on its Send Message button |

## Third-party libraries on the live pages

| Library | Version | Used for |
| --- | --- | --- |
| GSAP | 3.12.5 | Letter-by-letter button hover |
| SplitType | 0.3.4 | Splitting text into letters for the GSAP effect |
| jQuery Ripples | 0.6.3 | Water-ripple effect on `.blue-bg` sections (About, Projects) |
| Webflow runtime (IX2) | site build | All 29 Webflow animations |

## Update: coded frontend (25 Oct 2026)

The frontend is now built in code (see [plan.md](plan.md)), so all of the above runs **unchanged**: the original Webflow runtime and libraries are served with the pages. On Home, About, Projects and the 4 series pages, scroll reveals, scroll-linked effects and the nav text-roll hover were verified locally, with no script errors. Desktop renders pixel-identical to the live site.

## Trade-off to remember

Everything marked "Code" looks identical, but it can't be adjusted in the Wix editor. Changing its timing later means editing code.

## New animations (Contact page)

Built in the same style with GSAP and SplitType, using transform and opacity only, and switched off for visitors who prefer reduced motion:

| Animation | Trigger |
| --- | --- |
| Portrait rises into its frame and settles | Page load |
| Title letters slide up out of their line | Page load |
| Rule above the contact details draws in from the left | Scroll into view |
| Intro, details and form fields fade up in reading order | Scroll into view |
| Letter-by-letter "Send Message" button | Hover |
