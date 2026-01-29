import type { MarketplaceOrder, ShippingAddress } from '@/types/orders';

/**
 * Helper para obter o label amigável do método de pagamento.
 * O Stripe salva como 'stripe', mas precisamos exibir o tipo real (Cartão ou Boleto).
 */
export function getPaymentMethodLabel(order: MarketplaceOrder): string {
  // Se o payment_method é 'stripe', extrair o tipo real dos payment_details
  if (order.payment_method === 'stripe' && order.payment_details) {
    const paymentDetails = order.payment_details as {
      payment_method_types?: string[];
      [key: string]: unknown;
    };

    const type = paymentDetails.payment_method_types?.[0];

    if (type === 'card') return 'Cartão de Crédito';
    if (type === 'boleto') return 'Boleto';
  }

  // Fallback para valores diretos
  const directLabels: Record<string, string> = {
    card: 'Cartão de Crédito',
    boleto: 'Boleto',
    pix: 'PIX',
    stripe: 'Cartão de Crédito', // Default se não conseguir detectar
  };

  return directLabels[order.payment_method] || order.payment_method;
}

/**
 * Formata endereço para exibição em emails e UI
 */
export function formatAddress(address: ShippingAddress): string {
  const cep = address.zipcode || address.zip_code || '';
  const parts = [
    `${address.street}, ${address.number}`,
    address.complement ? address.complement : null,
    address.neighborhood,
    `${address.city}/${address.state}`,
    cep ? `CEP: ${cep}` : null,
  ];

  return parts.filter(Boolean).join('\n');
}

/**
 * Formata endereço em uma linha única para exibição compacta
 */
export function formatAddressSingleLine(address: ShippingAddress): string {
  const cep = address.zipcode || address.zip_code || '';
  const parts = [
    `${address.street}, ${address.number}`,
    address.complement || null,
    address.neighborhood,
    `${address.city}/${address.state}`,
    cep ? `CEP: ${cep}` : null,
  ];

  return parts.filter(Boolean).join(' - ');
}

/**
 * Formata valor monetário em BRL
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Gera ID curto do pedido para exibição (primeiros 8 caracteres)
 */
export function getShortOrderId(orderId: string): string {
  return orderId.substring(0, 8).toUpperCase();
}

/**
 * Gera link de rastreamento dos Correios
 */
export function getTrackingUrl(trackingCode: string): string {
  return `https://rastreamento.correios.com.br/app/index.php?codigo=${trackingCode}`;
}

/**
 * Verifica se um pedido pode ser cancelado
 */
export function canCancelOrder(status: string): boolean {
  const nonCancellableStatuses = ['delivered', 'cancelled', 'refunded'];
  return !nonCancellableStatuses.includes(status);
}

/**
 * Verifica se um pedido pode ser editado
 */
export function canEditOrder(status: string): boolean {
  const nonEditableStatuses = ['cancelled', 'refunded'];
  return !nonEditableStatuses.includes(status);
}
