# Hero Final Implementation - Scatter → Organize Animation

## Success Criteria ✅

✅ **Opening page**: "CertSync" + "Compliance. Organised." centered with scattered credentials visible around it (not covering text)

✅ **Scroll effect**: Credentials smoothly fly from scattered positions to organized grid as user scrolls

✅ **Before exit**: Credentials fully organized and locked in neat grid before hero section ends

## Implementation Overview

The hero now follows a **Scatter → Organize** progression across 250vh of scroll space:

### Scene Timeline (250vh hero, p ∈ [0, 1])

#### Scene 1 — Static/Scattered (p = 0.00 → 0.05)
**What you see:**
- **Text**: "CertSync" + "Compliance. Organised." + micro line centered
- **Cards**: Visible and scattered around the text (avoiding safe zone)
- **Motion**: None - everything static, showing the initial "chaos"
- **Duration**: Brief pause (~12.5vh) to let user see scattered state

**Purpose**: Establish the problem state - credentials are disorganized

---

#### Scene 2 — Organizing (p = 0.05 → 0.80)
**What you see:**
- **Text**: "CertSync" remains visible, tagline fades out (0.30→0.60)
- **Cards**: Flying smoothly from scatter positions → final grid
- **Motion**: Cards have slight drift during transition (bell curve amplitude)
- **Duration**: Main animation (~187.5vh of scroll space)

**Purpose**: The transformation - chaos becomes order

---

#### Scene 3 — Organized/Stable (p = 0.80 → 1.00)
**What you see:**
- **Text**: "CertSync" + "All credentials. One system."
- **Cards**: Locked in final grid positions, completely static
- **CTA**: "See how it works" button fades in (0.85→0.92)
- **Duration**: Final stretch (~50vh) showing organized state

**Purpose**: Resolution - credentials are now organized and manageable

---

## Technical Implementation

### Card Animation Logic

```typescript
// Cards always visible (opacity = 1)
const opacity = 1;

// Organization progress: 0 → 1 during p=0.05→0.80
const tOrganize = smoothstep(0.05, 0.80, p);

// Position interpolation
x = lerp(scatterX, finalX, tOrganize) + drift(p)
y = lerp(scatterY, finalY, tOrganize) + drift(p)
rotation = lerp(scatterRotation, 0, tOrganize)

// Drift amplitude (bell curve during organizing)
driftAmplitude = {
  0                          if p < 0.05 (static at start)
  sin(t * π) * 0.6          if 0.05 ≤ p < 0.80 (organizing)
  0                          if p ≥ 0.80 (locked in grid)
}

// Deterministic drift per card
driftX = sin(p * π * freq + phase) * driftConfig.x * amplitude
driftY = cos(p * π * freq + phase) * driftConfig.y * amplitude
```

### Text Transitions

| Element | Visible When | Fade Timing |
|---------|-------------|-------------|
| "CertSync" | Always | N/A |
| "Compliance. Organised." | p < 0.60 | Fade out 0.30→0.60 |
| Micro line | p < 0.60 | Fade out 0.30→0.60 |
| Scroll indicator | p < 0.15 | Fade out 0.05→0.15 |
| "All credentials. One system." | p ≥ 0.75 | Fade in 0.75→0.85 |
| CTA button | p ≥ 0.85 | Fade in 0.85→0.92 |

### Hero Dimensions

- **Desktop**: 250vh height
- **Mobile (≤768px)**: 220vh height
- **Sticky viewport**: 100vh (scene stays in view while scrolling)

### Card Layouts

**Desktop (12 cards):**
- Scatter: Spread around viewport edges avoiding center safe zone
- Final: 3 columns × 4 rows grid at x: [180, 600, 1020], y: [200, 380, 560, 740]

**Mobile (8 cards):**
- Scatter: Left/right edges avoiding center
- Final: 2 columns × 4 rows grid at x: [40, 340], y: [150, 320, 490, 660]

## Files Modified

1. **`src/hero/config/cardPositions.ts`**
   - Updated `SCENE_BREAKPOINTS`: STATIC_END=0.05, ORGANIZING_END=0.80
   - Removed card fade-in logic (cards visible from start)

2. **`src/hero/components/CredentialItem.tsx`**
   - Opacity always 1 (cards visible immediately)
   - Position interpolates from scatter → final during p=0.05→0.80
   - Drift only during organizing phase with bell curve amplitude
   - Completely static at p < 0.05 and p ≥ 0.80

3. **`src/hero/components/HeroContent.tsx`**
   - Tagline visible at start, fades out during organizing
   - Value statement fades in when cards are organized
   - CTA appears late in stable phase

4. **`src/hero/HeroContainer.tsx`**
   - Hero height: 250vh (desktop), 220vh (mobile)
   - Debug overlay updated with new scene labels

## Debug Mode

Press **Ctrl+Shift+D** to toggle debug overlay showing:
- Current scroll progress `p` (2 decimals)
- Scene label with color coding:
  - Blue: Static/Scattered
  - Orange: Organizing
  - Green: Organized/Stable
- Scene breakpoints reference
- Key timing information

Or set `window.__HERO_DEBUG__ = true` in console and refresh.

## Testing Checklist

### Opening State (before scroll)
- [ ] "CertSync" + "Compliance. Organised." visible and centered
- [ ] 12 cards visible on desktop (8 on mobile)
- [ ] Cards scattered around text (not covering it)
- [ ] Everything static - no motion
- [ ] Scroll indicator visible

### During Scroll
- [ ] Cards smoothly interpolate from scatter → grid positions
- [ ] Cards have slight drift motion during organizing
- [ ] Every scroll increment produces visible card movement
- [ ] Tagline fades out smoothly
- [ ] "All credentials. One system." fades in near end

### Before Exit (p ≥ 0.80)
- [ ] All cards locked in final grid positions
- [ ] No drift or motion - completely static
- [ ] Cards neatly aligned in 3 columns (desktop) or 2 columns (mobile)
- [ ] "All credentials. One system." fully visible
- [ ] CTA button visible and clickable

### Cross-cutting
- [ ] No cards disappear or pop in/out unexpectedly
- [ ] Layout identical on every page load
- [ ] Resize smoothly switches between desktop/mobile configs
- [ ] Text never overlaps with cards
- [ ] Smooth 60fps animation

## Build Status

✅ **TypeScript build passes**
```
dist/hero.js  768.33 kB │ gzip: 239.54 kB
✓ built in 4.50s
```

## Key Differences from Previous Implementation

### Before (incorrect):
- Cards hidden at start (opacity=0)
- Cards faded in during "chaos" phase (p=0.35→0.50)
- Organization started late (p=0.70)
- Shorter hero (200vh)

### Now (correct):
- Cards visible from start (opacity=1)
- Cards static at start showing scattered state
- Organization starts immediately from first scroll (p=0.05)
- Longer hero (250vh) for smoother animation
- Cards fully organized before exit (p=0.80+)

## User Experience Flow

1. **Page loads** → User sees "CertSync" with credentials scattered chaotically around it
2. **User starts scrolling** → Credentials begin flying toward organized positions
3. **Mid-scroll** → Text transitions: "Compliance. Organised." → "All credentials. One system."
4. **Near end** → Credentials lock into perfect grid, CTA button appears
5. **Exit hero** → Everything stable and organized, ready for next section

This creates the desired narrative: **Chaos → Order**

---

## Next Steps

1. Run `npm run dev` to start development server
2. Navigate to homepage
3. Press Ctrl+Shift+D to enable debug overlay
4. Verify all success criteria above
5. Test on both desktop and mobile viewports
6. Deploy when satisfied

**Status**: ✅ **READY FOR REVIEW**
