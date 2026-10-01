# Dilabit Pharmacy Limited - POS Systems

Two complete pharmacy point-of-sale systems in one repository:

1. **Windows Desktop POS** (Python/PySide6) — existing desktop application
2. **Node.js Web POS** (Express/PostgreSQL) — new production web system

---

## 🚀 Quick Start

### Windows Desktop POS
The existing Python-based application with Windows installer.
```batch
# Already configured in root directory
# See: DilabitPOS.spec, DilabitPOS_Installer.iss
```

### Node.js Web POS (Recommended for Production)

#### Option 1: One-Click Windows Install
```batch
cd node-pos
install-windows.bat
npm start
```
Open: http://localhost:3000

#### Option 2: One-Click macOS Install
```bash
cd node-pos
chmod +x install-macos.sh
./install-macos.sh
npm start
```
Open: http://localhost:3000

#### Option 3: Docker (All Platforms)
```bash
cd node-pos
docker-compose up -d
```
Open: http://localhost:3000

#### Option 4: Production Deploy (Ubuntu)
```bash
cd node-pos
sudo chmod +x deploy.sh
sudo ./deploy.sh
```
Open: https://yourdomain.com

#### Option 5: Manual Linux Setup
```bash
cd node-pos
npm install
npm run migrate
npm run seed
npm start
```
Open: http://localhost:3000

---

## 📋 Default Login Credentials

```
Username: owner
PIN:      1234
```

⚠️ **Change immediately in production!**

---

## ✨ Node.js POS Features

- ✅ **Role-Based Access Control** (owner, pharmacist, cashier, manager)
- ✅ **Sales Management** with automatic batch allocation
- ✅ **Stock Management** with expiry tracking
- ✅ **Daily Reports** and low stock alerts
- ✅ **M-Pesa Integration** (STK push starter)
- ✅ **Multi-Till Sync** queue for offline operation
- ✅ **Automated Backups** (daily at 2 AM)
- ✅ **PWA Support** (install on mobile like native app)
- ✅ **HTTPS/SSL** with Let's Encrypt
- ✅ **PM2 Clustering** for high availability
- ✅ **PostgreSQL Database** with full schema
- ✅ **Audit Logging** for compliance

---

## 📁 Repository Structure

```
Dilabit-pharmacy-limited/
│
├── (Root) Windows Desktop POS
│   ├── pos_app.py                    # Main Python app
│   ├── pharmacy_pos.db               # SQLite database
│   ├── app_icon.ico                  # Application icon
│   ├���─ DilabitPOS.spec               # PyInstaller config
│   ├── DilabitPOS_Installer.iss      # Inno Setup installer
│   ├── .github/workflows/
│   │   └── deploy_release.yml        # GitHub Actions CI/CD
│   └── archive/                      # Legacy files
│
└── node-pos/ ← NEW: Node.js Production POS
    ├── server.js                     # Express server
    ├── package.json                  # Dependencies
    ├── .env.example                  # Config template
    ├── ecosystem.config.js           # PM2 config
    │
    ├── config/
    │   └── db.js                     # PostgreSQL connection
    │
    ├── middleware/
    │   └── auth.js                   # JWT + role auth
    │
    ├── routes/                       # API endpoints
    │   ├── auth.js                   # Login
    │   ├── products.js               # Product search/create
    │   ├── stock.js                  # Stock receiving
    │   ├── sales.js                  # Sale creation
    │   ├── reports.js                # Daily sales & low stock
    │   ├── sync.js                   # Sync queue
    │   ├── payments.js               # M-Pesa integration
    │   ���── backups.js                # Backup endpoints
    │   ├── controlled-drugs.js       # Controlled substances
    │   └── audit.js                  # Audit logging
    │
    ├── services/
    │   ├── auth.service.js           # Authentication logic
    │   └── mpesa.js                  # M-Pesa integration
    │
    ├── scripts/
    │   ├── migrate.js                # Run migrations
    │   ├── seed.js                   # Seed default users
    │   └── backup.js                 # Database backup
    │
    ├── db/
    │   └── migrations/
    │       └── 001_init.sql          # Database schema
    │
    ├── client/
    │   ├── index.html                # Web UI
    │   ├── manifest.json             # PWA manifest
    │   └── sw.js                     # Service worker
    │
    ├── Installation Scripts
    │   ├── install-windows.bat       # Windows one-click install
    │   ├── install-macos.sh          # macOS one-click install
    │   ├── deploy.sh                 # Ubuntu auto-deploy
    │   ├── docker-compose.yml        # Docker setup
    │   └── Dockerfile                # Container image
    │
    └── Documentation
        ├── README.md                 # Node POS guide
        ├── INSTALLATION.md           # Setup instructions
        ├── DEPLOYMENT.md             # Production deploy
        ├── SECURITY.md               # Security checklist
        ├── CONTRIBUTING.md           # Contributing guide
        ├── LICENSE                   # MIT license
        └── .editorconfig             # Editor settings
```

---

## 🔌 API Endpoints (Node.js POS)

### Authentication
- `POST /api/auth/login` — User login with PIN

### Products
- `GET /api/products/search?q=query` — Search by name/barcode/SKU
- `POST /api/products` — Create new product

### Stock
- `POST /api/stock/receive` — Receive stock with batch/expiry

### Sales
- `POST /api/sales` — Create sale (auto batch allocation)

### Reports
- `GET /api/reports/daily` — Daily sales summary
- `GET /api/reports/low-stock` — Low stock alerts

### Payments
- `POST /api/payments/initiate` — M-Pesa STK push
- `POST /api/payments/callback` — M-Pesa callback

### Backups
- `POST /api/backups/create` — Database backup

### Controlled Drugs
- `POST /api/controlled-drugs/dispense` — Dispense controlled substance

---

## ⚙️ Environment Configuration

Create `.env` in `node-pos/` directory:

```env
# Server
PORT=3000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dilabit_pharmacy_pos
DB_USER=postgres
DB_PASSWORD=postgres

# Security
JWT_SECRET=replace_with_min_32_character_secret
CORS_ORIGIN=https://yourdomain.com

# M-Pesa (Optional)
DARJA_ENV=sandbox
DARJA_KEY=your_key
DARJA_SECRET=your_secret
DARJA_SHORTCODE=your_code
DARJA_PASSKEY=your_passkey
DARJA_TILL=your_till
CALLBACK_URL=https://yourdomain.com/api/payments/callback
CALLBACK_SECRET=your_callback_secret
```

---

## 🛠️ Technology Stack

### Backend
- **Node.js 18+** — Runtime
- **Express.js** — Web framework
- **PostgreSQL 13+** — Database
- **Bcryptjs** — Password hashing
- **JWT** — Authentication tokens
- **Helmet** — Security headers

### Frontend
- **HTML5** — Markup
- **CSS3** — Styling
- **JavaScript (Vanilla)** — No dependencies
- **Service Workers** — Offline support
- **PWA** — Mobile app-like experience

### Deployment
- **PM2** — Process management
- **Nginx** — Reverse proxy
- **Let's Encrypt** — SSL certificates
- **Docker** — Containerization
- **Ubuntu 20.04+** — Server OS

---

## 📱 Mobile Installation

### iPhone/iPad (Safari)
1. Open Safari
2. Go to https://yourdomain.com
3. Tap Share → Add to Home Screen
4. Tap Add

### Android (Chrome)
1. Open Chrome
2. Go to https://yourdomain.com
3. Tap Menu → Install app
4. Confirm

---

## 📊 Database Schema

```sql
users                      -- System users
products                   -- Pharmaceutical products
batches                    -- Product batches with expiry
stock_movements            -- Stock in/out tracking
sales                      -- Sale transactions
sale_items                 -- Line items per sale
payments                   -- Payment records
customers                  -- Customer records
controlled_drug_register   -- Controlled substance log
sync_queue                 -- Multi-till sync queue
audit_logs                 -- Compliance audit trail
```

---

## 📦 Deployment Methods

### Local Development (All Platforms)
```bash
cd node-pos
npm install
npm run migrate
npm run seed
npm start
```

### Windows Server
```batch
cd node-pos
install-windows.bat
npm start
```

### macOS
```bash
cd node-pos
./install-macos.sh
npm start
```

### Docker (Any Platform)
```bash
cd node-pos
docker-compose up -d
```

### Ubuntu Server (Production)
```bash
cd node-pos
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

This:
- Installs Node.js, PostgreSQL, Nginx
- Configures SSL/HTTPS
- Sets up PM2 clustering
- Enables automatic backups
- Configures firewall

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password/PIN hashing
- ✅ Role-based access control
- ✅ Rate limiting on endpoints
- ✅ HTTPS/TLS encryption
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ SQL injection prevention (parameterized queries)
- ✅ Automatic daily backups
- ✅ Audit logging

---

## 💾 Backup & Recovery

### Automatic Backups
Daily at 2 AM (if deployed on Ubuntu with deploy.sh)

Location: `/var/backups/dilabit-pos/`

### Manual Backup
```bash
cd node-pos
npm run backup
```

### Restore Database
```bash
gunzip -c /var/backups/dilabit-pos/db_backup_*.sql.gz | psql -U postgres dilabit_pharmacy_pos
```

---

## 📊 Monitoring

### View Logs
```bash
pm2 logs dilabit-pos
```

### Check Status
```bash
pm2 status
```

### Database Health
```bash
psql -U postgres dilabit_pharmacy_pos
SELECT COUNT(*) FROM users;
```

### System Logs
```bash
sudo systemctl status nginx
sudo journalctl -u postgresql
```

---

## 🚨 Security Checklist (Before Production)

- [ ] Change default owner PIN
- [ ] Generate strong JWT_SECRET (32+ random characters)
- [ ] Change PostgreSQL password
- [ ] Enable firewall (UFW)
- [ ] Use HTTPS only (no HTTP)
- [ ] Configure real M-Pesa credentials
- [ ] Enable automated backups
- [ ] Test backup restoration
- [ ] Monitor logs daily
- [ ] Keep Node.js updated
- [ ] Keep PostgreSQL updated
- [ ] Restrict database access
- [ ] Implement audit logging
- [ ] Document incident response
- [ ] Train staff on security

---

## 📚 Documentation

Detailed guides in `node-pos/` directory:

- **README.md** — Node POS overview
- **INSTALLATION.md** — Step-by-step setup
- **DEPLOYMENT.md** — Production deployment guide
- **SECURITY.md** — Security best practices
- **CONTRIBUTING.md** — How to contribute
- **LICENSE** — MIT license

---

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database connection failed
```bash
psql -U postgres -h localhost -d dilabit_pharmacy_pos
```

### PM2 app not starting
```bash
pm2 logs dilabit-pos
pm2 restart dilabit-pos
```

### M-Pesa not working
Verify credentials in `.env`:
- DARAJA_KEY
- DARAJA_SECRET
- DARAJA_SHORTCODE
- DARAJA_PASSKEY

### SSL certificate error
```bash
sudo certbot renew --dry-run
sudo certbot renew
```

---

## 📞 Support & Issues

- **GitHub Issues:** https://github.com/douglasbitonga-cyber/Dilabit-pharmacy-limited/issues
- **Email:** douglasbitonga@gmail.com
- **Location:** Pipeline, Embakasi, Nairobi, Kenya
- **Phone:** +254 710 636 340

---

## 📄 License

MIT License — See `node-pos/LICENSE` file

Copyright (c) 2024 Douglas Bitonga & Dilabit Pharmacy Limited

---

## 🎯 Roadmap

- [ ] Enhanced reporting (PDF export, charts)
- [ ] Customer loyalty program
- [ ] Inventory forecasting
- [ ] Multiple pharmacy support
- [ ] Advanced M-Pesa integration
- [ ] Real-time analytics dashboard
- [ ] Native iOS/Android mobile apps
- [ ] Prescription management
- [ ] Patient records system
- [ ] Supplier integration

---

## ✅ What's Included

✅ Complete backend (Node.js/Express/PostgreSQL)  
✅ Frontend (HTML5/CSS3/JavaScript + PWA)  
✅ Installation scripts (Windows, macOS, Linux)  
✅ Docker setup (docker-compose + Dockerfile)  
✅ Production deployment (Ubuntu auto-deploy)  
✅ Automated backups (daily at 2 AM)  
✅ HTTPS/SSL (Let's Encrypt)  
✅ PM2 clustering (high availability)  
✅ M-Pesa integration (starter)  
✅ Controlled drugs register  
✅ Audit logging  
✅ Complete documentation  
✅ MIT license  

---

## 🏥 For Pharmacies

This system is designed for:
- Retail pharmacies
- Hospital pharmacies
- Clinic dispensaries
- Pharmaceutical wholesalers
- Multi-branch pharmacy chains

⚠️ **Compliance Note:** This is a business management tool, not a regulated medical system. Before live use in a pharmacy, verify compliance with local pharmacy regulations and implement any required audit trails or approval workflows.

---

**Built with ❤️ by Douglas Bitonga**  
**Dilabit Pharmacy Limited** — Nairobi, Kenya

Last updated: October 1, 2026
