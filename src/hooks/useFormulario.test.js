import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useFormulario from './useFormulario';

describe('useFormulario', () => {
  it('actualiza el valor del campo cuando cambia', () => {
    const { result } = renderHook(() => useFormulario({ nombre: '' }, () => ({})));

    act(() => {
      result.current.handleChange({ target: { name: 'nombre', value: 'Ana' } });
    });

    expect(result.current.datos.nombre).toBe('Ana');
  });
});
