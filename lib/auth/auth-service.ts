'use client';

import { supabase } from '@/lib/supabase/client';

export async function signUp(email: string, password: string, inviteCode: string) {
  // Verify invite code first
  const { data: invite, error: inviteError } = await supabase
    .from('invite_codes')
    .select()
    .eq('code', inviteCode)
    .eq('used', false)
    .single();

  if (inviteError || !invite) {
    throw new Error('Invalid or used invite code');
  }

  // Create user
  const { data: auth, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  if (auth.user) {
    // Mark invite code as used
    await supabase
      .from('invite_codes')
      .update({ used: true, used_by: auth.user.id })
      .eq('id', invite.id);

    // Create profile
    await supabase.from('profiles').insert({
      id: auth.user.id,
      username: email.split('@')[0], // Default username from email
      role: 'user',
    });
  }

  return auth;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}