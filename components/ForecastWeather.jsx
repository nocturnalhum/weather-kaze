import React, { useRef, useState } from 'react';
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
import ForecastToday from './ForecastToday';
import ForecastDay from './ForecastDay';

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
    overscan: 5,
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
      <ForecastToday dailyData={dailyData} isEmpirical={isEmpirical} />
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
                key={row.index}
                ref={RowVirtualizer.measureElement}
                data-index={row.index}
                className='h-16 w-full max-w-3xl items-center rounded-lg perspective'
              >
                <ForecastDay
                  dailyData={dailyData}
                  row={row}
                  isEmpirical={isEmpirical}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
