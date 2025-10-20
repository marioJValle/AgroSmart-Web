import { db } from "../../database/Firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Deficiencia } from "../../../domain/model/Deficiencia";

export class DeficienciasRepository {
  constructor() {
    this.collectionName = "Deficiencies";
  }

  async create(deficienciaData) {
    const deficiencia = new Deficiencia(deficienciaData);
    const docRef = await addDoc(collection(db, this.collectionName), deficiencia.toPlainObject());
    return docRef.id;
  }

  async getAll() {
    const snapshot = await getDocs(collection(db, this.collectionName));
    const deficiencias = [];
    snapshot.forEach((docSnap) => {
      deficiencias.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    return deficiencias;
  }

  async update(id, deficienciaData) {
    const deficiencia = new Deficiencia(deficienciaData);
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, deficiencia.toPlainObject());
  }

  async delete(id) {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
