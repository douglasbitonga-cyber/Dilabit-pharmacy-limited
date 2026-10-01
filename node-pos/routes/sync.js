const express = require('express');
const db = require('../config/db');
const { authRequired } = require('../middleware/auth');
const router = express.Router();
router.get('/', authRequired, async (req,res,next)=>{ try { const r=await db.query("SELECT * FROM sync_queue WHERE status IN ('pending','failed') ORDER BY created_at LIMIT 100"); res.json(r.rows); } catch(e){next(e);} });
module.exports = router;
