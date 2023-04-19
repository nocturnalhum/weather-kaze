import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';

const fahrenheitCountries = [
  'BS',
  'BZ',
  'FM',
  'GU',
  'KY',
  'MH',
  'PR',
  'PW',
  'US',
  'VI',
];

const METEO_QUERY = `hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,cloudcover,cloudcover_low,visibility,windspeed_10m,winddirection_10m,windgusts_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&forecast_days=16&timezone=auto`;

const METEO_QUERY_FAHRENHEIT = `hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,cloudcover,cloudcover_low,visibility,windspeed_10m,winddirection_10m,windgusts_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;

export default function City({ meteoData, name, country, isEmpirical }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [emperical, setEmperical] = useState(isEmpirical);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleEmpirical = () => {
    setEmperical(!emperical);
  };
  return (
    <Layout title={`${name}, ${country}`}>
      {/* ============================================================================
          ===============<<< Location Header & Button >>>=============================
          ============================================================================ */}
      <div className='m-auto flex max-w-3xl flex-col px-2'>
        <h2 className='z-0 text-3xl font-medium tracking-wide text-gray-200'>{`${name}, ${country}`}</h2>
        <div className='my-2 flex justify-end'>
          <button
            onClick={handleFlip}
            className='h-auto w-28 rounded-l-full  border-r-2 border-gray-700 bg-gradient-to-b from-gray-600 to-black px-4 py-2 font-semibold text-gray-300 backdrop-blur-sm'
          >
            {isFlipped ? 'Currently' : 'Forecast'}
          </button>
          <button
            onClick={handleEmpirical}
            className='w-18 h-auto rounded-r-full border-l-2 border-gray-500/90 bg-gradient-to-b from-gray-600 to-black px-4 py-2 font-semibold text-gray-300 backdrop-blur-sm'
          >
            <div className='flex gap-1'>
              <span
                className={`${emperical ? 'text-gray-500' : 'text-amber-500'}`}
              >
                °C
              </span>
              /
              <span
                className={`${emperical ? 'text-amber-500' : 'text-gray-500'}`}
              >
                °F
              </span>
            </div>
          </button>
        </div>
      </div>
      {/* ============================================================================
          ===============<<< Weather Content >>>======================================
        ============================================================================ */}
      <div className='m-auto h-full w-full max-w-3xl perspective'>
        <div
          className={`relative h-full rounded-2xl duration-500 preserve-3d backface-hidden ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div
            className={`absolute ${
              isFlipped ? '' : 'z-50'
            } h-full w-full backface-hidden`}
          >
            <CurrentWeather meteoData={meteoData} isEmpirical={emperical} />
          </div>
          <div
            className={`absolute ${
              isFlipped ? 'z-50' : ''
            } h-full w-full rounded-2xl rotate-y-180 backface-hidden`}
          >
            <ForecastWeather meteoData={meteoData} isEmpirical={emperical} />
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

  const isEmpirical = fahrenheitCountries.includes(country);

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
    props: { meteoData, name, country, isEmpirical },
  };
}
