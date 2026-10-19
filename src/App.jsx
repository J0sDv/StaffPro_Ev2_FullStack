import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
 
// --- Publicas
import Inicio from './pages/Inicio';
import NoEncontrado from './pages/NoEncontrado';
 
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* === RUTAS PUBLICAS === */}
        <Route index element={<Inicio />} />
 
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

