import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface UnitMetric {
  label: string;
  value: string;
  subValue?: string;
  status: 'good' | 'warning' | 'bad';
  tooltip?: string;
}

interface UnitEconomicsProps {
  metrics: UnitMetric[];
}

const statusColors = {
  good: 'border-success/50 bg-success/10',
  warning: 'border-warning/50 bg-warning/10',
  bad: 'border-destructive/50 bg-destructive/10',
};

const statusDots = {
  good: 'bg-success',
  warning: 'bg-warning',
  bad: 'bg-destructive',
};

export function UnitEconomics({ metrics }: UnitEconomicsProps) {
  return (
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Юнит-экономика</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <TooltipProvider key={metric.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    'rounded-xl p-4 border transition-all duration-300 hover:scale-105 cursor-help relative group',
                    statusColors[metric.status]
                  )}
                >
                  {metric.tooltip && (
                    <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn('w-2 h-2 rounded-full', statusDots[metric.status])} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {metric.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  {metric.subValue && (
                    <p className="text-xs text-muted-foreground mt-1">{metric.subValue}</p>
                  )}
                </div>
              </TooltipTrigger>
              {metric.tooltip && (
                <TooltipContent className="max-w-xs">
                  <p>{metric.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
