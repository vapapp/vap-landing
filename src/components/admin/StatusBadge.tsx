import type { OrderStatus } from '@/types/orders';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types/orders';

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = ORDER_STATUS_LABELS[status] || status;
  const colorClass = ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}
