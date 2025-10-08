import { useMemo } from 'react';

import { BackButton } from '@/features/meal-evaluation';
import { useGetEvaluations } from '@/features/meal-evaluation/api/get-evaluations';

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

const MEAL_NAMES: Record<string, string> = {
  '1': 'Café da Manhã',
  '2': 'Almoço',
  '3': 'Jantar',
};

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

type ReportsPageProps = {
  onBack?: () => void;
};

export const ReportsPage = ({ onBack }: ReportsPageProps = {}) => {
  const { data: evaluations = [], isLoading } = useGetEvaluations();

  const mealAverages = useMemo(() => {
    if (!evaluations.length) return [];

    const mealGroups = evaluations.reduce((acc, evaluation) => {
      if (!acc[evaluation.mealId]) {
        acc[evaluation.mealId] = [];
      }
      acc[evaluation.mealId].push(evaluation);
      return acc;
    }, {} as Record<string, typeof evaluations>);

    return Object.entries(mealGroups).map(([mealId, evals]) => {
      const totalNutrition = evals.reduce((sum, e) => sum + e.nutrition, 0);
      const totalSatisfaction = evals.reduce((sum, e) => sum + e.satisfaction, 0);
      
      return {
        name: MEAL_NAMES[mealId] || `Refeição ${mealId}`,
        nutrition: Number((totalNutrition / evals.length).toFixed(1)),
        satisfaction: Number((totalSatisfaction / evals.length).toFixed(1)),
      };
    });
  }, [evaluations]);

  if (isLoading) {
    return (
      <div className="px-4 py-4 flex items-center justify-center h-screen" style={{ backgroundColor: '#f4f4f4' }}>
        <p className="text-gray-500">Carregando relatórios...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4" style={{ backgroundColor: '#f4f4f4' }}>
      {onBack && <BackButton onBack={onBack} />}
      <ReportHeader />
      <WeeklySummary />
      <WeeklyInsights insights={mockInsights} />
      <MealAverages averages={mealAverages} />
      <EncouragementBanner />
    </div>
  );
};
