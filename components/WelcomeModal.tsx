"use client";

import { useEffect, useState } from "react";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Slight delay before popping in so it reads as an intentional "open",
  // not just content that was already there on load.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handleClose = () => {
    setOpen(false);
    // wait for the close transition to finish before unmounting
    setTimeout(() => setVisible(false), 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center p-4 transition-opacity duration-200 ${
        open ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`w-full max-w-lg bg-gray-300 border-4 border-black shadow-2xl transition-all duration-200 ease-out ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border-2 border-black" />
            <div className="w-4 h-4 bg-yellow-500 border-2 border-black" />
            <div className="w-4 h-4 bg-green-500 border-2 border-black" />
          </div>
          <span className="text-white font-bold text-sm tracking-wider">ZOHA_MALIK.EXE</span>
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="w-6 h-6 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white hover:bg-red-500 hover:text-white transition-colors duration-150 flex items-center justify-center text-xs font-bold active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-200 px-2 py-1 border-b-2 border-black flex gap-4 font-bold text-xs">
          {["File", "Edit", "View", "Help"].map((item) => (
            <button
              key={item}
              className="px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors duration-150 active:bg-blue-700"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white p-6 md:p-8 text-center">
         

          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            ZOHA MALIK
          </h1>

          <p className="text-base md:text-lg font-bold text-blue-700 mb-5">
            Full Stack Developer &amp; Designer
          </p>

          <p className="max-w-md mx-auto text-sm text-gray-700 leading-relaxed mb-7">
            I build clean, interactive web experiences — from database
            schema to pixel-level UI. Based in Multan, Pakistan, working
            remotely, open to full-time &amp; freelance work.
          </p>

          <a
            href="#work"
            onClick={handleClose}
            className="inline-block px-6 py-3 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white font-bold text-sm uppercase hover:bg-gray-200 transition-colors duration-150 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
          >
            ▶ View Projects
          </a>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-300 border-t-2 border-black px-4 py-2 flex justify-between items-center text-xs font-bold">
          <span>System ready</span>
          <div className="flex gap-4">
            <span>🔴 Secure</span>
            <span>🔵 Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
}