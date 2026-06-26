import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { AppError } from '@/services/api';
import styles from './pages.module.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password, phone, acceptTerms });
      showToast('Cadastro realizado com sucesso!', 'success');
      navigate('/unidades');
    } catch (err) {
      const msg = err instanceof AppError ? err.message : 'Erro ao cadastrar.';
      setError(msg);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem' }}>Criar conta</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Telefone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required hint="(81) 99999-0000" />
          <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required hint="Mínimo 6 caracteres" />
          <label className={styles.checkbox}>
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
            <span>
              Li e aceito os{' '}
              <Link to="/perfil" className={styles.link}>termos de uso e política de privacidade (LGPD)</Link>
            </span>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          Já tem conta? <Link to="/login" className={styles.link}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
