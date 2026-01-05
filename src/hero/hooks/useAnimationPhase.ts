import { useAnimation } from '../context/AnimationContext';
import type { AnimationPhase } from '../types/animation.types';

/**
 * Custom hook to get current animation phase
 * Derived from scroll progress: 0-30% scatter, 30-70% reorganize, 70-100% structured
 */
export function useAnimationPhase(): AnimationPhase {
  const { phase } = useAnimation();
  return phase;
}
