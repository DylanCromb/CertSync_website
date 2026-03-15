import React from 'react';
import type { CredentialType } from '../types/animation.types';
import {
  CardContainer,
  CardHeader,
  CardBody,
  NameField,
  InfoField,
  CredentialID,
  AccentBar,
  FirstAidCross,
  IconPlaceholder,
  credentialTitles,
  generateMockID
} from '../styles/hero.styles';

interface CredentialCardProps {
  type: CredentialType;
  index: number;
}

const cardNames: Record<CredentialType, string> = {
  'white-card':      'J. WILLIAMS',
  'high-risk-work':  'M. CHEN',
  'first-aid':       'S. TAYLOR',
  'forklift':        'R. JOHNSON',
  'confined-space':  'A. PATEL',
  'heights':         'D. NGUYEN',
  'drivers-license': 'K. BROWN',
  'certificate':     'L. MARTINEZ',
};

const cardExpiries: Record<CredentialType, string> = {
  'white-card':      '15/03/2027',
  'high-risk-work':  '20/06/2026',
  'first-aid':       '01/09/2027',
  'forklift':        '30/11/2026',
  'confined-space':  '15/04/2027',
  'heights':         '22/08/2026',
  'drivers-license': '10/11/2028',
  'certificate':     '31/07/2027',
};

/**
 * Individual credential card component with programmatic design
 * 8 different card types with enterprise aesthetic
 */
export function CredentialCard({ type, index }: CredentialCardProps) {
  const title = credentialTitles[type];
  const id = generateMockID(type, index);
  const name = cardNames[type];
  const expiry = cardExpiries[type];

  // Render first aid cross icon
  if (type === 'first-aid') {
    return (
      <CardContainer $type={type}>
        <CardHeader $type={type}>{title}</CardHeader>
        <FirstAidCross />
        <CardBody $type={type}>
          <NameField>{name}</NameField>
          <InfoField>Valid: {expiry}</InfoField>
          <CredentialID>{id}</CredentialID>
        </CardBody>
        <AccentBar $type={type} />
      </CardContainer>
    );
  }

  // Standard credential card layout
  return (
    <CardContainer $type={type}>
      <CardHeader $type={type}>{title}</CardHeader>
      <IconPlaceholder $type={type} />
      <CardBody $type={type}>
        <NameField>{name}</NameField>
        <InfoField>
          {type === 'white-card' && 'Issued: NSW WorkCover'}
          {type === 'high-risk-work' && 'Class: RI'}
          {type === 'forklift' && 'Class: LF'}
          {type === 'confined-space' && 'Type: Entry & Work'}
          {type === 'heights' && 'Auth No: 12345'}
          {type === 'drivers-license' && 'Class: C'}
          {type === 'certificate' && 'Inst: TAFE NSW'}
        </InfoField>
        <InfoField>Expiry: {expiry}</InfoField>
        <CredentialID>{id}</CredentialID>
      </CardBody>
      <AccentBar $type={type} />
    </CardContainer>
  );
}
