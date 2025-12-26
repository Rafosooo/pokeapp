import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'relative rounded-full border-4 border-muted',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin',
            sizeClasses[size]
          )}
          style={{ margin: '-4px' }}
        />
        {/* Pokeball center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
