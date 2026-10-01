const express = require('express');
const { authRequired, requireRole } = require('../middleware/auth');
const router = express.Router();
router.get('/', authRequired, requireRole('owner'), (req,res)=>res.json({ message:'Audit endpoint ready' }));
module.exports = router;
