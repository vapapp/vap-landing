# Deploy e Próximos Passos - Dashboard de Pedidos

## Checklist para Deploy em Produção

### Antes do Deploy

- [ ] **Configurar variáveis de ambiente no servidor de produção**
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (⚠️ nunca commitar!)
  - RESEND_API_KEY (⚠️ nunca commitar!)
  - RESEND_FROM_EMAIL

- [ ] **Verificar Supabase**
  - Tabelas criadas corretamente
  - Índices configurados para performance
  - Row Level Security (RLS) configurado se necessário
  - Backup configurado

- [ ] **Configurar Resend**
  - Domínio verificado (vapapp.com ou subdomínio)
  - DNS records (SPF, DKIM, DMARC) configurados
  - Testar envio de email em staging

- [ ] **Testar localmente**
  - Listagem de pedidos funcionando
  - Detalhes de pedido carregando
  - Atualização de status funcionando
  - Emails sendo enviados corretamente
  - Filtros e paginação operacionais

- [ ] **Testes de segurança**
  - Verificar que Service Role Key não está exposta
  - Testar autenticação Firebase
  - Validar que apenas admins têm acesso
  - Testar inputs para prevenir XSS/injection

### Durante o Deploy

1. **Build da aplicação**
   ```bash
   npm run build
   ```

2. **Verificar erros de build**
   - TypeScript errors
   - Missing imports
   - Environment variables

3. **Testar build localmente**
   ```bash
   npm run start
   ```

4. **Deploy para produção**
   - Vercel, Netlify ou seu provedor de escolha
   - Configurar variáveis de ambiente
   - Verificar DNS e SSL

### Após o Deploy

- [ ] **Testes em produção**
  - Acessar /admin e fazer login
  - Verificar carregamento de pedidos
  - Testar atualização de um pedido
  - Confirmar recebimento de email

- [ ] **Monitoramento**
  - Configurar logs (Sentry, LogRocket, etc.)
  - Monitorar erros de API
  - Acompanhar taxa de emails entregues (Resend dashboard)
  - Verificar performance (Core Web Vitals)

- [ ] **Documentação**
  - Treinar equipe da Safe
  - Criar manual de uso (opcional)
  - Documentar processos internos

## Performance e Otimizações

### Supabase

```sql
-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON marketplace_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON marketplace_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON marketplace_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON marketplace_orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON marketplace_order_items(order_id);

-- Opcional: Função para busca mais eficiente
CREATE OR REPLACE FUNCTION search_orders(search_term TEXT)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  status VARCHAR,
  total DECIMAL,
  created_at TIMESTAMP,
  user_name VARCHAR,
  user_email VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    o.id,
    o.user_id,
    o.status,
    o.total,
    o.created_at,
    u.name as user_name,
    u.email as user_email
  FROM marketplace_orders o
  JOIN users u ON o.user_id = u.id
  WHERE
    o.id::text ILIKE '%' || search_term || '%'
    OR u.name ILIKE '%' || search_term || '%'
    OR u.email ILIKE '%' || search_term || '%'
  ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;
```

### Caching

Considere adicionar cache para:
- Lista de pedidos (Redis ou similar)
- Contadores/estatísticas
- Dados de usuários

### Loading States

Já implementados:
- LoadingSpinner nos componentes
- Estados de loading durante fetch
- Mensagens de erro amigáveis

## Melhorias Futuras Recomendadas

### Curto Prazo (1-2 semanas)

1. **Histórico de Alterações**
   ```sql
   CREATE TABLE order_history (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     order_id UUID NOT NULL,
     changed_by UUID NOT NULL,
     field_changed VARCHAR(100),
     old_value TEXT,
     new_value TEXT,
     changed_at TIMESTAMP DEFAULT NOW(),
     FOREIGN KEY (order_id) REFERENCES marketplace_orders(id)
   );
   ```

2. **Notificações Push**
   - Usar Socket.io ou Pusher
   - Notificar em tempo real quando novo pedido chega

3. **Exportação de Dados**
   - Botão para exportar pedidos em CSV
   - Relatório em PDF para impressão

4. **Dashboard com Estatísticas**
   - Gráficos de vendas por período
   - Produtos mais vendidos
   - Taxa de conversão por status
   - Tempo médio de processamento

### Médio Prazo (1 mês)

5. **Sistema de Comentários**
   - Permitir comentários internos por pedido
   - Mencionar membros da equipe (@fulano)
   - Histórico de comunicação

6. **Automações**
   - Alterar status automaticamente após X dias
   - Enviar lembretes de pedidos pendentes
   - Alertas para pedidos com atraso

7. **Gestão de Estoque**
   - Integrar com sistema de estoque
   - Alertas de baixo estoque
   - Reserva automática ao criar pedido

8. **Relatórios Avançados**
   - Relatórios customizáveis
   - Agendamento de relatórios por email
   - Comparação de períodos

### Longo Prazo (2-3 meses)

9. **Integrações**
   - API dos Correios para rastreamento automático
   - Gateway de pagamento (se mudar)
   - ERP/CRM da empresa

10. **App Mobile**
    - React Native para gestão móvel
    - Notificações push nativas
    - Scanner de código de barras

11. **Multi-tenancy**
    - Se houver múltiplos parceiros como a Safe
    - Dashboard personalizado por parceiro
    - Permissões granulares

12. **Analytics Avançado**
    - Google Analytics events
    - Funil de conversão
    - Cohort analysis
    - LTV (Lifetime Value) dos clientes

## Estrutura de Equipe Recomendada

Para manutenção e evolução do sistema:

- **Product Owner** - Definir prioridades e roadmap
- **Backend Developer** - APIs e integrações
- **Frontend Developer** - UI/UX e componentes
- **QA Engineer** - Testes e qualidade
- **DevOps** - Deploy e monitoramento

## Manutenção

### Diária
- Monitorar logs de erro
- Verificar taxa de entrega de emails
- Responder a reports de bugs

### Semanal
- Revisar performance da API
- Analisar métricas de uso
- Atualizar dependências críticas

### Mensal
- Backup completo do banco
- Review de segurança
- Planejamento de novas features
- Atualização de documentação

## Custos Estimados

### Supabase
- Free tier: Até 500 MB database, 2 GB bandwidth
- Pro: $25/mês - Recommended para produção
- Team: $599/mês - Para grandes volumes

### Resend
- Free: 100 emails/dia
- Pro: $20/mês - 50k emails/mês
- Business: Custom pricing

### Hosting (Vercel)
- Free: Para projetos pequenos
- Pro: $20/mês/membro
- Enterprise: Custom

**Estimativa Total Mensal:** $65-$100 (Small/Medium)

## Suporte e Documentação

### Links Úteis
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)

### Comunidades
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

## Troubleshooting Comum

### Problema: Emails não chegam
**Soluções:**
1. Verificar se domínio está verificado no Resend
2. Check DNS records (SPF, DKIM)
3. Verificar logs do Resend
4. Testar com email pessoal primeiro

### Problema: Performance lenta
**Soluções:**
1. Adicionar índices no banco
2. Implementar cache
3. Otimizar queries (usar .select() específico)
4. Paginar resultados

### Problema: Erro de autenticação
**Soluções:**
1. Verificar se Service Role Key está correta
2. Check se variáveis de ambiente estão no servidor
3. Limpar cache do navegador
4. Verificar logs do Firebase

### Problema: Build falha
**Soluções:**
1. Rodar `npm run build` localmente
2. Verificar erros de TypeScript
3. Check imports circulares
4. Limpar cache: `rm -rf .next node_modules && npm install`

## Contato e Suporte

Para questões técnicas ou bugs:
1. Verificar este documento e README
2. Check logs e error messages
3. Reproduzir em ambiente local
4. Documentar steps para reproduzir
5. Reportar para equipe de desenvolvimento

---

**Dashboard criado com ❤️ para VapApp e Safe**
*Última atualização: 21/01/2026*
