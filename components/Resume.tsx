"use client";

import Magnetic from "@/components/Magnetic";
import ScrollScrub from "@/components/ScrollScrub";
import Marquee from "@/components/Marquee";

function TagRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <span
          key={s}
          className="border-2 border-black px-2 py-1 text-[11px] font-bold hover:-rotate-2 hover:bg-black hover:text-white transition-transform duration-150 animate-[riseIn_0.5s_cubic-bezier(0.16,1,0.3,1)_backwards]"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="bg-white text-black px-8 md:px-16 py-24 md:py-32">
      <div className="flex justify-between items-start mb-12 font-mag-body text-xs md:text-sm tracking-wide">
        <span className="opacity-60">[ 05 ] — CURRICULUM</span>
        <span className="opacity-60 text-right">
          OPEN TO FULL-TIME
          <br />
          &amp; FREELANCE
        </span>
      </div>

      <ScrollScrub>
        <h2 className="text-[48px] md:text-[80px] font-display uppercase leading-[0.95] mb-12 border-t-4 border-black pt-12">
          RESUME
        </h2>
      </ScrollScrub>

      {/* ===== BENTO GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(160px,auto)] gap-4 md:gap-5">
        {/* Summary + download — wide header cell */}
        <ScrollScrub className="md:col-span-3 md:row-span-1">
          <div className="border-4 border-black p-6 md:p-8 h-full flex flex-col justify-between brutal-card-hover">
            <p className="font-mag-body text-lg md:text-xl opacity-80 leading-relaxed max-w-xl">
              Full stack developer with a freelance design background —
              comfortable across the stack, from database schema to
              pixel-level UI polish.
            </p>
            <Magnetic strength={0.25}>
              <a
                href="/Zoha_Malik_Resume.pdf"
                className="font-mag-body inline-flex w-fit items-center gap-2 border-2 border-black px-6 py-3 text-sm mt-6 hover:bg-black hover:text-white brutal-btn-dark"
              >
                DOWNLOAD PDF ↓
              </a>
            </Magnetic>
          </div>
        </ScrollScrub>

        {/* Availability — tall narrow cell, solid black */}
        <ScrollScrub className="md:col-span-1 md:row-span-2">
          <div className="border-4 border-black bg-black text-white p-6 h-full flex flex-col justify-between brutal-card-hover">
            <p className="text-xs font-bold opacity-60 tracking-wide">STATUS</p>
            <div>
              <p className="font-display uppercase text-3xl leading-[0.9] mb-4">
                OPEN
                <br />
                TO WORK
              </p>
              <div className="font-mag-body text-xs space-y-2 opacity-70 border-t-2 border-white/30 pt-4">
                <div className="flex justify-between">
                  <span>LOCATION</span>
                  <span className="font-bold">MULTAN, PK</span>
                </div>
                <div className="flex justify-between">
                  <span>REMOTE</span>
                  <span className="font-bold">YES</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollScrub>

        {/* Experience — wide, tall */}
        <ScrollScrub className="md:col-span-3 md:row-span-2">
          <div className="border-4 border-black p-6 md:p-8 h-full brutal-card-hover">
            <p className="text-xs font-bold opacity-50 mb-6 tracking-wide">EXPERIENCE</p>
            <div className="space-y-6">
              <div className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-8">
                <div>
                  <p className="text-black/50 text-xs font-bold">2024 — PRESENT</p>
                  <p className="font-display uppercase text-lg leading-tight mt-1">
                    Full Stack Developer
                  </p>
                  <p className="text-xs opacity-60">Freelance</p>
                </div>
                <ul className="font-mag-body text-sm space-y-1.5 text-black/80 border-t-2 md:border-t-0 md:border-l-2 border-black/20 pt-3 md:pt-0 md:pl-6">
                  <li className="flex gap-2"><span>—</span><span>Built and shipped full stack apps end-to-end — schema, REST APIs, frontend.</span></li>
                  <li className="flex gap-2"><span>—</span><span>Delivered Bazzar Shop: Node.js/Express/PostgreSQL e-commerce with JWT auth.</span></li>
                </ul>
              </div>

              <div className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-8 border-t-2 border-black/20 pt-6">
                <div>
                  <p className="text-black/50 text-xs font-bold">2022 — 2024</p>
                  <p className="font-display uppercase text-lg leading-tight mt-1">
                    Graphic Design
                  </p>
                  <p className="text-xs opacity-60">Freelance</p>
                </div>
                <ul className="font-mag-body text-sm space-y-1.5 text-black/80 border-t-2 md:border-t-0 md:border-l-2 border-black/20 pt-3 md:pt-0 md:pl-6">
                  <li className="flex gap-2"><span>—</span><span>Designed brand and visual assets for freelance clients.</span></li>
                  <li className="flex gap-2"><span>—</span><span>Built ArtWala, a PHP/MySQL event management platform.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollScrub>

        {/* Education */}
        <ScrollScrub className="md:col-span-2 md:row-span-1">
          <div className="border-4 border-black p-6 h-full brutal-card-hover">
            <p className="text-xs font-bold opacity-50 mb-3 tracking-wide">EDUCATION</p>
            <p className="font-display uppercase text-2xl leading-tight">B.S. COMPUTER SCIENCE</p>
            <p className="text-sm opacity-60 mt-1">NUML University, Multan</p>
          </div>
        </ScrollScrub>

        {/* Skills — three even cells, tags stagger in and tilt on hover */}
        <ScrollScrub className="md:col-span-2 md:row-span-1">
          <div className="border-4 border-black p-6 h-full brutal-card-hover">
            <p className="text-xs font-bold opacity-50 mb-3 tracking-wide">LANGUAGES &amp; FRAMEWORKS</p>
            <TagRow items={["JAVASCRIPT", "TYPESCRIPT", "PHP", "REACT", "NEXT.JS", "NODE.JS", "EXPRESS.JS"]} />
          </div>
        </ScrollScrub>

        <ScrollScrub className="md:col-span-2 md:row-span-1">
          <div className="border-4 border-black p-6 h-full brutal-card-hover">
            <p className="text-xs font-bold opacity-50 mb-3 tracking-wide">DATA &amp; BACKEND</p>
            <TagRow items={["POSTGRESQL","MONGODB" ,"MYSQL", "REST APIS", "JWT AUTH"]} />
          </div>
        </ScrollScrub>

        <ScrollScrub className="md:col-span-2 md:row-span-1">
          <div className="border-4 border-black p-6 h-full brutal-card-hover">
            <p className="text-xs font-bold opacity-50 mb-3 tracking-wide">DESIGN &amp; TOOLS</p>
            <TagRow items={["HTML", "CSS", "TAILWIND", "GIT", "FIGMA", "GRAPHIC DESIGN"]} />
          </div>
        </ScrollScrub>
      </div>

      <Marquee
        text="AVAILABLE FOR HIRE — FULL STACK DEVELOPER — OPEN TO WORK —"
        className="text-black mt-16 border-y-4 border-black py-3 font-bold"
      />
    </section>
  );
}