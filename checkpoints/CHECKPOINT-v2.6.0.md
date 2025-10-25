# CHECKPOINT v2.6.0 - Hero Section Minimalista

**Data:** 2025-10-24
**Versão:** v6 (index-parallax-v6.html)

---

## 🎯 OBJETIVO DESTA VERSÃO

Simplificar a hero section removendo elementos decorativos (semicírculo, texto curvado e texto de background), mantendo apenas o robô 3D Spline e o conteúdo textual para um design mais limpo e minimalista.

---

## 🎨 MUDANÇAS PRINCIPAIS

### Elementos Removidos
- ❌ **Semicírculo de fundo** (`hero-semicircle`)
- ❌ **Texto curvado SVG** (`curved-text-container`)
- ❌ **Texto grande de background** (`hero-bg-text`)

### Estrutura HTML Simplificada
```html
<div class="hero-circular-layout">
  <!-- Robô 3D no centro -->
  <div class="hero-robot-center">
    <spline-viewer url="..."></spline-viewer>
  </div>

  <!-- Conteúdo textual abaixo -->
  <div class="hero-content-bottom">
    <h1>Tudo <strong>resolvido</strong> no WhatsApp</h1>
    <p>Fale e receba atualizações no mesmo lugar.<br>
       <span class="underlined">Rápido, claro e sem burocracia.</span>
    </p>
    <div class="hero-cta">
      <a href="..." class="btn-primary">Falar no WhatsApp</a>
    </div>
  </div>
</div>
```

---

## 🎭 LAYOUT VISUAL

### Hero Section
- **Estrutura:** Layout vertical centralizado
- **Background:** Apenas estrelas animadas e bolas com glow verde
- **Foco:** Robô 3D como elemento principal
- **Hierarquia:** Robô → Título → Subtitle → CTA

### Elementos Mantidos

#### Robô 3D Spline
- **Container:** width 100%, max-width 800px, height 100vh
- **Scale:** 1.2x para preencher espaço
- **Z-index:** 5 (elemento principal da hero)
- **Posição:** Centralizado com flexbox
- **Clip-path:** inset(0 0 0 0) para cortar overflow

#### Hero Content Bottom
- **Posição:** Relative, abaixo do robô
- **Alinhamento:** Centralizado (align-items: center)
- **Max-width:** 800px
- **Z-index:** 3

#### Título Principal
- **Font:** Figtree, clamp(3rem, 8vw, 5.5rem)
- **Weight:** 300 (regular) / 700 (strong)
- **Efeito especial:** `.sparkles-text` com gradiente animado verde

#### Subtitle
- **Font-size:** 1.25rem
- **Elemento destacado:** `.underlined` com text-decoration
- **Cor:** var(--body-text)

#### CTA Button
- **Estilo:** btn-primary verde (#6ac400)
- **Padding:** 1.25rem 2.5rem
- **Border-radius:** 50px
- **Hover:** Transform translateY(-4px) scale(1.03)
- **Box-shadow:** 0 12px 24px rgba(116,210,0,0.4) no hover

---

## 🔧 CSS MANTIDO

### Hero Layout
```css
.hero-circular-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding: 0;
}
```

### Robô Container
```css
.hero-robot-center {
  width: 100%;
  max-width: 800px;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 5;
  margin-bottom: 0;
  padding-top: 60px;
  clip-path: inset(0 0 0 0);
}

.hero-robot-center spline-viewer {
  transform: scale(1.2) !important;
}
```

### Content Bottom
```css
.hero-content-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  position: relative;
  z-index: 3;
}
```

---

## 📱 RESPONSIVIDADE

Mantida estrutura de responsividade dos breakpoints anteriores:

### Desktop (padrão)
- Robô: 100%, max-width 800px, height 100vh
- Título: clamp(3rem, 8vw, 5.5rem)
- Subtitle: 1.25rem

### Tablet Grande (≤1336px)
- Robô: 420px × 420px
- Título: clamp(2.25rem, 5.5vw, 4rem)

### Tablet (≤1024px)
- Robô: 380px × 380px
- Título: clamp(2rem, 5vw, 3.25rem)

### Mobile (≤768px)
- Robô: 300px × 300px
- Título: clamp(1.75rem, 6.5vw, 2.75rem)
- Scale robô: 1.2x

### Mobile Pequeno (≤480px)
- Robô: 250px × 250px
- Título: clamp(1.5rem, 7.5vw, 2.25rem)
- Scale robô: 1.1x

---

## ⚡ ANIMAÇÕES MANTIDAS

### Sparkles Text Effect
```css
.sparkles-text {
  background: linear-gradient(90deg,
    #fff 0%,
    #74d200 25%,
    #fff 50%,
    #74d200 75%,
    #fff 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s linear infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}
```

### Spline Logo Cleanup
- Estratégia otimizada de remoção do logo Spline
- MutationObserver + timeouts progressivos
- Shadow DOM manipulation
- Cleanup completo em até 2 segundos

---

## 🐛 COMPARAÇÃO COM v2.0.0

### O que foi REMOVIDO
1. ❌ Semicírculo de fundo com gradiente verde
2. ❌ Texto curvado SVG na borda ("RESOLVA TUDO NO WHATSAPP")
3. ❌ Texto gigante de background atrás do robô
4. ❌ ~150 linhas de CSS relacionadas aos elementos decorativos

### O que foi MANTIDO
1. ✅ Robô 3D Spline centralizado
2. ✅ Hero content bottom com título + subtitle + CTA
3. ✅ Sparkles text effect no título
4. ✅ Estrelas animadas de background
5. ✅ Bolas com glow verde orbital
6. ✅ Sistema de responsividade completo
7. ✅ Spline cleanup JavaScript

---

## 🎨 FILOSOFIA DO DESIGN

### Minimalismo
- **Menos é mais:** Foco no essencial (robô + mensagem + CTA)
- **Hierarquia clara:** Robô → Texto → Ação
- **Espaço negativo:** Breathing room ao redor dos elementos

### Performance
- **Menos DOM nodes:** 3 elementos removidos = menos parsing/layout
- **CSS reduzido:** Menos regras = faster paint
- **Foco visual:** Atenção do usuário direto no robô 3D

### User Experience
- **Carga cognitiva menor:** Menos distrações visuais
- **Call-to-action direto:** Caminho claro para ação
- **Mobile-friendly:** Layout mais simples escala melhor

---

## 📂 ARQUIVOS MODIFICADOS

### index-parallax-v6.html
- Removidas 3 divs decorativas da hero section
- Estrutura HTML simplificada
- JavaScript mantido intacto

### style-parallax-v6.css
- Mantido CSS funcional do robô e content
- Removido CSS dos elementos decorativos (será feito limpeza futura)

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. **Limpeza CSS:** Remover regras CSS órfãs dos elementos deletados
2. **Animação de entrada:** Fade-in do robô ao carregar
3. **Micro-interações:** Hover sutil no robô
4. **A/B Testing:** Comparar conversão entre v2.0.0 (decorado) vs v2.6.0 (minimalista)
5. **Performance audit:** Lighthouse score comparison

---

## 📊 MÉTRICAS

- **Elementos HTML removidos:** 3
- **Linhas HTML deletadas:** ~20
- **CSS simplificado:** ~150 linhas podem ser removidas
- **DOM depth reduzido:** -2 níveis
- **Load time:** Possivelmente mais rápido (menos parsing)

---

## 🔗 REFERÊNCIAS

- Base: CHECKPOINT-v2.0.0.md
- Filosofia: Less is More (Mies van der Rohe)
- Spline 3D: https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode

---

**Status:** ✅ Completo - Hero minimalista implementada
**Branch:** main
**Autor:** webdev_ + Claude Code
