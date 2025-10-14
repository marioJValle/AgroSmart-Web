import React, { useEffect, useState } from 'react';
import MMLStatistics from '../components/estadisticas/MMLStatistics';
import GeneralInfoStatistics from '../components/estadisticas/GeneralInfoStatistics';
import MainLayout from '../context/MainLayout';
import { getMMLStats } from '../../domain/useCases/statisticsUseCases/GetMMLStats';
import { getGeneralInfoStats } from '../../domain/useCases/statisticsUseCases/GetGeneralInfoStats';

const Estadisticas = () => {
  const [mmlData, setMmlData] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mml = await getMMLStats();
      const general = await getGeneralInfoStats();
      setMmlData(mml);
      setGeneralData(general);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <div className="container py-4">
        <h1 className="mb-4 mt-5">Panel de Estadísticas</h1>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                Estadísticas MML
              </div>
              <div className="card-body">
                <MMLStatistics data={mmlData} loading={loading} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-success text-white">
                Información General
              </div>
              <div className="card-body">
                <GeneralInfoStatistics data={generalData} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
