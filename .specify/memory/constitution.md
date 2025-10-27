# Template Web Page Constitution

## Core Principles

### I. Estrutura e Organização
Manter uma estrutura de arquivos clara e organizada:
- Separação de responsabilidades: HTML (estrutura), CSS (estilo), JS (comportamento)
- Assets organizados em pastas específicas (images/, css/, js/, fonts/)
- Nomenclatura consistente e descritiva para arquivos e pastas
- Documentação mínima (README.md) explicando a estrutura do projeto

### II. HTML Semântico e Acessível
Utilizar HTML5 semântico seguindo as melhores práticas:
- Tags semânticas apropriadas (header, nav, main, section, article, aside, footer)
- Estrutura de headings hierárquica (h1 → h6)
- Atributos alt em todas as imagens
- Labels adequados para formulários
- Atributos ARIA quando necessário para acessibilidade
- Meta tags essenciais (charset, viewport, description)

### III. CSS Responsivo e Manutenível (NON-NEGOTIABLE)
CSS deve ser responsivo e fácil de manter:
- Mobile-first approach obrigatório
- Uso de variáveis CSS para cores, espaçamentos e tipografia
- Media queries para breakpoints padrão (mobile, tablet, desktop)
- Evitar !important exceto quando absolutamente necessário
- Comentários explicando seções principais do CSS
- Organização lógica: reset → variáveis → base → componentes → utilidades

### IV. Performance e Otimização
Garantir que a página carregue rapidamente:
- Imagens otimizadas e com formatos modernos (WebP com fallback)
- CSS e JS minificados em produção
- Lazy loading para imagens abaixo da dobra
- Fontes otimizadas (subsets, display: swap)
- Minimizar requisições HTTP
- Código limpo sem recursos não utilizados

### V. Compatibilidade e Padrões Web
Seguir padrões web atuais:
- Validação HTML/CSS (W3C)
- Compatibilidade com navegadores modernos (últimas 2 versões)
- Graceful degradation para navegadores antigos
- Progressive enhancement quando possível
- Console sem erros JavaScript
- Links e recursos funcionais

## Requisitos Técnicos Mínimos

### Estrutura de Arquivos Base
```
projeto/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── fonts/
└── README.md
```

### Meta Tags Obrigatórias
- charset UTF-8
- viewport para responsividade
- description (SEO)
- title descritivo
- favicon

### Testes de Qualidade
Antes de considerar o template completo:
- Testar em pelo menos 3 navegadores diferentes
- Validar responsividade em mobile, tablet e desktop
- Verificar acessibilidade básica (navegação por teclado, leitores de tela)
- Validar HTML e CSS
- Testar performance (PageSpeed Insights)

## Padrões de Desenvolvimento

### Convenções de Código
- Indentação: 2 ou 4 espaços (consistente no projeto)
- Nomenclatura CSS: kebab-case para classes
- Nomenclatura JS: camelCase para variáveis e funções
- Comentários em português para documentação
- Código em inglês (nomes de variáveis, funções, classes)

### Controle de Versão
- Commits descritivos e em português
- .gitignore configurado (node_modules, arquivos temporários)
- Branches para features quando aplicável
- Tags para versões de release

### Documentação Mínima
README.md deve conter:
- Descrição do projeto
- Estrutura de arquivos
- Como executar/visualizar
- Tecnologias utilizadas
- Créditos e licença (se aplicável)

## Governance

Esta constituição define os requisitos mínimos não negociáveis para páginas web baseadas em templates neste projeto. Qualquer página desenvolvida deve seguir estes princípios para garantir qualidade, manutenibilidade e experiência do usuário consistente.

Exceções devem ser documentadas e justificadas tecnicamente.

**Version**: 1.0.0 | **Ratified**: 2025-10-27 | **Last Amended**: 2025-10-27
