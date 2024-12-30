'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function GoogleInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className='flex items-center gap-4'>
      <h1>{session.user?.name}님</h1>
      <button
        className='rounded-lg bg-red-500 p-2 text-xl font-semibold text-white'
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
