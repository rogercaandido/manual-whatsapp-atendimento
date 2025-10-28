# Data Model: Animation Configuration

**Feature**: Modern Effects and Microinteractions
**Created**: 2025-10-27
**Status**: Draft

## Overview

This document defines the data structures and configuration models for animation effects on the landing page. Since animations are CSS/JavaScript-based with no server-side data storage, this model focuses on configuration patterns and CSS token schemas.

---

## 1. Animation Tokens Schema

### 1.1 Duration Tokens

**Entity**: Animation Duration Constants
**Type**: CSS Custom Properties
**Location**: `styles/variables.css`

```typescript
// TypeScript representation for documentation
interface AnimationDurations {
  '--duration-instant': '100ms';    // Button press, instant feedback
  '--duration-fast': '200ms';        // Quick hover transitions
  '--duration-normal': '300ms';      // Standard state changes
  '--duration-slow': '600ms';        // Content reveals, scroll animations
  '--duration-ambient': '3s';        // Ambient loops (pulse effects)
}
```

**Usage Rules**:
- Instant (100ms): Button `:active` states only
- Fast (200ms): Hover micro-transitions
- Normal (300ms): Default hover effects, state changes
- Slow (600ms): Scroll reveals, content entrances
- Ambient (3s): Looping animations (subtle, non-intrusive)

**Validation**:
- All values must end in 'ms' or 's'
- Must be valid CSS time units
- No negative durations

---

### 1.2 Easing Function Tokens

**Entity**: Animation Timing Functions
**Type**: CSS Custom Properties (cubic-bezier)
**Location**: `styles/variables.css`

```typescript
interface AnimationEasing {
  '--ease-smooth': 'cubic-bezier(0.33, 1, 0.68, 1)';    // Smooth acceleration
  '--ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bouncy overshoot
  '--ease-sharp': 'cubic-bezier(0.4, 0, 0.2, 1)';       // Material Design sharp
}
```

**Application Matrix**:
| Easing | Use Case | Effect |
|--------|----------|--------|
| `--ease-smooth` | Scroll reveals, fade-ins | Natural deceleration |
| `--ease-bounce` | Micro-interactions, playful effects | Springy overshoot |
| `--ease-sharp` | Quick feedback, button press | Snappy response |

**Constraints**:
- All values must be valid cubic-bezier functions
- Format: `cubic-bezier(x1, y1, x2, y2)` where 0 ≤ x ≤ 1
- Y values can exceed 0-1 range for bounce effects

---

## 2. Animation State Model

### 2.1 Scroll Reveal State Machine

**Entity**: Element Animation State
**Type**: DOM Class-based State
**Location**: `index.html` (data attributes) + `scripts/animations.js` (state management)

```typescript
enum AnimationState {
  PENDING = 'pending',      // Initial state, not yet visible
  ANIMATING = 'animating',  // Animation in progress (optional intermediate state)
  VISIBLE = 'visible'       // Animation complete, element fully visible
}

interface AnimatableElement {
  element: HTMLElement;
  state: AnimationState;
  delay?: number;           // Stagger delay in ms (0, 100, 200, 300)
  animationType?: 'fade-up' | 'fade-in' | 'scale'; // Default: 'fade-up'
}
```

**State Transitions**:
```
PENDING --[enters viewport]--> VISIBLE
(no transition back, one-time animation)
```

**HTML Attribute API**:
```html
<!-- Basic reveal -->
<div data-animate>Content</div>

<!-- Reveal with delay (stagger) -->
<div data-animate data-animate-delay="1">First</div>
<div data-animate data-animate-delay="2">Second</div>
<div data-animate data-animate-delay="3">Third</div>

<!-- Custom animation type (future extension) -->
<div data-animate data-animate-type="scale">Scales in</div>
```

**Attribute Schema**:
- `data-animate`: Boolean presence attribute (no value)
- `data-animate-delay`: String enum: "1" | "2" | "3" | "4" | "5"
- `data-animate-type`: String enum: "fade-up" | "fade-in" | "scale" (future)

**Validation Rules**:
- `data-animate` must be present for element to be observed
- `data-animate-delay` only effective if `data-animate` present
- Delay values map to 100ms increments (1=100ms, 2=200ms, etc.)

---

### 2.2 Hover State Model

**Entity**: Interactive Element Hover State
**Type**: CSS Pseudo-class (`:hover`, `:active`, `:focus-visible`)
**Location**: `styles/main.css`

```typescript
interface HoverState {
  idle: CSSProperties;           // Default state
  hover: CSSProperties;          // Mouse over (desktop only)
  active: CSSProperties;         // Click/touch pressed
  focusVisible: CSSProperties;   // Keyboard focus
}

interface CSSProperties {
  transform?: string;    // translateY, scale, rotate
  opacity?: number;      // 0 to 1
  borderColor?: string;  // CSS color
  boxShadow?: string;    // Box shadow definition
  backgroundColor?: string;
}
```

**State Priority** (CSS cascade order):
1. `:idle` (base state)
2. `:hover` (applies on desktop hover)
3. `:focus-visible` (applies on keyboard Tab focus)
4. `:active` (applies on click/touch, highest priority)

**Example State Definition** (Button):
```css
/* Idle state */
.btn {
  transform: scale(1);
  box-shadow: none;
}

/* Hover state (desktop) */
@media (hover: hover) {
  .btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

/* Active state (all devices) */
.btn:active {
  transform: scale(0.98);
}

/* Focus state (keyboard navigation) */
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
```

---

## 3. Animation Configuration Objects

### 3.1 Intersection Observer Config

**Entity**: Scroll Observation Configuration
**Type**: JavaScript Object (IntersectionObserverInit)
**Location**: `scripts/animations.js`

```typescript
interface IntersectionObserverConfig {
  threshold: number | number[];  // Visibility percentage to trigger
  rootMargin: string;            // Margin around root (viewport)
  root?: Element | null;         // Scroll container (null = viewport)
}

const DEFAULT_OBSERVER_CONFIG: IntersectionObserverConfig = {
  threshold: 0.1,                      // Trigger at 10% visibility
  rootMargin: '0px 0px -50px 0px',     // Trigger 50px before element enters
  root: null                           // Use viewport as root
};
```

**Configuration Rationale**:
- `threshold: 0.1`: Animations start when 10% of element is visible (early trigger for smooth entrance)
- `rootMargin: '0px 0px -50px 0px'`: Negative bottom margin delays trigger slightly (prevents premature animation)
- `root: null`: Observe relative to viewport (standard for landing pages)

**Alternative Configs** (future customization):
```typescript
// Aggressive reveal (animates immediately)
const EARLY_REVEAL_CONFIG = {
  threshold: 0,
  rootMargin: '100px',
};

// Conservative reveal (waits until mostly visible)
const LATE_REVEAL_CONFIG = {
  threshold: 0.5,
  rootMargin: '0px',
};
```

---

### 3.2 Component Animation Mappings

**Entity**: Component-to-Animation Map
**Type**: Configuration Object
**Location**: Documented in `research.md`, implemented in CSS classes

```typescript
interface ComponentAnimation {
  selector: string;           // CSS selector
  effects: EffectDefinition[];
  priority: 'P0' | 'P1' | 'P2';
  implementation: 'CSS' | 'JS' | 'CSS+JS';
}

interface EffectDefinition {
  name: string;
  trigger: 'hover' | 'active' | 'scroll' | 'ambient';
  properties: CSSProperties;
  duration: string;  // Reference to --duration-* variable
  easing: string;    // Reference to --ease-* variable
}

const ANIMATION_MAP: ComponentAnimation[] = [
  {
    selector: '.btn--primary',
    effects: [
      {
        name: 'hover-lift',
        trigger: 'hover',
        properties: { transform: 'translateY(-2px) scale(1.02)' },
        duration: '--duration-normal',
        easing: '--ease-smooth'
      },
      {
        name: 'press-feedback',
        trigger: 'active',
        properties: { transform: 'scale(0.98)' },
        duration: '--duration-instant',
        easing: '--ease-sharp'
      }
    ],
    priority: 'P0',
    implementation: 'CSS'
  },
  {
    selector: '.feature-pill',
    effects: [
      {
        name: 'glow-on-hover',
        trigger: 'hover',
        properties: {
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 20px rgba(116, 210, 0, 0.3)',
          transform: 'translateY(-2px) scale(1.02)'
        },
        duration: '--duration-normal',
        easing: '--ease-smooth'
      },
      {
        name: 'scroll-reveal',
        trigger: 'scroll',
        properties: { opacity: '1', transform: 'translateY(0)' },
        duration: '--duration-slow',
        easing: '--ease-smooth'
      }
    ],
    priority: 'P0',
    implementation: 'CSS+JS'
  },
  {
    selector: '.header__logo-accent',
    effects: [
      {
        name: 'pulse',
        trigger: 'ambient',
        properties: { opacity: '0.6' },  // Keyframe: 0%=1, 50%=0.6, 100%=1
        duration: '--duration-ambient',
        easing: 'ease-in-out'
      }
    ],
    priority: 'P2',
    implementation: 'CSS'
  }
];
```

---

## 4. Data Flow

### 4.1 Scroll Reveal Flow

```
[Page Load]
    ↓
[DOM Ready] → Initialize IntersectionObserver
    ↓
[Query elements with [data-animate]]
    ↓
[Observe each element]
    ↓
[Wait for scroll...]
    ↓
[Element enters viewport] → IntersectionObserver callback fires
    ↓
[Check entry.isIntersecting === true]
    ↓
[Add class 'animate-visible' to element]
    ↓
[CSS transition executes] → Element fades up from opacity:0, translateY(30px) to opacity:1, translateY(0)
    ↓
[Unobserve element] → (one-time animation)
    ↓
[Animation complete]
```

### 4.2 Hover Effect Flow

```
[User hovers over element] (Desktop only)
    ↓
[:hover pseudo-class activates]
    ↓
[CSS transition begins]
    ↓
[Properties animate over --duration-normal (300ms)]
    ↓
[Hover state fully applied]
    ↓
[User moves cursor away]
    ↓
[:hover deactivates]
    ↓
[CSS transition reverses]
    ↓
[Element returns to idle state]
```

---

## 5. Accessibility Data Model

### 5.1 Reduced Motion Override

**Entity**: Motion Preference State
**Type**: CSS Media Query (user system preference)
**Location**: `styles/main.css` (global override)

```typescript
interface MotionPreference {
  prefersReducedMotion: boolean;  // User OS setting
}

// CSS implementation
@media (prefers-reduced-motion: reduce) {
  // All animations disabled or reduced to instant transitions
}
```

**Override Rules**:
- When `prefers-reduced-motion: reduce` is active:
  - All `animation-duration` → 0.01ms
  - All `transition-duration` → 0.01ms
  - All `[data-animate]` elements → `opacity: 1 !important`, `transform: none !important`
  - Scroll reveals become instant (content always visible)
  - Hover effects become instant state changes (no animation)

### 5.2 Focus State Model

**Entity**: Keyboard Navigation Focus State
**Type**: CSS Pseudo-class (`:focus-visible`)

```typescript
interface FocusState {
  hasFocus: boolean;
  isKeyboardFocus: boolean;  // true if Tab key used, false if clicked
}

// Only show focus ring for keyboard navigation
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
```

---

## 6. Performance Constraints

### 6.1 Animation Budget

**Entity**: Performance Limits
**Type**: Configuration Constants

```typescript
interface PerformanceBudget {
  maxConcurrentAnimations: number;    // 10 (avoid overload)
  targetFPS: number;                  // 60 FPS
  maxFrameTime: number;               // 16.67ms per frame
  maxTotalJSSize: number;             // 5KB (animations.js)
  maxTotalCSSSize: number;            // 3KB (animation rules)
}

const PERFORMANCE_LIMITS: PerformanceBudget = {
  maxConcurrentAnimations: 10,   // Stagger reveals to stay under this
  targetFPS: 60,
  maxFrameTime: 16.67,            // 1000ms / 60fps
  maxTotalJSSize: 5 * 1024,       // 5KB bytes
  maxTotalCSSSize: 3 * 1024       // 3KB bytes
};
```

**Validation**:
- Monitor Chrome DevTools Performance tab during animation
- If FPS drops below 60, reduce concurrent animations or simplify effects
- Use GPU-accelerated properties only (transform, opacity)

---

## 7. Validation Rules

### 7.1 CSS Token Validation

**Required Tokens** (must exist in `variables.css`):
```css
/* Durations */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-ambient: 3s;

/* Easing */
--ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);
```

**Validation Rules**:
- All duration variables must parse as valid CSS time values
- All easing variables must parse as valid cubic-bezier or keyword values
- No undefined variable references in `main.css`

### 7.2 HTML Attribute Validation

**Valid Attribute Combinations**:
```html
<!-- ✅ Valid -->
<div data-animate></div>
<div data-animate data-animate-delay="1"></div>
<div data-animate data-animate-delay="3"></div>

<!-- ❌ Invalid -->
<div data-animate-delay="1"></div>  <!-- Missing data-animate -->
<div data-animate data-animate-delay="999"></div>  <!-- Invalid delay value -->
```

**Constraints**:
- `data-animate-delay` requires `data-animate` to be present
- `data-animate-delay` must be "1", "2", "3", "4", or "5" (string values)
- No other values allowed

---

## 8. Extension Points

### 8.1 Future Animation Types

Currently only `fade-up` is implemented. Future extensions could add:

```typescript
enum AnimationType {
  FADE_UP = 'fade-up',        // Current: opacity + translateY
  FADE_IN = 'fade-in',        // Future: opacity only
  SCALE = 'scale',            // Future: opacity + scale
  SLIDE_LEFT = 'slide-left',  // Future: translateX from right
  SLIDE_RIGHT = 'slide-right' // Future: translateX from left
}
```

**Implementation Pattern**:
```css
[data-animate-type="fade-in"] {
  opacity: 0;
  /* No transform */
}

[data-animate-type="scale"] {
  opacity: 0;
  transform: scale(0.9);
}

[data-animate-type="slide-left"] {
  opacity: 0;
  transform: translateX(30px);
}
```

### 8.2 Dynamic Animation Configuration

**Future Enhancement**: JavaScript API for runtime config

```typescript
// Potential future API
AnimationController.configure({
  scrollRevealThreshold: 0.2,
  staggerDelay: 150,
  disableOnMobile: true
});
```

**Status**: Not implemented in v1, designed for future extensibility

---

## 9. Data Integrity

### 9.1 No Server-Side Data

**Important**: This animation system has NO server-side data model. All configuration is:
- **Static**: Defined in CSS variables and HTML attributes
- **Client-side**: Executed entirely in browser
- **Stateless**: No persistence, resets on page reload

### 9.2 State Management

**Animation state is ephemeral**:
- Scroll reveal state stored in DOM classes (`.animate-visible`)
- Hover state managed by CSS pseudo-classes (`:hover`)
- No localStorage, no cookies, no server state

**Implication**: Refreshing page resets all animations (by design for landing page)

---

## Summary

This data model defines:
1. ✅ Animation token schemas (duration, easing)
2. ✅ State models (scroll reveal, hover, focus)
3. ✅ Configuration objects (Intersection Observer, component mappings)
4. ✅ Data flow patterns (scroll reveal, hover effect)
5. ✅ Accessibility models (reduced motion, focus)
6. ✅ Performance constraints (budget, limits)
7. ✅ Validation rules (tokens, attributes)
8. ✅ Extension points (future animation types)

**Status**: Ready for contract definition (Phase 1 continued)

---

**Document Version**: 1.0
**Created**: 2025-10-27
**Next**: Define API contracts in `contracts/` directory
