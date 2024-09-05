const mongoose = require('mongoose');
const User = require('./User');
const SoilDataSchema = new mongoose.Schema({
  pH: {type:Number},
  nitrogen: {type:Number},
  phosphorus: {type:Number},
  potassium: {type:Number},
  organicMatter: {type:Number},
  texture: {type:String},
  user:{ type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SoilData', SoilDataSchema);