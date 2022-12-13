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
  `Saturday`,
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

//change h1
let weekDay = weekDays[now.getDay()];
let currentWeekday = document.querySelector("#weekday");
currentWeekday.innerHTML = weekDay;
console.log(weekDay);

// forecast weekday labels
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");
let day4 = document.querySelector("#day4");
let day5 = document.querySelector("#day5");
let day6 = document.querySelector("#day6");
let day7 = document.querySelector("#day7");

// change forecast weekdays
day2.innerHTML = weekDays[now.getDay() + 1];
day3.innerHTML = weekDays[now.getDay() + 2];
day4.innerHTML = weekDays[now.getDay() + 3];
day5.innerHTML = weekDays[now.getDay() + 4];
day6.innerHTML = weekDays[now.getDay() + 5];
day7.innerHTML = weekDays[now.getDay() + 6];

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
let hour = now.getHours();
let currentDate = document.querySelector("#current-day");
currentDate.innerHTML = `${day} ${month}`;

// change greeting (morning, afternoon, evening)
let dayTime = document.querySelector("#daytime");

if (hour > 5 && hour < 12) {
  dayTime.innerHTML = "morning";
} else if (hour >= 12 && hour < 17) {
  dayTime.innerHTML = "afternoon";
} else if (hour >= 17 && hour <= 24) {
  dayTime.innerHTML = "evening";
} else if (hour >= 0 && hour < 5) {
  dayTime.innerHTML = "evening";
}

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
    console.log(currentWeather);
    function changeLocation(response) {
      let geoCity = response.data.city;
      currentCity.innerHTML = geoCity;
    }

    function changeTemperature(response) {
      let geoTemp = Math.round(response.data.daily[0].temperature.day);
      currentTemp.textContent = geoTemp;
      let farenheit = document.querySelector("#farenheit");
      let celsius = document.querySelector("#celsius");
      let farenheitConversion = currentTemp.textContent * 1.8 + 32;

      function changeFarenheit() {
        currentTemp.textContent = geoTemp * 1.8 + 32;
      }

      farenheit.addEventListener("click", changeFarenheit);

      console.log(`${currentTemp.textContent}°C ${farenheitConversion}°F`);

      function changecelsius() {
        currentTemp.textContent = Math.round(response.data.temperature.current);
      }

      celsius.addEventListener("click", changecelsius);

      //change max and min temp
      let maxTemp = document.querySelector("#max-temp");
      let geoMax = Math.round(response.data.daily[0].temperature.maximum);
      maxTemp.textContent = `${geoMax} `;

      let minTemp = document.querySelector("#min-temp");
      let geoMin = Math.round(response.data.daily[0].temperature.minimum);
      minTemp.textContent = geoMin;

      // forecast temp labels
      let temp2 = document.querySelector("#temp2");
      let temp3 = document.querySelector("#temp3");
      let temp4 = document.querySelector("#temp4");
      let temp5 = document.querySelector("#temp5");
      let temp6 = document.querySelector("#temp6");
      let temp7 = document.querySelector("#temp7");

      //change forecast temp
      temp2.innerHTML =
        Math.round(response.data.daily[1].temperature.day) + "°C";
      temp3.innerHTML =
        Math.round(response.data.daily[2].temperature.day) + "°C";
      temp4.innerHTML =
        Math.round(response.data.daily[3].temperature.day) + "°C";
      temp5.innerHTML =
        Math.round(response.data.daily[4].temperature.day) + "°C";
      temp6.innerHTML =
        Math.round(response.data.daily[5].temperature.day) + "°C";
      temp7.innerHTML =
        Math.round(response.data.daily[6].temperature.day) + "°C";

      //change wind
      let wind = document.querySelector("#wind");
      let geoWind = Math.round(response.data.daily[0].wind.speed);
      wind.textContent = `${geoWind} `;

      //change sky
      function changeSky(response) {
        //event.preventDefault();
        let sky = document.querySelector("#sky");
        let geoSky = response.data.daily[0].condition.description;
        sky.textContent = geoSky;

        //sky forecast icon info
        let geoIcon = response.data.daily[0].condition.icon;
        let foreSky2 = response.data.daily[1].condition.icon;
        let foreSky3 = response.data.daily[2].condition.icon;
        let foreSky4 = response.data.daily[3].condition.icon;
        let foreSky5 = response.data.daily[4].condition.icon;
        let foreSky6 = response.data.daily[5].condition.icon;
        let foreSky7 = response.data.daily[6].condition.icon;

        //change forecast icons

        document.getElementById("todayIcon").src = `icons/${geoIcon}.svg`;
        document.getElementById("foreIcon2").src = `icons/${foreSky2}.svg`;
        document.getElementById("foreIcon3").src = `icons/${foreSky3}.svg`;
        document.getElementById("foreIcon4").src = `icons/${foreSky4}.svg`;
        document.getElementById("foreIcon5").src = `icons/${foreSky5}.svg`;
        document.getElementById("foreIcon6").src = `icons/${foreSky6}.svg`;
        document.getElementById("foreIcon7").src = `icons/${foreSky7}.svg`;

        //background colors
        let clearBlue = "#B3BFD2";
        let orangeH = "#E6A339";
        let clearDay = "#FFFEFA";
        let clearNight = "#16223F";
        let cloudyDay = "#EFEEE7";
        let cloudyNight = "#282E3D";
        let scatDay = "#DBDBDB";
        let scatNight = "#32405F";
        let brokenDay = "#B7B5B5";
        let brokenNight = "#5D6D92";
        let showerDay = "#C8DDE9";
        let showerNight = "#4A5161";
        let rainDay = "#97BACE";
        let rainNight = "#394152";
        let thunderDay = "#BDBCA4";
        let thunderNight = "#4E679B";
        let snowDay = "#E7F3F6";
        let snowNight = "#727B8E";
        let mistDay = "#D6E1E4";
        let mistNight = "#8792AC";

        const root = document.querySelector(":root");
        //let searchBar = document.querySelector("#city-input");

        if (hour < 18) {
          root.style.setProperty("--gray", cloudyNight);
        } else {
          root.style.setProperty("--gray", clearDay);
        }

        // change page colors based on forecast
        // clear sky icon
        if (geoIcon === `clear-sky-day`) {
          root.style.setProperty("--blue", clearDay);
          root.style.setProperty("--orange", orangeH);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_orange.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_orange.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_orange.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_orange.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_orange.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_orange.svg`;
        }
        if (geoIcon === `clear-sky-night`) {
          root.style.setProperty("--blue", clearNight);
          root.style.setProperty("--orange", clearBlue);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearblue.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearblue.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearblue.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearblue.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearblue.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearblue.svg`;
        }
        // cloudy icon
        if (geoIcon === `few-clouds-day`) {
          root.style.setProperty("--blue", cloudyDay);
          root.style.setProperty("--orange", orangeH);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_orange.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_orange.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_orange.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_orange.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_orange.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_orange.svg`;
        }
        if (geoIcon === `few-clouds-night`) {
          root.style.setProperty("--blue", cloudyNight);
          root.style.setProperty("--orange", clearBlue);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearblue.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearblue.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearblue.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearblue.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearblue.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearblue.svg`;
        }
        // scattered clouds icon
        if (geoIcon === `scattered-clouds-day`) {
          root.style.setProperty("--blue", scatDay);
          root.style.setProperty("--orange", scatNight);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_rainight.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_rainight.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_rainight.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_rainight.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_rainight.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_rainight.svg`;
        }
        if (geoIcon === `scattered-clouds-night`) {
          root.style.setProperty("--blue", scatNight);
          root.style.setProperty("--orange", clearBlue);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearblue.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearblue.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearblue.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearblue.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearblue.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearblue.svg`;
        }

        // broken clouds icon
        if (geoIcon === `broken-clouds-day`) {
          root.style.setProperty("--blue", brokenDay);
          root.style.setProperty("--orange", clearDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
        if (geoIcon === `broken-clouds-night`) {
          root.style.setProperty("--blue", brokenNight);
          root.style.setProperty("--orange", clearNight);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearblue.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearblue.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearblue.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearblue.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearblue.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearblue.svg`;
        }
        // showers icon
        if (geoIcon === `shower-rain-day`) {
          root.style.setProperty("--blue", showerDay);
          root.style.setProperty("--orange", brokenNight);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_brokenight.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_brokenight.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_brokenight.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_brokenight.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_brokenight.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_brokenight.svg`;
        }
        if (geoIcon === `shower-rain-night`) {
          root.style.setProperty("--blue", showerNight);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
        // rain icon
        if (geoIcon === `rain-day`) {
          root.style.setProperty("--blue", rainDay);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
        if (geoIcon === `rain-night`) {
          root.style.setProperty("--blue", rainNight);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }

        // thunder icon
        if (geoIcon === `thunderstorm-day`) {
          root.style.setProperty("--blue", thunderDay);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
        if (geoIcon === `thunderstorm-night`) {
          root.style.setProperty("--blue", thunderNight);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
        // snow icon
        if (geoIcon === `snow-day`) {
          root.style.setProperty("--blue", snowDay);
          root.style.setProperty("--orange", rainDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_rainday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_rainday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_rainday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_rainday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_rainday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_rainday.svg`;
        }
        if (geoIcon === `snow-night`) {
          root.style.setProperty("--blue", snowNight);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }

        // mist icon
        if (geoIcon === `mist-day`) {
          root.style.setProperty("--blue", mistDay);
          root.style.setProperty("--orange", rainNight);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_rainight.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_rainight.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_rainight.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_rainight.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_rainight.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_rainight.svg`;
        }
        if (geoIcon === `mist-night`) {
          root.style.setProperty("--blue", mistNight);
          root.style.setProperty("--orange", snowDay);
          document.getElementById(
            "foreIcon2"
          ).src = `icons/${foreSky2}_clearday.svg`;
          document.getElementById(
            "foreIcon3"
          ).src = `icons/${foreSky3}_clearday.svg`;
          document.getElementById(
            "foreIcon4"
          ).src = `icons/${foreSky4}_clearday.svg`;
          document.getElementById(
            "foreIcon5"
          ).src = `icons/${foreSky5}_clearday.svg`;
          document.getElementById(
            "foreIcon6"
          ).src = `icons/${foreSky6}_clearday.svg`;
          document.getElementById(
            "foreIcon7"
          ).src = `icons/${foreSky7}_clearday.svg`;
        }
      }

      axios.get(currentWeather).then(changeSky);
      //change humidity
      let humidity = document.querySelector("#humidity");
      let geoHumidity = response.data.daily[0].temperature.humidity;

      humidity.textContent = geoHumidity;
    }

    axios.get(currentWeather).then(changeLocation);
    axios.get(currentWeather).then(changeTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentGeo = document.querySelector("#currentgeo");
currentGeo.addEventListener("click", changeCurrentGeo);
changeCurrentGeo();
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
    let celsius = document.querySelector("#celsius");
    let farenheitConversion = currentTemp.textContent * 1.8 + 32;

    function changeFarenheit() {
      currentTemp.textContent = geoTemp * 1.8 + 32;
    }

    farenheit.addEventListener("click", changeFarenheit);

    console.log(`${currentTemp.textContent}°C ${farenheitConversion}°F`);

    function changecelsius() {
      currentTemp.textContent = Math.round(response.data.temperature.current);
    }

    celsius.addEventListener("click", changecelsius);

    //change max and min temp
    let maxTemp = document.querySelector("#max-temp");
    let geoMax = Math.round(response.data.daily[0].temperature.maximum);
    maxTemp.textContent = `${geoMax} `;

    let minTemp = document.querySelector("#min-temp");
    let geoMin = Math.round(response.data.daily[0].temperature.minimum);
    minTemp.textContent = geoMin;

    // forecast temp labels
    let temp2 = document.querySelector("#temp2");
    let temp3 = document.querySelector("#temp3");
    let temp4 = document.querySelector("#temp4");
    let temp5 = document.querySelector("#temp5");
    let temp6 = document.querySelector("#temp6");
    let temp7 = document.querySelector("#temp7");

    //change forecast temp
    temp2.innerHTML = Math.round(response.data.daily[1].temperature.day) + "°C";
    temp3.innerHTML = Math.round(response.data.daily[2].temperature.day) + "°C";
    temp4.innerHTML = Math.round(response.data.daily[3].temperature.day) + "°C";
    temp5.innerHTML = Math.round(response.data.daily[4].temperature.day) + "°C";
    temp6.innerHTML = Math.round(response.data.daily[5].temperature.day) + "°C";
    temp7.innerHTML = Math.round(response.data.daily[6].temperature.day) + "°C";

    //change wind
    let wind = document.querySelector("#wind");
    let geoWind = Math.round(response.data.daily[0].wind.speed);
    wind.textContent = `${geoWind} `;

    //change sky
    function changeSky(response) {
      //event.preventDefault();
      let sky = document.querySelector("#sky");
      let geoSky = response.data.daily[0].condition.description;
      sky.textContent = geoSky;

      //sky forecast icon info
      let geoIcon = response.data.daily[0].condition.icon;
      let foreSky2 = response.data.daily[1].condition.icon;
      let foreSky3 = response.data.daily[2].condition.icon;
      let foreSky4 = response.data.daily[3].condition.icon;
      let foreSky5 = response.data.daily[4].condition.icon;
      let foreSky6 = response.data.daily[5].condition.icon;
      let foreSky7 = response.data.daily[6].condition.icon;

      //change forecast icons

      document.getElementById("todayIcon").src = `icons/${geoIcon}.svg`;
      document.getElementById("foreIcon2").src = `icons/${foreSky2}.svg`;
      document.getElementById("foreIcon3").src = `icons/${foreSky3}.svg`;
      document.getElementById("foreIcon4").src = `icons/${foreSky4}.svg`;
      document.getElementById("foreIcon5").src = `icons/${foreSky5}.svg`;
      document.getElementById("foreIcon6").src = `icons/${foreSky6}.svg`;
      document.getElementById("foreIcon7").src = `icons/${foreSky7}.svg`;

      //background colors
      let clearBlue = "#B3BFD2";
      let orangeH = "#E6A339";
      let clearDay = "#FFFEFA";
      let clearNight = "#16223F";
      let cloudyDay = "#EFEEE7";
      let cloudyNight = "#282E3D";
      let scatDay = "#DBDBDB";
      let scatNight = "#32405F";
      let brokenDay = "#B7B5B5";
      let brokenNight = "#5D6D92";
      let showerDay = "#C8DDE9";
      let showerNight = "#4A5161";
      let rainDay = "#97BACE";
      let rainNight = "#394152";
      let thunderDay = "#BDBCA4";
      let thunderNight = "#4E679B";
      let snowDay = "#E7F3F6";
      let snowNight = "#727B8E";
      let mistDay = "#D6E1E4";
      let mistNight = "#8792AC";

      const root = document.querySelector(":root");
      //let searchBar = document.querySelector("#city-input");

      if (hour < 18) {
        root.style.setProperty("--gray", cloudyNight);
      } else {
        root.style.setProperty("--gray", clearDay);
      }

      // change page colors based on forecast
      // clear sky icon
      if (geoIcon === `clear-sky-day`) {
        root.style.setProperty("--blue", clearDay);
        root.style.setProperty("--orange", orangeH);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_orange.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_orange.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_orange.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_orange.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_orange.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_orange.svg`;
      }
      if (geoIcon === `clear-sky-night`) {
        root.style.setProperty("--blue", clearNight);
        root.style.setProperty("--orange", clearBlue);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearblue.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearblue.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearblue.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearblue.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearblue.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearblue.svg`;
      }
      // cloudy icon
      if (geoIcon === `few-clouds-day`) {
        root.style.setProperty("--blue", cloudyDay);
        root.style.setProperty("--orange", orangeH);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_orange.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_orange.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_orange.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_orange.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_orange.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_orange.svg`;
      }
      if (geoIcon === `few-clouds-night`) {
        root.style.setProperty("--blue", cloudyNight);
        root.style.setProperty("--orange", clearBlue);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearblue.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearblue.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearblue.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearblue.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearblue.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearblue.svg`;
      }
      // scattered clouds icon
      if (geoIcon === `scattered-clouds-day`) {
        root.style.setProperty("--blue", scatDay);
        root.style.setProperty("--orange", scatNight);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_rainight.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_rainight.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_rainight.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_rainight.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_rainight.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_rainight.svg`;
      }
      if (geoIcon === `scattered-clouds-night`) {
        root.style.setProperty("--blue", scatNight);
        root.style.setProperty("--orange", clearBlue);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearblue.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearblue.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearblue.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearblue.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearblue.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearblue.svg`;
      }

      // broken clouds icon
      if (geoIcon === `broken-clouds-day`) {
        root.style.setProperty("--blue", brokenDay);
        root.style.setProperty("--orange", clearDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
      if (geoIcon === `broken-clouds-night`) {
        root.style.setProperty("--blue", brokenNight);
        root.style.setProperty("--orange", clearNight);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearblue.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearblue.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearblue.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearblue.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearblue.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearblue.svg`;
      }
      // showers icon
      if (geoIcon === `shower-rain-day`) {
        root.style.setProperty("--blue", showerDay);
        root.style.setProperty("--orange", brokenNight);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_brokenight.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_brokenight.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_brokenight.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_brokenight.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_brokenight.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_brokenight.svg`;
      }
      if (geoIcon === `shower-rain-night`) {
        root.style.setProperty("--blue", showerNight);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
      // rain icon
      if (geoIcon === `rain-day`) {
        root.style.setProperty("--blue", rainDay);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
      if (geoIcon === `rain-night`) {
        root.style.setProperty("--blue", rainNight);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }

      // thunder icon
      if (geoIcon === `thunderstorm-day`) {
        root.style.setProperty("--blue", thunderDay);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
      if (geoIcon === `thunderstorm-night`) {
        root.style.setProperty("--blue", thunderNight);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
      // snow icon
      if (geoIcon === `snow-day`) {
        root.style.setProperty("--blue", snowDay);
        root.style.setProperty("--orange", rainDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_rainday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_rainday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_rainday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_rainday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_rainday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_rainday.svg`;
      }
      if (geoIcon === `snow-night`) {
        root.style.setProperty("--blue", snowNight);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }

      // mist icon
      if (geoIcon === `mist-day`) {
        root.style.setProperty("--blue", mistDay);
        root.style.setProperty("--orange", rainNight);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_rainight.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_rainight.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_rainight.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_rainight.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_rainight.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_rainight.svg`;
      }
      if (geoIcon === `mist-night`) {
        root.style.setProperty("--blue", mistNight);
        root.style.setProperty("--orange", snowDay);
        document.getElementById(
          "foreIcon2"
        ).src = `icons/${foreSky2}_clearday.svg`;
        document.getElementById(
          "foreIcon3"
        ).src = `icons/${foreSky3}_clearday.svg`;
        document.getElementById(
          "foreIcon4"
        ).src = `icons/${foreSky4}_clearday.svg`;
        document.getElementById(
          "foreIcon5"
        ).src = `icons/${foreSky5}_clearday.svg`;
        document.getElementById(
          "foreIcon6"
        ).src = `icons/${foreSky6}_clearday.svg`;
        document.getElementById(
          "foreIcon7"
        ).src = `icons/${foreSky7}_clearday.svg`;
      }
    }

    axios.get(cityUrl).then(changeSky);
    //change humidity
    let humidity = document.querySelector("#humidity");
    let geoHumidity = response.data.daily[0].temperature.humidity;

    humidity.textContent = geoHumidity;
  }

  axios.get(cityUrl).then(changeTemperature);
}
newCity.addEventListener("submit", changeTempSearch);
