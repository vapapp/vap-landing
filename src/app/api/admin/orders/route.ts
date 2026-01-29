import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { rateLimit, getIdentifier, apiRateLimit, RateLimitError } from '@/lib/rate-limit';
import type {
  OrderFilters,
  OrdersListResponse,
  MarketplaceOrderWithItems,
} from '@/types/orders';

// GET /api/admin/orders - Listar todos os pedidos com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    // 🛡️ Rate limiting - proteger contra requisições massivas
    const identifier = getIdentifier(request);
    await rateLimit(identifier, apiRateLimit.admin);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  try {
    const searchParams = request.nextUrl.searchParams;

    // Parâmetros de paginação
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = parseInt(searchParams.get('per_page') || '20');
    const offset = (page - 1) * per_page;

    // Filtros
    const filters: OrderFilters = {
      status: (searchParams.get('status') as OrderFilters['status']) || undefined,
      payment_method:
        (searchParams.get('payment_method') as OrderFilters['payment_method']) || undefined,
      date_from: searchParams.get('date_from') || undefined,
      date_to: searchParams.get('date_to') || undefined,
      search: searchParams.get('search') || undefined,
    };

    // Construir query base (sem join com users, vamos buscar separadamente)
    let query = supabaseAdmin
      .from('marketplace_orders')
      .select(
        `
        *,
        items:marketplace_order_items(*)
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.payment_method) {
      query = query.eq('payment_method', filters.payment_method);
    }

    if (filters.date_from) {
      query = query.gte('created_at', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('created_at', filters.date_to);
    }

    if (filters.search) {
      // Buscar por ID do pedido ou nome do usuário
      // Note: busca por nome requer join com users, então faremos client-side ou usar função RPC
      query = query.or(
        `id.ilike.%${filters.search}%,user_id.ilike.%${filters.search}%`
      );
    }

    // Aplicar paginação
    query = query.range(offset, offset + per_page - 1);

    const { data: orders, error, count } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    // Buscar dados dos usuários separadamente
    let ordersWithUsers = orders || [];
    if (orders && orders.length > 0) {
      const userIds = [...new Set(orders.map(order => order.user_id))];

      const { data: users, error: usersError } = await supabaseAdmin
        .from('users')
        .select('id, name, email')
        .in('id', userIds);

      if (!usersError && users) {
        // Mapear usuários para os pedidos
        const usersMap = new Map(users.map(user => [user.id, user]));
        ordersWithUsers = orders.map(order => ({
          ...order,
          user: usersMap.get(order.user_id) || null
        }));
      }
    }

    // Calcular total de páginas
    const total_pages = count ? Math.ceil(count / per_page) : 0;

    const response: OrdersListResponse = {
      orders: (ordersWithUsers as MarketplaceOrderWithItems[]) || [],
      total: count || 0,
      page,
      per_page,
      total_pages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/admin/orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

