export function updateWeatherUI(data) {
    if (!data || data.error) {
        document.getElementById("location").innerText = "Location not found";
        document.getElementById("temperature").innerText = "--°C";
        document.getElementById("description").innerText = "N/A";
        document.getElementById("weather-icon").src = "";
        return;
    }

    document.getElementById("location").innerText = `${data.city}, ${data.country}`;
    document.getElementById("temperature").innerText = `${Math.round(data.temperature)}°C`;
    document.getElementById("description").innerText = data.weather;
    document.getElementById("weather-icon").src = data.icon;
    document.getElementById("weather-icon").alt = data.weather || "Weather icon";

    if (data.forecast) {
        updateForecastUI(data.forecast);
    }
}

export function updateForecastUI(forecast) {
    const forecastContainer = document.getElementById("forecast-grid");
    forecastContainer.innerHTML = "";

    if (!forecast || forecast.length === 0) {
        forecastContainer.innerHTML = "<p>No forecast available</p>";
        return;
    }

    forecast.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");
        dayElement.innerHTML = `
            <p>${day.date}</p>
            <img src="${day.icon}" alt="Weather icon">
            <p>${Math.round(day.temp)}°C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

let map = L.map('map').setView([40.7128, -74.0060], 10); // Default: New York

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = null; // Store marker reference

export function updateMap(location) {
    console.log(`Fetching coordinates for: ${location}`); // Debugging
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            console.log("Location Data:", data); // Debugging
            
            if (data.length === 0) {
                console.error("Location not found");
                alert("Location not found. Please try again.");
                map.setView([40.7128, -74.0060], 10); // Reset to default location
                return;
            }

            const { lat, lon } = data[0];
            console.log(`Coordinates: ${lat}, ${lon}`); // Debugging

            map.setView([lat, lon], 10); // Move the map

            // Remove previous marker if exists
            if (marker) {
                map.removeLayer(marker);
            }

            // Add new marker
            marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${location}</b>`)
                .openPopup();
        })
        .catch(error => console.error("Error fetching location:", error));
}