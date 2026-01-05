import React from 'react';
import styled from 'styled-components';

const WaveContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;
`;

const WaveSVG = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 100px;
`;

/**
 * Wave divider SVG at the bottom of hero section
 * Ported from existing index.html implementation
 */
export function WaveDivider() {
  return (
    <WaveContainer>
      <WaveSVG viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M0,40 C150,80 350,0 600,30 C850,60 1050,10 1200,35 C1350,60 1400,40 1440,40 L1440,100 L0,100 Z"
          fill="white"
        />
      </WaveSVG>
    </WaveContainer>
  );
}
