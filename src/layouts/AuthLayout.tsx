import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.logo}>
        <h1>Raízes</h1>
        <p>do nordeste</p>
      </div>
      <main className={styles.main}>
        <div className={styles.cardWrap}>
          <div className={styles.cardInner}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
