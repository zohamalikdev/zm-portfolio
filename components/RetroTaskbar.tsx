"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { playClick, playHover, playOpen, playClose } from "@/components/Sound";

type Task = {
  id: string;
  title: string;
  href: `#${string}`;
  icon: string;
};

const TASKS: Task[] = [
  { id: "hero", title: "My Portfolio", href: "#hero", icon: "/projects/folder.png" },
  { id: "about", title: "About.txt", href: "#about", icon: "/projects/notepad.png" },
  { id: "work", title: "Projects", href: "#work", icon: "/projects/project.png" },
  { id: "resume", title: "Resume.pdf", href: "#resume", icon: "/projects/pdf.png" },
  { id: "contact", title: "Contact.exe", href: "#contact", icon: "/projects/mail.png" },
];

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function XpTaskbar() {
  const [time, setTime] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(TASKS[0]?.id ?? null);
  const startRef = useRef<HTMLDivElement | null>(null);

  const activeTask = useMemo(
    () => TASKS.find((t) => t.id === activeTaskId) ?? null,
    [activeTaskId]
  );

  // Live System Clock Tracker
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global Context Closures (Click Outside + Escape Key)
  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    const handleKeyboardEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStartOpen(false);
    };

    if (startOpen) {
      window.addEventListener("mousedown", handleOutsideInteraction);
      window.addEventListener("keydown", handleKeyboardEscape);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideInteraction);
      window.removeEventListener("keydown", handleKeyboardEscape);
    };
  }, [startOpen]);

  // Unified dynamic styles for Task Tabs with explicit cursor pointer fallback
  const baseTabClass = "h-[30px] flex items-center gap-2 rounded-[6px] px-2 text-[13px] select-none border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-all duration-100 min-w-[120px] max-w-[200px] shrink-0 cursor-pointer";
  const inactiveTabClass = `${baseTabClass} bg-gradient-to-b from-[#6aa7ff] to-[#2d74ff] hover:from-[#7db2ff] hover:to-[#3a7fff] text-white`;
  const activeTabClass = `${baseTabClass} bg-gradient-to-b from-[#ffe78a] to-[#f0b100] text-[#1b2a4a] border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(0,0,0,0.25)]`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* THE SHUTDOWN OVERLAY SCREEN */}
      {isShutDown && (
        <div 
          className="fixed inset-0 bg-black z-[100000] flex flex-col items-center justify-center pointer-events-auto cursor-default select-none animate-fade-in"
          style={{ animationDuration: '1.5s' }}
        >
          <div className="text-center font-mono text-[#e4a010] text-sm md:text-base px-6 space-y-4">
            <p className="tracking-widest uppercase text-gray-500">ZohaOS v1.0.4</p>
            <p className="text-xl font-bold text-gray-200">It is now safe to turn off your computer.</p>
            <button 
              onClick={() => { playOpen(); setIsShutDown(false); }} 
              className="mt-8 text-xs text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded hover:bg-blue-500/10 transition-all active:scale-95 cursor-pointer"
            >
               Reboot System
            </button>
          </div>
        </div>
      )}

      {/* Main Bar Wrapper - Catches pointer events for custom interactions */}
      <div className="h-10 px-2 flex items-center gap-2 pointer-events-auto bg-gradient-to-b from-[#3b7dff] via-[#1f67ff] to-[#0b49d6] border-t border-white/40 shadow-[0_-1px_0_rgba(0,0,0,0.15)]">
        
        {/* START ANCHOR & DROPDOWN ENGINE */}
        <div ref={startRef} className="relative shrink-0">
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setStartOpen((v) => !v);
            }}
            className="h-8 w-[170px] shrink-0 relative overflow-hidden rounded-full bg-gradient-to-b from-[#55d14a] to-[#1f9b1a] border border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_0_rgba(0,0,0,0.15)] active:translate-y-[1px] cursor-pointer"
            aria-expanded={startOpen}
            aria-controls="start-menu"
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 grid place-items-center">
              <Image src="/projects/start.png" alt="" width={18} height={18} priority />
            </span>
            <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm tracking-wide lowercase font-bold italic text-white select-none">
              start
            </span>
          </button>

          {startOpen && (
            <div
              id="start-menu"
              className="absolute bottom-11 left-0 z-[10000] w-[340px] rounded-[10px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
            >
              {/* Profile Bar Header */}
              <div className="bg-gradient-to-b from-[#2b66ff] to-[#0c3db7] px-3 py-3 text-white flex items-center gap-3 select-none">
                <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center border border-white/30">
                  <span className="text-sm font-black">Z</span>
                </div>
                <div className="leading-tight">
                  <div className="font-bold">ZOHA_OS</div>
                  <div className="text-xs opacity-90">User</div>
                </div>
              </div>

              {/* Menu Workspace Matrix */}
              <div className="bg-[#f3f3f3] grid grid-cols-2">
                {/* Left Panel: Primary Application Routes */}
                <div className="p-2 border-r border-black/10">
                  {TASKS.map((t) => (
                    <a
                      key={t.id}
                      href={t.href}
                      onMouseEnter={playHover}
                      onClick={(e) => {
                        e.preventDefault();
                        playOpen();
                        setActiveTaskId(t.id);
                        setStartOpen(false);
                        scrollToHash(t.href);
                      }}
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff] transition-colors duration-100 cursor-pointer"
                    >
                      <Image src={t.icon} alt="" width={18} height={18} className="shrink-0 pixelated" />
                      <span className="text-[13px] text-[#111] font-medium">{t.title}</span>
                    </a>
                  ))}
                </div>

                {/* Right Panel: Integrated System Configuration Links */}
                <div className="p-2 bg-[#eaf2ff] flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <button
                      onMouseEnter={playHover}
                      onClick={() => { playClick(); setStartOpen(false); }}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff] text-[13px] text-gray-800 text-left transition-colors duration-100 cursor-pointer"
                    >
                      <Image src="/projects/control-panel.png" alt="" width={16} height={16} className="pixelated shrink-0" />
                      <span>Control Panel</span>
                    </button>
                    <button
                      onMouseEnter={playHover}
                      onClick={() => { playClick(); setStartOpen(false); }}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff] text-[13px] text-gray-800 text-left transition-colors duration-100 cursor-pointer"
                    >
                      <Image src="/projects/search.png" alt="" width={16} height={16} className="pixelated shrink-0" />
                      <span>Search</span>
                    </button>
                  </div>

                  <div>
                    <div className="my-2 h-px bg-black/10" />
                    <button
                      onMouseEnter={playHover}
                      onClick={() => { 
                        playClose(); 
                        setStartOpen(false);
                        setIsShutDown(true);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#ffd8d8] text-[13px] font-bold text-red-700 text-left transition-colors duration-100 cursor-pointer"
                    >
                      <Image src="/projects/turn-off.png" alt="" width={16} height={16} className="pixelated shrink-0" />
                      <span>Turn Off Computer</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-b from-white/60 to-transparent bg-[#f3f3f3]" />
            </div>
          )}
        </div>

        {/* Vintage Aesthetic Splitters */}
        <div className="w-[1px] h-7 bg-white/35 mx-1 shrink-0" />
        <div className="w-[1px] h-7 bg-black/20 -ml-1 mr-1 shrink-0" />

        {/* ACTIVE TASKS CHANNEL */}
        <div className="flex-1 min-w-0 flex gap-2 overflow-x-auto px-1 scrollbar-none">
          {TASKS.map((task) => {
            const isActive = activeTaskId === task.id;
            return (
              <a
                key={task.id}
                href={task.href}
                onMouseEnter={playHover}
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  setActiveTaskId((prev) => (prev === task.id ? null : task.id));
                  scrollToHash(task.href);
                }}
                className={isActive ? activeTabClass : inactiveTabClass}
                aria-current={isActive ? "page" : undefined}
              >
                <Image src={task.icon} alt="" width={16} height={16} className="shrink-0 pixelated" />
                <span className="truncate">{task.title}</span>
              </a>
            );
          })}
        </div>

        {/* HARDWARE SYSTEM TRAY */}
        <div className="h-9 flex items-center gap-2 px-3 rounded-l-[12px] bg-gradient-to-b from-[#7ed2ff] to-[#2aa7ff] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] shrink-0 select-none">
          <Image src="/projects/volume.png" alt="" width={16} height={16} className="pixelated" />
          <Image src="/projects/wifi.png" alt="" width={16} height={16} className="pixelated" />
          <span className="text-[13px] font-medium text-white tabular-nums drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
            {time}
          </span>
        </div>
      </div>

      <span className="sr-only">Active Workspace Frame: {activeTask?.title ?? "none"}</span>
    </footer>
  );
}