# Dilabit Pharmacy POS - Node.js/PostgreSQL Edition

A production-ready, offline-first pharmacy point-of-sale system with multi-till sync, stock management, M-Pesa integration, and PWA support.

## Quick Start

### Windows
```batch
install-windows.bat
npm start
```

### macOS
```bash
./install-macos.sh
npm start
```

### Linux
```bash
npm install
npm run migrate
npm run seed
npm start
```

### Docker
```bash
docker-compose up -d
```

### Production (Ubuntu)
```bash
sudo chmod +x deploy.sh && sudo ./deploy.sh
```

## Default Login

- **Username:** owner
- **PIN:** 1234

⚠️ Change immediately in production!

## Features

✅ Role-based access (owner, pharmacist, cashier, manager)  
✅ Sales with batch allocation  
✅ Stock receiving and tracking  
✅ Daily reports  
✅ Low stock alerts  
✅ M-Pesa integration starter  
✅ Offline-first PWA  
✅ PostgreSQL database  
✅ Automated backups  
✅ PM2 clustering  
✅ HTTPS/Let's Encrypt  
✅ Multi-till sync queue  

## Documentation

- [INSTALLATION.md](INSTALLATION.md) - Setup guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [SECURITY.md](SECURITY.md) - Security checklist
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guide

## Architecture

```
Node.js/Express API
├── PostgreSQL database
├── JWT authentication
├── Role-based permissions
├── M-Pesa integration
├── Sync queue
├── Backup automation
└── Web/PWA frontend
```

## Endpoints

- `POST /api/auth/login` - User login
- `GET /api/products/search` - Search products
- `POST /api/stock/receive` - Receive stock
- `POST /api/sales` - Create sale
- `GET /api/reports/daily` - Daily sales
- `GET /api/reports/low-stock` - Low stock alert
- `POST /api/payments/initiate` - M-Pesa STK push
- `POST /api/backups/create` - Backup database

## Environment Variables

```env
PORT=3000
JWT_SECRET=your-secret
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dilabit_pharmacy_pos
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
DARJA_KEY=
DARJA_SECRET=
```

## Technology Stack

- **Backend:** Node.js 18+, Express.js
- **Database:** PostgreSQL 13+
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Security:** JWT, Bcrypt, Helmet
- **Deployment:** PM2, Nginx, Let's Encrypt
- **Containers:** Docker, Docker Compose
- **PWA:** Service Workers, Offline Support

## Monitoring

```bash
pm2 logs dilabit-pos
pm2 status
psql -U postgres dilabit_pharmacy_pos
```

## Backups

Automated daily. Restore:

```bash
gunzip -c /var/backups/dilabit-pos/db_backup_*.sql.gz | psql -U postgres dilabit_pharmacy_pos
```

## License

MIT - See LICENSE file

## Support

For issues, questions, or contributions, please open a GitHub issue or contact the project maintainer.

---

**Dilabit Pharmacy Limited** - Nairobi, Kenya  
Built with ❤️ for pharmacy businesses
