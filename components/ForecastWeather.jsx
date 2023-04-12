import React from 'react';
import HumidityPressure from './HumidityPressure';

export default function ForecastWeather({ meteoData }) {
  return (
    <div className='relative h-[400px] max-w-3xl rounded-2xl border-[2px] border-t-[1px] border-b-gray-600/80 border-l-gray-700/50 border-r-gray-400/80 border-t-gray-100/50'>
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
