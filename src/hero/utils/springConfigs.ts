import type { SpringConfig, AnimationPhase } from '../types/animation.types';

// Spring physics configurations for each animation phase
export const springConfigs: Record<AnimationPhase, SpringConfig> = {
  scatter: {
    stiffness: 50,
    damping: 25,
    mass: 1
  },
  reorganize: {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  },
  structured: {
    stiffness: 150,
    damping: 30,
    mass: 0.3
  }
};

// Scene-specific spring configurations for 3-scene hero
export const sceneSpringConfigs = {
  // Scene 2 (Chaos): Organic, floaty movement
  chaos: {
    stiffness: 60,
    damping: 20,
    mass: 0.8
  },
  // Scene 3 (Order): Smooth, controlled settling
  order: {
    stiffness: 120,
    damping: 28,
    mass: 0.4
  },
  // Card entrance: Gentle bounce on fade-in
  entrance: {
    stiffness: 80,
    damping: 22,
    mass: 0.6
  }
};

// Default spring config for general animations
export const defaultSpring: SpringConfig = {
  stiffness: 100,
  damping: 20,
  mass: 0.5
};

// Fast spring for immediate responses
export const fastSpring: SpringConfig = {
  stiffness: 200,
  damping: 25,
  mass: 0.2
};

// Slow spring for subtle movements
export const slowSpring: SpringConfig = {
  stiffness: 50,
  damping: 15,
  mass: 1
};
