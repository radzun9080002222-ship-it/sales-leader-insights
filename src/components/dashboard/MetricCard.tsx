import { LucideIcon, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  yearChange?: number;
  yearChangeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
  delay?: number;
  recommendation?: {
    type: 'warning' | 'success' | 'info';
    message: string;
  };
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

const recommendationIcons = {
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const recommendationStyles = {
  warning: 'bg-warning/20 border-warning/50 text-warning',
  success: 'bg-success/20 border-success/50 text-success',
  info: 'bg-info/20 border-info/50 text-info',
};

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  yearChange,
  yearChangeLabel,
  icon: Icon,
  variant = 'default',
  delay = 0,
  recommendation,
}: MetricCardProps) {
  const RecommendationIcon = recommendation ? recommendationIcons[recommendation.type] : null;

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
          
          <div className="flex flex-col items-end gap-1">
            {change !== undefined && (
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg',
                change >= 0 
                  ? 'bg-success/20 text-success' 
                  : 'bg-destructive/20 text-destructive'
              )}>
                <span>{change >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(change)}%</span>
                <span className="text-xs opacity-70">м/м</span>
              </div>
            )}
            {yearChange !== undefined && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-lg',
                yearChange >= 0 
                  ? 'bg-success/20 text-success' 
                  : 'bg-destructive/20 text-destructive'
              )}>
                <span>{yearChange >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(yearChange)}%</span>
                <span className="opacity-70">г/г</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        
        {(changeLabel || yearChangeLabel) && (
          <p className="text-muted-foreground text-xs mt-2">
            {changeLabel || yearChangeLabel}
          </p>
        )}

        {recommendation && RecommendationIcon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  'mt-3 flex items-center gap-2 px-2 py-1.5 rounded-lg border cursor-help',
                  recommendationStyles[recommendation.type]
                )}>
                  <RecommendationIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs font-medium truncate">{recommendation.message}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{recommendation.message}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
