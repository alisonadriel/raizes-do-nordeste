import type { PaymentOutcome, PaymentResult } from '@/types';
import { generateId } from '@/utils/format';
import { shouldSimulateError } from '@/utils/storage';
import { isValidCardNumber } from '@/utils/validators';
import { AppError, simulateRequest } from './api';

export const paymentService = {
  async processPayment(data: {
    cardNumber: string;
    cardName: string;
    total: number;
    forceOutcome?: PaymentOutcome;
  }): Promise<PaymentResult> {
    await simulateRequest(null, 2500, shouldSimulateError());

    if (!data.cardName.trim()) {
      throw new AppError('Informe o nome no cartão.', 'VALIDATION');
    }

    if (!isValidCardNumber(data.cardNumber)) {
      throw new AppError('Número do cartão inválido.', 'VALIDATION');
    }

    const lastDigit = data.cardNumber.replace(/\D/g, '').slice(-1);
    let outcome: PaymentOutcome = 'approved';

    if (data.forceOutcome) {
      outcome = data.forceOutcome;
    } else if (lastDigit === '0') {
      outcome = 'declined';
    } else if (lastDigit === '9') {
      outcome = 'error';
    }

    if (outcome === 'error') {
      throw new AppError('Erro no processamento. Tente novamente.', 'PAYMENT');
    }

    if (outcome === 'declined') {
      return {
        success: false,
        outcome: 'declined',
        transactionId: generateId('txn'),
        message: 'Pagamento recusado pelo emissor do cartão.',
      };
    }

    return {
      success: true,
      outcome: 'approved',
      transactionId: generateId('txn'),
      message: 'Pagamento aprovado com sucesso!',
    };
  },
};
