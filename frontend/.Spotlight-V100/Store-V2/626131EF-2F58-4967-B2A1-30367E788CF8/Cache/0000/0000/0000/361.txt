// page.tsx: Geschützte Profilseite für OTSM.
// Zeigt Benutzerinformationen nur für authentifizierte Benutzer an, geschützt durch Protected-Komponente.

import type { Metadata } from "next";
import React from "react";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import Protected from "@/components/Protected";

export const metadata: Metadata = {
  title: "OTSM Profil | TailAdmin - Next.js Dashboard Template",
  description: "Benutzerprofil in OTSM",
};

export default function Profile() {
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
        </div>
      </div>
    </Protected>
  );
}
