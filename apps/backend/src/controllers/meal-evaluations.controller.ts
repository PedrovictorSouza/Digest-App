import { Request, Response } from 'express';
import { MealEvaluation } from '../models/meal-evaluation.model';

export const createMealEvaluation = async (req: Request, res: Response) => {
  try {
    const { mealId, nutrition, satisfaction } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    if (!mealId || nutrition === undefined || satisfaction === undefined) {
      return res.status(400).json({ 
        message: 'mealId, nutrition and satisfaction are required' 
      });
    }

    if (nutrition < 1 || nutrition > 5 || satisfaction < 1 || satisfaction > 5) {
      return res.status(400).json({ 
        message: 'nutrition and satisfaction must be between 1 and 5' 
      });
    }

    const evaluation = await MealEvaluation.create({
      userId,
      mealId,
      nutrition,
      satisfaction
    });

    console.log('✅ Evaluation created:', evaluation);

    return res.status(201).json({
      id: evaluation._id,
      mealId: evaluation.mealId,
      nutrition: evaluation.nutrition,
      satisfaction: evaluation.satisfaction,
      createdAt: evaluation.createdAt
    });
  } catch (error) {
    console.error('❌ Error creating evaluation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMealEvaluations = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.query;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    const query: any = { userId };
    if (mealId) {
      query.mealId = mealId;
    }

    const evaluations = await MealEvaluation.find(query).sort({ createdAt: -1 });

    const formattedEvaluations = evaluations.map(e => ({
      id: e._id,
      mealId: e.mealId,
      nutrition: e.nutrition,
      satisfaction: e.satisfaction,
      createdAt: e.createdAt
    }));

    return res.json(formattedEvaluations);
  } catch (error) {
    console.error('❌ Error fetching evaluations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

