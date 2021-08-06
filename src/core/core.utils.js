export function celsiusToFah(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

export function getLatLong(onDataReady, onError) {
  navigator.geolocation.getCurrentPosition(
    function success(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      onDataReady({ lat: lat, long: long });
    },
    function error(error) {
      onError();
      console.warn("Geolocation Error", error);
    }
  );
}
