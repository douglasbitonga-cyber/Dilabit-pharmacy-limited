const express = require('express');
const db = require('../config/db');
const { authRequired } = require('../middleware/auth');
const router = express.Router();
router.get('/daily', authRequired, async (req,res,next)=>{ try { const r=await db.query('SELECT COUNT(*)::int sales_count, COALESCE(SUM(grand_total),0) total_sales FROM sales WHERE created_at::date=CURRENT_DATE'); res.json(r.rows[0]); } catch(e){next(e);} });
router.get('/low-stock', authRequired, async (req,res,next)=>{ try { const r=await db.query('SELECT p.*,COALESCE(SUM(b.quantity_available),0)::int stock_on_hand FROM products p LEFT JOIN batches b ON b.product_id=p.id GROUP BY p.id HAVING COALESCE(SUM(b.quantity_available),0)<=p.reorder_level'); res.json(r.rows); } catch(e){next(e);} });
module.exports = router;
