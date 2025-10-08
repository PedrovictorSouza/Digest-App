import { connectDatabase } from '../config/database';
import { MealEvaluation } from '../models/meal-evaluation.model';

const watchData = async () => {
  await connectDatabase();
  
  console.log('👀 Monitorando avaliações... (Ctrl+C para sair)\n');
  
  let lastCount = 0;
  
  setInterval(async () => {
    const count = await MealEvaluation.countDocuments();
    
    if (count !== lastCount) {
      console.clear();
      console.log('👀 Monitorando avaliações... (Ctrl+C para sair)\n');
      
      const evaluations = await MealEvaluation.find().sort({ createdAt: -1 });
      
      console.log(`📊 Total: ${count} avaliações\n`);
      
      evaluations.forEach((evaluation, index) => {
        console.log(`${index + 1}. Refeição: ${evaluation.mealId}`);
        console.log(`   Nutrição: ${'⭐'.repeat(evaluation.nutrition)} (${evaluation.nutrition}/5)`);
        console.log(`   Satisfação: ${'⭐'.repeat(evaluation.satisfaction)} (${evaluation.satisfaction}/5)`);
        console.log(`   Data: ${new Date(evaluation.createdAt).toLocaleString('pt-BR')}\n`);
      });
      
      lastCount = count;
    }
  }, 2000);
};

watchData();

