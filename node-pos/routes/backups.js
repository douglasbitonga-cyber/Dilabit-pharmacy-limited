const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authRequired, requireRole } = require('../middleware/auth');
router.post('/create', authRequired, requireRole('owner'), async (req,res,next)=>{ try { const r=await db.query('SELECT current_database() database, now() created_at'); res.status(201).json({ ok:true, ...r.rows[0] }); } catch(e){next(e);} });
module.exports = router;
