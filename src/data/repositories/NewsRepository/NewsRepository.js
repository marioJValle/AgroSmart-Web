import { db } from "../../database/Firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { News } from "../../../domain/model/News.js";

export class NewsRepositoryImpl {

  // Función que crea una nueva noticia
  async create(news) {
    const docRef = await addDoc(collection(db, "News"), {
      ...news,
    });
    return docRef.id;

  }

  // Función que obtiene todas las noticias
  async getAll() {
    const querySnapshot = await getDocs(collection(db, "News"));
    const newsList = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      newsList.push(
        new News({
          id: doc.id,
          title: data.title,
          description: data.description,
          author: data.author,
          content: data.content,
          date: data.date,
          imageBytes: data.imageBytes, // 👈 aquí viene la imagen en base64
        })
      );
    });

    return newsList;
  }
}
