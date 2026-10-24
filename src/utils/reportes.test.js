import { describe, it, expect } from 'vitest';
import { calcularHoras, costosPorTrabajador } from './reportes';

const asistencias = [
  { id: 1, rut: '11.111.111-1', fecha: '2026-10-14', hora: '08:00', tipo: 'Entrada' },
  { id: 2, rut: '11.111.111-1', fecha: '2026-10-14', hora: '17:00', tipo: 'Salida' },
  { id: 3, rut: '11.111.111-1', fecha: '2026-10-15', hora: '08:05', tipo: 'Entrada' },
  { id: 4, rut: '11.111.111-1', fecha: '2026-10-15', hora: '17:10', tipo: 'Salida' },
];

describe('calcularHoras', () => {
  it('suma primera entrada y ultima salida de cada dia por RUT', () => {
    const horas = calcularHoras(asistencias);
    expect(horas['111111111']).toBeCloseTo(18.0833, 3);
  });
});

describe('costosPorTrabajador', () => {
  it('calcula horas x valor hora y omite a quien no tiene marcajes', () => {
    const trabajadores = [
      { id: 1, rut: '11.111.111-1', nombre: 'Juan Perez', valorHora: 12000, cliente: 'Construccion SA' },
      { id: 3, rut: '33.333.333-3', nombre: 'Carlos Silva', valorHora: 14000, cliente: 'Sin asignar' },
    ];

    const filas = costosPorTrabajador(trabajadores, asistencias);
    expect(filas).toHaveLength(1);
    expect(filas[0].nombre).toBe('Juan Perez');
    expect(filas[0].costo).toBe(217000);
  });
});