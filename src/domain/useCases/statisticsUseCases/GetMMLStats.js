import { StatisticsRepository } from '../../../data/repositories/statisticsRepository/StatisticsRepository';

const GetMMLStats = async () => {
    const statsRepository = new StatisticsRepository();
    return await statsRepository.getMMLStats();
};

export default GetMMLStats;
