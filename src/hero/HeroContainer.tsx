import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimationProvider } from './context/AnimationContext';
import { HeroBackground } from './components/HeroBackground';
import { CredentialScene } from './components/CredentialScene';
import { HeroContent } from './components/HeroContent';
import { useScrollProgress } from './hooks/useScrollProgress';
import { SCENE_BREAKPOINTS } from './config/cardPositions';

const HeroScrollSpace = styled.section`
  position: relative;
  min-height: 250vh;
  width: 100%;
  margin-top: 70px;
  background: transparent; /* gradient is in sticky viewport */

  @media (max-width: 768px) {
    min-height: 220vh;
    margin-top: 60px;
  }

  @media (max-width: 480px) {
    min-height: 220vh;
    margin-top: 60px;
  }
`;

const StickyViewport = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Clip cards to viewport bounds */
  background: #050b1e; /* Fallback for gradient */
`;

const SceneStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  isolation: isolate; /* keep background + cards in their own stacking context */
`;

const DebugOverlay = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: #00ff00;
  padding: 16px 20px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid #00ff00;
  z-index: 9999;
  pointer-events: none;
  line-height: 1.8;
  min-width: 260px;
  box-shadow: 0 4px 20px rgba(0, 255, 0, 0.3);
`;

/**
 * Inner component that uses animation hooks
 * Must be wrapped by AnimationProvider
 */
function HeroInner() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScrollProgress(heroRef);
  const [debugProgress, setDebugProgress] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  // Enable debug with Ctrl+Shift+D or by setting window.__HERO_DEBUG__ = true
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Check for debug flag
    if ((window as any).__HERO_DEBUG__) {
      setShowDebug(true);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track progress for debug display
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setDebugProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const getSceneLabel = (p: number): string => {
    if (p < SCENE_BREAKPOINTS.STATIC_END) {
      return `Static/Scattered (cards visible, no motion)`;
    }
    if (p < SCENE_BREAKPOINTS.ORGANIZING_END) {
      return `Organizing (cards flying to grid)`;
    }
    return `Organized/Stable (locked in grid)`;
  };

  const getSceneColor = (p: number): string => {
    if (p < SCENE_BREAKPOINTS.STATIC_END) return '#00aaff'; // Static: Blue
    if (p < SCENE_BREAKPOINTS.ORGANIZING_END) return '#ffaa00'; // Organizing: Orange
    return '#00ff00'; // Organized: Green
  };

  return (
    <HeroScrollSpace ref={heroRef}>
      <StickyViewport>
        <SceneStack>
          <HeroBackground />
          <CredentialScene scrollYProgress={scrollYProgress} />
          <HeroContent scrollYProgress={scrollYProgress} />
        </SceneStack>
      </StickyViewport>

      {showDebug && (
        <DebugOverlay>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '1px solid #00ff00', paddingBottom: '8px' }}>
            🎬 HERO DEBUG
          </div>
          <div style={{ marginBottom: '8px' }}>
            Press <strong>Ctrl+Shift+D</strong> to toggle
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '12px 0', color: getSceneColor(debugProgress) }}>
            p = {debugProgress.toFixed(2)}
          </div>
          <div style={{ color: getSceneColor(debugProgress), marginBottom: '12px', fontSize: '13px' }}>
            {getSceneLabel(debugProgress)}
          </div>
          <div style={{ borderTop: '1px solid #00ff00', paddingTop: '12px', fontSize: '12px', color: '#aaa' }}>
            <div><strong style={{ color: '#00aaff' }}>0.00–0.05:</strong> Static (scattered)</div>
            <div><strong style={{ color: '#ffaa00' }}>0.05–0.80:</strong> Organizing</div>
            <div><strong style={{ color: '#00ff00' }}>0.80–1.00:</strong> Organized (stable)</div>
          </div>
          <div style={{ borderTop: '1px solid #00ff00', paddingTop: '12px', marginTop: '12px', fontSize: '11px', color: '#888' }}>
            <div>Cards visible from start (p=0)</div>
            <div>Organization: 0.05 → 0.80</div>
            <div>Drift during organizing only</div>
            <div>Locked in grid: p ≥ 0.80</div>
          </div>
        </DebugOverlay>
      )}
    </HeroScrollSpace>
  );
}

/**
 * Root hero container component
 * Orchestrates all hero sub-components and provides animation context
 */
export default function HeroContainer() {
  return (
    <AnimationProvider>
      <HeroInner />
    </AnimationProvider>
  );
}
