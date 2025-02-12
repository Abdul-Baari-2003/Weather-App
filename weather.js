const API_KEY = "";

async function getWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    }
    catch(error){
        console.error(error);
        return null;
    }

}

export { getWeather };