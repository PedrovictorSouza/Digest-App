import { render, screen, fireEvent } from '@testing-library/react';

import { Footer } from '../footer';

describe('Footer', () => {
  it('should render footer with navigation items', () => {
    render(<Footer />);

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Relatório')).toBeInTheDocument();
    expect(screen.getByText('Cupons')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });

  it('should have correct CSS classes for proper height', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('h-[9.3vh]');
  });

  it('should render footer container', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should highlight the active tab', () => {
    render(<Footer activeTab="reports" />);

    const reportsButton = screen.getByText('Relatório');
    expect(reportsButton).toHaveClass('text-green-600', 'font-medium');
  });

  it('should call onTabChange when a tab is clicked', () => {
    const mockOnTabChange = vi.fn();
    render(<Footer onTabChange={mockOnTabChange} />);

    const reportsButton = screen.getByText('Relatório');
    fireEvent.click(reportsButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('reports');
  });
});
