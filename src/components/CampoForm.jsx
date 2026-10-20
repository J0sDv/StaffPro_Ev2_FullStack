import { Form } from 'react-bootstrap';
 
// Campo de formulario reutilizable (input, select o textarea) con mensaje de error.
export default function CampoForm({ id, name = id, label, error, ayuda, opciones, placeholder, ...props }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
 
      {opciones ? (
        <Form.Select name={name} isInvalid={!!error} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {opciones.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control name={name} isInvalid={!!error} {...props} />
      )}
 
      <Form.Control.Feedback type="invalid" className={error ? 'd-block' : ''}>
        {error}
      </Form.Control.Feedback>
      {ayuda && <Form.Text muted>{ayuda}</Form.Text>}
    </Form.Group>
  );
}
