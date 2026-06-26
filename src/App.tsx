import { useState } from 'react';
import { ModalLGPD } from '@/components/ui';
import {
  AuthProvider,
  CartProvider,
  LGPDProvider,
  ToastProvider,
  UnitProvider,
  useLGPD,
} from '@/contexts';
import { AppRoutes } from '@/routes';

function LGPDGate() {
  const { hasValidConsent, saveConsent } = useLGPD();
  const [dismissed, setDismissed] = useState(false);

  const showModal = !hasValidConsent && !dismissed;

  return (
    <>
      <AppRoutes />
      <ModalLGPD
        isOpen={showModal}
        required
        onAccept={(consent) => {
          saveConsent(consent);
          setDismissed(true);
        }}
      />
    </>
  );
}

function AppProviders() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LGPDProvider>
          <UnitProvider>
            <CartProvider>
              <LGPDGate />
            </CartProvider>
          </UnitProvider>
        </LGPDProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

function App() {
  return <AppProviders />;
}

export default App;
