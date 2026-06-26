import { Header } from '@/components/layout/Header';
import { LoyaltyBadge } from '@/components/domain/LoyaltyBadge';
import { useAuth } from '@/contexts/AuthContext';
import { LOYALTY_CONFIG } from '@/utils/constants';
import { loyaltyService } from '@/services/loyaltyService';
import { formatCurrency } from '@/utils/format';
import styles from './LoyaltyPage.module.css';
import pageStyles from './pages.module.css';

export function LoyaltyPage() {
  const { session } = useAuth();
  const points = session?.user.points ?? 0;
  const discounts = loyaltyService.getDiscountsAvailable(points, LOYALTY_CONFIG.pointsForDiscount);
  const toNext = loyaltyService.getPointsToNextReward(points, LOYALTY_CONFIG.pointsForDiscount);

  return (
    <div className={pageStyles.page}>
      <Header title="Programa de Fidelidade" subtitle="Acumule pontos a cada pedido" />

      <div className={styles.hero}>
        <span className={styles.star}>★</span>
        <LoyaltyBadge points={points} />
      </div>

      <div className={pageStyles.card}>
        <h3>Como funciona</h3>
        <ul className={styles.rules}>
          <li>A cada <strong>R$ 1,00</strong> gasto = <strong>1 ponto</strong></li>
          <li>A cada <strong>{LOYALTY_CONFIG.pointsForDiscount} pontos</strong> = <strong>{formatCurrency(LOYALTY_CONFIG.discountValue)}</strong> de desconto</li>
          <li>Resgate no checkout ao finalizar o pedido</li>
        </ul>
      </div>

      <div className={pageStyles.grid}>
        <div className={pageStyles.card}>
          <p className={styles.statLabel}>Descontos disponíveis</p>
          <p className={styles.statValue}>{discounts}</p>
        </div>
        <div className={pageStyles.card}>
          <p className={styles.statLabel}>Pts p/ próximo desconto</p>
          <p className={styles.statValue}>{toNext}</p>
        </div>
      </div>
    </div>
  );
}
