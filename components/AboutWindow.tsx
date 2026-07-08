"use client";

import { useState } from "react";
import RetroWindow from "@/components/RetroWindow";
import PopupWindow from "@/components/PopupWindow";
import Typewriter from "./TypeWriter";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type WindowId = "skills" | "tech" | "status" | "journey" | null;

export default function AboutWindow() {
    const [activeWindow, setActiveWindow] = useState<WindowId>(null);
    const [showContent, setShowContent] = useState(false);
    const [selectedFile, setSelectedFile] = useState<WindowId>(null);
    const [loading, setLoading] = useState(false);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const iconVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.35,
            },
        },
    };

    const openWindow = (id: WindowId) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setActiveWindow(id);
        }, 500);
    };

    return (
        <section id="about" className="relative bg-transparent px-4 md:px-12 py-16 cursor-none">
            <div className="max-w-6xl mx-auto">
                <RetroWindow title="About.exe" icon="/projects/about.png">
                    <div className="grid md:grid-cols-[220px_1fr] gap-10">
                        {/* LEFT — profile */}
                        <div className="flex flex-col items-center">
                            <div className="border-none p-2">
                                <Image
                                    src="/projects/hero.png"
                                    alt="Zoha"
                                    width={180}
                                    height={230}
                                />
                            </div>

                            <h2 className="mt-4 text-2xl font-bold">Zoha Malik</h2>
                            <p className="text-blue-700 font-semibold">Full Stack Developer</p>

                            <div className="mt-4 w-full border-t pt-3 text-sm space-y-1">
                                <p>Multan, Pakistan</p>
                                <p>BS Computer Science</p>
                            </div>
                        </div>

                        {/* RIGHT — intro + folders */}
                        <div>
                            <div className="bg-white border-2 border-gray-400 p-6 rounded-sm shadow-inner">
                                <Typewriter
                                    lines={[
                                        "Hello.",
                                        "I'm Zoha Malik.",
                                        "Full Stack Developer.",
                                        "I build modern web applications.",
                                        "Double-click any file to know more..."
                                    ]}
                                    onComplete={() => setShowContent(true)}
                                />
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={showContent ? "visible" : "hidden"}
                                className="mt-6"
                            >
                                {/* Desktop Divider */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex-1 border-b border-dashed border-gray-400" />
                                    <span className="text-[11px] uppercase tracking-[4px] text-gray-500">
                                        Desktop Files
                                    </span>
                                    <div className="flex-1 border-b border-dashed border-gray-400" />
                                </div>

                                {/* Desktop Icons */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                                    {[
                                        {
                                            id: "skills" as const,
                                            label: "Skills.exe",
                                            subtitle: "Technical Abilities",
                                            icon: "/projects/skills.png",
                                        },
                                        {
                                            id: "tech" as const,
                                            label: "TechStack.exe",
                                            subtitle: "Languages & Tools",
                                            icon: "/projects/tech.png",
                                        },
                                        {
                                            id: "status" as const,
                                            label: "Status.exe",
                                            subtitle: "Current Activity",
                                            icon: "/projects/status.png",
                                        },
                                        {
                                            id: "journey" as const,
                                            label: "Journey.txt",
                                            subtitle: "Career Timeline",
                                            icon: "/projects/journey.png",
                                        },
                                    ].map((item) => (
                                        <motion.button
                                            key={item.id}
                                            variants={iconVariants}
                                            whileHover={{ scale: 1.08, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedFile(item.id)}
                                            onDoubleClick={() => openWindow(item.id)}
                                            className={`cursor-none group w-32 rounded-lg p-3 flex flex-col items-center transition-all duration-300 border ${selectedFile === item.id
                                                    ? "bg-blue-500/20 border-blue-500"
                                                    : "bg-transparent border-transparent hover:bg-blue-500/10"
                                                }`}
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={64}
                                                height={64}
                                                className="transition duration-300 group-hover:scale-110"
                                            />
                                            <h3 className="mt-3 text-sm font-semibold text-center group-hover:text-blue-700">
                                                {item.label}
                                            </h3>
                                            <p className="text-[11px] text-gray-500 text-center mt-1">
                                                {item.subtitle}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </RetroWindow>
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

                    <RetroWindow
                        title="Loading..."
                        icon="/projects/loading.png"
                    >

                        <div className="flex flex-col items-center gap-4 p-6">

                            <Image
                                src="/projects/loading.gif"
                                alt=""
                                width={48}
                                height={48}
                            />

                            <p>Opening file...</p>

                        </div>

                    </RetroWindow>

                </div>
            )}

            {/* Popup Windows Modals */}
            <AnimatePresence>
                {activeWindow === "skills" && (
                    <PopupWindow
                        id="skills"
                        title="Skills.exe"
                        icon="/projects/folder.png"
                        onClose={() => setActiveWindow(null)}
                    >
                        <h2 className="font-bold mb-4 text-lg">Technical Skills</h2>
                        <div className="space-y-5">
                            {[
                                { category: "Frontend", skill: "React / Next.js", pct: 95, color: "bg-green-500" },
                                { category: "Frontend", skill: "TypeScript", pct: 90, color: "bg-blue-500" },
                                { category: "Backend", skill: "Node.js / Express", pct: 88, color: "bg-yellow-500" },
                                { category: "Backend", skill: "PostgreSQL / MySQL", pct: 82, color: "bg-orange-500" },
                                { category: "Design", skill: "UI / Product Design", pct: 92, color: "bg-pink-500" },
                            ].map((row) => (
                                <div key={row.skill}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-500">{row.category}</span>
                                        <span className="font-bold">{row.pct}%</span>
                                    </div>
                                    <p className="text-sm mb-1">{row.skill}</p>
                                    <div className="w-full bg-gray-300 h-3 rounded-full">
                                        <div
                                            className={`${row.color} h-3 rounded-full`}
                                            style={{ width: `${row.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PopupWindow>
                )}

                {activeWindow === "tech" && (
                    <PopupWindow
                        id="tech"
                        title="Tech Stack.exe"
                        icon="/projects/about.png"
                        onClose={() => setActiveWindow(null)}
                    >
                        <h2 className="font-bold text-lg mb-4">Installed Technologies</h2>
                        <div className="space-y-5">
                            {[
                                { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                                { category: "Backend", items: ["Node.js", "Express"] },
                                { category: "Database", items: ["PostgreSQL", "MySQL"] },
                                { category: "Cloud", items: ["Learning AWS"] },
                                { category: "Tools", items: ["Git", "Figma"] },
                            ].map((group) => (
                                <div key={group.category}>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                        {group.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="border border-gray-400 bg-white px-2 py-1 text-xs font-semibold"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PopupWindow>
                )}

                {activeWindow === "status" && (
                    <PopupWindow
                        id="status"
                        title="Current Status.exe"
                        icon="/projects/status.png"
                        onClose={() => setActiveWindow(null)}
                    >
                        <h2 className="font-bold text-lg mb-5">System Status</h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-gray-300 pb-2">
                                <span className="text-gray-500 font-semibold">Current Focus</span>
                                <span className="font-bold text-right">Full Stack Web Development</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2">
                                <span className="text-gray-500 font-semibold">Learning</span>
                                <span className="font-bold text-right">AWS / Cloud Infrastructure</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2">
                                <span className="text-gray-500 font-semibold">Availability</span>
                                <span className="font-bold text-right text-green-600">Open to Work</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-gray-500 font-semibold">Location</span>
                                <span className="font-bold text-right">Multan, Pakistan (Remote)</span>
                            </div>
                        </div>
                    </PopupWindow>
                )}

                {activeWindow === "journey" && (
                    <PopupWindow
                        id="journey"
                        title="Journey.txt"
                        icon="/projects/notepad.png"
                        onClose={() => setActiveWindow(null)}
                    >
                        <h2 className="font-bold text-lg mb-4">Career Timeline</h2>
                        <div className="space-y-4">
                            {[
                                { year: "2022", title: "Graphic Designer", desc: "Started designing social media posts, flyers and branding projects.", color: "bg-pink-500" },
                                { year: "2023", title: "Freelancer", desc: "Worked with international clients on Fiverr and independent projects.", color: "bg-blue-500" },
                                { year: "2024", title: "Frontend Developer", desc: "Learned React, Next.js and modern UI development.", color: "bg-green-500" },
                                { year: "2025", title: "Full Stack Developer", desc: "Built complete applications using Node.js, Express and PostgreSQL.", color: "bg-yellow-500" },
                                { year: "2026", title: "Cloud & SaaS", desc: "Learning AWS while creating scalable SaaS products and preparing for internships.", color: "bg-purple-500" },
                            ].map((item) => (
                                <div key={item.year} className="flex gap-4 items-start border-b border-gray-300 pb-3 last:border-none">
                                    <div className={`w-4 h-4 rounded-full mt-1 ${item.color}`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold">{item.title}</h3>
                                            <span className="text-blue-700 font-bold">{item.year}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-3 text-sm text-gray-600">
                            <span className="font-semibold text-green-600">Current Objective:</span>{" "}
                            Secure a Full Stack Internship, deepen AWS expertise, and build impactful products.
                        </div>
                    </PopupWindow>
                )}
            </AnimatePresence>
        </section>
    );
}