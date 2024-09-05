const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai") 
const GEMINI_API_URL = 'https://api.gemini.com/v1/chat/completions';  // Replace with actual Gemini API endpoint
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const geminiService = {
  getFertilizerRecommendations: async (soilAnalysis, userRole) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt;
      if (userRole === 'farmer') {
        prompt = `As an AI assistant specializing in agriculture, provide easy-to-understand fertilizer recommendations for a farmer based on the following soil analysis:
          pH Level: ${soilAnalysis.pHLevel}
          Nitrogen Level: ${soilAnalysis.nitrogenLevel}
          Phosphorus Level: ${soilAnalysis.phosphorusLevel}
          Potassium Level: ${soilAnalysis.potassiumLevel}
          Organic Matter Content: ${soilAnalysis.organicMatterContent}
          Soil Texture: ${soilAnalysis.soilTexture}

          Please include:
          1. General assessment of the soil health
          2. Specific fertilizer recommendations (types and amounts)
          3. Best practices for application
          4. Any additional soil management tips`;
      } else if (userRole === 'expert') {
        prompt = `As an AI assistant specializing in agriculture, provide detailed and technical fertilizer recommendations for an agricultural expert based on the following soil analysis:
          pH Level: ${soilAnalysis.pHLevel}
          Nitrogen Level: ${soilAnalysis.nitrogenLevel}
          Phosphorus Level: ${soilAnalysis.phosphorusLevel}
          Potassium Level: ${soilAnalysis.potassiumLevel}
          Organic Matter Content: ${soilAnalysis.organicMatterContent}
          Soil Texture: ${soilAnalysis.soilTexture}

          Please include:
          1. Comprehensive soil health assessment
          2. Detailed fertilizer recommendations with scientific rationale
          3. Advanced application techniques and timing considerations
          4. Long-term soil management strategies
          5. Potential interactions between recommended treatments and existing soil conditions`;
      }
      // console.log(prompt);
      
      const result = await model.generateContent(prompt);
      // console.log(result.response.text());  
      return result.response;//recommendations;//.candidates.content.parts.text;
    } catch (error) {
      console.error('Error calling Gemini API:', error.message);
      throw new Error('Failed to get fertilizer recommendations');
    }
  }
};

module.exports = geminiService;