'use client';

import { signIn } from 'next-auth/react';

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/', // 로그인 성공 후 리다이렉트될 경로
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className='w-[350px] rounded-3xl bg-blue-500 px-2 py-4 text-xl font-bold text-white duration-300 hover:scale-105 hover:bg-blue-600'
    >
      Sign in with Google
    </button>
  );
}
