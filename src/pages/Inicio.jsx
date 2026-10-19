import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import BeneficioCard from '../components/BeneficioCard';
import { ESTADISTICAS_HOME, PASOS, BENEFICIOS, EQUIPO, TESTIMONIOS } from '../data/contenido';
 
// Migracion del index.html: portada, estadisticas, equipo, pasos, beneficios y llamado a la accion.
export default function Inicio() {
  return (
    <>
      {/* HERO */}
      <header className="hero-section text-white">
        <Container className="py-5">
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h1 className="display-5 fw-bold mb-3">Gestion de personal externo, simple y en un solo lugar</h1>
              <p className="lead mb-4">
                Optimice la asignacion y el control de su personal operativo a traves de una plataforma digital centralizada y en tiempo real.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/solicitud" variant="accent" size="lg">Solicitar Personal</Button>
                <Button as={Link} to="/acceso" variant="outline-light" size="lg">Iniciar Sesion</Button>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="https://img.magnific.com/foto-gratis/hombre-casco-trabajando-logistica_23-2148886819.jpg"
                className="img-fluid rounded shadow hero-img"
                alt="Equipo de trabajadores de StaffPro"
              />
            </Col>
          </Row>
        </Container>
      </header>
 
      {/* ESTADISTICAS */}
      <Container as="section" className="my-5">
        <Row className="g-4 text-center">
          {ESTADISTICAS_HOME.map((e) => (
            <Col key={e.texto} xs={6} md={3}>
              <StatCard valor={e.valor} titulo={e.texto} />
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* PRESENTACION */}
      <Container as="section" className="my-5">
        <Row className="g-4 align-items-center">
          <Col lg={6}>
            <img
              src="https://www.rhlog.cl/assets/hero-people-logistics-OthGu5y2.jpg"
              className="img-fluid rounded shadow-sm"
              alt="Oficina de coordinacion StaffPro"
            />
          </Col>
          <Col lg={6}>
            <article>
              <h2 className="mb-3">¿Que es StaffPro?</h2>
              <p>
                StaffPro es una empresa chilena fundada en 2016, especialista en la gestion y provision de personal externo calificado para rubros clave como logistica,
                retail y construccion. Actualmente administramos un equipo de mas de 200 trabajadores distribuidos en 15 clientes corporativos.
              </p>
              <p>
                Nuestra mision es conectar de forma rapida a las empresas con el talento idoneo que necesitan para sus operaciones, ofreciendo un servicio integral
                que abarca desde la seleccion y asignacion de personal hasta el control de asistencia y la evaluacion de desempeño en terreno. A traves de nuestra plataforma digital, garantizamos transparencia,
                optimizacion de turnos y procesos eficientes tanto para nuestros clientes como para nuestros colaboradores.
              </p>
            </article>
          </Col>
        </Row>
      </Container>
 
      {/* NOSOTROS */}
      <Container as="section" className="my-5">
        <h2 className="text-center mb-4 fw-bold">Nuestro equipo interno</h2>
        <Row className="g-4 text-center">
          {EQUIPO.map((e) => (
            <Col key={e.titulo} xs={6} md={3}>
              <StatCard {...e} />
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* COMO FUNCIONA */}
      <Container as="section" className="my-5 py-3">
        <h2 className="text-center mb-2 fw-bold">¿Como funciona?</h2>
        <p className="text-center text-muted mb-5">Tres pasos simples para tener a tu equipo operando</p>
        <Row className="g-4">
          {PASOS.map((p) => (
            <Col key={p.numero} md={4}>
              <div className="text-center px-3">
                <div className="paso-numero mx-auto mb-3">{p.numero}</div>
                <i className={`bi ${p.icono} paso-icono mb-3`}></i>
                <h3 className="h5 fw-bold">{p.titulo}</h3>
                <p className="text-muted mb-0">{p.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* BENEFICIOS */}
      <section className="beneficios-section py-5 my-5">
        <Container>
          <h2 className="text-center mb-2 fw-bold">Por que elegir StaffPro</h2>
          <p className="text-center text-muted mb-5">Todo lo que necesitas para gestionar personal externo, en un solo lugar</p>
          <Row className="g-4">
            {BENEFICIOS.map((b) => (
              <Col key={b.titulo} md={6} lg={4}>
                <BeneficioCard {...b} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
 
      {/* TESTIMONIOS */}
      <Container as="section" className="my-5 py-3">
        <h2 className="text-center mb-5 fw-bold">Lo que dicen nuestros clientes</h2>
        <Row className="g-4">
          {TESTIMONIOS.map((t) => (
            <Col key={t.nombre} md={4}>
              <Card as="article" className="h-100 border-0 shadow-sm testimonio-card">
                <Card.Body className="p-4">
                  <i className="bi bi-quote testimonio-icono mb-2"></i>
                  <p className="fst-italic mb-4">"{t.texto}"</p>
                  <p className="fw-bold mb-0">{t.nombre}</p>
                  <p className="text-muted small mb-0">{t.cargo}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* CTA FINAL */}
      <section className="cta-final text-white text-center py-5">
        <Container>
          <h2 className="fw-bold mb-3">¿Listo para optimizar tu gestion de personal?</h2>
          <p className="lead mb-4">Solicita personal calificado hoy mismo y dejanos el resto.</p>
          <Button as={Link} to="/solicitud" variant="accent" size="lg">Solicitar Personal Ahora</Button>
        </Container>
      </section>
    </>
  );
}

