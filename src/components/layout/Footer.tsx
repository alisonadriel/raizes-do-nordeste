import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <div>
            <p className={styles.logo}>
              Raízes <span>Nordeste</span>
            </p>
            <p className={styles.text}>
              Lanchonete de raiz. Tapioca na chapa, caldo de cana e história em cada prato.
            </p>
          </div>
          <div className={styles.links}>
            <Link to="/promocoes">Promoções</Link>
            <Link to="/fidelidade">Fidelidade</Link>
            <Link to="/perfil">Privacidade</Link>
          </div>
        </div>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Rede Raízes do Nordeste — projeto acadêmico
        </p>
      </div>
    </footer>
  );
}
