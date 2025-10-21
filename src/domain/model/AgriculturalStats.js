export class AgriculturalStats {
  constructor({ 
    id = null, 
    seasonalCultivation, 
    sowingByMunicipality, 
    topCrops, 
    cropDetails 
  }) {
    this.id = id;
    // Example: { '2024-Q1': { 'Maíz': 1500, 'Frijol': 900 }, '2024-Q2': { ... } }
    this.seasonalCultivation = seasonalCultivation;

    // Example: { 'Municipio A': { hectares: 5000, topCrop: 'Maíz' }, 'Municipio B': { ... } }
    this.sowingByMunicipality = sowingByMunicipality;

    // Example: [{ crop: 'Maíz', amount: 50000 }, { crop: 'Sorgo', amount: 35000 }]
    this.topCrops = topCrops;

    // Example: { 'Maíz': { hectares: 12000, producers: 350 }, 'Frijol': { ... } }
    this.cropDetails = cropDetails;
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new AgriculturalStats({
      id: doc.id,
      seasonalCultivation: data.seasonalCultivation,
      sowingByMunicipality: data.sowingByMunicipality,
      topCrops: data.topCrops,
      cropDetails: data.cropDetails,
    });
  }
}
