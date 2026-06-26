import { LOYALTY_CONFIG } from '@/utils/constants';
import styles from './LoyaltyBadge.module.css';

interface LoyaltyBadgeProps {
  points: number;
}

export function LoyaltyBadge({ points }: LoyaltyBadgeProps) {
  const discounts = Math.floor(points / LOYALTY_CONFIG.pointsForDiscount);

  return (
    <div className={styles.badge}>
      <span className={styles.icon} aria-hidden="true">★</span>
      <span>
        <span className={styles.points}>{points} pts</span>
        {discounts > 0 && ` · ${discounts} desconto(s)`}
      </span>
    </div>
  );
}
