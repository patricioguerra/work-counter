'use client';

import { signInWithOAuth } from './actions';

export default function page() {
  return (
    <div className="flex items-center justify-center">
      <button onClick={signInWithOAuth} className="cs-btn flex flex-row items-center gap-2">
        Login with Github <img src="/github-white.svg" alt="github" className="mb-[2px] h-3 w-3" />
      </button>
    </div>
  );
}
