import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import CampoForm from './CampoForm';
import useFormulario from '../hooks/useFormulario';
import { useAuth } from '../context/AuthContext';
import { crear, listar, ROLES } from '../data/db';
import { limpiarRut, validarRegistro } from '../utils/validaciones';
 
const INICIAL = { nombre: '', empresa: '', rut: '', correo: '', telefono: '', password: '', confirmar: '' };
 
// El registro publico crea cuentas de tipo Cliente, las demas cuentas las crea el Administrador).
export default function FormRegistro({ onExito }) {
  const { iniciarSesion } = useAuth();
  const [error, setError] = useState('');
  const { datos, errores, handleChange, handleSubmit } = useFormulario(INICIAL, validarRegistro);
 
  const registrar = (valores) => {
    const existe = listar('usuarios').some(
      (u) => limpiarRut(u.rut) === limpiarRut(valores.rut) || u.correo.toLowerCase() === valores.correo.trim().toLowerCase()
    );
    if (existe) {
      setError('Ya existe una cuenta con ese RUT o correo.');
      return;
    }
 
    const { confirmar: _confirmar, ...resto } = valores;
    const nuevo = crear('usuarios', { ...resto, correo: resto.correo.trim(), rol: ROLES.CLIENTE });
    iniciarSesion(nuevo);
    onExito();
  };
 
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
 
      <Form noValidate onSubmit={handleSubmit(registrar)}>
        <Row>
          <Col md={6}><CampoForm id="nombre" label="Nombre completo" value={datos.nombre} onChange={handleChange} error={errores.nombre} /></Col>
          <Col md={6}><CampoForm id="empresa" label="Empresa" value={datos.empresa} onChange={handleChange} error={errores.empresa} /></Col>
          <Col md={6}><CampoForm id="rutRegistro" name="rut" label="RUT" placeholder="11.111.111-1" value={datos.rut} onChange={handleChange} error={errores.rut} /></Col>
          <Col md={6}><CampoForm id="telefono" label="Telefono" type="tel" placeholder="+56 9 1234 5678" value={datos.telefono} onChange={handleChange} error={errores.telefono} /></Col>
        </Row>
        <CampoForm id="correoRegistro" name="correo" label="Correo electronico" type="email" placeholder="nombre@gmail.com" value={datos.correo} onChange={handleChange} error={errores.correo} />
        <Row>
          <Col md={6}><CampoForm id="passwordRegistro" name="password" label="Contraseña" type="password" maxLength={10} ayuda="Entre 6 y 10 caracteres." value={datos.password} onChange={handleChange} error={errores.password} /></Col>
          <Col md={6}><CampoForm id="confirmar" label="Repetir contraseña" type="password" maxLength={10} value={datos.confirmar} onChange={handleChange} error={errores.confirmar} /></Col>
        </Row>
        <Button type="submit" variant="accent" className="w-100">Crear cuenta</Button>
      </Form>
    </>
  );
}
