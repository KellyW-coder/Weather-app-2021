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

//forecast display
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `    
                <div class="col-sm-2">
                  <div class="card">
                    <div class="card-header bg-transparent border-info">
                      ${day}
                    </div>
                    <div class="card-body">
                      <figure class="figure">
                        <img
                          src="images/sun.png"
                          class="figure-img img-fluid rounded"
                          alt="Weather icon"
                          width="80px"
                        />
                        <figcaption class="figure-caption">Sunny</figcaption>
                      </figure>
                    </div>
                    <div class="card-footer bg-transparent border-info">
                      <span class="weather-forecast-temperature-max">20°</span> 
                      <span class="weather-forecast-temperature-min">12°</span> 
                    </div>
                  </div>
                </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//temperature
//location and weather
function showCurrentTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempDipslay = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  tempDipslay.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = `${city}`;
}

//degrees and unit conversion
function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class from the celcius link
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let celciusTemperature = null;

displayForecast();

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
