# Weather App 🌤️

A simple weather application that fetches real-time weather data and a 5-day forecast for any city using the OpenWeatherMap API. The app also displays the selected location on an interactive OpenStreetMap.

## Features 🚀
- Search for weather by city name 🌍
- Displays current temperature, weather condition, humidity, and wind speed 🌡️💨
- Shows a 5-day weather forecast 📅
- Weather icons representing conditions ☁️🌞
- Interactive map using OpenStreetMap with location markers 🗺️

## Technologies Used 🛠️
- **HTML, CSS, JavaScript** – Frontend
- **OpenWeatherMap API** – Fetching weather data
- **Leaflet.js** – Map integration with OpenStreetMap
- **Git & GitHub** – Version control

## Installation & Setup 🔧

### Prerequisites
- A web browser (Chrome, Firefox, Edge, etc.)
- Internet connection
- Node.js (optional for running a local server)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/weather-app.git
   ```
2. **Navigate to the project folder**
   ```sh
   cd weather-app
   ```
3. **Open `index.html` in a browser** (if using a simple static setup)
   OR
   Run a local server (for better testing)
   ```sh
   npx serve .
   ```

## Usage 🏗️
1. Enter the city name in the search bar.
2. Click the **Search** button.
3. View the current weather, forecast, and the city location on the map.

## API Configuration 🔑
- This project uses the **OpenWeatherMap API**.
- Replace `API_KEY` in `weather.js` with your own API key from [OpenWeatherMap](https://openweathermap.org/api).

## Folder Structure 📁
```
weather-app/
│-- index.html       # Main HTML file
│-- style.css        # Styling for the app
│-- script.js        # Main JavaScript logic
│-- weather.js       # Fetching weather data
│-- dom.js           # UI updates
│-- assets/          # Images and icons
│-- README.md        # Project documentation
```

## Contributing 🤝
Feel free to fork the repository and submit pull requests with improvements or bug fixes!

## License 📜
This project is open-source and available under the [MIT License](LICENSE).

