/**
 * DETERMINISTIC CARD POSITIONS
 *
 * All positions are hard-coded and fixed.
 * No Math.random(), no procedural generation.
 * Positions are carefully chosen to:
 * 1. Avoid the centered text safe zone
 * 2. Create visual variety in scatter phase
 * 3. Organize into clean grid in order phase
 */

import type { CredentialType } from '../types/animation.types';

export interface CardConfig {
  id: string;
  type: CredentialType;
  scatter: { x: number; y: number; rot: number };
  final: { x: number; y: number; rot: number };
  drift: { x: number; y: number }; // Deterministic drift offset
}

// Desktop safe zone: approx 560×320px centered
// At 1440x900: safe zone is roughly x: 440-1000, y: 290-610

/**
 * Desktop configuration: 12 cards
 * Scatter positions surround the centered title (above, below, left, right)
 * Avoid center safe zone: ~440-1000 (x), 290-610 (y)
 * Final positions: 3 columns × 4 rows grid
 */
export const DESKTOP_CARDS: CardConfig[] = [
  // Cards above the title
  {
    id: 'card-0',
    type: 'high-risk-work',
    scatter: { x: 200, y: 80, rot: -8 },
    final: { x: 180, y: 200, rot: 0 },
    drift: { x: 8, y: -6 }
  },
  {
    id: 'card-1',
    type: 'white-card',
    scatter: { x: 1000, y: 100, rot: 12 },
    final: { x: 600, y: 200, rot: 0 },
    drift: { x: -7, y: 5 }
  },
  {
    id: 'card-2',
    type: 'first-aid',
    scatter: { x: 600, y: 40, rot: -10 },
    final: { x: 1020, y: 200, rot: 0 },
    drift: { x: 9, y: 8 }
  },
  // Cards on the sides (left and right of title)
  {
    id: 'card-3',
    type: 'forklift',
    scatter: { x: 60, y: 380, rot: -14 },
    final: { x: 180, y: 380, rot: 0 },
    drift: { x: -8, y: -7 }
  },
  {
    id: 'card-4',
    type: 'confined-space',
    scatter: { x: 1120, y: 360, rot: 9 },
    final: { x: 600, y: 380, rot: 0 },
    drift: { x: 7, y: 9 }
  },
  {
    id: 'card-5',
    type: 'heights',
    scatter: { x: 80, y: 480, rot: 11 },
    final: { x: 1020, y: 380, rot: 0 },
    drift: { x: -9, y: -5 }
  },
  {
    id: 'card-6',
    type: 'drivers-license',
    scatter: { x: 1100, y: 520, rot: -11 },
    final: { x: 180, y: 560, rot: 0 },
    drift: { x: 6, y: 7 }
  },
  // Cards below the title
  {
    id: 'card-7',
    type: 'certificate',
    scatter: { x: 180, y: 680, rot: 13 },
    final: { x: 600, y: 560, rot: 0 },
    drift: { x: -6, y: 8 }
  },
  {
    id: 'card-8',
    type: 'high-risk-work',
    scatter: { x: 950, y: 720, rot: -9 },
    final: { x: 1020, y: 560, rot: 0 },
    drift: { x: 8, y: -9 }
  },
  {
    id: 'card-9',
    type: 'white-card',
    scatter: { x: 500, y: 760, rot: 10 },
    final: { x: 180, y: 740, rot: 0 },
    drift: { x: -7, y: 6 }
  },
  {
    id: 'card-10',
    type: 'first-aid',
    scatter: { x: 1050, y: 800, rot: -12 },
    final: { x: 600, y: 740, rot: 0 },
    drift: { x: 9, y: -8 }
  },
  {
    id: 'card-11',
    type: 'certificate',
    scatter: { x: 300, y: 820, rot: 8 },
    final: { x: 1020, y: 740, rot: 0 },
    drift: { x: -8, y: 7 }
  }
];

/**
 * Mobile configuration: 8 cards
 * Scatter positions surround the centered title (above, below, left, right)
 * Final positions: 2 columns × 4 rows grid
 */
export const MOBILE_CARDS: CardConfig[] = [
  // Cards above the title
  {
    id: 'card-0',
    type: 'high-risk-work',
    scatter: { x: 60, y: 60, rot: -10 },
    final: { x: 40, y: 150, rot: 0 },
    drift: { x: 6, y: -5 }
  },
  {
    id: 'card-1',
    type: 'white-card',
    scatter: { x: 480, y: 80, rot: 11 },
    final: { x: 340, y: 150, rot: 0 },
    drift: { x: -6, y: 5 }
  },
  // Cards on the sides
  {
    id: 'card-2',
    type: 'first-aid',
    scatter: { x: 15, y: 300, rot: -12 },
    final: { x: 40, y: 320, rot: 0 },
    drift: { x: 7, y: 6 }
  },
  {
    id: 'card-3',
    type: 'forklift',
    scatter: { x: 560, y: 320, rot: 9 },
    final: { x: 340, y: 320, rot: 0 },
    drift: { x: -7, y: -6 }
  },
  {
    id: 'card-4',
    type: 'confined-space',
    scatter: { x: 20, y: 480, rot: 13 },
    final: { x: 40, y: 490, rot: 0 },
    drift: { x: 8, y: 7 }
  },
  {
    id: 'card-5',
    type: 'heights',
    scatter: { x: 550, y: 500, rot: -11 },
    final: { x: 340, y: 490, rot: 0 },
    drift: { x: -8, y: -7 }
  },
  // Cards below the title
  {
    id: 'card-6',
    type: 'drivers-license',
    scatter: { x: 100, y: 700, rot: 10 },
    final: { x: 40, y: 660, rot: 0 },
    drift: { x: 6, y: 8 }
  },
  {
    id: 'card-7',
    type: 'certificate',
    scatter: { x: 450, y: 740, rot: -8 },
    final: { x: 340, y: 660, rot: 0 },
    drift: { x: -6, y: -8 }
  }
];

/**
 * Get cards for current viewport
 * Uses matchMedia to detect mobile vs desktop
 */
export function getCardConfigs(): CardConfig[] {
  if (typeof window === 'undefined') {
    return DESKTOP_CARDS; // SSR fallback
  }

  const isMobile = window.innerWidth <= 768;
  return isMobile ? MOBILE_CARDS : DESKTOP_CARDS;
}

/**
 * Scene breakpoints for 250vh hero
 *
 * Scene 1 — Static/Scattered (p ∈ [0.00, 0.05]):
 *   - Opening state: cards visible and scattered around centered text
 *   - Everything static, no motion
 *
 * Scene 2 — Organizing (p ∈ [0.05, 0.80]):
 *   - Cards fly from scatter → final grid positions
 *   - Slight drift during transition to show motion
 *   - Main "chaos → order" transformation
 *
 * Scene 3 — Organized/Stable (p ∈ [0.80, 1.00]):
 *   - Cards locked in final positions
 *   - No drift, completely static
 *   - Ready to exit hero section
 */
export const SCENE_BREAKPOINTS = {
  STATIC_END: 0.05,      // Brief pause showing scattered state
  ORGANIZING_END: 0.80,  // Organization complete by 80%
  STABLE_END: 1.00       // Fully stable before exit
} as const;
