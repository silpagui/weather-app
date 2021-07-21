import "./DayWeather.styles.css";
import LocationSRC from "../../assets/images/location.png";
import gpsSRC from "../../assets/images/GPS-icon.png";
import { SearchButton } from "../SearchButton/SearchButton.component";
import { RoundButton } from "../RoundButton/RoundButton.component";
import { useState } from "react";

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

        <RoundButton imgSRC={<img src={gpsSRC} alt="gps-icon" />} />
      </div>

      <div className={`search-aside ${showSearchClass}`}>
        <button className="close-btn" onClick={handleOnClick}>
          X
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
