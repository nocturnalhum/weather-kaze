import '@/styles/globals.css';
import Router from 'next/router';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { BsSun } from 'react-icons/bs';
import { IoIosCloud } from 'react-icons/io';
import AppContext from '@/contextAPI/AppContext';
import {
  weatherBackgroundDay,
  weatherBackgroundNight,
} from '@/lib/weatherMapping';

const images = [
  'sakura.jpg',
  'overcast.jpg',
  'daisies.jpg',
  'magnolias.jpg',
  'mountains.jpg',
];
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();

  const handleBackgroundImage = (image) => {
    setBackgroundImage(image);
  };
  const weathercode = pageProps?.weathercode;
  const isDay = pageProps?.isDay;
  const rand = Math.floor(Math.random() * images.length);

  useEffect(() => {
    if (weathercode === undefined) {
      setBackgroundImage(`/backgrounds/${images[rand]}`);
    } else if (isDay) {
      setBackgroundImage(weatherBackgroundDay[weathercode]);
    } else {
      setBackgroundImage(weatherBackgroundNight[weathercode]);
    }
  }, [weathercode, isDay, rand]);

  useEffect(() => {
    const start = () => {
      // console.log('start');
      setLoading(true);
    };
    const end = () => {
      // console.log('finished');
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
      <AppContext.Provider
        value={{
          backgroundImage: backgroundImage,
          setBackgroundImage: setBackgroundImage,
        }}
      >
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
      </AppContext.Provider>
    </>
  );
}
