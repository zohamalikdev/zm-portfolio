"use client";

import Script from "next/script";

export default function Neko() {
  return (
    <Script
      src="https://louisabraham.github.io/nekojs/neko.js"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-ignore
        const neko = window.createNeko({
          speed: 20,
          fps: 60,
          behaviorMode: 0,
          allowBehaviorChange: true,
        });

        neko.start();
      }}
    />
  );
}