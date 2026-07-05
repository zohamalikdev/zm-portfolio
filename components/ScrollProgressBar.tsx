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
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-white z-[999] transition-opacity duration-300"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
        }}
      />
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-2 hidden md:flex">
          <div className="text-white/60 text-xs tracking-widest font-bold">
            {Math.round(progress)}%
          </div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
        </div>
      )}
    </>
  );
}