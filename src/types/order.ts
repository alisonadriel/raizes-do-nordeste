export type OrderStatus =
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'saiu_entrega'
  | 'entregue'
  | 'cancelado';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  unitId: string;
  unitName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  loyaltyDiscount: number;
  total: number;
  couponCode?: string;
  pointsEarned: number;
  pointsUsed: number;
  status: OrderStatus;
  paymentStatus: 'aprovado' | 'recusado' | 'pendente';
  createdAt: string;
  updatedAt: string;
}
