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

      <div className='relative overflow-auto min-h-screen'>
        <Image
          src='https://images.unsplash.com/photo-1680422997175-eda0528e4c67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
          alt='pacific background'
          fill
          className='object-cover object-center -z-10'
        />
        <div className='fixed inset-0 bg-black/40 -z-10' />
        <Search />
        {children}
      </div>
    </>
  );
}
