import React from 'react';
import HumidityPressure from './HumidityPressure';

export default function ForecastWeather({ meteoData }) {
  return (
    <div className='relative w-full max-w-3xl rounded-2xl border-[2px] border-b-[1px] border-b-gray-500   border-l-gray-700/50 border-r-gray-400/80 border-t-gray-500/50'>
      <div className='h-full w-full p-2'>
        <HumidityPressure
          humidity={1}
          pressure={2}
          visibility={3}
          windspeed={4}
          winddirection={5}
        />
      </div>
    </div>
  );
}
