# Zoha Malik — Portfolio

A portfolio site styled as a Windows XP desktop — an interactive "operating system" you navigate to explore my work, skills, and experience, instead of a standard scrolling page.

**Live:** [zohamalik.dev](https://zohamalik-six.vercel.app)
**Repo:** [github.com/zohamalikdev/zm-portfolio](https://github.com/zohamalikdev/zm-portfolio)

---

## Overview

Each section of the site — About, Projects, Resume, Contact — is rendered as an authentic-feeling retro window: title bars, menu bars, an MS Paint-style toolbox, beveled 3D borders, a taskbar with a working Start menu, and popup "applications" for deeper content (Skills, Tech Stack, Status, Career Timeline).

## Features

- **Windows XP-style UI** — title bars, menu bars, taskbar, and MS Paint window chrome, shared across all sections via a single reusable component
- **Interactive desktop files** — click to select, click again (or double-click) to open, matching real desktop-icon conventions on both mouse and touch
- **Popup windows** — modal "applications" for Skills, Tech Stack, Current Status, and Career Timeline, each registered with a taskbar so open windows are reflected live
- **Typewriter intro** — the About section types itself out on scroll-into-view
- **Retro sound effects** — click/open/close feedback via the Web Audio API
- **Framer Motion animations** — scroll-triggered reveals, hover lift, and popup enter/exit transitions
- **Responsive** — mobile layout intentionally differs from desktop (e.g., the tool panel sidebar is hidden on small screens rather than squeezed in)

## Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Drag interaction:** react-draggable
- **Audio:** Web Audio API

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── MsPaintWindow.tsx        # Shared Paint-style window chrome
│   ├── RetroWindow.tsx          # Generic retro window frame
│   ├── PopupWindow.tsx          # Draggable modal popup
│   ├── WindowManagerContext.tsx # Tracks open popups for the taskbar
│   ├── Taskbar.tsx
│   ├── TypeWriter.tsx
│   ├── Sound.ts
│   ├── EnhancedCursor.tsx
│   ├── AboutWindow.tsx
│   ├── WorkSection.tsx
│   ├── ResumeWindow.tsx
│   └── ContactForm.tsx
│   ├── WelcomeModal.tsx
│   ├── ScrollScrub.tsx
│   ├── Magentic.tsx
│   ├── useScrollScrew.tsx
│   ├── Reveal.tsx
    
│
└── public/
    ├── projects/                # Screenshots and icons
    └── sounds/                  # Retro sound effects
```

> Structure above reflects the current component set — update this if you reorganize folders later.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/zohamalikdev/zm-portfolio.git
cd zm-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm run start
```

## Key Components

**`MsPaintWindow`** — the shared Paint-style chrome used by every section:

```tsx
<MsPaintWindow
  title="about_me.bmp - Paint"
  statusText="Section loaded"
  showToolPanel={false}
>
  {/* section content */}
</MsPaintWindow>
```

**`PopupWindow`** — a draggable modal that auto-registers with the taskbar while open:

```tsx
<PopupWindow id="skills" title="Skills.exe" onClose={() => setActive(null)}>
  {/* popup content */}
</PopupWindow>
```

**Sound effects:**

```tsx
import { playClick, playOpen, playClose } from "@/components/Sound";
```

## Deployment

Deployed on [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel
```

## Roadmap / Known Gaps

- Contact form currently simulates submission — needs a real backend (API route, Formspree, or similar) wired in
- Performance and accessibility haven't been formally audited yet (Lighthouse, WCAG) — TODO before calling this production-polished
- Some desktop icons still use placeholder art pending final assets

## Contact

- **Email:** zohamalik.dev@gmail.com
- **LinkedIn:** [linkedin.com/in/zohamalik-](https://linkedin.com/in/zohamalik-/)
- **GitHub:** [@zohamalikdev](https://github.com/zohamalikdev)

---

*Built with Next.js, Tailwind CSS, and Framer Motion.*
