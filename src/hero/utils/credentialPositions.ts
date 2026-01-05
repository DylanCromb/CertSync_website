import type { CredentialPosition, CredentialType, Position } from '../types/animation.types';

const DESKTOP_CARD = { width: 240, height: 152 };
const MOBILE_CARD = { width: 200, height: 127 };
const SMALL_MOBILE_CARD = { width: 170, height: 108 };

const CREDENTIAL_TYPES: CredentialType[] = [
  'high-risk-work',
  'white-card',
  'first-aid',
  'forklift',
  'confined-space',
  'heights',
  'drivers-license',
  'certificate',
  // duplicates to keep variety while staying within 14 cards max
  'high-risk-work',
  'white-card',
  'first-aid',
  'certificate'
];

interface ViewportMeta {
  width: number;
  height: number;
  isMobile: boolean;
  cardWidth: number;
  cardHeight: number;
  cardCount: number;
  columns: number;
  safeZone: { x: number; y: number; width: number; height: number };
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function getViewportMeta(): ViewportMeta {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const height = typeof window !== 'undefined' ? window.innerHeight : 900;
  const isSmallMobile = width <= 480;
  const isMobile = width <= 768;
  const { width: cardWidth, height: cardHeight } = isSmallMobile ? SMALL_MOBILE_CARD : isMobile ? MOBILE_CARD : DESKTOP_CARD;
  const safeZoneWidth = isSmallMobile ? Math.min(300, width * 0.7) : isMobile ? Math.min(360, width * 0.7) : 520;
  const safeZoneHeight = isSmallMobile ? 200 : isMobile ? 220 : 280;

  return {
    width,
    height,
    isMobile,
    cardWidth,
    cardHeight,
    cardCount: isSmallMobile ? 6 : isMobile ? 7 : 12,
    columns: isMobile ? 2 : 3,
    safeZone: {
      x: (width - safeZoneWidth) / 2,
      y: (height - safeZoneHeight) / 2,
      width: safeZoneWidth,
      height: safeZoneHeight
    }
  };
}

function intersectsSafeZone(
  x: number,
  y: number,
  meta: ViewportMeta
) {
  const { safeZone, cardWidth, cardHeight } = meta;
  const safeRight = safeZone.x + safeZone.width;
  const safeBottom = safeZone.y + safeZone.height;
  const cardRight = x + cardWidth;
  const cardBottom = y + cardHeight;

  return !(cardRight < safeZone.x || x > safeRight || cardBottom < safeZone.y || y > safeBottom);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function generateScatterPositions(count: number, meta: ViewportMeta) {
  const results: Array<{ position: Position; chaosOffset: { x: number; y: number } }> = [];
  const paddingX = meta.isMobile ? 24 : 80;
  const paddingY = meta.isMobile ? 32 : 90;
  const maxX = meta.width - meta.cardWidth - paddingX;
  const maxY = meta.height - meta.cardHeight - paddingY;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let placedPosition: Position | null = null;

    while (attempts < 60 && !placedPosition) {
      const x = randomBetween(paddingX, Math.max(paddingX, maxX));
      const y = randomBetween(paddingY, Math.max(paddingY, maxY));
      if (!intersectsSafeZone(x, y, meta)) {
        placedPosition = {
          x,
          y,
          rotate: randomBetween(-14, 14)
        };
      }
      attempts += 1;
    }

    if (!placedPosition) {
      // Fallback: stack along sides if random placement keeps hitting the safe zone.
      const side = i % 2 === 0 ? paddingX : maxX;
      const stackedY = paddingY + ((i * (meta.cardHeight + 20)) % (Math.max(paddingY, maxY) - paddingY + meta.cardHeight));
      placedPosition = {
        x: side,
        y: clamp(stackedY, paddingY, maxY),
        rotate: randomBetween(-10, 10)
      };
    }

    results.push({
      position: placedPosition,
      chaosOffset: {
        x: randomBetween(meta.isMobile ? -18 : -26, meta.isMobile ? 18 : 26),
        y: randomBetween(meta.isMobile ? -14 : -18, meta.isMobile ? 14 : 18)
      }
    });
  }

  return results;
}

function generateStructuredPositions(count: number, meta: ViewportMeta): Position[] {
  const positions: Position[] = [];
  const horizontalPadding = meta.isMobile ? 24 : 120;
  const usableWidth = meta.width - horizontalPadding * 2 - meta.cardWidth;
  const columnSpacing = meta.columns > 1 ? usableWidth / (meta.columns - 1) : 0;
  const verticalSpacing = meta.cardHeight + (meta.isMobile ? 40 : 60);
  const startY = meta.isMobile ? 90 : 140;

  for (let i = 0; i < count; i++) {
    const column = i % meta.columns;
    const row = Math.floor(i / meta.columns);
    const x = horizontalPadding + column * columnSpacing;
    const y = startY + row * verticalSpacing;

    positions.push({
      x,
      y,
      rotate: 0
    });
  }

  return positions;
}

export function generateCredentialPositions(): CredentialPosition[] {
  const meta = getViewportMeta();
  const count = Math.min(meta.cardCount, CREDENTIAL_TYPES.length);
  const types = CREDENTIAL_TYPES.slice(0, count);

  const scatterData = generateScatterPositions(count, meta);
  const structuredPositions = generateStructuredPositions(count, meta);

  return types.map((type, index) => ({
    id: `credential-${index}`,
    type,
    scatter: scatterData[index].position,
    reorganize: structuredPositions[index],
    structured: structuredPositions[index],
    scale: 1,
    zIndex: 5 + index,
    chaosOffset: scatterData[index].chaosOffset
  }));
}
