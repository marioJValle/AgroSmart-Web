import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralInfoStatistics = ({ data, loading }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      );
    }

    if (!data) {
      return <p className="card-text text-danger">No se pudieron obtener los datos.</p>;
    }

    const chartData = {
      labels: ['Tipos de Cultivos', 'Tipos de Suelo', 'Municipios'],
      datasets: [
        {
          label: 'Registros Únicos',
          data: [data.cropTypes, data.soilTypes, data.municipalities],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Datos Generales Registrados',
        },
      },
    };

    return <Bar options={options} data={chartData} />;
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">Estadísticas Generales</h5>
      </div>
      <div className="card-body d-flex align-items-center justify-content-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default GeneralInfoStatistics;
