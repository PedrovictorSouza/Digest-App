import { render, screen } from '@testing-library/react';

import { DigestLayout } from '../digest-layout';

describe('DigestLayout', () => {
  it('deve renderizar ícones ao lado dos horários das refeições', () => {
    render(<DigestLayout />);

    const breakfastTime = screen.getByText('08:00');
    const lunchTime = screen.getByText('12:30');
    const dinnerTime = screen.getByText('19:00');

    expect(breakfastTime).toBeInTheDocument();
    expect(lunchTime).toBeInTheDocument();
    expect(dinnerTime).toBeInTheDocument();
  });

  it('deve ter ícones de relógio ao lado de cada horário', () => {
    render(<DigestLayout />);

    const clockIcons = screen.getAllByTestId('clock-icon');

    expect(clockIcons.length).toBeGreaterThanOrEqual(3);
  });

  it('deve renderizar os horários das três refeições', () => {
    render(<DigestLayout />);

    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });
});
