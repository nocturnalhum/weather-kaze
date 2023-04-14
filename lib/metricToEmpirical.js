import React from 'react';

export const celciusToFahrenheit = (celius) => {
  return Math.round(celius * (9 / 5) + 32);
};

export const metersToMiles = (m) => {
  return Math.round(m * 0.0006213711);
};

export const mmToInches = (mm) => {
  return mm * 0.03937007874;
};

export const kmhToMph = (kmh) => {
  return Math.round(kmh / 1.609344);
};
