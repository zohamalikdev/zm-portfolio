"use client";
import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setIsVisible(scrollTop > 100); // Only show after scrolling down a bit
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-white z-[999] transition-opacity duration-300"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
        }}
      />

      {/* Bottom progress indicator with percentage */}
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-2 hidden md:flex">
          <div className="text-white/60 text-xs tracking-widest font-bold">
            {Math.round(progress)}%
          </div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
        </div>
      )}

      {/* Scroll position dots in right nav */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-[998] hidden xl:flex">
        {["Introduction", "Projects", "Resume", "Contact"].map((section, i) => (
          <div
            key={section}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              progress > (i * 25)
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/60"
            }`}
            title={section}
          />
        ))}
      </div>
    </>
  );
}