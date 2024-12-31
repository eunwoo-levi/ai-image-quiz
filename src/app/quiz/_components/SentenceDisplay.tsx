export default function SentenceDisplay({ sentence }: { sentence: string }) {
  return (
    sentence && (
      <div className='mt-6'>
        <h2 className='text-lg font-semibold'>랜덤 문장</h2>
        <p className='mt-2 rounded-md bg-gray-100 p-3'>{sentence}</p>
      </div>
    )
  );
}
