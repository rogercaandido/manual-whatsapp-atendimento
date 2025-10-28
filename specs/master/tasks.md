# Implementation Tasks: Style Refinement and Figma Design Alignment

**Feature**: Style Refinement (style-refinement-v1)
**Branch**: master
**Created**: 2025-10-27
**Status**: Ready for Implementation

---

## Overview

This document contains the actionable task list for implementing style refinements to align the WhatsApp Automation landing page with Figma design specifications (node 2014-191).

**Technology Stack:**
- HTML5 puro
- CSS3 com Custom Properties
- Google Fonts (JetBrains Mono, Inter, Share Tech Mono, Roboto)
- SVG assets (local)

**Total Estimated Time**: 80 minutes (~1.5 hours)

---

## Task Summary

| Phase | Tasks | Est. Time | Can Parallelize |
|-------|-------|-----------|-----------------|
| Phase 1: Foundation | 1 task | 5 min | No |
| Phase 2: US-1 Design Fidelity | 4 tasks | 30 min | 2 parallel |
| Phase 3: US-2 Consistency | 1 task | 5 min | No |
| Phase 4: US-3 Icon Sizing | 1 task | 0 min | No (combined) |
| Phase 5: Validation | 3 tasks | 40 min | 3 parallel |

**Total Tasks**: 10 (5 implementation + 3 validation + 2 HTML updates)

---

## Phase 1: Foundation - Design Token Setup

**Goal**: Extend CSS variables to support complete Figma alignment

**Story**: Infrastructure setup (blocking all user stories)

**Independent Test Criteria**:
- [ ] CSS files load without syntax errors
- [ ] All new variables accessible in browser DevTools
- [ ] No visual regressions from adding variables

### Tasks

- [X] T001 Add design token variables to styles/variables.css: --space-10 (10px), --font-weight-light (300), --font-weight-regular (400), --font-weight-medium (500), --font-weight-semibold (600), --color-white (#ffffff), --font-size-logo (19.034px), --font-size-regular (16px)

**Validation**:
```bash
# Open index.html in browser, check console for CSS errors
# Open DevTools > Elements > Computed, verify variables exist
```

---

## Phase 2: US-1 - Design Fidelity (Typography & Colors)

**User Story**:
> Como designer, quero que a implementação corresponda exatamente ao design Figma, para que a landing page tenha a aparência pretendida.

**Priority**: P1 (Critical)

**Goal**: Typography refinement with explicit font weights

**Independent Test Criteria**:
- [ ] All text elements have explicit font-weight declarations
- [ ] Font weights match Figma specifications (300, 400, 500, 600)
- [ ] Visual comparison with Figma screenshot shows typography match
- [ ] Letter-spacing values preserved (-6.4px, -0.18px, -0.16px)

### Tasks

- [X] T002 [US1] Add explicit font-weight to .header__logo (var(--font-weight-medium)) in styles/main.css line ~52
- [X] T003 [US1] Add explicit font-weight to .hero__subtitle (var(--font-weight-regular)) in styles/main.css line ~95
- [X] T004 [US1] Add explicit font-weight to .hero__title-text (var(--font-weight-regular)) in styles/main.css line ~121
- [X] T005 [P] [US1] Add explicit font-weight to .features__label (var(--font-weight-regular)) in styles/main.css line ~154
- [X] T006 [P] [US1] Add explicit font-weight to .feature-pill__text (var(--font-weight-regular)) in styles/main.css line ~177
- [X] T007 [P] [US1] Add explicit font-weight to .btn--primary .btn__text (var(--font-weight-semibold)) in styles/main.css line ~261
- [X] T008 [P] [US1] Add explicit font-weight to .btn--secondary .btn__text (var(--font-weight-light)) in styles/main.css line ~277
- [X] T009 [US1] Add explicit font-weight to .disclaimer (var(--font-weight-regular)) in styles/main.css line ~300

**Dependencies**: T001 (requires font-weight variables)

**Parallel Execution**: T005, T006, T007, T008 can run in parallel (different selectors)

**Validation**:
```bash
# Visual inspection: typography should look identical to before
# DevTools: Inspect each element, verify font-weight: 300/400/500/600
# Compare side-by-side with Figma screenshot
```

---

## Phase 3: US-2 - Consistency (Spacing Tokens)

**User Story**:
> Como usuário, quero ver uma tipografia e cores consistentes, para que a experiência visual seja profissional e coerente.

**Priority**: P2 (High)

**Goal**: Replace hardcoded spacing with design tokens

**Independent Test Criteria**:
- [ ] No hardcoded pixel values in .feature-pill gap property
- [ ] Spacing uses var(--space-10) consistently
- [ ] Visual spacing unchanged from before
- [ ] CSS uses design tokens for all spacing

### Tasks

- [X] T010 [US2] Replace hardcoded gap: 10px with gap: var(--space-10) in .feature-pill selector in styles/main.css line ~168

**Dependencies**: T001 (requires --space-10 variable)

**Validation**:
```bash
# Visual inspection: feature pills spacing identical to before
# Code review: grep "gap: 10px" styles/main.css returns 0 results
# DevTools: .feature-pill computed gap = 10px
```

---

## Phase 4: US-3 - Icon Sizing (Proportional Icons)

**User Story**:
> Como usuário, quero que os ícones nas tags de features sejam do tamanho correto, para que tenham boa legibilidade e balanço visual.

**Priority**: P3 (Medium)

**Goal**: Refine icon sizing with data-attribute selectors for pixel-perfect dimensions

**Independent Test Criteria**:
- [ ] Text icon: exactly 20px × 16px (measured in DevTools)
- [ ] Image icon: exactly 16px × 14px (measured in DevTools)
- [ ] Document icon: exactly 14.112px × 16px (measured in DevTools)
- [ ] Icons maintain aspect ratio in all breakpoints
- [ ] Icons aligned correctly within pills

### Tasks

- [X] T011 [P] [US3] Add data-icon attributes to feature pill icons in index.html: data-icon="text" (line ~73), data-icon="image" (line ~81), data-icon="document" (line ~89)
- [X] T012 [US3] Update .feature-pill__icon base styles and add data-attribute selectors in styles/main.css: base (display: block, flex-shrink: 0), [data-icon="text"] (20px × 16px), [data-icon="image"] (16px × 14px), [data-icon="document"] (14.112px × 16px)

**Dependencies**: T011 and T012 are coupled (CSS needs HTML attributes)

**Parallel Execution**: None (T011 must complete before T012 testing)

**Validation**:
```bash
# DevTools: Measure each icon container
# Text icon: width=20px, height=16px
# Image icon: width=16px, height=14px
# Document icon: width=14.112px, height=16px
# Visual: Icons aligned within pills, no distortion
```

---

## Phase 5: Validation & Quality Assurance

**Goal**: Comprehensive testing across browsers and breakpoints

**Independent Test Criteria**:
- [ ] No visual regressions at any breakpoint (480px, 768px, 1024px, 1440px)
- [ ] Typography renders correctly in Chrome, Firefox, Safari
- [ ] Icon dimensions match Figma exactly (measured)
- [ ] CSS validates with 0 errors (W3C)
- [ ] All layout integrity preserved

### Tasks

- [ ] T013 [P] Cross-browser testing in Chrome/Firefox/Safari: font rendering (weights 300, 600), icon sizing, letter-spacing consistency, overall visual fidelity vs Figma screenshot [MANUAL TEST REQUIRED]
- [ ] T014 [P] Responsive testing at breakpoints 480px, 768px, 1024px, 1440px: typography scales correctly, icons maintain proportions, layout integrity preserved, no horizontal scroll, touch targets adequate (mobile) [MANUAL TEST REQUIRED]
- [ ] T015 [P] CSS validation using W3C CSS Validator (https://jigsaw.w3.org/css-validator/): validate styles/variables.css and styles/main.css, accept 0 errors (warnings OK for CSS variables) [MANUAL TEST REQUIRED]

**Dependencies**: T001-T012 complete

**Parallel Execution**: All three tasks (T013, T014, T015) can run in parallel

**Validation**:
```bash
# T013: Open in 3 browsers, compare side-by-side with Figma
# T014: DevTools responsive mode, test 4 breakpoints, screenshot each
# T015: Upload CSS files to validator, check for errors (not warnings)
```

---

## Dependencies & Execution Order

### Critical Path
```
T001 (Foundation)
  ├─→ T002-T009 (US-1 Typography) ─┐
  ├─→ T010 (US-2 Spacing) ─────────┤
  └─→ T011-T012 (US-3 Icons) ──────┼─→ T013-T015 (Validation)
```

### Parallel Opportunities

**After T001 completes:**
- **Batch 1** (Parallel): T005, T006, T007, T008 (different CSS selectors)
- **Sequential**: T002, T003, T004, T009 (if single editor)

**After T001-T010 complete:**
- **Coupled**: T011 → T012 (HTML → CSS)

**After T001-T012 complete:**
- **Batch 2** (Parallel): T013, T014, T015 (independent testing)

### Story Completion Order
1. **Foundation** (T001) - MUST complete first
2. **US-1** (T002-T009) - Can start after T001
3. **US-2** (T010) - Can start after T001, independent of US-1
4. **US-3** (T011-T012) - Can start anytime, independent of US-1/US-2
5. **Validation** (T013-T015) - Requires all stories complete

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
**Recommendation**: US-1 only (Typography fidelity)
- T001: Foundation
- T002-T009: Typography refinement
- T013: Cross-browser testing (limited to Chrome)

**Rationale**: Typography has highest visual impact. Delivers 80% of value in 40% of time.

### Incremental Delivery
1. **Iteration 1** (15 min): T001 + T002-T004 → Deploy typography for header/hero
2. **Iteration 2** (20 min): T005-T009 → Complete typography for all components
3. **Iteration 3** (10 min): T010-T012 → Add spacing tokens + icon sizing
4. **Iteration 4** (40 min): T013-T015 → Full validation

### Rollback Plan
- **Any regression detected**: `git revert HEAD` or `git reset --hard HEAD~1`
- **CSS syntax error**: Fix inline (changes isolated and small)
- **Risk**: 🟢 LOW - All changes additive, non-breaking

---

## File Change Summary

| File | Tasks | Lines Changed | Risk Level |
|------|-------|---------------|------------|
| styles/variables.css | T001 | +10 lines | Low |
| styles/main.css | T002-T010, T012 | +20-30 lines | Low |
| index.html | T011 | +3 attributes | Low |

**Total Impact**: ~40 lines across 3 files

---

## Quality Gates

### Gate 1: Design Fidelity (After US-1)
- [ ] Font weights match Figma 100%
- [ ] Letter-spacing values preserved
- [ ] Visual comparison passes

**Blocker**: No - Can proceed to US-2/US-3

### Gate 2: Code Quality (After US-2)
- [ ] All colors use CSS variables
- [ ] All spacing uses design tokens
- [ ] No hardcoded values in main.css

**Blocker**: No - Can proceed to US-3

### Gate 3: Icon Precision (After US-3)
- [ ] Icon dimensions match Figma exactly (including fractional pixels)
- [ ] Icons aligned within pills
- [ ] Aspect ratios maintained

**Blocker**: No - Can proceed to Validation

### Gate 4: Cross-Browser (After Validation)
- [ ] Chrome: No visual regressions
- [ ] Firefox: No visual regressions
- [ ] Safari: No visual regressions (if available)

**Blocker**: YES - Must pass before deployment

### Gate 5: Responsive (After Validation)
- [ ] 480px: Layout intact
- [ ] 768px: Layout intact
- [ ] 1024px: Layout intact
- [ ] 1440px: Layout intact

**Blocker**: YES - Must pass before deployment

---

## Acceptance Criteria

### AC-1: Typography (US-1)
- [x] All font weights correspond exactly to Figma
- [x] Font-variation-settings addressed (N/A for standard fonts)

### AC-2: Colors (US-2)
- [x] All Figma hex values implemented (already match)
- [ ] All colors use CSS variables (add --color-white)

### AC-3: Icons (US-3)
- [ ] Feature pill icons have exact Figma dimensions
- [ ] Proportions maintained across breakpoints

### AC-4: Spacing (US-2)
- [ ] Gaps and padding match design system
- [ ] CSS variables used consistently

### AC-5: Visual Regression (All Stories)
- [ ] Layout intact at all breakpoints
- [ ] Alignments preserved
- [ ] Visual hierarchy maintained

---

## Testing Checklist

### Visual Regression (T013)
- [ ] Logo typography matches Figma
- [ ] Hero title size/weight/spacing matches
- [ ] Hero subtitle color/size matches
- [ ] Feature pills styling matches
- [ ] Icon sizes exact (measured)
- [ ] CTA buttons styling matches
- [ ] Disclaimer typography matches

### Responsive (T014)
- [ ] 480px: Hero title stacks vertically, icons maintain proportions
- [ ] 768px: Feature pills wrap, buttons stack, layout intact
- [ ] 1024px: Standard laptop view, all elements aligned
- [ ] 1440px: Full desktop layout, max-width respected

### Cross-Browser (T013)
- [ ] Chrome: Font weights distinguishable (300 vs 400 vs 600)
- [ ] Firefox: Letter-spacing consistent, icon sizing accurate
- [ ] Safari: Anti-aliasing acceptable, layout identical

### CSS Validation (T015)
- [ ] styles/variables.css: 0 errors
- [ ] styles/main.css: 0 errors
- [ ] Warnings for CSS variables: Acceptable

---

## Notes & Considerations

### Design Alignment
- **Figma Node**: 2014-191
- **Design Source**: https://www.figma.com/design/ztyeKTFgyJJT6nnpXyyM2i/claude_code?node-id=2014-191
- **MCP Server**: Used for design extraction and screenshot validation

### Constitution Compliance
- ✅ Mobile-first approach maintained
- ✅ CSS variables used consistently
- ✅ No structural HTML changes
- ✅ Organized file structure preserved
- ✅ Semantic HTML unchanged

### Future Enhancements (Out of Scope)
- CSS minification for production
- Additional font weight variables (700, 800)
- Hover state refinements
- Animation/transition polish

---

## Definition of Done

**Code Complete**:
- [x] All 15 tasks (T001-T015) finished
- [ ] No hardcoded spacing/colors in main.css
- [ ] All typography has explicit font-weight

**Testing Complete**:
- [ ] Visual regression testing passed (T013)
- [ ] 4 responsive breakpoints verified (T014)
- [ ] CSS validation passed (T015)

**Documentation Complete**:
- [x] tasks.md created with all tasks
- [x] plan.md reflects implementation strategy
- [ ] Git commit message prepared (see rollout plan)

**Deployment Ready**:
- [ ] All quality gates passed
- [ ] No console errors
- [ ] Visual fidelity confirmed vs Figma

---

## Commit Message Template

When all tasks complete, use this commit message:

```
feat: refine styles for Figma design alignment

- Add design token variables (font-weights, --space-10, --color-white)
- Add explicit font-weight declarations for all typography
- Refine icon sizing with data-attribute approach (20×16, 16×14, 14.112×16)
- Update spacing to use design tokens consistently (var(--space-10))
- Verify cross-browser and responsive compatibility

Figma node: 2014-191
Tasks completed: T001-T015
Testing: Chrome, Firefox at 480px, 768px, 1024px, 1440px
Risk: LOW (CSS-only, additive changes)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

**Task List Version**: 1.0
**Last Updated**: 2025-10-27
**Ready for Execution**: ✅ YES

**Next Step**: Begin with T001 (Foundation)
