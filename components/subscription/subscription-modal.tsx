"use client";

import { type ReactNode, useEffect } from "react";

export function LemonSqueezyModalLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  // Ensure Lemon Squeezy is loaded before opening the modal
  useEffect(() => {
    window.createLemonSqueezy();
  }, []);

  return (
    <div
      className={className}
      onClick={() => {
        if (href) {
          window.LemonSqueezy.Url.Open(href);
        } else {
          throw new Error(
            "href provided for the Lemon Squeezy modal is not valid.",
          );
        }
      }}
    >
      {children}
    </div>
  );
}
