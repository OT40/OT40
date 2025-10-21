// SignInForm.tsx: Client-Komponente für den Keycloak-Login in der OTSM-App

"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import React from "react";

export default function SignInForm() {
  const handleSignIn = () => {
    signIn("keycloak", { callbackUrl: "/analytics" }).catch((error) => {
      console.error("Login-Fehler:", error);
    });
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Zurück zum Dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-700 text-title-sm dark:text-white/90 sm:text-title-md">
              Anmelden
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Melde dich mit Keycloak an!
            </p>
          </div>
          <div>
            <Button onClick={handleSignIn} className="w-full" size="sm">
              Mit Keycloak anmelden
            </Button>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Noch kein Konto?{" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Registrieren
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}