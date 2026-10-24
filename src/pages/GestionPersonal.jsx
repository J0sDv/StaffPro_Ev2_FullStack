import { Container, Tabs, Tab } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import PanelSolicitudes from '../components/PanelSolicitudes';
import PanelAsignacion from '../components/PanelAsignacion';
 
// Una vista para el coordinador: solicitudes de clientes y asignacion de personal.
export default function GestionPersonal() {
  return (
    <>
      <PageHeader titulo="Gestion de Personal" subtitulo="Atiende las solicitudes de los clientes y asigna trabajadores disponibles." />
 
      <Container as="section" className="my-5">
        <Tabs id="tabs-gestion" defaultActiveKey="solicitudes" className="mb-4">
          <Tab eventKey="solicitudes" title="Solicitudes">
            <PanelSolicitudes />
          </Tab>
          <Tab eventKey="asignacion" title="Asignacion">
            <PanelAsignacion />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
