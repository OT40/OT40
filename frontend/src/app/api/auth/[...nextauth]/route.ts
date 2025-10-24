// route.ts: NextAuth-Konfiguration für Keycloak-Integration in OTSM
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import type { JWT } from 'next-auth/jwt';
import type { Session, Account } from 'next-auth';

// Erweitere Typen für JWT und Session
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string | null;
    idToken?: string | null;
  }
}
declare module 'next-auth' {
  interface Session {
    accessToken?: string | null;
    idToken?: string | null;
  }
}

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secure-secret-key', // Füge secret hinzu
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || 'react-admin-app',
      clientSecret: process.env.KEYCLOAK_SECRET || '3zq84u6KxVLS5oQ3mOtV3ZAm5OcNFeOs',
      issuer: process.env.KEYCLOAK_ISSUER || 'http://localhost:8080/realms/otsm-realm',
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        token.accessToken = account.access_token ?? null;
        token.idToken = account.id_token ?? null;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken ?? null;
      session.idToken = token.idToken ?? null;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };