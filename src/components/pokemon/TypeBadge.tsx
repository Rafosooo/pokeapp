import { TYPE_COLORS } from '@/lib/pokeapi';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium capitalize text-primary-foreground shadow-sm',
        sizeClasses[size]
      )}
      style={{
        backgroundColor: `hsl(var(--${TYPE_COLORS[type] || 'pokemon-normal'}))`,
      }}
    >
      {type}
    </span>
  );
}
