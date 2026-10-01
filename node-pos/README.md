# Node.js/PostgreSQL POS

This is a separate implementation under `node-pos/`; it does not replace the existing Python/PySide6 Windows application.

## Run locally

```bash
cd node-pos
cp .env.example .env
npm install
createdb dilabit_pharmacy_pos
npm run migrate
npm run seed
npm start
```

Open `http://localhost:3000/health`.

Default development login: `owner` / `1234`. Change it immediately; do not use this PIN in production.

## Scope

The existing root project remains the Windows desktop POS. This directory is a Node.js API foundation for a future web/PWA client and multi-till server.

Before production use, add automated tests, complete audit coverage, real restore-tested backups, idempotent sync processing, server-side financial controls, and jurisdiction-specific pharmacy compliance review.
