// app/(full-width-pages)/(auth)/signin/page.tsx: Server-Komponente für die Anmeldeseite der OTSM-App

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTSM Anmeldeseite | Organisation Technology and Service Management Fraework",
  description: "Anmeldeseite für das OTSM Dashboard",
};

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  // Debug-Logik: Prüfe, ob eine Session vorhanden ist
  if (session) {
    console.log("Vorhandene Session gefunden:", session);
  } else {
    console.log("Keine Session gefunden, zeige Login-Formular");
  }

  return <SignInForm />;
}