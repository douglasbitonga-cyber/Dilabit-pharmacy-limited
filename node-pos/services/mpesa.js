const crypto = require('crypto');

async function generateAccessToken() {
  if (!process.env.DARAJA_KEY || !process.env.DARAJA_SECRET) throw new Error('M-Pesa not configured');
  const auth = Buffer.from(`${process.env.DARAJA_KEY}:${process.env.DARAJA_SECRET}`).toString('base64');
  const res = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}` }
  });
  const data = await res.json();
  return data.access_token;
}

function generatePassword(shortcode, passkey, timestamp) {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

async function initiateSTKPush({ amount, phone, reference, description }) {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const password = generatePassword(process.env.DARAJA_SHORTCODE, process.env.DARAJA_PASSKEY, timestamp);
  const token = await generateAccessToken();
  const payload = {
    BusinessShortCode: process.env.DARAJA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Number(amount),
    PartyA: String(phone).replace(/\D/g, ''),
    PartyB: process.env.DARAJA_TILL || process.env.DARAJA_SHORTCODE,
    PhoneNumber: String(phone).replace(/\D/g, ''),
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: reference,
    TransactionDesc: description || 'Pharmacy payment'
  };
  const res = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

module.exports = { initiateSTKPush };