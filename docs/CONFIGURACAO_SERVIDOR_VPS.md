# 📋 Relatório de Configuração do Servidor VPS - VAP-APP.COM.BR

**Última Atualização:** 02 de fevereiro de 2026

Este documento detalha a configuração atual do servidor e o fluxo de deploy para a aplicação vap-landing, hospedada em vap-app.com.br.

---

## 1. Informações Gerais

| Propriedade | Valor |
|------------|-------|
| **Sistema Operacional** | Ubuntu 24.04 LTS |
| **Endereço IP** | 72.60.56.8 |
| **Domínio Principal** | vap-app.com.br (e www.vap-app.com.br) |
| **Provedor** | Hostinger VPS (srv976180) |
| **Acesso** | SSH com chave privada (porta 22) |

---

## 2. Arquitetura de Software no Servidor

A infraestrutura foi simplificada para rodar a aplicação de forma containerizada, garantindo consistência e segurança.

### 2.1. Software Instalado

#### **Docker** (Container Runtime)
- **Versão:** Docker Engine (latest)
- **Função:** Executa a aplicação Next.js em um container isolado
- **Container Ativo:** `vap-landing-container`
- **Porta Exposta:** 3001
- **Restart Policy:** `always` (reinicia automaticamente em caso de falha ou reboot)
- **Registry:** Docker Hub (imagens privadas)

#### **Nginx** (Reverse Proxy)
- **Versão:** Nginx (stable)
- **Função:** Proxy reverso para rotear tráfego HTTP/HTTPS para o container Docker
- **Portas:** 80 (HTTP), 443 (HTTPS)
- **Upstream:** localhost:3001
- **Recursos:**
  - Suporte a WebSockets (Firebase Realtime)
  - Compressão gzip
  - Headers de segurança
  - Redirecionamento HTTP → HTTPS

#### **Certbot** (Gerenciamento SSL)
- **Versão:** Certbot (Let's Encrypt)
- **Função:** Gerencia certificados SSL/TLS
- **Renovação:** Automática (via cron)
- **Domínios:** vap-app.com.br, www.vap-app.com.br

#### **UFW** (Firewall)
- **Status:** Ativo
- **Política Padrão:** Deny incoming, Allow outgoing
- **Regras Configuradas:** Ver seção 4

---

## 3. Estrutura de Arquivos e Configurações

### 3.1. Configuração do Nginx

**Localização:** `/etc/nginx/sites-available/vap-app.com.br`

**Symlink:** `/etc/nginx/sites-enabled/vap-app.com.br`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name vap-app.com.br www.vap-app.com.br;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name vap-app.com.br www.vap-app.com.br;

    # Certificados SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/vap-app.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vap-app.com.br/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Configurações de segurança
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy para o container Docker
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Suporte a WebSockets (Firebase)
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Logs
    access_log /var/log/nginx/vap-app.access.log;
    error_log /var/log/nginx/vap-app.error.log;
}
```

### 3.2. Certificados SSL

**Localização:** `/etc/letsencrypt/live/vap-app.com.br/`

**Arquivos:**
- `fullchain.pem` - Certificado completo
- `privkey.pem` - Chave privada
- `chain.pem` - Cadeia de certificados
- `cert.pem` - Certificado do domínio

**Renovação Automática:**
```bash
# Cron configurado pelo Certbot
# Testa renovação 2x por dia
0 */12 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

**Comando Manual de Renovação:**
```bash
sudo certbot renew --nginx
```

### 3.3. Container Docker

**Nome:** `vap-landing-container`

**Imagem:** `[dockerhub-username]/vap-landing:latest`

**Comando de Execução:**
```bash
docker run -d --restart always \
  -p 3001:3001 \
  --name vap-landing-container \
  -e OPENAI_API_KEY="***" \
  -e NEXT_PUBLIC_FIREBASE_API_KEY="***" \
  -e NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="***" \
  -e NEXT_PUBLIC_FIREBASE_PROJECT_ID="***" \
  -e NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="***" \
  -e NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="***" \
  -e NEXT_PUBLIC_FIREBASE_APP_ID="***" \
  -e NEXT_PUBLIC_GA_MEASUREMENT_ID="***" \
  -e NEXT_PUBLIC_SUPABASE_URL="***" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="***" \
  -e SUPABASE_SERVICE_ROLE_KEY="***" \
  -e RESEND_API_KEY="***" \
  -e RESEND_FROM_EMAIL="pedidos@vap-app.com.br" \
  [dockerhub-username]/vap-landing:latest
```

**Comandos Úteis:**
```bash
# Ver logs do container
docker logs vap-landing-container -f

# Verificar status
docker ps | grep vap-landing

# Reiniciar container
docker restart vap-landing-container

# Acessar shell do container
docker exec -it vap-landing-container sh

# Ver uso de recursos
docker stats vap-landing-container
```

---

## 4. Configuração do Firewall (UFW)

### 4.1. Status e Política Padrão

```bash
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
```

### 4.2. Regras Configuradas

#### **Regras para Tráfego Web**
```
Nginx Full                 ALLOW       Anywhere
Nginx Full (v6)            ALLOW       Anywhere (v6)
```
- **Porta 80** (HTTP)
- **Porta 443** (HTTPS)

#### **Regras para SSH**
```
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
```
- **Porta 22** (SSH)

#### **Regras para Docker (Container)**
```
3001/tcp                   ALLOW       Anywhere
3001/tcp (v6)              ALLOW       Anywhere (v6)
```
- **Porta 3001** (Aplicação Next.js)

#### **Regras para GitHub Actions (CI/CD)** ⭐ **NOVO**
```
22                         ALLOW       20.0.0.0/8                 # GitHub Actions
22                         ALLOW       13.64.0.0/11               # GitHub Actions
22                         ALLOW       13.105.17.0/26             # GitHub Actions
22                         ALLOW       13.105.17.64/26            # GitHub Actions
22                         ALLOW       13.105.17.128/26           # GitHub Actions
22                         ALLOW       13.105.17.192/26           # GitHub Actions
```

**Justificativa:**
- Permite que o GitHub Actions faça deploy via SSH
- Cobre ranges principais do Azure/GitHub (20.0.0.0/8, 13.64.0.0/11)
- Inclui IPs específicos do GitHub Actions

### 4.3. Comandos de Gerenciamento do Firewall

```bash
# Ver status detalhado
sudo ufw status verbose

# Ver regras numeradas
sudo ufw status numbered

# Adicionar nova regra
sudo ufw allow from [IP/RANGE] to any port 22 comment 'Descrição'

# Deletar regra por número
sudo ufw delete [NÚMERO]

# Recarregar firewall
sudo ufw reload

# Desabilitar/Habilitar
sudo ufw disable
sudo ufw enable
```

### 4.4. Atualização dos Ranges do GitHub Actions

**Quando atualizar:** Se o GitHub Actions começar a falhar com timeout SSH

**Como atualizar:**
```bash
# Baixar lista atual de IPs do GitHub
curl -s https://api.github.com/meta | jq -r '.actions[]' > github-ips.txt

# Adicionar novos ranges conforme necessário
# Ver: https://api.github.com/meta
```

---

## 5. Fluxo de Deploy (CI/CD com GitHub Actions)

O processo de deploy é totalmente automatizado e containerizado:

### 5.1. Workflow Completo

```
┌─────────────────────────────────────────────────────────────────┐
│  1. DESENVOLVEDOR: Push para branch main                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. GITHUB ACTIONS: Workflow é disparado (.github/workflows/)   │
│     ├─ Checkout do código                                       │
│     ├─ Setup Docker Buildx                                      │
│     ├─ Login no Docker Hub                                      │
│     └─ Criar .env.production com secrets                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. BUILD: Construir imagem Docker                              │
│     ├─ Usar Dockerfile multi-stage                              │
│     ├─ Instalar dependências (npm ci)                           │
│     ├─ Build Next.js (next build)                               │
│     └─ Otimizar imagem final (node:20-alpine)                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. DOCKER HUB: Push da imagem                                  │
│     └─ Tag: [dockerhub-username]/vap-landing:latest             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. VPS: Deploy via SSH (appleboy/ssh-action)                   │
│     ├─ Conectar ao VPS (72.60.56.8:22)                          │
│     ├─ Login no Docker Hub                                      │
│     ├─ Pull da nova imagem                                      │
│     ├─ Parar container antigo (vap-landing-container)           │
│     ├─ Remover container antigo                                 │
│     ├─ Resolver conflitos de porta 3001                         │
│     └─ Iniciar novo container com variáveis de ambiente         │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. NGINX: Proxy reverso serve o tráfego                        │
│     └─ https://vap-app.com.br → localhost:3001                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2. Arquivo de Workflow

**Localização:** `.github/workflows/deploy.yml`

**Trigger:** Push na branch `main`

**Jobs:**
1. **Checkout code** - Baixa o repositório
2. **Set up Docker Buildx** - Configura builder multi-plataforma
3. **Log in to Docker Hub** - Autentica no registry
4. **Create .env.production** - Injeta variáveis de ambiente
5. **Build and push** - Constrói e envia imagem
6. **Deploy to VPS** - Executa deploy via SSH

### 5.3. Secrets Necessários no GitHub

**Localização:** `Settings → Secrets and variables → Actions`

#### **Docker Hub**
- `DOCKERHUB_USERNAME` - Usuário do Docker Hub
- `DOCKERHUB_TOKEN` - Token de acesso (não senha)

#### **VPS SSH**
- `VPS_SSH_HOST` - `72.60.56.8`
- `VPS_SSH_USER` - `root`
- `VPS_SSH_KEY` - Chave SSH privada completa

#### **Variáveis de Ambiente da Aplicação**
- `OPENAI_API_KEY` - Chave da API OpenAI
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API Key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase Auth Domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase Project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase Storage
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase Messaging
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase App ID
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID
- `NEXT_PUBLIC_SUPABASE_URL` - URL do Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - ⚠️ **NUNCA** expor no frontend
- `RESEND_API_KEY` - Chave da API Resend (emails)
- `RESEND_FROM_EMAIL` - `pedidos@vap-app.com.br`

### 5.4. Tempo Médio de Deploy

| Etapa | Tempo Estimado |
|-------|----------------|
| Checkout + Setup | ~30 segundos |
| Build Docker | ~2-3 minutos |
| Push para Docker Hub | ~1 minuto |
| Deploy no VPS | ~1 minuto |
| **TOTAL** | **~4-6 minutos** |

---

## 6. Monitoramento e Logs

### 6.1. Logs do Nginx

```bash
# Access logs
sudo tail -f /var/log/nginx/vap-app.access.log

# Error logs
sudo tail -f /var/log/nginx/vap-app.error.log

# Ver últimas 100 linhas
sudo tail -100 /var/log/nginx/vap-app.error.log
```

### 6.2. Logs do Container Docker

```bash
# Ver logs em tempo real
docker logs vap-landing-container -f

# Ver últimas 100 linhas
docker logs vap-landing-container --tail 100

# Ver logs com timestamp
docker logs vap-landing-container -t

# Filtrar por erro
docker logs vap-landing-container 2>&1 | grep -i error
```

### 6.3. Logs do Sistema

```bash
# Logs gerais do sistema
sudo journalctl -xe

# Logs do Nginx
sudo journalctl -u nginx -f

# Logs do Docker
sudo journalctl -u docker -f

# Logs de autenticação SSH
sudo tail -f /var/log/auth.log
```

### 6.4. Monitoramento de Recursos

```bash
# Status do servidor
htop

# Uso de disco
df -h

# Uso de memória
free -h

# Processos Docker
docker ps
docker stats

# Conexões de rede
sudo netstat -tulpn | grep LISTEN
```

---

## 7. Procedimentos de Manutenção

### 7.1. Atualização do Sistema

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Atualizar Docker
sudo apt install docker-ce docker-ce-cli containerd.io

# Limpar pacotes não utilizados
sudo apt autoremove -y
sudo apt clean
```

### 7.2. Limpeza de Imagens Docker

```bash
# Listar imagens
docker images

# Remover imagens antigas
docker image prune -a -f

# Limpar todo o sistema Docker
docker system prune -a --volumes -f
```

### 7.3. Reiniciar Serviços

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Reiniciar container Docker
docker restart vap-landing-container

# Reiniciar servidor (último recurso)
sudo reboot
```

### 7.4. Renovação de Certificado SSL

```bash
# Testar renovação
sudo certbot renew --dry-run

# Renovar manualmente
sudo certbot renew --nginx

# Verificar validade
sudo certbot certificates
```

---

## 8. Troubleshooting

### 8.1. Site Fora do Ar

**Verificar em ordem:**

1. **Container rodando?**
   ```bash
   docker ps | grep vap-landing
   ```

2. **Nginx rodando?**
   ```bash
   sudo systemctl status nginx
   ```

3. **Porta 3001 acessível?**
   ```bash
   curl http://localhost:3001
   ```

4. **Firewall permitindo tráfego?**
   ```bash
   sudo ufw status
   ```

### 8.2. Deploy Falhando no GitHub Actions

**Verificar em ordem:**

1. **SSH acessível do GitHub Actions?**
   - Ver logs de autenticação: `sudo tail -f /var/log/auth.log`
   - Verificar ranges de IP no UFW

2. **Secrets configurados?**
   - GitHub → Settings → Secrets → Conferir todos os secrets

3. **Espaço em disco?**
   ```bash
   df -h
   # Se <10% livre, limpar:
   docker system prune -a -f
   ```

### 8.3. Erro 502 Bad Gateway

**Causa comum:** Container não está rodando ou não responde na porta 3001

**Solução:**
```bash
# Ver logs do container
docker logs vap-landing-container --tail 50

# Reiniciar container
docker restart vap-landing-container

# Se persistir, recriar container
docker stop vap-landing-container
docker rm vap-landing-container
# Executar novamente o docker run (ver seção 3.3)
```

### 8.4. Erro de Certificado SSL

**Solução:**
```bash
# Renovar certificado
sudo certbot renew --nginx --force-renewal

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 9. Backup e Recuperação

### 9.1. Backup Recomendado

**Dados a fazer backup:**
- ✅ Certificados SSL: `/etc/letsencrypt/`
- ✅ Configuração Nginx: `/etc/nginx/sites-available/vap-app.com.br`
- ✅ Chave SSH: `/root/.ssh/` (se aplicável)
- ✅ Imagens Docker: Via Docker Hub (já coberto)
- ✅ Banco de dados: Supabase (hospedado externamente)

**Comando de backup:**
```bash
# Criar arquivo tar com backup
sudo tar -czf backup-vps-$(date +%Y%m%d).tar.gz \
  /etc/letsencrypt/ \
  /etc/nginx/sites-available/ \
  /root/.ssh/

# Download via SCP (do seu Mac)
scp root@72.60.56.8:~/backup-vps-*.tar.gz ~/Downloads/
```

### 9.2. Recuperação de Desastre

**Em caso de perda total do servidor:**

1. Provisionar novo VPS Ubuntu 24.04
2. Instalar Docker, Nginx, Certbot, UFW
3. Restaurar backup:
   ```bash
   tar -xzf backup-vps-YYYYMMDD.tar.gz -C /
   ```
4. Configurar firewall (ver seção 4)
5. Executar deploy do GitHub Actions ou deploy manual

---

## 10. Informações de Contato e Suporte

| Serviço | Suporte |
|---------|---------|
| **Hospedagem** | Hostinger - https://www.hostinger.com.br/suporte |
| **Domínio** | (Registrar onde o domínio foi comprado) |
| **Docker Hub** | https://hub.docker.com/ |
| **Let's Encrypt** | https://letsencrypt.org/ |
| **GitHub Actions** | https://github.com/features/actions |

---

## 11. Histórico de Mudanças

| Data | Mudança | Autor |
|------|---------|-------|
| 02/02/2026 | Adicionadas regras de firewall para GitHub Actions (ranges 20.0.0.0/8, 13.64.0.0/11) | Kauê Cavalcante |
| 02/02/2026 | Implementada página de Política de Privacidade | Kauê Cavalcante |
| 29/01/2026 | Configurações iniciais do servidor e deploy automatizado | Kauê Cavalcante |

---

## 12. Checklist de Segurança

- [x] Firewall (UFW) ativo e configurado
- [x] SSH com chave (sem senha)
- [x] SSL/TLS configurado (HTTPS)
- [x] Headers de segurança no Nginx
- [x] Container isolado (sem root)
- [x] Secrets protegidos (GitHub Secrets)
- [x] Renovação automática SSL
- [x] Logs sendo gravados
- [ ] Backup automatizado (implementar)
- [ ] Monitoramento de uptime (implementar)
- [ ] Alertas de erro (implementar)

---

**Documento mantido por:** Kauê Cavalcante
**Email:** dpo@vap-app.com.br
**Repositório:** https://github.com/[usuario]/vap-landing

---

> 💡 **Nota:** Este documento deve ser atualizado sempre que houver mudanças significativas na infraestrutura do servidor.
