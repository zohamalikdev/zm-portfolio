"use client";

export default function Splitrveal({
  text,
  className = "",
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-[riseIn_0.8s_cubic-bezier(0.16,1,0.3,1)_backwards] motion-reduce:animate-none"
          style={{ animationDelay: `${baseDelay + i * 0.03}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}