import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

type MealEvaluationBody = {
  mealId: string;
  nutrition: number;
  satisfaction: number;
};

export const mealEvaluationsHandlers = [
  http.post(`${env.API_URL}/meal-evaluations`, async ({ request }) => {
    await networkDelay();
    
    try {
      const evaluation = (await request.json()) as MealEvaluationBody;
      
      return HttpResponse.json({
        id: Math.random().toString(36).substring(7),
        ...evaluation,
        createdAt: new Date().toISOString(),
      }, { status: 201 });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.get(`${env.API_URL}/meal-evaluations`, async () => {
    await networkDelay();
    
    try {
      return HttpResponse.json([]);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),
];

