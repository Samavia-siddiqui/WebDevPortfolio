# Design System & Architecture Master Document

## 1. Project Overview
- **Client/Profile:** Samavia Siddiqui
- **Role:** Full Stack Developer (React, Node.js, Express, MongoDB)
- **Location:** Karachi, Pakistan
- **Target Audience:** Business owners looking to hire a reliable developer
- **Stack:** React.js (JavaScript ONLY, no TypeScript, no .tsx), Vite, Tailwind CSS, Framer Motion, `@fontsource/inter` (static weights 400, 500, 700, 900), `lucide-react` (generic icons only; inline SVGs for brand logos).

---

## 2. Color Palette & Theming (Hybrid System)
The portfolio uses a deliberate hybrid theme to balance impact and readability across sections:

| Category | Token / Class | Hex Code | Purpose / Context |
| :--- | :--- | :--- | :--- |
| **Dark Theme** | `bg-dark` / `text-light` | `#0A0A0B` (bg) / `#FAF8F5` (text) | Hero, Process, Footer |
| **Dark Surfaces** | `bg-dark-surface`, `bg-dark-subtle` | `#121214`, `#18181B` (zinc-900) | Dark cards, pills, interactive backgrounds |
| **Dark Borders** | `border-dark-border` | `#27272A` (zinc-800) | Subtle borders on dark surfaces |
| **Light Theme** | `bg-light` / `text-dark` | `#FAF8F5` (bg) / `#0A0A0B` (text) | Services, Why Me, Work, Pricing, About, FAQ, Contact |
| **Light Surfaces** | `bg-light-surface`, `bg-light-subtle` | `#F4F0EA`, `#EDE8E1` | Light cards, row hovers, accordion panels |
| **Light Borders** | `border-light-border` | `#E2DBD0` | Subtle borders and dividers on light surfaces |
| **Solo Accent** | `text-accent`, `bg-accent` | `#FF8C00` (Safety Orange) | **ONLY accent color**: Eyebrows, active borders, arrow circles, scroll progress, cursor dot, primary CTA buttons |

*Strict constraints:* No secondary accent colors, no gradients, no neon glow, no heavy blur/glassmorphism.

---

## 3. Typography & Heading Treatment
- **Font Family:** Inter (`@fontsource/inter` static weights: 400, 500, 700, 900). No variable font to avoid inner glyph stroke overlap artifacts.
- **Section Headings (Two-Line Rule):**
  - Line 1: Solid fill, font-black (900), uppercase.
  - Line 2: Outline only: `color: transparent; -webkit-text-stroke: 1.5px currentColor; paint-order: stroke fill`.
  - Responsive scaling using `clamp()` (e.g. `clamp(2rem, 5vw + 1rem, 4.5rem)`). Never overflows at 375px.
- **Eyebrow Labels:** `text-xs font-black uppercase tracking-widest text-accent` with wide letter-spacing (`0.2em`).
- **Body Text:** `text-base` / `text-lg` with high contrast (`#0A0A0B` on light, `#FAF8F5` or zinc-400 on dark).

---

## 4. Spacing, Grid & Layout
- **Containers:** `max-w-7xl mx-auto px-6 md:px-8`
- **Section Padding:** `py-20` on mobile, `py-28` on desktop.
- **Layout Principle:** Bespoke asymmetric layouts, avoid repetitive 3-equal-card SaaS patterns.

---

## 5. Motion Principles (Framer Motion Only)
- **Shared Easing:** `[0.16, 1, 0.3, 1]`
- **Durations:** `0.5s` to `0.9s`
- **Property Safety:** Animate **only `transform` and `opacity`** (never trigger reflows via width/height/top/left).
- **Viewport Reveals:** `whileInView` with `viewport={{ once: true, amount: 0.2 }}`, 30px upward slide + fade, children staggered in 100ms intervals.
- **Global Extras:**
  - Thin orange scroll-progress bar at the top of the viewport.
  - Custom orange cursor dot on desktop with expansion on interactive elements (`@media (hover: hover) and (pointer: fine)` only; disabled on touch devices).
- **Accessibility:** Full `prefers-reduced-motion` support: transforms disabled, motion values flattened, immediate or subtle fades only.

---

## 6. Project Structure & Architecture
```
src/
├── assets/         # Local images & avatar (avatar.png)
├── components/     # Reusable components (Navbar, Lightbox, Cursor, Button, WhatsAppFloat)
├── data/           # Strict single source of truth (no hardcoded data in components)
│   ├── projects.js # 5 to 15 project objects with types: mern, landing, frontend
│   ├── services.js # 3 core service offerings
│   ├── why.js      # 3 asymmetric value pillars
│   ├── pricing.js  # PKR / USD pricing tiers with deliverables
│   └── faq.js      # 5 client FAQs
├── sections/       # Section components built sequentially
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── WhyMe.jsx
│   ├── Work.jsx    # 3D circular gallery with local scroll rotation
│   ├── Process.jsx # Sticky scroll with animated timeline
│   ├── Pricing.jsx # PKR / USD toggle
│   ├── About.jsx   # Avatar + rotating ring + bio
│   ├── FAQ.jsx     # Accordion with AnimatePresence
│   ├── Contact.jsx # Formspree tabs + direct contact info
│   └── Footer.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 7. Section Execution Order
1. **Navbar** (Floating pill, hide on scroll down, mobile hamburger, orange scroll bar)
2. **Hero** (Dark, word-by-word reveal, honest stats from `projects.length`, subtle glow figure, tech marquee)
3. **Services** (Light, alternating slide-in rows, upward black fill hover, project type preselection link)
4. **Why Me** (Light, asymmetric 3-point layout)
5. **Selected Work** (Light, 3D circular gallery driven by section-local scroll, offer-carousel cards, lightbox)
6. **Process** (Dark, sticky scroll 5-step reveal, vertical drawing orange line)
7. **Pricing** (Light, PKR/USD toggle, dominant Standard tier, scoping details)
8. **About** (Light, circular avatar, rotating thin orange ring, bio)
9. **FAQ** (Light, 2-column layout, numbered expandable accordion)
10. **Contact** (Light, Formspree form tab + WhatsApp tab, animated labels, preselected dropdown)
11. **Footer** (Dark, large text reveal, social links, back-to-top button)
12. **Floating WhatsApp Button** (Fixed bottom-right, hides when Contact section is in view)
