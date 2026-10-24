import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CampoForm from './CampoForm';

describe('CampoForm', () => {
  it('muestra el mensaje de error solo cuando recibe la prop error', () => {
    const { rerender } = render(
      <CampoForm id="rut" label="RUT" value="" onChange={() => {}} />
    );
    expect(screen.queryByText('RUT invalido')).not.toBeInTheDocument();

    rerender(
      <CampoForm id="rut" label="RUT" value="" onChange={() => {}} error="RUT invalido" />
    );
    expect(screen.getByText('RUT invalido')).toBeInTheDocument();
  });

  it('llama a onChange cada vez que el usuario escribe', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <CampoForm id="nombre" label="Nombre completo" value="" onChange={handleChange} />
    );
    await user.type(screen.getByLabelText('Nombre completo'), 'Ana');

    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});