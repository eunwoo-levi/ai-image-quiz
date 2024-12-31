export default function ImageDisplay({ imageUrl }: { imageUrl: string }) {
  return (
    imageUrl && (
      <div className='mt-8'>
        <h2 className='text-lg font-semibold'>생성된 이미지</h2>
        <img
          src={imageUrl}
          alt='Generated'
          className='mt-4 w-full rounded-lg shadow-lg'
        />
      </div>
    )
  );
}
