export class Cultivo {
  constructor({ id = null, name, description, type, harvestTime }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.harvestTime = harvestTime;
  }

  toPlainObject() {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      harvestTime: this.harvestTime,
    };
  }
}