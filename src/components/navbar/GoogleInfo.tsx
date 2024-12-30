'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function GoogleInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center gap-4'>
      <h1>{session?.user?.name}님 </h1>
      {session?.user ? (
        <button
          className='rounded-lg bg-red-500 p-3 text-xl font-semibold text-white duration-200 hover:scale-105'
          onClick={() => signOut()}
        >
          Sign out
        </button>
      ) : (
        <Link
          className='rounded-lg bg-blue-500 p-3 text-xl font-semibold text-white duration-200 hover:scale-105'
          href='/login'
        >
          Login
        </Link>
      )}
    </div>
  );
}
