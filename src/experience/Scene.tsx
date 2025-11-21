import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import useInteractionStore from "@/store/useInteractionSrore";

import GridPlanes from "./components/GridPlanes";
import HitBoxes from "./components/models/Hit-boxes";
import Room_1 from "./components/models/Room-1";
import Room_2 from "./components/models/Room-2";
import Room_3 from "./components/models/Room-3";
import Room_4 from "./components/models/Room-4";
import MorphParticles from "./components/morphing/Particles";
import Smoke from "./components/smoke.tsx/Smoke";

const Scene = ({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const gridPlanesRef = useRef(null);
  const { clickedObject } = useInteractionStore();

  // Animate scene rotation based on pointer position — ONLY if experience has begun
  useFrame(() => {
    if (!groupRef.current) return;

    if (!clickedObject) {
      const targetX = pointer.current.y * Math.PI * 0.01;
      const targetY = pointer.current.x * Math.PI * 0.02;

      rotationX.current = THREE.MathUtils.lerp(rotationX.current, targetX, 0.1);
      rotationY.current = THREE.MathUtils.lerp(rotationY.current, targetY, 0.1);

      groupRef.current.rotation.x = rotationX.current;
      groupRef.current.rotation.y = rotationY.current;
    }
  });

  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0, 0]}
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <group ref={groupRef}>
          {/* GridPlanes */}
          <group rotation={[0, Math.PI / 4, 0]}>
            <GridPlanes
              ref={gridPlanesRef}
              position={[10, -2, -10]}
              rows={20}
              columns={20}
              planeWidth={4}
              planeDepth={4}
              spacing={0}
            />
          </group>
          {/* Room */}
          <Room_1 />
          <Room_2 />
          <Room_3 />
          <Room_4 />
          {/* Hit-Boxes */}
          <HitBoxes />

          {/* Smoke */}
          <Smoke />

          {/* Particles */}
          <MorphParticles />
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
