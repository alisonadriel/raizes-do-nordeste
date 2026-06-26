import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Badge, Button, Loading } from '@/components/ui';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import type { Product } from '@/types';
import { productService } from '@/services/productService';
import { formatCurrency } from '@/utils/format';
import styles from './ProductPage.module.css';
import pageStyles from './pages.module.css';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    productService
      .getProductById(id)
      .then(setProduct)
      .catch(() => navigate('/cardapio'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAdd = () => {
    if (!product || !product.available) return;
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageEmoji: product.imageEmoji,
      },
      quantity,
    );
    showToast(`${product.name} adicionado ao carrinho!`, 'success');
    navigate('/carrinho');
  };

  if (loading) return <Loading fullScreen />;
  if (!product) return null;

  return (
    <div className={pageStyles.page}>
      <Header title="" backTo="/cardapio" />
      <div className={styles.detail}>
        <div className={styles.image}>{product.imageEmoji}</div>
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h1>{product.name}</h1>
            {!product.available && <Badge variant="error">Indisponível</Badge>}
          </div>
          <p className={styles.price}>{formatCurrency(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.tags}>
            {product.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {product.available ? (
            <>
              <div className={styles.quantity}>
                <span>Quantidade:</span>
                <div className={styles.qtyControls}>
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              <Button fullWidth onClick={handleAdd}>
                Adicionar ao carrinho — {formatCurrency(product.price * quantity)}
              </Button>
            </>
          ) : (
            <p className={pageStyles.error}>Este produto está indisponível no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}
