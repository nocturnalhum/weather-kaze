import Head from 'next/head';
import Search from './Search';
import Image from 'next/image';
import { useContext } from 'react';
import AppContext from '@/contextAPI/AppContext';

export default function Layout({ children, title }) {
  const value = useContext(AppContext);
  let { backgroundImage } = value;
  let newImage = backgroundImage;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Kaze' : 'Kaze Weather'}</title>
        <meta name='description' content='Stratus Weather' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <div className={`relative min-h-screen overflow-auto`}>
        {/* Overlay */}
        <div className='absolute inset-0 bg-black/30' />
        <Image
          src={newImage ? newImage : '/backgrounds/overcast.jpg'}
          alt='weather background'
          priority
          height={1440}
          width={2180}
          // fill
          className='absolute -z-10 h-full w-full object-cover object-center'
        />
        <Search />
        <div className='min-h-[calc(100vh-5rem)] overflow-auto text-gray-50'>
          {children}
        </div>
      </div>
    </>
  );
}
