# Animation API Contract

**Version**: 1.0
**Created**: 2025-10-27
**Type**: JavaScript + CSS API
**Status**: Draft

## Overview

This document defines the API contracts for the animation system, including JavaScript initialization, CSS token API, and HTML attribute API.

---

## 1. JavaScript API

### 1.1 Initialization Function

**Module**: `scripts/animations.js`
**Function**: `animateOnScroll()`

```typescript
/**
 * Initializes Intersection Observer for scroll-triggered animations
 * @returns {void}
 * @side-effects Adds 'animate-visible' class to elements as they enter viewport
 */
function animateOnScroll(): void;
```

**Behavior**:
1. Queries all elements with `[data-animate]` attribute
2. Creates IntersectionObserver with config:
   - `threshold: 0.1` (10% visibility)
   - `rootMargin: '0px 0px -50px 0px'` (trigger 50px before)
3. Observes each element
4. On intersection, adds class `animate-visible` to element
5. Unobserves element after animation (one-time trigger)

**Preconditions**:
- DOM must be loaded (DOMContentLoaded or later)
- Elements with `[data-animate]` must exist in DOM

**Postconditions**:
- All `[data-animate]` elements are observed
- Elements animate when scrolled into view
- Observer is automatically disconnected after all elements animate

**Error Handling**:
- If IntersectionObserver not supported: silently fail (graceful degradation)
- If no `[data-animate]` elements found: no-op (no error)

**Example Usage**:
```javascript
// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll(); // DOM already loaded
}
```

---

### 1.2 Observer Configuration Object

**Interface**: `IntersectionObserverInit`

```typescript
interface ObserverConfig {
  threshold: number;      // 0.1 (trigger at 10% visibility)
  rootMargin: string;     // '0px 0px -50px 0px' (bottom margin)
  root: null;             // Use viewport as root
}

const OBSERVER_CONFIG: ObserverConfig = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  root: null
};
```

**Configuration Constraints**:
- `threshold`: Must be between 0.0 and 1.0
- `rootMargin`: Must be valid CSS margin format (top right bottom left)
- `root`: Must be null (viewport) or valid Element

---

### 1.3 Callback Function

**Function**: Observer callback (internal)

```typescript
/**
 * Intersection Observer callback
 * @param entries - Array of IntersectionObserverEntry
 * @param observer - IntersectionObserver instance
 * @returns {void}
 */
function handleIntersection(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
): void {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      observer.unobserve(entry.target);
    }
  });
}
```

**Logic**:
1. Iterate through entries array
2. Check if `entry.isIntersecting === true`
3. If true, add class `animate-visible` to `entry.target`
4. Unobserve target (prevent re-triggering)

---

## 2. HTML Attribute API

### 2.1 `data-animate` Attribute

**Type**: Boolean attribute (presence indicates opt-in)
**Purpose**: Marks element for scroll-triggered animation

**Usage**:
```html
<div data-animate>This element will animate on scroll</div>
```

**Behavior**:
- Element starts with `opacity: 0` and `transform: translateY(30px)` (hidden)
- When scrolled into view, class `animate-visible` is added
- CSS transition animates to `opacity: 1` and `transform: translateY(0)` (visible)

**Constraints**:
- Attribute has no value (boolean attribute)
- Can be applied to any HTML element
- Element must be in DOM when `animateOnScroll()` runs

**CSS Requirements**:
- Element must have CSS rule: `[data-animate] { opacity: 0; transform: translateY(30px); }`
- Element must have CSS rule: `[data-animate].animate-visible { opacity: 1; transform: translateY(0); }`

---

### 2.2 `data-animate-delay` Attribute

**Type**: String attribute (enumerated values)
**Purpose**: Adds stagger delay to animation for sequential reveals

**Valid Values**: "1" | "2" | "3" | "4" | "5"

**Usage**:
```html
<div data-animate data-animate-delay="1">First</div>
<div data-animate data-animate-delay="2">Second</div>
<div data-animate data-animate-delay="3">Third</div>
```

**Behavior**:
- Delays CSS transition by `N * 100ms` where N is the attribute value
- Delay is applied via `transition-delay` CSS property
- Requires `data-animate` attribute to be present

**Mapping**:
- `"1"` → 100ms delay (`transition-delay: 0.1s`)
- `"2"` → 200ms delay (`transition-delay: 0.2s`)
- `"3"` → 300ms delay (`transition-delay: 0.3s`)
- `"4"` → 400ms delay (`transition-delay: 0.4s`)
- `"5"` → 500ms delay (`transition-delay: 0.5s`)

**Constraints**:
- Must be used with `data-animate` attribute
- Values outside "1"-"5" are invalid (no effect)
- Delay is additive to animation duration (does not extend total time)

**CSS Requirements**:
```css
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
[data-animate-delay="4"] { transition-delay: 0.4s; }
[data-animate-delay="5"] { transition-delay: 0.5s; }
```

---

### 2.3 Future Extension: `data-animate-type`

**Status**: Not implemented in v1, reserved for future use

**Potential Values**: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right"

**Placeholder Usage**:
```html
<!-- v2.0+ -->
<div data-animate data-animate-type="scale">Scales in</div>
<div data-animate data-animate-type="slide-left">Slides from right</div>
```

---

## 3. CSS Token API

### 3.1 Animation Duration Variables

**Location**: `styles/variables.css`
**Type**: CSS Custom Properties

```css
:root {
  /* Animation Durations */
  --duration-instant: 100ms;   /* Button press feedback */
  --duration-fast: 200ms;      /* Quick hover transitions */
  --duration-normal: 300ms;    /* Standard state changes */
  --duration-slow: 600ms;      /* Content reveals, scroll animations */
  --duration-ambient: 3s;      /* Ambient loops (pulse) */
}
```

**Usage in CSS**:
```css
.btn {
  transition: transform var(--duration-normal) var(--ease-smooth);
}

[data-animate] {
  transition: opacity var(--duration-slow) var(--ease-smooth),
              transform var(--duration-slow) var(--ease-smooth);
}
```

**Contract**:
- All duration variables MUST be valid CSS time values (ms or s)
- Values MUST be positive (no negative durations)
- Variables MUST be defined before use in other CSS files

---

### 3.2 Animation Easing Variables

**Location**: `styles/variables.css`
**Type**: CSS Custom Properties (cubic-bezier)

```css
:root {
  /* Animation Easing Functions */
  --ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);    /* Natural deceleration */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Springy overshoot */
  --ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);       /* Material sharp */
}
```

**Usage in CSS**:
```css
.btn:hover {
  transition: transform 0.3s var(--ease-bounce);
}

.feature-pill:hover {
  transition: all 0.3s var(--ease-smooth);
}
```

**Contract**:
- All easing variables MUST be valid CSS timing functions
- Format: `cubic-bezier(x1, y1, x2, y2)` where 0 ≤ x ≤ 1
- Y values CAN exceed 0-1 for bounce effects (valid per CSS spec)

---

## 4. CSS Class API

### 4.1 `.animate-visible` Class

**Purpose**: Indicates element has been animated (visible state)
**Applied By**: JavaScript (Intersection Observer callback)
**Type**: State class

**Contract**:
```css
/* Initial state (hidden) */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-smooth),
              transform var(--duration-slow) var(--ease-smooth);
}

/* Visible state (animated) */
[data-animate].animate-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Behavior**:
- Class is added once when element enters viewport
- Class is never removed (animation is permanent)
- CSS transition automatically animates between states

**Constraints**:
- Class name MUST be `.animate-visible` (hardcoded in JS)
- Class MUST be applied to same element with `[data-animate]`
- Class has no effect without `[data-animate]` styles

---

## 5. Hover State API

### 5.1 CSS Pseudo-classes

**Type**: Native CSS pseudo-classes
**Purpose**: Interactive state management

```css
/* Idle state */
.btn {
  transform: scale(1);
  transition: transform var(--duration-normal) var(--ease-smooth);
}

/* Hover state (desktop only) */
@media (hover: hover) {
  .btn:hover {
    transform: translateY(-2px) scale(1.02);
  }
}

/* Active state (click/touch) */
.btn:active {
  transform: scale(0.98);
  transition: transform var(--duration-instant) var(--ease-sharp);
}

/* Focus state (keyboard navigation) */
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
```

**State Precedence** (CSS specificity order):
1. Base state (`.btn`)
2. `:hover` (if `@media (hover: hover)` matches)
3. `:focus-visible` (keyboard Tab focus)
4. `:active` (highest priority, click/touch)

**Contract**:
- `:hover` MUST be wrapped in `@media (hover: hover)` (touch device protection)
- `:active` MUST override :hover (for proper press feedback)
- `:focus-visible` MUST be used instead of `:focus` (avoid mouse focus ring)

---

## 6. Accessibility API

### 6.1 Reduced Motion Media Query

**Type**: CSS Media Query
**Purpose**: Disable animations for users with motion sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  /* Global animation disable */
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

**Contract**:
- MUST be implemented globally (affects all elements)
- MUST override all custom durations with `!important`
- MUST ensure `[data-animate]` elements are visible (no hidden content)
- MUST disable smooth scroll behavior

**Behavior**:
- When user enables "Reduce Motion" in OS settings
- All animations become instant (0.01ms, effectively 0)
- Scroll reveals become immediate (content always visible)
- Hover effects become instant state changes (no transition)

---

### 6.2 Focus Visible API

**Type**: CSS Pseudo-class (`:focus-visible`)
**Purpose**: Show focus ring only for keyboard navigation

```css
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

/* Do NOT use :focus */
.btn:focus {
  /* ❌ Avoid this - shows ring on mouse click */
}
```

**Contract**:
- MUST use `:focus-visible` instead of `:focus`
- Outline MUST have sufficient contrast (WCAG AA: 3:1 minimum)
- Outline MUST be visible during animation (no `outline: none`)

---

## 7. Performance Contract

### 7.1 GPU-Accelerated Properties

**Required**: All animations MUST use GPU-accelerated properties

**Allowed Properties**:
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ✅ `filter` (use sparingly)

**Prohibited Properties**:
- ❌ `width`, `height` (triggers layout reflow)
- ❌ `margin`, `padding` (triggers layout reflow)
- ❌ `top`, `left`, `right`, `bottom` (use `transform` instead)

**Rationale**: GPU properties ensure 60 FPS performance on all devices

---

### 7.2 Animation Budget

**Maximum Concurrent Animations**: 10 elements simultaneously
**Target Frame Rate**: 60 FPS (16.67ms per frame)
**Maximum JavaScript Size**: 5KB (minified)
**Maximum CSS Size**: 3KB (animation rules only)

**Validation**:
- Use Chrome DevTools Performance tab
- Monitor "Rendering" → "Frame Rendering Stats"
- If FPS drops below 55, reduce complexity or stagger animations

---

## 8. Error Handling

### 8.1 Missing IntersectionObserver Support

**Fallback**: Graceful degradation

```javascript
if ('IntersectionObserver' in window) {
  // Initialize animations
  animateOnScroll();
} else {
  // Fallback: show all content immediately
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('animate-visible');
  });
}
```

**Contract**:
- If IntersectionObserver not supported, all `[data-animate]` elements MUST be immediately visible
- No error thrown (silent fallback)

---

### 8.2 Missing CSS Variables

**Expected Behavior**: Fallback to default values

```css
/* Safe fallback */
.btn {
  transition: transform 300ms ease-out; /* Fallback if --duration-normal undefined */
  transition: transform var(--duration-normal, 300ms) var(--ease-smooth, ease-out);
}
```

**Contract**:
- All CSS variable uses MUST have fallback values
- Fallbacks MUST be reasonable defaults (not 0 or absurd values)

---

## 9. Testing Contract

### 9.1 Manual Testing Requirements

**Required Tests**:
1. Scroll reveal triggers at correct threshold (10% visibility)
2. Staggered animations have correct delays (100ms increments)
3. Hover effects work on desktop only
4. Touch feedback (`:active`) works on mobile
5. Reduced motion disables all animations
6. Keyboard focus visible on Tab navigation
7. 60 FPS maintained during animations

**Test Environments**:
- Chrome (latest) - primary
- Firefox (latest) - secondary
- Safari (latest) - if available

**Test Devices**:
- Desktop (1440px+)
- Tablet (768px-1024px)
- Mobile (320px-480px)

---

### 9.2 Performance Testing

**Tools**:
- Chrome DevTools Performance tab
- Lighthouse Performance score
- Frame Rendering Stats

**Pass Criteria**:
- All animations run at 60 FPS
- No layout thrashing (check "Rendering" warnings)
- Total JavaScript < 5KB
- Total CSS < 3KB
- Lighthouse Performance score ≥ 90

---

## 10. Versioning

**Version**: 1.0
**Breaking Changes**: N/A (initial version)

**Future v2.0 May Include**:
- `data-animate-type` attribute (custom animation types)
- Configurable Intersection Observer thresholds
- Animation event callbacks (onAnimationStart, onAnimationEnd)

**Backward Compatibility**:
- v1.0 HTML attributes will remain supported in v2.0+
- New features will be opt-in (default behavior unchanged)

---

## Summary

This API contract defines:

1. ✅ **JavaScript API**: `animateOnScroll()` initialization function
2. ✅ **HTML API**: `data-animate`, `data-animate-delay` attributes
3. ✅ **CSS Token API**: Duration and easing variables
4. ✅ **CSS Class API**: `.animate-visible` state class
5. ✅ **Hover State API**: Pseudo-class usage patterns
6. ✅ **Accessibility API**: Reduced motion, focus-visible
7. ✅ **Performance Contract**: GPU properties, budget limits
8. ✅ **Error Handling**: Graceful degradation, fallbacks
9. ✅ **Testing Contract**: Manual and performance testing requirements

**Status**: Ready for implementation (Phase 2)

---

**Document Version**: 1.0
**Created**: 2025-10-27
**Next**: Write implementation plan in plan.md
