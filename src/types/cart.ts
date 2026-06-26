export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageEmoji: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  label: string;
}
