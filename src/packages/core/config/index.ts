/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
// fragments
import logsSettings from './logs';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const environment = process.env.NODE_ENV;
export const port = parseInt(process.env.PORT, 10);
export const logs = logsSettings;

export default {
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  logs,
};
