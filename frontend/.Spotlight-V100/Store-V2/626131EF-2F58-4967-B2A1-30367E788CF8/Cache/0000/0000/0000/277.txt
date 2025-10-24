// page.tsx: Benutzerdefinierte Fehlerseite für NextAuth in OTSM.

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'OTSM Auth Fehler',
  description: 'Fehler bei der Authentifizierung',
};

export default function AuthError({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error || 'Unbekannter Fehler';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Authentifizierungsfehler</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Fehler: {error}</p>
        <a
          href="/signin"
          className="mt-4 inline-block rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Zurück zum Login
        </a>
      </div>
    </div>
  );
}
