# Zoha Malik — Portfolio

A Windows XP-inspired portfolio built with Next.js, where the entire website behaves like a retro desktop operating system. Instead of navigating a traditional scrolling portfolio, visitors interact with desktop icons, application windows, a functional taskbar, and classic Windows-inspired UI to explore my projects, skills, resume, and contact information.

**Live:** https://zohamalik-six.vercel.app  
**Repository:** https://github.com/zoha-malik01/zm-portfolio
---

## Overview

This project recreates the experience of using a classic Windows XP desktop while showcasing my work as a software developer. Every section opens inside a reusable retro window, complete with authentic UI elements such as title bars, menu bars, beveled borders, desktop icons, a functional Start Menu, and draggable popup applications.

The goal was to combine nostalgia with modern web development practices while maintaining responsive performance and reusable component architecture.

---

## Features

- **Windows XP Desktop Experience** — complete desktop interface with taskbar, Start Menu, desktop icons, and classic window styling.
- **Reusable Window System** — every section is rendered through a shared retro window component for consistency.
- **Interactive Desktop Navigation** — desktop icons support single-click selection and double-click opening, similar to the original Windows desktop.
- **Popup Applications** — Skills, Technology Stack, Career Timeline, and Status are displayed as independent draggable windows.
- **MS Paint Inspired Contact Form** — custom-designed contact section with EmailJS integration and WhatsApp contact support.
- **Live Email Delivery** — messages are delivered directly through EmailJS without requiring a backend server.
- **Animated Typewriter Introduction** — About section reveals itself with a typewriter animation.
- **Retro Sound Effects** — interface interactions include authentic click, open, close, typing, and success sounds using the Web Audio API.
- **Animated Cursor Companion** — includes a Neko desktop companion that follows the user's cursor across the screen.
- **Smooth Motion Effects** — page transitions and window animations powered by Framer Motion.
- **Fully Responsive** — optimized layouts for desktop, tablet, and mobile devices while preserving the retro interface.

---

## Tech Stack

### Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

### Animation & Interaction

- Framer Motion
- react-draggable
- Web Audio API

### Services

- EmailJS
- Vercel Deployment

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── RetroWindow.tsx
│   ├── PopupWindow.tsx
│   ├── WindowManagerContext.tsx
│   ├── XpTaskbar.tsx
│   ├── Desktop.tsx
│   ├── ContactForm.tsx
│   ├── ResumeWindow.tsx
│   ├── AboutWindow.tsx
│   ├── WorkSection.tsx
│   ├── TypeWriter.tsx
│   ├── Sound.ts
│   ├── Reveal.tsx
│   ├── Neko.tsx
│   ├── WelcomeModal.tsx
│   └── ...
│
└── public/
    ├── projects/
    ├── windows/
    ├── sounds/
    └── sprites/
```

> The structure above reflects the current implementation and may evolve as new features are added.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

Clone the repository:

```bash
git clone https://github.com/zohamalikdev/zm-portfolio.git

cd zm-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

To create a production build:

```bash
npm run build

npm start
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id

NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id

NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These variables are required for the contact form to send emails through EmailJS.

---

## Key Components

### `RetroWindow`

Shared window component responsible for rendering the Windows XP interface.

```tsx
<RetroWindow
  title="about_me.txt"
  icon="/projects/notepad.png"
  statusText="Ready"
>
  {/* Content */}
</RetroWindow>
```

---

### `PopupWindow`

Reusable draggable popup window that automatically registers itself with the taskbar.

```tsx
<PopupWindow
    id="skills"
    title="Skills.exe"
    onClose={() => setActive(null)}
>
    {/* Window Content */}
</PopupWindow>
```

---

### `Sound`

Retro interface sound effects.

```tsx
import {
  playClick,
  playHover,
  playOpen,
  playClose,
  playSuccess
} from "@/components/Sound";
```

---

### `Neko`

Animated desktop companion that follows the user's cursor.

```tsx
<Neko />
```

---

## Deployment

The application is deployed on **Vercel**.

```bash
npm install -g vercel

vercel
```

For EmailJS to function correctly in production, configure the required environment variables in the Vercel Project Settings.

---

## Future Improvements

- Desktop context menu
- Window minimize and maximize functionality
- Draggable desktop icons
- Browser-based terminal application
- Additional retro desktop applications
- Performance optimization and accessibility improvements
- Dark mode inspired by Windows XP Royale Theme

---

## Contact

**Email**  
zohamalik.dev@gmail.com

**LinkedIn**  
https://linkedin.com/in/zohamalik-

**GitHub**  
https://github.com/zohamalik-01

-
*Built with Next.js, Tailwind CSS, and Framer Motion.*
