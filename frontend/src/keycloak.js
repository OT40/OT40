// src/keycloak.js: Keycloak-Instanz für OTSM-Frontend-Authentifizierung
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'otsm-realm',
  clientId: 'react-admin-app',
});

// Initialisierung ohne automatischen Login
keycloak.init({ checkLoginIframe: false }).catch((error) => {
  console.error('Keycloak-Initialisierungsfehler:', error);
});

export default keycloak;