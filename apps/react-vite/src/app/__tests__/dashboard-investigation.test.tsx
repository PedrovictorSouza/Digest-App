import { screen, waitFor } from '@testing-library/react';
import { renderApp, createUser, userEvent } from '@/testing/test-utils';
import { AppRouter } from '../router';

describe('Dashboard - Investigação de página em branco', () => {
  it('deve renderizar dashboard após login', async () => {
    const user = await createUser();
    
    const { history } = await renderApp(<AppRouter />, { 
      user: null,
      url: '/auth/login' 
    });
    
    await userEvent.type(screen.getByLabelText(/email/i), user.email);
    await userEvent.type(screen.getByLabelText(/password/i), user.password);
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/dashboard');
    });
    
    await waitFor(() => {
      expect(screen.getByText('digest')).toBeInTheDocument();
    });
  });

  it('deve renderizar conteúdo do dashboard quando acessado diretamente', async () => {
    const user = await createUser();
    
    await renderApp(<AppRouter />, { 
      user: user,
      url: '/dashboard' 
    });
    
    expect(screen.getByText('digest')).toBeInTheDocument();
    expect(screen.getByText(/refeições/i)).toBeInTheDocument();
  });

  it('deve ter elementos visíveis no dashboard', async () => {
    const user = await createUser();
    
    await renderApp(<AppRouter />, { 
      user: user,
      url: '/dashboard' 
    });
    
    const digestLogo = screen.queryByText('digest');
    const refeicoesText = screen.queryByText(/refeições/i);
    const cafeManha = screen.queryByText(/café da manhã/i);
    
    console.log('Elementos encontrados:', {
      digestLogo: !!digestLogo,
      refeicoesText: !!refeicoesText,
      cafeManha: !!cafeManha
    });
    
    expect(digestLogo).toBeTruthy();
    expect(refeicoesText).toBeTruthy();
  });
});
