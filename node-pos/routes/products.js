const express = require('express');
const db = require('../config/db');
const { authRequired, requireRole } = require('../middleware/auth');
const router = express.Router();

router.get('/search', authRequired, async (req, res, next) => {
  try {
    const q = `%${String(req.query.q || '').trim()}%`;
    const result = await db.query(`SELECT p.*, COALESCE(SUM(b.quantity_available),0)::int AS stock_on_hand
      FROM products p LEFT JOIN batches b ON b.product_id=p.id
      WHERE p.active AND (p.sku ILIKE $1 OR p.barcode ILIKE $1 OR p.name ILIKE $1 OR p.generic_name ILIKE $1)
      GROUP BY p.id ORDER BY p.name LIMIT 50`, [q]);
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.post('/', authRequired, requireRole('owner','pharmacist'), async (req, res, next) => {
  try {
    const { sku, barcode, name, generic_name, selling_price, purchase_cost, reorder_level, controlled_drug } = req.body;
    if (!sku || !name || Number(selling_price) < 0) return res.status(400).json({ error: 'sku, name and valid selling_price are required' });
    const result = await db.query(`INSERT INTO products(sku,barcode,name,generic_name,selling_price,purchase_cost,reorder_level,controlled_drug)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [sku, barcode || null, name, generic_name || null, Number(selling_price), Number(purchase_cost || 0), Number(reorder_level || 0), Boolean(controlled_drug)]);
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
