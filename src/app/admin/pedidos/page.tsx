'use client';

import { useState, useEffect } from 'react';
import type {
  OrdersListResponse,
  OrderStatus,
  PaymentMethod,
} from '@/types/orders';
import OrderCard from '@/components/admin/OrderCard';
import OrderFilters from '@/components/admin/OrderFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PedidosPage() {
  const [data, setData] = useState<OrdersListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    status?: OrderStatus;
    payment_method?: PaymentMethod;
    search?: string;
  }>({});

  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '20',
      });

      if (filters.status) params.append('status', filters.status);
      if (filters.payment_method) params.append('payment_method', filters.payment_method);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/admin/orders?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Erro ao carregar pedidos');
      }

      const result: OrdersListResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, filters]);

  const handleFilterChange = (
    newFilters: {
      status?: OrderStatus;
      payment_method?: PaymentMethod;
      search?: string;
    }
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Sofisticado */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl mb-8 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Gerenciamento de Pedidos
            </h1>
            <p className="text-indigo-100 text-lg">
              Dashboard profissional para gestão de pedidos da Safe
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-white font-semibold text-lg">{data?.total || 0} Pedidos</span>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas Premium */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total de Pedidos</h3>
                <p className="text-4xl font-black text-indigo-600 mt-3">{data.total}</p>
              </div>
              <div className="bg-indigo-100 rounded-2xl p-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Página Atual</h3>
                <p className="text-4xl font-black text-purple-600 mt-3">
                  {data.page} <span className="text-2xl text-gray-400">/ {data.total_pages}</span>
                </p>
              </div>
              <div className="bg-purple-100 rounded-2xl p-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nesta Página</h3>
                <p className="text-4xl font-black text-blue-600 mt-3">{data.orders.length}</p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="mb-8">
        <OrderFilters onFilterChange={handleFilterChange} />
      </div>

      {/* Lista de Pedidos */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-5 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold text-lg">Erro ao carregar pedidos</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && data && data.orders.length === 0 && (
        <div className="bg-white border-2 border-gray-200 text-gray-600 px-6 py-16 rounded-2xl text-center shadow-lg">
          <div className="inline-block bg-gray-100 rounded-full p-6 mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">Nenhum pedido encontrado</p>
          <p className="text-gray-500 mt-2">Tente ajustar os filtros ou aguarde novos pedidos chegarem.</p>
        </div>
      )}

      {!loading && !error && data && data.orders.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {data.orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Paginação Premium */}
          {data.total_pages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 mb-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-md hover:shadow-xl"
              >
                ← Anterior
              </button>

              <div className="flex gap-2">
                {Array.from({ length: data.total_pages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === data.total_pages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                  )
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center gap-2">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="text-gray-400 font-bold">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-5 py-3 rounded-xl font-bold transition-all duration-300 shadow-md ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-110 shadow-xl'
                            : 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.total_pages}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-md hover:shadow-xl"
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
