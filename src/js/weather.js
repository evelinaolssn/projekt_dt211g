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

      weatherElement.innerHTML += `
        <p><strong>${date}</strong></p>
        <img src="${iconUrl}" alt="${desc}">
        <p>Weather: ${desc}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Wind: ${wind} m/s</p>
        <hr>
      `;
    }

  } catch (error) {
    console.log("Error", error);
  }
}