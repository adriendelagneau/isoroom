"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import CameraGUI from "./components/CameraGUI";
import CameraManager from "./components/CameraManager";
import InteractionHandler from "./components/InteractionHandler";
import Scene from "./Scene";

const Experience = () => {
  const pointer = useRef(new THREE.Vector2());
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

  // Track mouse movement and update pointer position
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      flat
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        zoom={60}
        ref={cameraRef}
      />
      <Scene pointer={pointer} />
      <InteractionHandler />
      <CameraManager camera={cameraRef} />
      <CameraGUI cameraRef={cameraRef} />
    </Canvas>
  );
};

export default Experience;
