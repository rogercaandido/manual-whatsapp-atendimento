# 🚀 Guia Rápido: Como Publicar no Netlify

## ⚡ Passo a Passo Completo (5 minutos)

### 📋 Pré-requisitos

- [ ] Git instalado no computador
- [ ] Conta no GitHub (gratuita)
- [ ] Conta no Netlify (gratuita)

---

## 1️⃣ Configurar o Git (PRIMEIRA VEZ)

Se você nunca usou Git neste computador, precisa configurar seu nome e email:

```bash
# Abra o terminal (Git Bash ou PowerShell) e execute:

git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

**Exemplo:**
```bash
git config --global user.name "Roger Silva"
git config --global user.email "roger@empresa.com.br"
```

✅ Isso é feito **UMA VEZ SÓ** no computador!

---

## 2️⃣ Fazer o Commit Inicial

Agora sim, vamos salvar os arquivos no Git:

```bash
# 1. Navegue até a pasta do projeto
cd "c:/Users/roger/OneDrive/Área de Trabalho/Work/New year shit/manual-whatsapp-atendimento"

# 2. Adicionar arquivos
git add .

# 3. Criar commit
git commit -m "🎉 Commit inicial: Manual WhatsApp Atendimento"

# 4. Renomear branch para 'main' (padrão do GitHub)
git branch -M main
```

---

## 3️⃣ Criar Repositório no GitHub

### Opção A: Via Navegador (Mais Fácil)

1. Acesse: **https://github.com/new**
2. Preencha:
   - **Repository name:** `manual-whatsapp-atendimento`
   - **Description:** `Manual do sistema de atendimento automático via WhatsApp`
   - Escolha **Public** (para Netlify gratuito) ou **Private**
3. **NÃO** marque "Add a README file"
4. Clique em **"Create repository"**

5. Na próxima página, copie os comandos que aparecem em **"…or push an existing repository from the command line"**

Será algo assim:
```bash
git remote add origin https://github.com/SEU-USUARIO/manual-whatsapp-atendimento.git
git push -u origin main
```

6. Execute esses comandos no terminal

---

## 4️⃣ Conectar GitHub ao Netlify

Agora a parte mágica! 🪄

1. **Acesse:** https://app.netlify.com/
2. Faça login (ou crie conta gratuita)
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Escolha **"GitHub"**
5. Autorize o Netlify a acessar sua conta GitHub
6. Selecione o repositório: **`manual-whatsapp-atendimento`**
7. Configure:
   - **Branch to deploy:** `main`
   - **Build command:** *(deixe vazio)*
   - **Publish directory:** *(deixe vazio)*
8. Clique em **"Deploy site"**

---

## 5️⃣ Pronto! 🎉

O Netlify vai:
- ✅ Fazer o deploy automático
- ✅ Gerar uma URL tipo: `https://random-name-123456.netlify.app`
- ✅ Mostrar o status do deploy

### Personalizar a URL

1. No painel do Netlify, vá em **"Site settings"**
2. Clique em **"Change site name"**
3. Digite um nome (ex: `manual-atendimento-whatsapp`)
4. Sua URL fica: `https://manual-atendimento-whatsapp.netlify.app`

---

## 🔄 Como Atualizar o Site Depois

Toda vez que você fizer mudanças:

```bash
# 1. Verificar mudanças
git status

# 2. Adicionar arquivos modificados
git add .

# 3. Fazer commit
git commit -m "Descrição da mudança"

# 4. Enviar para GitHub
git push
```

**✨ O Netlify atualiza automaticamente!** Você não precisa fazer nada no site do Netlify.

---

## 📌 Comandos Úteis

### Ver status dos arquivos
```bash
git status
```

### Ver histórico de commits
```bash
git log --oneline
```

### Ver arquivos no último commit
```bash
git show --name-only
```

### Desfazer mudanças não commitadas
```bash
git checkout .
```

---

## 🆘 Problemas Comuns

### ❌ "fatal: not a git repository"
**Solução:** Você não está na pasta correta.
```bash
cd "c:/Users/roger/OneDrive/Área de Trabalho/Work/New year shit/manual-whatsapp-atendimento"
```

### ❌ "Permission denied (publickey)"
**Solução:** Usar HTTPS em vez de SSH. Quando criar o remote, use:
```bash
git remote add origin https://github.com/SEU-USUARIO/manual-whatsapp-atendimento.git
```

### ❌ "Updates were rejected because the tip of your current branch is behind"
**Solução:** Fazer pull primeiro:
```bash
git pull origin main --rebase
git push
```

### ❌ O Netlify não está atualizando
**Solução:**
1. Verifique se você fez `git push`
2. Vá em "Deploys" no Netlify e veja os logs
3. Clique em "Trigger deploy" → "Deploy site"

---

## 🎯 Resumo Visual

```
┌─────────────────┐
│   Seu Código    │  ← Você edita aqui (VS Code, Notepad, etc.)
└────────┬────────┘
         │ git add . && git commit -m "mensagem"
         ▼
┌─────────────────┐
│   Git Local     │  ← Histórico salvo localmente
└────────┬────────┘
         │ git push
         ▼
┌─────────────────┐
│     GitHub      │  ← Código na nuvem (backup)
└────────┬────────┘
         │ webhook automático
         ▼
┌─────────────────┐
│    Netlify      │  ← Site publicado! 🎉
└─────────────────┘
   https://seu-site.netlify.app
```

---

## ✅ Checklist Final

Antes de considerar pronto:

- [ ] Git configurado (`git config --global`)
- [ ] Commit inicial feito
- [ ] Repositório criado no GitHub
- [ ] Push feito para o GitHub
- [ ] Netlify conectado ao GitHub
- [ ] Site deployado com sucesso
- [ ] URL personalizada (opcional)
- [ ] Site testado em celular e desktop
- [ ] Todos os links funcionando

---

## 🎓 Próximos Passos (Opcional)

Depois que o básico estiver funcionando, você pode:

- 📊 **Adicionar Google Analytics** no Netlify
- 🔒 **Configurar domínio próprio** (ex: manual.suaempresa.com.br)
- 🚀 **Configurar CDN** (já vem automático no Netlify!)
- 📧 **Adicionar formulários** (Netlify Forms)
- 🔔 **Notificações de deploy** (Slack, Discord, email)

---

**Qualquer dúvida, é só perguntar!** 💬

Este guia foi criado para ser **extremamente simples** e **completo**. Se algo não funcionar, volte aqui e siga passo a passo! 🚀
