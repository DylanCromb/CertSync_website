import React from 'react';
import styled from 'styled-components';
import type { CredentialType } from '../types/animation.types';

// Credential-specific colors (matching front)
const credentialColors: Record<CredentialType, { primary: string; secondary: string; accent: string }> = {
  'high-risk-work': {
    primary: '#1a237e',
    secondary: '#3949ab',
    accent: '#5c6bc0'
  },
  'white-card': {
    primary: '#FFFFFF',
    secondary: '#2B7FE0',
    accent: '#1565c0'
  },
  'first-aid': {
    primary: '#d32f2f',
    secondary: '#f44336',
    accent: '#FFFFFF'
  },
  'forklift': {
    primary: '#e65100',
    secondary: '#ff6f00',
    accent: '#FFFFFF'
  },
  'confined-space': {
    primary: '#4a148c',
    secondary: '#7b1fa2',
    accent: '#ba68c8'
  },
  'heights': {
    primary: '#f57c00',
    secondary: '#fb8c00',
    accent: '#FFFFFF'
  },
  'drivers-license': {
    primary: '#455a64',
    secondary: '#607d8b',
    accent: '#FFFFFF'
  },
  'certificate': {
    primary: '#1a237e',
    secondary: '#64748b',
    accent: '#2B7FE0'
  }
};

const BackContainer = styled.div<{ $type: CredentialType }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: ${props => credentialColors[props.$type].primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
`;

const BackHeader = styled.div<{ $type: CredentialType }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => credentialColors[props.$type].secondary};
  padding: 6px 12px;
  text-align: center;
  color: ${props => credentialColors[props.$type].accent};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const VerifiedBadge = styled.div<{ $type: CredentialType }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => credentialColors[props.$type].secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;

const CheckIcon = styled.div<{ $type: CredentialType }>`
  color: ${props => credentialColors[props.$type].accent};
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
`;

const StatusText = styled.div<{ $type: CredentialType }>`
  color: ${props => props.$type === 'white-card' ? '#333333' : '#FFFFFF'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
`;

const SubText = styled.div<{ $type: CredentialType }>`
  color: ${props => props.$type === 'white-card' ? '#666666' : 'rgba(255, 255, 255, 0.8)'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.3px;
`;

const QRPlaceholder = styled.div<{ $type: CredentialType }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: ${props => props.$type === 'white-card' ? '#f0f0f0' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  padding: 4px;
`;

const QRPixel = styled.div<{ $filled?: boolean; $type: CredentialType }>`
  background: ${props => props.$filled
    ? (props.$type === 'white-card' ? '#333333' : '#FFFFFF')
    : 'transparent'};
  border-radius: 1px;
`;

interface CredentialCardBackProps {
  type: CredentialType;
}

const statusTexts: Record<CredentialType, string> = {
  'high-risk-work': 'VERIFIED',
  'white-card': 'CERTIFIED',
  'first-aid': 'QUALIFIED',
  'forklift': 'LICENSED',
  'confined-space': 'AUTHORISED',
  'heights': 'CERTIFIED',
  'drivers-license': 'VALID',
  'certificate': 'ACCREDITED'
};

const qrPatterns = [
  [true, false, true, true],
  [false, true, true, false],
  [true, true, false, true],
  [true, false, true, false]
];

export function CredentialCardBack({ type }: CredentialCardBackProps) {
  return (
    <BackContainer $type={type}>
      <BackHeader $type={type}>
        CERTSYNC VERIFIED
      </BackHeader>

      <VerifiedBadge $type={type}>
        <CheckIcon $type={type}>✓</CheckIcon>
      </VerifiedBadge>

      <StatusText $type={type}>
        {statusTexts[type]}
      </StatusText>

      <SubText $type={type}>
        Australian Compliance
      </SubText>

      <QRPlaceholder $type={type}>
        {qrPatterns.map((row, i) =>
          row.map((filled, j) => (
            <QRPixel key={`${i}-${j}`} $filled={filled} $type={type} />
          ))
        )}
      </QRPlaceholder>
    </BackContainer>
  );
}
