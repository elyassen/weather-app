const submit = document.querySelector(".submit-city");
//seraching city
submit.addEventListener("click", () => {
  const city = document.querySelector(".city").value;
  checkWeatherSearch(city);
  weatherForecast(city);
});

//images

//constants here
var initial = true;
const API_KEY = "e0e1717c23a4a19699b9c782de36a2e3";

//initial
if (initial) {
  getGeoLocation();
  console.log(initial);
  initial = false;
}

//
//
//input based funtion
async function checkWeatherSearch(city) {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const res = await req.json();
  console.log("input function being executed");
  weatherForecast(res.name);
  if (res.name) {
    Showvalues(res);
  }
}

//forecast
async function weatherForecast(city) {
  console.log("weather function being executed", city);
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  const res = await req.json();
  const list = res.list;
  const listdata = list.slice(0, 14);
  var forecastDiv = document.querySelector(".forecast-area");
  forecastDiv.innerHTML = "";

  //innerdiv area
  const innerDiv = listdata.map((value) => {
    const divTag = document.createElement("div");
    divTag.classList.add("inner-div");
    console.log(value);
    return divTag;
  });
  const h3Tag = listdata.map((value) => {
    const h3 = document.createElement("h3");
    h3.textContent = Math.round(value.main.temp) + "°C";
    return h3;
  });
  const h2Tag = listdata.map((value) => {
    const h2 = document.createElement("h3");
    const dt = value.dt;
    h2.classList.add("time");
    const date = new Date(dt * 1000);
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    h2.textContent = time;

    return h2;
  });

  for (var i = 0; i < innerDiv.length; i++) {
    innerDiv[i].appendChild(h2Tag[i]);
    innerDiv[i].appendChild(h3Tag[i]);
  }

  innerDiv.forEach((i) => {
    forecastDiv.append(i);
  });
}

//location based weather
//location based defenition

function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("geo location not supported");
  }
}

///showing position

//location weather call

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // console.log(lat, lon);
  checkWeather(lat, lon);
}
//err Funtion
function showError() {
  console.log("location denied");
  checkWeatherSearch("hyderabad");
}

//gettting location from user and giving weatehr
async function checkWeather(lat, lon) {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const res = await req.json();
  console.log(res);
  let city = res.name;
  if (city) {
    Showvalues(res);
  }
  weatherForecast(city);
}
//
//
//
//showing all values in html
function Showvalues(res) {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  document.querySelector(".show-city").innerHTML = res.name;
  document.querySelector(".temp").innerHTML = Math.round(res.main.temp) + "°C";
  document.querySelector(".weather-description").innerHTML =
    res.weather[0].main;
  document.querySelector(".display-high").innerHTML =
    "H:" + res.main.temp_max + "°C";
  document.querySelector(".display-low").innerHTML =
    "L:" + res.main.temp_min + "°C";
  document.querySelector(".today").innerHTML = days[date.getDay()];
  let sunrise = new Date(res.sys.sunrise * 1000);
  let sunset = new Date(res.sys.sunset * 1000);
  document.querySelector(
    ".sunrise-text"
  ).innerHTML = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
  document.querySelector(
    ".sunset-text"
  ).innerHTML = `${sunset.getHours()}:${sunset.getMinutes()}`;
  document.querySelector(".wind-text").innerHTML = res.wind.speed;
  document.querySelector(".humidity-text").innerHTML = res.main.humidity;
}
