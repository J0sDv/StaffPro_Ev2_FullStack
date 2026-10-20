import { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import CampoForm from './CampoForm';
import useFormulario from '../hooks/useFormulario';
import { useAuth } from '../context/AuthContext';
import { validarLogin } from '../utils/validaciones';
 
// Formulario de inicio de sesion.
export default function FormLogin({ onExito }) {
  const { login } = useAuth();
  const [errorSesion, setErrorSesion] = useState('');
  const [verPassword, setVerPassword] = useState(false);
 
  const { datos, errores, handleChange, handleSubmit } = useFormulario(
    { correo: '', rut: '', password: '' },
    validarLogin
  );
 
  const ingresar = (valores) => {
    const resultado = login(valores);
    if (!resultado.ok) {
      setErrorSesion(resultado.error);
      return;
    }
    onExito();
  };
 
  return (
    <>
      {errorSesion && <Alert variant="danger">{errorSesion}</Alert>}
 
      <Form noValidate onSubmit={handleSubmit(ingresar)}>
        <CampoForm id="correo" label="Correo electronico" type="email" placeholder="nombre@gmail.com"
          autoComplete="email" value={datos.correo} onChange={handleChange} error={errores.correo} />
 
        <CampoForm id="rut" label="RUT" placeholder="11.111.111-1" autoComplete="off"
          value={datos.rut} onChange={handleChange} error={errores.rut} />
 
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              name="password"
              type={verPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              maxLength={10}
              autoComplete="current-password"
              value={datos.password}
              onChange={handleChange}
              isInvalid={!!errores.password}
            />
            <Button variant="outline-secondary" type="button" aria-label="Mostrar contraseña"
              onClick={() => setVerPassword((v) => !v)}>
              <i className={`bi ${verPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </Button>
            <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
 
        <Button type="submit" variant="accent" className="w-100">Ingresar</Button>
      </Form>
    </>
  );
}
