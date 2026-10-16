# CHICHA'S — Link in Bio

A mobile-first link-in-bio site for **CHICHA'S, Indian Street Food & Boba** in St. Augustine, Florida.
Built to turn Instagram and WhatsApp traffic into customers: the menu is the first and loudest action,
followed by Instagram, the WhatsApp community, directions, the address and live opening hours.

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · lucide-react. No other runtime dependencies.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run assets` | Regenerate every logo/icon/social image from `chichasLogo.jpeg` |
| `npm run check:hours` | Verify the open/closed logic, including both DST switches |

---

## Where the content lives

**`src/data/site.ts` is the single source of truth** for links, address, opening hours, headline and
logo paths. Change the business details there — not in the components.

Opening hours are stored twice on purpose, and both must stay in sync:

* `schedule` — machine-readable minutes, used for the live **Open now / Closed** badge.
* `hourGroups` — the two human-readable rows rendered on the card.

After editing, run `npm run check:hours`.

## Theming

Light and dark are driven entirely by CSS custom properties in `src/index.css`
(`:root` / `[data-theme='dark']`), surfaced to Tailwind as semantic colours (`bg-surface`,
`text-ink`, `text-accent-deep`, …). To restyle the site, change the tokens, not the components.

* First visit follows the device's `prefers-color-scheme`.
* The visitor's explicit choice is stored in `localStorage` under `chichas-theme`.
* A tiny inline script in `index.html` applies the theme before first paint, so there is no flash.
* While no explicit choice has been made, the site keeps following the OS setting live.

## Brand assets

The master logo is `chichasLogo.jpeg` in the repo root. Everything in `public/images/` is generated
from it by `scripts/generate-logo-assets.py`:

* `chichas-logo-{240,320,480,640,928}.{webp,jpg}` — responsive hero logo (WebP with JPEG fallback).
* `chichas-mark-{96,192}.png` — rounded header/footer mark.
* `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `favicon*.png`, `favicon.ico`.
* `og-image.jpg` — 1200×630 social preview.

The script also repairs two defects in the master file: a 1px white strip along the top edge and a
stray circle artifact near the top-left corner. The artwork itself is never redrawn or restretched —
the logo is only ever scaled proportionally. The full, uncropped logo is what the page displays; the
centred emblem crop is used **only** for icons at 48px and below, where the full badge is unreadable.

**Replacing the logo:** drop a new square image in as `chichasLogo.jpeg`, adjust `EMBLEM_BOX` /
`ARTIFACT_BOX` at the top of the script if needed, then run `npm run assets` and rebuild. Pillow is
the only requirement (`python3 -m pip install Pillow`).

---

## Deploying to Vercel

**From the dashboard:** push this repo to GitHub, then *New Project → Import*. Vercel detects Vite;
confirm the settings and deploy.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Node version | 18 or newer |

**From the CLI:**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

The site is fully static — no environment variables or server runtime required.

### One thing to do after the first deploy

Open Graph images must be absolute URLs. In `index.html`, replace:

```html
<meta property="og:image" content="/images/og-image.jpg" />
```

with your real domain, e.g. `https://chichas.vercel.app/images/og-image.jpg`, and redeploy. Until then
the page title and description still preview correctly; only the image may not render in some apps.
Validate with the [Facebook sharing debugger](https://developers.facebook.com/tools/debug/).

---

## Notes and deliberate decisions

* **The menu links to the supplied Google Drive folder** rather than embedding a PDF. The folder
  currently holds one file (`CHICHAS MENU.pdf`), but hardcoding that file's ID would break the page
  the first time the menu is replaced or a second file is added. The folder link always works. If you
  later want an in-page preview, swap the `menu` link for
  `https://drive.google.com/file/d/<FILE_ID>/preview` in an iframe — and remember to update it
  whenever the menu file changes.
* **Nothing is invented.** No phone number, ordering link, delivery partner, prices, menu items,
  ratings or review counts appear anywhere, because none were supplied.
* **The live status is computed in the restaurant's own time zone** (`America/New_York`) through the
  `Intl` time-zone database, so it is correct from any visitor's device and across daylight saving. If
  a browser cannot resolve the zone, the badge is hidden rather than guessed. The card states that
  hours may vary on holidays.
* **No emojis** are used anywhere in the interface; all icons are `lucide-react` or official brand SVGs.
* Decorative line art is original SVG, positioned only in the outer margins at very low contrast.
* **Ambient motion** is defined as keyframes near the top of `src/index.css` and applied through the
  `.animate-*` classes: `breathe` (the saffron wash, 28s), `mote-rise` (drifting spice motes, 18-27s),
  `sway` / `pendulum` / `turn` (the sprig, chilli, hanging skimmer and star anise), plus `swash-sheen`
  and `ink-pop` on the headline underline. All of it is transform/opacity only, and the
  `prefers-reduced-motion` block at the end of the same file disables every one of them — verified in
  Chrome with `--force-prefers-reduced-motion`, where the page renders in its finished state.
