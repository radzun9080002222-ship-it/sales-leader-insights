import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface FunnelStep {
  label: string;
  value: number;
  conversion?: number;
}

interface SalesFunnelProps {
  steps: FunnelStep[];
}

export function SalesFunnel({ steps }: SalesFunnelProps) {
  const maxValue = Math.max(...steps.map(s => s.value));
  const overallConversion = ((steps[steps.length - 1].value / steps[0].value) * 100);
  
  // Determine recommendation based on funnel analysis
  const getRecommendation = () => {
    const worstStep = steps.reduce((worst, step, index) => {
      if (index === 0 || !step.conversion) return worst;
      if (!worst || (step.conversion && step.conversion < worst.conversion!)) {
        return step;
      }
      return worst;
    }, null as FunnelStep | null);

    if (overallConversion >= 20) {
      return {
        type: 'success' as const,
        icon: CheckCircle,
        message: 'Воронка работает эффективно. Конверсия выше целевых 20%.',
      };
    } else if (worstStep && worstStep.conversion && worstStep.conversion < 50) {
      return {
        type: 'warning' as const,
        icon: AlertTriangle,
        message: `Узкое место: "${worstStep.label}" — конверсия ${worstStep.conversion}%. Рекомендуется аудит этапа.`,
      };
    } else {
      return {
        type: 'info' as const,
        icon: Lightbulb,
        message: 'Рассмотрите A/B тесты на этапе записи на пробный урок для повышения конверсии.',
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
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Воронка продаж</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const widthPercent = (step.value / maxValue) * 100;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.label} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {step.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-foreground">
                    {step.value.toLocaleString('ru-RU')}
                  </span>
                  {step.conversion !== undefined && (
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      step.conversion >= 30 
                        ? 'bg-success/20 text-success'
                        : step.conversion >= 15 
                        ? 'bg-warning/20 text-warning'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {step.conversion}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="relative h-10 rounded-lg overflow-hidden bg-muted/30">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out',
                    index === 0 && 'bg-gradient-to-r from-info to-info/70',
                    index === 1 && 'bg-gradient-to-r from-primary to-primary/70',
                    index === 2 && 'bg-gradient-to-r from-warning to-warning/70',
                    index === 3 && 'bg-gradient-to-r from-success to-success/70',
                  )}
                  style={{ 
                    width: `${widthPercent}%`,
                    animationDelay: `${index * 150}ms`
                  }}
                />
                
                {!isLast && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                    →
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Общая конверсия</span>
          <span className="text-xl font-bold gradient-text">
            {overallConversion.toFixed(1)}%
          </span>
        </div>

        <div className={cn(
          'flex items-start gap-2 px-3 py-2.5 rounded-lg border',
          recommendationStyles[recommendation.type]
        )}>
          <RecommendationIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-xs font-medium leading-relaxed">{recommendation.message}</span>
        </div>
      </div>
    </div>
  );
}
