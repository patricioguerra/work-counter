'use client';

import { useCounter } from '@/app/lib/context/CounterContext';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { status } = useCounter();
  const [session, setSession] = useState<any>(null);
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
    <div className={session ? 'flex flex-row items-center justify-between' : ''}>
      <div>
        <h1 className={`text-4xl font-medium tracking-wide ${!session && 'flex justify-center'}`}>
          Work timer
        </h1>
        {session && <div className="text-2xl tracking-wide">{status}</div>}
      </div>
      <div>
        {session && (
          <div className="flex flex-col items-center justify-between gap-2">
            <div>Logged as {session.user.user_metadata.full_name}</div>
            <button className="cs-btn ml-auto" onClick={handleSignOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
