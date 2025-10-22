import { NewsRepository } from '../../../data/repositories/NewsRepository/NewsRepository';

const UpdateNews = async (newsId, data) => {
    const newsRepository = new NewsRepository();
    return await newsRepository.updateNews(newsId, data);
};

export default UpdateNews;
