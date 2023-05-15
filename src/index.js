let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} ${date} ${month} ${year}`;
h3.innerHTML = `${hour} Hours`;
function showWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} ℃`;
  document.querySelector(
    "#percentage"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} Km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "5a3a229d5b0ff9b918233984e0904dfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "5a3a229d5b0ff9b918233984e0904dfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", clickSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
