import { useEffect, useState } from 'react';
import { PromotionBanner } from '@/components/domain/PromotionBanner';
import { Header } from '@/components/layout/Header';
import { Loading } from '@/components/ui';
import type { Promotion } from '@/types';
import { loyaltyService } from '@/services/loyaltyService';
import styles from './pages.module.css';

export function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loyaltyService.getPromotions().then(setPromotions).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading fullScreen />;

  return (
    <div className={styles.page}>
      <Header title="Promoções" subtitle="Ofertas especiais da rede" />
      <div className={styles.page} style={{ gap: '0.75rem' }}>
        {promotions.map((promo) => (
          <PromotionBanner key={promo.id} promotion={promo} />
        ))}
      </div>
    </div>
  );
}
