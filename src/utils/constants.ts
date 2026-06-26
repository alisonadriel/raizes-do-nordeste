export const STORAGE_KEYS = {
  USERS: 'rn_users',
  SESSION: 'rn_session',
  UNIT: 'rn_unit',
  CART: 'rn_cart',
  ORDERS: 'rn_orders',
  LGPD: 'rn_lgpd',
  SIMULATE_ERROR: 'rn_simulate_error',
} as const;

export const LOYALTY_CONFIG = {
  pointsPerReal: 1,
  pointsForDiscount: 100,
  discountValue: 10,
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  preparando: 'Preparando',
  pronto: 'Pronto para retirada',
  saiu_entrega: 'Saiu para entrega',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

export const ORDER_STATUS_STEPS = [
  'confirmado',
  'preparando',
  'pronto',
  'entregue',
] as const;
