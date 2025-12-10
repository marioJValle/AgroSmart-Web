import { db } from "../../database/Firebase";
import { collection, getDocs, updateDoc, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { User } from "../../../domain/model/User";

export class UserRepository {
    constructor() {
        this.userCollection = collection(db, "userDetails");
    }

    async addUser(user) {
        const userData = user.toPlainObject();
        const userRef = doc(db, "userDetails", user.id);
        delete userData.id;
        await setDoc(userRef, userData);
    }

    async getUserByDocId(docId) {
        const userRef = doc(db, "userDetails", docId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return new User({ id: userSnap.id, ...userSnap.data() });
        } else {
            return null;
        }
    }

    async getUserByEmail(email) {
        const q = query(this.userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return new User({ id: userDoc.id, ...userDoc.data() });
        }
        return null;
    }

    async getUserByUid(uid) {
        const q = query(this.userCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return new User({ id: userDoc.id, ...userDoc.data() });
        }
        return null;
    }

    async getAll() {
        const userSnapshot = await getDocs(this.userCollection);
        const users = [];
        userSnapshot.forEach((doc) => {
            const data = doc.data();
            users.push(
                new User({
                    id: doc.id,
                    uid: data.uid,
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    municipality: data.municipality,
                    soilTypes: data.soilTypes,
                    status: data.status,
                    role: data.role,
                    department: data.department,
                    photoURL: data.photoURL,
                    lastSignInTime: data.lastSignInTime,
                })
            );
        });
        return users;
    }

    async updateUserField(userId, field, value) {
        const userRef = doc(db, "userDetails", userId);
        await updateDoc(userRef, {
            [field]: value,
        });
    }

    async updateUser(id, data) {
        const userRef = doc(db, "userDetails", id);
        await updateDoc(userRef, data);
    }
}