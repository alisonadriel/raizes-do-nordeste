export interface LGPDConsent {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  dataStorageAccepted: boolean;
  consentedAt: string;
  revoked: boolean;
  revokedAt?: string;
}
