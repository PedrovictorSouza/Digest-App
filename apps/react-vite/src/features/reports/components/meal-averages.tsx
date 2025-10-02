import { MealAverageCard } from './meal-average-card';

type MealAverage = {
  name: string;
  nutrition: number;
  satisfaction: number;
};

type MealAveragesProps = {
  averages: MealAverage[];
};

export const MealAverages = ({ averages }: MealAveragesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Médias por Refeição
      </h2>
      <div className="space-y-5">
        {averages.map((meal) => (
          <MealAverageCard
            key={meal.name}
            mealName={meal.name}
            nutrition={meal.nutrition}
            satisfaction={meal.satisfaction}
          />
        ))}
      </div>
    </div>
  );
};
