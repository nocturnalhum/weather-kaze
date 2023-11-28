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
        {newImage && (
          <Image
            priority
            src={newImage ? newImage : '/backgrounds/overcast.jpg'}
            // src={newImage ? newImage : '/backgrounds/defaultBG.svg'}
            alt='weather background'
            height={1028}
            width={1440}
            className='absolute -z-10 h-full w-full object-cover object-center'
          />
        )}
        <div className='absolute -z-20 h-full w-full bg-black' />
        <Search />
        <div className='min-h-[calc(100vh-5rem)] overflow-auto text-gray-50'>
          {children}
        </div>
      </div>
    </>
  );
}
