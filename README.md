# weather

![icon](android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png)

Clone of the Dark Sky weather app ([RIP](https://www.androidauthority.com/dark-sky-app-unofficial-1148870/)).

Built with [React Native](https://reactnative.dev/) (only tested on Android platform).

The app uses [OpenWeather](https://openweathermap.org/api/one-call-api) as the main data source. It also uses the [HERE](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-reverse-geocode-brief.html) reverse geocoding service to display the current location name. All of the APIs in use provide a free access tier (with service limits).

This app is for personal use only, and is not published on any app store.

## Features

- weather data for current location
- current weather data, hourly and daily forecast
- weather alerts

#### TODO

- show weather for user selected location

## Build

Keys for the various APIs must be added to the `.env` file.

```
OWM_APP_ID=<insert openweather key>
HERE_API_KEY=<insert here key>
```

Build and deploy through the standard react native process:

```
$ yarn android
```
