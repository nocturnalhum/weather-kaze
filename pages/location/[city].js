import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';

const METEO_QUERY = `hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timezone=auto`;

export default function City({ meteoData, name, country }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Layout title={`${name}, ${country}`}>
      {/* ============================================================================
          ===============<<< Location Header & Toggle >>>=============================
          ============================================================================ */}
      <div className='py-3 px-5 max-w-3xl flex m-auto justify-between'>
        <h2 className='text-3xl font-extralight tracking-wide text-gray-50'>{`${name}, ${country}`}</h2>
        <button
          onClick={handleFlip}
          className='h-auto w-44  rounded-full bg-gradient-to-b from-gray-600 to-black px-4 py-2 font-semibold backdrop-blur-sm text-gray-300'
        >
          {isFlipped ? 'Current Weather' : '7-Day Forecast'}
        </button>
      </div>
      {/* ============================================================================
          ===============<<< Weather Content >>>======================================
          ============================================================================ */}
      <div
        id='maincard'
        className='relative max-w-3xl w-full h-96 m-auto perspective'
      >
        <div
          id='thecard'
          className={`absolute w-full h-full backdrop-blur-sm preserve-3d transition-all duration-500 ${
            isFlipped ? 'rotate-y-180 backface-show  ' : ''
          }`}
        >
          <div
            id='thefront'
            className={`absolute w-full h-full bg-gray-400/10 backdrop-blur-sm text-center border-b-[1px] border-[2px]   border-r-gray-400/80 border-b-gray-500 border-t-gray-500/50 border-l-gray-700/50 shadow-inner shadow-gray-400/70 rounded-3xl ${
              isFlipped
                ? 'backface-hidden opacity-0 duration-500'
                : 'backface-hidden duration-500'
            }`}
          >
            <CurrentWeather />
          </div>
          <div
            id='theback'
            className={`absolute w-full h-full rotate-y-180 bg-gray-400/10  backdrop-blur-sm  text-center border-b-[1px] border-[2px] border-r-gray-400/80 border-b-gray-500 border-t-gray-500/50 border-l-gray-700/50 shadow-inner shadow-gray-400/70 rounded-3xl ${
              isFlipped ? 'backface-show' : 'backface-hidden'
            }`}
          >
            <ForecastWeather />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ============================================================================
// ===============<<< Get Server Side Props >>>================================
// ============================================================================
export async function getServerSideProps({ params }) {
  const { 0: name, 1: country, 2: lat, 3: lon } = params.city.split('&');

  if (!lat || !lon) {
    return {
      notFound: true,
    };
  }

  // Get Weather METEO API:
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${METEO_QUERY}`
  );

  const meteoData = await res.json();

  if (!meteoData) {
    return {
      notFound: true,
    };
  }
  return {
    props: { meteoData, name, country },
  };
}