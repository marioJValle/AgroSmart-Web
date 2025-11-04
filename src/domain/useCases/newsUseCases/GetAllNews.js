import { NewsRepository } from '../../../data/repositories/NewsRepository/NewsRepository';
export class GetAllNews {
  constructor(NewsRepository) {
    this.newsRepository = new NewsRepository();
  }

  async execute() { 
    return await this.newsRepository.getAll();
  }
}
