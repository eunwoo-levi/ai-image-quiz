import GoogleInfo from './GoogleInfo';
import CustomLink from '../shared/CustomLink';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex h-[80px] w-full items-center justify-between px-8 shadow-xl'>
      <CustomLink path='/' title='EduPrompt' />
      <section className='flex items-center gap-8'>
        <CustomLink path='/' title='Home' />
        <CustomLink path='/quiz' title='Quiz' />
      </section>
      <div>
        <GoogleInfo />
      </div>
    </div>
  );
}
