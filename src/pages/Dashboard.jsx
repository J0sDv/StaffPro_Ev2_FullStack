import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ReporteHoras from '../components/ReporteHoras';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { MENUS } from '../config/menus';
import { listar, ROLES } from '../data/db';
import { estadisticasPorRol } from '../utils/estadisticas';
 
// Panel de inicio
export default function Dashboard() {
  const { usuario } = useAuth();
 
  const datos = {
    usuarios: listar('usuarios'),
    trabajadores: listar('trabajadores'),
    solicitudes: listar('solicitudes'),
    asistencias: listar('asistencias'),
  };
 
  const estadisticas = estadisticasPorRol(usuario.rol, usuario, datos);
  const accesos = (MENUS[usuario.rol] ?? []).filter((m) => m.descripcion);
 
  return (
    <>
      <PageHeader titulo={`Hola, ${usuario.nombre}`} subtitulo={`Panel de ${usuario.rol}`} />
 
      <Container className="my-5">
        <Row className="g-4 text-center mb-5">
          {estadisticas.map((e) => (
            <Col key={e.titulo} xs={6} lg={3}>
              <StatCard {...e} />
            </Col>
          ))}
        </Row>
 
        {accesos.length > 0 && <h2 className="h5 fw-bold mb-3">Accesos rapidos</h2>}
        <Row className="g-4">
          {accesos.map((a) => (
            <Col key={a.to} xs={12} md={6} lg={3}>
              <Card as={Link} to={a.to} className="panel-card shadow-sm h-100">
                <Card.Body>
                  <i className={`bi ${a.icono} panel-icono`}></i>
                  <h3 className="h6 fw-bold mt-2">{a.label}</h3>
                  <p className="small text-muted mb-0">{a.descripcion}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
 
        {/* Reporte de horas y costos solo para RR.HH. y Administrador */}
        {[ROLES.RRHH, ROLES.ADMIN].includes(usuario.rol) && <ReporteHoras />}
      </Container>
    </>
  );
}


