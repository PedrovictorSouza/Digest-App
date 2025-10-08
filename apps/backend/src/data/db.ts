type MealEvaluation = {
  id: string;
  mealId: string;
  nutrition: number;
  satisfaction: number;
  createdAt: string;
};

const mealEvaluations: MealEvaluation[] = [];

export const db = {
  mealEvaluations: {
    findAll: () => mealEvaluations,
    
    findByMealId: (mealId: string) => 
      mealEvaluations.filter(e => e.mealId === mealId),
    
    create: (data: Omit<MealEvaluation, 'id' | 'createdAt'>) => {
      const evaluation: MealEvaluation = {
        id: Math.random().toString(36).substring(7),
        ...data,
        createdAt: new Date().toISOString()
      };
      mealEvaluations.push(evaluation);
      return evaluation;
    }
  }
};

