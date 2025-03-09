const API_KEY = "YOUR_API_KEY";

async function getWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error("City not found");
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        const dailyForecast = processForecastData(forecastData);

        return {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: Math.round(weatherData.main.temp),
            weather: weatherData.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`, // Ensure @2x is used for higher resolution
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            forecast: dailyForecast
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Process forecast data to get daily averages
function processForecastData(data) {
    if (!data.list || data.list.length === 0) {
        throw new Error("No forecast data available");
    }

    const dailyData = {};
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0]; 
        if (!dailyData[date]) {
            dailyData[date] = { temp: [], icon: entry.weather[0].icon };
        }
        dailyData[date].temp.push(entry.main.temp);
    });

    // Convert object to an array with daily averages
    return Object.keys(dailyData).map(date => ({
        date: new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        }),
        temp: Math.round(dailyData[date].temp.reduce((a, b) => a + b, 0) / dailyData[date].temp.length),
        icon: `https://openweathermap.org/img/wn/${dailyData[date].icon}@2x.png`
    })).slice(0, 5); 
}

export { getWeather };
