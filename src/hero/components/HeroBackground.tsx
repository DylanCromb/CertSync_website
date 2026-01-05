import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/hero.styles';

/**
 * Hero background with gradient and pattern overlay
 * Preserves existing CSS styling from main.css
 */

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
`;

const GradientLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${theme.colors.gradient.start} 0%,
    ${theme.colors.gradient.mid1} 25%,
    ${theme.colors.gradient.mid2} 50%,
    ${theme.colors.gradient.mid3} 75%,
    ${theme.colors.gradient.end} 100%
  );
  animation: gradientShift 15s ease infinite;

  @keyframes gradientShift {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.9;
    }
  }
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.4;
`;

const RadialOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
`;

export function HeroBackground() {
  return (
    <BackgroundContainer>
      <GradientLayer />
      <PatternOverlay />
      <RadialOverlay />
    </BackgroundContainer>
  );
}
