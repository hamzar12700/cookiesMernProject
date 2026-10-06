const mongoose = require('mongoose');

// Your MongoDB connection string (Local or MongoDB Atlas cloud URI)
// const dbURI = 'mongodb://localhost:27017/my_database_name'; 

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB successfully connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the application if connection fails
  }
}

module.exports = connectDB;
