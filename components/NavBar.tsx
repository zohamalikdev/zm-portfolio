"use client";

import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <nav className="fixed top-8 right-8 z-50">
      <div className="flex items-center gap-2 px-2 py-2 rounded-full border-2 border-white/20 backdrop-blur-md bg-black/40 hover:border-white/40 transition-all duration-300">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full text-xs tracking-[0.1em] font-bold uppercase transition-all duration-300 relative ${
              activeIndex === index
                ? "text-black bg-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}