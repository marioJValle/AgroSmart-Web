import React, { useContext } from 'react';
import { Container, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import MMLPerformance from '../components/estadisticas/MMLPerformance';
import AgriculturalStats from '../components/estadisticas/AgriculturalStats';
import { UserContext } from '../context/UserContext';
import Unauthorized from './Unauthorized'; // Asumiendo que este componente existe

const EstadisticasPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  }

  // Determinar qué pestañas mostrar según el rol del usuario
  const showAgriculturalStats = user && (user.role === 'Administrador' || user.role === 'Institucion');
  const showMMLPerformance = user && user.role === 'Administrador';

  if (!user || (!showAgriculturalStats && !showMMLPerformance)) {
    // Si no hay usuario o el rol del usuario no está autorizado para ninguna estadística
    return <Unauthorized />; // O un mensaje simple de no autorizado
  }

  return (
    <Container className="mt-4">
      <h2>Estadísticas</h2>
      <p>Visualiza el rendimiento del modelo de IA y las estadísticas agrícolas clave.</p>

      <Tabs defaultActiveKey="agricultural" id="stats-tabs" className="mb-3">
        {showAgriculturalStats && (
          <Tab eventKey="agricultural" title="Estadísticas Agrícolas">
            <AgriculturalStats />
          </Tab>
        )}
        {showMMLPerformance && (
          <Tab eventKey="mml" title="Rendimiento del Modelo">
            <MMLPerformance />
          </Tab>
        )}
      </Tabs>
    </Container>
  );
};


export default EstadisticasPage;
