# 💬 Manual do Sistema de Atendimento Automático – WhatsApp

Uma página de apresentação e tutorial para o sistema de atendimento automático via WhatsApp.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

---

## 📁 Estrutura de Arquivos

```
manual-whatsapp-atendimento/
├── index.html          # Página principal (HTML)
├── style.css           # Estilos visuais (CSS)
├── README.md           # Este arquivo (documentação)
└── .gitignore          # Arquivos ignorados pelo Git
```

---

## 🚀 Como Publicar no Netlify com GitHub

### Opção 1: Conectar GitHub ao Netlify (Deploy Automático) ⭐ RECOMENDADO

Essa é a melhor forma! Toda vez que você fizer push no GitHub, o Netlify atualiza o site automaticamente.

1. **Fazer push para o GitHub** (instruções abaixo)
2. **Conectar ao Netlify:**
   - Acesse: https://app.netlify.com/
   - Clique em "Add new site" → "Import an existing project"
   - Escolha "GitHub"
   - Selecione o repositório `manual-whatsapp-atendimento`
   - Configure:
     - **Branch to deploy:** `main` ou `master`
     - **Build command:** deixe vazio
     - **Publish directory:** deixe vazio (raiz do projeto)
   - Clique em "Deploy site"

3. **Pronto! 🎉**
   - Netlify gera uma URL tipo: `https://random-name-123456.netlify.app`
   - Você pode customizar em "Site settings" → "Change site name"

**Vantagens:**
- ✅ Deploy automático a cada push
- ✅ Histórico de deploys
- ✅ Rollback fácil se der problema
- ✅ Preview de branches

---

### Opção 2: Deploy Manual (Mais Rápido para Testar)

1. **Acesse:** https://app.netlify.com/drop
2. **Arraste** a pasta `manual-whatsapp-atendimento` para o site
3. **Pronto!** Site no ar em 30 segundos

**Desvantagem:** Precisa fazer upload manual a cada mudança.

---

## 📦 Como Colocar no GitHub

### Primeiro Push (já está configurado!)

```bash
# 1. Entre na pasta do projeto
cd "c:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\manual-whatsapp-atendimento"

# 2. Inicializar Git (já feito!)
git init

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer o primeiro commit
git commit -m "🎉 Commit inicial: Manual WhatsApp Atendimento Automático"

# 5. Criar repositório no GitHub primeiro (via navegador), depois:
git remote add origin https://github.com/SEU-USUARIO/manual-whatsapp-atendimento.git

# 6. Fazer push
git push -u origin main
```

### Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name:** `manual-whatsapp-atendimento`
3. **Description:** Manual do sistema de atendimento automático via WhatsApp
4. Escolha **Public** ou **Private**
5. **NÃO** marque "Add a README file" (já temos um!)
6. Clique em "Create repository"
7. Copie a URL do repositório e use no comando acima

---

## 🔄 Como Atualizar Depois

### Quando fizer mudanças no código:

```bash
# 1. Verificar o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "Descrição da mudança"

# 4. Enviar para o GitHub
git push

# 5. Netlify atualiza automaticamente! ✨
```

---

## ✏️ Como Editar o Site

### Mudar Textos

Abra [index.html](index.html) em qualquer editor de texto e procure o texto que quer alterar.

**Exemplo:**
```html
<h1>Atendimento Automático no WhatsApp</h1>
```

Mude para:
```html
<h1>Seu Novo Título Aqui</h1>
```

### Mudar Cores

Abra [style.css](style.css) e mude as variáveis no topo:

```css
:root {
  --brand: #4c9fff;        /* Cor principal (azul) */
  --brand-ink: #0a72e2;    /* Azul mais escuro */
  --ok: #3ddc84;           /* Verde de sucesso */
  --warn: #ffd166;         /* Amarelo de aviso */
}
```

### Mudar o Número de WhatsApp

Procure no `index.html` por `5519953330043` e substitua pelo novo número.

**Formato:** Use o padrão internacional sem espaços, hífens ou parênteses.
- ❌ Errado: `(19) 95333-0043`
- ✅ Certo: `5519953330043`

---

## 📱 Responsividade

A página já está **100% responsiva** e funciona perfeitamente em:
- 📱 Celulares (iPhone, Android)
- 📲 Tablets (iPad, etc.)
- 💻 Desktops (todos os tamanhos)

**Teste localmente:**
1. Abra `index.html` no navegador
2. Aperte `F12` (DevTools)
3. Clique no ícone de celular no topo
4. Experimente diferentes tamanhos de tela

---

## 🎨 Tecnologias Utilizadas

- **HTML5** – Estrutura semântica
- **CSS3** – Estilos modernos com variáveis CSS
- **Grid CSS** – Layout responsivo
- **0 dependências** – Funciona offline!

**Performance:**
- ⚡ Carregamento instantâneo
- 📦 ~10KB total (HTML + CSS)
- 🚫 Sem JavaScript (ultra-rápido!)

---

## 🔗 Links Úteis

- **Netlify Docs:** https://docs.netlify.com/
- **GitHub Docs:** https://docs.github.com/
- **HTML Reference:** https://developer.mozilla.org/pt-BR/docs/Web/HTML
- **CSS Reference:** https://developer.mozilla.org/pt-BR/docs/Web/CSS

---

## 📞 Contato Atual no Site

**Número:** +55 19 95333-0043
**Link:** `https://wa.me/5519953330043`

Se mudar o número, **atualize em TODOS os lugares** no `index.html` (são 3 lugares).

---

## 📋 Checklist de Publicação

Antes de publicar, verifique:

- [ ] Número de WhatsApp está correto
- [ ] Textos revisados (sem erros de português)
- [ ] Testado em celular e desktop
- [ ] Links funcionando (clique em todos os botões)
- [ ] Cores da marca corretas (se aplicável)
- [ ] Commit feito no Git
- [ ] Push feito para o GitHub
- [ ] Deploy no Netlify funcionando

---

## 🆘 Problemas Comuns

**❓ O Git não está inicializado:**
```bash
cd "c:\Users\roger\OneDrive\Área de Trabalho\Work\New year shit\manual-whatsapp-atendimento"
git init
```

**❓ Erro ao fazer push:**
```bash
# Verifique se o remote está configurado
git remote -v

# Se não estiver, adicione:
git remote add origin https://github.com/SEU-USUARIO/manual-whatsapp-atendimento.git
```

**❓ A página não carrega o CSS:**
- Verifique se o arquivo `style.css` está na mesma pasta que `index.html`

**❓ O Netlify não está atualizando:**
- Verifique se você fez `git push`
- Vá em "Deploys" no painel do Netlify e veja os logs

---

**Pronto!** 🎉 Você tem tudo o que precisa para publicar e manter essa página.

Se tiver dúvidas, é só perguntar!
