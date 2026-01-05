# Hero Workshop Changes

## Changes Implemented

### 1. ✅ Title Properly Centered
- "CertSync" title is now properly centered with `text-align: center` on the ContentContainer
- Always visible throughout the entire scroll experience
- Clean, prominent placement

### 2. ✅ Tagline Fades IN (Reversed Timing)

**Before:**
- Tagline "Compliance. Organised." was visible at start
- Faded OUT during organizing phase
- Replaced by "All credentials. One system."

**Now:**
- Tagline "Compliance. Organised." is **HIDDEN** at page load
- Remains hidden during static phase (p=0.00-0.05)
- Remains hidden during organizing phase (p=0.05-0.70)
- **Fades IN** when credentials are organized (p=0.70-0.85)
- Fully visible in stable phase (p=0.85-1.00)

This creates the narrative: **scattered chaos → organized system with clear tagline**

### 3. ✅ Credentials Scattered Above AND Below Title

**Before:**
- Cards mostly on left/right sides of viewport
- Few cards above or below the centered text

**Now:**

**Desktop (12 cards):**
- **3 cards above** the title (y: 40-100)
- **4 cards on sides** (left/right, avoiding center safe zone)
- **5 cards below** the title (y: 680-820)

**Mobile (8 cards):**
- **2 cards above** the title
- **4 cards on sides**
- **2 cards below** the title

Cards now completely **surround** the centered "CertSync" title, creating a more immersive scattered effect.

## Visual Flow

### Opening State (p=0)
```
        [card]    [card]    [card]
            (scattered above)

              CertSync
        (centered, visible)
      (tagline HIDDEN here)

    [card]                    [card]
      (left)                  (right)

        [card]    [card]    [card]
           (scattered below)
```

### Organizing Phase (p=0.05-0.80)
- Cards fly from scattered positions → organized grid
- "CertSync" remains visible
- Tagline still HIDDEN

### Organized State (p=0.80+)
```
              CertSync
        Compliance. Organised.
      (tagline FADES IN HERE)

      [card] [card] [card]
      [card] [card] [card]
      [card] [card] [card]
      [card] [card] [card]
        (neat 3-column grid)

      [See how it works]
```

## Technical Details

### Tagline Opacity Logic
```typescript
const taglineOpacity = useTransform(scrollYProgress, (p) => {
  if (p < 0.70) return 0; // Hidden during static & organizing
  if (p >= 0.85) return 1; // Fully visible when organized
  return smoothstep(0.70, 0.85, p); // Smooth fade IN
});
```

### Card Scatter Positions (Desktop)
- **Top region** (y < 290): 3 cards at y: 40, 80, 100
- **Middle region** (y: 290-610): Safe zone - NO cards
- **Side regions** (x < 440 or x > 1000): 4 cards
- **Bottom region** (y > 610): 5 cards at y: 680, 720, 760, 800, 820

### Card Final Positions (Unchanged)
- Desktop: 3 columns × 4 rows
- Mobile: 2 columns × 4 rows

## Removed Elements

- **MicroLine** ("Credential and compliance management.") - removed for cleaner design
- **ValueStatement** ("All credentials. One system.") - replaced with tagline fade-in

## Files Modified

1. **`src/hero/config/cardPositions.ts`**
   - Updated all 12 desktop scatter positions
   - Updated all 8 mobile scatter positions
   - Added comments indicating vertical distribution (above/sides/below)

2. **`src/hero/components/HeroContent.tsx`**
   - Reversed tagline opacity timing (0 → 1 instead of 1 → 0)
   - Removed micro line
   - Removed value statement
   - Simplified to: title + tagline + CTA
   - Updated documentation comments

## Testing Checklist

### Opening State (p=0)
- [ ] "CertSync" centered and visible
- [ ] Tagline "Compliance. Organised." is HIDDEN
- [ ] Cards scattered all around title (above, below, left, right)
- [ ] No cards overlapping the centered text
- [ ] Scroll indicator visible

### During Organizing (p=0.05-0.80)
- [ ] Cards smoothly fly toward grid positions
- [ ] "CertSync" remains visible
- [ ] Tagline still HIDDEN
- [ ] Slight drift motion on cards

### Organized State (p=0.80-1.00)
- [ ] Cards locked in neat grid
- [ ] "CertSync" still visible
- [ ] Tagline "Compliance. Organised." **FADES IN** smoothly
- [ ] CTA button appears
- [ ] Everything static - no motion

## Build Status

✅ **Build successful**
```
dist/hero.js  768.13 kB │ gzip: 239.46 kB
✓ built in 5.40s
```

## User Experience Narrative

1. **Page loads** → User sees "CertSync" surrounded by scattered credentials (chaos)
2. **User scrolls** → Credentials begin organizing into grid
3. **Near end** → Credentials lock into grid, tagline "Compliance. Organised." appears
4. **Final state** → Clean, organized system with clear tagline and CTA

The tagline now **rewards** the user for scrolling - they see the chaos transform into an organized system, and only then does the tagline appear to reinforce the message: **"Compliance. Organised."**

---

**Status**: ✅ **READY FOR REVIEW**
