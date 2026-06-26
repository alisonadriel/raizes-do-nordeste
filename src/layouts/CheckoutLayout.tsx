import { Outlet } from 'react-router-dom';
import styles from './CheckoutLayout.module.css';

export function CheckoutLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          Pagamento via <strong>PayNordeste</strong>
        </h1>
        <p className={styles.secure}>
          <span className={styles.lock} aria-hidden="true" />
          Ambiente simulado
        </p>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
