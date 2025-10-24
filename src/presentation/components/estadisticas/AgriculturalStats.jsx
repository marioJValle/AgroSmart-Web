import React, { useState, useEffect, useRef, createRef } from 'react';
import { Row, Col, Spinner, Alert, Tabs, Tab, Table, Card, Form, Button } from 'react-bootstrap';
import GetAgriculturalStats from '../../../domain/useCases/statisticsUseCases/GetAgriculturalStats';
import StatCard from './StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import BotonExportarSeccion from './BotonExportarSeccion'; // Importar el componente de sección

const AgriculturalStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- LÓGICA DE SELECCIÓN Y REFERENCIAS ---
    const chartKeys = [
        'topCrops', 'municipalityHectares', 'usersByMunicipality', 'soilTypes',
        'seasonalCultivationTable' // La tabla de cultivos por temporada
    ];
    const chartNames = {
        topCrops: 'Top Cultivos (por Hectáreas)',
        municipalityHectares: 'Hectáreas Totales por Municipio',
        usersByMunicipality: 'Usuarios por Municipio',
        soilTypes: 'Distribución de Tipos de Suelo',
        seasonalCultivationTable: 'Cultivos por Temporada (Hectáreas)'
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

    // --- FUNCIÓN RESTAURADA PARA RENDERIZAR PESTAÑAS DE CULTIVOS ---
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

    const topCropsData = stats.topCrops?.map(item => ({ name: item.crop, Hectáreas: item.amount })) || [];
    const municipalityData = stats.sowingByMunicipality ? Object.entries(stats.sowingByMunicipality).map(([label, data]) => ({ name: label, Hectáreas: data.hectares })) : [];
    const usersByMunicipalityData = stats.usersByMunicipality || [];
    const soilTypesDistributionData = stats.soilTypesDistribution || [];
    const seasonalCultivationTableData = stats.seasonalCultivation ? Object.entries(stats.seasonalCultivation).map(([season, crops]) => ({
        Temporada: season,
        ...crops
    })) : [];

    const allChartData = {
        topCrops: topCropsData,
        municipalityHectares: municipalityData,
        usersByMunicipality: usersByMunicipalityData,
        soilTypes: soilTypesDistributionData,
        seasonalCultivationTable: seasonalCultivationTableData,
    };

    const numSelected = Object.values(selectedCharts).filter(Boolean).length;
    const allSelected = numSelected === chartKeys.length;

    return (
        <Tabs defaultActiveKey="general" id="agri-stats-main-tabs" className="mb-3">
            <Tab eventKey="general" title="Visión General">
                
                <Card className="mb-3">
                    <Card.Body className='d-flex justify-content-between align-items-center'>
                        <div>
                            <Form.Check 
                                type="checkbox"
                                id="select-all-general"
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

                <Row>
                    <Col md={6} className="mb-4">
                        <Card>
                            <div ref={chartRefs.topCrops}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{chartNames.topCrops}</Card.Title>
                                        <Form.Check 
                                            type="checkbox"
                                            id="select-topCrops"
                                            checked={selectedCharts.topCrops}
                                            onChange={(e) => handleChartSelect('topCrops', e.target.checked)}
                                        />
                                    </div>
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
                            </div>
                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card>
                            <div ref={chartRefs.municipalityHectares}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{chartNames.municipalityHectares}</Card.Title>
                                        <Form.Check 
                                            type="checkbox"
                                            id="select-municipalityHectares"
                                            checked={selectedCharts.municipalityHectares}
                                            onChange={(e) => handleChartSelect('municipalityHectares', e.target.checked)}
                                        />
                                    </div>
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
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} className="mb-4">
                        <Card>
                            <div ref={chartRefs.usersByMunicipality}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{chartNames.usersByMunicipality}</Card.Title>
                                        <Form.Check 
                                            type="checkbox"
                                            id="select-usersByMunicipality"
                                            checked={selectedCharts.usersByMunicipality}
                                            onChange={(e) => handleChartSelect('usersByMunicipality', e.target.checked)}
                                        />
                                    </div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={usersByMunicipalityData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="count" fill="#a4de6c" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={6} className="mb-4">
                        <Card>
                            <div ref={chartRefs.soilTypes}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{chartNames.soilTypes}</Card.Title>
                                        <Form.Check 
                                            type="checkbox"
                                            id="select-soilTypes"
                                            checked={selectedCharts.soilTypes}
                                            onChange={(e) => handleChartSelect('soilTypes', e.target.checked)}
                                        />
                                    </div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={soilTypesDistributionData}>
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

                <Row>
                    <Col>
                        <Card>
                            <div ref={chartRefs.seasonalCultivationTable}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Card.Title>{chartNames.seasonalCultivationTable}</Card.Title>
                                        <Form.Check 
                                            type="checkbox"
                                            id="select-seasonalCultivationTable"
                                            checked={selectedCharts.seasonalCultivationTable}
                                            onChange={(e) => handleChartSelect('seasonalCultivationTable', e.target.checked)}
                                        />
                                    </div>
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
                            </div>
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
