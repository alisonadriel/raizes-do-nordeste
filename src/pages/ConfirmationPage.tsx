import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Loading } from '@/components/ui';
import type { Order } from '@/types';
import { orderService } from '@/services/orderService';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './ConfirmationPage.module.css';
import pageStyles from './pages.module.css';

export function ConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    orderService.getOrderById(orderId).then(setOrder).finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <Loading fullScreen />;
  if (!order) return null;

  return (
    <div className={`${pageStyles.page} ${styles.confirm}`}>
      <div className={styles.stamp}>OK</div>
      <h1>Pedido confirmado</h1>
      <p className={styles.subtitle}>Seu pagamento foi aprovado com sucesso.</p>

      <div className={pageStyles.card}>
        <p><strong>Pedido:</strong> #{order.id.slice(-8).toUpperCase()}</p>
        <p><strong>Unidade:</strong> {order.unitName}</p>
        <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
        <p><strong>Data:</strong> {formatDate(order.createdAt)}</p>
        {order.pointsEarned > 0 && (
          <p><strong>Pontos:</strong> +{order.pointsEarned}</p>
        )}
      </div>

      <div className={pageStyles.actions}>
        <Link to={`/pedido/${order.id}`}>
          <Button fullWidth>Acompanhar pedido</Button>
        </Link>
        <Link to="/cardapio">
          <Button variant="outline" fullWidth>Fazer novo pedido</Button>
        </Link>
      </div>
    </div>
  );
}
