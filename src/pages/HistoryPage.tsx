import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/domain/EmptyState';
import { Header } from '@/components/layout/Header';
import { Badge, Loading } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import type { Order } from '@/types';
import { orderService } from '@/services/orderService';
import { ORDER_STATUS_LABELS } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './HistoryPage.module.css';
import pageStyles from './pages.module.css';

export function HistoryPage() {
  const { session } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    orderService.getOrdersByUser(session.user.id).then(setOrders).finally(() => setLoading(false));
  }, [session]);

  if (loading) return <Loading fullScreen />;

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="Nenhum pedido ainda"
        message="Seus pedidos aparecerão aqui após a primeira compra."
        action={
          <Link to="/cardapio">
            <span className={pageStyles.link}>Fazer primeiro pedido →</span>
          </Link>
        }
      />
    );
  }

  return (
    <div className={pageStyles.page}>
      <Header title="Histórico de pedidos" subtitle={`${orders.length} pedido(s)`} />
      <div className={pageStyles.page} style={{ gap: '0.75rem' }}>
        {orders.map((order) => (
          <Link key={order.id} to={`/pedido/${order.id}`} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span>#{order.id.slice(-8).toUpperCase()}</span>
              <Badge variant={order.status === 'cancelado' ? 'error' : order.status === 'entregue' ? 'success' : 'primary'}>
                {ORDER_STATUS_LABELS[order.status]}
              </Badge>
            </div>
            <p className={styles.orderMeta}>{order.unitName}</p>
            <div className={styles.orderFooter}>
              <span>{formatDate(order.createdAt)}</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
