import { useState } from 'react';

import { Toast } from '@/components/ui/toast';
import { MealEvaluationPage } from '@/features/meal-evaluation';
import { useToast } from '@/hooks/use-toast';

import { DateDisplay } from './date-display';
import { HomeHeader } from './home-header';
import { MealsList } from './meals-list';
import { MotivationalBanner } from './motivational-banner';

type Meal = {
  id: string;
  name: string;
  time: string;
  icon: string;
  status: 'pending' | 'completed';
};

const initialMeals: Meal[] = [
  {
    id: '1',
    name: 'Café da Manhã',
    time: '08:00',
    icon: '🌅',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Almoço',
    time: '12:30',
    icon: '☀️',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Jantar',
    time: '19:00',
    icon: '🌙',
    status: 'pending',
  },
];

type HomePageProps = {
  onViewChange?: (view: 'home' | 'evaluation') => void;
};

export const HomePage = ({ onViewChange }: HomePageProps = {}) => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [currentView, setCurrentView] = useState<'home' | 'evaluation'>('home');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const { toast, showToast, hideToast } = useToast();

  const handleEvaluate = (mealId: string) => {
    const meal = meals.find((m) => m.id === mealId);
    if (meal) {
      setSelectedMeal(meal);
      setCurrentView('evaluation');
      onViewChange?.('evaluation');
    }
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedMeal(null);
    onViewChange?.('home');
  };

  const handleSaveEvaluation = () => {
    if (selectedMeal) {
      setMeals(
        meals.map((meal) =>
          meal.id === selectedMeal.id
            ? { ...meal, status: 'completed' as const }
            : meal,
        ),
      );
      handleBack();
      showToast('Avaliação feita com sucesso');
    }
  };

  if (currentView === 'evaluation' && selectedMeal) {
    return (
      <MealEvaluationPage
        mealName={selectedMeal.name}
        mealIcon={selectedMeal.icon}
        onBack={handleBack}
        onSave={handleSaveEvaluation}
      />
    );
  }

  return (
    <>
      <div className="px-4 py-4 pb-20" style={{ backgroundColor: '#f4f4f4', minHeight: 'calc(100vh - 80px)' }}>
        <HomeHeader />
        <DateDisplay />
        <MealsList meals={meals} onEvaluate={handleEvaluate} />
        <MotivationalBanner />
      </div>

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};
