export default function ErrorMessage({ error }: { error: string | null }) {
  return (
    error && (
      <div className='mt-4 rounded-md bg-red-50 p-3 text-red-600'>{error}</div>
    )
  );
}
