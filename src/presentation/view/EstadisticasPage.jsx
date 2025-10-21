import React, { useContext } from 'react';
import { Container, Tabs, Tab, Spinner } from 'react-bootstrap';
import MMLPerformance from '../components/estadisticas/MMLPerformance';
import AgriculturalStats from '../components/estadisticas/AgriculturalStats';
import { UserContext } from '../context/UserContext';

const EstadisticasPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  }

  return (
    <Container className="mt-4">
      <h2>Estadísticas</h2>
      <p>Visualiza el rendimiento del modelo de IA y las estadísticas agrícolas clave.</p>

      <Tabs defaultActiveKey="agricultural" id="stats-tabs" className="mb-3">
        <Tab eventKey="agricultural" title="Estadísticas Agrícolas">
          <AgriculturalStats />
        </Tab>
        {user && user.role === 'Administrador' && (
          <Tab eventKey="mml" title="Rendimiento del Modelo">
            <MMLPerformance />
          </Tab>
        )}
      </Tabs>
    </Container>
  );
};

export default EstadisticasPage;
