'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/dashboard/user-nav';
import { Shield, Layout } from 'lucide-react';

export function DashboardHeader() {
  const { profile } = useAuth();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold">Auth Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {profile?.role === 'admin' && (
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <Layout className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </Button>
          )}
          <UserNav />
        </div>
      </div>
    </header>
  );
}