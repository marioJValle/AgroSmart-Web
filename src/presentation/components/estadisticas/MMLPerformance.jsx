import React, { useState, useEffect, useRef, createRef } from 'react';
import { Row, Col, Spinner, Alert, Card, Form, Button } from 'react-bootstrap';
import GetMMLStats from '../../../domain/useCases/statisticsUseCases/GetMMLStats';
import StatCard from './StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import BotonExportarSeccion from './BotonExportarSeccion';

const MMLPerformance = () => {
  const [inferences, setInferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LÓGICA DE SELECCIÓN Y REFERENCIAS ---
  const chartKeys = [
    'inferenceTimeChart',
    'memoryUseChart',
    'dailyUsageChart',
    'hourlyUsageChart',
    'confidenceChart',
    'classFrequencyChart'
  ];
  const chartNames = {
    inferenceTimeChart: 'Tiempo de Inferencia por Consulta (ms)',
    memoryUseChart: 'Uso de Memoria por Consulta',
    dailyUsageChart: 'Consultas por Día de la Semana',
    hourlyUsageChart: 'Consultas por Hora del Día',
    confidenceChart: 'Confianza de Clase Predicha por Inferencia',
    classFrequencyChart: 'Frecuencia de Clases Predichas'
  };

  const chartRefs = useRef(chartKeys.reduce((acc, key) => ({ ...acc, [key]: createRef() }), {})).current;
  const [selectedCharts, setSelectedCharts] = useState(chartKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedCharts(chartKeys.reduce((acc, key) => ({ ...acc, [key]: isChecked }), {}));
  };

  const handleChartSelect = (key, isChecked) => {
    setSelectedCharts(prev => ({ ...prev, [key]: isChecked }));
  };
  // --- FIN DE LA LÓGICA DE SELECCIÓN Y REFERENCIAS ---

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

  const processedData = inferences.map((inference, index) => {
    let predictedClassIndex = -1;
    let predictedClassConfidence = 0;
    let predictedClassName = 'N/A';

    if (inference.inferenceData && Array.isArray(inference.inferenceData) && inference.inferenceData.length > 0) {
      predictedClassConfidence = Math.max(...inference.inferenceData);
      predictedClassIndex = inference.inferenceData.indexOf(predictedClassConfidence);
      predictedClassName = `Clase ${predictedClassIndex}`;
    }

    return {
      id: inference.id,
      inferenceNumber: index + 1,
      inferenceTime: inference.inferenceTime || 0,
      memoryUse: inference.memoryUse || 0,
      predictedClassIndex: predictedClassIndex,
      predictedClassConfidence: predictedClassConfidence,
      predictedClassName: predictedClassName,
      date: inference.date ? (inference.date.toDate ? inference.date.toDate() : new Date(inference.date)) : new Date(),
    };
  });

  const totalInferences = processedData.length;
  const avgInferenceTime = (processedData.reduce((sum, d) => sum + d.inferenceTime, 0) / totalInferences).toFixed(2);
  const maxInferenceTime = Math.max(...processedData.map(d => d.inferenceTime));
  const avgMemoryUse = (processedData.reduce((sum, d) => sum + d.memoryUse, 0) / totalInferences);
  const maxMemoryUse = Math.max(...processedData.map(d => d.memoryUse));
  const avgPredictedConfidence = (processedData.reduce((sum, d) => sum + d.predictedClassConfidence, 0) / totalInferences).toFixed(6);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dailyUsage = Array(7).fill(0);
  const hourlyUsage = Array(24).fill(0);

  processedData.forEach(d => {
    const day = d.date.getDay();
    const hour = d.date.getHours();
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

  const formatMemory = (kbValue) => {
    if (kbValue === undefined || kbValue === null) return 'N/A';
    const mbValue = kbValue / 1024;
    if (mbValue >= 1024) {
      return `${(mbValue / 1024).toFixed(2)} GB`;
    } else {
      return `${mbValue.toFixed(2)} MB`;
    }
  };

  const classFrequency = processedData.reduce((acc, d) => {
    if (d.predictedClassName !== 'N/A') {
      acc[d.predictedClassName] = (acc[d.predictedClassName] || 0) + 1;
    }
    return acc;
  }, {});

  const classFrequencyData = Object.entries(classFrequency).map(([name, count]) => ({ name, count }));

  const allChartData = {
    inferenceTimeChart: processedData,
    memoryUseChart: processedData,
    dailyUsageChart: dailyUsageData,
    hourlyUsageChart: hourlyUsageData,
    confidenceChart: processedData,
    classFrequencyChart: classFrequencyData
  };

  const numSelected = Object.values(selectedCharts).filter(Boolean).length;
  const allSelected = numSelected === chartKeys.length;

  return (
    <>
      <Card className="mb-3">
        <Card.Body className='d-flex justify-content-between align-items-center'>
          <div>
            <Form.Check
              type="checkbox"
              id="select-all-mml"
              label={allSelected ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
              checked={allSelected}
              onChange={handleSelectAll}
            />
          </div>
          <BotonExportarSeccion
            selectedCharts={selectedCharts}
            chartRefs={chartRefs}
            chartData={allChartData}
            chartNames={chartNames}
          />
        </Card.Body>
      </Card>

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
            <div ref={chartRefs.inferenceTimeChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.inferenceTimeChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-inferenceTimeChart"
                    checked={selectedCharts.inferenceTimeChart}
                    onChange={(e) => handleChartSelect('inferenceTimeChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <div ref={chartRefs.memoryUseChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.memoryUseChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-memoryUseChart"
                    checked={selectedCharts.memoryUseChart}
                    onChange={(e) => handleChartSelect('memoryUseChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={6} className="mb-4">
          <Card>
            <div ref={chartRefs.dailyUsageChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.dailyUsageChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-dailyUsageChart"
                    checked={selectedCharts.dailyUsageChart}
                    onChange={(e) => handleChartSelect('dailyUsageChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <div ref={chartRefs.hourlyUsageChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.hourlyUsageChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-hourlyUsageChart"
                    checked={selectedCharts.hourlyUsageChart}
                    onChange={(e) => handleChartSelect('hourlyUsageChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={6} className="mb-4">
          <Card>
            <div ref={chartRefs.confidenceChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.confidenceChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-confidenceChart"
                    checked={selectedCharts.confidenceChart}
                    onChange={(e) => handleChartSelect('confidenceChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <div ref={chartRefs.classFrequencyChart}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{chartNames.classFrequencyChart}</Card.Title>
                  <Form.Check
                    type="checkbox"
                    id="select-classFrequencyChart"
                    checked={selectedCharts.classFrequencyChart}
                    onChange={(e) => handleChartSelect('classFrequencyChart', e.target.checked)}
                  />
                </div>
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
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MMLPerformance;