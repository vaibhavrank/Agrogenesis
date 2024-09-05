const SoilData = require('../models/SoilData');
const soilAnalysisService = require('../services/soilAnalyzeService');
const geminiService = require('../services/geminiService');
const User = require('../models/User');

exports.submitSoilData = async (req, res) => {
  try {
    const temp = await User.findOne({email:req.body.email});
    const newSoilData = new SoilData({
      pH:req.body.pH,
      nitrogen:req.body.nitrogen,
      pottassium:req.body.pottassium,
      organicMatter:req.body.organicMatter,
      texture:req.body.texture,
      user:temp._id,
    });
    await newSoilData.save();
    res.status(201).json(newSoilData);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message:"submition of soil data failed",error: error.message });
  }
};

exports.getSoilData = async (req, res) => {
  try {
    const user = await User.findOne({email:req.email});
    const soilData = await SoilData.find({ user: req.user._id });
    res.json(soilData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.analyzeSoilData = async (req, res) => {
  try {
    const {mail} = req.body;
    console.log(req.params.id);
    const soilData = await SoilData.findById({_id:req.params.id});
    const user = await User.findOne({email:mail});
    if (!soilData) {
      return res.status(404).json({ message: 'Soil data not found' });
    }
    
    if (soilData.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to analyze this soil data' });
    }

    const analysis = await soilAnalysisService.analyzeSoil(soilData);
    const recommendations = await geminiService.getFertilizerRecommendations(analysis,user.role);
    
    res.json({ analysis, recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};