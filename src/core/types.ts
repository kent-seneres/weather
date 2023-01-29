/**
 * openweathermap One Call API
 * See: https://openweathermap.org/api/one-call-api
 */
export interface WeatherData {
  lat: number;
  lon: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
  alerts: Alert[];
}

export interface HourlyWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: Weather[];
  rain?: Precipitation;
  snow?: Precipitation;
  uvi: number;
  pop: number;
}

export interface CurrentWeatherData extends Omit<HourlyWeatherData, 'pop'> {
  sunset: number;
  sunrise: number;
}

export interface DailyWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: Weather[];
  rain?: number;
  snow?: number;
  uvi: number;
  pop: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Precipitation {
  '1h': number;
}

export interface DailyTemperature {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
}

export interface DailyFeelsLike extends Omit<DailyTemperature, 'min' | 'max'> {}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface HereAddress {
  label: string;
  countryCode: string;
  countryName: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string;
}

interface HereReverseGeocodeItem {
  resultType:
    | 'place'
    | 'locality'
    | 'street'
    | 'houseNumber'
    | 'administrativeArea'
    | 'addressBlock'
    | 'intersection'
    | 'postalCodePoint'
    | 'chainQuery'
    | 'categoryQuery';

  id: string;
  title: string;
  address: HereAddress;
  position: {
    lat: string;
    lng: string;
  };
}

export interface HereReverseGeocode {
  items: HereReverseGeocodeItem[];
}
