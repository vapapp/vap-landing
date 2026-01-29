# Exemplo de Estrutura de Dados de Pedidos

Este arquivo mostra exemplos de como os dados devem estar estruturados no Supabase.

## Exemplo de Pedido (marketplace_orders)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "shipped",
  "subtotal": 150.00,
  "shipping_fee": 20.00,
  "discount": 10.00,
  "total": 160.00,
  "shipping_address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Jardim Paulista",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01234-567",
    "country": "Brasil"
  },
  "payment_method": "card",
  "payment_status": "approved",
  "payment_id": "PAY_123456789",
  "payment_details": {
    "card_brand": "visa",
    "last_digits": "1234",
    "installments": 3
  },
  "tracking_code": "BR123456789BR",
  "estimated_delivery_date": "2026-01-30",
  "delivered_at": null,
  "customer_notes": "Por favor, entregar pela manhã",
  "internal_notes": "Cliente VIP - priorizar",
  "created_at": "2026-01-20T10:30:00Z",
  "updated_at": "2026-01-21T14:20:00Z",
  "cancelled_at": null
}
```

## Exemplo de Item de Pedido (marketplace_order_items)

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "product_id": "770e8400-e29b-41d4-a716-446655440002",
  "product_snapshot": {
    "sku": "TRAQU-001",
    "name": "Válvula de Traqueostomia Premium",
    "brand": "MedCare",
    "category": "Traqueostomia",
    "image_url": "https://example.com/products/traqu-001.jpg"
  },
  "quantity": 2,
  "unit_price": 75.00,
  "subtotal": 150.00
}
```

## Exemplo de Usuário (users)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Maria Silva",
  "email": "maria.silva@example.com"
}
```

## Scripts SQL para Popular Banco de Dados de Teste

### Criar Tabelas (se não existirem)

```sql
-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS marketplace_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_id VARCHAR(255),
  payment_details JSONB,
  tracking_code VARCHAR(255),
  estimated_delivery_date DATE,
  delivered_at TIMESTAMP,
  customer_notes TEXT,
  internal_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  cancelled_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS marketplace_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  product_snapshot JSONB NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES marketplace_orders(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON marketplace_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON marketplace_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON marketplace_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON marketplace_order_items(order_id);
```

### Inserir Dados de Teste

```sql
-- Inserir usuário de teste (se não existir)
INSERT INTO users (id, name, email)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'Maria Silva',
  'maria.silva@example.com'
)
ON CONFLICT (id) DO NOTHING;

-- Inserir pedido de teste 1 (Pago e em Preparação)
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
  payment_id,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '123e4567-e89b-12d3-a456-426614174000',
  'processing',
  150.00,
  20.00,
  10.00,
  160.00,
  '{"street": "Rua das Flores", "number": "123", "complement": "Apto 45", "neighborhood": "Jardim Paulista", "city": "São Paulo", "state": "SP", "zip_code": "01234-567"}'::jsonb,
  'card',
  'approved',
  'PAY_123456789',
  NOW() - INTERVAL '2 days',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Inserir itens do pedido 1
INSERT INTO marketplace_order_items (
  order_id,
  product_id,
  product_snapshot,
  quantity,
  unit_price,
  subtotal
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440000',
    '770e8400-e29b-41d4-a716-446655440002',
    '{"sku": "TRAQU-001", "name": "Válvula de Traqueostomia Premium", "brand": "MedCare", "category": "Traqueostomia", "image_url": "https://placehold.co/400x400/png?text=Produto"}'::jsonb,
    2,
    75.00,
    150.00
  );

-- Inserir pedido de teste 2 (Enviado)
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
  payment_id,
  tracking_code,
  estimated_delivery_date,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '123e4567-e89b-12d3-a456-426614174000',
  'shipped',
  200.00,
  25.00,
  0.00,
  225.00,
  '{"street": "Avenida Paulista", "number": "1000", "complement": "Sala 501", "neighborhood": "Bela Vista", "city": "São Paulo", "state": "SP", "zip_code": "01310-100"}'::jsonb,
  'pix',
  'approved',
  'PIX_987654321',
  'BR987654321BR',
  CURRENT_DATE + INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Inserir itens do pedido 2
INSERT INTO marketplace_order_items (
  order_id,
  product_id,
  product_snapshot,
  quantity,
  unit_price,
  subtotal
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440003',
    '{"sku": "CANU-002", "name": "Cânula de Traqueostomia", "brand": "HealthTech", "category": "Traqueostomia", "image_url": "https://placehold.co/400x400/png?text=Canula"}'::jsonb,
    1,
    120.00,
    120.00
  ),
  (
    '550e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440004',
    '{"sku": "FILT-003", "name": "Filtro para Traqueostomia", "brand": "HealthTech", "category": "Acessórios", "image_url": "https://placehold.co/400x400/png?text=Filtro"}'::jsonb,
    4,
    20.00,
    80.00
  );

-- Inserir pedido de teste 3 (Pendente de Pagamento)
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
  customer_notes,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  '123e4567-e89b-12d3-a456-426614174000',
  'payment_pending',
  85.00,
  15.00,
  5.00,
  95.00,
  '{"street": "Rua Augusta", "number": "456", "neighborhood": "Consolação", "city": "São Paulo", "state": "SP", "zip_code": "01305-000"}'::jsonb,
  'boleto',
  'pending',
  'Por favor, entregar no período da tarde',
  NOW() - INTERVAL '1 day',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Inserir itens do pedido 3
INSERT INTO marketplace_order_items (
  order_id,
  product_id,
  product_snapshot,
  quantity,
  unit_price,
  subtotal
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440005',
    '{"sku": "LING-004", "name": "Lenço de Limpeza Especial", "brand": "MedCare", "category": "Higiene", "image_url": "https://placehold.co/400x400/png?text=Lenco"}'::jsonb,
    5,
    17.00,
    85.00
  );
```

## Verificar Dados Inseridos

```sql
-- Listar todos os pedidos com informações do usuário
SELECT
  o.id,
  o.status,
  o.total,
  o.created_at,
  u.name as customer_name,
  u.email as customer_email
FROM marketplace_orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;

-- Listar itens de um pedido específico
SELECT
  i.product_snapshot->>'name' as product_name,
  i.quantity,
  i.unit_price,
  i.subtotal
FROM marketplace_order_items i
WHERE i.order_id = '550e8400-e29b-41d4-a716-446655440000';

-- Estatísticas gerais
SELECT
  status,
  COUNT(*) as total_orders,
  SUM(total) as total_revenue
FROM marketplace_orders
GROUP BY status
ORDER BY total_revenue DESC;
```

## Testar API Localmente

```bash
# Listar pedidos
curl http://localhost:3000/api/admin/orders

# Listar pedidos com filtro
curl "http://localhost:3000/api/admin/orders?status=shipped&page=1"

# Buscar pedido específico
curl http://localhost:3000/api/admin/orders/550e8400-e29b-41d4-a716-446655440000

# Atualizar pedido (precisa de autenticação)
curl -X PATCH http://localhost:3000/api/admin/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped", "tracking_code": "BR123456789BR"}'
```

## Notas Importantes

1. **UUIDs**: Todos os IDs devem ser UUIDs válidos
2. **JSONB**: Os campos `shipping_address` e `product_snapshot` devem ser objetos JSON válidos
3. **Decimais**: Valores monetários usam 2 casas decimais
4. **Timestamps**: Datas devem seguir o formato ISO 8601
5. **Foreign Keys**: Certifique-se de que os IDs referenciados existam nas tabelas relacionadas

---

*Use estes exemplos como referência para popular seu banco de dados de teste*
