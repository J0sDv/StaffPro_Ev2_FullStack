import { ROLES } from '../data/db';
 
// Menu de visitantes (sin sesion iniciada)
export const MENU_PUBLICO = [
  { to: '/', label: 'Inicio' },
];
 
const INICIO = { to: '/', label: 'Inicio' };
const PANEL = { to: '/panel', label: 'Panel' };
 
// Menu por rol. Por ahora todos ven Inicio y Panel;
export const MENUS = {
  [ROLES.CLIENTE]: [INICIO, PANEL],
  [ROLES.RECLUTADOR]: [INICIO, PANEL],
  [ROLES.COORDINADOR]: [INICIO, PANEL],
  [ROLES.TRABAJADOR]: [INICIO, PANEL],
  // El reporte de horas y costos se muestra dentro del Panel
  [ROLES.RRHH]: [INICIO, PANEL],
  [ROLES.ADMIN]: [INICIO, PANEL],
};
