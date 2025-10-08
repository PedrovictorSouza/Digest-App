import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';

const showStructure = async () => {
  try {
    await connectDatabase();
    
    console.log('\n📦 ESTRUTURA DO MONGODB\n');
    console.log('═══════════════════════════════════════\n');
    
    const db = mongoose.connection.db;
    if (!db) throw new Error('Database não conectado');
    
    const dbName = db.databaseName;
    console.log(`🗄️  Database: "${dbName}"`);
    console.log(`🔗 URI: ${process.env.MONGODB_URI}\n`);
    
    const collections = await db.listCollections().toArray();
    
    console.log(`📂 Collections (${collections.length}):\n`);
    
    for (const collection of collections) {
      const name = collection.name;
      const count = await db.collection(name).countDocuments();
      
      console.log(`   📁 ${name}`);
      console.log(`      └─ ${count} documento(s)\n`);
      
      if (count > 0) {
        const sample = await db.collection(name).findOne();
        console.log(`      Exemplo de documento:`);
        console.log(`      ${JSON.stringify(sample, null, 6).split('\n').join('\n      ')}\n`);
      }
    }
    
    console.log('═══════════════════════════════════════\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

showStructure();

