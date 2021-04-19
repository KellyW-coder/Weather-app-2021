//Date-time
//Time and date
let currentDate = new Date();
let gap = document.querySelector("#today-date");

// get hour value.
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
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
let day = days[currentDate.getDay()];

gap.innerHTML = `${day} | ${hours}:${minutes}`;

//Search city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  console.log(searchInput.value);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let apiKey = "3ae6bdb32a731d95f7ea1efdd218128c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
let form = document.querySelector("#city-search");

form.addEventListener("submit", search);

//degrees
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(event.data.main.temp);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(event.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//temperature
//location and weather
function showCurrentTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempDipslay = document.querySelector("#temperature");
  tempDipslay.innerHTML = `${temperature}`;

  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = `${city}`;
}

//current location button
function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3ae6bdb32a731d95f7ea1efdd218128c";
  let units = "metric";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(showCurrentTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-loc");
currentButton.addEventListener("click", getPosition);
