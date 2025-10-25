# CHECKPOINT v3.0.0 - Hero Section Redesenhada com Design do Figma

**Data:** 2025-01-24
**Versão:** v3.0.0
**Commit:** ce446d6

## Resumo

Redesign completo da hero section seguindo o design do Figma com layout horizontal, robô 3D à esquerda e CTA à direita.

## Mudanças Principais

### 1. Layout Horizontal
- **Estrutura:** Robô à esquerda (716.12px) + Conteúdo à direita (flex: 1)
- **Padding assimétrico:** `0 230px 0 106px` (conforme especificação do Figma)
- **Hero section:** Limitada a exatos `100vh` (height e max-height)
- **Container principal:** Flexbox row com gap 10px, padding-top 110px

### 2. Texto de Fundo Repetido
- **Fonte:** Bebas Neue 146.14px, line-height 1.2em
- **Conteúdo:** "tudo resolvido no whasapp" (6 linhas)
- **Gradiente:** `linear-gradient(90deg, rgba(47,47,47,1) 14%, rgba(181,181,181,1) 54%, rgba(47,47,47,1) 86%)`
- **Opacidade:** 0.11 (11%)
- **Posicionamento:** Absolute, z-index 1

### 3. Robô Spline 3D
- **Container:** 716.12px width fixed, height 100%
- **Alinhamento:** `align-items: flex-end` (grudado na base)
- **Canvas:** `object-position: center bottom` (alinha na parte inferior)
- **Spline viewer:** width e height 100%
- **Overflow:** visible para não cortar o robô

### 4. Conteúdo à Direita
- **Título:** "COMEÇAR" em Bebas Neue
  - Font-size: `clamp(4rem, 12vw, 10rem)`
  - Color: #FFFFFF
  - Letter-spacing: 0.02em
- **Botão CTA:** "ABRIR CONVERSA NO WHATSAPP"
  - Background: #75D300 (verde limão)
  - Padding: 40px
  - Font: Bebas Neue `clamp(1.5rem, 3vw, 2.5rem)`
  - Hover: #86e614 com transform e shadow

### 5. Tipografia
- **Nova fonte:** Bebas Neue (Google Fonts)
- Adicionada ao HTML junto com Figtree, Inter, JetBrains Mono e Six Caps

### 6. Integração com Figma
- **Figma MCP:** Utilizado para extrair especificações exatas
- **Referências visuais:** Salvas em `figma-reference/`
  - `hero-complete-design.png` (2920x2088)
  - `hero-layout-reference.png` (980x980)
  - `robot-cropped-7aef9c.png` (640x817)

## Arquivos Criados/Modificados

### Novos Arquivos
- `index-parallax-v7.html` - Nova versão com estrutura do Figma
- `style-parallax-v7.css` - Estilos da v7
- `figma-reference/hero-complete-design.png`
- `figma-reference/hero-layout-reference.png`
- `figma-reference/robot-cropped-7aef9c.png`

### Estrutura HTML (v7)
```html
<section class="section hero-section">
  <!-- Texto de fundo repetido -->
  <div class="hero-background-repeated">
    <div class="bg-text-line">tudo resolvido no whasapp</div>
    <!-- ... 6 linhas -->
  </div>

  <!-- Container principal da hero -->
  <div class="hero-container">
    <!-- Robô 3D à esquerda -->
    <div class="hero-robot-left">
      <spline-viewer url="..."></spline-viewer>
    </div>

    <!-- Conteúdo à direita -->
    <div class="hero-content-right">
      <h1 class="hero-title-large">COMEÇAR</h1>
      <a class="hero-cta-button" href="...">
        ABRIR CONVERSA NO WHATSAPP
      </a>
    </div>
  </div>
</section>
```

## Especificações Técnicas do Figma

### Layout Container
- **Mode:** row (flexbox horizontal)
- **Justify Content:** center
- **Align Items:** center
- **Padding:** 0px 230px 0px 106px
- **Dimensions:** 1440px × 1024px

### Robô Container
- **Mode:** none (positioning)
- **Sizing:** horizontal fixed, vertical fill
- **Width:** 716.12px (aproximadamente 49.7% de 1440px)

### Texto de Fundo
- **Font Family:** Bebas Neue
- **Font Weight:** 400
- **Font Size:** 146.14px
- **Line Height:** 1.2em
- **Text Align:** CENTER
- **Opacity:** 0.11

## Design System

### Cores
- **Background Hero:** #171717
- **CTA Verde:** #75D300
- **CTA Hover:** #86e614
- **Texto Branco:** #FFFFFF
- **Texto Escuro:** #09090b

### Tipografia Hero
- **Bebas Neue:** Display font para títulos e CTA
- **Font Weights:** 400 (regular)
- **Responsive:** clamp() para adaptação fluida

## Próximos Passos Sugeridos

1. **Responsividade Mobile**
   - Ajustar padding lateral para telas pequenas
   - Stack vertical em mobile (robô acima, conteúdo abaixo)
   - Redimensionar fonte Bebas Neue para mobile

2. **Animações**
   - Fade-in do texto de fundo
   - Slide-in do robô da esquerda
   - Bounce no CTA button

3. **Performance**
   - Lazy load do Spline viewer
   - Otimizar imagens do figma-reference/

4. **Acessibilidade**
   - Adicionar aria-labels
   - Melhorar contrast ratio
   - Focus states no botão CTA

## Notas de Desenvolvimento

- Layout baseado 100% nas especificações do Figma
- Figma MCP usado para extrair valores exatos (padding, dimensions, etc)
- Robô posicionado com `object-position: center bottom` para grudar na base
- Hero limitada a 100vh para evitar scroll desnecessário
- Design mantém coerência com resto da página (seções abaixo não alteradas)

---

**Status:** ✅ Concluído
**Testado:** Chrome, Edge
**Branch:** main
