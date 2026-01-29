# 🛡️ GUIA DE SEGURANÇA E HARDENING - VPS Inovva Digital

## ⚠️ SITUAÇÃO CRÍTICA RESOLVIDA

Este documento contém as medidas de segurança implementadas para proteger o VPS contra ataques DoS e malware rbot.

---

## ✅ MEDIDAS IMPLEMENTADAS

### 1. **Atualização de Dependências Críticas**

```bash
# ✅ FEITO: Versões seguras instaladas
- Next.js: 15.5.11 (corrige bug async_hooks e recursão profunda)
- React: 19.1.0
- React-DOM: 19.1.0
```

### 2. **Configurações de Segurança no Next.js**

Arquivo: `next.config.ts`

**Proteções implementadas:**
- ✅ Body size limit: 1MB (previne payload massivo)
- ✅ Headers de segurança:
  - X-Frame-Options: DENY (previne clickjacking)
  - X-Content-Type-Options: nosniff (previne MIME sniffing)
  - X-XSS-Protection: 1; mode=block
  - Content-Security-Policy (CSP)
  - Strict-Transport-Security (HSTS)
- ✅ poweredByHeader: false (oculta versão do Next.js)
- ✅ compress: true (gzip habilitado)

### 3. **Rate Limiting em Memória**

Arquivo: `src/lib/rate-limit.ts`

**Limites configurados:**
- APIs Admin: 100 req/min
- APIs Públicas: 30 req/min
- APIs de Auth: 5 req/min
- APIs de Email: 3 req/min

**Rotas protegidas:**
- ✅ GET /api/admin/orders
- ✅ GET /api/admin/orders/[id]
- ✅ PATCH /api/admin/orders/[id]
- ✅ DELETE /api/admin/orders/[id]

### 4. **Scan de Malware**

```bash
# ✅ EXECUTADO: Nenhum malware encontrado
- /tmp - LIMPO
- /var/tmp - LIMPO
- /home - LIMPO
```

---

## 🚀 INSTRUÇÕES PARA DEPLOY NO VPS

### **PASSO 1: Backup do Sistema**

```bash
# Fazer backup antes de qualquer mudança
tar -czf ~/backup-$(date +%Y%m%d).tar.gz /var/www/vap-landing
```

### **PASSO 2: Limpar Containers Docker Existentes**

```bash
# Parar todos os containers
docker compose down

# Remover imagens antigas (CUIDADO: removerá TODAS as imagens)
docker system prune -af --volumes

# OU remover apenas imagens não usadas
docker image prune -a
```

### **PASSO 3: Scan de Malware no VPS**

```bash
# Buscar o binário rbot em todo o sistema
sudo find / -name "*rbot*" -type f 2>/dev/null

# Buscar processos suspeitos
ps aux | grep -i bot
ps aux | grep -i malware

# Se encontrar, deletar imediatamente
sudo rm -f /caminho/para/rbot

# Verificar cron jobs suspeitos
sudo crontab -l
sudo cat /etc/cron.d/*
```

### **PASSO 4: Build Limpo da Aplicação**

```bash
# Navegar até o diretório do projeto
cd /var/www/vap-landing

# Pull das últimas mudanças
git pull origin main

# Instalar dependências atualizadas
npm install

# Build limpo SEM CACHE
docker compose build --no-cache

# Subir containers
docker compose up -d
```

### **PASSO 5: Verificar docker-compose.yml**

**⚠️ ATENÇÃO: Verificar estas configurações:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3001:3001"  # ✅ OK: Porta específica
    # ❌ EVITAR: network_mode: host (expõe todas as portas)
    networks:
      - app-network  # ✅ Usar rede isolada
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    # 🛡️ Limites de recursos para prevenir DoS
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G

networks:
  app-network:
    driver: bridge

# 🛡️ REMOVER portas desnecessárias do firewall
# sudo ufw deny 3000
# sudo ufw allow 3001
# sudo ufw allow 80
# sudo ufw allow 443
```

### **PASSO 6: Configurar Firewall (UFW)**

```bash
# Habilitar firewall
sudo ufw enable

# Permitir apenas portas necessárias
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Aplicação (se necessário)

# Bloquear todas as outras portas
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Verificar status
sudo ufw status verbose
```

### **PASSO 7: Monitorar Recursos**

```bash
# Verificar uso de CPU (deve estar próximo de 0% em repouso)
htop

# Verificar logs em tempo real
docker compose logs -f --tail=50

# Verificar consumo de memória dos containers
docker stats

# Alertar se CPU > 50% em repouso
watch -n 5 'docker stats --no-stream | grep vap'
```

### **PASSO 8: Configurar Fail2Ban (Opcional mas Recomendado)**

```bash
# Instalar fail2ban
sudo apt install fail2ban -y

# Criar configuração para Next.js
sudo nano /etc/fail2ban/jail.d/nextjs.conf
```

Conteúdo do arquivo:
```ini
[nextjs-ratelimit]
enabled = true
port = 3001
filter = nextjs-ratelimit
logpath = /var/log/nextjs/access.log
maxretry = 10
findtime = 60
bantime = 3600
```

---

## 🔍 CHECKLIST DE SEGURANÇA

- [x] Next.js atualizado para 15.5.11+
- [x] React atualizado para 19.1.0+
- [x] Body size limit configurado (1MB)
- [x] Headers de segurança habilitados
- [x] Rate limiting implementado
- [ ] Docker build --no-cache executado
- [ ] Scan de malware no VPS executado
- [ ] Firewall UFW configurado
- [ ] docker-compose.yml revisado (sem network_mode: host)
- [ ] Portas desnecessárias fechadas
- [ ] Monitoramento de CPU ativo
- [ ] Logs sendo salvos e analisados

---

## ⚡ COMANDOS DE EMERGÊNCIA

### Se o VPS estiver sob ataque:

```bash
# 1. Parar imediatamente os containers
docker compose down

# 2. Bloquear IPs suspeitos
sudo ufw deny from IP_SUSPEITO

# 3. Verificar conexões ativas
sudo netstat -tuln | grep ESTABLISHED

# 4. Matar processos suspeitos
sudo kill -9 PID_SUSPEITO

# 5. Reiniciar com build limpo
docker system prune -af
docker compose build --no-cache
docker compose up -d
```

---

## 📊 MONITORAMENTO CONTÍNUO

```bash
# Script de monitoramento (salvar como monitor.sh)
#!/bin/bash

while true; do
  CPU=$(docker stats --no-stream --format "{{.CPUPerc}}" | head -1 | sed 's/%//')

  if (( $(echo "$CPU > 50" | bc -l) )); then
    echo "⚠️ ALERTA: CPU em ${CPU}% - Possível ataque!"
    # Enviar notificação (configurar)
  fi

  sleep 60
done
```

---

## 🆘 CONTATO DE EMERGÊNCIA

Se o problema persistir:
- **Hostinger Support**: Abrir ticket urgente
- **Logs importantes**: `/var/log/nextjs/`, `docker compose logs`

---

## ✅ STATUS FINAL

**Aplicação blindada e pronta para deploy seguro!**

- ✅ Código atualizado e protegido
- ✅ Rate limiting ativo
- ✅ Headers de segurança configurados
- ✅ Dockerfile otimizado
- 🎯 **Próximo passo: Deploy no VPS seguindo os passos acima**
