import { NewsRepository } from '../../../data/repositories/NewsRepository/NewsRepository';

const GetNews = async (user) => {
    const newsRepository = new NewsRepository();
    return await newsRepository.getNews(user);
};

export default GetNews;
