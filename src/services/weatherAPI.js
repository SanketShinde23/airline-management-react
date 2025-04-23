import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const LAT = 19.99; // Nashik latitude
const LON = 73.78; // Nashik longitude
const UNITS = 'metric';

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                latitude: LAT,
                longitude: LON,
                current: 'temperature_2m,weather_code',
                temperature_unit: 'celsius',
            },
        });
        console.log("Weather Data Raw:", response.data);
        const { current } = response.data;
        if (current) {
            // Map weather_code to description (simplified example)
            const weatherCodeMap = {
                0: 'clear sky',
                1: 'partly cloudy',
                2: 'cloudy',
                3: 'overcast',
                45: 'fog',
                61: 'rain',
                // Add more mappings as needed
            };
            const description = weatherCodeMap[current.weather_code] || 'unknown';
            return {
                temp: current.temperature_2m,
                description,
                icon: description.replace(' ', '-'), // Use custom icon logic
                city: 'Nashik', // Hardcode or fetch from geocoding
            };
        } else {
            console.error("Unexpected weather data structure:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Icon URL (customize based on your needs)
export const getWeatherIconUrl = (iconCode) => {
    // Map to your own icons or use a third-party icon set
    return `/icons/${iconCode}.png`; // Example placeholder
};