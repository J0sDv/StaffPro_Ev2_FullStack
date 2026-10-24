import { useState } from 'react';
import { Row, Col, Form, Table } from 'react-bootstrap';
import useColeccion from '../hooks/useColeccion';
import { ESTADOS_SOLICITUD } from '../data/db';
import { codigoSolicitud, formatearFecha } from '../utils/formato';
 
// El coordinador revisa las solicitudes de los clientes y actualiza su estado.
export default function PanelSolicitudes() {
  const { datos, modificar } = useColeccion('solicitudes');
  const [filtro, setFiltro] = useState('todos');
 
  const visibles = datos.filter((s) => filtro === 'todos' || s.estado === filtro);
 
  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Label htmlFor="filtroEstadoSolicitud">Filtrar por estado</Form.Label>
          <Form.Select id="filtroEstadoSolicitud" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos los estados</option>
            {ESTADOS_SOLICITUD.map((e) => <option key={e} value={e}>{e}</option>)}
          </Form.Select>
        </Col>
      </Row>
 
      {visibles.length === 0 ? (
        <p className="text-center text-muted py-5">No hay solicitudes para mostrar.</p>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <Table hover className="align-middle mb-0">
            <thead className="table-header-staffpro">
              <tr><th>Codigo</th><th>Empresa</th><th>Especialidad</th><th>Cant.</th><th>Periodo</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {visibles.map((s) => (
                <tr key={s.id}>
                  <td>{codigoSolicitud(s.id)}</td>
                  <td>{s.empresa}<div className="small text-muted">{s.contacto}</div></td>
                  <td>{s.especialidad}</td>
                  <td>{s.cantidad}</td>
                  <td className="text-nowrap">{formatearFecha(s.fechaInicio)} - {formatearFecha(s.fechaTermino)}</td>
                  <td style={{ minWidth: 170 }}>
                    <Form.Select size="sm" aria-label={`Estado de ${codigoSolicitud(s.id)}`} value={s.estado}
                      onChange={(e) => modificar(s.id, { estado: e.target.value })}>
                      {ESTADOS_SOLICITUD.map((e) => <option key={e} value={e}>{e}</option>)}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
