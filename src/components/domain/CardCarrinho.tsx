import type { CartItem } from '@/types';
import { formatCurrency } from '@/utils/format';
import styles from './CardCarrinho.module.css';

interface CardCarrinhoProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CardCarrinho({ item, onUpdateQuantity, onRemove }: CardCarrinhoProps) {
  return (
    <article className={styles.card}>
      <div className={styles.emoji} aria-hidden="true">
        {item.imageEmoji}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>{formatCurrency(item.price * item.quantity)}</p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className={styles.qty}>{item.quantity}</span>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            aria-label="Aumentar quantidade"
          >
            +
          </button>
          <button
            type="button"
            className={styles.remove}
            onClick={() => onRemove(item.productId)}
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}
