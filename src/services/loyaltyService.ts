import { mockPromotions } from '@/data/promotions';
import type { Promotion } from '@/types';
import { shouldSimulateError } from '@/utils/storage';
import { simulateRequest } from './api';

export const loyaltyService = {
  async getPromotions(): Promise<Promotion[]> {
    return simulateRequest(mockPromotions, 400, shouldSimulateError());
  },

  getActivePromotions(): Promotion[] {
    return mockPromotions.filter((p) => p.active);
  },

  getDiscountsAvailable(points: number, pointsForDiscount: number): number {
    return Math.floor(points / pointsForDiscount);
  },

  getPointsToNextReward(points: number, pointsForDiscount: number): number {
    return pointsForDiscount - (points % pointsForDiscount);
  },
};
