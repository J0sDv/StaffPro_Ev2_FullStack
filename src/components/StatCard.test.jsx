import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard';

describe('StatCard', () => {
  it('muestra valor, titulo e icono recibidos por props', () => {
    const { container } = render(
      <StatCard valor={8} titulo="Trabajadores" icono="bi-people" />
    );

    expect(screen.getByRole('heading', { name: '8' })).toBeInTheDocument();
    expect(screen.getByText('Trabajadores')).toBeInTheDocument();
    expect(container.querySelector('i')).toHaveClass('bi-people');
  });
});