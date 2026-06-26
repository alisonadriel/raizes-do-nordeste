import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { cartService } from '@/services/cartService';
import type { AppliedCoupon, CartItem } from '@/types';
import type { CartSummary } from '@/services/cartService';
import { getItem, setItem, STORAGE_KEYS } from '@/utils';
import { useAuth } from './AuthContext';

export interface CartContextValue {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  useLoyalty: boolean;
  summary: CartSummary;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  toggleLoyalty: (value: boolean) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

interface CartState {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  useLoyalty: boolean;
}

type CartAction =
  | { type: 'SET'; payload: CartState }
  | { type: 'ADD'; payload: { item: Omit<CartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'COUPON'; payload: AppliedCoupon | null }
  | { type: 'LOYALTY'; payload: boolean }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD': {
      const existing = state.items.find((i) => i.productId === action.payload.item.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.item.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload.item, quantity: action.payload.quantity }],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload) };
    case 'UPDATE_QTY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i,
        ),
      };
    case 'COUPON':
      return { ...state, coupon: action.payload };
    case 'LOYALTY':
      return { ...state, useLoyalty: action.payload };
    case 'CLEAR':
      return { items: [], coupon: null, useLoyalty: false };
    default:
      return state;
  }
}

function getInitialState(): CartState {
  return getItem<CartState>(STORAGE_KEYS.CART, { items: [], coupon: null, useLoyalty: false });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  const persist = useCallback((newState: CartState) => {
    setItem(STORAGE_KEYS.CART, newState);
  }, []);

  const dispatchAndPersist = useCallback(
    (action: CartAction) => {
      dispatch(action);
    },
    [],
  );

  useEffect(() => {
    persist(state);
  }, [state, persist]);

  const userPoints = session?.user.points ?? 0;

  const summary = useMemo(
    () => cartService.getSummary(state.items, state.coupon, state.useLoyalty, userPoints),
    [state.items, state.coupon, state.useLoyalty, userPoints],
  );

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
      dispatchAndPersist({ type: 'ADD', payload: { item, quantity } });
    },
    [dispatchAndPersist],
  );

  const removeItem = useCallback(
    (productId: string) => {
      dispatchAndPersist({ type: 'REMOVE', payload: productId });
    },
    [dispatchAndPersist],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatchAndPersist({ type: 'UPDATE_QTY', payload: { productId, quantity } });
    },
    [dispatchAndPersist],
  );

  const applyCoupon = useCallback(
    (coupon: AppliedCoupon) => {
      dispatchAndPersist({ type: 'COUPON', payload: coupon });
    },
    [dispatchAndPersist],
  );

  const removeCoupon = useCallback(() => {
    dispatchAndPersist({ type: 'COUPON', payload: null });
  }, [dispatchAndPersist]);

  const toggleLoyalty = useCallback(
    (value: boolean) => {
      dispatchAndPersist({ type: 'LOYALTY', payload: value });
    },
    [dispatchAndPersist],
  );

  const clearCart = useCallback(() => {
    dispatchAndPersist({ type: 'CLEAR' });
  }, [dispatchAndPersist]);

  const value = useMemo(
    () => ({
      items: state.items,
      coupon: state.coupon,
      useLoyalty: state.useLoyalty,
      summary,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      toggleLoyalty,
      clearCart,
    }),
    [
      state,
      summary,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      toggleLoyalty,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
}

export function useCartPointsUsed(): number {
  const { useLoyalty } = useCart();
  const { session } = useAuth();
  return cartService.getPointsToUse(useLoyalty, session?.user.points ?? 0);
}

export function useCartPointsEarned(): number {
  const { summary } = useCart();
  return cartService.getPointsEarned(summary.total);
}
