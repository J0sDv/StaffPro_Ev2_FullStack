import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
export default function Inicio() {
  return (
    <header className="hero-section text-white">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col lg={8}>
            <h1 className="display-5 fw-bold mb-3">Gestion de personal externo, simple y en un solo lugar</h1>
            <p className="lead mb-4">
              Optimice la asignacion y el control de su personal operativo a traves de una plataforma digital centralizada y en tiempo real.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button as={Link} to="/solicitud" variant="accent" size="lg">Solicitar Personal</Button>
              <Button as={Link} to="/acceso" variant="outline-light" size="lg">Iniciar Sesion</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

