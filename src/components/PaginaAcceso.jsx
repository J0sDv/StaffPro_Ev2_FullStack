import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
// Contenedor visual de Iniciar sesion y Registro
export default function PaginaAcceso({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 pagina-sesion">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={11} sm={9} md={7} lg={5}>
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <span className="logo-sesion fw-bold">Staff<span className="text-accent">Pro</span></span>
                </Link>
                <p className="text-white-50 mb-0 mt-1">Gestion de Recursos Humanos</p>
              </div>
 
              <Card as="article" className="shadow border-0 form-card">
                <Card.Body className="p-4 p-md-5">
                  {children}
                </Card.Body>
              </Card>
 
              <p className="text-center text-white-50 small mt-4 mb-0">
                &copy; 2026 StaffPro - Gestion de Recursos Humanos
              </p>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
