// src/domain/entities/User.js

export class User {
  constructor({ id = null, username, email, phoneNumber, municipality, soilTypes,status, role }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.municipality = municipality;
    this.soilTypes = soilTypes;
    this.status = status;
    this.role = role;
  }

  // Convierte la entidad a un objeto plano (para Firebase u otros repositorios)
  toPlainObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      municipality: this.municipality,
      soilTypes: this.soilTypes,
      status: this.status,
      role: this.role,
    };
  }

 
}
