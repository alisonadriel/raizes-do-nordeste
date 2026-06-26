import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import styles from './ErrorPage.module.css';

export function ErrorPage() {
  return (
    <div className={styles.error}>
      <span className={styles.code} aria-hidden="true">!</span>
      <h1>Erro de conexão</h1>
      <p>Não foi possível conectar. Simulação acadêmica — tente novamente em instantes.</p>
      <div className={styles.actions}>
        <Link to="/cardapio"><Button>Tentar novamente</Button></Link>
        <Link to="/"><Button variant="outline">Voltar ao início</Button></Link>
      </div>
      <p className={styles.hint}>
        Remova <code>?simulateError=true</code> da URL para voltar ao normal.
      </p>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className={styles.error}>
      <span className={styles.code} aria-hidden="true">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe neste cardápio.</p>
      <Link to="/"><Button>Voltar ao início</Button></Link>
    </div>
  );
}
