import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../data/database/Firebase";

export class FotografiasRepository {
    constructor() {
        this.collection = collection(db, "DetectionResult");
    }

    async getAllFotografias() {
        const querySnapshot = await getDocs(this.collection);
        const fotografias = [];
        querySnapshot.forEach((doc) => {
            fotografias.push({ id: doc.id, ...doc.data() });
        });
        return fotografias;
    }

    async deleteFotografia(id) {
        const docRef = doc(db, "DetectionResult", id);
        await deleteDoc(docRef);
    }
}
