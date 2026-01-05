import { MotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Scene types for the 3-scene hero experience
 * - chaos: 0-60vh (0-30% scroll progress) - Cards visible, scattered, drifting
 * - organize: 60-120vh (30-60% scroll progress) - Cards sorting into grid layout
 * - order: 120-200vh (60-100% scroll progress) - Cards stable and organized
 */
export type SceneType = 'chaos' | 'organize' | 'order';

/**
 * Scene breakpoints for 200vh hero - extended for smooth transitions
 * Scene 1: 0vh-30vh = 0%-15% of scroll progress (Chaos - cards scattered, drifting)
 * Scene 2: 30vh-150vh = 15%-75% of scroll progress (Long gradual organization)
 * Scene 3: 150vh-200vh = 75%-100% of scroll progress (Final settling, stable)
 */
export const SCENE_BREAKPOINTS = {
  SCENE_1_END: 0.15,
  SCENE_2_END: 0.75,
} as const;

export interface SceneState {
  current: SceneType;
  progress: number; // 0-1 progress within current scene
}

/**
 * Custom hook for managing scene state based on scroll progress
 * Maps scroll progress to distinct scenes and calculates progress within each scene
 */
export function useSceneState(scrollYProgress: MotionValue<number>): SceneState {
  const [scene, setScene] = useState<SceneType>('stillness');
  const [sceneProgress, setSceneProgress] = useState(0);

  // Listen to scroll progress changes and update scene state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      let currentScene: SceneType;
      let progress: number;

      if (latest < SCENE_BREAKPOINTS.SCENE_1_END) {
        // Scene 1: Chaos (0% - 15%)
        currentScene = 'chaos';
        progress = latest / SCENE_BREAKPOINTS.SCENE_1_END;
      } else if (latest < SCENE_BREAKPOINTS.SCENE_2_END) {
        // Scene 2: Organizing (15% - 75%)
        currentScene = 'organize';
        progress = (latest - SCENE_BREAKPOINTS.SCENE_1_END) /
                   (SCENE_BREAKPOINTS.SCENE_2_END - SCENE_BREAKPOINTS.SCENE_1_END);
      } else {
        // Scene 3: Order (75% - 100%)
        currentScene = 'order';
        progress = (latest - SCENE_BREAKPOINTS.SCENE_2_END) /
                   (1 - SCENE_BREAKPOINTS.SCENE_2_END);
      }

      setScene(currentScene);
      setSceneProgress(progress);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return { current: scene, progress: sceneProgress };
}

/**
 * Helper function to get scene-specific scroll ranges
 * Useful for mapping animations to specific scenes
 */
export function getSceneRange(scene: SceneType): [number, number] {
  switch (scene) {
    case 'stillness':
      return [0, SCENE_BREAKPOINTS.SCENE_1_END];
    case 'chaos':
      return [SCENE_BREAKPOINTS.SCENE_1_END, SCENE_BREAKPOINTS.SCENE_2_END];
    case 'order':
      return [SCENE_BREAKPOINTS.SCENE_2_END, 1];
    default:
      return [0, 1];
  }
}
