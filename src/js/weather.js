"use strict";

/**
 * Fetches weather forecast from OpenWeatherMap and updates the weather section
 *
 * @async
 * @function getWeather
 * @param {number} lat - Latitude of the searched location
 * @param {number} lon - Longitude of the searched location
 */
async function getWeather(lat, lon) {
  try {
    const apiKey = "23b2456ba1cfae30fa56332dfee9fd85";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`
    );
    const data = await response.json();

    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = "<h3>Weather Forecast</h3>";

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    for (let i = 0; i < 5; i++) {
      const forecast = dailyForecasts[i];
      const date = new Date(forecast.dt_txt).toLocaleDateString("en-GB");
      const temp = forecast.main.temp;
      const desc = forecast.weather[0].description;
      const wind = forecast.wind.speed;
      const icon = forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

      const dateParagraph = document.createElement("p");
      const boldDate = document.createElement("strong");
      boldDate.textContent = date;
      dateParagraph.appendChild(boldDate);
      weatherElement.appendChild(dateParagraph);

      const weatherIcon = document.createElement("img");
      weatherIcon.src = iconUrl;
      weatherIcon.alt = desc;
      weatherElement.appendChild(weatherIcon);

      const weatherDescription = document.createElement("p");
      weatherDescription.textContent = "Weather: " + desc;
      weatherElement.appendChild(weatherDescription);

      const temperature = document.createElement("p");
      temperature.textContent = "Temperature: " + temp + "°C";
      weatherElement.appendChild(temperature);

      const windSpeed = document.createElement("p");
      windSpeed.textContent = "Wind: " + wind + " m/s";
      weatherElement.appendChild(windSpeed);

      const divider = document.createElement("hr");
      weatherElement.appendChild(divider);
    }

  } catch (error) {
    console.log("Error", error);
  }
}