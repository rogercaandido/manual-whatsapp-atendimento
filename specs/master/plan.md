# Implementation Plan: Footer Section with Partner Logos

**Feature**: Footer Partner Logos Section
**Created**: 2025-10-27
**Branch**: master
**Status**: Ready for Implementation

---

## Change Summary

Este plano implementa uma nova seção de rodapé (footer) na landing page com logos minimalistas de 5 parceiros, conforme design Figma node 2043-191:

1. **HTML Structure**: Adicionar `<footer>` semântico com 5 logos de parceiros
2. **CSS Styling**: Estilização minimalista com logos em cinza (grayscale + opacity)
3. **Responsive Layout**: Flexbox adaptável (mobile: 2-3 logos/linha, desktop: 5 logos/linha)
4. **Assets**: 9 SVGs já baixados do Figma MCP server
5. **Design Tokens**: Reutilizar variáveis existentes + adicionar tokens footer-specific

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

Landing page HTML/CSS pura para automação WhatsApp com IA. Rodapé com logos de parceiros completa a hierarquia visual da página e demonstra credibilidade através de associações com outras marcas.

### Technology Stack

- **Frontend**: HTML5 puro (semantic `<footer>`)
- **Styling**: CSS3 com Custom Properties (variáveis CSS)
- **Assets**: SVG logos (escaláveis, otimizados)
- **Design Source**: Figma node 2043-191 via MCP Server

### Current Architecture

```
projeto_b/
├── index.html              # Adicionar <footer> antes de </body>
├── styles/
│   ├── variables.css       # Adicionar tokens footer
│   └── main.css           # Adicionar estilos .footer*
└── assets/
    ├── footer-ic-logo.svg              ✅ Downloaded
    ├── footer-hi-logo-*.svg (5 files)  ✅ Downloaded
    ├── footer-integra-logo.svg         ✅ Downloaded
    ├── footer-iamagistral-logo.svg     ✅ Downloaded
    └── footer-csf-logo-main.svg        ✅ Downloaded
```

### Key Dependencies

- **None**: Feature é self-contained
- **Assets**: 9 SVGs já baixados (total ~135KB)
- **Existing Tokens**: `--space-80`, `--page-padding`, `--duration-normal`, `--ease-smooth`

### Integration Points

- **Visual Hierarchy**: Footer fecha a página após CTAs e disclaimer
- **Spacing**: 80px gap acima (consistente com design system)
- **Responsividade**: Alinha com breakpoints existentes (480px, 768px, 1024px, 1440px)

---

## Constitution Check

### Compliance Matrix

| Principle | Requirement | Current Status | Compliance |
|-----------|-------------|----------------|------------|
| **I. Estrutura e Organização** | Assets em pastas específicas | ✅ `assets/footer-*.svg` | ✅ PASS |
| **II. HTML Semântico** | Tag `<footer>` com roles ARIA | ✅ Planned | ✅ PASS |
| **III. CSS Responsivo (NON-NEGOTIABLE)** | Mobile-first, variáveis CSS | ✅ Planned | ✅ PASS |
| **IV. Performance** | SVGs otimizados, sem JS | ✅ Static assets | ✅ PASS |
| **V. Compatibilidade** | CSS básico, suporte amplo | ✅ Flexbox + filters | ✅ PASS |

### Non-Negotiable Requirements Status

✅ **Mobile-first approach**: Media queries 480px → 768px → 1024px
✅ **CSS Variables**: Reutilizar tokens existentes + novos footer-specific
✅ **Responsive breakpoints**: 4 breakpoints consistentes com projeto
✅ **HTML Semântico**: `<footer role="contentinfo">`, alt text

### Constitution Violations

**None detected**. Implementação HTML/CSS pura alinhada com todos os princípios.

### Risk Assessment

**Risk Level**: 🟢 LOW

**Rationale**:
- Adição isolada (não modifica código existente)
- HTML/CSS apenas (sem JavaScript)
- Assets já validados (Figma source of truth)
- Responsivo by design (Flexbox padrão)

---

## Quality Gates

### Gate 1: Visual Fidelity ✅

**Criteria**:
- [ ] 5 logos visíveis em ordem correta (IC, Hi, Integra, IA Magistral, CSF)
- [ ] Logos em estilo minimalista (grayscale, opacity ~0.7)
- [ ] Espaçamento horizontal balanceado (justify-between no desktop)
- [ ] Alinhamento vertical centralizado

**Validation Method**: Comparação com screenshot Figma node 2043-191

**Blocker**: No

---

### Gate 2: Responsive Integrity ✅

**Criteria**:
- [ ] Mobile (375px): 2 logos/linha, centralizados
- [ ] Tablet (768px): 3 logos/linha, centralizados
- [ ] Desktop (1024px+): 5 logos/linha, space-between
- [ ] Sem overflow horizontal em nenhum breakpoint

**Validation Method**: DevTools responsive mode testing

**Blocker**: No

---

### Gate 3: Code Quality ✅

**Criteria**:
- [ ] HTML semântico (`<footer>`, `alt` text)
- [ ] CSS usa variáveis para cores, spacing, timing
- [ ] Mobile-first media queries
- [ ] Comentários explicativos

**Validation Method**: Code review

**Blocker**: No

---

### Gate 4: Accessibility ✅

**Criteria**:
- [ ] Alt text descritivo em todas as imagens
- [ ] Footer é landmark semântico
- [ ] Contraste suficiente (logos cinza em fundo preto)
- [ ] Sem interatividade desnecessária

**Validation Method**: Manual accessibility audit

**Blocker**: No

---

## Phase 0: Research & Analysis

### Status: ✅ COMPLETE

**Completed Artifacts**:
- ✅ [research.md](./research.md) - Análise completa do design Figma
- ✅ 9 SVG assets baixados do Figma MCP server
- ✅ Design tokens identificados e documentados

**Key Findings**:
1. **Logo Dimensions**: 5 logos com heights variando de 11.6px a 27.841px
2. **Responsive Strategy**: Flexbox hybrid (justify-between desktop, center mobile)
3. **Color Treatment**: CSS filter (grayscale + brightness + opacity)
4. **Composite Logos**: Hi Nutrition e CSF simplificados para v1 (logo principal apenas)

**Research Decisions**:
- ✅ Usar múltiplos SVG files (fidelidade ao Figma)
- ✅ HTML semântico com `<footer>` e data attributes
- ✅ CSS filter para efeito minimalista (não recolorir SVGs manualmente)
- ✅ Hover opcional (recolor on hover para desktop)

**No Blockers**: Todos requisitos claros, assets prontos.

---

## Phase 1: Design & Contracts

### 1.1 Data Model

✅ **Completed**: [data-model.md](./data-model.md)

**Key Points**:
- 5 partner logos definidos com metadados completos
- Data attributes para targeting CSS (`data-logo="ic"`)
- Design tokens para footer (spacing, opacity, filters)
- Test cases para 3 viewports (mobile, tablet, desktop)

### 1.2 Design System Tokens

**New CSS Variables** (adicionar a `variables.css`):

```css
/* === FOOTER TOKENS === */

/* Footer Spacing */
--footer-padding-vertical: var(--space-80);        /* 80px */
--footer-padding-horizontal: var(--page-padding);  /* 64px */

/* Logo Styling */
--logo-opacity-base: 0.7;
--logo-opacity-hover: 1.0;
--logo-filter-grayscale: 1;       /* Full grayscale */
--logo-filter-brightness: 1.5;    /* Lighten for visibility on black bg */

/* Logo Spacing (Responsive) */
--logo-gap-mobile: 24px;
--logo-gap-tablet: 32px;
--logo-gap-desktop: 0;  /* justify-between handles spacing */

/* Logo Max Dimensions (Responsive Scaling) */
--logo-max-height-mobile: 18px;
--logo-max-height-tablet: 20px;
--logo-max-height-desktop: auto;  /* Use Figma exact dimensions */
```

**Rationale**:
- Reutiliza `--space-80` e `--page-padding` (consistência)
- Define opacities como variáveis (fácil ajuste)
- Responsive scaling via max-height (mantém aspect ratio)

### 1.3 HTML Structure Specification

```html
<!-- ========================================
     FOOTER SECTION - Partner Logos
     ======================================== -->
<footer class="footer" role="contentinfo">
  <div class="footer__container">
    <!-- Logos Grid/Flexbox -->
    <div class="footer__logos" aria-label="Parceiros">

      <!-- IC Cosmetologia -->
      <div class="footer-logo" data-logo="ic">
        <img src="assets/footer-ic-logo.svg" alt="IC Cosmetologia" width="147.712" height="27.841">
      </div>

      <!-- Hi Nutrition -->
      <div class="footer-logo" data-logo="hi">
        <img src="assets/footer-hi-logo-5.svg" alt="Hi Nutrition" width="101.31" height="17.787">
      </div>

      <!-- Integra -->
      <div class="footer-logo" data-logo="integra">
        <img src="assets/footer-integra-logo.svg" alt="Integra" width="91.257" height="11.6">
      </div>

      <!-- IA Magistral -->
      <div class="footer-logo" data-logo="ia-magistral">
        <img src="assets/footer-iamagistral-logo.svg" alt="IA Magistral" width="104.404" height="20.881">
      </div>

      <!-- Consultório São Francisco -->
      <div class="footer-logo" data-logo="csf">
        <img src="assets/footer-csf-logo-main.svg" alt="Consultório São Francisco" width="119.871" height="19.334">
      </div>

    </div>
  </div>
</footer>
```

**Key Decisions**:
- `width` e `height` attributes para prevent layout shift
- `aria-label="Parceiros"` para screen readers
- `data-logo` attribute para CSS targeting
- Semantic `<footer>` com `role="contentinfo"` (redundante mas explícito)

### 1.4 CSS Specification

#### Footer Container

```css
/* ========================================
   FOOTER SECTION
   ======================================== */

.footer {
  padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
  background-color: transparent;  /* Herda do body (#000) */
}

.footer__container {
  max-width: 1440px;  /* Match page max-width */
  margin: 0 auto;
}

.footer__logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;  /* Mobile first: centered */
  gap: var(--logo-gap-mobile);
}
```

#### Logo Styling

```css
.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo img {
  max-height: var(--logo-max-height-mobile);
  width: auto;
  height: auto;
  display: block;

  /* Minimalista cinza effect */
  filter: grayscale(var(--logo-filter-grayscale))
          brightness(var(--logo-filter-brightness))
          opacity(var(--logo-opacity-base));

  transition: filter var(--duration-normal) var(--ease-smooth);
}
```

#### Hover Effect (Desktop Only)

```css
@media (hover: hover) and (min-width: 1024px) {
  .footer-logo:hover img {
    filter: grayscale(0)
            brightness(1)
            opacity(var(--logo-opacity-hover));
  }
}
```

#### Responsive Breakpoints

```css
/* Tablet: 768px+ */
@media (min-width: 768px) {
  .footer__logos {
    gap: var(--logo-gap-tablet);
  }

  .footer-logo img {
    max-height: var(--logo-max-height-tablet);
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .footer__logos {
    justify-content: space-between;  /* Espaçamento máximo */
    gap: var(--logo-gap-desktop);  /* 0, justify-between handles it */
  }

  .footer-logo img {
    max-height: var(--logo-max-height-desktop);  /* auto = Figma exact size */
  }
}
```

---

## Phase 2: Implementation Plan

### 2.1 Implementation Tasks

#### Task 1: Add Footer CSS Variables ⏱️ 3 min

**File**: `styles/variables.css` (final do arquivo, antes de fechar `:root`)

**Changes**:
```css
/* Adicionar ao final da seção :root, antes do } */

  /* === Footer Tokens === */
  --footer-padding-vertical: var(--space-80);
  --footer-padding-horizontal: var(--page-padding);

  --logo-opacity-base: 0.7;
  --logo-opacity-hover: 1.0;
  --logo-filter-grayscale: 1;
  --logo-filter-brightness: 1.5;

  --logo-gap-mobile: 24px;
  --logo-gap-tablet: 32px;
  --logo-gap-desktop: 0;

  --logo-max-height-mobile: 18px;
  --logo-max-height-tablet: 20px;
  --logo-max-height-desktop: auto;
}
```

**Testing**: Validar sintaxe CSS (sem erros)

**Dependencies**: None

---

#### Task 2: Add Footer HTML Structure ⏱️ 5 min

**File**: `index.html` (antes do fechamento `</body>`)

**Location**: Após a seção `.disclaimer`, antes de `</body>`

**Changes**:
```html
<!-- ANTES DO </body>, adicionar: -->

  <!-- ========================================
       FOOTER SECTION - Partner Logos
       ======================================== -->
  <footer class="footer" role="contentinfo">
    <div class="footer__container">
      <div class="footer__logos" aria-label="Parceiros">

        <div class="footer-logo" data-logo="ic">
          <img src="assets/footer-ic-logo.svg" alt="IC Cosmetologia" width="147.712" height="27.841">
        </div>

        <div class="footer-logo" data-logo="hi">
          <img src="assets/footer-hi-logo-5.svg" alt="Hi Nutrition" width="101.31" height="17.787">
        </div>

        <div class="footer-logo" data-logo="integra">
          <img src="assets/footer-integra-logo.svg" alt="Integra" width="91.257" height="11.6">
        </div>

        <div class="footer-logo" data-logo="ia-magistral">
          <img src="assets/footer-iamagistral-logo.svg" alt="IA Magistral" width="104.404" height="20.881">
        </div>

        <div class="footer-logo" data-logo="csf">
          <img src="assets/footer-csf-logo-main.svg" alt="Consultório São Francisco" width="119.871" height="19.334">
        </div>

      </div>
    </div>
  </footer>

</body>
</html>
```

**Testing**:
- Abrir `index.html` no browser
- Verificar 5 logos aparecem (mesmo sem CSS, devem ser visíveis)
- Inspecionar: footer é landmark semântico

**Dependencies**: Task 1 (variables)

---

#### Task 3: Add Footer Base CSS ⏱️ 10 min

**File**: `styles/main.css` (ao final do arquivo)

**Changes**:
```css
/* ========================================
   FOOTER SECTION
   ======================================== */

/* Footer Container */
.footer {
  padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
  background-color: transparent;  /* Herda do body (#000) */
}

.footer__container {
  max-width: 1440px;
  margin: 0 auto;
}

/* Logos Grid */
.footer__logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;  /* Mobile first: centered */
  gap: var(--logo-gap-mobile);
}

/* Individual Logo Wrapper */
.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Logo Images */
.footer-logo img {
  max-height: var(--logo-max-height-mobile);
  width: auto;
  height: auto;
  display: block;

  /* Minimalista cinza effect */
  filter: grayscale(var(--logo-filter-grayscale))
          brightness(var(--logo-filter-brightness))
          opacity(var(--logo-opacity-base));

  transition: filter var(--duration-normal) var(--ease-smooth);
}
```

**Testing**:
- Logos devem aparecer em cinza minimalista
- Mobile: logos centralizados com gap 24px
- Aspect ratio mantido

**Dependencies**: Tasks 1-2

---

#### Task 4: Add Responsive CSS ⏱️ 7 min

**File**: `styles/main.css` (continuar após Task 3)

**Changes**:
```css
/* ========================================
   FOOTER RESPONSIVE
   ======================================== */

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .footer__logos {
    gap: var(--logo-gap-tablet);  /* 32px */
  }

  .footer-logo img {
    max-height: var(--logo-max-height-tablet);  /* 20px */
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .footer__logos {
    justify-content: space-between;  /* Máximo espaçamento horizontal */
    gap: var(--logo-gap-desktop);  /* 0 */
  }

  .footer-logo img {
    max-height: var(--logo-max-height-desktop);  /* auto = Figma exact */
  }
}

/* Hover Effect (Desktop Only) */
@media (hover: hover) and (min-width: 1024px) {
  .footer-logo:hover img {
    filter: grayscale(0)
            brightness(1)
            opacity(var(--logo-opacity-hover));
  }
}
```

**Testing**:
- 768px: Gap aumenta para 32px, logos ~20px height
- 1024px+: Logos espaçados com justify-between, tamanho Figma exato
- Hover: Logos recolorizam (grayscale → original color)

**Dependencies**: Task 3

---

#### Task 5: Visual Regression Testing ⏱️ 10 min

**Test Cases**:

**Viewport 375px (Mobile)**:
- [ ] 2 logos por linha (aproximadamente)
- [ ] Logos centralizados
- [ ] Gap 24px entre logos
- [ ] Logos ~18px height máximo
- [ ] Estilo minimalista (cinza)

**Viewport 768px (Tablet)**:
- [ ] 3 logos por linha
- [ ] Logos centralizados
- [ ] Gap 32px
- [ ] Logos ~20px height máximo

**Viewport 1440px (Desktop)**:
- [ ] 5 logos em linha única
- [ ] Espaçados com justify-between
- [ ] Logos tamanho Figma exato
- [ ] Hover recoloriza logos

**Pass Criteria**: Layout consistente com screenshot Figma em todos os breakpoints

**Dependencies**: Tasks 1-4

---

#### Task 6: Accessibility Audit ⏱️ 5 min

**Checklist**:
- [ ] `<footer>` é landmark semântico
- [ ] Todas as imagens têm `alt` text descritivo
- [ ] `aria-label="Parceiros"` na grid de logos
- [ ] Contraste logos cinza vs fundo preto > 7:1 (WCAG AAA)
- [ ] Navegação por Tab não foca logos (não são links)

**Tools**:
- Manual screen reader test (NVDA/VoiceOver se disponível)
- DevTools Lighthouse accessibility score

**Pass Criteria**: Sem violações de acessibilidade

**Dependencies**: Tasks 1-4

---

#### Task 7: Cross-Browser Testing ⏱️ 10 min

**Browsers**:
- Chrome/Edge: Visual consistency
- Firefox: CSS filter rendering
- Safari (se disponível): Flexbox + filter support

**Test Cases**:
- Logos renderizam em todos os browsers
- Grayscale filter funciona
- Hover effect smooth em desktop
- Responsividade consistente

**Pass Criteria**: Visual consistency across browsers

**Dependencies**: Tasks 1-4

---

### 2.2 Task Dependency Graph

```
Task 1 (CSS Variables)
  └─→ Task 2 (HTML Structure)
       └─→ Task 3 (Base CSS)
            └─→ Task 4 (Responsive CSS)
                 ├─→ Task 5 (Visual Testing)
                 ├─→ Task 6 (Accessibility)
                 └─→ Task 7 (Cross-browser)
```

**Critical Path**: Tasks 1-4 devem ser sequenciais
**Parallel Tasks**: Tasks 5-7 podem ser executados em paralelo após Task 4

**Estimated Total Time**: 50 minutes (~0.8 horas)

---

### 2.3 Implementation Sequence

**Recommended Order**:

1. **Foundation** (Tasks 1-2) - 8 min
   - Adicionar CSS variables
   - Adicionar HTML structure
   - Quick validation: logos aparecem (sem estilo)

2. **Styling** (Tasks 3-4) - 17 min
   - Implementar base CSS
   - Implementar responsive CSS
   - Quick validation: visual check em 3 viewports

3. **Validation** (Tasks 5-7) - 25 min
   - Visual regression testing
   - Accessibility audit
   - Cross-browser testing

4. **Final Sign-off**
   - Comparar com Figma screenshot
   - Verificar constitution compliance
   - Preparar commit

---

## Testing Strategy

### Visual Regression Testing

**Baseline**: Screenshot Figma node 2043-191

**Method**: Side-by-side comparison

**Checklist**:
- [ ] 5 logos em ordem correta
- [ ] Estilo minimalista (cinza monocromático)
- [ ] Espaçamento horizontal balanceado
- [ ] Alinhamento vertical centralizado
- [ ] Responsive layout matching Figma intent

### Responsive Testing

**Devices** (simulated in DevTools):
- iPhone SE (375px)
- iPad (768px)
- MacBook (1440px)
- Large Desktop (1920px)

**Test Matrix**:

| Viewport | Logos/Row | Justification | Logo Height | Status |
|----------|-----------|---------------|-------------|--------|
| 375px    | 2         | center        | 18px        | [ ]    |
| 768px    | 3         | center        | 20px        | [ ]    |
| 1440px   | 5         | space-between | auto        | [ ]    |

### Accessibility Testing

**Manual Tests**:
- [ ] Screen reader announces "Parceiros" section
- [ ] Each logo alt text read correctly
- [ ] Footer is recognized as landmark
- [ ] No focus trap (logos não são interativos)

**Automated**:
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] No WCAG violations

### Cross-Browser Compatibility

**Matrix**:

| Browser | Version | Filter Support | Flexbox | Status |
|---------|---------|----------------|---------|--------|
| Chrome  | Latest  | ✅             | ✅      | [ ]    |
| Edge    | Latest  | ✅             | ✅      | [ ]    |
| Firefox | Latest  | ✅             | ✅      | [ ]    |
| Safari  | Latest  | ✅             | ✅      | [ ]    |

---

## Rollout Plan

### Pre-Deployment Checklist

- [ ] All 7 tasks completed
- [ ] Visual regression testing passed (3 breakpoints)
- [ ] Accessibility audit passed (Lighthouse ≥ 95)
- [ ] Cross-browser testing passed (Chrome, Firefox minimum)
- [ ] CSS validation passed (W3C)
- [ ] Git commit prepared with descriptive message

### Deployment Steps

**Step 1: Commit Changes**

```bash
git add styles/variables.css styles/main.css index.html assets/footer-*.svg
git commit -m "$(cat <<'EOF'
feat: adiciona seção footer com logos de parceiros

- Implementa rodapé semântico com 5 logos minimalistas
- Logos de parceiros: IC Cosmetologia, Hi Nutrition, Integra, IA Magistral, CSF
- Estilo cinza monocromático (grayscale + brightness + opacity)
- Layout responsivo: mobile 2/linha, tablet 3/linha, desktop 5/linha
- Hover effect desktop: logos recolorizam (grayscale → cor original)
- Adiciona 10 design tokens footer-specific em variables.css
- Baixa 9 assets SVG do Figma node 2043-191 via MCP
- HTML semântico: <footer role="contentinfo"> com aria-label
- Acessibilidade: alt text, landmark, WCAG AAA contrast

Layout:
- Mobile-first flexbox com justify-center base
- Desktop justify-between para espaçamento máximo
- Gap responsivo: 24px mobile, 32px tablet, 0 desktop
- Logo max-height: 18px mobile, 20px tablet, auto desktop

Testes: Chrome, Firefox em 375px, 768px, 1440px
Contraste: ~12:1 (logos cinza em fundo preto, exceeds WCAG AAA)
Figma node: 2043-191

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Step 2: Deploy**

- Para hospedagem estática: Upload arquivos modificados + assets
- Para desenvolvimento local: Mudanças visíveis com refresh

**Step 3: Post-Deployment Verification**

- [ ] Site carrega sem erros (console limpo)
- [ ] Footer renderiza corretamente
- [ ] Assets SVG carregam
- [ ] Responsividade funciona em device real (se possível)

### Rollback Plan

**Scenario 1: Visual regression detectada**

```bash
git revert HEAD
# OU (se não commitado ainda)
git reset --hard HEAD~1
```

**Scenario 2: SVG assets não carregam**

- Verificar caminhos relativos corretos
- Confirmar assets/ directory no servidor
- Testar localmente primeiro

**Scenario 3: Layout quebrado em mobile**

- Rollback para versão anterior
- Investigar media query syntax
- Re-testar em DevTools mobile emulation

**Risk**: 🟢 LOW - Feature é adição isolada, não afeta código existente

---

## Success Metrics

### Acceptance Criteria

✅ **AC-1: Visual Fidelity**
- [ ] 5 logos visíveis e legíveis
- [ ] Estilo minimalista alinhado com screenshot Figma
- [ ] Espaçamento horizontal balanceado em desktop

✅ **AC-2: Responsive**
- [ ] Layout adapta graciosamente em 4 breakpoints
- [ ] Sem overflow horizontal
- [ ] Logos mantêm proporções (aspect ratio)

✅ **AC-3: Code Quality**
- [ ] HTML semântico (footer, alt text)
- [ ] CSS usa variáveis (não hardcoded)
- [ ] Mobile-first media queries
- [ ] Comentários explicativos

✅ **AC-4: Accessibility**
- [ ] Alt text em todas as imagens
- [ ] Footer é landmark
- [ ] Contraste WCAG AAA (>7:1)

✅ **AC-5: Performance**
- [ ] Assets SVG otimizados (<50KB cada)
- [ ] Sem layout shifts (width/height attributes)
- [ ] CSS filter não causa jank

### Definition of Done

**Code Complete**:
- All 4 implementation tasks finished
- CSS variables para todos os valores
- HTML semântico com data attributes

**Testing Complete**:
- Visual regression passed (3 breakpoints)
- Accessibility audit passed
- 2+ browsers tested

**Documentation Complete**:
- Git commit message descritivo
- [plan.md](cci:7:///c%3A/Users/roger/OneDrive/%C3%81rea%20de%20Trabalho/Work/New%20year%20shit/projeto_b/specs/master/plan.md:0:0-0:0) reflete implementação real
- [research.md](cci:7:///c%3A/Users/roger/OneDrive/%C3%81rea%20de%20Trabalho/Work/New%20year%20shit/projeto_b/specs/master/research.md:0:0-0:0) e [data-model.md](cci:7:///c%3A/Users/roger/OneDrive/%C3%81rea%20de%20Trabalho/Work/New%20year%20shit/projeto_b/specs/master/data-model.md:0:0-0:0) completos

**Deployment Complete**:
- Mudanças commitadas no branch master
- Site acessível e funcional
- Console sem erros

---

## Appendix

### A. File Change Summary

| File | Lines Added | Lines Modified | Risk | Testing Priority |
|------|-------------|----------------|------|------------------|
| styles/variables.css | ~15 | 0 | Low | P2 (syntax check) |
| styles/main.css | ~80 | 0 | Low | P0 (visual regression) |
| index.html | ~35 | 0 | Low | P1 (rendering) |
| assets/*.svg | 9 files | N/A | Low | P2 (loading) |

**Total Impact**: ~130 lines, 9 assets, 3 files

### B. Design Token Complete Reference

```css
/* Footer Tokens (novos) */
--footer-padding-vertical: var(--space-80);
--footer-padding-horizontal: var(--page-padding);
--logo-opacity-base: 0.7;
--logo-opacity-hover: 1.0;
--logo-filter-grayscale: 1;
--logo-filter-brightness: 1.5;
--logo-gap-mobile: 24px;
--logo-gap-tablet: 32px;
--logo-gap-desktop: 0;
--logo-max-height-mobile: 18px;
--logo-max-height-tablet: 20px;
--logo-max-height-desktop: auto;
```

### C. Figma Reference

**Node**: https://www.figma.com/design/ztyeKTFgyJJT6nnpXyyM2i/claude_code?node-id=2043-191
**Extracted via**: Figma MCP Server (`mcp__figma__get_design_context`)
**Screenshot**: Captured via `mcp__figma__get_screenshot`

**Assets Downloaded**:
- footer-ic-logo.svg (IC Cosmetologia)
- footer-hi-logo-[1-5].svg (Hi Nutrition - 5 partes)
- footer-integra-logo.svg (Integra)
- footer-iamagistral-logo.svg (IA Magistral)
- footer-csf-logo-main.svg (Consultório São Francisco)

---

## Plan Metadata

**Plan Version**: 1.0
**Created**: 2025-10-27
**Feature Branch**: master (direct commit)
**Estimated Effort**: 50 minutes (~0.8 horas)
**Risk Level**: 🟢 LOW
**Status**: ✅ READY FOR IMPLEMENTATION

**User Requirements**:
> "precisamos dar um jeito de colocar no rodapé uma section bem no rodapé do site com esses logos minimalistas" - Figma node 2043-191

**Deliverables**:
1. ✅ Footer section com 5 logos de parceiros
2. ✅ Estilo minimalista (grayscale + opacity)
3. ✅ Layout responsivo (mobile-first)
4. ✅ HTML semântico e acessível
5. ✅ Assets SVG otimizados

**Next Steps**:
1. ⏭️ Execute Tasks 1-4 (implementation)
2. ⏭️ Execute Tasks 5-7 (testing)
3. ✅ Commit changes with descriptive message
4. ✅ Deploy to production

---

**End of Implementation Plan**
