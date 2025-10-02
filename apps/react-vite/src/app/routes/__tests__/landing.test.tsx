import { render, screen } from '@testing-library/react';

import LandingRoute from '../landing';

describe('LandingRoute', () => {
  it('should render header and footer', () => {
    render(<LandingRoute />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });
});
