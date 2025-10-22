import { db } from "../../database/Firebase.js";
import { addDoc, collection, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { News } from "../../../domain/model/News.js";

export class NewsRepository {

  constructor() {
    this.collectionName = "News";
    this.collectionRef = collection(db, this.collectionName);
  }

  // Función que crea una nueva noticia
  async createNews(news) {
    const plainNews = news.toPlainObject();
    const docRef = await addDoc(this.collectionRef, plainNews);
    return docRef.id;
  }

  // Función que obtiene noticias basadas en el rol del usuario
  async getNews(user) {
    if (!user) return [];

    let newsQueries;
    if (user.role === 'Administrador') {
      // El admin puede ver todo
      newsQueries = [getDocs(this.collectionRef)];
    } else {
      // Las instituciones ven lo publicado por admins y todo lo suyo
      const adminPublishedQuery = query(this.collectionRef, 
        where("authorRole", "==", "Administrador"), 
        where("status", "==", "published")
      );
      const ownContentQuery = query(this.collectionRef, 
        where("authorId", "==", user.uid)
      );
      newsQueries = [getDocs(adminPublishedQuery), getDocs(ownContentQuery)];
    }

    const snapshots = await Promise.all(newsQueries);
    const newsMap = new Map();

    snapshots.forEach(snapshot => {
      snapshot.forEach((doc) => {
        if (!newsMap.has(doc.id)) {
            const data = doc.data();
            newsMap.set(doc.id, new News({ id: doc.id, ...data }));
        }
      });
    });

    return Array.from(newsMap.values()).sort((a, b) => b.date - a.date);
  }

  // Función para actualizar una noticia (ej. para cambiar status)
  async updateNews(newsId, data) {
    const newsRef = doc(db, this.collectionName, newsId);
    await updateDoc(newsRef, data);
  }

  // Función para eliminar una noticia
  async deleteNews(newsId) {
    const newsRef = doc(db, this.collectionName, newsId);
    await deleteDoc(newsRef);
  }
}
