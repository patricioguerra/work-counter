'use client';

import { useCounter } from '@/app/lib/context/CounterContext';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

export default function Header() {
  const { status } = useCounter();
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <div className={session ? 'flex flex-nowrap items-center justify-between gap-2' : ''}>
      <div className="flex-shrink-0">
        {' '}
        <h1 className="whitespace-nowrap text-4xl font-medium tracking-wide">Work timer</h1>
        {session && <div className="truncate text-2xl tracking-wide">{status}</div>}
      </div>

      {session && (
        <div className="flex min-w-0 flex-shrink flex-col items-center gap-2 truncate">
          <div className="max-w-[130px] truncate sm:max-w-full"> {session.user.email}</div>
          <button className="cs-btn ml-auto shrink-0" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
