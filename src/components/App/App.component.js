import React, { useEffect, useState } from "react";
import "./App.styles.css";

import { DayWeather } from "../DayWeather/DayWeather.component.js";
import { MainContent } from "../MainContent/MainContent.component.js";
import { Loader } from "../Loader/Loader.component";
import { TooManyRequestsMessage } from "../TooManyRequestsMessage/TooManyRequestsMessage.component";
import { RequestAccessMessage } from "../RequestAccessMessage/RequestAccessMessage.component";
import {
  celsiusToFah,
  getLatLong,
  getImgByWeatherStateName,
  humanizeDate,
  roundDayPropertyNumbers,
} from "../../core/core.utils";
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
  const [selectedCityId, setSelectedCityId] = useState("638242"); // NOTE: Berlin ID by default
  const [cityResults, setCityResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: "", long: "" });
  const [showRequestAccessMessage, setShowRequestAccessMessage] =
    useState(false);
  const [showTooManyRequestsMessage, setShowTooManyRequestsMessage] =
    useState(false);

  useEffect(
    function updateLatLong() {
      setIsLoading(true);
      getLatLong()
        .then((coords) => {
          if (coords) {
            setCoords(coords);
          }
        })
        .finally(() => {
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
          .catch((error) => {
            if (error.response.status === 403) {
              setShowRequestAccessMessage(true);
            } else if (error.response.status === 429) {
              setShowTooManyRequestsMessage(true);
            } else {
              console.warn(
                `Error looking for weather on city: ${selectedCityId}: `,
                error
              );
            }
          })
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
    const weatherImgSRC = getImgByWeatherStateName(weatherState);
    const parsedFullDate = humanizeDate(day.applicable_date);
    const parsedDate = index === 1 ? "Tomorrow" : parsedFullDate;
    const parsedDay = roundDayPropertyNumbers(day);

    return {
      temp: celsius ? parsedDay.the_temp : celsiusToFah(parsedDay.the_temp),
      weatherState: parsedDay.weather_state_name,
      windSpeed: parsedDay.wind_speed,
      humidity: parsedDay.humidity,
      visibility: parsedDay.visibility,
      airPressure: parsedDay.air_pressure,
      windDirection: parsedDay.wind_direction_compass,
      windDirectionDegrees: parsedDay.wind_direction,
      weatherImgSRC: weatherImgSRC,
      minTemp: celsius ? parsedDay.min_temp : celsiusToFah(parsedDay.min_temp),
      maxTemp: celsius ? parsedDay.max_temp : celsiusToFah(parsedDay.max_temp),
      date: parsedDate,
      unit: celsius ? "ºC" : "ºF",
    };
  });

  const todayWeather = allDaysWeatherParsed[0] || {};
  const extendedWeather = allDaysWeatherParsed.slice(1);
  const location = allData.title || "";

  return (
    <div>
      {showTooManyRequestsMessage && <TooManyRequestsMessage />}
      {showRequestAccessMessage && <RequestAccessMessage />}
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
    </div>
  );
}
