import type { Unit } from '@/types';
import { Badge } from '@/components/ui/Badge';
import styles from './UnitCard.module.css';

interface UnitCardProps {
  unit: Unit;
  selected?: boolean;
  onSelect: (unit: Unit) => void;
}

export function UnitCard({ unit, selected, onSelect }: UnitCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ''} ${!unit.active ? styles.inactive : ''}`}
      onClick={() => unit.active && onSelect(unit)}
      disabled={!unit.active}
    >
      <span className={styles.emoji} aria-hidden="true">
        {unit.imageEmoji}
      </span>
      <div className={styles.info}>
        <h3>{unit.name}</h3>
        <p className={styles.address}>
          {unit.address} — {unit.neighborhood}, {unit.city}/{unit.state}
        </p>
        <p className={styles.meta}>
          {unit.openHours} · {unit.phone}
        </p>
        {!unit.active && (
          <div className={styles.badge}>
            <Badge variant="warning">Indisponível</Badge>
          </div>
        )}
      </div>
    </button>
  );
}
