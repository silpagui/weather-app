import React from "react";
import { ExtendedWeatherItem } from "../ExtendedWeatherItem/ExtendedWeatherItem.component";
import "./ExtendedWeather.styles.css";

export function ExtendedWeather({ extendedWeather }) {
  return (
    <div className="week-weather">
      {extendedWeather.map(function (day) {
        return (
          <ExtendedWeatherItem
            key={day.date}
            dayOfWeek={day.date}
            weatherIconSRC={day.weatherImgSRC}
            weatherIconAlt={day.weatherState}
            minTemp={day.minTemp}
            maxTemp={day.maxTemp}
            unit={day.unit}
          />
        );
      })}
    </div>
  );
}
