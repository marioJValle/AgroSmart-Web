import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Tabs, Tab, Table, Card } from 'react-bootstrap';
import GetAgriculturalStats from '../../../domain/useCases/statisticsUseCases/GetAgriculturalStats';
import StatCard from './StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const AgriculturalStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await GetAgriculturalStats();
        setStats(result);
      } catch (e) {
        setError('Failed to load agricultural statistics.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Helper function to render the details for a specific crop
  const renderCropDetailTab = (cropName) => {
    if (!stats || !stats.seasonalCultivation) return null;

    const seasonalData = Object.entries(stats.seasonalCultivation).map(([season, crops]) => ({
      name: season,
      Hectáreas: crops[cropName] || 0,
    }));

    const municipalData = stats.municipalBreakdown ? stats.municipalBreakdown[cropName] : [];

    let trendText = 'N/A';
    let trendColor = 'text-muted';

    if (seasonalData.length >= 2) {
        const lastSeason = seasonalData[seasonalData.length - 1].Hectáreas;
        const secondLastSeason = seasonalData[seasonalData.length - 2].Hectáreas;
        if (secondLastSeason > 0) {
            const trend = ((lastSeason - secondLastSeason) / secondLastSeason) * 100;
            trendColor = trend >= 0 ? 'text-success' : 'text-danger';
            const trendIcon = trend >= 0 ? '▲' : '▼';
            trendText = `${trendIcon} ${trend.toFixed(1)}% vs. temporada anterior`;
        } 
    }

    return (
        <>
            <Row>
                <Col lg={8} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{`Producción de ${cropName} por Temporada (Hectáreas)`}</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={seasonalData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Hectáreas" fill="#82ca9d">
                                        <LabelList dataKey="Hectáreas" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <StatCard title="Tendencia de Producción" value={trendText} className={trendColor} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Desglose por Municipio</Card.Title>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Municipio</th>
                                        <th>Hectáreas Cultivadas</th>
                                        <th>Nº de Agricultores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {municipalData.length > 0 ? municipalData.map(item => (
                                        <tr key={item.municipality}>
                                            <td>{item.municipality}</td>
                                            <td>{item.hectares.toLocaleString()}</td>
                                            <td>{item.farmerCount}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No hay datos para este cultivo.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
  };

  if (loading) {
    return <div className="text-center"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!stats) {
    return <Alert variant="warning">No agricultural data available.</Alert>;
  }

  // Prepare data for general charts
  const topCropsData = stats.topCrops?.map(item => ({ name: item.crop, Hectáreas: item.amount })) || [];
  const municipalityData = stats.sowingByMunicipality 
    ? Object.entries(stats.sowingByMunicipality).map(([label, data]) => ({ name: label, Hectáreas: data.hectares }))
    : [];

  return (
    <Tabs defaultActiveKey="general" id="agri-stats-main-tabs" className="mb-3">
      <Tab eventKey="general" title="Visión General">
        <Row>
          <Col md={6} className="mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>Top Cultivos (por Hectáreas)</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topCropsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Hectáreas" fill="#8884d8">
                                <LabelList dataKey="Hectáreas" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>Hectáreas Totales por Municipio</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={municipalityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Hectáreas" fill="#82ca9d">
                                <LabelList dataKey="Hectáreas" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Cultivos por Temporada (Hectáreas)</Card.Title>
                        <Table striped bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Temporada</th>
                                    {stats.seasonalCultivation && Object.keys(stats.seasonalCultivation['2024-Q1']).map(crop => <th key={crop}>{crop}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {stats.seasonalCultivation && Object.entries(stats.seasonalCultivation).map(([season, crops]) => (
                                    <tr key={season}>
                                        <td>{season}</td>
                                        {Object.values(crops).map((amount, i) => <td key={i}>{amount.toLocaleString()}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Tab>
      <Tab eventKey="maiz" title="Maíz">
        {renderCropDetailTab('Maíz')}
      </Tab>
      <Tab eventKey="frijol" title="Frijol">
        {renderCropDetailTab('Frijol')}
      </Tab>
      <Tab eventKey="sorgo" title="Sorgo">
        {renderCropDetailTab('Sorgo')}
      </Tab>
    </Tabs>
  );
};

export default AgriculturalStats;
