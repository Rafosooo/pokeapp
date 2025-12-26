import { Link } from 'react-router-dom';
import { formatPokemonName, getPokemonImageUrl, TYPE_COLORS } from '@/lib/pokeapi';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  id: number;
  name: string;
  types?: string[];
}

export function PokemonCard({ id, name, types = [] }: PokemonCardProps) {
  const primaryType = types[0] || 'normal';
  const typeColor = TYPE_COLORS[primaryType] || 'pokemon-normal';

  return (
    <Link to={`/pokemon/${id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
        {/* Background gradient based on type */}
        <div
          className={cn(
            'absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20',
            `bg-${typeColor}`
          )}
          style={{
            background: `radial-gradient(circle at top right, hsl(var(--${typeColor.replace('pokemon-', 'pokemon-')})) 0%, transparent 70%)`,
          }}
        />

        {/* Pokemon ID */}
        <span className="absolute top-3 right-3 text-sm font-mono text-muted-foreground">
          #{id.toString().padStart(3, '0')}
        </span>

        {/* Pokemon Image */}
        <div className="relative mx-auto mb-3 h-24 w-24 sm:h-32 sm:w-32">
          <img
            src={getPokemonImageUrl(id)}
            alt={name}
            className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Pokemon Name */}
        <h3 className="mb-2 text-center font-semibold text-foreground">
          {formatPokemonName(name)}
        </h3>

        {/* Types */}
        {types.length > 0 && (
          <div className="flex justify-center gap-2">
            {types.map((type) => (
              <span
                key={type}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium capitalize',
                  `bg-${TYPE_COLORS[type] || 'pokemon-normal'}`,
                  'text-primary-foreground'
                )}
                style={{
                  backgroundColor: `hsl(var(--${TYPE_COLORS[type]?.replace('pokemon-', 'pokemon-') || 'pokemon-normal'}))`,
                }}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
