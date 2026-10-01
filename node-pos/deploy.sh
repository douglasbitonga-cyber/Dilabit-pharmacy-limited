#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Dilabit Pharmacy POS - Production Deploy${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: This script must be run as root${NC}"
  exit 1
fi

echo -e "${YELLOW}Updating system packages...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}Installing dependencies...${NC}"
apt install -y curl git nginx postgresql postgresql-contrib certbot python3-certbot-nginx ca-certificates build-essential ufw

echo -e "${YELLOW}Configuring firewall...${NC}"
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

echo -e "${YELLOW}Installing Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

echo -e "${YELLOW}Setting up PostgreSQL...${NC}"
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo -u postgres psql <<EOF
CREATE DATABASE dilabit_pharmacy_pos;
ALTER USER postgres WITH PASSWORD 'postgres';
EOF

echo -e "${YELLOW}Creating app directory...${NC}"
mkdir -p /var/www/dilabit-pos
cd /var/www/dilabit-pos

if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found. Copy all node-pos files first.${NC}"
  exit 1
fi

echo -e "${YELLOW}Installing Node dependencies...${NC}"
npm install

echo -e "${YELLOW}Creating .env file...${NC}"
cat > .env <<'ENVEOF'
PORT=3000
JWT_SECRET=replace_with_strong_secret_min_32_chars
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dilabit_pharmacy_pos
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
ENVEOF

echo -e "${YELLOW}Running migrations...${NC}"
npm run migrate

echo -e "${YELLOW}Seeding default users...${NC}"
npm run seed

echo -e "${YELLOW}Installing PM2...${NC}"
sudo npm install -g pm2

echo -e "${YELLOW}Starting app with PM2...${NC}"
pm2 start server.js --name dilabit-pos

echo -e "${YELLOW}Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/dilabit-pos <<'NGINXEOF'
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/dilabit-pos /etc/nginx/sites-enabled/dilabit-pos
rm -f /etc/nginx/sites-enabled/default
nginx -t
sudo systemctl reload nginx

echo -e "${YELLOW}Generating SSL certificate...${NC}"
sudo certbot --nginx -d yourdomain.com --non-interactive --agree-tos -m admin@yourdomain.com

echo -e "${YELLOW}Configuring PM2 startup...${NC}"
pm2 save
env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

echo -e "${YELLOW}Setting up automatic backups...${NC}"
mkdir -p /var/backups/dilabit-pos
cat > /usr/local/bin/dilabit-backup.sh <<'BACKUPEOF'
#!/bin/bash
BACKUP_DIR="/var/backups/dilabit-pos"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres dilabit_pharmacy_pos | gzip > "$BACKUP_DIR/db_backup_$DATE.sql.gz"
find $BACKUP_DIR -type f -mtime +30 -delete
echo "Backup completed: $BACKUP_DIR/db_backup_$DATE.sql.gz"
BACKUPEOF

chmod +x /usr/local/bin/dilabit-backup.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/dilabit-backup.sh") | crontab -

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}Access your app at: https://yourdomain.com${NC}"
echo ""
echo -e "${YELLOW}Default login credentials:${NC}"
echo "  owner / 1234"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update yourdomain.com in /etc/nginx/sites-available/dilabit-pos"
echo "2. Update CLIENT_URL in .env"
echo "3. Set strong JWT_SECRET in .env"
echo "4. Configure M-Pesa credentials in .env"
echo "5. Restart: pm2 restart dilabit-pos"
echo "6. Monitor logs: pm2 logs dilabit-pos"
echo ""
echo -e "${YELLOW}Backups are automated daily at 2 AM${NC}"
echo ""