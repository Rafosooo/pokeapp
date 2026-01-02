import { Link } from 'react-router-dom';
import { formatPokemonName, getPokemonImageUrl, TYPE_COLORS } from '@/lib/pokeapi';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/use-favorites';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PokemonCardProps {
  id: number;
  name: string;
  types?: string[];
}

export function PokemonCard({ id, name, types = [] }: PokemonCardProps) {
  const primaryType = types[0] || 'normal';
  const typeColor = TYPE_COLORS[primaryType] || 'pokemon-normal';
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({ id, name, types });
  };

  return (
    <Link to={`/pokemon/${id}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-white border-4 border-black p-4 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2">
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

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white border-2 border-black shadow-sm"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={cn('h-4 w-4 transition-colors', isFav ? 'fill-red-600 text-red-600' : 'text-black')}
          />
        </Button>

        {/* Pokemon ID */}
        <span className="absolute top-3 right-3 text-xs font-black text-black/40">
          #{id.toString().padStart(3, '0')}
        </span>

        {/* Pokemon Image */}
        <div className="relative mx-auto mb-4 h-24 w-24 sm:h-32 sm:w-32">
          <img
            src={getPokemonImageUrl(id)}
            alt={name}
            className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Pokemon Name */}
        <h3 className="mb-3 text-center text-lg font-black text-black uppercase tracking-tight">
          {formatPokemonName(name)}
        </h3>

        {/* Types */}
        {types.length > 0 && (
          <div className="flex justify-center gap-2">
            {types.map((type) => (
              <span
                key={type}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold capitalize border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
                  `bg-${TYPE_COLORS[type] || 'pokemon-normal'}`,
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
