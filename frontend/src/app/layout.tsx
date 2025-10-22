// layout.tsx: Root-Layout für OTSM mit SessionProvider.

import type { Metadata } from 'next';
import ProviderWrapper from '@/components/ProviderWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'OTSM Dashboard',
  description: 'Organisation Technology and Service Management Framework',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
