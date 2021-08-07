import { imgDictionary, months, weekDays } from "./core.constants";

export function celsiusToFah(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

export function getLatLong() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function success(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      resolve({ lat: lat, long: long });
    }, reject);
  }).catch((error) => {
    console.warn("Error trying to get the user lat long: ", error);
  });
}

export function getImgByWeatherStateName(weatherStateName) {
  const weatherImgName = weatherStateName.replaceAll(" ", "");
  const weatherImgSRC = imgDictionary[weatherImgName];
  return weatherImgSRC;
}

export function humanizeDate(dateStr) {
  const date = new Date(dateStr);

  const todayName = weekDays[date.getDay()];
  const todayNumber = date.getDate();
  const todayMonth = months[date.getMonth()];
  const parsedFullDate = `${todayName}, ${todayNumber} ${todayMonth}`;

  return parsedFullDate;
}

export function roundDayPropertyNumbers(day) {
  const parsedDay = {};
  for (const key in day) {
    parsedDay[key] = day[key];
    if (typeof day[key] === "number") {
      parsedDay[key] = Math.round(day[key]);
    }
  }
  return parsedDay;
}
