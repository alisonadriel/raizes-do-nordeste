import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderStatus } from '@/components/domain/OrderStatus';
import { Header } from '@/components/layout/Header';
import { Button, Loading } from '@/components/ui';
import type { Order } from '@/types';
import { orderService } from '@/services/orderService';
import { ORDER_STATUS_LABELS } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './pages.module.css';

export function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const load = () => {
      orderService.getOrderById(orderId).then((o) => {
        const simulatedStatus = orderService.simulateStatusProgression(o);
        setOrder({ ...o, status: simulatedStatus });
        setLoading(false);
      });
    };

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleCancel = async () => {
    if (!orderId || !order) return;
    if (order.status === 'entregue' || order.status === 'cancelado') return;
    const updated = await orderService.cancelOrder(orderId);
    setOrder(updated);
  };

  if (loading) return <Loading fullScreen />;
  if (!order) return null;

  return (
    <div className={styles.page}>
      <Header
        title="Acompanhar pedido"
        subtitle={`#${order.id.slice(-8).toUpperCase()} · ${formatDate(order.createdAt)}`}
        backTo="/historico"
      />

      <div className={styles.card}>
        <p className={styles.summaryRow}>
          <span>Status atual</span>
          <strong>{ORDER_STATUS_LABELS[order.status]}</strong>
        </p>
        <p className={styles.summaryRow}>
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </p>
        <p className={styles.summaryRow}>
          <span>Unidade</span>
          <span>{order.unitName}</span>
        </p>
      </div>

      <div className={styles.card}>
        <h3 style={{ marginBottom: '1rem' }}>Progresso</h3>
        <OrderStatus status={order.status} />
      </div>

      {order.status !== 'cancelado' && order.status !== 'entregue' && (
        <Button variant="danger" fullWidth onClick={handleCancel}>
          Cancelar pedido
        </Button>
      )}
    </div>
  );
}
