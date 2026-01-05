// Animation phase types
export type AnimationPhase = 'scatter' | 'reorganize' | 'structured';

// Credential types (8 different credential cards)
export type CredentialType =
  | 'high-risk-work'
  | 'white-card'
  | 'first-aid'
  | 'forklift'
  | 'confined-space'
  | 'heights'
  | 'drivers-license'
  | 'certificate';

// Position coordinates for each animation phase
export interface Position {
  x: number;
  y: number;
  rotate: number;
}

// Complete credential position data across all phases
export interface CredentialPosition {
  id: string;
  type: CredentialType;
  scatter: Position;
  reorganize: Position;
  structured: Position;
  scale: number;
  zIndex: number;
  chaosOffset: { x: number; y: number };
}

// Spring physics configuration
export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

// Global animation state
export interface AnimationState {
  scrollProgress: number; // 0-1 normalized scroll position
  phase: AnimationPhase;
  mousePosition: { x: number; y: number };
  prefersReducedMotion: boolean;
  credentials: CredentialPosition[];
}

// Animation context value with actions
export interface AnimationContextValue extends AnimationState {
  updateScroll: (progress: number) => void;
  updateMouse: (x: number, y: number) => void;
}

// Action types for animation reducer
export type AnimationAction =
  | { type: 'UPDATE_SCROLL'; payload: number }
  | { type: 'UPDATE_MOUSE'; payload: { x: number; y: number } }
  | { type: 'SET_PHASE'; payload: AnimationPhase }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_CREDENTIALS'; payload: CredentialPosition[] };
