import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { IoUmbrellaSharp, IoWaterSharp } from 'react-icons/io5';
import {
  weatherIconMappingDay,
  weatherIconMappingNight,
  weatherLabelMapping,
} from '@/lib/weatherMapping';
import { useVirtualizer } from '@tanstack/react-virtual';
import Image from 'next/image';

export default function Hourly({ hourlyData, sunrise, sunset }) {
  const listRef = useRef();

  useEffect(() => {
    const scrollPos = listRef.current;
    if (scrollPos) {
      const onWheel = (event) => {
        if (event.deltaY == 0) return;
        event.preventDefault();
        scrollPos.scrollTo({
          left: scrollPos.scrollLeft + event.deltaY,
          behavior: 'smooth',
        });
      };
      scrollPos.addEventListener('wheel', onWheel);
      return () => scrollPos.removeEventListener('wheel', onWheel);
    }
  }, []);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: hourlyData.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => hourlyData.length,
    overscan: 5,
  });

  const Column = (index) => {
    const time = hourlyData[index].time;
    const isDayTime =
      time >= sunrise[Math.floor(index / 24)] &&
      time <= sunset[Math.floor(index / 24)];

    return (
      <li
        className={`mx-1 flex h-auto flex-col items-center justify-center gap-1 rounded-lg py-5 text-white ${
          isDayTime ? 'bg-blue-500/50' : 'bg-blue-300/20'
        } capitalize shadow-xl`}
      >
        <div className='flex flex-col items-center'>
          <span className='text-lg font-medium'>
            {moment(time).format('dddd D')}
          </span>
          <span className='text-lg'>{moment(time).format('h:mm A')}</span>
        </div>
        <span className='flex items-center text-xl font-medium'>
          <Image
            src={
              isDayTime
                ? weatherIconMappingDay[hourlyData[index].weathercode]
                : weatherIconMappingNight[hourlyData[index].weathercode]
            }
            alt={weatherLabelMapping[hourlyData[index].weathercode]}
            width={70}
            height={70}
          />
          <div className='flex flex-col'>
            <span className='flex text-2xl'>
              {Math.round(hourlyData[index].temperature)}
              <span className='text-sm'>°C</span>
            </span>
            <div className='ml-5 text-sm font-medium'>
              {Math.round(hourlyData[index].feels_like)}°
            </div>
            <span className='text-xs font-extralight'>feels like</span>
          </div>
        </span>
        <span className='font-semibold'>
          {weatherLabelMapping[hourlyData[index].weathercode]}
        </span>
        <div className='flex text-sm'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <IoUmbrellaSharp size={16} className='text-cyan-300' />
              <span className='ml-1'>
                {hourlyData[index].precipitation_probability}%
              </span>
            </div>
            <div className='flex items-center lowercase'>
              <IoWaterSharp size={16} className='text-cyan-400' />
              <span>{hourlyData[index].precipitation} mm</span>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className='relative mx-4 mb-4 text-white'>
      <h1 className='mb-1 ml-2 w-full text-2xl font-light tracking-wide'>
        Hourly
      </h1>
      <BsChevronCompactLeft
        size={30}
        className='absolute left-0 top-1/2 z-10 cursor-pointer rounded-full bg-gray-300 text-gray-900  opacity-25 backdrop-blur-sm hover:opacity-100'
      />

      <div ref={listRef} className='List h-60 w-full overflow-auto'>
        <div
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
            height: '100%',
            position: 'relative',
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.index}
              className='absolute left-0 top-0 h-full'
              style={{
                width: `${virtualColumn.size}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              {Column(virtualColumn.index)}
            </div>
          ))}
        </div>
      </div>
      <BsChevronCompactRight
        size={30}
        className='absolute right-0 top-1/2 ml-9 cursor-pointer rounded-full  bg-gray-300 text-gray-900 opacity-25 hover:opacity-100'
      />
    </div>
  );
}
