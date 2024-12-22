export interface User {
  id: string;
  email?: string;
}

export interface Profile {
  id: string;
  username?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface License {
  id: string;
  hwid: string | null;
  username: string | null;
  expires_at: string;
  status: 'active' | 'expired';
  created_at: string;
}

export interface InviteCode {
  id: string;
  code: string;
  used: boolean;
  created_by: string | null;
  used_by: string | null;
  created_at: string;
}