import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import TablaTrabajadores from '../components/TablaTrabajadores';
import CampoForm from '../components/CampoForm';
import useColeccion from '../hooks/useColeccion';
import useFormulario from '../hooks/useFormulario';
import { ESPECIALIDADES } from '../data/contenido';
import { validarTrabajador } from '../utils/validaciones';
 
const OPCIONES_ESPECIALIDAD = ESPECIALIDADES.map((e) => ({ value: e, label: e }));
const OPCIONES_ESTADO = [{ value: 'Disponible', label: 'Disponible' }, { value: 'En turno', label: 'En turno' }];
const VACIO = { nombre: '', rut: '', especialidad: '', valorHora: '', cliente: 'Sin asignar', estado: 'Disponible' };
 
// CRUD completo en una sola pagina
export default function Trabajadores() {
  const { datos, agregar, modificar, quitar } = useColeccion('trabajadores');
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
 
  // Al validar, se excluye al trabajador que se esta editando para no marcar su propio RUT como duplicado
  const otrosRuts = datos.filter((t) => t.id !== editandoId).map((t) => t.rut);
  const { datos: form, errores, handleChange, handleSubmit, reset } = useFormulario(
    VACIO,
    (d) => validarTrabajador(d, otrosRuts)
  );
 
  const texto = busqueda.trim().toLowerCase();
  const filtrados = datos.filter((t) =>
    [t.nombre, t.rut, t.especialidad].some((campo) => campo.toLowerCase().includes(texto))
  );
 
  const abrirNuevo = () => {
    setEditandoId(null);
    reset(VACIO);
    setModalAbierto(true);
  };
 
  const abrirEdicion = (t) => {
    setEditandoId(t.id);
    reset(t);
    setModalAbierto(true);
  };
 
  const guardar = (v) => {
    const registro = { ...v, nombre: v.nombre.trim(), rut: v.rut.trim(), valorHora: Number(v.valorHora), cliente: v.cliente.trim() || 'Sin asignar' };
    if (editandoId) modificar(editandoId, registro);
    else agregar(registro);
    setModalAbierto(false);
  };
 
  const eliminar = (t) => {
    if (window.confirm(`¿Eliminar a ${t.nombre}? Esta accion no se puede deshacer.`)) quitar(t.id);
  };
 
  return (
    <>
      <PageHeader titulo="Trabajadores" subtitulo="Catalogo de personal externo de StaffPro." />
 
      <Container className="my-5">
        <Row className="g-3 mb-4 align-items-end">
          <Col md={6} lg={4}>
            <Form.Label htmlFor="buscarTrabajadores">Buscar por nombre, RUT o especialidad</Form.Label>
            <Form.Control id="buscarTrabajadores" type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </Col>
          <Col className="text-md-end">
            <Button variant="accent" onClick={abrirNuevo}><i className="bi bi-plus-lg me-1"></i>Nuevo trabajador</Button>
          </Col>
        </Row>
 
        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <TablaTrabajadores
              trabajadores={filtrados}
              renderAcciones={(t) => (
                <>
                  <Button size="sm" variant="outline-accent" className="me-2" onClick={() => abrirEdicion(t)}>Editar</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => eliminar(t)}>Eliminar</Button>
                </>
              )}
            />
          </Card.Body>
        </Card>
      </Container>
 
      <Modal show={modalAbierto} onHide={() => setModalAbierto(false)} centered>
        <Form noValidate onSubmit={handleSubmit(guardar)}>
          <Modal.Header closeButton>
            <Modal.Title as="h2" className="h5">{editandoId ? 'Editar trabajador' : 'Nuevo trabajador'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CampoForm id="nombre" label="Nombre completo" value={form.nombre} onChange={handleChange} error={errores.nombre} />
            <CampoForm id="rut" label="RUT" placeholder="11.111.111-1" value={form.rut} onChange={handleChange} error={errores.rut} />
            <CampoForm id="especialidad" label="Especialidad" opciones={OPCIONES_ESPECIALIDAD} placeholder="Selecciona una especialidad"
              value={form.especialidad} onChange={handleChange} error={errores.especialidad} />
            <CampoForm id="valorHora" label="Valor hora (CLP)" type="number" min={1000} step={500}
              value={form.valorHora} onChange={handleChange} error={errores.valorHora} />
            <CampoForm id="estado" label="Estado" opciones={OPCIONES_ESTADO} value={form.estado} onChange={handleChange} error={errores.estado} />
            <CampoForm id="cliente" label="Cliente actual" value={form.cliente} onChange={handleChange} error={errores.cliente} />
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
