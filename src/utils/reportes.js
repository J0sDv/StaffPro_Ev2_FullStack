import { limpiarRut } from './validaciones';
 
const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
 
// Suma horas por RUT: para cada dia toma la primera Entrada y la ultima Salida.
export function calcularHoras(asistencias) {
  const porDia = {};
  asistencias.forEach((m) => {
    const clave = `${limpiarRut(m.rut)}|${m.fecha}`;
    (porDia[clave] ??= []).push(m);
  });
 
  const horasPorRut = {};
  Object.entries(porDia).forEach(([clave, marcas]) => {
    const rut = clave.split('|')[0];
    const entradas = marcas.filter((m) => m.tipo === 'Entrada').map((m) => m.hora).sort();
    const salidas = marcas.filter((m) => m.tipo === 'Salida').map((m) => m.hora).sort();
    if (entradas.length === 0 || salidas.length === 0) return;
 
    const horas = (aMinutos(salidas[salidas.length - 1]) - aMinutos(entradas[0])) / 60;
    if (horas > 0) horasPorRut[rut] = (horasPorRut[rut] ?? 0) + horas;
  });
  return horasPorRut;
}
 
// Horas y costo estimado por trabajador (horas x valor hora)
export function costosPorTrabajador(trabajadores, asistencias) {
  const horasPorRut = calcularHoras(asistencias);
  return trabajadores
    .map((t) => {
      const horas = horasPorRut[limpiarRut(t.rut)] ?? 0;
      return { ...t, horas, costo: Math.round(horas * t.valorHora) };
    })
    .filter((t) => t.horas > 0);
}
 
// Totales agrupados por cliente
export function totalesPorCliente(filas) {
  const grupos = {};
  filas.forEach((f) => {
    const g = (grupos[f.cliente] ??= { cliente: f.cliente, horas: 0, costo: 0 });
    g.horas += f.horas;
    g.costo += f.costo;
  });
  return Object.values(grupos);
}
