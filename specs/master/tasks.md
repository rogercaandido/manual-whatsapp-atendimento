# Implementation Tasks: Modern Effects & Microinteractions

**Feature**: Add Elegant Modern Effects (Hover Parallax, Scroll Reveals, Microinteractions)
**Branch**: master
**Status**: Ready to Execute
**Estimated Time**: 100 minutes (~1.5-2 hours)

---

## Overview

This document provides actionable implementation tasks for adding modern animation effects to the WhatsApp automation landing page. Tasks are organized into phases for systematic execution, with clear dependencies and parallel execution opportunities.

**Implementation Strategy**: Incremental delivery - each phase builds testable functionality

---

## Task Summary

| Phase | Task Count | Est. Time | Can Start After |
|-------|------------|-----------|-----------------|
| Phase 1: Setup | 1 task | 2 min | Immediately |
| Phase 2: Foundation | 3 tasks | 15 min | Phase 1 |
| Phase 3: Microinteractions | 3 tasks | 25 min | Phase 2 |
| Phase 4: Scroll Reveals | 3 tasks | 35 min | Phase 2 |
| Phase 5: Testing & Validation | 4 tasks | 25 min | Phases 3 & 4 |

**Total Tasks**: 14
**Parallel Opportunities**: 6 tasks can run in parallel
**Critical Path**: Phase 1 → Phase 2 → Phase 3/4 (parallel) → Phase 5

---

## Phase 1: Setup (2 minutes)

**Goal**: Create project structure for animation scripts

**Independent Test Criteria**:
- ✅ `scripts/` directory exists in project root
- ✅ Directory is accessible and writable

### Tasks

- [ ] T001 Create scripts directory at project root: C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\scripts

**Validation**: Run `dir scripts` from project root - should succeed without errors

---

## Phase 2: Foundation (15 minutes)

**Goal**: Establish animation infrastructure (tokens, accessibility, focus states)

**Independent Test Criteria**:
- ✅ Animation tokens defined and accessible via CSS variables
- ✅ Reduced motion override disables animations when OS setting enabled
- ✅ Focus-visible styles show outline on Tab key navigation

### Tasks

- [ ] T002 Add animation tokens (duration & easing) to styles/variables.css
- [ ] T003 [P] Add reduced motion accessibility override to end of styles/main.css
- [ ] T004 [P] Add focus-visible styles for keyboard navigation to styles/main.css

**Validation Steps**:
1. **T002**: Open DevTools Console → type `getComputedStyle(document.documentElement).getPropertyValue('--duration-normal')` → should return `300ms`
2. **T003**: Enable "Reduce Motion" in OS settings → refresh page → verify no animations play
3. **T004**: Press Tab key → verify green outline appears on focusable elements

**Parallel Execution**: T003 and T004 can run in parallel (different CSS sections)

---

## Phase 3: Microinteractions (25 minutes)

**Goal**: Implement hover effects, button feedback, and subtle animations

**Independent Test Criteria**:
- ✅ Buttons lift on hover (desktop only), press down on click
- ✅ Feature pills glow green and scale on hover
- ✅ Logo accent pulses subtly (3-second cycle)
- ✅ Mobile uses touch feedback (`:active`) instead of hover

### Tasks

- [ ] T005 [P] [MICRO] Implement button hover & press effects in styles/main.css (.btn class ~line 256)
- [ ] T006 [P] [MICRO] Implement feature pill hover glow & scale in styles/main.css (.feature-pill class ~line 175)
- [ ] T007 [P] [MICRO] Add logo accent pulse animation in styles/main.css (.header__logo-accent ~line 63)

**Validation Steps**:
1. **T005**:
   - Desktop: Hover primary CTA → button lifts 2px, icon shifts
   - Mobile: Tap button → scales to 0.98
2. **T006**:
   - Desktop: Hover pill → green glow appears, lifts 2px
   - Mobile: Tap pill → scales to 0.98
3. **T007**:
   - Watch logo underscore → fades to 60% opacity and back over 3 seconds

**Parallel Execution**: All 3 tasks (T005, T006, T007) can run in parallel (different CSS classes)

**Test Command** (after completion):
```bash
# Open index.html in browser
# Hover over "Começar agora" button - should lift
# Hover over "Texto" pill - should glow green
# Watch webdev_ logo - underscore should pulse
```

---

## Phase 4: Scroll Reveals (35 minutes)

**Goal**: Implement scroll-triggered animations using Intersection Observer

**Independent Test Criteria**:
- ✅ Elements with `[data-animate]` start hidden (opacity: 0)
- ✅ Elements fade up when scrolled into view (10% visibility threshold)
- ✅ Feature pills animate in sequence with 100ms stagger
- ✅ Animations trigger once (don't repeat on re-scroll)
- ✅ IntersectionObserver gracefully degrades if unsupported

### Tasks

- [ ] T008 [SCROLL] Create scripts/animations.js with Intersection Observer implementation
- [ ] T009 [SCROLL] Add CSS scroll reveal styles ([data-animate] rules) to styles/main.css
- [ ] T010 [SCROLL] Add data-animate attributes to HTML elements in index.html

**Validation Steps**:
1. **T008**:
   - Check browser console → no errors
   - Type `window.IntersectionObserver` in console → should be defined
2. **T009**:
   - Inspect hero title in DevTools → should have `opacity: 0; transform: translateY(30px)`
3. **T010**:
   - Reload page → hero title, pills, CTA should be hidden
   - Scroll down → elements fade up smoothly
   - Pills animate in sequence (Texto → Imagem → Documento)

**Dependencies**:
- T009 depends on T002 (needs animation tokens)
- T010 depends on T008 and T009 (needs JS and CSS)

**Test Command** (after completion):
```bash
# Open index.html in browser
# Initial state: Hero title should be invisible
# Scroll down: Hero title fades up
# Continue scrolling: Feature pills animate in sequence (100ms apart)
# CTA section fades up at bottom
```

**Link Script** (part of T010):
Add before `</body>` in index.html:
```html
<!-- Animation Script -->
<script src="scripts/animations.js"></script>
```

---

## Phase 5: Testing & Validation (25 minutes)

**Goal**: Verify animations work correctly across devices, browsers, and accessibility settings

**Independent Test Criteria**:
- ✅ All animations run at 60 FPS (no jank)
- ✅ Responsive behavior correct at 480px, 768px, 1024px, 1440px
- ✅ Reduced motion setting disables all animations
- ✅ Keyboard navigation shows focus ring
- ✅ Chrome and Firefox render animations correctly

### Tasks

- [ ] T011 [TEST] Responsive testing: Verify animations at 4 breakpoints (480px, 768px, 1024px, 1440px)
- [ ] T012 [TEST] Accessibility testing: Verify reduced motion and keyboard navigation
- [ ] T013 [TEST] Performance validation: Measure 60 FPS in Chrome DevTools Performance tab
- [ ] T014 [TEST] Cross-browser testing: Verify in Chrome and Firefox

**Validation Checklists**:

**T011 - Responsive** (10 min):
- [ ] 480px (mobile): Touch feedback works, no hover effects
- [ ] 768px (tablet): Same as mobile, pills wrap correctly
- [ ] 1024px (desktop): Full hover effects enabled
- [ ] 1440px+ (large): All effects work smoothly
- [ ] No horizontal scroll from transforms

**T012 - Accessibility** (5 min):
- [ ] Enable "Reduce Motion" in OS → all animations become instant
- [ ] `[data-animate]` elements visible immediately with motion off
- [ ] Press Tab key → green focus ring appears on buttons/pills
- [ ] Focus ring has sufficient contrast (WCAG AA: 3:1 minimum)

**T013 - Performance** (5 min):
- [ ] Chrome DevTools → Performance tab → Record → Scroll page
- [ ] FPS stays at 60 throughout scroll animations
- [ ] No yellow "Long Task" warnings
- [ ] No layout recalculation warnings during animations
- [ ] GPU compositing active (check Layers panel)

**T014 - Cross-Browser** (5 min):
- [ ] Chrome: All effects work perfectly
- [ ] Firefox: Scroll reveals, hover effects consistent
- [ ] No console errors in either browser

**Test Commands**:
```bash
# T011 - Responsive
# Chrome DevTools → Toggle Device Mode (Ctrl+Shift+M)
# Test: iPhone SE (375px), iPad (768px), Laptop (1440px)

# T012 - Accessibility
# macOS: System Preferences → Accessibility → Display → Reduce Motion
# Windows: Settings → Ease of Access → Display → Show animations (off)

# T013 - Performance
# Chrome DevTools → Performance tab → Record (Ctrl+E)
# Scroll page for 10 seconds → Stop → Check FPS chart

# T014 - Cross-Browser
# Open index.html in Firefox
# Test hover, scroll reveals, button press
```

---

## Dependencies Graph

```
T001 (Create scripts/)
  ↓
T002 (Animation tokens) ────────┬──────────────────────────────┐
  ↓                             ↓                              ↓
T003 [P] (Reduced motion)    T005 [P] (Button hover)      T009 (Scroll CSS)
T004 [P] (Focus-visible)     T006 [P] (Pill hover)            ↓
                              T007 [P] (Logo pulse)         T008 (animations.js)
                                  ↓                             ↓
                              T011 (Responsive) ←──────── T010 (HTML attributes)
                                  ↓                             ↓
                              T012 (Accessibility)         T011 (Responsive)
                              T013 (Performance)           T012 (Accessibility)
                              T014 (Cross-browser)         T013 (Performance)
                                                           T014 (Cross-browser)
```

**Critical Path**: T001 → T002 → T009 → T008 → T010 → T011/T012/T013/T014

**Parallel Opportunities**:
- After T002: Run T003, T004, T005, T006, T007 simultaneously (5 parallel tasks possible)
- After T010: Run T011, T012, T013, T014 simultaneously (4 parallel tasks possible)

---

## Detailed Task Instructions

### T001: Create scripts directory

**File**: Project root
**Estimated Time**: 2 minutes
**Priority**: P0 (Blocking)

**Instructions**:
```bash
# Windows Command Prompt
cd "C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b"
mkdir scripts

# Verify
dir scripts
```

**Success Criteria**:
- Directory exists at: `C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\scripts`
- No errors when running `dir scripts`

---

### T002: Add animation tokens

**File**: `styles/variables.css`
**Location**: End of file, new section
**Estimated Time**: 5 minutes
**Priority**: P0 (Blocking for all animation tasks)

**Instructions**:
1. Open `styles/variables.css`
2. Scroll to end of file (after existing CSS variables)
3. Add new section with animation tokens

**Code to Add**:
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

**Success Criteria**:
- Variables defined in `:root` selector scope
- No CSS syntax errors
- Variables accessible via `getComputedStyle(document.documentElement).getPropertyValue('--duration-normal')` in browser console

---

### T003: Add reduced motion override [P]

**File**: `styles/main.css`
**Location**: End of file, after existing `@media` queries
**Estimated Time**: 5 minutes
**Priority**: P0 (Accessibility requirement)
**Parallelizable**: Yes (can run with T004)

**Instructions**:
1. Open `styles/main.css`
2. Scroll to end of file (after existing media queries ~line 422)
3. Add reduced motion override section

**Code to Add**:
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

**Success Criteria**:
- Media query parses without errors
- When "Reduce Motion" enabled in OS, all animations become instant
- `[data-animate]` elements always visible

**Testing**:
```bash
# macOS: System Preferences → Accessibility → Display → Reduce Motion (on)
# Windows: Settings → Ease of Access → Display → Show animations (off)
# Reload page → verify no animations play
```

---

### T004: Add focus-visible styles [P]

**File**: `styles/main.css`
**Location**: After button styles (around line 320, before reduced motion section)
**Estimated Time**: 5 minutes
**Priority**: P0 (Accessibility requirement)
**Parallelizable**: Yes (can run with T003)

**Instructions**:
1. Open `styles/main.css`
2. Find `.disclaimer` class (around line 322)
3. Add focus-visible section after disclaimer styles

**Code to Add**:
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

**Success Criteria**:
- Focus ring appears when pressing Tab key
- Focus ring does NOT appear when clicking with mouse
- Outline has 3:1 contrast ratio (green #74d200 on black background ✅)

**Testing**:
```bash
# Press Tab key repeatedly
# Verify green outline appears on buttons and pills
# Click button with mouse
# Verify NO outline appears (only on keyboard focus)
```

---

### T005: Button hover & press effects [P] [MICRO]

**File**: `styles/main.css`
**Location**: Update existing `.btn` styles (lines 256-308)
**Estimated Time**: 10 minutes
**Priority**: P1 (High visual impact)
**Parallelizable**: Yes (can run with T006, T007)

**Instructions**:
1. Open `styles/main.css`
2. Find `.btn` class (line 256)
3. Update transition property
4. Find `.btn--primary:hover` (line 288)
5. Replace with enhanced hover effect
6. Add button press feedback after hover styles
7. Update secondary button hover

**Code Changes**:

**A. Update base transition** (line 263):
```css
.btn {
  /* ... existing properties ... */
  transition: all var(--duration-normal) var(--ease-smooth);
}
```

**B. Replace primary button hover** (around line 288):
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

  .btn--secondary:hover {
    border-color: var(--color-zinc-500);
    background: rgba(113, 113, 122, 0.1);
    transform: translateY(-1px);
  }
}
```

**C. Add press feedback** (after hover styles):
```css
/* Button press feedback (all devices) */
.btn:active {
  transform: scale(0.98) !important;
  transition: transform var(--duration-instant) var(--ease-sharp);
}
```

**Success Criteria**:
- Desktop: Hover primary CTA → button lifts 2px, icon bounces
- Desktop: Hover secondary CTA → border brightens
- All devices: Click button → subtle press down (scale 0.98)
- Mobile: No hover effect, only press feedback

**Testing**:
```bash
# Desktop (1024px+):
# Hover "Começar agora" button → lifts up, icon shifts
# Hover "Preciso de ajuda" button → border brightens

# Mobile (< 768px):
# Tap any button → scales down slightly (press feedback)
```

---

### T006: Feature pill hover effects [P] [MICRO]

**File**: `styles/main.css`
**Location**: Update `.feature-pill` styles (lines 175-217)
**Estimated Time**: 10 minutes
**Priority**: P1 (High visual impact)
**Parallelizable**: Yes (can run with T005, T007)

**Instructions**:
1. Open `styles/main.css`
2. Find `.feature-pill` class (line 175)
3. Add transition property
4. Add desktop hover effect after existing pill styles
5. Add mobile touch feedback

**Code Changes**:

**A. Update base pill** (line 175):
```css
.feature-pill {
  /* ... existing properties ... */
  transition: border-color var(--duration-normal) var(--ease-smooth),
              box-shadow var(--duration-normal) var(--ease-smooth),
              transform var(--duration-normal) var(--ease-smooth);
}
```

**B. Add desktop hover** (after `.feature-pill__icon img` ~line 217):
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

**C. Add mobile touch feedback** (after desktop hover):
```css
/* Mobile: Touch feedback only */
@media (max-width: 768px) {
  .feature-pill:active {
    transform: scale(0.98);
    border-color: var(--color-primary);
  }
}
```

**Success Criteria**:
- Desktop: Hover pill → green glow, lifts 2px, scales to 1.02
- Desktop: Icon scales to 1.1 on hover
- Mobile: Tap pill → scales to 0.98, border turns green
- Transition smooth (300ms duration)

**Testing**:
```bash
# Desktop:
# Hover "Texto" pill → green glow appears, pill lifts
# Verify smooth 300ms transition

# Mobile:
# Tap "Imagem" pill → scales down, border flashes green
```

---

### T007: Logo accent pulse [P] [MICRO]

**File**: `styles/main.css`
**Location**: After `.header__logo-accent` (line 63)
**Estimated Time**: 5 minutes
**Priority**: P2 (Optional polish)
**Parallelizable**: Yes (can run with T005, T006)

**Instructions**:
1. Open `styles/main.css`
2. Find `.header__logo-accent` class (line 61)
3. Add keyframes definition above the class
4. Add animation to `.header__logo-accent`
5. Add hover effect for logo

**Code Changes**:

**A. Add keyframes** (before `.header__logo-accent` ~line 60):
```css
/* Subtle ambient animation */
@keyframes logo-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

**B. Update accent** (line 61):
```css
.header__logo-accent {
  color: var(--color-primary);
  animation: logo-pulse var(--duration-ambient) ease-in-out infinite;
}
```

**C. Add logo hover** (after `.header__logo-accent`):
```css
/* Logo hover effect (desktop) */
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

**Success Criteria**:
- Logo underscore pulses from opacity 1 → 0.6 → 1 over 3 seconds
- Animation loops infinitely
- Hover logo → pulse pauses, logo tilts -2 degrees
- Effect is subtle and not distracting

**Testing**:
```bash
# Watch "webdev_" logo
# Green underscore should fade to 60% and back over 3 seconds
# Hover logo → pulse stops, logo tilts slightly left
```

---

### T008: Create animations.js [SCROLL]

**File**: `scripts/animations.js` (NEW FILE)
**Estimated Time**: 15 minutes
**Priority**: P1 (Core feature)

**Instructions**:
1. Create new file: `scripts/animations.js`
2. Copy full implementation below

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

**Success Criteria**:
- File created at correct path: `scripts/animations.js`
- No syntax errors (check with `node -c scripts/animations.js` if Node installed)
- IntersectionObserver check prevents errors in unsupported browsers
- Graceful fallback shows all content if API unavailable

**Testing** (after T010 complete):
```bash
# Open browser console
# Type: window.IntersectionObserver
# Should show: function IntersectionObserver() { [native code] }
# No console errors
```

---

### T009: Add scroll reveal CSS [SCROLL]

**File**: `styles/main.css`
**Location**: End of file, before responsive media queries (around line 333)
**Estimated Time**: 10 minutes
**Priority**: P1 (Core feature)
**Dependencies**: T002 (animation tokens)

**Instructions**:
1. Open `styles/main.css`
2. Find existing responsive media queries section (~line 333)
3. Add scroll reveal styles BEFORE the first `@media` query

**Code to Add**:
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

**Success Criteria**:
- `[data-animate]` elements start with `opacity: 0` and `translateY(30px)`
- `.animate-visible` class triggers smooth transition to `opacity: 1`, `translateY(0)`
- Stagger delays apply correctly (100ms increments)
- Transition duration is 600ms (`--duration-slow`)

**Testing** (manual via DevTools):
```javascript
// Open browser console
const el = document.querySelector('[data-animate]');
console.log(getComputedStyle(el).opacity); // Should be "0"
el.classList.add('animate-visible');
// Element should fade up over 600ms
```

---

### T010: Add data-animate attributes [SCROLL]

**File**: `index.html`
**Locations**: Multiple elements throughout file
**Estimated Time**: 10 minutes
**Priority**: P1 (Core feature)
**Dependencies**: T008 (animations.js), T009 (scroll CSS)

**Instructions**:
1. Open `index.html`
2. Add `data-animate` attribute to specified elements
3. Add `data-animate-delay` for stagger effects
4. Link animations.js script before `</body>`

**HTML Changes**:

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
  <!-- ... existing content ... -->
</div>

<!-- Imagem -->
<div class="feature-pill" data-node-id="2019:47" data-animate data-animate-delay="2">
  <!-- ... existing content ... -->
</div>

<!-- Documento -->
<div class="feature-pill" data-node-id="2019:49" data-animate data-animate-delay="3">
  <!-- ... existing content ... -->
</div>
```

**D. CTA section** (line 99):
```html
<section class="cta-section" data-node-id="2014:192" data-animate>
  <!-- ... existing content ... -->
</section>
```

**E. Link script** (before `</body>` at end of file):
```html
  <!-- Animation Script -->
  <script src="scripts/animations.js"></script>
</body>
</html>
```

**Success Criteria**:
- 7 elements have `data-animate` attribute
- 3 pills have `data-animate-delay="1|2|3"` attributes
- Script tag links to `scripts/animations.js`
- Page loads without errors

**Testing**:
```bash
# Open index.html in browser
# Initial load: Hero title should be invisible
# Scroll down slowly:
#   - Hero subtitle fades up
#   - Hero title fades up
#   - Pills animate in sequence: Texto (wait 100ms) → Imagem (wait 100ms) → Documento
#   - CTA section fades up at bottom
```

---

## Implementation Strategy

### Recommended Execution Order

**Day 1 - Foundation** (20 min):
1. Execute Phase 1: Setup (T001)
2. Execute Phase 2: Foundation (T002-T004)
3. **Checkpoint**: Verify animation tokens accessible, reduced motion works

**Day 1 - Visual Effects** (25 min):
4. Execute Phase 3: Microinteractions (T005-T007) in parallel
5. **Checkpoint**: Test hover effects on desktop, press feedback on mobile

**Day 1 - Scroll Reveals** (35 min):
6. Execute Phase 4: Scroll Reveals (T008-T010) sequentially
7. **Checkpoint**: Verify scroll animations trigger correctly

**Day 2 - Validation** (25 min):
8. Execute Phase 5: Testing (T011-T014)
9. **Checkpoint**: All tests pass, 60 FPS confirmed

**Total Time**: ~105 minutes (includes checkpoints)

---

### Parallel Execution Strategy

**Opportunity 1**: After T002 complete
```bash
# Run in parallel (5 tasks):
T003 - Developer A: Reduced motion
T004 - Developer A: Focus-visible
T005 - Developer B: Button hover
T006 - Developer B: Pill hover
T007 - Developer B: Logo pulse

# Wait for all to complete before proceeding
```

**Opportunity 2**: After T010 complete
```bash
# Run in parallel (4 tasks):
T011 - Tester A: Responsive
T012 - Tester A: Accessibility
T013 - Tester B: Performance
T014 - Tester B: Cross-browser

# Merge test reports
```

---

## Success Criteria

### MVP Definition (Minimum Viable Product)

**Must Have** (Required for MVP):
- ✅ Animation tokens defined (T002)
- ✅ Reduced motion compliance (T003)
- ✅ Button hover effects (T005)
- ✅ Scroll reveals (T008-T010)
- ✅ Responsive testing (T011)
- ✅ Accessibility testing (T012)

**Nice to Have** (Post-MVP):
- ⭐ Focus-visible styles (T004) - enhances accessibility
- ⭐ Feature pill hover (T006) - visual polish
- ⭐ Logo accent pulse (T007) - branding delight
- ⭐ Performance validation (T013) - optimization
- ⭐ Cross-browser testing (T014) - compatibility

**MVP Scope**: Tasks T001, T002, T003, T005, T008-T012 (9 tasks, ~70 min)

---

## Quick Reference: Animation Tokens

```css
/* Durations */
--duration-instant: 100ms;   /* T005: Button press */
--duration-fast: 200ms;      /* T005, T006: Hover micro-transitions */
--duration-normal: 300ms;    /* T005, T006, T007: Standard hover */
--duration-slow: 600ms;      /* T009: Scroll reveals */
--duration-ambient: 3s;      /* T007: Logo pulse */

/* Easing */
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);    /* T005, T006, T009: Deceleration */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* T005, T006, T007: Overshoot */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);       /* T005: Button press */
```

---

**Document Version**: 1.0
**Created**: 2025-10-27
**Status**: Ready to Execute
**Next Step**: Begin with T001 (Create scripts directory)

---

**End of Tasks Document**
