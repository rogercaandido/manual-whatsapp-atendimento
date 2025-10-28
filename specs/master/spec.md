# Feature Specification: Style Refinement and Figma Design Alignment

**Feature ID**: style-refinement-v1
**Created**: 2025-10-27
**Status**: Planning

## 1. Overview

### 1.1 Purpose
Refinar e ajustar os estilos da landing page WhatsApp Automation para corresponder exatamente às especificações do design Figma, incluindo pesos de fonte, cores, espaçamentos e tamanhos de ícones.

### 1.2 Background
A landing page atual foi implementada com base no design Figma (node 2014-191), mas existem divergências entre o código atual e as especificações exatas do design, particularmente em:
- Pesos de fonte não correspondem exatamente ao Figma
- Cores podem ter valores ligeiramente diferentes
- Tamanhos de ícones dentro das pills de features precisam ser refinados
- Espaçamentos podem precisar de ajustes finos

### 1.3 Scope
**In Scope:**
- Atualização de tokens de design (colors, typography, spacing)
- Ajuste de pesos de fonte para corresponder ao Figma
- Refinamento de tamanhos de ícones nas feature pills
- Correção de cores para valores exatos do Figma
- Atualização de espaçamentos conforme design system

**Out of Scope:**
- Mudanças estruturais no HTML
- Adição de novos componentes
- Alterações de funcionalidade

## 2. User Stories

### 2.1 Primary User Stories

**US-1: Design Fidelity**
> Como designer, quero que a implementação corresponda exatamente ao design Figma, para que a landing page tenha a aparência pretendida.

**US-2: Consistência Visual**
> Como usuário, quero ver uma tipografia e cores consistentes, para que a experiência visual seja profissional e coerente.

**US-3: Ícones Proporcionais**
> Como usuário, quero que os ícones nas tags de features sejam do tamanho correto, para que tenham boa legibilidade e balanço visual.

## 3. Functional Requirements

### 3.1 Typography Refinement

**FR-1.1: Font Weights**
- `webdev_` logo: JetBrains Mono Medium (500) ✓
- Hero subtitle: Inter Regular (400) ✓
- Hero title: Share Tech Mono Regular (400) ✓
- Feature labels: Inter Regular (400) ✓
- Feature pill text: Inter Regular (400) ✓
- Primary CTA: Inter Semi Bold (600) ✓
- Secondary CTA: Inter Light (300) ✓
- Disclaimer: Roboto Regular (400) ✓

**FR-1.2: Font Sizes**
- Logo: 19.034px (verificar precisão)
- Hero subtitle: 18px (var(--text-sizes/text-medium))
- Hero title: 128px (var(--font/size/8xl))
- Feature labels: 12px (var(--font/size/xs))
- Feature pill text: 12px (var(--font/size/xs))
- CTA text: 16px (var(--text-sizes/text-regular))
- Disclaimer: 16px (var(--font/size/m))

### 3.2 Color Refinement

**FR-2.1: Primary Colors**
- Primary green: `#74d200` ✓
- Black: `#000000` ✓
- White: `#ffffff`

**FR-2.2: Zinc Palette**
- zinc-100: `#f4f4f5` (var(--color/zinc/100))
- zinc-200: `#e4e4e7` (var(--color/zinc/200))
- zinc-300: `#d4d4d8` (var(--color/zinc/300))
- zinc-500: `#71717a` (var(--color/zinc/500))
- zinc-600: `#52525b` (var(--color/zinc/600))

### 3.3 Icon Size Refinement

**FR-3.1: Feature Pills Icons**
- Text icon: 20px width × 16px height
- Image icon: 16px width × 14px height
- Document icon: 14.112px width × 16px height

**FR-3.2: Other Icons**
- WhatsApp logo (hero): 76px × 76px ✓
- WhatsApp icon (CTA): 36px × 36px ✓

### 3.4 Spacing Refinement

**FR-4.1: Component Gaps**
- Header sections: 80px (var(--space-80))
- Hero sections: 40px (var(--space-40))
- Hero text items: 32px (var(--space-32))
- Feature sections: 16px (var(--space-16))
- CTA items: 32px
- Feature pills internal: 10px

**FR-4.2: Padding**
- Page padding: 64px (var(--page-padding))
- Feature pills: 8px 16px (var(--space-8) var(--space-16))
- Primary CTA: 12px 24px (left/right asymmetric)
- Secondary CTA: 12px 24px

## 4. Non-Functional Requirements

### 4.1 Performance
- **NFR-1**: Alterações CSS não devem impactar tempo de renderização
- **NFR-2**: Fontes já carregadas não precisam de re-otimização

### 4.2 Compatibility
- **NFR-3**: Manter compatibilidade com navegadores modernos
- **NFR-4**: Manter responsividade em todos os breakpoints

### 4.3 Maintainability
- **NFR-5**: Usar variáveis CSS para todos os valores de design tokens
- **NFR-6**: Manter comentários explicativos no código
- **NFR-7**: Seguir a constituição do projeto (mobile-first, CSS variables)

## 5. Design System Tokens

### 5.1 Colors
```css
--color-zinc-100: #f4f4f5
--color-zinc-200: #e4e4e7
--color-zinc-300: #d4d4d8
--color-zinc-500: #71717a
--color-zinc-600: #52525b
--color-black: #000000
--color-white: #ffffff
--color-primary: #74d200
```

### 5.2 Typography
```css
--font-jetbrains: 'JetBrains Mono', monospace
--font-inter: 'Inter', sans-serif
--font-share-tech: 'Share Tech Mono', monospace
--font-roboto: 'Roboto', sans-serif
```

### 5.3 Font Weights
```css
--font-weight-light: 300
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

### 5.4 Spacing Scale
```css
--space-8: 8px
--space-10: 10px
--space-16: 16px
--space-32: 32px
--space-40: 40px
--space-80: 80px
```

## 6. Technical Constraints

### 6.1 Technology Stack
- HTML5 puro (sem frameworks)
- CSS3 com Custom Properties
- Design system baseado em tokens Figma

### 6.2 Browser Support
- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)

### 6.3 Constitution Compliance
- ✅ Mobile-first approach
- ✅ CSS variables para design tokens
- ✅ HTML semântico
- ✅ Estrutura organizada (styles/variables.css, styles/main.css)

## 7. Success Criteria

### 7.1 Visual Fidelity
- [ ] Pesos de fonte correspondem 100% ao Figma
- [ ] Cores correspondem 100% ao Figma (valores hexadecimais exatos)
- [ ] Tamanhos de ícones correspondem às especificações Figma
- [ ] Espaçamentos seguem o design system

### 7.2 Code Quality
- [ ] Todas as cores usam variáveis CSS
- [ ] Todos os espaçamentos usam variáveis CSS
- [ ] Todos os pesos de fonte usam variáveis CSS
- [ ] Código validado (W3C CSS)

### 7.3 Responsiveness
- [ ] Layout mantém proporções corretas em mobile
- [ ] Ícones escalam apropriadamente
- [ ] Tipografia permanece legível em todos os breakpoints

## 8. Dependencies

### 8.1 Design Assets
- ✅ Figma node 2014-191 acessível via MCP
- ✅ Assets SVG já baixados (whatsapp-logo.svg, icons)

### 8.2 Font Loading
- ✅ Google Fonts configurado (JetBrains Mono, Inter, Share Tech Mono, Roboto)

### 8.3 Codebase
- ✅ index.html estruturado
- ✅ styles/variables.css com tokens base
- ✅ styles/main.css com componentes

## 9. Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Valores Figma incompletos | Medium | Low | Extrair valores do código gerado pelo MCP Figma |
| Breaking responsive layout | High | Low | Testar cada mudança em múltiplos breakpoints |
| Font weights não disponíveis | Medium | Low | Verificar disponibilidade no Google Fonts |
| Icon size breaking layout | Medium | Low | Ajustar containers proporcionalmente |

## 10. Acceptance Criteria

**AC-1: Typography**
- Todos os pesos de fonte correspondem ao Figma
- Font-variation-settings aplicado onde especificado

**AC-2: Colors**
- Valores hexadecimais exatos do Figma implementados
- Todas as cores usam variáveis CSS

**AC-3: Icons**
- Ícones nas feature pills têm dimensões exatas do Figma
- Proporções mantidas em todos os breakpoints

**AC-4: Spacing**
- Gaps e paddings correspondem ao design system
- Variáveis CSS usadas consistentemente

**AC-5: Visual Regression**
- Layout não quebrou em nenhum breakpoint
- Alinhamentos mantidos
- Hierarquia visual preservada

## 11. Implementation Notes

### 11.1 Figma Code Reference
O código React+Tailwind gerado pelo Figma MCP serve como referência para valores exatos:
- Font sizes com prefixos `var(--text-sizes/...)` e `var(--font/size/...)`
- Colors com prefixos `var(--color/...)`
- Spacing com prefixos `var(--space-...)`

### 11.2 Conversion Strategy
1. Extrair valores das classes Tailwind do Figma code
2. Converter para CSS Custom Properties
3. Aplicar nas classes CSS existentes
4. Validar visualmente contra screenshot Figma

### 11.3 Priority Order
1. **P0 (Critical)**: Font weights, core colors (texto, background, primary)
2. **P1 (High)**: Icon sizes, feature pill styling
3. **P2 (Medium)**: Fine-tuning de spacing, letter-spacing
4. **P3 (Low)**: Hover states, transitions

---

**Document Version**: 1.0
**Last Updated**: 2025-10-27
**Author**: Claude (via speckit.specify workflow)
