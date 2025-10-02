import { useState } from 'react';

import { BackButton } from './back-button';
import { EvaluationCard } from './evaluation-card';
import { MealHeader } from './meal-header';
import { SaveButton } from './save-button';

type MealEvaluationPageProps = {
  mealName: string;
  mealIcon: string;
  onBack: () => void;
  onSave: (nutrition: number, satisfaction: number) => void;
};

export const MealEvaluationPage = ({ 
  mealName, 
  mealIcon, 
  onBack, 
  onSave 
}: MealEvaluationPageProps) => {
  const [nutrition, setNutrition] = useState<number | null>(null);
  const [satisfaction, setSatisfaction] = useState<number | null>(null);

  const isEnabled = nutrition !== null && satisfaction !== null;

  const handleSave = () => {
    if (isEnabled) {
      onSave(nutrition!, satisfaction!);
    }
  };

  return (
    <div className="p-4">
      <BackButton onBack={onBack} />
      <MealHeader mealName={mealName} icon={mealIcon} />
      
      <EvaluationCard
        title="Qualidade Nutricional"
        question="Como você avalia a qualidade nutricional desta refeição?"
        value={nutrition}
        onChange={setNutrition}
      />
      
      <EvaluationCard
        title="Satisfação"
        question="O quanto você se sentiu satisfeito(a) com esta refeição?"
        value={satisfaction}
        onChange={setSatisfaction}
      />
      
      <SaveButton isEnabled={isEnabled} onSave={handleSave} />
    </div>
  );
};
