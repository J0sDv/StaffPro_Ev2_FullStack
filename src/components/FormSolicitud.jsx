import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import CampoForm from './CampoForm';
import useFormulario from '../hooks/useFormulario';
import { useAuth } from '../context/AuthContext';
import { registrarSolicitud } from '../services/solicitudes';
import { TIPOS_CONTRATO } from '../data/db';
import { ESPECIALIDADES } from '../data/contenido';
import { fechaHoy } from '../utils/formato';
import { validarSolicitud } from '../utils/validaciones';
 
const OPCIONES_CONTRATO = TIPOS_CONTRATO.map((c) => ({ value: c.codigo, label: `${c.codigo} - ${c.nombre} (${c.duracion})` }));
const OPCIONES_ESPECIALIDAD = [
  ...ESPECIALIDADES.map((e) => ({ value: e, label: e })),
  { value: 'Otro', label: 'Otro (especificar en comentarios)' },
];
 
// Formulario de solicitud de personal. onResultado recibe lo que devuelve el servicio (exito o error).
export default function FormSolicitud({ onResultado }) {
  const { usuario } = useAuth();
  const hoy = fechaHoy();
 
  // Los datos del cliente se autocompletan con la sesion
  const inicial = {
    empresa: usuario.empresa ?? '',
    contacto: usuario.nombre,
    correo: usuario.correo,
    telefono: usuario.telefono,
    tipoContrato: '',
    especialidad: '',
    cantidad: 1,
    fechaInicio: '',
    fechaTermino: '',
    comentarios: '',
  };
 
  const { datos, errores, handleChange, handleSubmit, reset } = useFormulario(inicial, (d) => validarSolicitud(d, hoy));
 
  const enviar = (valores) => onResultado(registrarSolicitud(valores, usuario));
 
  return (
    <Card as="article" className="shadow-sm border-0 form-card">
      <Card.Body className="p-4 p-md-5">
        <Form noValidate onSubmit={handleSubmit(enviar)}>
          <fieldset className="mb-4">
            <legend className="h6 text-uppercase text-accent fw-bold">Datos del solicitante</legend>
            <Row>
              <Col md={6}><CampoForm id="empresa" label="Empresa cliente" placeholder="Ej: Construccion SA" value={datos.empresa} onChange={handleChange} error={errores.empresa} /></Col>
              <Col md={6}><CampoForm id="contacto" label="Nombre de contacto" placeholder="Ej: Pedro Fuentes" value={datos.contacto} onChange={handleChange} error={errores.contacto} /></Col>
              <Col md={6}><CampoForm id="correo" label="Correo electronico" type="email" value={datos.correo} onChange={handleChange} error={errores.correo} /></Col>
              <Col md={6}><CampoForm id="telefono" label="Telefono" type="tel" placeholder="+56 9 1234 5678" value={datos.telefono} onChange={handleChange} error={errores.telefono} /></Col>
            </Row>
          </fieldset>
 
          <fieldset className="mb-4">
            <legend className="h6 text-uppercase text-accent fw-bold">Detalle del requerimiento</legend>
            <Row>
              <Col md={6}>
                <CampoForm id="tipoContrato" label="Tipo de contrato" opciones={OPCIONES_CONTRATO} placeholder="Selecciona un tipo de contrato"
                  value={datos.tipoContrato} onChange={handleChange} error={errores.tipoContrato} />
              </Col>
              <Col md={6}>
                <CampoForm id="especialidad" label="Especialidad requerida" opciones={OPCIONES_ESPECIALIDAD} placeholder="Selecciona una especialidad"
                  value={datos.especialidad} onChange={handleChange} error={errores.especialidad} />
              </Col>
              <Col md={4}><CampoForm id="cantidad" label="Cantidad de personal" type="number" min={1} max={50} value={datos.cantidad} onChange={handleChange} error={errores.cantidad} /></Col>
              <Col md={4}><CampoForm id="fechaInicio" label="Fecha de inicio" type="date" min={hoy} value={datos.fechaInicio} onChange={handleChange} error={errores.fechaInicio} /></Col>
              <Col md={4}><CampoForm id="fechaTermino" label="Fecha de termino" type="date" min={datos.fechaInicio || hoy} value={datos.fechaTermino} onChange={handleChange} error={errores.fechaTermino} /></Col>
              <Col xs={12}>
                <CampoForm id="comentarios" label="Comentarios adicionales" as="textarea" rows={3} maxLength={500}
                  placeholder="Detalles del turno, ubicacion del trabajo, requisitos especificos, etc."
                  value={datos.comentarios} onChange={handleChange} error={errores.comentarios}
                  ayuda={`${datos.comentarios.length}/500 caracteres.`} />
              </Col>
            </Row>
          </fieldset>
 
          <div className="d-flex justify-content-end gap-2">
            <Button type="button" variant="outline-secondary" onClick={() => reset()}>Limpiar</Button>
            <Button type="submit" variant="accent">Enviar solicitud</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
