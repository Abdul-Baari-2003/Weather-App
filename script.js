import { getWeather } from "./weather.js";
import { displayWeather } from "./dom.js";

document.getElementById("search-btn").addEventListener("click", async function () {
    const city = document.getElementById("city-input").value;
    if (city === ""){
        alert("Please enter a city name!");
        return;
    }

    const weatherData = await getWeather(city);
    displayWeather(weatherData);
})