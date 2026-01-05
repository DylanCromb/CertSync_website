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

/**
 * Individual credential card component with programmatic design
 * 8 different card types with enterprise aesthetic
 */
export function CredentialCard({ type, index }: CredentialCardProps) {
  const title = credentialTitles[type];
  const id = generateMockID(type, index);

  // Render first aid cross icon
  if (type === 'first-aid') {
    return (
      <CardContainer $type={type}>
        <CardHeader $type={type}>{title}</CardHeader>
        <FirstAidCross />
        <CardBody $type={type}>
          <NameField>████ ████████</NameField>
          <InfoField>Valid: ██/██/████</InfoField>
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
        <NameField>████ ████████</NameField>
        <InfoField>
          {type === 'white-card' && 'Issued: NSW WorkCover'}
          {type === 'high-risk-work' && 'Class: ██'}
          {type === 'forklift' && 'Class: LF'}
          {type === 'confined-space' && 'Type: Entry & Work'}
          {type === 'heights' && 'Authorisation: ████'}
          {type === 'drivers-license' && 'Class: C'}
          {type === 'certificate' && 'Institution: █████████'}
        </InfoField>
        <InfoField>Expiry: ██/██/████</InfoField>
        <CredentialID>{id}</CredentialID>
      </CardBody>
      <AccentBar $type={type} />
    </CardContainer>
  );
}
