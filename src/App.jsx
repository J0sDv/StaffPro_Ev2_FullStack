import { Routes, Route } from 'react-router-dom';
import { ROLES } from './data/db';
 
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
 
// Publicas y acceso
import Inicio from './pages/Inicio';
import Acceso from './pages/Acceso';
import NoEncontrado from './pages/NoEncontrado';
 
// Panel (todos los roles)
import Dashboard from './pages/Dashboard';
 
// Cliente y Coordinador
import SolicitudesCliente from './pages/SolicitudesCliente';
import GestionPersonal from './pages/GestionPersonal';
 
// Trabajador, Reclutador y Administrador
import Asistencia from './pages/Asistencia';
import Trabajadores from './pages/Trabajadores';
import Usuarios from './pages/Usuarios';
 
// Atajo: envuelve un elemento con la proteccion por roles
const protegida = (elemento, roles) => <RutaProtegida roles={roles}>{elemento}</RutaProtegida>;
 
const { ADMIN, COORDINADOR, RECLUTADOR, CLIENTE, TRABAJADOR } = ROLES;
 
export default function App() {
  return (
    <Routes>
      {/* === ACCESO (sin navbar ni footer) === */}
      <Route path="acceso" element={<Acceso />} />
 
      <Route element={<Layout />}>
        {/* === RUTAS PUBLICAS === */}
        <Route index element={<Inicio />} />
 
        {/* === PANEL (cualquier usuario con sesion) === */}
        <Route path="panel" element={protegida(<Dashboard />)} />
 
        {/* === CLIENTE === */}
        <Route path="solicitud" element={protegida(<SolicitudesCliente />, [CLIENTE])} />
 
        {/* === COORDINADOR === */}
        <Route path="gestion" element={protegida(<GestionPersonal />, [COORDINADOR])} />
 
        {/* === TRABAJADOR === */}
        <Route path="asistencia" element={protegida(<Asistencia />, [TRABAJADOR])} />
 
        {/* === RECLUTADOR Y ADMINISTRADOR === */}
        <Route path="trabajadores" element={protegida(<Trabajadores />, [RECLUTADOR, ADMIN])} />
        <Route path="usuarios" element={protegida(<Usuarios />, [ADMIN])} />
 
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}



