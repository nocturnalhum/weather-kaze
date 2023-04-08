import React from 'react';
import HumidityPressure from './HumidityPressure';

export default function ForecastWeather({ meteoData }) {
  return (
    <div className='relative w-full max-w-3xl'>
      <div className='w-full h-full p-2'>
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
