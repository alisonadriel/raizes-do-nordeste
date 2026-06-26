import type { LGPDConsent } from '@/types';
import { getItem, setItem, STORAGE_KEYS } from '@/utils';

const defaultConsent: LGPDConsent = {
  termsAccepted: false,
  privacyAccepted: false,
  dataStorageAccepted: false,
  consentedAt: '',
  revoked: false,
};

export const lgpdService = {
  getConsent(): LGPDConsent {
    return getItem<LGPDConsent>(STORAGE_KEYS.LGPD, defaultConsent);
  },

  saveConsent(consent: Omit<LGPDConsent, 'consentedAt' | 'revoked'>): LGPDConsent {
    const data: LGPDConsent = {
      ...consent,
      consentedAt: new Date().toISOString(),
      revoked: false,
    };
    setItem(STORAGE_KEYS.LGPD, data);
    return data;
  },

  revokeConsent(): LGPDConsent {
    const data: LGPDConsent = {
      ...defaultConsent,
      revoked: true,
      revokedAt: new Date().toISOString(),
      consentedAt: lgpdService.getConsent().consentedAt,
    };
    setItem(STORAGE_KEYS.LGPD, data);
    return data;
  },

  hasValidConsent(): boolean {
    const consent = lgpdService.getConsent();
    return (
      consent.termsAccepted &&
      consent.privacyAccepted &&
      consent.dataStorageAccepted &&
      !consent.revoked
    );
  },
};
