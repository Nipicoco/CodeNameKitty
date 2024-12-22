import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
          Secure Authentication & License Management
        </h1>
        <p className="mb-8 text-lg leading-8 text-zinc-300">
          A powerful platform for managing user authentication, licenses, and access control.
          Built with Next.js, Supabase, and modern web technologies.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}