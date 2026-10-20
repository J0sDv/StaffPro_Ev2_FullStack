import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
// Protege una ruta, exige sesion y opcionalmente uno de los roles indicados.
export default function RutaProtegida({ roles, children }) {
  const { usuario } = useAuth();
  const location = useLocation();
 
  if (!usuario) {
    return <Navigate to="/acceso" replace state={{ desde: location.pathname }} />;
  }
  // Si el rol no tiene permiso, vuelve a su panel
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/panel" replace />;
  }
  return children;
}
