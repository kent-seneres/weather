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
}

export interface CurrentWeatherData extends HourlyWeatherData {
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

/**
 * weatherbit.io Alerts API
 * See: https://www.weatherbit.io/api/swaggerui/weather-api-v2#!/Alerts/
 */
export interface AlertsData {
  lat: number;
  lon: number;
  alerts: WeatherAlertGroup[];
}

export interface WeatherAlertGroup {
  title: string;
  description: string;
  severity: string;
  effective_utc: string;
  expires_utc: string;
  alerts: string[];
}
