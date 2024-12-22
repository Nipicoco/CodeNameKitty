import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SupabaseProvider from '@/lib/supabase/supabase-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth Dashboard',
  description: 'Secure authentication and license management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}