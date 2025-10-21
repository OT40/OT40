// app/(full-width-pages)/(auth)/signin/page.tsx: Server-Komponente für die Anmeldeseite der OTSM-App

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";
import type { Session } from "next-auth";

export const metadata: Metadata = {
  title: "OTSM Anmeldeseite | TailAdmin - Next.js Dashboard",
  description: "Anmeldeseite für das OTSM Dashboard",
};

export default async function SignIn() {
  const session = await getServerSession(authOptions) as Session & { accessToken?: string };

  // Wenn eingeloggt, weiterleiten zum Dashboard
  if (session) {
    redirect("/");
  }

  // Rendern der Client-Komponente für den Login
  return <SignInForm />;
}