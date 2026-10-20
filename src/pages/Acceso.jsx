import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginaAcceso from '../components/PaginaAcceso';
import FormLogin from '../components/FormLogin';
import FormRegistro from '../components/FormRegistro';
 
// Una sola vista para iniciar sesion y crear cuenta
export default function Acceso() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pestana, setPestana] = useState(location.state?.pestana ?? 'login');
 
  // Si venia de una ruta protegida vuelve alli, si no, va a su panel
  const entrar = () => navigate(location.state?.desde ?? '/panel', { replace: true });
 
  return (
    <PaginaAcceso>
      <Tabs id="tabs-acceso" activeKey={pestana} onSelect={(k) => setPestana(k)} justify className="mb-4">
        <Tab eventKey="login" title="Iniciar sesion">
          <FormLogin onExito={entrar} />
        </Tab>
        <Tab eventKey="registro" title="Crear cuenta">
          <FormRegistro onExito={entrar} />
        </Tab>
      </Tabs>
    </PaginaAcceso>
  );
}
