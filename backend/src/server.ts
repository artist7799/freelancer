import dotenv from 'dotenv';

// Handle uncaught exceptions first before loading application modules
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down server...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

// Configure Environment Variables
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import { College } from './models/College';
import { seedDB } from './scripts/seed';

const PORT = Number(process.env.PORT) || 5000;

// Connect to MongoDB Atlas
connectDB().then(async () => {
  try {
    const collegeCount = await College.countDocuments();
    if (collegeCount === 0) {
      console.log('No colleges found in the database. Running automatic seeding...');
      await seedDB(false);
      console.log('Automatic seeding completed.');
    } else {
      console.log(`Database already has ${collegeCount} colleges. Skipping seeding.`);
    }
  } catch (seedErr) {
    console.error('Error during auto-seeding:', seedErr);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! Shutting down server gracefully...');
    console.error(err.name, err.message, err.stack);
    server.close(() => {
      process.exit(1);
    });
  });
});
