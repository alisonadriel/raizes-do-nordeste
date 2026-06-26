import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/ui';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, useCartPointsEarned, useCartPointsUsed } from '@/contexts/CartContext';
import { useUnit } from '@/contexts/UnitContext';
import { useToast } from '@/contexts/ToastContext';
import { orderService } from '@/services/orderService';
import { paymentService } from '@/services/paymentService';
import { formatCurrency } from '@/utils/format';
import { AppError } from '@/services/api';
import styles from './PaymentPage.module.css';
import pageStyles from './pages.module.css';

export function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [forceOutcome, setForceOutcome] = useState<'approved' | 'declined' | 'error' | ''>('');
  const { items, summary, coupon, clearCart } = useCart();
  const { session, updatePoints } = useAuth();
  const { unit } = useUnit();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const pointsUsed = useCartPointsUsed();
  const pointsEarned = useCartPointsEarned();

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || !unit) return;

    setProcessing(true);
    try {
      const result = await paymentService.processPayment({
        cardNumber,
        cardName,
        total: summary.total,
        forceOutcome: forceOutcome || undefined,
      });

      if (!result.success) {
        showToast(result.message, 'error');
        setProcessing(false);
        return;
      }

      const order = await orderService.createOrder({
        userId: session.user.id,
        unitId: unit.id,
        unitName: unit.name,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal: summary.subtotal,
        discount: summary.couponDiscount,
        loyaltyDiscount: summary.loyaltyDiscount,
        total: summary.total,
        couponCode: coupon?.code,
        pointsEarned,
        pointsUsed,
      });

      const newPoints = session.user.points - pointsUsed + pointsEarned;
      updatePoints(newPoints);
      clearCart();
      navigate(`/confirmacao/${order.id}`);
    } catch (err) {
      if (err instanceof AppError) {
        if (err.code === 'NETWORK' || err.code === 'PAYMENT') {
          navigate('/erro');
          return;
        }
        showToast(err.message, 'error');
      }
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return <Loading text="Processando pagamento..." size="lg" fullScreen />;
  }

  return (
    <div className={pageStyles.page}>
      <div className={styles.totalBox}>
        <span>Total a pagar</span>
        <strong>{formatCurrency(summary.total)}</strong>
      </div>

      <form className={pageStyles.form} onSubmit={handlePay}>
        <Input
          label="Número do cartão"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="0000 0000 0000 0000"
          hint="Termina em 0 = recusado · Termina em 9 = erro"
          required
        />
        <Input
          label="Nome no cartão"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <div className={pageStyles.card}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Simular resultado (demo)</label>
          <select
            value={forceOutcome}
            onChange={(e) => setForceOutcome(e.target.value as typeof forceOutcome)}
            style={{ marginTop: '0.5rem', padding: '0.5rem', width: '100%' }}
          >
            <option value="">Automático (último dígito)</option>
            <option value="approved">Aprovado</option>
            <option value="declined">Recusado</option>
            <option value="error">Erro de conexão</option>
          </select>
        </div>

        <Button type="submit" fullWidth>
          Confirmar pagamento
        </Button>
      </form>
    </div>
  );
}
