import { screen } from '@testing-library/react';
import { renderApp } from '@/testing/test-utils';
import DashboardRoute from '../dashboard';

describe('Dashboard - Teste de renderização', () => {
  it('deve renderizar o dashboard sem estar em branco', async () => {
    await renderApp(<DashboardRoute />);
    
    const page = screen.getByRole('main') || document.body;
    expect(page).toBeTruthy();
    expect(page.textContent).not.toBe('');
  });

  it('deve renderizar a HomePage por padrão', async () => {
    await renderApp(<DashboardRoute />);
    
    const homeElements = screen.queryAllByText(/digest|refeições|Como foram/i);
    expect(homeElements.length).toBeGreaterThan(0);
  });

  it('deve renderizar o Footer', async () => {
    await renderApp(<DashboardRoute />);
    
    const footer = document.querySelector('footer') || 
                   screen.queryByText(/Início|Relatórios|Cupons|Perfil/i);
    expect(footer).toBeTruthy();
  });
});

