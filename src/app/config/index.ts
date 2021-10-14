/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
import logsSettings from './logs';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const environment = process.env.NODE_ENV;
export const port = parseInt(process.env.PORT, 10);
export const logs = logsSettings;
