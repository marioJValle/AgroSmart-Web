

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../database/Firebase";
import { MMLStats } from "../../../domain/model/MMLStats";
import { AgriculturalStats } from "../../../domain/model/AgriculturalStats";
import { UserRepository } from "../userRepository/UserRepository";

// --- DATOS FICTICIOS PARA ESTADÍSTICAS AGRÍCOLAS ---
// TODO: Reemplazar estos datos con llamadas a Firebase
const mockProductionRecords = [
  // 2024-Q1
  { season: '2024-Q1', municipality: 'Juigalpa', crop: 'Maíz', hectares: 500, farmerId: 'f001' },
  { season: '2024-Q1', municipality: 'Juigalpa', crop: 'Maíz', hectares: 300, farmerId: 'f002' },
  { season: '2024-Q1', municipality: 'Juigalpa', crop: 'Frijol', hectares: 200, farmerId: 'f003' },
  { season: '2024-Q1', municipality: 'Cuapa', crop: 'Frijol', hectares: 400, farmerId: 'f004' },
  { season: '2024-Q1', municipality: 'San Pedro de Lóvago', crop: 'Maíz', hectares: 600, farmerId: 'f005' },
  { season: '2024-Q1', municipality: 'Santo Tomás', crop: 'Sorgo', hectares: 300, farmerId: 'f006' },
  { season: '2024-Q1', municipality: 'La Libertad', crop: 'Frijol', hectares: 300, farmerId: 'f007' },

  // 2024-Q2
  { season: '2024-Q2', municipality: 'Juigalpa', crop: 'Maíz', hectares: 600, farmerId: 'f001' },
  { season: '2024-Q2', municipality: 'Juigalpa', crop: 'Maíz', hectares: 350, farmerId: 'f002' },
  { season: '2024-Q2', municipality: 'Cuapa', crop: 'Frijol', hectares: 350, farmerId: 'f004' },
  { season: '2024-Q2', municipality: 'San Pedro de Lóvago', crop: 'Maíz', hectares: 700, farmerId: 'f005' },
  { season: '2024-Q2', municipality: 'La Libertad', crop: 'Frijol', hectares: 400, farmerId: 'f007' },
  { season: '2024-Q2', municipality: 'Comalapa', crop: 'Sorgo', hectares: 250, farmerId: 'f008' },

  // 2024-Q3
  { season: '2024-Q3', municipality: 'Juigalpa', crop: 'Maíz', hectares: 700, farmerId: 'f001' },
  { season: '2024-Q3', municipality: 'Juigalpa', crop: 'Frijol', hectares: 250, farmerId: 'f003' },
  { season: '2024-Q3', municipality: 'San Pedro de Lóvago', crop: 'Maíz', hectares: 800, farmerId: 'f005' },
  { season: '2024-Q3', municipality: 'Santo Tomás', crop: 'Sorgo', hectares: 400, farmerId: 'f006' },
  { season: '2024-Q3', municipality: 'La Libertad', crop: 'Frijol', hectares: 350, farmerId: 'f007' },
  { season: '2024-Q3', municipality: 'Comalapa', crop: 'Sorgo', hectares: 300, farmerId: 'f008' },

  // 2024-Q4
  { season: '2024-Q4', municipality: 'Juigalpa', crop: 'Maíz', hectares: 550, farmerId: 'f001' },
  { season: '2024-Q4', municipality: 'Juigalpa', crop: 'Maíz', hectares: 320, farmerId: 'f002' },
  { season: '2024-Q4', municipality: 'Cuapa', crop: 'Frijol', hectares: 450, farmerId: 'f004' },
  { season: '2024-Q4', municipality: 'San Pedro de Lóvago', crop: 'Maíz', hectares: 650, farmerId: 'f005' },
  { season: '2024-Q4', municipality: 'Santo Domingo', crop: 'Maíz', hectares: 300, farmerId: 'f009' },
];
// --- FIN DE DATOS FICTICIOS ---

export class StatisticsRepository {
  constructor() {
    this.userRepository = new UserRepository();
    this.mmlStatsCollectionName = "MMLStats";
    this.agriculturalRecordsCollectionName = "agricultural_records";
  }

  async getMMLStats() {
    const mmlStatsCollection = collection(db, this.mmlStatsCollectionName);
    const mmlStatsSnapshot = await getDocs(mmlStatsCollection);
    const mmlStats = [];
    mmlStatsSnapshot.forEach((doc) => {
        mmlStats.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return mmlStats;
  }

  // TODO: Este método actualmente usa datos ficticios (mockProductionRecords).
  // Se debe modificar para obtener los datos de Firebase de la colección this.agriculturalRecordsCollectionName.
  async getAgriculturalStats() {
    const users = await this.userRepository.getAll();
    // --- Aggregation Logic ---
    const aggregated = {
        seasonalCultivation: {},
        sowingByMunicipality: {},
        topCrops: {},
        municipalBreakdown: { 'Maíz': {}, 'Frijol': {}, 'Sorgo': {} },
        usersByMunicipality: {},
        soilTypesDistribution: {},
    };

    mockProductionRecords.forEach(rec => {
        // Seasonal Cultivation
        if (!aggregated.seasonalCultivation[rec.season]) aggregated.seasonalCultivation[rec.season] = {};
        if (!aggregated.seasonalCultivation[rec.season][rec.crop]) aggregated.seasonalCultivation[rec.season][rec.crop] = 0;
        aggregated.seasonalCultivation[rec.season][rec.crop] += rec.hectares;

        // Sowing by Municipality (Total Hectares)
        if (!aggregated.sowingByMunicipality[rec.municipality]) aggregated.sowingByMunicipality[rec.municipality] = { hectares: 0 };
        aggregated.sowingByMunicipality[rec.municipality].hectares += rec.hectares;

        // Top Crops (Total Hectares)
        if (!aggregated.topCrops[rec.crop]) aggregated.topCrops[rec.crop] = 0;
        aggregated.topCrops[rec.crop] += rec.hectares;

        // Municipal Breakdown per Crop
        if (!aggregated.municipalBreakdown[rec.crop][rec.municipality]) {
            aggregated.municipalBreakdown[rec.crop][rec.municipality] = { hectares: 0, farmers: new Set() };
        }
        aggregated.municipalBreakdown[rec.crop][rec.municipality].hectares += rec.hectares;
        aggregated.municipalBreakdown[rec.crop][rec.municipality].farmers.add(rec.farmerId);
    });

    // Process user data
    users.forEach(user => {
        // Users by Municipality
        if (user.municipality) {
            aggregated.usersByMunicipality[user.municipality] = (aggregated.usersByMunicipality[user.municipality] || 0) + 1;
        }
        // Soil Types Distribution
        if (user.soilTypes) {
            let soilTypesArray = [];
            if (typeof user.soilTypes === 'string') {
                soilTypesArray = user.soilTypes.split(',').map(s => s.trim());
            } else if (Array.isArray(user.soilTypes)) {
                soilTypesArray = user.soilTypes;
            }

            soilTypesArray.forEach(soilType => {
                if (soilType) { // Ensure not to count empty strings
                    aggregated.soilTypesDistribution[soilType] = (aggregated.soilTypesDistribution[soilType] || 0) + 1;
                }
            });
        }
    });

    // Final formatting
    const finalStats = {
        seasonalCultivation: aggregated.seasonalCultivation,
        sowingByMunicipality: aggregated.sowingByMunicipality,
        topCrops: Object.entries(aggregated.topCrops).map(([crop, amount]) => ({ crop, amount })).sort((a, b) => b.amount - a.amount),
        municipalBreakdown: Object.fromEntries(
            Object.entries(aggregated.municipalBreakdown).map(([crop, municipalities]) => [
                crop,
                Object.entries(municipalities).map(([municipality, data]) => ({
                    municipality,
                    hectares: data.hectares,
                    farmerCount: data.farmers.size
                })).sort((a, b) => b.hectares - a.hectares)
            ])
        ),
        usersByMunicipality: Object.entries(aggregated.usersByMunicipality).map(([municipality, count]) => ({ name: municipality, count })),
        soilTypesDistribution: Object.entries(aggregated.soilTypesDistribution).map(([soilType, count]) => ({ name: soilType, count })),
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new AgriculturalStats({ id: 'mock_agri_stats_id', ...finalStats }));
      }, 500);
    });
  }
}
