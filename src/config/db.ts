import { ConnectionOptions } from 'typeorm';

export const db: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'seb9913',
  database: 'projecto',
};
