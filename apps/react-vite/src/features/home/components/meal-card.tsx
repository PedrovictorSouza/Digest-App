const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="text-gray-600"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#22c55e"
      strokeWidth="2"
    />
    <path
      d="M18 8L10 16L6 12"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type MealCardProps = {
  meal: {
    id: string;
    name: string;
    time: string;
    icon: string;
    status: 'pending' | 'completed';
  };
  onEvaluate: (mealId: string) => void;
};

export const MealCard = ({ meal, onEvaluate }: MealCardProps) => {
  return (
    <div
      className={`mb-5 rounded-2xl border border-[#cfddd2] p-5 shadow-sm ${
        meal.status === 'completed'
          ? 'border-green-200 bg-green-50'
          : 'bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex size-10 items-center justify-center">
              <span className="text-4xl text-white">{meal.icon}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-gray-800">{meal.name}</h3>
            <div className="flex items-center gap-1">
              <ClockIcon />
              <p className="text-sm text-gray-500">{meal.time}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {meal.status === 'completed' ? (
            <>
              <div className="flex size-6 items-center justify-center">
                <CheckIcon />
              </div>
              <span className="text-sm font-medium" style={{color: 'rgb(106 155 124)'}}>
                Avaliado
              </span>
            </>
          ) : (
            <button
              onClick={() => onEvaluate(meal.id)}
              className="rounded-[15px] bg-gradient-to-br from-[#568168] to-transparent px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 bg-[#9bba9b]"
            >
              Avaliar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
