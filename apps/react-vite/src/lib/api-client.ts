import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

export const api = Axios.create({
  baseURL: env.API_URL,
  adapter: demoMode ? async (config) => {
    // Mock responses for demo mode
    if (config.url === '/auth/me') {
      return {
        data: { id: 1, name: 'Usuário Demo', email: 'demo@digest.com' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
    if (config.url?.startsWith('/users')) {
      return {
        data: [{ id: 1, name: 'Cliente Fake' }],
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
    if (config.url?.startsWith('/discussions')) {
      return {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
    if (config.url?.startsWith('/comments')) {
      return {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
    return {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  } : undefined,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
