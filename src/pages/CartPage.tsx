import { Link } from 'react-router-dom';
import { CardCarrinho } from '@/components/domain/CardCarrinho';
import { EmptyState } from '@/components/domain/EmptyState';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/format';
import styles from './pages.module.css';

export function CartPage() {
  const { items, summary, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Carrinho vazio"
        message="Adicione produtos do cardápio para continuar."
        action={
          <Link to="/cardapio">
            <Button>Ver cardápio</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className={styles.page}>
      <Header title="Carrinho" subtitle={`${summary.itemCount} item(ns)`} backTo="/cardapio" />
      <div className={styles.page} style={{ gap: '0.75rem' }}>
        {items.map((item) => (
          <CardCarrinho
            key={item.productId}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <div className={styles.stickyFooter}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{formatCurrency(summary.subtotal)}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total</span>
          <span>{formatCurrency(summary.subtotal)}</span>
        </div>
        <Link to="/checkout" style={{ display: 'block', marginTop: '1rem' }}>
          <Button fullWidth>Ir para checkout</Button>
        </Link>
      </div>
    </div>
  );
}
