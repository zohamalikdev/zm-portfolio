"use client";

import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Introduction", href: "#about", number: "01" },
  { label: "Work", href: "#work", number: "02" },
  { label: "Resume", href: "#resume", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
];

export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed right-8 md:right-16 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-8">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group flex items-center gap-4 transition-all duration-300"
          >
            {/* Number */}
            <div className="text-right">
              <div className="text-xs text-white/40 group-hover:text-white/70 transition-colors duration-300 font-bold tracking-widest">
                {item.number}
              </div>
            </div>

            {/* Line and Label */}
            <div className="relative flex items-center gap-3">
              <div
                className={`h-px bg-gradient-to-r from-white to-transparent transition-all duration-300 ${
                  hoveredIndex === index ? "w-12" : "w-6"
                }`}
              />
              <span
                className={`text-xs tracking-[0.15em] font-bold uppercase transition-all duration-300 ${
                  hoveredIndex === index
                    ? "text-white opacity-100"
                    : "text-white/50 opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
}