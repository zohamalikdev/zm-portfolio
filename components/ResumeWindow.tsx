"use client";

import RetroWindow from "@/components/RetroWindow";
import Image from "next/image";

export default function ResumeWindow() {
  return (
    <section
      id="resume"
      className="relative min-h-screen flex items-center justify-center px-8 py-20"
    >
      <RetroWindow
        title="Zoha_Malik_Resume.pdf"
        icon="/projects/pdf.png"
       
      >
        <div className="bg-white border border-gray-400">

          {/* Toolbar */}

          <div className="flex items-center justify-between border-b bg-[#ECE9D8] px-4 py-2">

            <div className="flex items-center gap-2">

              <button className="xp-btn">←</button>

              <button className="xp-btn">→</button>

              <button className="xp-btn">🔍</button>

              <button className="xp-btn">🖨</button>

              <button className="xp-btn">+</button>

              <button className="xp-btn">−</button>

              <span className="text-xs font-mono ml-2">
                100%
              </span>

            </div>

            <span className="text-xs text-gray-500">
              Page 1 of 1
            </span>

          </div>

          <div className="grid grid-cols-12 min-h-[650px]">

            {/* Sidebar */}

            <div className="col-span-2 border-r bg-[#F6F6F6] p-4">

              <h3 className="font-bold text-sm mb-4">
                Pages
              </h3>

              <div className="border bg-white p-2 hover:bg-blue-100 cursor-pointer">

                <Image
                  src="/resume-preview.png"
                  alt="Resume"
                  width={120}
                  height={170}
                  className="border"
                />

                <p className="text-xs text-center mt-2">
                  Page 1
                </p>

              </div>

              <div className="mt-6 text-xs space-y-2 text-gray-600">

                <p>
                  <strong>Type:</strong> PDF
                </p>

                <p>
                  <strong>Size:</strong> 324 KB
                </p>

                <p>
                  <strong>Version:</strong> 1.7
                </p>

              </div>

            </div>

            {/* Resume */}

            <div className="col-span-10 bg-gray-300 overflow-auto p-8">

              <div className="mx-auto w-[700px] shadow-xl border bg-white">

                <Image
                  src="/resume-preview.png"
                  alt="Resume Preview"
                  width={700}
                  height={990}
                  className="w-full h-auto"
                />

              </div>

            </div>

          </div>

          {/* Bottom Bar */}

          <div className="flex items-center justify-between border-t bg-[#ECE9D8] px-4 py-3">

            <span className="text-xs font-bold">
              PDF Loaded Successfully
            </span>

            <a
              href="/resume.pdf"
              download
              className="px-4 py-2 bg-gray-200 border-2 border-t-white border-l-white border-r-gray-500 border-b-gray-500 hover:bg-white active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white text-xs font-bold"
            >
              ⬇ Download Resume
            </a>

          </div>

        </div>
      </RetroWindow>
    </section>
  );
}