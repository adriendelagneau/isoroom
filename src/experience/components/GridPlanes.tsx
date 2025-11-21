import { useFrame } from "@react-three/fiber";
import React, { useMemo, useState, useRef } from "react";
import * as THREE from "three";

interface PlaneProps {
  position: [number, number, number];
  planeDepth: number;
  planeWidth: number;
}

const Plane: React.FC<PlaneProps> = ({ position, planeDepth, planeWidth }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#99c1f1",
      emissive: "#99c1f1",
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0,
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetOpacity = hovered ? 0.8 : 1;
    const lerpFactor = hovered ? 0.5 : 0.15;

    const newOpacity = THREE.MathUtils.lerp(opacity, targetOpacity, lerpFactor);
    setOpacity(newOpacity);

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = newOpacity;
    mat.emissiveIntensity = hovered ? 1.5 : 0.8;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
      onPointerMove={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[planeDepth, planeWidth]} />
    </mesh>
  );
};

interface GridPlanesProps {
  position?: [number, number, number];
  rows: number;
  columns: number;
  planeWidth: number;
  planeDepth: number;
  spacing: number;
}

const GridPlanes = React.forwardRef<THREE.Group, GridPlanesProps>(
  (
    { position = [0, 0, 0], rows, columns, planeWidth, planeDepth, spacing },
    ref
  ) => {
    const gridWidth = columns * (planeWidth + spacing) - spacing;
    const gridDepth = rows * (planeDepth + spacing) - spacing;

    const startX = planeWidth / 2 - gridWidth / 2;
    const startZ = planeDepth / 2 - gridDepth / 2;

    const planes: React.ReactNode[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = startX + col * (planeWidth + spacing);
        const z = startZ + row * (planeDepth + spacing);

        planes.push(
          <Plane
            key={`plane-${row}-${col}`}
            planeDepth={planeDepth}
            planeWidth={planeWidth}
            position={[x, -0.125, z]}
          />
        );
      }
    }

    return (
      <group position={position} ref={ref}>
        {planes}
      </group>
    );
  }
);

GridPlanes.displayName = "GridPlanes";

export default GridPlanes;
