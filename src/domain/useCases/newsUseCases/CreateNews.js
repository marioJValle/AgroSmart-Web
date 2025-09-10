export class CreateNews {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }

  async execute(news) {
    if (!news.title || !news.content) {
      throw new Error("El título y el contenido son obligatorios");
    }
    return await this.newsRepository.create(news.toPlainObject());
  }
}
