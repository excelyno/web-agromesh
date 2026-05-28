import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgroMesh Dataset Generator',
  description: 'Web generator CSV/XLSX untuk simulasi IoT Smart Farming AgroMesh.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
