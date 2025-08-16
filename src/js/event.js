"use strict";

/**
 * Fetches upcoming events from Ticketmaster API based on coordinates
 * @async
 * @function getEvent
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
async function getEvent(lat, lon) {
  try {
    const apiKey = "MHobKNhOhQDpCG91ymD0eVn8WPAArKFI";
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${lon}&radius=50&unit=km&locale=*&size=5`
    );

    const data = await response.json();
    const eventsElement = document.getElementById("events");
    eventsElement.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Upcoming Events";
    eventsElement.appendChild(heading);

    if (data._embedded && data._embedded.events.length > 0) {
      const eventList = document.createElement("ul");

      data._embedded.events.forEach((event) => {
        const listItem = document.createElement("li");

        const eventName = document.createElement("p");
        const boldName = document.createElement("strong");
        boldName.textContent = event.name;
        eventName.appendChild(boldName);
        listItem.appendChild(eventName);

        const eventDate = document.createElement("p");
        eventDate.textContent = "Date: " + event.dates.start.localDate;
        listItem.appendChild(eventDate);

        const eventVenue = document.createElement("p");
        eventVenue.textContent = "Venue: " + event._embedded.venues[0].name;
        listItem.appendChild(eventVenue);

        const eventLink = document.createElement("a");
        eventLink.href = event.url;
        eventLink.target = "_blank";
        eventLink.textContent = "More info";
        listItem.appendChild(eventLink);

        const divider = document.createElement("hr");
        listItem.appendChild(divider);

        eventList.appendChild(listItem);
      });

      eventsElement.appendChild(eventList);
    } else {
      const noEventsMessage = document.createElement("p");
      noEventsMessage.textContent = "No events found.";
      eventsElement.appendChild(noEventsMessage);
    }

  } catch (error) {
    console.log("Event error:", error);
  }
}