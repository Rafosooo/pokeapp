import { TYPE_COLORS } from '@/lib/pokeapi';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export function TypeBadge({ type, size = 'md', className, showLabel = true }: TypeBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-black uppercase tracking-wide text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
        showLabel ? sizeClasses[size] : 'p-1 rounded-full aspect-square justify-center',
        className
      )}
      style={{
        backgroundColor: `hsl(var(--${TYPE_COLORS[type] || 'pokemon-normal'}))`,
      }}
      title={!showLabel ? type : undefined}
    >
      {showLabel && type}
    </span>
  );
}
