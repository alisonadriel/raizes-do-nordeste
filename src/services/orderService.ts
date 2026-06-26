import type { Order, OrderItem, OrderStatus } from '@/types';
import { ORDER_STATUS_STEPS } from '@/utils/constants';
import { generateId } from '@/utils/format';
import { getItem, setItem, shouldSimulateError, STORAGE_KEYS } from '@/utils';
import { AppError, simulateRequest } from './api';

function getOrders(): Order[] {
  return getItem<Order[]>(STORAGE_KEYS.ORDERS, []);
}

function saveOrders(orders: Order[]): void {
  setItem(STORAGE_KEYS.ORDERS, orders);
}

export const orderService = {
  async createOrder(data: {
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
  }): Promise<Order> {
    return simulateRequest(undefined, 700, shouldSimulateError()).then(() => {
      const order: Order = {
        id: generateId('order'),
        userId: data.userId,
        unitId: data.unitId,
        unitName: data.unitName,
        items: data.items,
        subtotal: data.subtotal,
        discount: data.discount,
        loyaltyDiscount: data.loyaltyDiscount,
        total: data.total,
        couponCode: data.couponCode,
        pointsEarned: data.pointsEarned,
        pointsUsed: data.pointsUsed,
        status: 'confirmado',
        paymentStatus: 'aprovado',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveOrders([order, ...getOrders()]);
      return order;
    });
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return simulateRequest(
      getOrders().filter((o) => o.userId === userId),
      500,
      shouldSimulateError(),
    );
  },

  async getOrderById(id: string): Promise<Order> {
    return simulateRequest(undefined, 400, shouldSimulateError()).then(() => {
      const order = getOrders().find((o) => o.id === id);
      if (!order) throw new AppError('Pedido não encontrado.', 'NOT_FOUND');
      return order;
    });
  },

  async advanceOrderStatus(orderId: string): Promise<Order> {
    return simulateRequest(undefined, 500, shouldSimulateError()).then(() => {
      const orders = getOrders();
      const index = orders.findIndex((o) => o.id === orderId);
      if (index === -1) throw new AppError('Pedido não encontrado.', 'NOT_FOUND');

      const order = orders[index];
      if (order.status === 'cancelado' || order.status === 'entregue') return order;

      const currentIdx = ORDER_STATUS_STEPS.indexOf(
        order.status as (typeof ORDER_STATUS_STEPS)[number],
      );
      const nextStatus =
        currentIdx >= 0 && currentIdx < ORDER_STATUS_STEPS.length - 1
          ? ORDER_STATUS_STEPS[currentIdx + 1]
          : order.status;

      const updated: Order = {
        ...order,
        status: nextStatus as OrderStatus,
        updatedAt: new Date().toISOString(),
      };

      orders[index] = updated;
      saveOrders(orders);
      return updated;
    });
  },

  async cancelOrder(orderId: string): Promise<Order> {
    return simulateRequest(undefined, 500, shouldSimulateError()).then(() => {
      const orders = getOrders();
      const index = orders.findIndex((o) => o.id === orderId);
      if (index === -1) throw new AppError('Pedido não encontrado.', 'NOT_FOUND');

      const updated: Order = {
        ...orders[index],
        status: 'cancelado',
        updatedAt: new Date().toISOString(),
      };

      orders[index] = updated;
      saveOrders(orders);
      return updated;
    });
  },

  simulateStatusProgression(order: Order): OrderStatus {
    const elapsed = Date.now() - new Date(order.createdAt).getTime();
    const minutes = elapsed / 60000;

    if (order.status === 'cancelado') return 'cancelado';
    if (minutes < 1) return 'confirmado';
    if (minutes < 3) return 'preparando';
    if (minutes < 5) return 'pronto';
    if (minutes < 8) return 'saiu_entrega';
    return 'entregue';
  },
};
