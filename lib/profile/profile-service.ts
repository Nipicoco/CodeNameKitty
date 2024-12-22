'use client';

import { supabase } from '@/lib/supabase/client';

interface ProfileUpdate {
  username?: string;
  avatar_url?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
}

export async function updateProfile(data: ProfileUpdate) {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', supabase.auth.getUser().then(({ data }) => data.user?.id));

  if (error) throw error;
}

export async function updateNotificationSettings(settings: NotificationSettings) {
  const { error } = await supabase
    .from('profiles')
    .update({
      notification_settings: settings,
    })
    .eq('id', supabase.auth.getUser().then(({ data }) => data.user?.id));

  if (error) throw error;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}