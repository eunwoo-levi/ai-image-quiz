'use client';

import { useKeywordsStore } from '@/store/useKeywordsStore';
import axios from 'axios';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';

interface ResultProps {
  similarity: number;
  explanation: string;
}

export default function ResultFromComparision() {
  const [result, setResult] = useState<ResultProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { keywords1, keywords2, resetKeywords } = useKeywordsStore();

  const handleGetResultForComparision = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/compareKeywords', {
        array1: keywords1,
        array2: keywords2,
      });

      setResult(res.data);
      resetKeywords();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            '키워드 비교 요청 중 에러가 발생했습니다.',
        );
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <LoadingButton
        loading={loading}
        onClick={handleGetResultForComparision}
      />

      {error && <ErrorMessage error={error} />}

      {result && (
        <div className='mt-4'>
          <div className='flex flex-col gap-4'>
            <div>
              <h1>선생님의 사진 안 핵심 단어들</h1>
              <div>{keywords1.join(', ')}</div>
            </div>
            <div>
              <h2>학생의 사진 안 핵심 단어들</h2>
              <div>{keywords2.join(', ')}</div>
            </div>
          </div>
          <h2>Similarity</h2>
          <div>{result.similarity}</div>
          <div>
            <h2>Explanation</h2>
            <div>{result.explanation}</div>
          </div>
        </div>
      )}
    </div>
  );
}
