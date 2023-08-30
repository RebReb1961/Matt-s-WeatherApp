function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="flexbox-item"><h2>${day}</h2>
        <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
        alt="sunny-clouds"
        width = 50px
        />
          <h4>21°<span class="minimum">12°</span></h4></div>`;
  });
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#todays_temperature").innerHTML = celsiusTemperature;
  document.querySelector("#city_name").innerHTML = response.data.name;
  document.querySelector("#weather_description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let currentDateAndTime = document.querySelector("#date_and_time");
  currentDateAndTime.innerHTML = formatDate(response.data.dt * 1000);
  let currentIcon = document.querySelector("#current_icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "32cfeae7e997deb93a00c26137e84796";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city_input");
  search(cityInput.value);
}

function displayFarenheit(event) {
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#todays_temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#todays_temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search_form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit_link");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#celsius_link");
celsiusLink.addEventListener("click", displayCelsius);

search("lisbon");

displayForecast();
