import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadSource {
  name: string;
  value: number;
  color: string;
  conversion: number;
}

interface LeadSourcesProps {
  sources: LeadSource[];
}

export function LeadSources({ sources }: LeadSourcesProps) {
  const total = sources.reduce((acc, s) => acc + s.value, 0);
  
  const getRecommendation = () => {
    const bestSource = sources.reduce((best, s) => 
      s.conversion > best.conversion ? s : best
    );
    const worstSource = sources.reduce((worst, s) => 
      s.conversion < worst.conversion ? s : worst
    );
    
    if (worstSource.conversion < 20 && (worstSource.value / total) > 0.2) {
      return {
        type: 'warning' as const,
        icon: AlertTriangle,
        message: `Низкая конверсия ${worstSource.name} (${worstSource.conversion}%) при высокой доле лидов. Пересмотрите канал.`,
      };
    } else if (bestSource.conversion >= 30) {
      return {
        type: 'success' as const,
        icon: CheckCircle,
        message: `${bestSource.name} — лучший канал с конверсией ${bestSource.conversion}%. Рассмотрите масштабирование.`,
      };
    } else {
      return {
        type: 'info' as const,
        icon: Lightbulb,
        message: 'Рефералы показывают лучшую конверсию. Рассмотрите программу лояльности.',
      };
    }
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  const recommendationStyles = {
    warning: 'bg-warning/20 border-warning/50 text-warning',
    success: 'bg-success/20 border-success/50 text-success',
    info: 'bg-info/20 border-info/50 text-info',
  };

  return (
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Источники лидов</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sources}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {sources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 11%)',
                  border: '1px solid hsla(222, 47%, 25%, 0.5)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value} лидов`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-3 w-full">
          {sources.map((source) => (
            <div
              key={source.name}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm font-medium text-foreground">
                  {source.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {((source.value / total) * 100).toFixed(0)}%
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                  CR: {source.conversion}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(
        'mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg border',
        recommendationStyles[recommendation.type]
      )}>
        <RecommendationIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span className="text-xs font-medium leading-relaxed">{recommendation.message}</span>
      </div>
    </div>
  );
}
