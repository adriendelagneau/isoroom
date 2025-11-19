import { create } from "zustand";

interface ExperienceUIState {
  // --- Loading Phase ---
  isLoadingAssets: boolean;
  assetsLoaded: boolean;

  // --- Intro Phase (auto) ---
  isIntroPlaying: boolean;
  introFinished: boolean;

  // --- User Interaction (manual) ---
  hasUserEntered: boolean;

  // --- Experience / Scene Ready ---
  experienceStarted: boolean;

  // --- UI Blocking (hover) ---
  isUIHovered: boolean;

  // --- Setters ---
  setIsLoadingAssets: (v: boolean) => void;
  setAssetsLoaded: (v: boolean) => void;
  setIsIntroPlaying: (v: boolean) => void;
  setIntroFinished: (v: boolean) => void;
  setHasUserEntered: (v: boolean) => void;
  setExperienceStarted: (v: boolean) => void;
  setIsUIHovered: (v: boolean) => void;
}

const useExperienceUIStore = create<ExperienceUIState>((set, get) => {
  /**
   * Helper to avoid unnecessary updates
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeSet = <K extends keyof ExperienceUIState>(key: K, value: any) => {
    if (get()[key] !== value)
      set({ [key]: value } as Pick<ExperienceUIState, K>);
  };

  return {
    // --- Loading ---
    isLoadingAssets: true,
    assetsLoaded: false,

    // --- Intro ---
    isIntroPlaying: false,
    introFinished: false,

    // --- User enters experience ---
    hasUserEntered: false,

    // --- Experience ---
    experienceStarted: false,

    // --- UI Hover ---
    isUIHovered: false,

    // --- Setters using safeSet ---
    setIsLoadingAssets: (v) => safeSet("isLoadingAssets", v),
    setAssetsLoaded: (v) => safeSet("assetsLoaded", v),
    setIsIntroPlaying: (v) => safeSet("isIntroPlaying", v),
    setIntroFinished: (v) => safeSet("introFinished", v),
    setHasUserEntered: (v) => safeSet("hasUserEntered", v),
    setExperienceStarted: (v) => safeSet("experienceStarted", v),
    setIsUIHovered: (v) => safeSet("isUIHovered", v),
  };
});

export default useExperienceUIStore;
