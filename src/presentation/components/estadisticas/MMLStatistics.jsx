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

const MMLStatistics = ({ data, loading }) => {
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
      labels: ['Rendimiento', 'Precisión'],
      datasets: [
        {
          label: 'Métricas (%)',
          data: [data.performance * 100, data.accuracy * 100],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Métricas de Rendimiento y Precisión (%)',
        },
      },
    };

    return (
      <div>
        <Bar options={options} data={chartData} />
        <div className="text-center mt-3">
          <strong>Tiempo de respuesta:</strong> {data.responseTime}ms
        </div>
      </div>
    );
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">Estadísticas del Modelo (MML)</h5>
      </div>
      <div className="card-body d-flex align-items-center justify-content-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default MMLStatistics;
