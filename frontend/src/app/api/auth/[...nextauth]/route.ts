// route.ts: API-Route für NextAuth mit Keycloak-Integration in der OTSM-App

import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import type { JWT } from "next-auth/jwt";
import type { Session, Account } from "next-auth";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token; // Füge id_token hinzu für Keycloak
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token.idToken) {
        (session as any).idToken = token.idToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };