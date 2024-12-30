import Link from 'next/link';
import ImageGenerator from './_components/ImageGenerator';

export default function AIImagePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <nav className='mb-8'>
          <Link
            href='/'
            className='flex items-center gap-2 text-blue-600 hover:text-blue-800'
          >
            ← 메인으로 돌아가기
          </Link>
        </nav>

        <div className='rounded-lg bg-white p-6 shadow-lg'>
          <h1 className='mb-2 text-center text-3xl font-bold'>
            AI 이미지 생성기
          </h1>
          <p className='mb-8 text-center text-gray-600'>
            원하는 이미지를 설명해주세요. AI가 당신의 상상을 현실로
            만들어드립니다.
          </p>

          <ImageGenerator />
        </div>
      </div>
    </div>
  );
}
