import { Container } from 'react-bootstrap';
 
export default function Footer() {
  return (
    <footer className="py-4 footer-staffpro text-white text-center mt-auto">
      <Container>
        <small>&copy; 2026 StaffPro - Gestion de Recursos Humanos</small>
        <p className="mb-1">
          <a href="mailto:staffpro@gmail.com" className="text-white text-decoration-none opacity-75">
            staffpro@gmail.com
          </a>
        </p>
      </Container>
    </footer>
  );
}

