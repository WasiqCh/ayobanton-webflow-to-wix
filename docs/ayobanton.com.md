# Design Map

Source: https://www.ayobanton.com (Home and About, 1440×900, captured 25 Oct 2026). Machine-readable copy: [ayobanton.com.json](ayobanton.com.json).

## Spacing Scale
- Values: 5, 10, 15, 20, 30, 60, 100, 150, 180px (base unit 5px)
- Section padding: 150px top and bottom
- Most frequent: 5px (25 uses), 30px (11), 20px (4), 150px (4)

## Font Hierarchy
- Family: Big Shoulders Display (Google Fonts, OFL). 300–700 loaded; 400 and 600 used
- 216px / 600 / uppercase / -6px tracking: hero name "AYO BANTON"
- 144px / 600 / uppercase / line-height 1.0: page and section titles (h1, h2)
- 48px / 400 / uppercase: section titles such as "Follow my journey"
- 24px / 400 / uppercase / line-height 36px: project names (h3)
- 22.4px / 400 / line-height 1.4 / 0.5px tracking: intro and lead paragraphs
- 20px / 400 / line-height 31.36px / 0.25px tracking: nav (uppercase) and body

## Color Palette
- `#090909`: page background (82% of painted surface)
- `#FFFFFF`: primary text, nav, icons, rule under the nav
- `#FFFFFF99` (white at 60%): secondary text; also the unlit state of the scroll text fill
- `#C39C5D` (gold): signature line only
- `#090909D9` / `#09090973`: dark overlays (hero bottom fade, nav backdrop)
- `#35353599`: muted dark grey (template token, rarely visible)

## Image Ratios
- Hero: full-bleed, the height of the viewport
- Project and artwork thumbnails: 3:4 portrait, object-fit cover, ~310px wide on desktop

## Component Tokens
- Border radius: 0 everywhere
- Shadows: `0 2px 20px rgba(0,0,0,.2)` on thumbnails (12 uses); `15px -15px 10px rgba(0,0,0,.4)` (1 use)
- Container: 95% of the viewport (1354px at 1440), single column, centred
- Nav: 71px tall, links left, TikTok and Instagram icons right, 1px white rule underneath; each link holds its label twice, for the text-roll hover
- Breakpoints: 991px, 767px, 479px
- Accessibility: `:focus-visible` styles present; no `prefers-reduced-motion` handling

## Wix Studio theme mapping
| Wix setting | Value |
| --- | --- |
| Site background | `#090909` |
| Colour: primary text | `#FFFFFF` |
| Colour: secondary text | `#FFFFFF` at 60% opacity |
| Colour: accent | `#C39C5D` |
| Font (upload) | Big Shoulders Display 400 and 600 (OFL) |
| Heading 1 | 144px / 600 / uppercase / line-height 1.0 |
| Heading 2 | 144px / 600 / uppercase / line-height 1.0 |
| Heading 3 | 24px / 400 / uppercase / line-height 1.5 |
| Heading 4 | 48px / 400 / uppercase |
| Paragraph 1 | 22.4px / 400 / line-height 1.4 / 0.5px tracking |
| Paragraph 2 | 20px / 400 / line-height 1.57 / 0.25px tracking |
| Breakpoints | Desktop > 991px, tablet 768–991px, mobile < 768px (479px adjustments in code) |

---

# Taste DNA

### One condensed face for everything
- **Trigger**: When choosing type for a portfolio that mixes a 216px name, poster headings and long artist statements
- **Decision**: Big Shoulders Display alone, in 2 weights (400, 600), over a display face paired with a separate body face
- **Reason**: Condensed uppercase reads like exhibition wall lettering, so the whole site sounds like one curator's voice instead of a template
- **Evidence**: All 137 sampled text elements use one family; only 400 and 600 are used although 300–700 are loaded

### The wall stays black so the art supplies the colour
- **Trigger**: When deciding how much brand colour to put around saturated floral photographs
- **Decision**: A near-black `#090909` field, white text, and one gold accent used once, over a coloured palette, cards or tinted panels
- **Reason**: In a gallery the wall recedes. The reds of Brutiful and the blues of Kind of Blue stay the only colour on screen
- **Evidence**: `#090909` covers 82.4% of the painted surface; gold `#C39C5D` is on 1 element; 0 radii; 0 card containers; secondary text is white at 60%, not a grey

### Poster scale, then quiet reading
- **Trigger**: When building hierarchy between headings and text
- **Decision**: Extreme jumps (216px and 144px display against 20–24px text, about 7:1) over a gradual scale with mid-size headings
- **Reason**: Each section opens like a poster title, then drops to a calm reading size, so the visitor always knows where a new room begins
- **Evidence**: Sizes used are 216, 144, 48, 24, 22.4 and 20px; nothing between 48px and 144px; 144px headings sit at line-height 1.0

### One work at a time, slow procession
- **Trigger**: When listing the four series on the home page
- **Decision**: A single centred column of portrait thumbnails with 150px section padding and scroll reveals, over a 2–4 column card grid
- **Reason**: Seeing one series at a time is like walking past framed works; a grid would turn the art into products to compare
- **Evidence**: 0 CSS grids on the home page; 3:4 thumbnails about 310px wide (21% of a 1440px viewport); 150px section padding; reveal and scale-on-scroll animation on every thumbnail
