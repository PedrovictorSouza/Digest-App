import { Router } from 'express';
import { createMealEvaluation, getMealEvaluations } from '../controllers/meal-evaluations.controller';

const router = Router();

router.post('/', createMealEvaluation);
router.get('/', getMealEvaluations);

export default router;

