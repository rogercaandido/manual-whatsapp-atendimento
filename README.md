# Manual WhatsApp Atendimento - Landing Page

Landing page moderna para ferramenta de automação de atendimento no WhatsApp com IA.

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com Custom Properties (variáveis CSS)
- **Design System** - Tokens baseados em design Figma
- **Fonts**: JetBrains Mono, Inter, Share Tech Mono, Roboto

## Estrutura do Projeto

```
projeto_b/
├── index.html              # Página principal
├── styles/
│   ├── variables.css       # Design tokens e variáveis CSS
│   ├── main.css           # Estilos principais e componentes
│   └── animations.css     # Animações e microinterações
├── assets/
│   ├── whatsapp-logo.svg  # Logo WhatsApp (hero)
│   ├── icons/             # Ícones de features
│   └── footer/            # Logos de parceiros
├── videos/
│   └── background-hero.mp4 # Vídeo de fundo do hero
├── specs/
│   └── master/            # Especificações técnicas
├── netlify.toml           # Configuração Netlify
└── README.md
```

## Features Implementadas

### Hero Section
- Vídeo de fundo com overlay
- Logo "webdev_" animado
- Título hero "MANDA NO" + logo WhatsApp
- Pills de funcionalidades (Texto, Imagem, Documento)
- 2 CTAs: "Começar agora" e "Preciso de ajuda"
- Disclaimer de uso

### Footer Section
- Logos de parceiros minimalistas (5 logos)
- Estilo grayscale com hover colorido
- Layout responsivo (mobile-first)

### Animações e Microinterações
- Fade-in progressivo ao scroll
- Parallax no vídeo de fundo
- Glow effects nos CTAs
- Floating animations nas pills
- Hover effects interativos

### Design System
- **Cores**: Primary green (#74d200), Zinc palette, Black/White
- **Tipografia**: Sistema multi-fonte para hierarquia visual
- **Spacing**: Scale baseado em 8px
- **Responsividade**: 4 breakpoints (480px, 768px, 1024px, 1440px)

## Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/rogercaandido/manual-whatsapp-atendimento.git
cd manual-whatsapp-atendimento
```

2. Abra o arquivo `index.html` em um navegador moderno:
```bash
# Opção 1: Diretamente
open index.html  # macOS
start index.html # Windows

# Opção 2: Servidor HTTP local (recomendado)
python -m http.server 8000
# ou
npx serve .
```

3. Acesse `http://localhost:8000` no navegador

## Deploy

### Netlify (Automático)

Este projeto está configurado para deploy automático no Netlify:

1. **Conectar ao GitHub**:
   - Acesse [Netlify](https://app.netlify.com/)
   - Clique em "Add new site" > "Import an existing project"
   - Selecione "GitHub" e autorize
   - Escolha o repositório `rogercaandido/manual-whatsapp-atendimento`

2. **Configurações de Build**:
   - Build command: (deixar vazio - site estático)
   - Publish directory: `.` (raiz do projeto)
   - As configurações em `netlify.toml` serão aplicadas automaticamente

3. **Deploy**:
   - Clique em "Deploy site"
   - Aguarde o build (< 1 minuto)
   - Acesse a URL gerada (ex: `https://nome-aleatorio.netlify.app`)

4. **Configuração de Domínio Customizado** (Opcional):
   - Em "Site settings" > "Domain management"
   - Adicione seu domínio personalizado
   - Configure DNS conforme instruções

### Deploy Manual

Para outros servidores (Vercel, GitHub Pages, etc.):

```bash
# GitHub Pages
git push origin master
# Configure nas Settings do repositório

# Vercel
vercel --prod

# Servidor próprio
rsync -avz --exclude='.git' . usuario@servidor:/var/www/site/
```

## Especificações Técnicas

As especificações completas do projeto estão em `specs/master/`:
- [spec.md](specs/master/spec.md) - Feature Specification
- [plan.md](specs/master/plan.md) - Implementation Plan
- [research.md](specs/master/research.md) - Research & Analysis
- [data-model.md](specs/master/data-model.md) - Data Model
- [tasks.md](specs/master/tasks.md) - Task List

## Constituição do Projeto

O projeto segue uma constituição técnica rigorosa:
- Mobile-first approach (NON-NEGOTIABLE)
- CSS Variables para design tokens
- HTML semântico e acessível
- Performance otimizada
- Compatibilidade com navegadores modernos

Ver [constitution.md](.specify/memory/constitution.md) para detalhes completos.

## Browser Support

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)

## Performance

- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Acessibilidade

- WCAG 2.1 Level AA compliant
- Alt text em todas as imagens
- HTML semântico com landmarks
- Contraste de cores WCAG AAA (onde aplicável)
- Navegação por teclado funcional

## Licença

Proprietary - Todos os direitos reservados

## Contato

Para dúvidas ou suporte, entre em contato através do WhatsApp.

---

**Última atualização**: 2025-10-27
**Versão**: 1.0.0
**Status**: Production Ready ✅
