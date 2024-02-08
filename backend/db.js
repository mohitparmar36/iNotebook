const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

const connectToMongo = async () => {
  try {
    mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectToMongo;
