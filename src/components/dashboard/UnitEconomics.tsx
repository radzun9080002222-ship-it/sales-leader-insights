import { cn } from '@/lib/utils';

interface UnitMetric {
  label: string;
  value: string;
  subValue?: string;
  status: 'good' | 'warning' | 'bad';
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
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              'rounded-xl p-4 border transition-all duration-300 hover:scale-105',
              statusColors[metric.status]
            )}
          >
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
        ))}
      </div>
    </div>
  );
}
