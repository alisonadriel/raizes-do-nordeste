import type { AppliedCoupon, CartItem } from '@/types';
import { LOYALTY_CONFIG } from '@/utils/constants';

export interface CartSummary {
  subtotal: number;
  couponDiscount: number;
  loyaltyDiscount: number;
  total: number;
  itemCount: number;
}

export const cartService = {
  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  calculateCouponDiscount(subtotal: number, coupon: AppliedCoupon | null): number {
    if (!coupon) return 0;
    if (coupon.discountType === 'percent') {
      return subtotal * (coupon.discountValue / 100);
    }
    return Math.min(coupon.discountValue, subtotal);
  },

  calculateLoyaltyDiscount(useLoyalty: boolean, userPoints: number): number {
    if (!useLoyalty) return 0;
    const availableDiscounts = Math.floor(userPoints / LOYALTY_CONFIG.pointsForDiscount);
    return availableDiscounts * LOYALTY_CONFIG.discountValue;
  },

  getSummary(
    items: CartItem[],
    coupon: AppliedCoupon | null,
    useLoyalty: boolean,
    userPoints: number,
  ): CartSummary {
    const subtotal = cartService.calculateSubtotal(items);
    const couponDiscount = cartService.calculateCouponDiscount(subtotal, coupon);
    const afterCoupon = subtotal - couponDiscount;
    const loyaltyDiscount = cartService.calculateLoyaltyDiscount(useLoyalty, userPoints);
    const total = Math.max(0, afterCoupon - loyaltyDiscount);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return { subtotal, couponDiscount, loyaltyDiscount, total, itemCount };
  },

  getPointsToUse(useLoyalty: boolean, userPoints: number): number {
    if (!useLoyalty) return 0;
    const discounts = Math.floor(userPoints / LOYALTY_CONFIG.pointsForDiscount);
    return discounts * LOYALTY_CONFIG.pointsForDiscount;
  },

  getPointsEarned(total: number): number {
    return Math.floor(total * LOYALTY_CONFIG.pointsPerReal);
  },
};
