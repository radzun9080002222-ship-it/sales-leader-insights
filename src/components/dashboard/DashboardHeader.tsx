import { Calendar, RefreshCw, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <header className="mb-8 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground font-bold text-lg">
              РД
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Дашборд отдела продаж
              </h1>
              <p className="text-sm text-muted-foreground">
                Радзун Дмитрий Андреевич • Руководитель отдела продаж
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border/50">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Декабрь 2024</span>
          </div>
          
          <Button variant="outline" size="icon" className="border-border/50 hover:bg-muted">
            <RefreshCw className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="border-border/50 hover:bg-muted">
            <Download className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="border-border/50 hover:bg-muted">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground">Данные обновлены</span>
          <span className="text-foreground font-medium">5 минут назад</span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">План месяца:</span>
          <span className="text-primary font-semibold">87% выполнен</span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Активных менеджеров:</span>
          <span className="text-foreground font-medium">12</span>
        </div>
      </div>
    </header>
  );
}
