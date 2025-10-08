import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createElement } from 'react';

import { db } from '@/testing/mocks/db';
import { AUTH_COOKIE, encode, hash } from '@/testing/mocks/utils';

import { useCreateEvaluation } from '../create-evaluation';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
};

describe('useCreateEvaluation', () => {
  it('deve salvar avaliação com sucesso', async () => {
    const user = db.user.create({
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password: hash('password'),
      teamId: '1',
    });

    document.cookie = `${AUTH_COOKIE}=${encode(user)}`;

    const { result } = renderHook(() => useCreateEvaluation(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        mealId: '1',
        nutrition: 4,
        satisfaction: 5,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    document.cookie = `${AUTH_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  });
});
