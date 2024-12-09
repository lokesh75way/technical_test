import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/your_database';

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      // Mongoose connection options can be specified here
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    // Handle the error appropriately
  }
};


// Note:
// - Remember to call this initialization function before your application starts listening for requests.
