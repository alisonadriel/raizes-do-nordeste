import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, useCartPointsEarned, useCartPointsUsed } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { promotionService } from '@/services/promotionService';
import { formatCurrency } from '@/utils/format';
import { LOYALTY_CONFIG } from '@/utils/constants';
import { AppError } from '@/services/api';
import styles from './pages.module.css';

export function CheckoutPage() {
  const { items, summary, coupon, applyCoupon, removeCoupon, toggleLoyalty, useLoyalty } = useCart();
  const { session } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const pointsUsed = useCartPointsUsed();
  const pointsEarned = useCartPointsEarned();

  const handleCoupon = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const applied = await promotionService.validateCoupon(couponCode, summary.subtotal);
      applyCoupon(applied);
      showToast('Cupom aplicado!', 'success');
    } catch (err) {
      showToast(err instanceof AppError ? err.message : 'Cupom inválido.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const canUseLoyalty =
    session && session.user.points >= LOYALTY_CONFIG.pointsForDiscount;

  return (
    <div className={styles.page}>
      <Header title="Resumo do pedido" backTo="/carrinho" />

      <div className={styles.card}>
        <h3 style={{ marginBottom: '0.75rem' }}>Itens</h3>
        {items.map((item) => (
          <div key={item.productId} className={styles.summaryRow}>
            <span>{item.quantity}x {item.name}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h3 style={{ marginBottom: '0.75rem' }}>Cupom de desconto</h3>
        {coupon ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{coupon.label} ({coupon.code})</span>
            <Button variant="ghost" size="sm" onClick={removeCoupon}>Remover</Button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleCoupon} style={{ flexDirection: 'row', gap: '0.5rem' }}>
            <Input
              placeholder="Código do cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button type="submit" disabled={loading} size="sm">Aplicar</Button>
          </form>
        )}
        <p className={styles.hint} style={{ marginTop: '0.5rem' }}>
          Teste: BEMVINDO, TAPIOCA15, FAMILIA20
        </p>
      </div>

      {canUseLoyalty && (
        <div className={styles.card}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={useLoyalty}
              onChange={(e) => toggleLoyalty(e.target.checked)}
            />
            <span>
              Usar fidelidade ({LOYALTY_CONFIG.pointsForDiscount} pts = R${LOYALTY_CONFIG.discountValue} off)
              — Saldo: {session?.user.points} pts
            </span>
          </label>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.summaryRow}><span>Subtotal</span><span>{formatCurrency(summary.subtotal)}</span></div>
        {summary.couponDiscount > 0 && (
          <div className={styles.summaryRow}><span>Cupom</span><span>-{formatCurrency(summary.couponDiscount)}</span></div>
        )}
        {summary.loyaltyDiscount > 0 && (
          <div className={styles.summaryRow}><span>Fidelidade</span><span>-{formatCurrency(summary.loyaltyDiscount)}</span></div>
        )}
        <div className={styles.summaryTotal}><span>Total</span><span>{formatCurrency(summary.total)}</span></div>
        {pointsEarned > 0 && (
          <p className={styles.hint} style={{ marginTop: '0.75rem' }}>
            Você ganhará +{pointsEarned} pontos de fidelidade
            {useLoyalty && pointsUsed > 0 && ` (usará ${pointsUsed} pts)`}
          </p>
        )}
      </div>

      <Link to="/pagamento">
        <Button fullWidth>Ir para pagamento</Button>
      </Link>
    </div>
  );
}
