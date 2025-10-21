import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import GetMMLStats from '../../../domain/useCases/statisticsUseCases/GetMMLStats';
import StatCard from './StatCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const MMLPerformance = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await GetMMLStats();
        setStats(result);
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

  if (!stats) {
    return <Alert variant="warning">No MML performance data available.</Alert>;
  }

  // Prepare data for charts
  const dailyUsageData = stats.dailyUsage 
    ? Object.entries(stats.dailyUsage).map(([name, Consultas]) => ({ name, Consultas }))
    : [];

  const hourlyUsageData = stats.hourlyUsage
    ? stats.hourlyUsage.map((value, index) => ({ Hora: `${index}:00`, Consultas: value }))
    : [];
    
  const peakHourData = hourlyUsageData.reduce((prev, current) => (prev.Consultas > current.Consultas) ? prev : current, {});

  return (
    <>
      <Row className="mb-4">
        <Col md={4} xl={2} className="mb-3">
          <StatCard title="Precisión" value={`${stats.accuracy}%`} />
        </Col>
        <Col md={4} xl={2} className="mb-3">
          <StatCard title="Tasa de Éxito" value={`${stats.successRate}%`} />
        </Col>
        <Col md={4} xl={2} className="mb-3">
          <StatCard title="Tasa de Fallos" value={`${stats.failureRate}%`} className="border-danger text-danger" />
        </Col>
        <Col md={4} xl={3} className="mb-3">
          <StatCard title="Tiempo de Resp. Prom." value={`${stats.averageResponseTime}ms`} />
        </Col>
        <Col md={4} xl={3} className="mb-3">
            <StatCard 
                title="Uso de RAM"
                value={`${stats.ramUsage.current} / ${stats.ramUsage.max} ${stats.ramUsage.unit}`}
            />
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
    </>
  );
};

export default MMLPerformance;
