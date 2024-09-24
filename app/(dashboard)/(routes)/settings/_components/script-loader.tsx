"use client";

import Script from "next/script";

export default function ScriptLoader() {
  return (
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.createLemonSqueezy();
      }}
    />
  );
}
