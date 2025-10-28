# Implementation Tasks: Mobile Header min-height Optimization

**Feature**: Mobile Header Height Refinement
**Branch**: master
**Status**: Ready for Execution
**Created**: 2025-10-28

---

## Overview

This document contains the actionable task list for implementing responsive `min-height` optimization for the mobile header. The solution uses CSS `max(680px, 100vh)` to ensure a minimum height of 680px while adapting to larger viewports.

**Implementation Strategy**: Sequential execution with testing validation at each critical stage.

**Estimated Total Time**: 28 minutes

---

## Task Summary

| Phase | Task Count | Estimated Time | Can Parallelize |
|-------|-----------|----------------|-----------------|
| Phase 1: Setup | 0 tasks | 0 min | N/A |
| Phase 2: Implementation | 2 tasks | 3 min | No (sequential) |
| Phase 3: Testing | 5 tasks | 25 min | Partially |
| **Total** | **7 tasks** | **28 min** | Mixed |

---

## Phase 1: Setup & Prerequisites

**Status**: ✅ Complete (No setup required)

**Rationale**: Project structure already exists. CSS files are in place. No dependencies to install.

---

## Phase 2: Implementation

### Goal
Update header CSS to use responsive `min-height` with CSS `max()` function and add inline documentation.

### Tasks

- [X] T001 Update header min-height from `auto` to `max(680px, 100vh)` in styles/main.css line 21
  - **File**: `styles/main.css`
  - **Location**: Line 21 (`.header` class)
  - **Change**: Replace `min-height: auto;` with `min-height: max(680px, 100vh);`
  - **Rationale**: Guarantees minimum 680px height while adapting to larger viewports
  - **Estimated Time**: 2 min

- [X] T002 Add explanatory inline comment for min-height behavior in styles/main.css line 21
  - **File**: `styles/main.css`
  - **Location**: Line 21 (above `min-height` property)
  - **Change**: Add multi-line comment explaining `max()` function behavior
  - **Comment Text**: `/* Mobile: Ensures minimum 680px height, but uses full viewport (100vh) if larger. Desktop overrides via media queries (700px tablet, 800px desktop). */`
  - **Rationale**: Code clarity for future developers
  - **Dependencies**: T001
  - **Estimated Time**: 1 min

### Success Criteria
- ✅ `min-height: max(680px, 100vh)` applied to `.header` class
- ✅ Inline documentation added and clear
- ✅ CSS syntax valid (no parse errors)

---

## Phase 3: Testing & Validation

### Goal
Validate responsive behavior across mobile, tablet, and desktop viewports. Ensure no visual regressions and cross-browser compatibility.

### Tasks

- [ ] T003 [P] Perform mobile visual regression testing in Chrome DevTools Responsive Mode
  - **Viewports to Test**:
    - 375×667 (iPhone SE): Verify min-height = 680px via computed styles
    - 390×844 (iPhone 12): Verify min-height = 844px (uses 100vh)
    - 430×932 (iPhone 14 Pro Max): Verify min-height = 932px (uses 100vh)
  - **Test Checklist**:
    - [ ] Header min-height computed values match expected
    - [ ] Hero title + features + CTAs visible without forced scroll
    - [ ] Content not cut off or squeezed
    - [ ] `justify-content: space-between` distributes space naturally
    - [ ] Small scroll acceptable on iPhone SE (13px overflow)
  - **Method**: DevTools → Responsive Mode → Inspect computed styles
  - **Dependencies**: T001, T002
  - **Estimated Time**: 10 min

- [ ] T004 [P] Perform desktop/tablet visual regression testing in Chrome DevTools
  - **Viewports to Test**:
    - 768×1024 (iPad): Verify min-height = 700px (media query override)
    - 1440×900 (Desktop): Verify min-height = 800px (media query override)
  - **Test Checklist**:
    - [ ] Tablet: min-height = 700px applied correctly (media query)
    - [ ] Desktop: min-height = 800px applied correctly
    - [ ] **CRITICAL**: Zero visual changes vs baseline on desktop
    - [ ] Gaps and spacing preserved (80px header gap desktop)
    - [ ] Hero vertically centered on desktop
  - **Method**: Side-by-side screenshot comparison (before/after)
  - **Dependencies**: T001, T002
  - **Estimated Time**: 5 min

- [ ] T005 [P] Validate cross-browser compatibility for CSS max() function
  - **Browsers to Test**:
    - Chrome (latest): Verify computed min-height values
    - Safari (macOS/iOS Simulator): Verify `max()` function works (Safari 11.1+ support)
    - Firefox (latest): Verify responsive mode behavior
    - Edge (Chromium): Verify same as Chrome
  - **Test Checklist**:
    - [ ] Chrome: Mobile 375×667 = 680px, Desktop 1440×900 = 800px
    - [ ] Safari iOS Simulator (iPhone SE): Layout correct
    - [ ] Firefox: Responsive mode 375×667 → min-height 680px
    - [ ] No console errors in any browser
  - **Method**: Local browsers + BrowserStack (if available)
  - **Dependencies**: T003, T004
  - **Estimated Time**: 5 min

- [ ] T006 [P] Validate accessibility compliance (no regressions)
  - **Checks**:
    - Touch Targets: Primary CTA ≥ 44px height (already implemented)
    - Touch Targets: Secondary CTA ≥ 44px height (already implemented)
    - Touch Targets: Gap between CTAs ≥ 8px (16px current)
    - Legibility: Font sizes maintained (48px hero title mobile)
    - Legibility: Contrast WCAG AA maintained
    - Keyboard Navigation: Tab order functional
    - Keyboard Navigation: Focus visible styles applied
  - **Method**: Visual inspection + Lighthouse audit (optional)
  - **Dependencies**: T005
  - **Estimated Time**: 3 min

- [ ] T007 [P] Perform performance check (no degradation)
  - **Validation**:
    - [ ] CSS `max()` function does not cause layout thrashing
    - [ ] Rendering smooth (no jank during resize)
    - [ ] Paint time not degraded
    - [ ] No new console warnings/errors
  - **Optional**: Lighthouse performance audit (baseline comparison)
  - **Method**: Chrome DevTools → Performance tab + visual inspection
  - **Dependencies**: T005
  - **Estimated Time**: 2 min

### Success Criteria
- ✅ Mobile viewports (375px-430px): min-height behaves as expected
- ✅ Desktop/Tablet: Zero visual regressions (screenshots match)
- ✅ Cross-browser: `max()` function works in Chrome, Safari, Firefox, Edge
- ✅ Accessibility: No regressions (touch targets, legibility, keyboard nav)
- ✅ Performance: No degradation (smooth rendering, no console errors)

---

## Dependencies & Execution Order

### Sequential Tasks (Must Complete in Order)
```
T001 (Update min-height)
  └─→ T002 (Add documentation)
       └─→ [Testing Phase: T003-T007 can run in parallel after T002]
```

### Parallel Execution Opportunities

**After T002 completes**, the following tasks can run in parallel:

- **Group A** (Visual Testing): T003, T004
- **Group B** (Browser/Validation): T005, T006, T007

**Parallelization Example**:
```bash
# Sequential implementation
Execute T001 → Execute T002

# Parallel testing (after T002)
Execute T003 (Mobile testing) || Execute T004 (Desktop testing) || Execute T005 (Cross-browser)
Execute T006 (Accessibility) || Execute T007 (Performance)
```

**Critical Path**: T001 → T002 → T003 → T004 (must pass before deployment)

---

## Testing Matrix

| Viewport | Expected min-height | Actual | Scroll Required | Status |
|----------|-------------------|--------|-----------------|--------|
| 375×667 (iPhone SE) | 680px | [Test T003] | ~13px (acceptable) | [ ] |
| 390×844 (iPhone 12) | 844px | [Test T003] | NO | [ ] |
| 430×932 (iPhone 14 Pro Max) | 932px | [Test T003] | NO | [ ] |
| 768×1024 (iPad) | 700px | [Test T004] | NO | [ ] |
| 1440×900 (Desktop) | 800px | [Test T004] | NO | [ ] |

---

## Acceptance Criteria

### AC-1: Implementation Complete
- [ ] Task T001: `min-height: max(680px, 100vh)` applied to `.header` in styles/main.css
- [ ] Task T002: Inline documentation added explaining behavior
- [ ] CSS syntax valid (W3C or similar validator)

### AC-2: Mobile Responsiveness (CRITICAL)
- [ ] iPhone SE (375×667): min-height = 680px (computed)
- [ ] iPhone 12 (390×844): min-height = 844px (computed)
- [ ] iPhone 14 Pro Max (430×932): min-height = 932px (computed)
- [ ] All mobile viewports: Content visible, no forced scroll (13px overflow acceptable on SE)

### AC-3: Desktop/Tablet Unchanged (CRITICAL)
- [ ] Tablet (768-1023px): min-height = 700px (media query override)
- [ ] Desktop (1024px+): min-height = 800px (media query override)
- [ ] Desktop 1440×900: Zero visual regression (screenshot comparison)
- [ ] Gaps and spacing preserved (80px, 40px)

### AC-4: Cross-Browser Compatibility
- [ ] Chrome (latest): `max()` works correctly
- [ ] Safari iOS 11.3+: `max()` works correctly
- [ ] Firefox 75+: `max()` works correctly
- [ ] Edge (Chromium): `max()` works correctly

### AC-5: No Regressions
- [ ] Accessibility: Touch targets ≥ 44px, contrast WCAG AA, keyboard nav functional
- [ ] Performance: No layout thrashing, smooth rendering, no new console errors
- [ ] Constitution compliance: Mobile-first approach maintained

---

## Rollback Plan

**If issues detected during testing:**

### Scenario 1: max() not working in target browsers
```bash
git revert HEAD
# Fallback: Use fixed min-height: 680px; (less responsive but compatible)
```

### Scenario 2: Unwanted scroll on small devices
**Option A**: Reduce min-height threshold
```css
min-height: max(650px, 100vh);  /* Lower from 680px to 650px */
```

**Option B**: Use `min()` to cap at viewport (allows header < 680px)
```css
min-height: min(680px, 100vh);  /* Never exceeds viewport */
```

**Option C**: Revert to original
```css
min-height: auto;  /* Original behavior */
```

### Scenario 3: Desktop layout affected
```bash
# Verify media queries ordering in styles/main.css
# Ensure @media (min-width: 1024px) comes AFTER base styles
git revert HEAD  # If incorrect
```

---

## Post-Implementation Checklist

### Before Git Commit
- [ ] All 7 tasks completed (T001-T007)
- [ ] Mobile testing passed (T003)
- [ ] Desktop testing passed (T004) - **CRITICAL**
- [ ] Cross-browser validation passed (T005)
- [ ] Accessibility validation passed (T006)
- [ ] Performance check passed (T007)
- [ ] CSS valid (no syntax errors)

### Git Commit
- [ ] Stage changes: `git add styles/main.css`
- [ ] Commit with descriptive message (template provided in plan.md)
- [ ] Verify commit includes only modified lines (1 line change + comment)

### Deployment
- [ ] Local: Refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Static hosting: Upload `styles/main.css`
- [ ] Git-based hosting: `git push` (auto-deploy)

### Post-Deployment Verification
- [ ] Site loads without CSS errors (console clean)
- [ ] Mobile 375px: Header min-height = 680px (DevTools computed)
- [ ] Desktop 1440px: Header min-height = 800px (via media query)
- [ ] No console warnings/errors
- [ ] Optional: Lighthouse audit green (if baseline available)

---

## Implementation Notes

### Key Files Modified
- `styles/main.css` (line 21): 1 line modified + 3 lines comment

### Browser Support
- **CSS `max()` function**: Chrome 79+, Safari 11.1+, Firefox 75+, Edge 79+ (96.5% coverage)
- **Polyfill**: Not needed (target browsers all support it)
- **IE 11**: Not supported (out of scope per constitution)

### Constitution Compliance
- ✅ Mobile-first approach maintained (base styles are mobile)
- ✅ CSS variables used (existing tokens reused)
- ✅ Progressive enhancement (tablet/desktop via media queries)
- ✅ No HTML changes (CSS-only solution)

---

## Task Execution Log

Track progress by checking off tasks as completed:

| Task ID | Description | Status | Completed By | Notes |
|---------|-------------|--------|--------------|-------|
| T001 | Update min-height to max(680px, 100vh) | [ ] | | |
| T002 | Add inline documentation | [ ] | | |
| T003 | Mobile visual regression testing | [ ] | | |
| T004 | Desktop/Tablet visual regression testing | [ ] | | |
| T005 | Cross-browser validation | [ ] | | |
| T006 | Accessibility validation | [ ] | | |
| T007 | Performance check | [ ] | | |

---

**Document Version**: 1.0
**Last Updated**: 2025-10-28
**Ready for Execution**: ✅ YES

**Next Action**: Execute Task T001 (Update min-height in styles/main.css)
