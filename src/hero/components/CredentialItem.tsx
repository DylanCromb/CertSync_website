import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import type { CardConfig } from '../config/cardPositions';
import { SCENE_BREAKPOINTS } from '../config/cardPositions';
import { CredentialCard } from './CredentialCard';
import { useAnimation } from '../context/AnimationContext';

interface CredentialItemProps {
  card: CardConfig;
  cardIndex: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

/**
 * Deterministic credential card - Scatter → Organize animation
 *
 * Opening state (p=0): Visible at scatter position, static
 * Organizing (p=0.05→0.80): Fly to final position with slight drift
 * Final state (p=0.80+): Locked in grid, static
 */
export function CredentialItem({
  card,
  cardIndex,
  totalCards,
  scrollYProgress
}: CredentialItemProps) {
  const { prefersReducedMotion } = useAnimation();

  // ============================================================
  // HELPER: smoothstep for smooth interpolation
  // ============================================================
  const smoothstep = (edge0: number, edge1: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ============================================================
  // OPACITY: Always visible (cards shown from page load)
  // ============================================================
  const opacity = 1;

  // ============================================================
  // ORGANIZATION PROGRESS: 0 when static, 1 when fully organized
  // ============================================================
  const tOrganize = useTransform(scrollYProgress, (p) => {
    if (p < SCENE_BREAKPOINTS.STATIC_END) return 0; // Static at start
    if (p >= SCENE_BREAKPOINTS.ORGANIZING_END) return 1; // Fully organized

    // Smooth interpolation during organizing phase
    return smoothstep(
      SCENE_BREAKPOINTS.STATIC_END,
      SCENE_BREAKPOINTS.ORGANIZING_END,
      p
    );
  });

  // ============================================================
  // DRIFT AMPLITUDE: Moderate during organizing, zero elsewhere
  // ============================================================
  const driftAmplitude = useTransform(scrollYProgress, (p) => {
    // No drift when static at start
    if (p < SCENE_BREAKPOINTS.STATIC_END) return 0;

    // No drift when fully organized
    if (p >= SCENE_BREAKPOINTS.ORGANIZING_END) return 0;

    // Moderate drift during organizing phase
    // Peaks in middle, tapers at both ends
    const t = (p - SCENE_BREAKPOINTS.STATIC_END) /
              (SCENE_BREAKPOINTS.ORGANIZING_END - SCENE_BREAKPOINTS.STATIC_END);

    // Smooth bell curve: starts 0, peaks at 0.5, ends at 0
    return Math.sin(t * Math.PI) * 0.6; // Max amplitude 0.6 (reduced from 1.0)
  });

  // ============================================================
  // DRIFT OFFSET: Deterministic sinusoidal drift
  // ============================================================
  const driftX = useTransform([scrollYProgress, driftAmplitude], ([p, amp]) => {
    // Unique frequency per card based on index
    const freq = 2 + (cardIndex % 3) * 0.3;
    const phase = cardIndex * 0.5;
    return Math.sin(p * Math.PI * freq + phase) * card.drift.x * amp;
  });

  const driftY = useTransform([scrollYProgress, driftAmplitude], ([p, amp]) => {
    const freq = 1.8 + (cardIndex % 4) * 0.4;
    const phase = cardIndex * 0.6;
    return Math.cos(p * Math.PI * freq + phase) * card.drift.y * amp;
  });

  // ============================================================
  // POSITION: Interpolate from scatter → final
  // ============================================================
  const x = useTransform([tOrganize, driftX], ([t, dx]) => {
    return lerp(card.scatter.x, card.final.x, t) + dx;
  });

  const y = useTransform([tOrganize, driftY], ([t, dy]) => {
    return lerp(card.scatter.y, card.final.y, t) + dy;
  });

  // ============================================================
  // ROTATION: Interpolate from scatter rotation → 0
  // ============================================================
  const rotate = useTransform(tOrganize, (t) => {
    return lerp(card.scatter.rot, card.final.rot, t);
  });

  // ============================================================
  // SCALE: Constant 1.0
  // ============================================================
  const scale = 1.0;

  // ============================================================
  // REDUCED MOTION: Show final static position
  // ============================================================
  if (prefersReducedMotion) {
    return (
      <div
        style={{
          position: 'absolute',
          left: card.final.x,
          top: card.final.y,
          zIndex: 10 + cardIndex
        }}
      >
        <CredentialCard type={card.type} index={cardIndex} />
      </div>
    );
  }

  // ============================================================
  // ANIMATED VERSION
  // ============================================================
  return (
    <motion.div
      style={{
        position: 'absolute',
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: 10 + cardIndex,
        transformOrigin: 'center center',
        willChange: 'transform'
      }}
    >
      <CredentialCard type={card.type} index={cardIndex} />
    </motion.div>
  );
}
