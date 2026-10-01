const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const dir=path.join(__dirname,'../data/backups'); fs.mkdirSync(dir,{recursive:true}); const file=path.join(dir,`db-${new Date().toISOString().replace(/[:.]/g,'-')}.sql`); execFile('pg_dump',['-f',file,'-h',process.env.DB_HOST||'localhost','-p',process.env.DB_PORT||'5432','-U',process.env.DB_USER||'postgres',process.env.DB_NAME||'dilabit_pharmacy_pos'],{env:{...process.env,PGPASSWORD:process.env.DB_PASSWORD}},e=>{if(e){console.error(e);process.exit(1);} console.log(file);});
