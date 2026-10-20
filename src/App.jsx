import { Routes, Route } from 'react-router-dom';
 
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
 
// --- Publicas y acceso
import Inicio from './pages/Inicio';
import Acceso from './pages/Acceso';
import NoEncontrado from './pages/NoEncontrado';
 
// --- Panel (todos los roles)
import Dashboard from './pages/Dashboard';
 
// Atajo: envuelve un elemento con la proteccion por roles
const protegida = (elemento, roles) => <RutaProtegida roles={roles}>{elemento}</RutaProtegida>;
 
export default function App() {
  return (
    <Routes>
      {/* ACCESO (sin navbar ni footer) */}
      <Route path="acceso" element={<Acceso />} />
 
      <Route element={<Layout />}>
        {/* RUTAS PUBLICAS */}
        <Route index element={<Inicio />} />
 
        {/* PANEL (cualquier usuario con sesion) === */}
        <Route path="panel" element={protegida(<Dashboard />)} />
 
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}


