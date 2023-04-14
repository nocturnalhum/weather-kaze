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
          src='https://images.unsplash.com/photo-1621497591119-6062a8a5b8f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjEwfHx0aHVuZGVyc3Rvcm18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
          alt='pacific background'
          fill
          className='-z-10 object-cover object-center'
        />
        <div className='fixed inset-0 -z-10 bg-black/40' />
        <Search />
        <div className='min-h-[calc(100vh-5rem)] overflow-auto text-gray-50'>
          {children}
        </div>
      </div>
    </>
  );
}
