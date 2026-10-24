import { describe, it, expect } from 'vitest';
import { validarRut } from './validaciones';

describe('validarRut', () => {
  it('acepta RUTs validos, con puntos y con digito K', () => {
    const validos = ['11.111.111-1', '12.345.678-5', '17.654.321-3', '10.000.013-K'];

    validos.forEach((rut) => {
      expect(validarRut(rut)).toBe(true);
    });
  });

  it('rechaza digito verificador incorrecto y formatos invalidos', () => {
    const invalidos = ['11.111.111-2', '12.345.678-K', '12345', 'abc', ''];

    invalidos.forEach((rut) => {
      expect(validarRut(rut)).toBe(false);
    });
  });
});