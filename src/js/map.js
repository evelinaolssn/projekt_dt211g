"use strict";

const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let currentMarker;

/**
 * Fetches location data from Nominatim API
 * 
 * @async
 * @function getLocation
 * @param {string} query - Corresponds to the location to search for
 * @returns {Promise<void>} - Updates map or throws an error message 
 */
async function getLocation(query) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(query)}&format=jsonv2&limit=1`
    );
    const data = await response.json();

    const oldMessage = document.getElementById("errorMessage");
    if (oldMessage) oldMessage.remove();

    if (data.length > 0) {
      const { lat, lon } = data[0];

      map.setView([lat, lon], 13);

      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      getWeather(lat, lon); 
      getEvent(lat, lon);

      currentMarker = L.marker([lat, lon]).addTo(map);

    } else {
      const errorMessage = document.createElement("p");
      errorMessage.id = "errorMessage";
      errorMessage.textContent = "No location was found!";
      document.getElementById("searchEvent").appendChild(errorMessage);
    }

  } catch (error) {
    console.log("Error", error);
  }
}

document.getElementById("searchEvent").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("locationInput").value.trim();
  if (query) {
    getLocation(query);
  }
});
