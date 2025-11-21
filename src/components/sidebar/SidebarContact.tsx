"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

import { Button } from "../ui/button";

interface SidebarContactProps {
  object: InteractiveObject;
}

const SidebarContact: React.FC<SidebarContactProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      // ⚡ GSAP scoped selector (ref-only, no DOM querying)
      const q = gsap.utils.selector(containerRef);

      const textSpans = q(".inner-span");
      const button = q(".download-btn"); // now targets <Button>

      const tl = gsap.timeline({ delay: 0.5 });

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
        {
          opacity: 1,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // --- Download button animation ---
      tl.to(
        button,

        {
          opacity: 1,
          duration: 0.5,
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
      <p className="text-lg leading-relaxed opacity-90">
        {textSplitter(object.text ?? "A cup of coffee keeps the code flowing!")}
      </p>
      {/* Download button (animated via .download-btn) */}
      <Button className="download-btn w-full opacity-0">
        <a href="/pdf/visit-card.pdf" download>
          Carte De Visite
        </a>
      </Button>
    </div>
  );
};

export default SidebarContact;
