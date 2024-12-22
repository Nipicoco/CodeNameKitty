'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/auth/auth-service';
import { useToast } from '@/components/ui/use-toast';

interface AuthFormState {
  email: string;
  password: string;
  inviteCode?: string;
}

export function useAuthForm(type: 'login' | 'register') {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: AuthFormState) {
    try {
      setLoading(true);
      if (type === 'register') {
        if (!data.inviteCode) {
          throw new Error('Invite code is required');
        }
        await signUp(data.email, data.password, data.inviteCode);
        toast({
          title: 'Account created',
          description: 'Please check your email to verify your account.',
        });
      } else {
        await signIn(data.email, data.password);
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return { loading, onSubmit };
}