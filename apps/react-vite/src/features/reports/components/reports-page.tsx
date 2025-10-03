import { EncouragementBanner } from './encouragement-banner';
import { MealAverages } from './meal-averages';
import { ReportHeader } from './report-header';
import { WeeklyInsights } from './weekly-insights';
import { WeeklySummary } from './weekly-summary';

type MealAverage = {
  name: string;
  nutrition: number;
  satisfaction: number;
};

type Insight = {
  id: string;
  icon: string;
  message: string;
  trend: 'up' | 'down' | 'stable';
};

const mockMealAverages: MealAverage[] = [
  { name: 'Café da Manhã', nutrition: 3.2, satisfaction: 2.8 },
  { name: 'Almoço', nutrition: 3.8, satisfaction: 4.1 },
  { name: 'Jantar', nutrition: 3.5, satisfaction: 4.5 },
];

const mockInsights: Insight[] = [
  {
    id: '1',
    icon: '🌙',
    message: 'Suas jantas estão mais satisfatórias que os cafés da manhã',
    trend: 'up',
  },
  {
    id: '2',
    icon: '🍽️',
    message: 'Atenção: muitas refeições com baixa percepção nutricional',
    trend: 'down',
  },
  {
    id: '3',
    icon: '✨',
    message: 'Você avaliou 85% das suas refeições esta semana',
    trend: 'stable',
  },
];

export const ReportsPage = () => {
  return (
    <div className="px-4 py-4" style={{ backgroundColor: '#f4f4f4' }}>
      <ReportHeader />
      <WeeklySummary />
      <WeeklyInsights insights={mockInsights} />
      <MealAverages averages={mockMealAverages} />
      <EncouragementBanner />
    </div>
  );
};
