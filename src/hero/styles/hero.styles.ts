import styled from 'styled-components';
import type { CredentialType } from '../types/animation.types';

// Theme colors extracted from existing CSS
export const theme = {
  colors: {
    gradient: {
      start: '#1a237e',
      mid1: '#4a148c',
      mid2: '#880e4f',
      mid3: '#1565c0',
      end: '#0d47a1'
    },
    navy: '#1a237e',
    slate: '#64748b',
    white: '#FFFFFF',
    accent: '#2B7FE0',
    text: '#1A1A1A',
    lightGray: '#F5F5F5',
    darkGray: '#333333'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  }
};

// Credential-specific colors based on type
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

// Credential titles
const credentialTitles: Record<CredentialType, string> = {
  'high-risk-work': 'HIGH RISK WORK LICENCE',
  'white-card': 'CONSTRUCTION INDUCTION',
  'first-aid': 'FIRST AID CERTIFICATE',
  'forklift': 'FORKLIFT LICENCE',
  'confined-space': 'CONFINED SPACE TICKET',
  'heights': 'WORKING AT HEIGHTS',
  'drivers-license': "DRIVER'S LICENCE",
  'certificate': 'PROFESSIONAL CERTIFICATE'
};

// Styled card container
export const CardContainer = styled.div<{ $type: CredentialType }>`
  width: 240px;
  height: 152px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  background: ${props => credentialColors[props.$type].primary};
  cursor: default;
  user-select: none;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 127px;
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    width: 170px;
    height: 108px;
    font-size: 0.8em;
  }
`;

// Card header section
export const CardHeader = styled.div<{ $type: CredentialType }>`
  background: ${props => props.$type === 'white-card'
    ? credentialColors[props.$type].secondary
    : credentialColors[props.$type].secondary};
  padding: 8px 12px;
  color: ${props => credentialColors[props.$type].accent};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

// Card body
export const CardBody = styled.div<{ $type: CredentialType }>`
  padding: 12px;
  color: ${props => props.$type === 'white-card' ? theme.colors.darkGray : theme.colors.white};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Credential ID number
export const CredentialID = styled.div`
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: 10px;
  margin-top: 8px;
  opacity: 0.8;
  letter-spacing: 1px;
`;

// Name placeholder (redacted style)
export const NameField = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

// Secondary info
export const InfoField = styled.div`
  font-size: 10px;
  opacity: 0.9;
  margin-bottom: 2px;
`;

// Accent bar/stripe
export const AccentBar = styled.div<{ $type: CredentialType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${props => credentialColors[props.$type].accent};
`;

// Logo/icon placeholder
export const IconPlaceholder = styled.div<{ $type: CredentialType }>`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => credentialColors[props.$type].accent};
  opacity: 0.2;
`;

// First Aid Cross Icon
export const FirstAidCross = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 32px;
  height: 32px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: white;
  }

  &::before {
    width: 24px;
    height: 8px;
    top: 12px;
    left: 4px;
  }

  &::after {
    width: 8px;
    height: 24px;
    top: 4px;
    left: 12px;
  }
`;

// Utility function to generate mock credential ID
function generateMockID(type: CredentialType, index: number): string {
  const prefix = type.substring(0, 3).toUpperCase();
  const number = String(Math.floor(1000000 + index * 123456)).substring(0, 7);
  return `${prefix} ${number}`;
}

// Component props type
interface CredentialCardContentProps {
  type: CredentialType;
  index: number;
}

// Export styled components for use in CredentialCard component
export { credentialTitles, credentialColors, generateMockID };
export type { CredentialCardContentProps };
