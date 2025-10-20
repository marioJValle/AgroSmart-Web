import { db } from "../../database/Firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Cultivo } from "../../../domain/model/Cultivo";

export class CultivosRepository {
  constructor() {
    this.collectionName = "Crops"; // 🔹 Nombre de la colección en Firestore
  }

  async create(cultivoData) {
    const cultivo = new Cultivo(cultivoData);
    const docRef = await addDoc(collection(db, this.collectionName), cultivo.toPlainObject());
    return docRef.id;
  }

  async getAll() {
    const snapshot = await getDocs(collection(db, this.collectionName));
    const cultivos = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      console.log("📄 Documento de Firestore:", docSnap.id, data); // Debug
      cultivos.push({
        id: docSnap.id, // ✅ Asegurar que esto no sea null
        ...data,
      });
    });
    return cultivos;
  }

  async update(id, cultivoData) {
    // ✅ Validación robusta
    if (!id || id === "null" || id === "undefined" || typeof id !== "string" || id.trim() === "") {
      throw new Error(`ID inválido para actualizar: ${id}`);
    }

    console.log("📝 Actualizando cultivo con ID:", id);

    const cultivo = new Cultivo(cultivoData);
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, cultivo.toPlainObject());
  }

  async delete(id) {
    console.log("🗑️ Eliminando documento - ID recibido:", id, "Tipo:", typeof id);
    console.log("🗑️ Colección:", this.collectionName);

    // ✅ Validación más robusta que también detecta objetos
    if (!id) {
      throw new Error(`ID inválido para eliminar: ${id}`);
    }

    // ✅ Si id es un objeto, convertirlo a string para el mensaje de error
    if (typeof id === 'object') {
      throw new Error(`ID inválido - se recibió un objeto en lugar de string: ${JSON.stringify(id)}`);
    }

    if (id === "null" || id === "undefined" || typeof id !== "string" || id.trim() === "") {
      throw new Error(`ID inválido para eliminar: ${id}`);
    }

    if (!this.collectionName || this.collectionName.trim() === "") {
      throw new Error(`Nombre de colección inválido: ${this.collectionName}`);
    }

    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
    console.log("✅ Documento eliminado exitosamente");
  }

}
