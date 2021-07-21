import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.styles.css";

import { DayWeather } from "../DayWeather/DayWeather.component.js";
import { MainContent } from "../MainContent/MainContent.component.js";
import { Loader } from "../Loader/Loader.component";
import ClearSRC from "../../assets/images/Clear.png";
import HailSRC from "../../assets/images/Hail.png";
import HeavyCloudSRC from "../../assets/images/HeavyCloud.png";
import HeavyRainSRC from "../../assets/images/HeavyRain.png";
import LightCloudSRC from "../../assets/images/LightCloud.png";
import LightRainSRC from "../../assets/images/LightRain.png";
import ShowerSRC from "../../assets/images/Shower.png";
import SleetSRC from "../../assets/images/Sleet.png";
import SnowSRC from "../../assets/images/Snow.png";
import ThunderstormSRC from "../../assets/images/Thunderstorm.png";

const imgDictionary = {
  Clear: ClearSRC,
  Hail: HailSRC,
  HeavyCloud: HeavyCloudSRC,
  HeavyRain: HeavyRainSRC,
  LightCloud: LightCloudSRC,
  LightRain: LightRainSRC,
  Showers: ShowerSRC,
  Shower: ShowerSRC,
  Sleet: SleetSRC,
  Snow: SnowSRC,
  Thunderstorm: ThunderstormSRC,
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function celsiusToFah(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

export function App() {
  const [celsius, setCelsius] = useState(true);
  const [allData, setAllData] = useState({});

  const [city, setCity] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const [selectedCityId, setSelectedCityId] = useState(638242);

  const [cityResults, setCityResults] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function updateWeatherData() {
      if (selectedCityId) {
        const weatherDataURL = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${selectedCityId}`;

        setIsLoading(true);

        axios(weatherDataURL)
          .then((allDataResponse) => {
            setAllData(allDataResponse.data);
          })
          .catch((error) => {
            console.warn(
              `Error looking for weather on ${selectedCityId}: `,
              error
            );
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
        axios(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`
        )
          .then((cityDataResponse) => {
            setCityResults(cityDataResponse.data.slice(0, 6));
          })
          .catch((error) => {
            console.warn(`Error looking for city ${city} : `, error);
          })
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
