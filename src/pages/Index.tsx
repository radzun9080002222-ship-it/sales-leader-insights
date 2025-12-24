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
  TrendingUp, 
  Repeat,
  Target,
  CreditCard,
  Wallet
} from 'lucide-react';

// Mock data
const funnelSteps = [
  { label: 'Лиды получено', value: 4250, conversion: undefined },
  { label: 'Записаны на пробный урок', value: 2340, conversion: 55 },
  { label: 'Дошли до урока', value: 1872, conversion: 80 },
  { label: 'Первая оплата', value: 842, conversion: 45 },
];

const managers = [
  { 
    id: 'M001', 
    name: 'Анна Смирнова', 
    avatar: 'АС', 
    funnel: { newLeads: 312, responded: 305, dialogEstablished: 280, offerMade: 145, paid: 87 },
    alert: { type: 'lrt' as const, message: 'Высокий LRT: среднее время ответа 12 минут (норма <5 мин)' }
  },
  { 
    id: 'M002', 
    name: 'Дмитрий Козлов', 
    avatar: 'ДК', 
    funnel: { newLeads: 287, responded: 280, dialogEstablished: 245, offerMade: 156, paid: 69 },
    alert: { type: 'conversion' as const, message: 'Низкая конверсия в оплату: 44% (при норме 55%+)' }
  },
  { 
    id: 'M003', 
    name: 'Елена Петрова', 
    avatar: 'ЕП', 
    funnel: { newLeads: 298, responded: 268, dialogEstablished: 232, offerMade: 128, paid: 66 },
    alert: { type: 'missed' as const, message: 'Пропущено 10% лидов без ответа (30 из 298)' }
  },
  { 
    id: 'M004', 
    name: 'Максим Иванов', 
    avatar: 'МИ', 
    funnel: { newLeads: 256, responded: 251, dialogEstablished: 218, offerMade: 112, paid: 49 }
  },
  { 
    id: 'M005', 
    name: 'Ольга Новикова', 
    avatar: 'ОН', 
    funnel: { newLeads: 234, responded: 230, dialogEstablished: 205, offerMade: 135, paid: 81 }
  },
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
  { 
    label: 'LTV', 
    value: '45 200 ₽', 
    subValue: 'Средний за 6 месяцев', 
    status: 'good' as const,
    tooltip: 'LTV выше целевого (40 000 ₽). Клиенты остаются дольше благодаря качеству продукта. Рассмотрите повышение среднего чека.'
  },
  { 
    label: 'CAC', 
    value: '8 400 ₽', 
    subValue: 'Стоимость привлечения', 
    status: 'good' as const,
    tooltip: 'CAC в пределах нормы. Следите за сезонными колебаниями — летом обычно растёт на 15-20%.'
  },
  { 
    label: 'LTV/CAC', 
    value: '5.4x', 
    subValue: 'Целевой: > 3x', 
    status: 'good' as const,
    tooltip: 'Отличное соотношение! Можно инвестировать больше в маркетинг — есть запас до 3x.'
  },
  { 
    label: 'ARPPU', 
    value: '12 800 ₽', 
    subValue: 'Доход с платящего', 
    status: 'good' as const,
    tooltip: 'Рассмотрите upsale дополнительных курсов для повышения ARPPU до 15 000 ₽.'
  },
  { 
    label: 'Payback', 
    value: '2.1 мес', 
    subValue: 'Окупаемость CAC', 
    status: 'warning' as const,
    tooltip: 'Окупаемость растёт. Внимание: при росте выше 3 мес. возникнут проблемы с cashflow.'
  },
  { 
    label: 'Маржа', 
    value: '62%', 
    subValue: 'Валовая маржа', 
    status: 'good' as const,
    tooltip: 'Маржинальность здоровая. Можно инвестировать в качество продукта без потери прибыльности.'
  },
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
            yearChange={18}
            changeLabel="vs прошлый месяц / год"
            icon={Wallet}
            variant="warning"
            delay={100}
            recommendation={{
              type: 'warning',
              message: 'Снижение к прошлому месяцу. Проверьте качество лидов.'
            }}
          />
          <MetricCard
            title="Конверсия в оплату"
            value="19.8%"
            change={-2}
            yearChange={4}
            changeLabel="vs прошлый месяц / год"
            icon={Target}
            variant="info"
            delay={150}
            recommendation={{
              type: 'info',
              message: 'Ниже таргета 22%. Фокус на этап "Запись на урок".'
            }}
          />
          <MetricCard
            title="Новых учеников"
            value="842"
            change={8}
            yearChange={24}
            changeLabel="vs прошлый месяц / год"
            icon={Users}
            variant="success"
            delay={200}
            recommendation={{
              type: 'success',
              message: 'Рост стабильный. Продолжайте текущую стратегию.'
            }}
          />
          <MetricCard
            title="Средний чек"
            value="11 400 ₽"
            change={-3}
            yearChange={7}
            changeLabel="vs прошлый месяц / год"
            icon={CreditCard}
            variant="default"
            delay={250}
          />
        </div>

        {/* Second Row KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Повторные продажи"
            value="234"
            change={15}
            yearChange={32}
            changeLabel="upsale + кросс-продажи"
            icon={Repeat}
            variant="success"
            delay={300}
            recommendation={{
              type: 'success',
              message: 'Отличный рост! Программа лояльности работает.'
            }}
          />
          <MetricCard
            title="Выполнение плана"
            value="87%"
            change={-5}
            changeLabel="до конца месяца 7 дней"
            icon={TrendingUp}
            variant="warning"
            delay={350}
            recommendation={{
              type: 'warning',
              message: 'Нужно +1.4 млн ₽ для 100%. Активизируйте базу.'
            }}
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
