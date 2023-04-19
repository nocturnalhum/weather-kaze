import React, { useRef } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Virtualizer, useVirtualizer } from '@tanstack/react-virtual';
import {
  weatherCodeMapping,
  weatherIconMappingDay,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import { IoUmbrellaSharp, IoWaterSharp } from 'react-icons/io5';
import { FaSun } from 'react-icons/fa';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';
import { celciusToFahrenheit, mmToInches } from '@/lib/metricToEmpirical';

export default function ForecastWeather({ meteoData, isEmpirical }) {
  const listRef = useRef();

  const { daily } = meteoData;
  let dailyData = [];

  for (let i = 0; i < daily.time.length; i++) {
    dailyData.push({
      day: daily?.time[i],
      precipitation_probability_max: daily?.precipitation_probability_max[i],
      sunrise: daily?.sunrise[i],
      sunset: daily?.sunset[i],
      uv_index_max: daily?.uv_index_max[i].toFixed(1),
      weathercode: daily?.weathercode[i],
      winddirection: daily?.winddirection_10m_dominant[i],
      windgusts: daily?.windgusts_10m_max[i],
      windspeed: daily?.windspeed_10m_max[i],
      // Convert temperatures and precipation values to Empirical values when required:
      feels_like_max: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.apparent_temperature_max[i]))
        : Math.round(daily?.apparent_temperature_max[i]),
      temp_high: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.temperature_2m_max[i]))
        : Math.round(daily?.temperature_2m_max[i]),
      temp_low: isEmpirical
        ? celciusToFahrenheit(Math.round(daily?.temperature_2m_min[i]))
        : Math.round(daily?.temperature_2m_min[i]),
      total_precipitation: isEmpirical
        ? parseFloat(mmToInches(daily?.precipitation_sum[i]).toFixed(2))
        : daily?.precipitation_sum[i],
    });
  }

  const RowVirtualizer = useVirtualizer({
    count: dailyData.length - 1,
    getScrollElement: () => listRef.current,
    estimateSize: () => dailyData.length - 1,
    overscan: 10,
  });

  const rows = RowVirtualizer.getVirtualItems();

  return (
    <div className='shadow-innner relative rounded-2xl border-2 border-gray-600/80 border-r-gray-400 border-t-gray-500 bg-slate-500/20 p-2 pb-6 backdrop-blur-sm'>
      {/* ===================================================================*/}
      {/* ==============<<< Heading: Weekly Forecast >>=======================*/}
      {/* ===================================================================*/}
      <h1 className='rounded-lg bg-gradient-to-l from-gray-800/60 to-black p-3 px-4 text-2xl font-normal tracking-wide'>
        Weekly Forecast
      </h1>
      <div className='my-2 rounded-lg bg-blue-600/50 p-2 px-3 shadow-xl '>
        <h1 className='pb-2 text-3xl font-medium'>Today</h1>
        <div className='flex max-w-md  justify-between'>
          {/* ===================================================================*/}
          {/* ==============<<< Temperature >>===================================*/}
          {/* ===================================================================*/}
          <div className='flex flex-col'>
            <div className='flex text-4xl font-bold text-amber-400'>
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
          {/* ===================================================================*/}
          {/* ==============<<< Icon & Description >>============================*/}
          {/* ===================================================================*/}
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
          <div className='flex flex-col text-sm'>
            <span className='flex'>
              <FaSun size={16} className='text-amber-400' />
              <span className='ml-1'>
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
                <span className='lowercase'>{isEmpirical ? ' in' : ' mm'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ===================================================================*/}
      {/* ==============<<< 16 Day Forecast >>===============================*/}
      {/* ===================================================================*/}
      <div
        ref={listRef}
        className='List flex h-[24rem] w-full overflow-auto scrollbar-hide'
      >
        <div
          style={{
            position: 'relative',
            height: RowVirtualizer.getTotalSize() - 20,
            width: '100%',
          }}
        >
          <div
            className='absolute left-0 top-0 w-full space-y-1'
            style={{ transform: `translateY(${rows[0].start}px)` }}
          >
            {rows.slice(1).map((row) => (
              <div
                ref={RowVirtualizer.measureElement}
                key={row.index}
                data-index={row.index}
                className='flex h-16 items-center rounded-lg bg-gradient-to-l from-gray-600/80 to-gray-900/60 px-4 backdrop-blur-sm'
              >
                <div className='flex w-full max-w-md items-center justify-between'>
                  <span className='w-20 text-lg font-semibold'>
                    {moment(dailyData[row.index].day).format(`ddd D`)}
                  </span>
                  <div className='flex flex-col items-start'>
                    <div className='flex text-amber-400'>
                      <div className='text-lg font-semibold '>
                        {dailyData[row.index].temp_high}
                      </div>
                      <div className='text-sm'>°C</div>
                      <div className='flex items-end pl-2 text-sky-300'>
                        {dailyData[row.index].temp_low}°
                      </div>
                    </div>
                    <div className='text-xs font-light'>
                      Feels like: {dailyData[row.index].feels_like_max}°
                    </div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <Image
                      src={
                        weatherIconMappingDay[dailyData[row.index].weathercode]
                      }
                      alt={
                        weatherLabelMapping[dailyData[row.index].weathercode]
                      }
                      width={40}
                      height={40}
                    />
                    <span className='text-xs text-sky-300'>
                      {dailyData[row.index].precipitation_probability_max > 0
                        ? dailyData[row.index].precipitation_probability_max +
                          '%'
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
