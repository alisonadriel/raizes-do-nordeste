import type { Promotion } from '@/types';
import styles from './PromotionBanner.module.css';

interface PromotionBannerProps {
  promotion: Promotion;
}

export function PromotionBanner({ promotion }: PromotionBannerProps) {
  return (
    <article className={`${styles.banner} ${!promotion.active ? styles.inactive : ''}`}>
      <span className={styles.emoji} aria-hidden="true">
        {promotion.imageEmoji}
      </span>
      <div className={styles.content}>
        <h3>{promotion.title}</h3>
        <p>{promotion.description}</p>
        {promotion.couponCode && promotion.active && (
          <span className={styles.coupon}>Cupom: {promotion.couponCode}</span>
        )}
      </div>
    </article>
  );
}
