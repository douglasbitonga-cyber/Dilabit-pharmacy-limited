const express = require('express');
const db = require('../config/db');
const { authRequired } = require('../middleware/auth');
const router = express.Router();

router.post('/', authRequired, async (req, res, next) => {
  const client = await db.pool.connect();
  try {
    const { items, payment_type } = req.body;
    if (!Array.isArray(items) || !items.length || !payment_type) return res.status(400).json({ error: 'items and payment_type are required' });
    await client.query('BEGIN');
    let total = 0;
    const sale = await client.query('INSERT INTO sales(user_id,payment_status) VALUES($1,\'pending\') RETURNING *', [req.user.id]);
    for (const item of items) {
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty <= 0) throw new Error('Invalid quantity');
      const batches = await client.query(`SELECT * FROM batches WHERE product_id=$1 AND quantity_available>0 AND (expiry_date IS NULL OR expiry_date>=CURRENT_DATE) ORDER BY expiry_date ASC NULLS LAST FOR UPDATE`, [item.product_id]);
      let remaining = qty;
      for (const batch of batches.rows) {
        if (!remaining) break;
        const take = Math.min(remaining, batch.quantity_available);
        await client.query('UPDATE batches SET quantity_available=quantity_available-$1 WHERE id=$2', [take, batch.id]);
        await client.query('INSERT INTO sale_items(sale_id,product_id,batch_id,quantity,unit_price,total_amount) VALUES($1,$2,$3,$4,$5,$6)', [sale.rows[0].id, item.product_id, batch.id, take, Number(item.unit_price), take * Number(item.unit_price)]);
        remaining -= take; total += take * Number(item.unit_price);
      }
      if (remaining) throw new Error('Insufficient non-expired stock');
    }
    await client.query('UPDATE sales SET subtotal=$1, grand_total=$1, payment_status=\'recorded\' WHERE id=$2', [total, sale.rows[0].id]);
    await client.query('INSERT INTO payments(sale_id,payment_type,amount,status) VALUES($1,$2,$3,\'recorded\')', [sale.rows[0].id, payment_type, total]);
    await client.query('COMMIT');
    res.status(201).json({ id: sale.rows[0].id, total });
  } catch (err) { await client.query('ROLLBACK'); next(err); } finally { client.release(); }
});
module.exports = router;
