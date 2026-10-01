const express = require('express');
const db = require('../config/db');
const { authRequired, requireRole } = require('../middleware/auth');
const router = express.Router();

router.post('/receive', authRequired, requireRole('owner','pharmacist'), async (req, res, next) => {
  const client = await db.pool.connect();
  try {
    const { product_id, batch_number, expiry_date, quantity, purchase_cost } = req.body;
    if (!product_id || !batch_number || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) return res.status(400).json({ error: 'Invalid stock payload' });
    await client.query('BEGIN');
    const batch = await client.query(`INSERT INTO batches(product_id,batch_number,expiry_date,quantity_received,quantity_available,purchase_cost)
      VALUES($1,$2,$3,$4,$4,$5) RETURNING *`, [product_id, batch_number, expiry_date || null, Number(quantity), Number(purchase_cost || 0)]);
    await client.query(`INSERT INTO stock_movements(product_id,batch_id,movement_type,quantity,before_qty,after_qty,user_id)
      VALUES($1,$2,'receive',$3,0,$3,$4)`, [product_id, batch.rows[0].id, Number(quantity), req.user.id]);
    await client.query('COMMIT');
    res.status(201).json(batch.rows[0]);
  } catch (err) { await client.query('ROLLBACK'); next(err); } finally { client.release(); }
});
module.exports = router;
