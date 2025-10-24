# CHECKPOINT v2.0.0 - Redesign Hero Section Circular

**Data:** 2025-10-24
**Commit:** 38fd9f3

---

## 🎯 OBJETIVO DESTA VERSÃO

Redesenhar completamente a hero section com layout circular inspirado em referência visual, posicionando o robô 3D Spline no centro com semicírculo de fundo e texto curvado na borda.

---

## 🎨 MUDANÇAS PRINCIPAIS

### Layout Circular Centralizado
- **Antes:** Grid 2 colunas (conteúdo à esquerda, robô à direita)
- **Depois:** Layout vertical centralizado com robô no centro da viewport

### Estrutura HTML Nova
```html
<div class="hero-circular-layout">
  <!-- Semicírculo de fundo -->
  <div class="hero-semicircle"></div>

  <!-- Texto curvado SVG -->
  <div class="curved-text-container">
    <svg viewBox="0 0 500 250">
      <path id="curve" d="M 50,200 A 200,200 0 0,1 450,200"/>
      <text class="curved-text">
        <textPath href="#curve">
          RESOLVA TUDO NO WHATSAPP RESOLVA TUDO NO WHATSAPP
        </textPath>
      </text>
    </svg>
  </div>

  <!-- Robô 3D -->
  <div class="hero-robot-center">
    <spline-viewer url="..."></spline-viewer>
  </div>

  <!-- Conteúdo textual -->
  <div class="hero-content-bottom">
    <h1>Tudo resolvido no WhatsApp</h1>
    <p>Fale e receba atualizações...</p>
    <a href="..." class="btn-primary">Falar no WhatsApp</a>
  </div>
</div>
```

---

## 🎭 ELEMENTOS VISUAIS

### Semicírculo de Fundo
- **Tamanho:** 80vh × 80vh (max 800px)
- **Gradiente:** `radial-gradient(circle at center, rgba(116,210,0,0.15) 0%, rgba(116,210,0,0.05) 50%, transparent 70%)`
- **Borda:** 2px solid rgba(116,210,0,0.2)
- **Posição:** Absolute, centrado com transform translate(-50%, -50%)

### Texto Curvado
- **Tecnologia:** SVG com `<textPath>`
- **Conteúdo:** "RESOLVA TUDO NO WHATSAPP" (repetido 2x)
- **Tamanho container:** 90vh × 90vh (max 900px)
- **Fonte:** Figtree, 42px, weight 800
- **Estilo:** Uppercase, letter-spacing 0.15em, opacity 0.15
- **Cor:** var(--text) branco

### Robô 3D Spline
- **Container:** width 100%, max-width 800px, height 100vh
- **Canvas:** height 100vh com clip-path para cortar overflow
- **Scale:** 1.3x para preencher espaço
- **Z-index:** 5 (na frente do semicírculo e texto)

---

## 🔧 CSS TÉCNICO

### Máscaras e Clipping
```css
.hero-section {
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.hero-robot-center {
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.hero-robot-center spline-viewer {
  overflow: hidden;
  /* Removido: overflow: visible, clip-path: none */
}
```

### Posicionamento
```css
.hero-circular-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
}

.hero-robot-center {
  width: 100%;
  max-width: 800px;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 📱 RESPONSIVIDADE

### Desktop (padrão)
- Semicírculo: 80vh (max 800px)
- Texto curvado: 90vh (max 900px)
- Robô: 100%, max-width 800px
- Font-size texto curvado: 42px

### Tablet Grande (≤1336px)
- Semicírculo: 500px
- Texto curvado: 600px, font 36px
- Robô: 420px

### Tablet (≤1024px)
- Semicírculo: 450px
- Texto curvado: 550px, font 32px
- Robô: 380px

### Mobile (≤768px)
- Semicírculo: 350px
- Texto curvado: 450px, font 24px
- Robô: 300px

### Mobile Pequeno (≤480px)
- Semicírculo: 280px
- Texto curvado: 350px, font 18px
- Robô: 250px

---

## ⚡ OTIMIZAÇÕES SPLINE

### Cleanup do Logo
```javascript
function finalizeCleanup() {
  if (cleanupComplete) return;

  if (removeSplineLogo()) {
    cleanupComplete = true;
    mutationObserver.disconnect();
  }
}

// Estratégia multi-camada:
// 1. Tentativa imediata
// 2. MutationObserver no shadow DOM
// 3. Event listener 'load'
// 4. Timeouts progressivos [100, 300, 600, 1000, 2000]ms
// 5. Para quando completar com sucesso
```

### Shadow DOM Manipulation
- Remove `#logo` element
- Remove `a[href*="spline.design"]` links
- Remove clip-path e masks do canvas
- Remove overflow constraints

---

## 🐛 PROBLEMAS RESOLVIDOS

### 1. Canvas Cortado
- **Problema:** Container com width 500px fixo cortava canvas de 100vh
- **Solução:** width 100%, max-width 800px permite expansão

### 2. Pernas do Robô Vazando
- **Problema:** overflow: visible permitia pernas ultrapassarem viewport
- **Solução:** clip-path: inset(0 0 0 0) + overflow: hidden

### 3. Texto Curvado Não Responsivo
- **Problema:** Tamanhos fixos em px não escalavam
- **Solução:** Usar vh com max-width/max-height em px

---

## 📂 ARQUIVOS MODIFICADOS

### index-parallax-v5.html
- Nova estrutura HTML da hero section
- SVG com texto curvado adicionado
- Spline cleanup JavaScript otimizado
- Intersection Observer atualizado

### style-parallax-v5.css
- `.hero-circular-layout` - novo container
- `.hero-semicircle` - círculo de fundo
- `.curved-text-container` + `.curved-text-svg` + `.curved-text`
- `.hero-robot-center` - container do Spline redesenhado
- `.hero-content-bottom` - conteúdo textual
- Media queries completamente reescritos
- Removido `.hero-grid`, `.hero-content`, `.hero-spline`

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. **Ajustar animações:** Adicionar animações de entrada para semicírculo e texto
2. **Otimizar mobile:** Testar em dispositivos reais
3. **Interatividade:** Considerar hover effects no robô
4. **Performance:** Lazy load do Spline se necessário
5. **A11y:** Testar com screen readers

---

## 📊 MÉTRICAS

- **Linhas alteradas:** 326 inserções, 236 deleções
- **Breakpoints:** 4 (1336px, 1024px, 768px, 480px)
- **Elementos novos:** 4 (semicircle, curved-text, robot-center, content-bottom)
- **Elementos removidos:** 3 (hero-grid, hero-content, hero-spline)

---

## 🔗 REFERÊNCIAS

- Design inspirado em: Screenshot_2.jpg (hims website hero)
- Tecnologia SVG textPath: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
- Spline 3D: https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode

---

**Status:** ✅ Completo e testado
**Branch:** main
**Autor:** webdev_ + Claude Code
