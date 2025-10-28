# Tasks: Mobile Button Interaction Effects Removal

**Feature**: Remove mobile button touch feedback to improve scroll UX
**Branch**: master
**Status**: Ready for Execution
**Created**: 2025-10-28

---

## Overview

This document contains the actionable task list for removing `:active` effects from mobile devices while preserving desktop interactions. The solution uses `@media (hover: hover) and (min-width: 1024px)` to target only hover-capable devices.

**Implementation Strategy**: Sequential implementation, parallel testing, comprehensive validation

**Estimated Total Time**: 60 minutes (1 hour)

---

## Task Summary

| Phase | Task Count | Estimated Time | Can Parallelize |
|-------|-----------|----------------|-----------------|
| Phase 1: CSS Refactoring | 3 tasks | 7 min | No (sequential) |
| Phase 2: Visual Regression | 7 tasks | 35 min | Yes (10 tasks [P]) |
| Phase 3: Accessibility/Performance | 5 tasks | 8 min | Yes (partially) |
| Phase 4: Deployment | 6 tasks | 10 min | No (sequential) |
| **Total** | **21 tasks** | **60 min** | Mixed |

---

## Format Legend

- **[P]**: Task can run in parallel with other [P] tasks
- **File paths**: Exact locations for all code changes
- **Dependencies**: Listed where tasks must complete sequentially

---

## Phase 1: CSS Refactoring (Implementation)

**Goal**: Remove universal `:active` effects and move to desktop-only media query

**User Story**:
> Como usuário mobile, quero scrollar suavemente sobre os botões CTA sem feedback visual indesejado, para que a experiência de navegação seja natural e não confusa.

### Tasks

- [X] T001 Move button `:active` effect to desktop-only media query in styles/main.css
  - **File**: `styles/main.css`
  - **Current location**: Lines 353-357 (universal `.btn:active` rule)
  - **Action**: Remove universal rule, add within `@media (hover: hover) and (min-width: 1024px)` block after line 350
  - **Change**:
    - Remove: `.btn:active { transform: scale(0.98) !important; ... }`
    - Add inside desktop media query: `.btn:active { transform: scale(0.98); transition: ... }`
  - **Rationale**: Exclude touch-only devices from :active effects, preserve desktop
  - **Estimated Time**: 3 min
  - **✅ COMPLETED**

- [X] T002 Move feature pill `:active` effect to desktop-only media query in styles/main.css
  - **File**: `styles/main.css`
  - **Current location**: Lines 210-214 (universal `.feature-pill:active` rule)
  - **Action**: Remove universal rule, add within `@media (hover: hover) and (min-width: 1024px)` block after line 206
  - **Change**:
    - Remove: `.feature-pill:active { transform: scale(0.98); border-color: ...; ... }`
    - Add inside desktop media query: Same rule within media query
  - **Rationale**: Consistency with buttons, same touch interference issue
  - **Dependencies**: T001 (logical grouping)
  - **Estimated Time**: 2 min
  - **✅ COMPLETED**

- [X] T003 Update CSS comments for clarity in styles/main.css
  - **File**: `styles/main.css`
  - **Location 1**: Line 332 (button media query comment)
  - **Location 2**: Line 201 (feature pill media query comment)
  - **Change**: Update both comments to: `/* Desktop: Full hover and active effects (hover-capable devices only) */`
  - **Rationale**: Clarify mobile exclusion is intentional, not oversight
  - **Dependencies**: T001, T002
  - **Estimated Time**: 2 min
  - **✅ COMPLETED**

### Success Criteria
- ✅ Universal `:active` rules removed (lines 210-214, 353-357)
- ✅ `:active` rules added inside desktop media queries
- ✅ `!important` flag removed (no longer needed)
- ✅ CSS syntax valid (no parse errors)

---

## Phase 2: Visual Regression Testing

**Goal**: Validate CSS changes work correctly across all devices and browsers

###Mobile Testing

- [ ] T004 Test mobile scroll experience at 375×667 (iPhone SE) - **CRITICAL**
  - **Method**: Chrome DevTools → Responsive mode → Enable touch simulation
  - **Test Cases**:
    - [ ] Scroll down slowly, finger touching button area → ✅ Button does NOT scale
    - [ ] Tap primary button deliberately → ✅ Button navigates, no scale effect
    - [ ] Scroll over feature pills → ✅ Pills do NOT scale
  - **Validation**: Inspect `.btn` computed styles → `:active` rule should NOT appear
  - **Pass Criteria**: Zero transform/scale effects during scroll or tap
  - **Dependencies**: T001, T002, T003
  - **Estimated Time**: 10 min

- [ ] T005 [P] Test mobile scroll experience at 390×844 (iPhone 12)
  - **Method**: Chrome DevTools → Responsive mode
  - **Test Cases**:
    - [ ] Scroll gesture smooth, no visual glitches
    - [ ] All elements visible, layout não quebrou
  - **Pass Criteria**: Identical to current behavior except no :active effects
  - **Dependencies**: T003
  - **Estimated Time**: 5 min

- [ ] T006 [P] Test mobile scroll experience at 768×1024 (iPad touch-only)
  - **Method**: Chrome DevTools → Responsive mode or real iPad device
  - **Test Cases**:
    - [ ] Scroll sobre botões → sem scale effect
    - [ ] Tap funcionamento normal
  - **Pass Criteria**: Touch-only iPad excluded from :active effects
  - **Dependencies**: T003
  - **Estimated Time**: 5 min

### Desktop Testing

- [ ] T007 Test desktop interactions at 1440×900 (MacBook viewport) - **CRITICAL**
  - **Method**: Chrome DevTools → Desktop viewport (1440×900)
  - **Test Cases**:
    - [ ] Hover primary button → ✅ Lift + scale + shadow appears
    - [ ] Click and HOLD primary button → ✅ Scale down to 0.98 (:active state)
    - [ ] Release mouse → ✅ Returns to hover state
    - [ ] Hover secondary button → ✅ Border + background change
    - [ ] Hover feature pill → ✅ Border + shadow + translateY
    - [ ] Click and hold feature pill → ✅ Scale down + border color change
  - **Pass Criteria**: ALL desktop effects identical to previous behavior (zero regression)
  - **Dependencies**: T004
  - **Estimated Time**: 10 min

### Cross-Browser Testing

- [ ] T008 [P] Validate Chrome Mobile (Android) behavior
  - **Method**: Chrome DevTools → Android device emulation
  - **Test**: Scroll + tap → sem :active effects
  - **Pass**: `:active` rule not applied in computed styles
  - **Dependencies**: T007
  - **Estimated Time**: 2 min

- [ ] T009 [P] Validate Safari iOS behavior - **CRITICAL for iOS users**
  - **Method**: Safari iOS simulator or real iPhone
  - **Test**: Scroll + tap → sem :active effects
  - **Pass**: Smooth scroll, no scale effects
  - **Dependencies**: T007
  - **Estimated Time**: 3 min

- [ ] T010 [P] Validate Chrome Desktop behavior
  - **Method**: Chrome desktop browser (Windows/Mac)
  - **Test**: Hover + click → :active effect funciona
  - **Pass**: `:active` applies with scale(0.98) on mouse press
  - **Dependencies**: T007
  - **Estimated Time**: 2 min

- [ ] T011 [P] Validate Safari Desktop (macOS) behavior
  - **Method**: Safari macOS
  - **Test**: Hover + click → :active effect funciona
  - **Pass**: Same as Chrome desktop
  - **Dependencies**: T007
  - **Estimated Time**: 2 min

- [ ] T012 [P] Validate Firefox Desktop behavior
  - **Method**: Firefox desktop browser
  - **Test**: Hover + click → :active effect funciona
  - **Pass**: `@media (hover: hover)` supported (Firefox 64+)
  - **Dependencies**: T007
  - **Estimated Time**: 2 min

### Success Criteria
- ✅ Mobile (< 1024px): Zero :active effects, smooth scroll
- ✅ Desktop (≥ 1024px): All hover + active effects preserved
- ✅ Cross-browser: Chrome, Safari, Firefox validated
- ✅ Touch devices excluded, hover devices included

---

## Phase 3: Accessibility & Performance

**Goal**: Ensure no regressions in accessibility or performance

### Accessibility Testing

- [ ] T013 Test keyboard navigation functionality
  - **Test Cases**:
    - [ ] Tab to primary button → ✅ Focus visible (outline ring)
    - [ ] Press Enter → ✅ Navigates to WhatsApp link
    - [ ] Press Space → ✅ Navigates to WhatsApp link
    - [ ] Tab to secondary button → ✅ Same behavior
  - **Pass Criteria**: Focus-visible styles maintained (lines 405-418 in main.css)
  - **Dependencies**: T012
  - **Estimated Time**: 3 min

- [ ] T014 [P] Validate touch target sizes unchanged
  - **Test Cases**:
    - [ ] Primary button height ≥ 44px ✅ (already implemented)
    - [ ] Secondary button height ≥ 44px ✅
    - [ ] Gap entre buttons ≥ 8px ✅ (16px atual)
  - **Pass Criteria**: No changes to button dimensions or spacing
  - **Dependencies**: T012
  - **Estimated Time**: 1 min

- [ ] T015 [P] Verify screen reader compatibility (optional)
  - **Method**: VoiceOver (iOS) or TalkBack (Android) - se disponível
  - **Test**: Buttons announced as "link, button text"
  - **Pass Criteria**: No changes to semantic HTML, alt text preserved
  - **Dependencies**: T012
  - **Estimated Time**: 2 min

### Performance Testing

- [ ] T016 [P] Validate CSS performance
  - **Method**: Chrome DevTools → Performance tab → Record scroll
  - **Test Cases**:
    - [ ] Mobile scroll frame rate estável (60fps target)
    - [ ] Nenhum layout thrashing
    - [ ] Paint time não degradado
  - **Expected**: Scroll performance possivelmente MELHORADO (fewer transitions)
  - **Dependencies**: T012
  - **Estimated Time**: 2 min

- [ ] T017 [P] Run Lighthouse audit (optional)
  - **Method**: Chrome DevTools → Lighthouse → Mobile + Desktop
  - **Test Cases**:
    - [ ] Accessibility score ≥ 95 (mantido)
    - [ ] Performance score mantido ou melhorado
  - **Pass Criteria**: No new warnings/errors
  - **Dependencies**: T012
  - **Estimated Time**: 3 min

### Success Criteria
- ✅ Keyboard navigation functional
- ✅ Touch targets ≥ 44px maintained
- ✅ Screen reader compatible (if tested)
- ✅ CSS performance no degradation
- ✅ Lighthouse audit passed (if run)

---

## Phase 4: Deployment

**Goal**: Commit changes and deploy to production

### Pre-Deployment

- [ ] T018 Validate CSS syntax
  - **Method**: W3C CSS Validator (online) or IDE linter
  - **Test**: styles/main.css válido
  - **Pass Criteria**: Zero syntax errors
  - **Dependencies**: T001-T017 (all testing complete)
  - **Estimated Time**: 1 min

### Commit & Deploy

- [ ] T019 Create git commit with detailed message
  - **Method**: Run `git add styles/main.css` then `git commit` with message from plan.md
  - **Commit Message Structure**:
    - Title: `feat: remove mobile button interaction effects para melhorar scroll UX`
    - Body: Problem, Changes, Technique, Behavior by Device
    - Footer: Tests, Impact UX, Constitution compliance
    - Generated tag: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
    - Co-authored: `Co-Authored-By: Claude <noreply@anthropic.com>`
  - **Dependencies**: T018
  - **Estimated Time**: 3 min

- [ ] T020 Deploy to production
  - **Method** (depends on hosting):
    - **Local**: Refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
    - **Static hosting**: Upload styles/main.css
    - **Git-based** (Netlify, Vercel): `git push` (auto-deploy)
  - **Dependencies**: T019
  - **Estimated Time**: 2 min

### Post-Deployment Verification

- [ ] T021 Verify site loads without CSS errors
  - **Method**: Open site, check browser console
  - **Test**: Console limpo, sem erros CSS
  - **Pass Criteria**: No console warnings/errors
  - **Dependencies**: T020
  - **Estimated Time**: 1 min

- [ ] T022 Test mobile 375px viewport on real device (high priority)
  - **Method**: Real iPhone SE ou Android phone
  - **Test**: Scroll sobre botões → sem scale effect
  - **Pass Criteria**: Smooth scroll, no visual feedback on button touch
  - **Dependencies**: T021
  - **Estimated Time**: 2 min

- [ ] T023 Test desktop 1440px on real device
  - **Method**: Desktop browser (Chrome, Safari, or Firefox)
  - **Test**: Hover + click → effects funcionam
  - **Pass Criteria**: DevTools computed styles show `:active` applies with scale(0.98)
  - **Dependencies**: T021
  - **Estimated Time**: 1 min

### Success Criteria
- ✅ CSS validated, no syntax errors
- ✅ Git commit created with detailed message
- ✅ Site deployed successfully
- ✅ Post-deployment verification passed
- ✅ Real device testing confirms behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Implementation)**: Can start immediately - T001 → T002 → T003 (sequential, 7 min)
- **Phase 2 (Visual Regression)**: Depends on Phase 1 - T004-T012 (35 min, partially parallel)
- **Phase 3 (Accessibility/Performance)**: Depends on Phase 2 - T013-T017 (8 min, mostly parallel)
- **Phase 4 (Deployment)**: Depends on all testing phases - T018-T023 (10 min, sequential)

### Task Dependencies

**Sequential (Critical Path)**:
```
T001 (Move button :active)
  → T002 (Move pill :active)
  → T003 (Update comments)
  → T004 (Mobile 375px) [CRITICAL]
  → T007 (Desktop 1440px) [CRITICAL]
  → T008-T012 (Cross-browser)
  → T013-T017 (Accessibility/Performance)
  → T018 (Validate CSS)
  → T019 (Git commit)
  → T020 (Deploy)
  → T021-T023 (Verify)
```

**Parallel Opportunities**:

**After T003** (Mobile testing can start):
- T005, T006 can run in parallel (different mobile viewports)

**After T007** (Cross-browser can start):
- T008, T009, T010, T011, T012 can all run in parallel [P]

**After T012** (Accessibility/Performance can start):
- T013-T017 can partially run in parallel [P]

### Minimum Viable Testing

If time constrained, prioritize:
- **MUST DO**: T001-T003 (implementation), T004 (mobile 375px), T007 (desktop), T010 (Chrome Desktop), T018-T020 (deploy)
- **SHOULD DO**: T008-T009 (Safari iOS/Mobile), T013 (keyboard nav)
- **NICE TO HAVE**: All others (comprehensive validation)

---

## Parallel Execution Examples

### Example 1: Mobile Testing (After T003)
```bash
# Launch all mobile viewport tests in parallel:
Task T005: "Test mobile 390×844"
Task T006: "Test mobile 768×1024"

# While T004 (375px) runs sequentially as baseline
```

### Example 2: Cross-Browser Testing (After T007)
```bash
# Launch all browser tests in parallel:
Task T008: "Chrome Mobile"
Task T009: "Safari iOS"
Task T010: "Chrome Desktop"
Task T011: "Safari Desktop"
Task T012: "Firefox Desktop"
```

### Example 3: Accessibility + Performance (After T012)
```bash
# Launch in parallel (independent concerns):
Task T013-T015: "Accessibility tests"
Task T016-T017: "Performance tests"
```

---

## Rollback Plan

**If any CRITICAL test fails (T004, T007, T010):**

### Scenario 1: Mobile still has :active effects
**Diagnosis**: Media query not matching

```bash
# Check browser DevTools → Media queries panel
# Verify (hover: hover) detection

# Quick fix if needed:
@media (max-width: 1023px) {
  .btn:active, .feature-pill:active {
    transform: none !important;
  }
}
```

### Scenario 2: Desktop lost :active effects
**Diagnosis**: Media query too restrictive

```bash
# Check DevTools → Computed styles
# Verify media query matching

# Full rollback:
git revert HEAD
```

### Scenario 3: Cross-browser compatibility issue
**Diagnosis**: `(hover: hover)` not supported

```bash
# Fallback strategy (very unlikely):
# Use viewport-based media query instead
@media (min-width: 1024px) {
  .btn:active { ... }
}
```

---

## Acceptance Criteria

### AC-1: Mobile Clean Touch Experience (CRITICAL)
- [ ] Viewport 375px (iPhone SE): Scroll sobre botões sem :active effect
- [ ] Viewport 390px (iPhone 12): Scroll sobre botões sem :active effect
- [ ] Viewport 768px (iPad): Scroll sobre botões sem :active effect
- [ ] Real device test: Touch scroll gesture smooth sem visual feedback

### AC-2: Desktop Rich Interactions Preserved (CRITICAL)
- [ ] Viewport 1440px: Hover effects funcionam (lift, scale, shadow)
- [ ] Viewport 1440px: :active effect funciona (scale 0.98 on click)
- [ ] All button types: Primary + secondary mantêm interatividade
- [ ] Feature pills: Hover + active effects mantidos

### AC-3: Media Query Targeting Correct
- [ ] `@media (hover: hover) and (min-width: 1024px)` aplica apenas em desktop
- [ ] Touch devices (mobile/tablet) corretamente excluídos
- [ ] Hybrid devices (iPad + mouse) corretamente incluídos

### AC-4: Cross-Browser Compatibility
- [ ] Chrome Mobile (Android): Sem :active effects
- [ ] Safari iOS: Sem :active effects
- [ ] Chrome Desktop: :active effects funcionam
- [ ] Safari Desktop: :active effects funcionam
- [ ] Firefox Desktop: :active effects funcionam

### AC-5: Code Quality
- [ ] CSS válido (W3C)
- [ ] Comments atualizados (clarity sobre mobile exclusion)
- [ ] Logical grouping: Interactive effects dentro de media query desktop
- [ ] Git commit message descritivo e completo
- [ ] Constitution compliance mantido (mobile-first)

---

## Quick Reference

**Feature Goal**: Improve mobile scroll UX by removing `:active` effects that interfere with scroll gestures

**Problem**: Universal `.btn:active` with `transform: scale(0.98)` triggers on touchstart during scroll, causing unwanted visual feedback

**Solution**: Move `:active` effects to desktop-only media query `@media (hover: hover) and (min-width: 1024px)`

**Impact**:
- 📱 Mobile: Smooth scroll, no visual interference
- 🖥️ Desktop: Rich interactions preserved (zero regression)
- ♿ Accessibility: Maintained (keyboard nav, focus states)
- ⚡ Performance: Improved (fewer unnecessary transitions on mobile)

**Files Changed**: `styles/main.css` (lines 201-214, 332-357 refactored)

**Total Tasks**: 23 tasks
**Estimated Time**: ~60 minutes (1 hour)
**Parallel Opportunities**: 10 tasks can run in parallel
**Minimum Viable**: 10 critical tasks (implementation + basic testing + deploy)

---

## Notes

- **No automated tests**: CSS visual change, manual testing sufficient
- **[P] markers**: Indicate tasks that can run in parallel
- **Single story**: No [US#] labels needed (single-feature implementation)
- **File paths**: All changes in `styles/main.css` only
- **Risk level**: 🟢 LOW - Isolated CSS change, reversible, desktop inalterado
- **Mobile-first**: Constitution compliant (Principle III)
- **Commit strategy**: Single commit after implementation and testing complete
- **Deployment**: Depends on hosting (static upload, git push, or manual)

---

**Document Version**: 1.0
**Generated**: 2025-10-28
**Source Documents**: [plan.md](plan.md), [spec.md](spec.md)
**Ready for Implementation**: ✅ YES

**Next Action**: Execute Phase 1 tasks (T001-T003) - CSS refactoring (~7 min)
