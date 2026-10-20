import { listar, crear } from '../data/db';
import { fechaHoy } from '../utils/formato';
 
// Logica de negocio de una solicitud de personal.
// Si la especialidad no tiene suficientes trabajadores disponibles, devuelve ok:false
export function registrarSolicitud(datos, usuario) {
  const cantidad = Number(datos.cantidad);
 
  if (datos.especialidad !== 'Otro') {
    const disponibles = listar('trabajadores').filter(
      (t) => t.especialidad === datos.especialidad && t.estado === 'Disponible'
    ).length;
 
    if (cantidad > disponibles) {
      return {
        ok: false,
        disponibles,
        motivo: `Solo hay ${disponibles} trabajador(es) disponible(s) para "${datos.especialidad}" y solicitaste ${cantidad}.`,
      };
    }
  }
 
  const solicitud = crear('solicitudes', {
    ...datos,
    cantidad,
    usuarioId: usuario.id,
    estado: 'Solicitado',
    fechaCreacion: fechaHoy(),
  });
  return { ok: true, solicitud };
}
