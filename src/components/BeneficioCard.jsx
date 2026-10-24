import { Card } from 'react-bootstrap';
 
export default function BeneficioCard({ icono, titulo, texto }) {
  return (
    <Card as="article" className="h-100 shadow-sm benefit-card border-0">
      <Card.Body className="text-center p-4">
        <div className="benefit-icono mx-auto mb-3">
          <i className={`bi ${icono}`}></i>
        </div>
        <Card.Title as="h3" className="h5 fw-bold mb-3">{titulo}</Card.Title>
        <Card.Text className="text-muted mb-0">{texto}</Card.Text>
      </Card.Body>
    </Card>
  );
}
