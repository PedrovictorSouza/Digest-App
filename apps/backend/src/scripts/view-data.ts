import { connectDatabase } from '../config/database';
import { MealEvaluation } from '../models/meal-evaluation.model';

const viewData = async () => {
  try {
    await connectDatabase();
    
    const evaluations = await MealEvaluation.find().sort({ createdAt: -1 });
    
    console.log('\n📊 AVALIAÇÕES NO MONGODB\n');
    console.log(`Total: ${evaluations.length} avaliações\n`);
    
    evaluations.forEach((evaluation, index) => {
      console.log(`${index + 1}. Refeição: ${evaluation.mealId}`);
      console.log(`   Nutrição: ${'⭐'.repeat(evaluation.nutrition)}`);
      console.log(`   Satisfação: ${'⭐'.repeat(evaluation.satisfaction)}`);
      console.log(`   Data: ${new Date(evaluation.createdAt).toLocaleString('pt-BR')}`);
      console.log(`   ID: ${evaluation._id}\n`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

viewData();

