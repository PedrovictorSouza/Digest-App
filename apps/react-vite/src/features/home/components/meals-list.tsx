import { MealCard } from './meal-card';

type Meal = {
  id: string;
  name: string;
  time: string;
  icon: string;
  status: 'pending' | 'completed';
};

type MealsListProps = {
  meals: Meal[];
  onEvaluate: (mealId: string) => void;
};

export const MealsList = ({ meals, onEvaluate }: MealsListProps) => {
  return (
    <div className="mb-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onEvaluate={onEvaluate} />
      ))}
    </div>
  );
};
