// Protected.js: Wiederverwendbarer Wrapper für geschützte Routen in Next.js.
// Prüft NextAuth-Sitzung; bei nicht authentifiziert: Redirect zu /signin.

'use client'; // Next.js Client-Komponente

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Protected = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Lade-Status mit Tailwind
  }

  if (!session) {
    router.push('/signin'); // Next.js Redirect zu Signin (aus Sidebar)
    return null; // Kein Render, bis Redirect
  }

  return <>{children}</>; // Rendert Kinder, wenn authentifiziert
};

export default Protected;
