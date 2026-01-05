import { MotionValue, useScroll } from 'framer-motion';
import { RefObject, useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

/**
 * Scroll tracking hook using Framer Motion's useScroll with proper offset configuration
 * for sticky hero sections. Progress runs 0→1 across the entire hero wrapper.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>
): { scrollYProgress: MotionValue<number> } {
  const { updateScroll } = useAnimation();

  // Use Framer Motion's useScroll with target and offset
  // offset: ["start start", "end start"] means:
  // - progress = 0 when wrapper top hits viewport top
  // - progress = 1 when wrapper bottom hits viewport top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Sync with animation context
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Clamp to ensure we never exceed 0-1 range
      const clamped = Math.max(0, Math.min(1, latest));
      updateScroll(clamped);

      // Debug logging (temporary - remove after fixing)
      if (typeof window !== 'undefined' && (window as any).__HERO_DEBUG__) {
        console.log('Hero scroll progress:', clamped.toFixed(3));
      }
    });

    return unsubscribe;
  }, [scrollYProgress, updateScroll]);

  return { scrollYProgress };
}
