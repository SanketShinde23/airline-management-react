import React from 'react';
import { getWeatherIconUrl } from '../../services/weatherAPI';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, loading, error }) => {
    if (loading) {
        return <div className="weather-display loading">Loading weather...</div>;
    }

    if (error || !weatherData) {
        return <div className="weather-display error">Could not load weather data.</div>;
    }

    const { temp, description, icon, city } = weatherData;
    const iconUrl = getWeatherIconUrl(icon);

    return (
        <div className="weather-display">
            <h3>Current Weather in {city}</h3>
            <div className="weather-info">
                {/* <img src={iconUrl} alt={description} className="weather-icon" /> */}
                <span className="weather-temp">{Math.round(temp)}°C</span>
                <span className="weather-desc">{description}</span>
            </div>
        </div>
    );
};

export default WeatherDisplay;