const express = require('express');
const { initiateSTKPush } = require('../services/mpesa');
const router = express.Router();
router.post('/initiate', async (req,res,next)=>{ try { if(!process.env.DARAJA_KEY) return res.status(503).json({error:'M-Pesa is not configured'}); res.json(await initiateSTKPush(req.body)); } catch(e){next(e);} });
router.post('/callback', (req,res)=>res.json({ResultCode:0,ResultDesc:'Accepted'}));
module.exports = router;
