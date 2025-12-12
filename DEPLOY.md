# 🚀 Guia de Deploy - VAP Landing Page

## 📋 Visão Geral

Este projeto utiliza **Docker + GitHub Actions** para deploy automático no VPS da Hostinger.

### Stack Tecnológica
- **Framework**: Next.js 15.5.0
- **Runtime**: Node.js 20 (Alpine)
- **Container**: Docker
- **CI/CD**: GitHub Actions
- **Registry**: DockerHub
- **Servidor**: VPS Hostinger (srv976180)
- **Proxy**: Nginx
- **Porta**: 3001


---

## 🔄 Como Funciona o Deploy Automático

### Fluxo Completo

1. **Desenvolvedor faz push na branch `main`**
   ```bash
   git add .
   git commit -m "feat: Nova funcionalidade"
   git push origin main
   ```

2. **GitHub Actions é acionado automaticamente**
   - Cria arquivo `.env.production` com secrets do Firebase
   - Builda imagem Docker multi-stage
   - Faz push para DockerHub: `kauecavalcante/vap-landing:latest`

3. **Deploy no VPS via SSH**
   - Conecta no servidor via SSH
   - Faz pull da nova imagem
   - Para container antigo (`vap-landing-container`)
   - Remove container antigo
   - Inicia novo container com variáveis de ambiente

4. **Aplicação atualizada está no ar**
   - Nginx (proxy reverso) direciona tráfego para porta 3001
   - SSL automático via Let's Encrypt
   - Site acessível em https://vap-app.com.br

---

## 📁 Arquivos de Configuração

### 1. Dockerfile
Localização: `/Dockerfile`

Multi-stage build otimizado:
- **Stage 1 (deps)**: Instala todas as dependências
- **Stage 2 (builder)**: Faz build da aplicação Next.js
- **Stage 3 (runner)**: Imagem final de produção (leve)

### 2. GitHub Actions Workflow
Localização: `/.github/workflows/deploy.yml`

Responsável por:
- Build da imagem Docker
- Push para DockerHub
- Deploy automático no VPS

### 3. Nginx
Localização no VPS: `/etc/nginx/sites-enabled/vap-app.com.br`

Configuração de proxy reverso para porta 3001.

---

## 🔑 Secrets do GitHub

O projeto requer os seguintes secrets configurados em:
**Settings → Secrets and variables → Actions → Repository secrets**

### Docker
- `DOCKERHUB_USERNAME` - Usuário do DockerHub
- `DOCKERHUB_TOKEN` - Token de acesso do DockerHub

### VPS
- `VPS_SSH_HOST` - IP do servidor (72.60.56.8)
- `VPS_SSH_USER` - Usuário SSH (root)
- `VPS_SSH_KEY` - Chave privada SSH para autenticação

### API Keys
- `OPENAI_API_KEY` - Chave da API OpenAI

### Firebase (Build-time)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

> **Nota**: As variáveis do Firebase são injetadas durante o build e ficam embarcadas no código JavaScript compilado. A `OPENAI_API_KEY` é passada em runtime para o container.

---

## 🛠️ Comandos Úteis

### No VPS (Servidor de Produção)

#### Verificar Status do Container
```bash
docker ps
```

#### Ver Logs da Aplicação
```bash
# Últimas 100 linhas
docker logs vap-landing-container --tail 100

# Logs em tempo real
docker logs -f vap-landing-container
```

#### Reiniciar Container
```bash
docker restart vap-landing-container
```

#### Parar Container
```bash
docker stop vap-landing-container
```

#### Atualizar Manualmente (Forçar Novo Deploy)
```bash
# Pull da última versão
docker pull kauecavalcante/vap-landing:latest

# Parar e remover container antigo
docker stop vap-landing-container
docker rm vap-landing-container

# Iniciar novo container
docker run -d --restart always \
  -p 3001:3001 \
  --name vap-landing-container \
  -e OPENAI_API_KEY="sua-chave-aqui" \
  kauecavalcante/vap-landing:latest
```

#### Verificar Porta 3001
```bash
# Ver o que está usando a porta
sudo lsof -i :3001

# Testar se a aplicação responde
curl http://localhost:3001
```

#### Ver Imagens Docker
```bash
docker images | grep vap-landing
```

#### Limpar Imagens Antigas
```bash
docker image prune -a
```

### No Desenvolvimento Local

#### Build Local da Imagem
```bash
docker build -t kauecavalcante/vap-landing:latest .
```

#### Rodar Localmente
```bash
docker run -p 3001:3001 \
  -e OPENAI_API_KEY="sua-chave" \
  kauecavalcante/vap-landing:latest
```

#### Testar GitHub Actions Localmente
Requer [act](https://github.com/nektos/act):
```bash
act push -s DOCKERHUB_USERNAME=seu-usuario
```

---

## 🐛 Troubleshooting

### 🔴 Site Inacessível (Timeout)

**Diagnóstico:**
```bash
# No VPS
docker ps  # Verificar se container está rodando
docker logs vap-landing-container  # Ver logs de erro
sudo lsof -i :3001  # Verificar se porta está ocupada
sudo systemctl status nginx  # Verificar status do Nginx
curl http://localhost:3001  # Testar localmente
```

**Soluções:**

1. **Container não está rodando:**
   ```bash
   docker start vap-landing-container
   # ou
   # Seguir passos de "Atualizar Manualmente" acima
   ```

2. **Porta 3001 ocupada por outro processo:**
   ```bash
   # Identificar processo
   sudo lsof -i :3001

   # Se for container antigo/duplicado
   docker ps -a
   docker rm -f <container-id>
   ```

3. **Nginx com problema:**
   ```bash
   sudo nginx -t  # Testar configuração
   sudo systemctl restart nginx
   ```

### 🔴 Deploy Automático Não Funciona

**Diagnóstico:**
1. Verificar execução do workflow em: https://github.com/vapapp/vap-landing/actions
2. Ver logs de erros no GitHub Actions
3. Verificar se todos os secrets estão configurados

**Soluções:**

1. **Workflow não executa:**
   - Verificar se está na branch `main`
   - Verificar permissões do GitHub Actions em Settings → Actions

2. **Erro de autenticação SSH:**
   - Verificar secret `VPS_SSH_KEY`
   - Testar conexão SSH manualmente

3. **Erro no DockerHub:**
   - Verificar secrets `DOCKERHUB_USERNAME` e `DOCKERHUB_TOKEN`
   - Verificar quota do DockerHub

### 🔴 Erro "Port Already in Use"

**Causa:** Outro processo (Docker ou PM2) usando a porta 3001.

**Solução:**
```bash
# 1. Identificar o processo
sudo lsof -i :3001

# 2a. Se for PM2:
pm2 list
pm2 stop landing-page
pm2 delete landing-page

# 2b. Se for outro container Docker:
docker ps -a
docker stop <container-name>
docker rm <container-name>

# 3. Iniciar container correto
docker start vap-landing-container
```

### 🔴 Variáveis de Ambiente Não Funcionam

**Diagnóstico:**
```bash
# Ver variáveis do container
docker inspect vap-landing-container | grep -A 20 "Env"
```

**Soluções:**

1. **Para variáveis do Firebase (NEXT_PUBLIC_*):**
   - São injetadas durante o build
   - Fazer novo push para acionar rebuild
   - Verificar GitHub Secrets

2. **Para OPENAI_API_KEY:**
   - É injetada em runtime
   - Recriar container com variável correta
   - Verificar GitHub Secret

---

## 🚨 Nunca Faça Isso

### ❌ Não mate processos Docker aleatoriamente
```bash
# ❌ ERRADO
sudo fuser -k 3001/tcp  # Pode matar o container correto
```

### ❌ Não use PM2 neste projeto
Este projeto usa Docker, não PM2. Usar PM2 causa conflito de porta.

### ❌ Não comite secrets no código
Sempre use GitHub Secrets. Nunca comite:
- `.env`
- `.env.local`
- `.env.production`
- Chaves de API

### ❌ Não altere Nginx manualmente sem backup
```bash
# ✅ CERTO - Fazer backup antes
sudo cp /etc/nginx/sites-enabled/vap-app.com.br /etc/nginx/sites-enabled/vap-app.com.br.backup
```

---

## 📊 Checklist de Verificação

### Antes de Fazer Deploy
- [ ] Código testado localmente
- [ ] Build local funciona (`npm run build`)
- [ ] Commit com mensagem clara
- [ ] Push para branch `main`

### Após Deploy Automático
- [ ] GitHub Actions executou sem erros
- [ ] Imagem foi enviada para DockerHub
- [ ] Container foi atualizado no VPS
- [ ] Site está acessível em https://vap-app.com.br
- [ ] Funcionalidades funcionam corretamente

### Se Algo Der Errado
- [ ] Verificar logs do GitHub Actions
- [ ] Verificar logs do container: `docker logs vap-landing-container`
- [ ] Verificar logs do Nginx: `tail -f /var/log/nginx/error.log`
- [ ] Testar localmente: `curl http://localhost:3001`
- [ ] Verificar DNS: `dig vap-app.com.br`

---

## 📞 Informações Importantes

### URLs
- **Produção**: https://vap-app.com.br
- **GitHub**: https://github.com/vapapp/vap-landing
- **GitHub Actions**: https://github.com/vapapp/vap-landing/actions
- **DockerHub**: https://hub.docker.com/r/kauecavalcante/vap-landing

### Credenciais
- **VPS IP**: 72.60.56.8
- **VPS User**: root
- **Container Name**: vap-landing-container
- **Docker Image**: kauecavalcante/vap-landing:latest

### Portas
- **Aplicação**: 3001
- **Nginx**: 80 (HTTP) → redireciona para 443
- **Nginx**: 443 (HTTPS)

---

## 🔄 Histórico de Mudanças

### 2024-12-12
- Sistema Docker restaurado após conflito com PM2
- Documentação criada
- Deploy automático funcionando

---

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Docker](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Nginx Docs](https://nginx.org/en/docs/)

---

**Última atualização**: 12/12/2024
