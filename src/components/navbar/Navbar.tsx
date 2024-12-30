import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex h-[80px] items-center justify-evenly shadow-xl'>
      <div className='border-2 border-red-500'>
        <h1 className='text-start text-3xl'>EduPrompt</h1>
      </div>
      <div>
        <Link
          className='text-xl font-semibold duration-200 hover:scale-110'
          href='/quiz'
        >
          퀴즈
        </Link>
      </div>
      <div>닉네임</div>
    </div>
  );
}
