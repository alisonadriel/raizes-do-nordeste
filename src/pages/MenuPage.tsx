import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProduto } from '@/components/domain/CardProduto';
import { Categoria } from '@/components/domain/Categoria';
import { SearchBar } from '@/components/domain/SearchBar';
import { Header } from '@/components/layout/Header';
import { Loading } from '@/components/ui';
import { useUnit } from '@/contexts/UnitContext';
import { useDebounce } from '@/hooks/useDebounce';
import type { Category, Product } from '@/types';
import { productService } from '@/services/productService';
import { AppError } from '@/services/api';
import styles from './pages.module.css';

export function MenuPage() {
  const { unit } = useUnit();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (!unit) {
      navigate('/unidades');
      return;
    }

    Promise.all([
      productService.getProductsByUnit(unit.id),
      productService.getCategories(),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch((err) => {
        if (err instanceof AppError && err.code === 'NETWORK') navigate('/erro');
      })
      .finally(() => setLoading(false));
  }, [unit, navigate]);

  const filtered = productService.filterByCategory(
    productService.searchProducts(products, debouncedSearch),
    categoryId,
  );

  if (loading) return <Loading fullScreen />;
  if (!unit) return null;

  return (
    <div className={styles.page}>
      <Header
        title="Cardápio"
        subtitle={`${unit.name} · ${unit.neighborhood}`}
        backTo="/unidades"
        backLabel="Trocar unidade"
      />
      <SearchBar value={search} onChange={setSearch} />
      <Categoria categories={categories} selected={categoryId} onSelect={setCategoryId} />
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className={styles.productGrid}>
          {filtered.map((product) => (
            <CardProduto key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
