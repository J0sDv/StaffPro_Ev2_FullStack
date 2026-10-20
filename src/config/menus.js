import { ROLES } from '../data/db';
 
// Menu de visitantes sin sesion iniciada
export const MENU_PUBLICO = [
  { to: '/', label: 'Inicio' },
];
 
const INICIO = { to: '/', label: 'Inicio' };
const PANEL = { to: '/panel', label: 'Panel' };
 
// Menu por rol.
export const MENUS = {
  [ROLES.CLIENTE]: [
    INICIO, PANEL,
    { to: '/solicitud', label: 'Solicitar Personal', icono: 'bi-file-earmark-plus', descripcion: 'Pide personal y revisa el estado de tus solicitudes.' },
  ],
  [ROLES.RECLUTADOR]: [INICIO, PANEL],
  [ROLES.COORDINADOR]: [
    INICIO, PANEL,
    { to: '/gestion', label: 'Gestion de Personal', icono: 'bi-diagram-3', descripcion: 'Actualiza solicitudes y asigna trabajadores a clientes.' },
  ],
  [ROLES.TRABAJADOR]: [INICIO, PANEL],
  // El reporte de horas y costos se muestra dentro del Panel
  [ROLES.RRHH]: [INICIO, PANEL],
  [ROLES.ADMIN]: [INICIO, PANEL],
};

