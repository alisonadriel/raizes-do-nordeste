import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import homeStyles from './HomePage.module.css';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={homeStyles.homeWrapper}>
      <section className={homeStyles.heroPanel}>
        <span className={homeStyles.tag}>Desde a feira</span>
        <h1 className={homeStyles.title}>
          Raízes
          <span className={homeStyles.titleAccent}>do Nordeste</span>
        </h1>
        <p className={homeStyles.subtitle}>
          Tapioca na hora, caldo de cana gelado e doce de panela. Peça pelo app e retire
          quente na unidade.
        </p>
      </section>

      <section className={homeStyles.contentPanel}>
        <div className={homeStyles.features}>
          <div className={homeStyles.feature}>
            <span className={homeStyles.featureNum}>01</span>
            Cardápio de boteco — sem firula
          </div>
          <div className={homeStyles.feature}>
            <span className={homeStyles.featureNum}>02</span>
            Pontos a cada real gasto
          </div>
          <div className={homeStyles.feature}>
            <span className={homeStyles.featureNum}>03</span>
            Promoções da semana
          </div>
        </div>

        <div className={homeStyles.actions}>
          {isAuthenticated ? (
            <>
              <Link to="/unidades">
                <Button fullWidth>Fazer pedido</Button>
              </Link>
              <Link to="/cardapio">
                <Button variant="outline" fullWidth>
                  Ver cardápio
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button fullWidth>Entrar</Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline" fullWidth>
                  Criar conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
