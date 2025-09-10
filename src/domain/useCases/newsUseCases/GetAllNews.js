
export class GetAllNews {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }

  async execute() {
    return await this.newsRepository.getAll();
  }
}
