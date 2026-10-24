import { useState } from 'react';
import { Container, Tabs, Tab, Table } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import FormSolicitud from '../components/FormSolicitud';
import ResultadoSolicitud from '../components/ResultadoSolicitud';
import EstadoBadge from '../components/EstadoBadge';
import useColeccion from '../hooks/useColeccion';
import { useAuth } from '../context/AuthContext';
import { DESCRIPCION_ESTADO, TIPOS_CONTRATO } from '../data/db';
import { codigoSolicitud, formatearFecha } from '../utils/formato';
 
// Una vista para el cliente: pestaña "Nueva solicitud" (con su resultado) y pestaña "Mis solicitudes".
export default function SolicitudesCliente() {
  const { usuario } = useAuth();
  const { datos, recargar } = useColeccion('solicitudes');
  const [pestana, setPestana] = useState('nueva');
  const [resultado, setResultado] = useState(null);
 
  const mias = datos.filter((s) => s.usuarioId === usuario.id);
 
  const alRecibirResultado = (res) => {
    setResultado(res);
    recargar(); // la solicitud nueva ya esta guardada: refresca la lista
  };
 
  return (
    <>
      <PageHeader titulo="Solicitud de Personal" subtitulo="Pide personal externo y revisa el estado de tus requerimientos." />
 
      <Container className="my-5">
        <Tabs id="tabs-solicitudes" activeKey={pestana} onSelect={(k) => setPestana(k)} className="mb-4">
          <Tab eventKey="nueva" title="Nueva solicitud">
            {resultado ? (
              <ResultadoSolicitud
                resultado={resultado}
                onIntentarOtra={() => setResultado(null)}
                onVerSolicitudes={() => { setResultado(null); setPestana('mias'); }}
              />
            ) : (
              <FormSolicitud onResultado={alRecibirResultado} />
            )}
          </Tab>
 
          <Tab eventKey="mias" title={`Mis solicitudes (${mias.length})`}>
            {mias.length === 0 ? (
              <p className="text-center text-muted py-5">Aun no has realizado solicitudes.</p>
            ) : (
              <div className="table-responsive bg-white shadow-sm rounded">
                <Table hover className="align-middle mb-0">
                  <thead className="table-header-staffpro">
                    <tr><th>Codigo</th><th>Especialidad</th><th>Cant.</th><th>Contrato</th><th>Periodo</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {mias.map((s) => (
                      <tr key={s.id}>
                        <td>{codigoSolicitud(s.id)}</td>
                        <td>{s.especialidad}</td>
                        <td>{s.cantidad}</td>
                        <td>{TIPOS_CONTRATO.find((c) => c.codigo === s.tipoContrato)?.nombre ?? s.tipoContrato}</td>
                        <td className="text-nowrap">{formatearFecha(s.fechaInicio)} - {formatearFecha(s.fechaTermino)}</td>
                        <td>
                          <EstadoBadge estado={s.estado} />
                          <div className="small text-muted mt-1">{DESCRIPCION_ESTADO[s.estado]}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
