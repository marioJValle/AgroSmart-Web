// src/domain/entities/User.js

export class User {
  constructor({ id = null, uid, username, email, phoneNumber, municipality, soilTypes,status, role, department, photoURL = null, lastSignInTime = null }) {
    this.id = id; // This will be the email
    this.uid = uid; // This will be the firebase auth uid
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.municipality = municipality;
    this.soilTypes = soilTypes;
    this.status = status;
    this.role = role;
    this.department = department;
    this.photoURL = photoURL;
    this.lastSignInTime = lastSignInTime;
  }

  // Convierte la entidad a un objeto plano (para Firebase u otros repositorios)
  toPlainObject() {
    return {
      id: this.id,
      uid: this.uid,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      municipality: this.municipality,
      soilTypes: this.soilTypes,
      status: this.status,
      role: this.role,
      department: this.department,
      photoURL: this.photoURL,
      lastSignInTime: this.lastSignInTime,
    };
  }

 
}
