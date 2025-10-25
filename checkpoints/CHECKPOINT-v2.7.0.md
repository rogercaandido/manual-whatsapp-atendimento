# CHECKPOINT v2.7.0 - Hero Ultra Minimalista (Robô Solo)

**Data:** 2025-10-24
**Versão:** v6 (index-parallax-v6.html)

---

## 🎯 OBJETIVO DESTA VERSÃO

Criar uma hero section ultra minimalista com APENAS o robô 3D Spline centralizado, removendo todo conteúdo textual (título, subtitle, CTA) e todos elementos decorativos, deixando o robô como único protagonista da seção.

---

## 🎨 MUDANÇAS PRINCIPAIS

### Elementos Visíveis
- ✅ **Apenas o robô 3D Spline** - Elemento único da hero
- ✅ **Background:** Estrelas animadas + bolas com glow verde

### Elementos Ocultados/Removidos
- ❌ **Hero content bottom** - Ocultado com `display: none`
  - Título "Tudo resolvido no WhatsApp"
  - Subtitle
  - Botão CTA "Falar no WhatsApp"
- ❌ **Semicírculo de fundo** - Removido anteriormente (v2.6.0)
- ❌ **Texto curvado SVG** - Removido anteriormente (v2.6.0)
- ❌ **Texto de background** - Removido anteriormente (v2.6.0)

### Estrutura HTML Final
```html
<section class="section hero-section">
  <div class="hero-circular-layout">
    <!-- Robô 3D no centro -->
    <div class="hero-robot-center">
      <spline-viewer url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                     hide-controls="true"
                     loading-anim-type="spinner-small-dark"
                     loading-anim="false">
      </spline-viewer>
    </div>

    <!-- Conteúdo textual (OCULTO) -->
    <div class="hero-content-bottom" style="display: none;">
      <!-- Conteúdo mantido no HTML mas oculto via CSS -->
    </div>
  </div>
</section>
```

---

## 🔧 CSS - AJUSTES DE ESPAÇAMENTO

### Problema Identificado
O robô estava sendo cortado nas laterais devido a:
- Containers com `overflow: hidden`
- `clip-path: inset(0 0 0 0)` na hero-section
- `max-width: 800px` muito restritivo
- Falta de padding lateral

### Solução Implementada

#### 1. Hero Circular Layout - Padding Lateral
```css
.hero-circular-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding: 0 4rem;        /* ← NOVO: Espaço lateral */
  width: 100%;            /* ← NOVO: Largura total */
}
```

#### 2. Hero Section - Overflow Visível
```css
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: visible;      /* ← MUDOU: era hidden */
  position: relative;
  /* clip-path removido */
}
```

#### 3. Hero Robot Center - Expansão e Overflow
```css
.hero-robot-center {
  width: 100%;
  max-width: 1200px;      /* ← MUDOU: era 800px */
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;      /* ← MUDOU: era hidden */
  z-index: 5;
  margin-bottom: 0;
  padding-top: 60px;
  /* clip-path removido */
}
```

#### 4. Spline Viewer - Overflow Liberado
```css
.hero-robot-center spline-viewer {
  width: 100%;
  height: 100%;
  max-width: none !important;
  max-height: none !important;
  display: block;
  transform: scale(1.2) !important;
  transform-origin: center center;
  overflow: visible !important;  /* ← MUDOU: era hidden */
  position: relative;
  transition: none !important;
}
```

#### 5. Canvas - Overflow Visível
```css
.hero-robot-center spline-viewer canvas {
  width: 100% !important;
  height: 100vh !important;
  max-width: none !important;
  max-height: none !important;
  min-width: 100% !important;
  min-height: 100vh !important;
  display: block !important;
  object-fit: contain !important;
  object-position: center !important;
  transform: none !important;
  transition: none !important;
  overflow: visible !important;  /* ← NOVO */
}
```

#### 6. Hero Content Bottom - Ocultado
```css
.hero-content-bottom {
  display: none;          /* ← MUDOU: oculta todo conteúdo */
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  position: relative;
  z-index: 3;
}
```

---

## 🎭 LAYOUT VISUAL

### Hierarquia Visual
```
┌─────────────────────────────────────┐
│                                     │
│          [Estrelas animadas]        │
│         [Bolas glow verde]          │
│                                     │
│                                     │
│         ┌───────────────┐           │
│         │               │           │
│         │   🤖 ROBÔ    │           │
│         │     3D        │           │
│         │   SPLINE      │           │
│         │               │           │
│         └───────────────┘           │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### Espaçamento
- **Padding lateral:** 4rem (64px) - Respiração nas bordas
- **Max-width robô:** 1200px - Mais espaço horizontal
- **Scale robô:** 1.2x - Tamanho otimizado
- **Height:** 100vh - Ocupa toda altura da viewport

---

## 📱 RESPONSIVIDADE

### Considerações Mobile
A responsividade dos media queries existentes ainda está ativa, mas pode precisar de ajustes já que o conteúdo textual está oculto.

**Media queries a revisar:**
- ≤1336px: Robô 420px (pode ser maior agora)
- ≤1024px: Robô 380px (pode ser maior agora)
- ≤768px: Robô 300px, scale 1.2x
- ≤480px: Robô 250px, scale 1.1x

**Padding lateral responsivo necessário:**
```css
@media (max-width: 768px) {
  .hero-circular-layout {
    padding: 0 2rem; /* Reduzir padding em mobile */
  }
}

@media (max-width: 480px) {
  .hero-circular-layout {
    padding: 0 1rem; /* Ainda menor em mobile pequeno */
  }
}
```

---

## 🐛 PROBLEMA RESOLVIDO

### Antes (v2.6.0)
❌ Robô cortado nas laterais
❌ Braços e partes do robô não visíveis
❌ Container muito restritivo (800px)
❌ Overflow hidden bloqueando visualização completa

### Depois (v2.7.0)
✅ Robô completamente visível
✅ Espaço lateral adequado (padding 4rem)
✅ Container expandido (1200px)
✅ Overflow visible permite extravasar sem cortes
✅ Body com `overflow-x: clip` previne scroll horizontal

---

## 🎨 FILOSOFIA DO DESIGN

### Ultra Minimalismo
- **Zero texto:** Comunicação 100% visual
- **Protagonista único:** Robô 3D como hero absoluto
- **Espaço negativo:** Breathing room máximo
- **Foco total:** Sem distrações

### Impacto Visual
- **First impression:** Robô 3D interativo impressiona imediatamente
- **Curiosidade:** Usuário explora a animação 3D
- **Scroll natural:** Usuário desce para descobrir conteúdo

### Quando Funciona
✅ Produto tech/inovador
✅ Audiência jovem/digital native
✅ Brand forte que não precisa explicar
✅ Experiência > Conversão imediata

### Quando NÃO Funciona
❌ Usuário precisa entender rapidamente o que é
❌ CTA urgente (vendas, conversão)
❌ Audiência não-tech que precisa de texto
❌ SEO/acessibilidade críticos

---

## ⚠️ TRADE-OFFS

### Vantagens
1. **Impacto visual máximo** - WOW factor forte
2. **Performance** - Menos DOM, menos CSS ativo
3. **Mobile-friendly** - Simples escala melhor
4. **Memorável** - Design único e ousado
5. **Load focus** - Atenção 100% no 3D

### Desvantagens
1. **Zero contexto** - Usuário não sabe do que se trata
2. **Sem CTA** - Nenhum call-to-action visível
3. **Bounce rate?** - Usuário pode não entender e sair
4. **Acessibilidade** - Screen readers não têm conteúdo
5. **SEO** - H1 oculto, menos texto indexável

---

## 📊 COMPARAÇÃO DE VERSÕES

| Elemento | v2.0.0 | v2.6.0 | v2.7.0 |
|----------|--------|--------|--------|
| Semicírculo | ✅ | ❌ | ❌ |
| Texto curvado | ✅ | ❌ | ❌ |
| Texto background | ✅ | ❌ | ❌ |
| Robô 3D | ✅ | ✅ | ✅ |
| Título H1 | ✅ | ✅ | ❌ (oculto) |
| Subtitle | ✅ | ✅ | ❌ (oculto) |
| CTA Button | ✅ | ✅ | ❌ (oculto) |
| Max-width robô | 800px | 800px | 1200px |
| Overflow robô | hidden | hidden | visible |
| Padding lateral | 0 | 0 | 4rem |

---

## 🔗 BODY OVERFLOW MANAGEMENT

### Configuração Crítica
```css
body {
  overflow-x: clip;  /* ← Permite overflow mas sem scroll horizontal */
  overflow-y: auto;  /* ← Scroll vertical normal */
  max-width: 100vw;  /* ← Limita largura máxima */
}
```

**Por que `overflow-x: clip` e não `hidden`?**
- `clip`: Conteúdo pode extravasar visualmente mas não cria scroll
- `hidden`: Cortaria o conteúdo completamente
- `visible`: Criaria scroll horizontal indesejado

---

## 📂 ARQUIVOS MODIFICADOS

### style-parallax-v6.css
**Mudanças principais:**
- `.hero-circular-layout` - Adicionado padding: 0 4rem, width: 100%
- `.hero-section` - overflow: visible, removido clip-path
- `.hero-robot-center` - max-width: 1200px, overflow: visible, removido clip-path
- `.hero-robot-center spline-viewer` - overflow: visible !important
- `.hero-robot-center spline-viewer canvas` - overflow: visible !important
- `.hero-content-bottom` - display: none

**Linhas alteradas:** ~15
**Properties modificadas:** 8

### index-parallax-v6.html
- Sem alterações estruturais
- Conteúdo mantido mas oculto via CSS

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

### Opção A: Manter Minimalista
1. **Ajustar responsividade** - Testar padding em mobile
2. **Scroll indicator** - Adicionar seta/hint para scroll
3. **Animation entrance** - Fade-in dramático do robô
4. **Parallax sutil** - Robô move com scroll

### Opção B: Adicionar Contexto Mínimo
1. **Tagline pequena** - Texto curto sobre o robô
2. **Scroll text** - "Role para saber mais" abaixo
3. **Logo empresa** - Identificação de marca
4. **Micro CTA** - Botão pequeno e discreto

### Opção C: Reverter
1. **Mostrar content-bottom** - `display: flex` novamente
2. **Manter espaçamento** - Padding e max-width maiores
3. **Melhor de dois mundos** - Visual + contexto

---

## 🧪 TESTES RECOMENDADOS

### Visual
- [ ] Robô não está cortado nas laterais
- [ ] Robô centralizado perfeitamente
- [ ] Sem scroll horizontal
- [ ] Estrelas visíveis atrás do robô
- [ ] Bolas glow não interferem

### Técnico
- [ ] Lighthouse Performance
- [ ] Lighthouse Accessibility (vai cair score)
- [ ] Teste em mobile real
- [ ] Teste em tablets
- [ ] Teste em diferentes resoluções

### UX
- [ ] Usuário entende que deve scrollar?
- [ ] Tempo na página aumentou ou diminuiu?
- [ ] Bounce rate mudou?
- [ ] Conversão foi afetada?
- [ ] Feedback qualitativo dos usuários

---

## 📊 MÉTRICAS

- **Display properties alteradas:** 1 (none)
- **Overflow properties alteradas:** 5 (visible)
- **Max-width aumentado:** +400px (800px → 1200px)
- **Padding adicionado:** 4rem lateral
- **Elementos visíveis na hero:** 1 (apenas robô)
- **Conteúdo textual:** 0 (100% oculto)

---

## 💡 INSIGHTS DE DESIGN

### Quando Usar Hero Sem Texto
1. **Brand recognition alta** - Usuário já conhece
2. **Produto auto-explicativo** - Visual conta tudo
3. **Experiência prioritária** - Engajamento > conversão
4. **Conteúdo detalhado abaixo** - Hero é teaser
5. **Diferenciação competitiva** - Ousadia como estratégia

### Riscos Mitigados
- Conteúdo mantido no HTML (SEO/a11y parcial)
- Seções seguintes têm contexto completo
- Fácil reverter mudando display: none → flex

---

## 🔗 REFERÊNCIAS

- Base: CHECKPOINT-v2.6.0.md
- Inspiração: Apple product launches (minimal heroes)
- CSS overflow-x: clip - https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
- Spline 3D: https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode

---

**Status:** ✅ Completo - Hero ultra minimalista com robô solo
**Branch:** main
**Autor:** webdev_ + Claude Code
**Recomendação:** A/B test com v2.6.0 (com texto) para validar abordagem
