import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MENU_PUBLICO, MENUS } from '../config/menus';
 
export default function BarraNavegacion() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
 
  // El menu cambia segun el rol del usuario con sesion iniciada
  const items = usuario ? MENUS[usuario.rol] ?? [] : MENU_PUBLICO;
 
  const cerrarSesion = () => {
    logout();
    navigate('/');
  };
 
  return (
    <Navbar expand="lg" variant="dark" sticky="top" collapseOnSelect className="navbar-staffpro">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          Staff<span className="text-accent">Pro</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
 
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center">
            {items.map((item) => (
              <Nav.Link key={item.to} as={NavLink} to={item.to} eventKey={item.to} end={item.to === '/'}>
                {item.label}
              </Nav.Link>
            ))}
 
            {usuario ? (
              <NavDropdown
                align="end"
                id="menu-usuario"
                title={<><i className="bi bi-person-circle me-1"></i>{usuario.nombre}</>}
              >
                <NavDropdown.Header>{usuario.rol}</NavDropdown.Header>
                <NavDropdown.Item onClick={cerrarSesion}>Cerrar sesion</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2 mt-2 mt-lg-0 ms-lg-3">
                <Button as={Link} to="/acceso" variant="outline-light" size="sm">Iniciar Sesion</Button>
                <Button as={Link} to="/acceso" state={{ pestana: 'registro' }} variant="accent" size="sm">Crear Cuenta</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

