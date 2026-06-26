import type { Promotion, Coupon } from '@/types';

export const mockPromotions: Promotion[] = [
  {
    id: 'promo_1',
    title: 'Terça da Tapioca',
    description: 'Toda terça-feira, 15% off em todas as tapiocas.',
    discountPercent: 15,
    couponCode: 'TAPIOCA15',
    validUntil: '2026-12-31',
    active: true,
    imageEmoji: '🫓',
  },
  {
    id: 'promo_2',
    title: 'Combo Família',
    description: 'Combos com 20% de desconto nos finais de semana.',
    discountPercent: 20,
    couponCode: 'FAMILIA20',
    validUntil: '2026-12-31',
    active: true,
    imageEmoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 'promo_3',
    title: 'Doce Horário',
    description: 'Doces regionais com 10% off das 14h às 17h.',
    discountPercent: 10,
    validUntil: '2026-06-30',
    active: true,
    imageEmoji: '🍮',
  },
  {
    id: 'promo_4',
    title: 'Black Friday Nordestina',
    description: 'Promoção encerrada — volte em novembro!',
    discountPercent: 30,
    couponCode: 'BLACK30',
    validUntil: '2025-11-30',
    active: false,
    imageEmoji: '🏷️',
  },
];

export const mockCoupons: Coupon[] = [
  {
    code: 'TAPIOCA15',
    discountType: 'percent',
    discountValue: 15,
    minOrder: 20,
    active: true,
    label: '15% off em tapiocas',
  },
  {
    code: 'FAMILIA20',
    discountType: 'percent',
    discountValue: 20,
    minOrder: 30,
    active: true,
    label: '20% off em combos',
  },
  {
    code: 'BEMVINDO',
    discountType: 'fixed',
    discountValue: 5,
    minOrder: 25,
    active: true,
    label: 'R$ 5 off — primeiro pedido',
  },
  {
    code: 'INVALIDO',
    discountType: 'percent',
    discountValue: 50,
    minOrder: 0,
    active: false,
    label: 'Cupom expirado',
  },
];
