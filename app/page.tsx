"use client";

import { useEffect, useRef, useState } from "react";
import { WindowManagerProvider } from "@/components/WindowManagerContext";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import NavBar from "@/components/NavBar";
import EnhancedCursor from "@/components/EnhancedCursor";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import Projectslide from "@/components/ProjectsWindow";
import { useScrollSkew } from "@/components/useScrollSkew";
import Desktopsection from "@/components/Desktopsection";
import RetroTaskbar from "@/components/RetroTaskbar";
import RetroWindow from "@/components/RetroWindow";
import AboutWindow from "@/components/AboutWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import Resume from "@/components/ResumeWindow";
import TypeWriter from "@/components/TypeWriter";
import ContactForm from "@/components/ContactForm";


// 🔊 Import the specialized audio manager hooks
import { playClick, playStartup } from "@/components/Sound";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [typedText, setTypedText] = useState("");
  const [activeWindow, setActiveWindow] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  useScrollSkew(heroTitleRef);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const bootSequence = [
    "BOOTING ZOHA_OS...",
    "INITIALIZING DESIGN ENGINE...",
    "Loading Components...",
    "Connecting APIs...",
    "ACCESS GRANTED...",
  ];

  const heroText =
    "I build digital experiences that are clean, interactive, and impossible to ignore.";

  // TYPEWRITER EFFECT
  useEffect(() => {
    if (booting || entered) return;

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(heroText.slice(0, i));
      i++;

      if (i > heroText.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [booting, entered]);

  // BOOT ANIMATION (Fixed Condition & Audio Pre-Warmed)
  useEffect(() => {
    // Basic guard: Only run this lifecycle sequence when booting is true!
    if (!booting) return; 

    let i = 0;
    let desktopTimeout: NodeJS.Timeout;

    setBootLines([]);

    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootLines((prev) => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);

        // 🔊 Fire the startup audio right at the terminal climax
        playStartup();

        desktopTimeout = setTimeout(() => {
          setBooting(false);
          setEntered(true);
        }, 1200); // Gives them a second to experience the screen while audio plays
      }
    }, 700);

    return () => {
      clearInterval(interval);
      clearTimeout(desktopTimeout);
    };
  }, [booting]);

  // ================= BOOT SCREEN (Restored UI view) =================
  if (booting) {
    return (
      <main className="min-h-screen bg-black text-green-500 flex items-center justify-center crt boot-old">
        <div className="text-4xl tracking-wider space-y-3 font-pixel-font">
          {bootLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </main>
    );
  }

  // ================= LANDING PAGE =================
  if (!entered) {
    return (
      <main className="min-h-screen grid md:grid-cols-2 bg-white text-black">
        {/* LEFT HERO */}
        <div className="bg-black text-white p-10 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>ONLINE</span>
          </div>

          <div>
            <h1 className="text-[110px] leading-none font-black">
              JACK OF
              <br />
              ALL
              <br />
              TRADES.
            </h1>

            <p className="mt-6 text-2xl opacity-90">
              MASTER OF SOME.
              <br />
              LIMITED BY NONE.
            </p>
          </div>

          <p className="text-sm opacity-70">
            Full Stack • Designer • Creative Explorer
          </p>
        </div>

        {/* RIGHT INTRO */}
        <div className="flex flex-col justify-center px-16">
          <p className="tracking-widest">HELLO, I'M</p>

          <h1 className="text-7xl font-black mt-4">
            ZOHA
            <br />
            MALIK
          </h1>

          <p className="mt-8 text-xl min-h-[120px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <Magnetic>
            <button
              onClick={() => {
                playClick();
                
                // Silently request audio caching to bypass browser async restrictions
                const audioWarmup = new Audio("/sounds/boot.mp3");
                audioWarmup.load();

                setBootLines([]); 
                setBooting(true);
              }}
              className="mt-10 border-2 border-black px-8 py-3 w-fit hover:bg-black hover:text-white transition"
            >
              ENTER SYSTEM
            </button>
          </Magnetic>
        </div>
      </main>
    );
  }

  // ================= DESKTOP =================
  return (
    <WindowManagerProvider>
      <main className="relative bg-[url('/projects/windows.jpg')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen pb-16">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="relative z-10">
          <EnhancedCursor />
          <NavBar />
          <RetroTaskbar />
          <EnhancedHeroSection />
          <AboutWindow />
          <ProjectsWindow />
          <Resume />
          <ContactForm />
        </div>
      </main>
    </WindowManagerProvider>
  );
}