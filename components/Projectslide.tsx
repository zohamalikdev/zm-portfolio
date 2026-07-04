"use client";

import Image from "next/image";

type ProjectSlideProps = {
  index: string; // e.g. "01 / 04"
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveHref: string;
  githubHref?: string;
  reverse?: boolean; // flip image/text sides
};

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.66-4.04-1.66-.55-1.44-1.34-1.82-1.34-1.82-1.09-.77.08-.76.08-.76 1.21.09 1.84 1.28 1.84 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.38-5.47-6.13 0-1.35.47-2.46 1.24-3.32-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27.96-.27 1.98-.41 3-.42 1.02.01 2.04.15 3 .42 2.29-1.6 3.3-1.27 3.3-1.27.66 1.71.24 2.97.12 3.28.77.86 1.24 1.97 1.24 3.32 0 4.76-2.8 5.82-5.48 6.12.43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.37 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0z" />
    </svg>
  );
}

export default function ProjectSlide({
  index,
  title,
  description,
  tags,
  image,
  liveHref,
  githubHref,
  reverse = false,
}: ProjectSlideProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24">
      {/* Meta row: eyebrow left, index right — stands in for the deck's date row */}
      <div className="flex justify-between items-start mb-12 font-mag-body text-xs md:text-sm tracking-wide">
        <span className="opacity-60">SELECTED WORK</span>
        <span className="opacity-60">( {index} )</span>
      </div>

      <div
        className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center flex-1 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Screenshot */}
        <div className="relative aspect-[4/3] border-4 border-current overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              className="object-cover object-top grayscale contrast-125"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center brutal-tag opacity-40">
              [ ADD PREVIEW IMAGE ]
            </div>
          )}
        </div>

        {/* Giant title + description + links */}
        <div>
          <h3 className="font-display uppercase leading-[0.85]" style={{ fontSize: "clamp(40px, 6vw, 90px)" }}>
            {title}
          </h3>

          <p className="font-mag-body text-base md:text-lg opacity-70 leading-relaxed mt-6 max-w-md">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-current px-2 py-1 text-[11px] font-mag-body font-bold uppercase tracking-wide opacity-70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-current px-4 py-2 text-sm font-mag-body hover:bg-current hover:text-black brutal-btn brutal-btn-dark"
            >
              <ExternalLinkIcon /> LIVE SITE
            </a>
            {githubHref && (
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-current px-4 py-2 text-sm font-mag-body hover:bg-current hover:text-black brutal-btn brutal-btn-dark"
              >
                <GithubIcon /> CODE
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}