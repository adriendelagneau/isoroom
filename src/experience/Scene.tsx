import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Scene = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);

  // rotate cube every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="royalblue" />
      </mesh>
    </Suspense>
  );
};

export default Scene;
