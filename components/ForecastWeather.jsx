import React from 'react';
import moment from 'moment';
import {
  weatherCodeMapping,
  weatherIconMappingDay,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import Image from 'next/image';
import { IoUmbrellaSharp, IoWaterSharp } from 'react-icons/io5';
import { FaSun } from 'react-icons/fa';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';

// Set to 'true' to display console log messages:
let DEBUG = false;

export default function ForecastWeather({ meteoData }) {
  const { daily } = meteoData;

  let dailyData = [];

  for (let i = 0; i < daily.time.length; i++) {
    dailyData.push({
      feels_like_max: Math.round(daily?.apparent_temperature_max[i]),
      feels_like_min: Math.round(daily?.apparent_temperature_min[i]),
      precipitation_probability_max: daily?.precipitation_probability_max[i],
      total_precipitation: daily?.precipitation_sum[i],
      sunrise: daily?.sunrise[i],
      sunset: daily?.sunset[i],
      temp_high: Math.round(daily?.temperature_2m_max[i]),
      temp_low: Math.round(daily?.temperature_2m_min[i]),
      day: daily?.time[i],
      uv_index_max: Math.round(daily?.uv_index_max[i]),
      weathercode: daily?.weathercode[i],
      winddirection: daily?.winddirection_10m_dominant[i],
      windgusts: daily?.windgusts_10m_max[i],
      windspeed: daily?.windspeed_10m_max[i],
    });
  }
  DEBUG && console.log('ForecastWeather.jsx- dailyData', dailyData);

  return (
    <div className='relative rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-500   bg-gradient-to-br from-gray-300/10 to-pink-100/10 p-5 shadow-inner backdrop-blur-sm'>
      <div className='grid-rows-8 grid grid-cols-8 gap-3'>
        <div className='rounded-lg bg-blue-600/50 p-2 portrait:col-span-8 portrait:row-span-2 landscape:col-span-2 landscape:row-span-2'>
          {/* ===================================================================*/}
          {/* ==============<<< Today & Weather Conditions >>=====================*/}
          {/* ===================================================================*/}
          <h1 className='pb-2 text-3xl font-medium'>Today</h1>

          <div className='mb-2 text-lg font-semibold capitalize portrait:hidden landscape:block'>
            {weatherLabelMapping[dailyData[0].weathercode]}
          </div>
          {/* ===================================================================*/}
          {/* ==============<<< Today Temp & Icon >>>============================*/}
          {/* ===================================================================*/}
          <div className='ml-3 flex items-center space-x-2'>
            <div className='flex flex-col text-6xl font-bold text-amber-300 landscape:text-4xl'>
              <div className='flex'>
                <span className='flex'>
                  <span className=''>{dailyData[0].temp_high}</span>
                  <span className='pl-1 text-2xl font-light'>°C</span>
                </span>
              </div>
              <span className='flex items-start justify-center text-base text-sky-300'>
                <span className='pr-2 text-sm'>Low</span>
                <span className='text-xl'>{dailyData[0].temp_low}°</span>
              </span>
            </div>

            <Image
              src={weatherIconMappingDay[dailyData[0].weathercode]}
              alt={weatherLabelMapping[dailyData[0].weathercode]}
              width={80}
              height={80}
              className='landscape:h-16 landscape:w-16'
            />
            <div className='mb-2 text-xl font-semibold capitalize portrait:block landscape:hidden'>
              {weatherLabelMapping[dailyData[0].weathercode]}
            </div>
          </div>
          <span className='pl-3 font-light text-gray-300'>
            Feels like: {Math.round(dailyData[0].feels_like_max)}°C
          </span>
          {/* ===================================================================*/}
          {/* ==============<<< Today - UV Index >>>=============================*/}
          {/* ===================================================================*/}
          <div className='mt-3 flex items-center'>
            <FaSun size={16} className='text-amber-300' />
            <span className='ml-1 text-sm'>
              UV Index: {dailyData[0].uv_index_max} of 10
            </span>
          </div>
          {/* ===================================================================*/}
          {/* ==============<<< Today - Precipitation >>>========================*/}
          {/* ===================================================================*/}
          <div className='flex text-sm'>
            <div className='flex items-center space-x-1 md:space-x-4'>
              <div className='flex items-center'>
                <IoUmbrellaSharp size={16} className='text-cyan-300' />
                <span className='ml-1'>
                  {dailyData[0].precipitation_probability_max}%
                </span>
              </div>
              <div className='flex items-center lowercase'>
                <IoWaterSharp size={16} className='text-cyan-400' />
                <span>{dailyData[0].total_precipitation} mm</span>
              </div>
            </div>
          </div>
        </div>
        {/* ===================================================================*/}
        {/* ==============<<< 6 Day Forecast >>================================*/}
        {/* ===================================================================*/}
        <div className='portrait:col-span-8 portrait:row-span-6 landscape:col-span-6 landscape:row-span-2'>
          <div className='grid gap-3 portrait:grid-cols-2 portrait:grid-rows-3 landscape:grid-cols-3 landscape:grid-rows-2'>
            {dailyData.slice(1, dailyData.length).map((day, index) => {
              let Icon = weatherCodeMapping[day.weathercode];
              return (
                <div
                  key={index}
                  className='rounded-lg bg-gray-500/90 px-2 py-1'
                >
                  {/* ===================================================================*/}
                  {/* ==============<<< Date & Weather Conditions >>=====================*/}
                  {/* ===================================================================*/}
                  <h1 className='text-lg font-semibold'>
                    {moment(day.day).format('dddd D')}
                  </h1>
                  <div className='text-lg font-normal capitalize'>
                    {weatherLabelMapping[day.weathercode]}
                  </div>

                  {/* ===================================================================*/}
                  {/* ==============<<< Temp & Icon >>>==================================*/}
                  {/* ===================================================================*/}
                  <div className='flex py-1'>
                    <Image
                      src={weatherIconMappingDay[day.weathercode]}
                      alt={weatherLabelMapping[day.weathercode]}
                      width={70}
                      height={70}
                    />
                    <div className='ml-1 flex flex-col'>
                      <div className='flex'>
                        <div className='text-2xl font-bold'>
                          {day.temp_high}
                        </div>
                        <div>°C</div>
                      </div>
                      <div className='pl-1 font-bold text-sky-300'>
                        {day.temp_low}°
                      </div>
                    </div>
                  </div>

                  {/* ===================================================================*/}
                  {/* ==============<<< UV Index >>>=====================================*/}
                  {/* ===================================================================*/}

                  <div className='mb-1 flex items-center text-sm'>
                    <FaSun size={16} className='text-amber-300' />
                    <span className='ml-1'>UV: {day.uv_index_max} of 10</span>
                  </div>
                  {/* ===================================================================*/}
                  {/* ==============<<< Precipitation >>>================================*/}
                  {/* ===================================================================*/}
                  <div className='flex text-sm'>
                    <div className='flex items-center space-x-1 md:space-x-4'>
                      <div className='flex items-center'>
                        <IoUmbrellaSharp size={16} className='text-cyan-300' />
                        <span className='ml-1'>
                          {day.precipitation_probability_max}%
                        </span>
                      </div>
                      <div className='flex items-center lowercase'>
                        <IoWaterSharp size={16} className='text-cyan-400' />
                        <span>{day.total_precipitation} mm</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
