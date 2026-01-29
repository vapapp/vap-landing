'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { MarketplaceOrderWithItems, OrderStatus } from '@/types/orders';
import { ORDER_STATUS_LABELS } from '@/types/orders';
import StatusBadge from '@/components/admin/StatusBadge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  getPaymentMethodLabel,
  formatCurrency,
  getShortOrderId,
  canCancelOrder,
  getTrackingUrl,
  formatAddress,
} from '@/utils/orderHelpers';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<MarketplaceOrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [trackingCode, setTrackingCode] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/orders/${orderId}`);

      if (!response.ok) {
        throw new Error('Pedido não encontrado');
      }

      const data: MarketplaceOrderWithItems = await response.json();
      setOrder(data);

      // Preencher formulário com dados atuais
      setStatus(data.status);
      setTrackingCode(data.tracking_code || '');
      setEstimatedDeliveryDate(data.estimated_delivery_date || '');
      setInternalNotes(data.internal_notes || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          tracking_code: trackingCode || undefined,
          estimated_delivery_date: estimatedDeliveryDate || undefined,
          internal_notes: internalNotes || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar pedido');
      }

      const result = await response.json();
      setOrder(result.order);
      setSuccessMessage(
        `✅ Pedido atualizado com sucesso! ${result.emailSent ? '📧 Email enviado ao cliente.' : ''}`
      );

      // Limpar mensagem após 5 segundos
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('⚠️ Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao cancelar pedido');
      }

      setSuccessMessage('✅ Pedido cancelado com sucesso! 📧 Email enviado ao cliente.');

      setTimeout(() => {
        router.push('/admin/pedidos');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-5 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold text-xl">Erro ao carregar pedido</p>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const orderIdShort = getShortOrderId(order.id);
  const formattedDate = format(new Date(order.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  const paymentMethodLabel = getPaymentMethodLabel(order);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-12">
      {/* Header Premium com Gradiente */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl mb-8 rounded-2xl p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl p-3 transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-black text-white mb-1">Pedido #{orderIdShort}</h1>
              <p className="text-indigo-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Mensagens de Sucesso/Erro */}
      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-2xl shadow-lg mb-6 animate-pulse">
          <p className="font-bold text-lg">{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-lg mb-6">
          <p className="font-bold text-lg">⚠️ {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda - Informações do Pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cliente */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informações do Cliente</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Nome</p>
                <p className="font-bold text-gray-900 text-lg">{order.user.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="font-bold text-gray-900 text-lg truncate">{order.user.email}</p>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Endereço de Entrega</h2>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl">
              <p className="text-gray-900 whitespace-pre-line leading-relaxed font-medium">
                {formatAddress(order.shipping_address)}
              </p>
            </div>
          </div>

          {/* Produtos */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Produtos do Pedido</h2>
            </div>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={item.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{item.product_snapshot.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          SKU: <strong>{item.product_snapshot.sku}</strong>
                        </span>
                        {item.product_snapshot.brand && (
                          <span>Marca: <strong>{item.product_snapshot.brand}</strong></span>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-600 mb-1">Qtd: <strong className="text-lg text-gray-900">{item.quantity}</strong></p>
                      <p className="text-xl font-black text-indigo-600">{formatCurrency(item.subtotal)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totais */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-lg">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Frete:</span>
                <span className="font-bold text-lg">{formatCurrency(order.shipping_fee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Desconto:</span>
                  <span className="font-bold text-lg">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                <span className="text-xl font-black text-gray-900">TOTAL:</span>
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informações de Pagamento</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Método</p>
                <p className="font-bold text-gray-900 text-lg">{paymentMethodLabel}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</p>
                <p className="font-bold text-gray-900 text-lg capitalize">{order.payment_status}</p>
              </div>
            </div>
            {order.payment_id && (
              <div className="mt-4 bg-blue-50 p-4 rounded-xl">
                <p className="text-sm font-semibold text-blue-700 mb-1">ID da Transação</p>
                <p className="font-mono text-blue-900 text-sm break-all">{order.payment_id}</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna Direita - Formulário de Edição */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Editar Pedido</h2>
            </div>

            <div className="space-y-5">
              {/* Status */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Status do Pedido
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold"
                >
                  {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Código de Rastreamento */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Código de Rastreamento
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Ex: BR123456789PT"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold"
                />
                {trackingCode && (
                  <a
                    href={getTrackingUrl(trackingCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Rastrear nos Correios
                  </a>
                )}
              </div>

              {/* Data de Entrega */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Previsão de Entrega
                </label>
                <input
                  type="date"
                  value={estimatedDeliveryDate}
                  onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold"
                />
              </div>

              {/* Notas Internas */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Notas Internas
                </label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  rows={4}
                  placeholder="Observações internas sobre o pedido..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold resize-none"
                />
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {saving ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>

                {canCancelOrder(order.status) && (
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="w-full px-6 py-4 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-md hover:shadow-lg"
                  >
                    ❌ Cancelar Pedido
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
