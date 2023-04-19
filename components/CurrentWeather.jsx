import React from 'react';
import HumidityPressure from './HumidityPressure';
import Middle from './Middle';
import Hourly from './Hourly';
import {
  celciusToFahrenheit,
  kmhToMph,
  metersToMiles,
  mmToInches,
} from '@/lib/metricToEmpirical';

export default function CurrentWeather({ meteoData, isEmpirical }) {
  const { current_weather, daily, hourly, timezone } = meteoData;
  const { temperature, time, winddirection, windspeed } = current_weather;

  const currentTemp = isEmpirical
    ? Math.round(celciusToFahrenheit(temperature))
    : temperature;
  const { sunrise, sunset } = daily;

  let hourlyData = [];
  let currentHour = 0;

  while (hourly.time[currentHour] < time) {
    currentHour += 1;
  }

  const newVisibility = isEmpirical
    ? metersToMiles(hourly.visibility[currentHour])
    : Math.round(hourly.visibility[currentHour] / 1000);

  const newWindspeed = isEmpirical
    ? kmhToMph(windspeed)
    : Math.round(windspeed);

  for (let i = currentHour; i < hourly.time.length; i++) {
    hourlyData.push({
      isDay: hourly?.is_day[i],
      cloudCover: hourly?.cloudcover[i],
      time: hourly?.time[i],
      temperature: isEmpirical
        ? celciusToFahrenheit(hourly?.temperature_2m[i])
        : hourly?.temperature_2m[i],
      feels_like: isEmpirical
        ? celciusToFahrenheit(hourly?.apparent_temperature[i])
        : hourly?.apparent_temperature[i],
      precipitation: hourly?.precipitation[i],
      precipitation_probability: hourly?.precipitation_probability[i],
      weathercode: hourly?.weathercode[i],
      windspeed: hourly?.windspeed_10m[i],
    });
  }

  return (
    <div className='relative rounded-2xl border-2 border-gray-600/80 border-r-gray-400 border-t-gray-500 bg-slate-500/20 shadow-inner backdrop-blur-sm'>
      <div className='h-full w-full p-2'>
        <HumidityPressure
          humidity={hourly.relativehumidity_2m[currentHour]}
          pressure={hourly.surface_pressure[currentHour]}
          visibility={newVisibility}
          windspeed={newWindspeed}
          winddirection={winddirection}
          isEmpirical={isEmpirical}
        />
      </div>
      <Middle
        currentWeather={current_weather}
        temperature={currentTemp}
        timezone={timezone}
        feelsLike={hourlyData[0].feels_like}
        uvIndex={hourly.uv_index[currentHour]}
        sunrise={sunrise}
        sunset={sunset}
        isEmpirical={isEmpirical}
      />
      <Hourly
        hourlyData={hourlyData}
        sunrise={sunrise}
        sunset={sunset}
        isEmpirical={isEmpirical}
      />
    </div>
  );
}
