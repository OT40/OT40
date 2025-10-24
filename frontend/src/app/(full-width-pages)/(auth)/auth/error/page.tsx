// page.tsx: Fehlerseite für Authentifizierungsfehler in OTSM
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTSM Auth Fehler | Organisation Technology and Service Management Framework",
  description: "Fehlerseite für Authentifizierungsprobleme",
};

export default async function Error({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error || "Ein unbekannter Fehler ist aufgetreten.";
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authentifizierungsfehler</h1>
        <p className="mt-4">{errorMessage}</p>
      </div>
    </div>
  );
}