import Layout from '@/components/Layout';
import '@/styles/globals.css';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { BsSun, BsCloudDrizzleFill } from 'react-icons/bs';
import { IoIosCloud } from 'react-icons/io';
import { HiCloud } from 'react-icons/hi2';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Layout title='Loading...'>
          <div className='relative flex items-center justify-center'>
            <BsSun className='mt-16 animate-spin-slow text-5xl text-amber-400' />
            <IoIosCloud className='absolute left-1/2 top-1/3 mt-12 text-5xl text-cyan-200' />
          </div>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
