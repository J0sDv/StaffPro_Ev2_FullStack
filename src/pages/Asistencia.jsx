import { Fragment, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import CampoForm from '../components/CampoForm';
import useFormulario from '../hooks/useFormulario';
import useColeccion from '../hooks/useColeccion';
import { useAuth } from '../context/AuthContext';
import { fechaHoy, horaAhora } from '../utils/formato';
import { limpiarRut, validarMarcaje } from '../utils/validaciones';
 
// Pensada para celular
export default function Asistencia() {
  const { usuario } = useAuth();
  const { datos: marcajes, agregar } = useColeccion('asistencias');
  const [tipo, setTipo] = useState('Entrada');
  const [confirmacion, setConfirmacion] = useState('');
 
  const { datos, errores, handleChange, handleSubmit, reset } = useFormulario(
    { rut: usuario.rut, fecha: fechaHoy(), hora: horaAhora() },
    validarMarcaje
  );
 
  const registrar = (valores) => {
    agregar({ rut: valores.rut.trim(), fecha: valores.fecha, hora: valores.hora, tipo });
    setConfirmacion(`Marcaje de ${tipo.toLowerCase()} registrado correctamente a las ${valores.hora} hrs.`);
    reset({ rut: usuario.rut, fecha: fechaHoy(), hora: horaAhora() });
  };
 
  const misMarcajes = marcajes
    .filter((m) => limpiarRut(m.rut) === limpiarRut(usuario.rut))
    .sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`))
    .slice(0, 5);
 
  return (
    <>
      <PageHeader titulo="Registro de Asistencia" subtitulo="Marca tu entrada o salida. Solo toma unos segundos." />
 
      <Container as="section" className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5}>
            <Card as="article" className="shadow-sm border-0 form-card mb-4">
              <Card.Body className="p-4">
                {confirmacion && <Alert variant="success">{confirmacion}</Alert>}
 
                <Form noValidate onSubmit={handleSubmit(registrar)}>
                  <CampoForm id="rut" label="RUT" size="lg" value={datos.rut} onChange={handleChange} error={errores.rut} />
                  <CampoForm id="fecha" label="Fecha" type="date" size="lg" value={datos.fecha} onChange={handleChange} error={errores.fecha} />
                  <CampoForm id="hora" label="Hora" type="time" size="lg" value={datos.hora} onChange={handleChange} error={errores.hora} />
 
                  <fieldset className="mb-4">
                    <legend className="form-label mb-2 fs-6">Tipo de marcaje</legend>
                    <div className="btn-group w-100" role="group" aria-label="Tipo de marcaje">
                      {['Entrada', 'Salida'].map((t) => (
                        <Fragment key={t}>
                          <input type="radio" className="btn-check" name="tipoMarcaje" id={`marcaje${t}`}
                            autoComplete="off" checked={tipo === t} onChange={() => setTipo(t)} />
                          <label className="btn btn-outline-accent" htmlFor={`marcaje${t}`}>{t}</label>
                        </Fragment>
                      ))}
                    </div>
                  </fieldset>
 
                  <Button type="submit" variant="accent" size="lg" className="w-100">Registrar marcaje</Button>
                </Form>
              </Card.Body>
            </Card>
 
            <h2 className="h6 text-uppercase text-muted fw-bold mb-3">Mis ultimos marcajes</h2>
            {misMarcajes.length === 0 ? (
              <p className="text-muted small">Aun no hay marcajes registrados.</p>
            ) : (
              <ul className="list-unstyled">
                {misMarcajes.map((m) => (
                  <li key={m.id} className={`marcaje-item ${m.tipo === 'Salida' ? 'salida' : ''}`}>
                    <strong>{m.tipo}</strong> — {m.rut}
                    <br />
                    <span className="text-muted">{m.fecha} · {m.hora} hrs</span>
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
