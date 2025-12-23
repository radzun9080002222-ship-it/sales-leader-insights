import { Clock, Phone, MessageSquare, Target } from 'lucide-react';

interface QuickStat {
  icon: typeof Clock;
  label: string;
  value: string;
  target?: string;
  status: 'good' | 'warning' | 'bad';
}

const stats: QuickStat[] = [
  {
    icon: Clock,
    label: 'Среднее время ответа (LRT)',
    value: '2 мин 34 сек',
    target: 'Цель: < 3 мин',
    status: 'good',
  },
  {
    icon: Phone,
    label: 'Дозвонов сегодня',
    value: '847',
    target: '+12% к вчера',
    status: 'good',
  },
  {
    icon: MessageSquare,
    label: 'Записей на пробный урок',
    value: '156',
    target: '92% от плана',
    status: 'warning',
  },
  {
    icon: Target,
    label: 'Конверсия в оплату',
    value: '23.4%',
    target: '+2.1% к прошлому месяцу',
    status: 'good',
  },
];

const statusStyles = {
  good: 'text-success',
  warning: 'text-warning',
  bad: 'text-destructive',
};

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card rounded-xl p-4 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-muted/50">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
          
          <p className={`text-2xl font-bold ${statusStyles[stat.status]}`}>
            {stat.value}
          </p>
          
          {stat.target && (
            <p className="text-xs text-muted-foreground mt-1">{stat.target}</p>
          )}
        </div>
      ))}
    </div>
  );
}
