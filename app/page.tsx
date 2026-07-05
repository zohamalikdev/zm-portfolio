"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import NavBar from "@/components/NavBar";
import EnhancedCursor from "@/components/EnhancedCursor";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Splitrveal from "@/components/Splitrveal";
import StickySection from "@/components/StickySection";
import ScrollScrub from "@/components/ScrollScrub";
import Projectcard from "@/components/Projectcard";
import Projectslide from "@/components/Projectslide";
import { useScrollSkew } from "@/components/useScrollSkew";
import Marquee from "@/components/Marquee";
import Resume from "@/components/Resume";
import TypeWriter from "@/components/TypeWriter";
import ContactForm from "@/components/ContactForm";
import ClosingSection from "@/components/ClosingSection";

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
    "LOADING CREATIVE MODULE...",
    "CHECKING JACK OF ALL TRADES STATUS...",
    "ACCESS GRANTED.",
  ];

  const heroText =
    "I build digital experiences that are clean, interactive, and impossible to ignore.";

  // BOOT ANIMATION
  useEffect(() => {
    if (!booting) return;

    let i = 0;
    setBootLines([]);

    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, bootSequence[i]]);
      i++;

      if (i >= bootSequence.length) {
        clearInterval(interval);

        setTimeout(() => {
          setBooting(false);
          setEntered(true);
        }, 800);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [booting]);

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

  // ================= BOOT SCREEN =================
  if (booting) {
    return (
      <main className="min-h-screen bg-black text-green-500 flex items-center justify-center crt boot-old">
        <div className="text-4xl tracking-wider space-y-3">
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
              onClick={() => setBooting(true)}
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
    <main className="relative bg-black text-white font-display overflow-x-hidden cursor-none">
      <EnhancedCursor />
      <ScrollProgressBar /> 
      <NavBar />
      {/* ===== ENHANCED HERO SECTION ===== */}
      <EnhancedHeroSection />

      {/* ===== HERO 2 — photo intro ===== */}
      <StickySection zIndex={20} className="min-h-screen flex flex-col justify-between px-8 md:px-16 py-24 bg-black">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center flex-1">
          <ScrollScrub>
            <p className="font-mag-body text-lg md:text-xl text-white/60 mb-3">HELLO, I'M</p>
            <h2 className="text-[48px] md:text-[80px] font-display uppercase leading-[0.9]">
              ZOHA
              <br />
              MALIK
            </h2>
            <p className="font-mag-body text-base md:text-lg text-white/70 mt-6 max-w-md leading-relaxed">
              I don't just build software — I build experiences people remember.
              I'm a full stack developer and designer who moves fluidly between
              interface and infrastructure.
            </p>
          </ScrollScrub>

          <ScrollScrub>
            <div className="relative aspect-[4/5] border-4 border-white overflow-hidden">
              <Image
                src="/projects/hero.jpeg"
                alt="Zoha Malik"
                fill
                className="object-cover grayscale contrast-125"
              />
            </div>
          </ScrollScrub>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-8 border-t-4 border-white pt-6 font-mag-body text-sm text-white/70">
          <span>zohamalik.dev@gmail.com</span>
          <span>linkedin.com/in/zohamalik-/</span>
          <span>github.com/zohamalikdev</span>
        </div>
      </StickySection>

     
      {/* ===== ABOUT ===== */}
      <StickySection id="about" zIndex={30} className="bg-white text-black px-8 md:px-12 py-16 md:py-18 min-h-screen">
        <Marquee
          text="OPEN TO WORK — FULL STACK DEVELOPER — REMOTE READY —"
          className="text-black mb-16 border-y-4 border-black py-3 font-bold"
        />
 
        <div className="flex justify-between items-start mb-0 font-mag-body text-xs md:text-sm tracking-wide">
          <span className="eyebrow">[ 03 ] — THE BRIEF</span>
          <span className="opacity-60 text-right">
            ISSUE NO. 03
            <br />
            VOL. 01
          </span>
        </div>
 
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 border-t-4 border-black pt-12 mt-6">
          {/* ===== LEFT: MASTHEAD ===== */}
          <ScrollScrub>
            <h2 className="text-[48px] md:text-[80px] font-display leading-[0.95] uppercase">
              ABOUT
              <br />
              ME
            </h2>
 
            <p className="font-mag-body text-xs uppercase tracking-widest opacity-50 mt-6">
              Words by Zoha Malik
            </p>
 
            <p className="pixel-font text-2xl md:text-3xl mt-8 border-t-2 border-black/20 pt-6">
              <TypeWriter text="> full_stack_dev.designer()" />
            </p>
            <p className="pixel-font text-xl md:text-2xl opacity-60">
              <TypeWriter text="> based_in: multan, pk" speed={35} />
            </p>
          </ScrollScrub>
 
          {/* ===== RIGHT: MAGAZINE COPY ===== */}
          <ScrollScrub className="font-mag-body text-lg md:text-xl leading-relaxed text-black/80">
            <div className="md:columns-2 gap-10 [column-rule:2px_solid_rgba(0,0,0,0.15)]">
              <p className="mb-6 break-inside-avoid first-letter:font-display first-letter:text-6xl md:first-letter:text-7xl first-letter:float-left first-letter:leading-[0.75] first-letter:mr-3 first-letter:mt-1">
                I didn't start out writing code — I started out designing for
                freelance clients, learning to see layout, spacing, and
                hierarchy before I ever touched a terminal. That eye for
                design is still how I build everything today.
              </p>
              <p className="mb-6 break-inside-avoid">
                Somewhere along the way I got pulled into the other half of
                the stack — databases, APIs, the parts users never see but
                always feel. Now I move across both sides without really
                separating them; a good interface and a solid backend are
                the same problem to me, just viewed from different angles.
              </p>
            </div>
 
            <blockquote className="border-l-4 border-black pl-6 my-8 font-display uppercase text-2xl md:text-3xl leading-[1.05]">
              I care about the details most people skip.
            </blockquote>
           
          </ScrollScrub>
        </div>
      </StickySection>


     
      {/* ===== WORK — intro slide ===== */}
      <StickySection id="work" zIndex={40} className="bg-black text-white px-8 md:px-16 py-24 md:py-32 min-h-screen flex flex-col justify-center">
        <div className="flex justify-between items-start mb-12 font-mag-body text-xs md:text-sm tracking-wide">
          <span className="opacity-60">SELECTED WORK</span>
          <span className="opacity-60">( 04 PROJECTS )</span>
        </div>

        <ScrollScrub>
          <h2 className="font-display uppercase leading-[0.85]" style={{ fontSize: "clamp(56px, 9vw, 130px)" }}>
            PROJECT
            <br />
            PORTFOLIO
          </h2>
        </ScrollScrub>

        <ScrollScrub>
          <p className="font-mag-body text-lg md:text-xl opacity-70 mt-8 max-w-lg">
            Four projects, four different problems — a storefront, an events
            platform, a product site, and a small tool. Scroll through each one.
          </p>
        </ScrollScrub>

        <Marquee
          text="NODE.JS — POSTGRESQL — REACT — TYPESCRIPT — EXPRESS —"
          className="text-white mt-16 border-y-4 border-white py-3 font-bold"
        />
      </StickySection>

      {/* ===== WORK — project slides ===== */}
      {[
        {
          index: "01 / 04",
          title: "Bazzar Shop",
          description:
            "A full-stack e-commerce platform with JWT authentication, an admin dashboard, and 11+ REST API endpoints powering the storefront.",
          tags: ["NODE.JS", "EXPRESS", "POSTGRESQL"],
          image: "/projects/bazzar.png",
          liveHref: "https://zohamalikdev.github.io/Bazzar-Shop/index.html",
          githubHref: "https://github.com/zohamalikdev",
        },
        {
          index: "02 / 04",
          title: "ArtWala",
          description:
            "An event management platform built end-to-end with PHP and MySQL, handling listings, bookings, and organizer tools.",
          tags: ["PHP", "MYSQL", "FULL STACK"],
          image: "/projects/artwala.png",
          liveHref: "https://artwala.page.gd",
          githubHref: "https://github.com/zohamalikdev",
          reverse: true,
        },
        {
          index: "03 / 04",
          title: "DrinkCo",
          description:
            "A responsive frontend product site with custom breakpoint handling and a clean stacked mobile layout.",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/projects/drinkco.png",
          liveHref: "https://zohamalikdev.github.io/DrinkCo/index.html",
          githubHref: "https://github.com/zohamalikdev",
        },
        {
          index: "04 / 04",
          title: "Todo List",
          description:
            "A lightweight task manager focused on fast interactions and clean state handling.",
          tags: ["JAVASCRIPT", "HTML", "CSS"],
          image: "/projects/todo.png",
          liveHref: "#",
          githubHref: "https://github.com/zohamalikdev",
          reverse: true,
        },
      ].map((project, i) => (
        <StickySection
          key={project.title}
          zIndex={41 + i}
          className="bg-black text-white border-t-4 border-white/20"
        >
          <Projectslide {...project} />
        </StickySection>
      ))}

    <Resume />

      {/* ===== CONTACT ===== */}
     <ClosingSection />
    
    </main>
  );
}