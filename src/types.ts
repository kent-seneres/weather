export interface WeatherData {
  lat: number;
  lon: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData[];
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

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
