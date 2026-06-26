export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  couponCode?: string;
  validUntil: string;
  active: boolean;
  imageEmoji: string;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrder: number;
  active: boolean;
  label: string;
}
