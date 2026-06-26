import { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import styles from './ModalLGPD.module.css';

interface ModalLGPDProps {
  isOpen: boolean;
  onAccept: (consent: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
    dataStorageAccepted: boolean;
  }) => void;
  onClose?: () => void;
  required?: boolean;
}

export function ModalLGPD({ isOpen, onAccept, onClose, required = true }: ModalLGPDProps) {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [storage, setStorage] = useState(false);

  const canAccept = terms && privacy && storage;

  const handleAccept = () => {
    if (!canAccept) return;
    onAccept({
      termsAccepted: terms,
      privacyAccepted: privacy,
      dataStorageAccepted: storage,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={required ? () => {} : onClose || (() => {})}
      title="Privacidade e Termos (LGPD)"
      footer={
        <>
          {!required && onClose && (
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button onClick={handleAccept} disabled={!canAccept} fullWidth>
            Aceitar e continuar
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        <p>
          A Rede Raízes do Nordeste respeita sua privacidade. Para utilizar nossos serviços,
          precisamos do seu consentimento conforme a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h3>Termos de Uso</h3>
        <p>
          Ao utilizar este aplicativo, você concorda com nossos termos de serviço, incluindo
          regras de pedidos, cancelamentos e uso da plataforma.
        </p>

        <h3>Política de Privacidade</h3>
        <p>
          Coletamos dados como nome, e-mail, telefone e histórico de pedidos exclusivamente
          para processar seus pedidos e melhorar sua experiência. Seus dados não serão
          compartilhados com terceiros sem consentimento.
        </p>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>Li e aceito os Termos de Uso</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
          <span>Li e aceito a Política de Privacidade</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" checked={storage} onChange={(e) => setStorage(e.target.checked)} />
          <span>Autorizo o armazenamento dos meus dados para processamento de pedidos</span>
        </label>
      </div>
    </Modal>
  );
}
