import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TablaTrabajadores from './TablaTrabajadores';

const trabajadores = [
  { id: 1, rut: '11.111.111-1', nombre: 'Juan Perez', especialidad: 'Operador de grua', valorHora: 12000, cliente: 'Construccion SA', estado: 'En turno' },
  { id: 2, rut: '33.333.333-3', nombre: 'Carlos Silva', especialidad: 'Electricista', valorHora: 14000, cliente: 'Sin asignar', estado: 'Disponible' },
];

describe('TablaTrabajadores', () => {
  it('muestra una fila por trabajador y los botones de renderAcciones', () => {
    render(
      <TablaTrabajadores
        trabajadores={trabajadores}
        renderAcciones={(t) => <button>{`Asignar ${t.nombre}`}</button>}
      />
    );

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Asignar Carlos Silva' })).toBeInTheDocument();
  });

  it('muestra un mensaje y no la tabla cuando no hay trabajadores', () => {
    render(<TablaTrabajadores trabajadores={[]} />);

    expect(screen.getByText('No se encontraron trabajadores.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});