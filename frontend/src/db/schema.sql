-- schema.sql: Definiert die Postgres-Tabelle für Benutzerprofildaten mit Änderungshistorie und Status

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabelle für Benutzerprofildaten
CREATE TABLE IF NOT EXISTS "001_users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keycloak_id VARCHAR(255) NOT NULL UNIQUE, -- Verknüpfung mit Keycloak-Benutzer-ID
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  bio TEXT,
  country VARCHAR(100),
  city_state VARCHAR(100),
  postal_code VARCHAR(20),
  tax_id VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- Status-Workflow: active, inactive, deleted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES "001_users"(id), -- Wer hat die Änderung vorgenommen
  role VARCHAR(50) NOT NULL DEFAULT 'viewer' -- Rolle: viewer, admin
);

-- Trigger für Änderungshistorie (updated_at aktualisieren)
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_001_users_timestamp
BEFORE UPDATE ON "001_users"
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Tabelle für Änderungshistorie
CREATE TABLE IF NOT EXISTS "001_user_history" (
  history_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES "001_users"(id),
  field_name VARCHAR(100) NOT NULL, -- Welches Feld geändert wurde
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  changed_by UUID REFERENCES "001_users"(id) -- Wer hat die Änderung vorgenommen
);

-- Index für schnellere Abfragen
CREATE INDEX idx_001_users_keycloak_id ON "001_users"(keycloak_id);
CREATE INDEX idx_001_user_history_user_id ON "001_user_history"(user_id);
