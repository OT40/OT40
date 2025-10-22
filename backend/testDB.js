// testDB.js: Testet die PostgreSQL-Verbindung für OTSM-Backend
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Datenbankverbindung erfolgreich:', res.rows[0]);
  } catch (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
