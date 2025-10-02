type MealHeaderProps = {
  mealName: string;
  icon: string;
};

export const MealHeader = ({ mealName, icon }: MealHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="text-6xl mb-4">{icon}</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">{mealName}</h1>
      <p className="text-gray-500">Avalie sua refeição em duas dimensões</p>
    </div>
  );
};
