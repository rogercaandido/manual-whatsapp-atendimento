# Implementation Plan: Animation & Link Refinements

**Feature**: Fix Animation Scaling Issues & Update CTA Links
**Created**: 2025-10-27 (Updated)
**Branch**: master
**Status**: Ready for Implementation

## Change Summary

This plan refines existing animations and updates CTA button links based on user feedback:

1. **Animation Fixes**: Remove unwanted scale transforms from feature pills (fix "grow size" issue)
2. **Spacing Update**: Add 18px margin below "Funciona com" label
3. **Cursor Update**: Remove pointer cursor from feature pills (non-interactive styling)
4. **CTA Links**: Connect buttons to WhatsApp links for real functionality
5. **Preserve**: Keep existing scroll reveals, button hovers, and accessibility features

---

## Table of Contents
1. [Technical Context](#technical-context)
2. [Constitution Check](#constitution-check)
3. [Quality Gates](#quality-gates)
4. [Phase 0: Research & Analysis](#phase-0-research--analysis)
5. [Phase 1: Design & Contracts](#phase-1-design--contracts)
6. [Phase 2: Implementation Plan](#phase-2-implementation-plan)
7. [Testing Strategy](#testing-strategy)
8. [Rollout Plan](#rollout-plan)

---

## Technical Context

### Project Overview
Landing page HTML/CSS pura para automação WhatsApp com IA. Estrutura atual baseada em design Figma (node 2014-191), requerendo refinamento de estilos para fidelidade pixel-perfect.

### Technology Stack
- **Frontend**: HTML5 puro
- **Styling**: CSS3 com Custom Properties (variáveis CSS)
- **Fonts**: Google Fonts (JetBrains Mono, Inter, Share Tech Mono, Roboto)
- **Assets**: SVG icons (local)
- **Design Source**: Figma via MCP Server

### Current Architecture
```
projeto_b/
├── index.html              # Estrutura HTML semântica
├── styles/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   └── main.css           # Component styles, responsive breakpoints
└── assets/
    ├── whatsapp-logo.svg
    ├── whatsapp-icon.svg
    ├── text-icon.svg
    ├── image-icon.svg
    └── document-icon.svg
```

### Key Dependencies
- Google Fonts API: `https://fonts.googleapis.com/css2?family=...&display=swap`
- Figma MCP Server: Design specification source of truth
- Modern browsers: Chrome/Edge/Firefox/Safari (últimas 2 versões)

### Integration Points
- **None**: Feature is self-contained CSS refinement
- **External APIs**: Google Fonts (already integrated)
- **Design System**: Figma node 2014-191 as source of truth

---

## Constitution Check

### Compliance Matrix

| Principle | Requirement | Current Status | Compliance |
|-----------|-------------|----------------|------------|
| **I. Estrutura e Organização** | Separação HTML/CSS/JS, assets organizados | ✅ Implemented | ✅ PASS |
| **II. HTML Semântico** | Tags semânticas, estrutura hierárquica | ✅ Implemented | ✅ PASS |
| **III. CSS Responsivo (NON-NEGOTIABLE)** | Mobile-first, variáveis CSS, media queries | ✅ Implemented | ✅ PASS |
| **IV. Performance** | CSS minificado em produção | ⚠️ Dev mode | ⚠️ ACCEPTABLE (dev) |
| **V. Compatibilidade** | Navegadores modernos, sem erros | ✅ Implemented | ✅ PASS |

### Non-Negotiable Requirements Status
✅ **Mobile-first approach**: Media queries implementados (480px → 768px → 1024px → 1440px)
✅ **CSS Variables**: Design tokens em variables.css
✅ **Responsive breakpoints**: 4 breakpoints definidos
✅ **Organized structure**: HTML/CSS separados, assets em pasta dedicada

### Constitution Violations
**None detected**. All changes are additive refinements within existing architecture.

### Risk Assessment
**Risk Level**: 🟢 LOW

**Rationale**:
- Changes are CSS-only (no structural modifications)
- Additive approach (new variables, explicit declarations)
- No new dependencies
- Aligns with constitution principles (CSS variables, mobile-first)

---

## Quality Gates

### Gate 1: Design Fidelity ✅
**Criteria**:
- [ ] Font weights match Figma specifications 100%
- [ ] Colors match Figma hex values exactly
- [ ] Icon sizes match Figma dimensions (including fractional pixels)
- [ ] Letter-spacing values implemented

**Validation Method**: Visual comparison with Figma screenshot + code inspection

**Blocker**: No

---

### Gate 2: Code Quality ✅
**Criteria**:
- [ ] All colors use CSS variables (no hardcoded hex in main.css)
- [ ] All spacing uses design token variables
- [ ] All font-weights explicitly declared (no implicit defaults)
- [ ] W3C CSS validation passes (0 errors)

**Validation Method**: Code review + W3C CSS Validator

**Blocker**: No

---

### Gate 3: Responsive Integrity ✅
**Criteria**:
- [ ] Layout intact at 480px (mobile)
- [ ] Layout intact at 768px (tablet)
- [ ] Layout intact at 1024px (desktop)
- [ ] Layout intact at 1440px+ (large desktop)
- [ ] Icon proportions maintained across breakpoints

**Validation Method**: Manual testing in browser DevTools responsive mode

**Blocker**: No

---

### Gate 4: Cross-Browser Compatibility ✅
**Criteria**:
- [ ] Chrome/Edge: Visual consistency
- [ ] Firefox: Visual consistency
- [ ] Safari: Visual consistency (if available)
- [ ] Font rendering acceptable across browsers

**Validation Method**: Manual testing in target browsers

**Blocker**: No

---

## Phase 0: Research & Analysis

### Status: ✅ COMPLETE

**Completed Artifacts**:
- ✅ [spec.md](./spec.md) - Feature specification with requirements
- ✅ [research.md](./research.md) - Design token analysis, best practices
- ✅ Figma design extraction (node 2014-191)
- ✅ Current implementation audit

**Key Findings**:
1. **Typography**: 90% correct, needs explicit font-weight declarations
2. **Colors**: 100% match, missing --color-white variable
3. **Icons**: Correct sizes, container refinement needed for precision
4. **Spacing**: 95% correct, missing --space-10 token

**Research Decisions**:
- ✅ Use data attributes for icon sizing
- ✅ Add explicit font-weight variables
- ✅ Normalize font-size variable naming
- ✅ Ignore Roboto font-variation-settings (not supported, no visual impact)

**No Blockers**: All unknowns resolved, ready for implementation.

---

## Phase 1: Design & Contracts

### 1.1 Data Model

**Not Applicable**: CSS refinement has no data entities.

### 1.2 Design System Contracts

#### Design Token Contract v1.1

**Purpose**: Extend existing design tokens for complete Figma alignment

**New Tokens**:

```css
/* === ADDITIONS TO variables.css === */

/* Spacing - Add missing token */
--space-10: 10px;

/* Font Weights - Add explicit variables */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;

/* Colors - Add missing white */
--color-white: #ffffff;

/* Font Sizes - Normalize naming */
--font-size-logo: 19.034px;
--font-size-regular: 16px;  /* Alias for --font-size-m */
```

**Token Usage Matrix**:

| Component | Font Family | Font Size | Font Weight | Color | Spacing |
|-----------|-------------|-----------|-------------|-------|---------|
| Logo | --font-jetbrains | --font-size-logo | --font-weight-medium | white / --color-primary | N/A |
| Hero Subtitle | --font-inter | --font-size-medium | --font-weight-regular | --color-zinc-200 | N/A |
| Hero Title | --font-share-tech | --font-size-8xl | --font-weight-regular | --color-zinc-100 | N/A |
| Feature Label | --font-inter | --font-size-xs | --font-weight-regular | --color-zinc-300 | N/A |
| Feature Pill Text | --font-inter | --font-size-xs | --font-weight-regular | --color-zinc-300 | --space-8 --space-16 |
| Primary CTA | --font-inter | --font-size-regular | --font-weight-semibold | --color-black | 12px 24px |
| Secondary CTA | --font-inter | --font-size-regular | --font-weight-light | --color-zinc-500 | 12px 24px |
| Disclaimer | --font-roboto | --font-size-regular | --font-weight-regular | --color-zinc-500 | N/A |

#### Icon Sizing Contract

**Purpose**: Define exact dimensions for all icons per Figma specs

**Implementation Strategy**: Data attribute selectors

```css
/* Icon Container Base */
.feature-pill__icon {
  display: block;
  flex-shrink: 0;
}

/* Icon Type Specific Dimensions */
.feature-pill__icon[data-icon="text"] {
  width: 20px;
  height: 16px;
}

.feature-pill__icon[data-icon="image"] {
  width: 16px;
  height: 14px;
}

.feature-pill__icon[data-icon="document"] {
  width: 14.112px;
  height: 16px;
}

.feature-pill__icon img {
  width: 100%;
  height: 100%;
  display: block;
}
```

**HTML Update Required**:
```html
<!-- Update feature pills to include data-icon attribute -->
<span class="feature-pill__icon" data-icon="text">
  <img src="assets/text-icon.svg" alt="">
</span>
```

### 1.3 Component Refinement Specifications

#### Typography Refinements

**1. Explicit Font Weights**
Add explicit font-weight declarations to all text elements:

```css
/* Logo */
.header__logo {
  font-weight: var(--font-weight-medium);
}

/* Hero Subtitle */
.hero__subtitle {
  font-weight: var(--font-weight-regular);
}

/* Hero Title */
.hero__title-text {
  font-weight: var(--font-weight-regular);
}

/* Feature Label */
.features__label {
  font-weight: var(--font-weight-regular);
}

/* Feature Pills */
.feature-pill__text {
  font-weight: var(--font-weight-regular);
}

/* Primary CTA */
.btn--primary .btn__text {
  font-weight: var(--font-weight-semibold);
}

/* Secondary CTA */
.btn--secondary .btn__text {
  font-weight: var(--font-weight-light);
}

/* Disclaimer */
.disclaimer {
  font-weight: var(--font-weight-regular);
}
```

**2. Letter Spacing Verification**
Ensure all letter-spacing values match Figma:

```css
.hero__title-text {
  letter-spacing: -6.4px;  /* ✅ Already correct */
}

.hero__subtitle {
  letter-spacing: -0.18px; /* ✅ Already correct */
}

.btn__text {
  letter-spacing: -0.16px; /* ✅ Already correct */
}

.disclaimer {
  letter-spacing: -0.16px; /* ✅ Already correct */
}
```

#### Color Refinements

**No Changes Required**: All colors already use CSS variables and match Figma values.

**Action**: Add --color-white to variables.css for completeness.

#### Spacing Refinements

**Gap Verification**:
```css
/* Feature pills internal gap */
.feature-pill {
  gap: 10px; /* Should be var(--space-10) */
}
```

**Action**: Replace hardcoded `10px` with `var(--space-10)` after adding token.

### 1.4 Quickstart Guide

**Testing Steps**:
1. Open `index.html` in browser
2. Compare visually with Figma screenshot
3. Test responsive breakpoints: 480px, 768px, 1024px, 1440px
4. Verify in Chrome/Firefox/Safari

**Rollback**: All changes are additive. To rollback, remove new CSS variables (code still works with defaults).

---

## Phase 2: Implementation Plan

### 2.1 Implementation Tasks

#### Task 1: Remove Scale Transform from Feature Pill Hover ⏱️ 2 min
**File**: `styles/main.css` (lines 199-210)

**Issue**: Feature pills currently have a `scale(1.02)` transform on hover, causing unwanted "grow size" effect

**Changes**:
```css
/* BEFORE */
@media (hover: hover) and (min-width: 1024px) {
  .feature-pill:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 16px rgba(116, 210, 0, 0.3);
    transform: translateY(-2px) scale(1.02);  /* ❌ Remove scale */
  }

  .feature-pill:hover .feature-pill__icon {
    transform: scale(1.1);  /* ❌ Remove this too */
    transition: transform var(--duration-fast) var(--ease-bounce);
  }
}

/* AFTER */
@media (hover: hover) and (min-width: 1024px) {
  .feature-pill:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 16px rgba(116, 210, 0, 0.3);
    transform: translateY(-2px);  /* ✅ Only vertical lift */
  }

  /* ✅ Remove icon scale entirely - let it move with parent */
}
```

**Testing**:
- Hover over feature pills on desktop
- Should lift vertically without growing
- Icons should NOT scale independently

**Dependencies**: None

---

#### Task 2: Add 18px Margin Below "Funciona com" Label ⏱️ 2 min
**File**: `styles/main.css` (lines 170-177)

**Changes**:
```css
/* BEFORE */
.features__label {
  font-family: var(--font-inter);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
  color: var(--color-zinc-300);
  line-height: 0;
  white-space: nowrap;
}

/* AFTER */
.features__label {
  font-family: var(--font-inter);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
  color: var(--color-zinc-300);
  line-height: 0;
  white-space: nowrap;
  margin-bottom: 18px;  /* ✅ ADDED */
}
```

**Testing**:
- Verify 18px space between "Funciona com:" and feature pills
- Check responsive breakpoints maintain spacing

**Dependencies**: None

---

#### Task 3: Remove Cursor Pointer from Feature Pills ⏱️ 1 min
**File**: `styles/main.css` (line 196)

**Rationale**: Feature pills are not clickable/interactive, should not show pointer cursor

**Changes**:
```css
/* BEFORE */
.feature-pill {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  padding: var(--space-8) var(--space-16);
  border: 1px solid var(--color-zinc-500);
  border-radius: 33px;
  transition: all var(--duration-normal) var(--ease-smooth);
  cursor: pointer;  /* ❌ REMOVE THIS LINE */
}

/* AFTER */
.feature-pill {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  padding: var(--space-8) var(--space-16);
  border: 1px solid var(--color-zinc-500);
  border-radius: 33px;
  transition: all var(--duration-normal) var(--ease-smooth);
  /* ✅ No cursor property - default cursor */
}
```

**Testing**:
- Hover over pills: default cursor, not pointer
- Visual hover effects still work

**Dependencies**: None

---

#### Task 4: Update Primary CTA WhatsApp Link ⏱️ 1 min
**File**: `index.html` (line 108)

**Changes**:
```html
<!-- BEFORE -->
<a href="#" class="btn btn--primary" data-node-id="2014:297">

<!-- AFTER -->
<a href="https://wa.me/5519953330043?text=Opa!" class="btn btn--primary" data-node-id="2014:297">
```

**Testing**:
- Click button in browser
- Opens WhatsApp with number +55 19 95333-0043
- Message pre-filled: "Opa!"

**Dependencies**: None

---

#### Task 5: Update Secondary CTA WhatsApp Link ⏱️ 1 min
**File**: `index.html` (line 116)

**Changes**:
```html
<!-- BEFORE -->
<a href="#" class="btn btn--secondary" data-node-id="2014:301">

<!-- AFTER -->
<a href="https://wa.me/5519995492389?text=Vim%20do%20web_agent%20quero%20adicionar%20meu%20n%C3%BAmero%20na%20lista%2Fpreciso%20de%20ajuda!" class="btn btn--secondary" data-node-id="2014:301">
```

**Decoded Message**: "Vim do web_agent quero adicionar meu número na lista/preciso de ajuda!"

**Testing**:
- Click "Preciso de ajuda" button
- Opens WhatsApp with number +55 19 99549-2389
- Message correctly pre-filled and URL-encoded

**Dependencies**: None

---

#### Task 6: Visual Verification - Animations ⏱️ 5 min

**Test Cases**:
1. Feature pills lift vertically on hover (no scaling)
2. Feature pill icons don't scale independently
3. Mobile touch feedback still works (scale 0.98 on :active)
4. Button hovers still work normally
5. Scroll reveal animations unchanged

**Pass Criteria**: Animations feel smooth without unwanted growth

**Dependencies**: Tasks 1-3 complete

---

#### Task 7: Visual Verification - Spacing ⏱️ 3 min

**Test Cases**:
1. "Funciona com:" label has 18px margin below
2. Visual balance maintained
3. Spacing consistent across breakpoints

**Pass Criteria**: Spacing looks intentional and balanced

**Dependencies**: Task 2 complete

---

#### Task 8: Functional Testing - WhatsApp Links ⏱️ 5 min

**Test Cases**:
1. Primary button opens correct WhatsApp number
2. Primary button pre-fills "Opa!" message
3. Secondary button opens correct WhatsApp number
4. Secondary button pre-fills long message correctly
5. Links work on mobile and desktop

**Pass Criteria**: Both links open WhatsApp with correct data

**Dependencies**: Tasks 4-5 complete

---

#### Task 9: Responsive & Cross-Browser Testing ⏱️ 10 min

**Breakpoints**: 480px, 768px, 1024px, 1440px

**Test Cases**:
1. Animation fixes work at all breakpoints
2. Spacing maintained responsively
3. WhatsApp links work in Chrome, Firefox
4. No console errors
5. Touch devices: pills don't show pointer cursor

**Pass Criteria**: All changes work across devices/browsers

**Dependencies**: All tasks 1-8 complete

---

### 2.2 Task Dependency Graph

```
Task 1 (Remove Scale Transform) [PARALLEL]
  └─→ Task 6 (Visual Verification - Animations)

Task 2 (Add 18px Margin) [PARALLEL]
  └─→ Task 7 (Visual Verification - Spacing)

Task 3 (Remove Cursor Pointer) [PARALLEL]
  └─→ Task 6 (Visual Verification - Animations)

Task 4 (Primary CTA Link) [PARALLEL]
  └─→ Task 8 (Functional Testing - WhatsApp)

Task 5 (Secondary CTA Link) [PARALLEL]
  └─→ Task 8 (Functional Testing - WhatsApp)

Task 9 (Responsive & Cross-Browser) [After all implementation tasks]
```

**Critical Path**: All tasks can run in parallel, then verification tasks
**Estimated Total Time**: 30 minutes (~0.5 hours)

---

### 2.3 Implementation Sequence

**Recommended Order**:

1. **CSS Animation Fixes** (Tasks 1-3) - Run in parallel
   - Remove scale transform from feature pills (Task 1)
   - Add 18px margin below label (Task 2)
   - Remove cursor pointer (Task 3)
   - Quick validation: Test hover states

2. **HTML Link Updates** (Tasks 4-5) - Run in parallel
   - Update primary CTA to WhatsApp (Task 4)
   - Update secondary CTA to WhatsApp (Task 5)
   - Quick validation: Click links

3. **Visual Verification** (Tasks 6-7)
   - Verify animation improvements (Task 6)
   - Verify spacing adjustments (Task 7)

4. **Functional Testing** (Task 8)
   - Test WhatsApp links on desktop
   - Test WhatsApp links on mobile

5. **Final Validation** (Task 9)
   - Responsive testing across breakpoints
   - Cross-browser compatibility
   - Final sign-off

---

## Testing Strategy

### Unit Testing
**Not Applicable**: Pure CSS changes, no JavaScript logic

### Visual Regression Testing

**Approach**: Manual comparison

**Baseline**: Figma screenshot (already captured via MCP)

**Test Checklist**:
- [ ] Logo typography matches
- [ ] Hero title size/weight/spacing matches
- [ ] Hero subtitle color/size matches
- [ ] Feature pills styling matches
- [ ] Icon sizes exact (use DevTools measure)
- [ ] CTA buttons styling matches
- [ ] Disclaimer typography matches

**Tools**:
- Browser DevTools (Inspect Element, Measure)
- Figma Dev Mode (compare values)
- Screenshot overlay (if available)

### Responsive Testing

**Devices** (simulated):
- iPhone SE (375px)
- iPad (768px)
- MacBook (1440px)
- Large desktop (1920px)

**Test Cases**:
```
✓ 480px: Hero title stacks vertically
✓ 768px: Feature pills wrap appropriately
✓ 1024px: Standard laptop view
✓ 1440px: Full desktop layout
```

### Cross-Browser Testing

**Matrix**:
| Browser | Version | Priority | Tester |
|---------|---------|----------|--------|
| Chrome | Latest | P0 | DevTools |
| Edge | Latest | P0 | DevTools |
| Firefox | Latest | P1 | Manual |
| Safari | Latest | P2 | Manual (if available) |

**Font Rendering Notes**:
- Font weights may render slightly differently across browsers
- Accept minor anti-aliasing differences
- Ensure weights are clearly distinguishable (300 vs 400 vs 600)

---

## Rollout Plan

### Pre-Deployment Checklist
- [ ] All 8 tasks completed
- [ ] Visual regression testing passed
- [ ] Responsive testing passed (4 breakpoints)
- [ ] Cross-browser testing passed (Chrome, Firefox minimum)
- [ ] CSS validation passed
- [ ] Code review completed (self-review acceptable)
- [ ] Git commit prepared with detailed message

### Deployment Steps

**Step 1: Commit Changes**
```bash
git add videos/ styles/main.css index.html
git commit -m "feat: integra vídeo background local e ajusta tipografia hero

- Cria diretório videos/ e adiciona background-hero.mp4
- Atualiza source path do vídeo de placeholder para caminho relativo
- Adiciona atributos de acessibilidade (preload, aria-hidden)
- Muda hero subtitle font-weight de 400 para 300 (Light)
- Adiciona font-smoothing para renderização otimizada em macOS
- Implementa suporte a prefers-reduced-motion
- Verifica cores do Figma node 2019-47 (já implementadas)

Testes: Chrome, Firefox em 480px, 768px, 1024px, 1440px
Acessibilidade: WCAG AAA (17.96:1 contrast), reduced motion
Vídeo fonte: C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Step 2: Deploy**
- For static hosting: Upload modified files
- For local development: Changes immediately visible on refresh

**Step 3: Post-Deployment Verification**
- [ ] Production site loads correctly
- [ ] No console errors
- [ ] Visual spot-check matches testing

### Rollback Plan

**Scenario 1: Visual regression detected**
```bash
git revert HEAD
# or
git reset --hard HEAD~1 (if not pushed)
```

**Scenario 2: CSS syntax error**
- Fix inline (changes are small and isolated)
- Re-test and commit fix

**Risk**: 🟢 LOW - Changes are non-breaking, additive refinements

---

## Success Metrics

### Acceptance Criteria (from spec.md)

✅ **AC-1: Typography**
- [ ] All font weights correspond exactly to Figma
- [ ] Font-variation-settings addressed (N/A for standard fonts)

✅ **AC-2: Colors**
- [ ] All Figma hex values implemented
- [ ] All colors use CSS variables

✅ **AC-3: Icons**
- [ ] Feature pill icons have exact Figma dimensions
- [ ] Proportions maintained across breakpoints

✅ **AC-4: Spacing**
- [ ] Gaps and padding match design system
- [ ] CSS variables used consistently

✅ **AC-5: Visual Regression**
- [ ] Layout intact at all breakpoints
- [ ] Alignments preserved
- [ ] Visual hierarchy maintained

### Definition of Done

**Code Complete**:
- All 8 implementation tasks finished
- No hardcoded values in main.css (colors, spacing)
- All typography has explicit font-weight

**Testing Complete**:
- Visual regression testing passed
- 4 responsive breakpoints verified
- 2+ browsers tested

**Documentation Complete**:
- Git commit message descriptive
- This plan.md reflects actual implementation

**Deployment Complete**:
- Changes committed to master branch
- Site accessible and functional
- No console errors

---

## Appendix

### A. File Change Summary

| File | Lines Changed | Risk | Testing Priority |
|------|---------------|------|------------------|
| styles/variables.css | +10 | Low | P2 (syntax check) |
| styles/main.css | +20-30 | Low | P0 (visual regression) |
| index.html | +3 | Low | P1 (icon rendering) |

**Total Impact**: ~40 lines across 3 files

### B. Design Token Reference

**Complete Token List** (post-implementation):

```css
/* Colors */
--color-zinc-100: #f4f4f5;
--color-zinc-200: #e4e4e7;
--color-zinc-300: #d4d4d8;
--color-zinc-500: #71717a;
--color-zinc-600: #52525b;
--color-black: #000000;
--color-white: #ffffff;
--color-primary: #74d200;
--color-primary-dark: #5fb300;

/* Spacing */
--space-8: 8px;
--space-10: 10px;
--space-16: 16px;
--space-32: 32px;
--space-40: 40px;
--space-80: 80px;
--page-padding: 64px;

/* Typography */
--font-size-xs: 12px;
--font-size-m: 16px;
--font-size-regular: 16px;
--font-size-medium: 18px;
--font-size-8xl: 128px;
--font-size-logo: 19.034px;

--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;

/* Font Families */
--font-jetbrains: 'JetBrains Mono', monospace;
--font-inter: 'Inter', sans-serif;
--font-share-tech: 'Share Tech Mono', monospace;
--font-roboto: 'Roboto', sans-serif;

/* Effects */
--video-opacity: 0.2;
```

### C. Figma Node Reference

**Design Source**: https://www.figma.com/design/ztyeKTFgyJJT6nnpXyyM2i/claude_code?node-id=2014-191

**Extracted via**: Figma MCP Server (`mcp__figma__get_design_context`)

**Screenshot**: Captured via `mcp__figma__get_screenshot`

---

## Plan Metadata

**Plan Version**: 3.0 (Updated for animation fixes & CTA links)
**Created**: 2025-10-27 (Updated)
**Feature Branch**: master (direct commit)
**Estimated Effort**: 30 minutes (~0.5 hours)
**Risk Level**: 🟢 LOW
**Status**: ✅ READY FOR IMPLEMENTATION

**Changes from v2.0**:
- Focus shifted to animation refinements and link updates
- 5 implementation tasks + 4 verification tasks
- Remove scale transforms from feature pills (fix "grow size" issue)
- Add 18px margin below "Funciona com" label
- Remove cursor pointer from non-interactive pills
- Connect CTA buttons to real WhatsApp numbers
- Preserve existing scroll reveals and button animations

**User Requirements**:
1. Remove scale animation from feature pills (they have a "grow size" that shouldn't happen)
2. Add 18px margin below "Funciona com:" text
3. Remove pointer cursor from feature pills
4. Primary CTA → https://wa.me/5519953330043?text=Opa!
5. Secondary CTA → https://wa.me/5519995492389?text=Vim%20do%20web_agent%20quero%20adicionar%20meu%20n%C3%BAmero%20na%20lista%2Fpreciso%20de%20ajuda!

**Next Steps**:
1. ✅ Read this plan
2. ⏭️ Execute Tasks 1-5 (CSS & HTML updates)
3. ⏭️ Execute Tasks 6-8 (Visual & functional verification)
4. ⏭️ Execute Task 9 (Responsive testing)
5. ✅ Commit changes with descriptive message

---

**End of Implementation Plan**
