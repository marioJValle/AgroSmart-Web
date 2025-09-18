import { db } from "../../database/Firebase";
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { User } from "../../../domain/model/User";

export class UserRepository {
    // constructor() {
    //     this.userCollection = collection(db, "users");
    // }
    //funcion para agregar usuario, "por ahora no se usa"
    async addUser(user) {
        const userData = user.toPlainObject();
        await addDoc(this.userCollection, userData);
    }
    //funcion para obtener usuarios,"por ahora no se usa"
    // async getUsers() {
    //     const userSnapshot = await getDocs(this.userCollection);
    //     return userSnapshot.docs.map(doc => new User(doc.id, ...Object.values(doc.data())));
    // }

    //funcion que obtiene todos los usuarios
    async getAll() {
        const userSnapshot = await getDocs(collection(db, "userDetails"));
        const users = [];

        userSnapshot.forEach((doc) => {

            const data = doc.data();
            users.push(
                new User({
                    id: doc.id,
                    ...doc.data(),
                })
            );
        });
        return users;

    }


    //funcion para actualizar un campo especifico de un usuario
    async updateUserField(userId, field, value) {
        const userRef = doc(db, "userDetails", userId);
        await updateDoc(userRef, {
            [field]: value, // usa [field] para actualizar dinámicamente
        });
    }
    async updateUser(id, data) {
        const userRef = doc(db, "userDetails", id);
        await updateDoc(userRef, data);
    }
}