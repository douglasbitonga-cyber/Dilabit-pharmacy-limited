const express = require('express');
const db = require('../config/db');
const { authRequired, requireRole } = require('../middleware/auth');
const router = express.Router();
router.post('/dispense', authRequired, requireRole('owner','pharmacist'), async (req,res,next)=>{ try { const { product_id,batch_id,patient_name,prescription_id,quantity }=req.body; const p=await db.query('SELECT controlled_drug FROM products WHERE id=$1',[product_id]); if(!p.rows[0]?.controlled_drug) return res.status(400).json({error:'Product is not controlled'}); const r=await db.query('INSERT INTO controlled_drug_register(product_id,batch_id,prescription_id,patient_name,quantity,dispensed_by,approved_by) VALUES($1,$2,$3,$4,$5,$6,$6) RETURNING *',[product_id,batch_id,prescription_id||null,patient_name,Number(quantity),req.user.id]); res.status(201).json(r.rows[0]); } catch(e){next(e);} });
module.exports = router;
