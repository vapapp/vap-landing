import { resend, FROM_EMAIL } from '@/lib/resend';
import type { OrderStatus, MarketplaceOrderWithItems } from '@/types/orders';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  formatAddress,
  formatCurrency,
  getShortOrderId,
  getTrackingUrl,
} from './orderHelpers';

interface EmailResult {
  success: boolean;
  error?: string;
  emailId?: string;
}

export async function sendOrderStatusEmail(
  orderId: string,
  newStatus: OrderStatus,
  userEmail: string,
  userName: string,
  orderDetails: MarketplaceOrderWithItems,
  trackingCode?: string,
  estimatedDelivery?: string
): Promise<EmailResult> {
  try {
    const emailContent = generateEmailContent(
      newStatus,
      userName,
      orderDetails,
      trackingCode,
      estimatedDelivery
    );

    if (!emailContent) {
      return {
        success: false,
        error: `No email template for status: ${newStatus}`,
      };
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      emailId: result.data?.id,
    };
  } catch (error) {
    console.error('Error sending order status email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

interface EmailContent {
  subject: string;
  html: string;
}

function generateEmailContent(
  status: OrderStatus,
  userName: string,
  order: MarketplaceOrderWithItems,
  trackingCode?: string,
  estimatedDelivery?: string
): EmailContent | null {
  const orderId = getShortOrderId(order.id);
  const orderTotal = formatCurrency(order.total);

  // Templates de email com inline CSS para melhor compatibilidade
  const createEmailWrapper = (headerTitle: string, content: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headerTitle}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #4F46E5; padding: 30px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">${headerTitle}</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px; background-color: #ffffff;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0; color: #666666; font-size: 12px;">VapApp - Cuidando de quem você ama</p>
                  <p style="margin: 5px 0 0 0; color: #999999; font-size: 11px;">Este é um email automático, por favor não responda.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const productsList = order.items
    .map(
      (item) => `
        <div style="border-bottom: 1px solid #eeeeee; padding: 12px 0; margin: 8px 0;">
          <strong style="color: #333333; font-size: 14px;">${item.product_snapshot.name}</strong><br>
          <span style="color: #666666; font-size: 13px;">Quantidade: ${item.quantity} x ${formatCurrency(item.unit_price)}</span>
        </div>
      `
    )
    .join('');

  switch (status) {
    case 'paid':
      return {
        subject: `Pagamento Aprovado! Pedido #${orderId}`,
        html: createEmailWrapper('🎉 Pagamento Aprovado!', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Temos uma ótima notícia! O pagamento do seu pedido foi aprovado com sucesso.</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #4F46E5; font-size: 18px;">Pedido #${orderId}</h3>
            <p style="margin: 0 0 10px 0; color: #333333; font-size: 15px;"><strong>Total:</strong> ${orderTotal}</p>
            <h4 style="margin: 15px 0 10px 0; color: #333333; font-size: 16px;">Produtos:</h4>
            ${productsList}
          </div>

          <p style="margin: 20px 0 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">Agora vamos preparar seus produtos para envio. Em breve você receberá uma nova atualização.</p>
          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;"><strong>Estimativa de preparação:</strong> 2-3 dias úteis</p>
        `),
      };

    case 'processing':
      return {
        subject: `Pedido em Preparação #${orderId}`,
        html: createEmailWrapper('📦 Pedido em Preparação', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Seu pedido está sendo preparado com todo cuidado pela nossa equipe.</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #4F46E5; font-size: 18px;">Pedido #${orderId}</h3>
            <p style="margin: 0; color: #333333; font-size: 15px;"><strong>Status:</strong> Em Preparação</p>
          </div>

          <p style="margin: 20px 0 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">Assim que o pedido for despachado, você receberá o código de rastreamento para acompanhar a entrega.</p>
          ${estimatedDelivery ? `<p style="margin: 0; color: #666666; font-size: 14px;"><strong>Previsão de envio:</strong> ${format(new Date(estimatedDelivery), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>` : ''}
        `),
      };

    case 'shipped':
      const trackingUrl = trackingCode ? getTrackingUrl(trackingCode) : '#';
      const formattedAddress = formatAddress(order.shipping_address);
      return {
        subject: `Pedido Enviado! #${orderId}`,
        html: createEmailWrapper('🚚 Pedido Enviado!', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Seu pedido foi enviado e está a caminho!</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #4F46E5; font-size: 18px;">Pedido #${orderId}</h3>
            ${trackingCode ? `<p style="margin: 0 0 10px 0; color: #333333; font-size: 15px;"><strong>Código de Rastreamento:</strong> ${trackingCode}</p>` : ''}
            ${estimatedDelivery ? `<p style="margin: 0 0 15px 0; color: #333333; font-size: 15px;"><strong>Previsão de Entrega:</strong> ${format(new Date(estimatedDelivery), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>` : ''}
            <h4 style="margin: 15px 0 10px 0; color: #333333; font-size: 16px;">Endereço de Entrega:</h4>
            <p style="margin: 0; color: #666666; font-size: 14px; white-space: pre-line; line-height: 1.6;">${formattedAddress}</p>
          </div>

          ${trackingCode ? `<div style="text-align: center; margin: 30px 0;"><a href="${trackingUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 15px;">Rastrear Pedido</a></div>` : ''}

          <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">Fique atento ao prazo de entrega. Se precisar de ajuda, estamos à disposição!</p>
        `),
      };

    case 'delivered':
      return {
        subject: `Pedido Entregue! #${orderId}`,
        html: createEmailWrapper('✅ Pedido Entregue!', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Seu pedido foi entregue com sucesso!</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #10B981; font-size: 18px;">Pedido #${orderId}</h3>
            <p style="margin: 0; color: #333333; font-size: 15px;"><strong>Status:</strong> Entregue</p>
          </div>

          <p style="margin: 20px 0 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">Esperamos que você esteja satisfeito(a) com sua compra. Se tiver algum problema com os produtos, entre em contato conosco.</p>
          <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;"><strong>Obrigado por escolher a VapApp!</strong> Sua confiança é muito importante para nós.</p>
        `),
      };

    case 'cancelled':
      return {
        subject: `Pedido Cancelado #${orderId}`,
        html: createEmailWrapper('❌ Pedido Cancelado', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Informamos que seu pedido foi cancelado.</p>

          <div style="background-color: #FEE2E2; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #EF4444; font-size: 18px;">Pedido #${orderId}</h3>
            <p style="margin: 0; color: #333333; font-size: 15px;"><strong>Status:</strong> Cancelado</p>
          </div>

          ${order.internal_notes ? `<p style="margin: 20px 0 10px 0; color: #333333; font-size: 15px;"><strong>Motivo:</strong> ${order.internal_notes}</p>` : ''}

          <p style="margin: 20px 0 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">Se o pagamento já foi realizado, o reembolso será processado automaticamente.</p>
          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Se tiver dúvidas, entre em contato com nosso suporte.</p>
        `),
      };

    case 'refunded':
      return {
        subject: `Reembolso Processado #${orderId}`,
        html: createEmailWrapper('💰 Reembolso Processado', `
          <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Olá, <strong>${userName}</strong>!</p>
          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">O reembolso do seu pedido foi processado com sucesso.</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #10B981; font-size: 18px;">Pedido #${orderId}</h3>
            <p style="margin: 0; color: #333333; font-size: 15px;"><strong>Valor Reembolsado:</strong> ${orderTotal}</p>
          </div>

          <p style="margin: 20px 0 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">O valor será creditado de volta na sua forma de pagamento original.</p>
          <p style="margin: 10px 0 5px 0; color: #333333; font-size: 15px;"><strong>Prazo de estorno:</strong></p>
          <ul style="margin: 0 0 20px 20px; padding: 0; color: #666666; font-size: 14px; line-height: 1.8;">
            <li>Cartão de crédito: até 2 faturas</li>
            <li>Boleto/PIX: 5-10 dias úteis</li>
          </ul>

          <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">Pedimos desculpas pelo transtorno. Esperamos vê-lo(a) novamente em breve!</p>
        `),
      };

    default:
      return null;
  }
}
