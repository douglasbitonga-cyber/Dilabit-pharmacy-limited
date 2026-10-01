#!/bin/bash
set -e

echo "Installing Node.js via Homebrew..."
if ! command -v brew >/dev/null 2>&1; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew install node@18
brew link node@18

echo "Installing PostgreSQL..."
brew install postgresql@15
brew services start postgresql@15

echo "Installing dependencies..."
npm install

cat > .env <<'EOF'
PORT=3000
JWT_SECRET=replace_with_long_random_secret_at_least_32_characters
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dilabit_pharmacy_pos
DB_USER=$(whoami)
DB_PASSWORD=
CORS_ORIGIN=http://localhost:3000
EOF

echo "Creating database..."
createdb dilabit_pharmacy_pos || echo "Database already exists"

echo "Running migrations..."
npm run migrate

echo "Seeding users..."
npm run seed

echo ""
echo "Installation complete."
echo ""
echo "Default login credentials:"
echo "  owner / 1234"
echo ""
echo "To start the application, run:"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"