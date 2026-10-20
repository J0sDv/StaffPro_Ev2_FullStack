import { ROLES } from '../data/db';
import { limpiarRut } from './validaciones';
 
// Devuelve las tarjetas de metricas que se muestran en el Panel segun el rol.
export function estadisticasPorRol(rol, usuario, datos) {
  const { usuarios = [], trabajadores = [], solicitudes = [], asistencias = [] } = datos;
 
  const disponibles = trabajadores.filter((t) => t.estado === 'Disponible').length;
  const enTurno = trabajadores.filter((t) => t.estado === 'En turno').length;
 
  switch (rol) {
    case ROLES.ADMIN:
      return [
        { titulo: 'Usuarios', valor: usuarios.length, icono: 'bi-person-gear' },
        { titulo: 'Trabajadores', valor: trabajadores.length, icono: 'bi-people' },
        { titulo: 'Solicitudes', valor: solicitudes.length, icono: 'bi-file-earmark-text' },
        { titulo: 'Marcajes', valor: asistencias.length, icono: 'bi-clipboard-check' },
      ];
 
    case ROLES.RRHH:
      return [
        { titulo: 'Trabajadores', valor: trabajadores.length, icono: 'bi-people' },
        { titulo: 'En turno', valor: enTurno, icono: 'bi-person-workspace' },
        { titulo: 'Disponibles', valor: disponibles, icono: 'bi-person-check' },
        { titulo: 'Marcajes registrados', valor: asistencias.length, icono: 'bi-clipboard-check' },
      ];
 
    case ROLES.COORDINADOR:
      return [
        { titulo: 'Solicitudes por atender', valor: solicitudes.filter((s) => s.estado === 'Solicitado' || s.estado === 'En seleccion').length, icono: 'bi-inbox' },
        { titulo: 'Trabajadores disponibles', valor: disponibles, icono: 'bi-person-check' },
        { titulo: 'Trabajadores en turno', valor: enTurno, icono: 'bi-person-workspace' },
        { titulo: 'Solicitudes totales', valor: solicitudes.length, icono: 'bi-file-earmark-text' },
      ];
 
    case ROLES.RECLUTADOR:
      return [
        { titulo: 'Trabajadores registrados', valor: trabajadores.length, icono: 'bi-person-vcard' },
        { titulo: 'Disponibles', valor: disponibles, icono: 'bi-person-check' },
        { titulo: 'En turno', valor: enTurno, icono: 'bi-person-workspace' },
        { titulo: 'Especialidades', valor: new Set(trabajadores.map((t) => t.especialidad)).size, icono: 'bi-tools' },
      ];
 
    case ROLES.CLIENTE: {
      const mias = solicitudes.filter((s) => s.usuarioId === usuario?.id);
      return [
        { titulo: 'Mis solicitudes', valor: mias.length, icono: 'bi-file-earmark-text' },
        { titulo: 'En servicio', valor: mias.filter((s) => s.estado === 'En servicio').length, icono: 'bi-person-workspace' },
        { titulo: 'Finalizadas', valor: mias.filter((s) => s.estado === 'Finalizado').length, icono: 'bi-check-circle' },
        { titulo: 'Personal asignado', valor: trabajadores.filter((t) => t.cliente === usuario?.empresa).length, icono: 'bi-people' },
      ];
    }
 
    case ROLES.TRABAJADOR: {
      const rut = limpiarRut(usuario?.rut);
      const yo = trabajadores.find((t) => limpiarRut(t.rut) === rut);
      return [
        { titulo: 'Mis marcajes', valor: asistencias.filter((a) => limpiarRut(a.rut) === rut).length, icono: 'bi-clipboard-check' },
        { titulo: 'Mi estado', valor: yo?.estado ?? 'Sin ficha', icono: 'bi-person-check' },
        { titulo: 'Cliente actual', valor: yo?.cliente ?? 'Sin asignar', icono: 'bi-building' },
      ];
    }
 
    default:
      return [];
  }
}
