'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';

export async function signInWithOAuth() {
  const supabase = createClient();

  const { data, error } = await (
    await supabase
  ).auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  console.log(data);

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    console.error(error);
  }
}
