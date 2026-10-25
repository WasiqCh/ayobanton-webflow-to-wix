# Animation inventory

Source: the Webflow export's `js/webflow.js` (Webflow Interactions, "IX2") plus custom GSAP code in each page's footer. Generated with `node scripts/list-animations.js <path-to-webflow.js>`.

**Total:** 29 Webflow animations wired to 41 triggers, plus 1 custom GSAP effect used site-wide.

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
| Letter-by-letter button text (custom GSAP 3.12.5, `anm-stagger-btn` attributes) | Hover, every page | Code |

## Trade-off to remember

Everything marked "Code" looks identical, but it can't be adjusted in the Wix editor. Changing its timing later means editing code.
