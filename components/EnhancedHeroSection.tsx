"use client";

import WelcomeModal from "@/components/WelcomeModal";

import { useState } from "react";

// the corners — this is what actually reads as "pixelated" rather than
// clean vector icons with curves.
type Pixel = [number, number, number, number, string]; // x, y, w, h, fill

function PixelIcon({ pixels, size = 40 }: { pixels: Pixel[]; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated" }}
    >
      {pixels.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
}

const K = "#000000"; // outline
const Y = "#fde047"; // folder yellow
const D = "#eab308"; // folder yellow, darker tab
const W = "#ffffff"; // paper white
const L = "#d1d5db"; // light gray (fold, bin fill)
const G = "#9ca3af"; // gray (bin body/lid)

function FolderIcon() {
  const pixels: Pixel[] = [
    [1, 2, 8, 3, K], // tab outline
    [0, 4, 16, 11, K], // body outline
    [2, 3, 6, 2, D], // tab fill
    [1, 5, 14, 9, Y], // body fill
  ];
  return <PixelIcon pixels={pixels} />;
}

function FileIcon() {
  const pixels: Pixel[] = [
    [2, 1, 11, 13, K], // paper outline
    [3, 2, 9, 11, W], // paper fill
    [10, 2, 2, 2, L], // folded corner
    [4, 6, 6, 1, K], // text line 1
    [4, 8, 6, 1, K], // text line 2
    [4, 10, 4, 1, K], // text line 3
  ];
  return <PixelIcon pixels={pixels} />;
}

function MailIcon() {
  const pixels: Pixel[] = [
    [1, 3, 14, 10, K], // envelope outline
    [2, 4, 12, 8, W], // envelope fill
    // flap, built pixel-by-pixel as a stepped triangle (no diagonals in rects)
    [2, 4, 1, 1, K],
    [13, 4, 1, 1, K],
    [3, 5, 1, 1, K],
    [12, 5, 1, 1, K],
    [4, 6, 1, 1, K],
    [11, 6, 1, 1, K],
    [5, 7, 1, 1, K],
    [10, 7, 1, 1, K],
    [7, 8, 2, 1, K],
  ];
  return <PixelIcon pixels={pixels} />;
}

function BinIcon() {
  const pixels: Pixel[] = [
    [6, 0, 4, 1, K], // handle outline
    [4, 1, 8, 2, K], // lid outline
    [3, 4, 10, 11, K], // body outline
    [5, 1, 6, 1, G], // lid fill
    [4, 5, 8, 9, G], // body fill
    [6, 6, 1, 6, K], // slat 1
    [9, 6, 1, 6, K], // slat 2
  ];
  return <PixelIcon pixels={pixels} />;
}

const desktopIcons = [
  { Icon: FolderIcon, label: "Projects", href: "#work" },
  { Icon: FileIcon, label: "Resume", href: "#resume" },
  { Icon: MailIcon, label: "Contact", href: "#contact" },
  { Icon: BinIcon, label: "Recycle Bin", href: "#" },
];

export default function EnhancedHeroSection() {
  const [showRecyclePopup, setShowRecyclePopup] = useState(false);
  const wallpaper =
        "bg-[url('/projects/windows.jpg')] bg-cover bg-center bg-no-repeat";



  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden cursor-none">
  
      {/* ===== DESKTOP ICONS ===== */}
      <div className="flex flex-col gap-4 w-fit mt-12">
        {desktopIcons.map(({ Icon, label, href }) => {
          const isRecycleBin = label === "Recycle Bin";

          return isRecycleBin ? (
            <button
              key={label}
              onClick={() => setShowRecyclePopup(true)}
              className="group flex flex-col items-center gap-1 w-20 p-2 hover:bg-blue-600/50 rounded-sm transition-colors duration-100"
            >
              <Icon />

              <span className="bg-black/40 group-hover:bg-blue-600 text-white text-xs font-bold text-center leading-tight px-1.5 py-0.5">
                {label}
              </span>
            </button>
          ) : (
            <a
              key={label}
              href={href}
              className="group flex flex-col items-center gap-1 w-20 p-2 hover:bg-blue-600/50 rounded-sm transition-colors duration-100"
            >
              <Icon />

              <span className="bg-black/40 group-hover:bg-blue-600 text-white text-xs font-bold text-center leading-tight px-1.5 py-0.5">
                {label}
              </span>
            </a>
          );
        })}
      </div>


      {/* ===== WELCOME — now a real popup, fixed + centered, not inline content ===== */}
      <WelcomeModal />

      {showRecyclePopup && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-[9998]"
            onClick={() => setShowRecyclePopup(false)}
          />

          {/* XP Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">

            <div className="w-[430px] bg-[#ECE9D8] rounded-md overflow-hidden shadow-2xl border border-[#003C74]">

              {/* Title Bar */}
              <div className="h-8 bg-gradient-to-r from-[#0A246A] to-[#3A6EA5] flex items-center justify-between px-1 text-white">

                <div className="flex items-center gap-2">
                  <BinIcon />
                  <span className="text-sm font-bold">
                    Recycle Bin
                  </span>
                </div>

                <button
                  onClick={() => setShowRecyclePopup(false)}
                  className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex gap-4 p-6">

                <div className="text-5xl">
                  💡
                </div>

                <div>

                  <h2 className="font-bold text-lg mb-3">
                    Cannot Delete Creativity
                  </h2>

                  <p className="text-sm leading-6">
                    Windows cannot delete
                    <strong> Creativity.dll </strong>
                    because it is currently being used by
                    <strong> ZohaOS.exe</strong>.
                    <br /><br />
                    Creativity is a protected system file.
                  </p>

                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 px-5 pb-5">

                <button
                  onClick={() => setShowRecyclePopup(false)}
                  className="px-7 py-1 bg-[#ECE9D8] border border-gray-500 shadow-[inset_1px_1px_white,inset_-1px_-1px_gray]"
                >
                  OK
                </button>

              </div>

            </div>

          </div>
        </>
      )}


    </section>
  );
}