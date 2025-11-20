"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarClockProps {
  object: InteractiveObject;
}

const SidebarClock: React.FC<SidebarClockProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const q = gsap.utils.selector(containerRef);
      const textSpans = q(".inner-span");

      const tl = gsap.timeline({ delay: 0.3 });

      // --- Underline animation ---
      gsap.set(underlineRef.current, {
        transformOrigin: "left center",
        scaleX: 0,
      });
      tl.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // --- Text animation ---
      tl.fromTo(
        textSpans,
        { opacity: 0 },
        { opacity: 1, stagger: 0.04, ease: "power2.out" },
        "-=0.2"
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
      {object.text && (
        <div className="scroll-area relative pr-1 text-lg leading-relaxed opacity-90">
          {textSplitter(object.text)}
        </div>
      )}
    </div>
  );
};

export default SidebarClock;
