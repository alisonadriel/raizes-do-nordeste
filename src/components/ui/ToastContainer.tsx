import { useToast } from '@/contexts/ToastContext';
import styles from './ToastContainer.module.css';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`} role="alert">
          <span>{toast.message}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => removeToast(toast.id)}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
