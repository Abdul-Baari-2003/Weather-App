import { getWeather } from "./weather.js";
import { updateWeatherUI, updateMap } from "./dom.js";

let isFetching = false;

function setLoading(isLoading) {
    const button = document.getElementById("search-btn");
    button.disabled = isLoading;
    button.innerText = isLoading ? "Loading..." : "🔍 Search";
}

async function fetchAndDisplayWeather(location) {
    if (isFetching) return;

    isFetching = true;
    setLoading(true);

    try {
        const weatherData = await getWeather(location);
        if (!weatherData) {
            alert("Location not found. Please try again.");
            return;
        }
        updateWeatherUI(weatherData);
        updateMap(location);
    } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
    } finally {
        isFetching = false;
        setLoading(false);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const defaultLocation = "New York";
    await fetchAndDisplayWeather(defaultLocation);
});

document.getElementById("search-btn").addEventListener("click", async function () {
    if (isFetching) return;

    isFetching = true;
    setLoading(true);

    const location = document.getElementById("search").value;
    if (location) {
        try {
            const weatherData = await getWeather(location);
            if (!weatherData) {
                alert("Location not found. Please try again.");
                return; // Exit the function if location is not found
            }
            updateWeatherUI(weatherData);
            updateMap(location);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        } finally {
            isFetching = false; // Reset the flag in all cases
            setLoading(false); // Reset the button state
        }
    } else {
        isFetching = false; // Reset the flag if location is empty
        setLoading(false); // Reset the button state
    }
});

// Allow Enter key to trigger search
document.getElementById("search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        document.getElementById("search-btn").click();
    }
});