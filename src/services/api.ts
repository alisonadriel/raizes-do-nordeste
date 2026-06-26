const DEFAULT_DELAY = 600;

export class AppError extends Error {
  constructor(
    message: string,
    public code: 'NETWORK' | 'NOT_FOUND' | 'VALIDATION' | 'AUTH' | 'PAYMENT',
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export async function simulateRequest<T>(
  data: T,
  delay = DEFAULT_DELAY,
  shouldFail = false,
): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (shouldFail) {
    throw new AppError('Erro de conexão simulado. Tente novamente.', 'NETWORK');
  }

  return data;
}
