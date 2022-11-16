let apiKey = `00bfe09c6fd36ft82e7e4a384o4ba0e8`;
//change week day
let now = new Date();
let weekDays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Sunday`,
];

//change h1
let weekDay = weekDays[now.getDay()];
let currentWeekday = document.querySelector("#weekday");
currentWeekday.innerHTML = weekDay;
console.log(weekDay);

//change date
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let month = months[now.getMonth()];
let day = now.getDate();
let currentDate = document.querySelector("#current-day");
console.log(day, month);
currentDate.innerHTML = `${day} ${month}`;

let currentCity = document.querySelector("#current-city"); //Good morning, current city
let currentTemp = document.querySelector("#current-temp"); // temperature info

//change temperature - Geo Location
function changeCurrentGeo() {
  function handlePosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let currentWeather = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;

    function changeLocation(response) {
      let geoCity = response.data.city;
      currentCity.innerHTML = geoCity;
    }

    function changeTemperature(response) {
      let geoTemp = Math.round(response.data.daily[0].temperature.day);
      currentTemp.textContent = geoTemp;
      let farenheit = document.querySelector("#farenheit");
      let celcius = document.querySelector("#celcius");
      let farenheitConversion = currentTemp.textContent * 1.8 + 32;

      function changeFarenheit() {
        currentTemp.textContent = geoTemp * 1.8 + 32;
      }

      farenheit.addEventListener("click", changeFarenheit);

      console.log(`${currentTemp.textContent}°C ${farenheitConversion}°F`);

      function changeCelcius() {
        currentTemp.textContent = Math.round(response.data.temperature.current);
      }

      celcius.addEventListener("click", changeCelcius);

      //change max
      function changeMaxMin(response) {
        let maxTemp = document.querySelector("#max-temp");
        let geoMax = Math.round(response.data.daily[0].temperature.maximum);
        maxTemp.textContent = `${geoMax} `;

        let minTemp = document.querySelector("#min-temp");
        let geoMin = Math.round(response.data.daily[0].temperature.minimum);
        minTemp.textContent = geoMin;
        console.log(
          `Today it is a maximum of ${geoMax}°C and a minimum of ${geoMin}°C`
        );
      }
      axios.get(currentWeather).then(changeMaxMin);

      //change wind
      function changeWind(response) {
        let wind = document.querySelector("#wind");
        let geoWind = Math.round(response.data.daily[0].wind.speed);
        wind.textContent = `${geoWind} `;
      }
      axios.get(currentWeather).then(changeWind);

      //change sky
      function changeSky(response) {
        let sky = document.querySelector("#sky");
        let geoSky = response.data.daily[0].condition.description;

        sky.textContent = geoSky;
      }
      axios.get(currentWeather).then(changeSky);
      //change humidity
      function changeHumidity(response) {
        let humidity = document.querySelector("#humidity");
        let geoHumidity = response.data.daily[0].temperature.humidity;

        humidity.textContent = geoHumidity;
      }
      axios.get(currentWeather).then(changeHumidity);
    }

    axios.get(currentWeather).then(changeLocation);
    axios.get(currentWeather).then(changeTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentGeo = document.querySelector("#currentgeo");
currentGeo.addEventListener("click", changeCurrentGeo);

//change temperature, search
let newCity = document.querySelector("#new-city"); //form, submit the answer
let cityInput = document.querySelector("#city-input"); //text search box

function changeTempSearch(event) {
  event.preventDefault();
  let citySearch = cityInput.value.trim();
  citySearch = citySearch.toLowerCase();
  let cityUrl = `https://api.shecodes.io/weather/v1/forecast?query=${citySearch}&key=${apiKey}`;

  function changeCityTemp(response) {
    currentCity.textContent = response.data.city;
  }
  axios.get(cityUrl).then(changeCityTemp);
  function changeTemperature(response) {
    let geoTemp = Math.round(response.data.daily[0].temperature.day);
    currentTemp.textContent = geoTemp;
    let farenheit = document.querySelector("#farenheit");
    let celcius = document.querySelector("#celcius");
    let farenheitConversion = currentTemp.textContent * 1.8 + 32;

    function changeFarenheit() {
      let farenheitTemp = geoTemp * 1.8 + 32;
      currentTemp.textContent = Math.round(farenheitTemp);
    }

    farenheit.addEventListener("click", changeFarenheit);

    console.log(`${currentTemp.textContent}°C ${farenheitConversion}°F`);

    function changeCelcius() {
      currentTemp.textContent = Math.round(
        response.data.daily[0].temperature.day
      );
    }

    celcius.addEventListener("click", changeCelcius);

    //change max
    function changeMaxMin(response) {
      let maxTemp = document.querySelector("#max-temp");
      let geoMax = Math.round(response.data.daily[0].temperature.maximum);
      maxTemp.textContent = `${geoMax} `;

      let minTemp = document.querySelector("#min-temp");
      let geoMin = Math.round(response.data.daily[0].temperature.minimum);
      minTemp.textContent = geoMin;
      console.log(
        `Today it is a maximum of ${geoMax}°C and a minimum of ${geoMin}°C`
      );
    }
    axios.get(cityUrl).then(changeMaxMin);

    //change wind
    function changeWind(response) {
      let wind = document.querySelector("#wind");
      let geoWind = Math.round(response.data.daily[0].wind.speed);

      wind.textContent = `${geoWind} `;
    }
    axios.get(cityUrl).then(changeWind);

    //change sky
    function changeSky(response) {
      let sky = document.querySelector("#sky");
      let geoSky = response.data.daily[0].condition.description;

      sky.textContent = geoSky;
    }
    axios.get(cityUrl).then(changeSky);
    //change humidity
    function changeHumidity(response) {
      let humidity = document.querySelector("#humidity");
      let geoHumidity = response.data.daily[0].temperature.humidity;
      console.log(geoHumidity);
      humidity.textContent = geoHumidity;
    }
    axios.get(cityUrl).then(changeHumidity);
  }

  axios.get(cityUrl).then(changeTemperature);
}
newCity.addEventListener("submit", changeTempSearch);
