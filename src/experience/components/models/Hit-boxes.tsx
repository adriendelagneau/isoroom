"use client";

import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useMemo, useRef, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

import useInteractionStore from "@/store/useInteractionSrore";

type GLTFResult = {
  nodes: Record<string, Mesh>;
};

const HitBoxes: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/hit-boxes.glb") as unknown as GLTFResult;
  const { hoveredObject, clickedObject } = useInteractionStore();

  // 🟦 Transparent material for hit-boxes (only used for raycasting)
  const hitBoxMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );

  // 💡 Glowing material for corners
  const cornersMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#99c1f1",
        emissive: "#99c1f1",
        emissiveIntensity: 2,
      }),
    []
  );

  // 🔹 Refs for animating each corner group
  const refs = {
    Clock: useRef<Mesh>(null),
    Library: useRef<Mesh>(null),
    Mug: useRef<Mesh>(null),
    Photos: useRef<Mesh>(null),
    Monkey: useRef<Mesh>(null),
  };

  // ✨ Animate corners on hover or click
  useEffect(() => {
    Object.entries(refs).forEach(([key, ref]) => {
      const isSelected = clickedObject === key;
      const isHovered = hoveredObject === key;
      const shouldShow = isSelected || (!clickedObject && isHovered);

      gsap.to(ref.current?.scale || {}, {
        x: shouldShow ? 1 : 0,
        y: shouldShow ? 1 : 0,
        z: shouldShow ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredObject, clickedObject]);

  // 🧩 Object definitions from your GLTF
  const objects = [
    {
      name: "Clock",
      corner: "corners-clock",
      box: "hit-box-clock",
      positionCorner: [-3.933, 3.977, -1.397],
      positionBox: [-3.915, 3.983, -1.378],
    },
    {
      name: "Library",
      corner: "corners-library",
      box: "hit-box-library",
      positionCorner: [3.638, 3.347, -0.352],
      positionBox: [3.824, 3.353, -0.546],
    },
    {
      name: "Mug",
      corner: "corners-mug",
      box: "hit-box-mug",
      positionCorner: [-0.445, 1.926, 2.979],
      positionBox: [-0.429, 1.915, 2.981],
    },
    {
      name: "Photos",
      corner: "corners-photos",
      box: "hit-box-photos",
      positionCorner: [-2.033, 3.705, -3.36],
      positionBox: [-2.024, 3.712, -3.351],
    },
    {
      name: "Monkey",
      corner: "corners-monkey",
      box: "hit-box-monkey",
      positionCorner: [2.561, 4.571, -1.43],
      positionBox: [2.77, 4.573, -1.719],
    },
  ];

  return (
    <group {...props} dispose={null}>
      {objects.map((obj) => (
        <group key={obj.name}>
          {/* 💠 Animated glowing corners */}
          <mesh
            ref={refs[obj.name as keyof typeof refs]}
            geometry={nodes[obj.corner].geometry}
            material={cornersMaterial}
            position={obj.positionCorner as [number, number, number]}
            scale={0}
          />

          {/* 🟦 Invisible hit-box for raycasting */}
          <mesh
            name={obj.name}
            geometry={nodes[obj.box].geometry}
            material={hitBoxMaterial}
            position={obj.positionBox as [number, number, number]}
          />
        </group>
      ))}
    </group>
  );
};

// 🔹 Preload model for better performance
useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxes;
