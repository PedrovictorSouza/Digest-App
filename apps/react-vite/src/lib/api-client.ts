import axios from 'axios';

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

type FakeResponse<T> = Promise<{ data: T }>;

export const api = demoMode
  ? {
      get: async (url: string): FakeResponse<any> => {
        if (url === '/auth/me') {
          return {
            data: {
              jwt: 'demo-token',
              user: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
            },
          };
        }
        if (url === '/users') {
          return {
            data: [
              { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
              { id: 2, name: 'Cliente Teste', email: 'cliente@teste.com' },
            ],
          };
        }
        if (url === '/discussions') {
          return {
            data: [
              {
                id: 1,
                title: 'Discussão Demo',
                content: 'Esta é uma discussão de exemplo para demonstração.',
                author: { id: 1, name: 'Usuário Demo' },
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        if (url === '/comments') {
          return {
            data: [
              {
                id: 1,
                content: 'Comentário de exemplo para demonstração.',
                author: { id: 1, name: 'Usuário Demo' },
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return { data: {} };
      },
      post: async () => ({ data: { success: true } }),
      patch: async () => ({ data: { success: true } }),
      delete: async () => ({ data: { success: true } }),
    }
  : axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      withCredentials: true,
      headers: { Accept: 'application/json' },
    });
