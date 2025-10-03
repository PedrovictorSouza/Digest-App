import { env } from '@/config/env';

export const enableMocking = async () => {
  console.log('🔧 MSW: enableMocking called, ENABLE_API_MOCKING:', env.ENABLE_API_MOCKING);
  
  if (env.ENABLE_API_MOCKING) {
    console.log('🚀 MSW: Starting mock service worker...');
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    const result = await worker.start();
    console.log('✅ MSW: Mock service worker started successfully');
    return result;
  }
  
  console.log('❌ MSW: Mocking disabled');
};
