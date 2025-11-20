"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { useMorphStore } from "@/store/useMorphStore";
import { textSplitter } from "@/utils/textSplitter";

import { Button } from "../ui/button";

interface SidebarMonkeyProps {
  object: InteractiveObject;
}

const SidebarMonkey: React.FC<SidebarMonkeyProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const setTargetIndex = useMorphStore((state) => state.setTargetIndex);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      // ⚡ GSAP scoped selector — NO querySelectorAll needed
      const q = gsap.utils.selector(containerRef);

      const textSpans = q(".inner-span"); // characters
      const buttons = q("button"); // your buttons

      const tl = gsap.timeline({ delay: 0.5 });

      // Underline animation
      gsap.set(underlineRef.current, {
        transformOrigin: "left center",
        scaleX: 0,
      });

      tl.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // letters fade-in
      tl.fromTo(
        textSpans,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // Buttons animation (after text)
      tl.to(
        buttons,
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.2,
          ease: "power3.out",
        },
        "+=0.2"
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Title + underline */}
      <h2 className="sidebar-title inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span bg-primary block h-px origin-left scale-x-0"
          />
        </span>
      </h2>

      {/* Animated text */}
      <p className="opacity-90">{textSplitter(object.text ?? "")}</p>

      {/* Buttons (start invisible) */}
      <div className="flex gap-2 pt-2">
        <Button onClick={() => setTargetIndex(0)} className="btn opacity-0">
          Three.JS
        </Button>
        <Button onClick={() => setTargetIndex(1)} className="btn opacity-0">
          Suzanne
        </Button>
      </div>
    </div>
  );
};

export default SidebarMonkey;
