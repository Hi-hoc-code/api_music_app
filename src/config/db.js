const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI_CLUSTER);
    // mongoose.connect(process.env.MONGO_URI_LOCAL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
