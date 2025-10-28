# Data Model: Footer Section with Partner Logos

**Feature**: Footer Partner Logos Section
**Created**: 2025-10-27
**Status**: Complete

---

## Overview

Esta feature não possui um data model tradicional (sem entidades de banco de dados ou state management). O documento descreve a estrutura de configuração dos logos de parceiros para fácil manutenção futura.

---

## Logo Configuration Schema

### Partner Logo Entity

**Purpose**: Define os metadados de cada logo de parceiro para referência e documentação

```typescript
interface PartnerLogo {
  id: string;              // Identificador único (kebab-case)
  name: string;            // Nome completo da empresa
  dimensions: {
    width: number;         // Largura em pixels (Figma spec)
    height: number;        // Altura em pixels (Figma spec)
    aspectRatio: number;   // Proporção calculada
  };
  assets: {
    primary: string;       // Caminho para SVG principal
    composite?: string[];  // Caminhos opcionais para partes compostas
  };
  metadata: {
    figmaNode: string;     // Node ID no Figma
    isComposite: boolean;  // Se tem múltiplas partes
    displayOrder: number;  // Ordem de exibição (1-5)
  };
}
```

### Logo Collection

```typescript
const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: "ic-cosmetologia",
    name: "IC Cosmetologia",
    dimensions: {
      width: 147.712,
      height: 27.841,
      aspectRatio: 5.3
    },
    assets: {
      primary: "assets/footer-ic-logo.svg"
    },
    metadata: {
      figmaNode: "I2043:193;1906:438",
      isComposite: false,
      displayOrder: 1
    }
  },
  {
    id: "hi-nutrition",
    name: "Hi Nutrition",
    dimensions: {
      width: 101.31,
      height: 17.787,
      aspectRatio: 5.7
    },
    assets: {
      primary: "assets/footer-hi-logo-5.svg",
      composite: [
        "assets/footer-hi-logo-1.svg",
        "assets/footer-hi-logo-2.svg",
        "assets/footer-hi-logo-3.svg",
        "assets/footer-hi-logo-4.svg",
        "assets/footer-hi-logo-5.svg"
      ]
    },
    metadata: {
      figmaNode: "I2043:195",
      isComposite: true,
      displayOrder: 2
    }
  },
  {
    id: "integra",
    name: "Integra",
    dimensions: {
      width: 91.257,
      height: 11.6,
      aspectRatio: 7.9
    },
    assets: {
      primary: "assets/footer-integra-logo.svg"
    },
    metadata: {
      figmaNode: "I2043:196;1906:516",
      isComposite: false,
      displayOrder: 3
    }
  },
  {
    id: "ia-magistral",
    name: "IA Magistral",
    dimensions: {
      width: 104.404,
      height: 20.881,
      aspectRatio: 5.0
    },
    assets: {
      primary: "assets/footer-iamagistral-logo.svg"
    },
    metadata: {
      figmaNode: "I2043:197;1906:472",
      isComposite: false,
      displayOrder: 4
    }
  },
  {
    id: "csf",
    name: "Consultório São Francisco",
    dimensions: {
      width: 119.871,
      height: 19.334,
      aspectRatio: 6.2
    },
    assets: {
      primary: "assets/footer-csf-logo-main.svg",
      composite: [
        "assets/footer-csf-logo-main.svg"
        // Additional composite parts available but not used in v1
      ]
    },
    metadata: {
      figmaNode: "I2043:198;1906:540",
      isComposite: true,
      displayOrder: 5
    }
  }
];
```

---

## HTML Data Attributes

### data-logo Attribute

**Purpose**: Identificar o logo para estilização específica via CSS

**Values**: `"ic"`, `"hi"`, `"integra"`, `"ia-magistral"`, `"csf"`

**Usage**:
```html
<div class="footer-logo" data-logo="ic">
  <img src="assets/footer-ic-logo.svg" alt="IC Cosmetologia">
</div>
```

**CSS Targeting**:
```css
/* Estilização específica por logo se necessário */
.footer-logo[data-logo="ic"] {
  /* Styles específicos para IC Cosmetologia */
}
```

---

## CSS Custom Properties for Footer

### Design Tokens

```css
:root {
  /* Footer Spacing */
  --footer-padding-vertical: var(--space-80);  /* 80px */
  --footer-padding-horizontal: var(--page-padding);  /* 64px */

  /* Logo Styling */
  --logo-opacity-base: 0.7;
  --logo-opacity-hover: 1.0;
  --logo-filter-grayscale: 1;  /* Full grayscale */
  --logo-filter-brightness: 1.5;  /* Lighten for visibility */

  /* Logo Spacing (Responsive) */
  --logo-gap-mobile: 24px;
  --logo-gap-tablet: 32px;
  --logo-gap-desktop: 0;  /* justify-between handles spacing */

  /* Logo Max Dimensions (Responsive Scaling) */
  --logo-max-height-mobile: 18px;
  --logo-max-height-tablet: 20px;
  --logo-max-height-desktop: auto;  /* Use Figma exact dimensions */
}
```

---

## State Management

**Not Applicable**: Esta feature é 100% estática. Sem state, sem interatividade JavaScript.

### Future Considerations

Se a feature evoluir para incluir:
- **Links clicáveis**: Adicionar campo `url: string` ao schema
- **Analytics tracking**: Adicionar campo `trackingId: string`
- **Dynamic loading**: Converter para JSON config file
- **CMS integration**: API endpoint para buscar logos

---

## Validation Rules

### Logo Asset Requirements

1. **File Format**: SVG apenas (escalável, pequeno)
2. **Max File Size**: 50KB por SVG (ideal <20KB)
3. **Viewbox**: Deve ter `viewBox` definido para escalabilidade
4. **Accessibility**: Nenhum texto embutido (usar alt text HTML)

### Dimensions Constraints

```typescript
interface DimensionConstraints {
  maxWidth: 150;   // Pixels (maior logo: IC 147.712px)
  maxHeight: 30;   // Pixels (maior logo: IC 27.841px)
  minAspectRatio: 4.0;  // Mínimo horizontal (prevenir logos verticais)
}
```

---

## Migration Path

### Adding a New Partner Logo

**Steps**:
1. Obter SVG do logo do parceiro (ou extrair do Figma)
2. Otimizar SVG (remover metadata desnecessário)
3. Salvar em `assets/footer-{partner-slug}-logo.svg`
4. Adicionar entrada ao array `PARTNER_LOGOS` (documentação)
5. Adicionar HTML em `index.html` na seção `.footer__logos`
6. Testar responsividade em 4 breakpoints

**Example HTML**:
```html
<div class="footer-logo" data-logo="new-partner">
  <img src="assets/footer-new-partner-logo.svg" alt="New Partner Name">
</div>
```

### Removing a Partner Logo

**Steps**:
1. Remover elemento HTML do `index.html`
2. (Opcional) Deletar arquivo SVG de `assets/`
3. Atualizar documentação `PARTNER_LOGOS`
4. Re-testar layout responsivo (logos remanescentes)

---

## API Contract (None)

Esta feature não consome nem expõe APIs. É 100% markup estático.

---

## Performance Considerations

### Asset Loading

**Strategy**: Eager loading (logos são visíveis "above the fold" em mobile)

**Optimization**:
- SVGs são inline-cacheable
- Total estimated size: 9 SVGs × ~15KB = ~135KB
- Gzip compression reduces to ~40KB
- HTTP/2 multiplexing minimizes waterfall

### Rendering Performance

**Layout Shifts**: None (dimensions fixed per Figma)

**Paint Cost**: Low (flat SVG graphics, no gradients)

**Composite Cost**: Minimal (CSS filter on static images)

---

## Accessibility Model

### ARIA Attributes

**Not Required**: Logos are decorative, `alt` text sufficient

### Semantic HTML

```html
<footer class="footer" role="contentinfo">
  <!-- role="contentinfo" auto-implied by <footer>, explicit for clarity -->
  <div class="footer__logos" aria-label="Parceiros">
    <!-- aria-label describes the section purpose -->
    <div class="footer-logo">
      <img src="..." alt="IC Cosmetologia">
      <!-- alt provides screen reader context -->
    </div>
  </div>
</footer>
```

### Keyboard Navigation

**Not Applicable**: Logos não são interativos (sem links, sem botões)

### Color Contrast

**WCAG Compliance**: AAA
- Logos cinza (`filter: grayscale(1) brightness(1.5)`) em fundo preto
- Estimativa de contraste: ~12:1 (exceeds WCAG AAA 7:1)

---

## Testing Data

### Test Cases

```typescript
interface FooterTestCase {
  id: string;
  description: string;
  viewport: { width: number; height: number };
  expectedLayout: {
    logosPerRow: number;
    justification: "center" | "space-between";
    logoMaxHeight: number;
  };
}

const FOOTER_TEST_CASES: FooterTestCase[] = [
  {
    id: "mobile-small",
    description: "iPhone SE viewport",
    viewport: { width: 375, height: 667 },
    expectedLayout: {
      logosPerRow: 2,
      justification: "center",
      logoMaxHeight: 18
    }
  },
  {
    id: "tablet",
    description: "iPad viewport",
    viewport: { width: 768, height: 1024 },
    expectedLayout: {
      logosPerRow: 3,
      justification: "center",
      logoMaxHeight: 20
    }
  },
  {
    id: "desktop",
    description: "MacBook viewport",
    viewport: { width: 1440, height: 900 },
    expectedLayout: {
      logosPerRow: 5,
      justification: "space-between",
      logoMaxHeight: null  // Use Figma exact dimensions
    }
  }
];
```

---

## Version History

**v1.0** (2025-10-27):
- Initial data model
- 5 partner logos defined
- Static implementation (no links)
- Decorative display only

**Future Versions**:
- v1.1: Add partner links (if URLs provided)
- v1.2: Add hover tooltips with partner descriptions
- v2.0: Convert to JSON config for CMS integration

---

**Document Version**: 1.0
**Created**: 2025-10-27
**Next Document**: Quickstart Guide (quickstart.md)
