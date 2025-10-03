import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

type User = { id: number; name: string; email?: string };
type Team = { id: number; name: string };
type Discussion = {
  id: number;
  title: string;
  content?: string;
  body?: string;
  teamId?: string;
  author: User;
  createdAt?: string;
};
type Comment = {
  id: number;
  body?: string;
  content?: string;
  discussionId?: string;
  author: User;
  createdAt: string;
};
type Meta = { page: number; perPage: number; total: number };
type AuthResponse = { jwt: string; user: User };

type Http = {
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
};

function ok<T>(data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };
}

const demoHttp: Http = {
  async get<T = any>(url: string): Promise<AxiosResponse<T>> {
    const path = url.split('?')[0];

    if (path === '/auth/me') {
      const payload: AuthResponse = {
        jwt: 'demo-token',
        user: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
      };
      return ok(payload as T);
    }

    if (path === '/users') {
      const payload: { data: User[] } = {
        data: [
          { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
          { id: 2, name: 'Cliente Teste', email: 'cliente@teste.com' },
        ],
      };
      return ok(payload as T);
    }

    if (path === '/teams') {
      const payload: { data: Team[] } = {
        data: [
          { id: 1, name: 'Time A' },
          { id: 2, name: 'Time B' },
        ],
      };
      return ok(payload as T);
    }

    if (path === '/discussions') {
      const payload: { data: Discussion[]; meta: Meta } = {
        data: [
          {
            id: 1,
            title: 'Discussão Demo',
            content: 'Conteúdo de exemplo para demo.',
            author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
            createdAt: new Date().toISOString(),
          },
        ],
        meta: { page: 1, perPage: 10, total: 1 },
      };
      return ok(payload as T);
    }

    if (path.startsWith('/discussions/')) {
      const id = Number(path.split('/')[2] || 1);
      const payload: { data: Discussion } = {
        data: {
          id,
          title: `Discussão Demo #${id}`,
          content: 'Detalhe da discussão demo.',
          author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
          createdAt: new Date().toISOString(),
        },
      };
      return ok(payload as T);
    }

    if (path === '/comments') {
      const payload: { data: Comment[]; meta: Meta } = {
        data: [
          {
            id: 1,
            content: 'Comentário de exemplo',
            author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
            createdAt: new Date().toISOString(),
          },
        ],
        meta: { page: 1, perPage: 10, total: 1 },
      };
      return ok(payload as T);
    }

    return ok({} as T);
  },

  async post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const path = url.split('?')[0];

    if (path === '/auth/login') {
      const payload: AuthResponse = {
        jwt: 'demo-token',
        user: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
      };
      return ok(payload as T);
    }

    if (path === '/discussions') {
      const payload: Discussion = {
        id: Math.floor(Math.random() * 10000),
        title: data?.title ?? 'Nova discussão demo',
        body: data?.body ?? 'Corpo da discussão',
        author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
        createdAt: new Date().toISOString(),
      };
      return ok(payload as T, 201);
    }

    if (path === '/comments') {
      const payload: Comment = {
        id: Math.floor(Math.random() * 10000),
        content: data?.content ?? data?.body ?? 'Comentário demo',
        discussionId: data?.discussionId?.toString?.() ?? '1',
        author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
        createdAt: new Date().toISOString(),
      };
      return ok(payload as T, 201);
    }

    return ok({ success: true } as T, 201);
  },

  async patch<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const path = url.split('?')[0];

    if (path.startsWith('/discussions/')) {
      const id = Number(path.split('/')[2] || 1);
      const payload: Discussion = {
        id,
        title: data?.title ?? `Discussão Demo #${id}`,
        body: data?.body ?? 'Corpo atualizado (demo)',
        author: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
        createdAt: new Date().toISOString(),
      };
      return ok(payload as T);
    }

    return ok({ success: true } as T);
  },

  async delete<T = any>(): Promise<AxiosResponse<T>> {
    return ok({ success: true } as T);
  },
};

export const api: AxiosInstance | Http = DEMO
  ? demoHttp
  : axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      withCredentials: true,
      headers: { Accept: 'application/json' },
    });
