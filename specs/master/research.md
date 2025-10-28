# Research: Footer Section with Partner Logos

**Feature**: Footer Section with Minimalist Partner Logos
**Created**: 2025-10-27
**Status**: Complete

---

## Executive Summary

Implementação de seção de rodapé com logos de parceiros em estilo minimalista, extraídos do Figma node 2043-191. A seção apresenta 5 logos de empresas parceiras (IC Cosmetologia, Hi Nutrition, Integra, IA Magistral, Consultório São Francisco) com layout responsivo e alinhamento horizontal.

---

## Design Analysis

### Figma Specifications (Node 2043-191)

**Container**:
- Layout: Flexbox horizontal com `justify-between`
- Altura: Dinâmica (baseada nos logos)
- Alinhamento: `items-center` (centralização vertical)
- Wrap: `flex-wrap` (quebra em telas pequenas)

**Logo Dimensions** (extracted from Figma):

1. **IC Cosmetologia**
   - Width: 147.712px
   - Height: 27.841px
   - Aspect Ratio: ~5.3:1

2. **Hi Nutrition**
   - Width: 101.31px
   - Height: 17.787px
   - Aspect Ratio: ~5.7:1
   - Note: Logo composto de 5 partes SVG sobrepostas

3. **Integra**
   - Width: 91.257px
   - Height: 11.6px
   - Aspect Ratio: ~7.9:1

4. **IA Magistral**
   - Width: 104.404px
   - Height: 20.881px
   - Aspect Ratio: ~5:1

5. **Consultório São Francisco (CSF)**
   - Width: 119.871px
   - Height: 19.334px
   - Aspect Ratio: ~6.2:1
   - Note: Logo composto de múltiplas partes SVG

### Visual Design Tokens

**Spacing**:
- Between logos: `justify-between` (espaçamento automático máximo)
- Section padding: 64px (var(--page-padding)) - seguir padrão existente
- Vertical margin: 80px acima (var(--space-80)) - consistente com outros gaps

**Colors**:
- Background: Transparente (herda do body preto)
- Logos: Monocromático (cinza claro) - aparentam ser var(--color-zinc-400) ou similar
- Opacity: ~0.6-0.8 (para efeito minimalista)

**Responsive Behavior**:
- Desktop (1440px+): 5 logos em linha única
- Tablet (768px-1024px): 5 logos com quebra se necessário
- Mobile (480px-768px): 2-3 logos por linha
- Mobile small (<480px): 1-2 logos por linha, centralizados

---

## Technical Decisions

### Decision 1: Logo Asset Strategy

**Options Evaluated**:
1. **Multiple SVG files** (current Figma export)
   - Pros: Máxima fidelidade ao design original
   - Cons: 9+ arquivos SVG, complexidade de posicionamento

2. **Single merged SVG per logo**
   - Pros: Simplificação, 5 arquivos apenas
   - Cons: Perda de controle granular (não necessário aqui)

3. **Inline SVG in HTML**
   - Pros: Sem requisições HTTP extras, fácil estilização
   - Cons: HTML mais verboso

**Decision**: **Option 1 - Multiple SVG files**

**Rationale**:
- Assets já baixados do Figma MCP server
- Mantém fidelidade pixel-perfect ao design
- Permite ajustes de opacidade/filtros individuais se necessário
- Consistente com abordagem atual do projeto (assets externos)

---

### Decision 2: HTML Structure

**Options Evaluated**:
1. **Flat structure** (div > img, img, img...)
   - Pros: Simples
   - Cons: Difícil gerenciar logos multi-parte

2. **Grouped structure** (div > div.logo-wrapper > img...)
   - Pros: Encapsulamento, fácil aplicar estilos por logo
   - Cons: DIVitis (mais elementos)

3. **Semantic footer** (footer > div.logo-grid > figure...)
   - Pros: Semântico, acessível
   - Cons: Overhead semântico para logos decorativos

**Decision**: **Option 2 - Grouped structure with semantic footer**

**Rationale**:
- `<footer>` é semântico e apropriado para rodapé
- Wrappers `.footer-logo` permitem controle individual
- Logos multi-parte (Hi Nutrition, CSF) ficam agrupados logicamente
- Alinha com Princípio II da constituição (HTML Semântico)

**Structure**:
```html
<footer class="footer">
  <div class="footer__container">
    <div class="footer__logos">
      <div class="footer-logo" data-logo="ic">
        <img src="assets/footer-ic-logo.svg" alt="IC Cosmetologia">
      </div>
      <div class="footer-logo footer-logo--composite" data-logo="hi">
        <!-- Multiple SVGs for Hi Nutrition -->
      </div>
      <!-- ... other logos ... -->
    </div>
  </div>
</footer>
```

---

### Decision 3: Responsive Strategy

**Options Evaluated**:
1. **Flexbox with wrap** (atual do Figma)
   - Pros: Natural, adaptável
   - Cons: Logos podem quebrar em posições desbalanceadas

2. **CSS Grid** (5 colunas → 3 → 2 → 1)
   - Pros: Controle preciso de layout
   - Cons: Mais complexo, pode deixar células vazias

3. **Hybrid**: Flexbox + media queries específicas
   - Pros: Flexibilidade + controle
   - Cons: Mais CSS

**Decision**: **Option 3 - Hybrid Flexbox**

**Rationale**:
- Flexbox base com `justify-between` para desktop
- Media queries ajustam `justify-content` para `center` com `gap` em mobile
- Mantém mobile-first approach da constituição
- Permite ajustar tamanhos de logos em breakpoints menores

**Breakpoints**:
```css
/* Mobile first */
.footer__logos {
  justify-content: center;
  gap: 32px;
}

@media (min-width: 768px) {
  .footer__logos {
    gap: 40px;
  }
}

@media (min-width: 1024px) {
  .footer__logos {
    justify-content: space-between;
    gap: 0; /* justify-between handles spacing */
  }
}
```

---

### Decision 4: Logo Color Treatment

**Options Evaluated**:
1. **Keep original colors** (from SVG)
   - Pros: Colorido, destaque
   - Cons: Não alinha com screenshot minimalista

2. **CSS filter: grayscale + opacity**
   - Pros: Efeito minimalista, código simples
   - Cons: Pode não corresponder exatamente ao Figma

3. **Manually recolor SVGs** (fill: zinc-400)
   - Pros: Controle preciso, fidelidade
   - Cons: Trabalho manual, SVGs podem ter cores inline

**Decision**: **Option 2 - CSS filter**

**Rationale**:
- Screenshot mostra logos em cinza monocromático
- `filter: grayscale(1) opacity(0.7)` aproxima o visual
- Não requer edição de SVGs
- Fácil ajustar se feedback do usuário pedir mudança

**Implementation**:
```css
.footer-logo img {
  filter: grayscale(1) brightness(1.5) opacity(0.7);
}

/* Hover effect opcional */
@media (hover: hover) {
  .footer-logo:hover img {
    filter: grayscale(0) opacity(1);
    transition: filter var(--duration-normal) var(--ease-smooth);
  }
}
```

---

### Decision 5: Composite Logo Handling (Hi Nutrition & CSF)

**Challenge**: Hi Nutrition e CSF têm múltiplos SVGs sobrepostos no Figma

**Options**:
1. **Absolute positioning** (replicar Figma exato)
   - Pros: Fidelidade pixel-perfect
   - Cons: Muito CSS, frágil em responsivo

2. **Simplificar para logo principal** (apenas 1 SVG)
   - Pros: Manutenção fácil
   - Cons: Perda visual

3. **Relative positioning in wrapper**
   - Pros: Compromisso razoável
   - Cons: Pode não ficar idêntico

**Decision**: **Option 2 - Simplificar para logo principal apenas**

**Rationale**:
- Logos composite são micro-detalhes em camadas
- Em rodapé com opacity reduzida, detalhes não são críticos
- Usar apenas o SVG principal de cada logo mantém identidade visual
- Se usuário reclamar, podemos upgradar para Option 1

**Implementation**:
- Hi Nutrition: Usar apenas `footer-hi-logo-5.svg` (parece ser o mais completo)
- CSF: Usar apenas `footer-csf-logo-main.svg`

---

## Alternatives Considered

### Alternative 1: Slider/Carousel de Logos

**Rejected**: Adiciona complexidade desnecessária (JavaScript), não é o padrão de rodapé com logos de parceiros

### Alternative 2: Links para Sites dos Parceiros

**Deferred**: Possível adicionar depois se o usuário fornecer URLs. Por enquanto, logos são decorativos (não clicáveis)

### Alternative 3: Animações de Entrada

**Deferred**: Manter consistente com resto da página (scroll reveal). Pode adicionar depois se requisitado

---

## Technology Stack Confirmation

**No new dependencies required**:
- HTML5 semântico ✅
- CSS3 com Custom Properties ✅
- SVG assets (já temos pipeline) ✅
- No JavaScript needed ✅

**Aligns with constitution**:
- Princípio I: Estrutura organizada (assets/ já existe)
- Princípio II: HTML semântico (footer, alt text)
- Princípio III: Mobile-first CSS ✅
- Princípio IV: Performance (SVGs otimizados, sem JS)
- Princípio V: Compatibilidade (CSS básico, suporte amplo)

---

## Implementation Approach

### Phase 1: HTML Structure
1. Adicionar `<footer>` antes do `</body>` em index.html
2. Criar estrutura `.footer > .footer__container > .footer__logos`
3. Adicionar 5 `.footer-logo` wrappers com imagens

### Phase 2: CSS Styling
1. Adicionar variáveis se necessário (--footer-padding, --logo-opacity)
2. Estilizar `.footer` (padding vertical, background transparente)
3. Estilizar `.footer__logos` (flexbox, justify-between, wrap)
4. Estilizar `.footer-logo img` (max-width, height auto, filter)

### Phase 3: Responsive
1. Base mobile (justify-center, gap 24px)
2. Tablet 768px (gap 32px)
3. Desktop 1024px (justify-between)
4. Large 1440px (tamanhos originais)

### Phase 4: Testing
1. Verificar em 4 breakpoints
2. Comparar com screenshot Figma
3. Testar acessibilidade (alt text, landmark)

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Logos multi-parte não ficam idênticos | Low | Medium | Usar apenas logo principal (aceitável) |
| Cores cinza não correspondem exato | Low | Medium | Ajustar filter brightness/contrast |
| Layout quebra em telas muito estreitas | Medium | Low | Reduzir tamanho logos em <480px |
| SVGs com cores inline não respondem a filter | Low | Low | Inspecionar SVGs, editar se necessário |

---

## Open Questions (Resolved)

**Q1**: Logos devem ter links para sites dos parceiros?
**A1**: Não por enquanto. Implementar como decorativos. Fácil adicionar `<a>` depois.

**Q2**: Logos devem ter hover effects?
**A2**: Opcional. Implementar hover sutil (recolor) se não forem links.

**Q3**: Seção footer deve ter background diferente do body?
**A3**: Não. Manter background preto (herdar), logos em cinza se destacam suficiente.

**Q4**: Qual espaçamento vertical entre hero/CTAs e footer?
**A4**: 80px (var(--space-80)) para consistência com gaps existentes.

---

## Success Criteria

**Visual Fidelity**:
- [ ] 5 logos visíveis e legíveis
- [ ] Estilo minimalista (monocromático cinza)
- [ ] Espaçamento horizontal balanceado (desktop)
- [ ] Alinhamento vertical centralizado

**Responsive**:
- [ ] Logos quebram graciosamente em mobile
- [ ] Tamanhos proporcionais em todos os breakpoints
- [ ] Sem overflow horizontal

**Code Quality**:
- [ ] HTML semântico (footer, alt text)
- [ ] CSS usa variáveis existentes
- [ ] Mobile-first media queries
- [ ] Comentários explicativos

**Accessibility**:
- [ ] Alt text descritivo em todas as imagens
- [ ] Footer é landmark (tag `<footer>`)
- [ ] Contraste suficiente (logos cinza em fundo preto)

---

## References

- **Figma Node**: 2043-191
- **Screenshot**: Capturado via mcp__figma__get_screenshot
- **Assets**: 9 SVGs baixados de localhost:3845
- **Constitution**: `.specify/memory/constitution.md`
- **Feature Spec**: `specs/master/spec.md`

---

**Document Version**: 1.0
**Research Complete**: 2025-10-27
**Next Phase**: Design & Contracts (data-model.md, contracts/)
