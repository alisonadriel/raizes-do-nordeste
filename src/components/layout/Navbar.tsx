import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { summary } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : '';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.stripe} aria-hidden="true" />
        <div className={styles.top}>
          <Link to="/cardapio" className={styles.logo}>
            Raízes
            <small>do nordeste</small>
          </Link>
          <div className={styles.actions}>
            <Link to="/carrinho" className={styles.cartLink} aria-label="Carrinho">
              <span className={styles.cartIcon} />
              {summary.itemCount > 0 && (
                <span className={styles.cartBadge}>{summary.itemCount}</span>
              )}
            </Link>
            <button type="button" className={styles.logout} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
        <nav className={styles.desktopNav}>
          <NavLink to="/cardapio" className={navClass}>Cardápio</NavLink>
          <NavLink to="/promocoes" className={navClass}>Promoções</NavLink>
          <NavLink to="/fidelidade" className={navClass}>Fidelidade</NavLink>
          <NavLink to="/historico" className={navClass}>Histórico</NavLink>
          <NavLink to="/perfil" className={navClass}>Perfil</NavLink>
        </nav>
      </header>

      <nav className={styles.bottomNav} aria-label="Navegação principal">
        <NavLink to="/cardapio" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.navDot} />
          Cardápio
        </NavLink>
        <NavLink to="/carrinho" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.navDot} />
          Carrinho
        </NavLink>
        <NavLink to="/historico" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.navDot} />
          Pedidos
        </NavLink>
        <NavLink to="/perfil" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.navDot} />
          Perfil
        </NavLink>
      </nav>
    </>
  );
}
