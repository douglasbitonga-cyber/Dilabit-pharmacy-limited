const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

async function login(username, pin) {
  const result = await db.query('SELECT id, username, full_name, role, pin_hash, active FROM users WHERE username=$1', [username]);
  const user = result.rows[0];
  if (!user || !user.active || !(await bcrypt.compare(String(pin || ''), user.pin_hash))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
  return { token, user: { id: user.id, username: user.username, full_name: user.full_name, role: user.role } };
}

module.exports = { login };