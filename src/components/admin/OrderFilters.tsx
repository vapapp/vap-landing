'use client';

import { useState, useEffect } from 'react';
import type { OrderStatus, PaymentMethod } from '@/types/orders';
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '@/types/orders';

interface OrderFiltersProps {
  onFilterChange: (filters: {
    status?: OrderStatus;
    payment_method?: PaymentMethod;
    search?: string;
  }) => void;
}

export default function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [status, setStatus] = useState<OrderStatus | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [search, setSearch] = useState('');

  // Aplicar filtros automaticamente quando qualquer filtro mudar
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        status: status || undefined,
        payment_method: paymentMethod || undefined,
        search: search || undefined,
      });
    }, 500); // Debounce de 500ms para busca

    return () => clearTimeout(timeoutId);
  }, [status, paymentMethod, search]);

  const handleClearFilters = () => {
    setStatus('');
    setPaymentMethod('');
    setSearch('');
  };

  const hasActiveFilters = status || paymentMethod || search;

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Filtros Avançados</h2>
            <p className="text-sm text-gray-500">Refine sua busca de pedidos</p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border-2 border-red-200 font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filtro de Status */}
        <div className="space-y-2">
          <label htmlFor="status" className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status do Pedido
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus | '')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold text-gray-700"
          >
            <option value="">📋 Todos os Status</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Método de Pagamento */}
        <div className="space-y-2">
          <label
            htmlFor="payment_method"
            className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide"
          >
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Forma de Pagamento
          </label>
          <select
            id="payment_method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod | '')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold text-gray-700"
          >
            <option value="">💳 Todos os Métodos</option>
            {Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Busca */}
        <div className="space-y-2">
          <label htmlFor="search" className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar Pedido
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite ID ou nome do cliente..."
              className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors font-semibold text-gray-700 placeholder-gray-400"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Indicador de Filtros Ativos */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t-2 border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-600">Filtros ativos:</span>
            <div className="flex flex-wrap gap-2">
              {status && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-xs">
                  {ORDER_STATUS_LABELS[status]}
                </span>
              )}
              {paymentMethod && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-semibold text-xs">
                  {PAYMENT_METHOD_LABELS[paymentMethod]}
                </span>
              )}
              {search && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold text-xs">
                  Busca: &quot;{search}&quot;
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
