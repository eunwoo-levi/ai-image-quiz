import GoogleSignInButton from '@/components/auth/GoogleSignIn';

export default function page() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <GoogleSignInButton />
    </div>
  );
}
