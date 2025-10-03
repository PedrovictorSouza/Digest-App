import axios from 'axios';

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

// Mock data com tipos corretos
const mockUser = {
  id: '1',
  firstName: 'Usuário',
  lastName: 'Demo',
  email: 'demo@digest.com',
  role: 'USER' as const,
  teamId: '1',
  bio: 'Usuário de demonstração',
  createdAt: Date.now(),
};

const mockTeam = {
  id: '1',
  name: 'Equipe Demo',
  description: 'Equipe de demonstração',
  createdAt: Date.now(),
};

const mockDiscussion = {
  id: '1',
  title: 'Discussão Demo',
  body: 'Esta é uma discussão de exemplo para demonstração.',
  teamId: '1',
  author: mockUser,
  createdAt: Date.now(),
};

const mockComment = {
  id: '1',
  body: 'Comentário de exemplo para demonstração.',
  discussionId: '1',
  author: mockUser,
  createdAt: Date.now(),
};

export const api = demoMode
  ? {
      get: async (url: string) => {
        if (url === '/auth/me') {
          return {
            data: {
              jwt: 'demo-token',
              user: mockUser,
            },
          };
        }
        if (url === '/users') {
          return {
            data: [mockUser],
          };
        }
        if (url === '/discussions') {
          return {
            data: [mockDiscussion],
            meta: {
              page: 1,
              total: 1,
              totalPages: 1,
            },
          };
        }
        if (url === '/comments') {
          return {
            data: [mockComment],
            meta: {
              page: 1,
              total: 1,
              totalPages: 1,
            },
          };
        }
        if (url.startsWith('/discussions/')) {
          return {
            data: mockDiscussion,
          };
        }
        if (url === '/teams') {
          return {
            data: [mockTeam],
          };
        }
        return { data: {} };
      },
      post: async (url: string) => {
        if (url === '/auth/login') {
          return {
            data: {
              jwt: 'demo-token',
              user: mockUser,
            },
          };
        }
        if (url === '/auth/logout') {
          return { data: { success: true } };
        }
        if (url === '/discussions') {
          return { data: mockDiscussion };
        }
        if (url === '/comments') {
          return { data: mockComment };
        }
        return { data: { success: true } };
      },
      patch: async () => ({ data: mockDiscussion }),
      delete: async () => ({ data: { success: true } }),
    }
  : axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      withCredentials: true,
      headers: { Accept: 'application/json' },
    });
