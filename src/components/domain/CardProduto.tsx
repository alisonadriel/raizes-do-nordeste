import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import styles from './CardProduto.module.css';

interface CardProdutoProps {
  product: Product;
}

export function CardProduto({ product }: CardProdutoProps) {
  return (
    <Link
      to={`/produto/${product.id}`}
      className={`${styles.card} ${!product.available ? styles.unavailable : ''}`}
    >
      <div className={styles.image}>
        <span className={styles.emoji} aria-hidden="true">
          {product.imageEmoji}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          {!product.available && <Badge variant="error">Indisponível</Badge>}
        </div>
      </div>
    </Link>
  );
}
