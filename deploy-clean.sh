#!/bin/bash
# 🚨 SCRIPT DE DEPLOY LIMPO - VPS VAP LANDING
# Execute este script após o servidor reiniciar

set -e  # Parar se houver erro

echo "🚀 Iniciando deploy limpo..."

# 1. Navegar para o diretório
cd /var/www/vap-landing

# 2. Atualizar código
echo "📦 Atualizando código do GitHub..."
git pull origin main

# 3. Verificar commits
echo "✅ Commits recentes:"
git log --oneline -n 3

# 4. Parar containers se houver algum rodando
echo "🛑 Parando containers existentes..."
docker stop $(docker ps -q) 2>/dev/null || true
docker rm $(docker ps -a -q) 2>/dev/null || true

# 5. Verificar se ainda há malware
echo "🔍 Verificando malware..."
RBOT_COUNT=$(sudo find / -name "*rbot*" -type f 2>/dev/null | wc -l)
if [ "$RBOT_COUNT" -gt 0 ]; then
    echo "⚠️  AVISO: $RBOT_COUNT arquivo(s) rbot encontrado(s)!"
    sudo find / -name "*rbot*" -type f 2>/dev/null
    echo "🧹 Limpando overlay do Docker..."
    docker system prune -af --volumes
else
    echo "✅ Nenhum malware encontrado"
fi

# 6. Build limpo
echo "🔨 Fazendo build limpo (isso vai demorar ~5-10 min)..."
docker build -t kauecavalcante/vap-landing:latest --no-cache --pull .

# 7. Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "⚠️  AVISO: Arquivo .env não encontrado!"
    echo "Criando .env vazio (você precisa preenchê-lo manualmente)"
    touch .env
fi

# 8. Rodar container
echo "🚀 Subindo aplicação..."
docker run -d \
  --name vap-landing-container \
  -p 3001:3001 \
  --env-file .env \
  --restart unless-stopped \
  kauecavalcante/vap-landing:latest

# 9. Aguardar 5 segundos
sleep 5

# 10. Verificar status
echo ""
echo "📊 Status dos containers:"
docker ps

echo ""
echo "📋 Logs da aplicação (últimas 20 linhas):"
docker logs --tail=20 vap-landing-container

echo ""
echo "💻 Uso de recursos:"
docker stats --no-stream

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "🔍 Para verificar logs em tempo real:"
echo "   docker logs -f vap-landing-container"
echo ""
echo "🌐 Para testar a aplicação:"
echo "   curl http://localhost:3001"
