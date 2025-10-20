import { db } from "../../database/Firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Fertilizante } from "../../../domain/model/Fertilizante";

export class FertilizantesRepository {
  constructor() {
    this.collectionName = "Fertilizers";
  }

  async create(fertilizanteData) {
    const fertilizante = new Fertilizante(fertilizanteData);
    const docRef = await addDoc(collection(db, this.collectionName), fertilizante.toPlainObject());
    return docRef.id;
  }

  async getAll() {
    const snapshot = await getDocs(collection(db, this.collectionName));
    const fertilizantes = [];
    snapshot.forEach((docSnap) => {
      fertilizantes.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    return fertilizantes;
  }

  async update(id, fertilizanteData) {
      // ✅ Validación robusta
      if (!id || id === "null" || id === "undefined" || typeof id !== "string" || id.trim() === "") {
        throw new Error(`ID inválido para actualizar: ${id}`);
      }

      console.log("📝 Actualizando fertilizante con ID:", id);

      const fertilizante = new Fertilizante(fertilizanteData);
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, fertilizante.toPlainObject());
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
