import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function Rating({
  value,
  count,
  size = 14,
  showValue = false,
  className,
}: RatingProps) {
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="img"
      aria-label={`Rated ${value} out of 5${count ? ` from ${count} reviews` : ''}`}
    >
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={filled ? 'fill-brand-pink text-brand-pink' : 'text-brand-grayMid'}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs text-brand-graySlate font-body">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-brand-graySlate font-body">({count})</span>
      )}
    </div>
  );
}
