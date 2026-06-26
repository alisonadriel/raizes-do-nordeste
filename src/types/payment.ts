export type PaymentOutcome = 'approved' | 'declined' | 'error';

export interface PaymentRequest {
  orderTotal: number;
  cardNumber: string;
  cardName: string;
  forceOutcome?: PaymentOutcome;
}

export interface PaymentResult {
  success: boolean;
  outcome: PaymentOutcome;
  transactionId: string;
  message: string;
}
