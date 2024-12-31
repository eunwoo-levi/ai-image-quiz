interface KeywordListProps {
  keywords: string[];
}

export default function KeywordList({ keywords }: KeywordListProps) {
  return (
    keywords.length > 0 && (
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
    )
  );
}
