const mongoose = require('mongoose');
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soil_analysis_db';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  mongoURI,
};