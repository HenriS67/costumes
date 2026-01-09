import { pool } from './src/lib/db';

async function test() {
  try {
    const res = await pool.query('SELECT * FROM products');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

test();
