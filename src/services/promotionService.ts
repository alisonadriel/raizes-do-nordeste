import { mockCoupons } from '@/data/promotions';
import type { AppliedCoupon } from '@/types';
import { shouldSimulateError } from '@/utils/storage';
import { AppError, simulateRequest } from './api';

export const promotionService = {
  async validateCoupon(code: string, subtotal: number): Promise<AppliedCoupon> {
    return simulateRequest(undefined, 500, shouldSimulateError()).then(() => {
      const coupon = mockCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

      if (!coupon || !coupon.active) {
        throw new AppError('Cupom inválido ou expirado.', 'VALIDATION');
      }

      if (subtotal < coupon.minOrder) {
        throw new AppError(
          `Pedido mínimo de R$ ${coupon.minOrder.toFixed(2)} para este cupom.`,
          'VALIDATION',
        );
      }

      return {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        label: coupon.label,
      };
    });
  },
};
