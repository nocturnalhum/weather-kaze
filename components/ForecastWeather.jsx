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
import { celciusToFahrenheit, mmToInches } from '@/lib/metricToEmpirical';

// Set to 'true' to display console log messages:
let DEBUG = false;

export default function ForecastWeather({ meteoData, isEmpirical }) {
  const { daily } = meteoData;

  let dailyData = [];

  for (let i = 0; i < daily.time.length; i++) {
    dailyData.push({
      feels_like_max: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.apparent_temperature_max[i]))
        : Math.round(daily?.apparent_temperature_max[i]),
      precipitation_probability_max: daily?.precipitation_probability_max[i],
      total_precipitation: isEmpirical
        ? parseFloat(mmToInches(daily?.precipitation_sum[i]).toFixed(2))
        : daily?.precipitation_sum[i],
      sunrise: daily?.sunrise[i],
      sunset: daily?.sunset[i],
      temp_high: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.temperature_2m_max[i]))
        : Math.round(daily?.temperature_2m_max[i]),
      temp_low: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.temperature_2m_min[i]))
        : Math.round(daily?.temperature_2m_min[i]),
      day: daily?.time[i],
      uv_index_max: daily?.uv_index_max[i].toFixed(1),
      weathercode: daily?.weathercode[i],
      winddirection: daily?.winddirection_10m_dominant[i],
      windgusts: daily?.windgusts_10m_max[i],
      windspeed: daily?.windspeed_10m_max[i],
    });
  }
  DEBUG && console.log('ForecastWeather.jsx- dailyData', dailyData);

  return (
    <div className='relative rounded-2xl border-[2px] border-b-slate-600/80 border-l-slate-700/40 border-r-slate-300/60 border-t-gray-400/50 bg-slate-500/20 p-2 shadow-inner backdrop-blur-sm'>
      {/* ===================================================================*/}
      {/* ==============<<< Heading: 7 Day Forecast >>=======================*/}
      {/* ===================================================================*/}
      <h1 className='mb-2 text-3xl font-light tracking-wide'>7 Day Forecast</h1>
      <div className='grid-rows-8 grid grid-cols-8 gap-3'>
        <div className='rounded-lg bg-blue-600/50 p-2 shadow-xl portrait:col-span-8 portrait:row-span-2 landscape:col-span-2 landscape:row-span-2'>
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
                  <span className='pl-1 text-2xl font-light'>
                    °{isEmpirical ? 'F' : 'C'}
                  </span>
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
            Feels like: {Math.round(dailyData[0].feels_like_max)}°
            {isEmpirical ? 'F' : 'C'}
          </span>
          {/* ===================================================================*/}
          {/* ==============<<< Today - UV Index >>>=============================*/}
          {/* ===================================================================*/}
          <div className='mt-3 flex items-center'>
            <FaSun size={16} className='text-amber-400' />
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
                <span>
                  {dailyData[0].total_precipitation}
                  {isEmpirical ? 'in' : 'mm'}
                </span>
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
                  className='rounded-lg bg-gray-500/90 px-2 py-1 shadow-xl'
                >
                  {/* ===================================================================*/}
                  {/* ==============<<< Date & Weather Conditions >>=====================*/}
                  {/* ===================================================================*/}
                  <h1 className='text-lg font-semibold'>
                    {moment(day.day).format('dddd D')}
                  </h1>
                  <div className='text-base font-normal capitalize'>
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
                        <span>°{isEmpirical ? 'F' : 'C'}</span>
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
                    <FaSun size={16} className='text-amber-400' />
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
                        <span>
                          {day.total_precipitation} {isEmpirical ? 'in' : 'mm'}
                        </span>
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
