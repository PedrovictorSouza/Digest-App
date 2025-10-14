import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

type Body = { mealId: string; nutrition: number; satisfaction: number };
type Resp = { id: string; mealId: string; createdAt: string };

export const useCreateEvaluation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['meal-evaluations', 'create'],
    mutationFn: (data: Body) =>
      api.post<Resp>('/meal-evaluations', data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['meal-evaluations'] });
    },
  });
};
