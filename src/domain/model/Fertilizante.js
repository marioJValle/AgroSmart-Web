export class Fertilizante {
  constructor({ id = null, name, type, description, recommendedDose, supplier, applicationMethod, imageFertilizers = '' }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.recommendedDose = recommendedDose;
    this.supplier = supplier;
    this.applicationMethod = applicationMethod;
    this.imageFertilizers = imageFertilizers; // Añadir campo de imagen
  }

  toPlainObject() {
    return {
      name: this.name,
      type: this.type,
      description: this.description,
      recommendedDose: this.recommendedDose,
      supplier: this.supplier,
      applicationMethod: this.applicationMethod,
      imageFertilizers: this.imageFertilizers, // Incluir en el objeto plano
    };
  }
}