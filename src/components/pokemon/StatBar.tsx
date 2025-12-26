import { cn } from '@/lib/utils';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidade',
};

const STAT_COLORS: Record<string, string> = {
  hp: 'bg-pokemon-grass',
  attack: 'bg-pokemon-fire',
  defense: 'bg-pokemon-water',
  'special-attack': 'bg-pokemon-psychic',
  'special-defense': 'bg-pokemon-dragon',
  speed: 'bg-pokemon-electric',
};

export function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm font-medium text-muted-foreground">
        {STAT_LABELS[name] || name}
      </span>
      <span className="w-10 text-right text-sm font-bold text-foreground">
        {value}
      </span>
      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            STAT_COLORS[name] || 'bg-primary'
          )}
          style={{
            width: `${percentage}%`,
            backgroundColor: STAT_COLORS[name] 
              ? `hsl(var(--${STAT_COLORS[name].replace('bg-', '')}))` 
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
