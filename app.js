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

      //change max and min temp
      let maxTemp = document.querySelector("#max-temp");
      let geoMax = Math.round(response.data.daily[0].temperature.maximum);
      maxTemp.textContent = `${geoMax} `;

      let minTemp = document.querySelector("#min-temp");
      let geoMin = Math.round(response.data.daily[0].temperature.minimum);
      minTemp.textContent = geoMin;

      //change wind
      let wind = document.querySelector("#wind");
      let geoWind = Math.round(response.data.daily[0].wind.speed);
      wind.textContent = `${geoWind} `;

      //change sky
      function changeSky(response) {
        event.preventDefault();
        let sky = document.querySelector("#sky");
        let geoSky = response.data.daily[0].condition.description;
        sky.textContent = geoSky;

        //sky forecast icon info
        let foreSky2 = response.data.daily[1].condition.description;
        let foreSky3 = response.data.daily[2].condition.description;
        let foreSky4 = response.data.daily[3].condition.description;
        let foreSky5 = response.data.daily[4].condition.description;
        let foreSky6 = response.data.daily[5].condition.description;
        let foreSky7 = response.data.daily[6].condition.description;

        //icon variables
        let todayIcon = document.querySelector(".today-icon");
        let foreIcon2 = document.querySelector("#foreIcon2");
        let foreIcon3 = document.querySelector("#foreIcon3");
        let foreIcon4 = document.querySelector("#foreIcon4");
        let foreIcon5 = document.querySelector("#foreIcon5");
        let foreIcon6 = document.querySelector("#foreIcon6");
        let foreIcon7 = document.querySelector("#foreIcon7");

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
        let searchBar = document.querySelector("#city-input");

        if (hour < 18) {
          root.style.setProperty("--gray", cloudyNight);
          searchBar.classList.add("clearNight");
        } else {
          root.style.setProperty("--gray", clearDay);
          searchBar.classList.add("clearDay");
        }
        // clear sky icon
        if (geoSky === `clear sky` && hour < 18) {
          todayIcon.setAttribute("src", "icons/clear-sky-day.svg");
          root.style.setProperty("--blue", clearDay);
          root.style.setProperty("--orange", orangeH);
        } else if (geoSky === `clear sky` && hour > 18) {
          todayIcon.setAttribute("src", "icons/clear-sky-night.svg");
          root.style.setProperty("--blue", clearNight);
          root.style.setProperty("--orange", clearBlue);
        }
        // sky is clear icon
        if (geoSky === `sky is clear` && hour < 18) {
          todayIcon.setAttribute("src", "icons/clear-sky-day.svg");
          root.style.setProperty("--blue", clearDay);
          root.style.setProperty("--orange", orangeH);
        } else if (geoSky === `sky is clear` && hour > 18) {
          todayIcon.setAttribute("src", "icons/clear-sky-night.svg");
          root.style.setProperty("--blue", clearNight);
          root.style.setProperty("--orange", clearBlue);
        }
        // cloudy icon
        if (geoSky === `few clouds` && hour < 18) {
          todayIcon.setAttribute("src", "/icons/cloudy-day.svg");
          root.style.setProperty("--blue", cloudyDay);
          root.style.setProperty("--orange", orangeH);
        } else if (geoSky === `few clouds` && hour > 18) {
          todayIcon.setAttribute("src", "icons/cloudy-night.svg");
          root.style.setProperty("--blue", cloudyNight);
          root.style.setProperty("--orange", clearBlue);
        }
        // scattered clouds icon
        if (geoSky === `scattered clouds` && hour < 18) {
          todayIcon.setAttribute("src", "icons/scattered-clouds-day.svg");
          root.style.setProperty("--blue", scatDay);
          root.style.setProperty("--orange", scatNight);
        } else if (geoSky === `scattered clouds` && hour > 18) {
          todayIcon.setAttribute("src", "icons/scattered-clouds-night.svg");
          root.style.setProperty("--blue", scatNight);
          root.style.setProperty("--orange", clearBlue);
        }

        // broken clouds icon
        if (geoSky === `broken clouds` && hour < 18) {
          todayIcon.setAttribute("src", "icons/broken-day.svg");
          root.style.setProperty("--blue", brokenDay);
          root.style.setProperty("--orange", clearDay);
        } else if (geoSky === `broken clouds` && hour > 18) {
          todayIcon.setAttribute("src", "icons/broken-night.svg");
          root.style.setProperty("--blue", brokenNight);
          root.style.setProperty("--orange", clearNight);
        }
        // showers icon
        if (geoSky === `showers` && hour < 18) {
          todayIcon.setAttribute("src", "icons/showers-day.svg");
          root.style.setProperty("--blue", showerDay);
          root.style.setProperty("--orange", brokenNight);
        } else if (geoSky === `showers` && hour > 18) {
          todayIcon.setAttribute("src", "icons/showers-night.svg");
          root.style.setProperty("--blue", showerNight);
          root.style.setProperty("--orange", snowDay);
        }
        // light rain icon
        if (geoSky === `light rain` && hour < 18) {
          todayIcon.setAttribute("src", "icons/showers-day.svg");
          root.style.setProperty("--blue", showerDay);
          root.style.setProperty("--orange", brokenNight);
        } else if (geoSky === `light rain` && hour > 18) {
          todayIcon.setAttribute("src", "icons/showers-night.svg");
          root.style.setProperty("--blue", showerNight);
          root.style.setProperty("--orange", snowDay);
        }

        // rain icon
        if (geoSky === `rain` && hour < 18) {
          todayIcon.setAttribute("src", "icons/rain-day.svg");
          root.style.setProperty("--blue", rainDay);
          root.style.setProperty("--orange", snowDay);
        } else if (geoSky === `rain` && hour > 18) {
          todayIcon.setAttribute("src", "icons/rain-night.svg");
          root.style.setProperty("--blue", rainNight);
          root.style.setProperty("--orange", snowDay);
        }

        // moderate rain
        if (geoSky === `moderate rain` && hour < 18) {
          todayIcon.setAttribute("src", "icons/rain-day.svg");
          root.style.setProperty("--blue", rainDay);
          root.style.setProperty("--orange", snowDay);
        } else if (geoSky === `moderate rain` && hour > 18) {
          todayIcon.setAttribute("src", "icons/rain-night.svg");
          root.style.setProperty("--blue", rainNight);
          root.style.setProperty("--orange", snowDay);
        }

        // heavy intensity rain icon
        if (geoSky === `heavy intensity rain` && hour < 18) {
          todayIcon.setAttribute("src", "icons/rain-day.svg");
          root.style.setProperty("--blue", rainDay);
          root.style.setProperty("--orange", snowDay);
        } else if (geoSky === `heavy intensity rain` && hour > 18) {
          todayIcon.setAttribute("src", "icons/rain-night.svg");
          root.style.setProperty("--blue", rainNight);
          root.style.setProperty("--orange", snowDay);
        }
        // thunder icon
        if (geoSky === `thunder` && hour < 18) {
          todayIcon.setAttribute("src", "icons/thunder-day.svg");
          root.style.setProperty("--blue", thunderDay);
          root.style.setProperty("--orange", snowDay);
        } else if (geoSky === `thunder` && hour > 18) {
          todayIcon.setAttribute("src", "icons/thunder-night.svg");
          root.style.setProperty("--blue", thunderNight);
          root.style.setProperty("--orange", snowDay);
        }
        // snow icon
        if (geoSky.includes("snow") && hour < 18) {
          todayIcon.setAttribute("src", "icons/snow-day.svg");
          root.style.setProperty("--blue", snowDay);
          root.style.setProperty("--orange", rainDay);
        } else if (geoSky.includes("snow") && hour > 18) {
          todayIcon.setAttribute("src", "icons/snow-night.svg");
          root.style.setProperty("--blue", snowNight);
          root.style.setProperty("--orange", snowDay);
        }

        // mist icon
        if (geoSky === `mist` && hour < 18) {
          todayIcon.setAttribute("src", "icons/mist-day.svg");
          root.style.setProperty("--blue", mistDay);
          root.style.setProperty("--orange", rainNight);
        } else if (geoSky === `mist` && hour > 18) {
          todayIcon.setAttribute("src", "icons/mist-night.svg");
          root.style.setProperty("--blue", mistNight);
          root.style.setProperty("--orange", snowDay);
        }
        // overcast clouds
        if (geoSky === `overcast clouds` && hour < 18) {
          todayIcon.setAttribute("src", "icons/mist-day.svg");
          root.style.setProperty("--blue", mistDay);
          root.style.setProperty("--orange", rainNight);
        } else if ((geoSky === `overcast clouds`) & (hour > 18)) {
          todayIcon.setAttribute("src", "icons/mist-night.svg");
          root.style.setProperty("--blue", mistNight);
          root.style.setProperty("--orange", snowDay);
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
      event.preventDefault();
      let sky = document.querySelector("#sky");
      let geoSky = response.data.daily[0].condition.description;
      sky.textContent = geoSky;

      //change icons and background
      let todayIcon = document.querySelector(".today-icon");

      //background colors
      let clearBlue = "#B3BFD2"; //highlights blue
      let orangeH = "#ca6800"; //highlights orange
      let clearDay = "#FFFEFA"; // clear sky
      let clearNight = "#16223F"; // clear night
      let cloudyDay = "#EFEEE7"; //few clouds day
      let cloudyNight = "#282E3D"; // few clouds night
      let scatDay = "#DBDBDB"; // scattered day
      let scatNight = "#32405F"; // scattered night
      let brokenDay = "#B7B5B5"; // broken day
      let brokenNight = "#5D6D92"; // broken night
      let showerDay = "#C8DDE9"; // shower day
      let showerNight = "#4A5161";
      let rainDay = "#97BACE";
      let rainNight = "#394152";
      let thunderDay = "#BDBCA4";
      let thunderNight = "#4E679B";
      let snowDay = "#E7F3F6";
      let snowNight = "#727B8E";
      let mistDay = "#D6E1E4";
      let mistNight = "#8792AC";

      //document.html.body.style.backgroundColor = clearNight;
      const root = document.querySelector(":root");
      let searchBar = document.querySelector("#city-input");

      if (hour < 18) {
        root.style.setProperty("--gray", cloudyNight);
        searchBar.classList.add("clearNight");
      } else {
        root.style.setProperty("--gray", clearDay);
        searchBar.classList.add("clearDay");
      }
      // clear sky icon
      if (geoSky === `clear sky` && hour < 18) {
        todayIcon.setAttribute("src", "icons/clear-sky-day.svg");
        root.style.setProperty("--blue", clearDay);
        root.style.setProperty("--orange", orangeH);
      } else if (geoSky === `clear sky` && hour > 18) {
        todayIcon.setAttribute("src", "icons/clear-sky-night.svg");

        root.style.setProperty("--blue", clearNight);
        root.style.setProperty("--orange", clearBlue);
      }
      // sky is clear icon
      if (geoSky === `sky is clear` && hour < 18) {
        todayIcon.setAttribute("src", "icons/clear-sky-day.svg");
        root.style.setProperty("--blue", clearDay);
        root.style.setProperty("--orange", orangeH);
      } else if (geoSky === `sky is clear` && hour > 18) {
        todayIcon.setAttribute("src", "icons/clear-sky-night.svg");
        root.style.setProperty("--blue", clearNight);
        root.style.setProperty("--orange", clearBlue);
      }
      // cloudy icon
      if (geoSky === `few clouds` && hour < 18) {
        todayIcon.setAttribute("src", "/icons/cloudy-day.svg");
        root.style.setProperty("--blue", cloudyDay);
        root.style.setProperty("--orange", orangeH);
      } else if (geoSky === `few clouds` && hour > 18) {
        todayIcon.setAttribute("src", "icons/cloudy-night.svg");
        root.style.setProperty("--blue", cloudyNight);
        root.style.setProperty("--orange", clearBlue);
      }
      // scattered clouds icon
      if (geoSky === `scattered clouds` && hour < 18) {
        todayIcon.setAttribute("src", "icons/scattered-clouds-day.svg");
        root.style.setProperty("--blue", scatDay);
        root.style.setProperty("--orange", scatNight);
      } else if (geoSky === `scattered clouds` && hour > 18) {
        todayIcon.setAttribute("src", "icons/scattered-clouds-night.svg");
        root.style.setProperty("--blue", scatNight);
        root.style.setProperty("--orange", clearBlue);
      }

      // broken clouds icon
      if (geoSky === `broken clouds` && hour < 18) {
        todayIcon.setAttribute("src", "icons/broken-day.svg");
        root.style.setProperty("--blue", brokenDay);
        root.style.setProperty("--orange", clearDay);
      } else if (geoSky === `broken clouds` && hour > 18) {
        todayIcon.setAttribute("src", "icons/broken-night.svg");
        root.style.setProperty("--blue", brokenNight);
        root.style.setProperty("--orange", clearNight);
      }
      // showers icon
      if (geoSky === `showers` && hour < 18) {
        todayIcon.setAttribute("src", "icons/showers-day.svg");
        root.style.setProperty("--blue", showerDay);
        root.style.setProperty("--orange", brokenNight);
      } else if (geoSky === `showers` && hour > 18) {
        todayIcon.setAttribute("src", "icons/showers-night.svg");
        root.style.setProperty("--blue", showerNight);
        root.style.setProperty("--orange", snowDay);
      }
      // light rain icon
      if (geoSky === `light rain` && hour < 18) {
        todayIcon.setAttribute("src", "icons/showers-day.svg");
        root.style.setProperty("--blue", showerDay);
        root.style.setProperty("--orange", brokenNight);
      } else if (geoSky === `light rain` && hour > 18) {
        todayIcon.setAttribute("src", "icons/showers-night.svg");
        root.style.setProperty("--blue", showerNight);
        root.style.setProperty("--orange", snowDay);
      }

      // rain icon
      if (geoSky === `rain` && hour < 18) {
        todayIcon.setAttribute("src", "icons/rain-day.svg");
        root.style.setProperty("--blue", rainDay);
        root.style.setProperty("--orange", snowDay);
      } else if (geoSky === `rain` && hour > 18) {
        todayIcon.setAttribute("src", "icons/rain-night.svg");
        root.style.setProperty("--blue", rainNight);
        root.style.setProperty("--orange", snowDay);
      }

      // moderate rain
      if (geoSky === `moderate rain` && hour < 18) {
        todayIcon.setAttribute("src", "icons/rain-day.svg");
        root.style.setProperty("--blue", rainDay);
        root.style.setProperty("--orange", snowDay);
      } else if (geoSky === `moderate rain` && hour > 18) {
        todayIcon.setAttribute("src", "icons/rain-night.svg");
        root.style.setProperty("--blue", rainNight);
        root.style.setProperty("--orange", snowDay);
      }

      // heavy intensity rain icon
      if (geoSky === `heavy intensity rain` && hour < 18) {
        todayIcon.setAttribute("src", "icons/rain-day.svg");
        root.style.setProperty("--blue", rainDay);
        root.style.setProperty("--orange", snowDay);
      } else if (geoSky === `heavy intensity rain` && hour > 18) {
        todayIcon.setAttribute("src", "icons/rain-night.svg");
        root.style.setProperty("--blue", rainNight);
        root.style.setProperty("--orange", snowDay);
      }
      // thunder icon
      if (geoSky === `thunder` && hour < 18) {
        todayIcon.setAttribute("src", "icons/thunder-day.svg");
        root.style.setProperty("--blue", thunderDay);
        root.style.setProperty("--orange", snowDay);
      } else if (geoSky === `thunder` && hour > 18) {
        todayIcon.setAttribute("src", "icons/thunder-night.svg");
        root.style.setProperty("--blue", thunderNight);
        root.style.setProperty("--orange", snowDay);
      }
      // snow icon
      if (geoSky.includes("snow") && hour < 18) {
        todayIcon.setAttribute("src", "icons/snow-day.svg");
        root.style.setProperty("--blue", snowDay);
        root.style.setProperty("--orange", rainDay);
      } else if (geoSky.includes("snow") && hour > 18) {
        todayIcon.setAttribute("src", "icons/snow-night.svg");
        root.style.setProperty("--blue", snowNight);
        root.style.setProperty("--orange", snowDay);
      }
      // mist icon
      if (geoSky === `mist` && hour < 18) {
        todayIcon.setAttribute("src", "icons/mist-day.svg");
        root.style.setProperty("--blue", mistDay);
        root.style.setProperty("--orange", rainNight);
      } else if (geoSky === `mist` && hour > 18) {
        todayIcon.setAttribute("src", "icons/mist-night.svg");
        root.style.setProperty("--blue", mistNight);
        root.style.setProperty("--orange", snowDay);
      }
      // overcast clouds
      if (geoSky === `overcast clouds` && hour < 18) {
        todayIcon.setAttribute("src", "icons/mist-day.svg");
        root.style.setProperty("--blue", mistDay);
        root.style.setProperty("--orange", rainNight);
      } else if (geoSky === `overcast clouds` && hour > 18) {
        todayIcon.setAttribute("src", "icons/mist-night.svg");
        root.style.setProperty("--blue", mistNight);
        root.style.setProperty("--orange", snowDay);
      }
    }

    axios.get(cityUrl).then(changeSky);

    //change humidity
    function changeHumidity(response) {
      let humidity = document.querySelector("#humidity");
      let geoHumidity = response.data.daily[0].temperature.humidity;
      humidity.textContent = geoHumidity;
    }
    axios.get(cityUrl).then(changeHumidity);
  }

  axios.get(cityUrl).then(changeTemperature);
}
newCity.addEventListener("submit", changeTempSearch);
