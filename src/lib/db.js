import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'costumes_vintage',
  password: 'monmotdepasse',
  port: 5432,
});
