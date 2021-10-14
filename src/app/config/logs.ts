import { environment } from './index';
import path from 'path';
import fs from 'fs';

let dir = process.env.LOG_DIR;
if (!dir) dir = path.resolve(__dirname, '..', '..', '..', 'logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

export default {
  logDirectory: process.env.LOG_DIR,
  logLevel: environment === 'development' ? 'debug' : 'warn',
  options: {
    file: {
      level: 'debug',
      filename: dir + '/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
      json: true,
      maxSize: '20m',
      colorize: true,
      maxFiles: '14d',
    },
  },
};
