export class News {
  constructor({ id, title, description, author, content, date, imageBytes }) {
    this.id = id ;
    this.title = title;
    this.description = description;
    this.author = author;
    this.content = content;
    this.date = date ? date.toDate ? date.toDate() : date : new Date(); 
    this.imageBytes = imageBytes ;
  }

  toPlainObject() {
    return {
      title: this.title,
      description: this.description,
      author: this.author,
      content: this.content,
      date: this.date,
      imageBytes: this.imageBytes,
    };
  }
}
