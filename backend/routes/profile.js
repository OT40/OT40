// profile.js: Backend-API-Route zum Abrufen und Aktualisieren von Benutzerprofildaten

const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const router = express.Router();

// Datenbankverbindung
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://thomasarends@localhost:5433/otsm_db?schema=public',
});

// Keycloak JWKS-Client für Token-Validierung
const client = jwksClient({
  jwksUri: 'http://localhost:8080/realms/otsm-realm/protocol/openid-connect/certs',
});

// Funktion zum Abrufen des JWKS-Schlüssels
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware: Keycloak-Benutzer-ID aus Token extrahieren
const getUserId = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
    return decoded.sub; // Keycloak-Benutzer-ID (sub)
  } catch (error) {
    console.error('Token-Validierungsfehler:', error);
    return null;
  }
};

// GET: Profil des eingeloggten Benutzers abrufen
router.get('/', async (req, res) => {
  const keycloakId = await getUserId(req);
  if (!keycloakId) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM "001_users" WHERE keycloak_id = $1 AND status != $2',
      [keycloakId, 'deleted']
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Fehler beim Abrufen des Profils:', error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

// POST: Profil erstellen oder aktualisieren
router.post('/', async (req, res) => {
  const keycloakId = await getUserId(req);
  if (!keycloakId) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  const {
    first_name,
    last_name,
    email,
    phone,
    bio,
    country,
    city_state,
    postal_code,
    tax_id,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const existingUser = await client.query(
        'SELECT id, first_name, last_name, email, phone, bio, country, city_state, postal_code, tax_id FROM "001_users" WHERE keycloak_id = $1',
        [keycloakId]
      );

      let userId;
      if (existingUser.rows.length === 0) {
        // Neuen Benutzer erstellen
        userId = uuidv4();
        await client.query(
          `INSERT INTO "001_users" (
            id, keycloak_id, first_name, last_name, email, phone, bio, country, city_state, postal_code, tax_id, role
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            userId,
            keycloakId,
            first_name,
            last_name,
            email,
            phone,
            bio,
            country,
            city_state,
            postal_code,
            tax_id,
            'viewer',
          ]
        );
      } else {
        // Benutzer aktualisieren
        userId = existingUser.rows[0].id;
        const fields = [
          { name: 'first_name', old: existingUser.rows[0].first_name, new: first_name },
          { name: 'last_name', old: existingUser.rows[0].last_name, new: last_name },
          { name: 'email', old: existingUser.rows[0].email, new: email },
          { name: 'phone', old: existingUser.rows[0].phone, new: phone },
          { name: 'bio', old: existingUser.rows[0].bio, new: bio },
          { name: 'country', old: existingUser.rows[0].country, new: country },
          { name: 'city_state', old: existingUser.rows[0].city_state, new: city_state },
          { name: 'postal_code', old: existingUser.rows[0].postal_code, new: postal_code },
          { name: 'tax_id', old: existingUser.rows[0].tax_id, new: tax_id },
        ];

        // Änderungshistorie speichern
        for (const field of fields) {
          if (field.old !== field.new && field.new !== undefined) {
            await client.query(
              `INSERT INTO "001_user_history" (user_id, field_name, old_value, new_value, changed_by)
               VALUES ($1, $2, $3, $4, $5)`,
              [userId, field.name, field.old, field.new, userId]
            );
          }
        }

        await client.query(
          `UPDATE "001_users" SET
            first_name = $1, last_name = $2, email = $3, phone = $4, bio = $5,
            country = $6, city_state = $7, postal_code = $8, tax_id = $9, updated_by = $10
           WHERE keycloak_id = $11`,
          [
            first_name,
            last_name,
            email,
            phone,
            bio,
            country,
            city_state,
            postal_code,
            tax_id,
            userId,
            keycloakId,
          ]
        );
      }

      await client.query('COMMIT');
      res.json({ message: 'Profil gespeichert' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Fehler beim Speichern des Profils:', error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

module.exports = router;
