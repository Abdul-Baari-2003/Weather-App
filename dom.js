function displayWeather(data){
    const weatherDiv = document.getElementById("weather-result");

    if(!data){
        weatherDiv.innerHTML = "<p>City not found. Please try again.</p>";
        return;
    }

    weatherDiv.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Weather: ${data.weather}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}

export { displayWeather };