# Card Style Options for CertSync

## Current Implementation (Layout System Default)

**What it looks like:**
- White cards (#ffffff)
- Grey section backgrounds (#F8F9FA alternating with white)
- Subtle shadows: `0 1px 3px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06)`
- Minimal border: `1px solid rgba(0,0,0,0.04)`
- 12px border radius
- Subtle hover elevation (translateY -2px)

**Visual reference:**
Similar to Stripe's documentation cards - clean, professional, understated depth

---

## Option 1: Elevated White Cards on Grey (Current - RECOMMENDED)

```css
/* White cards with subtle shadow on grey background */
.card, .feature-card, .pricing-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04),
                0 4px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section-grey {
    background: #F8F9FA;
}

.section-white {
    background: #ffffff;
}
```

**Pros:**
- Clear visual hierarchy - cards stand out without being loud
- Alternating backgrounds create natural rhythm down the page
- Subtle shadows feel modern and professional
- Easy to scan - white draws the eye naturally
- Matches enterprise SaaS expectations (Stripe, Linear, Notion)
- Works well for compliance/safety industry (clean, trustworthy, no-nonsense)

**Cons:**
- Requires more CSS to manage alternating backgrounds
- Shadows need careful calibration across devices

**Best for:**
✅ **Compliance and safety SaaS** (HIGH TRUST REQUIRED)
✅ B2B enterprise products
✅ Products requiring professional credibility
✅ Multi-section landing pages

---

## Option 2: Light Grey Cards on White

```css
/* Inverted: grey cards on white background */
.card, .feature-card, .pricing-card {
    background: #F8F9FA;
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    background: #F1F3F5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

section {
    background: #ffffff;
}
```

**Pros:**
- Softer, less stark contrast
- Single background colour (simpler CSS)
- Reduced eye strain on white-heavy pages
- Modern, clean aesthetic
- Good for long-form content or documentation

**Cons:**
- Cards don't "pop" as much - can feel flat
- Less visual hierarchy between sections
- May appear less premium/polished
- Harder to create strong CTAs that stand out

**Best for:**
- Documentation sites
- Content-heavy pages
- Minimalist brands
- Products with younger, design-forward audiences

---

## Option 3: Border-Only Cards (No Shadows)

```css
/* Ultra-minimal: borders only, no shadows */
.card, .feature-card, .pricing-card {
    background: #ffffff;
    border-radius: 8px;
    border: 1.5px solid rgba(0, 0, 0, 0.12);
    box-shadow: none;
    transition: border-color 0.2s ease, transform 0.2s ease;
}

.card:hover {
    border-color: rgba(43, 127, 224, 0.4);
    transform: translateY(-2px);
}

section {
    background: #ffffff;
}

/* Optional: Subtle grey between sections */
.section-grey {
    background: #FAFBFC;
}
```

**Pros:**
- Ultra-clean, minimalist aesthetic
- High performance (no shadow rendering)
- Excellent for accessibility (clear boundaries)
- Easy to maintain consistency
- Works well with strong brand colours as accent borders
- Scandinavian/minimal design trend

**Cons:**
- Can feel flat or unfinished if not executed perfectly
- Less depth perception
- Requires strong typography to compensate
- May not convey "premium" as effectively
- Needs excellent content to carry the design

**Best for:**
- Fintech/banking (serious, trustworthy, no-frills)
- Developer tools
- Minimalist brands
- Products where "less is more" is the brand message

---

## Professional Recommendation: **Option 1 (Current Implementation)**

### Why Option 1 is best for CertSync:

**1. Industry expectations:**
Compliance and safety software operates in a high-stakes environment. Decision-makers in this space (safety managers, HR directors, compliance officers) expect visual polish that signals reliability. Elevated white cards on alternating backgrounds communicate "this is a professional tool you can trust with critical data."

**2. Trust signals:**
- White backgrounds = transparency, clarity
- Subtle shadows = polish, attention to detail
- Clean lines = organised, systematic (critical for compliance)
- Alternating sections = clear information hierarchy

**3. Competitive positioning:**
Your direct competitors (BambooHR, SafetyCulture, Deputy) all use elevated card patterns. Breaking from this pattern could signal "less mature" rather than "innovative."

**4. Scan-ability:**
Compliance managers are evaluating 5-10 tools. Clear visual hierarchy helps them find information fast:
- WorkSafe compliance → white card on grey
- Reporting features → white card on white
- Security → white card on grey
- Pricing → white card on grey (compact spacing)
- CTA → gradient background (strong visual break)

**5. Conversion psychology:**
White cards create natural "click zones" - the eye is drawn to elevated surfaces. For a pre-launch product building a waitlist, you need every conversion advantage.

**6. Audit readiness:**
The aesthetic matches the product promise. Your customers deal with audits - they need clean, organised, printable reports. A clean, organised website reinforces that capability.

---

## Implementation Notes

The current layout-system.css already implements Option 1. Key files:

- `css/layout-system.css` - Section spacing and card styles
- `index.html` - Updated with semantic classes (lines 233, 243, 253, 270, 280)

**Spacing system:**
- Standard sections: 64px vertical padding (desktop), 40px (mobile)
- Compact sections: 32px vertical padding (desktop), 24px (mobile)
- Max-width: 1200px with section-wrapper

**Card consistency:**
- All cards now use identical shadows, borders, and border-radius
- Hover states unified across .card, .feature-card, .pricing-card
- Mobile responsive padding (40px → 32px on mobile)

**Visual flow:**
- Alternating white/grey backgrounds create rhythm
- Pricing section uses section-compact (reduced spacing)
- Final CTA uses gradient to strongly signal end-of-journey

---

## If You Want to Test Alternatives

### To switch to Option 2 (Grey cards on white):

Replace in `css/layout-system.css`:

```css
.card, .feature-card, .pricing-card {
    background: #F8F9FA;  /* Changed from #ffffff */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);  /* Reduced shadow */
}

.section-grey, .section-white {
    background: #ffffff;  /* All sections white */
}
```

### To switch to Option 3 (Border-only):

Replace in `css/layout-system.css`:

```css
.card, .feature-card, .pricing-card {
    background: #ffffff;
    border-radius: 8px;  /* Slightly smaller */
    border: 1.5px solid rgba(0, 0, 0, 0.12);  /* Stronger border */
    box-shadow: none;  /* Remove shadows */
}

.card:hover, .feature-card:hover, .pricing-card:hover {
    border-color: rgba(43, 127, 224, 0.4);  /* Brand colour on hover */
}
```

---

## Summary

**Ship with Option 1** (current implementation). It's the safest choice for a B2B compliance SaaS targeting Australian organisations with WorkSafe obligations. Test alternatives only if user feedback suggests the design feels "too heavy" or "too corporate."

The current implementation prioritises:
1. **Trust** over trendiness
2. **Clarity** over creativity
3. **Professionalism** over personality

This aligns perfectly with your target market: compliance managers, safety officers, and HR directors managing high-risk work licences. They need confidence, not experimentation.
