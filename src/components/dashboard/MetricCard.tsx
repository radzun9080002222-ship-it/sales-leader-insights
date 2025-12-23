import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
  delay?: number;
}

const variantStyles = {
  default: 'from-primary/20 to-primary/5',
  success: 'from-success/20 to-success/5',
  warning: 'from-warning/20 to-warning/5',
  info: 'from-info/20 to-info/5',
};

const iconStyles = {
  default: 'bg-primary/20 text-primary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  info: 'bg-info/20 text-info',
};

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = 'default',
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'metric-card opacity-0 animate-fade-in-up',
        `delay-${delay}`
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50 rounded-xl',
        variantStyles[variant]
      )} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'p-3 rounded-xl',
            iconStyles[variant]
          )}>
            <Icon className="w-5 h-5" />
          </div>
          
          {change !== undefined && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg',
              change >= 0 
                ? 'bg-success/20 text-success' 
                : 'bg-destructive/20 text-destructive'
            )}>
              <span>{change >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        
        {changeLabel && (
          <p className="text-muted-foreground text-xs mt-2">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}
