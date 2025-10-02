import { render, screen } from '@testing-library/react';

import LandingRoute from '../landing';

describe('LandingRoute', () => {
  it('should render header and footer', () => {
    render(<LandingRoute />);
    
    expect(screen.getByText('digest')).toBeInTheDocument();
    expect(screen.getByText('Como foram suas refeições hoje?')).toBeInTheDocument();
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });
});
