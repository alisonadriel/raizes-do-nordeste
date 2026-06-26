import type { Category } from '@/types';
import styles from './Categoria.module.css';

interface CategoriaProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export function Categoria({ categories, selected, onSelect }: CategoriaProps) {
  return (
    <div className={styles.list} role="tablist" aria-label="Categorias">
      <button
        type="button"
        role="tab"
        aria-selected={selected === null}
        className={`${styles.chip} ${selected === null ? styles.active : ''}`}
        onClick={() => onSelect(null)}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={selected === cat.id}
          className={`${styles.chip} ${selected === cat.id ? styles.active : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className={styles.icon} aria-hidden="true">
            {cat.icon}
          </span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
