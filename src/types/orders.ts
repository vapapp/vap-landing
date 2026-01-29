// Tipos para o sistema de gerenciamento de pedidos do marketplace

export type OrderStatus =
  | 'pending'
  | 'payment_pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'card' | 'boleto' | 'pix' | 'stripe';

export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'refunded';

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string; // Nome real no banco de dados
  zip_code?: string; // Mantido para compatibilidade
  country?: string;
}

export interface ProductSnapshot {
  sku: string;
  name: string;
  brand?: string;
  category?: string;
  image_url?: string;
}

export interface MarketplaceOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_snapshot: ProductSnapshot;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface MarketplaceOrder {
  id: string;
  user_id: string;
  status: OrderStatus;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_id?: string;
  payment_details?: Record<string, unknown>;
  tracking_code?: string;
  estimated_delivery_date?: string;
  delivered_at?: string;
  customer_notes?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
}

export interface MarketplaceOrderWithItems extends MarketplaceOrder {
  items: MarketplaceOrderItem[];
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface OrderFilters {
  status?: OrderStatus;
  payment_method?: PaymentMethod;
  date_from?: string;
  date_to?: string;
  search?: string; // ID do pedido ou nome do cliente
}

export interface OrdersListResponse {
  orders: MarketplaceOrderWithItems[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface OrderUpdatePayload {
  status?: OrderStatus;
  tracking_code?: string;
  estimated_delivery_date?: string;
  internal_notes?: string;
}

export interface OrderStats {
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  average_order_value: number;
}

// Labels amigáveis para os status
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  payment_pending: 'Aguardando Pagamento',
  paid: 'Pago',
  processing: 'Em Preparação',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

// Cores para os badges de status (cores mais vibrantes e visíveis)
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-200 text-yellow-900 border border-yellow-400',
  payment_pending: 'bg-orange-200 text-orange-900 border border-orange-400',
  paid: 'bg-emerald-200 text-emerald-900 border border-emerald-400',
  processing: 'bg-blue-200 text-blue-900 border border-blue-400',
  shipped: 'bg-purple-200 text-purple-900 border border-purple-400',
  delivered: 'bg-green-300 text-green-950 border border-green-500',
  cancelled: 'bg-red-200 text-red-900 border border-red-400',
  refunded: 'bg-gray-300 text-gray-900 border border-gray-500',
};

// Labels para métodos de pagamento
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Cartão de Crédito',
  boleto: 'Boleto',
  pix: 'PIX',
  stripe: 'Stripe',
};
