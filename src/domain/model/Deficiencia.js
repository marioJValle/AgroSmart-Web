export class Deficiencia {
  constructor({ id = null, title, description, symptoms, solutions, imageDeficiencies = '' }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.symptoms = symptoms;
    this.solutions = solutions;
    this.imageDeficiencies = imageDeficiencies; // Añadir campo de imagen
  }

  toPlainObject() {
    return {
      title: this.title,
      description: this.description,
      symptoms: this.symptoms,
      solutions: this.solutions,
      imageDeficiencies: this.imageDeficiencies, // Incluir en el objeto plano
    };
  }
}