import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnitCard } from '@/components/domain/UnitCard';
import { Header } from '@/components/layout/Header';
import { Button, Loading } from '@/components/ui';
import { useUnit } from '@/contexts/UnitContext';
import { useToast } from '@/contexts/ToastContext';
import type { Unit } from '@/types';
import { productService } from '@/services/productService';
import { AppError } from '@/services/api';
import styles from './pages.module.css';

export function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selected, setSelected] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUnit } = useUnit();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    productService
      .getAllUnits()
      .then(setUnits)
      .catch((err) => {
        if (err instanceof AppError && err.code === 'NETWORK') {
          navigate('/erro');
        } else {
          showToast('Erro ao carregar unidades.', 'error');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate, showToast]);

  const handleConfirm = () => {
    if (!selected) return;
    setUnit(selected);
    showToast(`Unidade ${selected.name} selecionada!`, 'success');
    navigate('/cardapio');
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className={styles.page}>
      <Header title="Escolha a unidade" subtitle="Selecione onde deseja retirar seu pedido" />
      <div className={styles.grid}>
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            selected={selected?.id === unit.id}
            onSelect={setSelected}
          />
        ))}
      </div>
      <Button fullWidth disabled={!selected} onClick={handleConfirm}>
        Continuar para o cardápio
      </Button>
    </div>
  );
}
