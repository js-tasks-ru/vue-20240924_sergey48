import { WeatherConditionIcons } from './weather.service.ts'

function tempKelvToCels(tempK) {
  return (tempK - 273.15).toFixed(1)
}

function pressureHpaToMmhg(pressureHpa) {
  return Math.round(pressureHpa * 3 / 4)
}

function isNignt(dt, sunrise, sunset) {
  return dt < sunrise || dt > sunset
}

function getConditionIcon(weatherId) {
  return WeatherConditionIcons[weatherId];
}

export { tempKelvToCels, pressureHpaToMmhg, isNignt, getConditionIcon };
