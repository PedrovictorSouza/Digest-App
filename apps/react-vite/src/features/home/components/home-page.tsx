import { useState } from 'react';

import { Toast } from '@/components/ui/toast';
import { useCreateEvaluation } from '@/features/meal-evaluation/api/create-evaluation';
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
  items?: string[];
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
    items: [],
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
  const { mutate: createEvaluation, isPending } = useCreateEvaluation();

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

  const handleSaveEvaluation = (nutrition: number, satisfaction: number) => {
    if (selectedMeal) {
      createEvaluation(
        {
          mealId: selectedMeal.id,
          nutrition,
          satisfaction,
        },
        {
          onSuccess: () => {
            setMeals(
              meals.map((meal) =>
                meal.id === selectedMeal.id
                  ? { ...meal, status: 'completed' as const }
                  : meal,
              ),
            );
            handleBack();
            setTimeout(() => {
              showToast('Avaliação feita com sucesso!');
            }, 100);
          },
        },
      );
    }
  };

  return (
    <>
      {currentView === 'evaluation' && selectedMeal ? (
        <MealEvaluationPage
          mealName={selectedMeal.name}
          mealIcon={selectedMeal.icon}
          onBack={handleBack}
          onSave={handleSaveEvaluation}
          isPending={isPending}
        />
      ) : (
        <div className="px-4 py-4" style={{ backgroundColor: '#f4f4f4' }}>
          <HomeHeader />
          <DateDisplay />
          <MealsList meals={meals} onEvaluate={handleEvaluate} />
          <MotivationalBanner />
        </div>
      )}

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};
