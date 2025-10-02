type MealAverageCardProps = {
  mealName: string;
  nutrition: number;
  satisfaction: number;
};

export const MealAverageCard = ({
  mealName,
  nutrition,
  satisfaction,
}: MealAverageCardProps) => {
  const getNutritionColor = (value: number) => {
    if (value >= 4) return 'bg-green-500';
    if (value >= 3)
      return 'bg-gradient-to-br from-[#568168] to-transparent bg-[#9bba9b]';
    return 'bg-red-500';
  };

  const getSatisfactionColor = (value: number) => {
    if (value >= 4) return 'from-orange-400 to-yellow-400';
    if (value >= 3) return 'from-orange-300 to-yellow-300';
    return 'from-red-300 to-orange-300';
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm border">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{mealName}</h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Nutrição</span>
            <span className="text-sm font-bold text-gray-800">
              {nutrition}/5
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getNutritionColor(nutrition)}`}
              style={{ width: `${(nutrition / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">
              Satisfação
            </span>
            <span className="text-sm font-bold text-gray-800">
              {satisfaction}/5
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${getSatisfactionColor(satisfaction)}`}
              style={{ width: `${(satisfaction / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
