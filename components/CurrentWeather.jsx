import React from 'react';
import HumidityPressure from './HumidityPressure';
import Middle from './Middle';
import Hourly from './Hourly';

export default function CurrentWeather({ meteoData }) {
  console.log('meteoData', meteoData);
  const { current_weather, daily, hourly, timezone } = meteoData;
  const { is_day, temperature, time, weathercode, winddirection, windspeed } =
    current_weather;
  const { sunrise, sunset } = daily;

  let hourlyData = [];
  let currentHour = 0;

  while (hourly.time[currentHour] < time) {
    currentHour += 1;
  }

  for (let i = currentHour; i < hourly.time.length; i++) {
    hourlyData.push({
      isDay: hourly?.is_day[i],
      cloudCover: hourly?.cloudcover[i],
      time: hourly?.time[i],
      temperature: Math.round(hourly?.temperature_2m[i]),
      feels_like: Math.round(hourly?.apparent_temperature[i]),
      precipitation: hourly?.precipitation[i],
      precipitation_probability: hourly?.precipitation_probability[i],
      weathercode: hourly?.weathercode[i],
      windspeed: hourly?.windspeed_10m[i],
    });
  }

  return (
    <div className='relative max-w-3xl rounded-2xl border-[2px] border-t-[1px] border-b-gray-600/80 border-l-gray-700/50 border-r-gray-400/80 border-t-gray-100/50'>
      <div className='h-full w-full p-2'>
        <HumidityPressure
          humidity={hourly.relativehumidity_2m[currentHour]}
          pressure={hourly.surface_pressure[currentHour]}
          visibility={hourly.visibility[currentHour]}
          windspeed={windspeed}
          winddirection={winddirection}
        />
      </div>
      <Middle
        currentWeather={current_weather}
        timezone={timezone}
        feelsLike={hourlyData[0].feels_like}
        uvIndex={hourly.uv_index[currentHour]}
        sunrise={sunrise}
        sunset={sunset}
      />
      <Hourly hourlyData={hourlyData} sunrise={sunrise} sunset={sunset} />
    </div>
  );
}
