import GoogleSignInButton from '@/components/auth/GoogleSignIn';

export default function page() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-6'>
      <h1 className='text-xl font-semibold'>
        서비스를 사용하시려면 로그인을 해주세요!
      </h1>
      <GoogleSignInButton />
    </div>
  );
}
