import axios from "axios";

function buildURLProxy(url) {
  return `https://cors-anywhere.herokuapp.com/${url}`;
}

function getLatLongSearchURL(lat, long) {
  return buildURLProxy(
    `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
  );
}

export function searchWOEIDByLatLong(lat, long) {
  const searchURL = getLatLongSearchURL(lat, long);
  return axios(searchURL)
    .then(function (response) {
      const woeid = response.data[0].woeid;
      return woeid;
    })
    .catch((error) => {
      console.warn(
        `Error looking for woeid with coords lat:${lat} long:${long} :`,
        error
      );
    });
}

function getWeatherDataURL(cityID) {
  return buildURLProxy(`https://www.metaweather.com/api/location/${cityID}`);
}

export function getWeatherData(cityID) {
  const weatherDataURL = getWeatherDataURL(cityID);
  return axios(weatherDataURL).then((response) => {
    return response.data;
  });
}

function getSearchCitiesURL(city) {
  return buildURLProxy(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  );
}

export function getCitiesList(city) {
  const searchCitiesURL = getSearchCitiesURL(city);
  return axios(searchCitiesURL)
    .then((response) => {
      return response.data.slice(0, 6);
    })
    .catch((error) => {
      console.warn(`Error looking for city ${city} : `, error);
    });
}
