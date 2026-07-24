"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MsPaintWindow from "@/components/MsPaintWindow";
import { playClick } from "@/components/Sound";

const projects = [
  {
    id: "bazaar",
    icon: "/projects/bazzar.png",
    name: "Bazaar Shop.exe",
    tagline: "Full Stack Marketplace",
    subtitle: "A scalable multi-vendor marketplace built to simplify online buying and selling.",
    status: "Production",
    version: "v2.1",
    size: "18.4 MB",
    screenshot: "/projects/bazzar.png",
    problem: "Small businesses need an affordable online marketplace without relying on restrictive third-party platforms.",
    solution: "Built a robust end-to-end e-commerce infrastructure supporting products, dynamic categories, shopping cart systems, and secure checkout frameworks.",
    stack: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "JWT"],
    features: ["User Authentication", "Admin Dashboard", "Shopping Cart Matrix", "REST API Infrastructure", "Database Integration", "Secure Checkout Gateway"],
    metrics: { loc: "7.5K+", pages: "6+", tables: "3", apis: "18+" },
    href: "https://zoha-malik01.github.io/Bazzar-Shop/index.html",
    github: "https://github.com/zoha-malik01/Bazzar-Shop",
  },
  {
    id: "artwala",
    icon: "/projects/artwala.png",
    name: "ArtWala.exe",
    tagline: "Event Ticket Booking System",
    subtitle: "An event ticket booking system with real-time seat availability and admin management.",
    status: "Live",
    version: "v1.8",
    size: "12.1 MB",
    screenshot: "/projects/artwala.png",
    problem: "Traditional physical ticketing creates long bottlenecks and lacks an automated tracking hub for local organizers.",
    solution: "Digitizes the ticket-booking lifecycle complete with a real-time availability engine, intuitive scheduling matrices, and an integrated administrative dashboard.",
    stack: ["PHP", "MySQL", "Tailwind CSS"],
    features: ["Dynamic Event Ticketing", "Artist Profiles Engine", "Secure SQL Gateway", "Interactive Layout Maps", "Real-Time Availability Check"],
    metrics: { loc: "1,500+", pages: "13", tables: "6", apis: "0" },
    href: "https://artwala.page.gd",
    github: "https://github.com/zoha-malik01/ArtWala",
  },
  {
    id: "drinkco",
    icon: "/projects/drinkco.png",
    name: "DrinkCo.exe",
    tagline: "Marketing Landing Page",
    subtitle: "A conversion-focused landing page designed to increase product engagement and sales.",
    status: "Production",
    version: "v1.0",
    size: "4.2 MB",
    screenshot: "/projects/drinkco.png",
    problem: "Brands lose prospective leads due to poorly structured product storytelling and non-responsive web design templates.",
    solution: "Engineered a high-performance, responsive shell optimizing user experience paths, clear conversion funnels, and fluid media distribution arrays.",
    stack: ["HTML", "CSS", "JavaScript", "Vite"],
    features: ["Fluid Layout Systems", "High-Fidelity Animations", "Asynchronous Contact Submissions", "Asset Size Optimization"],
    metrics: { loc: "1,200+", pages: "1", tables: "0", apis: "2" },
    href: "https://zoha-malik01.github.io/DrinkCo/index.html",
    github: "https://github.com/zoha-malik01/DrinkCo",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

function renderStatusBadge(status: string) {
  const badgeStyles = {
    Production: "bg-gradient-to-b from-green-500 to-green-600 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.4)]",
    Live: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.4),inset_-1px_-1px_0_rgba(0,0,0,0.4)]",
  };
  const statusConfig = {
    Production: { label: "🟢 Production", style: badgeStyles.Production },
    Live: { label: "🔵 Live Shell", style: badgeStyles.Live },
  };
  const config = statusConfig[status as keyof typeof statusConfig] || { label: "🟡 Staging", style: badgeStyles.Production };
  return (
    <span className={`${config.style} px-3 py-1 rounded-sm text-[11px] select-none font-mono font-semibold`}>
      {config.label}
    </span>
  );
}

export default function WorkSection() {
  const [selected, setSelected] = useState<string>("bazaar");
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const activeProject = projects.find((p) => p.id === selected) || projects[0];

  const handleSelectProject = (id: string) => {
    playClick();
    setSelected(id);
  };

  const handleLinkClick = () => {
    playClick();
  };

  return (
    <section id="work" className="relative bg-transparent px-3 md:px-8 lg:px-12 py-12 md:py-16 text-gray-900 select-none cursor-none">
      <div className="max-w-6xl mx-auto">
        {/* All the toolbar / menu bar / palette chrome now comes from
            MsPaintWindow itself, instead of being hand-drawn here again. */}
        <MsPaintWindow
          title="my_projects.bmp - Paint"
          icon="/projects/folder.png"
          statusText="For Help, click Help Topics on the Help Menu."
          activeTool="rectangle"
        >
            <div className="bg-white border-[3px] border-black text-black w-full max-w-5xl mx-auto p-4 font-serif shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-tight">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

              {/* LEFT: project list */}
              <div className="lg:col-span-4 space-y-2">
                <p className="text-[26px] font-bold font-mono uppercase tracking-wider mb-4 px-2 select-none">
                  PROJECTS
                </p>
                <div className="space-y-1.5">
                  {projects.map((project) => {
                    const isCurrent = selected === project.id;
                    return (
                      <motion.button
                        key={project.id}
                        onClick={() => handleSelectProject(project.id)}
                        whileHover={{ x: isCurrent ? 0 : 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-100 font-mono text-xs cursor-none rounded-sm border ${
                          isCurrent
                            ? "bg-black text-white font-bold border-black shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
                            : "bg-white border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        <Image
                          src={project.icon}
                          alt=""
                          width={20}
                          height={20}
                          className={`shrink-0 ${isCurrent ? "invert" : ""}`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold uppercase tracking-tight">{project.name}</p>
                          <p className={`text-[9px] truncate mt-0.5 ${isCurrent ? "text-neutral-400" : "text-neutral-500"}`}>
                            {project.tagline}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: project detail */}
              <div className="lg:col-span-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 font-sans"
                  >
                    {/* Screenshot */}
                    <motion.div variants={rowVariants} className="border-2 border-black bg-neutral-50 p-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                      <div className="relative aspect-[16/9] w-full border border-black bg-neutral-900 overflow-hidden flex items-center justify-center">
                        {!imgError[activeProject.id] ? (
                          <Image
                            src={activeProject.screenshot}
                            alt={`${activeProject.name} screenshot`}
                            fill
                            className="object-cover"
                            onError={() => setImgError((prev) => ({ ...prev, [activeProject.id]: true }))}
                          />
                        ) : (
                          <div className="w-full h-full p-4 font-mono text-xs text-black flex flex-col justify-between bg-white">
                            <div>
                              <p className="text-neutral-400">STAGE_RENDER_CONNECTED</p>
                              <p className="text-black font-black mt-1">SYS: {activeProject.name}</p>
                            </div>
                            <div className="text-center text-neutral-400 text-[10px] animate-pulse">
                              [ Image binary sandbox context pending live swap ]
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Title + status/version */}
                    <motion.div variants={rowVariants} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b-2 border-black pb-3">
                      <div className="min-w-0">
                        <h2 className="text-sm font-black text-gray-900 font-sans uppercase tracking-tight truncate">
                          {activeProject.name}
                        </h2>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">{activeProject.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {renderStatusBadge(activeProject.status)}
                        <div className="text-black border-2 border-black bg-white px-2 py-0.5 text-[10px] rounded-sm font-mono font-bold shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                          v{activeProject.version.slice(1)}
                        </div>
                      </div>
                    </motion.div>

                    {/* Problem / Solution */}
                    <motion.div variants={rowVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="border-2 border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Problem</h4>
                        <p className="text-xs text-gray-700 leading-relaxed font-serif">{activeProject.problem}</p>
                      </div>
                      <div className="border-2 border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Solution</h4>
                        <p className="text-xs text-gray-700 leading-relaxed font-serif">{activeProject.solution}</p>
                      </div>
                    </motion.div>

                    {/* Metrics */}
                    <motion.div variants={rowVariants}>
                      <h4 className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">Architecture Metrics</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                        {[
                          { label: "Lines of Code", value: activeProject.metrics.loc },
                          { label: "Modules", value: activeProject.metrics.pages },
                          { label: "DB Tables", value: activeProject.metrics.tables },
                          { label: "REST Endpoints", value: activeProject.metrics.apis },
                        ].map((metric) => (
                          <div key={metric.label} className="border border-black bg-white p-2 text-center rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            <span className="text-neutral-400 block text-[8px] uppercase font-bold mb-0.5">{metric.label}</span>
                            <span className="text-black font-black text-xs">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Features / Stack */}
                    <motion.div variants={rowVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="border border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <h4 className="text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-2 border-b-2 border-black pb-1">Features</h4>
                        <div className="space-y-1 text-xs">
                          {activeProject.features.map((feat) => (
                            <div key={feat} className="flex items-start gap-2 text-gray-700 font-serif">
                              <span className="text-black font-bold text-xs shrink-0 mt-0.5">✓</span>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border border-black bg-white p-3 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <h4 className="text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-2 border-b-2 border-black pb-1">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.stack.map((tech) => (
                            <span key={tech} className="border border-black bg-white text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm shadow-[1px_1px_0px_rgba(0,0,0,1)] select-none">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div variants={rowVariants} className="pt-3 border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 font-mono">
                      <a
                        href={activeProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="px-4 py-1.5 bg-white hover:bg-neutral-50 text-black border-2 border-black font-bold text-xs shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center cursor-none select-none rounded-sm uppercase tracking-tight"
                      >
                        ▶ Launch App
                      </a>
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="px-4 py-1.5 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-xs rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all text-center cursor-none select-none uppercase tracking-tight"
                      >
                        Source Code
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </MsPaintWindow>
      </div>
    </section>
  );
}