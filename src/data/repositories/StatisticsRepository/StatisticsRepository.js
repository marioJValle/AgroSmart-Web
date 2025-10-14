// Capa de Datos
import { db } from "../../database/Firebase";
import { collection, getDocs } from "firebase/firestore";

class StatisticsRepository {
  async getMMLStatistics() {
    try {
      const statsCollection = collection(db, "mml_stats");
      const statsSnapshot = await getDocs(statsCollection);
      if (statsSnapshot.empty) {
        return null;
      }
      // Devolver el primer documento encontrado
      const docData = statsSnapshot.docs[0].data();
      return {
        performance: docData.performance || 0,
        responseTime: docData.responseTime || 0,
        accuracy: docData.accuracy || 0,
      };
    } catch (error) {
      console.error("Error fetching MML stats:", error);
      return null;
    }
  }

  async getGeneralInfoStatistics() {
    try {
      const usersCollection = collection(db, "userDetails");
      const userSnapshot = await getDocs(usersCollection);
      if (userSnapshot.empty) {
        return null;
      }

      const cropTypes = new Set();
      const soilTypes = new Set();
      const municipalities = new Set();

      userSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.cropType) cropTypes.add(data.cropType);
        if (data.soilType) soilTypes.add(data.soilType);
        if (data.municipality) municipalities.add(data.municipality);
      });

      return {
        cropTypes: cropTypes.size,
        soilTypes: soilTypes.size,
        municipalities: municipalities.size,
      };
    } catch (error) {
      console.error("Error fetching general info stats:", error);
      return null;
    }
  }
}

export default new StatisticsRepository();
