import { StatisticsRepository } from '../../../data/repositories/statisticsRepository/StatisticsRepository';

const GetAgriculturalStats = async () => {
    const statsRepository = new StatisticsRepository();
    return await statsRepository.getAgriculturalStats();
};

export default GetAgriculturalStats;
