'use client';

import { useState } from 'react';
import axios from 'axios';
import { randomSentences } from '@/data/randomSentences';
import LoadingButton from './LoaddingButton';
import ErrorMessage from './ErrorMessage';
import KeywordList from './KeywordList';
import ImageDisplay from './ImageDisplay';
import SentenceDisplay from './SentenceDisplay';

export default function ImageGenerator() {
  const [sentence, setSentence] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSentence = async () => {
    const randomIndex = Math.floor(Math.random() * randomSentences.length);
    const selectedSentence = randomSentences[randomIndex];
    setSentence(selectedSentence);

    setLoading(true);
    setError(null);

    try {
      const keywordsResponse = await axios.post('/api/extractKeywords', {
        sentence: selectedSentence,
      });
      setKeywords(keywordsResponse.data.keywords || []);

      const imageResponse = await axios.post('/api/quiz', {
        prompt: selectedSentence,
      });
      if (imageResponse.data.imageUrl) {
        setImageUrl(imageResponse.data.imageUrl);
      } else {
        throw new Error('이미지 URL을 받지 못했습니다.');
      }
    } catch (err) {
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
      <LoadingButton loading={loading} onClick={handleGenerateSentence} />
      <ErrorMessage error={error} />
      <SentenceDisplay sentence={sentence} />
      <KeywordList keywords={keywords} />
      <ImageDisplay imageUrl={imageUrl} />
    </div>
  );
}
