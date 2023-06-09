import { kmhToMph } from '@/lib/metricToEmpirical';
import {
  weatherIconMappingDay,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaSun } from 'react-icons/fa';

export default function ForecastDay({ dailyData, row, isEmpirical }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='h-full perspective'>
      <div
        className={`relative flex h-full items-center rounded-lg duration-500 preserve-3d backface-hidden ${
          isFlipped ? 'rotate-x-180' : ''
        }`}
      >
        <div
          onClick={handleFlip}
          className={`absolute h-full w-full rounded-lg bg-gradient-to-l from-gray-600/80 to-gray-900/60 backface-hidden`}
        >
          <div className='flex h-full px-3'>
            {/* ================<<< Date >>>============================= */}
            <div className='flex h-full w-1/3 items-center text-lg font-semibold'>
              {moment(dailyData[row.index].day).format(`ddd D`)}
            </div>
            {/* ================<<< Temperatures >>>===================== */}
            <div className='flex h-full w-1/3 items-center justify-start'>
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
            </div>
            {/* ================<<< Weather Condition >>>================= */}
            <div className='flex h-full w-1/3 flex-col items-center justify-center pr-7'>
              <Image
                priority
                src={weatherIconMappingDay[dailyData[row.index].weathercode]}
                alt={weatherLabelMapping[dailyData[row.index].weathercode]}
                width={50}
                height={50}
              />
              <span className='text-xs text-sky-300'>
                {dailyData[row.index].precipitation_probability_max > 0
                  ? dailyData[row.index].precipitation_probability_max + '%'
                  : ''}
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={handleFlip}
          className={`absolute h-full w-full rounded-lg bg-gradient-to-bl from-gray-600/80 to-gray-900/60 rotate-x-180 backface-hidden`}
        >
          <div className='flex h-full px-3'>
            {/* ================<<< Date >>>============================= */}
            <div className='flex h-full w-1/3 items-center text-lg font-semibold'>
              {moment(dailyData[row.index].day).format(`ddd D`)}
            </div>
            {/* ================<<< UV Index >>>========================== */}
            <div className='flex h-full w-1/3 items-center justify-start'>
              <FaSun size={16} className='text-amber-400' />
              <span className='ml-1 text-sm'>
                UV Index: {dailyData[row.index].uv_index_max}
              </span>
            </div>
            {/* ================<<< Wind Compass >>>======================= */}
            <div className='flex w-1/3 items-center justify-center'>
              <div className='relative flex h-full w-20 items-center justify-center'>
                <Image
                  src={weatherIconMappingDay[101]}
                  alt='compass'
                  width={58}
                  height={58}
                  style={{ width: '80%', height: 'auto' }}
                />
                <Image
                  src={weatherIconMappingDay[102]}
                  alt='needle'
                  width={14}
                  height={14}
                  className='absolute left-[32px] top-[2px]'
                  style={{
                    width: '20%',
                    height: 'auto',
                    transform: `rotate(${
                      dailyData[row.index].winddirection + 180
                    }deg)`,
                  }}
                />
                <div className='absolute left-[30px] top-[32px] flex h-5 w-5 items-center justify-center rounded-full bg-white text-center text-xs font-bold text-black'>
                  {isEmpirical
                    ? kmhToMph(dailyData[row.index].windspeed)
                    : Math.round(dailyData[row.index].windspeed)}
                </div>
              </div>
              <div className='w-5 text-sm'> {isEmpirical ? 'mph' : 'km/h'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
