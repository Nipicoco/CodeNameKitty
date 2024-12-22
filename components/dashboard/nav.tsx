'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Key,
  Settings,
  Shield,
  UserCircle,
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Licenses',
    icon: Key,
    href: '/licenses',
    color: 'text-violet-500',
  },
  {
    label: 'Profile',
    icon: UserCircle,
    href: '/profile',
    color: 'text-pink-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-orange-700',
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full w-64 border-r py-6">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === route.href && 'bg-muted'
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn('mr-2 h-4 w-4', route.color)} />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}