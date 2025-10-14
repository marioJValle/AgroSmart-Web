// Capa de Dominio
import StatisticsRepository from '../../../data/repositories/StatisticsRepository/StatisticsRepository';

export const getGeneralInfoStats = async () => {
  return await StatisticsRepository.getGeneralInfoStatistics();
};
