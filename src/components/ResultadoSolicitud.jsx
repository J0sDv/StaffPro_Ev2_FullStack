import { Card, Row, Col, Button } from 'react-bootstrap';
import { TIPOS_CONTRATO } from '../data/db';
import { codigoSolicitud, formatearFecha } from '../utils/formato';
 
// Muestra el resultado de enviar una solicitud: registrada (ok) o con error (disponibilidad insuficiente).
export default function ResultadoSolicitud({ resultado, onIntentarOtra, onVerSolicitudes }) {
  if (!resultado.ok) {
    return (
      <Card className="shadow-sm border-0 form-card">
        <Card.Body className="p-4 p-md-5 text-center">
          <h2 className="h3 fw-bold text-danger">
            <i className="bi bi-x-circle me-2"></i>No se pudo registrar la solicitud
          </h2>
          <p className="mt-3">{resultado.motivo}</p>
          <p className="text-muted">Ajusta la cantidad, elige otra especialidad o intentalo mas tarde.</p>
          <Button variant="accent" onClick={onIntentarOtra}>Volver a intentar</Button>
        </Card.Body>
      </Card>
    );
  }
 
  const s = resultado.solicitud;
  const contrato = TIPOS_CONTRATO.find((c) => c.codigo === s.tipoContrato);
 
  return (
    <Card className="shadow-sm border-0 form-card">
      <Card.Body className="p-4 p-md-5">
        <h2 className="h3 fw-bold text-success">
          <i className="bi bi-check-circle me-2"></i>Solicitud enviada
        </h2>
        <p className="text-muted">
          Codigo: <strong>{codigoSolicitud(s.id)}</strong> · Estado: <strong>{s.estado}</strong>
        </p>
 
        <Row className="g-2 mb-4">
          <Col sm={6}><strong>Empresa:</strong> {s.empresa}</Col>
          <Col sm={6}><strong>Contacto:</strong> {s.contacto}</Col>
          <Col sm={6}><strong>Especialidad:</strong> {s.especialidad}</Col>
          <Col sm={6}><strong>Cantidad:</strong> {s.cantidad}</Col>
          <Col sm={6}><strong>Contrato:</strong> {contrato ? `${contrato.codigo} - ${contrato.nombre}` : s.tipoContrato}</Col>
          <Col sm={6}><strong>Periodo:</strong> {formatearFecha(s.fechaInicio)} al {formatearFecha(s.fechaTermino)}</Col>
        </Row>
 
        <div className="d-flex flex-wrap gap-2">
          <Button variant="outline-secondary" onClick={onIntentarOtra}>Nueva solicitud</Button>
          <Button variant="accent" onClick={onVerSolicitudes}>Ver mis solicitudes</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
