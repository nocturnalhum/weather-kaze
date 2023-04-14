import React from 'react';
import { ImEye } from 'react-icons/im';
import {
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiWindDeg,
} from 'react-icons/wi';

export default function HumidityPressure({
  humidity,
  pressure,
  visibility,
  windspeed,
  winddirection,
}) {
  return (
    <div className='h-16 rounded-xl bg-gray-400/70 p-2 shadow-lg shadow-gray-900/30 backdrop-blur-sm'>
      <ul className='flex justify-between text-sm'>
        <li className='flex flex-col items-center justify-center'>
          <span className='mb-1 font-semibold'>Humidity</span>
          <span className='flex items-center justify-start gap-1 text-gray-950'>
            <WiHumidity
              size={15}
              color={'white'}
              className='rounded-full border'
            />
            {humidity}%
          </span>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <span className='mb-1  font-semibold'>Pressure</span>
          <span className='flex items-center justify-start gap-1 text-gray-950'>
            <WiBarometer
              size={15}
              color={'white'}
              className='rounded-full border'
            />
            {pressure}hPa
          </span>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <span className='mb-1  font-semibold'>Visibility</span>
          <span className='flex items-center justify-start gap-1 text-gray-950'>
            <ImEye size={15} color={'white'} className='rounded-full border' />
            {`${Math.round(visibility / 1000)}km`}
          </span>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <span className='mb-1  font-semibold'>Wind</span>
          <span className='flex items-center justify-start text-gray-950'>
            <WiStrongWind
              size={15}
              color={'white'}
              className='mr-1 rounded-full border'
            />
            {windspeed}m/s
            <WiWindDeg
              size={20}
              color={'black'}
              style={{ transform: `rotate(${winddirection + 180}deg)` }}
            />
          </span>
        </li>
      </ul>
    </div>
  );
}
