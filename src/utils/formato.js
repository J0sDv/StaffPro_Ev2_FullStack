const nf = new Intl.NumberFormat('es-CL');
 
export const formatoCLP = (n) => `$${nf.format(Number(n) || 0)}`;
 
export const codigoSolicitud = (id) => `SOL-${String(id).padStart(4, '0')}`;
 
// Fecha local en formato YYYY-MM-DD
export function fechaHoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}
 
export function formatearFecha(iso) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

