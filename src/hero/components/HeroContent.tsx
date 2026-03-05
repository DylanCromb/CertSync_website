import React from 'react';
import styled from 'styled-components';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';
import { SCENE_BREAKPOINTS } from '../config/cardPositions';

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20; /* Above cards (z-10) */
  padding: 15vh 5% 0;
  text-align: center;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 12vh 5% 0;
  }

  @media (max-width: 480px) {
    padding: 10vh 5% 0;
  }
`;

const BrandName = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.02em;
  text-align: center;
  width: 100%;
`;

const Tagline = styled(motion.h2)`
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
`;

const MicroLine = styled(motion.p)`
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const ValueStatement = styled(motion.p)`
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: white;
  margin-top: 2rem;
  line-height: 1.4;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
`;

const ScrollIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  margin-top: 4rem;
  cursor: pointer;
  transition: all 0.3s ease;

  span {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  pointer-events: auto;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #0d1c3b;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  box-shadow: 0 20px 40px rgba(7, 18, 46, 0.3);
  cursor: pointer;
  text-decoration: none;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 25px 60px rgba(7, 18, 46, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
`;

interface HeroContentProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Hero text content with scene-driven transitions
 *
 * Scene 1 — Static/Scattered (p ∈ [0.00, 0.15]):
 *   - "CertSync" centered (visible)
 *   - Tagline hidden
 *   - Scroll indicator visible
 *   - Credentials scattered around title
 *
 * Scene 2 — Organizing (p ∈ [0.15, 0.80]):
 *   - "CertSync" remains visible
 *   - Tagline fades IN (0.15-0.40)
 *   - Cards flying to organized positions
 *
 * Scene 3 — Organized/Stable (p ∈ [0.80, 1.00]):
 *   - "CertSync" + "Compliance. Organised." (both visible)
 *   - CTA button appears
 *   - Credentials locked in neat grid
 */
export function HeroContent({ scrollYProgress }: HeroContentProps) {
  const { prefersReducedMotion } = useAnimation();

  // Helper: smoothstep
  const smoothstep = (edge0: number, edge1: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  // BrandName: Always visible
  const brandOpacity = useTransform(scrollYProgress, [0, 1.0], [1, 1]);

  // Tagline: Hidden at start, fades IN as user begins scrolling
  const taglineOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.15) return 0; // Hidden initially during static phase
    if (p >= 0.40) return 1; // Fully visible early in organizing phase
    return smoothstep(0.15, 0.40, p); // Fade IN as user starts scrolling
  });

  // Scroll indicator: Fades out early
  const scrollIndicatorOpacity = useTransform(scrollYProgress, (p) => {
    if (p >= 0.15) return 0;
    return 1 - smoothstep(0.05, 0.15, p);
  });

  // ValueStatement: No longer needed - using tagline instead
  const valueOpacity = 0;

  // CTA: Appears when fully organized
  const ctaOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.85) return 0; // Hidden until stable phase
    if (p >= 0.92) return 1; // Fully visible
    return smoothstep(0.85, 0.92, p);
  });

  const ctaTranslate = useTransform(scrollYProgress, (p) => {
    if (p < 0.85) return 20;
    if (p >= 0.92) return 0;
    return 20 * (1 - smoothstep(0.85, 0.92, p));
  });

  const handleCTA = () => {
    const valueSection = document.querySelector('.value-framing-section');
    if (valueSection) {
      valueSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (prefersReducedMotion) {
    return (
      <ContentContainer>
        <BrandName>CertSync</BrandName>
        <Tagline>Compliance. Organised.</Tagline>
        <CTARow>
          <PrimaryButton href="https://www.certsync.com.au/contact.html">
            Book a Demo
          </PrimaryButton>
          <SecondaryButton onClick={handleCTA}>
            See how it works
          </SecondaryButton>
        </CTARow>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      {/* Always visible - centered title */}
      <BrandName style={{ opacity: brandOpacity }}>
        CertSync
      </BrandName>

      {/* Hidden at start, fades IN when credentials are organized */}
      <Tagline style={{ opacity: taglineOpacity }}>
        Compliance. Organised.
      </Tagline>

      {/* Scroll indicator (fades out early) */}
      <ScrollIndicator style={{ opacity: scrollIndicatorOpacity }}>
        <span>v</span> Scroll
      </ScrollIndicator>

      {/* CTAs appear when fully organized */}
      <CTARow style={{ opacity: ctaOpacity, y: ctaTranslate }}>
        <PrimaryButton href="https://www.certsync.com.au/contact.html">
          Book a Demo
        </PrimaryButton>
        <SecondaryButton onClick={handleCTA}>
          See how it works
        </SecondaryButton>
      </CTARow>
    </ContentContainer>
  );
}
