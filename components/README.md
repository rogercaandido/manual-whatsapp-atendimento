# Componentes Modulares

Este diretório contém componentes HTML reutilizáveis da landing page.

## Features Section Component

**Arquivo:** `features-section.html`
**Node Figma:** `2014:282`
**CSS:** `styles/components/features.css`

### Descrição

Componente que exibe as funcionalidades suportadas pela plataforma em formato de "pills" (pílulas) com ícones.

### Estrutura

```
<section class="features">
  <p class="features__label">        <!-- Label "Funciona com:" -->
  <div class="features__list">       <!-- Container das pills -->
    <div class="feature-pill">       <!-- Pill individual -->
      <span class="feature-pill__text">   <!-- Texto da funcionalidade -->
      <span class="feature-pill__icon">   <!-- Ícone SVG -->
```

### Classes CSS

#### Container
- `.features` - Container principal da seção
- `.features__label` - Label "Funciona com:"
- `.features__list` - Container flex das pills

#### Pills
- `.feature-pill` - Pill individual com borda e padding
- `.feature-pill__text` - Texto dentro da pill
- `.feature-pill__icon` - Container do ícone SVG

#### Atributos de Ícone
- `data-icon="text"` - Ícone de texto (20x16px)
- `data-icon="image"` - Ícone de imagem (16x14px)
- `data-icon="document"` - Ícone de documento (14.112x16px)
- `data-icon="audio"` - Ícone de áudio (16x16px)

### Design Tokens

O componente utiliza as seguintes variáveis CSS:

```css
/* Espaçamento */
--space-16: 16px
--space-10: 10px
--space-8: 8px

/* Cores */
--color-zinc-300: #d4d4d8  (texto)
--color-zinc-500: #71717a  (borda padrão)
--color-primary: #74d200   (borda hover)

/* Tipografia */
--font-inter: 'Inter', sans-serif
--font-size-xs: 12px

/* Animações */
--duration-normal: 0.3s
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
```

### Breakpoints Responsivos

```css
/* Desktop padrão */
@media (max-width: 1440px) {
  padding: 0 200px;
}

/* Tablets */
@media (max-width: 1024px) {
  padding: 0 100px;
}

/* Mobile */
@media (max-width: 768px) {
  padding: 0 24px;
  .features__list {
    flex-wrap: wrap;
    gap: 12px;
  }
}
```

### Estados Interativos

#### Desktop (hover-capable devices)
- **Hover:** Borda verde, glow effect, translateY(-2px)
- **Active:** scale(0.98)
- **Focus-visible:** Outline verde (acessibilidade)

#### Mobile
- Sem efeitos hover (otimizado para touch)

### Acessibilidade

- ✅ `aria-label="Tipos de conteúdo suportados"` na section
- ✅ `role="list"` no container de pills
- ✅ `role="listitem"` em cada pill
- ✅ `aria-label` descritivo em cada pill
- ✅ `aria-hidden="true"` nos ícones decorativos
- ✅ Focus ring para navegação por teclado
- ✅ Suporte a `prefers-reduced-motion`

### Animações

O componente suporta animações de scroll reveal via atributos:
- `data-animate` - Marca elemento para animação
- `data-animate-delay="300"` - Delay de 300ms antes de animar

### Como Usar

1. **Incluir CSS:**
```html
<link rel="stylesheet" href="styles/components/features.css">
```

2. **Copiar HTML:**
Copie o conteúdo de `features-section.html` para sua página.

3. **Ajustar caminhos:**
Certifique-se de que os caminhos dos assets SVG estão corretos:
```html
<img src="assets/text-icon.svg" alt="">
```

### Assets Necessários

- `assets/text-icon.svg`
- `assets/image-icon.svg`
- `assets/document-icon.svg`
- `assets/audio-icon.svg`

### Customização

Para adicionar novas funcionalidades, siga o padrão:

```html
<div
  class="feature-pill"
  data-node-id="XXXX:XX"
  data-animate
  data-animate-delay="XXX"
  role="listitem"
  aria-label="Funcionalidade de NOME"
>
  <span class="feature-pill__text">NOME</span>
  <span class="feature-pill__icon" data-icon="TIPO" aria-hidden="true">
    <img src="assets/NOME-icon.svg" alt="">
  </span>
</div>
```

E adicione o tamanho do ícone no CSS:

```css
.feature-pill__icon[data-icon="TIPO"] {
  width: XXpx;
  height: XXpx;
}
```

---

**Design System:** Claude Code Figma (ztyeKTFgyJJT6nnpXyyM2i)
**Criado com:** Claude Code + Figma MCP Server
