import { Container, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import ReporteHoras from '../components/ReporteHoras';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { listar, ROLES } from '../data/db';
import { estadisticasPorRol } from '../utils/estadisticas';
 
// Panel de inicio, las metricas dependen del rol
export default function Dashboard() {
  const { usuario } = useAuth();
 
  const datos = {
    usuarios: listar('usuarios'),
    trabajadores: listar('trabajadores'),
    solicitudes: listar('solicitudes'),
    asistencias: listar('asistencias'),
  };
 
  const estadisticas = estadisticasPorRol(usuario.rol, usuario, datos);
 
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
 
        {/* Reporte de horas y costos solo para RR.HH y Administrador */}
        {[ROLES.RRHH, ROLES.ADMIN].includes(usuario.rol) && <ReporteHoras />}
      </Container>
    </>
  );
}

