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
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function displayCurrentWeather(response) {
  let iconElement = document.querySelector("#main-weather-symbol");
  mainFahrenheitTemperature = response.data.main.temp;
  highOf = response.data.main.temp_max;
  lowOf = response.data.main.temp_min;
  feelsLike = response.data.main.feels_like;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    mainFahrenheitTemperature
  );
  document.querySelector("#high-of").innerHTML = Math.round(highOf);
  document.querySelector("#low-of").innerHTML = Math.round(lowOf);
  document.querySelector("#feels-like").innerHTML = Math.round(feelsLike);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function searchCity(city) {
  let apiKey = "989bcbe68d0cc1b00b25e60364c50c46";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "989bcbe68d0cc1b00b25e60364c50c46";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  document.querySelector("#main-temperature").innerHTML = Math.round(
    ((mainFahrenheitTemperature - 32) * 5) / 9
  );
  document.querySelector("#high-of").innerHTML = Math.round(
    ((highOf - 32) * 5) / 9
  );
  document.querySelector("#low-of").innerHTML = Math.round(
    ((lowOf - 32) * 5) / 9
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    ((feelsLike - 32) * 5) / 9
  );
}
function displayFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#main-temperature").innerHTML = Math.round(
    mainFahrenheitTemperature
  );
  document.querySelector("#high-of").innerHTML = Math.round(highOf);
  document.querySelector("#low-of").innerHTML = Math.round(lowOf);
  document.querySelector("#feels-like").innerHTML = Math.round(feelsLike);
}
let mainFahrenheitTemperature = null;
let highOf = null;
let lowOf = null;
let feelsLike = null;
let cityElement = document.querySelector("h1");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
searchCity("San Diego");
