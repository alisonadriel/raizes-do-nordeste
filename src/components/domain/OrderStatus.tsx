import type { OrderStatus as OrderStatusType } from '@/types';
import { ORDER_STATUS_LABELS } from '@/utils/constants';
import styles from './OrderStatus.module.css';

interface OrderStatusProps {
  status: OrderStatusType;
}

const ALL_STEPS: { key: OrderStatusType; label: string }[] = [
  { key: 'confirmado', label: ORDER_STATUS_LABELS.confirmado },
  { key: 'preparando', label: ORDER_STATUS_LABELS.preparando },
  { key: 'pronto', label: ORDER_STATUS_LABELS.pronto },
  { key: 'saiu_entrega', label: ORDER_STATUS_LABELS.saiu_entrega },
  { key: 'entregue', label: ORDER_STATUS_LABELS.entregue },
];

export function OrderStatusTracker({ status }: OrderStatusProps) {
  if (status === 'cancelado') {
    return (
      <p className={styles.cancelledMsg}>
        Este pedido foi cancelado.
      </p>
    );
  }

  const currentIndex = ALL_STEPS.findIndex((s) => s.key === status);

  return (
    <div className={styles.timeline}>
      {ALL_STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === ALL_STEPS.length - 1;

        return (
          <div
            key={step.key}
            className={`${styles.step} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}
          >
            <div className={styles.indicator}>
              <div className={styles.dot} />
              {!isLast && <div className={styles.line} />}
            </div>
            <div className={styles.content}>
              <p className={styles.label}>{step.label}</p>
              {isActive && <p className={styles.time}>Em andamento</p>}
              {isDone && <p className={styles.time}>Concluído</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { OrderStatusTracker as OrderStatus };
