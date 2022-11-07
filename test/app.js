function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentWeather = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

  function changeLocation(response) {
    console.log(response.data);
  }
  axios.get(currentWeather).then(changeLocation);
}
navigator.geolocation.getCurrentPosition(handlePosition);

let apiKey = `f81614abe2395d5dfecd45b9298041de`;
