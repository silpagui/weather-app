import React, { useEffect, useState } from "react";
import "./App.styles.css";

import { DayWeather } from "../DayWeather/DayWeather.component.js";
import { MainContent } from "../MainContent/MainContent.component.js";
import { Loader } from "../Loader/Loader.component";
import { imgDictionary, weekDays, months } from "../../core/core.constants";
import { celsiusToFah, getLatLong } from "../../core/core.utils";
import {
  getCitiesList,
  getWeatherData,
  searchWOEIDByLatLong,
} from "../../core/core.api";

export function App() {
  const [celsius, setCelsius] = useState(true);
  const [allData, setAllData] = useState({});
  const [city, setCity] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityResults, setCityResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: "", long: "" });

  useEffect(
    function updateLatLong() {
      setIsLoading(true);

      getLatLong(setCoords, () => {
        setIsLoading(false);
      });
    },
    [setCoords, setIsLoading]
  );

  useEffect(
    function getCityByLocation() {
      if (coords.lat && coords.long) {
        setIsLoading(true);
        searchWOEIDByLatLong(coords.lat, coords.long)
          .then(setSelectedCityId)
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [coords, setIsLoading, setSelectedCityId]
  );

  useEffect(
    function updateWeatherData() {
      if (selectedCityId) {
        setIsLoading(true);
        getWeatherData(selectedCityId)
          .then(setAllData)
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [selectedCityId, setAllData, setIsLoading]
  );

  useEffect(
    function updateListCity() {
      if (city) {
        setIsLoading(true);
        getCitiesList(city)
          .then(setCityResults)
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [city, setCityResults, setIsLoading]
  );

  const allDaysWeather = allData.consolidated_weather || [];

  const allDaysWeatherParsed = allDaysWeather.map(function (day, index) {
    const weatherState = day.weather_state_name;
    const weatherImgName = weatherState.replaceAll(" ", "");
    const weatherImgSRC = imgDictionary[weatherImgName];

    const date = new Date(day.applicable_date);
    const todayName = weekDays[date.getDay()];
    const todayNumber = date.getDate();
    const todayMonth = months[date.getMonth()];
    const parsedFullDate = `${todayName}, ${todayNumber} ${todayMonth}`;
    const parsedDate = index === 1 ? "Tomorrow" : parsedFullDate;

    return {
      temp: celsius ? Math.round(day.the_temp) : celsiusToFah(day.the_temp),
      weatherState: day.weather_state_name,
      windSpeed: Math.round(day.wind_speed),
      humidity: day.humidity,
      visibility: Math.round(day.visibility),
      airPressure: Math.round(day.air_pressure),
      windDirection: day.wind_direction_compass,
      windDirectionDegrees: day.wind_direction,
      weatherImgSRC: weatherImgSRC,
      minTemp: celsius ? Math.round(day.min_temp) : celsiusToFah(day.min_temp),
      maxTemp: celsius ? Math.round(day.max_temp) : celsiusToFah(day.max_temp),
      date: parsedDate,
      unit: celsius ? "ºC" : "ºF",
    };
  });

  const todayWeather = allDaysWeatherParsed[0] || {};
  const extendedWeather = allDaysWeatherParsed.slice(1);
  const location = allData.title || "";

  return (
    <div className="app-container">
      {isLoading && <Loader />}

      <DayWeather
        todayTemp={todayWeather.temp || 0}
        weatherState={todayWeather.weatherState || ""}
        date={todayWeather.date}
        location={location}
        weatherImgSRC={todayWeather.weatherImgSRC || ""}
        unit={todayWeather.unit}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setCity={setCity}
        cityResults={cityResults}
        setSelectedCityId={setSelectedCityId}
        setCoords={setCoords}
        setIsLoading={setIsLoading}
      />
      <MainContent
        todayWindSpeed={todayWeather.windSpeed || 0}
        humidity={todayWeather.humidity || 0}
        visibility={todayWeather.visibility || 0}
        airPressure={todayWeather.airPressure || 0}
        windDirection={todayWeather.windDirection || ""}
        extendedWeather={extendedWeather}
        celsius={celsius}
        setCelsius={setCelsius}
        windDirectionDegrees={todayWeather.windDirectionDegrees}
      />
    </div>
  );
}
