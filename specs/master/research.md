# Research Document: Style Refinement Implementation

**Feature**: Style Refinement and Figma Design Alignment
**Research Date**: 2025-10-27
**Status**: Complete

## 1. Executive Summary

This research document addresses the style refinement required to align the WhatsApp Automation landing page with Figma design specifications (node 2014-191). The analysis covers typography, colors, icon sizing, and spacing discrepancies between the current implementation and the Figma source of truth.

## 2. Design Token Analysis

### 2.1 Current State Assessment

#### Typography Status
| Element | Current | Figma Spec | Status | Action Required |
|---------|---------|------------|--------|-----------------|
| Logo font-weight | 500 (Medium) | 500 (Medium) | ✅ Match | None |
| Logo font-size | 19.034px | 19.034px | ✅ Match | None |
| Hero subtitle weight | 400 (Regular) | 400 (Regular) | ✅ Match | None |
| Hero subtitle size | 18px | 18px | ✅ Match | None |
| Hero title weight | 400 (Regular) | 400 (Regular) | ✅ Match | None |
| Hero title size | 128px | 128px | ✅ Match | None |
| Feature label weight | Not specified | 400 (Regular) | ⚠️ Implicit | Add explicit weight |
| Feature pill weight | Not specified | 400 (Regular) | ⚠️ Implicit | Add explicit weight |
| Primary CTA weight | 600 (Semi Bold) | 600 (Semi Bold) | ✅ Match | None |
| Secondary CTA weight | 300 (Light) | 300 (Light) | ✅ Match | None |
| Disclaimer weight | Not specified | 400 (Regular) | ⚠️ Implicit | Add explicit weight |

**Finding**: Most typography is correct, but some font-weights rely on browser defaults rather than explicit declarations.

#### Color Palette Status
| Token | Current | Figma Spec | Status |
|-------|---------|------------|--------|
| --color-zinc-100 | #f4f4f5 | #f4f4f5 | ✅ Match |
| --color-zinc-200 | #e4e4e7 | #e4e4e7 | ✅ Match |
| --color-zinc-300 | #d4d4d8 | #d4d4d8 | ✅ Match |
| --color-zinc-500 | #71717a | #71717a | ✅ Match |
| --color-zinc-600 | #52525b | #52525b | ✅ Match |
| --color-black | #000000 | #000000 | ✅ Match |
| --color-primary | #74d200 | #74d200 | ✅ Match |
| --color-white | Missing | #ffffff | ❌ Missing |

**Finding**: All colors match, but white is not defined as a CSS variable.

#### Icon Sizing Status
| Icon | Current | Figma Spec | Status | Action Required |
|------|---------|------------|--------|-----------------|
| Text icon | 20px × 16px | 20px × 16px | ✅ Match | None |
| Image icon | 16px × 14px | 16px × 14px | ✅ Match | None |
| Document icon | ~14px × 16px | 14.112px × 16px | ⚠️ Close | Verify precision |
| WhatsApp logo (hero) | 76px × 76px | 76px × 76px | ✅ Match | None |
| WhatsApp icon (CTA) | 36px × 36px | 36px × 36px | ✅ Match | None |

**Finding**: Icon sizes are correct, but the container might not preserve exact aspect ratios for non-square icons.

### 2.2 Figma Design System Extraction

From the Figma MCP output, we identified the following design tokens:

#### Spacing Tokens
```
--space-8: 8px
--space-10: 10px (used in feature pill gaps)
--space-16: 16px
--space-32: 32px
--space-40: 40px
--space-80: 80px
--page-padding: 64px (global padding)
```

#### Typography Tokens
```
--text-sizes/text-medium: 18px
--text-sizes/text-regular: 16px
--font/size/xs: 12px
--font/size/m: 16px
--font/size/8xl: 128px
```

**Issue Identified**: The Figma uses two different naming conventions:
- `text-sizes/text-*` (for semantic sizes)
- `font/size/*` (for scale-based sizes)

**Decision**: Normalize to single convention in CSS variables for maintainability.

#### Letter Spacing Tokens
```
Hero title: -6.4px (-5% of 128px)
Hero subtitle: -0.18px
CTA text: -0.16px
Disclaimer: -0.16px
```

**Finding**: Letter-spacing is critical for visual fidelity in large display text.

### 2.3 Font Variation Settings

**Special Case - Roboto Disclaimer**
```css
font-variation-settings: "'wdth' 100"
```

The Figma specifies a font-variation-settings for the disclaimer text using Roboto. This is a variable font axis setting.

**Research**: Roboto on Google Fonts does NOT support variable font axes by default. The standard Roboto font file doesn't have a 'wdth' (width) axis.

**Options**:
1. Use Roboto Flex (variable font version) - adds ~50KB
2. Ignore the variation setting (visual impact minimal)
3. Use standard Roboto 400 (current approach)

**Recommendation**: Continue with standard Roboto 400. The 'wdth' 100 is the default width anyway, so there's no visual difference.

## 3. CSS Architecture Analysis

### 3.1 Current Variable Structure

**variables.css** currently defines:
- Colors (zinc palette, brand colors)
- Spacing (8, 16, 32, 40, 80px)
- Page layout (padding)
- Typography (font sizes, families)
- Effects (video opacity)

**Gaps Identified**:
- Missing `--space-10` for 10px gaps
- Missing explicit font-weight variables
- Missing `--color-white` for consistency
- Font size naming inconsistent with Figma

### 3.2 Proposed Token Additions

```css
/* Additional spacing */
--space-10: 10px;

/* Font weights for explicit declarations */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;

/* Missing color */
--color-white: #ffffff;

/* Normalized font sizes (align with Figma semantics) */
--font-size-xs: 12px;        /* Already exists */
--font-size-regular: 16px;   /* Rename from --font-size-m */
--font-size-medium: 18px;    /* Already exists */
--font-size-8xl: 128px;      /* Already exists */
--font-size-logo: 19.034px;  /* Add specific token */
```

## 4. Icon Container Refinement Research

### 4.1 Current Implementation Issue

The `.feature-pill__icon` container is currently:
```css
width: 20px;
height: 16px;
```

This is sized for the largest icon (text icon at 20×16), but doesn't account for other icon dimensions:
- Image icon: 16×14
- Document icon: 14.112×16

**Problem**: Non-uniform icon sizes within same-height container may cause visual misalignment.

### 4.2 Solution Options

#### Option A: Fixed Container Per Icon (Current Approach)
- Each icon gets exact dimensions
- Pros: Pixel-perfect, simple
- Cons: Not flexible, requires individual sizing

#### Option B: Flex Container with Center Alignment
```css
.feature-pill__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;  /* Max width */
  height: 16px; /* Max height */
}
```
- Pros: Centers smaller icons automatically
- Cons: Adds flex container overhead

#### Option C: Object-fit on Images
```css
.feature-pill__icon img {
  width: auto;
  height: 100%;
  object-fit: contain;
}
```
- Pros: Maintains aspect ratio
- Cons: May not match Figma exact pixel dimensions

**Recommendation**: Use Option A with explicit per-icon sizing for Figma fidelity.

### 4.3 Implementation Strategy

Add specific classes for each icon type:
```css
.feature-pill__icon--text {
  width: 20px;
  height: 16px;
}

.feature-pill__icon--image {
  width: 16px;
  height: 14px;
}

.feature-pill__icon--document {
  width: 14.112px;
  height: 16px;
}
```

Or use data attributes:
```css
.feature-pill__icon[data-icon="text"] { width: 20px; height: 16px; }
.feature-pill__icon[data-icon="image"] { width: 16px; height: 14px; }
.feature-pill__icon[data-icon="document"] { width: 14.112px; height: 16px; }
```

**Decision**: Use data attributes for semantic clarity and maintainability.

## 5. Best Practices Research

### 5.1 CSS Custom Properties Naming

**Industry Standards**:
- BEM: `--component__element--modifier`
- Design Tokens: `--category-subcategory-variant`
- Figma: `--category/subcategory/variant`

**Current Project**: Mixed approach (kebab-case with category prefixes)

**Recommendation**: Maintain current approach for consistency:
```css
--color-zinc-100    (not --color/zinc/100)
--font-size-xs      (not --font/size/xs)
--space-8           (not --space/8)
```

This avoids escaping slashes in CSS and improves readability.

### 5.2 Font Weight Declarations

**Best Practice**: Always declare font-weight explicitly, even for "Regular" (400).

**Rationale**:
- Browser defaults vary
- Font family fallbacks may have different default weights
- Explicit is self-documenting

**Implementation**:
```css
.features__label {
  font-weight: var(--font-weight-regular);
  /* Not relying on implicit 400 */
}
```

### 5.3 Responsive Icon Sizing

**Question**: Should icons scale at different breakpoints?

**Analysis**:
- Figma design shows fixed pixel sizes
- Icons are SVG (scale infinitely)
- Touch targets need minimum 44×44px

**Current Implementation**: Icons maintain fixed pixel sizes across breakpoints.

**Recommendation**: Keep fixed sizes, as:
1. Figma spec is explicit about dimensions
2. Icons are decorative, not interactive
3. Visual rhythm is maintained

## 6. Testing Strategy

### 6.1 Visual Regression Testing

**Approach**: Manual comparison against Figma screenshot

**Test Cases**:
1. Desktop (1440px): Full comparison
2. Tablet (1024px): Layout integrity
3. Mobile (375px): Responsive behavior

**Tools**:
- Browser DevTools (pixel measurement)
- Figma Dev Mode (inspect values)
- Side-by-side comparison

### 6.2 Cross-Browser Testing

**Priority Browsers**:
1. Chrome/Edge (Chromium) - 95%+ usage
2. Firefox - 3-5% usage
3. Safari - macOS/iOS testing

**Font Rendering Focus**:
- Anti-aliasing differences
- Font weight rendering (especially 300 and 600)
- Letter-spacing consistency

### 6.3 CSS Validation

**Tool**: W3C CSS Validator

**Expected Issues**:
- CSS Custom Properties (valid but may warn)
- Vendor prefixes (if needed)

**Acceptance**: No errors, warnings acceptable for modern features.

## 7. Implementation Sequence

Based on research findings, the recommended implementation order:

### Phase 1: Foundation (Low Risk)
1. Add missing CSS variables (--space-10, --color-white, font-weights)
2. Normalize font-size variable naming for consistency
3. Add explicit font-weight declarations

### Phase 2: Refinement (Medium Risk)
4. Update icon sizing with data-attribute approach
5. Verify letter-spacing values match Figma
6. Fine-tune spacing values

### Phase 3: Validation (Low Risk)
7. Cross-browser testing
8. Responsive testing
9. Visual regression check against Figma

## 8. Alternatives Considered

### 8.1 Tailwind CSS Adoption

**Consideration**: Use Tailwind CSS to match Figma output directly

**Pros**:
- Direct match to Figma Code Connect output
- Utility-first approach
- Design token system built-in

**Cons**:
- Violates project constitution (plain HTML/CSS)
- Adds build step
- Overkill for single landing page
- 3.5MB+ CSS file (even minified)

**Decision**: REJECTED. Continue with CSS Custom Properties approach per constitution.

### 8.2 CSS-in-JS

**Consideration**: Use styled-components or emotion

**Pros**:
- Dynamic theming
- Component-scoped styles

**Cons**:
- Requires React/framework (not in scope)
- Violates constitution
- Runtime overhead

**Decision**: REJECTED. HTML/CSS only per requirements.

### 8.3 SCSS/SASS

**Consideration**: Use preprocessor for better variable management

**Pros**:
- Nested rules
- Mixins for responsive
- Better color functions

**Cons**:
- Adds build step
- CSS Custom Properties sufficient
- Not required by constitution

**Decision**: REJECTED. Modern CSS Custom Properties + calc() provide sufficient functionality.

## 9. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Font weights render differently across browsers | Medium | Low | Test in all major browsers, accept minor differences |
| Icon sizing breaks layout | Low | Medium | Test incrementally, use exact Figma dimensions |
| CSS variable browser support | Very Low | High | Target modern browsers only (per requirements) |
| Letter-spacing affects line breaking | Low | Medium | Test at all breakpoints, adjust if needed |
| Roboto variation settings not supported | High | Very Low | Already using standard Roboto, no action needed |

## 10. Open Questions & Resolutions

### Q1: Should we use the exact 14.112px for document icon width?
**Resolution**: YES. Preserve Figma precision. Modern browsers handle fractional pixels correctly via subpixel rendering.

### Q2: Do we need font-display: swap for font loading?
**Resolution**: ALREADY IMPLEMENTED via Google Fonts URL `&display=swap`. No action needed.

### Q3: Should icon containers be square for consistency?
**Resolution**: NO. Use exact Figma dimensions. Icons are SVG and maintain aspect ratio. Square containers would add unnecessary whitespace.

### Q4: Do we need to add --color-white variable if we rarely use it?
**Resolution**: YES. For consistency and future-proofing. Design systems should define all colors explicitly.

### Q5: Should we support font variation settings for Roboto?
**Resolution**: NO. Standard Roboto 400 is sufficient. Variable font adds weight for no visual gain (wdth 100 is default).

## 11. Dependencies

### 11.1 External Dependencies
- ✅ Google Fonts API (already integrated)
- ✅ Figma MCP Server (for design specs)
- ✅ SVG assets (already downloaded)

### 11.2 Internal Dependencies
- ✅ index.html (structure complete)
- ✅ styles/variables.css (base tokens exist)
- ✅ styles/main.css (components styled)

### 11.3 No New Dependencies Required
All refinements can be achieved with existing stack.

## 12. Success Metrics

### 12.1 Quantitative Metrics
- 100% of font weights explicitly declared
- 100% of colors using CSS variables
- 100% of spacing using design token variables
- 0 CSS validation errors

### 12.2 Qualitative Metrics
- Visual match to Figma screenshot (subjective assessment)
- Cross-browser consistency (manual testing)
- Code maintainability (peer review)

## 13. Conclusion

The style refinement implementation is **low-risk and high-value**:

✅ **Strengths**:
- Current implementation is already 90% accurate
- Changes are additive (new variables) or clarifying (explicit weights)
- No structural changes required
- No new dependencies needed

⚠️ **Attention Areas**:
- Icon sizing precision (fractional pixels)
- Letter-spacing fidelity for large display text
- Cross-browser font rendering

🚀 **Ready for Implementation**:
All research complete. Proceed to Phase 1 (Foundation) implementation.

---

**Research Version**: 2.0 (Extended with Effects & Microinteractions)
**Completed**: 2025-10-27 (Updated)
**Next Step**: Create implementation plan (plan.md)

---

# ADDENDUM: Modern Effects and Microinteractions Research

**Extension Added**: 2025-10-27
**Focus**: Hover parallax, reveal on scroll, microinteractions

## 14. Effects Research: Modern Animation Techniques

### 14.1 Research Objectives

Following user request to add "efeitos elegantes e modernos tipo, hover paralax, reveal on scroll, enfim efeitos, microinterações", this addendum researches suitable animation techniques for the landing page.

**Target Effects**:
- Hover parallax (depth on hover)
- Reveal on scroll (scroll-triggered animations)
- Microinteractions (button feedback, subtle animations)
- General modern polish effects

### 14.2 Hover Parallax Research

#### Definition
Parallax creates depth illusion by moving elements at different speeds/directions during hover.

#### Implementation Options

**Option A: Pure CSS Transform**
```css
.btn:hover .btn__icon {
  transform: translateY(-2px) scale(1.05);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```
- ✅ GPU-accelerated, performant
- ✅ No JavaScript needed
- ✅ Works on all modern browsers

**Option B: CSS 3D Transform (True Parallax)**
```css
.feature-pill {
  transform-style: preserve-3d;
  transition: transform 0.4s ease-out;
}

.feature-pill:hover {
  transform: rotateX(5deg) rotateY(-5deg) translateZ(10px);
}
```
- ✅ True 3D depth effect
- ⚠️ May be too heavy for mobile
- ⚠️ Can trigger motion sickness if overused

**Decision**: Use Option A (2D parallax) for performance and subtlety

**Recommended Applications**:
1. **CTA Buttons**: Icon lifts slightly faster than text
2. **Feature Pills**: Subtle scale + border glow on hover
3. **Logo**: Gentle rotation on hover

### 14.3 Reveal on Scroll Research

#### Technology Evaluation

**Option A: Intersection Observer API** ⭐ **RECOMMENDED**
- ✅ Native browser API (97%+ support)
- ✅ Performant (passive observation)
- ✅ Fine-grained control
- ✅ Works with `prefers-reduced-motion`
- ❌ Requires JavaScript (~2KB)

**Option B: CSS scroll-driven Animations**
```css
@supports (animation-timeline: view()) {
  .hero {
    animation: fade-in linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
```
- ✅ Pure CSS, no JavaScript
- ❌ Limited browser support (~70%, Chrome 115+ only)
- ❌ Not production-ready for all users
- **Status**: Experimental, not recommended yet

**Option C: Scroll Event Listeners** (Legacy)
- ❌ Performance issues (non-passive)
- ❌ Causes jank on scroll
- ❌ Outdated approach
- **Status**: Not recommended

**Decision**: **Intersection Observer API** (Option A)

**Rationale**:
- Constitution requires modern browser support ✅
- Progressive enhancement (animations optional)
- Can be disabled gracefully for accessibility
- Industry standard for scroll animations

#### Implementation Pattern

**JavaScript** (`scripts/animations.js`):
```javascript
// Lightweight Intersection Observer setup (~50 lines)
const animateOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '0px 0px -50px 0px' // Slight delay before trigger
    }
  );

  // Observe all elements marked for animation
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
};

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}
```

**CSS** (add to `main.css`):
```css
/* Initial hidden state */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Visible state (triggered by JS) */
[data-animate].animate-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for sequential reveal */
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
```

**HTML Update** (add `data-animate` attributes):
```html
<h1 class="hero__title-text" data-animate>MANDA NO</h1>
<div class="feature-pill" data-animate data-animate-delay="1">Texto</div>
<div class="feature-pill" data-animate data-animate-delay="2">Imagem</div>
<div class="feature-pill" data-animate data-animate-delay="3">Documento</div>
```

**Performance Impact**:
- JavaScript: ~2KB minified
- No runtime performance cost (passive observers)
- GPU-accelerated animations (transform, opacity)

### 14.4 Microinteractions Research

Microinteractions provide instant feedback and delight through small purposeful animations.

#### A. Button Press Feedback
```css
.btn:active {
  transform: scale(0.98);
  transition: transform 0.1s ease-in;
}
```
**Effect**: Button "pushes in" on click
**Performance**: ✅ Excellent (instant feedback)

#### B. Icon Bounce on Hover
```css
@keyframes icon-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.btn:hover .btn__icon {
  animation: icon-bounce 0.5s ease-in-out;
}
```
**Effect**: Playful bounce draws attention to WhatsApp icon
**Performance**: ✅ Good (CSS keyframes, GPU-accelerated)

#### C. Feature Pill Glow
```css
.feature-pill {
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.feature-pill:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(116, 210, 0, 0.3);
  transform: translateY(-2px) scale(1.02);
}
```
**Effect**: Pills glow green and lift on hover
**Performance**: ✅ Good (box-shadow can be GPU-accelerated on modern browsers)

#### D. Logo Accent Pulse (Ambient)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.header__logo-accent {
  animation: pulse 3s ease-in-out infinite;
}
```
**Effect**: Subtle pulsing on green underscore
**Performance**: ✅ Excellent (opacity animation)
**Note**: Very subtle, draws attention to brand

### 14.5 Advanced Effects (Optional)

#### E. Cursor Magnetic Effect (Desktop Only)
```javascript
// Buttons attract cursor on proximity
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
});
```
**Decision**: ❌ **Skip** (too complex, not mobile-friendly, overkill)

#### F. Video Parallax Zoom
```css
@keyframes video-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

.header__video {
  animation: video-zoom 20s ease-out forwards;
}
```
**Effect**: Slow zoom on background video over 20 seconds
**Decision**: ⚠️ **Optional** (nice-to-have, low priority)

### 14.6 Animation Performance Best Practices

#### GPU-Accelerated Properties (Use These)
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ✅ `filter` (use sparingly)

#### CPU-Bound Properties (Avoid in Animations)
- ❌ `width`, `height` (triggers layout)
- ❌ `margin`, `padding` (triggers layout)
- ❌ `top`, `left`, `right`, `bottom` (use `transform` instead)
- ❌ `color` (acceptable for short transitions only)

**Decision**: All animations use `transform` and `opacity` exclusively

### 14.7 Animation Timing Research

**Based on Material Design & Apple HIG**:
- **Instant feedback**: 100-150ms (button press)
- **Quick transitions**: 200-300ms (hover states)
- **Content reveals**: 400-600ms (scroll animations)
- **Ambient loops**: 2-4s (subtle pulsing)

**Recommended Timing Variables**:
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-ambient: 3s;
```

### 14.8 Easing Functions Research

**Standard Easing**:
- `ease`: cubic-bezier(0.25, 0.1, 0.25, 1) - generic
- `ease-out`: cubic-bezier(0, 0, 0.2, 1) - deceleration
- `ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1) - smooth

**Custom Easing (More Elegant)**:
```css
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);        /* Smooth acceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);     /* Bouncy overshoot */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);           /* Quick response */
```

**Decision**: Add custom easing variables for refined motion

### 14.9 Mobile Considerations

**Challenges**:
- Less GPU power than desktop
- No hover states on touch devices
- Smaller screens = less visual room

**Responsive Animation Strategy**:
```css
/* Desktop: Full hover effects */
@media (min-width: 1024px) {
  .feature-pill:hover {
    transform: translateY(-2px) scale(1.02);
  }
}

/* Mobile: Touch feedback only */
@media (max-width: 768px) {
  .feature-pill:active {
    transform: scale(0.98);
  }
}

/* Disable hover on touch devices */
@media (hover: none) {
  .btn:hover {
    /* Reset hover styles */
  }
}
```

**Decision**: Simplify animations on mobile, use `:active` for touch feedback

## 15. Accessibility: Motion Compliance

### 15.1 WCAG 2.1 Requirements

**Success Criterion 2.3.3** (Level AAA): Motion from Interactions
- Users must be able to disable motion animations
- Critical for users with vestibular disorders

**Implementation**: `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Ensure scroll reveals still show content */
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Note**: Constitution already handles reduced-motion for video. Extend for animations.

### 15.2 Focus Management

**Requirement**: Keyboard navigation must remain visible during animations

```css
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  /* Focus ring always visible, even during animation */
}
```

**Decision**: Add focus-visible styles to all interactive elements

### 15.3 Animation Checklist

- ✅ Animations don't convey critical information
- ✅ Interactive elements remain accessible during animation
- ✅ Respect `prefers-reduced-motion`
- ✅ No flashing content (WCAG 2.3.1)
- ✅ Keyboard navigation unaffected

## 16. Implementation Roadmap

### Phase 1: Foundation (15 min)
**Low risk, high impact**

1. Add animation variables to `variables.css`:
   - Duration tokens (instant, fast, normal, slow)
   - Easing functions (smooth, bounce, sharp)

2. Add `prefers-reduced-motion` global override to `main.css`

3. Add focus-visible styles for keyboard navigation

**Files Modified**: `styles/variables.css`, `styles/main.css`
**Lines Added**: ~30 lines
**Testing**: Verify reduced motion in OS settings

---

### Phase 2: Microinteractions (25 min)
**Medium risk, high delight**

4. **Button hover effects**:
   - Primary CTA: Icon lifts, subtle scale
   - Secondary CTA: Border color shift
   - Both: Press feedback on `:active`

5. **Feature pill hover effects**:
   - Border glow (primary green)
   - Subtle lift (translateY -2px)
   - Slight scale (1.02)

6. **Logo interactions** (optional):
   - Accent pulse animation
   - Hover tilt effect

**Files Modified**: `styles/main.css`
**Lines Added**: ~50 lines
**Testing**: Test hover on desktop, :active on mobile

---

### Phase 3: Scroll Reveals (35 min)
**Medium complexity, high polish**

7. **Create `scripts/animations.js`**:
   - Intersection Observer setup
   - Class toggle on visibility
   - Initialize on DOMContentLoaded

8. **Add CSS reveal animations**:
   - Fade-up effect (opacity + translateY)
   - Staggered delays for sequential reveal

9. **Update HTML with data attributes**:
   - `data-animate` on hero title, subtitle
   - `data-animate` + `data-animate-delay` on feature pills
   - `data-animate` on CTA section

**Files Created**: `scripts/animations.js` (~60 lines)
**Files Modified**: `styles/main.css`, `index.html`
**Lines Added**: ~40 CSS, ~10 HTML attributes
**Testing**: Scroll page, verify animations trigger

---

### Phase 4: Polish & Testing (25 min)
**Validation and refinement**

10. **Responsive testing**:
    - Test all effects at 480px, 768px, 1024px, 1440px
    - Verify mobile touch feedback works
    - Ensure no horizontal scroll from transforms

11. **Accessibility testing**:
    - Enable "Reduce Motion" in OS settings
    - Verify all content visible without animations
    - Test keyboard navigation (Tab key)
    - Check focus-visible styles

12. **Cross-browser testing**:
    - Chrome/Edge (primary)
    - Firefox (verify CSS animations)
    - Safari (if available, check webkit prefixes)

13. **Performance validation**:
    - Chrome DevTools Performance tab
    - Check for 60 FPS during animations
    - Verify no layout thrashing

**Files Modified**: None (testing phase)
**Time**: 25 min
**Deliverable**: Test report confirming all pass criteria

---

**Total Estimated Time**: 100 minutes (~1.5 hours)

## 17. Effects Mapping

### Component → Effects Matrix

| Component | Effects | Priority | Implementation |
|-----------|---------|----------|----------------|
| **Logo** | Accent pulse (ambient), hover tilt | P2 (Optional) | CSS keyframes |
| **Hero Title** | Scroll reveal (fade-up) | P1 (Core) | JS + CSS |
| **Hero Subtitle** | Scroll reveal (delayed) | P1 (Core) | JS + CSS |
| **Feature Pills** | Hover glow + lift + scale, stagger reveal | P0 (Critical) | CSS + JS |
| **Primary CTA** | Hover lift, icon shift, press feedback | P0 (Critical) | CSS only |
| **Secondary CTA** | Hover border, press feedback | P0 (Critical) | CSS only |
| **Disclaimer** | Scroll reveal (fade only) | P1 (Core) | JS + CSS |

### Animation Priority Levels

**P0 (Critical)**: Implement first
- Button microinteractions (immediate polish)
- Feature pill hover (visual hierarchy)
- Reduced motion compliance (accessibility requirement)

**P1 (Core)**: Implement second
- Scroll-triggered reveals (modern feel)
- Staggered animations (elegant sequencing)

**P2 (Optional)**: Nice-to-have
- Logo ambient animations (branding polish)
- Advanced hover effects (delight factor)

## 18. Technology Stack Final Decision

### Animation Architecture

```
Landing Page Animation Stack
├── CSS Transitions (hover states, button feedback)
├── CSS Animations (keyframes for loops, bounce)
├── Intersection Observer API (scroll reveals)
└── Vanilla JavaScript (observer setup, ~2KB)

NO external libraries (GSAP, Animate.css, Framer Motion)
```

**Rationale**:
- ✅ Constitution compliant (no frameworks)
- ✅ Performance optimized (native APIs)
- ✅ Minimal size overhead (~5KB total)
- ✅ Widely supported (97%+ browsers)
- ✅ Progressive enhancement (works without JS for hover effects)

### File Structure After Implementation

```
projeto_b/
├── index.html                    (+10 lines: data-animate attributes)
├── styles/
│   ├── variables.css             (+30 lines: animation tokens)
│   └── main.css                  (+120 lines: animation rules)
├── scripts/
│   └── animations.js             (NEW: 60 lines, ~2KB minified)
└── assets/
    └── [existing SVG icons]
```

**Total Size Impact**:
- CSS: ~3KB additional (animations + tokens)
- JavaScript: ~2KB (Intersection Observer)
- **Total**: ~5KB (0.4% of typical landing page)

## 19. Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Animations cause jank on mobile | High | Medium | Use GPU properties only, test on devices |
| JavaScript fails to load | Low | Low | Progressive enhancement (hover still works) |
| Motion sickness from parallax | Medium | Low | Use subtle transforms (<5px), respect reduced-motion |
| Breaking existing layout | High | Low | Test all breakpoints incrementally |
| Performance regression | Medium | Low | Measure with DevTools, stay under 16ms/frame |
| Accessibility violations | High | Low | Implement prefers-reduced-motion first |

## 20. Conclusion: Effects Implementation

### Summary of Decisions

✅ **Hover Parallax**: Pure CSS 2D transforms (buttons, pills, logo)
✅ **Scroll Reveals**: Intersection Observer API (~2KB JS)
✅ **Microinteractions**: CSS keyframes + transitions
✅ **Performance**: GPU-accelerated properties only
✅ **Accessibility**: Full `prefers-reduced-motion` support
✅ **Mobile**: Simplified effects, touch feedback via `:active`

### Ready for Phase 1: Design & Contracts

**Next Steps**:
1. Create `data-model.md` (animation configuration schema)
2. Define JavaScript API contract (Intersection Observer)
3. Generate implementation tasks in `plan.md`
4. Update agent context with animation stack

**Status**: ✅ Research complete, ready to proceed

---

**Addendum Version**: 2.0 Extensions Complete
**Research Completed**: 2025-10-27
**Total Research Time**: ~45 minutes
**Next Phase**: Design & Contracts (Phase 1)
