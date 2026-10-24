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
  [ROLES.RECLUTADOR]: [
    INICIO, PANEL,
    { to: '/trabajadores', label: 'Trabajadores', icono: 'bi-person-vcard', descripcion: 'Registra, edita y elimina trabajadores externos.' },
  ],
  [ROLES.COORDINADOR]: [
    INICIO, PANEL,
    { to: '/gestion', label: 'Gestion de Personal', icono: 'bi-diagram-3', descripcion: 'Actualiza solicitudes y asigna trabajadores a clientes.' },
  ],
  [ROLES.TRABAJADOR]: [
    INICIO, PANEL,
    { to: '/asistencia', label: 'Marcar Asistencia', icono: 'bi-phone', descripcion: 'Registra tu entrada o salida desde el celular.' },
  ],
  [ROLES.RRHH]: [INICIO, PANEL],
  [ROLES.ADMIN]: [
    INICIO, PANEL,
    { to: '/usuarios', label: 'Usuarios', icono: 'bi-person-gear', descripcion: 'Crea, edita y elimina cuentas y roles.' },
    { to: '/trabajadores', label: 'Trabajadores', icono: 'bi-person-vcard', descripcion: 'Administra el catalogo de trabajadores.' },
  ],
};


