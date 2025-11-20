"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject, photoObjects } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

import { Button } from "../ui/button";

interface SidebarPhotosProps {
  object: InteractiveObject;
}

const SidebarPhotos: React.FC<SidebarPhotosProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      // ⚡ GSAP's scoped selector
      const q = gsap.utils.selector(containerRef);

      const textSpans = q(".inner-span"); // characters
      const buttons = q("button.photo-btn"); // photo buttons

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
      if (textSpans.length) {
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
      }

      // --- Buttons animation ---
      tl.to(
        buttons,
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.3,
          ease: "power3.out",
        },
        "+=0.2"
      );
    },
    { scope: containerRef }
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
        <p className="text-xl opacity-90">{textSplitter(object.text)}</p>
      )}

      {/* Buttons (will animate in) */}
      <div className="flex flex-col gap-2 pt-2">
        {photoObjects.map((photo, index) => (
          <Button key={index} className="photo-btn opacity-0">
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center"
            >
              {photo.name} — {photo.websiteName}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SidebarPhotos;
