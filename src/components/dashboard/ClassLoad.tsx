import { BookOpen, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ClassData {
  name: string;
  sold: number;
  capacity: number;
}

interface ClassLoadProps {
  classes: ClassData[];
}

export function ClassLoad({ classes }: ClassLoadProps) {
  const totalSold = classes.reduce((acc, c) => acc + c.sold, 0);
  const totalCapacity = classes.reduce((acc, c) => acc + c.capacity, 0);
  const overallLoad = Math.round((totalSold / totalCapacity) * 100);
  
  const getLoadColor = (load: number) => {
    if (load >= 90) return 'bg-success';
    if (load >= 70) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const getLoadTextColor = (load: number) => {
    if (load >= 90) return 'text-success';
    if (load >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const lowLoadClasses = classes.filter(c => (c.sold / c.capacity) * 100 < 70);
  const highLoadClasses = classes.filter(c => (c.sold / c.capacity) * 100 >= 90);

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-elegant animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Продажи по курсам</h3>
            <p className="text-sm text-muted-foreground">Загрузка классов в этом месяце</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getLoadTextColor(overallLoad)}`}>
            {overallLoad}%
          </div>
          <div className="text-xs text-muted-foreground">общая загрузка</div>
        </div>
      </div>

      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {classes.map((classItem) => {
          const load = Math.round((classItem.sold / classItem.capacity) * 100);
          const available = classItem.capacity - classItem.sold;
          
          return (
            <div key={classItem.name} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{classItem.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {classItem.sold}/{classItem.capacity}
                  </span>
                  <span className={`text-xs font-semibold ${getLoadTextColor(load)}`}>
                    {load}%
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getLoadColor(load)}`}
                  style={{ width: `${load}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Можно добрать: <span className="font-medium text-foreground">{available} мест</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-recommendation */}
      <div className="mt-5 pt-4 border-t border-border/50">
        {lowLoadClasses.length > 0 ? (
          <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Низкая загрузка</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Курсы с загрузкой &lt;70%: {lowLoadClasses.map(c => c.name).join(', ')}. 
                Рекомендуем запустить акцию или усилить рекламу.
              </p>
            </div>
          </div>
        ) : highLoadClasses.length === classes.length ? (
          <div className="flex items-start gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success">Все курсы заполнены</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Отличный результат! Рассмотрите открытие дополнительных групп.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 bg-info/10 rounded-lg border border-info/20">
            <TrendingUp className="w-4 h-4 text-info shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-info">Хорошая динамика</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {highLoadClasses.length} из {classes.length} курсов заполнены на 90%+. 
                Осталось добрать {totalCapacity - totalSold} мест.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
