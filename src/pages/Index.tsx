import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesFunnel } from '@/components/dashboard/SalesFunnel';
import { ManagersTable } from '@/components/dashboard/ManagersTable';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { UnitEconomics } from '@/components/dashboard/UnitEconomics';
import { LeadSources } from '@/components/dashboard/LeadSources';
import { ChurnAnalysis } from '@/components/dashboard/ChurnAnalysis';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Repeat,
  Target,
  CreditCard,
  UserCheck,
  BarChart3
} from 'lucide-react';

// Mock data
const funnelSteps = [
  { label: 'Лиды получено', value: 4250, conversion: undefined },
  { label: 'Записаны на пробный урок', value: 2340, conversion: 55 },
  { label: 'Дошли до урока', value: 1872, conversion: 80 },
  { label: 'Первая оплата', value: 842, conversion: 45 },
];

const managers = [
  { id: 'M001', name: 'Анна Смирнова', avatar: 'АС', leads: 312, conversions: 28, revenue: 1_240_000, avgCheck: 14_200, trend: 'up' as const },
  { id: 'M002', name: 'Дмитрий Козлов', avatar: 'ДК', leads: 287, conversions: 24, revenue: 980_000, avgCheck: 13_800, trend: 'up' as const },
  { id: 'M003', name: 'Елена Петрова', avatar: 'ЕП', leads: 298, conversions: 22, revenue: 920_000, avgCheck: 14_500, trend: 'stable' as const },
  { id: 'M004', name: 'Максим Иванов', avatar: 'МИ', leads: 256, conversions: 19, revenue: 780_000, avgCheck: 12_900, trend: 'down' as const },
  { id: 'M005', name: 'Ольга Новикова', avatar: 'ОН', leads: 234, conversions: 26, revenue: 1_050_000, avgCheck: 15_100, trend: 'up' as const },
];

const revenueData = [
  { month: 'Июл', revenue: 8_200_000, plan: 8_000_000 },
  { month: 'Авг', revenue: 7_800_000, plan: 8_500_000 },
  { month: 'Сен', revenue: 9_100_000, plan: 9_000_000 },
  { month: 'Окт', revenue: 10_500_000, plan: 10_000_000 },
  { month: 'Ноя', revenue: 11_200_000, plan: 11_000_000 },
  { month: 'Дек', revenue: 9_600_000, plan: 11_000_000 },
];

const unitMetrics = [
  { label: 'LTV', value: '45 200 ₽', subValue: 'Средний за 6 месяцев', status: 'good' as const },
  { label: 'CAC', value: '8 400 ₽', subValue: 'Стоимость привлечения', status: 'good' as const },
  { label: 'LTV/CAC', value: '5.4x', subValue: 'Целевой: > 3x', status: 'good' as const },
  { label: 'ARPPU', value: '12 800 ₽', subValue: 'Доход с платящего', status: 'good' as const },
  { label: 'Payback', value: '2.1 мес', subValue: 'Окупаемость CAC', status: 'warning' as const },
  { label: 'Маржа', value: '62%', subValue: 'Валовая маржа', status: 'good' as const },
];

const leadSources = [
  { name: 'Performance-маркетинг', value: 1850, color: 'hsl(217, 91%, 60%)', conversion: 22 },
  { name: 'Органика', value: 980, color: 'hsl(160, 84%, 39%)', conversion: 28 },
  { name: 'Рефералы', value: 620, color: 'hsl(38, 92%, 50%)', conversion: 35 },
  { name: 'Партнёры', value: 450, color: 'hsl(280, 70%, 55%)', conversion: 18 },
  { name: 'Ретаргетинг', value: 350, color: 'hsl(340, 80%, 55%)', conversion: 31 },
];

const churnData = [
  { cohort: 'Август', churn: 12, retention: 88 },
  { cohort: 'Сентябрь', churn: 15, retention: 85 },
  { cohort: 'Октябрь', churn: 28, retention: 72 },
  { cohort: 'Ноябрь', churn: 14, retention: 86 },
  { cohort: 'Декабрь', churn: 11, retention: 89 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        
        <QuickStats />
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Выручка (первые оплаты)"
            value="9.6 млн ₽"
            change={-12}
            changeLabel="vs прошлый месяц"
            icon={DollarSign}
            variant="warning"
            delay={100}
          />
          <MetricCard
            title="Новых учеников"
            value="842"
            change={8}
            changeLabel="vs прошлый месяц"
            icon={Users}
            variant="success"
            delay={200}
          />
          <MetricCard
            title="Средний чек"
            value="11 400 ₽"
            change={-3}
            changeLabel="vs прошлый месяц"
            icon={CreditCard}
            variant="default"
            delay={300}
          />
          <MetricCard
            title="Повторные продажи"
            value="234"
            change={15}
            changeLabel="upsale + кросс-продажи"
            icon={Repeat}
            variant="success"
            delay={400}
          />
        </div>
        
        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesFunnel steps={funnelSteps} />
          <RevenueChart data={revenueData} />
        </div>
        
        {/* Managers Table */}
        <div className="mb-8">
          <ManagersTable managers={managers} />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <UnitEconomics metrics={unitMetrics} />
          <LeadSources sources={leadSources} />
          <ChurnAnalysis data={churnData} />
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Тестовое задание для Kodland • Радзун Дмитрий Андреевич
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                Источники данных: amoCRM, Power BI, Google Analytics
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
