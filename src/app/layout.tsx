import type { Metadata } from 'next';
import '../styles/global.css';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import Navbar from '../components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Kanban Board',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
