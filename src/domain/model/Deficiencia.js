export class Deficiencia {
  constructor({ id = null, title, description, symptoms, solutions }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.symptoms = symptoms;
    this.solutions = solutions;
  }

  toPlainObject() {
    return {
      title: this.title,
      description: this.description,
      symptoms: this.symptoms,
      solutions: this.solutions,
    };
  }
}