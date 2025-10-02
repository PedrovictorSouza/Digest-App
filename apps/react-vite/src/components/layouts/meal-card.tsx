import * as React from 'react';

type MealCardProps = {
  mealName: string;
  time: string;
  isEvaluated: boolean;
  mealType: 'breakfast' | 'lunch' | 'dinner';
};

const BreakfastIcon = () => (
  <div className="flex size-10 items-center justify-center">
    <span className="text-4xl text-white">🌅</span>
  </div>
);

const LunchIcon = () => (
  <div className="flex size-10 items-center justify-center">
    <span className="text-4xl text-white">☀️</span>
  </div>
);

const DinnerIcon = () => (
  <div className="flex size-10 items-center justify-center">
    <span className="text-4xl text-white">🌙</span>
  </div>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="text-gray-600"
    data-testid="clock-icon"
  >
    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17L4 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MealCard = ({
  mealName,
  time,
  isEvaluated,
  mealType,
}: MealCardProps) => {
  const getMealIcon = () => {
    switch (mealType) {
      case 'breakfast':
        return <BreakfastIcon />;
      case 'lunch':
        return <LunchIcon />;
      case 'dinner':
        return <DinnerIcon />;
      default:
        return <BreakfastIcon />;
    }
  };

  const cardBgColor = isEvaluated ? 'bg-green-50' : 'bg-white';

  return (
    <div
      className={`${cardBgColor} mb-5 rounded-2xl border border-[#cfddd2] p-5 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">{getMealIcon()}</div>
          <div>
            <h3 className="mb-1 font-medium text-gray-800">{mealName}</h3>
            <div className="flex items-center gap-1">
              <ClockIcon />
              <p className="text-sm text-gray-500">{time}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEvaluated ? (
            <>
              <div className="flex size-6 items-center justify-center rounded-full bg-green-500">
                <CheckIcon />
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: 'rgb(106 155 124)' }}
              >
                Avaliado
              </span>
            </>
          ) : (
            <button className="rounded-[15px] bg-[#9bba9b] bg-gradient-to-br from-[#568168] to-transparent px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Avaliar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
