# Estágio 1: Instalação das dependências
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

# ---

# Estágio 2: Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# O .env.production será criado pelo GitHub Actions antes deste passo
RUN npm run build

# ---

# Estágio 3: Imagem final de produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# ADICIONADO: Copia o arquivo .env.production para a imagem final
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3001
CMD ["npm", "start"]