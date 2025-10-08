import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

type Evaluation = {
  id: string;
  mealId: string;
  nutrition: number;
  satisfaction: number;
  createdAt: string;
};

export const useGetEvaluations = (mealId?: string) => {
  return useQuery({
    queryKey: ['meal-evaluations', mealId],
    queryFn: () =>
      api
        .get<Evaluation[]>('/meal-evaluations', {
          params: mealId ? { mealId } : undefined,
        })
        .then((r) => r.data),
  });
};

