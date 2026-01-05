import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { AnimationState, AnimationContextValue, AnimationAction } from '../types/animation.types';
import { generateCredentialPositions } from '../utils/credentialPositions';

// Initial animation state
const initialState: AnimationState = {
  scrollProgress: 0,
  phase: 'scatter',
  mousePosition: { x: 0, y: 0 },
  prefersReducedMotion: false,
  credentials: generateCredentialPositions()
};

// Animation reducer
function animationReducer(state: AnimationState, action: AnimationAction): AnimationState {
  switch (action.type) {
    case 'UPDATE_SCROLL':
      return {
        ...state,
        scrollProgress: action.payload,
        // Derive phase from scroll progress
        phase:
          action.payload < 0.4
            ? 'scatter'
            : action.payload < 0.7
            ? 'reorganize'
            : 'structured'
      };

    case 'UPDATE_MOUSE':
      return {
        ...state,
        mousePosition: action.payload
      };

    case 'SET_PHASE':
      return {
        ...state,
        phase: action.payload
      };

    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        prefersReducedMotion: action.payload
      };

    case 'SET_CREDENTIALS':
      return {
        ...state,
        credentials: action.payload
      };

    default:
      return state;
  }
}

// Create context
const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

// Provider component
export function AnimationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    dispatch({ type: 'SET_REDUCED_MOTION', payload: mediaQuery.matches });

    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Regenerate card layout when viewport changes
  useEffect(() => {
    let frame: number | null = null;

    const handleResize = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => {
        dispatch({ type: 'SET_CREDENTIALS', payload: generateCredentialPositions() });
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Context value with action dispatchers
  const value: AnimationContextValue = {
    ...state,
    updateScroll: (progress: number) => {
      dispatch({ type: 'UPDATE_SCROLL', payload: progress });
    },
    updateMouse: (x: number, y: number) => {
      dispatch({ type: 'UPDATE_MOUSE', payload: { x, y } });
    }
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

// Custom hook to use animation context
export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
