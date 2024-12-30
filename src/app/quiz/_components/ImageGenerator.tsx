'use client';

import { useState } from 'react';
import axios from 'axios';
import { randomSentences } from '@/data/randomSentences';

export default function ImageGenerator() {
  const [sentence, setSentence] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSentence = async (): Promise<void> => {
    const randomIndex = Math.floor(Math.random() * randomSentences.length);
    const selectedSentence = randomSentences[randomIndex];
    setSentence(selectedSentence);

    setLoading(true);
    setError(null);

    try {
      // Extract keywords from the selected sentence
      const keywordsResponse = await axios.post<{ keywords: string[] }>(
        '/api/extractKeywords',
        {
          sentence: selectedSentence,
        },
      );

      setKeywords(keywordsResponse.data.keywords || []);

      // Generate image based on the selected sentence
      const imageResponse = await axios.post<{ imageUrl: string }>(
        '/api/quiz',
        { prompt: selectedSentence },
      );

      if (imageResponse.data.imageUrl) {
        setImageUrl(imageResponse.data.imageUrl);
      } else {
        throw new Error('이미지 URL을 받지 못했습니다.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 503
            ? 'AI 모델이 준비중입니다. 잠시 후 다시 시도해주세요. (약 1-2분 소요)'
            : err.response?.data?.error || '작업에 실패했습니다.',
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-2xl p-4'>
      <h1 className='mb-4 text-2xl font-bold'>
        랜덤 문장에서 이미지 생성 및 핵심 단어 추출
      </h1>
      <button
        onClick={handleGenerateSentence}
        disabled={loading}
        className={`mb-4 w-full rounded-md px-4 py-2 text-white transition-colors ${
          loading
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
      >
        {loading ? (
          <span className='flex items-center justify-center'>
            <svg
              className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            작업 중...
          </span>
        ) : (
          '랜덤 문장으로 이미지 생성'
        )}
      </button>

      {error && (
        <div className='mt-4 rounded-md bg-red-50 p-3 text-red-600'>
          {error}
        </div>
      )}

      {sentence && (
        <div className='mt-6'>
          <h2 className='text-lg font-semibold'>랜덤 문장</h2>
          <p className='mt-2 rounded-md bg-gray-100 p-3'>{sentence}</p>
        </div>
      )}

      {keywords.length > 0 && (
        <div className='mt-6'>
          <h2 className='text-lg font-semibold'>핵심 단어</h2>
          <ul className='mt-2 space-y-1'>
            {keywords.map((keyword, index) => (
              <li key={index} className='rounded-md bg-gray-100 p-2'>
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      )}

      {imageUrl && (
        <div className='mt-8'>
          <h2 className='text-lg font-semibold'>생성된 이미지</h2>
          <img
            src={imageUrl}
            alt='Generated'
            className='mt-4 w-full rounded-lg shadow-lg'
          />
        </div>
      )}
    </div>
  );
}
