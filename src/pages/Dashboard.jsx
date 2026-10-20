import { Container } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
 
// Version inicial del Panel
export default function Dashboard() {
  const { usuario } = useAuth();
 
  return (
    <>
      <PageHeader titulo={`Hola, ${usuario.nombre}`} subtitulo={`Panel de ${usuario.rol}`} />
 
      <Container className="my-5">
        <p className="text-muted mb-0">Tu sesion esta iniciada como {usuario.rol}.</p>
      </Container>
    </>
  );
}
