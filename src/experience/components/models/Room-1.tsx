import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";
import { Mesh } from "three";

const Room_1: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-1.glb");
  const bakedTexture = useTexture("/textures/room-1.jpg", (loader) => {
    loader.flipY = false; // ✅ set flipY while loading
  });

  return (
    <group {...props} dispose={null}>
      {/* 🪟 Window */}
      {nodes["win_singleRectangleClosed"] && (
        <mesh
          geometry={(nodes["win_singleRectangleClosed"] as Mesh).geometry}
          position={[1.188, 3.639, -4.208]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🧱 Wall */}
      {nodes["wall"] && (
        <mesh
          geometry={(nodes["wall"] as Mesh).geometry}
          position={[0.497, 2.987, -1.864]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🛋 Sofa */}
      {["Legs", "Cushions", "Backmulti"].map(
        (name) =>
          nodes[name] && (
            <mesh
              key={name}
              geometry={(nodes[name] as Mesh).geometry}
              position={(nodes[name] as Mesh).position}
            >
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🪴 Plant */}
      {nodes["House_Plant_Dracaena_Lemon_Lime"] && (
        <mesh
          geometry={(nodes["House_Plant_Dracaena_Lemon_Lime"] as Mesh).geometry}
          position={[-0.205, 1.899, -4.107]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🔌 Wall Socket */}
      {nodes["EU_wall_socket001"] && (
        <mesh
          geometry={(nodes["EU_wall_socket001"] as Mesh).geometry}
          position={[-4.835, 0.735, -0.543]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 💡 Floor Lamp */}
      {[
        "FloroLamp_WirePlug",
        "FloorLamp_Wire",
        "FloorLamp_Stem",
        "FloorLamp_Cover",
        "FloorLamp_Bulb",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh
              key={name}
              geometry={(nodes[name] as Mesh).geometry}
              position={(nodes[name] as Mesh).position}
            >
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🪵 Floor */}
      {nodes["Floor001"] && (
        <mesh
          geometry={(nodes["Floor001"] as Mesh).geometry}
          position={[-0.01, 0.375, -0.143]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/models/room-1.glb");

export default Room_1;
