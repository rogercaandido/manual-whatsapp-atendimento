# Implementation Tasks: Remove Mobile Reveal Effect on CTA Section

**Feature**: Disable Scroll Reveal Animation on CTA Buttons (Mobile Only)
**Branch**: master
**Status**: Ready for Implementation
**Total Tasks**: 8
**Estimated Time**: 45 minutes

---

## Overview

This feature removes the scroll reveal animation specifically on the `.cta-section` for mobile devices (< 768px) to ensure CTA buttons ("Começar agora", "Preciso de ajuda") are immediately visible on page load without requiring scroll. Desktop behavior (768px+) is preserved, and all other animations on mobile (hero, features, pills) remain functional.

**User Story**: As a mobile user, I want the CTA buttons to be immediately visible when the page loads, so I can take action without scrolling.

---

## Phase 1: Setup & Research (Optional - Already Complete)

**Goal**: Confirm implementation approach and validate decisions

**Status**: ✅ COMPLETE (per plan.md Phase 0)

**Independent Test Criteria**:
- [x] Research document exists documenting CSS-only approach
- [x] Decision made: Use CSS media query with `.cta-section.animate-hidden` override
- [x] Breakpoint confirmed: 767px (mobile max)
- [x] Transition behavior: Instant visibility (opacity: 1, transform: none)

**Note**: This phase is already complete. Proceed directly to Phase 2.

---

## Phase 2: CSS Implementation (User Story - Priority P1) 🎯

**Goal**: Implement CSS media query to disable scroll reveal on `.cta-section` for mobile only

**Independent Test Criteria**:
- [ ] `.cta-section` is visible immediately on mobile (< 768px) without scroll
- [ ] CTA buttons have `opacity: 1` and `transform: none` on mobile
- [ ] `.cta-section` still animates on desktop (768px+) with 700ms delay
- [ ] Hero subtitle, hero title, features section, and feature pills still animate on mobile
- [ ] No console errors, no layout shifts

### Implementation

- [X] T001 Add mobile-specific CSS override in styles/main.css: After line 399 (within Scroll Reveal section), add `@media (max-width: 767px)` rule targeting `.cta-section.animate-hidden` with `opacity: 1 !important` and `transform: none !important`, and `.cta-section.is-visible` with `transition: none !important`

---

## Phase 3: Desktop & Mobile Preservation Testing (Priority P1)

**Goal**: Verify desktop behavior preserved and other mobile animations intact

**Independent Test Criteria**:
- [ ] Desktop (1920×1080, 1366×768): `.cta-section` animates with scroll reveal (700ms delay)
- [ ] Desktop: All elements (hero, features, pills, CTA) have smooth fade-in transitions
- [ ] Mobile (375×667, 390×844, 393×851): `.cta-section` visible immediately on load
- [ ] Mobile: Hero subtitle animates on scroll
- [ ] Mobile: Hero title animates on scroll (150ms delay)
- [ ] Mobile: Features section animates on scroll (300ms delay)
- [ ] Mobile: Feature pills animate on scroll (400ms, 500ms, 600ms delays)

### Tasks

- [ ] T002 Test desktop CTA animation preservation: Open index.html in browser at 1920×1080 viewport, scroll to CTA section, verify fade-in animation with 700ms delay, check smooth transition ⚠️ MANUAL TEST REQUIRED
- [ ] T003 Test mobile CTA immediate visibility: Open index.html in Chrome DevTools device mode at 375×667 (iPhone SE), hard refresh (Ctrl+Shift+R), verify CTA section visible on load without scroll, check computed styles `opacity: 1` and `transform: none` ⚠️ MANUAL TEST REQUIRED
- [ ] T004 [P] Test mobile other animations preserved: In mobile viewport (375×667), scroll through page, verify hero subtitle fades in, hero title fades in (150ms), features section fades in (300ms), feature pills fade in (400-600ms delays) ⚠️ MANUAL TEST REQUIRED
- [ ] T005 [P] Test tablet edge case (768px): Open browser at 768×1024 (iPad Mini), verify CTA section animates like desktop (should animate, not instant), test both portrait and landscape ⚠️ MANUAL TEST REQUIRED

---

## Phase 4: Accessibility & Cross-Device Testing (Priority P1)

**Goal**: Ensure accessibility maintained and cross-browser compatibility

**Independent Test Criteria**:
- [ ] `prefers-reduced-motion: reduce` disables all animations on all breakpoints (mobile + desktop)
- [ ] Keyboard navigation works (Tab, Enter on CTA buttons)
- [ ] No layout shifts (CLS = 0) on mobile or desktop
- [ ] Works on Chrome, Firefox (mobile and desktop)

### Tasks

- [ ] T006 Test accessibility prefers-reduced-motion: Set OS to reduce motion (Windows: Settings → Accessibility → Visual effects), open index.html, verify all elements (including CTA) appear instantly without animations on both mobile and desktop ⚠️ MANUAL TEST REQUIRED
- [ ] T007 [P] Test cross-browser compatibility: Open index.html in Chrome (mobile 375×667 and desktop 1920×1080), verify CTA behavior, repeat in Firefox, document any differences ⚠️ MANUAL TEST REQUIRED
- [ ] T008 Test keyboard navigation and layout stability: Tab through index.html on desktop, verify CTA buttons focusable and focus indicators visible, check Chrome DevTools Performance tab for layout shifts (CLS should be 0) ⚠️ MANUAL TEST REQUIRED

---

## Task Dependencies

```
Phase 1 (Setup) - ✅ COMPLETE
  │
  ├──> Phase 2 (CSS Implementation)
  │      T001 (Add CSS override)
  │        │
  │        ├──> Phase 3 (Desktop & Mobile Testing)
  │        │      T002 (Desktop CTA test)
  │        │      T003 (Mobile CTA test)
  │        │      T004 [P] (Mobile other animations test)
  │        │      T005 [P] (Tablet edge case test)
  │        │
  │        └──> Phase 4 (Accessibility & Cross-Device)
  │               T006 (Prefers-reduced-motion test)
  │               T007 [P] (Cross-browser test)
  │               T008 (Keyboard navigation test)
```

**Critical Path**: T001 → T002 → T003 → T006 → T008

**Parallel Opportunities**:
- Phase 3: T004 and T005 can run in parallel with T002-T003 (different test scenarios)
- Phase 4: T007 can run in parallel with T006 and T008 (different browsers/tests)

---

## Parallel Execution Examples

**Example 1: Fastest Path (Parallel Testing)**
```
1. Implement T001 (5 min)
2. Run T002, T003, T004, T005 in parallel (10 min)
3. Run T006, T007, T008 in parallel (10 min)
Total: ~25 minutes
```

**Example 2: Sequential Validation Path**
```
1. Implement T001 (5 min)
2. Test T002 (desktop) → T003 (mobile CTA) → T004 (mobile other) (15 min)
3. Test T005 (tablet edge case) (5 min)
4. Test T006 (accessibility) → T007 (cross-browser) → T008 (keyboard) (15 min)
Total: ~40 minutes
```

---

## Implementation Strategy

### MVP Scope (Single User Story)

This entire feature is one user story (P1) focused on mobile UX improvement. All tasks are required for the story to be complete:

**Must Have (T001-T005)**:
- CSS implementation (T001) - Core functionality
- Desktop preservation (T002) - Regression prevention
- Mobile CTA visibility (T003) - User story goal
- Mobile other animations (T004) - Regression prevention
- Tablet edge case (T005) - Edge case coverage

**Should Have (T006-T008)**:
- Accessibility (T006) - Non-negotiable per constitution
- Cross-browser (T007) - Compatibility
- Keyboard navigation (T008) - Accessibility and quality

### Incremental Delivery

1. **Phase 2 Complete (T001)**: CSS implemented, can inspect code
2. **Phase 3 Complete (T002-T005)**: Desktop + mobile verified, ready for accessibility testing
3. **Phase 4 Complete (T006-T008)**: Fully validated, ready for commit and deployment

### Post-Implementation Tasks (Not in Tasks.md)

After all tasks complete:
1. Run git status to see changed files (styles/main.css)
2. Run git diff to review CSS changes
3. Create commit with detailed message (see plan.md for template)
4. Optionally deploy to staging/production
5. Monitor analytics for bounce rate and CTA click-through improvements

---

## Quality Gates

### Gate 1: CSS Implementation Complete (After T001)
- [ ] CSS media query added to styles/main.css after line 399
- [ ] Targets `.cta-section.animate-hidden` and `.cta-section.is-visible`
- [ ] Uses `@media (max-width: 767px)`
- [ ] Includes `!important` flags for specificity
- [ ] Code formatted and indented correctly

### Gate 2: Desktop Behavior Preserved (After T002, T005)
- [ ] Desktop (768px+) CTA section animates with scroll reveal
- [ ] Staggered delay (700ms) preserved on desktop
- [ ] Smooth transitions maintained (600ms duration)
- [ ] Tablet (768px) behaves like desktop (animates)

### Gate 3: Mobile Behavior Correct (After T003, T004)
- [ ] Mobile (< 768px) CTA section visible immediately on load
- [ ] CTA buttons have opacity: 1 and transform: none on mobile
- [ ] Hero subtitle still animates on mobile
- [ ] Hero title still animates on mobile (150ms delay)
- [ ] Features section still animates on mobile (300ms delay)
- [ ] Feature pills still animate on mobile (400-600ms delays)

### Gate 4: Accessibility & Compatibility (After T006-T008)
- [ ] `prefers-reduced-motion: reduce` disables all animations (all breakpoints)
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] No layout shifts (CLS = 0)
- [ ] Works in Chrome and Firefox (mobile + desktop)
- [ ] Focus indicators visible

---

## Success Metrics

**Completion Criteria**:
- All 8 tasks completed (checkboxes marked)
- All 4 quality gates passed
- CSS change isolated to styles/main.css (1 file modified)
- No breaking changes to desktop or other mobile animations
- Accessibility maintained (prefers-reduced-motion, keyboard)

**Measurement**:
- Task completion: 8/8 (100%)
- Quality gates: 4/4 passed
- Time to complete: Target 25-45 minutes
- Files modified: 1 (styles/main.css)
- Lines added: ~10-12 (CSS media query block)

---

## Notes

**File Locations**:
- CSS changes: [styles/main.css](../../styles/main.css) (after line 399)
- No HTML changes: [index.html](../../index.html) (unchanged)
- No JavaScript changes: [scripts/animations.js](../../scripts/animations.js) (unchanged)

**Key Technical Decisions** (from [research-mobile-reveal.md](./research-mobile-reveal.md)):
- **Approach**: CSS-only solution (Option A from plan.md)
- **Selector**: Compound selector `.cta-section.animate-hidden` for specificity
- **Breakpoint**: 767px max-width (mobile), 768px+ (tablet/desktop)
- **Behavior**: Instant visibility (opacity: 1, transform: none, no transition)
- **Specificity**: Use `!important` to override existing animation classes

**CSS Code to Add** (T001):
```css
/* Mobile: Disable scroll reveal on CTA section only */
@media (max-width: 767px) {
  .cta-section.animate-hidden {
    opacity: 1 !important;
    transform: none !important;
  }

  .cta-section.is-visible {
    transition: none !important;
  }
}
```

**Testing Tools Required**:
- Chrome DevTools (Device Toolbar for mobile emulation)
- Firefox Responsive Design Mode
- OS accessibility settings (Windows/Mac for prefers-reduced-motion)
- Browser DevTools Performance tab (for CLS measurement)

**Constitution Compliance** (from [plan.md](./plan.md)):
- ✅ Mobile-first approach: Removes fancy animations on mobile (Principle III)
- ✅ Performance: Reduces Intersection Observer overhead on mobile (Principle IV)
- ✅ Progressive enhancement: Desktop = enhanced (animations), mobile = base (instant)
- ✅ Accessibility: Respects prefers-reduced-motion (Principle V)

**Risk Mitigation**:
- **CSS specificity conflicts**: Use compound selector `.cta-section.animate-hidden` (Medium risk, Low probability)
- **Desktop CTA breaks**: Test at 768px+ breakpoint extensively (High impact, Low probability)
- **Other mobile animations break**: Verify hero, features, pills still animate (High impact, Low probability)
- **Tablet edge case (768px)**: Test landscape mode specifically (Medium impact, Low probability)
- **Accessibility regression**: Verify prefers-reduced-motion still works (High impact, Low probability)

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: ✅ COMPLETE - Research and decisions documented
- **Phase 2 (CSS Implementation)**: Can start immediately - Single task (T001)
- **Phase 3 (Testing)**: Depends on Phase 2 (T001) - Tests verify CSS works
- **Phase 4 (Accessibility)**: Depends on Phase 2 (T001) - Tests verify no regressions

### Task Dependencies Within Phases
- **T001**: No dependencies - Can start immediately
- **T002-T005**: All depend on T001 (CSS must exist to test)
- **T002, T003**: Sequential recommended (desktop first, then mobile)
- **T004, T005**: Can run in parallel with T002-T003 (different scenarios)
- **T006-T008**: All depend on T001, can run in parallel with each other

### Blocking Tasks
- **T001 blocks all testing**: Must implement CSS before any tests can pass
- **No other blocking tasks**: All tests can run independently once CSS is implemented

---

## User Story Mapping

This feature has a **single user story** focused on mobile UX:

**US-1: Mobile CTA Immediate Visibility** (Priority P1)
> "Como usuário mobile, quero que os botões CTA estejam imediatamente visíveis ao carregar a página, para que eu possa tomar ação sem precisar fazer scroll."

**Tasks for US-1**:
- T001: CSS implementation (core functionality)
- T002: Desktop preservation (regression test)
- T003: Mobile CTA visibility (user story validation)
- T004: Mobile other animations preservation (regression test)
- T005: Tablet edge case (boundary test)
- T006: Accessibility (compliance test)
- T007: Cross-browser (compatibility test)
- T008: Keyboard navigation (accessibility test)

**Independent Test Criteria for US-1**:
- Open index.html on mobile (375×667), hard refresh, verify CTA buttons visible on load without scroll
- Open index.html on desktop (1920×1080), scroll to CTA, verify fade-in animation still works
- Scroll through mobile page, verify hero and features still animate normally

---

**Tasks Generated**: 2025-10-28
**Feature Branch**: master
**Related Docs**:
- [plan.md](./plan.md) - Implementation plan with detailed approach
- [spec.md](./spec.md) - Original feature specification
- [research-mobile-reveal.md](./research-mobile-reveal.md) - Research decisions (CSS-only approach)
- [data-model-mobile-reveal.md](./data-model-mobile-reveal.md) - CSS structure and contracts
- [quickstart-mobile-reveal.md](./quickstart-mobile-reveal.md) - Quick implementation guide
