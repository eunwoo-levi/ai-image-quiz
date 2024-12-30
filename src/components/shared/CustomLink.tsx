import Link from 'next/link';

interface CustomLinkProps {
  path: string;
  title: string;
}

export default function CustomLink({ path, title }: CustomLinkProps) {
  return (
    <Link href={path}>
      <div className='text-2xl font-bold transition-transform duration-200 hover:scale-110'>
        {title}
      </div>
    </Link>
  );
}
