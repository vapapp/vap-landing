# Estágio 1: Instalação das dependências
# ATUALIZADO: Usando Node.js v20 para compatibilidade com Firebase
FROM node:20-alpine AS deps
WORKDIR /app

# Copia os arquivos de manifesto de pacotes
COPY package.json package-lock.json ./

# Instala as dependências de produção (agora incluirá o TypeScript)
RUN npm install --production

# ---
 
# Estágio 2: Build da aplicação
# ATUALIZADO: Usando Node.js v20 para consistência
FROM node:20-alpine AS builder
WORKDIR /app

# Copia as dependências já instaladas do estágio anterior
COPY --from=deps /app/node_modules ./node_modules
# Copia o restante do código da aplicação
COPY . .

# As variáveis de ambiente (configuradas como GitHub Secrets) serão injetadas aqui
# O Next.js as usará durante o build para criar a versão de produção
RUN npm run build

# ---

# Estágio 3: Imagem final de produção
# ATUALIZADO: Usando Node.js v20 para a execução
FROM node:20-alpine AS runner
WORKDIR /app

# Define o ambiente como produção
ENV NODE_ENV=production

# Copia os arquivos de build do estágio 'builder'
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta 3001, que é a porta que a aplicação usa
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]