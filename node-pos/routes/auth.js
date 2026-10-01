const express = require('express');
const router = express.Router();
const { login } = require('../services/auth.service');
router.post('/login', async (req,res,next)=>{ try { res.json(await login(req.body.username, req.body.pin)); } catch(e){ res.status(401).json({error:'Invalid credentials'}); } });
module.exports = router;
