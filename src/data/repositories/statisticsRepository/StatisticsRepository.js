
// IMPORTANT: This repository returns mock data because the actual Firebase collections do not exist yet.
// When the backend is ready, replace the mock data generation with actual Firestore queries.

import { MMLStats } from "../../../domain/model/MMLStats";
import { AgriculturalStats } from "../../../domain/model/AgriculturalStats";

// --- Mock Data Source ---
// This simulates a more realistic, granular collection in Firebase.
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

const mockMMLStatsData = {
  averageResponseTime: 450, // ms
  accuracy: 92.5,
  successRate: 95.0,
  failureRate: 5.0,
  averageConfidence: 88.7,
  ramUsage: { current: 768, max: 2048, unit: 'MB' },
  intents: {
    'identificar_plaga': 1200,
    'recomendar_fertilizante': 950,
    'predecir_clima': 600,
    'optimizar_riego': 450,
    'saludo': 2000,
  },
  hourlyUsage: [
    5, 3, 2, 4, 10, 20, 35, 50, 75, 90, 110, 120, 115, 130, 125, 100, 85, 70, 65, 55, 40, 30, 20, 10
  ],
  dailyUsage: {
    'Lunes': 1500,
    'Martes': 1800,
    'Miércoles': 2200,
    'Jueves': 1900,
    'Viernes': 2500,
    'Sábado': 1200,
    'Domingo': 800,
  },
};

export class StatisticsRepository {
  constructor() {
    this.mmlStatsCollectionName = "mml_stats";
    this.agriculturalRecordsCollectionName = "agricultural_records";
  }

  async getMMLStats() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new MMLStats({ id: 'mock_mml_stats_id', ...mockMMLStatsData }));
      }, 500);
    });
  }

  async getAgriculturalStats() {
    // --- Aggregation Logic ---
    // This simulates what you would do on a backend or with complex client-side logic
    // to transform raw Firestore data into the stats needed by the UI.
    const aggregated = {
        seasonalCultivation: {},
        sowingByMunicipality: {},
        topCrops: {},
        municipalBreakdown: { 'Maíz': {}, 'Frijol': {}, 'Sorgo': {} }
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
        )
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new AgriculturalStats({ id: 'mock_agri_stats_id', ...finalStats }));
      }, 500);
    });
  }
}
