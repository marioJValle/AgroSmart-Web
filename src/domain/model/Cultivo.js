export class Cultivo {
  constructor({ id = null, name, description, type, harvestTime, imageCrop = '' }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.harvestTime = harvestTime;
    this.imageCrop = imageCrop; // Añadir campo de imagen
  }

  toPlainObject() {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      harvestTime: this.harvestTime,
      imageCrop: this.imageCrop, // Incluir en el objeto plano
    };
  }
}