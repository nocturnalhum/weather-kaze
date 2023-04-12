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

      <div className='relative min-h-screen overflow-auto'>
        <Image
          src='https://images.unsplash.com/photo-1680422997175-eda0528e4c67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
          alt='pacific background'
          fill
          className='-z-10 object-cover object-center'
        />
        <div className='fixed inset-0 -z-10 bg-black/40' />
        <Search />
        <div className='min-h-screen overflow-auto'>{children}</div>
      </div>
    </>
  );
}
