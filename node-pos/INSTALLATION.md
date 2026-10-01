# Dilabit Pharmacy POS - Installation Guide

## Windows (Local)

1. Download `install-windows.bat`
2. Right-click → Run as Administrator
3. Follow the prompts
4. Run `npm start`
5. Open http://localhost:3000

**Default login:** owner / 1234

## macOS (Local)

```bash
chmod +x install-macos.sh
./install-macos.sh
npm start
```

Open http://localhost:3000

## Linux / Ubuntu (Local)

```bash
sudo apt install nodejs npm postgresql
createdb dilabit_pharmacy_pos
npm install
npm run migrate
npm run seed
npm start
```

Open http://localhost:3000

## Ubuntu Server (Production)

```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

Replace `yourdomain.com` in the deployment output. Open https://yourdomain.com

## Docker

```bash
docker-compose up -d
```

Open http://localhost:3000

## Default Credentials

- Username: `owner`
- PIN: `1234`

⚠️ Change immediately in production.
