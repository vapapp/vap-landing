# Dashboard de Gerenciamento de Pedidos - Safe

Este documento contém informações importantes sobre o novo dashboard de gerenciamento de pedidos implementado para a empresa Safe.

## Visão Geral

O dashboard permite à Safe gerenciar todos os pedidos do marketplace de forma completa, incluindo:
- Visualização de todos os pedidos com filtros avançados
- Detalhes completos de cada pedido
- Atualização de status e informações de envio
- Envio automático de emails aos clientes quando há mudança de status
- Cancelamento de pedidos

## Estrutura do Projeto

### Arquivos Criados/Modificados

#### Configuração e Bibliotecas
- **src/lib/supabase-admin.ts** - Cliente Supabase com Service Role Key
- **src/lib/resend.ts** - Configuração do Resend para envio de emails
- **.env.local** - Variáveis de ambiente adicionadas

#### Tipos TypeScript
- **src/types/orders.ts** - Todos os tipos relacionados a pedidos

#### API Routes
- **src/app/api/admin/orders/route.ts** - Listagem de pedidos com filtros e paginação
- **src/app/api/admin/orders/[id]/route.ts** - Detalhes, atualização e cancelamento de pedidos

#### Componentes UI
- **src/components/admin/StatusBadge.tsx** - Badge colorido para status do pedido
- **src/components/admin/OrderCard.tsx** - Card de pedido para listagem
- **src/components/admin/OrderFilters.tsx** - Filtros avançados de pedidos

#### Páginas
- **src/app/admin/pedidos/page.tsx** - Página de listagem de pedidos
- **src/app/admin/pedidos/[id]/page.tsx** - Página de detalhes e edição do pedido

#### Utils
- **src/utils/sendOrderStatusEmail.ts** - Sistema de envio de emails com templates

#### Sidebar Atualizada
- **src/components/ui/Sidebar.tsx** - Adicionado link para "Pedidos"

## Configuração Necessária

### 1. Variáveis de Ambiente

Você precisa adicionar as seguintes variáveis no arquivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://yuybfhsgjhihblwuxgfi.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY_HERE"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE"

# Resend Configuration (para envio de emails)
RESEND_API_KEY="YOUR_RESEND_API_KEY_HERE"
RESEND_FROM_EMAIL="pedidos@vapapp.com"
```

#### Como obter as chaves:

**Supabase:**
1. Acesse [supabase.com](https://supabase.com)
2. Faça login no projeto: yuybfhsgjhihblwuxgfi.supabase.co
3. Vá em Settings → API
4. Copie:
   - `anon` key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - `service_role` key → SUPABASE_SERVICE_ROLE_KEY (⚠️ **NUNCA** exponha no frontend!)

**Resend:**
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta ou faça login
3. Vá em "API Keys" e crie uma nova chave
4. Configure o domínio de envio (vapapp.com ou subdomínio)
5. Verifique o domínio seguindo as instruções

### 2. Verificar Banco de Dados Supabase

Certifique-se de que as seguintes tabelas existem no Supabase:

#### marketplace_orders
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → users)
- status (varchar)
- subtotal (decimal)
- shipping_fee (decimal)
- discount (decimal)
- total (decimal)
- shipping_address (jsonb)
- payment_method (varchar)
- payment_status (varchar)
- payment_id (varchar, nullable)
- payment_details (jsonb, nullable)
- tracking_code (varchar, nullable)
- estimated_delivery_date (date, nullable)
- delivered_at (timestamp, nullable)
- customer_notes (text, nullable)
- internal_notes (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
- cancelled_at (timestamp, nullable)
```

#### marketplace_order_items
```sql
- id (uuid, primary key)
- order_id (uuid, foreign key → marketplace_orders)
- product_id (uuid)
- product_snapshot (jsonb) → {sku, name, brand, category, image_url}
- quantity (int)
- unit_price (decimal)
- subtotal (decimal)
```

#### users
```sql
- id (uuid, primary key)
- name (varchar)
- email (varchar)
```

## Funcionalidades Implementadas

### 1. Listagem de Pedidos (/admin/pedidos)

**Recursos:**
- Visualização em cards com informações essenciais
- Filtros por:
  - Status do pedido
  - Método de pagamento
  - Busca por ID ou nome do cliente
- Paginação (20 pedidos por página)
- Estatísticas resumidas:
  - Total de pedidos
  - Página atual
  - Pedidos exibidos

### 2. Detalhes do Pedido (/admin/pedidos/[id])

**Informações Exibidas:**
- Dados do cliente (nome, email)
- Endereço de entrega completo
- Lista de produtos com imagens, quantidades e preços
- Resumo financeiro (subtotal, frete, desconto, total)
- Informações de pagamento
- Status atual do pedido

**Formulário de Edição:**
- Status (dropdown com todos os status disponíveis)
- Código de rastreio
- Data prevista de entrega
- Notas internas (observações da equipe)

**Ações:**
- Salvar Alterações → Atualiza pedido e envia email ao cliente
- Cancelar Pedido → Cancela com confirmação e envia email

### 3. Sistema de Emails Automáticos

Emails são enviados automaticamente quando o status muda para:
- **paid** - "Pagamento Aprovado!"
- **processing** - "Pedido em Preparação"
- **shipped** - "Pedido Enviado!" (com código de rastreamento)
- **delivered** - "Pedido Entregue!"
- **cancelled** - "Pedido Cancelado"
- **refunded** - "Reembolso Processado"

Cada email possui:
- Template profissional com cores da VapApp
- Informações relevantes para cada status
- Links de rastreamento (quando aplicável)
- Assinatura da empresa

## Status Disponíveis

1. **pending** - Pendente
2. **payment_pending** - Aguardando Pagamento
3. **paid** - Pago
4. **processing** - Em Preparação
5. **shipped** - Enviado
6. **delivered** - Entregue
7. **cancelled** - Cancelado
8. **refunded** - Reembolsado

## Segurança

⚠️ **IMPORTANTE:**

1. **Service Role Key**: Nunca exponha a `SUPABASE_SERVICE_ROLE_KEY` no frontend
   - Ela só é usada em API Routes (server-side)
   - Possui acesso total ao banco de dados

2. **Autenticação Firebase**: O dashboard já usa a autenticação Firebase existente
   - Acesso restrito a usuários autenticados
   - Proteção via HOC `withAuth`

3. **API Routes**: Todas as operações administrativas passam por API Routes
   - Validação de campos
   - Prevenção de SQL injection (via Supabase client)

## Como Testar

### 1. Verificar Configuração

```bash
# Certifique-se que as dependências foram instaladas
npm install

# Verifique se as variáveis de ambiente estão configuradas
cat .env.local
```

### 2. Rodar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000/admin

### 3. Fluxo de Teste

1. Faça login com credenciais Firebase
2. Navegue para "Pedidos" no menu lateral
3. Veja a listagem de pedidos (se houver pedidos no banco)
4. Clique em um pedido para ver detalhes
5. Teste atualizar o status
6. Verifique se o email foi enviado (check logs do Resend)

### 4. Criar Pedidos de Teste (Opcional)

Se não houver pedidos no banco, você pode criar alguns usando SQL direto no Supabase:

```sql
-- Inserir pedido de teste
INSERT INTO marketplace_orders (
  id,
  user_id,
  status,
  subtotal,
  shipping_fee,
  discount,
  total,
  shipping_address,
  payment_method,
  payment_status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'USER_ID_HERE', -- Substitua por um user_id válido
  'paid',
  100.00,
  15.00,
  0.00,
  115.00,
  '{"street": "Rua Teste", "number": "123", "neighborhood": "Centro", "city": "São Paulo", "state": "SP", "zip_code": "01234-567"}'::jsonb,
  'card',
  'approved',
  NOW(),
  NOW()
);
```

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se todas as variáveis de ambiente estão no `.env.local`
- Reinicie o servidor de desenvolvimento após adicionar variáveis

### Erro: "Failed to fetch orders"
- Verifique se as tabelas existem no Supabase
- Confirme se a Service Role Key está correta
- Check console do navegador e logs do terminal

### Emails não estão sendo enviados
- Verifique se a `RESEND_API_KEY` está correta
- Confirme se o domínio foi verificado no Resend
- Check logs da API no terminal para ver mensagens de erro

### Erro 404 nas rotas de pedidos
- Verifique se os arquivos foram criados corretamente
- Execute `npm run build` para verificar erros de compilação

## Próximos Passos (Melhorias Futuras)

- [ ] Adicionar gráficos e estatísticas avançadas
- [ ] Implementar histórico de mudanças (audit log)
- [ ] Adicionar exportação de pedidos (CSV/Excel)
- [ ] Implementar busca avançada com mais filtros
- [ ] Adicionar notificações em tempo real
- [ ] Criar relatórios personalizados
- [ ] Implementar sistema de comentários/notas por pedido

## Suporte

Em caso de dúvidas ou problemas:
1. Verifique este README
2. Check logs do console e terminal
3. Verifique a documentação do Supabase e Resend
4. Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido para VapApp - Safe Partnership**
*Última atualização: 21/01/2026*
