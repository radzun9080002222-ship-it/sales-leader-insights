import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RevenueData {
  month: string;
  revenue: number;
  plan: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const latestMonth = data[data.length - 1];
  const planCompletion = (latestMonth.revenue / latestMonth.plan) * 100;
  
  const getRecommendation = () => {
    if (planCompletion >= 100) {
      return {
        type: 'success' as const,
        icon: CheckCircle,
        message: 'План выполнен! Рассмотрите повышение плана на следующий месяц.',
      };
    } else if (planCompletion >= 85) {
      return {
        type: 'info' as const,
        icon: TrendingDown,
        message: `Выполнено ${planCompletion.toFixed(0)}% плана. Необходимо ${((latestMonth.plan - latestMonth.revenue) / 1000000).toFixed(1)} млн ₽ для выполнения.`,
      };
    } else {
      return {
        type: 'warning' as const,
        icon: AlertTriangle,
        message: `Отставание от плана ${(100 - planCompletion).toFixed(0)}%. Рекомендуется усилить работу с базой и активные продажи.`,
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
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Динамика выручки</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Факт</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">План</span>
          </div>
        </div>
      </div>
      
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsla(222, 47%, 25%, 0.3)" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}М`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 11%)',
                border: '1px solid hsla(222, 47%, 25%, 0.5)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${(value / 1000000).toFixed(2)} млн ₽`, '']}
              labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
            />
            <Area
              type="monotone"
              dataKey="plan"
              stroke="hsla(215, 20%, 55%, 0.5)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
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
