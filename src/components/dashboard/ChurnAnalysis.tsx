import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChurnData {
  cohort: string;
  churn: number;
  retention: number;
}

interface ChurnAnalysisProps {
  data: ChurnData[];
}

export function ChurnAnalysis({ data }: ChurnAnalysisProps) {
  return (
    <div className="chart-container animate-fade-in-up" style={{ animationDelay: '700ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Churn Rate по когортам</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Отток</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Retention</span>
          </div>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsla(222, 47%, 25%, 0.3)"
              horizontal={false}
            />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="cohort"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 11%)',
                border: '1px solid hsla(222, 47%, 25%, 0.5)',
                borderRadius: '8px',
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === 'retention' ? 'Retention' : 'Churn'
              ]}
            />
            <Bar dataKey="retention" stackId="a" fill="hsl(160, 84%, 39%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="churn" stackId="a" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
        <p className="text-sm text-muted-foreground">
          <span className="text-warning font-medium">⚠️ Внимание:</span> Когорта Октября показывает churn на 
          <span className="text-destructive font-semibold"> 18% выше нормы</span>. Рекомендуется анализ качества лидов.
        </p>
      </div>
    </div>
  );
}
