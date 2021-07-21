import React from "react";
import "./ExtendedWeatherItem.styles.css";

export function ExtendedWeatherItem(props) {
  return (
    <div className="day-extended">
      <h3 className="extended-day-item">{props.dayOfWeek}</h3>
      <img src={props.weatherIconSRC} alt={props.weatherIconAlt} />
      <div className="description-day">
        <p>
          {props.maxTemp}
          {props.unit}
        </p>
        <p>
          {props.minTemp}
          {props.unit}
        </p>
      </div>
    </div>
  );
}
