import styles from './Loading.module.css';

interface LoadingProps {
  text?: string;
  size?: 'md' | 'lg';
  fullScreen?: boolean;
}

export function Loading({ text = 'Carregando...', size = 'md', fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`${styles.container} ${size === 'lg' ? styles.lg : ''} ${fullScreen ? styles.fullscreen : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
