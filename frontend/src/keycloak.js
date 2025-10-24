// src/keycloak.js: Keycloak-Instanz für OTSM-Frontend-Authentifizierung (Client-seitig)
import Keycloak from 'keycloak-js';

/** @type {Keycloak | null} */
let keycloak = null;

if (typeof window !== 'undefined') {
  keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'otsm-realm',
    clientId: 'react-admin-app',
  });

  keycloak.init({ checkLoginIframe: false }).catch((error) => {
    console.error('Keycloak-Initialisierungsfehler:', error);
  });
}

export default keycloak;