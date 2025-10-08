import mongoose, { Schema, Document } from 'mongoose';

export interface IMealEvaluation extends Document {
  mealId: string;
  nutrition: number;
  satisfaction: number;
  createdAt: Date;
}

const MealEvaluationSchema = new Schema<IMealEvaluation>(
  {
    mealId: {
      type: String,
      required: true,
      index: true
    },
    nutrition: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    satisfaction: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

export const MealEvaluation = mongoose.model<IMealEvaluation>(
  'MealEvaluation',
  MealEvaluationSchema
);

