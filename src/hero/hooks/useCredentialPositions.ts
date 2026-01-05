import { useAnimation } from '../context/AnimationContext';
import type { CredentialPosition } from '../types/animation.types';

/**
 * Custom hook to get credential positions
 * Returns array of all 12 credential positions across all animation phases
 */
export function useCredentialPositions(): CredentialPosition[] {
  const { credentials } = useAnimation();
  return credentials;
}
