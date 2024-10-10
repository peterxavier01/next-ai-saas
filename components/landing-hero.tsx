"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="space-y-5 py-36 text-center font-bold text-white">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Best AI Tool for</h1>
        <div className="bg-gradient-to-r from-cyan to-bright-yellow bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Music Generation",
                "Code Generation.",
                "Video Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Create content using AI 10X faster.
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
          >
            Start Generating for Free
          </Button>
        </Link>
      </div>

      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        ✨ No credit card required
      </div>
    </div>
  );
};
