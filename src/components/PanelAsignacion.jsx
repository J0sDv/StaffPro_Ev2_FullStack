import { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import TablaTrabajadores from './TablaTrabajadores';
import ModalAsignar from './ModalAsignar';
import useColeccion from '../hooks/useColeccion';
 
// Catalogo de trabajadores con filtros y asignacion a un cliente.
export default function PanelAsignacion() {
  const { datos: trabajadores, modificar } = useColeccion('trabajadores');
  const [especialidad, setEspecialidad] = useState('todas');
  const [estado, setEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
 
  const especialidades = [...new Set(trabajadores.map((t) => t.especialidad))];
 
  const texto = busqueda.trim().toLowerCase();
  const filtrados = trabajadores.filter((t) =>
    (especialidad === 'todas' || t.especialidad === especialidad) &&
    (estado === 'todos' || t.estado === estado) &&
    (t.nombre.toLowerCase().includes(texto) || t.rut.toLowerCase().includes(texto))
  );
 
  const confirmar = (trabajador, cliente) => {
    modificar(trabajador.id, { estado: 'En turno', cliente });
    setSeleccionado(null);
  };
 
  return (
    <>
      <Row className="g-3 mb-4 align-items-end">
        <Col md={4}>
          <Form.Label htmlFor="filtroEspecialidad">Filtrar por especialidad</Form.Label>
          <Form.Select id="filtroEspecialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
            <option value="todas">Todas las especialidades</option>
            {especialidades.map((e) => <option key={e} value={e}>{e}</option>)}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="filtroEstado">Filtrar por disponibilidad</Form.Label>
          <Form.Select id="filtroEstado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="todos">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="En turno">En turno</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="buscarTrabajador">Buscar por nombre o RUT</Form.Label>
          <Form.Control id="buscarTrabajador" type="search" placeholder="Ej: Juan Perez / 11.111.111-1"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </Col>
      </Row>
 
      <Card as="article" className="shadow-sm border-0">
        <Card.Body className="p-0">
          <TablaTrabajadores
            trabajadores={filtrados}
            renderAcciones={(t) => (
              <Button size="sm" variant="accent" disabled={t.estado === 'En turno'} onClick={() => setSeleccionado(t)}>
                Asignar
              </Button>
            )}
          />
        </Card.Body>
      </Card>
      <p className="text-muted small mt-2">{filtrados.length} de {trabajadores.length} trabajadores</p>
 
      <ModalAsignar trabajador={seleccionado} onConfirmar={confirmar} onCerrar={() => setSeleccionado(null)} />
    </>
  );
}
