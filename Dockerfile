# Estágio 1: Instalação de TODAS as dependências (incluindo dev)
# Isso é necessário porque o build do Next.js precisa de pacotes como TypeScript e ESLint.
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# ---

# Estágio 2: Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app

# Copia as dependências já instaladas do estágio anterior
COPY --from=deps /app/node_modules ./node_modules
# Copia o restante do código da aplicação
COPY . .

# As variáveis de ambiente serão injetadas aqui pelo GitHub Actions
RUN npm run build

# ---

# Estágio 3: Imagem final de produção
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copia os arquivos de build do estágio 'builder'
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/docs/knowledge_base.md ./docs/knowledge_base.md

# Remove as dependências de desenvolvimento para deixar a imagem final mais leve
RUN npm prune --omit=dev

EXPOSE 3001
CMD ["npm", "start"]