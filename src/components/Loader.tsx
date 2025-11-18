"use client";

import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [canEnter, setCanEnter] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ✅ Smooth progress updates
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayProgress((prev) => Math.max(prev, Math.round(progress)));
    });
    return () => cancelAnimationFrame(id);
  }, [progress]);

  // ✅ Detect full load and flip card
  useGSAP(
    () => {
      if (progress === 100 && cardRef.current && !canEnter) {
        setCanEnter(true);

        gsap.to(cardRef.current, {
          rotationX: -180,
          transformOrigin: "center center",
          force3D: true,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.5,
        });
      }
    },
    { dependencies: [progress, canEnter], scope: cardRef }
  );

  const handleEnter = () => {
    if (!topRef.current || !bottomRef.current) return;

    gsap
      .timeline({
        onComplete: () => {
          setIsDone(true); // hide loader
        },
      })
      .to(topRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        bottomRef.current,
        {
          y: "100%",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );
  };

  if (isDone) return null;

  const width = 120;
  const height = 100;
  const strokeWidth = 2;
  const perimeter = (width - strokeWidth) * 2 + (height - strokeWidth) * 2;
  const dashOffset = perimeter - (displayProgress / 100) * perimeter;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        ref={topRef}
        className="bg-background absolute top-0 right-0 left-0 flex h-1/2 items-end justify-center"
      >
        <div
          className="relative h-[100px] w-[120px]"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={cardRef}
            className="absolute top-[-30px] h-[100px] w-full text-2xl"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >
            {/* FRONT SIDE */}
            <div
              className="absolute flex h-full w-full items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="absolute"
              >
                <rect
                  x={strokeWidth / 2}
                  y={strokeWidth / 2}
                  width={width - strokeWidth}
                  height={height - strokeWidth}
                  rx="6"
                  ry="6"
                  stroke="#333"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <rect
                  x={strokeWidth / 2}
                  y={strokeWidth / 2}
                  width={width - strokeWidth}
                  height={height - strokeWidth}
                  rx="6"
                  ry="6"
                  stroke="#99c1f1"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={perimeter}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <span className="bg-background text-primary pointer-events-auto">
                Loading
              </span>
            </div>

            {/* BACK SIDE */}
            <div
              className="absolute flex h-full w-full items-center justify-center"
              style={{
                transform: "rotateX(180deg) translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <button
                onClick={handleEnter}
                disabled={!canEnter}
                className={clsx(
                  "text-primary pointer-events-auto h-full w-full rounded-md px-6 py-3 transition duration-300",
                  {
                    "border-primary hover:bg-primary hover:text-background cursor-pointer border-2 opacity-100":
                      canEnter,
                    "opacity-0": !canEnter,
                  }
                )}
              >
                Entrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomRef}
        className="bg-background absolute right-0 bottom-0 left-0 h-1/2"
      />
    </div>
  );
}
