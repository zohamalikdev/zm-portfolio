"use client";

import { useState } from "react";
import { playClick, playHover, playOpen } from "@/components/Sound";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "HOME", href: "#hero" },
    { label: "WORK", href: "#work" },
    { label: "RESUME", href: "#resume" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playOpen(); // Play folder/window open sound for core navigation sections
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-[200] bg-gray-300 border-b-4 border-black shadow-md relative">
      <div className="flex items-center justify-between px-3 py-1.5">
        {/* System branding — plain, no nested border box */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 border border-black" />
          <span className="font-bold text-m tracking-wide">ZOHA_OS</span>
        </div>

        {/* Nav — styled like menu bar items */}
        <nav className="hidden md:flex gap-1 font-bold text-m">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={playHover} // 🔊 Hover sound effect
              onClick={(e) => handleLinkClick(e, link.href)} // 🔊 Open sound effect
              className="px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors duration-100 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>



        {/* Hire-me, styled like a raised button */}
        <a
          href="#contact"
          onMouseEnter={playHover} // 🔊 Hover sound effect
          onClick={(e) => {
            e.preventDefault();
            playClick(); // 🔊 Click button sound effect
            const el = document.querySelector("#contact");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="hidden md:block px-3 py-1 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white text-m font-bold hover:bg-gray-200 transition-colors duration-100 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white cursor-pointer"
        >
          HIRE ME
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            playClick();
            setMenuOpen(!menuOpen);
          }}
          className="md:hidden w-9 h-9 flex items-center justify-center bg-gray-300 border-2 border-gray-500 border-t-white border-l-white font-bold active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
        >
          ☰
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full right-3 mt-2 w-52 bg-gray-300 border-2 border-black shadow-xl overflow-hidden transition-all duration-200 ${menuOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
          }`}
      >

      </div>


    </header>
  );
}