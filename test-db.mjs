import { pool } from './src/lib/db.js'; // .js car Node veut du js/esm

async function test() {
  try {
    const res = await pool.query('SELECT * FROM products');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

test();
