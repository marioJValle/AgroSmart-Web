import { NewsRepository } from '../../../data/repositories/NewsRepository/NewsRepository';

const DeleteNews = async (newsId) => {
    const newsRepository = new NewsRepository();
    return await newsRepository.deleteNews(newsId);
};

export default DeleteNews;
