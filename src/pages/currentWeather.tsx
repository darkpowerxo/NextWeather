import React from "react";
import Image from 'next/image';
import styles from "@/styles/currentWeather.module.css";

const CurrentWeather = ({ data }: any) => {
  return (
    <div className={styles.weather}>
      <div className={styles.top}>
        <div>
          <p className={styles.city}>{data && data.city}</p>
          <p className={styles.weather_description}>{data && data.weather[0].description}</p>
        </div>
        <Image
          width={100} height={100}
          alt="weather"
          className={styles.weather_icon}
          src={`icons/${data&&data.weather[0].icon}.png`}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.temperature}>{Math.round(data && data.main.temp)}°C</p>
        <div className={styles.details}>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Details</span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Feels like</span>
            <span className={styles.parameter_value}>
              {Math.round(data&&data.main.feels_like)}°C
            </span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Wind</span>
            <span className={styles.parameter_value}>{data&& data.wind.speed} m/s</span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Humidity</span>
            <span className={styles.parameter_value}>{data&&data.main.humidity}%</span>
          </div>
          <div className={styles.parameter_row}>
            <span className={styles.parameter_label}>Pressure</span>
            <span className={styles.parameter_value}>{data&&data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;