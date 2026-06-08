# Lumisk Technology — Portfolio Site

Personal portfolio site for Adithya J., full-stack developer based in Sri Lanka.
Brand: **Lumisk Technology** · Logo mark: **Lumisk°** · Live at: **lumisktechnology.com**

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 18 (JSX) + Vite 5 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 + custom CSS (`src/style.css`) |
| 3D / WebGL | Three.js · React Three Fiber · OGL |
| Physics | Matter.js (FallingText) |
| Post-processing | `postprocessing` package |
| Deploy | GitHub Actions → FTP → `/lumisktechnology.com/` |

---

## Dev commands

```bash
npm run dev       # Vite dev server on :3500
npm run build     # Production build → dist/
npm run preview   # Preview the dist/ build
```

---

## Project structure

```
src/
├── App.jsx               # Route definitions
├── main.jsx              # React root, BrowserRouter
├── index.css             # Tailwind directives only
├── style.css             # ALL custom styles (single source of truth)
│
├── pages/
│   ├── Home.jsx          # Hero + "What I do" + Selected work + CTA
│   ├── About.jsx         # Bio, skills, stats, experience
│   ├── Services.jsx      # Services grid, process, tech stack, pricing
│   ├── Work.jsx          # Work card grid
│   ├── Projects.jsx      # Filterable projects grid + case-study modal
│   └── Contact.jsx       # Contact form + info
│
├── components/
│   ├── Layout.jsx        # Wraps all pages (Nav + Footer + WebGL bg)
│   ├── Nav.jsx           # Fixed nav, scramble hover, mobile overlay
│   ├── Footer.jsx        # Footer with links + socials
│   ├── Loader.jsx        # Full-screen cinematic loader; adds body.loaded
│   ├── Cursor.jsx        # Custom dot + ring cursor (hidden on mobile)
│   ├── WebGLBackground.jsx # Fixed full-screen WebGL canvas (z-index:0)
│   ├── HeroParticles.jsx # Canvas particle system — home hero
│   ├── WorkCardCanvas.jsx# R3F canvas per work card (sceneIndex prop)
│   ├── Antigravity.jsx   # Particle hero — Work page
│   ├── Galaxy.jsx        # Star-field hero — Services page
│   ├── Hyperspeed.jsx    # Speed-lines hero — Contact page
│   ├── Lightfall.jsx     # Light-fall backdrop component
│   ├── FallingText.jsx   # Matter.js physics text — About page
│   ├── ProfileCard.jsx   # 3D tilt card with glow — About page
│   ├── ElectricBorder.jsx# Animated electric border wrapper
│   ├── LetterGlitch.jsx  # Glitch text effect component
│   └── WhatsAppFloat.jsx # Floating WhatsApp button
│
├── hooks/
│   ├── useReveal.js      # IntersectionObserver scroll reveal (.reveal → .in)
│   ├── useMagnetic.js    # Magnetic hover effect on [data-magnetic] elements
│   ├── useStatCounter.js # Animated number counter
│   └── useCardTilt.js    # 3D tilt on mouse move
│
└── data/
    └── projects.js       # Projects data array for Projects page
```

---

## Design system

All tokens live in `src/style.css` under `:root`.

```css
--bg:      #050505          /* page background */
--fg:      #fff             /* primary text */
--muted:   rgba(255,255,255,.42)  /* secondary text */
--faint:   rgba(255,255,255,.16)  /* very dim text / borders */
--line:    rgba(255,255,255,.08)  /* divider lines */
--accent:  #6d5cff          /* purple — primary accent */
--accent2: #00d4ff          /* cyan — secondary accent */
--display: 'Syne', sans-serif    /* headings / display */
--body:    'Sora', sans-serif    /* body copy */
```

**Typography rules:**
- Headings: `Syne` weight 800, `letter-spacing: -.03em`, `line-height: .92–.95`
- Body: `Sora` weight 300, `line-height: 1.9`
- Labels / eyebrows: `font-size: 12px; letter-spacing: .3em; text-transform: uppercase`
- Nav links (desktop): `font-size: 12px; letter-spacing: .14em; text-transform: uppercase`

**z-index layers:**

| z | Element |
|---|---|
| 0 | `#webgl` — WebGL background canvas |
| 1 | `#orbs` — ambient glow orbs |
| 2 | `#grain` — film grain overlay |
| 3 | `.content` — page content |
| 100 | `nav` |
| 200 | `.nav-links` overlay (mobile) |
| 201 | `.menu-btn` (mobile) |
| 1000 | `.modal-backdrop` |
| 9999 | `#cursor`, `#cursor-ring`, `#progress-bar` |

---

## Responsive breakpoints

| Breakpoint | Target |
|---|---|
| `max-width: 1024px` | Projects grid: 3 → 2 columns |
| `max-width: 900px` | Pricing grid: 4 → 2 columns |
| `max-width: 820px` | Main mobile layout; nav becomes full-screen overlay |
| `max-width: 680px` | Projects modal adjustments |
| `max-width: 600px` | Pricing grid: 2 → 1 column |
| `max-width: 480px` | Small phones (iPhone SE); hero CTA stacks, tighter padding |

On mobile (`≤820px`):
- Custom cursor hidden; `body { cursor: auto }`
- `nav { mix-blend-mode: normal }` (desktop uses `difference`)
- Nav overlay: full-screen, `Syne 700`, `clamp(24px, 6.5vw, 38px)`, `color: rgba(255,255,255,.65)`
- All interactive elements: `cursor: pointer`

---

## Key patterns

### Adding a new page
1. Create `src/pages/NewPage.jsx` using the `.page` / `.page-head` / `.section` class structure
2. Add a route in `src/App.jsx`
3. Add a link in `src/components/Nav.jsx` (links array)
4. Add to `sitemap.xml` and `public/sitemap.xml`

### Scroll reveal
Wrap sections in `<div className="reveal">` — the `useReveal` hook adds `.in` when in view. Use `.reveal.in .child` in CSS for staggered animation.

### Scramble text effect
Add `data-scramble` attribute to any element. On Home.jsx the effect fires after `body.loaded`; on Nav.jsx it fires on `mouseEnter`.

### Magnetic buttons
Add `data-magnetic` to any `<a>` or `<button>`. The `useMagnetic` hook handles the cursor attraction.

### ElectricBorder
Wrap a card with `<ElectricBorder>` for the animated border glow on hover (used on Projects page).

---

## Contact / personal info

| Field | Value |
|---|---|
| Email | hello@lumisktechnology.com |
| Phone | +94 77 324 3784 |
| WhatsApp | https://wa.me/94773243784 |
| Location | Sri Lanka |
| GitHub | https://github.com/sahan-j |
| LinkedIn | https://www.linkedin.com/in/sahan-j/ |

---

## Deploy

**GitHub Actions** (`.github/workflows/deploy.yml`):
- Trigger: push to `main`
- Node 18 → `npm install` → `npm run build`
- FTP deploy `dist/` → `/lumisktechnology.com/`
- Secrets required: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

**GitHub repo:** https://github.com/sahan-j/Lumisk-Technology

---

## Domain

`DOMAIN=lumisktechnology.com`

All canonical URLs, `og:url`, schema.org `url`, sitemap, and robots.txt point to `https://lumisktechnology.com`.
