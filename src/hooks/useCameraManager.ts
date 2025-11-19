// /hooks/useCameraManager.ts
"use client";

import gsap from "gsap";
import { useEffect, useCallback } from "react";
import * as THREE from "three";

import { introSettings, interactiveObjects } from "@/data/interactiveObjects";
import useCamera from "@/store/useCamera";
import useExperienceUIStore from "@/store/useExperienceUIStore";
import useInteractionStore from "@/store/useInteractionSrore";
import { useResponsiveStore } from "@/store/useResponsiveStore";

const useCameraManager = ({
  camera,
}: {
  camera: React.RefObject<THREE.OrthographicCamera | null>;
}) => {
  const { clickedObject } = useInteractionStore();
  const { hasUserEntered } = useExperienceUIStore();

  const { setCameraTarget, targetPosition, targetQuaternion, zoom } =
    useCamera();
  const { isMobile, isTablet } = useResponsiveStore();

  /**
   * Choose the right transform config based on device type
   */
  const getTransformForDevice = useCallback(
    (name: string) => {
      const source =
        interactiveObjects.find((o) => o.name === name) ??
        introSettings.find((o) => o.name === name);

      if (!source) return null;

      if (isMobile && source.mobile) return source.mobile;
      if (isTablet && source.tablet) return source.tablet;

      return source.desktop ?? null;
    },
    [isMobile, isTablet]
  );

  /**
   * Update target transform when interaction state updates
   */
  useEffect(() => {
    const viewName = hasUserEntered
      ? clickedObject || "InitialView"
      : "IntroView";

    const config = getTransformForDevice(viewName);
    if (!config) return;

    const { targetPosition, targetRotation, zoom } = config;

    const pos = new THREE.Vector3().fromArray(targetPosition);
    const quat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...targetRotation)
    );

    setCameraTarget(pos, quat, zoom);
  }, [clickedObject, hasUserEntered, getTransformForDevice, setCameraTarget]);

  /**
   * Animate the actual camera when target state changes
   */
  useEffect(() => {
    const cam = camera.current;
    if (!cam) return;

    const duration = 1.5;
    const ease = "power3.inOut";

    // avoid overlapping animations
    gsap.killTweensOf([cam.position, cam.quaternion, cam]);

    gsap.to(cam.position, {
      duration,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease,
      overwrite: true,
    });

    gsap.to(cam.quaternion, {
      duration,
      x: targetQuaternion.x,
      y: targetQuaternion.y,
      z: targetQuaternion.z,
      w: targetQuaternion.w,
      ease,
      overwrite: true,
    });

    gsap.to(cam, {
      duration,
      zoom,
      ease,
      overwrite: true,
      onUpdate: () => cam.updateProjectionMatrix(),
    });
  }, [targetPosition, targetQuaternion, zoom, camera]);
};

export default useCameraManager;
