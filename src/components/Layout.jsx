import { Outlet } from 'react-router-dom';
import BarraNavegacion from './BarraNavegacion';
import Footer from './Footer';
 
// Estructura comun de todas las paginas: navbar + contenido (Outlet) + footer
export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

