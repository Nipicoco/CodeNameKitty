'use client';

import { createContext, useContext, useState } from 'react';
import { supabase } from './client';

const Context = createContext({ supabase });

export default function SupabaseProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [supabaseClient] = useState(() => supabase);

  return (
    <Context.Provider value={{ supabase: supabaseClient }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);