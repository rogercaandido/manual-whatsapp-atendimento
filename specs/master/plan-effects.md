# Implementation Plan: Modern Effects & Microinteractions

**Feature**: Add Elegant Modern Effects (Hover Parallax, Scroll Reveals, Microinteractions)
**Created**: 2025-10-27
**Branch**: master
**Status**: Ready for Implementation

## Executive Summary

This plan adds modern animation effects to the WhatsApp automation landing page, implementing hover parallax, scroll-triggered reveals, and microinteractions. All effects use GPU-accelerated CSS properties for 60 FPS performance and include full accessibility support via `prefers-reduced-motion`.

**Estimated Effort**: 100 minutes (~1.5-2 hours)
**Risk Level**: 🟢 LOW (additive, non-breaking changes)
**Dependencies**: None (uses native APIs only)

---

## Table of Contents

1. [Technical Context](#technical-context)
2. [Constitution Check](#constitution-check)
3. [Quality Gates](#quality-gates)
4. [Phase 0: Research & Analysis](#phase-0-research--analysis)
5. [Phase 1: Design & Contracts](#phase-1-design--contracts)
6. [Phase 2: Implementation Tasks](#phase-2-implementation-tasks)
7. [Testing Strategy](#testing-strategy)
8. [Rollout Plan](#rollout-plan)

---

## Technical Context

### Project Overview
Landing page HTML/CSS pura para automação WhatsApp. Currently has static design with basic hover effects. User requested "efeitos elegantes e modernos tipo, hover paralax, reveal on scroll, enfim efeitos, microinterações".

### Technology Stack (Extended)
- **Frontend**: HTML5 puro
- **Styling**: CSS3 com Custom Properties + CSS Animations
- **Scripting**: Vanilla JavaScript (Intersection Observer API)
- **Animation Stack**:
  - CSS Transitions (hover states)
  - CSS Animations (@keyframes for loops)
  - Intersection Observer (scroll reveals)
  - No external libraries (GSAP, Animate.css, etc.)

### Current Architecture
```
projeto_b/
├── index.html              # Estrutura HTML semântica
├── styles/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   └── main.css           # Component styles, responsive breakpoints
├── scripts/               # NEW DIRECTORY
│   └── animations.js      # NEW FILE (~60 lines, 2KB minified)
└── assets/
    └── [SVG icons]
```

### New Dependencies
- **None** - Uses native Web APIs only
- IntersectionObserver: 97%+ browser support (IE not required per constitution)

### Integration Points
- HTML: Add `data-animate` attributes (~10 elements)
- CSS: Add animation tokens + rules (~150 lines)
- JS: New file `scripts/animations.js` (~60 lines)

---

## Constitution Check

### Compliance Matrix

| Principle | Requirement | Impact | Compliance |
|-----------|-------------|--------|------------|
| **I. Estrutura e Organização** | Separação HTML/CSS/JS | ✅ New `scripts/` dir maintains separation | ✅ PASS |
| **II. HTML Semântico** | Estrutura semântica | ✅ No structural changes, only attributes | ✅ PASS |
| **III. CSS Responsivo (NON-NEGOTIABLE)** | Mobile-first, variáveis CSS | ✅ Animation tokens use CSS vars, mobile-first media queries | ✅ PASS |
| **IV. Performance** | Otimização, minificação | ✅ GPU-accelerated properties, ~5KB total overhead | ✅ PASS |
| **V. Compatibilidade** | Navegadores modernos | ✅ Uses widely-supported APIs (97%+) | ✅ PASS |

### New Constitution Requirements Met

✅ **Acessibilidade**: Full `prefers-reduced-motion` support (WCAG 2.3.3)
✅ **Progressive Enhancement**: Works without JS (hover effects remain)
✅ **Performance Budget**: 60 FPS target, GPU properties only
✅ **No External Dependencies**: Pure vanilla JS + CSS

### Constitution Violations
**None detected**. All changes align with existing architecture.

### Risk Assessment
**Risk Level**: 🟢 LOW

**Rationale**:
- Additive changes (no breaking modifications)
- Progressive enhancement (degrades gracefully)
- Well-tested APIs (IntersectionObserver since 2017)
- Small code footprint (~5KB total)
- Constitution-compliant (mobile-first, accessible)

---

## Quality Gates

### Gate 1: Animation Performance ✅
**Criteria**:
- [ ] All animations run at 60 FPS (measured in Chrome DevTools)
- [ ] Only GPU-accelerated properties used (transform, opacity)
- [ ] No layout thrashing (no Rendering warnings)
- [ ] Total JS size < 5KB minified
- [ ] Total CSS size < 3KB (animation rules only)

**Validation Method**: Chrome DevTools Performance tab
**Blocker**: Yes (performance regressions not acceptable)

---

### Gate 2: Accessibility Compliance ✅
**Criteria**:
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Scroll reveals show content immediately when motion reduced
- [ ] Focus-visible styles present for keyboard navigation
- [ ] All interactive elements remain accessible during animation
- [ ] No flashing content (WCAG 2.3.1)

**Validation Method**: OS "Reduce Motion" setting + manual testing
**Blocker**: Yes (accessibility violations not acceptable)

---

### Gate 3: Responsive Integrity ✅
**Criteria**:
- [ ] Animations work at 480px (mobile)
- [ ] Animations work at 768px (tablet)
- [ ] Animations work at 1024px (desktop)
- [ ] Animations work at 1440px+ (large desktop)
- [ ] Mobile uses `:active` instead of `:hover`
- [ ] No horizontal scroll from transforms

**Validation Method**: Browser DevTools responsive mode
**Blocker**: No (minor adjustments acceptable)

---

### Gate 4: Cross-Browser Compatibility ✅
**Criteria**:
- [ ] Chrome/Edge: All effects work correctly
- [ ] Firefox: All effects work correctly
- [ ] Safari: All effects work correctly (if testable)
- [ ] IntersectionObserver polyfill not required (graceful degradation)

**Validation Method**: Manual testing in target browsers
**Blocker**: No (minor rendering differences acceptable)

---

## Phase 0: Research & Analysis

### Status: ✅ COMPLETE

**Completed Artifacts**:
- ✅ [research.md](./research.md) - Effects research (Sections 14-20)
- ✅ [data-model.md](./data-model.md) - Animation configuration model
- ✅ [contracts/animation-api.md](./contracts/animation-api.md) - API contracts

**Key Research Findings**:

1. **Hover Parallax**: Use pure CSS 2D transforms (no 3D, motion sickness risk)
2. **Scroll Reveals**: IntersectionObserver API chosen over CSS scroll-driven animations (better support)
3. **Microinteractions**: CSS keyframes for loops, transitions for state changes
4. **Performance**: GPU properties only (transform, opacity) for 60 FPS
5. **Accessibility**: Full `prefers-reduced-motion` implementation required
6. **Mobile**: Simplify effects, use `:active` for touch feedback
7. **Timing**: Material Design durations (100ms instant, 300ms normal, 600ms slow)
8. **Easing**: Custom cubic-bezier functions for elegant motion

**Technology Decisions**:
- ✅ Vanilla JS + CSS (no libraries)
- ✅ Intersection Observer (97%+ support)
- ✅ Progressive enhancement (hover works without JS)
- ✅ Mobile-first animations (simplified on touch devices)

**No Blockers**: All research complete, ready for implementation.

---

## Phase 1: Design & Contracts

### Status: ✅ COMPLETE

### 1.1 Data Model

**Artifact**: [data-model.md](./data-model.md)

**Key Entities**:
1. **Animation Tokens**: Duration and easing CSS variables
2. **Animation State**: Pending → Visible (one-time transition)
3. **Hover State**: Idle → Hover → Active → Focus-visible
4. **Observer Config**: Intersection thresholds and margins
5. **Component Mappings**: Which effects apply to which elements

**State Machine** (Scroll Reveal):
```
PENDING (opacity: 0, translateY: 30px)
   ↓ [enters viewport]
VISIBLE (opacity: 1, translateY: 0)
```

### 1.2 API Contracts

**Artifact**: [contracts/animation-api.md](./contracts/animation-api.md)

**JavaScript API**:
```javascript
function animateOnScroll(): void
// Initializes Intersection Observer
// Observes all [data-animate] elements
// Adds 'animate-visible' class on intersection
```

**HTML API**:
```html
<!-- Basic reveal -->
<div data-animate>Content</div>

<!-- Staggered reveal -->
<div data-animate data-animate-delay="1">First</div>
<div data-animate data-animate-delay="2">Second</div>
```

**CSS Token API**:
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-ambient: 3s;

--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);
```

### 1.3 Component → Effects Mapping

| Component | Effects | Priority | Implementation |
|-----------|---------|----------|----------------|
| **Header Logo** | Accent pulse, hover tilt | P2 (Optional) | CSS keyframes |
| **Hero Title** | Scroll reveal (fade-up) | P1 (Core) | JS + CSS |
| **Hero Subtitle** | Scroll reveal (delayed) | P1 (Core) | JS + CSS |
| **Feature Pills** | Hover glow + lift, stagger reveal | P0 (Critical) | CSS + JS |
| **Primary CTA** | Hover lift, icon shift, press feedback | P0 (Critical) | CSS only |
| **Secondary CTA** | Hover border, press feedback | P0 (Critical) | CSS only |
| **Disclaimer** | Scroll reveal (fade only) | P1 (Core) | JS + CSS |

### 1.4 Animation Tokens (To Be Added to variables.css)

```css
/* ========================================
   ANIMATION TOKENS (NEW)
   ======================================== */

/* Animation Durations */
--duration-instant: 100ms;   /* Button press feedback */
--duration-fast: 200ms;      /* Quick hover transitions */
--duration-normal: 300ms;    /* Standard state changes */
--duration-slow: 600ms;      /* Content reveals */
--duration-ambient: 3s;      /* Ambient loops */

/* Animation Easing */
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);    /* Natural deceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy overshoot */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);       /* Sharp response */
```

---

## Phase 2: Implementation Tasks

### Task Breakdown Summary

**Phase 2.1: Foundation** (15 min)
1. Add animation tokens to variables.css
2. Add global reduced-motion override to main.css
3. Add focus-visible styles

**Phase 2.2: Microinteractions** (25 min)
4. Button hover effects (lift, icon shift)
5. Feature pill hover effects (glow, scale)
6. Logo accent pulse (optional)

**Phase 2.3: Scroll Reveals** (35 min)
7. Create scripts/animations.js
8. Add CSS reveal styles
9. Update HTML with data-animate attributes

**Phase 2.4: Testing** (25 min)
10. Responsive testing (4 breakpoints)
11. Accessibility testing (reduced motion)
12. Performance validation (60 FPS)
13. Cross-browser testing

**Total**: 100 minutes

---

### Task 1: Add Animation Tokens ⏱️ 5 min

**File**: `styles/variables.css`
**Location**: End of file, new section
**Priority**: P0 (Required for all other tasks)

**Changes**:
```css
/* ========================================
   ANIMATION TOKENS
   ======================================== */

/* Animation Durations */
--duration-instant: 100ms;   /* Button press feedback */
--duration-fast: 200ms;      /* Quick hover transitions */
--duration-normal: 300ms;    /* Standard state changes */
--duration-slow: 600ms;      /* Content reveals, scroll animations */
--duration-ambient: 3s;      /* Ambient loops (pulse effects) */

/* Animation Easing Functions */
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);    /* Smooth deceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy overshoot */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);       /* Material sharp */
```

**Testing**:
- Verify CSS parses without errors
- Check variables are accessible in browser DevTools

**Dependencies**: None

---

### Task 2: Add Reduced Motion Override ⏱️ 5 min

**File**: `styles/main.css`
**Location**: End of file, after existing media queries
**Priority**: P0 (Accessibility requirement)

**Changes**:
```css
/* ========================================
   ACCESSIBILITY: REDUCED MOTION
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  /* Disable all animations globally */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Ensure scroll reveals are visible */
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Testing**:
- Enable "Reduce Motion" in OS settings (macOS: Accessibility → Display → Reduce Motion)
- Verify all animations become instant
- Verify `[data-animate]` elements are visible immediately

**Dependencies**: None

---

### Task 3: Add Focus-Visible Styles ⏱️ 5 min

**File**: `styles/main.css`
**Location**: After button styles (around line 320)
**Priority**: P0 (Accessibility requirement)

**Changes**:
```css
/* ========================================
   ACCESSIBILITY: FOCUS VISIBLE
   ======================================== */

/* Focus ring for keyboard navigation */
.btn:focus-visible,
.feature-pill:focus-visible,
.header__logo:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  transition: outline-offset var(--duration-fast) var(--ease-smooth);
}

/* Do NOT show focus ring on mouse click */
.btn:focus:not(:focus-visible),
.feature-pill:focus:not(:focus-visible) {
  outline: none;
}
```

**Testing**:
- Use Tab key to navigate buttons
- Verify green outline appears
- Click button with mouse - outline should NOT appear

**Dependencies**: Task 1 (animation tokens)

---

### Task 4: Button Hover Effects ⏱️ 10 min

**File**: `styles/main.css`
**Location**: Update existing `.btn` styles (around lines 256-308)
**Priority**: P0 (High-impact microinteraction)

**Changes**:

**A. Update base button transition**:
```css
/* Find existing .btn class and update transition */
.btn {
  /* ... existing properties ... */
  transition: all var(--duration-normal) var(--ease-smooth);
}
```

**B. Enhance primary button hover** (modify existing):
```css
/* Desktop: Full hover effects */
@media (hover: hover) and (min-width: 1024px) {
  .btn--primary:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  /* Icon lifts faster than button */
  .btn--primary:hover .btn__icon {
    transform: translateY(-2px) scale(1.1);
    transition: transform var(--duration-fast) var(--ease-bounce);
  }
}
```

**C. Add button press feedback**:
```css
.btn:active {
  transform: scale(0.98) !important;
  transition: transform var(--duration-instant) var(--ease-sharp);
}
```

**D. Enhance secondary button hover**:
```css
@media (hover: hover) and (min-width: 1024px) {
  .btn--secondary:hover {
    border-color: var(--color-zinc-500);
    background: rgba(113, 113, 122, 0.1);
    transform: translateY(-1px);
  }
}
```

**Testing**:
- Hover primary CTA - button lifts, icon bounces
- Hover secondary CTA - border brightens
- Click any button - subtle press down effect
- Test on mobile - no hover, only press feedback

**Dependencies**: Task 1 (animation tokens)

---

### Task 5: Feature Pill Hover Effects ⏱️ 10 min

**File**: `styles/main.css`
**Location**: Update `.feature-pill` styles (around lines 175-217)
**Priority**: P0 (High visual impact)

**Changes**:

**A. Update base pill transition**:
```css
.feature-pill {
  /* ... existing properties ... */
  transition: border-color var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth),
              transform var(--duration-normal) var(--ease-smooth);
}
```

**B. Add hover glow effect** (desktop only):
```css
/* Desktop: Full hover effects */
@media (hover: hover) and (min-width: 1024px) {
  .feature-pill:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 20px rgba(116, 210, 0, 0.3);
    transform: translateY(-2px) scale(1.02);
  }

  /* Icon scales slightly on hover */
  .feature-pill:hover .feature-pill__icon {
    transform: scale(1.1);
    transition: transform var(--duration-fast) var(--ease-bounce);
  }
}
```

**C. Add touch feedback** (mobile):
```css
/* Mobile: Touch feedback only */
@media (max-width: 768px) {
  .feature-pill:active {
    transform: scale(0.98);
    border-color: var(--color-primary);
  }
}
```

**Testing**:
- Hover pill on desktop - green glow, lifts up
- Tap pill on mobile - subtle press down
- Verify icon scales smoothly

**Dependencies**: Task 1 (animation tokens)

---

### Task 6: Logo Accent Pulse (Optional) ⏱️ 5 min

**File**: `styles/main.css`
**Location**: After `.header__logo-accent` styles (around line 63)
**Priority**: P2 (Optional polish)

**Changes**:

**A. Add pulse keyframes**:
```css
/* Subtle ambient animation */
@keyframes logo-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

**B. Apply to logo accent**:
```css
.header__logo-accent {
  color: var(--color-primary);
  animation: logo-pulse var(--duration-ambient) ease-in-out infinite;
}
```

**C. Add hover effect**:
```css
@media (hover: hover) {
  .header__logo:hover .header__logo-accent {
    animation-play-state: paused;
    opacity: 1;
  }

  .header__logo:hover {
    transform: rotate(-2deg);
    transition: transform var(--duration-normal) var(--ease-bounce);
  }
}
```

**Testing**:
- Watch accent pulse slowly (3s cycle)
- Hover logo - pulse stops, logo tilts slightly
- Verify effect is subtle (not distracting)

**Dependencies**: Task 1 (animation tokens)

---

### Task 7: Create Scroll Animation Script ⏱️ 15 min

**File**: `scripts/animations.js` (NEW FILE)
**Location**: Create `scripts/` directory if needed
**Priority**: P1 (Core feature)

**Full File Content**:
```javascript
/**
 * Scroll-triggered Animations
 * Uses Intersection Observer API for performant scroll reveals
 * @version 1.0
 * @requires Modern browser with IntersectionObserver support (97%+)
 */

(function() {
  'use strict';

  /**
   * Initializes scroll-triggered animations
   * Observes elements with [data-animate] attribute
   */
  function animateOnScroll() {
    // Check browser support
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, showing all content');
      // Fallback: show all content immediately
      document.querySelectorAll('[data-animate]').forEach(function(el) {
        el.classList.add('animate-visible');
      });
      return;
    }

    // Observer configuration
    var config = {
      threshold: 0.1,                    // Trigger at 10% visibility
      rootMargin: '0px 0px -50px 0px'    // Trigger 50px before entering viewport
    };

    // Create observer
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Add visible class to trigger CSS animation
          entry.target.classList.add('animate-visible');

          // Stop observing (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    }, config);

    // Observe all elements with data-animate attribute
    var animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach(function(element) {
      observer.observe(element);
    });

    // Cleanup function (optional, for future use)
    return function cleanup() {
      observer.disconnect();
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
  } else {
    // DOM already loaded
    animateOnScroll();
  }

})();
```

**Testing**:
- Check browser console for errors
- Verify IntersectionObserver is created
- Scroll page - verify observer callback fires

**Dependencies**: None (pure JavaScript)

---

### Task 8: Add CSS Scroll Reveal Styles ⏱️ 10 min

**File**: `styles/main.css`
**Location**: End of file, before responsive media queries
**Priority**: P1 (Core feature)

**Changes**:
```css
/* ========================================
   SCROLL-TRIGGERED ANIMATIONS
   ======================================== */

/* Initial hidden state */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-smooth),
              transform var(--duration-slow) var(--ease-smooth);
}

/* Visible state (class added by JS) */
[data-animate].animate-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for sequential reveals */
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
[data-animate-delay="4"] { transition-delay: 0.4s; }
[data-animate-delay="5"] { transition-delay: 0.5s; }

/* Subtle variation: fade-only (no translateY) */
[data-animate-type="fade"] {
  transform: none;
}
```

**Testing**:
- Inspect element with DevTools
- Verify initial state: `opacity: 0`, `translateY(30px)`
- Add class manually in console: `el.classList.add('animate-visible')`
- Verify transition animates smoothly

**Dependencies**: Task 1 (animation tokens)

---

### Task 9: Add data-animate Attributes to HTML ⏱️ 10 min

**File**: `index.html`
**Location**: Various elements throughout file
**Priority**: P1 (Core feature)

**Changes**:

**A. Hero subtitle** (line 50):
```html
<p class="hero__subtitle" data-node-id="2014:262" data-animate>
  IA recebe, organiza e atualiza você automaticamente.
</p>
```

**B. Hero title** (line 58):
```html
<h1 class="hero__title-text" data-node-id="2019:58" data-animate>MANDA NO</h1>
```

**C. Feature pills** (lines 73, 81, 89 - with stagger):
```html
<!-- Texto -->
<div class="feature-pill" data-node-id="2019:44" data-animate data-animate-delay="1">
  <span class="feature-pill__text" data-node-id="2014:281">Texto</span>
  <!-- ... -->
</div>

<!-- Imagem -->
<div class="feature-pill" data-node-id="2019:47" data-animate data-animate-delay="2">
  <span class="feature-pill__text" data-node-id="2019:48">Imagem</span>
  <!-- ... -->
</div>

<!-- Documento -->
<div class="feature-pill" data-node-id="2019:49" data-animate data-animate-delay="3">
  <span class="feature-pill__text" data-node-id="2019:50">Documento</span>
  <!-- ... -->
</div>
```

**D. CTA section** (line 99):
```html
<section class="cta-section" data-node-id="2014:192" data-animate>
  <!-- ... -->
</section>
```

**E. Link animations.js script** (add before `</body>`):
```html
  <!-- Animation Script -->
  <script src="scripts/animations.js"></script>
</body>
</html>
```

**Testing**:
- Reload page
- Verify elements are hidden initially
- Scroll down - elements animate into view
- Feature pills animate in sequence (100ms apart)

**Dependencies**: Task 7 (animations.js), Task 8 (CSS styles)

---

### Task 10: Responsive Testing ⏱️ 10 min

**Procedure**:

**A. Test each breakpoint**:
1. **Mobile (480px)**:
   - Hover effects disabled
   - Touch feedback (`:active`) works
   - Scroll reveals trigger correctly
   - No horizontal scroll

2. **Tablet (768px)**:
   - Same as mobile
   - Pills wrap correctly with animations

3. **Desktop (1024px)**:
   - Hover effects enabled
   - Scroll reveals smooth
   - No layout shift from transforms

4. **Large Desktop (1440px+)**:
   - All effects work correctly
   - Animations performant

**Pass Criteria**:
- All breakpoints display correctly
- No broken layouts
- Animations smooth at all sizes
- Mobile has touch feedback, not hover

**Tools**: Chrome DevTools Device Mode

**Dependencies**: All implementation tasks complete

---

### Task 11: Accessibility Testing ⏱️ 5 min

**Procedure**:

**A. Reduced Motion Test**:
1. Enable "Reduce Motion" in OS settings
   - macOS: System Preferences → Accessibility → Display → Reduce Motion
   - Windows: Settings → Ease of Access → Display → Show animations
2. Reload page
3. Verify:
   - All `[data-animate]` elements immediately visible
   - No animations play
   - Hover effects become instant state changes

**B. Keyboard Navigation Test**:
1. Use Tab key to navigate through page
2. Verify:
   - Focus ring visible on all interactive elements
   - Focus ring has sufficient contrast
   - Animations don't interfere with navigation

**Pass Criteria**:
- ✅ Reduced motion completely disables animations
- ✅ Content always accessible
- ✅ Keyboard focus always visible

**Dependencies**: Task 2 (reduced motion), Task 3 (focus-visible)

---

### Task 12: Performance Validation ⏱️ 5 min

**Procedure**:

**A. Chrome DevTools Performance**:
1. Open Chrome DevTools → Performance tab
2. Start recording
3. Scroll page (trigger animations)
4. Stop recording
5. Check:
   - FPS (should be solid 60 FPS)
   - No long tasks (yellow bars)
   - No layout recalculations during animations

**B. Check Animation Properties**:
1. Inspect animating element
2. DevTools → More Tools → Rendering → Paint Flashing
3. Scroll page
4. Verify:
   - No paint flashing during `transform`/`opacity` animations
   - Only composited layers animating (green in Layers panel)

**Pass Criteria**:
- ✅ 60 FPS maintained during all animations
- ✅ No CPU-bound property animations
- ✅ GPU compositing for all animated elements

**Tools**: Chrome DevTools Performance, Rendering

**Dependencies**: All implementation tasks complete

---

### Task 13: Cross-Browser Testing ⏱️ 5 min

**Procedure**:

**A. Chrome/Edge (Chromium)**:
- All animations should work perfectly (primary dev browser)

**B. Firefox**:
1. Open page in Firefox
2. Test:
   - Scroll reveals (IntersectionObserver)
   - Hover effects (CSS transitions)
   - Button press feedback
3. Verify visual consistency

**C. Safari** (if available):
1. Open page in Safari
2. Test webkit-specific rendering
3. Check font-smoothing (antialiasing)

**Pass Criteria**:
- ✅ All effects work in Chrome/Firefox
- ✅ Minor rendering differences acceptable
- ⚠️ Safari not required but recommended

**Dependencies**: All implementation tasks complete

---

## Testing Strategy

### Manual Testing Checklist

**Functional Tests**:
- [ ] Scroll reveals trigger at correct threshold (10% visibility)
- [ ] Staggered animations have 100ms delays
- [ ] Hover effects work on desktop only (`@media (hover: hover)`)
- [ ] Touch feedback (`:active`) works on mobile
- [ ] Button icon shifts on hover
- [ ] Feature pills glow green on hover
- [ ] Logo accent pulses subtly (if implemented)

**Accessibility Tests**:
- [ ] Reduced motion disables all animations
- [ ] `[data-animate]` elements visible with motion disabled
- [ ] Keyboard Tab navigation shows focus ring
- [ ] Focus ring has sufficient contrast (3:1 minimum)

**Performance Tests**:
- [ ] 60 FPS during all animations
- [ ] Only GPU properties animated (transform, opacity)
- [ ] No layout thrashing (Rendering warnings)
- [ ] JavaScript < 5KB minified
- [ ] CSS < 3KB (animation rules)

**Responsive Tests**:
- [ ] Mobile (480px): Touch feedback, no hover
- [ ] Tablet (768px): Same as mobile
- [ ] Desktop (1024px): Full hover effects
- [ ] Large Desktop (1440px+): All effects work

**Cross-Browser Tests**:
- [ ] Chrome: All effects perfect
- [ ] Firefox: All effects consistent
- [ ] Safari: All effects work (if testable)

---

## Rollout Plan

### Pre-Deployment Checklist

- [ ] All 13 implementation tasks complete
- [ ] Functional testing passed (scroll reveals, hover, touch)
- [ ] Accessibility testing passed (reduced motion, focus)
- [ ] Performance testing passed (60 FPS, GPU properties)
- [ ] Responsive testing passed (4 breakpoints)
- [ ] Cross-browser testing passed (Chrome, Firefox minimum)
- [ ] Code review complete (self-review acceptable)
- [ ] No console errors
- [ ] Git commit prepared with detailed message

---

### Deployment Steps

**Step 1: Verify All Files**
```bash
# Check all new/modified files exist
ls styles/variables.css
ls styles/main.css
ls scripts/animations.js
ls index.html
```

**Step 2: Commit Changes**
```bash
git add styles/variables.css styles/main.css scripts/animations.js index.html
git commit -m "feat: adiciona efeitos modernos e microinterações

- Implementa hover parallax em botões e pills com transforms CSS
- Adiciona scroll reveals com Intersection Observer API
- Cria microinterações (glow, lift, press feedback)
- Adiciona pulse animation no logo accent
- Implementa suporte completo a prefers-reduced-motion (WCAG 2.3.3)
- Adiciona focus-visible para navegação por teclado
- Cria animation tokens em variables.css (duration, easing)
- Desenvolve scripts/animations.js (~60 lines, 2KB minified)

Efeitos implementados:
- Botões: Hover lift + icon shift + press feedback
- Feature pills: Glow verde + scale + stagger reveal (100ms delays)
- Hero title/subtitle: Fade-up scroll reveal
- CTA section: Scroll reveal
- Logo accent: Pulse animation (3s loop)

Performance:
- Apenas propriedades GPU (transform, opacity)
- 60 FPS em todos os breakpoints
- Total overhead: ~5KB (2KB JS + 3KB CSS)

Acessibilidade:
- prefers-reduced-motion desabilita animações
- focus-visible para navegação por teclado
- IntersectionObserver com fallback graceful

Testes: Chrome, Firefox em 480px, 768px, 1024px, 1440px
Compatibilidade: Chrome/Edge/Firefox (97%+ support)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Step 3: Deploy**
- For static hosting: Upload modified files + new `scripts/` directory
- For local development: Changes immediately visible on refresh

**Step 4: Post-Deployment Verification**
- [ ] Production site loads correctly
- [ ] No console errors or warnings
- [ ] Animations trigger on scroll
- [ ] Hover effects work on desktop
- [ ] Reduced motion setting respected

---

### Rollback Plan

**Scenario 1: Performance Issues (FPS drops)**
```bash
# Option A: Disable scroll reveals only
# Remove data-animate attributes from HTML
git revert <commit-hash> -- index.html scripts/animations.js

# Option B: Full rollback
git revert HEAD
```

**Scenario 2: Browser Compatibility Issues**
```bash
# Add IntersectionObserver polyfill (if needed)
# Update animations.js with polyfill check
```

**Scenario 3: Layout Breaks on Mobile**
```bash
# Adjust transforms in main.css
# Reduce scale/translateY values
```

**Risk**: 🟢 LOW - All changes are additive and non-breaking

---

## Success Metrics

### Acceptance Criteria

✅ **AC-1: Scroll Reveals**
- [ ] Hero title fades up when scrolled into view
- [ ] Feature pills animate in sequence (staggered 100ms)
- [ ] CTA section reveals smoothly
- [ ] Animations trigger at 10% visibility threshold

✅ **AC-2: Hover Effects (Desktop)**
- [ ] Primary CTA lifts on hover, icon shifts
- [ ] Secondary CTA border brightens on hover
- [ ] Feature pills glow green and scale on hover
- [ ] Logo tilts slightly on hover

✅ **AC-3: Microinteractions**
- [ ] All buttons have press feedback (scale 0.98)
- [ ] Logo accent pulses subtly (3s cycle)
- [ ] Transitions use custom easing (smooth, bounce, sharp)
- [ ] Durations match design spec (100ms, 300ms, 600ms)

✅ **AC-4: Accessibility**
- [ ] Reduced motion disables all animations
- [ ] Content visible without JavaScript
- [ ] Keyboard focus ring visible on Tab
- [ ] No flashing content (WCAG compliance)

✅ **AC-5: Performance**
- [ ] 60 FPS maintained during all animations
- [ ] Only GPU properties used (transform, opacity)
- [ ] Total JS < 5KB, total CSS < 3KB
- [ ] No layout thrashing warnings

✅ **AC-6: Responsive**
- [ ] Desktop (1024px+): Full hover effects
- [ ] Mobile (< 768px): Touch feedback only
- [ ] All breakpoints maintain layout integrity
- [ ] No horizontal scroll from transforms

---

### Definition of Done

**Code Complete**:
- All 13 implementation tasks finished
- scripts/animations.js created and functional
- Animation tokens added to variables.css
- Reduced motion override implemented
- Focus-visible styles added
- HTML updated with data-animate attributes

**Testing Complete**:
- Functional testing passed (scroll, hover, touch)
- Accessibility testing passed (reduced motion, focus)
- Performance testing passed (60 FPS, GPU properties)
- Responsive testing passed (4 breakpoints)
- Cross-browser testing passed (Chrome, Firefox)

**Documentation Complete**:
- This plan.md updated with actual implementation
- Git commit message descriptive and detailed
- Code comments in animations.js

**Deployment Complete**:
- Changes committed to master branch
- Site accessible and functional
- No console errors
- Effects work as expected

---

## Appendix

### A. File Change Summary

| File | Change Type | Lines Added | Risk | Priority |
|------|-------------|-------------|------|----------|
| `styles/variables.css` | Modified | +15 | Low | P0 |
| `styles/main.css` | Modified | +120 | Medium | P0 |
| `scripts/animations.js` | Created | +60 | Low | P1 |
| `index.html` | Modified | +10 attrs | Low | P1 |

**Total Impact**: ~205 lines across 4 files

**Size Impact**:
- CSS: +3KB (animation rules + tokens)
- JavaScript: +2KB (Intersection Observer)
- HTML: +500 bytes (data attributes)
- **Total**: ~5.5KB (0.4% of typical landing page)

---

### B. Animation Token Reference

**Complete Token List** (post-implementation):

```css
/* Animation Durations */
--duration-instant: 100ms;   /* Button press */
--duration-fast: 200ms;      /* Quick transitions */
--duration-normal: 300ms;    /* Hover effects */
--duration-slow: 600ms;      /* Scroll reveals */
--duration-ambient: 3s;      /* Ambient loops */

/* Animation Easing */
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);    /* Deceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Overshoot */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);       /* Material sharp */
```

**Usage Examples**:
```css
/* Hover effect */
.btn:hover {
  transition: transform var(--duration-normal) var(--ease-smooth);
}

/* Scroll reveal */
[data-animate] {
  transition: opacity var(--duration-slow) var(--ease-smooth);
}

/* Press feedback */
.btn:active {
  transition: transform var(--duration-instant) var(--ease-sharp);
}
```

---

### C. Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge | Support % |
|---------|--------|---------|--------|------|-----------|
| IntersectionObserver | ✅ 51+ | ✅ 55+ | ✅ 12.1+ | ✅ 15+ | 97%+ |
| CSS Custom Properties | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 15+ | 98%+ |
| CSS Transitions | ✅ All | ✅ All | ✅ All | ✅ All | 99%+ |
| prefers-reduced-motion | ✅ 74+ | ✅ 63+ | ✅ 10.1+ | ✅ 79+ | 96%+ |
| :focus-visible | ✅ 86+ | ✅ 85+ | ✅ 15.4+ | ✅ 86+ | 94%+ |

**Minimum Browser Versions** (Constitution requirement: "últimas 2 versões"):
- Chrome/Edge: 86+ (Released: 2020)
- Firefox: 85+ (Released: 2021)
- Safari: 15.4+ (Released: 2022)

**Fallback Strategy**:
- IntersectionObserver not supported → All content immediately visible
- CSS variables not supported → Uses fallback values
- Reduced motion not supported → Animations still work (not critical)

---

### D. Performance Budget

**Animation Performance Limits**:

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| Frame Rate | 60 FPS | 55 FPS | Chrome DevTools Performance |
| Frame Time | 16.67ms | 18ms | Performance tab |
| JavaScript Size | 2KB | 5KB | File size (minified) |
| CSS Size | 3KB | 4KB | Animation rules only |
| Concurrent Animations | 5-8 | 10 | Stagger reveals |
| Paint Operations | 0 | 2 | Rendering tab |

**Monitoring**:
- Use Chrome DevTools Performance tab during animations
- Check "Rendering" → "Frame Rendering Stats" for FPS
- Monitor "Layers" panel for GPU compositing
- Watch for yellow "Long Task" warnings

---

### E. Implementation Checklist

**Phase 2.1: Foundation** ✅
- [ ] Task 1: Add animation tokens (5 min)
- [ ] Task 2: Add reduced motion override (5 min)
- [ ] Task 3: Add focus-visible styles (5 min)

**Phase 2.2: Microinteractions** ✅
- [ ] Task 4: Button hover effects (10 min)
- [ ] Task 5: Feature pill hover effects (10 min)
- [ ] Task 6: Logo accent pulse - OPTIONAL (5 min)

**Phase 2.3: Scroll Reveals** ✅
- [ ] Task 7: Create animations.js (15 min)
- [ ] Task 8: Add CSS reveal styles (10 min)
- [ ] Task 9: Add data-animate attributes (10 min)

**Phase 2.4: Testing** ✅
- [ ] Task 10: Responsive testing (10 min)
- [ ] Task 11: Accessibility testing (5 min)
- [ ] Task 12: Performance validation (5 min)
- [ ] Task 13: Cross-browser testing (5 min)

**Total Time**: 100 minutes (~1.5-2 hours)

---

## Plan Metadata

**Plan Version**: 3.0 (Modern Effects & Microinteractions)
**Created**: 2025-10-27
**Feature Branch**: master (direct commit)
**Estimated Effort**: 100 minutes (~1.5-2 hours)
**Risk Level**: 🟢 LOW
**Status**: ✅ READY FOR IMPLEMENTATION

**Research Artifacts**:
- ✅ [research.md](./research.md) - Sections 14-20 (Effects research)
- ✅ [data-model.md](./data-model.md) - Animation configuration model
- ✅ [contracts/animation-api.md](./contracts/animation-api.md) - API contracts

**User Request**:
> "precisamos adicionar alguns efeitos elegantes e modernos tipo, hover paralax, reveal on scroll, enfim efeitos, microinterações, para ficar mais legal"

**Implementation Strategy**:
- ✅ Hover parallax via CSS 2D transforms
- ✅ Scroll reveals via Intersection Observer API
- ✅ Microinteractions via CSS transitions + keyframes
- ✅ Accessibility via prefers-reduced-motion
- ✅ Performance via GPU-accelerated properties only

**Next Steps**:
1. ✅ Research complete (research.md)
2. ✅ Data model defined (data-model.md)
3. ✅ Contracts written (animation-api.md)
4. ⏭️ Execute Task 1 (Add animation tokens)
5. ⏭️ Execute Tasks 2-13 (Implementation + Testing)
6. ✅ Commit changes with detailed message

---

**End of Implementation Plan**
