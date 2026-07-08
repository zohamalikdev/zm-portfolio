"use client";

import Image from "next/image";
import ScrollScrub from "@/components/ScrollScrub";

export default function DesktopSection() {
  return (
    <section className="relative min-h-screen bg-white text-black px-8 md:px-16 py-24 flex items-center justify-center">
      {/* Retro Window Container */}
      <div className="w-full max-w-4xl">
        {/* Window Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between border-b-4 border-black">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border-2 border-black" />
            <div className="w-4 h-4 bg-yellow-500 border-2 border-black" />
            <div className="w-4 h-4 bg-green-500 border-2 border-black" />
          </div>
          <span className="text-white font-bold text-sm tracking-wider">ZOHAMALIK.DEV</span>
          <div className="flex gap-2">
            <button className="w-6 h-6 bg-white border-2 border-black hover:bg-gray-200 transition-colors flex items-center justify-center text-xs font-bold">
              _
            </button>
            <button className="w-6 h-6 bg-white border-2 border-black hover:bg-gray-200 transition-colors flex items-center justify-center text-xs font-bold">
              □
            </button>
            <button className="w-6 h-6 bg-red-600 border-2 border-black hover:bg-red-700 transition-colors flex items-center justify-center text-white font-bold text-xs">
              ×
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-300 px-4 py-2 border-b-2 border-black flex gap-6 font-bold text-sm">
          <button className="hover:bg-gray-400 px-2 py-1 transition-colors">File</button>
          <button className="hover:bg-gray-400 px-2 py-1 transition-colors">Edit</button>
          <button className="hover:bg-gray-400 px-2 py-1 transition-colors">View</button>
          <button className="hover:bg-gray-400 px-2 py-1 transition-colors">Help</button>
        </div>

        {/* Window Content */}
        <div className="bg-white border-4 border-black p-8 md:p-12">
          <ScrollScrub>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Photo */}
              <div className="relative aspect-square bg-gray-100 border-4 border-black p-4">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-black border-2 border-black" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-black border-2 border-black" />
                <Image
                  src="/projects/hero.jpeg"
                  alt="Zoha Malik"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right: Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold tracking-widest mb-2 text-gray-600">
                    HELLO, I'M
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight border-b-4 border-black pb-4">
                    ZOHA
                    <br />
                    MALIK
                  </h2>
                </div>

                <div className="bg-gray-50 border-2 border-black p-4">
                  <p className="text-sm md:text-base leading-relaxed font-mono">
                    Full Stack Developer & Designer. I build clean, interactive digital experiences with attention to detail and modern technologies.
                  </p>
                </div>

                {/* Contact Info Boxes */}
                <div className="space-y-2">
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className="font-bold text-xs tracking-wider"> EMAIL</span>
                    <span className="text-xs font-mono">zohamalik.dev@gmail.com</span>
                  </div>
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className="font-bold text-xs tracking-wider"> LOCATION</span>
                    <span className="text-xs font-mono">Multan, PK</span>
                  </div>
                  <div className="bg-white border-2 border-black p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                    <span className="font-bold text-xs tracking-wider"> TIMEZONE</span>
                    <span className="text-xs font-mono">EST/BST</span>
                  </div>
                </div>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"].map(
                    (tech) => (
                      <div
                        key={tech}
                        className="border-2 border-black px-3 py-1 text-xs font-bold hover:bg-black hover:text-white transition-all"
                      >
                        {tech}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollScrub>
        </div>

        {/* Window Status Bar */}
        <div className="bg-gray-300 border-t-4 border-black px-4 py-2 flex justify-between items-center text-xs font-bold">
          <span>Ready</span>
          <span className="flex gap-4">
            <span>🔴 Secure</span>
            <span>🔵 Fast</span>
          </span>
        </div>
      </div>
    </section>
  );
}