import Head from 'next/head';
import Search from './Search';
import Image from 'next/image';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Kaze' : 'Kaze Weather'}</title>
        <meta name='description' content='Stratus Weather' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <div
        className={`relative min-h-screen overflow-auto bg-snow bg-cover bg-center`}
      >
        <div className='absolute inset-0 bg-black/40' />
        {/* <Image
          src='https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
          alt='pacific background'
          fill
          className='-z-10 object-cover object-center'
        /> */}
        {/* Overlay */}
        <Search />
        <div className='min-h-[calc(100vh-5rem)] overflow-auto text-gray-50'>
          {children}
        </div>
      </div>
    </>
  );
}
