// ProviderWrapper.tsx: Client-Komponente für Provider-Integration in der OTSM-App (löst Server-Component-Konflikt)

"use client";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { ReactNode } from "react";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
