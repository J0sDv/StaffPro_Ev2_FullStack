const CLASES = {
  'Disponible': 'badge-disponible',
  'En turno': 'badge-en-turno',
};
 
export default function EstadoBadge({ estado }) {
  return <span className={`badge ${CLASES[estado] ?? 'badge-estado'}`}>{estado}</span>;
}
