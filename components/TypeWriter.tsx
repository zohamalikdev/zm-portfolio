"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  lines: string[];
  className?: string;
  speed?: number;
  lineDelay?: number;
  onComplete?: () => void;
}

export default function Typewriter({
  lines,
  className = "",
  speed = 35,
  lineDelay = 500,
  onComplete,
}: TypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  // Start when visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;

    async function type() {
      const finished: string[] = [];

      for (const line of lines) {
        let text = "";

        for (let i = 0; i < line.length; i++) {
          if (cancelled) return;

          text += line[i];
          setCurrentLine(text);

          await new Promise((r) => setTimeout(r, speed));
        }

        finished.push(line);
        setDisplayedLines([...finished]);
        setCurrentLine("");

        await new Promise((r) => setTimeout(r, lineDelay));
      }

      onComplete?.();
    }

    type();

    return () => {
      cancelled = true;
    };
  }, [started]);

  return (
    <div ref={ref} className={className}>
      {displayedLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      {currentLine && (
        <p>
          {currentLine}
          <span className="animate-pulse">|</span>
        </p>
      )}
    </div>
  );
}