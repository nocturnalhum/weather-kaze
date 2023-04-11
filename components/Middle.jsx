import React from 'react';
import Image from 'next/image';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';
import {
  weatherIconMapping,
  weatherIconMappingDay,
  weatherIconMappingNight,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import moment from 'moment';

export default function Middle({
  currentWeather,
  timezone,
  feelsLike,
  sunrise,
  sunset,
}) {
  const sunriseToday = sunrise[0];
  const sunsetToday = sunset[0];

  const isDayTime =
    currentWeather.time >= sunriseToday && currentWeather.time <= sunsetToday;

  return (
    <div className='flex flex-col rounded-xl bg-gray-700/50 m-2 p-3 capitalize shadow-2xl text-gray-50'>
      {/* ============================================================================
          ===============<<< Currently Heading >>>====================================
          ============================================================================ */}
      <div className='text-2xl font-light tracking-wide'>currently</div>

      {/* ============================================================================
          ===============<<< Current Temperature >>>===================================
          ============================================================================ */}
      <div className='flex space-x-5'>
        <div className='flex flex-col items-center w-24'>
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
            ===============<<< Sunrise Sunset >>>=======================================
            ============================================================================ */}
        <div className='flex items-center'>
          <Image
            src={
              isDayTime
                ? weatherIconMappingDay[currentWeather.weathercode]
                : weatherIconMappingNight[currentWeather.weathercode]
            }
            alt={weatherLabelMapping[currentWeather.weathercode]}
            width={75}
            height={75}
          />
          <div className='text-xl'>
            {weatherLabelMapping[currentWeather.weathercode]}
          </div>
        </div>
      </div>
      {/* ============================================================================
          ===============<<< Icon & Description >>>===================================
          ============================================================================ */}
      <div className='flex bg-gradient-to-br from-amber-300/70 to-orange-800 px-2 rounded-lg justify-between mt-3'>
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
