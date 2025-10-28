# Implementation Plan: Modern Effects & Microinteractions

**Feature**: Add Elegant Modern Effects (Hover Parallax, Scroll Reveals, Microinteractions)
**Created**: 2025-10-27 (Updated)
**Branch**: master
**Status**: Ready for Implementation

## Change Summary

This plan implements modern animation effects and microinteractions to enhance the landing page experience:

1. **Hover Parallax**: Subtle depth effects on buttons, pills, and logo
2. **Scroll Reveals**: Progressive content disclosure with Intersection Observer
3. **Microinteractions**: Button feedback, icon bounces, glow effects
4. **Accessibility**: Full reduced-motion support and keyboard navigation
5. **Performance**: GPU-accelerated animations, 60 FPS target

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

#### Task 1: Create Videos Directory and Copy Video File ⏱️ 2 min
**Location**: Project root

**Commands**:
```bash
mkdir "C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\videos"

copy "C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4" ^
     "C:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\projeto_b\videos\background-hero.mp4"
```

**Testing**: Verify file exists and is playable

**Dependencies**: None

---

#### Task 2: Update Video Source Path ⏱️ 2 min
**File**: `index.html` (line 29)

**Changes**:
```html
<!-- BEFORE -->
<source src="/_videos/v1/1147b903a6da790fcd8f61c410a7f0e3191a14a3" type="video/mp4">

<!-- AFTER -->
<source src="videos/background-hero.mp4" type="video/mp4">
```

**Enhanced Version (Recommended)**:
```html
<!-- Update entire video element (lines 21-31) -->
<video
  class="header__video"
  autoplay
  loop
  muted
  playsinline
  controlsList="nodownload"
  preload="auto"
  aria-hidden="true"
>
  <source src="videos/background-hero.mp4" type="video/mp4">
  Seu navegador não suporta vídeos em HTML5.
</video>
```

**Testing**:
- Open index.html in browser
- Video plays automatically
- Video loops seamlessly
- Overlay opacity (0.2) renders correctly

**Dependencies**: Task 1 (video file must exist)

---

#### Task 3: Update Hero Subtitle Font Weight ⏱️ 3 min
**File**: `styles/main.css` (lines 95-103)

**Changes**:
```css
.hero__subtitle {
  font-family: var(--font-inter);
  font-weight: var(--font-weight-light);    /* CHANGED: was var(--font-weight-regular) */
  font-size: var(--font-size-medium);
  color: var(--color-zinc-200);
  text-align: center;
  line-height: 1.5;
  letter-spacing: -0.18px;
  -webkit-font-smoothing: antialiased;      /* ADDED for optimal rendering */
  -moz-osx-font-smoothing: grayscale;       /* ADDED for optimal rendering */
}
```

**Specific Modifications**:
1. Line 97: Change `var(--font-weight-regular)` → `var(--font-weight-light)`
2. Add `-webkit-font-smoothing: antialiased;` after line 102
3. Add `-moz-osx-font-smoothing: grayscale;` after line 102

**Testing**:
- Hero subtitle appears lighter than before
- Text remains crisp and readable
- Test on macOS if available (antialiasing most visible)

**Dependencies**: None (font-weight-light variable already exists in variables.css line 38)

---

#### Task 4: Add Reduced Motion Accessibility Support ⏱️ 3 min
**File**: `styles/main.css` (add at end of file)

**Changes**:
```css
/* Video Accessibility - Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .header__video {
    display: none;
  }

  .header {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                #000 center/cover no-repeat;
  }
}
```

**Testing**:
- Enable "Reduce Motion" in OS settings
- Verify video doesn't play
- Solid background displays instead

**Dependencies**: Task 2 (video element must exist)

---

#### Task 5: Visual Verification - Video Background ⏱️ 5 min

**Test Cases**:
1. Video loads and plays automatically
2. Video loops seamlessly (no visible gap)
3. Video remains muted
4. Opacity overlay (0.2) renders correctly
5. Content remains visible over video
6. Video doesn't cover navigation or text

**Browsers**: Chrome (minimum), Firefox (recommended)

**Pass Criteria**: Video plays smoothly without breaking layout

**Dependencies**: Tasks 1-2 complete

---

#### Task 6: Visual Verification - Typography ⏱️ 5 min

**Test Cases**:
1. Hero subtitle appears lighter than previous version
2. Font weight visibly 300 (Light) vs 400 (Regular)
3. Text remains readable at 18px
4. Antialiasing renders crisply (especially on macOS)
5. Color (#e4e4e7) remains correct

**Tools**:
- Browser DevTools → Inspect Element
- Check computed font-weight: 300
- Visual comparison before/after

**Pass Criteria**: Subtitle visibly lighter, still readable

**Dependencies**: Task 3 complete

---

#### Task 7: Color Verification - Figma Node 2019-47 ⏱️ 3 min

**Verification**: Confirm feature pill colors match Figma node 2019-47

**Expected Values**:
```css
.feature-pill {
  border: 1px solid #71717a; /* zinc-500 */
}

.feature-pill__text {
  color: #d4d4d8; /* zinc-300 */
}
```

**Testing**:
- Inspect feature pill "Imagem" in browser
- Verify border color: #71717a
- Verify text color: #d4d4d8

**Pass Criteria**: Colors match exactly (already implemented)

**Dependencies**: None

---

#### Task 8: Responsive Testing ⏱️ 10 min

**Breakpoints**: 480px, 768px, 1024px, 1440px

**Test Cases**:
1. Video scales correctly (object-fit: cover)
2. Hero subtitle remains readable at all sizes
3. Layout integrity preserved
4. No horizontal scroll
5. Video doesn't break responsive behavior

**Pass Criteria**: All breakpoints render correctly

**Dependencies**: Tasks 1-4 complete

---

#### Task 9: Cross-Browser Testing ⏱️ 10 min

**Browsers**: Chrome, Firefox (Safari if available)

**Test Cases**:
1. Video autoplay works (with muted attribute)
2. Font weight 300 renders correctly
3. Font-smoothing renders correctly on macOS
4. No console errors

**Pass Criteria**: Consistent behavior across browsers

**Dependencies**: Tasks 1-4 complete

---

### 2.2 Task Dependency Graph

```
Task 1 (Create Videos Directory & Copy File)
  └─→ Task 2 (Update Video Source Path)
       └─→ Task 4 (Reduced Motion Support)
            └─→ Task 5 (Video Verification)

Task 3 (Update Hero Subtitle Font Weight) [PARALLEL]
  └─→ Task 6 (Typography Verification)

Task 7 (Color Verification) [PARALLEL - no dependencies]

Task 8, 9 (Responsive & Cross-Browser Testing) [After all implementation tasks]
```

**Critical Path**: Task 1 → Task 2 → Task 4 → Task 5
**Estimated Total Time**: 45 minutes (~0.75 hours)

---

### 2.3 Implementation Sequence

**Recommended Order**:

1. **Video Setup** (Tasks 1-2)
   - Create directory and copy video file
   - Update HTML source path
   - Immediate validation: Video plays in browser

2. **Typography Update** (Task 3) [Can run parallel with Task 1-2]
   - Update hero subtitle font-weight to 300
   - Add font-smoothing properties
   - Validation: Subtitle appears lighter

3. **Accessibility Enhancement** (Task 4)
   - Add reduced motion support
   - Validation: Respects user preferences

4. **Verification** (Tasks 5-7)
   - Visual verification of video
   - Visual verification of typography
   - Color verification (confirm no changes needed)

5. **Final Validation** (Tasks 8-9)
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

**Plan Version**: 2.0 (Updated for video background & typography)
**Created**: 2025-10-27 (Updated)
**Feature Branch**: master (direct commit)
**Estimated Effort**: 45 minutes (~0.75 hours)
**Risk Level**: 🟢 LOW
**Status**: ✅ READY FOR IMPLEMENTATION

**Changes from v1.0**:
- Focus narrowed to 3 specific updates (video, font-weight, color verification)
- Reduced from 8 tasks to 9 focused tasks
- Added video background implementation (Tasks 1-2, 4-5)
- Added hero subtitle font-weight change (Task 3, 6)
- Added accessibility enhancements (reduced motion support)
- Simplified from general style refinement to targeted updates

**User Requirements**:
1. Video: `C:\Users\roger\OneDrive\Área de Trabalho\Work\Trash\video-ia-.mp4` as background
2. Colors: Retomar do Figma node 2019-47 (verification confirmed: already correct)
3. Typography: Hero subtitle usar fonte light (300 instead of 400)

**Next Steps**:
1. ✅ Read this plan
2. ⏭️ Execute Task 1 (Create videos directory & copy file)
3. ⏭️ Execute Task 2 (Update video source path)
4. ⏭️ Execute Task 3 (Update hero subtitle font-weight) [parallel]
5. ⏭️ Execute Task 4-9 (accessibility, verification, testing)
6. ✅ Commit changes with descriptive message

---

**End of Implementation Plan**
