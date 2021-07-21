import React from "react";
import "./MainContent.styles.css";

import { ExtendedWeather } from "../ExtendedWeather/ExtendedWeather.component.js";
import { Highlights } from "../Highlights/Highlights.component";
import { RoundButton } from "../RoundButton/RoundButton.component";

export function MainContent({
  todayWindSpeed,
  humidity,
  visibility,
  airPressure,
  windDirection,
  extendedWeather,
  celsius,
  setCelsius,
  windDirectionDegrees,
}) {
  const handleOnClick = () => {
    setCelsius(!celsius);
  };

  return (
    <div className="main-content">
      <div className="buttons">
        <RoundButton content="ºC" active={celsius} onClick={handleOnClick} />
        <RoundButton content="ºF" active={!celsius} onClick={handleOnClick} />
      </div>
      <ExtendedWeather extendedWeather={extendedWeather} />
      <h2 className="title">Today’s Highlights </h2>
      <Highlights
        todayWindSpeed={todayWindSpeed}
        humidity={humidity}
        visibility={visibility}
        airPressure={airPressure}
        windDirection={windDirection}
        windDirectionDegrees={windDirectionDegrees}
      />
      <p className="copy">
        created by <a href="index.html">username</a> - devChallenges.io
      </p>
    </div>
  );
}
