import "./DayWeather.styles.css";
import LocationSRC from "../../assets/images/location.png";
import gpsSRC from "../../assets/images/GPS-icon.png";
import { SearchButton } from "../SearchButton/SearchButton.component";
import { RoundButton } from "../RoundButton/RoundButton.component";
import { useState } from "react";
import { getLatLong } from "../../core/core.utils";

export function DayWeather({
  todayTemp,
  weatherState,
  date,
  location,
  weatherImgSRC,
  unit,
  showSearch,
  setShowSearch,
  setCity,
  cityResults,
  setSelectedCityId,
  setCoords,
  setIsLoading,
}) {
  const [cityToBeSearch, setCityToBeSearch] = useState("");

  const handleOnClick = () => {
    setShowSearch(!showSearch);
  };

  const handleInputOnChange = (event) => {
    const searchInput = event.target;
    const cityToBeSearch = searchInput.value;
    setCityToBeSearch(cityToBeSearch);
  };

  const handleOnSubmitSearch = (event) => {
    const form = event.target;
    event.preventDefault();
    form.reset();
    setCity(cityToBeSearch);
  };

  const showSearchClass = showSearch ? "search-aside-showed" : "";

  return (
    <div className="aside ">
      <span className="background-aside"></span>
      <div className="btn-container">
        <SearchButton onClick={handleOnClick} />

        <RoundButton
          imgSRC={<img src={gpsSRC} alt="gps-icon" />}
          onClick={() => {
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
          }}
        />
      </div>

      <div className={`search-aside ${showSearchClass}`}>
        <button className="close-btn" onClick={handleOnClick}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="cross-icon"
          >
            <path
              d="M13.2929 1.41L8.05645 6.64645L7.70289 7L8.05645 7.35355L13.2929 12.59L12.59 13.2929L7.35355 8.05645L7 7.70289L6.64645 8.05645L1.41 13.2929L0.707107 12.59L5.94355 7.35355L6.29711 7L5.94355 6.64645L0.707107 1.41L1.41 0.707107L6.64645 5.94355L7 6.29711L7.35355 5.94355L12.59 0.707107L13.2929 1.41Z"
              fill="currentColor"
              stroke="currentColor"
            />
          </svg>
        </button>
        <form className="search-location" onSubmit={handleOnSubmitSearch}>
          <input
            className="input-search"
            type="text"
            name="search"
            placeholder="search location"
            onChange={handleInputOnChange}
          ></input>
          <button className="search">Search</button>
        </form>
        <div className="city-to-search">
          {cityResults.map(function (city) {
            return (
              <button
                key={city.title}
                onClick={() => {
                  setShowSearch(false);
                  setSelectedCityId(city.woeid);
                }}
              >
                {city.title}
                <svg
                  className="go-arrow"
                  width="54"
                  height="95"
                  viewBox="0 0 54 95"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.65 94.9627C4.25 94.9627 2.75 94.4627 1.65 93.3627C-0.55 91.1627 -0.55 87.6627 1.65 85.4627L39.55 47.4627L1.65 9.56272C-0.55 7.36272 -0.55 3.86272 1.65 1.66272C3.85 -0.537282 7.35 -0.537282 9.55 1.56272L51.45 43.4627C52.55 44.5627 53.05 45.9627 53.05 47.4627C53.05 48.9627 52.45 50.3627 51.45 51.4627L9.55 93.3627C8.45 94.4627 7.05 94.9627 5.65 94.9627Z"
                    fill="#616475"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
      {weatherImgSRC && (
        <img src={weatherImgSRC} alt={weatherState} className="shower-icon" />
      )}

      <div className="aside-day-data">
        <p className="aside-data-number">{todayTemp}</p>
        <p className="aside-data-unit">{unit}</p>
      </div>
      <p className="description-weather">{weatherState}</p>
      <div>
        <p className="aside-day">Today</p>
        <p className="aside-day decoration">•</p>
        <p className="aside-day">{date}</p>
      </div>
      <div>
        <img
          src={LocationSRC}
          alt="location-icon"
          className="location-icon location"
        />
        <p className="location">{location}</p>
      </div>
    </div>
  );
}
