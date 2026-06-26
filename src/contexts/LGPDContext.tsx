import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { lgpdService } from '@/services/lgpdService';
import type { LGPDConsent } from '@/types';

export interface LGPDContextValue {
  consent: LGPDConsent;
  hasValidConsent: boolean;
  saveConsent: (data: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
    dataStorageAccepted: boolean;
  }) => void;
  revokeConsent: () => void;
}

export const LGPDContext = createContext<LGPDContextValue | null>(null);

export function LGPDProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<LGPDConsent>(() => lgpdService.getConsent());

  const saveConsent = useCallback(
    (data: {
      termsAccepted: boolean;
      privacyAccepted: boolean;
      dataStorageAccepted: boolean;
    }) => {
      const saved = lgpdService.saveConsent(data);
      setConsent(saved);
    },
    [],
  );

  const revokeConsent = useCallback(() => {
    const revoked = lgpdService.revokeConsent();
    setConsent(revoked);
  }, []);

  const hasValidConsent = useMemo(() => lgpdService.hasValidConsent(), [consent]);

  const value = useMemo(
    () => ({ consent, hasValidConsent, saveConsent, revokeConsent }),
    [consent, hasValidConsent, saveConsent, revokeConsent],
  );

  return <LGPDContext.Provider value={value}>{children}</LGPDContext.Provider>;
}

export function useLGPD() {
  const context = useContext(LGPDContext);
  if (!context) throw new Error('useLGPD deve ser usado dentro de LGPDProvider');
  return context;
}
