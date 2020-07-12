export interface WeatherData {
  lat: number;
  lon: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
}

export interface CurrentWeatherData {
  dt: number;
  sunset: number;
  sunrise: number;
  temp: number;
  feels_like: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: Weather[];
}

export interface HourlyWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  weather: Weather[];
}

export interface DailyWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  humidity: number;
  wind_speed: number;
  clouds: number;
  rain: number;
  snow: number;
  weather: Weather[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyTemperature {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
}

export interface DailyFeelsLike {
  morn: number;
  day: number;
  eve: number;
  night: number;
}

// TODO: consolidate types
