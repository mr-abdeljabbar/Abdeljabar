# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `app/` directory:

```bash
cd app
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # TypeScript check + Vite production build → app/dist/
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

There are no tests in this project.

## Deployment

The app is deployed via **CapRover** using Docker. The `captain-definition` file points to `Dockerfile`, which:
1. Builds the React app in a Node 20 Alpine container
2. Copies `app/dist/` into an Nginx Alpine image
3. Uses `nginx.conf` for serving (handles SPA routing, trailing-slash redirects, static asset caching)

Push to `master` triggers a CapRover redeploy.

## Architecture

**Single-page React app** (React 19, TypeScript, Vite) with client-side routing via `react-router-dom`.

### Path alias
`@/` resolves to `app/src/` — use this for all internal imports.

### Routing (`App.tsx`)
All pages are **lazy-loaded**. Routes: `/`, `/about`, `/projects`, `/domains`, `/contact`, `/start-project`, `/payment-success`.

### Data location
There is **no backend or API**. All content is hardcoded as arrays in the page files:
- Projects list → `src/pages/Projects.tsx` (`projects` array)
- Domains list → `src/pages/Domains.tsx` (`domains` array)

To add/edit a project or domain, edit those arrays directly.

### Component layers
- `src/components/layout/` — `Navbar` (fixed, scroll-aware, mobile menu)
- `src/components/sections/` — `AboutSection` (used on Home + About), `PageHeader` (reusable page hero)
- `src/components/cards/` — `ProjectCard`, `DomainCard`
- `src/components/ui/` — shadcn/ui primitives (Button, Input, Textarea, Badge)

### Styling
Tailwind CSS with a dark zinc-950 base palette. Emerald (`emerald-500`) is the primary accent, blue as secondary. Animations use **Framer Motion** (`motion.*`, `AnimatePresence`).

The `gradient-text` utility class is defined in `App.css` / `index.css`.

### Contact form
Handled by **Formspree** (`https://formspree.io/f/xreapdog`) — no backend needed.

### Images
Project screenshots live in `app/public/images/`. Reference them as `/images/filename.png` in code.
