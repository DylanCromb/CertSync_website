import React, { useState, useEffect } from 'react';
import { MotionValue } from 'framer-motion';
import styled from 'styled-components';
import { CredentialItem } from './CredentialItem';
import { getCardConfigs } from '../config/cardPositions';

const SceneContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible; /* Allow cards to extend slightly beyond strict bounds */
  z-index: 10; /* Above background (z-1) but below text (z-20) */
  pointer-events: none; /* Allow clicks to pass through to hero content */
`;

interface CredentialSceneProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Deterministic credential scene container
 * Uses fixed card positions from config
 * Responds to viewport changes via matchMedia
 */
export function CredentialScene({ scrollYProgress }: CredentialSceneProps) {
  const [cards, setCards] = useState(getCardConfigs());

  // Update cards on resize (switches between mobile/desktop configs)
  useEffect(() => {
    const handleResize = () => {
      setCards(getCardConfigs());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SceneContainer>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {cards.map((card, index) => (
          <CredentialItem
            key={card.id}
            card={card}
            cardIndex={index}
            totalCards={cards.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </SceneContainer>
  );
}
