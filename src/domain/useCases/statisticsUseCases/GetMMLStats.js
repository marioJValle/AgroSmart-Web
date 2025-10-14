// Capa de Dominio
import StatisticsRepository from '../../../data/repositories/StatisticsRepository/StatisticsRepository';

export const getMMLStats = async () => {
  return await StatisticsRepository.getMMLStatistics();
};
