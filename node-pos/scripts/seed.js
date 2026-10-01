const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
(async()=>{ const hash=await bcrypt.hash(process.env.SEED_OWNER_PIN || '1234',12); await pool.query(`INSERT INTO users(username,full_name,role,pin_hash) VALUES('owner','Store Owner','owner',$1) ON CONFLICT(username) DO NOTHING`,[hash]); await pool.end(); console.log('Seed complete. Change the owner PIN before production use.'); })().catch(e=>{console.error(e);process.exit(1);});
