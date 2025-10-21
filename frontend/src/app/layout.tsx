// app/layout.tsx: Root-Layout für OTSM-App, integriert Client-Provider-Wrapper

import { Outfit } from "next/font/google";
import ProviderWrapper from "@/components/ProviderWrapper";
import "./globals.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "OTSM Admin Dashboard",
  description: "Organizational Technological Service Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}