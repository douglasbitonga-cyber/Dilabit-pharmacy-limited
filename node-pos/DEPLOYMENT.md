# Production Deployment Guide

## Prerequisites

- Ubuntu 20.04+
- 2GB+ RAM
- Public domain name
- SSH root access
- Ports 80 and 443 open

## Quick Deploy

```bash
# On your server
ssh root@your-server
cd /tmp
wget https://raw.githubusercontent.com/douglasbitonga-cyber/Dilabit-pharmacy-limited/main/node-pos/deploy.sh
chmod +x deploy.sh
./deploy.sh
```

## Manual Steps

### 1. System Setup

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm postgresql nginx certbot python3-certbot-nginx
```

### 2. Database

```bash
sudo -u postgres psql <<EOF
CREATE DATABASE dilabit_pharmacy_pos;
ALTER USER postgres WITH PASSWORD 'new_password';
EOF
```

### 3. Application

```bash
sudo mkdir -p /var/www/dilabit-pos
cd /var/www/dilabit-pos
# Copy your files here
npm install
npm run migrate
npm run seed
```

### 4. PM2

```bash
sudo npm install -g pm2
pm2 start server.js --name dilabit-pos
pm2 save
pm2 startup
```

### 5. Nginx & SSL

```bash
sudo certbot --nginx -d yourdomain.com
sudo systemctl reload nginx
```

## Monitoring

```bash
pm2 logs dilabit-pos
pm2 status
```

## Backups

Automated daily at 2 AM. Restore with:

```bash
gunzip -c /var/backups/dilabit-pos/db_backup_*.sql.gz | psql -U postgres dilabit_pharmacy_pos
```
