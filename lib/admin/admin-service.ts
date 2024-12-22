'use client';

import { supabase } from '@/lib/supabase/client';
import type { Profile, InviteCode } from '@/types';

export async function getUsers(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function banUser(userId: string) {
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    banned: true,
  });

  if (error) throw error;
}

export async function deleteUser(userId: string) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;
}

export async function generateInviteCodes(amount: number = 1): Promise<InviteCode[]> {
  const codes = Array.from({ length: amount }, () => ({
    code: generateRandomCode(),
  }));

  const { data, error } = await supabase
    .from('invite_codes')
    .insert(codes)
    .select();

  if (error) throw error;
  return data;
}

export async function getInviteCodes(): Promise<InviteCode[]> {
  const { data, error } = await supabase
    .from('invite_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

function generateRandomCode(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}