import dotenv from 'dotenv';
// fragments
import mongo from './mongo';
import logs from './logs';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const environment = process.env.NODE_ENV;
export default {
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  mongo,
  logs,
};
