import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Unit } from '@/types';
import { getItem, setItem, STORAGE_KEYS } from '@/utils';

export interface UnitContextValue {
  unit: Unit | null;
  setUnit: (unit: Unit | null) => void;
}

export const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<Unit | null>(() =>
    getItem<Unit | null>(STORAGE_KEYS.UNIT, null),
  );

  const setUnit = useCallback((newUnit: Unit | null) => {
    setUnitState(newUnit);
    setItem(STORAGE_KEYS.UNIT, newUnit);
  }, []);

  const value = useMemo(() => ({ unit, setUnit }), [unit, setUnit]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const context = useContext(UnitContext);
  if (!context) throw new Error('useUnit deve ser usado dentro de UnitProvider');
  return context;
}
