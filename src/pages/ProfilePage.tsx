import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { LoyaltyBadge } from '@/components/domain/LoyaltyBadge';
import { Button, Modal, ModalLGPD } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useLGPD } from '@/contexts/LGPDContext';
import { useToast } from '@/contexts/ToastContext';
import { formatDate } from '@/utils/format';
import styles from './pages.module.css';

export function ProfilePage() {
  const { session, logout } = useAuth();
  const { consent, revokeConsent, saveConsent } = useLGPD();
  const { showToast } = useToast();
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showLGPDModal, setShowLGPDModal] = useState(false);

  if (!session) return null;

  const handleRevoke = () => {
    revokeConsent();
    setShowRevokeModal(false);
    showToast('Consentimento revogado. Algumas funcionalidades podem ser limitadas.', 'warning');
  };

  return (
    <div className={styles.page}>
      <Header title="Meu perfil" subtitle={session.user.email} />

      <div className={styles.card}>
        <p><strong>Nome:</strong> {session.user.name}</p>
        <p><strong>E-mail:</strong> {session.user.email}</p>
        <p><strong>Telefone:</strong> {session.user.phone}</p>
        <div style={{ marginTop: '1rem' }}>
          <LoyaltyBadge points={session.user.points} />
        </div>
      </div>

      <div className={styles.card}>
        <h3 style={{ marginBottom: '0.75rem' }}>Privacidade (LGPD)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Consentimento: {consent.revoked ? 'Revogado' : consent.consentedAt ? formatDate(consent.consentedAt) : 'Não registrado'}
        </p>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => setShowLGPDModal(true)}>
            Ver termos e privacidade
          </Button>
          {!consent.revoked && consent.consentedAt && (
            <Button variant="danger" onClick={() => setShowRevokeModal(true)}>
              Revogar consentimento
            </Button>
          )}
        </div>
      </div>

      <Button variant="ghost" fullWidth onClick={logout}>
        Sair da conta
      </Button>

      <Modal
        isOpen={showRevokeModal}
        onClose={() => setShowRevokeModal(false)}
        title="Revogar consentimento"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowRevokeModal(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleRevoke}>Confirmar revogação</Button>
          </>
        }
      >
        <p>Tem certeza que deseja revogar o consentimento para armazenamento de dados? Esta ação é simulada para fins acadêmicos.</p>
      </Modal>

      <ModalLGPD
        isOpen={showLGPDModal}
        onClose={() => setShowLGPDModal(false)}
        required={false}
        onAccept={(data) => {
          saveConsent(data);
          setShowLGPDModal(false);
          showToast('Consentimento atualizado.', 'success');
        }}
      />
    </div>
  );
}
