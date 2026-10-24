import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
export default function NoEncontrado() {
  return (
    <Container className="text-center my-5 py-5">
      <h1 className="display-3 fw-bold text-accent">404</h1>
      <p className="lead">La pagina que buscas no existe.</p>
      <Button as={Link} to="/" variant="accent">Volver al inicio</Button>
    </Container>
  );
}

