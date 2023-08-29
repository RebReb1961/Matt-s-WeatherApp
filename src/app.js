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
  console.log(response);
  document.querySelector("#todays_temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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
  console.log(response.data.dt);
}

let apikey = "32cfeae7e997deb93a00c26137e84796";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
