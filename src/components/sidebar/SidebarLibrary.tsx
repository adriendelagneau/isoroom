"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarLibraryProps {
  object: InteractiveObject;
}

const SidebarLibrary: React.FC<SidebarLibraryProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const container = containerRef.current;
      const underlineEl = underlineRef.current;

      const q = gsap.utils.selector(container);
      const blocks = q(".content-block") as HTMLElement[];

      const tl = gsap.timeline({ delay: 0.4 });

      // Animate underline
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, { scaleX: 1, duration: 0.8, ease: "power3.out" });

      // Flatten all elements with metadata
      type ElementMeta = {
        el: HTMLElement;
        yOffset: number;
        duration: number;
        stagger: number;
        scroll: number;
      };

      const allElements: ElementMeta[] = [];

      blocks.forEach((block) => {
        const letters = Array.from(
          block.querySelectorAll<HTMLElement>(".inner-span")
        );
        const icons = Array.from(
          block.querySelectorAll<HTMLElement>(".tech-item")
        );

        letters.forEach((el) =>
          allElements.push({
            el,
            yOffset: 6,
            duration: 0.04,
            stagger: 0.04,
            scroll: 24,
          })
        );

        icons.forEach((el) =>
          allElements.push({
            el,
            yOffset: 0,
            duration: 0.4,
            stagger: 0.15,
            scroll: 45.5,
          })
        );
      });

      // Hide all elements first
      allElements.forEach(({ el }) => gsap.set(el, { opacity: 0 }));

      // Animate elements sequentially
      let globalTime = 0.6;
      allElements.forEach(({ el, yOffset, duration, stagger, scroll }) => {
        tl.add(() => {
          gsap.fromTo(
            el,
            { opacity: 0, y: yOffset },
            { opacity: 1, y: 0, duration, ease: "power2.out" }
          );

          // Auto-scroll depending on element type
          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const distanceFromBottom = containerRect.bottom - rect.bottom;

          if (distanceFromBottom < scroll * 2) {
            gsap.to(container, {
              scrollTop: `+=${scroll}`,
              duration: 0.25,
              ease: "power2.out",
            });
          }
        }, globalTime);

        globalTime += stagger;
      });

      // ✅ Make container scrollable when timeline finishes
      tl.eventCallback("onComplete", () => {
        container.style.overflowY = "auto";
      });

      return () => tl.kill();
    },
    { scope: containerRef, dependencies: [object] }
  );
  return (
    <div
      ref={containerRef}
      className="scrollbar scrollbar-none flex h-full flex-col space-y-4 overflow-hidden pb-4"
    >
      {/* Title */}
      <h2 className="sidebar-title inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span bg-primary block h-px origin-left scale-x-0"
          />
        </span>
      </h2>

      {/* Dynamic blocks */}
      {object.blocks?.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={i} className="content-block text-lg leading-relaxed">
              {textSplitter(block.content)}
            </p>
          );
        }

        if (block.type === "techList") {
          return (
            <div key={i} className="content-block flex flex-wrap gap-3">
              {block.items.map((item, idx) => (
                <div
                  key={idx}
                  className="tech-item flex flex-col items-center text-center"
                >
                  <div className="relative h-8 w-8">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs opacity-80">{item.name}</span>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default SidebarLibrary;
