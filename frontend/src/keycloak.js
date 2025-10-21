// Initialisiert Keycloak-Instanz für OTSM-Frontend-Authentifizierung
import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
url: 'http://localhost:8080',
realm: 'otsm-realm',
clientId: 'react-admin-app',
});
export default keycloak;
