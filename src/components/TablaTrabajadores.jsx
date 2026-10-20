import { Table } from 'react-bootstrap';
import EstadoBadge from './EstadoBadge';
import { formatoCLP } from '../utils/formato';
 
// Tabla reutilizable de trabajadores.
export default function TablaTrabajadores({ trabajadores, renderAcciones }) {
  if (trabajadores.length === 0) {
    return <p className="text-center text-muted py-4 mb-0">No se encontraron trabajadores.</p>;
  }
 
  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0">
        <thead className="table-header-staffpro">
          <tr>
            <th scope="col">RUT</th>
            <th scope="col">Nombre</th>
            <th scope="col">Especialidad</th>
            <th scope="col">Valor hora</th>
            <th scope="col">Cliente actual</th>
            <th scope="col">Estado</th>
            {renderAcciones && <th scope="col" className="text-end">Accion</th>}
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((t) => (
            <tr key={t.id}>
              <td>{t.rut}</td>
              <td>{t.nombre}</td>
              <td>{t.especialidad}</td>
              <td>{formatoCLP(t.valorHora)}</td>
              <td>{t.cliente}</td>
              <td><EstadoBadge estado={t.estado} /></td>
              {renderAcciones && <td className="text-end text-nowrap">{renderAcciones(t)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
