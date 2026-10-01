const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');
(async()=>{ const dir=path.join(__dirname,'../db/migrations'); for(const file of fs.readdirSync(dir).sort()){ if(file.endsWith('.sql')) await pool.query(fs.readFileSync(path.join(dir,file),'utf8')); } await pool.end(); console.log('Migrations complete'); })().catch(e=>{console.error(e);process.exit(1);});
