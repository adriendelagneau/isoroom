"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useExperienceUIStore from "@/store/useExperienceUIStore";
import useInteractionStore from "@/store/useInteractionSrore";

const InteractionHandler = () => {
  const { camera, scene, gl } = useThree();

  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const experienceStarted = useExperienceUIStore((s) => s.experienceStarted);
  const { setHoveredObject, setClickedObject } = useInteractionStore();

  const interactiveNames = interactiveObjects.map((o) => o.name.toLowerCase());

  /** 🎯 Pointer move on CANVAS only */
  useEffect(() => {
    if (!experienceStarted) return; // ⛔ DO NOTHING before start

    const canvas = gl.domElement;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    return () => canvas.removeEventListener("pointermove", handlePointerMove);
  }, [gl.domElement, experienceStarted]);

  /** 🧲 Hover detection each frame */
  useFrame(() => {
    if (!experienceStarted) {
      document.body.style.cursor = "auto";
      return; // ⛔ skip raycasting
    }

    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    const hit = intersects.find((i) =>
      interactiveNames.includes(i.object.name.toLowerCase())
    );

    setHoveredObject(hit ? hit.object.name : null);
    document.body.style.cursor = hit ? "pointer" : "auto";
  });

  /** 🖱️ Click */
  useEffect(() => {
    if (!experienceStarted) return; // ⛔ skip until ready

    const canvas = gl.domElement;

    const handleClick = () => {
      const { hoveredObject, clickedObject } = useInteractionStore.getState();

      if (hoveredObject && hoveredObject !== clickedObject) {
        setClickedObject(hoveredObject);
      } else if (!hoveredObject) {
        setClickedObject(null);
      }
    };

    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [gl.domElement, experienceStarted, setClickedObject]);

  return null;
};

export default InteractionHandler;
