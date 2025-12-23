import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Manager {
  id: string;
  name: string;
  avatar: string;
  leads: number;
  conversions: number;
  revenue: number;
  avgCheck: number;
  trend: 'up' | 'down' | 'stable';
}

interface ManagersTableProps {
  managers: Manager[];
}

export function ManagersTable({ managers }: ManagersTableProps) {
  return (
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Эффективность менеджеров</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          Декабрь 2024
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Менеджер
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Лиды
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Конверсия
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Выручка
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Ср. чек
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Тренд
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {managers.map((manager, index) => (
              <tr 
                key={manager.id}
                className="group hover:bg-muted/30 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-sm font-semibold text-foreground">
                      {manager.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{manager.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {manager.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="font-semibold text-foreground">{manager.leads}</span>
                </td>
                <td className="py-4 text-center">
                  <span className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    manager.conversions >= 25 
                      ? 'bg-success/20 text-success'
                      : manager.conversions >= 18
                      ? 'bg-warning/20 text-warning'
                      : 'bg-destructive/20 text-destructive'
                  )}>
                    {manager.conversions}%
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className="font-semibold text-foreground">
                    {manager.revenue.toLocaleString('ru-RU')} ₽
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className="text-muted-foreground">
                    {manager.avgCheck.toLocaleString('ru-RU')} ₽
                  </span>
                </td>
                <td className="py-4 text-center">
                  {manager.trend === 'up' && (
                    <TrendingUp className="w-5 h-5 text-success mx-auto" />
                  )}
                  {manager.trend === 'down' && (
                    <TrendingDown className="w-5 h-5 text-destructive mx-auto" />
                  )}
                  {manager.trend === 'stable' && (
                    <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
