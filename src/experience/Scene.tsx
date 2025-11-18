import { Suspense } from "react";

import Room_1 from "./components/models/Room-1";
import Room_2 from "./components/models/Room-2";
import Room_3 from "./components/models/Room-3";
import Room_4 from "./components/models/Room-4";

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0.02, 0]}
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <Room_1 />
        <Room_2 />
        <Room_3 />
        <Room_4 />
      </group>
    </Suspense>
  );
};

export default Scene;
