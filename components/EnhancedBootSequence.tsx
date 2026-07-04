"use client";
import { useEffect, useState } from "react";

interface BootLine {
  text: string;
  color: string;
  glitch: boolean;
  timestamp: number;
}

export default function EnhancedBootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [bootLines, setBootLines] = useState<BootLine[]>([]);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const bootSequence = [
    { text: "BOOTING ZOHA_OS v2.0...", glitch: false },
    { text: "INITIALIZING DESIGN ENGINE...", glitch: false },
    { text: "LOADING CREATIVE MODULE...", glitch: false },
    { text: "CHECKING JACK OF ALL TRADES STATUS...", glitch: false },
    { text: "████████░░ 80% COMPLETE", glitch: false },
    { text: "ESTABLISHING QUANTUM LINK...", glitch: true }, // glitch line
    { text: "ERROR: CONNECTION LOST", glitch: true },
    { text: "RECONNECTING...", glitch: false },
    { text: "ACCESS GRANTED.", glitch: false },
    { text: "WELCOME BACK, ZOHA", glitch: false },
  ];

  // Play beep sound (optional)
  const playBeep = () => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 500;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  useEffect(() => {
    let i = 0;
    setBootLines([]);

    const interval = setInterval(() => {
      const line = bootSequence[i];
      
      // Random glitch effect
      if (line.glitch) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }

      setBootLines((prev) => [
        ...prev,
        {
          text: line.text,
          color: "text-green-500",
          glitch: line.glitch,
          timestamp: Date.now(),
        },
      ]);

      playBeep();
      i++;

      if (i >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  return (
    <main
      className={`min-h-screen bg-black text-green-500 flex flex-col items-center justify-center crt ${
        glitchEffect ? "glitch" : ""
      }`}
    >
      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-8 right-8 text-green-500 text-sm border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-black transition-all"
      >
        {soundEnabled ? "🔊 SOUND ON" : "🔇 SOUND OFF"}
      </button>

      {/* Boot lines */}
      <div className="text-2xl md:text-4xl tracking-widest space-y-4 font-mono max-w-2xl px-8">
        {bootLines.map((line, i) => (
          <p
            key={i}
            className={`${line.glitch ? "glitch-text" : ""} animate-fadeIn opacity-0`}
            style={{
              animation: `fadeIn 0.3s ease-in forwards`,
              animationDelay: `${i * 0.1}s`,
              color: line.glitch ? "#ff006e" : "#22c55e",
            }}
          >
            {line.text}
            {i === bootLines.length - 1 && (
              <span className="inline-block ml-2 animate-pulse">█</span>
            )}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      {bootLines.length < bootSequence.length && (
        <div className="absolute bottom-12 left-12 right-12 md:left-24 md:right-24">
          <div className="h-1 bg-green-500/20 border border-green-500">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${(bootLines.length / bootSequence.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-green-500/60 mt-2">
            {Math.round((bootLines.length / bootSequence.length) * 100)}%
          </p>
        </div>
      )}

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,#000 0px,#000 2px,transparent 2px,transparent 4px)]" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
          to {
            opacity: 1;
            text-shadow: 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @keyframes glitch {
          0% {
            text-shadow: 2px 0 #ff006e;
            transform: translateX(0);
          }
          20% {
            text-shadow: -2px 0 #00f0ff;
            transform: translateX(-2px);
          }
          40% {
            text-shadow: 2px 0 #ff006e;
            transform: translateX(2px);
          }
          60% {
            text-shadow: -2px 0 #00f0ff;
            transform: translateX(-2px);
          }
          80% {
            text-shadow: 2px 0 #ff006e;
            transform: translateX(2px);
          }
          100% {
            text-shadow: 0 0 #22c55e;
            transform: translateX(0);
          }
        }

        .glitch-text {
          animation: glitch 0.3s;
        }

        .glitch {
          filter: brightness(1.1) contrast(1.2);
        }

        .crt {
          background: radial-gradient(ellipse at center, #000 0%, #1a1a1a 100%);
          font-family: "Courier New", monospace;
          letter-spacing: 0.05em;
        }

        .boot-old {
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </main>
  );
}