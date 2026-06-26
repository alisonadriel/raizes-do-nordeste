import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { DEMO_CREDENTIALS } from '@/data/users';
import { AppError } from '@/services/api';
import styles from './pages.module.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      showToast('Login realizado com sucesso!', 'success');
      navigate('/unidades');
    } catch (err) {
      const msg = err instanceof AppError ? err.message : 'Erro ao fazer login.';
      setError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem' }}>Entrar</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          Não tem conta? <Link to="/cadastro" className={styles.link}>Cadastre-se</Link>
        </p>
      </div>
      <p className={styles.hint}>
        Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
      </p>
    </div>
  );
}
