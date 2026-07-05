"use client";

import { useState } from "react";
import SplitReveal from "@/components/Splitrveal";
import ScrollScrub from "@/components/ScrollScrub";
import ContactForm from "@/components/ContactForm";

export default function ClosingSection() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="contact" className="relative min-h-screen bg-black text-white px-8 md:px-16 py-24 md:py-32 flex flex-col justify-between overflow-hidden">
      {/* Top Label */}
      <div className="flex justify-between items-start font-mag-body text-xs md:text-sm tracking-wide">
        <span className="opacity-60">[ 06 ] — GET IN TOUCH</span>
        <div className="text-right space-y-1 text-xs opacity-60">
          <p>AVAILABLE FOR WORK</p>
          <p>REMOTE · EST/BST</p>
        </div>
      </div>

      {/* Main Content: heading left, working form right (was empty decoration before) */}
      <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16 py-12">
        <div className="max-w-2xl">
          <ScrollScrub>
            <h2
              className="font-display uppercase leading-[0.85] text-white/95"
              style={{ fontSize: "clamp(40px, 7vw, 110px)" }}
            >
              <div className="relative overflow-hidden py-2">
                <SplitReveal text="LET'S BUILD" baseDelay={0} />
              </div>
              <div className="relative overflow-hidden py-2">
                <SplitReveal text="SOMETHING" baseDelay={0.25} />
              </div>
              <div className="relative overflow-hidden py-2 flex items-end gap-3 md:gap-5">
                <SplitReveal text="GREAT" baseDelay={0.5} />
                <div
                  className="inline-block bg-white/90 rounded-full flex-shrink-0"
                  style={{
                    width: "0.5em",
                    height: "0.5em",
                    animation: "pulseGlow 2s ease-in-out infinite",
                    animationDelay: "0.8s",
                  }}
                />
              </div>
            </h2>
          </ScrollScrub>
        </div>

        <div className="w-full lg:w-auto lg:max-w-md">
          <ScrollScrub>
            <p className="font-mag-body text-xs uppercase tracking-wide opacity-50 mb-4">
              Or fill this out
            </p>
            <ContactForm />
          </ScrollScrub>
        </div>
      </div>

      {/* Secondary contact path — quieter than the form, not competing with it */}
      <div className="border-t-4 border-white pt-6">
        <ScrollScrub>
          <p className="font-mag-body text-xs uppercase tracking-wide opacity-50 mb-3">
            Prefer email direct?
          </p>
          <a
            href="mailto:zohamalik.dev@gmail.com"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="block text-xl md:text-3xl font-display uppercase leading-[1.1] hover:opacity-70 transition-opacity duration-200"
          >
            <span className="relative inline-block">
              zohamalik.dev
              <span
                className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                  isHovering ? "w-full" : "w-0"
                }`}
              />
            </span>
            @gmail.com
          </a>
        </ScrollScrub>

        <div className="mt-6 flex flex-col md:flex-row gap-3 md:gap-6 font-mag-body text-xs">
          <a
            href="https://github.com/zohamalikdev"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black brutal-btn"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/zohamalik-/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black brutal-btn"
          >
            LINKEDIN
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black brutal-btn"
          >
            TWITTER
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </section>
  );
}