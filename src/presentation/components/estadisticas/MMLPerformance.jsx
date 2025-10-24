import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import GetMMLStats from '../../../domain/useCases/statisticsUseCases/GetMMLStats';
import StatCard from './StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';

const MMLPerformance = () => {
  const [inferences, setInferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await GetMMLStats();
        setInferences(result);
      } catch (e) {
        setError('Failed to load MML performance statistics.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!inferences || inferences.length === 0) {
    return <Alert variant="warning">No MML performance data available.</Alert>;
  }

  // --- Procesamiento de los nuevos datos de inferencia ---
  const processedData = inferences.map((inference, index) => {
    let predictedClassIndex = -1;
    let predictedClassConfidence = 0;
    let predictedClassName = 'N/A';

    if (inference.inferenceData && Array.isArray(inference.inferenceData) && inference.inferenceData.length > 0) {
      // Encontrar la clase con la probabilidad más alta
      predictedClassConfidence = Math.max(...inference.inferenceData);
      predictedClassIndex = inference.inferenceData.indexOf(predictedClassConfidence);
      predictedClassName = `Clase ${predictedClassIndex}`; // Usar etiqueta genérica por ahora
    }

    return {
      id: inference.id,
      inferenceNumber: index + 1, // Para el eje X de las gráficas
      inferenceTime: inference.inferenceTime || 0,
      memoryUse: inference.memoryUse || 0,
      predictedClassIndex: predictedClassIndex,
      predictedClassConfidence: predictedClassConfidence,
      predictedClassName: predictedClassName,
      date: inference.date ? (inference.date.toDate ? inference.date.toDate() : new Date(inference.date)) : new Date(), // Asegurar que sea un objeto Date
    };
  });

  // --- Cálculos para StatCards ---
  const totalInferences = processedData.length;
  const avgInferenceTime = (processedData.reduce((sum, d) => sum + d.inferenceTime, 0) / totalInferences).toFixed(2);
  const maxInferenceTime = Math.max(...processedData.map(d => d.inferenceTime));
  const avgMemoryUse = (processedData.reduce((sum, d) => sum + d.memoryUse, 0) / totalInferences);
  const maxMemoryUse = Math.max(...processedData.map(d => d.memoryUse));
  const avgPredictedConfidence = (processedData.reduce((sum, d) => sum + d.predictedClassConfidence, 0) / totalInferences).toFixed(6);

  // --- Cálculos para uso diario y horario ---
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dailyUsage = Array(7).fill(0);
  const hourlyUsage = Array(24).fill(0);

  processedData.forEach(d => {
    const day = d.date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const hour = d.date.getHours(); // 0-23
    dailyUsage[day]++;
    hourlyUsage[hour]++;
  });

  const dailyUsageData = daysOfWeek.map((dayName, index) => ({
    name: dayName,
    Consultas: dailyUsage[index],
  }));

  const hourlyUsageData = hourlyUsage.map((count, index) => ({
    Hora: `${index}:00`,
    Consultas: count,
  }));

  const peakHourData = hourlyUsageData.reduce((prev, current) => (prev.Consultas > current.Consultas) ? prev : current, { Hora: 'N/A', Consultas: 0 });

  // Función para formatear el uso de memoria
  const formatMemory = (kbValue) => {
    if (kbValue === undefined || kbValue === null) return 'N/A';
    const mbValue = kbValue / 1024;
    if (mbValue >= 1024) {
      return `${(mbValue / 1024).toFixed(2)} GB`;
    } else {
      return `${mbValue.toFixed(2)} MB`;
    }
  };

  // Frecuencia de clases predichas
  const classFrequency = processedData.reduce((acc, d) => {
    if (d.predictedClassName !== 'N/A') {
      acc[d.predictedClassName] = (acc[d.predictedClassName] || 0) + 1;
    }
    return acc;
  }, {});

  const classFrequencyData = Object.entries(classFrequency).map(([name, count]) => ({ name, count }));

  return (
    <>
      <Row className="mb-4">
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Total Inferencias" value={totalInferences} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Tiempo Inf. Prom." value={`${avgInferenceTime} ms`} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Tiempo Inf. Máx." value={`${maxInferenceTime} ms`} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Uso Memoria Prom." value={formatMemory(avgMemoryUse)} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Uso Memoria Máx." value={formatMemory(maxMemoryUse)} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Confianza Pred. Prom." value={avgPredictedConfidence} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Tiempo de Inferencia por Consulta (ms)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="inferenceNumber" label={{ value: 'Inferencia #', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Tiempo (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="inferenceTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Uso de Memoria por Consulta</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="inferenceNumber" label={{ value: 'Inferencia #', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Memoria', angle: -90, position: 'insideLeft' }} tickFormatter={formatMemory} />
                  <Tooltip formatter={(value) => formatMemory(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="memoryUse" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Consultas por Día de la Semana</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Consultas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Consultas por Hora del Día</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Hora" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Consultas" stroke="#82ca9d" strokeWidth={2} />
                  <ReferenceLine x={peakHourData.Hora} stroke="red" label={{ value: `Pico: ${peakHourData.Hora}`, position: 'insideTopLeft' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Confianza de Clase Predicha por Inferencia</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="inferenceNumber" label={{ value: 'Inferencia #', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Confianza', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="predictedClassConfidence" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Frecuencia de Clases Predichas</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MMLPerformance;
