
import { Tabs, Tab } from 'react-bootstrap';
import ImageGallery from '../components/datosfotograficos/ImageGallery';
import DownloadButton from '../components/datosfotograficos/DownloadButton';
import React, { useEffect, useState } from 'react';
import { getFotografias } from '../../domain/useCases/fotografiasUseCases/getFotografias';

export default function PhotografyData() {
    const [fotografias, setFotografias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFotografias = async () => {
            try {
                const data = await getFotografias();
                setFotografias(data);
            } catch (err) {
                setError('Error al cargar los datos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFotografias();
    }, []);

    const parseResult = (result) => {
        const parts = result.toLowerCase().split(' con deficiencia de ');
        if (parts.length === 2) {
            const crop = parts[0].trim();
            const deficiency = parts[1].trim();
            return { crop, deficiency };
        }
        return null;
    };

    const groupedData = fotografias.reduce((acc, foto) => {
        const parsed = parseResult(foto.result);
        if (parsed) {
            const { crop, deficiency } = parsed;
            if (!acc[crop]) {
                acc[crop] = {};
            }
            if (!acc[crop][deficiency]) {
                acc[crop][deficiency] = [];
            }
            acc[crop][deficiency].push(foto);
        }
        return acc;
    }, {});

    if (loading) {
        return <div className="text-center p-8">Cargando datos...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    const CROP_OPTIONS = ['maiz', 'frijol', 'sorgo'];

    const renderCropContent = (cropName) => {
        const cropData = groupedData[cropName];
        if (!cropData) {
            return <p>No hay datos para este cultivo.</p>;
        }

        const deficiencies = Object.keys(cropData);
        const allImagesForCrop = deficiencies.flatMap(def => cropData[def]);

        return (
            <Tabs defaultActiveKey="todas" id={`tabs-deficiencies-${cropName}`} className="mb-3">
                <Tab eventKey="todas" title="Todas las Deficiencias">
                    <div className="d-flex justify-content-end mb-3">
                        <DownloadButton images={allImagesForCrop} filename={`${cropName}_todas_las_deficiencias`} buttonText={`Descargar todo de ${cropName}`} />
                    </div>
                    {deficiencies.map(deficiency => (
                        <div key={deficiency} className="mb-8">
                            <h3 className="text-xl font-semibold mb-3 text-gray-600 capitalize">{deficiency}</h3>
                            <ImageGallery data={{ [deficiency]: cropData[deficiency] }} />
                        </div>
                    ))}
                </Tab>
                {deficiencies.map(deficiency => (
                    <Tab key={deficiency} eventKey={deficiency} title={<span className="capitalize">{deficiency}</span>}>
                        <div className="d-flex justify-content-end mb-3">
                            <DownloadButton images={cropData[deficiency]} filename={`${cropName}_${deficiency}`} buttonText={`Descargar ${deficiency}`} />
                        </div>
                        <ImageGallery data={{ [deficiency]: cropData[deficiency] }} />
                    </Tab>
                ))}
            </Tabs>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-800">Gestor de Datos Fotográficos</h1>
                <DownloadButton images={fotografias} filename="toda_la_galeria" />
            </div>
            <p className="mb-6">Visualiza y descarga las imágenes de deficiencias de cultivos.</p>

            <Tabs defaultActiveKey="general" id="photo-data-tabs" className="mb-3">
                <Tab eventKey="general" title="Visión General">
                    <div className="mt-4">
                        {CROP_OPTIONS.map(crop => (
                            groupedData[crop] && (
                                <div key={crop} className="mb-8">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2 className="text-2xl font-bold capitalize">{crop}</h2>
                                        <DownloadButton images={Object.values(groupedData[crop]).flat()} filename={`${crop}_completo`} buttonText={`Descargar todo de ${crop}`} />
                                    </div>
                                    <ImageGallery data={groupedData[crop]} />
                                </div>
                            )
                        ))}
                    </div>
                </Tab>
                <Tab eventKey="maiz" title="Maíz">
                    <div className="mt-4">
                        {renderCropContent('maiz')}
                    </div>
                </Tab>
                <Tab eventKey="frijol" title="Frijol">
                    <div className="mt-4">
                        {renderCropContent('frijol')}
                    </div>
                </Tab>
                <Tab eventKey="sorgo" title="Sorgo">
                    <div className="mt-4">
                        {renderCropContent('sorgo')}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}
