import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
 
export default function ModalAsignar({ trabajador, onConfirmar, onCerrar }) {
  const [cliente, setCliente] = useState('');
  const [error, setError] = useState('');
 
  // Cada vez que se elige otro trabajador, el formulario parte limpio
  useEffect(() => {
    setCliente('');
    setError('');
  }, [trabajador]);
 
  const enviar = (e) => {
    e.preventDefault();
    if (cliente.trim().length < 3) {
      setError('Ingresa el nombre del cliente (minimo 3 caracteres).');
      return;
    }
    onConfirmar(trabajador, cliente.trim());
  };
 
  return (
    <Modal show={!!trabajador} onHide={onCerrar} centered>
      <Form onSubmit={enviar} noValidate>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h5">Asignar trabajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Trabajador: <strong>{trabajador?.nombre} ({trabajador?.especialidad})</strong>
          </p>
          <Form.Group controlId="modalCliente">
            <Form.Label>Cliente al que se asigna</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Retail Center"
              value={cliente}
              isInvalid={!!error}
              onChange={(e) => { setCliente(e.target.value); setError(''); }}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCerrar}>Cancelar</Button>
          <Button type="submit" variant="accent">Confirmar asignacion</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
