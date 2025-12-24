import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ManagerFunnel {
  newLeads: number;
  responded: number;
  dialogEstablished: number;
  offerMade: number;
  paid: number;
}

interface ManagerAlert {
  type: 'lrt' | 'conversion' | 'missed';
  message: string;
}

interface Manager {
  id: string;
  name: string;
  avatar: string;
  funnel: ManagerFunnel;
  alert?: ManagerAlert;
}

interface ManagersTableProps {
  managers: Manager[];
}

function calcPercent(current: number, previous: number): string {
  if (previous === 0) return '0%';
  return `${((current / previous) * 100).toFixed(0)}%`;
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
                Новые лиды
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Ответ
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Диалог
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Предложение
              </th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Оплата
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {managers.filter(m => m.funnel).map((manager) => (
              <tr 
                key={manager.id}
                className="group hover:bg-muted/30 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-sm font-semibold text-foreground">
                      {manager.avatar}
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">{manager.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {manager.id}</p>
                      </div>
                      {manager.alert && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-warning/20 cursor-help">
                                <AlertTriangle className="w-3 h-3 text-warning" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="font-medium text-warning">{manager.alert.message}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="font-semibold text-foreground">{manager.funnel.newLeads}</span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-foreground">{manager.funnel.responded}</span>
                    <span className={cn(
                      'text-xs px-1.5 py-0.5 rounded',
                      parseInt(calcPercent(manager.funnel.responded, manager.funnel.newLeads)) >= 90
                        ? 'text-success'
                        : parseInt(calcPercent(manager.funnel.responded, manager.funnel.newLeads)) >= 80
                        ? 'text-warning'
                        : 'text-destructive'
                    )}>
                      ({calcPercent(manager.funnel.responded, manager.funnel.newLeads)})
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-foreground">{manager.funnel.dialogEstablished}</span>
                    <span className="text-xs text-muted-foreground">
                      ({calcPercent(manager.funnel.dialogEstablished, manager.funnel.responded)})
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-foreground">{manager.funnel.offerMade}</span>
                    <span className="text-xs text-muted-foreground">
                      ({calcPercent(manager.funnel.offerMade, manager.funnel.dialogEstablished)})
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      parseInt(calcPercent(manager.funnel.paid, manager.funnel.offerMade)) >= 50
                        ? 'bg-success/20 text-success'
                        : parseInt(calcPercent(manager.funnel.paid, manager.funnel.offerMade)) >= 35
                        ? 'bg-warning/20 text-warning'
                        : 'bg-destructive/20 text-destructive'
                    )}>
                      {manager.funnel.paid}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({calcPercent(manager.funnel.paid, manager.funnel.offerMade)})
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
