const SoilData = require('../models/SoilData');

const soilAnalysisService = {
  analyzeSoil: async (soilData) => {
    // Perform soil analysis based on the input data
    const analysis = {
      pHLevel: interpretPH(soilData.pH),
      nitrogenLevel: interpretNutrient(soilData.nitrogen),
      phosphorusLevel: interpretNutrient(soilData.phosphorus),
      potassiumLevel: interpretNutrient(soilData.potassium),
      organicMatterContent: interpretOrganicMatter(soilData.organicMatter),
      soilTexture: soilData.texture,
    };
    // console.log(analysis);
    return analysis;
  }
};

function interpretPH(pH) {
  if (pH < 6.0) return 'Acidic';
  if (pH > 7.5) return 'Alkaline';
  return 'Neutral';
}

function interpretNutrient(value) {
  if (value < 10) return 'Low';
  if (value < 20) return 'Medium';
  return 'High';
}

function interpretOrganicMatter(value) {
  if (value < 2) return 'Low';
  if (value < 5) return 'Medium';
  return 'High';
}

module.exports = soilAnalysisService;