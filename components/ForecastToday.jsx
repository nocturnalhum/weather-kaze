import {
  weatherIconMappingDay,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import Image from 'next/image';
import React from 'react';
import { FaSun } from 'react-icons/fa';
import { IoUmbrellaSharp, IoWaterSharp } from 'react-icons/io5';

export default function WeeklyToday({ dailyData, isEmpirical }) {
  return (
    <div className='my-2 rounded-lg bg-blue-600/50 p-2 shadow-xl'>
      <h1 className='pb-2 text-3xl font-medium'>Today</h1>
      <div className='flex max-w-md  justify-between'>
        {/* ==============<<< Temperature >>===================================*/}
        <div className='flex flex-col'>
          <div className='flex text-4xl font-bold text-amber-400 landscape:text-4xl'>
            <span className=''>{dailyData[0].temp_high}</span>
            <span className='pl-1 text-2xl font-light'>
              °{isEmpirical ? 'F' : 'C'}
            </span>
          </div>
          <div className='flex text-base text-sky-300'>
            <span className='pr-1 text-sm'>Low</span>
            <span className='text-xl'>{dailyData[0].temp_low}°</span>
          </div>
          {/* <span className='font-light text-gray-300'>
              Feels like: {Math.round(dailyData[0].feels_like_max)}°
              {isEmpirical ? 'F' : 'C'}
            </span> */}
        </div>
        {/* ==============<<< Icon & Description >>============================*/}
        <div className='relative flex flex-col items-center justify-between'>
          <span className='text-base font-semibold capitalize'>
            {weatherLabelMapping[dailyData[0].weathercode]}
          </span>
          <Image
            src={weatherIconMappingDay[dailyData[0].weathercode]}
            alt={weatherLabelMapping[dailyData[0].weathercode]}
            width={60}
            height={60}
            className='absolute top-4'
          />
        </div>
        {/* ==============<<< Preciption & UV Index >>=========================*/}
        <div className='flex flex-col'>
          <span className='flex'>
            <FaSun size={16} className='text-amber-400' />
            <span className='ml-1 text-sm'>
              UV Index: {dailyData[0].uv_index_max}
            </span>
          </span>

          <div className='flex items-center'>
            <IoUmbrellaSharp size={16} className='text-cyan-300' />
            <span className='ml-1'>
              Prob: {dailyData[0].precipitation_probability_max}%
            </span>
          </div>
          <div className='flex items-center capitalize'>
            <IoWaterSharp size={16} className='text-cyan-400' />
            <span>
              Prec: {dailyData[0].total_precipitation}
              {isEmpirical ? 'in' : 'mm'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
