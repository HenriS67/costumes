import { routeLoader$ } from '@builder.io/qwik-city';
import { pool } from '~/lib/db';

export const useProducts = routeLoader$(async () => {
  const res = await pool.query('SELECT * FROM products');
  return res.rows; // renvoie la liste des produits
});
