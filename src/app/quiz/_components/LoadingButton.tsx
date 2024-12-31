interface LoadingButtonProps {
  loading: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function LoadingButton({
  loading,
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
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
        '검사 결과'
      )}
    </button>
  );
}
