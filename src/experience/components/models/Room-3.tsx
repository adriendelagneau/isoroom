"use client";

import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import React from "react";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: MeshStandardMaterial };
};

const Room_3: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-3.glb") as unknown as GLTFResult;

  const bakedTexture = useTexture("/textures/room-3.jpg", (loader) => {
    loader.flipY = false;
  });

  const pcVideo = useVideoTexture("/textures/matrix-rain.mp4", {
    loop: true,
    muted: true,
    autoplay: true,
  });

  const laptopVideo = useVideoTexture("/textures/matrix-rain.mp4", {
    loop: true,
    muted: true,
    autoplay: true,
  });

  return (
    <group {...props} dispose={null}>
      {/* 🖱 Mouse + Wheel */}
      <group>
        {[
          ["wheel", [1.586, 1.859, 1.179]],
          ["Mouse_final", [1.612, 1.85, 1.212]],
        ].map(([name, pos]) => (
          <mesh
            key={String(name)}
            geometry={nodes[name as string].geometry}
            position={pos as [number, number, number]}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 💻 Laptop + Plane */}
      <group>
        <mesh
          geometry={nodes["laptop-screen"].geometry}
          position={[0.053, 1.913, 2.139]}
        >
          <meshBasicMaterial
            map={laptopVideo}
            toneMapped={false}
            color="#777"
          />
        </mesh>
        <mesh geometry={nodes.Plane.geometry} position={[0.138, 1.87, 2.311]}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* 🖥 PC Case + fans */}
      <group>
        {[
          ["Plane004", [-0.732, 0.888, 2.398]],
          ["caseinside", [-0.642, 0.728, 2.819]],
          ["case001", [-0.498, 0.822, 2.956]],
          ["case", [-0.879, 0.649, 2.501]],
          ["fan004", [-1.006, 1.041, 2.34]],
          ["fan003", [-0.834, 0.756, 2.712]],
          ["fan002", [-0.978, 0.726, 2.52]],
          ["fan001", [-0.529, 0.849, 2.917]],
          ["fan", [-0.522, 0.597, 2.926]],
        ].map(([name, pos]) => (
          <mesh
            key={String(name)}
            geometry={nodes[name as string].geometry}
            position={pos as [number, number, number]}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🪑 Chair */}
      <group>
        {[
          ["T_Joint", [1.484, 1.029, 2.386]],
          ["Supprt_-_V", [1.478, 1.101, 2.384]],
          ["Gas_Strut", [1.484, 0.718, 2.386]],
          ["Frame", [1.647, 1.523, 2.441]],
          ["Cushions_-_Back", [1.769, 1.835, 2.482]],
          ["Cushion_-Bottom", [1.396, 1.278, 2.357]],
          ["Crossbar", [1.486, 1.028, 2.387]],
          ["Legs&_Wheels#", [1.91, 0.488, 2.53]],
          ["Legs&_Wheels#001", [1.478, 0.488, 2.836]],
          ["Legs&_Wheels#002", [1.054, 0.488, 2.52]],
          ["Legs&_Wheels#003", [1.224, 0.488, 2.019]],
          ["Legs&_Wheels#004", [1.753, 0.488, 2.025]],
          ["Arm_Rests", [1.535, 1.369, 2.403]],
        ].map(([name, pos]) => (
          <mesh
            key={String(name)}
            geometry={nodes[name as string].geometry}
            position={pos as [number, number, number]}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🖥 Monitor + PC Screen */}
      <mesh geometry={nodes.Monitor.geometry} position={[1.112, 2.037, 0.958]}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        geometry={nodes["pc-screen"].geometry}
        position={[1.049, 2.366, 1.08]}
      >
        <meshBasicMaterial map={pcVideo} toneMapped={false} color="#777" />
      </mesh>

      {/* 🪵 Desk */}
      <mesh
        geometry={nodes.Modern_Desk.geometry}
        position={[0.579, 1.528, 1.352]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {/* 💡 Desk Lamp */}
      <mesh
        geometry={nodes.Desk_Lamp.geometry}
        position={[-0.824, 2.35, 2.796]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {/* 🌀 Carpet & Keyboard */}
      {[
        ["Circle_Rug", [1.613, 1.825, 1.222]],
        ["Blender_keyboard", [1.059, 1.858, 1.823]],
        ["Black_circle_round_carpet", [-0.048, 0.395, 1.71]],
      ].map(([name, pos]) => (
        <mesh
          key={String(name)}
          geometry={nodes[name as string].geometry}
          position={pos as [number, number, number]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      ))}
    </group>
  );
};

/* ----------------------- 🔹 Preload ----------------------- */
useGLTF.preload("/models/room-3.glb");

export default Room_3;
