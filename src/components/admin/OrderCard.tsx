import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { MarketplaceOrderWithItems } from '@/types/orders';
import StatusBadge from './StatusBadge';
import {
  getPaymentMethodLabel,
  formatCurrency,
  getShortOrderId,
  formatAddressSingleLine,
} from '@/utils/orderHelpers';

interface OrderCardProps {
  order: MarketplaceOrderWithItems;
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderId = getShortOrderId(order.id);
  const formattedDate = format(new Date(order.created_at), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  const formattedTotal = formatCurrency(order.total);
  const paymentMethodLabel = getPaymentMethodLabel(order);

  return (
    <Link href={`/admin/pedidos/${order.id}`}>
      <div className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden relative">
        {/* Fundo gradiente sutil no hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header do Card */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-3 py-1">
                  <h3 className="text-lg font-black text-white">#{orderId}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Informações do Pedido */}
          <div className="space-y-3 mb-5">
            {/* Cliente */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-semibold">Cliente</span>
              </div>
              <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{order.user.name}</span>
            </div>

            {/* Valor Total - Destaque */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">Valor Total</span>
              </div>
              <span className="text-2xl font-black text-white">{formattedTotal}</span>
            </div>

            {/* Pagamento */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm font-semibold">Pagamento</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{paymentMethodLabel}</span>
            </div>

            {/* Itens */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-sm font-semibold">Itens</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {order.items.length} {order.items.length === 1 ? 'produto' : 'produtos'}
              </span>
            </div>
          </div>

          {/* Endereço - Footer */}
          <div className="pt-4 border-t-2 border-gray-100">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {formatAddressSingleLine(order.shipping_address)}
              </p>
            </div>
          </div>

          {/* Indicador de Ver Mais */}
          <div className="mt-4 flex items-center justify-center text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Ver Detalhes</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
