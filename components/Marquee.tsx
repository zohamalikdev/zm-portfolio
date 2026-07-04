export default function Marquee({
  text,
  speed = 22,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const chunk = (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="mx-6 font-display uppercase text-sm md:text-base tracking-wide shrink-0">
          {text} <span className="opacity-40">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex w-max animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` }}
      >
        {chunk}
        {chunk}
      </div>
    </div>
  );
}