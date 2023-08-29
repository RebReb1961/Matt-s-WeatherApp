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
  let displayWind = ;
  document.querySelector("#wind") = Math.round(response.data.wind.speed);
}

let apikey = "32cfeae7e997deb93a00c26137e84796";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
