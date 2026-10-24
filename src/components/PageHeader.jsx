import { Container } from 'react-bootstrap';
 
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <header className="page-header text-white">
      <Container className="py-4">
        <h1 className="fw-bold mb-2">{titulo}</h1>
        {subtitulo && <p className="lead mb-0">{subtitulo}</p>}
        {children}
      </Container>
    </header>
  );
}
