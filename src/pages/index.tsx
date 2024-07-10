import React, { useState, KeyboardEvent } from 'react';
import styles from "@/styles/Home.module.css";
import WeatherData from "@/interfaces/WeatherData";
import CurrentWeather from './currentWeather';
import Forecast from './forecast';

export default function Home() {
  const url = process.env.NEXT_PUBLIC_WEATHER_URL;
  const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  const [Location, setLocation] = useState<string>('');
  const [WeatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [ShowWeather, setShowWeather] = useState<boolean>(false);
  const [ForecastData, setForecastData] = useState<WeatherData | null>(null);
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const weather_request = `${url}weather?q=${Location}&units=metric&appid=${api_key}`;
  const forecast_request = `${url}forecast?q=${Location}&units=metric&appid=${api_key}`;
 
  const searchLocation = async (event: KeyboardEvent<HTMLInputElement>) => {
    try {
      if (event.key === 'Enter') {
        const response = await fetch(weather_request);
        const data = await response.json();
        setWeatherData(data);
        setShowWeather(true);
      }
    } catch (err) {
      console.log(err);
    }

  };

  const getForecast = async () => {
    try {
      const response = await fetch(forecast_request);
      const data = await response.json();
      setForecastData(data);
      setShowForecast(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            type="text"
            value={Location}
            className={styles.searchBox}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyDown={searchLocation}
          />
          {WeatherData ? (
            <button className={styles.getForecast} type="button" onClick={getForecast}>
              Get forecast
            </button>
          ) : null}
        </div>
        {ShowWeather && WeatherData && <CurrentWeather data={WeatherData} />}
        {showForecast && ForecastData && <Forecast data={ForecastData} />}
      </div>
    </div>
  );
}
