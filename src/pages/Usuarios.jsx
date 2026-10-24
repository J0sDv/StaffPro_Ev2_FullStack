import { useState } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import CampoForm from '../components/CampoForm';
import useColeccion from '../hooks/useColeccion';
import useFormulario from '../hooks/useFormulario';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/db';
import { validarUsuario } from '../utils/validaciones';
 
const OPCIONES_ROL = Object.values(ROLES).map((r) => ({ value: r, label: r }));
const VACIO = { nombre: '', rut: '', correo: '', telefono: '', rol: '', empresa: '', password: '' };
 
// CRUD de usuarios y roles
export default function Usuarios() {
  const { usuario } = useAuth();
  const { datos, agregar, modificar, quitar } = useColeccion('usuarios');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
 
  const otros = datos.filter((u) => u.id !== editandoId);
  const { datos: form, errores, handleChange, handleSubmit, reset } = useFormulario(
    VACIO,
    (d) => validarUsuario(d, otros)
  );
 
  const abrirNuevo = () => {
    setEditandoId(null);
    reset(VACIO);
    setModalAbierto(true);
  };
 
  const abrirEdicion = (u) => {
    setEditandoId(u.id);
    reset(u);
    setModalAbierto(true);
  };
 
  const guardar = (v) => {
    const registro = { ...v, nombre: v.nombre.trim(), correo: v.correo.trim(), empresa: v.rol === ROLES.CLIENTE ? v.empresa.trim() : '' };
    if (editandoId) modificar(editandoId, registro);
    else agregar(registro);
    setModalAbierto(false);
  };
 
  const eliminar = (u) => {
    if (window.confirm(`¿Eliminar la cuenta de ${u.nombre}?`)) quitar(u.id);
  };
 
  return (
    <>
      <PageHeader titulo="Usuarios" subtitulo="Cuentas del sistema y sus roles." />
 
      <Container className="my-5">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="accent" onClick={abrirNuevo}><i className="bi bi-plus-lg me-1"></i>Nuevo usuario</Button>
        </div>
 
        <div className="table-responsive bg-white shadow-sm rounded">
          <Table hover className="align-middle mb-0">
            <thead className="table-header-staffpro">
              <tr><th>Nombre</th><th>RUT</th><th>Correo</th><th>Rol</th><th className="text-end">Accion</th></tr>
            </thead>
            <tbody>
              {datos.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}{u.empresa && <div className="small text-muted">{u.empresa}</div>}</td>
                  <td>{u.rut}</td>
                  <td>{u.correo}</td>
                  <td><span className="badge badge-estado">{u.rol}</span></td>
                  <td className="text-end text-nowrap">
                    <Button size="sm" variant="outline-accent" className="me-2" onClick={() => abrirEdicion(u)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" disabled={u.id === usuario.id} onClick={() => eliminar(u)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
 
      <Modal show={modalAbierto} onHide={() => setModalAbierto(false)} centered>
        <Form noValidate onSubmit={handleSubmit(guardar)}>
          <Modal.Header closeButton>
            <Modal.Title as="h2" className="h5">{editandoId ? 'Editar usuario' : 'Nuevo usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CampoForm id="nombre" label="Nombre completo" value={form.nombre} onChange={handleChange} error={errores.nombre} />
            <Row>
              <Col md={6}><CampoForm id="rut" label="RUT" placeholder="11.111.111-1" value={form.rut} onChange={handleChange} error={errores.rut} /></Col>
              <Col md={6}><CampoForm id="telefono" label="Telefono" value={form.telefono} onChange={handleChange} error={errores.telefono} /></Col>
            </Row>
            <CampoForm id="correo" label="Correo electronico" type="email" value={form.correo} onChange={handleChange} error={errores.correo} />
            <Row>
              <Col md={6}><CampoForm id="rol" label="Rol" opciones={OPCIONES_ROL} placeholder="Selecciona un rol" value={form.rol} onChange={handleChange} error={errores.rol} /></Col>
              <Col md={6}><CampoForm id="password" label="Contraseña" maxLength={10} ayuda="Entre 6 y 10 caracteres." value={form.password} onChange={handleChange} error={errores.password} /></Col>
            </Row>
            {form.rol === ROLES.CLIENTE && (
              <CampoForm id="empresa" label="Empresa" value={form.empresa} onChange={handleChange} error={errores.empresa} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button>
            <Button type="submit" variant="accent">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
