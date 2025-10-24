"use client";

// page.tsx: Geschützte Profilseite für OTSM.
// Zeigt Benutzerinformationen nur für authentifizierte Benutzer an, geschützt durch Protected-Komponente.

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import Protected from "@/components/Protected";

export default function Profile() {
  const { data: session } = useSession();

  // Debug: Session-Struktur ausgeben
  useEffect(() => {
    console.log('Session:', session);
  }, [session]);

  // Test-Button für Backend-API
  const testProfile = async () => {
    console.log('Test Profile API');
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${session?.accessToken || ''}`, // Wird nach Session-Ausgabe angepasst
        },
      });
      console.log('Profile Response:', await res.json());
    } catch (err) {
      console.error('Fehler beim API-Aufruf:', err);
    }
  };

  return (
    <Protected>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profil
          </h3>
          <div className="space-y-6">
            <UserMetaCard />
            <UserInfoCard />
            <UserAddressCard />
          </div>
          <button onClick={testProfile} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Test API
          </button>
        </div>
      </div>
    </Protected>
  );
}
