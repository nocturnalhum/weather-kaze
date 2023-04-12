import React from 'react';
import Image from 'next/image';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';
import { FaSun } from 'react-icons/fa';
import {
  weatherIconMapping,
  weatherIconMappingDay,
  weatherIconMappingNight,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import moment from 'moment';

export default function Middle({
  currentWeather,
  uvIndex,
  timezone,
  feelsLike,
  sunrise,
  sunset,
}) {
  const sunriseToday = sunrise[0];
  const sunsetToday = sunset[0];

  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-700/50 p-3 capitalize text-gray-50 shadow-2xl backdrop-blur-sm'>
      {/* ============================================================================
          ===============<<< Currently Heading >>>====================================
          ============================================================================ */}
      <h1 className='text-2xl font-light tracking-wide'>currently</h1>

      {/* ============================================================================
          ===============<<< Current Temperature >>>===================================
          ============================================================================ */}
      <div className='flex space-x-5'>
        <div className='flex w-24 flex-col items-center'>
          <div className='flex'>
            <div className='pr-1 text-5xl font-semibold'>
              {Math.round(currentWeather.temperature)}
            </div>
            <span className='text-2xl'>°C</span>
          </div>
          <div className='text-sm'>{feelsLike}°</div>
          <div className='text-sm font-light'>feels like</div>
        </div>
        {/* ============================================================================
            ===============<<< Weather Description >>>==================================
            ============================================================================ */}
        <div className='flex items-center'>
          <Image
            src={
              currentWeather.is_day
                ? weatherIconMappingDay[currentWeather.weathercode]
                : weatherIconMappingNight[currentWeather.weathercode]
            }
            alt={weatherLabelMapping[currentWeather.weathercode]}
            width={85}
            height={85}
          />
          <div className='ml-3 flex flex-col'>
            <div className='text-xl font-semibold'>
              {weatherLabelMapping[currentWeather.weathercode]}
            </div>
            <div className='flex items-center gap-1'>
              <FaSun size={20} className='text-amber-400' />
              UV Index: {uvIndex}
            </div>
          </div>
        </div>
      </div>
      {/* ============================================================================
          ===============<<< Sunrise & Sunset Time >>>================================
          ============================================================================ */}
      <div className='mt-3 flex justify-between rounded-lg bg-gradient-to-br from-amber-300/70 to-orange-800 px-2 opacity-90'>
        <div className='flex flex-col font-semibold'>
          <div className='flex items-center'>
            Sunrise <WiHorizonAlt size={35} />
          </div>
          <div className='pl-2'>{moment(sunriseToday).format('h:mm A')}</div>
        </div>
        <div className='flex flex-col font-semibold'>
          <div className='flex items-center '>
            Sunset
            <WiHorizonAlt size={35} />
          </div>
          <div className='pl-2'>{moment(sunsetToday).format('h:mm A')}</div>
        </div>
      </div>
    </div>
  );
}
