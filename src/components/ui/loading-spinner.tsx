import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'white';
}

export function LoadingSpinner({ size = 'md', className, variant = 'default' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const mutedBorder = variant === 'white' ? 'border-white/30' : 'border-muted';
  const spinBorder = variant === 'white' ? 'border-white' : 'border-primary';
  const centerBg = variant === 'white' ? 'bg-white' : 'bg-primary';

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'relative rounded-full border-4',
          mutedBorder,
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full border-4 border-t-transparent animate-spin',
            spinBorder,
            sizeClasses[size]
          )}
          style={{ margin: '-4px' }}
        />
        {/* Pokeball center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("h-2 w-2 rounded-full", centerBg)} />
        </div>
      </div>
    </div>
  );
}
