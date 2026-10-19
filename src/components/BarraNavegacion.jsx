import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { MENU_PUBLICO } from '../config/menus';
 
export default function BarraNavegacion() {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" collapseOnSelect className="navbar-staffpro">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          Staff<span className="text-accent">Pro</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
 
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center">
            {MENU_PUBLICO.map((item) => (
              <Nav.Link key={item.to} as={NavLink} to={item.to} eventKey={item.to} end={item.to === '/'}>
                {item.label}
              </Nav.Link>
            ))}
 
            <div className="d-flex gap-2 mt-2 mt-lg-0 ms-lg-3">
              <Button as={Link} to="/acceso" variant="outline-light" size="sm">Iniciar Sesion</Button>
              <Button as={Link} to="/acceso" variant="accent" size="sm">Crear Cuenta</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

