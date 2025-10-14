import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { User } from '../models/user.model';

dotenv.config();

const createTestUser = async () => {
  try {
    await connectDatabase();

    const testEmail = 'teste@exemplo.com';
    
    const existingUser = await User.findOne({ email: testEmail });
    
    if (existingUser) {
      console.log('❌ Usuário de teste já existe!');
      console.log('📧 Email:', testEmail);
      console.log('✅ Use este email para fazer login.');
      process.exit(0);
    }

    const testUser = await User.create({
      email: testEmail,
      password: 'senha123',
      firstName: 'João',
      lastName: 'Silva',
    });

    console.log('✅ Usuário de teste criado com sucesso!');
    console.log('');
    console.log('📋 Credenciais para login:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    teste@exemplo.com');
    console.log('🔑 Senha:    senha123');
    console.log('👤 Nome:     João Silva');
    console.log('🆔 ID:      ', testUser._id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🚀 Agora você pode fazer login em:');
    console.log('   http://localhost:3003/auth/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar usuário de teste:', error);
    process.exit(1);
  }
};

createTestUser();

