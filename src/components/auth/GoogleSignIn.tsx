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
      className='w-[380px] rounded-3xl bg-blue-500 px-[20px] py-[8px] font-bold text-white duration-200 hover:scale-105'
    >
      Sign in with Google
    </button>
  );
}
