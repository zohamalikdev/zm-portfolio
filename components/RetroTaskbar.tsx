"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";


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



const QUICK_LAUNCH = [
  { id: "show-desktop", title: "Show Desktop", href: "#hero" as const, icon: "/projects/start.png" },
];

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** XP-ish pill button base */
function xpButtonBase() {
  return [
    "h-[30px]",
    "flex items-center gap-2",
    "rounded-[6px]",
    "px-2",
    "text-[13px]",
    "select-none",
    "border",
    "border-white/40",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.18)]",
  ].join(" ");
}

function xpTaskInactive() {
  return [
    xpButtonBase(),
    "bg-gradient-to-b from-[#6aa7ff] to-[#2d74ff]",
    "hover:from-[#7db2ff] hover:to-[#3a7fff]",
    "text-white",
  ].join(" ");
}

function xpTaskActive() {
  return [
    xpButtonBase(),
    "bg-gradient-to-b from-[#ffe78a] to-[#f0b100]",
    "text-[#1b2a4a]",
    "border-white/60",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(0,0,0,0.25)]",
  ].join(" ");
}

export default function XpTaskbar() {
  const [time, setTime] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(TASKS[0]?.id ?? null);

  // IMPORTANT: this must wrap BOTH the start button and the start menu
  const startRef = useRef<HTMLDivElement | null>(null);

  const activeTask = useMemo(
    () => TASKS.find((t) => t.id === activeTaskId) ?? null,
    [activeTaskId]
  );

  // clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // close Start menu on outside click + ESC
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!startRef.current) return;
      if (!startRef.current.contains(e.target as Node)) setStartOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStartOpen(false);
    };

    if (startOpen) {
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [startOpen]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[9999]">
      <div className="h-10 px-2 flex items-center gap-2 bg-gradient-to-b from-[#3b7dff] via-[#1f67ff] to-[#0b49d6] border-t border-white/40 shadow-[0_-1px_0_rgba(0,0,0,0.15)]">
        {/* START + MENU */}
        <div ref={startRef} className="relative shrink-0">
          {/* XP Start pill (fixed, no overlap inside) */}
          <button
            onClick={() => setStartOpen((v) => !v)}
            className={[
              "h-8 w-[170px] shrink-0",
              "relative overflow-hidden",
              "rounded-full",
              "bg-gradient-to-b from-[#55d14a] to-[#1f9b1a]",
              "border border-white/35",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_0_rgba(0,0,0,0.15)]",
              "active:translate-y-[1px]",
            ].join(" ")}
            aria-expanded={startOpen}
            aria-controls="start-menu"
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 grid place-items-center">
              <Image src="/windows/start.png" alt="" width={18} height={18} priority />
            </span>

            <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm tracking-wide lowercase font-bold italic text-white">
              start
            </span>
          </button>

          {startOpen && (
            <div
              id="start-menu"
              className="absolute bottom-11 left-0 z-[10000] w-[340px] rounded-[10px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
            >
              {/* blue header */}
              <div className="bg-gradient-to-b from-[#2b66ff] to-[#0c3db7] px-3 py-3 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center border border-white/30">
                  <span className="text-sm font-black">Z</span>
                </div>
                <div className="leading-tight">
                  <div className="font-bold">ZOHA_OS</div>
                  <div className="text-xs opacity-90">User</div>
                </div>
              </div>

              {/* menu body */}
              <div className="bg-[#f3f3f3]">
                <div className="grid grid-cols-2">
                  {/* left apps */}
                  <div className="p-2 border-r border-black/10">
                    {TASKS.map((t) => (
                      <a
                        key={t.id}
                        href={t.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTaskId(t.id);
                          setStartOpen(false);
                          scrollToHash(t.href);
                        }}
                        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff]"
                      >
                        <Image
                          src={t.icon}
                          alt=""
                          width={18}
                          height={18}
                          className="shrink-0 pixelated"
                        />
                        <span className="text-[13px] text-[#111]">{t.title}</span>
                      </a>
                    ))}
                  </div>

                  {/* right system */}
                  <div className="p-2 bg-[#eaf2ff]">
                    <button
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff] text-[13px]"
                      onClick={() => setStartOpen(false)}
                    >
                      <span className="w-5 text-center">⚙️</span>
                      Control Panel
                    </button>

                    <button
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#dbe9ff] text-[13px]"
                      onClick={() => setStartOpen(false)}
                    >
                      <span className="w-5 text-center">🔍</span>
                      Search
                    </button>

                    <div className="my-2 h-px bg-black/10" />

                    <button
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#ffd8d8] text-[13px]"
                      onClick={() => setStartOpen(false)}
                    >
                      <span className="w-5 text-center">⏻</span>
                      Turn Off Computer
                    </button>
                  </div>
                </div>

                <div className="h-2 bg-gradient-to-b from-white/60 to-transparent" />
              </div>
            </div>
          )}
        </div>

        {/* separator (XP-ish) */}
        <div className="w-[1px] h-7 bg-white/35 mx-1 shrink-0" />
        <div className="w-[1px] h-7 bg-black/20 -ml-1 mr-1 shrink-0" />

        {/* QUICK LAUNCH */}
        <div className="flex items-center gap-1 px-1 shrink-0">
          {QUICK_LAUNCH.map((q) => (
            <a
              key={q.id}
              href={q.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveTaskId(q.href.replace("#", ""));
                scrollToHash(q.href);
              }}
              title={q.title}
              className={[
                "w-9 h-9 rounded-md grid place-items-center",
                "bg-white/10 hover:bg-white/20",
                "border border-white/15",
              ].join(" ")}
            >
              <Image src={q.icon} alt="" width={18} height={18} className="pixelated" />
            </a>
          ))}
        </div>

        {/* TASK BUTTONS */}
        {/* min-w-0 makes this region shrink/scroll instead of pushing into Start */}
        <div className="flex-1 min-w-0 flex gap-2 overflow-x-auto px-1">
          {TASKS.map((task) => {
            const isActive = activeTaskId === task.id;

            return (
              <a
                key={task.id}
                href={task.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTaskId((prev) => (prev === task.id ? null : task.id));
                  scrollToHash(task.href);
                }}
                className={[
                  "min-w-[120px] max-w-[200px] shrink-0",
                  isActive ? xpTaskActive() : xpTaskInactive(),
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Image
                  src={task.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0 pixelated"
                />
                <span className="truncate">{task.title}</span>
              </a>
            );
          })}
        </div>


        

        {/* TRAY */}
        <div className="h-9 flex items-center gap-2 px-3 rounded-1-[12px] bg-gradient-to-b from-[#7ed2ff] to-[#2aa7ff] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] shrink-0">
          <Image src="/projects/volume.png" alt="" width={16} height={16} className="pixelated" />
          <Image src="/projects/wifi.png" alt="" width={16} height={16} className="pixelated" />
          <span className="text-[13px] text-white tabular-nums drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
            {time}
          </span>
        </div>
      </div>

      <span className="sr-only">Active: {activeTask?.title ?? "none"}</span>
    </footer>
  );
}