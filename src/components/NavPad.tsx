"use client";

import { BriefcaseBusiness, Coffee, Library } from "lucide-react";
import React from "react";
import { GiMonkey } from "react-icons/gi";

import useExperienceUIStore from "@/store/useExperienceUIStore";
import useInteractionStore from "@/store/useInteractionSrore";

const NavPad = () => {
  const setClickedObject = useInteractionStore((s) => s.setClickedObject);
  const experienceStarted = useExperienceUIStore((s) => s.experienceStarted);

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 h-28 w-28 rounded-xl border-2 border-zinc-800 bg-zinc-950 p-2 transition-opacity duration-500 lg:h-32 lg:w-32 ${
        experienceStarted
          ? "pointer-events-auto opacity-100 delay-1000"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 lg:gap-2">
        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setClickedObject("Library");
          }}
        >
          <Library className="text-primary h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
        </div>

        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setClickedObject("Photos");
          }}
        >
          <BriefcaseBusiness className="text-primary h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
        </div>

        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setClickedObject("Mug");
          }}
        >
          <Coffee className="text-primary h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
        </div>

        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setClickedObject("Monkey");
          }}
        >
          <GiMonkey className="text-primary h-8 w-8 lg:h-9 lg:w-9" />
        </div>
      </div>
    </div>
  );
};

export default NavPad;
