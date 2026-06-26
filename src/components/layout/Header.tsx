import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
}

export function Header({ title, subtitle, backTo, backLabel = 'Voltar' }: HeaderProps) {
  return (
    <header className={styles.header}>
      {backTo && (
        <Link to={backTo} className={styles.back}>
          ← {backLabel}
        </Link>
      )}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
