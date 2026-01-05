import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

/**
 * Custom hook for subtle mouse parallax effect
 * Returns motion values for x and y parallax (max ±10px)
 */
export function useMouseParallax(): {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
} {
  const { updateMouse, prefersReducedMotion } = useAnimation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateMouse(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, updateMouse, prefersReducedMotion]);

  // Transform mouse position to parallax values (max ±10px)
  const parallaxX = useSpring(
    useTransform(mouseX, [0, window.innerWidth], [-10, 10]),
    { stiffness: 150, damping: 20 }
  );

  const parallaxY = useSpring(
    useTransform(mouseY, [0, window.innerHeight], [-10, 10]),
    { stiffness: 150, damping: 20 }
  );

  // Disable parallax if reduced motion is preferred
  if (prefersReducedMotion) {
    return {
      parallaxX: useMotionValue(0),
      parallaxY: useMotionValue(0)
    };
  }

  return { parallaxX, parallaxY };
}
