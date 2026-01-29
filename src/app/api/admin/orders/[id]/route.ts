import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendOrderStatusEmail } from '@/utils/sendOrderStatusEmail';
import { rateLimit, getIdentifier, apiRateLimit, RateLimitError } from '@/lib/rate-limit';
import type {
  MarketplaceOrderWithItems,
  OrderUpdatePayload,
  OrderStatus,
} from '@/types/orders';

// Helper para buscar pedido com dados do usuário
async function fetchOrderWithUser(orderId: string) {
  const { data: order, error } = await supabaseAdmin
    .from('marketplace_orders')
    .select(`
      *,
      items:marketplace_order_items(*)
    `)
    .eq('id', orderId)
    .single();

  if (error || !order) {
    return { data: null, error };
  }

  // Buscar dados do usuário separadamente
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, name, email')
    .eq('id', order.user_id)
    .single();

  return {
    data: {
      ...order,
      user: user || null
    },
    error: null
  };
}

// GET /api/admin/orders/[id] - Buscar detalhes de um pedido específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🛡️ Rate limiting
  try {
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
    const { id } = await params;
    const { data: order, error } = await fetchOrderWithUser(id);

    if (error || !order) {
      console.error('Error fetching order:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order as MarketplaceOrderWithItems);
  } catch (error) {
    console.error('Error in GET /api/admin/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/orders/[id] - Atualizar um pedido
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🛡️ Rate limiting
  try {
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
    const { id } = await params;
    const body: OrderUpdatePayload = await request.json();

    // Validar campos permitidos
    const allowedFields = [
      'status',
      'tracking_code',
      'estimated_delivery_date',
      'internal_notes',
    ];
    const updates: Partial<OrderUpdatePayload> = {};

    for (const field of allowedFields) {
      if (field in body) {
        updates[field as keyof OrderUpdatePayload] =
          body[field as keyof OrderUpdatePayload];
      }
    }

    // Validar status se fornecido
    if (updates.status) {
      const validStatuses: OrderStatus[] = [
        'pending',
        'payment_pending',
        'paid',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ];
      if (!validStatuses.includes(updates.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
    }

    // Buscar pedido antes da atualização para comparar status
    const { data: oldOrder, error: fetchError } = await fetchOrderWithUser(id);

    if (fetchError || !oldOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Adicionar campo de auditoria
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // Atualizar pedido
    const { error: updateError } = await supabaseAdmin
      .from('marketplace_orders')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    // Buscar pedido atualizado com dados do usuário
    const { data: updatedOrder } = await fetchOrderWithUser(id);
    const typedOrder = updatedOrder as unknown as MarketplaceOrderWithItems;

    // Enviar email se o status mudou
    let emailSent = false;
    if (updates.status && updates.status !== oldOrder.status) {
      // Status que disparam emails
      const statusesWithEmail: OrderStatus[] = [
        'paid',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ];

      if (statusesWithEmail.includes(updates.status)) {
        const emailResult = await sendOrderStatusEmail(
          id,
          updates.status,
          typedOrder.user.email,
          typedOrder.user.name,
          typedOrder,
          updates.tracking_code || typedOrder.tracking_code,
          updates.estimated_delivery_date || typedOrder.estimated_delivery_date
        );

        emailSent = emailResult.success;
        if (!emailResult.success) {
          console.error('Failed to send email:', emailResult.error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      order: typedOrder,
      emailSent,
    });
  } catch (error) {
    console.error('Error in PATCH /api/admin/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/orders/[id] - Cancelar um pedido (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🛡️ Rate limiting
  try {
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
    const { id } = await params;

    // Buscar pedido antes de cancelar
    const { data: order, error: fetchError } = await fetchOrderWithUser(id);

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Verificar se já está cancelado
    if (order.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Order already cancelled' },
        { status: 400 }
      );
    }

    // Cancelar pedido
    const { error: updateError } = await supabaseAdmin
      .from('marketplace_orders')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error cancelling order:', updateError);
      return NextResponse.json(
        { error: 'Failed to cancel order' },
        { status: 500 }
      );
    }

    // Buscar pedido cancelado com dados do usuário
    const { data: cancelledOrder } = await fetchOrderWithUser(id);
    const typedOrder = cancelledOrder as unknown as MarketplaceOrderWithItems;

    // Enviar email de cancelamento
    const emailResult = await sendOrderStatusEmail(
      id,
      'cancelled',
      typedOrder.user.email,
      typedOrder.user.name,
      typedOrder
    );

    return NextResponse.json({
      success: true,
      order: typedOrder,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
